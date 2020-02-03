
import {
  emailLogin,
  createAccount,
} from './index.js';
import { stateObserved } from '../main.js';


window.addEventListener('hashchange', () => {
  if (window.location.hash === '#/singIn') {
    emailLogin();
  } else if (window.location.hash === '#/singUp') {
    createAccount();
  } else if (window.location.hash === '#/home' || window.location.hash === '#/verify') {
    stateObserved();
  }
});
