$(document).ready(function(){
    if(document.getElementById('fecha_input')){
        document.getElementById('fecha_input').style.display = "none";
    }else if(document.getElementById('file_selector') && document.getElementById('med_id')){
        document.getElementById('file_selector').style.display = "none";
    }
    if(document.getElementById('label_forget')){
        document.getElementById('label_forget').style.display = "none"
    }
  });
function MostrarModal(nombre){
    $('#modal'+nombre).modal({backdrop: 'static', keyboard: false});
    $("#modal"+nombre).modal('show');
}
function OcultarModal(nombre){
    $("#modal"+nombre).modal('hide');
    if(document.getElementById('email')){
        $("#email").focus();
    }
    //$("#email").attr("style","backgroud-color:#cef2f1;");
}
function Checks(Checkbox){
    switch (Checkbox){
        case 'NM':
            if($("#Fecha_esp").is(':checked')) {
                document.getElementById('fecha_input').style.display = "";
            } else {
                document.getElementById('fecha_input').style.display = "none";
            }
            break;
        case 'AM':
            if($("#imagen").is(':checked')) {
                document.getElementById('file_selector').style.display = "";
            } else {
                document.getElementById('file_selector').style.display = "none";
            }
            break;
    }
}
function selectIMG(){
    const file = document.querySelector("#file_selector").files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event){
        const imgObj = document.createElement("img");
        imgObj.src = event.target.result;
        document.querySelector("#img").src = event.target.result;

        imgObj.onload = function(e){
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 500;
            const scaleSize = MAX_WIDTH / e.target.width;
            canvas.width = MAX_WIDTH;
            canvas.height = e.target.height * scaleSize;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(e.target,0,0,canvas.width,canvas.height);
            const file = ctx.canvas.toDataURL(e.target,"image/jpeg");
            document.querySelector("#img").src=file;
        }
    }
    //regresa la uri del archivo original no la del canvas
    return file;
}
function newCard(id,backgroundImgURL,cardTitle,contenidoUnidadDosis, dosis, medImageURL, diaToma, numeroDosis,num ){
    var  card= document.getElementById("tabla_body").innerHTML += 
				 `<div class='col-md-4 mt-3'>
                 <div class='tarjeta'>
				<div class="cabecera" style="background: url(${backgroundImgURL});background-repeat: no-repeat;-webkit-background-size: cover;background-size: cover;">
					<a class="parte1" href="">
					<div class="titulo">${cardTitle}</div>				
					</a>
					<div class="nombre">Dosis: ${contenidoUnidadDosis}${dosis}</div>
				</div>
	
				<div class="medio">				
					<div class="texto">
						<img class="foto" src="${medImageURL}" alt="">
						<h2>Te queda(n) 1 dosis</h2>
						<div class="tareas">
							<a class="link" href="">${numeroDosis} dosis el ${diaToma}</a>
						</div>
					</div>
				</div>
	
				<div class="pie">	
                    <span class="icon3"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></span>
					<span class="icon2"><i class="fa fa-arrows-alt fa-2x"></i></span>                   
					<span class="icon3" onclick="Editar('MD','${id}')"><i class="fa fa-pencil fa-2x"></i></span>
                    
				</div>
                </div>
			</div> `
}
function Editar(oper,id){
    switch(oper){
        case'MD':
            MostrarModal('EditarMed');
            Consultas('MD',id);
            break;
        case 'RE':
            MostrarModal('EditarRec');
            Consultas('RE',id);
            break;
    }
    
}

function Mostrar(){
    var tipo = document.getElementById("passwordR");
      if(tipo.type == "password"){
          tipo.type = "text";
          $("#password_vf").attr('type','text');
      }else{
          tipo.type = "password";
          $("#password_vf").attr('type','password');
      }
}
function Alertas(Tipo,nombre_campo,objeto,message){
    //Tipo 1: Campos vacios que debe llenar el usuario
    //Tipo 2: Campos vacios que tienen un default pero algo salió mal
    //Tipo 3: Mensaje de exito
    //Tipo 4: Errores durante las operaciones y/o consultas
    //Tipo 5: Mensaje personalizado
    switch(Tipo){
        case '1':
            alert("El campo: " + nombre_campo + " es obligatorio.");
            break;
        case '2':
            alert("Ocurrió un error intentelo nuevamente: "+ nombre_campo);
            break;
        case '3':
            alert(objeto + " guardado correctamente !");
            break;
        case '4':
            alert("Ha ocurrido un error daurante el proceso / "+ objeto +" / por favor intente de nuevo, Error: " + message);
            break;
        case '5':
            alert(message + " ###OBJETO: " + objeto + " ###CAMPO: " + nombre_campo);
            break;
    }
}
function Ventanas(nombre){
    switch(nombre){
        case 'index':
            window.location.href = "../index.html";
            break;
    }
}