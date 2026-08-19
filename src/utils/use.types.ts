import type { ReactNode } from "react";
export type layoutProp={
    children:ReactNode
}
 
export interface UserContextType {
  currentUser: CurrentuserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentuserType | null >>;
  removeUser: () => void;
}

export type CurrentuserType = {
  email?: string;
  exp?: number;
  iat?: number;
  role?: string;
  id?: number | string; 
};
export type notifyType={
  notification_id:string,
  is_read:boolean,
  message:string,
  createdAt:string
}

export interface UserOption {
  id: string;
  name: string;
  status: string;
  email: string;
  role: "admin" | "developer";
  joinedat?:string
}
export type statusType={status_id:string,status_name:string}
