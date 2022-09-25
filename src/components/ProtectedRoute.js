import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

// Este componente sirve para proteger rutas, evitamos que el usuario entre a
// estas rutas si no esta logeado y lo redirigimos.
// Debemos envolver todas las rutas que queramos proteger desde APP
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;
  // Navigate redirreciona al usuario
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};
