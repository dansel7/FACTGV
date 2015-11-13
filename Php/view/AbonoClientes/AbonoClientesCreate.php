<?php
  session_start();
  error_reporting(0);
// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

	$info = $_POST["data"];

	$data = json_decode($info);

	$fecha_pago = $data->fecha_pago;
        $numero_cheque=$data->numero_cheque;
	$monto_cheque=$data->monto_cheque;
        $idFacturacion=$data->idfacturacion;
       
        $monto_efectivo=$data->monto_efectivo;
        
        $numero_remesa=$data->numero_remesa;
        $monto_remesa=$data->monto_remesa;
        $id_cuenta=$data->id_cuenta;
        
        $tipo_pago=$data->tipo_pago;
        
        if($tipo_pago=="Cheque"){
            
        $SqlInsert ="INSERT INTO abono_clientes
                     SET
                    `fecha_pago`='$fecha_pago',
                    `numero_cheque`='$numero_cheque',
                    `monto_cheque`=$monto_cheque,
                    `idfacturacion`=$idFacturacion,
                    `idbenutzer`=".$_SESSION["idbenutzer"];  
                    $rs = mysql_query($SqlInsert);
                    
        }else if($tipo_pago=="Transferencia"){
            
            $sql_clientes ="INSERT INTO abono_clientes
                     SET
                    `fecha_pago`='$fecha_pago',
                    `numero_cheque`='$numero_cheque',
                    `monto_cheque`= $monto_remesa,
                    `idfacturacion`=$idFacturacion,
                    `idbenutzer`=".$_SESSION["idbenutzer"];  
                    $rs = mysql_query($sql_clientes);
                    $id_abono_clientes=mysql_insert_id();
                   
            $sql_bancos ="INSERT INTO abono_bancos
                     SET
                    `fecha_remesa`='$fecha_pago',
                    `numero_remesa`='$numero_remesa',
                    `id_abono_clientes`=$id_abono_clientes,
                    `id_cuenta`=$id_cuenta";  
                    $rs = mysql_query($sql_bancos);
                    
        }else if($tipo_pago=="Pago En Efectivo"){
            
        $SqlInsert ="INSERT INTO abono_clientes
                     SET
                    `fecha_pago`='$fecha_pago',
                    `numero_cheque`='$numero_cheque',
                    `monto_cheque`=$monto_efectivo,
                    `idfacturacion`=$idFacturacion,
                    `idbenutzer`=".$_SESSION["idbenutzer"];  
                    $rs = mysql_query($SqlInsert);
        }
        
        
                

				echo json_encode(array(
					"success" 	=> mysql_errno() == 0,
					"msg"		=> mysql_errno() == 0 ? "Datos Agregados Correctamente":mysql_error(),
					"data"		=> array(array(
                                           
                                        ))
				)); 
                                
              // Cerramos la conexion a la bd
 mysql_close($connection);
 ?>