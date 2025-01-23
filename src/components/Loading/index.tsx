import { Mask, SpinLoading } from "antd-mobile";
import styles from "./index.module.less";

interface Props {
  text?: string;
  visible: boolean;
  opacity?: "default" | "thin" | "thick" | number;
}

export const Loading: React.FC<Props> = ({ text, visible, opacity }) => {
  return (
    <Mask className={styles.myLoading} opacity={opacity} visible={visible}>
      <SpinLoading color="primary" />
      {text ? <div>{text}</div> : <></>}
    </Mask>
  );
};
