<?php

if(isset($_POST["num"]))
{
    $numero = $_POST["num"];
    if($numero>=0)
    {
      for($i=0;$i<=$numero;$i++)
      {
        if(($i % 2) !=0)
        {
          echo "$i-";
        }
              
      }
    }
    else
    {
        echo "Error, numero negativo!";
    }
    
}

?>