// // likes //
// export const likePost = (id) => {
//   let user = firebase.auth().currentUser;

//   // de la collection post traeme el documento con el ID, "id"
//   database.collection('posts').doc(id).get().then((respuesta) => {

//     let post = respuesta.data();

//     if (post.like == null || post.like === '') {
//       post.like = [];
//       console.log('entro al like vacio');
//     }

//     if (post.like.includes(user.uid)) {
//       for (let i = 0; i < post.like.length; i++) {
//         if (post.like[i] === user.uid) {
//           post.like.splice(i, 1); // sentencia para eliminar un elemento de un array
//           database.collection('posts').doc(id).update({ // para actualizar el array
//             like: post.like,
//           });
//         }
//       }
//     } else {
//       post.like.push(user.uid);
//       database.collection('posts').doc(id).update({
//         like: post.like,
//       });

//     }

//     document.getElementById(`numero-${doc.id}`).value = post.like.length;
//   })
//     .catch((error) => {
//       console.log('error saliendo');
//     });
// };
