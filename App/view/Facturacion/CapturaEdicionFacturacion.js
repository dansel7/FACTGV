
////////////Pueden usar tambien este dise�o de Formulario///////////////////


Ext.define('MvcFacturacion.view.Facturacion.CapturaEdicionFacturacion', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionFacturacion',
    height: 400,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion Facturacion',
    modal: false,
	
    initComponent: function() {
        //STORE DE LOS DEPARTAMENTOS
         var list_deptos = new Ext.data.Store({
            fields: ['id_departamento', 'departamento'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_deptos.php',
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
                        height: 50,
                        layout: {
                            type: 'auto'
                        },
                        items: 
                        [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                            {xtype : "textfield", name : "idFacturacion", fieldLabel : "Id",hidden: true},
                            {xtype : "textfield", name : "nom_cliente", fieldLabel : "Nombre", width: 350},
                            {xtype : "textfield", name : "direccion", fieldLabel : "Direccion", width: 350},
                            {xtype : "textfield", name : "NIT", fieldLabel : "NIT", width: 250},
                            {xtype : "textfield", name : "NRC", fieldLabel : "NRC", width: 250},
                            {xtype : "combobox", fieldLabel: "Departamento",queryMode: 'local', store: list_deptos,displayField: 'departamento',valueField: 'id_departamento',name:"id_departamento", width: 300},
                            {xtype : "textfield", name : "departamento", fieldLabel : "departamento", width: 350,hidden: true},
                            {xtype : "textfield", name : "giro", fieldLabel : "Giro", width: 350},
                            {xtype : "checkbox", name : "gran_contribuyente", fieldLabel : "Gran Contribuyente",  inputValue: 'Si',uncheckedValue :'No'},
                            {xtype : "checkbox", name : "activo", fieldLabel : "Activo",  inputValue: 'Si',uncheckedValue :'No'}
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
									