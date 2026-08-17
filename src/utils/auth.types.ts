export interface registerType {
  name: string;
  email: string;
  password: string;
  role: string;
  id?:string
}
export interface loginType {
  email: string;
  password: string;
  role?:string;
}


