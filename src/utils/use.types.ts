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
  userId?: number;
};