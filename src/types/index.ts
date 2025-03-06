export interface IPaymentAmount {
  price: number;
  amount: number;
  _id: string;
}

export interface ICustomerUpdate {
  id?: string;
  full_name: string;
  tel_primary?: string;
}

export interface IPayload<T> {
  statusCode: number;
  message: string;
  data: {
    payload: T[];
    total: number;
    limit: number;
    page: number;
  };
}
export interface IDetailPayload<T> {
  statusCode: number;
  message: string;
  data: {
    payload: T;
  };
}
export interface ICustomerDetail {
  customer: ICustomer;
  cars: ICar[];
}

export interface ICar {
  _id: string;
  employerId: string;
  customerId: string;
  plateNumber: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface IDetailCar {
  _id: string;
  employerId: string;
  customerId: ICustomer;
  plateNumber: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface ICustomer {
  _id: string;
  employerId: string;
  budget: number;
  full_name: string;
  tel_primary: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  adminId?: string;
  f_name: string;
  l_name: string;
  tel_primary: string;
  tel_secondary?: string;
  address: string;
  username: string;
  role: string;
  budget: number;
  hashed_password: string;
  hashed_refreshtoken?: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateUserDto {
  adminId?: string;
  f_name: string;
  l_name: string;
  tel_primary: string;
  tel_secondary?: string;
  address: string;
  username: string;
  password: string;
  role: string;
  budget?: number;
  salary?: string[];
  is_active?: boolean;
}

export interface IUpdateUserDto {
  f_name?: string;
  l_name?: string;
  tel_primary?: string;
  tel_secondary?: string;
  address?: string;
  username?: string;
  password?: string;
  role?: string;
  budget?: number;
  salary?: string[];
  is_active?: boolean;
}

export interface IPaymentCreate {
  price: number;
  amount: number;
  comment?: string;
  type: string;
}