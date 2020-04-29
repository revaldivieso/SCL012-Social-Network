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
        <div class="listPosts" id="lista texts">
        <div class="post-complet">
          <div id="img-post" class="img"></div>
          <textarea name="message" id="message" class="texts"></textarea> 
          </div>
          <div id="postButton">
            <input type="button" value="Postear" id="buttonPost" class="firstButton">
            <button onclick="document.getElementById('file-attach').click()">Adjuntar</button>
            <input type="file"  onChange="onAttach(event)" style="display:none" name="fichero" value="" id="file-attach" class="hidden">
          </div>           
        </div>
      </div>
    </div>
  </section>`;

  // CREACIÓN DE POSTS
  const divPosts = document.getElementById('postsUsers');
  const createPosts = firebase.database().ref().child('posts/');
  let attach = undefined;
  // Mostrar imagen en el DOM
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  window.onAttach = (evt) => {
    if (evt && evt.target && evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];
      const container = document.getElementById('img-post');
      toBase64(file).then((res) => {
        attach = file;
        container.innerHTML = `<img class="img" src="${res}"/>`;
      });
    }
  };

  createPosts.on('child_added', async (snap) => {
    const thePostDiv = document.createElement('div');
    thePostDiv.id = 'posts';
    const user = firebase.auth().currentUser;
    const drawPost = (snap, imageUrl) => {
      const imgHeader = imageUrl
        ? `<div id="imgPost${snap.key}" class="imgPosts"><img class='imagePosts' src="${imageUrl}" /></div>`
        : '';
      const editBtn =
        snap.val().uid === user.uid
          ? `<input type="button" value="Editar" id="buttonLike${snap.key}" class="deleteEdit" onclick="window.updatePost('${snap.key}')"></input>`
          : '';
      thePostDiv.innerHTML = `<div class="postBox" id="post${snap.key}">
<div class="encabezado"><img src="${
        snap.val().authorPic || ''
      }"><div id="usuario">${snap.val().author}</div></div>
<hr>
<div id="datePost" class="textPosts">${snap.val().createDate}</div>
${imgHeader}
<div contenteditable="true" id="bodyPost${snap.key}" class="textPosts">${
        snap.val().body
      }</div>
  

<input type="button" value="Eliminar" id="buttonRemove${
        snap.key
      }" class="deleteEdit" onclick="window.deletePost('${snap.key}')">
<input type="button" value="Like (${snap.val().starCount})" id="buttonLike${
        snap.key
      }" class="deleteEdit" onclick="window.likePost('${snap.key}')">
  ${editBtn}
<hr>
</div>`;
      divPosts.appendChild(thePostDiv);
    };
    if (snap.image) {
      drawPost(snap);
    } else {
      try {
        const imageRef = firebase.storage().ref(snap.val().image);
        const image = await imageRef.getDownloadURL();
        drawPost(snap, image);
      } catch (e) {
        drawPost(snap);
      }
    }
  });

  // BOTÓN PARA POSTEAR
  document.getElementById('buttonPost').addEventListener('click', () => {
    const database = firebase.database();
    const storageRef = firebase.storage().ref();
    const user = firebase.auth().currentUser;
    // SE RECUPERAN DATOS DE USUARIO REGISTRADO CON GMAIL
    const uid = user.uid;
    const username = user.displayName;
    const picture = user.photoURL;
    const place = '';
    const date = new Date();
    const body = document.getElementById('message').value;
    document.getElementById('message').value = '';
    const nameRef = `${date.getTime()}_${attach.name}`;
    const imageRef = storageRef.child(nameRef);
    document.getElementById('img-post').value = '';
    // FUNCIÓN QUE ESCRIBE NUEVO POST
    const writeNewPost = (uid, username, picture, place, body, image) => {
      // ENTRADA DE UN NUEVO POST
      const postData = {
        author: username,
        uid,
        body,
        place,
        starCount: 0,
        like: [],
        authorPic: picture,
        createDate: date.toUTCString(),
        image,
      };
      // SE GENERA UN ID PARA EL NUEVO POST
      const newPostKey = firebase.database().ref().child('posts').push().key;
      document.getElementById('message').value = '';
      // SE ESCRIBE LOS DATOS DEL NUEVO POST SIMULTÁNEAMENTE EN LISTA DE POSTS, LISTA DE PROPIETARIOS DE LOS POSTS Y LOS LUGARES ASOCIADOS AL POST
      const updates = {};
      updates[`/posts/${newPostKey}`] = postData;
      updates[`/user-posts/${uid}/${newPostKey}`] = postData;
      updates[`/places/${place}/${newPostKey}`] = postData;
      return firebase.database().ref().update(updates);
    };
    imageRef.put(attach);
    // LLAMADA A FUNCIÓN QUE IMPRIME POSTS
    writeNewPost(uid, username, picture, place, body, nameRef);
  });

  /* FUNCIÓN PARA ELIMINAR POSTS */
  window.deletePost = (id) => {
    const questions = confirm('¿Deseas eliminar post?');
    if (questions) {
      const userId = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref()
        .child('/user-posts/' + userId + '/' + id)
        .remove();
      firebase
        .database()
        .ref()
        .child('posts/' + id)
        .remove();
      const post = document.getElementById('post' + id);
      post.remove();
    }
  };
  // Función Like post
  const updateStarCount = (postRef, id) => {
    const key = postRef.key;
    postRef.transaction(
      (post) => {
        if (post) {
          if (post.stars && post.stars[id]) {
            post.starCount--;
            post.stars[id] = null;
          } else {
            post.starCount++;
            if (!post.stars) {
              post.stars = {};
            }
            post.stars[id] = true;
          }
        }
        return post;
      },
      (error, committed, snapshot) => {
        if (error) {
          console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          console.log(
            'We aborted the transaction (because ada already exists).'
          );
        } else {
          const data = snapshot.val();
          const input = document.getElementById(`buttonLike${key}`);
          input.value = `Like (${data.starCount})`;
          console.log('User ada added!');
        }
        console.log("Ada's data: ", snapshot.val());
      }
    );
  };

  window.likePost = async (postElement) => {
    const userId = firebase.auth().currentUser.uid;
    const postRef = firebase.database().ref(`/posts/${postElement}`);

    updateStarCount(postRef, userId);
  };

  /* función para editar post */
  window.updatePost = (uid) => {
    const postEdit = document.getElementById(`bodyPost${uid}`);
    const ref = firebase.database().ref(`posts/${uid}`);
    const obj = {
      body: postEdit.innerHTML,
    };
    ref.update(obj);
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
    firebase
      .auth()
      .signOut()
      .then(() => {
        goLoginPage();
        console.log('salir');
      })
      .catch((error) => {
        console.log('error saliendo');
      });
  });
};
