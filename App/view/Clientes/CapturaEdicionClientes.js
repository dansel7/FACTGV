Ext.define('MvcClientes.view.Clientes.CapturaEdicionClientes', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionClientes',
    height: 145,
    width: 450,
	autoShow: true,
    layout: {
        type: 'fit'
    },
    closable: false,
    title: 'Captura/Edicion Clientes',
    modal: true,
	
	
    initComponent: function() {
        var me = this;
			Ext.applyIf(me, {
				items: [
					{
						xtype: 'form',
						itemId:'FrmDatosClientes',
						height: 74,
						layout: {
							type: 'auto'
						},
						bodyPadding: 10,
						dockedItems: [
							{
								xtype: 'fieldset',
								height: 60,
								width: 455,
								layout: {
									columns: 4,
									type: 'table'
								},
								title: 'Datos personales',
								dock: 'top',
								items: [
								    {
										xtype: 'textfield',
										width: 1,
										name:'idcliente',
										hidden:true
									},
									{
										xtype: 'textfield',
										itemId: 'EdtCliente',
										width: 210,
										fieldLabel: 'Cliente',
										labelAlign: 'top',
										name:'Cliente'
									},
									{
										xtype: 'combobox',
										itemId: 'CboSexo',
										fieldLabel: 'Sexo',
										labelAlign: 'top',
										store: ['M','F'],
										name:'Sexo'
									},
									{
										xtype: 'numberfield',
										itemId: 'EdtEdad',
										width: 50,
										fieldLabel: 'Edad',
										labelAlign: 'top',
										name:'Edad'
									}
								]
							},
							{
								xtype: 'panel',
								height: 40,
								layout: {
									type: 'absolute'
								},
								animCollapse: false,
								collapseFirst: false,
								frameHeader: false,
								dock: 'top',
								items: [
									{
										xtype: 'button',
										height: 30,
										itemId: 'BtnClienteAceptar',
										width: 80,
										text: 'Aceptar',
										x: 260,
										y: 5,
										action:'actGuardar'
									},
									{
										xtype: 'button',
										height: 30,
										itemId: 'BtnClienteCancelar',
										width: 80,
										text: 'Cancelar',
										scope: this,
                                        handler: this.close,
										x: 345,
										y: 5
									}
								]
							}
						]
					}
				]
			});

        me.callParent(arguments);
    }
});

////////////Pueden usar tambien este diseño de Formulario///////////////////


/*Ext.define('MvcClientes.view.Clientes.CapturaEdicionClientes', {
    extend: 'Ext.window.Window',
	alias:'widget.FormAddEdicionClientes',
    height: 145,
    width: 350,
    layout: {
        type: 'fit'
    },
	autoShow: true,
    closable: false,
    title: 'Captura/Edicion Clientes',
    modal: true,
	
    initComponent: function() {
        var me = this;
			Ext.applyIf(me, {
				items: [
					{
						xtype: 'form',
						height: 74,
						layout: {
							type: 'auto'
						},
						items		: [ 
			                {xtype : "textfield", name : "idcliente", fieldLabel : "Id",hidden: true},
							{xtype : "textfield", name : "Cliente", fieldLabel : "Cliente"},
							{xtype: "combobox",	fieldLabel: "Sexo",store: '',name:"Sexo"},			
							{xtype : "numberfield", name : "Edad", fieldLabel : "Edad"},
							
						],
				dockedItems : [{
						xtype: 'toolbar',
						dock: 'bottom',
						id:'buttons',
						ui: 'footer',
						items: ['->', {
							itemId: 'BtnGuardar',
							text: 'Guardar',
							action: 'ActGuardar'
						},{
							
							text: 'Cancelar',
							scope: this,
							handler: this.close
						}]
				     }],
				}]
          }); 
		  me.callParent(arguments);
      }					
});	*/	
						