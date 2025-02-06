import defultConfig, {
  BundleEnum,
  DownloadState,
  initValueMap,
  menuKey,
  panelConfig,
} from "@/common/defaultConfig.tsx";
import { fetchBundle, fetchCert } from "./featchBundle.ts";
import {
  testUA,
  valueToRaw,
  isPureAgora,
  isUpload,
  getInitValue,
  useWorker,
  notWasmSimdSupported,
} from "../tools.ts";
import {
  SDKEnumerator,
  Statistic,
  defaultFilterSliderValue,
} from "@/common/global.ts";
import SharedLogic from "./shared.js";

const BASEBundle = BundleEnum.face_beautification;

class NamaSDK {
  canvas: HTMLCanvasElement | OffscreenCanvas = null;
  static instance: NamaSDK = null;
  currentSticker: string = "";
  onFaceDetect?: (res) => void;
  onStatistics?: (v: Statistic) => void;
  baseBundles = { ai: null, beauty: null }; // 缓存从oss上下载下来的bundle
  onDownloading?: Function = null;
  worker: Worker;
  isSafari: boolean = false; // safari使用主线程渲染，其他使用worker渲染
  sharaedLogic: SharedLogic = null;
  bundleCache: any = {};
  onInited?: Function = null;
  loadingBundlePromises: Record<string, Promise<any>> = {}; // 避免重复请求
  onCreating?: Function = null;

  constructor() {
    this.downloadBundles();
    this.isSafari = !useWorker();
    // 这里会在进入到/agora/joined页面之前就执行，所以判断是/agora/就行
    const isAgora = location.pathname.includes("/agora");
    const usePureAgora = isPureAgora();
    const upload = isUpload();
    console.log("NamaSDK constructor", {
      upload,
      isSafari: this.isSafari,
    });

    if (!this.isSafari && !upload) {
      this.worker = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
      console.log("isAgora", isAgora);

      this.worker.postMessage({
        cmd: "agora",
        msg: {
          isAgora,
          isPure: usePureAgora,
        },
      });
      if (this.checkWorker()) {
        this.worker.onmessage = ({ data }) => {
          if (data.type === "faceDetection") {
            console.log("face", !!this.onFaceDetect);
            this.onFaceDetect?.(data.data);
          }
          console.log("worker inited", data);
          if (data.type === "inited") {
            this.initInitialBeauty();
          }
          if (data.type === "statistics") {
            this.onStatistics?.(data.data);
          }
          if (data.type === "console") {
            console.log("from worker", data.msg);
          }
          if (data.type === "creating") {
            this.onCreating?.(data.data);
          }
        };
      }
    } else {
      this.sharaedLogic = new SharedLogic(undefined, isAgora, usePureAgora);
      this.sharaedLogic.onInited = this.initInitialBeauty.bind(this);
      this.sharaedLogic.isUpload = upload;
    }

    fetchCert().then((auth) => {
      const searchParams = new URLSearchParams(window.location.search);
      const msg = {
        auth,
        typeSDK:
          searchParams.get("__lowerSDK") === "true" || !this.checkSupported()
            ? SDKEnumerator.LOW
            : SDKEnumerator.SIMD,
      };
      if (this.checkWorker()) {
        this.worker.postMessage({
          cmd: "auth",
          msg: msg,
          transferables: [auth],
        });
      } else {
        this.sharaedLogic.loadModule(msg);
      }
    });
  }
  checkSupported() {
    // 校验浏览器是否支持videoFrame 和wasm simd
    // const isVideoFrameSupported = typeof VideoFrame !== "undefined";
    const notWasmSimdSupport = notWasmSimdSupported();
    return !notWasmSimdSupport;
  }
  checkWorker() {
    if (this.worker) {
      return true;
    } else {
      // console.log("worker is not inited");
    }
  }

  setPrepareData(p: { [k: string]: any }) {
    Object.keys(p).forEach((k) => {
      this.sharaedLogic.getPrepare(k, p[k]);
    });
  }

  setFlip(v) {
    if (this.checkWorker()) {
      this.worker.postMessage({
        cmd: "setFlip",
        msg: v,
      });
    } else {
      this.sharaedLogic.setFlip(v);
    }
  }

