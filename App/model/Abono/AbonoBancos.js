Ext.define('MvcClientes.model.Abono.AbonoBancos', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_abono_bancos', type: 'int'},
                                { name: 'id_abono_clientes', type: 'int'},
                                { name: 'numero_remesa',  type: 'string'},
                                { name: 'fecha_remesa',  type: 'date', dateFormat:'d/m/Y'},
                                { name: 'numero_cheque',  type: 'string'},
                                { name: 'numero_factura',   type: 'int'},
                                { name: 'nom_cliente', type: 'string'},
                                { name: 'id_cuenta', type: 'int'},
                                { name: 'idfacturacion', type: 'int'},
                                { name: 'fecha_facturacion',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'fecha_pago',  type: 'date',dateFormat:'d/m/Y'}
                                
                                
           ]
});

			
			
			
	