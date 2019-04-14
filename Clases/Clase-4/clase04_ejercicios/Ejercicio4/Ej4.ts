function Calcular()
{
    let xhttp:XMLHttpRequest = new XMLHttpRequest();

    let num1:string =(<HTMLInputElement>document.getElementById("num1")).value;

    let num2:string =(<HTMLInputElement>document.getElementById("num2")).value;

    let signo:string =(<HTMLInputElement> document.getElementById("select")).value;

    xhttp.open("POST","Ej4.php",true);

    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");

    xhttp.send("num1="+num1+"&select="+signo+"&num2="+num2);


    xhttp.onreadystatechange=()=>{
        if(xhttp.readyState==4 && xhttp.status==200)
        {
            console.log(xhttp.responseText);

            (<HTMLInputElement>document.getElementById("span")).innerHTML=xhttp.responseText;


        }
    }

}