Ext.define('MvcClientes.model.Abono.AbonosClientes', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_abono_bancos', type: 'int'},
				{ name: 'fecha_remesa',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'numero_remesa',  type: 'string'},
                                { name: 'monto_remesa',  type: 'number'},
                                { name: 'id_cuenta', type: 'int'},
                                { name: 'id_facturacion', type: 'int'}
				
                                
           ]
});

			
			
			
	