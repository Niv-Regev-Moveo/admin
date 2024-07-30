export interface IUser {
  surname: string;
  password: string;
  mail: string;
  role: string;
}

export interface LoginCredentials {
  mail: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: IUser;
}
