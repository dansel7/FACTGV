Ext.define('MvcClientes.model.CuentasBancos.CuentasBancos', {
    extend: 'Ext.data.Model',
    fields: [
				{ name: 'id_cuenta', type: 'int'},
				{ name: 'numero_cuenta',   type: 'string'},
                                { name: 'banco',   type: 'string'},
                                { name: 'id_banco',   type: 'int'},
                                { name: 'empresa',   type: 'string'},
                                { name: 'id_empresa',   type: 'int'}
				
                                
           ]
});

			
			
			
	