<?php
  session_start();
  error_reporting(0);
// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info ='[{"concepto":"kjfskdaf","valor_concepto":23,"venta_nosujeta":10,"venta_exenta":null,"venta_gravada":null},{"concepto":"conp2","valor_concepto":45,"venta_nosujeta":0,"venta_exenta":null,"venta_gravada":null}] ';

	$data = json_decode($info);
        $idFacturacion=$_GET["idf"];
        
        $qry="";
        foreach($data as $fila){
        $qry.="(".$idFacturacion .",". $fila->concepto .",". $fila->valor_concepto .",". $fila->venta_nosujeta .",".$fila->valor_exenta.",".$fila->valor_gravada.")," ;
        }
        
        echo $qry;
        
//Solo faltaria agregarlos a la tabla y crear bien el insert
	
         /*        $SqlInsert ="INSERT INTO facturacion
                             SET
                             `numero_factura`='$numero_factura',
                               `idmaestroClientes`=$idmaestroClientes,
				`comprobante`='$comprobante',
                                `fecha_facturacion`='$fecha_facturacion',
                                `venta_acta_de`='$venta_acta_de',
                                `iva`='$iva',
                                `iva_retenido`='$iva_retenido',
                                `venta_total`='$venta_total',
                                `fecha_quedan`='$fecha_quedan',
                                `comprobante_quedan`='$comprobante_quedan',
				`fecha_programada_pago`='$fecha_programada_pago',
                                `id_empresa`=$id_empresa,
                                `id_tipo_facturacion`=$id_tipo_facturacion,
                                `idbenutzer`=".$_SESSION["idbenutzer"];
			*/
			//$rs = mysql_query($SqlInsert);
                                
        echo json_encode(array(
                "success" 	=> mysql_errno() == 0,
                "msg"		=> mysql_errno() == 0 ? " Datos Agregados Correctamente: " : mysql_error(),


        ));