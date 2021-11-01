firebase.initializeApp({
    apiKey: "AIzaSyDOb4nOsyiw1xuxBHjGKiIZ6FP7eeaD89s",
    authDomain: "medcintime-6b513.firebaseapp.com",
    projectId: "medcintime-6b513",
    storageBucket: "medcintime-6b513.appspot.com",
    messagingSenderId: "649910524760",
    appId: "1:649910524760:web:bab6441580aca7f09f232d",
    measurementId: "G-G39L8GGKRL"
  });
  //referencias e instancias de Firebase
  var db = firebase.firestore();
  firebase.auth().languageCode = 'it';
  var provider = new firebase.auth.GoogleAuthProvider();
  var storageRef = "";
  //var analitycs = firebase.analitycs();
  var user_uid = "";
  //Verificar usuario inicia sesion
  $(document).ready(function(){
    verificar_loggedIn();
  });
  function verificar_loggedIn(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          user_uid = user.uid;
          storageRef = firebase.storage().ref("Medicamentos_"+user_uid);
          //alert("usuario: " + user.uid);
        } else {
          // User not logged in or has just logged out.
          window.location.href = "../login.html";
        }
      });
  }
  //REGITRO
  function Registro(){
    //,nombre, apellidoP, apellidoM,edad,fechaNa, sexo,direcc, cp,termnadcont
    //datos
    var email = $("#emailR").val();
    var pass = $("#passwordR").val();
    var pass2 = $("#password_vf").val();

    var correo = false;
    var contraseña = false;
    var terminos = false;

    //validación
    if ($('#terminos').is(':checked')){
        terminos = true;
    }else{
        alert("Debe aceptar terminos y condiciones para continuar");
    }
    if(Validaremail(email)){
        correo = true;
        if(Validadpass(pass,pass2)){
            contraseña = true;
            if(terminos == true){
                if(correo == true && contraseña == true){
                    //Registrarse
                    firebase.auth().createUserWithEmailAndPassword(email, pass)
                    .then((userCredential) => {
                        // Signed in
                        var user = userCredential.user.uid;
                        //$("#modalRegistro").modal('hide');
                        db.collection("users").add({
                            usuario: user,
                            mail: email
                        })
                        .then((docRef) => {
                            window.location.href = "../index.html";
                        })
                        .catch((error) => {
                            alert("Error adding document: ", error);
                        });
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert("Error: " + errorCode + " ",errorMessage);
                        // ..
                    });
                }
            }
        }else{
            $("#passwordR").val("");
            $("#password_vf").val("");
            $("#password").focus();
            alert("Verifique su contraseña: al menos 10 caracteres");
        }
    }else{
        $("#emailR").val("");
        $("#emailR").attr('placeholder','Correo no valido');
        $("#emailR").focus();
        //$("email").attr('style','#placeholder{color:red;}');
    }
  }
  function Validaremail(email){
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }
  function Validadpass(pass,pass2){
    if(pass.length >= 10 && pass2.length >= 10){
        if(pass == pass2){
            return true;
        }else{
            return false;
        }
    }else{
        return false; 
    }
  }
function Acceder(){
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user.uid;
    alert("Bienvenido a MedcinTime !" + user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Correo o contraseña incorrecta"+ errorMessage);
  });
}
function Cerrar_sesion(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

function AccesoGoogle(){
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user.uid;
    debugger
    alert("Bienvenido a MedcinTime: " + user);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    alert("Error al iniciar accder: " + errorCode + " " + errorMessage);
  });
}

//Guardar
function Guardar_Perfil(){
    db.collection("userP_"+user_uid).add({
        nombre: $("#").val(),
        apellido: $("#").val(),
        edad: $("#").val(),
        tmovil: $("#").val()
    })
    .then((docRef) => {
        alert("Perfil actualizado");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}
//Medicamentos
function Guardar_M(){
    var fecha_esp = "";
    if($("#Fecha_esp").is(':checked')) {
        fecha_esp =  $("#fecha_input").val();
    } else {
        fecha_esp = "none";
    }
    db.collection("userM_"+user_uid).add({
        medicamento: $("#medicamento").val(),
        dosis: $("#dosis").val(),
        fecha_esp: fecha_esp,
        cada: $("#tiempo").val(),
        medida: $("#medida").val()
    })
    .then((docRef) => {
        selectIMG();
        subir_img();
        alert("Medicamento Guardado correctamente");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}
//subir imagen
function subir_img(){
    var file = selectIMG();
    storageRef.child('Imagenes/').put(file).then(function(snapshot){
        alert("Exitoso!");
    }).catch((error)=>{
        alert("error: " + error);
    });
}

  /*
//Eliminar documento
function Borrar(id){
    db.collection("users").doc(id).delete().then(function(){
        alert("El registro a sido eliminado");
    }).catch(function(error){
        alert("El registro NO a sido eliminado: ",error);
    });
}
 
//Actualizar documento
function Editar(id,nom,ape,edad,tel){
    $('#modalEditar').modal('show');
    document.getElementById('nombre1').value=nom;
    document.getElementById('apellido1').value=ape;
    document.getElementById('edad1').value=edad;
    document.getElementById('tmovil1').value=tel;
    document.getElementById('ID').value=id;
}
function Update(){
    var id= document.getElementById('ID').value;
    var update = db.collection("users").doc(id);
    return update.update({
        nombre: document.getElementById('nombre1').value,
        apellido: document.getElementById('apellido1').value,
        edad: document.getElementById('edad1').value,
        tmovil: document.getElementById('tmovil1').value
    }).then((docRef) => {
        $('#modalEditar').modal('hide');
        //console.log("Document written with ID: ", docRef.id);
        //window.location.href = 'index.html';   
    })
    .catch((error) => {
        $('#modalEditar').modal('hide');
        alert("Error: "+ error);
    });
}

//Leer Datos
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot)=>{
    tabla.innerHTML = '';
    querySnapshot.forEach((doc)=>{
    tabla.innerHTML+=`
        <tr style="background-color: rgb(163, 223, 148);">
            <td scope='row'>${doc.id}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().apellido}</td>
            <td>${doc.data().edad}</td>
            <td>${doc.data().tmovil}</td>
            <td>
            <a class="btn btn-danger" id="eliminar" onclick="Borrar('${doc.id}')" data-toggle="Eliminar" title="Eliminar">
            <i class="fas fa-trash"></i></a>
            <a class="btn btn-warning" onclick="Editar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().edad}','${doc.data().tmovil}');" data-toggle="Editar" title="Editar">
            <i class="fas fa-pencil-alt"></i></a>
            </td>
        </tr>`
                        
    });
});*/