document.getElementById('likes').addEventListener('click', () => {
  const user = firebase.auth().currentUser.id;
  console.log('alo like?');

  // de la collection post traeme el documento con el ID, "id"
  database.collection('posts').doc(id).get().then((query) => {
    const post = query.data();

    if (post.like == null || post.like === '') {
      post.like = [];
      console.log('entro al like vacio');
    }

    if (post.like.includes(user.uid)) {
      for (let i = 0; i < post.like.length; i++) {
        if (post.like[i] === user.uid) { // viendo si el usuario se encuentra en el array
          post.like.splice(i, 1); // eliminando un elemento de un array

          database.collection('posts').doc(id).update({ // actualizamos el array
            like: post.like,
          });
        }
      }
    } else {
      post.like.push(user.uid); //  incluyeme este usuario en el array
      database.collection('posts').doc(id).update({
        like: post.like,
      });
    }
  })
    .catch((error) => {
      console.log(error);
    });
});
