import json from "../../../package.json";
import { ImageRenderer, StreamRenderer } from "./renderer";

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const beautyBundleName = "face_beautification.bundle";
var AgoraRenderPipe = 0;
var NamaRenderPipe = 1;
var ImageVideoRenderPipe = 2;
export default class SharedLogic {
  module = null;
  currentSticker = ""; //当前渲染了的sticker key
  toRenderSticker = null; // bundle
  prepare = {
    aiBundle: null,
    beautyBundle: null,
    offscreen: null,
    videoStream: null,
    isPc: true,
    writableStream: null,
    imageBitmap: null,
  };

  items_mask = new Int32Array(0);
  emptyItems = new Int32Array(0);
  cppItems = new Int32Array(2);
  bundleMap = {};
  destroyingBundleMap = {};
  destroyResolve = {};
  beautyBundle = undefined;
  stickerBundle = undefined;
  loadingSticker = false;
  useEmpty = false;
  isLoaded = false;
  face = null;
  statistic = true;

  inited = false;
  aiInited = false;
  aiLoaded = false;
  beautyLoaded = false;

  onInited = null;
  isWorker = false;
  onFaceDetect = null;
  onStatistics = null;
  isAgora = false;
  isUpload = false;
  isPureAgora = false;
  save = null; // 用户保存的promise方法
  onCreating = null;
  renderer = false;
  flipHorizontal = true; //defulat use front camera
  constructor(isWorker = undefined, isAgora = undefined, isPureAgora = false) {
    this.isWorker = isWorker;
    this.isAgora = isAgora;
    this.isPureAgora = isPureAgora;
  }

  async loadModule({ auth, typeSDK }) {
    let loadDir = typeSDK == "LOW" ? "" : "SIMD/";
    try {
      // 白名单直接进入低版本wasm
      let namaWasm = null;
      if (loadDir) {
        namaWasm = (await import(`./SIMD/funamawebassembly.js`))?.default;
      } else {
        namaWasm = (await import(`./funamawebassembly.js`))?.default;
      }
      this.module = await namaWasm?.();
    } catch (e) {
      console.error("load SIMD/funamawebassembly fail", e);
      if (loadDir) {
        // simd 失败就降级
        const namaWasm = (await import("./funamawebassembly.js"))?.default;
        this.module = await namaWasm();
      }
    }
    this.isLoaded = true;
    console.log("NamaSDK版本号：", this.module.fuGetVersion());
    console.log("前端版本号：", json.version);
    console.log("浏览器UA:", navigator?.userAgent);
    var step_res = this.module.fuSetup(auth);
    console.log("setup_res:", step_res);
    this.isLoaded = true;
    this.module.fuSetLogLevel(this.module.FULOGLEVEL.FU_LOG_LEVEL_INFO);
    // this.module.fuSetLogLevel(this.module.FULOGLEVEL.FU_LOG_LEVEL_OFF);
    this.getPrepare();
  }

  setFaceProcessor(v) {
    this.module.fuFaceProcessorSetFaceLandmarkQuality(v);
  }

  updateIsAgora(v) {
    this.isAgora = v.isAgora;
    this.isPureAgora = v.isPure;
  }

  async resetStream() {
    if (this.renderer)
    {
      this.renderer.clearCanvas();
      this.renderer.destroy();
    }

    if (this.abort_controller) {
      this.abort_controller.abort();
      this.abort_controller = null;
    }
    if (this.textureId) {
      this.module.fuUnRegisterNativeTexture(this.textureId);
      this.textureId = null;
    }
    if (this.requestAnimationId) {
      cancelAnimationFrame(this.requestAnimationId);
    }
    this.prepare.videoStream = null;
    this.prepare.writableStream = null;
    this.prepare.imageBitmap = null;
  }

  setFlip(v) {
    this.flipHorizontal = !v;
  }

  destroy() {
    if (!this.module) return;
    if (this.renderer)
    {
      this.renderer.destroy();
      this.renderer = null;
    }
    console.log("runnnn destroy");
    this.module.fuReleaseGLResources();
    this.module.fuDestroyAllItems();
    this.module.fuDestroyLibData();
    this.module = undefined;
  }

