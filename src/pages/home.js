import {
  perfilInfo
} from './perfil.js';

export const goHome = () => {
  window.location.hash = '/home';
  document.getElementById('root').innerHTML = `
  <header class="header">
          <img class="logoBar" src="img/logoOcre.png" alt="logo-bitacora"/>
          <nav class="topnav">
                <a id="home" href="#">Home</a>
                <a id="btn-perfil">Perfil</a>
          </nav>
          <a id="btnLogOut" href="#" class="logOut">Cerrar sesión</a>
  </header>
  <section class= "bodyHome">
    <div id="perfil-content"></div>
    <div id="writePost" class="post" >  
      <h4 class="publicaciones">PUBLICACIONES</h4>
      <div class="postUsers" id="postsUsers"> 
        <div class="listPosts" id="lista">
          <textarea name="message" id="message" class="texts"></textarea> 
          <div id="postButton">
            <input type="button" value="Postear" id="buttonPost" class="firstButton">
          </div>           
        </div>
      </div>
    </div>
  </section>`;
  //CREACIÓN DE POSTS
  const divPosts = document.getElementById('postsUsers');
  const createPosts = firebase.database().ref().child('posts/');
  createPosts.on('child_added', snap => {
    const thePostDiv = document.createElement('div');
    thePostDiv.id = "posts";
    thePostDiv.innerHTML = `<div class="postBox" id="post${snap.key}">
  <div class="encabezado"><img src="${snap.val().authorPic || ''}"><div id="usuario">${snap.val().author}</div></div>
  <hr>
  <div id="datePost" class="textPosts">${snap.val().createDate}</div>
  <div id="bodyPost" class="textPosts"><p>${snap.val().body}</p></div>
  <input type="button" value="Eliminar" id="buttonRemove${snap.key}" class="deleteEdit" onclick="window.deletePost('${snap.key}')">
  <hr>
  </div>`;
    divPosts.appendChild(thePostDiv);
  });


  // BOTÓN PARA POSTEAR
  document.getElementById('buttonPost').addEventListener('click', () => {
    const database = firebase.database();
    const user = firebase.auth().currentUser;
    // SE RECUPERAN DATOS DE USUARIO REGISTRADO CON GMAIL
    let uid = user.uid;
    let username = user.displayName;
    let picture = user.photoURL;
    let place = '';
    let date = new Date();
    let body = document.getElementById('message').value;
    document.getElementById('message').value = '';
    // FUNCIÓN QUE ESCRIBE NUEVO POST   
    const writeNewPost = (uid, username, picture, place, body) => {
      // ENTRADA DE UN NUEVO POST
      let postData = {
        author: username,
        uid: uid,
        body: body,
        place: place,
        starCount: 0,
        like: [],
        authorPic: picture,
        createDate: date.toUTCString(),
      };
      // SE GENERA UN ID PARA EL NUEVO POST
      let newPostKey = firebase.database().ref().child('posts').push().key;
      document.getElementById('message').value = '';
      // SE ESCRIBE LOS DATOS DEL NUEVO POST SIMULTÁNEAMENTE EN LISTA DE POSTS, LISTA DE PROPIETARIOS DE LOS POSTS Y LOS LUGARES ASOCIADOS AL POST
      let updates = {};
      updates['/posts/' + newPostKey] = postData;
      updates['/user-posts/' + uid + '/' + newPostKey] = postData;
      updates['/places/' + place + '/' + newPostKey] = postData;
      return firebase.database().ref().update(updates);
    }
    // LLAMADA A FUNCIÓN QUE IMPRIME POSTS
    writeNewPost(uid, username, picture, place, body);
  });

  /*FUNCIÓN PARA ELIMINAR POSTS*/
  window.deletePost = (id) => {
    const questions = confirm('¿Deseas eliminar post?');
    if (questions) {
      const userId = firebase.auth().currentUser.uid;
      firebase.database().ref().child('/user-posts/' + userId + '/' + id).remove();
      firebase.database().ref().child('posts/' + id).remove();
      const post = document.getElementById("post" + id);
      post.remove();
    }
  };
  // BOTÓN QUE LLEVA AL PERFIL DEL USUARIO
  document.getElementById('btn-perfil').addEventListener('click', (evt) => {
    perfilInfo();
  });
  // BOTÓN QUE LLEVA AL HOME
  document.getElementById('home').addEventListener('click', () => {
    goHome();
  });
  // BOTÓN DE CIERRE DE SESIÓN LOGOUT
  document.getElementById('btnLogOut').addEventListener('click', () => {
    firebase.auth().signOut()
      .then(() => {
        goLoginPage();
        console.log('salir');
      })
      .catch((error) => {
        console.log('error saliendo');
      });
  });
};