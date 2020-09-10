import { Moment } from 'moment';

export interface ITopic {
  id?: number;
  title?: string;
  createdAt?: Moment;
  marathon?: number;
  creatorId?: number;
  participants?: IUser[];
}
export interface IUser {
    id?: any;
    login?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    authorities?: string[];
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
    password?: string;
  }
export class Topic implements ITopic {
  constructor(
    public id?: number,
    public title?: string,
    public createdAt?: Moment,
    public marathon?: number,
    public creatorId?: number,
    public participants?: IUser[]
  ) {}
}