  setFaceProcessor(v) {
    if (this.checkWorker()) {
      this.worker.postMessage({
        cmd: "setFaceProcessor",
        msg: v,
      });
    } else {
      this.sharaedLogic.setFaceProcessor(v);
    }
  }

  destroy() {
    if (this.checkWorker()) {
      this.worker.postMessage({
        cmd: "destroy",
      });
    } else {
      this.sharaedLogic.destroy();
    }
  }
  // 提前加载部分bundle
  preLoadingBundles() {
    const stickers = defultConfig[menuKey.sticker];
    if (!stickers?.length) return;
    Promise.all(
      stickers.map((item) => {
        return this.loadBundle(item?.bundle);
      }),
    );
  }
  downloadBundles() {
    this.onDownloading?.(true);
    let count = 0;
    console.log("timing: start download", Date.now());
    Promise.all([
      fetchBundle(
        !testUA()
          ? BundleEnum.ai_face_processor_pc
          : BundleEnum.ai_face_processor,
      )
        .then((ai) => {
          this.baseBundles.ai = ai;
          const d = {
            aiBundle: ai,
          };
          if (this.checkWorker()) {
            this.worker.postMessage({
              cmd: "prepare",
              msg: d,
            });
          } else {
            this.setPrepareData(d);
          }
          count += 1;
          console.log("timing: ai bundle downloaded", Date.now());
        })
        .catch(() => (count += 1))
        .finally(() => {
          if (count === 2) {
            this.onDownloading?.(false);
          }
        }),
      fetchBundle(BundleEnum.face_beautification)
        .then(async (bea) => {
          this.baseBundles.beauty = bea;
          const d = {
            beautyBundle: bea,
          };
          if (this.checkWorker()) {
            this.worker.postMessage({
              cmd: "prepare",
              msg: d,
            });
          } else {
            this.setPrepareData(d);
          }
          console.log("timing: beauty bundle downloaded", Date.now());
        })
        .catch(() => (count += 1))
        .finally(() => {
          if (count === 2) {
            this.onDownloading?.(false);
          }
        }),
    ]).finally(() => {
      console.log("start load all sticker bundles");
      this.preLoadingBundles();
    });
  }

  public static getInstance(): NamaSDK {
    if (!NamaSDK.instance) {
      NamaSDK.instance = new NamaSDK();
    }
    return NamaSDK.instance;
  }

  resetInit() {
    if (this.checkWorker()) {
      this.worker.postMessage({
        cmd: "resetInit",
      });
    } else {
      this.sharaedLogic.resetStream();
    }
  }

  async setCanvasAndVideoStream(
    offscreen: HTMLCanvasElement | OffscreenCanvas,
    videoStream?: any,
    writableStream?: any,
    imageBitmap?: any,
  ) {
    const d: any = {
      isPc: !testUA(),
    };
    const transferables = [];
    if (offscreen) {
      this.canvas = offscreen;
      d.offscreen = offscreen;
      transferables.push(offscreen);
    }
    if (videoStream) {
      d.videoStream = videoStream;
      // 判断videoStream有宽高，有宽高才能渲染
      while (videoStream.videoWidth === 0) {
        console.log("videoStream.videoWidth", videoStream.videoWidth);
        await new Promise((r) => requestAnimationFrame(r));
      }
      transferables.push(videoStream);
    }
    if (writableStream) {
      d.writableStream = writableStream;
      transferables.push(writableStream);
    }
    if (imageBitmap) {
      // 只针对主线程渲染
      d.imageBitmap = imageBitmap;
    }
    console.log(
      "offscreen and videostream settled",
      d,
      this.checkWorker(),
      transferables,
    );
    if (this.checkWorker()) {
      this.worker.postMessage(
        {
          cmd: "prepare",
          msg: d,
        },
        transferables,
      );
    } else {
      this.setPrepareData(d);
    }
  }

  on(key, cb) {
    if (key === "onFace") {
      if (!this.checkWorker()) {
        this.sharaedLogic.onFaceDetect = cb;
      } else {
        this.onFaceDetect = cb;
      }
    }

    if (key === "statistic") {
      if (!this.checkWorker()) {
        this.sharaedLogic.onStatistics = cb;
      } else {
        this.onStatistics = cb;
      }
    }

    if (key === "download") {
      this.onDownloading = cb;
    }

    if (key === "inited") {
      this.onInited = cb;
    }
    if (key === "creating") {
      if (!this.checkWorker()) {
        this.sharaedLogic.onCreating = cb;
      } else {
        this.onCreating = cb;
      }
    }
  }

