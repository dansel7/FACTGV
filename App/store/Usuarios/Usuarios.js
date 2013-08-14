		Ext.define('MvcClientes.store.Usuarios.Usuarios', {
		extend: 'Ext.data.Store',
                model: 'MvcClientes.model.Usuarios.Usuarios',//Llamamos el Modelo Antes Creado
		autoSync: true,//Sincronizacion con el Servidor
		autoSave: true,	//<--- hace las peticiones al servidor autom�ticamente
		proxy: {
            type: 'ajax',
            api: { //Declaramos la API y Comienzan en estas lineas las operaciones CRUD
				 read    : "Php/view/Usuarios/UsuariosRead.php",
				 create  : "Php/view/Usuarios/UsuariosCreate.php",
				 update  : "Php/view/Usuarios/UsuariosUpdate.php",
				 destroy : "Php/view/Usuarios/UsuariosDestroy.php"
			},
			/*actionMethods:{
			    read:'POST'
			},*/
            reader: {
                type: 'json',
				idProperty: 'idmaestroUsuarios',
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
					    if (request.action == 'destroy')
						{
							Ext.Msg.alert('Mensaje','Registro Eliminado Exitosamente');
                                                        
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