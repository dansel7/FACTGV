<?php


   session_start();
   error_reporting(0);
   
   $benutzer=isset($_SESSION["benutzer"])?$_SESSION["benutzer"]:"";
   require '../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		// Llamamos a la Tabla maestro clientes y filtramos solo los que esten activos
		$sql = "select idmaestroClientes, nom_cliente from maestroclientes where activo='Si'";
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		
		//Formamos el Array de Datos, si ejecutamos este archivo PHP veremos el array formado
		while($obj = mysql_fetch_object($result)) {
						$arr[] = $obj;
					}
                            echo json_encode($arr);


// Cerramos la conexion a la bd
 mysql_close($connection);

?>
   