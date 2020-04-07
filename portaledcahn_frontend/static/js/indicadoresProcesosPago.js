
function InicializarCantidadPagos(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('cantidadPagos'));
    var opciones = {
        baseOption:{
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false,title:'Vista'},
                    magicType: {show: true, type: ['line', 'bar'],title:'Seleccionar'},
                    restore: {show: true,title:'Restaurar'},
                    saveAsImage: {show: true,title:'Descargar'}
                }
            },/*
            legend: {
                data:['蒸发量1','降水量','平均温度3']
            },*/
            xAxis: [
                {
                    type: 'category',
                    data: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel:{
                        interval:0,
                        rotate:45,
                        showMinLabel:false
                    }
                }
            ],
            grid:{
                containLabel:true
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'Cantidad',
                    min: 0,
                    max: 250,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }/*,
                {
                    type: 'value',
                    name: 'Cantidad de Pagos Promedio',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }*/
            ],
            series: [
                {
                    name:'Cantidad de Pagos',
                    type:'bar',
                    data:[2, 4, 7, 23, 25, 76, 135, 162, 40, 90, 6, 110],
                    itemStyle:{
                        color: '#58C5CC'
                    }
                },
                {
                    name:'Cantidad de Pagos Promedio',
                    type:'line',
                    //yAxisIndex: 1,
                    data:[4, 4.5, 25, 26, 27, 80, 150, 35, 23.5, 23, 6.5, 6.2],
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: '#6569CC',
                            width: 4/*,
                            type: 'dashed'*/
                        }
                    },
                    itemStyle:{
                        color: '#6569CC'
                    }
                }
            ]
        }
        
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}


function InicializarMontoPagos(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('montoPagos'));
    var opciones = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid:{
            containLabel:true
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false,title:'Vista'},
                magicType: {show: true, type: ['line', 'bar'],title:'Seleccionar'},
                restore: {show: true,title:'Restaurar'},
                saveAsImage: {show: true,title:'Descargar'}
            }
        },/*
        legend: {
            data:['蒸发量1','降水量','平均温度3']
        },*/
        xAxis: [
            {
                type: 'category',
                data: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel:{
                    interval:0,
                    rotate:45,
                    showMinLabel:false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Monto',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} HNL'
                },
                name:'Miles de Lempiras'
            }/*,
            {
                type: 'value',
                name: 'Cantidad de Pagos Promedio',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} HNL'
                }
            }*/
        ],
        series: [
            {
                name:'Monto Pagado',
                type:'bar',
                data:[6, 5, 10, 27, 28, 80, 200, 16, 39, 25, 7, 8],
                itemStyle:{
                    color: '#D9527B'
                }
            },
            {
                name:'Monto Devengado',
                type:'bar',
                data:[2, 4, 7, 23, 25, 76, 135, 162, 32, 20, 6, 3],
                itemStyle:{
                    color: '#F69A6B'
                }
            },
            {
                name:'Promedio Pagado',
                type:'line',
                data:[4, 4.5, 25, 26, 27, 80, 150, 35, 23.5, 23, 6.5, 6.2],
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: '#6569CC',
                        width: 4/*,
                        type: 'dashed'*/
                    }
                },
                itemStyle:{
                    color: '#6569CC'
                }
            },
            {
                name:'Promedio Devengado',
                type:'line',
                data:[5, 8, 15, 35, 10, 70, 100, 20, 15, 10, 8, 9],
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: '#FECB7E',
                        width: 4/*,
                        type: 'dashed'*/
                    }
                },
                itemStyle:{
                    color: '#FECB7E'
                }
            }
        ]
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}





