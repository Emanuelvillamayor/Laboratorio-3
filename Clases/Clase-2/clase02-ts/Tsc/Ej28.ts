/*Ejercicio 28:
Realizar una página parecida a la del ejercicio anterior que permita crear una tabla. Para
ello se ingresarán la cantidad de filas y de columnas y al pulsar el botón se creará la tabla en
el elemento div . Ayuda: se deben agregar las filas al elemento tbody y este último al
elemento table 
*/

function CrearTabla(filas:string,columnas:string)
{
    /*Esquema
    <table>
        <tbody>
           <tr>
              <td>
        */


//creamos la tabla
var tabla = document.createElement("table");

//agregamos atributo "border" a la tabla para que se pueda ver
tabla.setAttribute("border","1");

//creamos el tbody
var tbody = document.createElement("tbody");

//1-recorremos por cant de filas
for(var i=0;i<parseInt(filas);i++)
{
    //2-creamos filas
    var fila = document.createElement("tr");
    //3-recorremos por cantidad de columnas
    for(var j=0;j<parseInt(columnas);j++)
    {
        //4-creamos columna
        var columna=document.createElement("td");
        //creamos texto para la columna
        var textoColumna=document.createTextNode("celda en la hilera"+i+",columna"+j);
        //5-asignamos ese texto a la columna
        columna.appendChild(textoColumna);
        //6-asignamos esa "columna" a la "fila"
        fila.appendChild(columna);     
    }
    //7-asignamos esa "fila" al "tbody"
    tbody.appendChild(fila);
}

//8-asignamos el "tbody" a la "tabla"
tabla.appendChild(tbody);

//9-asignamos la tabla a el "div"
const part=document.getElementById("div");
if(part)
{
 part.appendChild(tabla);
}


}