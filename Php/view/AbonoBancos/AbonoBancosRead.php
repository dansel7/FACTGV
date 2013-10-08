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
			(f.venta_total - ifNull(ac.monto_cheque,0)) saldo_pendiente
                        FROM facturacion f 
                        inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes 
                        left join (select sum(monto_cheque) monto_cheque,idfacturacion from abono_clientes group by idfacturacion) ac on f.idfacturacion=ac.idFacturacion
                        WHERE id_empresa=".$idempresa." and idbenutzer=".$_SESSION["idbenutzer"]." and (f.venta_total - ifNull(ac.monto_cheque,0))>0";
    	
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
   
