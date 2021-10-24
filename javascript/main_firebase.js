firebase.initializeApp({
    apiKey: "AIzaSyDOb4nOsyiw1xuxBHjGKiIZ6FP7eeaD89s",
    authDomain: "medcintime-6b513.firebaseapp.com",
    projectId: "medcintime-6b513",
    storageBucket: "medcintime-6b513.appspot.com",
    messagingSenderId: "649910524760",
    appId: "1:649910524760:web:bab6441580aca7f09f232d",
    measurementId: "G-G39L8GGKRL"
  });
  
  var db = firebase.firestore();
  //var analitycs = firebase.analitycs();
  //REGITRO
  function Registro(){
    //,nombre, apellidoP, apellidoM,edad,fechaNa, sexo,direcc, cp,termnadcont

    //datos
    var email = $("#email").val();
    var pass = $("#password").val();
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
                        var user = userCredential.user;
                        //alert("Bienvenido a MedcinTime: ",user);
                        // ...
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
            $("#password").val("");
            $("#password_vf").val("");
            $("#password").focus();
            alert("Verifique su contraseña: al menos 10 caracteres");
        }
    }else{
        $("#email").val("");
        $("#email").attr('placeholder','Correo no valido');
        $("#email").focus();
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
    var user = userCredential.user;
    alert("Bienvenido a MedcinTime !" + user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Correo o contraseña incorrecta"+ errorMessage);
  });
}




  /*//Guardar Datos
function Guardar(){
    db.collection("users").add({
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        tmovil: document.getElementById('tmovil').value
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value="";
        document.getElementById('apellido').value="";
        document.getElementById('edad').value="";
        document.getElementById('tmovil').value="";
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

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