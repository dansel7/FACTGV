////////////Pueden usar tambien este dise�o de Formulario///////////////////
Ext.require([
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector'
]);

Ext.define('MvcClientes.view.AbonoBancos.CapturaEdicionAbonoBancos', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionAbonoBancos',
  height: 200,
    width: 320,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Remesa - Abono a Bancos',
    modal: true,
	
   	
    initComponent: function() {
        
       //STORE

       var list_cuentas = new Ext.data.Store({
            fields: ['id_cuenta', 'cuenta'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_cuentas.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });

        
//Se obtienen los valores del registro seleccionado idfactura y numero_factura//

var num_cheque=Ext.getCmp("gridAbonoBancos").getSelectionModel().getSelection()[0].data.numero_cheque;

//----------------FIN------------------/
var me = this;
Ext.applyIf(me, {
    items: [
            {
                xtype: 'form',
                height: 166,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails1',value: 'Abono a banco el cheque #'+ num_cheque},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails2',value: '' },                   
                    {xtype : "textfield",id:"id_abono_clientes", name : "id_abono_clientes", fieldLabel : "ID",hidden: true},
                    {xtype : "datefield",format: 'd/m/Y', value: new Date(), name :"fecha_remesa", fieldLabel : " Fecha de Remesa", flex: 1,allowBlank : false},
                    {xtype : "numberfield",id: "numero_remesa" , name : "numero_remesa", fieldLabel : "No. Remesa", hideTrigger: true,flex: 1,allowDecimals: false,allowBlank : false},
                    {xtype : "combobox", id : "id_cuenta",name:"id_cuenta", fieldLabel: "Cuenta",queryMode: 'local', store: list_cuentas, displayField: 'cuenta',valueField: 'id_cuenta', width: 300,allowBlank : false}
                    
                    
                ],
            dockedItems : [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            id:'buttons',
                            ui: 'footer',
                            items: ['->', {
                                    itemId: 'BtnClienteAceptar',
                                    text: 'Guardar',
                                    action: 'actGuardar'
                            },{
                                    itemId: 'BtnClienteCancelar',
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
