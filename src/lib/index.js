// LOGIN CON EMAIL Y PWD
export const emailLogin = (email, password) => {
  event.preventDefault();
  firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Contraseña Incorrecta');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
};
/* Guardar datos de login en BD */
const saveData = (userId, name, email, imageUrl) => {
  firebase.database().ref('users/' + userId).
  set({
    username: name,
    email: email,
    picture: imageUrl,
    id: userId,
  });
}

// CREAR CUENTA MAIL Y PWD
export const createAccount = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    saveData(user.uid, username, user.email, picture);
    check();
    alert('Tu usuario ha sido registrado! \nConfirma el mensaje de verificación en tu correo y seguidamente puedes Iniciar Sesión');
    check();
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/email en uso') {
      alert('Correo en uso');
    }
    if (errorCode === 'auth/email inválido') {
      alert('Email inválido');
    }
    if (errorCode === 'auth/password débil') {
      alert('Contraseña tiene que tener más de 8 caracteres y una mayúscula');
    }
    alert(`${errorCode}`);
  });

};

/* Validación de correo al usuario */
const check = () => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {}).catch((error) => {});
}

/* Cambio de contraseña */
const resetPassword = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {})
    .catch((error) => {});
}