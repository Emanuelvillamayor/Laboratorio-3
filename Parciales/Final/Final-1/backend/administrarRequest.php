<?php
if (isset($_POST['caso'])) {
    $caso = $_POST['caso'];
    switch ($caso) {
        case 'agregar':
            if ($_FILES['foto'] && isset($_POST['correo']) && isset($_POST['legajo'])) {
                $destino = "./fotos/usuarios/" . $_POST['correo'] . "-" . $_POST['legajo'] . ".jpg";
                move_uploaded_file($_FILES["foto"]["tmp_name"], $destino);
                return 'exito';
            } else {
                return 'error';
            }
            break;
        case 'eliminar':
            if (isset($_POST['legajo']) && isset($_POST['correo']) && isset($_POST['ruta'])) {
                $destino = $_POST['correo'] . "-" . $_POST['legajo'] . ".jpg";
                rename("." . trim($_POST['ruta']), "./fotos/borrados/" . $destino);
                echo "eliminado";
            } else {
                echo "error";
            }
            break;
        case 'modificar':
            if (isset($_POST['legajo']) && isset($_POST['correo']) && isset($_POST['ruta'])) {
                $destino = $_POST['correo'] . "-" . $_POST['legajo'] . ".jpg";
                rename("." . trim($_POST['ruta']), "./fotos/modificados/" . $destino);
                echo "modificado";
            } else {
                echo "error";
            }
            break;
        case 'modificarNuevaFoto':
            if (isset($_POST['legajo']) && isset($_POST['correo']) && isset($_POST['ruta'])) {
                $destino = $_POST['correo'] . "-" . $_POST['legajo'] . ".jpg";
                unlink("." . trim($_POST['ruta']));
                move_uploaded_file($_FILES['foto']['tmp_name'], "./fotos/modificados/" . $destino);
                echo "modificado con nueva foto";
            } else {
                echo "error";
            }
            break;
        case 'leerUsuarios':
            $stringArchivo = file_get_contents('./usuarios.json');
            echo $stringArchivo;
            break;
        case 'leerProductos':
            $stringArchivo = file_get_contents('./productos.json');
            echo $stringArchivo;
            break;
        default:
            echo "No existe ese caso";
            break;
    }
}

?>
