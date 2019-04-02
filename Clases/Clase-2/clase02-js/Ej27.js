/*Ejercicio 27:
Realizar una página HTML que contenga un cuadro de texto, un elemento div y un
botón. Al pulsar el botón se llamará a una función (que recibirá como parámetro el valor del
cuadro de texto) y mostrará en el div un combo (SELECT) con tantas opciones como indica
el valor del cuadro de texto. Utilizar las funciones DOM para crear los elementos.

*/

/*
En esta funcion lo que hacemos es , dependiendo del "numero" qe se pase en el cuadro de texto , vamos a crear tantos "options"
como lo indique ahi
*/
function CrearSelect(cadena)
{
 //1-Crear el elemento "select" y los "options"
 var elemento=document.createElement("select");
 var arrayOptions=[];

 for(i=0;i<parseInt(cadena);i++)
 {
     //creo los options
     var opcion =document.createElement("option");
     //le pongo valores de referencia en el texto de los options
     opcion.text=i+1;
     //guardo los options en un array
    arrayOptions.push(opcion);
 }
 

 //2-Agrego los "options" dentro del "select" utilizando un for
 for(i=0;i<arrayOptions.length;i++)
 {
    elemento.add(arrayOptions[i]);
 }


 //3-Agrego el nuevo elemento(select junto con los option) al documento dentro del "div"
 document.getElementById("div").appendChild(elemento);

 
}


/*En esta funcion vamos a crear un select(si es que no existe) o volver a modificar un select(si es que existe) para agregarle los "options"
que le pasemos con respecto a lo que escribamos dentro del cuadro de texto
*/
function CrearSelect2(cadena)
{
 
    //si no exite el select lo creamos
 if(!document.getElementById("select1"))
 {
     //creamos el "select"
    var elemento=document.createElement("select");

    //creamos una "option"
    var opcion1 =document.createElement("option");

    //dentro de la option guardamos lo que escribimos en el cuadro de texto
    opcion1.text=cadena;

    //le ponemos un "id" al "select" para luego corroborar si esta creado o no
    elemento.setAttribute("id","select1");

    //agregamos la "option" al "select"
    elemento.add(opcion1);

    //agregamos el "select" que dentro contiene "option" al "div"
    document.getElementById("div").appendChild(elemento);


 }
 //si el select ya existe , solo agregamos la options que le pasemos por parametro
 else
 {
     //creamos una "Option"
    var opcion =document.createElement("option");

    //dentro de la option guardamos lo que escribimos en el cuadro de texto 
     opcion.text=cadena;
    
     //al "select" (que ya esta creado anteriormente) , solo le agregamos la "option nueva"
    document.getElementById("select1").add(opcion);
 }

}