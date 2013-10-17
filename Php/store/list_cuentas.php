<?php


   session_start();
   error_reporting(0);
   
   $idempresa=isset($_SESSION["idEmpresa"]) ? $_SESSION["idEmpresa"]:"";
   require '../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		// Llamamos a la Tabla y sus datos 
		$sql = 'SELECT id_cuenta,concat(nombre_banco," - ",numero_cuenta) cuenta
                        FROM db_facturacion.cuentas c 
                        inner join bancos b on c.id_banco=b.id_banco 
                        where c.id_empresa='.$idempresa;
                
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		
		//Formamos el Array de Datos, si ejecutamos este archivo PHP veremos el array formado
		while($obj = mysql_fetch_object($result)) {
				$arr[] = $obj;
			    }
                            echo json_encode($arr);


// Cerramos la conexion a la bd
 mysql_close($connection);

?>
   