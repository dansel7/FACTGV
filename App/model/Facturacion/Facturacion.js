Ext.define('MvcClientes.model.Facturacion.Facturacion', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'idfacturacion', type: 'int'},
				{ name: 'numero_factura',   type: 'int'},
                                { name: 'idmaestroClientes', type: 'int'},
                                { name: 'nom_cliente', type: 'string'},
				{ name: 'comprobante',   type: 'string'},
                                { name: 'fecha_facturacion',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'venta_acta_de',   type: 'number'},
                                { name: 'iva',   type: 'number'},
                                { name: 'iva_retenido',   type: 'number'},
                                { name: 'venta_total',   type: 'number'},
                                { name: 'fecha_quedan',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'comprobante_quedan',  type: 'string'},
				{ name: 'fecha_programada_pago',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'id_empresa', type: 'int'},
                                { name: 'id_tipo_facturacion', type: 'int'}
                                
           ]
});

			
			
			
	