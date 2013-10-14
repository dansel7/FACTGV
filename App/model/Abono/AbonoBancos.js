Ext.define('MvcClientes.model.Abono.AbonoBancos', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_abono_bancos', type: 'int'},
				{ name: 'fecha_remesa',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'numero_remesa',  type: 'string'},
                                { name: 'monto_remesa',  type: 'number'},
                                { name: 'numero_factura',   type: 'int'},
                                { name: 'nom_cliente', type: 'string'},
                                { name: 'id_cuenta', type: 'int'},
                                { name: 'id_facturacion', type: 'int'},
                                { name: 'fecha_facturacion',  type: 'date',dateFormat:'d/m/Y'},
				{ name: 'saldo_pendiente', type: 'number'}
                                
           ]
});

			
			
			
	