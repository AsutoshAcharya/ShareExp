export type Social = {
  type: "LinkedIn" | "Twitter" | "Portfolio" | "GitHub";
  link: string;
};

export type User = {
  id: string;
  name: string;
  token: string;
  email: string;
  phone: string;
  country: string;
  yearOfExperience: string;
  company: string;
  skills: Array<string>;
  profilePicture: string;
  about: string;
  socials: Array<Social>;
};
