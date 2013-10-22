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
$pdf->SetMargins(-0.1, 0.9, 0.635);

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

$orientacion="vertical";
// ---------------INICIO DEL REPORTE-----------------
	$sql = "SELECT 
DATE_FORMAT(ab.fecha_remesa,'%d/%m/%Y') fecha_remesa,ab.numero_remesa, 
ac.numero_cheque,ac.monto_cheque,
concat(b.nombre_banco,' - ',c.numero_cuenta) cuenta
FROM db_facturacion.abono_bancos ab 
inner join abono_clientes ac on ac.id_abono_clientes=ab.id_abono_clientes 
inner join cuentas c on c.id_cuenta=ab.id_cuenta
inner join bancos b on b.id_banco=c.id_banco
where c.id_empresa=".$_SESSION["idEmpresa"]."
order by numero_remesa";
        
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
        
  $pdf->addpage($orientacion,'letter');      
  
  
        while($rows_e = mysql_fetch_array($result)){
       $datos_factura.= "<br> ".strtoupper($rows_e["fecha_remesa"]) ." ".strtoupper($rows_e["numero_remesa"])
                   ." ".strtoupper($rows_e["numero_cheque"]) ." ".strtoupper($rows_e["monto_cheque"])
                   ." ".strtoupper($rows_e["cuenta"]) ;
        }
        
        $factura=$datos_factura.$detalle_factura.$pie_factura;
$pdf->writeHTML($factura, true, false, false, false, '');




/////////////////////////////////////////////////////////////////////

//Close and output PDF document
$pdf->Output('Reporte_Bancos.pdf', 'I');
}

?>

