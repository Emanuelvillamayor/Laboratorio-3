/// <reference path="./node_modules/@types/jquery/index.d.ts"/>
/*
$(document).ready(function(){

    $("#btnAceptar").mouseover(function(){

        $("#btnAceptar").addClass("Cancelar");

    });

    $("#btnAceptar").mouseout(function(){
        
        $("#btnAceptar").removeClass("Cancelar");
        
    });*/
/*
    $("#btn01").click(function(){

        if($("#p02").attr("class") == "negrita")
            $("#p02").removeClass("negrita");
        else
            $("#p02").addClass("negrita");
        
    });    
});
*/

//Funcion que agrega a traves del metodo get un empleado
    
function Login()
{
    //con TS
   // let legajo : string =(<HTMLInputElement> document.getElementById("txtLegajo")).value;
    //let clave : string =(<HTMLInputElement> document.getElementById("txtClave")).value;

    let legajo=$("#txtLegajo").val();
    let clave=$("#txtClave").val();

    let pagina : string = "./BACKEND/index.php/emp/"+legajo+"/"+clave;


    /*
    let formData : FormData = new FormData();
    formData.append("caso", "http://localhost/clase08-archivos/BACKEND/emp/");
   // formData.append("legajo",legajo);
    //formData.append("clave",clave);*/

    $.ajax({
        type: 'GET',
        url: pagina,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        //data: formData,
        async: true
    })
    .done(function (objJson:any) {


        if(!objJson.Exito){
            console.clear();
            console.log(objJson.Mensaje);
            location.assign("./login.php"); //en caso de exito
            return;
        }


    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    }); 
}
    
