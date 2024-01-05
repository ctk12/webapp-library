import { PaginationType } from "./ApiData";
import { roleType } from "./enums";

export interface User {
  user_name: string;
  name: string;
  email: string;
  role: roleType;
  contact_number: string;
  id: string
}

export interface UpdateUser {
  user_name?: string;
  name?: string;
  contact_number?: string;
}

export interface Tokens {
    access: {
        token: string;
        expires:  string;
    },
    refresh: {
        token: string;
        expires: string;
    }
}

export interface ResponseType1 {
  success: boolean;
  message: string;
}

export interface ResponseType2 {
  success: boolean;
  message: string;
  data: {
    email: string;
    resetToken: string;
  }
}

export interface loggedInuser {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: Tokens;
  };
}

export interface NewUser extends User {
  password: string;
}

export interface getAllUsersType extends ResponseType1 {
  data: User[];
}

export interface getUsersType extends ResponseType1 {
  data: {
      results: User[],
  } & PaginationType;
}

export interface getUserType extends ResponseType1 {
  data: User
}

export const emptyUser = {
  user_name: "",
  name: "",
  email: "",
  role: roleType.USER,
  contact_number: "",
  id: "",
}