//TabFacturacion de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcFacturacion.view.Facturacion.PanelFacturacion', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdFacturacion',
	closable:   true,  
	title   :   'Facturacion',
    layout:'fit',
	itemId:'TabListadoFacturacion',
	initComponent: function() {
	    var me = this;
            me.items = Ext.create('MvcFacturacion.view.Facturacion.GrdFacturacion'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});