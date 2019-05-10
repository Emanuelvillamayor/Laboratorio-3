<?php

$op = isset($_POST["op"]) ? $_POST["op"] : null;

//$op="traerCiudades";
switch($op)
{
    case "traerCiudades" :
    $tabla ="";
    $tabla.= "<table border=1>";
    $tabla.= "<thead>";
    $tabla.= "<tr>";
    $tabla.= "<td>name</td>";
    $tabla.= "<td>country</td>";
    $tabla.= "<td>lon</td>";
    $tabla.= "<td>lat</td>";
    $tabla.= "</tr>";
    $tabla.= "</thead>";

    $a = fopen("./city.list.min.json","r");

    $arrayObj=array();
    $linea='';
    while(!feof($a))
    {
      $linea= trim(fgets($a));
    
      $obj = json_decode($linea);
      array_push($arrayObj,$obj);
    }
    

    
    
    foreach($arrayObj as $city)
    {
    $tabla.= "<tr>";

    $tabla.= "<td>";
    $tabla.= $city[0];
    $tabla.= "</td>";

    $tabla.= "<td>";
    $tabla.= $city[1];
    $tabla.= "</td>";

    $tabla.= "<td>";
    $tabla.=$city["coord"]["lon"];
    $tabla.= "</td>";

    $tabla.= "<td>";
    $tabla.=$city["coord"]["len"];
    $tabla.= "</td>";

    $tabla.= "</tr>";
    }
    $tabla.= "</table>";

    echo $tabla;

echo "entra";
    break;

    default:

    echo ":(";

    break;
}


?>