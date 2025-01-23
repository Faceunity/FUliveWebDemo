import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CameraUnenableText,
  DeviceType,
  defaultFilterSliderValue,
} from "@/common/global";
import defaultConfig, {
  BundleEnum,
  DownloadState,
  TabOptionItem,
  getBundle,
  globalSettingKey,
  initValueMap,
  menuKey,
  panelConfig,
} from "@/common/defaultConfig";
import { produce } from "immer";
import {
  changeGlobalSwitch,
  getInitValue,
  getResolution,
  isAgora,
  isLowerIOS,
  IsLowerChrome,
  isUpload,
  testUA,
  updateSDKEffects,
  useWorker,
  valueToRaw,
} from "./tools";
import { PanelContext } from "@/components/ConfigPanelContext";
import { SliderValue } from "antd-mobile/es/components/slider";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import NamaSDK from "./namaSDK";
import { message } from "antd";
import defultConfig from "@/common/defaultConfig";
import { useGlobalStore } from "@/store";

export const useUA = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>(null);

  useEffect(() => {
    const judgeUA = () => {
      if (testUA()) {
        setDeviceType(DeviceType.MOBILE);
      } else {
        setDeviceType(DeviceType.PC);
      }
    };
    judgeUA();
    window.addEventListener("resize", judgeUA);
    return () => {
      window.removeEventListener("resize", judgeUA);
    };
  }, []);

  const isPc = useMemo(() => {
    return deviceType !== DeviceType.MOBILE;
  }, [deviceType]);

  return { isPc, deviceType };
};

export const useUserMedia = (videoId?: string) => {
  const [loadingCamera, setLoadingCamera] = useState<boolean>(false);
  const { t } = useTranslation();
  const deviceId = useRef<string>("");
  const initPermissionDenied = useRef<boolean>(false);
  const { setNoDevice } = useContext(PanelContext);
  const [videoStream, setVideoStream] = useState<
    MediaStream | HTMLVideoElement
  >(null);
  const { setGlobal } = useGlobalStore();

  function handlePermissionChange(state) {
    switch (state) {
      case "granted":
        console.log("Camera permission granted.");
        // 可以在这里执行摄像头相关的操作
        break;
      case "denied":
        console.log("Camera permission denied");
        if (initPermissionDenied.current) return;
        setNoDevice(true);
        alert(t(CameraUnenableText));
        break;
      case "prompt":
        console.log("Camera permission prompt.");
        // 处理需要用户确认权限的情况
        break;
      default:
        console.log("Unknown permission state:", state);
    }
  }

  useEffect(() => {
    const isMobile = testUA();
    if (isUpload()) {
      setLoadingCamera(false);
      return;
    }
    const func = () => {
      if (!navigator.mediaDevices) {
        console.log("navigator.mediaDevices not exist");
        return;
      }
      const wh = getResolution();
      const f = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: { ideal: wh.width }, height: { ideal: wh.height } },
      });
      console.log("打开摄像头", f);

      f.then((res) => {
        console.log("camera good", res);
        const v = res.getVideoTracks()[0];
        const settings = v.getSettings ? v.getSettings() : v.getCapabilities();
        // ios 低端机 会横竖屏反转问题
        if (isLowerIOS()||IsLowerChrome()) {
          const video = document.createElement("video");
          video.srcObject = new MediaStream([v]);
          video.onloadedmetadata = () => {
            setGlobal({
              cameraSetting: {
                width: video.videoWidth,
                height: video.videoHeight,
              },
            });
            setTimeout(() => {
              video.remove();
            }, 500);
          };
        } else {
          setGlobal({
            cameraSetting: {
              width: settings.width as unknown as number,
              height: settings.height as unknown as number,
            },
          });
        }

        if (!useWorker() && !isAgora() && videoId) {
          const video = document.getElementById(videoId) as HTMLVideoElement;
          console.log("video", video);
          if (!video) {
            console.log("找不到视频标签", video);
          } else {
            video.srcObject = res;
            setVideoStream(video);
          }
        } else {
          console.log("Current frame rate:", settings.frameRate);
          const track = res.getVideoTracks()[0].clone();
          //@ts-ignore
          const track_processor = new MediaStreamTrackProcessor(track);
          let reable_stream = track_processor.readable;
          setVideoStream(reable_stream);
        }
        deviceId.current = settings.deviceId;
        console.log("打开摄像头并成功设置视频流", res);
        setLoadingCamera(false);
      })
        .catch((err) => {
          initPermissionDenied.current = true;
          console.log("camera error", err);
          alert(t(CameraUnenableText));
          // videoTimer.current = setTimeout(func, 1000);
        })
        .finally(() => {
          if (!isMobile && navigator.permissions) {
            // 摄像头权限变更
            navigator.permissions
              .query({ name: "camera" as PermissionName })
              .then((permissionStatus) => {
                // 监听权限变化
                permissionStatus.onchange = () => {
                  handlePermissionChange(permissionStatus.state);
                };

                // 处理初始权限状态
                handlePermissionChange(permissionStatus.state);
              });
          }
        });
    };
    // 非声网逻辑
    if (!isAgora()) {
      setLoadingCamera(true);
      func();
    }

    const handleDeviceChange = () => {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const camera = devices.filter((device) => {
            return (
              device.kind === "videoinput" &&
              device.deviceId === deviceId.current
            );
          });
          if (camera.length > 0) {
            console.log("Cameras connected.");
          } else {
            alert(t(CameraUnenableText));
            console.log("No cameras connected.");
          }
        })
        .catch((err) => {
          console.error("Error accessing media devices.", err);
        });
    };
    // 检查浏览器是否支持mediaDevices
    if (
      !isMobile &&
      navigator.mediaDevices &&
      navigator.mediaDevices.addEventListener &&
      deviceId.current
    ) {
      // 监听设备变化事件
      navigator.mediaDevices.addEventListener(
        "devicechange",
        handleDeviceChange,
      );
    }

    return () => {
      if (
        !isMobile &&
        navigator.mediaDevices &&
        navigator.mediaDevices.addEventListener
      ) {
        // 监听设备变化事件
        navigator.mediaDevices.removeEventListener(
          "devicechange",
          handleDeviceChange,
        );
      }
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: "camera" as PermissionName })
          .then((permissionStatus) => {
            permissionStatus.onchange = null;
          });
      }
    };
  }, []);

  return {
    loadingCamera,
    videoStream,
    setVideoStream,
  };
};

