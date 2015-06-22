<?php

if(isset($_GET["opx"])){ 
   session_start();
   error_reporting(0);
   
   $idempresa=isset($_SESSION["idEmpresa"]) ? $_SESSION["idEmpresa"]:"";
   $num_fact=isset($_GET["query"])? $_GET["query"]:"";
   require '../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		// Llamamos a la Tabla y sus datos 
		$sql = "SELECT
                        f.idfacturacion idFact,
                        CONCAT(f.numero_factura,' || ',DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y')) comprobante,
                        f.venta_total total
                        FROM facturacion f
                        where f.id_tipo_facturacion!=1 and f.id_empresa=".$idempresa ." and (f.numero_factura like '".$num_fact."%'
                              or DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y')  like '%".$num_fact."%')
                        order by f.fecha_facturacion desc ,f.numero_factura desc";

    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		
		//Formamos el Array de Datos, si ejecutamos este archivo PHP veremos el array formado
		while($obj = mysql_fetch_object($result)) {
				$arr[] = $obj;
			    }
                            echo json_encode($arr);


// Cerramos la conexion a la bd
 mysql_close($connection);
}
?>
   