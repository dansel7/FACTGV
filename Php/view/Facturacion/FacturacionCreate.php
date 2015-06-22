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
                                $cond_operacion= $data->cond_operacion;
                                $n_comprobante_credito= ($data->n_comprobante_credito=='')?'null':$data->n_comprobante_credito;
                                $venta_acta_de= $data->venta_acta_de;
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
                                $embarcador=$data->embarcador;
                                $wr=$data->wr;
                                $hawb=$data->hawb;
                                $mawb=$data->mawb;
                                $tipo_servicio_carga=$data->tipo_servicio_carga;
	
	
                 $SqlInsert ="INSERT INTO facturacion
                             SET
                             `numero_factura`='$numero_factura',
                               `idmaestroClientes`=$idmaestroClientes,
                                `fecha_facturacion`='$fecha_facturacion',
                                `cond_operacion` = '$cond_operacion',  
                                `n_comprobante_credito` = $n_comprobante_credito,
                                `venta_acta_de`='$venta_acta_de',
                                `iva`='$iva',
                                `iva_retenido`='$iva_retenido',
                                `venta_total`='$venta_total',
                                `fecha_quedan`='$fecha_quedan',
                                `comprobante_quedan`='$comprobante_quedan',
				`fecha_programada_pago`='$fecha_programada_pago',
                                `id_empresa`=$id_empresa,
                                `id_tipo_facturacion`=$id_tipo_facturacion,
                                `anulado`='$anulado',
                                `peso`=$peso,
                                `nbultos`=$nbultos,
                                `embarcador`='$embarcador',    
                                `wr`='$wr',
                                `hawb`='$hawb',
                                `mawb`='$mawb',
                                `tipo_servicio_carga`='$tipo_servicio_carga',
                                `idbenutzer`=".$_SESSION["idbenutzer"];
			
			$rs = mysql_query($SqlInsert);

				echo json_encode(array(
					"success" 	=> mysql_errno() == 0,
					"msg"		=> mysql_errno() == 0 ? "Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(
                                            array(
                                                "idfacturacion" => mysql_insert_id(),// <--- importantisimo regresar el ID asignado al record, para que funcione correctamente el metodo update y delete
                                                "numero_factura"=> $numero_factura,
                                                "idmaestroClientes"=>$idmaestroClientes,
                                                "cond_operacion" => $cond_operacion,  
                                                "n_comprobante_credito" => $n_comprobante_credito,
                                                "fecha_facturacion"=>$fecha_facturacion,
                                                "venta_acta_de"=>$venta_acta_de,
                                                "iva"=>$iva,
                                                "iva_retenido"=>$iva_retenido,
                                                "venta_total"=>$venta_total,
                                                "fecha_quedan"=>$fecha_quedan,
                                                "comprobante_quedan"=>$comprobante_quedan,
                                                "fecha_programada_pago"=>$fecha_programada_pago,
                                                "peso"=>$peso,
                                                "nbultos"=>$nbultos,
                                                "embarcador"=>$embarcador,    
                                                "wr"=>$wr,
                                                "hawb"=>$hawb,
                                                "mawb"=>$mawb, 
                                                "tipo_servicio_carga"=>$tipo_servicio_carga, 
                                                "id_tipo_facturacion"=>$id_tipo_facturacion
                                            )
					)
				));
                                
// Cerramos la conexion a la bd
 mysql_close($connection);
 ?>