<?php

   require '../../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		// Llamamos a la Tabla y sus datos 
		$sql = "SELECT id_cuenta,numero_cuenta,nombre_banco banco,b.id_banco,e.id_empresa,e.nombre empresa,c.partida_contable partida_contable
                        FROM cuentas c 
                        INNER JOIN bancos b ON b.id_banco=c.id_banco
                        INNER JOIN empresa e ON e.id_empresa=c.id_empresa ";
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
   
