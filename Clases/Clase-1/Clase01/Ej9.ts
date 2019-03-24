/*Ejercicio 9:
Realizar una función que solicite (por medio de un parámetro) un número. Si el número
es positivo, se mostrará el factorial de ese número, caso contrario se mostrará el cubo de
dicho número.
Nota : Reutilizar la función que determina el factorial de un número y la que calcula el
cubo de un número.
*/

//funcion cubo
function Cubo1(num:number):void
{
    
    console.log(Math.pow(num, 3));
}

//funcion factorial
function Factorial1 ( n:number):void
 {
	var total :number = 1; 
	for (var i=1; i<=n; i++) {
		total = total * i; 
    }
    console.log(total);
 }

 //funcion de factorial y cubo que llama a ambas
 function FactCubo(num :number):void
 {
     if(num>0)
     {
         Factorial1(num);
        
     }
     else
     {
         Cubo1(num);
     }
 }

 //implemento funcion
FactCubo(4);
FactCubo(-2);

