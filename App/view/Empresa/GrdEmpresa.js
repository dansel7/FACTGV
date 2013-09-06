Ext.require([
    'Ext.ux.LiveSearchGridPanel'
]);

Ext.define('MvcClientes.view.Empresa.GrdEmpresa',{
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias:'widget.gridEmpresa',
	store: 'Empresa.Empresa',
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
				   {header:"ID",dataIndex:"id_empresa",width:50},
                                   {header:"Nombre de la Empresa", dataIndex:"nombre",flex:1} 
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
					itemId:'ActColumGrdListaEmpresa',
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
