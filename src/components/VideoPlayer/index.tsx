import { useScale, useUA, useUserMedia } from "@/utils/hooks";
import { debounce } from "lodash";
import styles from "./index.module.less";
import { CompareIcon, CompareIconActive } from "@/assets/Svg";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import NamaSDK from "@/utils/namaSDK";
import { Mask } from "antd-mobile";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { MobCompareIcon } from "@/assets/MobSvg";
import { PanelContext } from "../ConfigPanelContext";
import {
  Statistic,
  agoraRemoteUserDomWidth,
  canvasId,
  localUser,
  remoteUser,
  videoId,
} from "@/common/global";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {
  createDeferred,
  flipPixels,
  getVideoPlayerInfo,
  isAgora,
  isUpload,
  testUA,
  useWorker,
} from "@/utils/tools";
import { useGlobalStore } from "@/store";
import { Button, Upload, message } from "antd";
import { saveAs } from "file-saver";

export const VideoPlayer: React.FC = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>(null);
  const cref = useCallback((node) => {
    if (node) {
      setCanvas(node);
    }
  }, []);
  const { isPc } = useUA();
  const { t } = useTranslation();
  const [noFace, setNoFace] = useState<boolean>(false);
  const { scale } = useScale();
  const { showCompare, compareHeight, setIsReady, noDevice } =
    useContext(PanelContext);
  const [pressed, setPressed] = useState<boolean>(false);
  const [statistic, setStatistic] = useState<Statistic>({
    fps: 0,
    rtt: 0,
    resolution: [0, 0],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { loadingCamera, videoStream, setVideoStream } = useUserMedia(videoId);
  const { globalData, setGlobal } = useGlobalStore();
  const [downloading, setDownloading] = useState<boolean>(false);
  const [src, setSrc] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [bitmap, setBitMap] = useState<ImageBitmap>(null);
  const [videoSize, setVideoSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 },
  );
  const [saving, setSaving] = useState<boolean>(false);
  const cameraSetting = useMemo(() => {
    return globalData.cameraSetting;
  }, [globalData.cameraSetting]);
  const whStyle = useMemo(() => {
    const wAR = window.innerWidth / window.innerHeight;
    const standard = 720 / 1280;
    // 一开始是为了解决美型算法导致靠近边缘变形的问题，先放大画布在截取，现在不处理这个问题了，就先改回100%
    const style =
      wAR < standard
        ? { height: "100%", width: "unset" }
        : { width: "100%", height: "unset" };

    const containerStyle =
      wAR < standard
        ? { height: "100%", width: "unset" }
        : { width: "100%", height: "unset" };
    return testUA() && wAR !== standard
      ? { canvasStyle: style, containerStyle }
      : {};
  }, []);
  const canvaAutoStyle = useMemo(() => {
    const wAR = window.innerWidth / window.innerHeight;
    const standard = 720 / 1280;
    return wAR < standard ? { width: "unset" } : { height: "unset" };
  }, []);
  // 根据屏幕宽度计算大小
  const setLocalWrapSize = useCallback(() => {
    const dom = document.querySelector(
      `.${styles.localUserWrap}`,
    ) as HTMLDivElement;
    if (!dom) return;
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    const style = dom.style;
    let ratio = cameraSetting.height / cameraSetting.width;
    if (isPc) {
      dom.style.height = width * ratio + "px";
      return;
    }
    ratio = cameraSetting.width / cameraSetting.height;
    const obj = Object.create(null);
    if (style.height === "100%") {
      obj.width = height * ratio + "px";
    } else if (style.width === "100%") {
      obj.height = width / ratio + "px";
    }
    for (const key in obj) {
      dom.style[key] = obj[key];
    }
    console.log("width", width, isPc, ratio);
    // dom.style.height = `${width * ratio}px`;
  }, [cameraSetting, isPc]);
  useEffect(() => {
    const fun = debounce(() => {
      setLocalWrapSize();
    }, 300);
    window.addEventListener("resize", fun);
    return () => {
      window.removeEventListener("resize", fun);
    };
  }, [setLocalWrapSize]);
  const uploadCanvasStyle = useMemo(() => {
    const isMobile = testUA();
    const mediaSize = bitmap ? bitmap : videoSize;
    return {
      ...whStyle.canvasStyle,
      width: mediaSize.width < mediaSize.height && !isMobile ? "auto" : "100%",
      height: mediaSize.width < mediaSize.height && !isMobile ? "100%" : "auto",
      aspectRatio: `${mediaSize.width}/${mediaSize.height}`,
    };
  }, [whStyle, bitmap, videoSize]);

  const handlePress = (v) => {
    setPressed(v);
    NamaSDK.instance.setRenderEmpty(v);
  };

  useEffect(() => {
    NamaSDK.instance.on("download", (res) => {
      setDownloading(res);
    });
    NamaSDK.instance.on("inited", () => {
      console.log("log---------------inited", new Date());
      setLoading(false);
    });
    NamaSDK.instance.setStat(location.href.includes("__stat=true"));
    NamaSDK.instance.on("onFace", (res) => {
      setNoFace(!res);
    });
    NamaSDK.instance.on("statistic", (res) => {
      setStatistic(res);
    });
    const handler = () => {
      handlePress(false);
    };
    window.addEventListener("pointerup", handler);
    window.addEventListener("touchend", handler); // 不知道为啥 移动端 pointerup长按元素然后移动出去再放开后不会触发
    return () => {
      window.removeEventListener("pointerup", handler);
      window.removeEventListener("touchend", handler);
    };
  }, []);

  useEffect(() => {
    setIsReady(!loading && !loadingCamera && !downloading);
  }, [loading, loadingCamera]);

  useEffect(() => {
    if (isAgora()) {
      if (!canvas || !cameraSetting.width) return;
      const offscreen = !useWorker()
        ? canvas
        : canvas.transferControlToOffscreen();
      console.log("canvas", canvas);

      NamaSDK.instance.setCanvasAndVideoStream(offscreen);
    }
    setLocalWrapSize();
  }, [canvas, cameraSetting.width]);
  useEffect(() => {
    if (!isAgora()) {
      if (!canvas || (!videoStream && !bitmap) || !cameraSetting.width) {
        console.log("not agora before setCanvasAndVideoStream get return");
        return;
      }
      const offscreen =
        !useWorker() || isUpload()
          ? canvas
          : canvas.transferControlToOffscreen();
      NamaSDK.instance.setCanvasAndVideoStream(
        offscreen,
        videoStream,
        undefined,
        bitmap,
      );
    }
  }, [canvas, videoStream, bitmap, cameraSetting]);
  useEffect(() => {
    if (bitmap || videoSize?.width) {
      setGlobal({
        cameraSetting: {
          width: bitmap?.width || videoSize?.width,
          height: bitmap?.height || videoSize?.height,
        },
      });
    }
  }, [bitmap, videoSize]);

  const loadingSize = useMemo(() => {
    return Math.round(((window.innerWidth - 600) / 1320) * 120);
  }, []);

  const handleSave = () => {
    setSaving(true);
    const func = createDeferred<{ pixels: Uint8Array; w: number; h: number }>();
    func.promise.then(({ pixels, w, h }) => {
      var tempCanvas = document.createElement("canvas");
      tempCanvas.width = w;
      tempCanvas.height = h;
      var tempCtx = tempCanvas.getContext("2d");
      // 创建一个ImageData对象并填充像素数据
      const fliped = flipPixels(pixels, w, h);
      var imageData = tempCtx.createImageData(w, h);
      imageData.data.set(fliped);
      // 将ImageData绘制到2D Canvas上
      tempCtx.putImageData(imageData, 0, 0);
      // 保存2D Canvas上的图像
      tempCanvas.toBlob(function (blob) {
        saveAs(blob);
        setSaving(false);
      });
    });
    NamaSDK.instance.save(func.resolve);
  };
  //console.log("whStyle", whStyle);
  return (
    <div className={classNames(styles.playerWrap, !isPc && styles.mobile)}>
      {(loadingCamera || loading || globalData.resetInitAgoraloading) && (
        <Mask className={styles.spin}>
          <div className={styles.loadingWrap}>
            <LoadingOutlined
              style={{
                fontSize: isPc ? loadingSize : "0.9rem",
                color: "#287cfa",
              }}
            />
            {/* <span className={styles.tip}>
              {(loading
                ? t("初始化")
                : t(loadingCamera ? "loading" : "ai资源加载中")) + "..."}
            </span> */}
          </div>
        </Mask>
      )}
      {!loadingCamera && noFace && !noDevice && !globalData.switchingCamera && (
        <Mask opacity={0.1} className={classNames(styles.spin, styles.noface)}>
          {t("未检测到人脸")}
        </Mask>
      )}
      {location.href.includes("__stat=true") && (
        <div className={styles.statistic}>
          <div>帧率：{statistic.fps.toFixed(1)}</div>
          <div>耗时：{statistic.rtt.toFixed(1)}</div>
          <div>
            分辨率：{statistic.resolution[0]}*{statistic.resolution[1]}
          </div>
        </div>
      )}
      {!!showCompare && (
        <div
          className={classNames(styles.compareBtn, !isPc && styles.mob)}
          onPointerDown={() => handlePress(true)}
          // onPointerUp={() => handlePress(false)}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "bottom left",
            bottom: isPc ? 20 : compareHeight,
          }}
        >
          {isPc ? (
            pressed ? (
              <span>
                <CompareIconActive />
              </span>
            ) : (
              <>
                <span className={styles.hover}>
                  <CompareIconActive />
                </span>
                <span className={styles.default}>
                  <CompareIcon />
                </span>
              </>
            )
          ) : (
            <MobCompareIcon />
          )}
        </div>
      )}
      {isUpload() && (
        <div className={styles.upload}>
          <Upload
            accept=".mp4,.jpg,.png"
            action=""
            beforeUpload={async (file: File) => {
              setUploading(true);
              setBitMap(null);
              setSrc(null);
              setVideoSize({ width: 0, height: 0 });
              if (src || bitmap) {
                NamaSDK.instance.resetInit();
              }
              if (file.type.includes("video")) {
                setSrc(URL.createObjectURL(file));
                getVideoPlayerInfo(file)
                  .then((res) => {
                    setVideoSize(res);
                  })
                  .catch(() => {
                    message.error("获取视频信息失败");
                  });
                return true;
              } else {
                return createImageBitmap(file)
                  .then((bit) => {
                    // 在这里处理您的ImageBitmap对象
                    setBitMap(bit);
                    return true;
                  })
                  .finally(() => {
                    setUploading(false);
                  });
              }
            }}
            fileList={null}
          >
            <Button
              loading={uploading}
              disabled={uploading}
              icon={<UploadOutlined />}
            >
              {src || bitmap ? "重新上传" : "上传"}
            </Button>
          </Upload>

          {(src || bitmap) && (
            <Button loading={saving} disabled={saving} onClick={handleSave}>
              {saving ? "保存中..." : "保存"}
            </Button>
          )}
        </div>
      )}
      <div
        style={whStyle.containerStyle}
        className={classNames(
          styles.canvasContainer,
          (src || bitmap) && styles.bitmap,
        )}
      >
        <canvas
          width={cameraSetting.width}
          height={cameraSetting.height}
          ref={cref}
          id={canvasId}
          style={
            isAgora()
              ? { ...whStyle.canvasStyle }
              : bitmap || src
              ? uploadCanvasStyle
              : { ...whStyle.canvasStyle, ...canvaAutoStyle }
          }
        ></canvas>
      </div>
      {isAgora() && (
        <>
          <div style={whStyle.containerStyle} className={styles.localUserWrap}>
            <div
              id={localUser}
              style={whStyle.canvasStyle}
              className={styles.localUser}
            >
              <span id="localUid" className={styles.uid}></span>
            </div>
          </div>
          <div
            id={remoteUser}
            className={styles.remoteUser}
            style={{
              width: agoraRemoteUserDomWidth[isPc ? "pc" : "h5"],
            }}
          >
            <span id="remoteUid" className={styles.uid}></span>
          </div>
        </>
      )}
      <video
        width={cameraSetting.width}
        height={cameraSetting.height}
        style={{ width: 100, height: 100 }}
        playsInline={true}
        crossOrigin="anonymous"
        muted={true}
        autoPlay
        loop={true}
        onCanPlay={() => {
          if (!isUpload()) return;
          const vi = document.getElementById(videoId) as HTMLVideoElement;
          if (vi) {
            setUploading(false);
            setVideoStream(vi as HTMLVideoElement);
          }
        }}
        id={videoId}
        src={src}
      ></video>
    </div>
  );
};
