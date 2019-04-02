"use strict";
/*Ejercicio 21 :
 Se necesita hacer una página que contenga dos cuadros de texto (dónde se ingresarán
números), un botón (con la leyenda ‘Calcular’) y cuatro controles de tipo ‘radioButton’(va a haber uno ) (suma,
resta, multiplicación y división). Cuando se pulsa el botón una función deberá mostrar el
resultado (en la consola y en otro cuadro de texto), de acuerdo al tipo de operación que el
usuario eligió. Utilizar la estructura ‘switch’
*/
function ResultadoOperacion() {
    //obtengo los valores de los cuadros de texto
    var valorString1 = document.getElementById("txtValor1").value;
    var valorInt1 = parseInt(valorString1);
    var valorString2 = document.getElementById("txtValor2").value;
    var valorInt2 = parseInt(valorString2);
    //obtengo en un array
    var rdButton = document.getElementsByName("rdoTipo");
    var resultado = 0;
    var signo = "-";
    //recorro para encontrar de todos los RADIO BUTTON , EL QUE FUE SELECCIONADO , ESO LO SE CON EL ATRIBUTO "CHECKED"
    for (var i = 0; i < rdButton.length; i++) {
        if (rdButton[i].checked == true) {
            //OBTENGO EL VALOR DE ESE ATRIBUTO
            signo = rdButton[i].value;
            break;
        }
    }
    switch (signo) {
        case "+":
            resultado = valorInt1 + valorInt2;
            break;
        case "-":
            resultado = valorInt1 - valorInt2;
            break;
        case "*":
            resultado = valorInt1 * valorInt2;
            break;
        case "/":
            resultado = valorInt1 / valorInt2;
            break;
        default:
            break;
    }
    alert("El resultado de su Operacion es : " + resultado);
}
//# sourceMappingURL=Ej21.js.map