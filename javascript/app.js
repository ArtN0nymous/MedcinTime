$(document).ready(function(){
    if(document.getElementById('fecha_input')){
        document.getElementById('fecha_input').style.display = "none";
    }else if(document.getElementById('file_selector') && document.getElementById('med_id')){
        document.getElementById('file_selector').style.display = "none";
    }
    if(document.getElementById('label_forget')){
        document.getElementById('label_forget').style.display = "none"
    }
    if(document.getElementById('load_dialog')){
        document.getElementById('load_dialog').style.display = "none";
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
function newCard(id,backgroundImgURL,cardTitle,contenidoUnidadDosis, dosis, medImageURL, diaToma,diasRecordar,cada){
    console.log(diasRecordar);
    let array = diasRecordar.split(',');
    var lunes = '<input type="checkbox" name="lunes" id="cbLunes" class="cbDias" disabled>';
    var martes = '<input type="checkbox" name="martes" id="cbMartes" class="cbDias" disabled>';
    var miercoles = '<input type="checkbox" name="miercoles" id="cbMiercoles" class="cbDias" disabled>';
    var jueves = '<input type="checkbox" name="jueves" id="cbJueves" class="cbDias" disabled>';
    var viernes = '<input type="checkbox" name="viernes" id="cbViernes" class="cbDias" disabled>';
    var sabado = '<input type="checkbox" name="sabado" id="cbSabado" class="cbDias" disabled>';
    var domingo = '<input type="checkbox" name="domingo" id="cbDomingo" class="cbDias" disabled>';
    array.forEach(element => {
        switch(element){
            case 'Lunes':
                lunes='<input type="checkbox" name="lunes" id="cbLunes" class="cbDias" checked="checked" disabled>'
                break;
            case 'Martes':
                martes = '<input type="checkbox" name="martes" id="cbMartes" class="cbDias" checked="checked" disabled>'
                break;
            case 'Miercoles':
                miercoles = '<input type="checkbox" name="miercoles" id="cbMiercoles" class="cbDias" checked="checked" disabled>'
                break;
            case 'Jueves':
                jueves = '<input type="checkbox" name="jueves" id="cbJueves" class="cbDias" checked="checked" disabled>'
                break;
            case 'Viernes':
                viernes = '<input type="checkbox" name="viernes" id="cbViernes" class="cbDias" checked="checked" disabled>'
                break;
            case 'Sabado':
                sabado = '<input type="checkbox" name="sabado" id="cnSabado" class="cbDias" checked="checked" disabled>'
                break;
            case 'Domingo':
                domingo = '<input type="checkbox" name="domingo" id="cbDomingo" class="cbDias" checked="checked" disabled>'
                break;
        }
    });
    var  card= document.getElementById("tabla_body").innerHTML += 
				 `<div class='col-md-4 mt-3'>
                 <div class='tarjeta'>
				<div class="cabecera" style="background: url(${backgroundImgURL});background-repeat: no-repeat;-webkit-background-size: cover;background-size: cover;">
					<a class="parte1" href="">
					<div class="titulo">${cardTitle} ${cada}</div>				
					</a>
					<div class="nombre">Dosis: ${contenidoUnidadDosis} ${dosis}</div>
				</div>
	
				<div class="medio">				
					<div class="texto">
						<img class="foto" src="${medImageURL}" alt="">
						<h2></h2>
						<div class="tareas">
							<a class="link" href="">${diaToma}</a>
                            
                        <div class="row">
                            <br>
                            <br>
                        <div class="col">
                          <label for="lunes" class="lblDias">Lun</label>
                          ${lunes}
                        </div>
                          <div class="col">
                            <label for="martes" class="lblDias">Mar</label>
                            ${martes}
                          </div>
                          <div class="col">
                            <label for="miercoles" class="lblDias">Mie</label>
                          ${miercoles}
                          </div>
                          <div class="col">
                            <label for="jueves" class="lblDias">Juev</label>
                            ${jueves}
                          </div>
                          <div class="col">
                            <label for="viernes" class="lblDias">Vier</label>
                            ${viernes}
                          </div>
                          <div class="col">
                            <label for="sabado" class="lblDias">Sab</label>
                            ${sabado}
                          </div>
                          <div class="col">
                            <label for="domingo" class="lblDias">Dom</label>
                            ${domingo}
                          </div>                                                                                                                                                
                      </div>             
						</div>
					</div>
				</div>
    
				<div class="pie">	
                    <span class="icon3" onclick="Borrar('${id}','${medImageURL}');"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></span>                 
					<span class="icon3" onclick="Editar('${id}')"><i class="fa fa-pencil fa-2x"></i></span>
                    
				</div>
                </div>
			</div> `
}
function Editar(id){
    MostrarModal('EditarMed');
    Consultas(id);
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
        case '6':
            alert(objeto + " eliminado correctamente !");
            break;
    }
}
function Ventanas(nombre){
    switch(nombre){
        case 'index':
            window.location.href = "../index.html";
            break;
        case 'Medicamentos':
            window.location.href = "../Catalogo_med.html";
            break;
    }
}
function Cancelar(){
    let url = $("#url_imagen").val();
    BorrarIMG(url);
    Ventanas('Medicamentos');
}
function Dias(){
    let Dias = "";
    for(var i= 0; i<8;i++){
        if($("#cbDia_"+i+"_").is(':checked')){
            switch(i.toString()){
                case '1':
                    Dias += 'Lunes,';
                    break;
                case '2':
                    Dias += 'Martes,';
                    break;
                case '3':
                    Dias += 'Miercoles,';
                    break;
                case '4':
                    Dias += 'Jueves,';
                    break;
                case '5':
                    Dias += 'Viernes,';
                    break;
                case '6':
                    Dias += 'Sabado,';
                    break;
                case '7':
                    Dias += 'Domingo,';
                    break;
            }
        }
    }
    var listDias = Dias.substring(0,Dias.length - 1);
    if(listDias == ""){
        Alertas('1','Dias de recordatorio','','');
    }
    return listDias;
}
function Dias_1(){
    let Dias = "";
    for(var i= 0; i<8;i++){
        if($("#cbDia_"+i+"_l").is(':checked')){
            switch(i.toString()){
                case '1':
                    Dias += 'Lunes,';
                    break;
                case '2':
                    Dias += 'Martes,';
                    break;
                case '3':
                    Dias += 'Miercoles,';
                    break;
                case '4':
                    Dias += 'Jueves,';
                    break;
                case '5':
                    Dias += 'Viernes,';
                    break;
                case '6':
                    Dias += 'Sabado,';
                    break;
                case '7':
                    Dias += 'Domingo,';
                    break;
            }
        }
    }
    var listDias = Dias.substring(0,Dias.length - 1);
    if(listDias == ""){
        Alertas('1','Dias de recordatorio','','');
    }
    return listDias;
}
function MostrarDialog(nombre){
    switch(nombre){
        case 'load_dialog':
            $("#load_dialog").dialog({
                title:'Cargando',
                draggable:false,
                resizable:false,
                modal:true
            });
            break;
    }
}
function CerrarDialog(nombre){
    switch(nombre){
        case 'load_dialog':
            $("#load_dialog").dialog('close');
            break;
    }
}