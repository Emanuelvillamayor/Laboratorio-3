function Calcular() {
    var xhttp = new XMLHttpRequest();
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var signo = document.getElementById("select").value;
    xhttp.open("POST", "Ej4.php", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("num1=" + num1 + "&select=" + signo + "&num2=" + num2);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            document.getElementById("span").innerHTML = xhttp.responseText;
        }
    };
}
