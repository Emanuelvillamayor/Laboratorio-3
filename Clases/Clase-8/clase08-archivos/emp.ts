window.onload = function(){

    MostrarListado();

}

function MostrarListado(){

let xhr : XMLHttpRequest = new XMLHttpRequest();

let form : FormData = new FormData();

form.append('op', "mostrarListado");


xhr.open('POST', './BACKEND/nexo.php', true);

xhr.setRequestHeader("enctype", "multipart/form-data");

xhr.send(form);

xhr.onreadystatechange = () => {

    if (xhr.readyState == 4 && xhr.status == 200) {
        //la tabla que recuperamos desde nexo.php la mostramos dentro de el "div"
       (<HTMLInputElement>document.getElementById("div")).innerHTML=xhr.responseText;
    }
};

}