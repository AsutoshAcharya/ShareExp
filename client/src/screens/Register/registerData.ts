export const registerData: Array<{
  label: string;
  value: string;
  placeHolder: string;
  type: string;
  required: boolean;
  validate?: (val: string) => string | undefined;
}> = [
  {
    label: "name",
    value: "",
    placeHolder: "Enter your name",
    required: true,
    type: "text",
    validate: (val: string) =>
      val.trim().length < 3 ? "Please enter a valid name" : undefined,
  },
  {
    label: "email",
    value: "",
    placeHolder: "xxx@xxx.com",
    required: true,
    type: "text",
  },
  {
    label: "phone",
    value: "",
    placeHolder: "123123121",
    required: true,
    type: "text",
  },
  {
    label: "password",
    value: "",
    placeHolder: "••••••••",
    required: true,
    type: "password",
  },
  {
    label: "company",
    value: "",
    placeHolder: "company name",
    type: "text",
    required: false,
  },
  {
    label: "Years Of Experience",
    value: "",
    placeHolder: "1-2",
    required: false,
    type: "text",
  },
  {
    label: "about",
    value: "",
    placeHolder: "brief yourself",
    type: "text",
    required: false,
  },
];
