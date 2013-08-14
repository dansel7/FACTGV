Ext.define('MvcClientes.model.Usuarios.Usuarios', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'idmaestroUsuarios', type: 'int'},
				{ name: 'nom_cliente', type: 'string'},
				{ name: 'direccion', type: 'string'},
				{ name: 'NIT', type: 'string'},
                                { name: 'NRC', type: 'string'},
                                { name: 'id_departamento', type: 'int'},
                                { name: 'departamento', type: 'string'},
                                { name: 'giro', type: 'string'},
                                { name: 'gran_contribuyente', type: 'string'},
                                { name: 'activo', type: 'string'}
           ]
});

			
			
			
	