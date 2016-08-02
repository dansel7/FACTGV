<?
	session_start();
        if(isset($_GET["var"])){
           unset($_SESSION["idEmpresa"]);
           unset($_SESSION["nombreEmpresa"]);
           unset($_SESSION["direccionEmp"]);
           unset($_SESSION["nitEmp"]);
           unset($_SESSION["nrcEmp"]);
        }else{
	session_destroy(); // destruyo la sesión 
        }
    header("Location: ../../../"); //envío al usuario a la pag. de autenticación 
       
?>