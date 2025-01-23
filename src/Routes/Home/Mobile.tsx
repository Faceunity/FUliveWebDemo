import { VideoPlayer } from "@/components/VideoPlayer";
import styles from "./index.module.less";
import { CDNBase, MenuItem } from "@/common/global";
import { useTranslation } from "react-i18next";
import defaultConfig, { TabOptionItem, menuKey } from "@/common/defaultConfig";
import { StickerStauts, useContent, useStickers, useUA } from "@/utils/hooks";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import Beauty from "@/assets/mobIcons/Beauty.png";
import Sticker from "@/assets/mobIcons/Sticker.png";
import Recover from "@/assets/mobIcons/icon_reset_nor.png";
import Original from "@/assets/mobIcons/original.png";
import { Dialog, Divider, Switch } from "antd-mobile";
import { Spin } from "antd";
import { PanelContext } from "@/components/ConfigPanelContext";
import { getInitValue, updateSDKEffects } from "@/utils/tools";
import _ from "lodash";
import { FuSlider } from "@/components/Slider";

enum IconStatus {
  default,
  changed,
  active,
  changedActive,
}

export const MobileHome: React.FC = () => {
  const { t } = useTranslation();
  const {
    tabContentList,
    activeTab,
    reset,
    setActiveTab,
    setActiveMenu,
    activeMenu,
    handleSlider,
    handeSwitch,
    switchV,
    // handleMeibaiSet,
    updateCache,
    effectsCacheRef,
    shapingCacheRef,
    currentItem,
    setCurrentItem,
    handleFilter,
    handleFilterNone,
    activeBlock,
    filterVal,
    setFilerVal,
    // meibaiGlobal,
    shouldDisbale,
    lastActiveCache,
    handleFilterSlider,
    getTabContentList,
    disableReset,
  } = useContent();
  const [index, setIndex] = useState<number>(0);
  const {
    handleClickBlock,
    bundleDownloadedStickers,
    stickerList,
    activeSticker,
    handleNone,
    creating,
  } = useStickers();
  const { panelData, isReady } = useContext(PanelContext);
  const { isPc } = useUA();

  const iconIndex = useCallback(
    (item: TabOptionItem) => {
      let res = IconStatus.default;
      if (activeTab !== menuKey.filter) {
        if (item.key !== currentItem) {
          res = item.value ? IconStatus.changed : IconStatus.default;
        } else {
          res = item.value ? IconStatus.changedActive : IconStatus.active;
        }
      }
      return res;
    },
    [currentItem, activeTab],
  );

  const menus: MenuItem[] = [
    {
      key: menuKey.beauty,
      label: t("美颜"),
      icon: Beauty,
      children: [
        {
          key: menuKey.effects,
          label: "美肤",
        },
        {
          key: menuKey.shaping,
          label: "美型",
        },
        {
          key: menuKey.filter,
          label: "滤镜",
        },
      ],
    },
    {
      key: menuKey.sticker,
      label: t("贴纸"),
      icon: Sticker,
    },
  ];

  const tabMenu = useMemo(() => {
    if (activeMenu === menuKey.beauty) {
      return menus[0].children;
    }
    return [];
  }, [activeMenu]);

  const onSlider = useCallback(
    (v) => {
      setFilerVal(v as unknown as number);
      if (activeTab === menuKey.filter) {
        handleFilterSlider(activeBlock, v);
      } else {
        handleSlider(v, index, tabContentList[index]);
      }
    },
    [
      index,
      tabContentList,
      activeTab,
      updateCache,
      handleSlider,
      activeBlock,
      handleFilterSlider,
    ],
  );

  const handleBeautyItemClick = useCallback(
    (item: TabOptionItem, i: number) => {
      const cache =
        activeTab === menuKey.effects
          ? effectsCacheRef.current
          : shapingCacheRef.current;
      setIndex(i);
      const v =
        cache[item.key] !== undefined
          ? cache[item.key]
          : getInitValue(item) || 0;
      updateSDKEffects(activeTab, item, v, panelData);
      setFilerVal(v);
    },
    [activeTab, panelData],
  );

  const handleReset = useCallback(() => {
    Dialog.confirm({
      content: t("是否将所有参数恢复到默认值？"),
      onConfirm: reset,
      confirmText: t("确认"),
      cancelText: t("取消"),
    });
  }, [reset]);

  useEffect(() => {
    const el = document.getElementById("scrollConent");
    if (el) {
      el.scrollLeft = 0;
    }
  }, [activeTab]);

  const spinning = useMemo(
    () => (item) => {
      return (
        bundleDownloadedStickers[item.key] === StickerStauts.Downloading ||
        item.key === creating
      );
    },
    [bundleDownloadedStickers, creating],
  );

  return (
    <div className={styles.mobileContent}>
      <VideoPlayer />
      <div className={styles.actions}>
        <div
          className={classNames(
            !isPc && activeMenu !== "" && styles.hidden,
            styles.menu,
          )}
        >
          {menus.map((item) => (
            <div
              key={item.key}
              className={styles.menuItem}
              style={!isReady ? { opacity: 0.5, cursor: "not-allowed" } : {}}
              onClick={(e) => {
                if (!isReady) return;
                e.stopPropagation();
                setActiveMenu(item.key);
              }}
            >
              <img src={item.icon as string} alt="" />
              <span className={styles.text}>{item.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.contentWrap} onClick={() => setActiveMenu("")}>
          <div
            className={styles.tabMenuWrap}
            onClick={(e) => e.stopPropagation()}
          >
            {activeMenu !== "" ? (
              <div
                className={classNames(
                  styles.tabMenu,
                  activeMenu === menuKey.sticker && styles.sticker,
                )}
              >
                {(activeMenu as menuKey) === menuKey.beauty ? (
                  <>
                    <div
                      className={classNames(
                        styles.menuHd,
                        // currentItem === "美白" && styles.largePadding
                      )}
                    >
                      {/* {currentItem === "美白" && (
                        <div
                          className={classNames(
                            styles.gloablSet,
                            !switchV && styles.disabled
                          )}
                        >
                          {meiBaiOPts.map((item) => (
                            <div
                              key={item}
                              onClick={() => {
                                if (!switchV) return;
                                handleMeibaiSet(item);
                              }}
                              className={classNames(
                                meibaiGlobal === item && styles.active,
                                styles.segText
                              )}
                            >
                              {t(item)}
                            </div>
                          ))}
                        </div>
                      )} */}
                      <div className={styles.slider}>
                        <FuSlider
                          popover={true}
                          value={filterVal}
                          onChange={onSlider}
                          isPc={false}
                          origin={
                            activeTab !== menuKey.filter &&
                            tabContentList[index]?.range?.[0] < 0
                              ? 0
                              : undefined
                          }
                          min={
                            activeTab !== menuKey.filter
                              ? tabContentList[index]?.range?.[0]
                              : 0
                          }
                          max={
                            activeTab !== menuKey.filter
                              ? tabContentList[index]?.range?.[1]
                              : 100
                          }
                          disabled={shouldDisbale || currentItem === "None"}
                        />
                      </div>
                    </div>
                    <div id="scrollConent" className={styles.menuContent}>
                      {activeTab !== menuKey.filter ? (
                        <>
                          <div
                            className={classNames(
                              styles.item,
                              (disableReset || !isReady || !switchV) &&
                                styles.disabled,
                            )}
                            onClick={() => {
                              if (disableReset || !isReady || !switchV) return;
                              handleReset();
                            }}
                          >
                            <img src={Recover} alt="" />
                            {t("恢复")}
                          </div>
                          <Divider direction="vertical" />
                          <div className={styles.item}>
                            <div className={styles.switchWrap}>
                              <Switch
                                style={{
                                  "--height": "0.48rem",
                                  "--width": "0.88rem",
                                }}
                                checked={switchV}
                                onChange={handeSwitch}
                              />
                            </div>
                            <span>{t(switchV ? t("开启") : "关闭")}</span>
                          </div>
                          {tabContentList.map((item, i) => (
                            <div
                              id={item.key}
                              key={item.key}
                              onClick={() => {
                                if (!switchV) return;
                                handleBeautyItemClick(item, i);
                                lastActiveCache.current[activeTab] = item.key;
                                setCurrentItem(item.key);
                              }}
                              className={classNames(
                                styles.item,
                                currentItem === item.key && styles.active,
                                !switchV && styles.disabled,
                              )}
                            >
                              <img
                                src={item.MobIcons[iconIndex(item)]}
                                alt=""
                              />
                              {t(item.label)}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <div
                            className={classNames(styles.filterItem)}
                            onClick={handleFilterNone}
                          >
                            <div
                              className={classNames(
                                styles.none,
                                currentItem === "None" && styles.active,
                              )}
                            >
                              <img src={Original} alt="" />
                            </div>
                            <span>{t("原图")}</span>
                          </div>
                          {tabContentList.map((item) => (
                            <div
                              key={item.key}
                              onClick={() => {
                                handleFilter(item.key);
                              }}
                              className={classNames(
                                styles.filterItem,
                                currentItem === item.key && styles.active,
                              )}
                              id={item.key}
                            >
                              <img
                                crossOrigin="anonymous"
                                src={`${CDNBase}/demo_icon_${item.key}.png`}
                              />
                              <span>{t(item.label) + item.index}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    <div className={styles.opts}>
                      {tabMenu.map((item) => (
                        <div
                          onClick={() => {
                            // 获取上一个选项
                            const optKey = lastActiveCache.current[item.key];
                            const idx = defaultConfig[item.key].findIndex(
                              (d) => d.key === optKey,
                            );
                            // 这里需要重置
                            setIndex(idx < 0 ? 0 : idx);
                            setActiveTab(item.key);
                            getTabContentList(item.key);
                            setTimeout(() => {
                              // 回滚到可视区域
                              const ft = parseFloat(
                                window
                                  .getComputedStyle(document.body)
                                  .getPropertyValue("font-size"),
                              );
                              const dis = idx > 0 ? 1.95 * (idx + 2) * ft : 0;
                              const scroll =
                                document.getElementById("scrollConent");
                              if (scroll) {
                                scroll.scrollLeft = dis;
                              }
                            }, 300);
                          }}
                          key={item.key}
                          className={classNames(
                            styles.menuOPt,
                            activeTab === item.key && styles.active,
                          )}
                        >
                          {t(item.label)}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={classNames(styles.menuContent)}>
                    <div
                      className={classNames(styles.filterItem)}
                      onClick={handleNone}
                    >
                      <div
                        className={classNames(
                          styles.none,
                          activeSticker === "None" && styles.active,
                        )}
                      >
                        <img src={Original} alt="" />
                      </div>
                    </div>
                    {stickerList.map((item) => (
                      <div
                        onClick={() => handleClickBlock(item)}
                        key={item.key}
                        className={classNames(
                          item.key == activeSticker && styles.active,
                          styles.filterItem,
                        )}
                        // style={{
                        //   opacity: !bundleDownloadedStickers[item.key]
                        //     ? 0.4
                        //     : 1,
                        // }}
                      >
                        {spinning(item) && (
                          <div className={styles.loading}>
                            <Spin spinning={spinning(item)}></Spin>
                          </div>
                        )}
                        <img
                          crossOrigin="anonymous"
                          src={`${CDNBase}/${item.key}.png`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
