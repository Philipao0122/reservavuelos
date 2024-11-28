// RegisterButton.tsx
"use client";

import React, { useState } from 'react';

const RegisterButton = () => {
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Función para manejar el registro
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !phone) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Verificar si el usuario ya existe en localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = storedUsers.find((user: { email: string }) => user.email === email);

    if (existingUser) {
      setError('El correo electrónico ya está registrado');
      return;
    }

    // Crear un nuevo objeto de usuario
    const newUser = { firstName, lastName, email, password, phone };

    // Guardar el nuevo usuario en localStorage
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    setSuccess('Usuario registrado con éxito');
    setError('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  // Función para alternar la visibilidad del formulario
  const toggleRegisterForm = () => {
    setRegisterVisible(!isRegisterVisible);
  };

  return (
    <>
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={toggleRegisterForm}
      >
        Register
      </button>

      {isRegisterVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-cyan-500 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded mt-1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded mt-1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
              <div className="mb-4">
                <label htmlFor="phone" className="block">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded mt-1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Register
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={toggleRegisterForm}
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

export default RegisterButton;
