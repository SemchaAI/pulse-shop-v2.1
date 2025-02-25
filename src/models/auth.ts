import { Role } from '@prisma/client';

export interface ApiResponse {
  message: string;
}
export interface IUserSession {
  id: number;
  role: Role;
  provider: string | null;
  name: string;
  avatar: string | null;
  email: string;
  cartTotal: number;
  favoriteProducts: number[];
}
export interface ISessionToken extends IUserSession {
  exp: number;
}
export interface IUserResponse {
  user: IUserSession | null;
  status: number;
  message: string;
}

export interface SignupRequestBody {
  method: 'guest' | 'credentials' | 'provider';
  body?: CredentialsSignupBody | ProviderSignupBody;
}

export interface CredentialsSignupBody {
  email: string;
  name: string;
  password: string;
}

export interface ProviderSignupBody {
  email: string;
  name?: string;
  provider: string;
  providerAccountId: string;
}

export interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}
export interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
