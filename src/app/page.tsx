"use client";

import { useState } from 'react';
import RegisterButton from "./RegisterButton"; 
import LoginButton from './LoginButton';

// Definir los vuelos disponibles
const Vuelos = [
  { id: 1, aerolinea: 'Aeromexico', origen: 'CDMX', destino: 'NYC', fecha: '2024-12-15', hora: '10:00 AM', duracion: '4h 30m', precio: '$500' },
  { id: 2, aerolinea: 'Delta Airlines', origen: 'NYC', destino: 'LAX', fecha: '2024-12-16', hora: '2:00 PM', duracion: '6h', precio: '$400' },
  { id: 3, aerolinea: 'American Airlines', origen: 'LAX', destino: 'CDMX', fecha: '2024-12-17', hora: '9:00 AM', duracion: '5h 15m', precio: '$350' }
];

const HomePage = () => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [userData, setUserData] = useState<{ firstName: string; lastName: string } | null>(null); // Estado para el usuario
  const [reservas, setReservas] = useState<Array<{ vueloId: number, usuario: { firstName: string; lastName: string } }>>([]); // Estado para las reservas

  // Filtrar vuelos disponibles
  const filtrarVuelos = () => {
    return Vuelos.filter(vuelo => 
      (origen ? vuelo.origen === origen : true) &&
      (destino ? vuelo.destino === destino : true) &&
      (fecha ? vuelo.fecha === fecha : true)
    );
  };

  // Función para manejar el login y actualizar el estado de userData
  const handleLoginSuccess = (firstName: string, lastName: string) => {
    setUserData({ firstName, lastName });
  };

  // Función para manejar la reserva de un vuelo
  const handleReservar = (vuelo: typeof Vuelos[0]) => {
    if (!userData) {
      alert('Debes iniciar sesión para realizar una reserva');
      return;
    }

    // Verificar si el vuelo ya está reservado por otro usuario
    const vueloYaReservado = reservas.find(reserva => reserva.vueloId === vuelo.id);
    
    if (vueloYaReservado) {
      alert(`El vuelo de ${vuelo.aerolinea} ya ha sido reservado por ${vueloYaReservado.usuario.firstName} ${vueloYaReservado.usuario.lastName}`);
      return;
    }

    // Si no está reservado, agregar la reserva
    setReservas([...reservas, { vueloId: vuelo.id, usuario: userData }]);
    alert(`Reserva exitosa para el vuelo de ${vuelo.aerolinea}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Reserva de Vuelos</h1>

      {/* Mostrar los botones de login y registro */}
      <RegisterButton />
      <LoginButton onLoginSuccess={handleLoginSuccess} />

      {/* Mostrar los datos del usuario después de login */}
      {userData && (
        <div className="bg-blue-500 text-white p-4 mt-4 rounded shadow-lg">
          <h2>Bienvenido, {userData.firstName} {userData.lastName}!</h2>
        </div>
      )}

      {/* Formulario de selección de vuelos */}
      <div className="mb-6">
        <label className="block text-lg mb-2">Origen</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
          placeholder="Ej: CDMX"
        />

        <label className="block text-lg mb-2 mt-4">Destino</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          placeholder="Ej: NYC"
        />

        <label className="block text-lg mb-2 mt-4">Fecha de vuelo</label>
        <input
          type="date"
          className="border p-2 w-full"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white p-2 mt-4 w-full"
          onClick={filtrarVuelos}
        >
          Buscar Vuelos
        </button>
      </div>

      {/* Lista de vuelos disponibles */}
      <div>
        {filtrarVuelos().length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrarVuelos().map((vuelo) => (
              <div key={vuelo.id} className="border p-4 rounded shadow-lg">
                <h2 className="font-bold text-xl">{vuelo.aerolinea}</h2>
                <p><strong>Origen:</strong> {vuelo.origen}</p>
                <p><strong>Destino:</strong> {vuelo.destino}</p>
                <p><strong>Fecha:</strong> {vuelo.fecha}</p>
                <p><strong>Hora:</strong> {vuelo.hora}</p>
                <p><strong>Duración:</strong> {vuelo.duracion}</p>
                <p><strong>Precio:</strong> {vuelo.precio}</p>
                <button
                  className="bg-green-500 text-white p-2 mt-4 w-full"
                  onClick={() => handleReservar(vuelo)} // Llamada a la función de reserva
                  disabled={reservas.some(reserva => reserva.vueloId === vuelo.id)} // Deshabilitar el botón si ya está reservado
                >
                  {reservas.some(reserva => reserva.vueloId === vuelo.id) ? 'Ya Reservado' : 'Reservar'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron vuelos disponibles.</p>
        )}
      </div>

      {/* Mostrar las reservas realizadas */}
      <div className="mt-6">
        {reservas.length > 0 && (
          <div>
            <h2 className="text-xl font-bold">Tus Reservas</h2>
            <ul>
              {reservas.map((reserva, index) => (
                <li key={index} className="border p-4 mt-4 rounded shadow-lg">
                  <h3 className="font-semibold">{Vuelos.find(vuelo => vuelo.id === reserva.vueloId)?.aerolinea}</h3>
                  <p><strong>Origen:</strong> {Vuelos.find(vuelo => vuelo.id === reserva.vueloId)?.origen}</p>
                  <p><strong>Destino:</strong> {Vuelos.find(vuelo => vuelo.id === reserva.vueloId)?.destino}</p>
                  <p><strong>Fecha:</strong> {Vuelos.find(vuelo => vuelo.id === reserva.vueloId)?.fecha}</p>
                  <p><strong>Hora:</strong> {Vuelos.find(vuelo => vuelo.id === reserva.vueloId)?.hora}</p>
                  <p><strong>Duración:</strong> {Vuelos.find(vuelo => vuelo.id === reserva.vueloId)?.duracion}</p>
                  <p><strong>Precio:</strong> {Vuelos.find(vuelo => vuelo.id === reserva.vueloId)?.precio}</p>
                  <p><strong>Reservado por:</strong> {reserva.usuario.firstName} {reserva.usuario.lastName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
