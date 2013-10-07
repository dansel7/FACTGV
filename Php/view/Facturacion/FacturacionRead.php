<?php
  session_start();
  //error_reporting(0);
   require '../../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
                $idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";
		// Llamamos a la Tabla y sus datos 
                
		$sql = "SELECT
                        f.idfacturacion,
                        f.numero_factura,
                        f.idmaestroClientes,
                        f.cond_operacion,
                        f.n_comprobante_credito,
                        mc.nom_cliente,
                        if(DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y') = '00/00/0000', null, DATE_FORMAT(f.fecha_facturacion, '%d/%m/%Y')) fecha_facturacion,
                        f.venta_acta_de,
                        f.iva,
                        f.iva_retenido,
                        f.venta_total,
                        if(DATE_FORMAT(f.fecha_quedan, '%d/%m/%Y') = '00/00/0000', null,DATE_FORMAT(f.fecha_quedan, '%d/%m/%Y'))  fecha_quedan,
                        f.comprobante_quedan,
                        if(DATE_FORMAT(f.fecha_programada_pago, '%d/%m/%Y') = '00/00/0000', null,DATE_FORMAT(f.fecha_quedan, '%d/%m/%Y'))  fecha_programada_pago,
                        f.id_empresa,
                        f.id_tipo_facturacion,
                        f.anulado
                        FROM facturacion f inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes
                        where id_empresa=".$idempresa." and idbenutzer=".$_SESSION["idbenutzer"];
                
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
   
