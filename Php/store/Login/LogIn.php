<?php

if(isset($_POST["benutzer"]) && isset($_POST["kennwort"])){
   session_start();
   error_reporting(0);
   require '../../Database_conf.php';
   //SE VALIDA QUE EL USUARIO Y PASSWORD SEAN LOS CORRECTOS Y DEVUELVE UN RESULTADO 1 o 0
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");
   
   $sql = "select count(*),concat(b.nombre,' ',b.apellido) nom,b.id_nivel_usuario, n_u.nivel
       from benutzer b inner join nivel_usuario  n_u on b.id_nivel_usuario=n_u.id_nivel_usuario
       where b.benutzer='{$_POST["benutzer"]}' and b.kennwort='{$_POST["kennwort"]}' limit 1";
       
   $Qryres = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());
   $resultado=  mysql_fetch_row($Qryres);

if($resultado[0]=="1"){
     $_SESSION["nombre"]=$resultado[1];
     $_SESSION["idnivel"]=$resultado[2];
     $_SESSION["nivel"]=$resultado[3];
     $_SESSION["benutzer"]=$_POST["benutzer"];
     
    echo '{"success":true}';   }
   else {
    echo '{"success":false}';  
   }
   
mysql_close($connection);

}

?>