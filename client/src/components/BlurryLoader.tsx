import clsx from "clsx";
import { HTMLProps } from "react";

const BlurryLoader = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <span
      className={clsx("loading loading-spinner loading-lg", props.className)}
    ></span>
  );
};

export default BlurryLoader;
