import { statusType } from "./enums";
import { PaginationType } from "./ApiData";
import { ResponseType1 } from "./User";

export interface Book {
  name: string;
  author: string;
  status: statusType;
  id: string;
}

export type KeysTBooks = keyof Book;

export interface UpdateBook {
  name?: string;
  author?: string;
  status?: statusType;
  id?: string;
}

export interface getAllBooksType extends ResponseType1 {
  data: Book[];
}

export interface getBooksType extends ResponseType1 {
  data: {
      results: Book[],
  } & PaginationType;
}

export interface getBookType extends ResponseType1 {
  data: Book
}

export const emptyBook = {
  name: "",
  author: "",
  status: statusType.available,
  id: "",
}