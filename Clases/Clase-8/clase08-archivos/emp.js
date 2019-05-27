/// <reference path="./node_modules/@types/jquery/index.d.ts"/>
$(document).ready(function () {
    $("#btnAceptar").mouseover(function () {
        $("#btnAceptar").addClass("Cancelar");
    });
    $("#btnAceptar").mouseout(function () {
        $("#btnAceptar").removeClass("Cancelar");
    });
    /*
        $("#btn01").click(function(){
    
            if($("#p02").attr("class") == "negrita")
                $("#p02").removeClass("negrita");
            else
                $("#p02").addClass("negrita");
            
        });    */
});
