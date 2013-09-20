    Ext.define('MvcClientes.store.Facturacion.Facturacion', {
    extend: 'Ext.data.Store',
    model: 'MvcClientes.model.Facturacion.Facturacion',//Llamamos el Modelo Antes Creado
    autoSync: true,//Sincronizacion con el Servidor
    autoSave: true,	//<--- hace las peticiones al servidor autom�ticamente
    proxy: {
type: 'ajax',
api: { //Declaramos la API y Comienzan en estas lineas las operaciones CRUD
                     read    : "Php/view/Facturacion/FacturacionRead.php",
                     create  : "Php/view/Facturacion/FacturacionCreate.php",
                     update  : "Php/view/Facturacion/FacturacionUpdate.php",
                     destroy : "Php/view/Facturacion/FacturacionDestroy.php"
            },
            /*actionMethods:{
                read:'POST'
            },*/
reader: {
    type: 'json',
                    idProperty: 'idfacturacion',
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
                                     
                   ///////---INGRESO DE DETALLE----//////
                         
                  //ACA SE OBTIENE EL ID QUE RETORNA AL CREAR UN NUEVO REGISTRO DE FACTURACION
                  //LUEGO SE PASARA ESTE VALOR PARA PODER RELACIONARLO CON EL DETALLE                        
                   var idNuevaFact=Ext.decode(request.callback.arguments[2].responseText).data[0].idfacturacion;
                   
                   //OBTENER LOS VALORES DEL GRID Y CONVERTIRLOS A JSON PARA PASARLOS
                   var grid = Ext.getCmp("gridDetalle").getStore().getRange();
                   var JsonDatos = [];
                    for (var i in grid) {
                        JsonDatos.push({
                            'concepto':         grid[i].get('concepto'),
                            'valor_concepto':   grid[i].get('valor_concepto'),
                            'venta_nosujeta':   grid[i].get('venta_nosujeta'),
                            'venta_exenta':     grid[i].get('venta_exenta'),
                            'venta_gravada':    grid[i].get('venta_gravada') 
                        });
                    }
                    
                   JsonDatos=Ext.encode(JsonDatos)
                  ///---SE ENVIAN LOS DATOS DEL DETALLE PARA SER INGRESADOS----///
                            Ext.Ajax.request({
                              url: 'Php/view/FactDetalle/FactDetalleCreate.php?idf='+idNuevaFact,
                              jsonData: JsonDatos ,
                              method: "POST",
                               success: function(response) {
                              var outHTML = response.responseText;
                                
                              },
                              failure: function(response) {
                              
                              }
                            });
                  /////------------------FIN------------------/////
                  
                  //SE CIERRA EL FORM DE FACTURACION
                            Ext.getCmp("gridDetalle").up('form').up('panel').close()
                            
                  ///////--- FIN -- INGRESO DE DETALLE----////// 
                                    
                                    
                                   
                                   Ext.Msg.alert('Mensaje','Registro Ingresado Exitosamente');

                                }
                            else 
                                if (request.action == 'destroy')
                                    {
                                            Ext.Msg.alert('Mensaje','Registro Eliminado Exitosamente');

                                }
            }
            ,
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