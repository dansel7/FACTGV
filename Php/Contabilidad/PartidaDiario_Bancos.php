<div style="font-size: 12px;font-family: helvetica;">
<?php
//REPORTE DETALLE SERVICIOS FACTURADOS
error_reporting(0);
session_start();

if(!isset($_SESSION['benutzer']) || !isset($_SESSION["idEmpresa"]) ){
		$direccion = "Location: ../../index.php";
		header($direccion);
	}else{

require_once('../Database_conf.php');
$fecha_inicio=$_GET["fecha_ini"];
$fecha_fin=$_GET["fecha_fin"];


$idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";
// ---------------INICIO DEL REPORTE--d---------------

  $sql="SELECT 
    DATE_FORMAT(ab.fecha_remesa, '%d/%m/%Y') fecha_remesa,
    ab.numero_remesa,
    sum(ac.monto_cheque) Deposito,
    c.partida_contable num_partida_banco,
    GROUP_CONCAT(ac.monto_cheque) monto,
    GROUP_CONCAT(f.numero_factura) numero_factura,
    GROUP_CONCAT(IFNULL(pmc.numero_partida, 0)) num_partida_clien
FROM
    abono_bancos ab
        INNER JOIN
    abono_clientes ac ON ac.id_abono_clientes = ab.id_abono_clientes
        INNER JOIN
    cuentas c ON c.id_cuenta = ab.id_cuenta
        INNER JOIN
    bancos b ON b.id_banco = c.id_banco
        INNER JOIN
    facturacion f ON f.idfacturacion = ac.idfacturacion
        INNER JOIN
    maestroclientes mc ON f.idmaestroClientes = mc.idmaestroClientes
        LEFT JOIN
    conta_partidas_maestroclientes pmc ON pmc.idmaestroclientes = f.idmaestroClientes
WHERE
        f.id_empresa=".$idempresa ." and (pmc.id_empresa=".$idempresa ." or pmc.id_empresa is null )
        and  ab.fecha_remesa between STR_TO_DATE('$fecha_inicio','%d/%m/%Y') and STR_TO_DATE('$fecha_fin','%d/%m/%Y') 
        GROUP BY ab.numero_remesa
ORDER BY DATE_FORMAT(ab.fecha_remesa, '%Y/%m/%d') ASC , numero_remesa , numero_factura";

    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
               
  /*$encabezado="<h2><img src=\"/facturaciones/resources/imagenes/gvlogo.png\" align=\"left\">
      &nbsp;Partidas de Diario - {$_SESSION["nombreEmpresa"]}<br><br><br><br></h2>"; */
  $encabezado="<center><h2>&nbsp;Partidas de Diario Bancos - {$_SESSION["nombreEmpresa"]}</h2>"
                . "<h3>Desde $fecha_inicio Hasta $fecha_fin</h3><br>";      
  
  $encabezado.= '<table border="1" style="font-size: 11px" cellpadding="5">
                 <tr><td  style="text-align:center"><b>FECHA</b></td>
                     <td  style="text-align:center"><b>CUENTA</b></td>
                     <td  style="text-align:center"><b>CONCEPTO</b></td> 
                     <td style="text-align:center" ><b>CARGO</b></td>
                     <td style="text-align:center" ><b>ABONO</b></td>';
 

  $subTCargos=0;
  $subTAbonos=0;
  $subTIvaRetenido=0;
  $flag=0;

  while($rows_e = mysql_fetch_array($result)){
      $flag++;
      
            $cuerpo_detalle.= "<tr> 
                         <td  style=\"text-align:right\">".$rows_e["fecha_remesa"] ."</td>             
                         <td  style=\"text-align:right\">".$rows_e["num_partida_banco"] ."</td> 
                         <td  style=\"text-align:left\">Deposito #".$rows_e["numero_remesa"] ."</td>
                         <td  style=\"text-align:right\">".$rows_e["Deposito"] ."</td>
                         <td  style=\"text-align:right\"></td>    
                         </tr>";      
        //SUMATORIA CARGOS
        $subTCargos+=$rows_e["Deposito"];        
       
        
        $n_partida_cliente=explode(',',$rows_e["num_partida_clien"]);  
        $n_factura=explode(',',$rows_e["numero_factura"]);
        $monto=explode(',',$rows_e["monto"]); 

        $i=0;       
        foreach($n_factura as $numero_factura){
            
                $cuerpo_detalle.= "<tr> 
                         <td  style=\"text-align:right\">".$rows_e["fecha_remesa"] ."</td>  
                         <td  style=\"text-align:right\">".$n_partida_cliente[$i] ."</td> 
                         <td  style=\"text-align:left\">PAGO FACT ".$numero_factura ."</td>
                         <td  style=\"text-align:right\"></td>
                         <td  style=\"text-align:right\">".$monto[$i] ."</td>    
                         </tr>";
            
                    //SUMATORIA ABONOS
                     $subTAbonos+=$monto[$i];
           
           $i++;
            
          }
      
          

        }
       
        $pie.= "</table> </center>";
        
        $Reporte=$encabezado.$cuerpo_detalle.$pie;


$exp=isset($_GET["exp"])? $_GET["exp"]:"-1";//Tipo de Exportacion
/////////////////////////////////////////////////////////////////////
if($exp!="-1"){
header("Content-Type: application/vnd.ms-excel");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("content-disposition: attachment;filename=Partida_Diario_$fecha_inicio-$fecha_fin.xls");
echo $Reporte;

}else{
echo $Reporte;

}

}

?>


</div>