function CantidadPagosEtapas(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('cantidadPagosEtapas'));
    var opciones = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false,title:'Vista'},
                magicType: {show: true, type: ['line', 'bar'],title:'Seleccionar'},
                restore: {show: true,title:'Restaurar'},
                saveAsImage: {show: true,title:'Descargar'}
            }
        },/*
        legend: {
            data:['蒸发量1','降水量','平均温度3']
        },*/
        xAxis: [
            {
                type: 'category',
                data: ['Precompromiso','Compromiso','Devengado','Transacciones'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel:{
                    interval:0,
                    rotate:45,
                    showMinLabel:false
                }
            }
        ],
        grid:{
            containLabel:true
        },
        yAxis: [
            {
                type: 'value',
                name: 'Cantidad',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value}'
                }
            }/*,
            {
                type: 'value',
                name: 'Cantidad de Pagos Promedio',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} HNL'
                }
            }*/
        ],
        series: [
            {
                name:'Pagos',
                type:'bar',
                data:[65, 97, 198, 150],
                itemStyle:{
                    color: '#F89A67'
                }
            }
        ]
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}

function MontoPagosEtapas(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('montoPagosEtapas'));
    var opciones = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            containLabel: true
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false,title:'Vista'},
                magicType: {show: true, type: ['line', 'bar'],title:'Seleccionar'},
                restore: {show: true,title:'Restaurar'},
                saveAsImage: {show: true,title:'Descargar'}
            }
        },/*
        legend: {
            data:['蒸发量1','降水量','平均温度3']
        },*/
        xAxis: [
            {
                type: 'category',
                data: ['Precompromiso','Compromiso','Devengado','Transacciones'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel:{
                    interval:0,
                    rotate:45,
                    showMinLabel:false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Monto',
                min: 0,
                max: 200000,
                interval: 50000,
                axisLabel: {
                    formatter: '{value} HNL'
                }
            }/*,
            {
                type: 'value',
                name: 'Cantidad de Pagos Promedio',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} HNL'
                }
            }*/
        ],
        series: [
            {
                name:'Monto Pagado',
                type:'bar',
                data:[150000,80444,69000,72000],
                itemStyle:{
                    color: '#D9527B'
                }
            }
        ]
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}


function TiempoPromedioEtapas(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('tiempoPromedioEtapas'));
    var opciones ={
        tooltip : {
            trigger: 'axis',
            axisPointer : {           
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },/*
        legend: {
            data: ['Precompromiso','Compromiso','Devengado','Transacciones']
        },*/
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value',
            min: 0,
            max: 810,
            interval: 100,
            axisLabel: {
                formatter: '{value} Días'
            }
        },
        yAxis: {
            type: 'category',
            data: ['']
        },
        series: [
            {
                name: 'Precompromiso',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320],
                itemStyle:{
                    color: '#27AEB4'
                }
            },
            {
                name: 'Compromiso',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120],
                itemStyle:{
                    color: '#F69A69'
                }

                
            },
            {
                name: 'Devengado',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220],
                itemStyle:{
                    color: '#FFCA7E'
                }
            },
            {
                name: 'Transacciones',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150],
                itemStyle:{
                    color: '#DA527A'
                }
            }
        ],
        label:{
            show:true,
            fontFamily:'Poppins',
            fontWeight:700,
            fontSize:25,
            align:'right',
            formatter: '{c} Días'
        }
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}


