$(document).ready(function(){
    document.getElementById('fecha_input').style.display = "none";
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