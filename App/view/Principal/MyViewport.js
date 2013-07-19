Ext.define('MvcClientes.view.Principal.MyViewport',{
	extend: 'Ext.container.Viewport',
	layout: 'border',
    width: 468,
    height: 549,
    initComponent: function() {
	var me=this;
        me.items = [
            {
                id:'PnlNorte',
		xtype: 'panel',
                title: 'Sistema de Facturacion - Grupo Villatoro',
                region: 'north',
                margins: '2,1,0,0',
                style: 'background:#15428B;font-size: 25px; text-align: left',
                activeItem: 0,
                bodyStyle: 'background:#15428B',
                shadow: 'frame',
                shadowOffset: 10
            },
            {
                id:'PnlEste',
     		xtype: 'panel',
                title: 'Menu Principal',
				split: true,
                region: 'west',
                width: 192,
                split: true,
                collapsible: true,
                margins: '3,3,0,0',
                layout: 'accordion',
			activeItem: 1,
                items: [
                    {   xtype: 'treepanel',
                        title: 'Mantenimientos',
                        height: 212,
			iconCls:'catalogos',
                        forceLayout: true,
                        collapsed: true,
                        collapsible: true,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        listeners:{//Listeners apuntando a cada node
                            itemclick:function(view, record, item, index, e)
                                        {
                 //DEPENDIENDO QUE OPCION QUERES SE DEBE DE DEFINIR EL INDICE DE LA OPCION
                                        
                                        if (index==1)
                                           {
                                              addTabListadoClientes();
                                           }

                                        }
                                 },
                        root: {
                            text: '',
                            isTarget: false,
                            expanded: true,
                            checked: false,
                            allowDrag: false,
                            allowDrop: false,
                            editable: false,
                            qtip: 1,
                            children: [
                                {
                                    text: 'Clientes',
                                    children: [
                                        {

                                        text: 'Listado',
                                        leaf: true

                                        }
                                    ]
                                },
                                {
                                    text: 'Usuarios',
                                    children: [
                                        {
                                        text: 'Tree Node',
                                        leaf: true
                                        }
                                    ]
                                },
                                {
                                    text: 'Empresas',
                                    children: [
                                        {
                                        id:'Listado',
                                        text: 'Listado',
                                        leaf: true
                                        }
                                    ]
                                }
                            ]	
                        },
                        loader: {

                        }
                    },
                    {
                        xtype: 'treepanel',
                        title: 'Movimientos',
                        height: 212,
						iconCls:'movimientos',
                        forceLayout: true,
                        collapsed: true,
                        collapsible: true,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        root: {
                            text: '',
                            isTarget: false,
                            expanded: true,
                            checked: false,
                            allowDrag: false,
                            allowDrop: false,
                            editable: false,
                            qtip: 1,
                            children: [
                                {
                                    text: 'Regiones',
                                    children: [
                                        {
                                            text: 'Estados',
                                            leaf: true
                                        },
                                        {
                                            text: 'Municipios',
                                            leaf: true
                                        }
                                    ]
                                },
                                {
                                    text: 'Usuarios',
                                    children: [
                                        {
                                            text: 'Tree Node',
                                            leaf: true
                                        }
                                    ]
                                },
                                {
                                    text: 'Solicitantes',
                                    children: [
                                        {
                                            text: 'Tree Node',
                                            leaf: true
                                        }
                                    ]
                                }
                            ]
                        },
                        loader: {

                        }
                    },
                    {
                        xtype: 'treepanel',
                        title: 'Reportes',
						iconCls:'reportes',
                        height: 212,
                        forceLayout: true,
                        collapsed: true,
                        collapsible: true,
                        rootVisible: false,
                        border: false,
                        autoWidth: true,
                        root: {
                            text: '',
                            isTarget: false,
                            expanded: true,
                            checked: false,
                            allowDrag: false,
                            allowDrop: false,
                            editable: false,
                            qtip: 1,
                            children: [
                                {
                                    text: 'Regiones',
                                    children: [
                                        {
                                            text: 'Estados',
                                            leaf: true
                                        },
                                        {
                                            text: 'Municipios',
                                            leaf: true
                                        }
                                    ]
                                },
                                {
                                    text: 'Usuarios',
                                    children: [
                                        {
                                            text: 'Tree Node',
                                            leaf: true
                                        }
                                    ]
                                },
                                {
                                    text: 'Solicitantes',
                                    children: [
                                        {
                                            text: 'Tree Node',
                                            leaf: true
                                        }
                                    ]
                                }
                            ]
                        },
                        loader: {

                        }
                    }
                ]
			
            },
            {
                id:'PnlSur',
		xtype: 'panel',
                title: '',
                region: 'south',
                tpl: '',
                height: 21,
                margins: '0',
                activeItem: 0,
                html: '<p>Propiedad de Grupo Villatoro - Derechos Reservados 2013</p>',
                style: 'font-size: 9px; text-align: left;',
                split: true
            },
			   
		 TabPanelMain
		];
        me.callParent();
	
 ////Funciones ////////////////////////////////	
        				 
	    function addTabListadoClientes(){ 
      	 var tab=this.TabPanelMain.getComponent('TabListadoClientes');
		   if(!tab){ //si no existe lo creamos
				tab = Ext.create('MvcClientes.view.Clientes.PanelClientes', {});
				this.TabPanelMain.add(tab); //Se agrega el Panel Cliente al TabMain 
				this.TabPanelMain.doLayout(); //Redibujado del Panel 
				this.TabPanelMain.setActiveTab(tab); //Activamos el Tab
               			
             } 
			    this.TabPanelMain.setActiveTab(tab); //Se activa el Tab Clickeado 
				     		 
	    }
		
		
	
		
    }
		
 });

this.TabPanelMain = Ext.create('MvcClientes.view.Principal.TabMain', {
						region: 'center',
						id:'TabMain'
			     });
	

	
 