function Top10Compradores(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('top10Compradores'));
    var opciones = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false,title:'Vista'},
                magicType: {show: true, type: ['line', 'bar'],title:'Seleccionar'},
                restore: {show: true,title:'Restaurar'},
                saveAsImage: {show: true,title:'Descargar'}
            }
        },/*
        legend: {
            data:['蒸发量1','降水量','平均温度3']
        },*/
        xAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} HNL'
                }
            }
        ],
        grid:{
            containLabel:true
        },
        yAxis: [
            {
                
                type: 'category',
                data: ['Secretaria de Salud Pública','Empresa Nacional de Energía Eléctrica','Empresa Hondureña de Telecomunicaciones','Secretaría de Defensa Nacional'
            ,'Instituto Hondureño de Seguridad Social','Consejo Nacional Supervisor de Cooperativas','Instituto Nacional de Previsión del Magisterio','Secretaría de Desarrollo Económico','Direccion de la Marina Mercante','Fondo Hondureño de Inversión Social'],
                axisPointer: {
                    type: 'shadow'
                },
                align: 'right',
                width:'50%',
                padding:5,
                rich: {
                    a: {
                        // `align` is not set, then it will be right
                    }
                }
                
                /*,
                name: 'Monto',
                min: 0,
                max: 200000,
                interval: 50000,
                axisLabel: {
                    formatter: '{value} HNL'
                }*/
            }/*,
            {
                type: 'value',
                name: 'Cantidad de Pagos Promedio',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} HNL'
                }
            }*/
        ],
        series: [
            {
                name:'Monto Pagado',
                type:'bar',
                data:[150000,80444,69000,72000,64248,93734,99214,92792,4351,97934],
                itemStyle:{
                    color: '#58C5CC'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                barWidth:30,
                barCategoryGap:'20%',
                barGap:'50%'
            }
        ],
        label:{
            show:true,
            fontFamily:'Poppins',
            fontWeight:700,
            fontSize:15
        }
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}


function Top10Proveedores(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('top10Proveedores'));
    var opciones ={
        tooltip : {
            trigger: 'axis',
            axisPointer : {           
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },/*
        legend: {
            data: ['Precompromiso','Compromiso','Devengado','Transacciones']
        },*/
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value',
            /*min: 0,
            max: 810,*/
            interval: 100000,
            axisLabel: {
                formatter: '{value}'
            }
        },
        yAxis: {
            type: 'category',
            data: ['Centro de Inmunodiagnostico Especializado, S. de R.L.','QUALITY , SISTEMAS Y REACTIVOS SOCIEDAD DE RESPONSAILIDAD LIMITADA','INFINITE TRAVEL GROUP S DE R L','Cash Business, S. de R. L.','Yip Supermercados, S. A. de C. V.','DISTRIBUIDORA CHOROTEGA','JETSTEREO S.A DE C.V.','INDUFESA','PACASA','LICONA AUTOREPUESTOS']
        },
        series: [
            {
                name: 'Monto de Contrato, Pagados en HNL',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150000,80444,69000,72000,64248,93734,99214,92792,48351,97934],
                itemStyle:{
                    color: '#27AEB4'
                }
            },
            {
                name: 'Monto de Contrato, Pagados en USD',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150000,80444,69000,72000,64248,93734,99214,92792,48351,97934],
                itemStyle:{
                    color: '#F69A69'
                }

                
            },
            {
                name: 'Monto de Contrato, Pagados en EUR',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150000,80444,69000,72000,64248,93734,99214,92792,48351,97934],
                itemStyle:{
                    color: '#FFCA7E'
                }
            }
        ],
        label:{
            show:true,
            fontFamily:'Poppins',
            fontWeight:700,
            fontSize:15
        }
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}

