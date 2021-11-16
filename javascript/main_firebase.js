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
  firebase.auth().languageCode = 'it';
  var provider = new firebase.auth.GoogleAuthProvider();
  var storageRef = "";
  //var analitycs = firebase.analitycs();
  //variables publicas
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
          if(document.getElementById('usuario_medicamentos')){
            document.getElementById('usuario_medicamentos').value=user_uid;
            leerdatos('Med');
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
function Guardar(oper){
    verificar_loggedIn();
    switch(oper){
        case 'ME':
            var url = $("#url_imagen").val();
            var fecha_regist = "";
            let medicamento = $("#medicamento").val();
            let dosis = $("#dosis").val();
            let contenido = $("#contenido").val();
            let contenido_unidad = $("#contenido_u").val();
            let dosis_unidad = $("#dosis_u").val();
            let dosis_R = $("#Dosis_R").val();
            let dosis_Ru = $("#Dosis_Ru").val();
            if($("#Fecha_esp").is(':checked')) {
                fecha_regist =  $("#fecha_input").val();
            } else {
                fecha_regist = new Date();
                fecha_regist = fecha_regist.getDate() + "-" + (fecha_regist.getMonth() +1) + "-" + fecha_regist.getFullYear();
            }
            if(url != ""){
                if(medicamento != ""){
                    if(dosis != ""){
                        if(contenido != ""){
                            if(dosis_unidad != ""){
                                if(contenido_unidad != ""){
                                    if(dosis_R != ""){
                                        if(dosis_Ru != ""){
                                            db.collection("userM_"+user_uid).add({
                                                medicamento: medicamento,
                                                dosis: dosis,
                                                contenido:  contenido,
                                                contenido_unidad:  contenido_unidad,
                                                dosis_unidad: dosis_unidad,
                                                dosis_R: dosis_R,
                                                dosis_Ru:dosis_Ru,
                                                fecha_regist: fecha_regist,
                                                url: url
                                            })
                                            .then((docRef) => {
                                                Alertas('3','','Medicamento','');
                                                window.location.href = "../Catalogo_med.html";
                                            })
                                            .catch((error) => {
                                                Alertas('4','','Medicamento',error.message);
                                            });
                                        }else{
                                            Alertas('2','Dosis_unidad','','');
                                            break;
                                        }
                                    }else{
                                        Alertas('1','Dosis','','');
                                        break;
                                    }
                                }else{
                                    Alertas('1','Contenido por unidad','','');
                                    break;
                                }
                            }else{
                                Alertas('2','Dosis_unidad','','');
                                break;
                            }
                        }else{
                            Alertas('1','Contenido Neto','','');
                            break;
                        }
                    }else{
                        Alertas('2','Dosis','','');
                        break;
                    }
                }else{
                    Alertas('1','Medicamento','','');
                    break;
                }
            }else{
                Alertas('5','url_imagen','Medicamento','Ocurrió un error, debe selecionar una imagen valida');
                break;
            }
            break;
        case 'RE':
            var url = "Aqui va la URL";
            var cantidad_xcaja = parseInt($("#contenido").val(), 10);
            var cantidad_cajas = parseInt($("#cantidad_cajas").val(), 10);
            var contenido_total = cantidad_xcaja * cantidad_cajas;
            if(url != ""){
                var fecha_inicio = $("#fecha_inicio");
                if(fecha_inicio != "") {
                    fecha_inicio =  $("#fecha_inicio").val();
                } else {
                    fecha_inicio = new Date();
                    fecha_inicio = fecha_inicio.getDate() + "-" + (fecha_inicio.getMonth() +1) + "-" + fecha_inicio.getFullYear();
                }
                db.collection("userRe_"+user_uid).add({
                    medicamento: $("#medicamento").val(),
                    cantidadTomar:$("#cantidadTomar").val(),
                    dosisTomar:$("#dosis_tomar").val(),
                    contenido_unidad: $("#contenido_u").val(),
                    cantidad_cajas: cantidad_cajas,
                    cantidadXcaja:cantidad_xcaja,
                    Total_tomar:contenido_total,
                    tcadaCant:$("#cantidad_cada").val(),
                    tcadaMedida:$("#tomar_cada_medida").val(),
                    fecha_inicio: fecha_inicio,
                    url: url
                })
                .then((docRef) => {
                    alert("Recordatorio Guardado correctamente");
                })
                .catch((error) => {
                    alert("Error adding document: ", error);
                });
            }else{
                return;
            }
            break;
    }
}
//subir imagen
function subir_img(){
    var file = selectIMG();
    var url = "";
    storageRef.child('Imagenes/'+file.name).put(file).then(function(snapshot){
        //alert("Exitoso!");
        snapshot.ref.getDownloadURL().then(function(imgurl){
            url = imgurl;
            document.getElementById('url_imagen').value=url;
        });
    }).catch((error)=>{
        alert("error: " + error);
    });
}
//Leer Datos
function leerdatos(oper){
    //verificar_loggedIn();
    switch(oper){
        case 'Med':
            var usuario = document.getElementById('usuario_medicamentos').value;
            var card = document.getElementById('tabla_body');
            var num = 0;
            db.collection("userM_"+usuario).onSnapshot((querySnapshot)=>{
                card.innerHTML = '';
                querySnapshot.forEach((doc)=>{
                    num  +=1;
                    newCard(doc.id,'images/card-background/img1.jpg',
                    doc.data().medicamento,
                    doc.data().contenido_unidad + " " + doc.data().dosis_unidad, doc.data().contenido + " " + doc.data().dosis,
                    doc.data().url,
                    doc.data().fecha_regist,'8',num);
                });
            });
            break;
    }
}
//consultar informacion de un elemento
function Consultas(oper,id){
    verificar_loggedIn();
    switch(oper){
        case 'MD':
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
            break;
        case 'RE':
            try{
                db.collection("userRe_"+user_uid).onSnapshot((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        if(doc.id == id){
                            document.getElementById('med_id').value = doc.id;
                            document.getElementById('med_nombre').value = doc.data().medicamento;
                            document.getElementById('med_contenido').value = doc.data().contenido;
                            document.getElementById('med_unidad').value = doc.data().contenido_unidad;
                            document.getElementById('med_cantidad_tomar').value = doc.data().cantidadTomar;
                            document.getElementById('med_dosis').value = doc.data().dosisTomar;
                            document.getElementById('med_cant_cajas').value = doc.data().cantidad_cajas;
                            document.getElementById('med_acntXcaja').value = doc.data().cantidadXcaja;
                            document.getElementById('med_tomar_cada').value = doc.data().tcadaCant;
                            document.getElementById('med_tomar_medida').value = doc.data().tcadaMedida;
                            document.getElementById('fecha_inicio').value = doc.data().fecha_inicio;
                            $("#img").attr('src',doc.data().url);
                            document.getElementById('url_imagen').value = doc.data().url;
                        }
                    });
                });
            }catch(e){
                alert(e.message);
            }
            break;
    }
}
function Actualizar(oper){
    var id= $("#med_id").val();
    var url = $("#url_imagen").val();
    switch (oper){
        case 'MD':
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
            break;
        case 'RE':
            if(url != "" && id != ""){
                var cantidad_xcaja = parseInt($("#contenido").val(), 10);
                var cantidad_cajas = parseInt($("#cantidad_cajas").val(), 10);
                var contenido_total = cantidad_xcaja * cantidad_cajas;
                var fecha_inicio = $("#fecha_inicio");
                if(fecha_inicio != "") {
                    fecha_inicio =  $("#fecha_inicio").val();
                } else {
                    fecha_inicio = new Date();
                    fecha_inicio = fecha_inicio.getDate() + "-" + (fecha_inicio.getMonth() +1) + "-" + fecha_inicio.getFullYear();
                }
                db.collection("userRe_"+user_uid).doc(id).set({
                    medicamento: $("#medicamento").val(),
                    cantidadTomar:$("#cantidadTomar").val(),
                    dosisTomar:$("#dosis_tomar").val(),
                    contenido_unidad: $("#contenido_u").val(),
                    cantidad_cajas: cantidad_cajas,
                    cantidadXcaja:cantidad_xcaja,
                    Total_tomar:contenido_total,
                    tcadaCant:$("#cantidad_cada").val(),
                    tcadaMedida:$("#tomar_cada_medida").val(),
                    fecha_inicio: fecha_inicio,
                    url: url
                })
                .then((docRef) => {
                    OcultarModal('EditarRec');
                    alert("Recordatorio Actualizado correctamente");
                })
                .catch((error) => {
                    alert("Error adding document: ", error.message);
                });
            } 
            break;
    }
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
*/