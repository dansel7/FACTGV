Ext.require([
    'Ext.ux.LiveSearchGridPanel'
]);
var Flag=false;

Ext.define('MvcClientes.view.Facturacion.GrdFacturacion',{
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias:'widget.gridFacturacion',
	store: 'Facturacion.Facturacion',
        id: "GRDFacturacion",
	border: false,
	listeners: { 
             render:{
                    scope: this,
                    fn: function(grid) {
                         Flag=false;
                        //OBTENER ID PERFIL
                          Ext.Ajax.request({
                                 url: 'Php/controller/Login/Perfil_Benutzer.php',
                                 success: function(response) {
                                   Salida = response.responseText;

                                    if(Salida==1){//USUARIO FACTURACION
                                        Flag=true;            
                                   }
                                 }
                            });
                    }
                },
            'selectionchange': function(view, records) {
             
                       if(Flag){
                       this.down('#delete').setDisabled(!records.length);//Se Habilita el Boton Delete     
                       }
            }
    },
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			columns : [//Definimos las Columnas del Grid y las Columnas de la Tabla
			   
                            { dataIndex : "idfacturacion", header : "Id",hidden: true},
                            { dataIndex : "numero_factura", header : "No. Factura", flex:0.55},
                            { dataIndex : "tipo_facturacion",header: "Tipo Factura", flex:1.05},
                            { dataIndex : "idmaestroClientes",header: "IdCliente", flex:1,hidden: true},
                            { dataIndex : "nom_cliente",header: "Cliente", flex:2},
                            { dataIndex : "fecha_facturacion", header : "Fecha Facturacion", flex:1,renderer:Ext.util.Format.dateRenderer('d/m/Y') },
                            { dataIndex : "venta_acta_de", header : "Venta A Cuenta De", flex:1,hidden: true},
                            { dataIndex : "iva", header : "IVA", flex:1,hidden: true},
                            { dataIndex : "iva_retenido", header : "IVA Retenido", flex:1,hidden: true},
                            { dataIndex : "venta_total", header : "Venta Total", flex:0.8},
                            { dataIndex : "fecha_quedan", header : "Fecha Quedan", flex:0.8,renderer:Ext.util.Format.dateRenderer('d/m/Y') },
                            { dataIndex : "comprobante_quedan", header : "Comprobante Quedan", flex:1,hidden: true},
                            { dataIndex : "fecha_programada_pago", header : "Fecha Programada Pago", flex:1.05,renderer:Ext.util.Format.dateRenderer('d/m/Y') },
                            { dataIndex : "cond_operacion", header : "cond operacion", flex:1,hidden: true},
                            { dataIndex : "n_comprobante_credito", header : "n comprobante credito", flex:1,hidden: true},
                            { dataIndex : "id_tipo_facturacion", header : "Tipo Factura", flex:1,hidden: true},
                            { dataIndex : "anulado", header : "Anulado", flex:1},
                            { dataIndex : "peso", header : "Peso", flex:1,hidden: true},
                            { dataIndex : "nbultos", header : "Bultos", flex:1,hidden: true},
                            { dataIndex : "embaracador", header : "Embarcador", flex:1,hidden: true},
                            { dataIndex : "wr", header : "wr", flex:1,hidden: true},
                            { dataIndex : "hawb", header : "hawb", flex:1,hidden: true},
                            { dataIndex : "mawb", header : "mawb", flex:1,hidden: true},
                            { dataIndex : "tipo_servicio_carga", header : "Tipo Servicio de Carga", flex:1,hidden: true}

				   
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
               
                me.store.load({start: 0, limit: 100});
               
               me.store.on('write', function() {
                  me.store.load();
                });
                		
	}
	
	
});
