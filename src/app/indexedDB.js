const DB_NAME = 'userDB';
const DB_VERSION = 2;
const STORE_NAME = 'users';

let db;

// Abre la base de datos
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('email', 'email', { unique: true });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject('Error opening DB: ' + event.target.errorCode);
    };
  });
};

// Función para agregar un nuevo usuario
const addUser  = (user) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('Base de datos no abierta. Asegúrate de llamar a openDB primero.');
      return;
    }

    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(user);

    request.onsuccess = () => {
      resolve('Usuario agregado con éxito');
    };

    request.onerror = (event) => {
      reject('Error agregando usuario: ' + event.target.errorCode);
    };
  });
};

// Función para verificar si el correo ya existe
const userExists = (email) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject('Base de datos no abierta. Asegúrate de llamar a openDB primero.');
      return;
    }

    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('email');  // Usar el índice 'email' para hacer la búsqueda

    const request = index.get(email);  // Buscar por el índice 'email'

    request.onsuccess = (event) => {
      if (event.target.result) {
        resolve(true);  // El usuario con este correo existe
      } else {
        resolve(false);  // El usuario no existe
      }
    };

    request.onerror = (event) => {
      reject('Error buscando usuario: ' + event.target.errorCode);
    };
  });
};

export { openDB, addUser , userExists };