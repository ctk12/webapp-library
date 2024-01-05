import { PaginationType } from "./ApiData";
import { ResponseType1 } from "./User";
import { transactionStatusType } from "./enums";

export interface Transaction {
  user_name: string;
  book_name: string;
  due_date: string,
  transaction_type: transactionStatusType;
  id: string;
}

export interface UpdateTransaction {
  user_name: string;
  book_name: string;
  due_date?: string,
  transaction_type?: transactionStatusType;
}

export interface getTransactionsType extends ResponseType1 {
  data: {
      results: Transaction[],
  } & PaginationType;
}

export interface getTransactionType extends ResponseType1 {
  data: Transaction;
}

export const emptyTransaction = {
  user_name: "",
  book_name: "",
  due_date: "",
  transaction_type: transactionStatusType.borrowed,
  id: "",
}
