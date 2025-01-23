import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { enableMapSet } from "immer";
enableMapSet();

interface WH {
  width: number;
  height: number;
}

interface GlobalDataType {
  cameraSetting: WH;
  switchingCamera: boolean; //是否再切换前后摄像头
  resetInitAgoraloading: boolean; //agora 是否退出重进后在初始化
}

type StoreState = {
  globalData: GlobalDataType;
};

type StoreAction = {
  setGlobal: (v: Partial<GlobalDataType>) => void;
};

const globalData: GlobalDataType = {
  cameraSetting: { width: 0, height: 0 },
  switchingCamera: false,
  resetInitAgoraloading: false,
};

export const useGlobalStore = create<StoreState & StoreAction>()(
  devtools(
    immer((set) => ({
      globalData,
      setGlobal: (payload) =>
        set((state) => {
          Object.keys(payload).forEach((k) => {
            state.globalData[k] = payload[k];
          });
        }),
    })),
  ),
);
