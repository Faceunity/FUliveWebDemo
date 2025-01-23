import { Outlet } from "react-router-dom";
import bg from "@/assets/background.webp";
import styles from "./index.module.less";
import { LogoSvg } from "@/assets/Svg";
import { useUA } from "@/utils/hooks";
import classNames from "classnames";
import { LangSwitch } from "../Lang";
import { MobLogoSvg } from "@/assets/MobSvg";
import { SafeArea } from "antd-mobile";
import { RotateMask } from "../RotateMask";
import { testUA } from "@/utils/tools";
import { ConfigPanel } from "../ConfigPanelContext";

const Layout: React.FC = () => {
  const { isPc, deviceType } = useUA();
  return deviceType === null ? (
    <></>
  ) : (
    <>
      <div
        className={classNames(styles.layout, testUA() && styles.mobile)}
        style={
          !testUA()
            ? { backgroundImage: `url(${bg})` }
            : { background: "#353747" }
        }
      >
        <div className={styles.hdWrap}>
          {!isPc && <SafeArea position="top" />}
          <div className={styles.header}>
            <div className={styles.left}>
              {isPc ? <LogoSvg /> : <MobLogoSvg />}
              <span className={classNames(styles.title, isPc && styles.pc)}>
                FU Live Demo
              </span>
            </div>
            <LangSwitch />
          </div>
        </div>

        <div className={styles.content}>
          <ConfigPanel>
            <Outlet />
          </ConfigPanel>
        </div>
      </div>
      <>{!isPc && <RotateMask />}</>
    </>
  );
};

export default Layout;
