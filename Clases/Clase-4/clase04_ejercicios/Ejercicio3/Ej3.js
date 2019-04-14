function IngresarPath2() {
    var xhttp = new XMLHttpRequest();
    var path = document.getElementById("txtPath").value;
    xhttp.open("POST", "Ej3.php", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("txtPath=" + path);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            if (xhttp.responseText == "0") {
                alert("Error , el archivo no existe");
            }
            else {
                document.getElementById("div").innerHTML = xhttp.responseText;
            }
        }
    };
}
