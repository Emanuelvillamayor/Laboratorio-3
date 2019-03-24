/*Ejercicio 2: 
Cree una aplicación que muestre, a través de un Array , los nombres de los meses de un
año y el número al que ese mes corresponde. Utilizar una estructura repetitiva para
escribir en la consola ( console.log() */
var meses:string[]=["Enero-1"];

//inserto demas valores
meses.push("Febrero-2","Marzo-3","Abril-4","Mayo-5","Junio-6","Julio-7","Agosto-8","Septiembre-9","Octubre-10","Noviembre-11","Diciembre-12");

//recorro y muestro "for"
for(var i=0;i<meses.length;i++)
{
    console.log(meses[i] +"\n");
}

//recorro y muestro "for in" ->muestra la posicion|clave de array [0,1,2]
for(var mes in meses)
{
 console.log(mes);
}


//recorro y muestro "for of" ->muestra valor de array ["Enero-1","Febrero","Marzo"]
for(var mes of meses)
{
 console.log(mes);
}