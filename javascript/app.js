$(document).ready(function(){
    if(document.getElementById('fecha_input')){
        document.getElementById('fecha_input').style.display = "none";
    }else if(document.getElementById('file_selector') && document.getElementById('med_id')){
        document.getElementById('file_selector').style.display = "none";
    }
    verificar_loggedIn();
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
				 `<div class='col mt-4'></>
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
					<span class="icon2"><i class="fa fa-arrows-alt fa-lg"></i></span>
					<span class="icon1" onclick="Editar('MD','${id}')"><i class="fa fa-pencil fa-lg"></i></span>
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