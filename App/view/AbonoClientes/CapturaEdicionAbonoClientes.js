////////////Pueden usar tambien este dise�o de Formulario///////////////////
Ext.define('MvcClientes.view.AbonoClientes.CapturaEdicionAbonoClientes', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionAbonoClientes',
    height: 230,
    width: 320,
    layout: {
        type: 'fit'
    },
    autoShow: true,
    closable: false,
    title: 'Abono a Clientes',
    modal: true,
	
    initComponent: function() {
        
       //STORE
       
       var tipo= new Ext.data.SimpleStore({
        fields: ['tipo'],
        data: [['Transferencia'],['Cheque']]
    });
        
//Se obtienen los valores del registro seleccionado idfactura y numero_factura//
var idfacturacion=Ext.getCmp("gridAbonoClientes").getSelectionModel().getSelection()[0].data.idfacturacion;
var num_fact=Ext.getCmp("gridAbonoClientes").getSelectionModel().getSelection()[0].data.numero_factura;
//----------------FIN------------------/
var me = this;
Ext.applyIf(me, {
    items: [
            {
                xtype: 'form',
                height: 196,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails1',value: 'Liquidacion de Factura #'+ num_fact},
                    {xtype: 'displayfield',name: 'displayfield1',id:'empDetails2',value: '' },
                    {xtype : "combobox", name:"tipo_pago", fieldLabel: "Tipo de Liquidacion",queryMode: 'local', store: tipo, displayField: 'tipo',valueField: 'tipo', width: 300,allowBlank : false,
                     listeners:{
                        // public event change - when selection1 dropdown is changed
                        change: function(field, newValue, oldValue)
                        {
                            if(newValue == "Cheque")
                            {
                               Ext.getCmp("numero_cheque").show(); 
                               Ext.getCmp("monto_cheque").show();
                               
                               Ext.getCmp("numero_remesa").hide();
                               Ext.getCmp("numero_remesa").setValue("0"); 
                               Ext.getCmp("monto_remesa").hide();
                               Ext.getCmp("monto_remesa").setValue("0");
                            }
                            else if(newValue == "Transferencia")
                            {
                               Ext.getCmp("numero_remesa").show(); 
                               Ext.getCmp("monto_remesa").show();
                               
                               Ext.getCmp("numero_cheque").hide(); 
                               Ext.getCmp("numero_cheque").setValue("0"); 
                               Ext.getCmp("monto_cheque").hide();
                               Ext.getCmp("monto_cheque").setValue("0"); 
                            }
                        }}
                    },
                    {xtype : "textfield",id:"id_abono_clientes", name : "id_abono_clientes", fieldLabel : "ID",hidden: true},
                    {xtype : "textfield",id:"idfacturacion", name : "idfacturacion", value: idfacturacion,fieldLabel : "ID",hidden: true},
                    {xtype : "datefield",format: 'd/m/Y', value: new Date(), name :"fecha_pago", fieldLabel : " Fecha de Pago", flex: 1,allowBlank : false},
                    
                    //CAMPOS MOSTRADOS SI ES CHEQUE
                    
                    {xtype : "numberfield",id: "numero_cheque" , name : "numero_cheque", fieldLabel : "No. Cheque", hideTrigger: true,flex: 1,allowDecimals: false,allowBlank : false,hidden: true},
                    {xtype : "numberfield", id : "monto_cheque", name :"monto_cheque",fieldLabel : "Monto del Cheque",hideTrigger: true,flex: 1,allowDecimals: true,decimalPrecision: 2, margin: '0 10 0 0',decimalSeparator: ".",allowBlank : false,hidden: true},
                    
                    //CAMPOS MOSTRADOS SI ES TRANSFERENCIA
                    {xtype : "numberfield",id: "numero_remesa" , name : "numero_remesa", fieldLabel : "No. Remesa", hideTrigger: true,flex: 1,allowDecimals: false,allowBlank : false,hidden: true},
                    {xtype : "numberfield", id : "monto_remesa", name :"monto_remesa",fieldLabel : "Monto de Remesa",hideTrigger: true,flex: 1,allowDecimals: true,decimalPrecision: 2, margin: '0 10 0 0',decimalSeparator: ".",allowBlank : false,hidden: true}
                    
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
