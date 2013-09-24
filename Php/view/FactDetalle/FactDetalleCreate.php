<?php
  session_start();
  error_reporting(0);
// Conexion a la Bd
require '../../Database_conf.php';
mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

        $info = $_POST["data"];
	$data = json_decode($info);
        $idFacturacion=$_GET["idf"];
        
        $qry="";
        foreach($data as $fila){
        
        $qry.= "(".$idFacturacion .",'". $fila->concepto ."',". $fila->valor_concepto .",". (($fila->venta_nosujeta !='') ? $fila->venta_nosujeta : '0.0') .",". (($fila->valor_exenta !='') ? $fila->valor_exenta : '0.0') .",". (($fila->valor_gravada !='') ? $fila->valor_gravada : '0.0') . "),";
        }
        
        $qry = preg_replace('/,$/', '', $qry);//para quitar la coma del final de la cadena
        
//Solo faltaria agregarlos a la tabla y crear bien el insert
	 $SqlDelete ="DELETE FROM detalleFacturacion where idFacturacion=$idFacturacion";
                            
		$delRs = mysql_query($SqlDelete);
        
        
         $SqlInsert ="INSERT INTO detalleFacturacion
                            (`idFacturacion`,
                            `concepto`,
                            `valor_concepto`,
                            `venta_nosujeta`,
                            `venta_exenta`,
                            `venta_gravada`)
                            VALUES ".$qry;
			
		$rs = mysql_query($SqlInsert);
                                
        echo json_encode(array(
                "success" 	=> mysql_errno() == 0,
                "msg"		=> mysql_errno() == 0 ? " Datos Agregados Correctamente: " : mysql_error(),


        ));