import { IPosts } from './Product';

export interface IUser {
  _id?: string;
  id? : string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  role?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  picture?: string;
  isVerified?: boolean;
  postList?: IPosts[];
  address?: string;
  avatar?: string;
  phone?: string;
  type?: any;
}
export interface IUserDocs {
  docs: IUser[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: null | number;
  nextPage?: null | number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserResponse {
  user: IUser;
  token?: string;
  accessToken: string;
  message?: string;
  data?:any
}

export interface IUserRegister {
  _id?: string;
  name: string;
  email: string;
  password: string;
  gender? : string;
  confirmPassword: string;
}

export interface IUserRequest {
  _id?: string;
  id? : string;
  username?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  phone?: string;
  address?: string;
  picture?: string;
  avatar?: string;
  role?: string;
  cart?: any;
  gender? : string;
}

export interface IUserPosts {
  message: string;
  data: IUser;
}

export interface IUserAnalytics {
  message: string;
  count: number;
}
