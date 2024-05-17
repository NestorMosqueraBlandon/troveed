import { StatusType } from './constants';

export interface Base {
  _id?: string;
  id: string;
  status: StatusType;
  createdAt: Date;
  updatedAt: Date;
}