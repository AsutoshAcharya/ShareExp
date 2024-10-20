import { validateEmail,validatePassword } from "../../helpers/regex";

export const emptyLoginData: Array<{
  label: string;
  value: string;
  error: boolean;
  placeHolder: string;
  required: boolean;
  touched: boolean;
  validate?: (val: string) => string | undefined;
}> = [
  {
    label: "email",
    value: "",
    error: false,
    placeHolder: "you@example.com",
    required: true,
    touched: false,
    validate: (val: string) => {
      if (!validateEmail(val)) {
        return "Please enter a valid email address.";
      }
      return undefined;
    }
  },
  {
    label: "password",
    value: "",
    error: false,
    placeHolder: "••••••••",
    required: true,
    touched: false,
    validate: (val: string) => {
      if (!validatePassword(val)) {
        return "Please enter a valid password. The password must be 8 character long with a Capital Alphabet and a special character.";
      }
      return undefined;
    }
  }
];
