import classNames from "classnames";
import styles from "./index.module.less";
import { useMemo } from "react";
import { Slider } from "antd";
import { Slider as MobSlider } from "antd-mobile";

interface Props {
  value: number;
  min?: number;
  max?: number;
  origin?: number;
  isPc?: boolean;
  onChange?: (v: number) => void;
  [k: string]: any;
}

const PCBase = 4;

export const FuSlider: React.FC<Props> = ({
  value,
  min,
  max,
  origin,
  onChange,
  isPc,
  disabled,
  style,
  popover,
}) => {
  const handleLeft = useMemo(() => {
    const range = max - min;
    const v = value - min;
    return Math.round((v * 100) / range);
  }, [min, max, value]);

  const originLeft = useMemo(() => {
    const range = max - min;
    const v = origin - min;
    return Math.round((v * 100) / range);
  }, [min, max, origin]);
  const trackPlace = useMemo(() => {
    if (origin === undefined) {
      return { width: `calc(${handleLeft}% + ${PCBase / 2}px)`, left: 0 };
    } else {
      const w = originLeft - handleLeft < 0;
      const left = w ? originLeft : handleLeft;
      return {
        left: isPc ? `${left}%` : !w ? `calc(${left}% + 0.16rem)` : `${left}%`,
        width: isPc
          ? `calc(${Math.abs(originLeft - handleLeft)}% + ${PCBase / 2}px)`
          : `calc(${Math.abs(originLeft - handleLeft)}% - 0.16rem)`,
      };
    }
  }, [handleLeft, origin, isPc, originLeft]);

  return (
    <div
      className={classNames(
        styles.fuSliderWrap,
        isPc ? styles.pc : styles.mobile,
        origin !== undefined && styles.withOrigin,
        disabled && styles.disabled
      )}
      style={style}
    >
      {origin !== undefined && (
        <>
          <div
            className={styles.fakeTrack}
            style={{
              width: trackPlace.width,
              left: trackPlace.left,
            }}
            id="fu-track"
          ></div>
          <div
            className={styles.origin}
            style={{ left: `${originLeft}%` }}
          ></div>
        </>
      )}
      {isPc ? (
        <Slider
          styles={{
            track: {
              background:
                origin !== undefined ? "transparent" : "rgba(40, 124, 250, 1)",
            },
          }}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          disabled={disabled}
        ></Slider>
      ) : (
        <MobSlider
          popover={popover}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          disabled={disabled}
        />
      )}
    </div>
  );
};
