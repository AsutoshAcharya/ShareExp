import { FC, HTMLAttributes } from "react";
interface Props extends HTMLAttributes<HTMLParagraphElement> {
  title: string;
}
const P: FC<Props> = ({ title, ...rest }) => {
  return (
    <p
      className={"text-ellipsis overflow-hidden w-[90%]" + " " + rest.className}
      onMouseEnter={(e) => {
        e.currentTarget.title = title;
      }}
      onMouseLeave={(e) => (e.currentTarget.title = "")}
    >
      {title}
    </p>
  );
};

export default P;
