export interface registerType {
  name: string;
  email: string;
  password: string;
  role: string;
  id?: string;
  designation_id?: string;
}
export interface loginType {
  email: string;
  password: string;
  role?: string;
}
export interface designationType {
  designation_id: string;
  designation_name: string;
}
