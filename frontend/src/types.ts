export interface User {
  _id: string;
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
  token: string;
  role: string;
  googleID?: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Photo {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  title: string;
  image: string;
}

export type PhotoMutation = Omit<Photo, 'user' | '_id'>;
