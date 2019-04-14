<?php
if(isset($_POST["txtName"]))
{
    $nombre=$_POST["txtName"];

    $flag=false;

    $ar=fopen("nombres.txt","r");

    while(!feof($ar))
    {
        $cadena=fgets($ar);

        $array=explode("\r\n",$cadena);

        if($array[0]==$nombre)
        {
           $flag=true;
           break;
        }      
    }

    fclose($ar);

    if($flag==true)
    {
        echo "Usuario ya registrado! Lista de usuarios registrados:";
        "<ul>";
        $ar=fopen("nombres.txt","r");

        while(!feof($ar))
        {
            $cadena=fgets($ar);

            if($cadena=="")
            {
                continue;
            }
            echo "<li>" . $cadena . "</li>";    
        }
    
        echo "</ul>";
        fclose($ar);  
    }
    else
    {
        echo "no";
    }

    


}



?>