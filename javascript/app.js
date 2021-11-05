$(document).ready(function(){
    if(document.getElementById('fecha_input')){
        document.getElementById('fecha_input').style.display = "none";
    }
    verificar_loggedIn();
  });
function ModalRegist(){
    $('#modalRegistro').modal({backdrop: 'static', keyboard: false});
    $("#modalRegistro").modal('show');
}
function OcultarModal(){
    $("#modalRegistro").modal('hide');
    $("#email").focus();
    //$("#email").attr("style","backgroud-color:#cef2f1;");
}
function Fecha_esp(){
    if($("#Fecha_esp").is(':checked')) {
        document.getElementById('fecha_input').style.display = "";
    } else {
        document.getElementById('fecha_input').style.display = "none";
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
function newCard(backgroundImgURL,cardTitle,contenidoUnidadDosis, dosis, medImageURL, diaToma, numeroDosis ){
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
            <h2>Se entrega hoy</h2>
            <div class="tareas">
                <a class="link" href="">${numeroDosis} dosis el ${diaToma}</a>
            </div>
        </div>
    </div>

    <div class="pie">				
        <span class="icon2"><i class="far fa-folder fa-lg"></i></span>
        <span class="icon1"><i class="far fa-address-book fa-lg"></i></span>
    </div>

</div> ` 
}