firebase.initializeApp({
    apiKey: "AIzaSyDOb4nOsyiw1xuxBHjGKiIZ6FP7eeaD89s",
    authDomain: "medcintime.ml",
    projectId: "medcintime-6b513",
    storageBucket: "medcintime-6b513.appspot.com",
    messagingSenderId: "649910524760",
    appId: "1:649910524760:web:bab6441580aca7f09f232d",
    measurementId: "G-G39L8GGKRL"
  });
  //referencias e instancias de Firebase
  var db = firebase.firestore();
  var ln = navigator.language || navigator.userLanguage;
  switch(ln.substr(0,2)){
    case 'es':
        firebase.auth().languageCode = 'es';
        break;
    case 'en':
        firebase.auth().languageCode = 'en';
        break;
    case 'it':
        firebase.auth().languageCode = 'it';
        break;
    case 'de':
        firebase.auth().languageCode = 'de';
        break;
    case 'pt':
        firebase.auth().languageCode = 'pt';
        break;
    case 'zh':
        firebase.auth().languageCode = 'zh';
        break;
  }
  var provider = new firebase.auth.GoogleAuthProvider();
  var storageRef = firebase.storage().ref();
  //var analitycs = firebase.analitycs();
  //variables publicas
  var user_uid = "";
  function verificar_loggedIn(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          let verifystatus = user.emailVerified;
          if(verifystatus != true){
            alert('Verifica tu correo, se envió un elace de verificación a tu dirección de correo electronico');
          }
          user_uid = user.uid;
          storageRef = firebase.storage().ref("Medicamentos_"+user_uid);
          if(document.getElementById('usuario_medicamentos')){
            document.getElementById('usuario_medicamentos').value=user_uid;
            leerdatos();
          }
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
                            VerifyEmail();
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

function VerifyEmail(){
    firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    
  }).catch((error)=>{
      alert("Error: "+error.message);
  });
}
function Acceder(){
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user.uid;
    alert("Bienvenido a MedcinTime !" + user);
    window.location.href="../index.html";
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
        window.location.href="../login.html";
      }).catch((error) => {
        // An error happened.
        Alertas('4','','Cerrar sesión',error.message);
      });
}

