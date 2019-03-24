/*Ejercicion 5:
Guardar su nombre y apellido en dos variables distintas. Dichas variables serán pasadas
como parámetro de la función MostrarNombreApellido , que mostrará el apellido en
mayúscula y el nombre solo con la primera letra en mayúsculas y el resto en minúsculas.
El apellido y el nombre se mostrarán separados por una coma (,).
*/
var nombre : string ="Emanuel";
var apellido :string ="Villamayor";

//creo funcion
function Cadena(nombre : string , apellido : string)
{
    //toLocaleUpperCase y toLocaleLowerCase son metodos qu AFECTAN TODA LA CADENA
    //toUpperCase y toLowerCase son metodos que afectan determinados espacios de la cadena(lo indicamos nosotros)
    console.log(`${apellido.toLocaleUpperCase()},${nombre.charAt(0).toUpperCase()+nombre.slice(1)}`);
}


//utilizo la funcion
Cadena(nombre,apellido);