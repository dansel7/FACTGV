Ext.define('MvcClientes.view.Reportes.ShowReport2', {
    extend: 'Ext.window.Window',
	alias:'widget.ShowReport2',
      height: 190,
    width: 360,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Facturas Realizadas',
    modal: true,
	
    initComponent: function() {
        
//STORE DE LOS CLIENTES
         var ListMaestroClientes = new Ext.data.Store({
            fields: ['idmaestroClientes', 'nom_cliente','gran_contribuyente'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_Mclientes.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
        //STORE DE LOS TIPOS DE FACTURACION
         var ListTpFact = new Ext.data.Store({
            fields: ['id_tipo_facturacion', 'tipo'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_tipo_factura.php?opx=tp3f3ct',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
var me = this;
Ext.applyIf(me, {
   items: [
            {
                xtype: 'form',
                height: 400,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype : "datefield",format: 'd/m/Y', value: new Date(), name :"fecha_inicio", fieldLabel : " Fecha de Inicio", allowBlank : false},
                    {xtype : "datefield",format: 'd/m/Y', value: new Date(), name :"fecha_fin", fieldLabel : " Fecha de Fin", allowBlank : false},
                    {xtype : "combobox", queryMode: 'local', fieldLabel: "Seleccione un Cliente", value:"Todos Los Clientes",
                    store: ListMaestroClientes,displayField: 'nom_cliente',valueField: 'idmaestroClientes',
                    name:"idmaestroClientes", id:"idmaestroClientes", flex: 1, margin: '0 10 0 0',width:340 ,allowBlank : false
                    },
                     {xtype : "combobox", id:"id_tipo_facturacion", queryMode: 'local',fieldLabel: "Tipo Factura", 
                      store: ListTpFact,displayField: 'tipo',valueField: 'id_tipo_facturacion',
                      name:"id_tipo_facturacion", flex: 1, margin: '0 10 0 0',flex:1,allowBlank : false,value:"Todas las Facturas"                               
                     },  
                    ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id:'ButtonReport2',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnReport2PDF',
                                    text: 'PDF',
                                    action: 'ShowReport2PDF'
                            },{
                                    itemId: 'BtnReport2EXCEL',
                                    text: 'EXCEL',
                                    action: 'ShowReport2EXCEL'
                            },{
                                    itemId: 'BtnReport2Cancelar',
                                    text: 'Cancelar',
                                    scope: this,
                                    handler: this.close
                            }]
                 }]
              }
          ]
          }); 
          
     	  me.callParent(arguments);
          
                 
      }
     
     
});	
