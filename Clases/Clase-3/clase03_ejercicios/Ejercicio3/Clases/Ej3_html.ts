
/*
Creo funcion para poder instanciar objeto con los datos recibidos por la tabla en html y mostrarlo
con el ToString() de Empleado y mostrarlo
*/
///<reference path="Empleado.ts"/>

 function CrearObjetoEmpleado():void
{
    var nombre :string=(<HTMLInputElement>document.getElementById("txtNombre")).value;
    var apellido :string=(<HTMLInputElement>document.getElementById("txtApellido")).value;
    var dniString :string=(<HTMLInputElement>document.getElementById("numDni")).value;
    var dniNum:number=parseInt(dniString);

    var sexo :string=(<HTMLInputElement>document.getElementById("txtSexo")).value;

    var legajoString :string=(<HTMLInputElement>document.getElementById("numLeg")).value;
    var legajoNum:number=parseInt(legajoString);

    var saldoString:string=(<HTMLInputElement>document.getElementById("numSal")).value;
    var saldoNum:number=parseInt(saldoString);

    var Empleado= new Empleados.Empleado(nombre,apellido,dniNum,sexo,legajoNum,saldoNum);
    console.log(Empleado.ToString());

}


