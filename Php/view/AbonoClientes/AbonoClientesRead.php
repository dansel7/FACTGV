<?php
  session_start();
 // error_reporting(0);
   require '../../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
                $idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";
		// Llamamos a la Tabla y sus datos 
		$sql = "SELECT
                        f.idfacturacion,
                        f.numero_factura,                   
                        mc.nom_cliente,
                        if(DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y') = '00/00/0000', null, DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y')) fecha_facturacion,
			f.venta_total-iFNull(sum(monto_cheque),0) saldo_pendiente
                        from abono_clientes ac right join facturacion f on ac.idfacturacion=f.idfacturacion 
                        inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes 
                        WHERE id_empresa=".$idempresa." and idbenutzer=".$_SESSION["idbenutzer"]."
                        GROUP BY f.idfacturacion
                        HAVING saldo_pendiente>0";
    	
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
   
