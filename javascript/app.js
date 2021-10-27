function ModalRegist(){
    $('#modalRegistro').modal({backdrop: 'static', keyboard: false});
    $("#modalRegistro").modal('show');
}
function OcultarModal(){
    $("#modalRegistro").modal('hide');
    $("#email").focus();
    //$("#email").attr("style","backgroud-color:#cef2f1;");
}