export interface RegistrationInfo {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  errorMsg: string;
}
export interface JwtPayload {
  exp?: number;
}
export interface LoginInfo {
  email: string;
  password: string;
  errorMsg: string;
}
export interface LoginUserInfo {
  name: string;
  token: string;
  id: string;
  email: string;
}

export interface ProductDataInfo {
  image: string;
  price: string;
}
export interface cartInfo {
  errorMsg: string;
  price: Number;
  count: Number;
  cartArr: any;
}
