import { goLoginPage } from './pages/login.js';
import { goHome } from './pages/home.js';
import './firebase-init.js';

// #Observador de autenticación
export const stateObserved = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user && user.emailVerified) {
      goHome();
    } else {
      goLoginPage();
    }
  });
};
stateObserved();
