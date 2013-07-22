
////////////Pueden usar tambien este dise�o de Formulario///////////////////


Ext.define('MvcClientes.view.Clientes.CapturaEdicionClientes', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionClientes',
    height: 400,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion Clientes',
    modal: false,
	
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
                items: [
                        {
                            xtype: 'form',
                            height: 50,
                            layout: {
                                type: 'auto'
                            },
                            items: 
                            [ 
                                {xtype : "textfield", name : "idmaestroClientes", fieldLabel : "Id",hidden: true},
                                {xtype : "textfield", name : "nom_cliente", fieldLabel : "Nombre", width: 350},
                                {xtype : "textfield", name : "direccion", fieldLabel : "Direccion", width: 350},
                                {xtype : "textfield", name : "NIT", fieldLabel : "NIT", width: 250},
                                {xtype : "textfield", name : "NRC", fieldLabel : "NRC", width: 250},
                                {xtype: "combobox", fieldLabel: "Departamento", store: '',name:"id_departamento", width: 300},			
                                {xtype : "textfield", name : "giro", fieldLabel : "Giro", width: 350},
                                {xtype : "checkbox", name : "gran_contribuyente", fieldLabel : "Gran Contribuyente",inputValue: '1'},
                                {xtype : "checkbox", name : "activo", fieldLabel : "Activo",inputValue: '1'},
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
                }]
          }); 
		  me.callParent(arguments);
      }					
});	
									