function SegregacionMontosContratos(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('segregacionMontosContratos'));
    var opciones ={
        series: [{
            type: 'treemap',
            data: [
            {
                name: 'Empresa Hondureña de Telecomunicaciones',            // First tree
                value: 40406,
                children: [{
                    name: '23200-Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                    value: 4
                },{
                    name: '21100-Energía Eléctrica',       // Son of first tree
                    value: 20,
                },{
                    name: '26110-Pasajes Nacionales',       // Son of first tree
                    value: 20
                }],
                itemStyle:{
                    color:'#6569CC'
                }
            },
            {
                name: 'Secretaría de Defensa Nacional',            // Second tree
                value: 60609,
                children: [{
                    name: '23200-Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                    value: 4
                },{
                    name: '21100-Energía Eléctrica',       // Son of first tree
                    value: 20,
                },{
                    name: '26110-Pasajes Nacionales',       // Son of first tree
                    value: 20
                }],
                itemStyle: {
                    color: '#F79A6A'/*function(e){
                        var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A'];
                        return e.dataIndex<colores.length?colores[e.dataIndex]:colores[0];
                    }*/
                }
            }, 
            {
                name: 'Secretaria de Salud Pública',            // Second tree
                value: 80812,
                children: [{
                    name: '23200-Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                    value: 4
                },{
                    name: '21100-Energía Eléctrica',       // Son of first tree
                    value: 20,
                },{
                    name: '26110-Pasajes Nacionales',       // Son of first tree
                    value: 20
                }],
                itemStyle: {
                    color: '#FECB7E'/*function(e){
                        var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A'];
                        return e.dataIndex<colores.length?colores[e.dataIndex]:colores[0];
                    }*/
                }
            }, {
                name: 'Instituto Hondureño de Seguridad Social',            // Second tree
                value: 90912,
                children: [{
                    name: '21100-Energía Eléctrica',       // Son of first tree
                    value: 20,
                    children: [{
                        name: '23200-Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                        value: 4
                    },{
                        name: '21100-Energía Eléctrica',       // Son of first tree
                        value: 20,
                    },{
                        name: '26110-Pasajes Nacionales',       // Son of first tree
                        value: 20
                    }]
                }],
                itemStyle: {
                    color: '#DA517A'/*function(e){
                        var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A'];
                        return e.dataIndex<colores.length?colores[e.dataIndex]:colores[0];
                    }*/
                }
            }, {
                name: 'Empresa Nacional de Energía Eléctrica',            // Second tree
                value: 181825,
                children: [{
                    name: '21100-Energía Eléctrica',       // Son of first tree
                    value: 20,
                    children: [{
                        name: '23200-Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                        value: 4
                    },{
                        name: '21100-Energía Eléctrica',       // Son of first tree
                        value: 20,
                    },{
                        name: '26110-Pasajes Nacionales',       // Son of first tree
                        value: 20
                    }]
                }],
                itemStyle: {
                    color: '#57C5CB'/*function(e){
                        var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A'];
                        return e.dataIndex<colores.length?colores[e.dataIndex]:colores[0];
                    }*/
                }
            }],
            label:{
                show:true,
                fontFamily:'Poppins',
                fontWeight:700,
                fontSize:15
            }
            
        }],
        fontFamily:'Poppins',
        fontWeight:700,
        fontSize:15,
        label:{
            show:true,
            fontFamily:'Poppins',
            fontWeight:700,
            fontSize:15
        }
    };
    
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}
$(function(){
    $('.botonAzulFiltroBusqueda,.cerrarContenedorFiltrosBusqueda').on('click',function(e){
        if($('.contenedorFiltrosBusqueda').hasClass('cerrado')){
          $('.contenedorFiltrosBusqueda').removeClass('cerrado');
        }else{
          $('.contenedorFiltrosBusqueda').addClass('cerrado');
        }
      });
    InicializarCantidadPagos();
    InicializarMontoPagos();
    CantidadPagosEtapas()
    MontoPagosEtapas();
    TiempoPromedioEtapas();
    Top10Proveedores();
    Top10Compradores();
    SegregacionMontosContratos();
    InicializarConteo();
    view = new ElasticList({
        el: $("#elastic-list"),
        data: dataElastic,
        hasFilter: true,
        onchange: function (filters) {
        },
        columns: [
           /* {
              title: "Selección",
                attr: "selection"
            },{
                title: "Categoría",
                attr: "category"
            },*/
            {
                title: "Institución",
                attr: "name"
            }, {
                title: "Año",
                attr: "year"
            },{
              title: "Moneda",
                attr: "coin"
            },{
                title: "Objeto de Gasto",
                attr: "name"
            }, {
                title: "Fuente de Financiamiento",
                attr: "name"
            }, {
                title: "Proveedor",
                attr: "name"
            }  ]
    });
})

function InicializarConteo(){
    $('.conteo.moneda').countTo({
        formatter: function (value, options) {
          value = value.toFixed(2/*options.decimals*/);
          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return value;
      }
      });
      $('.conteo').not('.moneda').countTo({
        formatter: function (value, options) {
            value = value.toFixed(options.decimals);
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return value;
        }
      });
}