  setRenderEmpty(v) {
    if (this.checkWorker()) {
      this.worker.postMessage({
        cmd: "setRenderEmpty",
        msg: { value: v },
      });
    } else {
      this.sharaedLogic.useEmpty = v;
    }
  }

  /**
   * 设置是否开启性能数据
   * @param v
   */
  setStat(v) {
    if (this.checkWorker()) {
      this.worker.postMessage({
        cmd: "getStatistics",
        msg: v,
      });
    }
  }

  /**
   * 仅用于保存
   * @param type
   * @param cb
   */
  save(cb) {
    this.sharaedLogic.save = cb;
  }

  setParams(
    bundleName: string,
    type: menuKey,
    effectName: string,
    value: number,
  ) {
    if (this.checkWorker()) {
      this.worker.postMessage({
        cmd: "setParams",
        msg: {
          bundleName,
          type,
          effectName,
          value,
        },
      });
    } else {
      this.sharaedLogic.setParams({ bundleName, type, effectName, value });
    }
  }

  async loadBundle(name) {
    let promise = this.loadingBundlePromises[name];
    if (!promise) {
      promise = fetchBundle(name);
      this.loadingBundlePromises[name] = promise;
    }
    const res = await promise;
    this.bundleCache[name] = res;
    return res;
  }

  async setStciker(key: string, stateCb: Function) {
    if (key === this.currentSticker) return;
    this.currentSticker = key;
    let bundle = this.bundleCache[key];
    if (!bundle) {
      bundle = await this.loadBundle(key);
    }
    stateCb?.(
      this.bundleCache[key] ? DownloadState.Success : DownloadState.Error,
    );
    // 下载之后这个currentKey已经是其他贴纸了
    if (this.currentSticker && key !== this.currentSticker) {
      console.log("丢弃由于快速点击操作，之前点击的贴纸");
      return;
    }
    if (this.checkWorker()) {
      this.worker.postMessage({
        cmd: "setStickers",
        msg: {
          key,
          bundle,
        },
      });
    } else {
      this.sharaedLogic.setSticker({ key, bundle });
    }
  }

  clearSticker() {
    if (this.checkWorker()) {
      this.worker.postMessage({
        cmd: "clearSticker",
      });
    } else {
      this.sharaedLogic.clearSticker();
    }
    this.currentSticker = "";
  }

  setEffects(isClose?: boolean) {
    const effects = defultConfig[menuKey.effects];
    effects.forEach((opt) => {
      if (opt.key === "磨皮") {
        // 磨皮需要特殊处理
        const typeVal = panelConfig[opt.key].use;
        this.setParams(BASEBundle, menuKey.effects, "blur_type", typeVal);
        this.setParams(
          BASEBundle,
          menuKey.effects,
          "blur_level",
          isClose ? 0 : valueToRaw(getInitValue(opt), opt.reflexType),
        );
      } else {
        let k = opt.fuKey;
        if (!opt.fuKey) {
          k = panelConfig[opt.key].use;
        }
        this.setParams(
          BASEBundle,
          menuKey.effects,
          k,
          isClose ? 0 : valueToRaw(getInitValue(opt), opt.reflexType),
        );
      }
    });
  }

  // 设置产品维度默认美颜参数
  initInitialBeauty() {
    const shapes = defultConfig[menuKey.shaping];
    const filters = defultConfig[menuKey.filter];
    this.setEffects();
    shapes.forEach((opt) => {
      let k = opt.fuKey;
      if (!opt.fuKey) {
        k = panelConfig[opt.key].use;
      }
      this.setParams(
        BASEBundle,
        menuKey.shaping,
        k,
        valueToRaw(getInitValue(opt), opt.reflexType),
      );
    });
    // 设置滤镜，默认第一个
    this.setParams(
      BASEBundle,
      menuKey.filter,
      filters[0].key,
      valueToRaw(
        initValueMap[filters[0].key] !== undefined
          ? initValueMap[filters[0].key]
          : defaultFilterSliderValue,
        1,
      ),
    );

    this.onInited?.();
  }
}

export default NamaSDK;
