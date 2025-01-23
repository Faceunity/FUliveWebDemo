import { Mask } from "antd-mobile";
import rotateTip from "@/assets/rotate-tips.png";
import styles from "./index.module.less";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const RotateMask: React.FC = () => {
  const { t } = useTranslation();
  const [isPortrait, setIsPortrait] = useState<boolean>(true);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const handler = (e) => {
      setIsPortrait(e.matches);
    };
    mediaQuery.onchange = handler;
    // mediaQuery.addEventListener("change", );
    // 初始判断下
    setIsPortrait(mediaQuery.matches);
    return () => {
      mediaQuery.onchange = null;
      // mediaQuery.removeEventListener("change", handler);
    };
  }, []);
  return isPortrait ? (
    <></>
  ) : (
    <Mask
      opacity={0.8}
      color="#000"
      visible={!isPortrait}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100%",
      }}
    >
      <div className={styles.tips}>
        <img src={rotateTip} alt="" />
        <p>{t("手动竖屏")}</p>
        <p>{t("为了获得更好的体验，请以竖屏模式使用设备")}</p>
      </div>
    </Mask>
  );
};
