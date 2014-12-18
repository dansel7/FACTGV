Ext.define('MvcClientes.model.Facturacion.Facturacion', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'idfacturacion', type: 'int'},
				{ name: 'numero_factura',   type: 'string'},
                                { name: 'idmaestroClientes', type: 'int'},
                                { name: 'nom_cliente', type: 'string'},
                                { name: 'cond_operacion', type: 'string'},
                                { name: 'n_comprobante_credito', type: 'int'},
                                { name: 'fecha_facturacion',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'venta_acta_de',   type: 'string'},
                                { name: 'iva',   type: 'number'},
                                { name: 'iva_retenido',   type: 'number'},
                                { name: 'venta_total',   type: 'number'},
                                { name: 'fecha_quedan',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'comprobante_quedan',  type: 'string'},
				{ name: 'fecha_programada_pago',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'id_empresa', type: 'int'},
                                { name: 'id_tipo_facturacion', type: 'int'},
                                { name: 'tipo_facturacion', type: 'string'},
                                { name: 'anulado', type: 'string'},
                                { name: 'peso', type: 'number'},
                                { name: 'nbultos', type: 'int'},
                                { name: 'embarcador', type: 'string'},
                                { name: 'wr', type: 'string'},
                                { name: 'hawb', type: 'string'},
                                { name: 'mawb', type: 'string'}
           ]
});

			
			
			
	