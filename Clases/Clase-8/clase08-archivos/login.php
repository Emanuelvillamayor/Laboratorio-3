<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--AGREGO REFERENCIA DE ESTILOS-->
    <link type="text/css" rel="stylesheet" href="login.css" />

    <!-- AGREGO LA LIBRERIA DE JQUERY -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        
    <!-- AGREGO FUNCIONES PROPIAS CON USO DE JQUERY -->
    <script type="text/javascript" src="emp.js"></script>

    <title>Clase 8</title>
</head>
<body>
<form>
<table border="1">
<tr>
  <th colspan="2">
   INGRESO
  </th>
</tr>
<tr>
  <td colspan="2">
   <span>Legajo</span>
  </td>
</tr>
<tr>
  <td colspan="2">
   <input type="text" id="txtLegajo">
  </td>
</tr>

<tr >
   <td colspan="2">
    <span>Clave</span>
   </td>
</tr>

<tr>
    <td colspan="2">
    <input type="text" id="txtClave">
    </td>
</tr>
<tr>
    <td>
      <!--En "class" voy a llamar a un estilo especifico de css-->
      <input type="button" id="btnAceptar" value="Enviar" class ="Aceptar">
    </td>
    <td>
      <input type="button" value="Cancelar" class ="Cancelar">
    </td>
</tr>

</table>
</form>
    
</body>
</html>