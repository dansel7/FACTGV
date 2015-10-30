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
                                   {header:"Tipo de Factura", dataIndex:"tipo_facturacion",flex:1},
                                   {header:"Clientes", dataIndex:"nom_cliente",flex:1},
                                   {header:"Fecha Facturacion",id:"fecha_facturacion",dataIndex : "fecha_facturacion",flex:1,renderer:Ext.util.Format.dateRenderer('d/m/Y') },
                                   {header:"Fecha Programada Pago", dataIndex:"fecha_programada_pago",flex:1},//EL COLOR LO MANEJA LA CONSULTA EN ABONOCLIENTESREAD
                                   {header:"Saldo Pendiente ($)", dataIndex:"saldo_pendiente",flex:1},
                                   {header:"Dias de Mora", dataIndex:"DiasMora",flex:1}
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
						}		
                                            ]
				},
                                {
					xtype: 'toolbar',//Barra Paginadora al fondo del Grid
					dock: 'top',
                                        items: ["&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style=\"color:red\">* Fecha Pago Retrasado </b>",
                                                "|&nbsp;&nbsp;<b style=\"color:blue\">* Fecha Dia de Pago </b>",
                                                "|&nbsp;&nbsp;<tt style=\"color:#CC4F14\">* Fecha Sugerida Pago Retrasado </tt>",
                                                "|&nbsp;&nbsp;<tt style=\"color:#4D14CC\">* Fecha Sugerida Dia de Pago </tt>"		
                                            ],
					displayInfo: true,
					store: me.store
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
