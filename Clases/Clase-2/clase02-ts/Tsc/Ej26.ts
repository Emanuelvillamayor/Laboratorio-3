/*
<!--Ejercicio 26:
Realizar una página HTML que contenga un cuadro de texto, un botón y una lista
desordenada con los siguientes elementos:
a. Programación I
b. Programación II
c. Programación III
Se pide crear una función TypeScript que permita añadir nuevos elementos a la lista cada
vez que se pulsa sobre el botón. Utilizar las funciones DOM para crear nuevos nodos y
añadirlos a la lista existente. La función recibirá como únicos parámetros la cadena que
tendrá el elemento nuevo de la lista y el nombre de la lista desordenada.
*/

function TypeScript(cadena:string,lista:string):void
{
 //1-Crear el elemento
 var elemento:HTMLElement=document.createElement("li");

 //2-Crear un nodo de texto
 var contenido:any = document.createTextNode(cadena);

 //3-Añadir el nodo de texto al elemento
 elemento.appendChild(contenido);

 //4-Agregar atributos al elemento(opcional)
 elemento.setAttribute("id","nuevoli");

 //5-Agrego el nuevo elemento al documento
  //valido nulidad metiendo en una constante y luego haciendo el if
   const hola= document.getElementById(lista);
   if(hola)
   {
       hola.appendChild(elemento);
   }
  

 
}