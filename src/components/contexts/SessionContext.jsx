import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [actividadForm, setActividadForm] = useState({
    
  });
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const posibleUsuario = cookies.user;
    if (posibleUsuario !== null) {
      setUser(posibleUsuario);
    }
  }, []);

  function login(userData) {
    setUser(userData);

    setCookie("user", userData);
  }

  function logout() {
    setUser(null);

    removeCookie("user");
  }

  function deleteActividadContext() {
    console.log("Borro", actividadForm)
    setActividadForm(false);
  }

  return (
		<SessionContext.Provider
			value={{ user, actividadForm, login, logout, setActividadForm, deleteActividadContext,  }}
		>
			{children}
		</SessionContext.Provider>
	);
}
