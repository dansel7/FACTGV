Ext.define('MvcClientes.view.Reportes.ShowReport4', {
    extend: 'Ext.window.Window',
	alias:'widget.ShowReport4',
      height: 165,
    width: 360,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Detalle de Servicios Facturados',
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
                    }
                    ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id:'ButtonReport4',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnReport4PDF',
                                    text: 'PDF',
                                    action: 'ShowReport4PDF'
                            },{
                                    itemId: 'BtnReport4EXCEL',
                                    text: 'EXCEL',
                                    action: 'ShowReport4EXCEL'
                            },{
                                    itemId: 'BtnReport4Cancelar',
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
