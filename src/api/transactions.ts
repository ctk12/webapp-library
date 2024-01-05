import { ResponseType1 } from '@/types/User';
import { Transaction, UpdateTransaction, getTransactionsType, getTransactionType } from '../types/Transaction';
import { client } from '../utils/fetchClient';

const apiPath = "transactions";

export const getTransactions = (params?: string) => {
  return client.get<getTransactionsType>(`/${apiPath}${params}`);
};

export const getTransaction = (transactionId: string) => {
  return client.get<getTransactionType>(`/${apiPath}/${transactionId}`);
};

export const addTransactions = (transaction: Omit<Transaction, 'id'>) => {
  return client.post<getTransactionType>(`/${apiPath}`, transaction);
};

export const deleteTransactions = (transactionId: string) => {
  return client.delete<ResponseType1>(`/${apiPath}/${transactionId}`);
};

export const updateTransactions = (
  transactionId: string,
  transaction: UpdateTransaction,
) => {
  return client.patch<getTransactionType>(`/${apiPath}/${transactionId}`, transaction);
};