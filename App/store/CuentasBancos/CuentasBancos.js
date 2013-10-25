		Ext.define('MvcClientes.store.CuentasBancos.CuentasBancos', {
		extend: 'Ext.data.Store',
                model: 'MvcClientes.model.CuentasBancos.CuentasBancos',//Llamamos el Modelo Antes Creado
		autoSync: true,//Sincronizacion con el Servidor
		autoSave: true,	//<--- hace las peticiones al servidor autom�ticamente
		proxy: {
            type: 'ajax',
            api: { //Declaramos la API y Comienzan en estas lineas las operaciones CRUD
				 read    : "Php/view/CuentasBancos/CuentasBancosRead.php",
				 create  : "Php/view/CuentasBancos/CuentasBancosCreate.php",
				 update  : "Php/view/CuentasBancos/CuentasBancosUpdate.php",
				 destroy : "Php/view/CuentasBancos/CuentasBancosDestroy.php"
		 },
			/*actionMethods:{
			    read:'POST'
			},*/
            reader: {
                type: 'json',
				idProperty: 'id_cuenta',
				successProperty	: function()
				   {
                      // Alguna Funcion o mensaje que quieras agregar cuando la operacion es exitosa
				   },
                root:'data' //Json_encode root:Datos del Servidor desde desde TCD.php
			          
            },
            
            writer:{
			   encode: true,  
               writeAllFields: true,//decide si se manda al servidor solamente los campos modificados o todo  
			   type: 'json',
			   root: 'data'		 		
		  },
           //Mensajes Extras si deseas agregarlos
			afterRequest: function (request, success)
			{
			 
					if (request.action == 'read')
     					{
							//Ext.Msg.alert('Title','Read');
					}
			 
					else 
					    if (request.action == 'update')
						{
							Ext.Msg.alert('Mensaje','Registro Actualizado Exitosamente');
                                                        
                                        }	
                                        else 
					    if (request.action == 'create')
						{
							Ext.Msg.alert('Mensaje','Registro Ingresado Exitosamente');
                                                        
					    }
                                        else 
					    if (request.action == 'destroy' )
						{
                                                    if(Ext.decode(request.callback.arguments[2].responseText).success){
                                                        Ext.Msg.alert('Mensaje','Registro Eliminado Exitosamente');
                                                    }else{
                                                        Ext.Msg.alert('Mensaje','Error al eliminar: Banco Asociado a uno o mas abonos');
                                                    }
							
                                                        
					    }
                        },
			listeners: {
					   exception: function(proxy, response, operation){
							Ext.MessageBox.show({
								title: 'ERROR',
								msg: operation.getError(),
								icon: Ext.MessageBox.ERROR,
								buttons: Ext.Msg.OK
							});
						}
				  }
				
		}
    });