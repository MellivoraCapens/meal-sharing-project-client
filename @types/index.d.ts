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

  interface PhotonFeature {
    type: string;
    geometry: {
      type: string;
      coordinates: [number, number];
    };
    properties: {
      name: string;
      country: string;
      state?: string;
      district?: string;
      street?: string;
      postcode?: string;
    };
  }

  interface IDishForm {
    title: string;
    description: string;
    cookId: string | undefined;
    tags: string[];
    servings: number;
    availableAt: Date;
    price: {
      amount: string | null;
      currency: string;
    };
    location: {
      type: "Point";
      coordinates: [number, number];
    };
  }

  interface DishType {
    _id: string;
    title: string;
    description: string;
    cookId: string;
    tags: string[];
    servings: number;
    availableServings: number;
    status:
      | "scheduled"
      | "preparing"
      | "ready"
      | "done"
      | "expired"
      | "cancelled";
    imgName: string | null;
    imgUrl: string | null;
    availableAt: Date;
    price: {
      amount: number;
      currency: "USD" | "EUR" | "GBP" | "TRY";
    };
    location: {
      type: "Point";
      coordinates: [number, number];
    };
    createdAt: string;
    updatedAt: string;
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
