/*Ejercicio 3:
Realizar una función que reciba un parámetro requerido de tipo numérico y otro opcional
de tipo cadena. Si el segundo parámetro es recibido, se mostrará tantas veces por
consola, como lo indique el primer parámetro. En caso de no recibir el segundo
parámetro, se mostrará el valor inverso del primer parámetro.
*/

//creo la funcion
function Funcion(numero :Number ,cadena?:string):void
{
    if(cadena)
    {
        for(var i=0;i<numero;i++)
        {
            console.log(cadena +"\n");
        }
    }
    else
    {
        console.log("-"+numero);
    }
}

//utilizo la funcion (2 parametros)
Funcion(5,"hola");

//utilizo la funcion (1 parametro)
Funcion(5);