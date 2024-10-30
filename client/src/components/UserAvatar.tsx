import { FC, HTMLAttributes } from "react";
import toAvatar from "../helpers/toAvatar";
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  size: number;
  name: string;
  imageUrl?: string;
}

const UserAvatar: FC<Props> = ({ size, name, imageUrl, ...rest }) => {
  return (
    <div
      {...rest}
      className={clsx(
        `bg-cover bg-center rounded-full bg-blue-700 text-xl font-bold text-white flex justify-center items-center cursor-pointer`,
        rest.className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundColor: rest?.style?.backgroundColor,
      }}
    >
      {!imageUrl && toAvatar(name)}
    </div>
  );
};

export default UserAvatar;
