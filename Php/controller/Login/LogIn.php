<?php

if(isset($_POST["benutzer"]) && isset($_POST["kennwort"])){
   session_start();
   error_reporting(0);
   require '../../Database_conf.php';
   //SE VALIDA QUE EL USUARIO Y PASSWORD SEAN LOS CORRECTOS Y DEVUELVE UN RESULTADO 1 o 0
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");
   
   $sql = "select count(*),concat(IFNULL(b.nombre,''),' ',IFNULL(b.apellido,'')) nom, b.id_perfil, p.perfil
       from benutzer b inner join perfil  p on b.id_perfil=p.id_perfil
       where b.benutzer='{$_POST["benutzer"]}' and b.kennwort='{$_POST["kennwort"]}' limit 1";
       
   $Qryres = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());
   $resultado=  mysql_fetch_row($Qryres);

if($resultado[0]=="1"){
     $_SESSION["benutzerName"]=$resultado[1];
     $_SESSION["idperfil"]=$resultado[2];
     $_SESSION["perfil"]=$resultado[3];
     $_SESSION["benutzer"]=$_POST["benutzer"];
     
    echo '{"success":true}';   }
   else {
    echo '{"success":false}';  
   }
   
mysql_close($connection);

}

?>