import {
  googleLogin,
} from '../lib/google-auth.js';

import {
  emailLogin,
  createAccount,
} from '../lib/index.js';

//  GENERACIÓN DE PÁGINA DE LOGUEO CON FIREBASE
export const goLoginPage = () => {
  document.getElementById('root').innerHTML = `<div id="form-login" class="form-login">
        <form action="/form-page" method="post" onsubmit="return validation()">
          <ul class="list"
            <li >
              <label for="mail"></label>
              <input class="inputLogin" type="email" id="txtMail" name="user_mail" Placeholder="Correo electrónico" />
            </li>
            <li class="text-box">
              <label for="password-example"></label> 
              <input class="inputLogin" type="password" id="txtPassword" name="password-example" Placeholder="Contraseña" required />
            </li>
            <li class="button">
              <button class="login" id="btnLogin" type="submit">Iniciar Sesión</button>
              <button class="register" id="registro" type="button">Registrate</button>
              <span id="loginGoogle" class="loginGoogle"><img src="./img/googleLogo2.png" class="icon" alt=""><p>Registrate con Google</p></span>
            </li>
          </ul>
        </form>
      </div>`;
  buildListenerForm();
};

//  FUNCIÓN INICIA BOTÓN DE LOGIN CUANDO ESTE EXISTA
const buildListenerForm = () => {
  try {
    // BOTON PARA LOGUEAR CON EMAIL Y PASSWORD
    document.getElementById('form-login').addEventListener('submit', () => {
      const email = document.getElementById('txtMail').value;
      const password = document.getElementById('txtPassword').value;
      emailLogin(email, password);
    });
    // BOTÓN LOGIN CON GOOGLE
    document.getElementById('loginGoogle').addEventListener('click', () => {
      googleLogin();
    });
    // BOTON PARA IR A PÁGINA DE REGISTRO DE NUEVO USUARIO
    document.getElementById('registro').addEventListener('click', () => {
      document.getElementById('root').innerHTML = `
        <div id="createAccount" class="registerBox">
        <p class="fontRoot">Ingresa un correo y una contraseña para crear tu cuenta</p>
        <input type="text"  id="newTextMail" class="inputRegister" placeholder="Correo electrónico">
        <input type="password" id="newTextPassword" class="inputRegister" placeholder="Contraseña">
        <button id="btnCreate" class="btnLogin">Crear Cuenta</button>
        <a class="comeback" id="loginBack">Volver</a></div>`;

      // BOTON QUE CREA CUENTA PARA NUEVO USUARIO
      document.getElementById('btnCreate').addEventListener('click', () => {
        const email = document.getElementById('newTextMail').value;
        const password = document.getElementById('newTextPassword').value;
        createAccount(email, password);
      });

      //  BOTÓN REGRESO AL LOGIN
      document.getElementById('loginBack').addEventListener('click', () => {
        goLoginPage();
      });
    });
  } catch (e) {
    //  console.error(e);
    document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }
};