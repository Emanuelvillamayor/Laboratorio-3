/*Ejercicio 28:
Realizar una página parecida a la del ejercicio anterior que permita crear una tabla. Para
ello se ingresarán la cantidad de filas y de columnas y al pulsar el botón se creará la tabla en
el elemento div . Ayuda: se deben agregar las filas al elemento tbody y este último al
elemento table 
*/

function CrearTabla(filas,columnas)
{
    /*<table>
        <tbody>
           <tr>
              <td>
        */
       /*
//1-Crear el elemento
var elemento=document.createElement("li");

//2-Crear un nodo de texto
var contenido = document.createTextNode(cadena);

//3-Añadir el nodo de texto al elemento
elemento.appendChild(contenido);

//4-Agregar atributos al elemento(opcional)
elemento.setAttribute("id","nuevoli");

//5-Agrego el nuevo elemento al documento
document.getElementById("lista").appendChild(elemento); */

//1-Crear los elementos

//creamos la tabla
var tabla = document.createElement("table");

//agregamos atributo "border" a la tabla para que se pueda ver
tabla.setAttribute("border","1");

//creamos el tbody
var tbody = document.createElement("tbody");

//creo array para los "td"
var arrayTd=[];

//creo array para los "tr"
var arrayTr=[];

//cargo el "arrayTd" dependiendo de la cant de columnas pasadas por parametro
for(i=0;i<parseInt(columnas);i++)
{
    var td=document.createElement("tr");
    arrayTd.push(td);
}

//cargo el "arrayTr" dependiendo de la cant de filas pasadas por parametro
for(i=0;i<parseInt(filas);i++)
{
    var tr=document.createElement("tr");
    for(j=0;j<arrayTd.lenght;j++)
    {
        tr.appendChild(td[j]);
    }
    arrayTr.push(tr);
}

//cargo el "tbody" con todos los "tr"
for(i=0;i<arrayTr.lenght;i++)
{
    tbody.appendChild(arrayTr[i]);
}

//guardo el tbody
tabla.appendChild(tbody);

//guardo la tabla dentro del "div"
document.getElementById("div").appendChild(tabla)

}