<?php
 session_start();
  error_reporting(0);
// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

	$numero_factura=  $data->numero_factura;
        $idmaestroClientes=$data->idmaestroClientes;
        $comprobante=  $data->comprobante;
        $fecha_facturacion= $data->fecha_facturacion;
        $venta_acta_de= $data->venta_acta_de;
        $iva=  $data->iva;
        $iva_retenido=  $data->iva_retenido;
        $venta_total=  $data->venta_total;
        $fecha_quedan= $data->fecha_quedan;
        $comprobante_quedan= $data->comprobante_quedan;
        $fecha_programada_pago= $data->fecha_programada_pago;
        $id_empresa=$_SESSION["idEmpresa"];
        $id_tipo_facturacion=$data->id_tipo_facturacion;
	$id = $data->idfacturacion;

        
	$SqlUpdate ="UPDATE facturacion
                             SET
                            `numero_factura`='$numero_factura',
                            `idmaestroClientes`=$idmaestroClientes,
                            `comprobante`='$comprobante',
                            `fecha_facturacion`= '$fecha_facturacion',
                            `venta_acta_de`='$venta_acta_de',
                            `iva`='$iva',
                            `iva_retenido`='$iva_retenido',
                            `venta_total`='$venta_total',
                            `fecha_quedan`='$fecha_quedan',
                            `comprobante_quedan`='$comprobante_quedan',
                            `fecha_programada_pago`='$fecha_programada_pago',
                            `id_empresa`=$id_empresa,
                            `id_tipo_facturacion`=$id_tipo_facturacion
			 WHERE idfacturacion=$id";
        
        
	$rs = mysql_query($SqlUpdate);

	echo json_encode(array(
		"success" 	=> mysql_errno() == 0,
		"msg"		=> mysql_errno() == 0?"Datos Actualizados":mysql_error()
	));