<?php

//REPORTE SERVICIOS FACTURADOS


error_reporting(0);
session_start();

if(!isset($_SESSION['benutzer']) || !isset($_SESSION["idEmpresa"]) ){
		$direccion = "Location: ../../index.php";
		header($direccion);
	}else{
require_once('tcpdf/config/lang/eng.php');
require_once('tcpdf/tcpdf.php');
require_once('../Database_conf.php');
$pdf = new TCPDF("vertical", "cm", "Letter", true, 'UTF-8', false); 

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Daniel E. Diaz');
$pdf->SetTitle('GV');
$pdf->SetSubject('Control');
$pdf->SetKeywords('TCPDF, PDF, factura, control, contabilidad');
$pdf->setPrintHeader(false);
$pdf->SetPrintFooter(false);
// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);

// set header and footer fonts
//$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
//$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
//$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
//$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetMargins(0.8, 1.2, 2);

//$pdf->SetHeaderMargin(0);
//$pdf->SetFooterMargin(15);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, 2);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO); 

//set some language-dependent strings
//$pdf->setLanguageArray($l); 
// ---------------------------------------------------------
// set font
$pdf->SetFont('helvetica', '', 7.5);


$fecha_inicio=$_GET["fecha_ini"];
$fecha_fin=$_GET["fecha_fin"];
$idmc=($_GET["idmc"]>0)? " AND mc.idmaestroclientes=".$_GET["idmc"]:"";
$idtpf=($_GET["tpf"]>0)? " AND f.id_tipo_facturacion=".$_GET["tpf"]:"";

$orientacion="landscape";
$idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";

// ---------------INICIO DEL REPORTE-----------------
$sql = "Select f.id_tipo_facturacion,f.fecha_facturacion,f.numero_factura, tpf.tipo,f.hawb,mc.nom_cliente,
        sum(df.venta_nosujeta) nosujeta,sum(df.venta_exenta) exenta, sum(df.venta_gravada) gravada,
        f.venta_total-f.iva+f.iva_retenido valor_neto,f.iva,f.iva_retenido,f.venta_total,f.anulado
        from facturacion f inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes 
        left join detallefacturacion df on f.idfacturacion=df.idfacturacion
        inner join tipo_facturacion tpf on f.id_tipo_facturacion=tpf.id_tipo_facturacion
        where f.id_empresa=".$idempresa ." $idmc $idtpf and f.fecha_facturacion between STR_TO_DATE('$fecha_inicio','%d/%m/%Y') and STR_TO_DATE('$fecha_fin','%d/%m/%Y') 
        group by f.idfacturacion
        order by f.fecha_facturacion,length(f.numero_factura),f.numero_factura asc";
        
     
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
        
  $pdf->addpage($orientacion,'letter');      
  
  $encabezado="<h2><img src=\"/facturaciones/resources/imagenes/gvlogo.png\" align=\"left\">
      &nbsp;Reporte de Facturacion realizada - {$_SESSION["nombreEmpresa"]}<br></h2>";
  
  $cuerpo_detalle.= '<table width="900px" cellpadding="1">
                     <tr><td width="60px" style="text-align:center;"><b>FECHA DE CCF</b></td>
                     <td width="60px" style="text-align:center"><b>NUMERO DE CCF</b></td> 
                     <td width="100px" style="text-align:center"><b>TIPO DE DOCUMENTO</b></td> 
                     <td width="60px" style="text-align:left"><b>&nbsp;&nbsp;</b></td> 
                     <td width="55px" style="text-align:left"><b>&nbsp;&nbsp;</b></td> 
                     <td width="200px" style="text-align:center" ><b>CLIENTE</b></td>
                     <td width="60px" style="text-align:center" ><b>NO SUJETA</b></td>
                     <td width="50px" style="text-align:left" ><b>EXENTA</b></td>
                     <td width="50px" style="text-align:left" ><b>GRAVADA</b></td>
                     <td width="70px" style="text-align:right" ><b>VALOR NETO CCF</b></td>
                     <td width="50px" style="text-align:right"><b>IVA</b></td>
                     <td width="50px" style="text-align:right"><b>RETEN. 1%</b></td>
                     <td width="70px" style="text-align:right"><b>TOTAL DE VENTA</b></td></tr>
                     <tr><td colspan="6"></td></tr>';
 
  //Funcion Para Clasificar Tipo Servicio de Carga para Airbox.
  $total_aereo=0;
  $total_maritimo=0;
  $total_tramite_ajeno=0;
 function tipo_serv($servicio,$total,$tipo_factura){
     global  $total_aereo,$total_maritimo,$total_tramite_ajeno;
     if($_SESSION["idEmpresa"]==5 and $tipo_factura!=1){ //Comprobara si es Airbox
        if(substr($servicio,0,4)=="HBOL") {
            $total_maritimo+=$total;
                return "MARITIMO";
        }else if( (strlen($servicio)>=5 and substr($servicio,0,2)=="10")  or substr($servicio,0,4)=="HAWB"){
             $total_aereo+=$total;   
             return "AEREO";
        }else {
            $total_tramite_ajeno+=$total;
             return "TR. AJENO";
        }
         
 } else { return "";}
 
 }
  

  $subTValorNeto=0;
  $subTIva=0;
  $subTIvaRetenido=0;
  $subTVentaTotal=0;
  $subExenta=0;
  $subNoSujeta=0;
  $subGravada=0;
  $cliente="";
  while($rows_e = mysql_fetch_array($result)){
       if($idmc!=""){
      $cliente="<H3  align=\"CENTER\"><B>CLIENTE:</B> ". $rows_e["nom_cliente"]."</H3>";
      }
      
        if($rows_e["anulado"]=="Si"){
        $cuerpo_detalle.= "<tr style=\"background-color:yellow\">
                          <td  style=\"text-align:right\"> ".substr($rows_e["fecha_facturacion"],0,11) ."</td> 
                          <td  style=\"text-align:center\">".$rows_e["numero_factura"] ."</td>
                          <td  style=\"text-align:left\">".$rows_e["tipo"] ."</td>
                          <td  style=\"text-align:center\"></td>       
                          <td  style=\"text-align:center\"></td>       
                          <td  style=\"text-align:left\">".$rows_e["nom_cliente"] ."</td>
       <td  style=\"text-align:center\" colspan=\"7\">------------      <b>FACTURA ANULADA</b>    ------------</td></tr>";
        }
        else{
              $cuerpo_detalle.= "<tr> 
                                     <td  style=\"text-align:right\"> ".substr($rows_e["fecha_facturacion"],0,11) ."</td> 
                             <td  style=\"text-align:center\">".$rows_e["numero_factura"] ."</td>
                             <td  style=\"text-align:left\">".$rows_e["tipo"] ."</td>    
                             <td  style=\"text-align:left\">".$rows_e["hawb"] ."</td>
                             <td  style=\"text-align:left\">". tipo_serv($rows_e["hawb"],$rows_e["venta_total"],$rows_e["id_tipo_facturacion"]) ."</td>    
                             <td  style=\"text-align:left\">".$rows_e["nom_cliente"] ."</td>
                             <td  style=\"text-align:right\">".((number_format($rows_e["nosujeta"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["nosujeta"],2)) ."</td>
                             <td  style=\"text-align:right\">".((number_format($rows_e["exenta"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["exenta"],2)) ."</td>  
                             <td  style=\"text-align:right\">".((number_format($rows_e["gravada"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["gravada"],2)) ."</td>  
                             <td  style=\"text-align:right\">".(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").  number_format($rows_e["valor_neto"],2)."</td>
                             <td  style=\"text-align:right\">".((number_format($rows_e["iva"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["iva"],2))."</td>
                             <td  style=\"text-align:right\">".((number_format($rows_e["iva_retenido"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["iva_retenido"],2))."</td>
                             <td  style=\"text-align:right\">".(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").  number_format($rows_e["venta_total"],2) ."</td></tr>";
      

                
                //RESTA DE VENTA PARA EL TIPO DE NOTA DE CREDITO
                if($rows_e["id_tipo_facturacion"]==1){
     //SI ES UNA NOTA DE CREDITO SE RESTA DEL SUBTOTAL DE VALOR NETO Y VENTA TOTAL
                $subTValorNeto-=$rows_e["valor_neto"];
                $subTVentaTotal-=$rows_e["venta_total"]; 
                $subTIva-=$rows_e["iva"];
                $subTIvaRetenido-=$rows_e["iva_retenido"];
                $subExenta-=$rows_e["exenta"];
                $subNoSujeta-=$rows_e["nosujeta"];
                $subGravada-=$rows_e["gravada"];
                }else{
                $subTValorNeto+=$rows_e["valor_neto"];
                $subTVentaTotal+=$rows_e["venta_total"];
                $subTIva+=$rows_e["iva"];
                $subTIvaRetenido+=$rows_e["iva_retenido"];
                $subExenta+=$rows_e["exenta"];
                $subNoSujeta+=$rows_e["nosujeta"];
                $subGravada+=$rows_e["gravada"];
                }
            }
       
        }
        $cuerpo_detalle.='<tr><td colspan="9"></td></tr>';
        $cuerpo_detalle.='<tr><td style="text-align:right" colspan="6"><b>TOTALES</b></td><td style="text-align:right"><b>'. number_format($subNoSujeta,2) .'</b></td><td style="text-align:right"><b>'. number_format($subExenta,2) .'</b></td><td style="text-align:right"><b>'. number_format($subGravada,2) .'</b></td><td style="text-align:right"><b>'.number_format($subTValorNeto,2).'</b></td><td style="text-align:right"><b>'.number_format($subTIva,2).'</b></td><td style="text-align:right"><b>'.number_format($subTIvaRetenido,2).'</b></td><td style="text-align:right"><b>'.number_format($subTVentaTotal,2).'</b></td></tr>';
       IF($_SESSION["idEmpresa"]==5){
           $cuerpo_detalle.='<tr><td colspan="9"></td></tr>';
           $cuerpo_detalle.='<tr><td><b>Total Aereo:</b></td><td><b>'.number_format($total_aereo,2).'</b></td><td><b>Total Maritimo</b></td><td><b>'.number_format($total_maritimo,2).'</b></td><td colspan="2"><b>Total Tramites Ajenos</b></td><td><b>'.number_format($total_tramite_ajeno,2).'</b></td></tr><td colspan="2"></td>';
       }$cuerpo_detalle.= "</table>";
        $Reporte=$encabezado.$cliente.$cuerpo_detalle.$pie_factura;

$exp=isset($_GET["exp"])? $_GET["exp"]:"-1";//Tipo de Exportacion
/////////////////////////////////////////////////////////////////////
if($exp!="-1"){
header("Content-Type: application/vnd.ms-excel");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("content-disposition: attachment;filename=REP_FACTURADOS_$fecha_inicio-$fecha_fin.xls");
echo $Reporte;

}else{
/////////////////////////////////////////////////////////////////////
$pdf->writeHTML($Reporte, true, false, false, false, '');
//Close and output PDF document
$pdf->Output('Reporte Facturas Realizadas.pdf', 'I');
}
}

?>

