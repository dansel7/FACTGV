
Ext.require([
    'Ext.form.*',
    'Ext.data.*',
    'Ext.chart.*',
    'Ext.grid.Panel',
    'Ext.layout.container.*'
]);

    function DolarAmericano(v) {
        return '$'+v ;
    }
    
    function Porcentaje(v) {
        return v + '%';
    }
    
   function DecodMes(v) {
       if(v!=""){
       var Mes=Meses.findRecord('CodMes', v);
       return Mes.get('Mes');
       }
       return "";
    }
    
    
    var form = false;
    var rec = false;
    var selectedStoreItem = false;
    function selectItem(storeItem) {
            var name = storeItem.get('Fecha'),
                series = GraficaBarra.series.get(0),
                i, items, l;
            series.highlight = true;
            series.unHighlightItem();
            series.cleanHighlights();
            for (i = 0, items = series.items, l = items.length; i < l; i++) {
                if (name == items[i].storeItem.get('Fecha')) {
                    selectedStoreItem = items[i].storeItem;
                    series.highlightItem(items[i]);
                    break;
                }
            }
            series.highlight = false;
        };
       
         function updateRecord(rec) {
            var name, series, i, l, items, json = [{
                'Name': 'Abonado',
                'Data': rec.get('Porcentaje_Abonado')
            }, {
                'Name': 'Nota Credito',
                'Data': rec.get('Porcentaje_Nota_Credito')
            }, {
                'Name': 'Pendiente',
                'Data': rec.get('Porcentaje_Pendiente')
            }];
            chs.loadData(json);
            selectItem(rec);
        };
        
         function createListeners() {
            return {
                // buffer so we don't refire while the user is still typing
                buffer: 200,
                change: function(field, newValue, oldValue, listener) {
                    if (rec && form) {
                        if (newValue > field.maxValue) {
                            field.setValue(field.maxValue);
                        } else {
                            form.updateRecord(rec);
                            updateRecord(rec);
                        }
                    }
                }
            };
        };

     //STORE DE LA DATA
        var st_data = new Ext.data.Store({
            fields: ['Fecha','Anio', 'Mes','Facturado','Abonado','Nota_Credito','Pendiente',
                    'Porcentaje_Abonado','Porcentaje_Nota_Credito','Porcentaje_Pendiente'],
            proxy: {
                type: 'ajax',
                url : 'Php/store/dashb1_data.php?token=X208df%Ln',
                reader: {
                    type: 'json'
                } 
            },
        remoteFilter: true,
            autoLoad: true
        });
    //create radar dataset model.
    var chs = Ext.create('Ext.data.JsonStore', {
        fields: ['Name', 'Data'],
        data: [
        {
            'Name': 'Abonado',
            'Data': 50
        }, {
            'Name': 'Nota Credito',
            'Data': 10
        }, {
            'Name': 'Pendiente',
            'Data': 40
        }]
    });
  
    
    //Radar chart will render information for a selected company in the
    //list. Selection can also be done via clicking on the bars in the series.
    var GraficaPastel = Ext.create('Ext.chart.Chart', {
        width: 180,
        height: 180,
        animate: true,
        store: chs,
        shadow: true,
        insetPadding: 0,
        theme: 'Base:gradients',
        legend: {
                position: 'right'
            },
     series: [{
                type: 'pie',
                field: 'Data',
                showInLegend: true,
                donut: false,
                tips: {
                  trackMouse: true,
                  width: 130,
                  height: 25,
                  renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 0;
                    chs.each(function(rec) {
                        total += rec.get('Data')*1;
                    });
                    this.setTitle(storeItem.get('Name') + ': ' + Math.round(storeItem.get('Data') / total * 100) + '%');
                  }
                },
                highlight: {
                  segment: {
                    margin: 20
                  }
                },
               label: {
                field: 'Name',
                display: 'rotate',
                contrast: true,
                font: '10px Arial'
            }
            }]
    });
    
    
    
    //create a grid that will list the dataset items.
    var gridPanel = Ext.create('Ext.grid.Panel', {
        id: 'PanelDataGrid',
        flex: 0.9,
      store: st_data,
        title:'Datos de Empresa',
        columns: [
            {
                id       :'Fecha',
                text   : 'Fecha',
                flex: 1,
                sortable : true,
                dataIndex: 'Fecha',
                hidden:true
            },
            {
                text   : 'Año',
                flex: 0.5,
                sortable : true,
                dataIndex: 'Anio',
            },
            {
                text   : 'Mes',
                 flex: 1,
                sortable : true,
                dataIndex: 'Mes',
                renderer : DecodMes
            },
            {
                text   : 'Facturado',
                flex: 1,
                sortable : true,
                dataIndex: 'Facturado',
                renderer : DolarAmericano
            },
            {
                text   : 'Abonado',
                 flex: 1,
                sortable : true,
                dataIndex: 'Abonado',
                renderer : DolarAmericano
            },
            {
                text   : 'Nota de Credito',
                 flex: 1,
                sortable : true,
                dataIndex: 'Nota_Credito',
                renderer : DolarAmericano
            },
            {
                text   : 'Pendiente',
                 flex: 1,
                sortable : true,
                dataIndex: 'Pendiente',
                renderer : DolarAmericano
            },
            {
                text   : 'Porcentaje Abonado',
                 flex: 1,
                sortable : true,
                dataIndex: 'Porcentaje_Abonado',
                renderer: Porcentaje
            },
            {
                text   : 'Porcentaje Nota de Credito',
                 flex: 1,
                sortable : true,
                dataIndex: 'Porcentaje_Nota_Credito',
                renderer: Porcentaje
            },
            {
                text   : 'Porcentaje Pendiente',
                 flex: 1,
                sortable : true,
                dataIndex: 'Porcentaje_Pendiente',
                renderer: Porcentaje
            }
        ],

        listeners: {
            selectionchange: function(model, records) {
                var json, name, i, l, items, series, fields;
                if (records[0]) {
                    rec = records[0];
                    if (!form) {
                        form = this.up('form').getForm();
                        fields = form.getFields();
                        fields.each(function(field){
                            if (field.name != 'Fecha') {
                                field.setDisabled(false);
                            }
                        });
                    } else {
                        fields = form.getFields();
                    }
                    
                    // prevent change events from firing
                    fields.each(function(field){
                        field.suspendEvents();
                    });
                    form.loadRecord(rec);
                    updateRecord(rec);
                    fields.each(function(field){
                        field.resumeEvents();
                    });
                }
            }
        }
    });

    //create a bar series to be at the top of the panel.
    var GraficaBarra = Ext.create('Ext.chart.Chart', {
        flex: 1,
        shadow: true,
        animate: true,
        store: st_data,
        height:150,
        axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['Facturado'],
            minimum: 0,
            hidden: true
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['Fecha'],
            label: {
                renderer: function(v) {
                    return Ext.String.ellipsis(v, 15, false);
                },
                font: '9px Arial',
                rotate: {
                    degrees: 270
                }
            }
        }],
        series: [{
            type: 'column',
            axis: 'left',
            highlight: true,
            style: {
                fill: '#456d9f'
            },
            highlightCfg: {
                fill: '#a2b5ca'
            },
            label:{
                contrast: true,
                display: 'Facturado',
                field: 'Facturado',
                color: '#000',
                orientation: 'vertical',
                'text-anchor': 'middle'
            },
            listeners: {
                'itemmouseup': function(item) {
                     var series = GraficaBarra.series.get(0),
                         index = Ext.Array.indexOf(series.items, item),
                         selectionModel = gridPanel.getSelectionModel();
                     
                     selectedStoreItem = item.storeItem;
                     selectionModel.select(index);
                }
            },
            xField: ['Fecha'],
            yField: ['Facturado']
        }]        
    });
    
    //disable highlighting by default.
    GraficaBarra.series.get(0).highlight = false;
    
    //add listener to (re)select bar item after sorting or refreshing the dataset.
    GraficaBarra.addListener('beforerefresh', (function() {
        var timer = false;
        return function() {
            clearTimeout(timer);
            if (selectedStoreItem) {
                timer = setTimeout(function() {
                    selectItem(selectedStoreItem);
                }, 900);
            }
        };
    })());
    
    ////STORE MESES///
      var Meses = new Ext.data.Store({
            fields: ['Mes','CodMes'],
            data: [
         {
            'Mes': 'Todos',
            'CodMes': 'Todos'
         },{
            'Mes': 'Enero',
            'CodMes': '1'
         }, {
            'Mes': 'Febrero',
            'CodMes': '2'
         }, {
            'Mes': 'Marzo',
            'CodMes': '3'
        }, {
            'Mes': 'Abril',
            'CodMes': '4'
        }, {
            'Mes': 'Mayo',
            'CodMes': '5'
        }, {
            'Mes': 'Junio',
            'CodMes': '6'
        }, {
            'Mes': 'Julio',
            'CodMes': '7'
        }, {
            'Mes': 'Agosto',
            'CodMes': '8'
        }, {
            'Mes': 'Septiembre',
            'CodMes': '9'
        }, {
            'Mes': 'Octubre',
            'CodMes': '10'
        }, {
            'Mes': 'Noviembre',
            'CodMes': '11'
        }, {
            'Mes': 'Diciembre',
            'CodMes': '12'
        }]
        });
