import { goLoginPage } from './pages/login.js'
import { mainFeed } from './pages/login.js'
import './firebase-init.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = firebase.auth().currentUser;
  if (!user) {
    goLoginPage();
  } else {
    document.getElementById("root").innerHTML = "<div>Bienvenido Usuario</div>";
  }
});

// #Observador de autenticación
const stateObserved = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log('usuario activo');
      mainFeed();
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('no existe usuario activo');
      // ...
    }
  });
}
stateObserved();
