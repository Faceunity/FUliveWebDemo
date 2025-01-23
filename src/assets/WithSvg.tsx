import { useUA } from "@/utils/hooks";
import { useLayoutEffect, useState } from "react";

export const withSvg = (Comp) => {
  function SvgContainer(props) {
    const { isPc } = useUA();
    const [scale, setScale] = useState<number>(1);

    useLayoutEffect(() => {
      const rect = document.body.getBoundingClientRect();
      setScale(isPc ? 1 : rect.width / 750);
    }, [isPc]);

    return (
      <div
        style={{
          ...props.style,
          transform: `scale(${scale})`,
          display: "flex",
        }}
      >
        <Comp {...props} />
      </div>
    );
  }

  return SvgContainer;
};
