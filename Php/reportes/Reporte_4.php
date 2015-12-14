<div style="font-size: 12px;font-family: helvetica;width: 2050px">
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
$idmc=($_GET["idmc"]>0)? " AND mc.idmaestroclientes=".$_GET["idmc"]:"";

$idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";
// ---------------INICIO DEL REPORTE-----------------

        $sql="select f.fecha_facturacion,f.id_tipo_facturacion,f.numero_factura,mc.nom_cliente,
        f.venta_total-f.iva+f.iva_retenido valor_neto,
        f.iva,f.iva_retenido,f.venta_total,f.anulado,
        GROUP_CONCAT(df.id_servicio ORDER BY df.id_servicio) id_servicio,
        GROUP_CONCAT(df.venta_nosujeta + df.venta_exenta + df.venta_gravada ORDER BY df.id_servicio) ventas
        from detalleFacturacion df 
        inner join facturacion f on df.idfacturacion=f.idfacturacion 
        inner join catalogo_servicios cs on cs.id_servicio=df.id_servicio
        inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes 
        where f.id_empresa=".$idempresa ." $idmc and f.fecha_facturacion 
        between STR_TO_DATE('$fecha_inicio','%d/%m/%Y') and STR_TO_DATE('$fecha_fin','%d/%m/%Y') 
        group by f.idfacturacion,id_tipo_facturacion
        order by f.fecha_facturacion, numero_factura,id_tipo_facturacion,df.id_servicio";
