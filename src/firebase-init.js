// CLAVES DE ACCESO A CONSOLA FIREBASE
const firebaseConfig = {
  apiKey: 'AIzaSyDgD6mNHghURun7IwcQZqbREOFcYXY4z-Q',
  authDomain: 'bitacora-d5fc4.firebaseapp.com',
  databaseURL: 'https://bitacora-d5fc4.firebaseio.com',
  projectId: 'bitacora-d5fc4',
  storageBucket: 'bitacora-d5fc4.appspot.com',
  messagingSenderId: '336372532933',
  appId: '1:336372532933:web:5d25b4eb0df322573712ac',
  measurementId: 'G-YBXSZ9NSY2',
};
// INICIALIZACIÓN DE FIREBASE
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
