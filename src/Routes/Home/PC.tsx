import { VideoPlayer } from "@/components/VideoPlayer";
import styles from "./index.module.less";
import { useTranslation } from "react-i18next";
import {
  ActiveBeautyIcon,
  ActiveStickerIcon,
  BeautyIcon,
  NoneIcon,
  StickerIcon,
} from "@/assets/Svg";
import classNames from "classnames";
import { Switch, Tabs, Button } from "antd-mobile";
import { menuKey } from "@/common/defaultConfig";
import { CDNBase, MenuItem } from "@/common/global";
import _ from "lodash";
import { InputNumber, Modal, Spin } from "antd";
import { StickerStauts, useContent, useStickers } from "@/utils/hooks";
import { useCallback, useContext, useMemo } from "react";
import { FuSlider } from "@/components/Slider";
import { PanelContext } from "@/components/ConfigPanelContext";

export const PcHome: React.FC = () => {
  const { t } = useTranslation();
  const {
    tabContentList,
    activeMenu,
    activeTab,
    reset,
    setActiveTab,
    setActiveMenu,
    handleSlider,
    handleInput,
    handeSwitch,
    switchV,
    // handleMeibaiSet,
    handleFilter,
    handleFilterNone,
    activeBlock,
    filterVal,
    setFilerVal,
    disableReset,
    // meibaiGlobal,
    handleFilterSlider,
    getTabContentList,
  } = useContent();

  const {
    handleClickBlock,
    bundleDownloadedStickers,
    stickerList,
    activeSticker,
    handleNone,
    creating,
  } = useStickers();

  const { isReady } = useContext(PanelContext);

  const menus: MenuItem[] = [
    {
      key: menuKey.beauty,
      label: t("美颜"),
      icon: <BeautyIcon />,
      activeIcon: <ActiveBeautyIcon />,
      children: [
        {
          key: menuKey.effects,
          label: t("美肤"),
        },
        {
          key: menuKey.shaping,
          label: t("美型"),
        },
        {
          key: menuKey.filter,
          label: t("滤镜"),
        },
      ],
    },
    {
      key: menuKey.sticker,
      label: t("贴纸"),
      icon: <StickerIcon />,
      activeIcon: <ActiveStickerIcon />,
    },
  ];

  const handleReset = useCallback(() => {
    Modal.confirm({
      centered: true,
      okText: t("确认"),
      cancelText: t("取消"),
      content: t("是否将所有参数恢复到默认值？"),
      onOk: reset,
    });
  }, [reset]);

  const handleOnSlider = useCallback(
    (v) => {
      setFilerVal(v);
      handleFilterSlider(activeBlock, v);
    },
    [handleFilterSlider, activeBlock],
  );

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
    <div className={styles.pcContent}>
      <VideoPlayer />
      <div className={styles.actions}>
        <div className={styles.menu}>
          {menus.map((item) => (
            <div
              key={item.key}
              className={classNames(
                activeMenu === item.key && styles.active,
                styles.menuItem,
                !isReady && styles.disabled,
              )}
              onClick={() => {
                if (!isReady) return;
                setActiveMenu(item.key);
              }}
            >
              <span className={styles.icon}>
                {activeMenu === item.key ? item.activeIcon : item.icon}
              </span>
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles.options}>
          {activeMenu === menuKey.beauty ? (
            <Tabs
              activeKey={activeTab.toString()}
              style={{ height: "100%" }}
              onChange={(v) => {
                const tab = parseInt(v) as unknown as menuKey;
                setActiveTab(tab);
                getTabContentList(tab);
              }}
            >
              {menus[0].children.map((item) => (
                <Tabs.Tab disabled={!isReady} title={item.label} key={item.key}>
                  {[menuKey.effects, menuKey.shaping].includes(item.key) && (
                    <>
                      <div className={styles.gloablSwitch}>
                        <label>{t("开关")}</label>
                        <Switch
                          disabled={!isReady}
                          checked={switchV}
                          onChange={handeSwitch}
                        />
                        <span>{t(switchV ? t("开启") : "关闭")}</span>
                      </div>
                      <div className={styles.optList}>
                        {tabContentList.map((opt, i) => (
                          <div className={styles.optItem} key={opt.key}>
                            {/* {opt.key === "美白" && (
                              <div className={styles.fanwei}>
                                <Segmented
                                  value={meibaiGlobal}
                                  onChange={handleMeibaiSet}
                                  options={meiBaiOPts.map((val) => ({
                                    label: t(val),
                                    value: val,
                                  }))}
                                  disabled={!isReady}
                                />
                              </div>
                            )} */}
                            <div className={styles.iconLabel}>
                              {opt.PcIcon}
                              {t(opt.label)}
                            </div>
                            <FuSlider
                              value={opt.value}
                              onChange={(v) => handleSlider(v, i, opt)}
                              min={opt.range[0]}
                              max={opt.range[1]}
                              isPc={true}
                              origin={opt.range[0] < 0 ? 0 : undefined}
                              disabled={!switchV || !isReady}
                              style={{ flex: 1 }}
                            />
                            <InputNumber
                              min={opt.range[0]}
                              max={opt.range[1]}
                              controls={false}
                              changeOnWheel={false}
                              disabled={!switchV || !isReady}
                              style={{ width: 62, height: 32, marginLeft: 20 }}
                              value={opt.value}
                              onChange={(v) => handleInput(v, i, opt)}
                              formatter={(v) => {
                                return !parseInt(v as unknown as string)
                                  ? "0"
                                  : v.toString();
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {item.key === menuKey.filter && (
                    <div className={styles.listFilter}>
                      <div className={styles.blockWrap}>
                        <div
                          key={-1}
                          className={classNames(
                            styles.filterBlock,
                            styles.none,
                            "None" == activeBlock && styles.active,
                          )}
                          onClick={handleFilterNone}
                        >
                          <NoneIcon />
                        </div>
                        <span>{t("原图")}</span>
                      </div>
                      {activeTab === menuKey.filter &&
                        tabContentList.map((item) => (
                          <div
                            onClick={() => handleFilter(item.key)}
                            key={item.key}
                            className={classNames(styles.blockWrap)}
                          >
                            <div
                              className={classNames(
                                item.key == activeBlock && styles.active,
                                styles.filterBlock,
                              )}
                            >
                              <img
                                crossOrigin="anonymous"
                                src={`${CDNBase}/demo_icon_${item.key}.png`}
                              />
                            </div>
                            <span>{t(item.label) + item.index}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </Tabs.Tab>
              ))}
            </Tabs>
          ) : (
            <div className={styles.listFilter}>
              <div
                key={-1}
                className={classNames(
                  styles.filterBlock,
                  styles.none,
                  "None" == activeSticker && styles.active,
                )}
                onClick={handleNone}
              >
                <NoneIcon />
              </div>
              {stickerList.map((item) => (
                <div
                  onClick={() => handleClickBlock(item)}
                  key={item.key}
                  className={classNames(
                    item.key == activeSticker && styles.active,
                    styles.filterBlock,
                  )}
                  // style={{
                  //   opacity: !bundleDownloadedStickers[item.key] ? 0.4 : 1,
                  // }}
                >
                  <Spin spinning={spinning(item)}>
                    <img
                      crossOrigin="anonymous"
                      src={`${CDNBase}/${item.key}.png`}
                    />
                  </Spin>
                </div>
              ))}
            </div>
          )}
          {activeMenu === menuKey.beauty && (
            <div className={styles.footer}>
              {activeTab !== menuKey.filter ? (
                <Button
                  disabled={disableReset || !isReady || !switchV}
                  onClick={handleReset}
                  color="primary"
                >
                  {t("恢复默认")}
                </Button>
              ) : (
                <div className={styles.footerSlider}>
                  <FuSlider
                    value={filterVal}
                    min={0}
                    max={100}
                    isPc={true}
                    disabled={"None" == activeBlock}
                    onChange={handleOnSlider}
                  />
                  <InputNumber
                    min={0}
                    max={100}
                    disabled={"None" == activeBlock}
                    style={{
                      width: 62,
                      height: 32,
                      marginLeft: 20,
                      flexShrink: 0,
                    }}
                    formatter={(v) => {
                      return !parseInt(v as unknown as string)
                        ? "0"
                        : v.toString();
                    }}
                    value={filterVal}
                    controls={false}
                    onChange={(v) => handleOnSlider(v)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
