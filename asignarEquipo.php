<?php
session_start();

$isLogged = $_SESSION["islogged"] ?? FALSE;

if (!$isLogged || ($_SESSION["tipo"] == "prof"))
{
  header("Location: logout.php");
  exit;
}

include_once ('init.php');

use Horarios\model\manageAdmin;
use Horarios\model\manageDire;

use Horarios\model\aulas\aulaDB;

switch($_SESSION["tipo"]) {
  case 'admi':
    $panel = new manageAdmin($_SESSION["usuario"], $_SESSION["tipo"], $_SESSION["carrera"],$_SESSION["contrato"]);
    break;
  case 'dire':
    $panel = new manageDire($_SESSION["usuario"], $_SESSION["tipo"], $_SESSION["carrera"],$_SESSION["contrato"]);
    break;
  default:
    die ("Ha ocurrido un problema.");
    break;
}


?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="img/favicon.ico">

    <title>Panel de Administración</title>

    <!-- Bootstrap core CSS -->
    <link href="style/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style/font-awesome.min.css">

    <!-- Custom styles for this template -->
    <link href="style/dashboard.css" rel="stylesheet">
  </head>

  <body>

    <?php
    $panel->writeHTMLPanelBar();
    $panel->writeHTMLNavBar();


    ?>


    <div class="col-sm-12 col-sm-offset-3 col-md-10 col-md-offset-2 main">

      <div class="col-md-12 colarr">
        <h1>Asignar equipo</h1>
        <form method="POST" action="adminAulas.php" name="frmAsignarEquipo1" enctype="multipart/form-data">
          <button type="submit" class="btn btn-primary pull-right" style="margin-top: -50px;" name="guardar" id="btnAddEquipoAula">Guardar</button>
          <input type="text" name="aula" value="<?php echo $_POST["idAula"]; ?>" hidden>
          <hr>
          <br>

        
          <!-- Default panel contents -->
          <?php
            $cat = new aulaDB($_SESSION["tipo"]);
            $r = $cat->getAllCategorias();

            foreach($r as $cats):
          ?>
          <div class="panel panel-default">
            <div class="panel-heading main-color-bg"><?php echo $cats["nombre"] ?></div>
            <!-- Table -->
            <table class="table table-striped table-hover">
              <?php
                $eq = new aulaDB($_SESSION["tipo"]);
                $rE = $eq->getAllEquipos($cats["id"]);

                foreach($rE as $eqs):
                  $valorCantidad = $eq->getCantidad($eqs["id"], $_POST["idAula"]);
                  $valorEquipo = "checked";
                  if(!$valorCantidad){
                    $valorCantidad[0]["cantidad"] = NULL;
                    $valorEquipo = NULL;
                  }
              ?>
                <tr>
                  <td><?php echo $eqs["nombre"] ?></td>
                  <td><?php echo $eqs["descripcion"] ?></td>
                  <td><input class="form-control input" type="text" name="cantidad[]" value="<?php echo $valorCantidad[0]["cantidad"]; ?>"></td>
                  <td><input class="pull-right" type="checkbox" name="equipo[]" value="'<?php echo $eqs["id"]; ?>'" <?php echo $valorEquipo; ?>></td>
                </tr>
              <?php endforeach; ?>
            </table>
          </div>
          <?php endforeach; ?>
       </form>
     </div>
   </div>

   <!-- ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <script src="js/adminAulasActions.js"></script> <!--Este archivo es el que contiene las acciones que realizará cada uno de los elementos de la interfaz-->

    <!-- <script src="style/alertify/alertify.min.js"></script> -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
