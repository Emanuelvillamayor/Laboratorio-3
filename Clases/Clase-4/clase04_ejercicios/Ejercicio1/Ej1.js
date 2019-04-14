function IngresarNumero() {
    var xhttp = new XMLHttpRequest();
    var numero = document.getElementById("num").value;
    xhttp.open("POST", "Ej1.php", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("num=" + numero);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("txtNum").value = xhttp.responseText;
        }
    };
}