/////////-////////
        
/////STORE AÑOS////
        var years = [];
        var currentTime = new Date();
        var now = currentTime.getFullYear();
        y = 2013;
        years.push(["Todos"]);
        while (y<=now){
             years.push([y]);
             y++;
        }

        var anio = new Ext.data.SimpleStore
        ({
              fields : ['Anio'],
              data : years
        });
/////////-////////
    /*
     * Here is where we create the Form
     */
   Ext.define('MvcClientes.view.Dashboard.TabDashb1', {
        extend: 'Ext.form.Panel',
        alias:'widget.TabDashb1',
	//closable:   true,
        title: 'Dashboard Facturacion',
	itemId:'TabDashb1',
        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'side'
        },
    
        layout: {
            type: 'vbox',
            align: 'stretch'
        },        
        items: [
            
            {
            
            layout: {type: 'hbox', align: 'stretch'},
            flex: 1,
            border: false,
            bodyStyle: 'background-color: transparent',
            
            items: [{
                  
                flex: 0.4,
               layout: {
                    type: 'vbox',
                    align:'stretch'
                },
                margin: '0 0 0 5',
                title: 'Personalizar Vista',
                items: [{
                    margin: '5',
                    xtype: 'fieldset',
                    flex: 1,
                    title:'Filtros',
                    width: 327,
                    height:150,
                    minWidth: 300,
                    minHeight: 118,
                    defaults: {
                        height: 25,
                        width: 230,
                        labelWidth: 100
                    },
                    items: [{
                        xtype : "combobox", queryMode: 'local', fieldLabel: "Seleccione Año",value:"Todos",
                    store: anio,displayField: 'Anio',valueField: 'Anio',
                    name:"year", id:"year", flex: 1, 
                    margin: '0 10 0 20'
                    },{
                        xtype : "combobox", queryMode: 'local', fieldLabel: "Desde el Mes de",value:"Todos",
                    store: Meses,displayField: 'Mes',valueField: 'CodMes',
                    name:"dmes", id:"dmes", flex: 1, 
                    margin: '0 10 0 20'
                    },{
                        xtype : "combobox", queryMode: 'local', fieldLabel: "Hasta el Mes de",value:"Todos",
                    store: Meses,displayField: 'Mes',valueField: 'CodMes',
                    name:"hmes", id:"hmes", flex: 1, 
                    margin: '0 10 0 20'
                    },
                    { 
                        xtype: 'button',
                        margin: '0 10 0 20',
                        itemId: 'BtnFiltro',
                        text: 'Filtrar',
                        listeners: {
                            click: function() {
                                
                               var form = this.up('form'),
                                   year = form.down('#year').getValue(),
                                   hmes = form.down('#hmes').getValue(),
                                   dmes = form.down('#dmes').getValue();
                            //Limpia los Filtros   
                            st_data.clearFilter(); 
                            //Si selecciona solo el campo Desde el Mes
                            if(dmes!="Todos" && year=="Todos" && hmes=="Todos"){
                                st_data.filter('Mes',dmes);
                            }
                            //Si selecciona solo el campo Hasta el Mes
                            if(hmes!="Todos" && year=="Todos" && dmes=="Todos"){
                                st_data.filter('Mes',hmes);
                            }
                            //Si selecciona solo el campo Año
                            if(year!="Todos" && hmes=="Todos" && dmes=="Todos"){
                                 st_data.filter('Anio',year);
                            }
                            //Si seleccionan los campos Desde el Mes y el Año
                            if(dmes!="Todos" && year!="Todos" && hmes=="Todos"){
                                st_data.filter([
                                    {property: 'Mes', value: dmes},
                                    {property: 'Anio', value: year}
                                 ]);
                            }
                            //Si seleccionan los campos Hasta el Mes y el Año
                            if(hmes!="Todos" && year!="Todos" && dmes=="Todos"){
                                st_data.filter([
                                    {property: 'Mes', value: hmes},
                                    {property: 'Anio', value: year}
                                 ]);
                            }
                            //Si seleccionan los campos Desde y Hasta el Mes
                            if(dmes!="Todos" && hmes!="Todos"  && year=="Todos"){
                                st_data.filter([
                                    {property: 'dMes', value: dmes},
                                    {property: 'hMes', value: hmes}
                                 ]);
                            }
                            //Si seleccionan los campos Desde y Hasta el Mes Y el Año
                            if(dmes!="Todos" && hmes!="Todos"  && year!="Todos"){
                                  st_data.filter([
                                    {property: 'dMes', value: dmes},
                                    {property: 'hMes', value: hmes},
                                    {property: 'Anio', value: year}
                                 ]);
                            }   
                            

                            GraficaBarra.refresh();
                            
                            }}
                     }]
                },  GraficaPastel]
            },gridPanel]
        },{
                height: 200,
                layout: 'fit',
                margin: '0 0 3 0',
                items: [GraficaBarra]
            }
    ]
    });
