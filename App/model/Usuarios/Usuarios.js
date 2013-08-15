Ext.define('MvcClientes.model.Usuarios.Usuarios', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'idBenutzer', type: 'int'},
				{ name: 'Nombre',   type: 'string'},
				{ name: 'Apellido', type: 'string'},
				{ name: 'benutzer', type: 'string'},
                                { name: 'kennwort', type: 'string'},
                                { name: 'perfil',   type: 'string'},
                                { name: 'id_perfil',type: 'int'},
                                
           ]
});

			
			
			
	