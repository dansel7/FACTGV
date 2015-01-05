<?php

error_reporting(0);
session_start();

if(!isset($_SESSION['benutzer']) || !isset($_SESSION["idEmpresa"]) ){
		$direccion = "Location: ../../index.php";
		header($direccion);
	}else{
            
    if(isset($_GET["tpf"]) && isset($_GET["idf"])){//SE VERIFICA QUE LOS PARAMETROS DE TIPO DE FACTURA Y ID FACTURA ESTEN ENVIADOS
        
        require_once('../Database_conf.php');
        $tipoFact=(hideunlock($_GET["tpf"])=="")? 0 : hideunlock($_GET["tpf"]);
       
        switch($tipoFact){ //DEPENDIENDO DEL TIPO DE FACTURA SE LLAMARA UN MODELO PARA MOSTRAR LA FACTURA
         case 1:
             require_once 'Fact_1.php';//NOTA DE CREDITO
         break;
         case 2:
             require_once 'Fact_2.php';//FACTURA CONSUMIDOR FINAL
         break;
         case 3:
             require_once 'Fact_3.php';//CREDITO FISCAL
         break;
         case 4:
             require_once 'Fact_4.php';//FACTURACION DE EXPORTACION
         break;
         case 5:
             require_once 'Fact_5.php';//NOTA DE REMISION
         break;
         case 6:
             require_once 'Fact_6.php';//CREDITO FISCAL AWB
         break;
        //ESTO SE REALIZA MANUALMENTE DEPENDIENDO DEL ID QUE TENGA EL TIPO DE FACTURA INGRESADO
        //SE GENERA UN MODELO Y SEGUN SU ID SE MANDA A LLAMAR.
        //..... SI SE AGREGA OTRO TIPO DE FACTURA AGREGARLO DEBAJO CON LA MISMA LOGICA.
     
         default:
             echo "<br><br><br><center>ACCESO DENEGADO</center>";
       }
          
    }else{
         echo "<br><br><br><center>ACCESO DENEGADO</center>";
    }
}

?>

