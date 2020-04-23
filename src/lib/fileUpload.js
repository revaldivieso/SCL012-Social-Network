window.onload = inicializar;
const file;
const storageRef;
const imagesRef;

const inicializar = () => {
file = document.getElementById('file');
file.addEventListener('change', uploadImageFirebase, false);
storageRef = firebase.storage().ref();

imagesRef = firebase.database().ref().child('imagesRef');

 mostraImageFB();
}

const mostraImageFB = () => {
imagesRef.on('value', function(snaphopt){
    const datos = snaphopt.val();
    const result = "";
    for(var key in datos){
        result += '<img width="320" src="' + datos[key].url + '"/>';
    }
    document.getElementById('imgFirebase').innerHTML = result;
})
}

const uploadImageFirebase = () => {
    const imageUpload = fichero.files[0];
    const uploadTask = storageRef.childs('fotos/' + imageUpload.name).put(imageUpload);

     uploadTask.on('state_changed', 
     function(snaphopt){
        //progreso de la subida de imagen
     }, function(error) {
         //gestionar error si se produce
         alert('Hubo un error');
     }, function () {
         const downloadURL = uploadTask.snaphopt.downloadURL;
        createNodoFirebase(imageUpload.name, downloadURL);
     });
}

const createNodoFirebase = (nameImg, downloadURL) => {
    imagesRef.push({ name: nameImg, url: downloadURL })
}