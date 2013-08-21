////////////Pueden usar tambien este dise�o de Formulario///////////////////
Ext.require([
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector'
]);

Ext.define('MvcClientes.view.Usuarios.CapturaEdicionUsuarios', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionUsuarios',
    height: 400,
    width: 400,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion Usuarios',
    modal: false,
	
    initComponent: function() {
        
        //STORE DE LOS DEPARTAMENTOS
         var list_perfil = new Ext.data.Store({
            fields: ['id_perfil', 'perfil'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/list_perfil.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
  
      var ds = Ext.create('Ext.data.ArrayStore', {
        data: [[123,'One Hundred Twenty Three'],
            ['1', 'One'], ['2', 'Two'], ['3', 'Three'], ['4', 'Four'], ['5', 'Five'],
            ['6', 'Six'], ['7', 'Seven'], ['8', 'Eight'], ['9', 'Nine']],
        fields: ['value','text'],
        sortInfo: {
            field: 'value',
            direction: 'ASC'
        }
    });


var me = this;
Ext.applyIf(me, {
    items: [
            {
                xtype: 'form',
                height: 50,
                name: 'form',
                layout: {
                    type: 'auto'
                },
                items: 
                [   {xtype: 'displayfield',name: 'displayfield1',id:'empDetails',value: ''},
                    {xtype : "textfield", name : "idbenutzer", fieldLabel : "Id",hidden: true},
                    {xtype : "textfield", name : "Nombre", fieldLabel : "Nombre", width: 350},
                    {xtype : "textfield", name : "Apellido", fieldLabel : "Apellido", width: 350},
                    {xtype : "textfield", name : "benutzer", fieldLabel : "Usuario", width: 250},
                    {xtype : "textfield", name : "kennwort", fieldLabel : "Contrase&ntilde;a", width: 250,inputType: 'password'},
                    {xtype : "combobox", fieldLabel: "Perfil",queryMode: 'local', store: list_perfil, displayField: 'perfil',valueField: 'id_perfil',name:"id_perfil", width: 300},
                    {xtype : "textfield", name : "perfil", fieldLabel : "perfil", width: 350,hidden: true},                  
                    {
				xtype: 'itemselector',
	                        name: 'itemselector',
	                        id: 'itemselector-field',
	                        width: 350,
                                fieldLabel: 'ItemSelector',
	                        imagePath: '../ux/images/',
	                        store: ds,
	                        displayField: 'text',
	                        valueField: 'value',
	                        value: ['3', '4', '6'],
	                        allowBlank: false,
	                        msgTarget: 'side'
			}
                    //{xtype: 'itemselector', name: 'empresas',anchor: '10%',
                   // fieldLabel: 'Seleccion',store: ds,displayField: 'text',valueField: 'value',
                    //value: ['3', '4', '6'], allowBlank: false, msgTarget: 'side'}
                    //
                    //La idea de esto es que los checkbox se van a activar enviado por ajax el valor del id de la empresa 
                    //y lo iran guardando pero para eso se necesita enviar el id de usuario tambien
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
