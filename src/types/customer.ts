export interface CustomerPayload {
  number: number;
  nameOfLocation: string;
  date: string;
  loginHour: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  noTelp: string;
  brandDevice: string;
  digitalInterest: string;
  locationType: string;
}

export interface CustomerResponse {
  _id: string;
  number: number;
  nameOfLocation: string;
  date: string;
  loginHour: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  noTelp: string;
  brandDevice: string;
  digitalInterest: string;
  locationType: string;
  __v: string;
}
