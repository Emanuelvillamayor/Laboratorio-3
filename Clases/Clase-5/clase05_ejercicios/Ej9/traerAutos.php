<?php

    $tabla ="";
    $tabla.= "<table border=1>";
    $tabla.= "<thead>";
    $tabla.= "<tr>";
    $tabla.= "<td>Marca</td>";
    $tabla.= "<td>Precio</td>";
    $tabla.= "<td>Color</td>";
    $tabla.= "<td>Modelo</td>";
    $tabla.= "</tr>";
    $tabla.= "</thead>";


    $a = fopen("./autos.json","r");

    $linea = '';
    while(!feof($a))
    {
      $linea.=fgets($a);
    }

    $arrayAutos = json_decode($linea);
    
    
    fclose($a);
    
    
    foreach($arrayAutos as $aut)
    {

    
    
    $tabla.= "<tr>";

    $tabla.= "<td>";
    $tabla.= $aut->Marca;
    $tabla.= "</td>";

    $tabla.= "<td>";
    $tabla.= $aut->Precio;
    $tabla.= "</td>";

    $tabla.= "<td>";
    $tabla.=$aut->Color;
    $tabla.= "</td>";

    $tabla.= "<td>";
    $tabla.=$aut->Modelo;
    $tabla.= "</td>";



    $tabla.= "</tr>";
    }
    $tabla.= "</table>";



    echo $tabla;
    



?>