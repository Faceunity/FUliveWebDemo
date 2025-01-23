import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./index.module.less";
import { BundleEnum, menuKey, panelConfig } from "@/common/defaultConfig";
import { Button, Card, Form, Radio, Space } from "antd-mobile";
import { useSearchParams } from "react-router-dom";
import { PanelData } from "@/common/global";
import NamaSDK from "@/utils/namaSDK";
import { useUA } from "@/utils/hooks";
import { testUA } from "@/utils/tools";

const initData = {
  去黑眼圈: panelConfig["去黑眼圈"].use,
  去法令纹: panelConfig["去法令纹"].use,
  大眼: panelConfig["大眼"].use,
  嘴型: panelConfig["嘴型"].use,
  磨皮: panelConfig["磨皮"].use,
};

interface ContextType {
  panelData: PanelData;
  setShowCompare?: Function;
  showCompare?: boolean;
  compareHeight?: number;
  setCompareHeight?: Function;
  isReady?: boolean;
  setIsReady?: Function;
  noDevice?: boolean;
  setNoDevice?: Function;
}

export const PanelContext = createContext<ContextType>({
  panelData: initData,
});

export const ConfigPanel = (props) => {
  const [panelData, setPanelData] = useState<PanelData>(initData);
  const [visible, setVisible] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { isPc } = useUA();
  const [showCompare, setShowCompare] = useState<boolean>(!testUA());
  const [compareHeight, setCompareHeight] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [noDevice, setNoDevice] = useState<boolean>(false);
  const eyeEnlargingCahce = useRef<string>(initData.大眼);
  const mouthCahce = useRef<string>(initData.嘴型);

  const arrays = useMemo(() => {
    const res = Object.keys(panelConfig).map((k) => {
      return {
        name: k,
        ...panelConfig[k],
      };
    });
    return res;
  }, []);

  const handleClick = useCallback(() => {
    setCollapse(!collapse);
  }, [collapse]);

  useEffect(() => {
    setVisible(searchParams.get("__debug") === "true");
  }, [searchParams]);

  const handleValues = useCallback(
    (values) => {
      if (values) {
        setPanelData({
          ...panelData,
          ...values,
        });
      }

      if (values["人脸关键点"] !== undefined) {
        console.log("设置人脸关键点：", values["人脸关键点"]);
        NamaSDK.instance.setFaceProcessor(values["人脸关键点"]);
      }
    },
    [panelData],
  );

  return (
    <PanelContext.Provider
      value={{
        panelData,
        setShowCompare,
        setCompareHeight,
        showCompare,
        compareHeight,
        isReady,
        setIsReady,
        noDevice,
        setNoDevice,
      }}
    >
      {visible && (
        <Card className={styles.panel}>
          <Form
            layout={isPc ? "horizontal" : "vertical"}
            onValuesChange={handleValues}
            style={{ display: !collapse ? "block" : "none" }}
          >
            {arrays.map((item, i) => (
              <Form.Item label={item.name} key={i} name={item.name}>
                <Radio.Group
                  defaultValue={item.use}
                  onChange={(v) => {
                    if (typeof v === "string" && v.includes("eye_enlarging")) {
                      if (eyeEnlargingCahce.current) {
                        // 需要重置原来旧的这个效果
                        NamaSDK.instance.setParams(
                          BundleEnum.face_beautification,
                          menuKey.shaping,
                          eyeEnlargingCahce.current,
                          0,
                        );
                      }
                      eyeEnlargingCahce.current = v as string;
                    }

                    if (
                      typeof v === "string" &&
                      v.includes("intensity_mouth")
                    ) {
                      if (mouthCahce.current) {
                        // 需要重置原来旧的这个效果
                        NamaSDK.instance.setParams(
                          BundleEnum.face_beautification,
                          menuKey.shaping,
                          mouthCahce.current,
                          0.5,
                        );
                      }
                      mouthCahce.current = v as string;
                    }
                  }}
                >
                  <Space direction={isPc ? "horizontal" : "vertical"}>
                    {item.options?.map((opt, index) => (
                      <Radio value={opt} key={index}>
                        {opt}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            ))}
          </Form>
          <Button onClick={handleClick}>{collapse ? "展开" : "折叠"}</Button>
        </Card>
      )}
      {props.children}
    </PanelContext.Provider>
  );
};
