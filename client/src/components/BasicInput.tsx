import { FC, InputHTMLAttributes } from "react";
import toTitleCase from "../helpers/toTitleCase";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const BasicInput: FC<Props> = ({ label, ...rest }) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {toTitleCase(label)}
        </label>
      )}
      <input
        id={label}
        className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:placeholder-gray-400 dark:text-white"
        {...rest}
      />
    </div>
  );
};

export default BasicInput;
