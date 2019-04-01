/*Ejercicio 16:
Confeccionar un formulario que permita ingresar el nombre de una persona, su mail, su
DNI (documento nacional de identidad) y finalmente su currículum vitae (este último dato
hacerlo utilizando un <TEXTAREA>). Al pulsar el botón btnAceptar , por medio de una
función en TypeScript, mostrar todos sus datos por consola.
*/
function MostrarResultados():void
{
    let nombre : string = (<HTMLInputElement> document.getElementById("nombre")).value;
    
    let email: string = (<HTMLInputElement> document.getElementById("email")).value;

    let dni : string = (<HTMLInputElement> document.getElementById("dni")).value;

    let curriculum = (<HTMLInputElement> document.getElementById("curriculum")).value;

    alert(`Nombre: ${nombre}\nEmail: ${email}\nDNI: ${dni}\nCurriculum vitae:\n${curriculum}`);
   
    
 
}