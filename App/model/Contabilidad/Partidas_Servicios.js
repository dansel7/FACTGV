Ext.define('MvcClientes.model.Contabilidad.Partidas_Servicios', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_partidas_servicios', type: 'int'},
				{ name: 'numero_partida',   type: 'string'},
                                { name: 'id_servicio',   type: 'int'},
                                { name: 'id_empresa',   type: 'int'},
           ]
});

			
			