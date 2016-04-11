Ext.require([
    'Ext.ux.LiveSearchGridPanel'
]);

Ext.define('MvcClientes.view.Contabilidad.Partidas_Clientes.GrdPartidas_Clientes',{
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias:'widget.gridPartidas_Clientes',
	store: 'Contabilidad.Partidas_Clientes',
	border: false,
	listeners: {
            'selectionchange': function(view, records) {
                this.down('#EliminarPartidaClie').setDisabled(!records.length);//Se Habilita el Boton Delete
            }
    },
	initComponent: function() {
            
             //STORE DE CATALOGO DE SERVICIOS
         var ListClientes = new Ext.data.Store({
             fields: ['idmaestroClientes','nom_cliente'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_Mclientes.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });

        ListClientes.load();
            
		var me = this;
		Ext.applyIf(me, {
                    columns : [//Definimos las Columnas del Grid y las Columnas de la Tabla
                           {header:"ID",dataIndex:"id_partidas_cliente", hidden: true,
                               editor: {
                                xtype: 'textfield',name:'id_partidas_cliente'}
                           },
                           {header: 'Cliente',  dataIndex: 'idmaestroclientes',flex:1, 
                                editor: {
                                xtype : "combobox", id:"idmaestroclientes",name:"idmaestroclientes", 
                                queryMode: 'local', store: ListClientes,
                                displayField: 'nom_cliente',valueField: 'idmaestroClientes',allowBlank : false
                                },renderer:function(id){//A PARTIR DEL ID DE SERVICIO SE MUESTRA EL NOMBRE DEL SERVICIO
                                ListClientes.clearFilter(); //SE LIMPIA EL STORE   
                                var index = ListClientes.find('idmaestroClientes',id);
                                    if(index>-1){
                                        var record = ListClientes.getAt(index);
                                        return record.get('nom_cliente');
                                    }
                                return value;   
                            }}, 
                            {header: 'Numero de Partida',  dataIndex: 'numero_partida',flex:1, 
                                editor: {
                                xtype: 'textfield',name:'numero_partida',
                                allowBlank: false
                                }
                            }
			],dockedItems: [
					{
					xtype: 'toolbar',
					dock: 'top',
					items: [{
			            text: 'Nueva Partida',
			            iconCls: 'add',
                                    action: 'actGuardar',
			            id: 'NuevaPartidaClie',
			            handler : function() {
                                       var r = {
                                            idmaestroclientes:'1',
                                            numero_partida: ''
                                        };
                                
                                    me.store.insert(0,r);
			            }
                                    
			        }, {
			            itemId: 'EliminarPartidaClie',
			            id: 'EliminarPartidaClie',
			            text: 'Eliminar Partida',
                                    action: 'actBorrar',
			            iconCls: 'delete',
                                    disabled: true
			        }]
                        },
				{
					xtype: 'pagingtoolbar',//Barra Paginadora al fondo del Grid
					dock: 'bottom',
					displayInfo: true,
                                        store:me.store
				}],
                                plugins: [
                                    Ext.create('Ext.grid.plugin.RowEditing', {
                                        id:'rowedit',
                                        clickToEdit : 1,
                                        listeners: {
                                    'afteredit': function(e) {//CUANDO SE HACE UPDATE HACE LO SIGUIENTE
                                     e.grid.getView().refresh();
                                    }}
                                    }),
                                    
                                ]
		
		});
        
		me.callParent(arguments);
               
               
		me.store.load({//Cargamos el Store, al crear la ventana
			params:{
				start: 0,
				limit: 10 //Muestra hasta 100 Registros Maximo
			}
		});
					
	}
	
	
});