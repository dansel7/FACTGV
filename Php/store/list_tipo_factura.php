<?php

if(isset($_GET["opx"])){   
    
   require '../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		// Llamamos a la Tabla y sus datos 
                if($_GET["opx"]=='tp1f1') {
                    
                $sql = "select * from tipo_facturacion";
                $result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		
		//Formamos el Array de Datos, si ejecutamos este archivo PHP veremos el array formado
                while($obj = mysql_fetch_object($result)) {
			$arr[] = $obj;
		}
                  echo '{ metaData: { "root": "data"}';	
                  echo ',"success":true, "data":' . json_encode($arr) . '}';

                } else if($_GET["opx"]=='f2tp2'){ 
                    
                    $sql = "select id_tipo_facturacion from empresa_tipo_facturacion where id_empresa=".$_GET["id"];
                    $result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		

                    while($obj = mysql_fetch_object($result)) {
			$arr[] = $obj;
                    }
                    
                    echo json_encode($arr);
             
                
                } else { echo "";}
                
    	

// Cerramos la conexion a la bd
 mysql_close($connection);
}
?>