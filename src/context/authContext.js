import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("No hay auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => signOut(auth);

  // Esta funcion captura los cambios de estado de usuario
  // es decir si un usuario esta logeado o no cuando abre la pag
  // o cuando te deslogeas
  useEffect(() => {
    const unSuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSuscribe();
  }, []);

  return (
    <authContext.Provider value={{ signUp, login, user, logOut, loading }}>
      {children}
    </authContext.Provider>
  );
}
