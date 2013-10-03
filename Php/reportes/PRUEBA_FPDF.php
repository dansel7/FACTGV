<?php
//NOTA DE CREDITO


//error_reporting(0);
session_start();

if(!isset($_SESSION['benutzer']) || !isset($_SESSION["idEmpresa"]) ){
		$direccion = "Location: ../../index.php";
		header($direccion);
	}else{
require_once('fpdf/fpdf.php');

class PDF extends FPDF
{
var $B;
var $I;
var $U;
var $HREF;

function PDF($orientation='P', $unit='mm', $size='A4')
{
    // Llama al constructor de la clase padre
    $this->FPDF($orientation,$unit,$size);
    // Iniciación de variables
    $this->B = 0;
    $this->I = 0;
    $this->U = 0;
    $this->HREF = '';
}

function WriteHTML($html)
{
    // Intérprete de HTML
    $html = str_replace("\n",' ',$html);
    $a = preg_split('/<(.*)>/U',$html,-1,PREG_SPLIT_DELIM_CAPTURE);
    foreach($a as $i=>$e)
    {
        if($i%2==0)
        {
            // Text
            if($this->HREF)
                $this->PutLink($this->HREF,$e);
            else
                $this->Write(5,$e);
        }
        else
        {
            // Etiqueta
            if($e[0]=='/')
                $this->CloseTag(strtoupper(substr($e,1)));
            else
            {
                // Extraer atributos
                $a2 = explode(' ',$e);
                $tag = strtoupper(array_shift($a2));
                $attr = array();
                foreach($a2 as $v)
                {
                    if(preg_match('/([^=]*)=["\']?([^"\']*)/',$v,$a3))
                        $attr[strtoupper($a3[1])] = $a3[2];
                }
                $this->OpenTag($tag,$attr);
            }
        }
    }
}

function OpenTag($tag, $attr)
{
    // Etiqueta de apertura
    if($tag=='B' || $tag=='I' || $tag=='U')
        $this->SetStyle($tag,true);
    if($tag=='A')
        $this->HREF = $attr['HREF'];
    if($tag=='BR')
        $this->Ln(5);
}

function CloseTag($tag)
{
    // Etiqueta de cierre
    if($tag=='B' || $tag=='I' || $tag=='U')
        $this->SetStyle($tag,false);
    if($tag=='A')
        $this->HREF = '';
}

function SetStyle($tag, $enable)
{
    // Modificar estilo y escoger la fuente correspondiente
    $this->$tag += ($enable ? 1 : -1);
    $style = '';
    foreach(array('B', 'I', 'U') as $s)
    {
        if($this->$s>0)
            $style .= $s;
    }
    $this->SetFont('',$style);
}

function PutLink($URL, $txt)
{
    // Escribir un hiper-enlace
    $this->SetTextColor(0,0,255);
    $this->SetStyle('U',true);
    $this->Write(5,$txt,$URL);
    $this->SetStyle('U',false);
    $this->SetTextColor(0);
}
}


require_once('../funcionesFact.php');
 require_once('../Database_conf.php');
$Total_enLetras=new EnLetras();
 
$pdf = new PDF("L", "cm", "Letter"); 

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Daniel E. Diaz');
$pdf->SetTitle('GV');
$pdf->SetSubject('Control');
$pdf->SetKeywords('FPDF, PDF, factura, control, contabilidad');

// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);

// set header and footer fonts
//$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
//$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
//$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
//$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetMargins(-0.1, 0.7, 0.635);

//$pdf->SetHeaderMargin(0);
//$pdf->SetFooterMargin(15);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, 5);


//set some language-dependent strings
//$pdf->setLanguageArray($l); 
// ---------------------------------------------------------
// set font
$pdf->SetFont('helvetica', '', 10);

// ---------------INICIO DEL REPORTE-----------------
	$sql = "SELECT 
               
                f.numero_factura,mc.nom_cliente,mc.direccion,DATE_FORMAT(f.fecha_facturacion,'%d/%m/%Y') fecha_facturacion,f.cond_operacion,f.venta_acta_de,mc.nit,mc.nrc,d.departamento,mc.giro,
               
                df.cantidad,df.concepto,df.valor_concepto,venta_nosujeta,venta_exenta,venta_gravada,
               
                f.venta_total,f.iva,f.iva_retenido
                FROM facturacion f 
                LEFT JOIN detalleFacturacion df on f.idFacturacion=df.idFacturacion 
                INNER JOIN maestroclientes mc on mc.idmaestroClientes=f.idmaestroClientes
                INNER JOIN departamento d on d.id_departamento=mc.id_departamento 
                WHERE f.idFacturacion=4";
    	$result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());	
        
  $pdf->addpage("P",'letter');      
  
  
  
        $subTotal=0;
        $tot_venta_no_sujeta=0;
        $tot_venta_exentas=0;
        while($rows_e = mysql_fetch_array($result)){ //CONSULTA PARA ENCABEZADO
       //style="border:solid 1px"
        $datos_factura='<br>
            <table width="690px" cellspacing="1">
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td style="text-align:center" width="410px" colspan="3"><b>'.strtoupper($rows_e["nom_cliente"]).'</b></td>
                <td >&nbsp;</td>    
                <td  style="text-align:left">'. $rows_e["fecha_facturacion"] .'</td>
            </tr>
            <tr>
                <td style="text-align:center;font-size:7pt" colspan="3">'.strtoupper($rows_e["direccion"]).'</td>
                <td colspan="2">&nbsp;</td>
            </tr>
             <tr>
                <td  colspan="3" width="495px">&nbsp;</td>
                <td colspan="2" style="text-align:left">'.strtoupper($rows_e["departamento"]).'</td>
            </tr>
             <tr>
                <td  width="30px">&nbsp;</td>
                <td  width="170px">'. $rows_e["nit"] .'</td>
                <td style="text-align:center" width="100px">'. $rows_e["nrc"] .'</td>
                <td style="text-align:center" width="135px">&nbsp;</td>
                <td style="text-align:left" width="200px" >'.strtoupper($rows_e["giro"]).'</td>
            </tr>
            <tr>
            <td >&nbsp;</td>
            <td colspan="3" style="text-align:center">
            '.strtoupper($rows_e["cond_operacion"]).'
            </td>
            <td style="text-align:right">
            '.strtoupper($rows_e["venta_acta_de"]).'
            </td>
            </tr>
            </table><br>
            <table>
                 <tr><td colspan="4" height="45px"></td></tr>';
        $detalle_factura.='
                    <tr>
                        <td style="text-align:left" width="55px">
                        '. $rows_e["cantidad"] .'
                        </td>  
                        <td width="400px">
                        '. strtoupper($rows_e["concepto"])  .'
                        </td>
                        <td width="60px" style="text-align:right">
                        '. $rows_e["valor_concepto"] .'
                        </td>
                        <td width="60px" style="text-align:right">
                        '. $rows_e["venta_nosujeta"] .'
                        </td>
                        <td width="60px" style="text-align:right">
                        '. $rows_e["venta_exenta"] .'
                        </td>
                        <td width="60px" style="text-align:right">
                        '. $rows_e["venta_gravada"] .'
                        </td>
                    </tr>';
        
        $subTotal+=$rows_e["venta_gravada"];
        $tot_venta_no_sujeta+=$rows_e["venta_nosujeta"];
        $tot_venta_exentas+=$rows_e["venta_exenta"];
        
        
        //ESTA ES LA PARTE QUE CONTIENE EL TOTAL EN LETRAS Y SUS DESGLOSES
        $pie_factura='<tr><td colspan="6" height="72px"></td></tr>
                      <tr><td colspan="2" width="455px"></td>
                          <td width="60px"></td>
                          <td width="60px" style="text-align:right">'. number_format($tot_venta_no_sujeta,2) .'</td>
                          <td width="60px" style="text-align:right">'. number_format($tot_venta_exentas,2) .'</td>
                          <td width="60px"></td>
                      </tr>
                      <tr><td colspan="6" style="text-align:left">
                        <table width="690px" cellspacing="3">
                         
                        <tr>
                           <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'. strtoupper($Total_enLetras->ValorEnLetras($rows_e["venta_total"],"Dolares")) .'</td>
                           <td style="text-align:right">'.$rows_e["iva"] .'</td>
                         </tr>
                         <tr>
                           <td style="text-align:right" colspan="2" >'. number_format($subTotal,2) .'</td>
                         </tr>
                         <tr>
                           <td style="text-align:right" colspan="2">'. number_format($rows_e["iva_retenido"],2) .'</td>
                         </tr>
                         <tr>
                           <td style="text-align:right" colspan="2"></td>
                         </tr>
                          <tr>
                           <td style="text-align:right" colspan="2" >'. number_format($tot_venta_no_sujeta,2) .'</td>
                         </tr>
                         <tr>
                           <td style="text-align:right" colspan="2" >'. number_format($tot_venta_exentas,2) .'</td>
                         </tr>
                         </table>
                     </td>
                     </tr>
                     <tr><td colspan="6" style="text-align:right">
                         <table>
                         <tr>    
                            <td width="688px">
                        '. $rows_e["venta_total"] .'
                            </td>
                         </tr>
                         </table>
                     </td>
                     </tr>
                     </table>';
        
        }
        $factura=$datos_factura.$detalle_factura.$pie_factura;
        function WriteHTML($html)
{
    // Intérprete de HTML
    $html = str_replace("\n",' ',$html);
    $a = preg_split('/<(.*)>/U',$html,-1,PREG_SPLIT_DELIM_CAPTURE);
    foreach($a as $i=>$e)
    {
        if($i%2==0)
        {
            // Text
            if($this->HREF)
                $this->PutLink($this->HREF,$e);
            else
                $this->Write(5,$e);
        }
        else
        {
            // Etiqueta
            if($e[0]=='/')
                $this->CloseTag(strtoupper(substr($e,1)));
            else
            {
                // Extraer atributos
                $a2 = explode(' ',$e);
                $tag = strtoupper(array_shift($a2));
                $attr = array();
                foreach($a2 as $v)
                {
                    if(preg_match('/([^=]*)=["\']?([^"\']*)/',$v,$a3))
                        $attr[strtoupper($a3[1])] = $a3[2];
                }
                $this->OpenTag($tag,$attr);
            }
        }
    }
}
$pdf->WriteHTML($factura);




/////////////////////////////////////////////////////////////////////

//Close and output PDF document
$pdf->Output('factura.pdf', 'I');
}

?>