  async getPrepare(key, data) {
    if (key) {
      // 没有key就直接检查后续逻辑
      this.prepare[key] = data;
    }
    console.log("run prepare", key, this.prepare, {
      aiInited: this.aiInited,
      inited: this.inited,
      beautyLoaded: this.beautyLoaded,
      aiLoaded: this.aiLoaded,
      isLoaded: this.isLoaded,
    });
    if (!this.isLoaded) return;
    if (this.prepare.aiBundle && !this.aiInited) {
      this.aiInited = true;
      await this.loadAiBundle(this.prepare.aiBundle);
    }
    if (this.prepare.beautyBundle && this.prepare.offscreen) {
      if (!this.inited) {
        this.inited = true;
        await this.InitNama({
          bundle: this.prepare.beautyBundle,
          canvas: this.prepare.offscreen,
        });
      }
      // 会有case 其他都好了 aiload的逻辑还没走，但是渲染要在ai之后
      if (
        this.inited &&
        (this.prepare.videoStream || this.prepare.imageBitmap) &&
        this.aiLoaded &&
        this.beautyLoaded
      ) {
        var pipe = undefined;
        if (this.isUpload) {
          if (this.prepare.imageBitmap || this.prepare.videoStream) {
            pipe = ImageVideoRenderPipe;
          }
        } else if (this.isAgora) {
          if (this.prepare.writableStream && this.prepare.videoStream) {
            pipe = AgoraRenderPipe;
          }
        } else if (this.prepare.videoStream) {
          pipe = NamaRenderPipe;
        }
        if (pipe != undefined) {
          this.BeginRender(pipe);
        }
      }
    }

    if (this.aiLoaded && this.beautyLoaded) {
      if (this.isWorker) {
        postMessage({ type: "inited" }); // 触发默认美颜时机
      } else {
        this.onInited?.();
      }
    }
  }

  async destoryItem(bundleName) {
    const res = this.bundleMap[bundleName];
    if (!res) {
      console.error("fuItem not found!");
      return;
    }
    if (this.destroyingBundleMap[bundleName]) {
      return;
    }

    this.destroyingBundleMap[bundleName] = res;
    return new Promise((resolve) => {
      this.destroyResolve[bundleName] = resolve;
    });
  }

  async loadAiBundle(aiBundle) {
    var flag = new this.module.FUAIFACEALGORITHMCONFIG();
    flag.value =
      this.module.FUAIFACEALGORITHMCONFIG.FACE_ALGORITHM_ENABLE_ALL.value |
      this.module.FUAIFACEALGORITHMCONFIG.FACE_ALGORITHM_DISABLE_DEL_SPOT
        .value |
      this.module.FUAIFACEALGORITHMCONFIG.FACE_ALGORITHM_DISABLE_ARMESHV2
        .value |
      this.module.FUAIFACEALGORITHMCONFIG.FUAIFACE_DISABLE_RACE.value |
      this.module.FUAIFACEALGORITHMCONFIG.FUAIFACE_DISABLE_LANDMARK_HP_OCCU
        .value;

    this.module.fuSetFaceAlgorithmConfig(flag);
    this.module.fuLoadAIModelFromPackage(
      aiBundle,
      this.module.FUAITYPE.FACEPROCESSOR,
    );
    if (!this.module.fuIsAIModelLoaded(this.module.FUAITYPE.FACEPROCESSOR)) {
      console.log("AI model not loaded");
      return;
    }
    console.log("ai bundle loaded");
    this.aiLoaded = true;
    return true;
  }

  setRenderEmpty({ value }) {
    this.useEmpty = value;
  }

  async fuCreateItem({ data, name }) {
    const s = Date.now();
    var item = this.bundleMap[name];
    if (item) {
      return item;
    }
    item = this.destroyingBundleMap[name];
    if (item) {
      delete this.destroyingBundleMap[name];
      this.destroyResolve[name]();
      delete this.destroyResolve[name];
      return item;
    }
    item = await this.module.fuCreateItemFromPackage(data);
    console.log("time: ", name, Date.now() - s);
    if (!item) {
      console.log("fu item无效");
      return null;
    }
    this.bundleMap[name] = item;
    return item;
  }

  setParams({ bundleName, type, effectName, value }) {
    if (!this.module) {
      console.error("namaSDK not inited!");
      return;
    }
    const res = this.bundleMap[bundleName];
    if (!res) {
      console.error("fuItem not found!");
      return;
    }
    const item = res;
    if (type === 4) {
      this.module.fuItemSetParams(item, "filter_name", effectName);
      this.module.fuItemSetParamd(item, "filter_level", value);
    } else {
      this.module.fuItemSetParamd(item, effectName, value);
    }
    console.log("set param", effectName, value);
  }

  changeCreatingStatus(v) {
    if (v) {
      this.loadingSticker = true;
    } else {
      this.loadingSticker = false;
    }
    if (this.isWorker) {
      postMessage({ type: "creating", data: v });
    } else {
      this.onCreating?.(v);
    }
  }

  async setSticker({ key, bundle }) {
    if (this.loadingSticker) {
      console.log("Sticker:loading, ignore", key);
      return;
    }
    this.changeCreatingStatus(key);
    this.toRenderSticker = { key, bundle };
    const item = await this.fuCreateItem({ data: bundle, name: key });
    if (item) {
      this.module.fuItemSetParamd(item, "rotationMode", 2);
    }
    var currentSticker = this.currentSticker;
    this.currentSticker = this.toRenderSticker;
    this.stickerBundle = item;
    this.toRenderSticker = null;
    if (currentSticker.key) {
      await this.destoryItem(currentSticker.key);
    }
    this.changeCreatingStatus("");
  }

  clearSticker() {
    console.log("Sticker:clear");
    this.stickerBundle = undefined;
    if (this.currentSticker) {
      this.destoryItem(this.currentSticker.key).then(() => {
        this.currentSticker = "";
      });
    }
  }

