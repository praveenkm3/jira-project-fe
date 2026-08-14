export interface registerType {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface loginType {
  email: string;
  password: string;
  role?:string;
}


