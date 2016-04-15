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

        $sql="select f.numero_factura,
        IFNULL(pmc.numero_partida,0) num_partida_clien,
        mc.nom_cliente,
        f.iva,
        f.iva_retenido,
        f.venta_total,
        GROUP_CONCAT(IFNULL(ps.numero_partida,0) ORDER BY df.id_servicio) num_partida_serv, 
        GROUP_CONCAT(cs.servicio ORDER BY df.id_servicio) servicio, 
        GROUP_CONCAT(df.venta_nosujeta + df.venta_exenta + df.venta_gravada) ventas 
        from detalleFacturacion df 
        inner join facturacion f on df.idfacturacion=f.idfacturacion 
        inner join catalogo_servicios cs on cs.id_servicio=df.id_servicio
        inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes 
        left join conta_partidas_maestroclientes pmc on pmc.idmaestroclientes=f.idmaestroClientes
        left join conta_partidas_servicios ps on ps.id_servicio=df.id_servicio
        where f.id_empresa=".$idempresa ." and pmc.id_empresa=".$idempresa ." and ps.id_empresa=".$idempresa ." and f.id_tipo_facturacion != 1 and f.anulado=\"no\"
        and  f.fecha_facturacion between STR_TO_DATE('$fecha_inicio','%d/%m/%Y') and STR_TO_DATE('$fecha_fin','%d/%m/%Y') 
        group by f.idfacturacion,id_tipo_facturacion
        order by f.fecha_facturacion, numero_factura,id_tipo_facturacion,df.id_servicio";
//echo $sql;
        
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
        
       

	
        
  /*$encabezado="<h2><img src=\"/facturaciones/resources/imagenes/gvlogo.png\" align=\"left\">
      &nbsp;Partidas de Diario - {$_SESSION["nombreEmpresa"]}<br><br><br><br></h2>"; */
  $encabezado="<center><h2>&nbsp;Partidas de Diario - {$_SESSION["nombreEmpresa"]}</h2>"
                . "<h3>Desde $fecha_inicio Hasta $fecha_fin</h3><br>";      
  
  $encabezado.= '<table border="1" style="font-size: 11px" cellpadding="5">
                     <tr><td  style="text-align:center"><b>CUENTA</b></td>
                     <td  style="text-align:center"><b>CONCEPTO</b></td> 
                     <td style="text-align:center" ><b>CARGO</b></td>
                     <td style="text-align:center" ><b>ABONO</b></td>';
 

  $subTCargos=0;
  $subTAbonos=0;
  $subTIvaRetenido=0;
  $subTIva=0;
  $nFact="";
  $flag=0;

  while($rows_e = mysql_fetch_array($result)){
      $flag++;
      
        $cuerpo_detalle.= "<tr> 
                         <td  style=\"text-align:right\">".$rows_e["num_partida_clien"] ."</td> 
                         <td  style=\"text-align:left\">Venta segun CCF #".$rows_e["numero_factura"] ."</td>
                         <td  style=\"text-align:right\">".$rows_e["venta_total"] ."</td>
                         <td  style=\"text-align:right\"></td>    
                         </tr>";
        //SUMATORIA CARGOS
        $subTCargos+=$rows_e["venta_total"];        
        
        $n_partida_serv=explode(',',$rows_e["num_partida_serv"]);  
        $serv=explode(',',$rows_e["servicio"]);
        $venta=explode(',',$rows_e["ventas"]); 

        $i=0;       
        foreach($serv as $nom_servicio){
             $cuerpo_detalle.= "<tr> 
                         <td  style=\"text-align:right\">".$n_partida_serv[$i] ."</td> 
                         <td  style=\"text-align:left\">Venta ".$nom_servicio ."</td>
                         <td  style=\"text-align:right\"></td>
                         <td  style=\"text-align:right\">".$venta[$i] ."</td>    
                         </tr>";
                    //SUMATORIA ABONOS
                     $subTAbonos+=$venta[$i];
           $i++;
          }
                //SI POSEE IVA RETENIDO    
          if($rows_e["iva_retenido"]>0.0){
               $cuerpo_detalle.= "<tr> 
                         <td  style=\"text-align:right\">110604</td> 
                         <td  style=\"text-align:left\">CCF #".$rows_e["numero_factura"] ." ".$rows_e["nom_cliente"]." </td>
                         <td  style=\"text-align:right\">".$rows_e["iva_retenido"] ."</td>
                         <td  style=\"text-align:right\"></td>    
                         </tr>";
                   //SUMATORIA CARGOS
                   $subTCargos+=$rows_e["iva_retenido"] ;
          }
                   $cuerpo_detalle.= "<tr> 
                         <td  style=\"text-align:right\">210502</td> 
                         <td  style=\"text-align:left\">CCF #".$rows_e["numero_factura"] ." ".$rows_e["nom_cliente"]." </td>
                         <td  style=\"text-align:right\"></td>
                         <td  style=\"text-align:right\">".$rows_e["iva"] ."</td>    
                         </tr>";
                   //SUMATORIA ABONOS
                     $subTAbonos+=$rows_e["iva"] ;
        
       
        }
        $pie.='<tr><td style="text-align:right" colspan="2"></td>';

        $pie.='<td style="text-align:right"><b>'.number_format($subTCargos,2).'</b></td><td style="text-align:right"><b>'.number_format($subTAbonos,2).'</b></td></tr>';

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
