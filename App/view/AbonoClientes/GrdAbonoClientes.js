Ext.require([
    'Ext.ux.LiveSearchGridPanel'
]);

Ext.define('MvcClientes.view.AbonoClientes.GrdAbonoClientes',{
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias:'widget.gridAbonoClientes',
	store: 'AbonoClientes.AbonoClientes',
	border: false,
        id:'gridAbonoClientes',
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			columns : [//Definimos las Columnas del Grid y las Columnas de la Tabla
                                   {header:"ID",dataIndex:"idfacturacion",width:50,hidden:true},
                                   {header:"Numero Factura", dataIndex:"numero_factura"},
                                   {header:"Clientes", dataIndex:"nom_cliente",flex:1},
                                   {header:"Fecha Facturacion",dataIndex : "fecha_facturacion",renderer:Ext.util.Format.dateRenderer('d/m/Y') },
                                   {header:"Saldo Pendiente ($)", dataIndex:"saldo_pendiente",flex:1}
			],
			dockedItems: [
					{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
						itemId: 'add',
						text: 'Liquidar',
						iconCls: 'edit',
						scope: this,
						action:'actLiquidar'
						//handler:this.OnEditar
						},"-",
                                                {
						itemId: 'rep',
						text: 'Prueba',
						iconCls: 'rep',
						scope: this,
						action:'Prueba'
						//handler:this.OnEditar
						}
					]
				},
				{
					xtype: 'pagingtoolbar',//Barra Paginadora al fondo del Grid
					dock: 'bottom',
					displayInfo: true,
					store: me.store
				}
			]
		
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
