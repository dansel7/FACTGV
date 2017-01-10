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
        $fecha_facturacion= $data->fecha_facturacion;
        $venta_acta_de= $data->venta_acta_de;
        $cond_operacion= $data->cond_operacion;
        $n_comprobante_credito= ($data->n_comprobante_credito=='')?'null':$data->n_comprobante_credito;
        $gastos_reintegro= $data->gastos_reintegro;
        $gastos_observaciones= $data->gastos_observaciones;
        $iva=  $data->iva;
        $iva_retenido=  $data->iva_retenido;
        $venta_total=  $data->venta_total;
        $fecha_quedan= ($data->fecha_quedan=='')?'0000-00-00':$data->fecha_quedan;
        $comprobante_quedan= $data->comprobante_quedan;
        $fecha_programada_pago= ($data->fecha_programada_pago=='')?'0000-00-00':$data->fecha_programada_pago;
        $id_empresa=$_SESSION["idEmpresa"];
        $id_tipo_facturacion=$data->id_tipo_facturacion;
	$anulado=$data->anulado;
        $peso=$data->peso;
        $nbultos=$data->nbultos;
        $wr=$data->wr;
        $hawb=$data->hawb;
        $mawb=$data->mawb;
        $sal=$data->sal;
        $hbol=$data->hbol;
        $id_orden_servicio=$data->id_orden_servicio;
        $fecha_orden_servicio=($data->fecha_orden_servicio=='')?'0000-00-00':$data->fecha_orden_servicio;
        $tipo_servicio_carga=$data->tipo_servicio_carga;
        $id = $data->idfacturacion;

        

        
	$SqlUpdate ="UPDATE facturacion
                             SET
                            `numero_factura`='$numero_factura',
                            `idmaestroClientes`=$idmaestroClientes,
                            `fecha_facturacion`= '$fecha_facturacion',
                            `cond_operacion` = '$cond_operacion',  
                            `n_comprobante_credito` = $n_comprobante_credito,
                            `venta_acta_de`= '$venta_acta_de',
                            `gastos_reintegro`=$gastos_reintegro,
                            `gastos_observaciones`='$gastos_observaciones',    
                            `iva`='$iva',
                            `iva_retenido`='$iva_retenido',
                            `venta_total`='$venta_total',
                            `fecha_quedan`='$fecha_quedan',
                            `comprobante_quedan`='$comprobante_quedan',
                            `fecha_programada_pago`='$fecha_programada_pago',
                            `id_empresa`=$id_empresa,
                            `anulado`='$anulado',   
                            `peso`=$peso,
                            `nbultos`=$nbultos,  
                            `wr`='$wr',
                            `hawb`='$hawb',
                            `mawb`='$mawb',
                            `sal`='$sal',
                            `hbol`='$hbol',
                            `id_orden_servicio`='$id_orden_servicio',    
                            `fecha_orden_servicio`='$fecha_orden_servicio',       
                            `tipo_servicio_carga`='$tipo_servicio_carga',
                            `id_tipo_facturacion`=$id_tipo_facturacion,
                            `auditoria_fecha_update`=NOW(),   
                            `idbenutzer_update`=".$_SESSION["idbenutzer"]   
			    ." WHERE idfacturacion=$id";
        
        
	$rs = mysql_query($SqlUpdate);

	echo json_encode(array(
		"success" 	=> mysql_errno() == 0,
		"msg"		=> mysql_errno() == 0?"Datos Actualizados":mysql_error()
	));
        
        // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>