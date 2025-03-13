import { PaymentType } from "../constant";

export interface IPaymentAmount {
  price: number;
  amount: number;
  comment: string;
  type: PaymentType;
  _id: string;
}

export interface ICustomerUpdate {
  id?: string;
  full_name: string;
  tel_primary?: string;
}

export interface ICarUpdate {
  id?: string;
  plateNumber: string;
  name: string;
}
export interface ISalaryUpdate {
  _id?: string;
  type: string;
  amount: number;
}

export interface ICarWashingUpdate {
  id?: string;
  washAmount: number;
  status: string;
  comment: string;
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
    total: number;
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
  isWashing: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ICarDetail {
  _id: string;
  employerId: any;
  customerId: ICustomer;
  plateNumber: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isWashing: boolean;
}

export interface IDetailCar {
  car: ICarDetail;
  carWashings: any;
}
export interface ICustomer {
  _id: string;
  employerId: any;
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
  amount: number;
  comment?: string;
  type: string;
  customerId: string;
}

interface ICarWashEmployer {
  _id: string;
  f_name: string;
  l_name: string;
  tel_primary: string;
}

interface ICarWashCar {
  _id: string;
  plateNumber: string;
  name: string;
}

interface ICarWashCustomer {
  _id: string;
  full_name: string;
  tel_primary: string;
  budget: number;
}

export interface ICarWash {
  _id: string;
  employerId: ICarWashEmployer;
  carId: ICarWashCar;
  customerId: ICarWashCustomer;
  washAmount: number;
  status: "COMPLETED" | "PENDING" | "CANCELLED"; // Agar boshqa statuslar bo'lsa, qo'shish mumkin
  employerSalary: number;
  isBonus: boolean;
  invitationId: string | null;
  createdAt: string;
  updatedAt: string;
}
