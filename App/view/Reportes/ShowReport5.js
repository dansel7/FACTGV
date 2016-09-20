Ext.define('MvcClientes.view.Reportes.ShowReport5', {
    extend: 'Ext.window.Window',
	alias:'widget.ShowReport5',
      height: 185,
    width: 360,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Estado de Cuenta y Movimientos en Facturas',
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
                height: 410,
                name: 'form',baseCls: 'x-plain',
                bodyStyle:{"color":"navy"}, 
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
                    {xtype : "textfield", name :"numfact", fieldLabel : "Num. de Factura"},
                    ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id:'ButtonReport5',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnReport5PDF',
                                    text: 'PDF',
                                    action: 'ShowReport5PDF'
                            },{
                                    itemId: 'BtnReport5EXCEL',
                                    text: 'EXCEL',
                                    action: 'ShowReport5EXCEL'
                            },{
                                    itemId: 'BtnReport5Cancelar',
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
