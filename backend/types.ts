import {Model} from 'mongoose';


export interface UserFields {
  email: string;
  password: string;
  role: string;
  token: string;
  displayName: string;
  googleID?: string;
  avatar?: string | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<Boolean>;

  generateToken(): void
}

export type UserModel = Model<UserFields, {}, UserMethods>