export const useCaches = () => {
  const lastActiveCache = useRef({
    [menuKey.effects]: "",
    [menuKey.shaping]: "",
    [menuKey.filter]: "",
  });
  const effectsCacheRef = useRef({});
  const shapingCacheRef = useRef({});
  const filterCacheRef = useRef({});

  const updateCache = (
    key: menuKey,
    name: string,
    value?: number | string | boolean,
  ) => {
    if (key === menuKey.effects) {
      if (value === undefined) {
        delete effectsCacheRef.current[name];
      } else {
        effectsCacheRef.current[name] = value;
      }
    }
    if (key === menuKey.shaping) {
      if (value === undefined) {
        delete shapingCacheRef.current[name];
      } else {
        shapingCacheRef.current[name] = value;
      }
    }
    if (key === menuKey.filter) {
      if (value === undefined) {
        delete filterCacheRef.current[name];
      } else {
        filterCacheRef.current[name] = value;
      }
    }
    console.log(
      effectsCacheRef.current,
      shapingCacheRef.current,
      filterCacheRef.current,
      name,
      value,
      key,
    );
  };

  return {
    updateCache,
    effectsCacheRef,
    shapingCacheRef,
    filterCacheRef,
    lastActiveCache,
  };
};

export const useContent = () => {
  const { t } = useTranslation();
  const [tabContentList, setTabContentList] = useState<TabOptionItem[]>([]);
  const [resetCount, setResetCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<menuKey>(menuKey.effects); // 一开始就需要有默认值，否则会卡断流程无法加载bundle
  const [activeMenu, setActiveMenu] = useState<menuKey | "">(
    testUA() ? "" : menuKey.beauty,
  );
  const {
    updateCache,
    effectsCacheRef,
    shapingCacheRef,
    filterCacheRef,
    lastActiveCache,
  } = useCaches();
  const { panelData, setShowCompare, setCompareHeight } =
    useContext(PanelContext);
  const [switchV, setSwitchV] = useState<boolean>(true);
  const [currentItem, setCurrentItem] = useState<string>("");
  const countRef = useRef<number>(0);
  const [filterVal, setFilerVal] = useState<number>(0);
  const [activeBlock, setActiveBlock] = useState<string>("");
  const [meibaiGlobal, setMeibaiGlobal] = useState<string>(t("全局"));
  const [disableReset, setDisableReset] = useState<boolean>(true);

  const updateResetDisablity = (key) => {
    let res = false;
    if (key === menuKey.effects) {
      res = JSON.stringify(effectsCacheRef.current) === "{}";
    }
    if (key === menuKey.shaping) {
      res = JSON.stringify(shapingCacheRef.current) === "{}";
    }
    setDisableReset(res);
  };

  useEffect(() => {
    if (activeTab !== menuKey.filter) {
      updateResetDisablity(activeTab);
    }
  }, [activeTab]);
  const getTabContentList = (tab: menuKey, isReset?: boolean) => {
    setTabContentList(
      defaultConfig[tab].map((item: TabOptionItem) => {
        const cache =
          tab === menuKey.filter
            ? filterCacheRef.current
            : tab === menuKey.effects
            ? effectsCacheRef.current
            : shapingCacheRef.current;
        return {
          ...item,
          value:
            !isReset && cache[item.key] !== undefined
              ? cache[item.key]
              : getInitValue(item),
        };
      }),
    );
  };

  // 初始化
  useEffect(() => {
    getTabContentList(menuKey.effects);
  }, []);

  useEffect(() => {
    if (activeTab !== null) {
      const isReset = countRef.current !== resetCount;
      if (isReset) {
        getTabContentList(activeTab, isReset);
      }
      if (!isReset) {
        let item = defaultConfig[activeTab][0];
        const lastkey = lastActiveCache.current[activeTab];
        if (lastkey) {
          item = defaultConfig[activeTab].find((d) => d.key === lastkey);
        }
        const k = lastkey || item.key;
        // 重置的时候保留当前选择的
        setCurrentItem(k);
        if (activeTab !== menuKey.filter) {
          const cache =
            activeTab === menuKey.effects
              ? effectsCacheRef.current
              : shapingCacheRef.current;
          const hasCache = cache[k];
          // 移动端设置slider的初始值
          const v = hasCache === undefined ? getInitValue(item) : hasCache;
          setFilerVal(v);
        } else {
          const cache = filterCacheRef.current;
          const hasCache = cache[k];
          setFilerVal(
            hasCache === undefined
              ? initValueMap[k] !== undefined
                ? initValueMap[k]
                : defaultFilterSliderValue
              : hasCache,
          );
          setActiveBlock(k);
        }
      }
    }
  }, [activeTab, resetCount]);

  useEffect(() => {
    setShowCompare(activeMenu === menuKey.beauty);
    setCompareHeight(activeMenu === menuKey.beauty ? "3.9rem" : "1.96rem");
  }, [activeMenu]);

  useEffect(() => {
    countRef.current = resetCount;
  }, [resetCount]);

  const shouldDisbale = useMemo(() => {
    return !switchV && activeTab !== menuKey.filter;
  }, [switchV, activeTab]);

  const reset = useCallback(() => {
    if (shouldDisbale) return;
    const source: TabOptionItem[] = defaultConfig[activeTab];
    if (activeTab !== menuKey.filter) {
      const cache =
        menuKey.effects === activeTab
          ? effectsCacheRef.current
          : shapingCacheRef.current;
      source.forEach((item) => {
        if (item.key) {
          if (cache[item.key] !== undefined) {
            const v = getInitValue(item);
            updateSDKEffects(
              activeTab,
              {
                ...item,
                value: v,
              },
              v,
              panelData,
            );
            if (item.key === currentItem) {
              // 移动端需要单独修改下当前filterval（因为共用slider）
              setFilerVal(v);
            }
          }
        }
      });
      if (menuKey.effects === activeTab) {
        effectsCacheRef.current = {};
      } else {
        shapingCacheRef.current = {};
      }
      updateResetDisablity(activeTab);
      // 重置全局设置
      const gsCaches =
        activeTab === menuKey.effects
          ? effectsCacheRef.current
          : shapingCacheRef.current;
      const key = globalSettingKey[activeTab];
      if (gsCaches[key] !== undefined) {
        changeGlobalSwitch(activeTab, true);
        updateCache(activeTab, key);
      }
      setResetCount((d) => d + 1);
    }
  }, [activeTab, updateCache, currentItem, shouldDisbale]);

  const debounceSlider = useCallback(
    _.debounce(
      (v: SliderValue, opt: TabOptionItem) => {
        updateCache(activeTab, opt.key, v as unknown as number);
        updateSDKEffects(activeTab, opt, v as unknown as number, panelData);
        updateResetDisablity(activeTab);
      },
      !useWorker() ? 400 : 0,
    ),
    [panelData, activeTab, updateCache],
  );

  const handleSlider = useCallback(
    (v: SliderValue, i: number, opt: TabOptionItem) => {
      setTabContentList(
        produce(tabContentList, (draft) => {
          draft[i].value = v as number;
        }),
      );
      debounceSlider(v, opt);
    },
    [tabContentList, debounceSlider],
  );

  const handleInput = useCallback(
    (v: number, i: number, opt: TabOptionItem) => {
      setTabContentList(
        produce(tabContentList, (draft) => {
          draft[i].value = v;
        }),
      );
      debounceSlider(v, opt);
    },
    [activeTab, tabContentList],
  );

  const closeEffects = useCallback(
    (open: boolean) => {
      if (NamaSDK.instance) {
        const effects = defultConfig[menuKey.effects];
        effects.forEach((opt) => {
          const cache = effectsCacheRef.current[opt.key];
          if (opt.key === "磨皮") {
            // 磨皮需要特殊处理
            const typeVal = panelData[opt.key];
            NamaSDK.instance.setParams(
              BundleEnum.face_beautification,
              menuKey.effects,
              "blur_type",
              typeVal,
            );
            NamaSDK.instance.setParams(
              BundleEnum.face_beautification,
              menuKey.effects,
              "blur_level",
              !open
                ? 0
                : valueToRaw(
                    cache === undefined ? getInitValue(opt) : cache,
                    opt.reflexType,
                  ),
            );
          } else {
            let k = opt.fuKey;
            if (!opt.fuKey) {
              k = panelData[opt.key] || panelConfig[opt.key].use;
            }
            NamaSDK.instance.setParams(
              BundleEnum.face_beautification,
              menuKey.effects,
              k,
              !open
                ? 0
                : valueToRaw(
                    cache === undefined ? getInitValue(opt) : cache,
                    opt.reflexType,
                  ),
            );
          }
        });
      } else {
        console.log("关闭美颜失败，未找到NamaSDK");
      }
    },
    [panelData],
  );
  const handeSwitch = useCallback(
    (v) => {
      const k = globalSettingKey[activeTab];
      if (activeTab === menuKey.effects) {
        // is_beauty_on 是全局的，关闭美肤不能用这个，会影响美型
        closeEffects(v);
      } else {
        changeGlobalSwitch(activeTab, v);
      }
      updateCache(activeTab, k, v);
      setSwitchV(v);
      if (!v) {
        message.info(
          activeTab === menuKey.effects
            ? t("美肤效果已关闭")
            : t("美型效果已关闭"),
        );
      }
    },
    [
      activeTab,
      updateCache,
      closeEffects,
      changeGlobalSwitch,
      updateCache,
      setSwitchV,
      panelData,
    ],
  );

  const changeFilter = useCallback(
    (key, value) => {
      const bundle = getBundle(activeTab);
      NamaSDK.instance.setParams(bundle, activeTab, key, valueToRaw(value, 1));
    },
    [activeTab],
  );

  const handleFilter = useCallback(
    (key) => {
      let v =
        initValueMap[key] !== undefined
          ? initValueMap[key]
          : defaultFilterSliderValue;
      if (filterCacheRef.current[key] !== undefined) {
        v = filterCacheRef.current[key];
      } else {
        updateCache(menuKey.filter, key, v);
      }
      setFilerVal(v);
      setActiveBlock(key);
      changeFilter(key, v);
      setCurrentItem(key);
      lastActiveCache.current[menuKey.filter] = key;
    },
    [changeFilter, updateCache, filterVal],
  );

  const handleFilterSlider = useCallback(
    (key, v) => {
      updateCache(menuKey.filter, key, v);
      changeFilter(key, v);
    },
    [changeFilter],
  );

  const handleFilterNone = useCallback(() => {
    const bundle = getBundle(activeTab);
    NamaSDK.instance.setParams(bundle, activeTab, "", 0);
    setFilerVal(0);
    setActiveBlock("None");
    setCurrentItem("None");
    lastActiveCache.current[menuKey.filter] = "None";
  }, [activeMenu, activeTab]);

  const updateSwitch = useCallback(() => {
    const k = globalSettingKey[activeTab];
    if (activeTab === menuKey.effects) {
      if (effectsCacheRef.current[k] !== undefined) {
        setSwitchV(effectsCacheRef.current[k]);
      } else {
        setSwitchV(true);
      }
    }
    if (activeTab === menuKey.shaping) {
      if (shapingCacheRef.current[k] !== undefined) {
        setSwitchV(shapingCacheRef.current[k]);
      } else {
        setSwitchV(true);
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== menuKey.filter) {
      updateSwitch();
    }
  }, [activeTab, updateSwitch]);

  const handleMeibaiSet = useCallback(
    (v) => {
      setMeibaiGlobal(v);
      const bundle = getBundle(activeTab);
      NamaSDK.instance.setParams(
        bundle,
        menuKey.effects,
        "enable_skinseg",
        v === "全局" ? 0 : 1,
      );
    },
    [activeTab],
  );

  return {
    activeMenu,
    activeTab,
    setActiveTab,
    setActiveMenu,
    tabContentList,
    reset,
    handleSlider,
    handleInput,
    handeSwitch,
    switchV,
    setSwitchV,
    updateCache,
    currentItem,
    setCurrentItem,
    handleFilter,
    filterVal,
    setFilerVal,
    activeBlock,
    setActiveBlock,
    handleFilterNone,
    handleMeibaiSet,
    meibaiGlobal,
    shouldDisbale,
    disableReset,
    lastActiveCache,
    effectsCacheRef,
    shapingCacheRef,
    filterCacheRef,
    handleFilterSlider,
    getTabContentList,
  };
};

export const useScale = () => {
  const { isPc } = useUA();
  const [scale, setScale] = useState<number>(1);

  useLayoutEffect(() => {
    const rect = document.body.getBoundingClientRect();
    setScale(isPc ? 1 : rect.width / 750);
  }, [isPc]);

  return {
    scale,
  };
};

export enum StickerStauts {
  None,
  Downloaded,
  Downloading,
}

interface StickersStatusMap {
  [n: string]: StickerStauts;
}

export const useStickers = () => {
  const [bundleDownloadedStickers, setBundleDownloadedStickers] =
    useState<StickersStatusMap>({});
  const [activeSticker, setActiveSticker] = useState<string>("");
  const ref = useRef<StickersStatusMap>({});
  const creatingRef = useRef<boolean>(false);
  const [creating, setCreating] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    NamaSDK.instance.on("creating", (v) => {
      creatingRef.current = v;
      const key = v ? v.split(".bundle")[0] : "";
      if (key) {
        setActiveSticker(key);
      }
      setCreating(key);
    });
  }, []);

  useEffect(() => {
    ref.current = bundleDownloadedStickers;
  }, [bundleDownloadedStickers]);

  const handleClickBlock = ({ key, bundle }) => {
    if (creatingRef.current) {
      message.info(t("加载中，请稍后"));
      return;
    }
    if (!ref.current[key]) {
      setBundleDownloadedStickers((prev) =>
        produce(prev, (draft) => {
          draft[key] = StickerStauts.Downloading;
        }),
      );
    }
    NamaSDK.instance.setStciker(bundle, (res) => {
      setBundleDownloadedStickers((prev) =>
        produce(prev, (draft) => {
          draft[key] =
            res === DownloadState.Success
              ? StickerStauts.Downloaded
              : StickerStauts.None;
        }),
      );
    });
  };

  const handleNone = () => {
    if (creatingRef.current) {
      message.info(t("加载中，请稍后"));
      return;
    }
    NamaSDK.instance.clearSticker();
    setActiveSticker("None");
  };

  return {
    handleClickBlock,
    activeSticker,
    stickerList: defaultConfig[menuKey.sticker],
    bundleDownloadedStickers,
    setActiveSticker,
    handleNone,
    creating,
  };
};
