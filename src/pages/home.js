import { perfilInfo } from './perfil.js';

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

    thePostDiv.innerHTML = `<div class="postBox" id="post${snap.key}">
  <div class="encabezado"><img src="${snap.val().authorPic || ''}"><div id="usuario">${snap.val().author}</div></div>
  <hr>
  <div id="datePost" class="textPosts">${snap.val().createDate}</div>
  <div id="bodyPost" class="textPosts"><p>${snap.val().body}</p></div>
  <hr>
  <input type="button" id="like" value="Like"> 
  <input type="button" value="Eliminar" id="buttonRemove${snap.key}" class="deleteEdit" onclick="window.deletePost(${snap.key})">
  <hr>
  </div>`;
    divPosts.appendChild(thePostDiv);
  });


  // BOTÓN PARA POSTEAR
  document.getElementById('buttonPost').addEventListener('click', () => {
    const database = firebase.database();
    const user = firebase.auth().currentUser;
    console.log(user);

    let uid = user.uid;
    let username = user.displayName;
    let picture = user.photoURL;
    let place = '';
    let date = new Date();
    let body = document.getElementById('message').value;
    document.getElementById('message').value = '';
    const writeNewPost = (uid, username, picture, place, body) => {
      // A post entry.
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

      // Get a key for a new Post.
      let newPostKey = firebase.database().ref().child('posts').push().key;
      document.getElementById('message').value = '';
      // Write the new post's data simultaneously in the posts list and the user's post list.
      let updates = {};
      updates['/posts/' + newPostKey] = postData;
      updates['/user-posts/' + uid + '/' + newPostKey] = postData;
      updates['/places/' + place + '/' + newPostKey] = postData;
      return firebase.database().ref().update(updates);
    }
    // LLAMADA A FUNCIÓN QUE IMPRIME POSTS
    writeNewPost(uid, username, picture, place, body);
    //  printPost();
  });

  // FUNCIÓN PARA ELIMINAR POSTS
  window.deletePost = (id) => {
    const questions = confirm('¿Deseas eliminar post?');
    if (questions) {
      const userId = firebase.auth().currentUser.uid;
      firebase.database().ref().child('/user-posts/' + userId + '/' + id).remove();
      firebase.database().ref().child('posts/' + id).remove();
      while (thePostDiv.firstChild) thePostDiv.removeChild(thePostDiv.firstChild);
      alert('Se eliminó el post');
      location.reload();
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