//echo $sql;
        
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
        
        $sql_serv = "select cs.servicio servicio,cs.id_servicio id_servicio,
        sum(IF(f.id_tipo_facturacion=1,(df.venta_nosujeta + df.venta_exenta + df.venta_gravada)*-1,(df.venta_nosujeta + df.venta_exenta + df.venta_gravada))) ventas
        from detalleFacturacion df inner join facturacion f on df.idfacturacion=f.idfacturacion 
        inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes             
        inner join catalogo_servicios cs on cs.id_servicio=df.id_servicio where f.id_empresa={$_SESSION["idEmpresa"]} $idmc 
        and f.anulado<>'Si' and f.fecha_facturacion between STR_TO_DATE('$fecha_inicio','%d/%m/%Y') and STR_TO_DATE('$fecha_fin','%d/%m/%Y')
        group by df.id_servicio";

    	$serv_res = mysql_query($sql_serv,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
        
  $encabezado="<h2><img src=\"/facturaciones/resources/imagenes/gvlogo.png\" align=\"left\">
      &nbsp;Reporte Detalle de Facturacion - {$_SESSION["nombreEmpresa"]}<br><br><br><br></h2>";
  
  $cuerpo_detalle.= '<table style="font-size: 11px" cellpadding="1">
                     <tr><td  style="text-align:center"><b>FECHA DE CCF</b></td>
                     <td  style="text-align:center"><b>NUMERO DE CCF</b></td> 
                     <td style="text-align:center" ><b>CLIENTE</b></td>';
  
  $num_row_ser=  mysql_num_rows($serv_res);
  

   while($rows_e = mysql_fetch_assoc($serv_res)){
   $idserv[]=$rows_e['id_servicio'];
   $serv[]=$rows_e['servicio'];
   $total_venta[]=$rows_e['ventas'];
   }
   
   foreach($serv as $s){
            $cuerpo_detalle.='<td style="text-align:right" ><b>'.$s.'</b></td>';
        }
        
  
  
  $cuerpo_detalle.= '<td  style="text-align:right" ><b>VALOR NETO DE CCF</b></td>
                     <td style="text-align:right"><b>IVA</b></td>
                     <td  style="text-align:right"><b>RETENCIONES</b></td>
                     <td   style="text-align:right"><b>TOTAL DE VENTA</b></td></tr>
                     <tr><td colspan="6"></td></tr>';
 

  $subTValorNeto=0;
  $subTIva=0;
  $subTIvaRetenido=0;
  $subTVentaTotal=0;
  $nFact="";
  $flag=0;

  while($rows_e = mysql_fetch_array($result)){
      $flag++;
        if($rows_e["anulado"]=="Si"){
        $cuerpo_detalle.= "<tr style=\"background-color:yellow\">
                          <td  style=\"text-align:right\"> ".substr($rows_e["fecha_facturacion"],0,11) ."</td> 
                          <td  style=\"text-align:center\">".$rows_e["numero_factura"] ."</td>
                          <td  style=\"text-align:left\">".$rows_e["nom_cliente"] ."</td>
                          <td  style=\"text-align:center\" colspan=\"". ($num_row_ser+4) ."\">------------------------------      <b>FACTURA ANULADA</b>    ------------------------------</td></tr>";
        }
        else
        { 

        $cuerpo_detalle.= "<tr> 
                         <td  style=\"text-align:right\"> ".substr($rows_e["fecha_facturacion"],0,11) ."</td> 
                         <td  style=\"text-align:center\">".$rows_e["numero_factura"] ."</td>
                         <td  style=\"text-align:left\">".$rows_e["nom_cliente"] ."</td>";

          $serv=explode(',',$rows_e["id_servicio"]);
          $servTotal=  count(array_unique($serv));
          $venta=explode(',',$rows_e["ventas"]); 
          
          
          $ventaGroup[$num_row_ser];
        $i=0;
        $b=-1;
        
        foreach($idserv as $ids){
             $b=-1;
              $ventaGroup[$i]=0; 
              foreach($serv as $id => $serv_i){
                   
                     if($serv_i==$ids){ 
                        if($b==$serv_i){
      //SI EL NUMERO DE SERVICIO Y TIPO ES EL MISMO QUE EL ANTERIOR QUE LO SUME SINO QUE SOLO LO MUESTRE. 
                         $ventaGroup[$i]+=$venta[$id];   
                         }else{
                         $ventaGroup[$i]=$venta[$id];   
                         }
                         
                      }else{
                        $ventaGroup[$i]+=0;                         
                      } 
                      $b=$serv_i;
              }

              $i++;
          }
          
          
          //print_r($ventaGroup);
          //echo "<br>";
        foreach($ventaGroup as $vent_serv){
        $cuerpo_detalle.= "<td  style=\"text-align:right;width:80px\">".((number_format($vent_serv,2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($vent_serv,2)) ."</td>";    
        }
        
          

          
         
            $cuerpo_detalle.= "<td  style=\"text-align:right\">".(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").  number_format($rows_e["valor_neto"],2)."</td>
                             <td  style=\"text-align:right\">".((number_format($rows_e["iva"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["iva"],2))."</td>
                             <td  style=\"text-align:right\">".((number_format($rows_e["iva_retenido"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["iva_retenido"],2))."</td>
                             <td  style=\"text-align:right\">".(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").  number_format($rows_e["venta_total"],2) ."</td></tr>";
         
            
               if($rows_e["id_tipo_facturacion"]==1){
     //SI ES UNA NOTA DE CREDITO SE RESTA DEL SUBTOTAL DE VALOR NETO Y VENTA TOTAL
                $subTValorNeto-=$rows_e["valor_neto"];
                $subTVentaTotal-=$rows_e["venta_total"]; 
                $subTIva-=$rows_e["iva"];
                $subTIvaRetenido-=$rows_e["iva_retenido"];
                }else{
                $subTValorNeto+=$rows_e["valor_neto"];
                $subTVentaTotal+=$rows_e["venta_total"];
                $subTIva+=$rows_e["iva"];
                $subTIvaRetenido+=$rows_e["iva_retenido"];
                }
        }
       
        }
        $cuerpo_detalle.='<tr><td colspan="7"></td></tr>';
        $cuerpo_detalle.='<tr><td style="text-align:right" colspan="3"><b>TOTALES</b></td>';
          
   foreach($total_venta as $s){
                $cuerpo_detalle.= "<td  style=\"text-align:right\"><b>". number_format($s,2) ."</b></td>";
            }
        $cuerpo_detalle.='<td style="text-align:right"><b>'.number_format($subTValorNeto,2).'</b></td><td style="text-align:right"><b>'.number_format($subTIva,2).'</b></td><td style="text-align:right"><b>'.number_format($subTIvaRetenido,2).'</b></td><td style="text-align:right"><b>'.number_format($subTVentaTotal,2).'</b></td></tr>';
        $cuerpo_detalle.='<tr><td colspan="7"></td></tr>';
        $cuerpo_detalle.= "</table>";
        $Reporte=$encabezado.$cuerpo_detalle.$pie_factura;


$exp=isset($_GET["exp"])? $_GET["exp"]:"-1";//Tipo de Exportacion
/////////////////////////////////////////////////////////////////////
if($exp!="-1"){
header("Content-Type: application/vnd.ms-excel");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("content-disposition: attachment;filename=DETALLE_SERV_$fecha_inicio-$fecha_fin.xls");
echo $Reporte;

}else{
echo $Reporte;

}

}

?>


</div>
