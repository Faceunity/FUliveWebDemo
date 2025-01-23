import { ReactNode } from "react";
import { menuKey } from "./defaultConfig";

export enum DeviceType {
  PC,
  MOBILE,
}

const origin = "https://fu-sdk.oss-cn-hangzhou.aliyuncs.com";

export const CDNBase = origin + "/WebDemo/" + import.meta.env.VITE_APP_ENV;

export interface PanelData {
  去黑眼圈: string;
  去法令纹: string;
  大眼: string;
  嘴型: string;
  磨皮: number;
}

export interface MenuItem {
  key: menuKey;
  label: string;
  icon?: ReactNode | string;
  activeIcon?: ReactNode;
  children?: MenuItem[];
}

export const defaultFilterSliderValue = 40; // 上层值

export interface OptItem {
  key: "zh" | "en";
  pcLabel: string;
  mobileLabel: string;
}

export const Options: OptItem[] = [
  {
    key: "zh",
    pcLabel: "中文",
    mobileLabel: "中",
  },
  {
    key: "en",
    pcLabel: "English",
    mobileLabel: "En",
  },
];

export const meiBaiOPts = ["全局", "仅皮肤"];

export interface Statistic {
  fps: number;
  rtt: number;
  resolution: [number, number];
}

export const CameraUnenableText = "摄像头或麦克风中断，请手动刷新页面";

export const videoId = "nmVideoElement";

export const canvasId = "namaCanvas";

export const localUser = "localuserContainer";
export const remoteUser = "remoteuserContainer";
export const remoteItemUser = "remoteItemUser";

export const agoraOptions = {
  // Pass your App ID here.
  appId: undefined,
  // Pass your temp token here.
  token: undefined,
};

/**
 * agora remote user dom width 兼容pc h5
 */
export const agoraRemoteUserDomWidth = {
  pc: 320,
  h5: 160,
};

export enum SDKEnumerator {
  SIMD = "SIMD",
  LOW = "LOW",
}
