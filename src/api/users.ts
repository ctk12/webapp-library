import { ResponseType1, getAllUsersType, getUserType, getUsersType } from '@/types/User';
import { User, UpdateUser } from '../types/User';
import { client } from '../utils/fetchClient';

const apiPath = "users"; 

export const getUsers = (params?: string) => {
  return client.get<getUsersType>(`/${apiPath}${params}`);
};

export const getAllUsers = () => {
  return client.get<getAllUsersType>("/all-users");
};

export const getUser = (userId: string) => {
  return client.get<getUserType>(`/${apiPath}/${userId}`);
};

export const addUsers = (newUser: Omit<User, 'id'>) => {
  return client.post<getUserType>(`/${apiPath}`, newUser);
};

export const deleteUsers = (userId: string) => {
  return client.delete<ResponseType1>(`/${apiPath}/${userId}`);
};

export const updateUsers = (
  userId: string,
  user: UpdateUser,
) => {
  return client.patch<getUserType>(`/${apiPath}/${userId}`, user);
};