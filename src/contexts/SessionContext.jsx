import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const posibleUsuario = cookies.user;
    if (posibleUsuario !== null) {
      setUser(posibleUsuario);
    }
  }, []);

  function login(userData) {
    setUser(userData);
    console.log(userData);

    setCookie("user", userData);
  }

  function logout() {
    setUser(null);

    removeCookie("user");
  }

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
