var filtrosAplicables={
    monedas: {titulo:'Moneda',parametro:'moneda'},
    instituciones: {titulo:'Institución Compradora',parametro:'institucion'},
    años: {titulo:'Año',parametro:'año'},
    proveedores: {titulo:'Proveedor',parametro:'proveedor'},
    fuentes: {titulo:'Fuente de Finaciamineto',parametro:'fuentefinanciamiento'},
    objetosGasto : {titulo:'Objeto de Gasto',parametro:'objetosgasto'}
    
  };
  var filtrosAplicablesR={
    moneda: {titulo:'Moneda',parametro:'monedas'},
    institucion: {titulo:'Institución Compradora',parametro:'instituciones'},
    año: {titulo:'Año',parametro:'años'},
    proveedor: {titulo:'Proveedor',parametro:'proveedores'},
    fuentefinanciamiento: {titulo:'Fuente de Finaciamineto',parametro:'fuentes'},
    objetosgasto : {titulo:'Objeto de Gasto',parametro:'objetosGasto'}
    
  };
  var traducciones={
    'goods':{titulo:'Bienes y provisiones',descripcion:'El proceso de contrataciones involucra bienes o suministros físicos o electrónicos.'},
    'works':{titulo:'Obras',descripcion:'El proceso de contratación involucra construcción reparación, rehabilitación, demolición, restauración o mantenimiento de algún bien o infraestructura.'},
    'services':{titulo:'Servicios',descripcion:'El proceso de contratación involucra servicios profesionales de algún tipo, generalmente contratado con base de resultados medibles y entregables. Cuando el código de consultingServices está disponible o es usado por datos en algún conjunto da datos en particular, el código de servicio sólo debe usarse para servicios no de consultoría.'},
    'consultingServices':{titulo:'Servicios de consultoría',descripcion:'Este proceso de contratación involucra servicios profesionales provistos como una consultoría.'}
  }
  window.onpopstate = function(e){
    location.reload();
  }
function InicializarCantidadPagos(){
    //app.title = '折柱混合';

    var parametros={}
    ObtenerJsonFiltrosAplicados(parametros)
    $.get(api+"/dashboardsefin/cantidaddepagos/",parametros).done(function( datos ) {
        console.dir('Cantidad de Pagos')
        console.dir(datos);
        var grafico=echarts.init(document.getElementById('cantidadPagos'));
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
            },
            xAxis: [
                {
                    type: 'category',
                    data: datos.resultados.meses,//['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
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
                    /*max: 250,*/
                  //  interval: 50,
                    axisLabel: {
                        formatter: '{value}'
                    },
                    position:'left'
                },
                {
                    type: 'value',
                    name: 'Cantidad de Pagos en Porcentaje',
                    min: 0,
                    max: 100,/*
                    interval: 5,*/
                    axisLabel: {
                        formatter: '{value} %'
                    },
                    position:'right'
                }
            ],
            series: [
                {
                    name:'Cantidad de Pagos',
                    type:'bar',
                    data:datos.resultados.cantidadpagos,
                    itemStyle:{
                        color: '#58C5CC'
                    }
                },
                {
                    name:'Cantidad de Pagos en Porcentaje',
                    type:'line',
                    //yAxisIndex: 1,
                    data:datos.resultados.promediopagos.map(function(e){return ObtenerNumero((ObtenerNumero(e)*100).toFixed(2))}),
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
                    },
                    yAxisIndex:1
                }
            ]
        };
        grafico.setOption(opciones, true);
    
        
        window.addEventListener("resize", function(){
            grafico.resize();
        });
        }).fail(function() {
            
            
            });
    
}


function InicializarMontoPagos(){
    //app.title = '折柱混合';

    var parametros={}
    ObtenerJsonFiltrosAplicados(parametros)
    $.get(api+"/dashboardsefin/montosdepagos/",parametros).done(function( datos ) {
        console.dir('Monto Pagos')
        console.dir(datos);
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
                    data: datos.resultados.meses,
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
                   /* max: 250,*/
                  //  interval: 10000000,
                    axisLabel: {
                        formatter: '{value} HNL'
                    },
                    name:'Lempiras'
                },
                {
                    type: 'value',
                    name: 'Monto de Pagos en Porcentaje',
                    min: 0,
                    max: 100,/*
                    interval: 5,*/
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [
                {
                    name:'Monto Pagado',
                    type:'bar',
                    data:datos.resultados.montopagos,
                    itemStyle:{
                        color: '#D9527B'
                    }
                },/*
                {
                    name:'Monto Devengado',
                    type:'bar',
                    data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    itemStyle:{
                        color: '#F69A6B'
                    }
                },*/
                {
                    name:'Monto Pagado en Porcentaje',
                    type:'line',
                    data:datos.resultados.promediopagos.map(function(e){return ObtenerNumero((ObtenerNumero(e)*100).toFixed(2))}),
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
                    },
                    yAxisIndex:1
                }/*,
                {
                    name:'Promedio Devengado',
                    type:'line',
                    data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: '#FECB7E',
                            width: 4
                        }
                    },
                    itemStyle:{
                        color: '#FECB7E'
                    }
                }*/
            ]
        };
        grafico.setOption(opciones, true);
    
        
        window.addEventListener("resize", function(){
            grafico.resize();
        });
        }).fail(function() {
          
          
    });
    
}



