Ext.define('MvcClientes.model.Facturacion.Facturacion', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'idFacturacion', type: 'int'},
				{ name: 'numero_factura',   type: 'int'},
                                { name: 'idmaestroClientes', type: 'int'},
				{ name: 'comprobante',   type: 'string'},
                                { name: 'fecha_facturacion',  type: 'date', dateFormat: 'Y-m-d'},
                                { name: 'venta_acta_de',   type: 'number'},
                                { name: 'iva',   type: 'number'},
                                { name: 'iva_retenido',   type: 'number'},
                                { name: 'venta_total',   type: 'number'},
                                { name: 'fecha_quedan',  type: 'date', dateFormat: 'Y-m-d'},
                                { name: 'comprobante_quedan',  type: 'string'},
				{ name: 'fecha_programada_pago',  type: 'date', dateFormat: 'Y-m-d'},
                                { name: 'id_empresa', type: 'int'},
                                { name: 'id_tipo_facturacion', type: 'int'}
                                
           ]
});

			
			
			
	