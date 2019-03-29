/*Ejercicio 12 :
Crear una función que reciba como único parámetro una cadena que contenga el día, mes
y año de nacimiento de una persona (con formato dd-mm-yyyy ). La función mostrará por
consola a que signo corresponde dicha fecha de nacimiento.
Nota : Para descomponer la fecha recibida como parámetro utilice la función split.
*/

//creo la funcion
function SignoSegunFecha(cadena:string):void
{
    var arrayString :string[] = cadena.split("-");

    if(arrayString[0]>="20" &&arrayString[1]=="01" || arrayString[0]<="18" &&arrayString[1]=="02")
    {
        console.log("Signo Acuario");
    }
    else if(arrayString[0]>="19" &&arrayString[1]=="02" || arrayString[0]<="20" &&arrayString[1]=="03")
    {
        console.log("Signo Piscis");
    }
    else if(arrayString[0]>="21" &&arrayString[1]=="03" || arrayString[0]<="19" &&arrayString[1]=="04")
    {
        console.log("Signo Aries");
    }
    else if(arrayString[0]>="20" &&arrayString[1]=="04" || arrayString[0]<="20" &&arrayString[1]=="05")
    {
        console.log("Signo Tauro");
    }
    else if(arrayString[0]>="21" &&arrayString[1]=="05" || arrayString[0]<="20" &&arrayString[1]=="06")
    {
        console.log("Signo Geminis");
    }
    else if(arrayString[0]>="21" &&arrayString[1]=="06" || arrayString[0]<="22" &&arrayString[1]=="07")
    {
        console.log("Signo Cancer");
    }
    else if(arrayString[0]>="23" &&arrayString[1]=="07" || arrayString[0]<="22" &&arrayString[1]=="08")
    {
        console.log("Signo leo");
    }
    else if(arrayString[0]>="23" &&arrayString[1]=="08" || arrayString[0]<="22" &&arrayString[1]=="09")
    {
        console.log("Signo Virgo");
    }
    else if(arrayString[0]>="23" &&arrayString[1]=="09" || arrayString[0]<="22" &&arrayString[1]=="10")
    {
        console.log("Signo Libra");
    }
    else if(arrayString[0]>="23" &&arrayString[1]=="10" || arrayString[0]<="21" &&arrayString[1]=="11")
    {
        console.log("Signo Escorpio");
    }
    else if(arrayString[0]>="22" &&arrayString[1]=="11" || arrayString[0]<="21" &&arrayString[1]=="12")
    {
        console.log("Signo Sagitario");
    }
    else if((arrayString[0]>="22" &&arrayString[1]=="12") || (arrayString[0]<="19" &&arrayString[1]=="01"))
    {
        console.log("Signo Capricornio");
    }
    else
    {
        console.log("Cadena erronea");
    }

}


//implemento funcion 

SignoSegunFecha("5-12-19");
