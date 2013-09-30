<?php
// Configuracion de la conexion a la bd
$db_name = "db_facturacion"; //Nombre de la Base de Datos
$db_host = "localhost"; 
$db_username = "root"; //Cambiar Usuario segun la configuracion de tu Mysql
$db_password = "va"; // Cambiar Password segun la configuracion de tu Mysql

// Conexion a la bd
$connection = mysql_connect($db_host, $db_username, $db_password) or die("Error de conexion al servidor SQL".$connection ."<br>".mysql_error()."<br>");
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	function hidelock($string) {//ENCRYPT ID, CADENAS O CUALQUIER DATO EN STRING
   $key="f0gv13";//llave de encriptacion
   $result = '';
   for($i=0; $i<strlen($string); $i++) {
      $char = substr($string, $i, 1);
      $keychar = substr($key, ($i % strlen($key))-11*5, 1);
      $char = chr(ord($char)+ord($keychar));
      $result.=$char;
   }
   return base64_encode($result);
}

function hideunlock($string) {//DECRYPT ID, CADENAS O CUALQUIER DATO EN STRING
   $key="f0gv13";//llave de encriptacion
   $result = '';
   $string=str_replace(" ","+",$string);
   $string = base64_decode($string);
   for($i=0; $i<strlen($string); $i++) {
      $char = substr($string, $i, 1);
      $keychar = substr($key, ($i % strlen($key))-11*5, 1);
      $char = chr(ord($char)-ord($keychar));
      $result.=$char;
   }
   return $result;
}
//ESTAS MISMAS FUNCIONES ESTAN PARA JAVASCRIPT EN JS/JQUERY-1.8.3.JS

        
?>