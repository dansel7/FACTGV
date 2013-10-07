Ext.define('MvcClientes.model.Abono.AbonoClientes', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_abono_clientes', type: 'int'},
				{ name: 'fecha_pago',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'numero_cheque',  type: 'string'},
                                { name: 'monto_cheque',  type: 'number'},
                                { name: 'idfacturacion', type: 'int'},
				{ name: 'numero_factura',   type: 'int'},
                                { name: 'nom_cliente', type: 'string'},
                                { name: 'fecha_facturacion',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'saldo_pendiente', type: 'number'}				
                                
           ]
});

			
			
			
	