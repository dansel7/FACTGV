Ext.define('MvcClientes.view.Facturacion.GrdFacturacion',{
	extend: 'Ext.grid.Panel',
	alias:'widget.gridFacturacion',
	store: 'Facturacion.Facturacion',
	border: false,
	listeners: {
            'selectionchange': function(view, records) {
                this.down('#delete').setDisabled(!records.length);//Se Habilita el Boton Delete
            }
    },
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			columns : [//Definimos las Columnas del Grid y las Columnas de la Tabla
			   
                            { dataIndex : "idFacturacion", header : "Id",hidden: true},
                            { dataIndex : "numero_factura", header : "No. Factura", flex:1},
                            { header: "Cliente",dataIndex:"idmaestroClientes", flex:1},
                            { dataIndex : "comprobante", header : "No. Comprobante", flex:1,hidden: true},
                            { dataIndex : "fecha_facturacion", header : "Fecha Facturacion", flex:1},
                            { dataIndex : "venta_acta_de", header : "Venta A Cuenta De", flex:1,hidden: true},
                            { dataIndex : "iva", header : "IVA", flex:1,hidden: true},
                            { dataIndex : "iva_retenido", header : "IVA Retenido", flex:1,hidden: true},
                            { dataIndex : "venta_total", header : "Venta Total", flex:1},
                            { dataIndex : "fecha_quedan", header : "Fecha Quedan", flex:1,hidden: true},
                            { dataIndex : "comprobante_quedan", header : "Comprobante Quedan", flex:1,hidden: true},
                            { dataIndex : "fecha_programada_pago", header : "Fecha Programada Pago", flex:1},
                            
				   
			],
			dockedItems: [
					{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
						itemId: 'Add',
						text: 'Agregar',
						iconCls: 'add',
						action:'actAgregar'//Accion manejado por el Controlador
						},'-',{
						itemId: 'edit',
						text: 'Editar',
						iconCls: 'edit',
						scope: this,
						action:'actEditar'
						//handler:this.OnEditar
						},'-',{
						itemId: 'delete',
						text: 'Borrar',
						iconCls: 'delete',
						disabled: true,
						action:'actBorrar' //Accion manejado por el Controlador
						}								
					]
				},
				{
					xtype: 'pagingtoolbar',//Barra Paginadora al fondo del Grid
					dock: 'bottom',
					displayInfo: true,
					store:me.store
				}
			],
		
		});
        
		me.callParent(arguments);
               
               me.store.on('write', function() {
                  me.store.load();
                });
		me.store.load({//Cargamos el Store, al crear la ventana
			params:{
				start: 0,
				limit: 10 //Muestra hasta 100 Registros Maximo
			}
		});
					
	}
	
	
});
























/*{
                    xtype: 'actioncolumn',
					width: 60,
					align: 'center',
					margin:'0 0 3 3',
					itemId:'ActColumGrdListaFacturacion',
                    items: [
                        {
						    icon   : 'resources/imagenes/add.png',
                            tooltip: 'Agregar',
							width:10
                        },
                        {
                            icon   : 'resources/imagenes/delete.png',
                            tooltip: 'Borrar'
                        }
                    ]
           }*/
