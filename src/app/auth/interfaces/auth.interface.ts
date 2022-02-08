export interface ILogin {
  status: string;
  code: number;
  messages: string;
  result: result;
}

export interface result {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: user;
}

export interface user {
  name: string;
  email: string;
  status: number;
  role: string;
  permission: string[];
  acount: null;
}
