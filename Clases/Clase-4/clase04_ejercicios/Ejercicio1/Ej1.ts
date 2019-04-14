function IngresarNumero()
{
    let xhttp:XMLHttpRequest = new XMLHttpRequest();

    let numero:string =(<HTMLInputElement>document.getElementById("num")).value;

    xhttp.open("POST","Ej1.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");

    xhttp.send("num="+numero);


    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4 && xhttp.status==200)
        {

            (<HTMLInputElement>document.getElementById("txtNum")).value=xhttp.responseText;
        }
    }
}