Ext.define('MvcClientes.model.Contabilidad.Partidas_CuentasBanco', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_cuenta', type: 'int'},
				{ name: 'numero_partida',   type: 'string'},
                                { name: 'id_banco',   type: 'int'}
           ]
});

			
			