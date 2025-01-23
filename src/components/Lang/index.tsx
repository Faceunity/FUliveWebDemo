import { useUA } from "@/utils/hooks";
import { DownFill } from "antd-mobile-icons";
import { useMemo, useState } from "react";
import styles from "./index.module.less";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import message from "antd/es/message";
import CnIcon from "@/assets/mobIcons/CnIcon.png";
import EnIcon from "@/assets/mobIcons/EnIcon.png";
import { Popover } from "antd";
import { Popover as MobPopover } from "antd-mobile";
import { OptItem, Options } from "@/common/global";

export const LangSwitch: React.FC = () => {
  const [lg, setLg] = useState<OptItem>(Options[0]);
  const { isPc } = useUA();
  const [open, setOpen] = useState<boolean>(false);
  const { i18n, t } = useTranslation();

  const handleClick = (k: string) => {
    i18n.changeLanguage(k);
    setOpen(false);
  };

  const Comp = useMemo(() => {
    return isPc ? Popover : MobPopover;
  }, [isPc]);

  const popProps = useMemo(() => {
    return isPc
      ? {
          open: open,
          onOpenChange: setOpen,
        }
      : { onVisibleChange: setOpen, visible: open };
  }, [isPc, open]);

  return (
    <Comp
      // @ts-ignore
      trigger={isPc ? "hover" : "click"}
      {...popProps}
      // @ts-ignore
      placement={isPc ? "bottomRight" : "bottom-end"}
      className={`lang-switch-opts ${!isPc && "mobOpts"}`}
      mode={!isPc ? "dark" : undefined}
      content={
        <div className={isPc ? styles.pcOpt : styles.mobileOpt}>
          {Options.map((item, index) => (
            <div
              key={index}
              className={classnames(
                styles.langOpt,
                item.key === lg?.key && styles.active
              )}
              onClick={() => {
                handleClick(item.key);
                message.success(t("语言切换成功"));
                setLg(item);
              }}
            >
              {isPc ? (
                item?.pcLabel
              ) : (
                <img src={item.key === "en" ? EnIcon : CnIcon} alt="" />
              )}
            </div>
          ))}
        </div>
      }
    >
      <div
        className={classnames(styles.lgBtn, isPc ? styles.pc : styles.mobile)}
      >
        {isPc ? (
          <span className={styles.text}>{lg?.pcLabel}</span>
        ) : (
          <img src={lg?.key === "en" ? EnIcon : CnIcon} alt="" />
        )}
        {isPc && <DownFill className={open && styles.open} />}
      </div>
    </Comp>
  );
};
