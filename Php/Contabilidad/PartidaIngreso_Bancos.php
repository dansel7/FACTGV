<div style="font-size: 12px;font-family: helvetica;">
<?php
//REPORTE MOVIMIENTOS INGRESO A BANCOS
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

  $sql='SELECT
	c.numero_cuenta no_cuenta,
    DATE_FORMAT(ab.fecha_remesa, \'%d/%m/%Y\') fecha_remesa,
    "DEPOSITO" Movimiento,
    ab.numero_remesa,
    CONCAT("",GROUP_CONCAT(DISTINCT IF(ac.numero_cheque=0,"TRANSFERENCIA",IF(ac.numero_cheque=-1,"EFECTIVO",CONCAT("CHQ ",ac.numero_cheque))) ) , CONCAT(" PAGO FACTURA ", GROUP_CONCAT(f.numero_factura)) ) concepto,
    SUM(ac.monto_cheque) monto
FROM
    abono_bancos ab
        INNER JOIN
    abono_clientes ac ON ac.id_abono_clientes = ab.id_abono_clientes
        INNER JOIN
    cuentas c ON c.id_cuenta = ab.id_cuenta
        INNER JOIN
    facturacion f ON f.idfacturacion = ac.idfacturacion
        INNER JOIN
    maestroclientes mc ON f.idmaestroClientes = mc.idmaestroClientes
WHERE
    f.id_empresa = '.$idempresa.'
AND ab.fecha_remesa BETWEEN STR_TO_DATE(\''.$fecha_inicio.'\', \'%d/%m/%Y\') AND STR_TO_DATE(\''.$fecha_fin.'\',\'%d/%m/%Y\') 
GROUP BY ab.numero_remesa,ab.id_cuenta,ab.fecha_remesa
ORDER BY DATE_FORMAT(ab.fecha_remesa, \'%Y/%m/%d\') ASC , numero_remesa, numero_factura';

    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	

  /*$encabezado="<h2><img src=\"/facturaciones/resources/imagenes/gvlogo.png\" align=\"left\">
      &nbsp;Partidas de Diario - {$_SESSION["nombreEmpresa"]}<br><br><br><br></h2>"; */
  $encabezado="<center><h2>&nbsp;Movimientos de Ingreso a Bancos - {$_SESSION["nombreEmpresa"]}</h2>"
                . "<h3>Desde $fecha_inicio Hasta $fecha_fin</h3><br>";      
  
  $encabezado.= '<table border="1" style="font-size: 11px" cellpadding="5">
                 <tr><td  style="text-align:center"><b>ID</b></td>
                     <td  style="text-align:center"><b>No.CUENTA</b></td>
                     <td  style="text-align:center"><b>FECHA</b></td>
                     <td  style="text-align:center"><b>MOVIMIENTO</b></td> 
                     <td style="text-align:center" ><b>NUMERO</b></td>
                     <td style="text-align:center" ><b>CONCEPTO</b></td>
                     <td style="text-align:center" ><b>MONTO</b></td></tr>';

  
  $i=0;

  while($rows_e = mysql_fetch_array($result)){
      $i++;
      
            $cuerpo_detalle.= "<tr> 
                         <td  style=\"text-align:right\">".$i ."</td>
                         <td  style=\"text-align:right\">".$rows_e["no_cuenta"] ."</td>             
                         <td  style=\"text-align:right\">".$rows_e["fecha_remesa"] ."</td> 
                         <td  style=\"text-align:left\">".$rows_e["Movimiento"] ."</td>
                         <td  style=\"text-align:right\">".$rows_e["numero_remesa"] ."</td>
                         <td  style=\"text-align:right\">".$rows_e["concepto"] ."</td>
                         <td  style=\"text-align:right\">".$rows_e["monto"] ."</td>
                         </tr>";                

        }
       
        $pie.= "</table> </center>";
        
        $Reporte=$encabezado.$cuerpo_detalle.$pie;


$exp=isset($_GET["exp"])? $_GET["exp"]:"-1";//Tipo de Exportacion
/////////////////////////////////////////////////////////////////////
if($exp!="-1"){
header("Content-Type: application/vnd.ms-excel");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("content-disposition: attachment;filename=Ingreso_Partida_Diario_$fecha_inicio-$fecha_fin.xls");
echo $Reporte;

}else{
echo $Reporte;

}

}

?>


</div>