function CantidadPagosEtapas(){
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
                name: 'Monto',
                min: 0,
                max: 250,
                interval: 50,
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
    var parametros={}
        ObtenerJsonFiltrosAplicados(parametros)
        $.get(api+"/dashboardsefin/topcompradores/",parametros).done(function( datos ) {
            console.dir(datos);
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
                        data: datos.resultados.compradores,
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
                        data:datos.resultados.montos,
                        itemStyle:{
                            color: '#6569CC'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: function (e){
                                    return "{c} HNL".replace('{c}',ValorMoneda(e.value));
                                }
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
              }).fail(function() {
                  
                  
                });
    
}


function Top10Proveedores(){
    //app.title = '折柱混合';
    var parametros={}
ObtenerJsonFiltrosAplicados(parametros)
                $.get(api+"/dashboardsefin/topproveedores/",parametros).done(function( datos ) {
                    console.dir(datos);
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
                            //interval: 100000,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        yAxis: {
                            type: 'category',
                            data: datos.resultados.proveedores
                        },
                        series: [
                            {
                                name: 'Monto de Contrato, Pagados en HNL',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right',
                                        formatter: function (e){
                                            return "{c} HNL".replace('{c}',ValorMoneda(e.value));
                                        }
                                    }
                                },
                                data: datos.resultados.montos,
                                itemStyle:{
                                    color: '#27AEB4'
                                }
                            }/*,
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
                            }*/
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
                      }).fail(function() {
                          
                          
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
    ObtenerFiltros();
    $('.botonAzulFiltroBusqueda,.cerrarContenedorFiltrosBusqueda').on('click',function(e){
        if($('.contenedorFiltrosBusqueda').hasClass('cerrado')){
          $('.contenedorFiltrosBusqueda').removeClass('cerrado');
        }else{
          $('.contenedorFiltrosBusqueda').addClass('cerrado');
        }
      });
    CargarGraficos();
    CantidadPagosEtapas()
    MontoPagosEtapas();
    TiempoPromedioEtapas();
 
    SegregacionMontosContratos();
    
    
    /*view = new ElasticList({
        el: $("#elastic-list"),
        data: dataElastic,
        hasFilter: true,
        onchange: function (filters) {
        },
        columns: [
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
    });*/
    VerificarIntroduccion('INTROJS_BUSQUEDA',1);
})
function CargarGraficos(){
    InicializarCantidadPagos();
    InicializarMontoPagos();
    Top10Proveedores();
    Top10Compradores();
    CargarCajonesMontos();
    CargarCajonesCantidad();
}


function CargarCajonesMontos(){
    var parametros={}
    ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardsefin/estadisticamontosdepagos/",parametros).done(function( datos ) {
console.dir(datos);
    $('#MontoPagosPromedio').attr('data-to',datos.resultados.promedio);
    $('#MontoPagosMenor').attr('data-to',datos.resultados.menor);
    $('#MontoPagosMayor').attr('data-to',datos.resultados.mayor);
    $('#MontoPagosTotal').attr('data-to',datos.resultados.total);

$('.conteo.moneda').countTo({
    formatter: function (value, options) {
      value = value.toFixed(2/*options.decimals*/);
      value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return value;
  }
  });
  }).fail(function() {
      
      
    });
}

function CargarCajonesCantidad(){
    var parametros={}
    ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardsefin/estadisticacantidaddepagos/",parametros).done(function( datos ) {
console.dir(datos);
    $('#CantidadPagosPromedio').attr('data-to',datos.resultados.promedio);
    $('#CantidadPagosMenor').attr('data-to',datos.resultados.menor);
    $('#CantidadPagosMayor').attr('data-to',datos.resultados.mayor);
    $('#CantidadPagosTotal').attr('data-to',datos.resultados.total);

    $('.conteo').not('.moneda').countTo({
        formatter: function (value, options) {
            value = value.toFixed(options.decimals);
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return value;
        }
      });
  }).fail(function() {
      
      
    });
}


