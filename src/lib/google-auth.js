// LOGIN CON GOOGLE
export const googleLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const getProfilePicUrl = () => {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
};
