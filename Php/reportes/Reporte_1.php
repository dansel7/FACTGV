<?php
//REPORTE DE UTILIDADES EN BANCOS


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
$pdf->SetMargins(1, 1.7, 2);

//$pdf->SetHeaderMargin(0);
//$pdf->SetFooterMargin(15);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, 5);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO); 

//set some language-dependent strings
//$pdf->setLanguageArray($l); 
// ---------------------------------------------------------
// set font
$pdf->SetFont('helvetica', '', 10);
$fecha_inicio=$_GET["fecha_ini"];
$fecha_fin=$_GET["fecha_fin"];
$orientacion="vertical";
// ---------------INICIO DEL REPORTE-----------------
	$sql = "SELECT 
DATE_FORMAT(ab.fecha_remesa,'%d/%m/%Y') fecha_remesa,ab.numero_remesa, 
ac.numero_cheque,ac.monto_cheque,
concat(b.nombre_banco,' - ',c.numero_cuenta) cuenta,
f.numero_factura
FROM abono_bancos ab 
inner join abono_clientes ac on ac.id_abono_clientes=ab.id_abono_clientes 
inner join cuentas c on c.id_cuenta=ab.id_cuenta
inner join bancos b on b.id_banco=c.id_banco
inner join facturacion f on  f.idfacturacion=ac.idfacturacion
where c.id_empresa=".$_SESSION["idEmpresa"]." and ab.fecha_remesa between STR_TO_DATE('$fecha_inicio','%d/%m/%Y') and STR_TO_DATE('$fecha_fin','%d/%m/%Y')
order by fecha_remesa,numero_remesa,numero_factura,cuenta";
        //QUEDA PENDIENTE EL FILTRADO POR FECHA.
        
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
        
  $pdf->addpage($orientacion,'letter');      
  
  $encabezado="<h2><img src=\"/facturaciones/resources/imagenes/gvlogo.png\" align=\"left\">
      &nbsp;Reporte de Abonos a Bancos - {$_SESSION["nombreEmpresa"]}<br></h2>";
  
  $cuerpo_detalle.= '<table width="700px">
                     <tr><td width="80px" style="text-align:right"><b>NUMERO DE<br> REMESA</b></td>
                     <td width="100px" style="text-align:center"><b>FECHA DE REMESA</b></td> 
                     <td width="110px" style="text-align:center" ><b>NUMERO DE<br> CHEQUE</b></td>
                     <td width="80px" style="text-align:right" ><b>NUMERO DE<br> FACTURA</b></td>
                     <td width="80px" style="text-align:right"><b>MONTO DE<br> ABONO</b></td>
                     <td width="250px" style="text-align:center"><b>CUENTA BANCARIA</b></td></tr>
                     <tr><td colspan="5"></td></tr>';
 
  $temp=0;
  $tempC=0;
  $subTotal=0;
  $c=0;
  $total=0;
  while($rows_e = mysql_fetch_array($result)){
       $num_rem=$rows_e["numero_remesa"];    
       $cuenta=$rows_e["cuenta"];
       if($num_rem!=$temp || $cuenta!=$tempC){
            if($c!=0){
             $cuerpo_detalle.='<tr><td style="text-align:right" colspan="3"><b>SUB-TOTAL REMESADO</b></td><td></td><td style="text-align:right"><b>'.number_format($subTotal,2).'</b></td><td></td></tr>';
             $total+=$subTotal;
            }
             $cuerpo_detalle.='<tr><td style="text-align:center"><b>'.$num_rem.'</b><hr></td><td colspan="5">&nbsp;<hr></td></tr>';
                             $subTotal=0;
                             $c=0;
       }
       $cheque="";
           if($rows_e["numero_cheque"]=="0"){
               $cheque= "TRANSFERENCIA";
               
           } else if($rows_e["numero_cheque"]=="-1"){
               $cheque= "PAGO EN EFECTIVO";
               
           } else{
               $cheque= $rows_e["numero_cheque"];
           }
       
           $cuerpo_detalle.= "<tr><td  style=\"text-align:right\"></td>
                             <td style=\"text-align:center\"> ".$rows_e["fecha_remesa"] ."</td> 
                             <td  style=\"text-align:right\">".$cheque ."</td>
                                 <td  style=\"text-align:right\">".$rows_e["numero_factura"] ."</td>
                             <td  style=\"text-align:right\">".$rows_e["monto_cheque"]."</td>
                             <td  style=\"text-align:right\">".strtoupper($rows_e["cuenta"]) ."</td></tr>";
       
       
       $subTotal+=$rows_e["monto_cheque"];
       $temp=$rows_e["numero_remesa"];
       $tempC=$rows_e["cuenta"];
       $c++;
        }
        $total+=$subTotal;
        $cuerpo_detalle.='<tr><td style="text-align:right" colspan="3"><b>SUB-TOTAL REMESADO</b></td><td></td><td style="text-align:right"><b>'.number_format($subTotal,2).'</b></td><td></td></tr>';
        $cuerpo_detalle.='<tr><td colspan="3"></td></tr>';
        $cuerpo_detalle.='<tr><td style="text-align:right" colspan="3"><b>TOTAL REMESADO</b></td><td></td><td style="text-align:right"><b>'.number_format($total,2).'</b></td><td></td></tr>';
        $cuerpo_detalle.= "</table>";
        $Reporte=$encabezado.$cuerpo_detalle.$pie_factura;
$pdf->writeHTML($Reporte, true, false, false, false, '');




/////////////////////////////////////////////////////////////////////

//Close and output PDF document
$pdf->Output('Reporte_Bancos.pdf', 'I');
}

?>

