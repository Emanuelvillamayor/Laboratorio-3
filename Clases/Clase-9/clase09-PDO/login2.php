<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <!--AGREGO REFERENCIA DE ESTILOS-->
     <link type="text/css" rel="stylesheet" href="login.css" />
         <!-- AGREGO LA LIBRERIA DE JQUERY -->
    <script
  src="https://code.jquery.com/jquery-3.2.1.js"
  integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
  crossorigin="anonymous"></script>
        
    <!-- AGREGO FUNCIONES PROPIAS CON USO DE JQUERY -->
    <script type="text/javascript" src="login.js"></script>
    <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap-theme.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
    <title>Clase 09</title>
</head>



<body>
<div class="container-fluid" >
    <div class="row">
        <div class="col-md-4"></div>
            <div class="col-md-4" style="background-color:lime;" >
                <form >
                    <div class ="row" >
                        <div class="col-md-12" style="background-color:blue"><strong style="color:white;font-size: 20pt;">Ingreso</strong></div>
                    </div>

                    <div class ="row">
                        <div class="col-md-4"><span >Legajo:</span></div>
                        <div class="col-md-8"><input type="text" class="form-control" id="txtLegajo"></div>
                    </div>

                    <div class ="row">
                        <div class="col-md-4"><span >Clave:</span></div>
                        <div class="col-md-8"><input type="text" class="form-control" id="txtClave"></div>
                    </div>

                    <div class ="row">
                        <div class="col-md-4"><input type="button" id="btnAceptar" value="Enviar" class ="Aceptar" onclick="Login()"></div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4"><input type="button" value="Cancelar" class ="Cancelar"></div>
                    </div>
                </form>
            </div>
       </div>
    <div class="col-md-4"></div>
</div>
</div>


    
</body>
</html>