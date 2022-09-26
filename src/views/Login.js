import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  //capturamos el name(de la prop) y el value y lo seteamos en user
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  //submit del form Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("please enter your Email");
    try {
      await resetPassword(user.email);
      setError("We sent you an email with a link to reset your password");
    } catch (error) {
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
            placeholder="email@ejemplo.com"
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

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
          <a
            href="#"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={handleResetPassword}
          >
            Forgot your Password?
          </a>
        </div>
      </form>
      <Link to="/register">
        <button className="bg-red-500 hover:bg-red-600 text-white shadow-md rounded py-2 px-4 w-full mb-1">
          Register
        </button>
      </Link>
      <button
        onClick={handleGoogleLogin}
        className="bg-green-500 hover:bg-green-600 text-black shadow-md rounded py-2 px-4 w-full"
      >
        Login with Google
      </button>
    </div>
  );
};
