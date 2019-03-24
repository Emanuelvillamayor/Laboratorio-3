/*Ejercicio 8 :
Crear una función que realice el cálculo factorial del número que recibe como parámetro.
Nota : Utilizar console.log()
*/

//creo la funcion
function Factorial ( n:number):void
 {
	var total :number = 1; 
	for (var i=1; i<=n; i++) {
		total = total * i; 
    }
    console.log(total);
 }

//implemento la funcion
Factorial(4);