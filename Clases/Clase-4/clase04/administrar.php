<?php
/*Saludar()
sleep(3);
echo "Hola mundo Ajax";
*/

/*Ingresar()
*/
$nombre=$_POST["tsNombre"];
$accion =$_POST["accion"];

if($accion==1)
{
    echo "Su nombre es:" . $nombre;

}
else if($accion==2)
{
    $ar=fopen("nombres.txt","a");
    $flag=fwrite($ar,$nombre."\r\n");
    if($flag>0)
    {
        //si retorna 1 es que funciona
       echo "1";
    }
    else
    {
        //si retorna 0 es error
        echo "0";
    }
    
    fclose($ar); 
}


else if($accion==3)
{
 ?>
  <table boder="2">
    <tr><th>Nombres</th></tr>
  <?php
 
   $ar=fopen("nombres.txt","r");
   while(!feof($ar))
   {
    echo "<tr>";
    $cadena=fgets($ar);
    if($cadena=="")
     {
        continue;
    }
    
    echo "<td>" . $cadena."</td>";
    echo "</tr>";

   }
   fclose($ar);
  ?>
  </table>


    <?php
}

else if($accion==4)
{
    $ar=fopen("nombres.txt","r");
    while(!feof($ar))
    {
     $cadena=fgets($ar);
     if($cadena=="")
      {
         continue;
     }
     
     if(strcmp($nombre,trim($cadena))==0)
     {
        echo "1";
        break;
     }
 
    }
    fclose($ar);
}

?>