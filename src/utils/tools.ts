import {
  TabOptionItem,
  getBundle,
  globalSettingKey,
  initValueMap,
  menuKey,
} from "@/common/defaultConfig";
import NamaSDK from "./namaSDK";
import { PanelData } from "@/common/global";

export const reflexMap = {
  1: {
    vtr: (v) => v / 100,
    rtv: (v) => 100 * v,
  },
  2: {
    vtr: (v) => (v + 50) / 100,
    rtv: (v) => 100 * v - 50,
  },
  3: {
    vtr: (v) => (v * 6) / 100,
    rtv: (v) => (100 * v) / 6,
  },
};

export const valueToRaw = (v: number, reflexType: number) => {
  return reflexMap[reflexType || 1].vtr(v);
};

export const rowToValue = (v: number, reflexType: number) => {
  return reflexMap[reflexType || 1].rtv(v);
};

export const updateSDKEffects = (
  tab: menuKey,
  opt: TabOptionItem,
  v: number,
  panelData: PanelData,
) => {
  const bundle = getBundle(tab);
  if (opt.key === "磨皮") {
    // 磨皮需要特殊处理
    const typeVal = panelData[opt.key];
    NamaSDK.instance.setParams(bundle, tab, "blur_type", typeVal);
    NamaSDK.instance.setParams(
      bundle,
      tab,
      "blur_level",
      valueToRaw(v as unknown as number, opt.reflexType),
    );
  } else {
    const fuKey = opt.fuKey ? opt.fuKey : panelData[opt.key];
    NamaSDK.instance.setParams(
      bundle,
      tab,
      fuKey,
      valueToRaw(v as unknown as number, opt.reflexType),
    );
  }
};

export const changeGlobalSwitch = (tab: menuKey, v: boolean) => {
  const k = globalSettingKey[tab];
  const bundle = getBundle(tab);
  NamaSDK.instance.setParams(bundle, tab, k, v ? 1 : 0);
};

export const testUA = () => {
  const regex = /Mobi|Android|iPhone/i;
  return navigator.userAgent && regex.test(navigator.userAgent);
};

export const getBottomSafeAreaHeight = () => {
  return document.documentElement.clientHeight - window.innerHeight;
};

export const getResolution = () => {
  // 不管手机还是pc拿相机的时候都这么设置
  // 否则手机端画面会拉伸（内部应该会做处理）
  return {
    width: 1280,
    height: 720,
  };
};

// 没有offscreencanvas才有主线程
export const isSafari = () => {
  const regex = /Safari/i;
  return (
    navigator.userAgent &&
    regex.test(navigator.userAgent) &&
    !/Chrome/.test(navigator.userAgent)
  );
};
export const IsLowerChrome = () => {
  const match = navigator.userAgent.match(/Chrome\/(\d+)/);
  if (match) {
    return parseInt(match[1], 10) < 86;
  }
  return false;
}
/**
 * 是否是iphone
 * @returns boolea
 */
export const isIphone = () => {
  const ua = navigator.userAgent;
  return /iPhone/i.test(ua);
};
export const isLowerIOS = () => {
  const ua = navigator.userAgent;
  // 判断iphone、ipad、macos 小于15.6
  const isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    const iOSVersion = parseFloat(ua.match(/OS (\d+)_(\d+)_?(\d+)?/)[1]);
    return iOSVersion < 15.6;
  }
  
};
/**
 * 判断是否 不支持Wasm SIMD
 * Chrome < 91
 * Edge < 91
 * Safari < 16.4
 * Firefox < 89
 * @returns boolean
 */
export const notWasmSimdSupported = () => {
  const ua = navigator.userAgent;
  // 正则表达式匹配浏览器名称和版本
  const chromeMatch = ua.match(/Chrome\/(\d+)/);
  const edgeMatch = ua.match(/Edg\/(\d+)/);
  const firefoxMatch = ua.match(/Firefox\/(\d+)/);
  const safariMatch = ua.match(/Version\/([\d.]+).*Safari/i);

  // 检测浏览器版本
  if (chromeMatch && !edgeMatch) {
    const chromeVersion = parseInt(chromeMatch[1], 10);
    return chromeVersion < 91;
  }

  if (edgeMatch) {
    const edgeVersion = parseInt(edgeMatch[1], 10);
    return edgeVersion < 91;
  }

  if (firefoxMatch) {
    const firefoxVersion = parseInt(firefoxMatch[1], 10);
    return firefoxVersion < 89;
  }

  if (safariMatch) {
    const safariVersion = parseFloat(safariMatch[1]); // Safari 的版本可能是小数
    console.log("safariVersion", safariVersion);
    return safariVersion < 16.4;
  }

  // 如果未匹配到任何支持的浏览器，则返回 false
  return false;
};
export function checkStreamTransferable() {
  try {
    const { readable, writable } = new TransformStream(); // 创建一个 TransformStream
    const messageChannel = new MessageChannel();
    // 尝试将 readable 作为 Transferable 对象传递
    messageChannel.port1.postMessage({ readable, writable }, [
      readable,
      writable,
    ]);
    return true; // 如果没有抛出错误，说明支持
  } catch (e) {
    return false; // 如果抛出错误，说明不支持
  }
}
export const useWorker = () => {
  // 支持离屏渲染， 支持VideoFrame  支持 isReadableStreamTransferable
  const isStreamTransferable = checkStreamTransferable();
  const isFireFox = navigator.userAgent.includes("Firefox");
  return (
    !!window.OffscreenCanvas &&
    isStreamTransferable &&
    "VideoFrame" in window &&
    !isFireFox
  );
};

export const isAgora = () => {
  return location.pathname.includes("/agora");
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const isPureAgora = () => {
  return isAgora() && location.href.includes("__pureAgora=true");
};

export const isUpload = () => {
  return location.href.includes("__upload=true");
};

export function createDeferred<T>() {
  let resolve, reject;
  const promise = new Promise((res: (v: T) => void, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

export function flipPixels(pixels, width, height) {
  const flippedPixels = new Uint8ClampedArray(pixels.length);
  const bytesPerPixel = 4; // RGBA: 4 bytes per pixel

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // 原始像素的位置
      const srcIndex = (y * width + x) * bytesPerPixel;
      // 翻转后像素的新位置：x 和 y 都反转
      const dstIndex = ((height - 1 - y) * width + x) * bytesPerPixel; // 上下翻转
      // ((height - 1 - y) * width + (width - 1 - x)) * bytesPerPixel; // 上下左右翻转

      // 将原始像素复制到新的位置
      for (let b = 0; b < bytesPerPixel; b++) {
        flippedPixels[dstIndex + b] = pixels[srcIndex + b];
      }
    }
  }
  return flippedPixels;
}

export const getInitValue = (item: TabOptionItem) => {
  return initValueMap[item.fuKey] !== undefined
    ? initValueMap[item.fuKey]
    : item.initValue;
};

// 获取视频信息
export const getVideoPlayerInfo = (
  file,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement("video");
    videoElement.src = URL.createObjectURL(file);
    videoElement.addEventListener("loadedmetadata", function () {
      resolve({
        width: videoElement.videoWidth,
        height: videoElement.videoHeight,
      });
    });
    videoElement.addEventListener("error", (err) => {
      console.error("getVideoPlayerInfo err", err);
      reject(err);
    });
  });
};
