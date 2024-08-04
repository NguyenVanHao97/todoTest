export interface IAuthForm {
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
  time: string;
}

export interface InitialStateProps {
  expireLogin: boolean;
  loading: boolean;
  error: string | null;
  user: LoginProps | null;
  success: boolean;
  time: string | null;
  login: ({email, password, time}: LoginProps) => void;
  resetStore: () => void;
  logout: () => void;
}
