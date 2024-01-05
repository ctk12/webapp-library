import { ResponseType1 } from '@/types/User';
import { Book, UpdateBook, getAllBooksType, getBookType, getBooksType } from '../types/Book';
import { client } from '../utils/fetchClient';

const apiPath = "books";

export const getBooks = (params?: string) => {
  return client.get<getBooksType>(`/${apiPath}${params}`);
};

export const getAllBooks = () => {
  return client.get<getAllBooksType>("/all-books");
};

export const getMyBooks = () => {
  return client.get<getAllBooksType>("/my-books");
};

export const getBook = (bookId: string) => {
  return client.get<getBookType>(`/${apiPath}/${bookId}`);
};

export const addBook = (book: Omit<Book, 'id'>) => {
  return client.post<getBookType>(`/${apiPath}`, book);
};

export const deleteBooks = (bookId: string) => {
  return client.delete<ResponseType1>(`/${apiPath}/${bookId}`);
};

export const updateBooks = (
  bookId: string,
  book: UpdateBook,
) => {
  return client.patch<getBookType>(`/${apiPath}/${bookId}`, book);
};