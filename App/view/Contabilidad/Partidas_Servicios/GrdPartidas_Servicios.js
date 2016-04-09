Ext.require([
    'Ext.ux.LiveSearchGridPanel'
]);

Ext.define('MvcClientes.view.Contabilidad.Partidas_Servicios.GrdPartidas_Servicios',{
	extend: 'Ext.ux.LiveSearchGridPanel',
	alias:'widget.gridPartidas_Servicios',
	store: 'Contabilidad.Partidas_Servicios',
	border: false,
	listeners: {
            'selectionchange': function(view, records) {
                this.down('#EliminarPartidaServ').setDisabled(!records.length);//Se Habilita el Boton Delete
            }
    },
	initComponent: function() {
            
             //STORE DE CATALOGO DE SERVICIOS
         var ListServ = new Ext.data.Store({
             fields: ['id_servicio','servicio'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_CatServicio.php?opx=c4t53Rv1C3',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });

        ListServ.load();
            
		var me = this;
		Ext.applyIf(me, {
                    columns : [//Definimos las Columnas del Grid y las Columnas de la Tabla
                           {header:"ID",dataIndex:"id_partidas_servicios", hidden: true,
                               editor: {
                                xtype: 'textfield',name:'id_partidas_servicios'}
                           },
                           {header: 'Servicio',  dataIndex: 'id_servicio',flex:1, 
                                editor: {
                                xtype : "combobox", id:"id_servicio",name:"id_servicio", 
                                queryMode: 'local', store: ListServ,
                                displayField: 'servicio',valueField: 'id_servicio',allowBlank : false
                                },renderer:function(id){//A PARTIR DEL ID DE SERVICIO SE MUESTRA EL NOMBRE DEL SERVICIO
                                ListServ.clearFilter(); //SE LIMPIA EL STORE   
                                var index = ListServ.find('id_servicio',id);
                                    if(index>-1){
                                        var record = ListServ.getAt(index);
                                        return record.get('servicio');
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
			            id: 'NuevaPartidaServ',
			            handler : function() {//AGREGANDO UN NUEVO DETALLE A LA FACTURACION
                                       var r = {
                                            id_servicio:'1',
                                            numero_partida: ''
                                        };
                                
                                    me.store.insert(0,r);
			            }
                                    
			        }, {
			            itemId: 'EliminarPartidaServ',
			            id: 'EliminarPartidaServ',
			            text: 'Eliminar Partida',
                                    action: 'actBorrar',
			            iconCls: 'delete',
                                    disabled: true
			        }]
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