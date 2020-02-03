export const perfilInfo = () => {
  window.location.hash = '/profile';
  const user = firebase.auth().currentUser;
  document.getElementById('perfil-content').innerHTML =
    `<div class="row">
       <div class="side">
         <div class="fakeimg">
             <img src= "${user.photoURL}" class="picture" alt="foto de perfil"/>
         </div> 
         <div class="info"> 
             <span class="name">${user.displayName}</span>
             <span class="email">${user.email}</span><br>
         </div>
         <div>
             <button id="btnSave-perfil" type="submit" class="btnSave">Editar perfil</button>
         </div>
       </div>
      
     </div>`;

  /* Button editar perfil */
  document.getElementById('btnSave-perfil').addEventListener('click', () => {
    modal.style.display = "block";

    perfilEdit();
   
       const modal = document.getElementById('modalUser');
       const span = document.getElementsByClassName("close")[0];

      span.addEventListener('click', () => {
        modal.style.display = "none";
      });
      window.addEventListener('click', (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
  });
};

const perfilEdit = () => {
  window.location.hash = '/editProfile';
  const user = firebase.auth().currentUser;
  document.getElementById('perfil-content').innerHTML =
  `  <div id="modalUser" class="modal">
             <div class="perfil-section modal-content"
              <span class="close">&times;</span>
                    <div class="container-profile">
                        <div class="ft-perfil">
                         <img id= "photoChanges" src= "${user.photoURL}" class="ft" alt="foto de perfil"/>
                        </div>
                    </div>
                 <form class="perfil-container">
                     <label for="Nombre completo"></label>
                     <input class="datosPerfil" type="text" id="perfilNombre" name="username" Placeholder="Nombre completo" required     value=${user.displayName} />
                     <label for="Email"></label> 
                     <input class="datosPerfil" type="email" id="perfilEmail " name="email" Placeholder="Email" required   value=${user.email} />
                     <button class="datosPerfil modal" id="save-perfil" type="submit">Actualizar</button>
                </form>
             </div>
    </div>
</div>`;

  /* Button actualizar perfil */
  document.getElementById('save-perfil').addEventListener('click', () => {
    updateProfile();
  });
};

/* editar Datos perfil */
const updateProfile = () => {
    const name = document.getElementById("perfilNombre").value;
    const user = firebase.auth().currentUser;
    const photo = document.getElementById("photoChanges").value;
    const file = ($('#my_file'))[0].files[o];
    console.log(file);
    if (user != null) {
      user.updateProfile({
        displayName: name,
        photoURL: photo,
      }).cath((error));
      }
    };

