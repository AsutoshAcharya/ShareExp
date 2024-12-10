import { validateEmail } from "../../helpers/regex";
import { validateName, validatePhoneNumber } from "../Register/RegisterRegex";

export const profileData: Array<{
  label: string;
  value: string;
  placeHolder: string;
  type: string;
  required: boolean;
  validate?: (val: string) => string | undefined;
  touched?: boolean;
}> = [
  {
    label: "name",
    value: "",
    placeHolder: "Enter your name",
    required: true,
    type: "text",
    validate: (val: string) => {
      if (!validateName(val)) {
        return "Invalid name";
      }
      return undefined;
    },
  },
  {
    label: "email",
    value: "",
    placeHolder: "xxx@xxx.com",
    required: true,
    type: "text",
    touched: false,
    validate: (val: string) => {
      if (!validateEmail(val)) {
        return "Please enter a valid email address.";
      }
      return undefined;
    },
  },
  {
    label: "phone",
    value: "",
    placeHolder: "123123121",
    required: true,
    type: "text",
    touched: false,
    validate: (val: string) => {
      if (!validatePhoneNumber(val)) {
        return "Please enter a valid Phone number.";
      }
      return undefined;
    },
  },
  {
    label: "company",
    value: "",
    placeHolder: "company name",
    type: "text",
    required: false,
    touched: false,
  
  },
  {
    label: "Years Of Experience",
    value: "",
    placeHolder: "1-2",
    required: false,
    type: "text",
    touched: false,
  },
  {
    label: "about",
    value: "",
    placeHolder: "brief yourself",
    type: "text",
    required: false,
    touched: false,

  },
];
