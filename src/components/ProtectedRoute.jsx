import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //Consumimos el contexto
  const { user, isAuthLoaded } = useContext(AuthContext);

  //Verificamos si el auth esta cargado
  if (!isAuthLoaded) {
    return <p>Loading...</p>;
  }

  //Verificamos el usuario y lo mandamos a login si o si
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    children
  );
};

export default ProtectedRoute;
