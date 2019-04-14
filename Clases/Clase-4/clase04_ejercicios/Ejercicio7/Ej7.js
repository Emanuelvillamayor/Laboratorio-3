function SugerirNombre() {
    var xhttp = new XMLHttpRequest();
    var nombre = document.getElementById("txtName").value;
    xhttp.open("POST", "comprobarNombre.php", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("txtName=" + nombre);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            if (xhttp.responseText === "no") {
                alert("Se ha guardado correctamente!!");
                document.getElementById("lista").innerHTML = "";
            }
            else {
                console.log(xhttp.responseText);
                document.getElementById("div_lista").innerHTML = xhttp.responseText;
            }
        }
    };
}
