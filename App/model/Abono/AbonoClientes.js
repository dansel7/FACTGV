Ext.define('MvcClientes.model.Abono.AbonoClientes', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_abono_clientes', type: 'int'},
				{ name: 'fecha_pago',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'numero_cheque',  type: 'string'},
                                { name: 'monto_cheque',  type: 'number'},
                                { name: 'numero_remesa',  type: 'string'},
                                { name: 'monto_remesa',  type: 'number'},
                                { name: 'monto_efectivo',  type: 'number'},
                                { name: 'idfacturacion', type: 'int'},
                                { name: 'id_cuenta', type: 'int'},
				{ name: 'numero_factura', type: 'int'},
                                { name: 'nom_cliente', type: 'string'},
                                { name: 'fecha_facturacion',  type: 'date',dateFormat:'d/m/Y'},
                                { name: 'fecha_programada_pago',  type: 'string'},
                                { name: 'saldo_pendiente', type: 'number'},
                                { name: 'tipo_pago', type: 'string'},
                                { name: 'tipo_facturacion', type: 'string'},
                                { name: 'DiasMora', type: 'number'}
           ]
});
