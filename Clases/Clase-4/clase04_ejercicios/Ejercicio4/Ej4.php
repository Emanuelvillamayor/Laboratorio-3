<?php
if(isset($_POST["num1"])===true  && isset($_POST["num2"])===true  && isset($_POST["select"])==true)
{

    $num1= $_POST["num1"];
    $num2=$_POST["num2"];
    $signo = $_POST["select"];

    switch($signo)
    {
        case "-":
        echo ($num1-$num2);
        break;

        case "*":
        echo ($num1*$num2);
        break;

        case "/":
        echo ($num1/$num2);
        break;
        default:
        //lo pongo en el default porque si no al "+" no lo lee
        echo ($num1+$num2);
        break;
    }



}


?>