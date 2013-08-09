//TabPrincipal de la Aplicacion 
Ext.define('MvcClientes.view.Principal.TabMain', {
    extend: 'Ext.tab.Panel',//<<----Herencia
	maxTabWidth: 230,
    border: false,
	activeTab   : 0,  
    enableTabScroll :  true, //hacemos que sean recorridas  
    
    initComponent: function() {
        this.tabBar = {
            border: false
        };
        
        this.callParent();
    },
	items: [{
            title: 'Principal',
            iconCls: 'tabs',
            html:'<body scroll="no"> <!-- Start page content --> <div id="start-div">'+
            '<div>'+
            '<h2 style="display: block; border-bottom: 1px solid teal;padding-bottom: 2px;">Bienvenidos</h2>'+
            '<div style="margin-left:25%;float:center;" ><img src="resources/imagenes/Welcome.png" /></div>'+
            '</div>   	</div> </body>'

        }]
	
});