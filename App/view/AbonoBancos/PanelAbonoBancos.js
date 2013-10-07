//TabAbonoBancos de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcClientes.view.AbonoBancos.PanelAbonoBancos', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdAbonoBancos',
	closable:   true,  
	title   :   'Abonar a Bancos',
    layout:'fit',
	itemId:'TabListadoAbonoBancos',
	initComponent: function() {
	    var me = this;
            me.items = Ext.create('MvcClientes.view.AbonoBancos.GrdAbonoBancos'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});