  async InitNama({ bundle, canvas }) {
    console.log("InitNama ......");
    this.module.canvas = canvas;
    this.module.fuInitGLContext("");

    this.module.fuSetPlatform(
      !this.prepare.isPc
        ? this.module.FUPLATFORM.ANDORID
        : this.module.FUPLATFORM.PC,
    );

    // this.module.fuEnableFrameTimeProfile(100, true);
    // call fuDestroyItem() when the item is no longer needed.
    const item = await this.fuCreateItem({
      data: bundle,
      name: beautyBundleName,
    });
    console.log("beauty bundle loaded");
    this.beautyBundle = item;

    // 设置一下最大检测人脸数
    this.module.fuSetMaxFaces(4);
    this.beautyLoaded = true;
  }

  OnBeforeRender() {
    // 检测是否有需要销毁的bundle
    for (const key in this.destroyingBundleMap) {
      const item = this.destroyingBundleMap[key];
      if (item) {
        this.module.fuDestroyItem(item);
        delete this.bundleMap[key];
      }
    }
    this.destroyingBundleMap = {};
  }

  OnAfterRender() {
    for (const key in this.destroyResolve) {
      this.destroyResolve[key]();
    }
    this.destroyResolve = {};

    if (this.save instanceof Function) {
      const pixels = this.renderer.readPixels();
      this.save({
        pixels,
        w: this.module.canvas.width,
        h: this.module.canvas.height,
      });
    }

    if (!this.useEmpty) {
      // 检测人脸
      const res = this.module.fuFaceProcessorGetNumResults();
      if (!!res !== this.face) {
        // 最新人脸检测状态与当前标记不一致，更新一下
        if (this.isWorker) {
          postMessage({ type: "faceDetection", data: !!res });
        } else {
          this.onFaceDetect?.(res);
        }
        this.face = !!res;
      }
    }
  }
  OnUpdateFPS(fps, rtt) {
    if (this.statistic) {
      const data = {
        fps,
        rtt,
        resolution: [this.renderer.width, this.renderer.height],
      };
      if (this.isWorker) {
        postMessage({
          type: "statistics",
          data,
        });
      } else {
        this.onStatistics?.(data);
      }
    }
  }

  BeginRender(pipe) {
    const that = this;
    // render image
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = null;
    }

    if (pipe === ImageVideoRenderPipe) {
      this.renderer = new ImageRenderer(this.module);
      if (this.prepare.imageBitmap) {
        this.renderer.setImageBuffer(
          this.prepare.imageBitmap,
          this.prepare.imageBitmap.width,
          this.prepare.imageBitmap.height,
          this.flipHorizontal,
        );
        this.renderer.setFps(30);
      } else if (this.prepare.videoStream) {
        this.renderer.setImageBuffer(
          this.prepare.videoStream,
          this.prepare.videoStream.videoWidth,
          this.prepare.videoStream.videoHeight,
          false,
        );
        // for now, use 30 fps to display video;
        this.renderer.setFps(30);
      }
    } else if (pipe === NamaRenderPipe) {
      var stream = undefined;
      var type = undefined;
      if (this.prepare.videoStream instanceof ReadableStream) {
        this.renderer = new StreamRenderer(this.module);
        stream = this.prepare.videoStream;
        this.renderer.setStream(stream, this.isWorker,this.flipHorizontal);
      } else if (this.prepare.videoStream instanceof HTMLVideoElement) {
        this.renderer = new ImageRenderer(this.module);
        this.renderer.setImageBuffer(
          this.prepare.videoStream,
          this.prepare.videoStream.videoWidth,
          this.prepare.videoStream.videoHeight,
          this.flipHorizontal,
        );
        var track = this.prepare.videoStream.srcObject.getVideoTracks()[0];
        var fps = track.getSettings().frameRate;
        this.renderer.setFps(fps);
      } else {
        console.log("unknow stream not support");
        return;
      }
    } else if (pipe === AgoraRenderPipe) {
      this.renderer = new StreamRenderer(this.module);
      stream = this.prepare.videoStream;
      this.renderer.setStream(stream,this.isWorker, this.flipHorizontal);
      if (this.prepare.writableStream) {
        this.renderer.setWritableStream(
          this.prepare.writableStream,
          !this.isPureAgora,
        );
      }
    } else {
      console.log("unknow pipe not support");
      return;
    }

    this.renderer.setOnFpsUpdate((fps, rtt) => {
      that.OnUpdateFPS(fps, rtt);
    });
    this.renderer.setOnBeforeRender(() => {
      that.OnBeforeRender();
      that.cppItems[0] = that.beautyBundle ? that.beautyBundle : 0;
      that.cppItems[1] = that.stickerBundle ? that.stickerBundle : 0;
      that.renderer.setRenderList(
        that.useEmpty ? that.emptyItems : that.cppItems,
      );
      that.renderer.setViewport(
        0,
        0,
        that.module.canvas.width,
        that.module.canvas.height,
      );
    });
    this.renderer.setOnAfterRender(() => {
      that.OnAfterRender();
    });
    this.renderer.beginRender();
  }
}
