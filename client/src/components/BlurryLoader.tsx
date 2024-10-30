import clsx from "clsx";
import { HTMLProps } from "react";

const BlurryLoader = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div className="flex w-full h-full justify-center items-center" {...props}>
      <span
        className={clsx("loading loading-spinner loading-lg", props.className)}
      ></span>
    </div>
  );
};

export default BlurryLoader;
