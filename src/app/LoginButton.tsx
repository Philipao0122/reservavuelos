"use client";

import React, { useState } from "react";

// Definir la interfaz User
interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// Definir el tipo de la función `onLoginSuccess`
interface LoginButtonProps {
  onLoginSuccess: (firstName: string, lastName: string) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLoginSuccess }) => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const toggleLoginForm = () => {
    setLoginVisible(!isLoginVisible);
    setLoginError(""); // Limpiar errores al abrir el formulario
  };

  const handleLogin = () => {
    // Obtener los usuarios almacenados en localStorage de forma segura
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Verificar si el usuario existe y si las credenciales son correctas
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Llamar a la función onLoginSuccess pasando los datos del usuario
      onLoginSuccess(user.firstName, user.lastName);
      setLoginVisible(false); // Cerrar el formulario después de un login exitoso
    } else {
      setLoginError("Credenciales incorrectas");
    }
  };

  return (
    <>
      <button
        className="absolute top-4 right-16 bg-green-500 text-white px-4 py-2 rounded"
        onClick={toggleLoginForm}
      >
        Login
      </button>

      {isLoginVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-green-500 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginError && (
                <div className="text-red-500 text-sm mb-4">{loginError}</div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={toggleLoginForm}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;
