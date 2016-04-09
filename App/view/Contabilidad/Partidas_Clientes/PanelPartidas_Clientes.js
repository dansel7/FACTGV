//TabCatServicios de la Aplicacion Hiber Tadeo Moreno Tovilla
Ext.define('MvcClientes.view.Contabilidad.Partidas_Clientes.PanelPartidas_Clientes', {
    extend: 'Ext.Panel',
	alias:'widget.panelGrdPartidas_Clientes',
	closable:   true,  
	title   :   'Partidas Contables de Clientes',
    layout:'fit',
	itemId:'TabListadoPartidas_Clientes',
	initComponent: function() {
	    var me = this;
            me.items = Ext.create('MvcClientes.view.Contabilidad.Partidas_Clientes.GrdPartidas_Clientes'); //Agregamos el Grid al PanelTab
            this.callParent();
    }
	

});