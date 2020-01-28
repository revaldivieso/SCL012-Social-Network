import {
    perfilInfo
} from './perfil.js';

export const goHome = () => {
    document.getElementById('root').innerHTML = `<div class="inicio-home" id= "inicio"></div>
            <div class="topnav">
                <a id="home" href="#">Home</a>
                <a id="btn-perfil">Perfil</a>
                <a id="btnLogOut" href="#">Cerrar sesión</a>
                <a href="#" style="float:right">Configuración</a>
            </div>
            <div id="perfil-content"></div>`;

    // Button perfil
    document.getElementById("btn-perfil").addEventListener("click", (evt) => {
        perfilInfo();
    });

    // Button Logout.
    document.getElementById("btnLogOut").addEventListener("click", () => {
        firebase.auth().signOut()
            .then(function () {
                goLoginPage();
                console.log("salir");
            })
            .catch(function (error) {
                console.log("error saliendo");
            });
    });
}

//   #Agregando Posts
//   db.collection("posts").add({
//   name: "Tami",
//   place: "Cajon del Maipo",
//   description: "Lugar para acampar"
//   })
//   .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function(error) {
//   console.error("Error adding document: ", error);
//   });