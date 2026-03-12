export {};

declare global {
  interface ITag {
    _id?: string;
    slug: string;
    category: string;
    label: {
      en: string;
      tr: string;
    };
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface IUser {
    _id: string;
    fullname: string;
    nickname: string;
    isCook: boolean;
    profilePicture?: string;
    email: string;
    isAdmin: number;
    createdAt: Date;
    slug: string;
  }

  interface ISignUpUserForm {
    fullname: string;
    nickname: string;
    email: string;
    password: string;
  }

  type TextSizes =
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";

  type Colors =
    | "primary"
    | "secondary"
    | "accent"
    | "text"
    | "textSecondary"
    | "background";
}
