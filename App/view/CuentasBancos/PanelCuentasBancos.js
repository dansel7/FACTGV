//TabCuentasBancos de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcClientes.view.CuentasBancos.PanelCuentasBancos', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdCuentasBancos',
	closable:   true,  
	title   :   'Cuentas Bancarias',
    layout:'fit',
	itemId:'TabListadoCuentasBancos',
	initComponent: function() {
	    var me = this;
            me.items = Ext.create('MvcClientes.view.CuentasBancos.GrdCuentasBancos'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});