function ResetPassword(){
    var auth  = firebase.auth();
    var email = $("#email1").val();

    if(email != ""){
        auth.sendPasswordResetEmail(email).then((result)=>{
            if(document.getElementById('label_forget')){
                document.getElementById('label_forget').style.display = ""
            }
            let btn = document.getElementById('btn_cancel_reset');
            $("#btn_cancel_reset").attr("class",'btn btn-success modalRegistro');
            btn.innerHTML = "Aceptar";
        }).catch((error)=>{
            Alertas('4','','Reset password',error.message);
        });
    }else{
        $("#email1").focus();
    }
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
    alert("Bienvenido a MedcinTime: " + user);
    window.location.href = "../index.html";
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
function Guardar(){
    verificar_loggedIn();
    var user = $("#usuario_medicamentos").val();
    var url = $("#url_imagen").val();
    var fecha_regist = "";
    let medicamento = $("#medicamento").val();
    let dosis = $("#dosis").val();
    let contenido = $("#contenido").val();
    let contenido_unidad = $("#contenido_u").val();
    let dosis_unidad = $("#dosis_u").val();
    //let dosis_R = $("#Dosis_R").val();
    //let dosis_Ru = $("#Dosis_Ru").val();
    if($("#Fecha_esp").is(':checked') && $("#fecha_input").val() != "") {
        fecha_regist =  $("#fecha_input").val();
    } else {
        fecha_regist = new Date().toLocaleDateString();
        //fecha_regist = fecha_regist.getDate() + "-" + (fecha_regist.getMonth() +1) + "-" + fecha_regist.getFullYear();
    }
    if(url != ""){
        if(medicamento != ""){
            if(dosis != ""){
                if(contenido != ""){
                    if(dosis_unidad != ""){
                        if(contenido_unidad != ""){
                            if(user != "" && user != null){
                                db.collection("userM_"+user).add({
                                    medicamento: medicamento,
                                    dosis: dosis,
                                    contenido:  contenido,
                                    contenido_unidad:  contenido_unidad,
                                    dosis_unidad: dosis_unidad,
                                    fecha_regist: fecha_regist,
                                    url: url
                                })
                                .then((docRef) => {
                                    //Alertas('3','','Medicamento','');
                                    window.location.href = "../Catalogo_med.html";
                                })
                                .catch((error) => {
                                    Alertas('4','','Medicamento',error.message);
                                });
                            }
                        }else{
                            Alertas('1','Contenido por unidad','','');
                            return;
                        }
                    }else{
                        Alertas('2','Dosis_unidad','','');
                        return;
                    }
                }else{
                    Alertas('1','Contenido Neto','','');
                    return;
                }
            }else{
                Alertas('2','Dosis','','');
                return;
            }
        }else{
            Alertas('1','Medicamento','','');
            return;
        }
    }else{
        Alertas('5','url_imagen','Medicamento','Ocurrió un error, debe selecionar una imagen valida');
        return;
    }
}
//subir imagen
function subir_img(){
    var file = selectIMG();
    var url = "";
    storageRef.child('Imagenes/'+file.name).put(file).then(function(snapshot){
        snapshot.ref.getDownloadURL().then(function(imgurl){
            url = imgurl;
            document.getElementById('url_imagen').value=url;
        });
    }).catch((error)=>{
        alert("error: " + error.message);
    });
}
//Leer Datos
function leerdatos(oper){
    var usuario = document.getElementById('usuario_medicamentos').value;
    if(document.getElementById('tabla_body')){
        var card = document.getElementById('tabla_body');
        db.collection("userM_"+usuario).onSnapshot((querySnapshot)=>{
            card.innerHTML = '';
            querySnapshot.forEach((doc)=>{
                newCard(doc.id,'images/card-background/img1.jpg',
                doc.data().medicamento,
                doc.data().contenido_unidad + " " + doc.data().dosis_unidad, doc.data().contenido + " " + doc.data().dosis,
                doc.data().url,
                doc.data().fecha_regist);
            });
        });
    }
}
//consultar informacion de un elemento
function Consultas(id){
    verificar_loggedIn();
    try{
        db.collection("userM_"+user_uid).onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                if(doc.id == id){
                    //var date = new Date(doc.data().fecha_regist);
                    //const localDate = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay();
                    document.getElementById('med_id').value = doc.id;
                    document.getElementById('med_nombre').value = doc.data().medicamento;
                    document.getElementById('med_contenido').value = doc.data().contenido;
                    document.getElementById('med_unidad').value = doc.data().contenido_unidad;
                    document.getElementById('med_dosis').value = doc.data().dosis;
                    document.getElementById('fecha_registro').value = doc.data().fecha_regist;
                    $("#img").attr('src',doc.data().url);
                    document.getElementById('url_imagen').value = doc.data().url;
                }
            });
        });
    }catch(e){
        alert(e.message);
    }
}
function Actualizar(){
    var id= $("#med_id").val();
    var url = $("#url_imagen").val();
    if(url != "" && id != ""){
        db.collection("userM_"+user_uid).doc(id).set({
            medicamento: $("#med_nombre").val(),
            dosis: $("#med_dosis").val(),
            contenido: $("#med_contenido").val(),
            contenido_unidad: $("#med_unidad").val(),
            fecha_regist: $("#fecha_registro").val(),
            url: url
        })
        .then((docRef) => {
            OcultarModal('EditarMed');
            alert("Medicamento Actualizado correctamente");
        })
        .catch((error) => {
            alert("Error adding document: ", error.message);
        });
    }
}
function Borrar(id,url){
    let user = $("#usuario_medicamentos").val();
    if(id != "" && id != null && user != "" && user != null){
        db.collection("userM_"+user).doc(id).delete().then(function(){
            //success
        }).catch(function(error){
            Alertas('4','','Medicamento',error.message);
        });
        BorrarIMG(url);
    }else{
        Alertas('2','id o usuario','','');
    }
}
function BorrarIMG(url){
    if(url != "" && url != null){
        var imgRef = firebase.storage().refFromURL(url);
        imgRef.delete().then(function() {
            //success
        }).catch(function(error) {
            alert('Error: '+error.message);     
        });
    }else{
        return;
    }
}