function ObtenerFiltros(){
    var parametros=ObtenerJsonFiltrosAplicados({});
    $.get(api+"/dashboardsefin/filtros/",parametros).done(function( datos ) {

        if(datos.respuesta.pagos){
            datos.respuesta['años']=datos.respuesta.pagos['años'];
            datos.respuesta['monedas']=datos.respuesta.pagos['monedas'];
            datos.respuesta['proveedores']=datos.respuesta.pagos['proveedores'];
            delete datos.respuesta.pagos;
            delete datos.respuesta.objetosGasto;
            delete datos.respuesta.instituciones;
            delete datos.respuesta.fuentes;

        }
        console.dir('filtros')
    console.dir(datos);
      
       
  
    MostrarListaElastica(datos,'#elastic-list');
    MostrarEtiquetaListaElasticaAplicada();
    MostrarListaElasticaAplicados();
 // }
  
  
      
        
      }).fail(function() {
          
          
        });

}




function ObtenerJsonFiltrosAplicados(parametros){
    if(Validar(ObtenerValor('moneda'))){
        parametros['moneda']=ObtenerValor('moneda');
    }
    if(Validar(ObtenerValor('institucion'))){
    parametros['institucion']=decodeURIComponent(ObtenerValor('institucion'));
    }
    if(Validar(ObtenerValor('año'))){
      parametros['año']=ObtenerValor('año');
    }
    if(Validar(ObtenerValor('proveedor'))){
        parametros['proveedor']=decodeURIComponent(ObtenerValor('proveedor'));
    }
    if(Validar(ObtenerValor('fuentefinanciamiento'))){
      parametros['fuentefinanciamiento']=decodeURIComponent(ObtenerValor('fuentefinanciamiento'));
    }
    if(Validar(ObtenerValor('objetosgasto'))){
        parametros['objetosgasto']=decodeURIComponent(ObtenerValor('objetosgasto'));
    }
    

    return parametros;
  }

  function AccederUrlPagina(opciones,desUrl){
    var direccion=('/dashboardProcesosPago/?'+
    (ValidarCadena(opciones.moneda)? '&moneda='+encodeURIComponent(opciones.moneda): (ValidarCadena(ObtenerValor('moneda'))&&!desUrl?'&moneda='+ObtenerValor('moneda'):''))+
    (ValidarCadena(opciones.institucion)? '&institucion='+encodeURIComponent(opciones.institucion): (ValidarCadena(ObtenerValor('institucion'))&&!desUrl?'&institucion='+ObtenerValor('tituloCon'):''))+
   
    (ValidarCadena(opciones.año)? '&año='+encodeURIComponent(opciones.año): (ValidarCadena(ObtenerValor('año'))&&!desUrl?'&año='+ObtenerValor('año'):''))+
    (ValidarCadena(opciones.proveedor)? '&proveedor='+encodeURIComponent(opciones.proveedor): (ValidarCadena(ObtenerValor('proveedor'))&&!desUrl?'&proveedor='+ObtenerValor('proveedor'):''))+
    (ValidarCadena(opciones.fuentefinanciamiento)? '&fuentefinanciamiento='+encodeURIComponent(opciones.fuentefinanciamiento): (ValidarCadena(ObtenerValor('fuentefinanciamiento'))&&!desUrl?'&fuentefinanciamiento='+ObtenerValor('fuentefinanciamiento'):''))+
    (ValidarCadena(opciones.objetosgasto) ? '&objetosgasto='+encodeURIComponent(opciones.objetosgasto):(ValidarCadena(ObtenerValor('objetosgasto'))&&!desUrl?'&objetosgasto='+ObtenerValor('objetosgasto'):''))
  
    );
    return direccion;
  }
  function PushDireccionGraficos(direccion){
    window.history.pushState({}, document.title,direccion);
    ObtenerFiltros();
    CargarGraficos();
  }
  
  function MostrarEtiquetasFiltrosAplicados(parametros){
    if(!$.isEmptyObject(parametros)){
      $('#contenedorSinFiltros').hide();
      $('#contenedorFiltros').show();
    }else{
      $('#contenedorFiltros').hide();
      $('#contenedorSinFiltros').show();
    }
    $('#listaFiltrosAplicados').html('');
    $.each(parametros,function(llave,filtro){
      $('#listaFiltrosAplicados').append(
        $('<div>',{class:'grupoEtiquetaFiltro col-md-12 mb-1'}).append(
          $('<div>',{class:'grupoEtiquetaTitulo mr-1',text:filtrosAplicablesR[llave].titulo +':'}),
          $('<div>',{class:'filtrosAplicados'}).append(
            $('<div>',{class:'etiquetaFiltro','llave':llave,'valor':filtro}).append(
              filtro,
              '&nbsp;',
              $('<i>',{class:'fas fa-times'}).on('click',function(e){
                var filtros=ObtenerJsonFiltrosAplicados({});
                //$('li.list-group-item.active')
                /*$.each(filtros,function(cla,val){
                  filtros[filtrosAplicablesR[$(val).attr('llave')]?filtrosAplicablesR[$(val).attr('llave')].parametro:'' ]=$(val).attr('valor');
                });*/
                delete filtros[filtrosAplicablesR[$(e.currentTarget).parent().attr('llave')]?$(e.currentTarget).parent().attr('llave'):''];

                PushDireccionGraficos(AccederUrlPagina(filtros,true));
              })
            )
          )
        )
      )
    });
  }

  function MostrarEtiquetaListaElasticaAplicada(){
  
    var parametros={
    };
    parametros=ObtenerJsonFiltrosAplicados(parametros);
    MostrarEtiquetasFiltrosAplicados(parametros);
  }

  function MostrarListaElasticaAplicados(){
    var filtros={
    };
    filtros=ObtenerJsonFiltrosAplicados(filtros);
    $.each(filtros,function(llave,valor){
        console.dir(llave)
        console.dir(valor)
        console.dir('ul#ul'+ filtrosAplicablesR[llave].parametro)
        console.dir( 'li[formato="'+(valor).toString().toLowerCase()+'"]')
      $('ul#ul'+ filtrosAplicablesR[llave].parametro ).find(
        'li[formato="'+(valor).toString().toLowerCase()+'"]'
      ).addClass('active');
    });
  }

  function MostrarListaElastica(datos,selector){
    $(selector).html('');
    console.dir('vaciando***')
    $.each(datos.respuesta,function(llave,valor){
      $(selector).append(
        $('<div class="list-container col-md-12 2">').append(
          $('<div class="panel panel-default ">').append(
            $('<div class="panel-heading">').text(
              filtrosAplicables[llave]?filtrosAplicables[llave].titulo:llave
            ),
            $('<input>',{type:'text', class:'elastic-filter',placeholder:filtrosAplicables[llave]?filtrosAplicables[llave].titulo:llave ,filtro:llave,on:{
              keyup:function(e){
                var texto=$(e.currentTarget).val();
                if (texto.length > 0) {
                  texto = texto.toLocaleLowerCase();
                  var regla = " ul#" + 'ul'+llave + ' li[formato*="' + texto + '"]{display:block;} ';
                  regla += " ul#" + 'ul'+llave + ' li:not([formato*="' + texto + '"]){display:none;}';
                  $('#style'+llave).html(regla);
                } else {
                  $('#style'+llave).html('');
                }
              }
            }}),
            $('<style>',{id:'style'+llave}),
            $('<ul >',{class:'list-group',id:'ul'+llave}).append(
              AgregarPropiedadesListaElastica(valor,llave)
            )
              
            
          )
        )
      )
      
      
    });
    AgregarToolTips();
    $('#quitarFiltros').on('click',function(e){
      PushDireccionGraficos(AccederUrlPagina({},true));
    });
    
  }

  
