import { Some } from "./Some";

const toTitleCase = (str: string) => {
  return Some.String(str)
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
};

export default toTitleCase;
