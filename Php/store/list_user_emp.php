<?php

if(isset($_GET["opx"])){   
    
   require '../Database_conf.php';
   mysql_select_db($db_name,$connection) or die("Error de conexion a la base de datos");

		$arr = array();
		// Llamamos a la Tabla y sus datos 
                if($_GET["opx"]=='u1em1') {
                    
                $sql = "select * from empresa";
                $result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		
		//Formamos el Array de Datos, si ejecutamos este archivo PHP veremos el array formado
                while($obj = mysql_fetch_object($result)) {
			$arr[] = $obj;
		}
                  echo '{ metaData: { "root": "data"}';	
                  echo ',"success":true, "data":' . json_encode($arr) . '}';

                } else if($_GET["opx"]=='em2u2'){ 
                    
                    $sql = "select id_empresa from empresa";
                    $result = mysql_query($sql,$connection) or die('La consulta fall&oacute;: '.mysql_error());		

//                    while($obj = mysql_fetch_object($result)) {
//			$arr[] = $obj;
//                    }
                    
                   while($obj = mysql_fetch_array($result)) {
                           $arr[] = $obj[0];
                   }
                   
                    //echo json_encode($arr);
                    
                   echo implode(",", $arr); 
             
                
                } else { echo "";}
                
    	

// Cerramos la conexion a la bd
 mysql_close($connection);
}
?>
   