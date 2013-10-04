Ext.define('MvcClientes.model.Abono.AbonosBancos', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_abono_clientes', type: 'int'},
				{ name: 'fecha_pago',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'numero_cheque',  type: 'string'},
                                { name: 'monto_cheque',  type: 'number'},
                                { name: 'id_facturacion', type: 'int'}
				
                                
           ]
});

			
			
			
	