export interface LoginInput {
  email: string;
  password: string;
}

export interface Account {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: string;
  status: number;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Params {
  _page: string;
  _limit: '10' | '20' | '30';
  _sort: string | null;
  _order: 'desc' | 'asc' | null;
  broker_id: Brokers | null;
  status: number | null;
  is_active: boolean | null;
  q: string | null;
}

export interface User {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

type Brokers =
  | 209
  | 218
  | 230
  | 238
  | 240
  | 243
  | 247
  | 262
  | 261
  | 263
  | 264
  | 266
  | 265
  | 267
  | 268
  | 269
  | 270
  | 279
  | 280
  | 288
  | 287
  | 290
  | 291
  | 292
  | 271;
