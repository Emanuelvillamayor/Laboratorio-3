///<reference path="Clases/Empleado.ts"/>

function CrearObjeto():void
{
    //recupero los datos en variables
    var nombre :string=(<HTMLInputElement>document.getElementById("txtNombre")).value;
    var apellido :string=(<HTMLInputElement>document.getElementById("txtApellido")).value;
    var dniString :string=(<HTMLInputElement>document.getElementById("numDni")).value;
    var dniNum:number=parseInt(dniString);

    var sexo :string=(<HTMLInputElement>document.getElementById("txtSexo")).value;

    var legajoString :string=(<HTMLInputElement>document.getElementById("numLeg")).value;
    var legajoNum:number=parseInt(legajoString);

    var saldoString:string=(<HTMLInputElement>document.getElementById("numSal")).value;
    var saldoNum:number=parseInt(saldoString);

    var empleado= new Empleados.Empleado(nombre,apellido,dniNum,sexo,legajoNum,saldoNum);

    //muestro el empleado con los datos cargados por la pagina por consola
    console.log(empleado.ToString());




    //obtengo el formulario como variable (objeto de tipo form)
    let frm =(<HTMLFormElement>document.getElementById("frm"));

    /*
    metodo=frm.submit() lo que hace es enviar el contenido de formulario
    como el input de enviar es de tipo "button" no hace nada es decir no tiene la funcion de "submit"
    ahora con esa funcion despues del console.log() envio el submit del form a un archivo de tipo php 
    */
    frm.submit();


    
}