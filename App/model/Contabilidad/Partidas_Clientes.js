Ext.define('MvcClientes.model.Contabilidad.Partidas_Clientes', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_partidas_cliente', type: 'int'},
				{ name: 'numero_partida',   type: 'string'},
                                { name: 'idmaestroclientes',   type: 'int'},
                                { name: 'id_empresa',   type: 'int'},
           ]
});

			
			
			
	