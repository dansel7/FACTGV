//TabPrincipal de la Aplicacion 
Ext.define('MvcClientes.view.Principal.TabMain', {
    extend: 'Ext.tab.Panel',//<<----Herencia
	maxTabWidth: 230,
    border: false,
	activeTab   : 0,  
    enableTabScroll :  true, //hacemos que sean recorridas  
    
    initComponent: function() {
        
           ///----OBTIENE PERFIL DE USUARIO PARA MOSTRAR MENUS----///
        Ext.Ajax.request({
          url: 'Php/controller/Login/Perfil_Benutzer.php',
          success: function(response) {
            outHTML = response.responseText;
            
            if(outHTML==1){
                
            Ext.getCmp("btnListFact").show();  
            Ext.getCmp("btnNuevaFact").show(); 
            Ext.getCmp("titleAtajos").show(); 
            }
            if(outHTML==4){
             Ext.getCmp("btnListFact").show();  
            Ext.getCmp("btnNuevaFact").show(); 
            Ext.getCmp("titleAtajos").show();     
            }
          }
        });
            //------------------FIN------------------//
            
        this.tabBar = {
            border: false
        };
        
        this.callParent();
	
    },
	items: [{
            title: 'Principal',
            iconCls: 'tabs',
            
            items:[{
            xtype:'label',
            html:'<body scroll="no"> <!-- Start page content --> <div id="start-div">'+
            '<div>'+
            '<h2 style="display: block; border-bottom: 1px solid teal;padding-bottom: 2px;">Bienvenidos</h2>'+
            '</div>'
                
                },{
            xtype:'label',
            id:'titleAtajos',
            hidden:true,
            html:'<br><b>Atajos</b><br>'
                
                },{
            xtype: 'button',
            text: 'Facturacion',
            id:'btnListFact',
            hidden:true,
            cls: 'my-btn', // Add this so you can style the button
            width:100,
            height:50,
            iconCls:'tabs',
            tooltip:"<b>Facturacion</b>: Visualizacion de Facturas<br> ", 
           handler: function () {
             	 var tab=TabPanelMain.getComponent('TabListadoFacturacion');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.Facturacion.PanelFacturacion', {});
				TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				TabPanelMain.doLayout(); //Redibujado del Panel 
				TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
                   } 
			       TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado                
          }
        },
        {xtype:'label',text:'    '},
        {xtype: 'button',
            text: 'Nueva Factura',
            id:'btnNuevaFact',
            hidden:true,
            cls: 'my-btn', // Add this so you can style the button
            width:100,
            height:50,
            iconCls:'icon-facturacion',
           handler: function () {
            var tab=TabPanelMain.getComponent('EdicionFacturacion');
             if(tab){
                 tab.close();
             }
            records="null";
            var FormAddEditarFacturacion= Ext.widget('FormAddEdicionFacturacion',{closable: true});
            TabPanelMain.add(FormAddEditarFacturacion);
            TabPanelMain.setActiveTab(FormAddEditarFacturacion);
            },
            tooltip:"<b>Nueva Factura</b>: Ingrese una nueva entrada de facturacion<br> ",
                             
        },{
            xtype:'label',
            html:'<div id="start-div">'+
            '<div style="margin-left:25%;float:center;" ><img src="resources/imagenes/Welcome.png" /></div>'+
            '</div>   	</div> </body>'
                
                }]
    } ]

});




