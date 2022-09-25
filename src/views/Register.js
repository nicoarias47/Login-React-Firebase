import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  //capturamos el name(de la prop) y el value y lo seteamos en user
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  //submit del form Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(user.email, user.password);
      navigate("/");
    } catch (error) {
      // Con este comando podemos ver los codigos de error
      //console.log(error.code);

      // Seteamos los diferentes errores que podemos mostrarle al usuario
      if (error.code === "auth/internal-error") {
        setError("Correo Invalido");
      } else if (error.code === "auth/weak-password") {
        setError("Contraseña invalida, utilizar al menos 6 caracteres");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Este email ya esta en uso");
      }
      //setError(error.message);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="tuEmail@ejemplo.com"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          onChange={handleChange}
        />
        <button>Registrarse</button>
      </form>
    </div>
  );
};
