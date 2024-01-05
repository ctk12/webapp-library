import { ResponseType1, ResponseType2, User, loggedInuser } from '../types/User';
import { client } from '../utils/fetchClient';

const apiPath = "auth";

export const registerUser = (newUser: Omit<User, 'id'>) => {
  return client.post<loggedInuser>(`/${apiPath}/register`, newUser);
};

export const loginUser = (body: { email: string; password: string }) => {
  return client.post<loggedInuser>(`/${apiPath}/login`, body);
};

export const logoutUser = (body: { refreshToken: string; }) => {
  return client.post<ResponseType1>(`/${apiPath}/logout`, body);
};

export const refreshTokensUser = (body: { refreshToken: string; }) => {
    return client.post<loggedInuser>(`/${apiPath}/refresh-tokens`, body);
};

export const forgotPasswordUser = (body: { email: string; }) => {
    return client.post<ResponseType2>(`/${apiPath}/forgot-password`, body);
};

export const resetPasswordUser = (token: string, body: { password: string; }) => {
    return client.post<ResponseType1>(`/${apiPath}/reset-password?token=${token}`, body);
};