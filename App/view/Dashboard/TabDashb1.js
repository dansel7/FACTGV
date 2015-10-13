
Ext.require([
    'Ext.form.*',
    'Ext.data.*',
    'Ext.chart.*',
    'Ext.grid.Panel',
    'Ext.layout.container.*'
]);

   
    function Porcentaje(v) {
        return v + '%';
    }
    
     function DolarAmericano(v) {
        return '$'+v ;
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
            autoLoad: true
        });
    //create radar dataset model.
    var chs = Ext.create('Ext.data.JsonStore', {
        fields: ['Name', 'Data'],
        data: [
        {
            'Name': 'Abonado',
            'Data': 33.34
        }, {
            'Name': 'Nota Credito',
            'Data': 33.33
        }, {
            'Name': 'Pendiente',
            'Data': 33.33
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
        id: 'company-form',
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
    
    /*
     * Here is where we create the Form
     */
   Ext.define('MvcClientes.view.Dashboard.TabDashb1', {
        extend: 'Ext.form.Panel',
	closable:   true,
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
            flex: 3,
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
                    defaults: {
                        width: 200,
                        labelWidth: 90,
                        disabled: true
                    },
                    defaultType: 'numberfield',
                    items: [{
                        fieldLabel: 'Fecha',
                        name: 'Fecha',
                        xtype: 'textfield'
                    },{
                        fieldLabel: 'Facturado',
                        name: 'Facturado',
                        maxValue: 100,
                        minValue: 0,
                        enforceMaxLength: true,
                        maxLength: 5,
                        listeners: createListeners('Facturado')
                    },{
                        fieldLabel: 'Abonado',
                        name: 'Abonado',
                        maxValue: 100,
                        minValue: 0,
                        enforceMaxLength: true,
                        maxLength: 5,
                        listeners: createListeners('Abonado')
                    },{
                        fieldLabel: 'Nota Credito',
                        name: 'Nota_Credito',
                        maxValue: 100,
                        minValue: 0,
                        enforceMaxLength: true,
                        maxLength: 5,
                        listeners: createListeners('Nota_Credito')
                    },{
                        fieldLabel: 'Pendiente',
                        name: 'Pendiente',
                        maxValue: 100,
                        minValue: 0,
                        enforceMaxLength: true,
                        maxLength: 5,
                        listeners: createListeners('Pendiente')
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
