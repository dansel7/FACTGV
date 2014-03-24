Ext.require([
    'Ext.ux.LiveSearchGridPanel'
]);

Ext.define('MvcClientes.view.Facturacion.GrdFacturacion',{
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias:'widget.gridFacturacion',
	store: 'Facturacion.Facturacion',
        id: "GRDFacturacion",
	border: false,
	listeners: {
            'selectionchange': function(view, records) {
                this.down('#delete').setDisabled(!records.length);//Se Habilita el Boton Delete
                //    Ext.Msg.alert('Mensaje','selecionado');
            }
    },
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			columns : [//Definimos las Columnas del Grid y las Columnas de la Tabla
			   
                            { dataIndex : "idfacturacion", header : "Id",hidden: true},
                            { dataIndex : "numero_factura", header : "No. Factura", flex:1},
                            { dataIndex : "idmaestroClientes",header: "IdCliente", flex:1,hidden: true},
                            { dataIndex : "nom_cliente",header: "Cliente", flex:2},
                            { dataIndex : "fecha_facturacion", header : "Fecha Facturacion", flex:1,renderer:Ext.util.Format.dateRenderer('d/m/Y') },
                            { dataIndex : "venta_acta_de", header : "Venta A Cuenta De", flex:1,hidden: true},
                            { dataIndex : "iva", header : "IVA", flex:1,hidden: true},
                            { dataIndex : "iva_retenido", header : "IVA Retenido", flex:1,hidden: true},
                            { dataIndex : "venta_total", header : "Venta Total", flex:1},
                            { dataIndex : "fecha_quedan", header : "Fecha Quedan", flex:1,renderer:Ext.util.Format.dateRenderer('d/m/Y') },
                            { dataIndex : "comprobante_quedan", header : "Comprobante Quedan", flex:1,hidden: true},
                            { dataIndex : "fecha_programada_pago", header : "Fecha Programada Pago", flex:1,renderer:Ext.util.Format.dateRenderer('d/m/Y') },
                            { dataIndex : "cond_operacion", header : "cond operacion", flex:1,hidden: true},
                            { dataIndex : "n_comprobante_credito", header : "n comprobante credito", flex:1,hidden: true},
                            { dataIndex : "id_tipo_facturacion", header : "Tipo Factura", flex:1,hidden: true},
                            { dataIndex : "anulado", header : "Anulado", flex:1},
				   
			],
			dockedItems: [
					{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
						itemId: 'Add',
						text: 'Nueva Factura',
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
					],
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
                		
	}
	
	
});
