import { FC, HTMLAttributes } from "react";
import toAvatar from "../helpers/toAvatar";

interface Props extends HTMLAttributes<HTMLDivElement> {
  size: number;
  name: string;
  imageUrl?: string;
}

const UserAvatar: FC<Props> = ({ size, name, imageUrl, ...rest }) => {
  return (
    <div
      {...rest}
      className={`bg-cover bg-center rounded-full bg-red-300 text-xl font-bold text-blue-700 flex justify-center items-center`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {!imageUrl && toAvatar(name)}
    </div>
  );
};

export default UserAvatar;
