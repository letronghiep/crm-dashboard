export interface Employee {
  id: number; // ObjectId
  name: string;
  email: string;
  password: string;
  gender: string;
  birthday: Date;
  phone?: string;
  age: number;
  avatar: string;
  exp: number;
  role: string;
  position: string;
  department?: number; // ObjectId
  managerId?: number; // ObjectId
  isActive: boolean;
  lastLoginAt?: Date;
  totalDeals?: number;
  totalRevenue?: number;
}
