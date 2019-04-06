/*Ejercicio 23 :
Crear una página que posea un formulario que permita el ingreso del nombre, apellido,
email y cantidad de horas trabajadas a la semana de un operario. Al pulsar el botón
btnCalcular , se invocará a una función que calcule y muestre en un cuadro de texto (INPUT
type=text) el salario mensual del operario. El salario se calculará por medio de la cantidad de
horas trabajadas al mes por un coeficiente. Dicho coeficiente lo retornará la función
ObtenerCoeficiente (por el momento será siempre 6.88).
*/
function CalcularSalarioMensual()
{
    let nombre = (<HTMLInputElement>document.getElementById("txtNombre")).value;
    let apellido=(<HTMLInputElement>document.getElementById("txtApellido")).value;
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let horas:number= parseFloat((<HTMLInputElement>document.getElementById("numHoras")).value);
    let textoHoras:any=document.getElementById("txtHoras");

    let salario=ObtenerCoeficiente(horas);
 
    if(textoHoras)
    {
        textoHoras.value+="Salario: " + salario; 
        alert("Nombre: "+ nombre + "\nApellido: "+ apellido + "\nEmail: " + email + "\nHoras: "+ horas);
    }
 




}

function ObtenerCoeficiente(horas:number)
{
    return horas*6.88;
}