<?php
  session_start();
   require '../../../Database_conf.php';
      mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

       $idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";
		$arr = array();
		// Llamamos a la Tabla y sus datos 
		$sql = "select * from conta_partidas_servicios where id_empresa=".$idempresa;
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		
		//Formamos el Array de Datos, si ejecutamos este archivo PHP veremos el array formado
		while($obj = mysql_fetch_object($result)) {
						$arr[] = $obj;
					}
                            echo '{ metaData: { "root": "data"}';	
                            echo ',"success":true, "data":' . json_encode($arr) . '}';


// Cerramos la conexion a la bd
 mysql_close($connection);
?>
   
