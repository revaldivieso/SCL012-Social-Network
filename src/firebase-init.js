// CLAVES DE ACCESO A CONSOLA FIREBASE
const firebaseConfig = {
  apiKey: 'AIzaSyAirR6C1WJOn0rCgtbK-Dd-BsOVUTcwqAI',
  authDomain: 'bitacora-v1.firebaseapp.com',
  databaseURL: 'https://bitacora-v1.firebaseio.com',
  projectId: 'bitacora-v1',
  storageBucket: 'bitacora-v1.appspot.com',
  messagingSenderId: '952409946399',
  appId: '1:952409946399:web:f86aa9902fc852fb51582a',
  measurementId: 'G-4SJ0PQPP53',
};
// INICIALIZACIÓN DE FIREBASE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
