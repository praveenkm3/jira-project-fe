import { useState, createContext, useContext, useEffect } from "react";
import type {
  layoutProp,
  UserContextType,
  CurrentuserType,
} from "../utils/use.types";
import { api } from "../api/axios_client";

export const AuthContext = createContext<UserContextType | null>(null);

export default function AuthProvider({ children }: layoutProp) {
  const [currentUser, setCurrentUser] = useState<null | CurrentuserType>(null);

  function removeUser(): void {
    setCurrentUser(null);
  }
  useEffect(() => {
    async function makeRefresh() {
      try {
        const response = await api.post(
          "/api/refresh",
          {},
          { withCredentials: true },
        );
        setCurrentUser(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    makeRefresh();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, setCurrentUser, removeUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
export function UseAuth() {
  return useContext(AuthContext);
}
