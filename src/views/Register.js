import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

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
      // if (error.code === "auth/internal-error") {
      //   setError("Correo Invalido");
      // } else if (error.code === "auth/weak-password") {
      //   setError("Contraseña invalida, utilizar al menos 6 caracteres");
      // } else if (error.code === "auth/email-already-in-use") {
      //   setError("Este email ya esta en uso");
      // }
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="tuEmail@ejemplo.com"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline">
          Registrarse
        </button>
      </form>
      <Link to="/login">
        <button className="bg-green-500 hover:bg-green-600 text-white shadow-md rounded py-2 px-4 w-full mb-1">
          Login
        </button>
      </Link>
    </div>
  );
};
