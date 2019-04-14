<?php

if(isset($_POST["txtName"]))
{

$nombre=$_POST["txtName"];

$retardo= rand(0,6);

sleep($retardo);


if($retardo>=0 && $retardo<=3)
{
    echo "si";
}
else
{
    echo "no";
}


}


?>