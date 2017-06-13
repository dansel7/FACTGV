<?php

//Libro de IVA Ventas

error_reporting(0);
session_start();

if(!isset($_SESSION['benutzer']) || !isset($_SESSION["idEmpresa"]) ){
		$direccion = "Location: ../../index.php";
		header($direccion);
	}else{
require_once('../reportes/tcpdf/config/lang/eng.php');
require_once('../reportes/tcpdf/tcpdf.php');
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
$pdf->SetMargins(0.5, 0.7, 2);

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
$pdf->SetFont('courier', '', 6);


$mes_inicio=str_pad($_GET["mes_inicio"], 2, '0', STR_PAD_LEFT);
$mes_fin=str_pad($_GET["mes_fin"], 2, '0', STR_PAD_LEFT);
$anio=$_GET["anio"];
$idtpf=($_GET["tpf"]>0)? " AND f.id_tipo_facturacion=".$_GET["tpf"]:"";

function mes($id){
    
switch($id){
            
            Case 1:
       return  'Enero'; break;
            
            Case 2:
       return  'Febrero'; break;
            
            Case 3:
      return  'Marzo'; break;
            
            Case 4:
      return  'Abril'; break;
            
            Case 5:
      return  'Mayo'; break;
            
            Case 6:
      return  'Junio'; break;
            
            Case 7:
      return  'Julio'; break;
            
            Case 8:
      return  'Agosto'; break;
            
            Case 9:
      return  'Septiembre'; break;
            
            Case 10:
      return  'Octubre'; break;
            
            Case 11:
      return  'Noviembre'; break;
            
            Case 12:
       return  'Diciembre'; break;
        }
}

$orientacion="landscape";
$idempresa=isset($_SESSION["idEmpresa"])? $_SESSION["idEmpresa"]:"-1";

//-------- CLASIFICACION DE TIPO DE COMPROBANTE ---------//


// ---------------INICIO DEL REPORTE-----------------
$sql = "Select f.id_tipo_facturacion,f.fecha_facturacion,f.numero_factura, tpf.tipo,f.hawb,mc.nom_cliente,mc.nrc,mc.nit,
        sum(df.venta_nosujeta) nosujeta,sum(df.venta_exenta) exenta, sum(df.venta_gravada) gravada,
        f.venta_total-f.iva+f.iva_retenido valor_neto,f.iva,f.iva_retenido,f.venta_total,f.anulado
        from facturacion f inner join maestroclientes mc on f.idmaestroClientes=mc.idmaestroClientes 
        left join detallefacturacion df on f.idfacturacion=df.idfacturacion
        inner join tipo_facturacion tpf on f.id_tipo_facturacion=tpf.id_tipo_facturacion
        where f.id_empresa=".$idempresa ." $idtpf and CONCAT(YEAR(f.fecha_facturacion),LPAD(MONTH(f.fecha_facturacion),2,'0')) BETWEEN $anio$mes_inicio and $anio$mes_fin 
        group by f.idfacturacion
        order by f.fecha_facturacion,length(f.numero_factura),f.numero_factura asc";    

    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
        
  $pdf->addpage($orientacion,'letter');      
  
  $encabezado='<table width="960px" style="font-weight:bold;font-family:courier">
                <tr>
                <td style="width:25%" colspan="3"></td>
                <td style="width:50%;text-align:center;" colspan="6">LIBRO DE VENTAS A CONTRIBUYENTES</td>
                <td style="width:25%" colspan="3"></td>
                </tr>
                <tr>
                <td style="width:25%" colspan="3"></td>
                <td style="width:50%;text-align:center;" colspan="6">MES DE '. strtoupper(mes($mes_inicio)) .' DE '. $anio.'</td>
                <td style="width:25%" colspan="3"></td>
                </tr>
                <tr>
                <td style="width:25%" colspan="3"></td>
                <td style="width:50%;text-align:center;" colspan="6">EXPRESADO EN DOLARES DE LOS ESTADOS UNIDOS DE NORTEAMERICA.</td>
                <td style="width:25%" colspan="3"></td>
                </tr>
                <tr>
                <td style="width:25%" colspan="3"></td>
                <td style="width:50%;text-align:center;" colspan="6"></td>
                <td style="width:25%" colspan="3"></td>
                </tr>
                <tr>
                <td style="width:25%" colspan="3"></td>
                <td style="width:50%;text-align:center;" colspan="6">'. strtoupper($_SESSION["nombreEmpresa"]). '</td>
                <td style="width:25%" colspan="3"></td>
                </tr>
                <tr>
                <td style="width:25%" colspan="3"></td>
                <td style="width:50%;text-align:center;" colspan="6">'. strtoupper($_SESSION["direccionEmp"]). '</td>
                <td style="width:25%" colspan="3"></td>
                </tr>
                <tr>
                <td style="width:25%" colspan="3"></td>
                <td style="width:50%;text-align:center;" colspan="6"></td>
                <td style="width:25%" colspan="3"></td>
                </tr>
                <tr>
                <td style="width:25%" colspan="3">N.R.C. '. strtoupper($_SESSION["nrcEmp"]). '</td>
                <td style="width:50%;text-align:center;" colspan="6">N.I.T. '. strtoupper($_SESSION["nitEmp"]). '</td>
                <td style="width:25%"  colspan="3"></td>
                </tr>
               
              </table>';
  
  $cuerpo_detalle.= '<table width="960px" border="1" cellpadding="1" style="font-family:courier">
                    <tr>
                    <td width="60px" rowspan="2" style="text-align:center;"><b>No. OPERACION</b></td>
                    <td width="60px" rowspan="2" style="text-align:center;"><b>FECHA DE EMISION</b></td>
                     <td width="80px" rowspan="2" style="text-align:center"><b>NUMERO DE<br> COMPROBANTE</b></td> 
                     <td width="240px" rowspan="2" style="text-align:center" ><b>CLIENTE</b></td>
                     <td width="150px" colspan="2" style="text-align:center" ><b>NUMERO</b></td>
                     <td width="130px" colspan="2" style="text-align:center" ><b>VENTAS PROPIAS</b></td>
                     <td width="50px" rowspan="2" style="text-align:center"><b>DEBITO FISCAL</b></td>
                     <td width="60px" rowspan="2" style="text-align:center" ><b>TOTAL VENTAS</b></td>
                     <td width="55px" rowspan="2" style="text-align:center"><b>IVA RETENIDO</b></td>
                     <td width="75px" rowspan="2" style="text-align:center"><b>TOTAL VENTAS NETAS</b></td></tr>
                     
                     <tr>
                     <td width="60px" style="text-align:center" ><b>N.R.C.</b></td>
                     <td width="90px" style="text-align:center" ><b>N.I.T.</b></td>
                     <td width="65px" style="text-align:center" ><b>EXENTA</b></td>
                     <td width="65px" style="text-align:center" ><b>GRAVADA</b></td></tr>';
 
  //Funcion Para Clasificar Tipo Servicio de Carga para Airbox.
  
  $subTValorNeto=0;
  $subTIva=0;
  $subTIvaRetenido=0;
  $subTVentaTotal=0;
  $subExenta=0;
  $subNoSujeta=0;
  $subGravada=0;
  $cliente="";
  $numOp=1;
  while($rows_e = mysql_fetch_array($result)){
       if($idmc!=""){
      $cliente="<H3  align=\"CENTER\"><B>CLIENTE:</B> ". $rows_e["nom_cliente"]."</H3>";
      }
      
        if($rows_e["anulado"]=="Si"){
        $cuerpo_detalle.= "<tr >
                          <td  style=\"text-align:center\"> ".$numOp ."</td> 
                          <td  style=\"text-align:center\"> ".substr($rows_e["fecha_facturacion"],0,11) ."</td> 
                          <td  style=\"text-align:center\">".$rows_e["numero_factura"] ."</td>
       <td  style=\"text-align:left\" colspan=\"9\"><b>ANULADO</b></td></tr>";
        }
        else{
              $cuerpo_detalle.= "<tr> 
                             <td  style=\"text-align:center\"> ".$numOp ."</td> 
                             <td  style=\"text-align:center\"> ".substr($rows_e["fecha_facturacion"],0,11) ."</td> 
                             <td  style=\"text-align:center\">".$rows_e["numero_factura"] ."</td> 
                             <td  style=\"text-align:left\">".$rows_e["nom_cliente"] ."</td>
                             <td  style=\"text-align:left\">".$rows_e["nrc"] ."</td>
                             <td  style=\"text-align:left\">".$rows_e["nit"] ."</td>
                             <td  style=\"text-align:right;mso-number-format: currency\">".((number_format($rows_e["exenta"]+$rows_e["nosujeta"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["exenta"]+$rows_e["nosujeta"],2)) ."</td>  
                             <td  style=\"text-align:right;mso-number-format: currency\">".((number_format($rows_e["gravada"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["gravada"],2)) ."</td>  
                             <td  style=\"text-align:right;mso-number-format: currency\">".((number_format($rows_e["iva"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["iva"],2))."</td>
                             <td  style=\"text-align:right;mso-number-format: currency\">".(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").  number_format($rows_e["gravada"]+$rows_e["iva"],2)."</td>
                             <td  style=\"text-align:right;mso-number-format: currency\">".((number_format($rows_e["iva_retenido"],2)==0)?'0.00':(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").number_format($rows_e["iva_retenido"],2))."</td>
                             <td  style=\"text-align:right;mso-number-format: currency\">".(($rows_e["id_tipo_facturacion"]==1) ?"<b>-</b> ":"").  number_format($rows_e["venta_total"],2) ."</td></tr>";
      

                
                //RESTA DE VENTA PARA EL TIPO DE NOTA DE CREDITO
                if($rows_e["id_tipo_facturacion"]==1){
     //SI ES UNA NOTA DE CREDITO SE RESTA DEL SUBTOTAL DE VALOR NETO Y VENTA TOTAL
                
                $subExenta-=($rows_e["exenta"]+$rows_e["nosujeta"]);
                $subGravada-=$rows_e["gravada"];
                $subTIva-=$rows_e["iva"];
                $subTVentaTotal-=($rows_e["gravada"]+$rows_e["iva"]); 
                $subTIvaRetenido-=$rows_e["iva_retenido"];
                $subTValorNeto-=$rows_e["venta_total"];
                }else{
                
                $subExenta+=($rows_e["exenta"]+$rows_e["nosujeta"]);
                $subGravada+=$rows_e["gravada"];
                $subTIva+=$rows_e["iva"];
                $subTVentaTotal+=($rows_e["gravada"]+$rows_e["iva"]);
                $subTIvaRetenido+=$rows_e["iva_retenido"];
                $subTValorNeto+=$rows_e["venta_total"];
                }
            }
       $numOp++;
        }
        $cuerpo_detalle.='<tr><td colspan="12"></td></tr>';
        $cuerpo_detalle.='<tr><td style="text-align:right" colspan="6"><b>TOTALES</b></td><td style="text-align:right;mso-number-format: currency"><b>'. number_format($subExenta,2) .'</b></td><td style="text-align:right;mso-number-format: currency"><b>'. number_format($subGravada,2) .'</b></td><td style="text-align:right;mso-number-format: currency"><b>'.number_format($subTIva,2).'</b></td><td style="text-align:right;mso-number-format: currency"><b>'.number_format($subTVentaTotal,2).'</b></td><td style="text-align:right;mso-number-format: currency"><b>'.number_format($subTIvaRetenido,2).'</b></td><td style="text-align:right;mso-number-format: currency"><b>'.number_format($subTValorNeto,2).'</b></td></tr>';
       $cuerpo_detalle.= "</table>";
        $Reporte=$encabezado.$cliente.$cuerpo_detalle.$pie_factura;

$exp=isset($_GET["exp"])? $_GET["exp"]:"-1";//Tipo de Exportacion
/////////////////////////////////////////////////////////////////////
if($exp!="-1"){
header("Content-Type: application/vnd.ms-excel");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("content-disposition: attachment;filename=LIBRO_IVA_". strtoupper(mes($mes_inicio)) . "_$anio.xls");
echo $Reporte;

}else{
/////////////////////////////////////////////////////////////////////
$pdf->writeHTML($Reporte, true, false, false, false, '');
//Close and output PDF document
$pdf->Output("Libro de IVA ". strtoupper(mes($mes_inicio)) . " $anio.pdf", 'I');
}
}

?>

