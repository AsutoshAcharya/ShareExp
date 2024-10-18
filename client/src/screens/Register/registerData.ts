export  const registerData : Array<{
    label: string;
    value: string;
    error: boolean;
    placeHolder: string;
    type:string;
}> = [
    {
        label: "name",
        value: "",
        error: false,
        placeHolder: "Enter your name",
        type:'text'
      },
      {
        label: "email",
        value: "",
        error: false,
        placeHolder: "xxx@xxx.com",
            type:'text'
      },
      {
        label: "password",
        value: "",
        error: false,
        placeHolder:"••••••••",
        type:'password'
      },
      {
        label: "years of Experience",
        value: "",
        error: false,
        placeHolder:"1-2",
            type:'text'
      },
      {
        label: "company",
        value: "",
        error: false,
        placeHolder:"company name",
            type:'text'
      },
      {
        label: "phone",
        value: "",
        error: false,
        placeHolder:"123123121",
            type:'text'
      },
      {
        label: "about",
        value: "",
        error: false,
        placeHolder:"brief yourself",
            type:'textarea'
      },
  
]