<?php
  session_start();
  error_reporting(0);
  
   if(isset($_SESSION["benutzer"])){
   echo "<div style='height:32px;'><b style='font-size:11px;font-family:tahoma, arial, verdana, sans-serif;'>Bienvenido: ".$_SESSION["benutzerName"];   
   echo '<a href="Php/Controller/login/logOut.php" style="text-decoration:none"><img align="right" src="resources/imagenes/logOut.png"></a>';
   echo '<br>Empresa a Facturar:  "'.$_SESSION["nombreEmpresa"].'"</b></div>';
   }
   
?>