function AgregarPropiedadesListaElastica(valor,llave){
    var elementos=[]
    $.each(valor.buckets,function(i,propiedades){
      //resultadosElastic=AsignarValor(resultadosElastic,llave,,propiedades.doc_count);
      elementos.push(
        $('<li >',{
        class:'list-group-item',
        valor:propiedades.key_as_string?propiedades.key_as_string:propiedades.key, 
        formato: (propiedades.key_as_string?propiedades.key_as_string:propiedades.key).toString().toLowerCase(),'llave':llave,
        on:{
          click:function(e){
            var filtro=$(e.currentTarget);
            if(filtro.hasClass('active')){
              filtro.removeClass('active')
            }else{
              filtro.parent().find('.list-group-item.active').removeClass('active');
              filtro.addClass('active');
            }
            var filtros={
            };
            $('li.list-group-item.active').each(function(cla,val){
                console.dir(filtrosAplicables[$(val).attr('llave')]?filtrosAplicables[$(val).attr('llave')].parametro:'')
                console.dir($(val).attr('valor'));
              filtros[filtrosAplicables[$(val).attr('llave')]?filtrosAplicables[$(val).attr('llave')].parametro:'' ]=$(val).attr('valor');
            });
            PushDireccionGraficos(AccederUrlPagina(filtros,true));
          }
        }}).append(
          $('<div class="badge">').text(propiedades.doc_count),
          $('<div >',{
          class:'elastic-data',
          
          text:propiedades.key_as_string?propiedades.key_as_string:(traducciones[propiedades.key]?traducciones[propiedades.key].titulo:propiedades.key),
          toolTexto:propiedades.key_as_string?propiedades.key_as_string:(traducciones[propiedades.key]?traducciones[propiedades.key].titulo:propiedades.key),
          toolPosicion:'right-end'}
          )
        )
      )
    });
    return elementos;
  }
  