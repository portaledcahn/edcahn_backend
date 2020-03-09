var filtrosAplicables={
    monedas: {titulo:'Moneda',parametro:'moneda'},
    instituciones: {titulo:'Institución Compradora',parametro:'institucion'},
    años: {titulo:'Año',parametro:'año'},
    proveedores: {titulo:'Proveedor',parametro:'proveedor'},
    fuentes: {titulo:'Fuente de Financiamiento',parametro:'fuentefinanciamiento'},
    objetosGasto : {titulo:'Objeto de Gasto',parametro:'objetosgasto'}
  };
  var filtrosAplicablesR={
    moneda: {titulo:'Moneda',parametro:'monedas'},
    institucion: {titulo:'Institución Compradora',parametro:'instituciones'},
    año: {titulo:'Año',parametro:'años'},
    proveedor: {titulo:'Proveedor',parametro:'proveedores'},
    fuentefinanciamiento: {titulo:'Fuente de Financiamiento',parametro:'fuentes'},
    objetosgasto : {titulo:'Objeto de Gasto',parametro:'objetosGasto'}
    
  };
  var ordenFiltros=['años','monedas','instituciones','proveedores','fuentes'];
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
    parametros=ObtenerJsonFiltrosAplicados(parametros);
    MostrarReloj('#cantidadPagos',true);
    $.get(api+"/dashboardsefin/cantidaddepagos/",parametros).done(function( datos ) {
        console.dir('Cantidad de Pagos')
        console.dir(datos);
        OcultarReloj('#cantidadPagos');
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
                    },
                    formatter:  function (e){
                        return "{b0}<br>{a0} {s0} {c0} Pagos <br>{a1} {s1} {c1} %".replace('{c0}',e[0].value).replace('{c1}',e[1].value).replace('{a0}',e[0].marker).replace('{a1}',e[1].marker).replace('{b0}',e[0].name).replace('{s0}',e[0].seriesName).replace('{s1}',e[1].seriesName);;
                    }
                },
            legend: {
                plain: 'scroll',
                orient: 'horizontal',
                position:'bottom'
            },
            toolbox: {
                orient:'horizontal',
                itemsize:20,
                itemGap:15,
                right:20,
                top:25,
                feature: {
                    dataView: {show: true, readOnly: false,title:'Vista',lang: ['Vista de Datos', 'Cerrar', 'Actualizar'] },
                    magicType: {show: true, type: ['line', 'bar'],title:{line:'Linea',bar:'Barra',stack:'Pila',tiled:'Teja'}},
                    restore: {show: true,title:'Restaurar'},
                    saveAsImage: {show: true,title:'Descargar'}
                },
                emphasis:{
                    iconStyle:{
                        textPosition:'top'
                    }
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
                    containLabel:true,
                    right:'15%'
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
                        position:'left',
                        axisPointer: {
                            label: {
                                formatter: '{value} Pagos'
                            }
                        }
                    },
                    {
                        type: 'value',
                        //name: 'Cantidad de Pagos en Porcentaje',
                        min: 0,
                        max: 100,/*
                        interval: 5,*/
                        axisLabel: {
                            //formatter: '{value} %'
                            show:false
                        },
                        position:'right',
                        axisTick : {show: false},
                        axisLine:{show:false},
                        splitLine:{show:false},
                        axisPointer: {
                            label: {
                                formatter: '{value} %'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name:'Cantidad de Pagos',
                        type:'bar',
                        data:datos.resultados.cantidadpagos,
                        itemStyle:{
                            color: ObtenerColores('Pastel1')[0]
                        }
                    },
                    {
                        name:'Porcentaje en Relación al Año',
                        type:'line',
                        //yAxisIndex: 1,
                        data:datos.resultados.promediopagos.map(function(e){return ObtenerNumero((ObtenerNumero(e)*100).toFixed(2))}),
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: ObtenerColores('Pastel1')[9],
                                width: 4/*,
                                type: 'dashed'*/
                            }
                        },
                        itemStyle:{
                            color: ObtenerColores('Pastel1')[9]
                        },
                        yAxisIndex:1
                    }
                ]
            },
            media:[
                {
                    query:{
                        maxWidth:600
                    },
                    option:{
                        yAxis: [
                            {
                                type: 'value',
                                name: 'Cantidad',
                                min: 0,
                                /*max: 250,*/
                              //  interval: 50,
                                axisLabel: {
                                    formatter: '{value}',
                                    rotate:65
                                },
                                position:'left',
                                axisPointer: {
                                    label: {
                                        formatter: '{value} Pagos'
                                    }
                                }
                            },
                            {
                                type: 'value',
                                //name: 'Cantidad de Pagos en Porcentaje',
                                min: 0,
                                max: 100,/*
                                interval: 5,*/
                                axisLabel: {
                                    //formatter: '{value} %'
                                    show:false
                                },
                                position:'right',
                                axisTick : {show: false},
                                axisLine:{show:false},
                                splitLine:{show:false},
                                axisPointer: {
                                    label: {
                                        formatter: '{value} %'
                                    }
                                }
                            }
                        ],
                        tooltip: {
                            position:['0%','50%']
                        },
                        grid:{
                            left:0,
                            right:0
                        }
                    }
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
    parametros=ObtenerJsonFiltrosAplicados(parametros);
    MostrarReloj('#montoPagos',true);
    $.get(api+"/dashboardsefin/montosdepagos/",parametros).done(function( datos ) {
        console.dir('Monto Pagos');
        console.dir(datos);
        OcultarReloj('#montoPagos');
        var grafico=echarts.init(document.getElementById('montoPagos'));
        var opciones = {
            baseOption:{
            tooltip: {
                
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                },
                formatter:  function (e){
                    return "{b0}<br>{a0} {s0} {c0} HNL <br>{a1} {s1} {c1} %".replace('{c0}',ValorMoneda(e[0].value) ).replace('{c1}',ValorMoneda(e[1].value) ).replace('{a0}',e[0].marker).replace('{a1}',e[1].marker).replace('{b0}',e[0].name).replace('{b1}',e[1].name).replace('{s0}',e[0].seriesName).replace('{s1}',e[1].seriesName);
                }
            },
            legend: {
                plain: 'scroll',
                orient: 'horizontal',
                position:'bottom'
            },
            grid:{
                containLabel:true,
                right:'15%'
            },
            toolbox: {
                orient:'horizontal',
                itemsize:20,
                itemGap:15,
                right:20,
                top:25,
                feature: {
                    dataView: {show: true, readOnly: false,title:'Vista',lang: ['Vista de Datos', 'Cerrar', 'Actualizar'] },
                    magicType: {show: true, type: ['line', 'bar'],title:{line:'Linea',bar:'Barra',stack:'Pila',tiled:'Teja'}},
                    restore: {show: true,title:'Restaurar'},
                    saveAsImage: {show: true,title:'Descargar'}
                },
                emphasis:{
                    iconStyle:{
                        textPosition:'top'
                    }
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
                    name:'Lempiras',
                    axisPointer: {
                        label: {
                            formatter: '{value} HNL'
                        }
                    }
                },
                {
                    type: 'value',
                    //name: '',
                    min: 0,
                    max: 100,/*
                    interval: 5,*/
                    axisLabel: {
                        //formatter: '{value} %'
                        show:false
                    },
                    position:'right',
                    axisTick : {show: false},
                    axisLine:{show:false},
                    splitLine:{show:false},
                    axisPointer: {
                        label: {
                            formatter: '{value} %'
                        }
                    }
                }
            ],
            series: [
                {
                    name:'Monto Pagado',
                    type:'bar',
                    data:datos.resultados.montopagos,
                    itemStyle:{
                        color: ObtenerColores('Pastel1')[1]
                    }
                },/*
                {
                    name:'Monto Devengado',
                    type:'bar',
                    data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    itemStyle:{
                        color: ObtenerColores('Pastel1')[3]
                    }
                },*/
                {
                    name:'Porcentaje en Relación al Año',
                    type:'line',
                    data:datos.resultados.promediopagos.map(function(e){return ObtenerNumero((ObtenerNumero(e)*100).toFixed(2))}),
                    symbol: 'circle',
                    symbolSize: 10,
                    lineStyle: {
                        normal: {
                            color: ObtenerColores('Pastel1')[9],
                            width: 4/*,
                            type: 'dashed'*/
                        }
                    },
                    itemStyle:{
                        color: ObtenerColores('Pastel1')[9]
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
                            color:ObtenerColores('Pastel1')[2],
                            width: 4
                        }
                    },
                    itemStyle:{
                        color: ObtenerColores('Pastel1')[2]
                    }
                }*/
            ]
        },
            media:[
                {
                    query:{
                        maxWidth:600
                    },
                    option:{
                        yAxis: [
                            {
                                type: 'value',
                                name: 'Monto',
                                min: 0,
                               /* max: 250,*/
                              //  interval: 10000000,
                                axisLabel: {
                                    formatter: '{value} HNL',
                                    rotate:65
                                },
                                name:'Lempiras',
                                axisPointer: {
                                    label: {
                                        formatter: '{value} HNL'
                                    }
                                }
                            },
                            {
                                type: 'value',
                                //name: '',
                                min: 0,
                                max: 100,/*
                                interval: 5,*/
                                axisLabel: {
                                    //formatter: '{value} %'
                                    show:false
                                },
                                position:'right',
                                axisTick : {show: false},
                                axisLine:{show:false},
                                splitLine:{show:false},
                                axisPointer: {
                                    label: {
                                        formatter: '{value} %'
                                    }
                                }
                            }
                        ],
                        tooltip: {
                            position:['0%','50%']
                        },
                        grid:{
                            left:0,
                            right:0
                        }
                    }
                }
            ]
        };
        grafico.setOption(opciones, true);
        console.dir(grafico)
    
        
        window.addEventListener("resize", function(){
            grafico.resize();
        });
        }).fail(function() {
          
          
    });
    
}


/*
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
                    dataView: {show: true, readOnly: false,title:'Vista',lang: ['Vista de Datos', 'Cerrar', 'Actualizar'] },
                    magicType: {show: true, type: ['line', 'bar'],title:'Seleccionar'},
                    restore: {show: true,title:'Restaurar'},
                    saveAsImage: {show: true,title:'Descargar'}
                }
            }
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
            }
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
                        width: 4/
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
                        width: 4
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
}*/

/*
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
                dataView: {show: true, readOnly: false,title:'Vista',lang: ['Vista de Datos', 'Cerrar', 'Actualizar'] },
                magicType: {show: true, type: ['line', 'bar'],title:'Seleccionar'},
                restore: {show: true,title:'Restaurar'},
                saveAsImage: {show: true,title:'Descargar'}
            }
        },
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
            }
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
}*/

function MontoPagosEtapas(){
    //app.title = '折柱混合';
    var parametros={}
        parametros=ObtenerJsonFiltrosAplicados(parametros);
        MostrarReloj('#montoPagosEtapas',true);
        $.get(api+"/dashboardsefin/etapaspago/",parametros).done(function( datos ) {
            console.dir('ETAPAS')
            console.dir(datos);
            OcultarReloj('#montoPagosEtapas');
    var grafico=echarts.init(document.getElementById('montoPagosEtapas'));
    var opciones = {
        baseOption:{
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                },
                formatter:  function (e){
                    return "{b0}<br>{a0} {c0} HNL, {p0}%".replace('{p0}',ValorNumerico(datos.resultados.porcentajes[e[0].dataIndex].toFixed(2) ) ).replace('{a0}',e[0].marker).replace('{b0}',e[0].name).replace('{c0}',ValorMoneda( e[0].value));
                    //return "{b0}<br>{a0} {c0} HNL, {p0}%".replace('{c0}',ValorMoneda(e[0].value) ).replace('{a0}',e[0].marker).replace('{b0}',e[0].name).replace('{p0}',((ObtenerNumero( e[0].value)/ObtenerNumero(Math.max.apply(null, [150000,80444,69000,72000])) *100)).toFixed(2));
                }
            },
            grid: {
                containLabel: true,
                left: '3%',
                right: '4%',
                bottom: '3%',
            },
            toolbox: {
                orient:'horizontal',
                itemsize:20,
                itemGap:15,
                right:20,
                top:25,
                feature: {
                    dataView: {show: true, readOnly: false,title:'Vista',lang: ['Vista de Datos', 'Cerrar', 'Actualizar'] },
                    magicType: {show: true, type: ['line', 'bar'],title:{line:'Linea',bar:'Barra',stack:'Pila',tiled:'Teja'}},
                    restore: {show: true,title:'Restaurar'},
                    saveAsImage: {show: true,title:'Descargar'}
                },
                emphasis:{
                    iconStyle:{
                        textPosition:'top'
                    }
                }
            },
    
    
            
            xAxis: [
                {
                    
                        type : 'value',
                        splitLine:{show:false},
                        axisLabel: {
                                formatter: function (e){
                                    
                                    return "{c} HNL ".replace('{c}',ValorMoneda( e) );
                                    //return "{c} %".replace('{c}',((ObtenerNumero( e)/ObtenerNumero(Math.max.apply(null, datos.resultados.montos)) *100)).toFixed(2));
                                    
                                },rotate:45,
                                showMinLabel:false
                            },/*
                            max:100,*/
                            
                        axisPointer: {
                            label: {
                                formatter: '{value} HNL'
                            }
                        }
                }
            ],
            yAxis: [
                
                
                {
                    type : 'category',
                    axisTick : {show: false},
                    axisLine:{show:false},
                    data : datos.resultados.series
                }
            ],
            series: [
                {
                   // name:'Etapa',
                    type:'bar',
                    data:datos.resultados.montos,
                    itemStyle:{
                        color: ObtenerColores('Pastel1')[3]
                    },
                    seriesLayoutBy: 'row',
                    label:{
                        show:true,
                        fontFamily:'Poppins',
                        fontWeight:700,
                        fontSize:20,
                        align:'right',
                        formatter:  function (e){
                            return "{c} HNL".replace('{c}',ValorMoneda( e.value));
                        }
                        //formatter: '{c} Días'
                    }
                }
            ]
        }
        ,
        media:[
            {
                query:{
                    maxWidth:600
                },
                option:{
                    xAxis: [
                        {
                            
                                type : 'value',
                                splitLine:{show:false},
                                axisLabel: {
                                        formatter: function (e){
                                            
                                            return "{c} HNL ".replace('{c}',ValorMoneda( e) );
                                            //return "{c} %".replace('{c}',((ObtenerNumero( e)/ObtenerNumero(Math.max.apply(null, datos.resultados.montos)) *100)).toFixed(2));
                                            
                                        },
                                        rotate:90,
                                        showMinLabel:false
                                    },/*
                                    max:100,*/
                                    
                                axisPointer: {
                                    label: {
                                        formatter: '{value} HNL'
                                    }
                                }
                        }
                    ],
                    yAxis: [
                        
                        
                        {
                            type : 'category',
                            axisTick : {show: false},
                            axisLine:{show:false},
                            axisLabel:{
                                rotate:65,
                                showMinLabel:false,
                                interval:0
                            },
                            data : datos.resultados.series,
                            
                        }
                    ],
                    series: [
                        {
                           // name:'Etapa',
                            type:'bar',
                            data:datos.resultados.montos,
                            itemStyle:{
                                color: ObtenerColores('Pastel1')[3]
                            },
                            seriesLayoutBy: 'row',
                            label:{
                                show:false,
                                fontFamily:'Poppins',
                                fontWeight:700,
                                fontSize:20,
                                align:'right',
                                formatter:  function (e){
                                    return "{c} HNL".replace('{c}',ValorMoneda( e.value));
                                }
                                //formatter: '{c} Días'
                            }
                        }
                    ],
                    tooltip: {
                        position:['0%','50%']
                    },
                    grid:{
                        left:0,
                        right:'10%'
                    }
                }
            }
        ]
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
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
        legend: {
            plain: 'scroll',
            orient: 'horizontal',
            position:'bottom'
            /*right: 10,
            top: 20,
            bottom: 20*//*,
            data: ['lengend data 1','lengend data 2','lengend data 3'],
    
            selected: [false,false,true]*/
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
                stack: 'Etapa',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320],
                itemStyle:{
                    color: ObtenerColores('Pastel1')[0]
                }
            },
            {
                name: 'Compromiso',
                type: 'bar',
                stack: 'Etapa',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120],
                itemStyle:{
                    color: ObtenerColores('Pastel1')[3]
                }

                
            },
            {
                name: 'Devengado',
                type: 'bar',
                stack: 'Etapa',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220],
                itemStyle:{
                    color: ObtenerColores('Pastel1')[3]
                }
            },
            {
                name: 'Transacciones',
                type: 'bar',
                stack: 'Etapa',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150],
                itemStyle:{
                    color: ObtenerColores('Pastel1')[2]
                }
            }
        ],
        label:{
            show:true,
            fontFamily:'Poppins',
            fontWeight:700,
            fontSize:25,
            align:'right',
            formatter:  function (e){
                return "{c} Días".replace('{c}',e.value);
            }
            //formatter: '{c} Días'
        },
        media:[
            {
                query:{
                    maxWidth:600
                },
                option:{
                    tooltip: {
                        position:['0%','50%']
                    },
                    grid:{
                        left:0,
                        right:0
                    }
                }
            }
        ]
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}


function Top10Compradores(){
    //app.title = '折柱混合';
    var parametros={}
        parametros=ObtenerJsonFiltrosAplicados(parametros);
        MostrarReloj('#top10Compradores',true);
        $.get(api+"/dashboardsefin/topcompradores/",parametros).done(function( datos ) {
            console.dir('COMPRADORES')
            console.dir(datos);
            OcultarReloj('#top10Compradores');
            var grafico=echarts.init(document.getElementById('top10Compradores'));
            var opciones = {
                baseOption:{
                    tooltip: {
                        show:true,
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                
                toolbox: {
                    orient:'horizontal',
                    itemsize:20,
                    itemGap:15,
                    right:20,
                    top:25,
                    feature: {
                        dataView: {show: true, readOnly: false,title:'Vista',lang: ['Vista de Datos', 'Cerrar', 'Actualizar'] },
                        magicType: {show: true, type: ['line', 'bar'],title:{line:'Linea',bar:'Barra',stack:'Pila',tiled:'Teja'}},
                        restore: {show: true,title:'Restaurar'},
                        saveAsImage: {show: true,title:'Descargar'}
                    },
                    emphasis:{
                        iconStyle:{
                            textPosition:'top'
                        }
                    }
                },/*
                    legend: {
                        data:['蒸发量1','降水量','平均温度3']
                    },*/
                    xAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} HNL',
                                rotate:45,
                            showMinLabel:false
                            },
                            axisPointer: {
                                label: {
                                    formatter: '{value} HNL'
                                }
                            }
                        }
                    ],
                    grid:{
                        containLabel:true,
                        //top:10,
                        right:'15%'
                    },
                    yAxis: [
                        {
                            
                            type: 'category',
                            data: datos.resultados.compradores.reverse(),
                            axisPointer: {
                                type: 'shadow'
                            },
                            align: 'right'
                        }
                    ],
                    series: [
                        {
                            name:'Monto Pagado',
                            type:'bar',
                            data:datos.resultados.montos.reverse(),
                            itemStyle:{
                                color: ObtenerColores('Pastel1')[9]
                            },
                            label: {
                                normal: {
                                    show:true,
                                        fontFamily:'Poppins',
                                        fontWeight:700,
                                        fontSize:15,
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
                        color:'gray'
                    }
                }
                ,
                media:[
                    {
                        query:{
                            maxWidth:600
                        },
                        option:{
                            xAxis: [
                                
                                {
                                    
                                    type: 'category',
                                    data: datos.resultados.compradores.reverse(),
                                    axisPointer: {
                                        type: 'shadow'
                                    },
                                    align: 'right',
                                    axisLabel:{
                                        rotate:90
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    axisLabel: {
                                        formatter: '{value} HNL',
                                        rotate:65,
                                    showMinLabel:false
                                    },
                                    axisPointer: {
                                        label: {
                                            formatter: '{value} HNL'
                                        }
                                    }
                                }
                            ],
                            series: [
                                {
                                    name:'Monto Pagado',
                                    type:'bar',
                                    data:datos.resultados.montos.reverse(),
                                    itemStyle:{
                                        color: ObtenerColores('Pastel1')[9]
                                    },
                                    label: {
                                        normal: {
                                            show:false,
                                                fontFamily:'Poppins',
                                                fontWeight:700,
                                                fontSize:11,
                                            position: 'right',
                                            formatter: function (e){
                                                return "{c} HNL".replace('{c}',ValorMoneda(e.value));
                                            }
                                        }
                                    },
                                    barWidth:20,
                                    barCategoryGap:'10%',
                                    barGap:'10%'
                                }
                            ],
                            tooltip: {
                                position:['0%','50%']
                            },
                            grid:{
                                left:0,
                                right:0
                            }
                        }
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


function Top10Proveedores(){
    //app.title = '折柱混合';
    var parametros={}
parametros=ObtenerJsonFiltrosAplicados(parametros);
MostrarReloj('#top10Proveedores',true);
                $.get(api+"/dashboardsefin/topproveedores/",parametros).done(function( datos ) {
                    console.dir('PROVEEDORES')
                    console.dir(datos);
                    OcultarReloj('#top10Proveedores');
                    var grafico=echarts.init(document.getElementById('top10Proveedores'));
                    var opciones ={
                        baseOption:{
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {           
                                    type : 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            toolbox: {
                                orient:'horizontal',
                                itemsize:20,
                                itemGap:15,
                                right:20,
                                top:25,
                                feature: {
                                    dataView: {show: true, readOnly: false,title:'Vista',lang: ['Vista de Datos', 'Cerrar', 'Actualizar'] },
                                    magicType: {show: true, type: ['line', 'bar'],title:{line:'Linea',bar:'Barra',stack:'Pila',tiled:'Teja'}},
                                    restore: {show: true,title:'Restaurar'},
                                    saveAsImage: {show: true,title:'Descargar'}
                                },
                                emphasis:{
                                    iconStyle:{
                                        textPosition:'top'
                                    }
                                }
                            },/*
                            legend: {
                                data: ['Precompromiso','Compromiso','Devengado','Transacciones']
                            },*/
                            grid: {
                                left: '3%',
                                right:'15%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis:  {
                                type: 'value',
                                /*min: 0,
                                max: 810,*/
                                //interval: 100000,
                                axisLabel: {
                                    formatter: '{value} HNL',
                                    rotate:45,
                            showMinLabel:false
                                },
                                axisPointer: {
                                    label: {
                                        formatter: '{value} HNL'
                                    }
                                }
                            },
                            yAxis: {
                                type: 'category',
                                data: datos.resultados.proveedores.reverse()
                            },
                            series: [
                                {
                                    name: 'Monto de Contrato, Pagados en HNL',
                                    type: 'bar',
                                    stack: 'Monto de Contrato',
                                    label: {
                                        normal: {
                                            show:true,
                                            fontFamily:'Poppins',
                                            fontWeight:700,
                                            fontSize:15,
                                            position: 'right',
                                            formatter: function (e){
                                                return "{c} HNL".replace('{c}',ValorMoneda(e.value));
                                            }
                                        }
                                    },
                                    data: datos.resultados.montos.reverse(),
                                    itemStyle:{
                                        color: ObtenerColores('Pastel1')[0]
                                    }
                                }
                            ],
                            label:{
                                color:'gray'
                            }
                        }
                        ,
                        media:[
                            {
                                query:{
                                    maxWidth:600
                                },
                                option:{
                                    xAxis:  {
                                        type: 'category',
                                        data: datos.resultados.proveedores.reverse(),
                                        axisLabel:{
                                            rotate:90
                                        }
                                    },
                                    yAxis: {
                                        type: 'value',
                                        axisLabel: {
                                            formatter: '{value} HNL',
                                            rotate:65,
                                    showMinLabel:false
                                        },
                                        axisPointer: {
                                            label: {
                                                formatter: '{value} HNL'
                                            }
                                        }
                                    },
                                    series: [
                                        {
                                            name: 'Monto de Contrato, Pagados en HNL',
                                            type: 'bar',
                                            stack: 'Monto de Contrato',
                                            label: {
                                                normal: {
                                                    show:false,
                                                    fontFamily:'Poppins',
                                                    fontWeight:700,
                                                    fontSize:15,
                                                    position: 'right',
                                                    formatter: function (e){
                                                        return "{c} HNL".replace('{c}',ValorMoneda(e.value));
                                                    }
                                                }
                                            },
                                            data: datos.resultados.montos.reverse(),
                                            itemStyle:{
                                                color: ObtenerColores('Pastel1')[0]
                                            }
                                        }
                                    ],
                                    tooltip: {
                                        position:['0%','50%']
                                    },
                                    grid:{
                                        left:0,
                                        right:0
                                    }
                                }
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
function Top10MontosProcesos(){
    
    var parametros={}
parametros=ObtenerJsonFiltrosAplicados(parametros);
MostrarReloj('#top10MontosProcesos',true);
                $.get(api+"/dashboardsefin/topobjetosgasto/",parametros).done(function( datos ) {
                    console.dir('OBJETOS')
                    console.dir(datos);
                    OcultarReloj('#top10MontosProcesos');
                    var grafico=echarts.init(document.getElementById('top10MontosProcesos'));
                    var opciones ={
                        baseOption:{

                        
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {           
                                type : 'cross',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        toolbox: {
                            orient:'horizontal',
                            itemsize:20,
                            itemGap:15,
                            right:20,
                            top:25,
                            feature: {
                                dataView: {show: true, readOnly: false,title:'Vista',lang: ['Vista de Datos', 'Cerrar', 'Actualizar'] },
                                magicType: {show: true, type: ['line', 'bar'],title:{line:'Linea',bar:'Barra',stack:'Pila',tiled:'Teja'}},
                                restore: {show: true,title:'Restaurar'},
                                saveAsImage: {show: true,title:'Descargar'}
                            },
                            emphasis:{
                                iconStyle:{
                                    textPosition:'top'
                                }
                            }
                        },/*
                        legend: {
                            data: ['Precompromiso','Compromiso','Devengado','Transacciones']
                        },*/
                        grid: {
                            left: '3%',
                            right:'15%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis:  {
                            type: 'value',
                            /*min: 0,
                            max: 810,*/
                            //interval: 100000,
                            axisLabel: {
                                formatter: '{value}',
                                rotate:45,
                        showMinLabel:false
                            },
                            axisPointer: {
                                label: {
                                    formatter: '{value}'
                                }
                            }
                        },
                        yAxis: {
                            type: 'category',
                            data: datos.resultados.objetosGasto.reverse()
                        },
                        label:{
                            color:'gray'
                        },
                        series: [
                            {
                                name: 'Cantidad de Pagos',
                                type: 'bar',
                                stack: 'Cantidad de Pagos',
                                label: {
                                    normal: {
                                        show:true,
                                    fontFamily:'Poppins',
                                    fontWeight:700,
                                    fontSize:15,
                                        position: 'right',
                                        formatter: function (e){
                                            return "{c}".replace('{c}',ValorNumerico(e.value));
                                        }
                                    }
                                },
                                data: datos.resultados.montos.reverse(),
                                itemStyle:{
                                    color: ObtenerColores('Pastel1')[2]
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
                        ]},
                        media:[
                            {
                                query:{
                                    maxWidth:600
                                },
                                option:{
                                    xAxis:  
                                    {
                                        type: 'category',
                                        data: datos.resultados.objetosGasto.reverse(),
                                        axisLabel:{
                                            rotate:90
                                        }
                                    },
                                    yAxis: {
                                        type: 'value',
                                        /*min: 0,
                                        max: 810,*/
                                        //interval: 100000,
                                        axisLabel: {
                                            formatter: '{value}',
                                            rotate:65,
                                            showMinLabel:false
                                        },
                                        axisPointer: {
                                            label: {
                                                formatter: '{value}'
                                            }
                                        }
                                    },
                                    series: [
                                        {
                                            name: 'Cantidad de Pagos',
                                            type: 'bar',
                                            stack: 'Cantidad de Pagos',
                                            label: {
                                                normal: {
                                                    show:false,
                                                fontFamily:'Poppins',
                                                fontWeight:700,
                                                fontSize:11,
                                                    position: 'right',
                                                    formatter: function (e){
                                                        return "{c}".replace('{c}',ValorNumerico(e.value));
                                                    }
                                                }
                                            },
                                            data: datos.resultados.montos.reverse(),
                                            itemStyle:{
                                                color: ObtenerColores('Pastel1')[2]
                                            }
                                        }
                                    ],
                                    tooltip: {
                                        position:['0%','50%']
                                    },
                                    grid:{
                                        left:0,
                                        right:0
                                    }
                                }
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
                    color: ObtenerColores('Pastel1')[9]
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
                    color: ObtenerColores('Pastel1')[3]
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
                    color: ObtenerColores('Pastel1')[2]/*function(e){
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
                    color: ObtenerColores('Pastel1')[1]/*function(e){
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
                    color: ObtenerColores('Pastel1')[0]/*function(e){
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
        $('.contenedorFiltrosBusqueda').toggle('slide');
        /*
        if($('.contenedorFiltrosBusqueda').hasClass('cerrado')){
          $('.contenedorFiltrosBusqueda').removeClass('cerrado');
          //$('.contenedorFiltrosBusqueda').show('slide', {direction: 'right'}, 1000);
          
        }else{
          $('.contenedorFiltrosBusqueda').addClass('cerrado');
          //$('.contenedorFiltrosBusqueda').hide('slide', {direction: 'left'}, 1000);
        }*/
      });
      $( window ).resize(function() {
       if($(window).width()>767){
        $('.contenedorFiltrosBusqueda').show();
       }
      });
    PanelInicialFiltros('#elastic-list');
    ObtenerFiltros();
    
    CargarGraficos();
    //CantidadPagosEtapas()
    
    //TiempoPromedioEtapas();

    
    
 
    //SegregacionMontosContratos();
    $('#quitarFiltros, #quitarFiltros2').on('click',function(e){
        PushDireccionGraficos(AccederUrlPagina({},true));
      });

   // VerificarIntroduccion('INTROJS_BUSQUEDA',1);
})
function CargarGraficos(){
    //$('.contenedorGrafico > .grafico').html('');

    $('.contenedorGrafico > .grafico').each(function(i,elemento){
        if(echarts.getInstanceByDom(elemento)){
            echarts.getInstanceByDom(elemento).clear();
        }
    });

    
    InicializarCantidadPagos();
    InicializarMontoPagos();
    Top10Proveedores();
    Top10Compradores();
    CargarCajonesMontos();
    CargarCajonesCantidad();
    MontoPagosEtapas();
    Top10MontosProcesos();
}


function CargarCajonesMontos(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardsefin/estadisticamontosdepagos/",parametros).done(function( datos ) {
console.dir(datos);
    $('#MontoPagosPromedio').attr('data-to',datos.resultados.promedio);
    $('#MontoPagosMenor').attr('data-to',datos.resultados.menor);
    $('#MontoPagosMayor').attr('data-to',datos.resultados.mayor);
    $('#MontoPagosTotal').attr('data-to',datos.resultados.total);
/*
$('.conteo.moneda').countTo({
    formatter: function (value, options) {
      value = value.toFixed(2);
      value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return value;
  }
  });*/

  $('.conteo.moneda').each(function(index,elemento){
    $(elemento).countTo({
        formatter: function (value, options) {
            value = value.toFixed(2/*options.decimals*/);
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return value;
        },
        from: 0, to: $(elemento).attr('data-to'),'data-speed':$(elemento).attr('data-speed')
      });
  });
  }).fail(function() {
      
      
    });
}

function CargarCajonesCantidad(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardsefin/estadisticacantidaddepagos/",parametros).done(function( datos ) {
    console.dir('cantidad***')
console.dir(datos);
    $('#CantidadPagosPromedio').attr('data-to',datos.resultados.promedio);
    $('#CantidadPagosPromedio').parent().css({'color':ObtenerColores('Pastel1')[1]});
    $('#CantidadPagosMenor').attr('data-to',datos.resultados.menor);
    $('#CantidadPagosMenor').parent().css({'color':ObtenerColores('Pastel1')[1]});
    $('#CantidadPagosMayor').attr('data-to',datos.resultados.mayor);
    $('#CantidadPagosMayor').parent().css({'color':ObtenerColores('Pastel1')[1]});
    $('#CantidadPagosTotal').attr('data-to',datos.resultados.total);
    $('#CantidadPagosTotal').parent().css({'color':ObtenerColores('Pastel1')[1]});
/*
    $('.conteo').not('.moneda').countTo({
        formatter: function (value, options) {
            value = value.toFixed(options.decimals);
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return value;
        },
        from: 0, to: 500
      });*/
      $('.conteo').not('.moneda').each(function(index,elemento){
        $(elemento).countTo({
            formatter: function (value, options) {
                value = value.toFixed(options.decimals);
                value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return value;
            },
            from: 0, to: $(elemento).attr('data-to'),'data-speed':$(elemento).attr('data-speed')
          });
      });
  }).fail(function() {
      
      
    });
}


function ObtenerFiltros(){
    
    var parametros=ObtenerJsonFiltrosAplicados({});
    $.get(api+"/dashboardsefin/filtros/",parametros).done(function( datos ) {
        console.dir('FILTROS')
        console.dir(datos)
/*
        if(datos.respuesta.pagos){
            datos.respuesta['años']=datos.respuesta.pagos['años'];
            datos.respuesta['monedas']=datos.respuesta.pagos['monedas'];
            datos.respuesta['proveedores']=datos.respuesta.pagos['proveedores'];
            delete datos.respuesta.pagos;
            delete datos.respuesta.objetosGasto;
            //delete datos.respuesta.instituciones;
            //delete datos.respuesta.fuentes;

        }*/
        if(datos.respuesta.objetosGasto){
            delete datos.respuesta.objetosGasto;
        }
      
       
  
    MostrarListaElastica(datos,'#elastic-list');
    MostrarEtiquetaListaElasticaAplicada();
    MostrarListaElasticaAplicados();
 // }
  
  
      
        
      }).fail(function() {
          
          
        });

}




function ObtenerJsonFiltrosAplicados(parametros){
    if(Validar(ObtenerValor('moneda'))){
        parametros['moneda']=decodeURIComponent(ObtenerValor('moneda'));
    }
    if(Validar(ObtenerValor('institucion'))){
    parametros['institucion']=decodeURIComponent(ObtenerValor('institucion'));
    }
    if(Validar(ObtenerValor('año'))){
      parametros['año']=decodeURIComponent(ObtenerValor('año'));
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
    if(Validar(ObtenerValor('masinstituciones'))){
        parametros['masinstituciones']=decodeURIComponent(ObtenerValor('masinstituciones'));
    }
    if(Validar(ObtenerValor('masproveedores'))){
        parametros['masproveedores']=decodeURIComponent(ObtenerValor('masproveedores'));
    }

    return parametros;
  }

  function AccederUrlPagina(opciones,desUrl){
    var direccion=('/tableroProcesosPago/?'+
    (ValidarCadena(opciones.moneda)? '&moneda='+encodeURIComponent(opciones.moneda): (ValidarCadena(ObtenerValor('moneda'))&&!desUrl?'&moneda='+ObtenerValor('moneda'):''))+
    (ValidarCadena(opciones.institucion)? '&institucion='+encodeURIComponent(opciones.institucion): (ValidarCadena(ObtenerValor('institucion'))&&!desUrl?'&institucion='+ObtenerValor('institucion'):''))+
   
    (ValidarCadena(opciones.año)? '&año='+encodeURIComponent(opciones.año): (ValidarCadena(ObtenerValor('año'))&&!desUrl?'&año='+ObtenerValor('año'):''))+
    (ValidarCadena(opciones.proveedor)? '&proveedor='+encodeURIComponent(opciones.proveedor): (ValidarCadena(ObtenerValor('proveedor'))&&!desUrl?'&proveedor='+ObtenerValor('proveedor'):''))+
    (ValidarCadena(opciones.fuentefinanciamiento)? '&fuentefinanciamiento='+encodeURIComponent(opciones.fuentefinanciamiento): (ValidarCadena(ObtenerValor('fuentefinanciamiento'))&&!desUrl?'&fuentefinanciamiento='+ObtenerValor('fuentefinanciamiento'):''))+
    (ValidarCadena(opciones.objetosgasto) ? '&objetosgasto='+encodeURIComponent(opciones.objetosgasto):(ValidarCadena(ObtenerValor('objetosgasto'))&&!desUrl?'&objetosgasto='+ObtenerValor('objetosgasto'):''))+
    (ValidarCadena(opciones.masproveedores) ? '&masproveedores='+encodeURIComponent(opciones.masproveedores):(ValidarCadena(ObtenerValor('masproveedores'))&&!desUrl?'&masproveedores='+ObtenerValor('masproveedores'):''))+
    (ValidarCadena(opciones.masinstituciones) ? '&masinstituciones='+encodeURIComponent(opciones.masinstituciones):(ValidarCadena(ObtenerValor('masinstituciones'))&&!desUrl?'&masinstituciones='+ObtenerValor('masinstituciones'):''))
  
    );
    return direccion;
  }
  function PushDireccionGraficos(direccion){
    window.history.pushState({}, document.title,direccion);
    ObtenerFiltros();
    CargarGraficos();
  }
  
  function MostrarEtiquetasFiltrosAplicados(parametros){
    delete parametros.masinstituciones;
    delete parametros.masproveedores;
    if(!$.isEmptyObject(parametros)){
      $('#contenedorSinFiltros').hide();
      $('#contenedorFiltros').show();
    }else{
      $('#contenedorFiltros').hide();
      $('#contenedorSinFiltros').show();
    }
    $('#listaFiltrosAplicados,#extencionFiltrosAplicados').html('');
    $.each(parametros,function(llave,filtro){
      $('#listaFiltrosAplicados,#extencionFiltrosAplicados').append(
        $('<div>',{class:'grupoEtiquetaFiltro col-md-12x mb-1x',style:'display:inline-block'}).append(
          $('<div>',{class:'grupoEtiquetaTitulo mr-1',text:filtrosAplicablesR[llave].titulo +':'}),
          $('<div>',{class:'filtrosAplicados'}).append(
            $('<div>',{class:'etiquetaFiltro','llave':llave,'valor':filtro}).append(
                (traducciones[filtro]?traducciones[filtro].titulo:filtro),
              '&nbsp;',
              $('<i>',{class:'fas fa-times'}).on('click',function(e){
                var filtros=ObtenerJsonFiltrosAplicados({});
                //$('li.list-group-item.active')
                /*$.each(filtros,function(cla,val){
                  filtros[filtrosAplicablesR[$(val).attr('llave')]?filtrosAplicablesR[$(val).attr('llave')].parametro:'' ]=$(val).attr('valor');
                });*/
                delete filtros[filtrosAplicablesR[$(e.currentTarget).parent().attr('llave')]?$(e.currentTarget).parent().attr('llave'):''];

                PushDireccionGraficos(AccederUrlPagina(filtros,true));
                $('.etiquetaFiltro[llave="'+$(e.currentTarget).parent().attr('llave')+'"]').parent().prev().remove();
                $('.etiquetaFiltro[llave="'+$(e.currentTarget).parent().attr('llave')+'"]').parent().remove();
              })
            )
          )
        )
      );
    });
    $('.filtrosContenedoFiltrosBusqueda').attr('style','height:calc(100vh - '+($('#extencionFiltrosAplicados').height()?123:110)+'px - '+($('#extencionFiltrosAplicados').height() + ($('#extencionFiltrosAplicados').height()?4:0))+'px)')

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
        if(filtrosAplicablesR[llave]){
            $('ul#ul'+ filtrosAplicablesR[llave].parametro ).find(
                'li[valor="'+(valor).toString()+'"]'
                //'li[formato="'+((traducciones[valor]?traducciones[valor].titulo:valor)).toString().toLowerCase()+'"]'
              ).addClass('active');
        }
      
    });
  }

  function MostrarListaElastica(datos,selector){
    $(selector).html('');
    var arregloFiltros=[];
    $.each(datos.respuesta,function(llave,valor){
        arregloFiltros.push({
            'posicion':ordenFiltros.includes(llave)?ordenFiltros.indexOf(llave):99,
            'llave':llave,
            'valor':valor
        });
    });
    arregloFiltros=arregloFiltros.sort(function(a, b){return a.posicion - b.posicion;});
    $.each(arregloFiltros,function(indice,elemento){

      $(selector).append(
        $('<div class="list-container col-md-12 2">').append(
          $('<div class="panel panel-default ">').append(
            $('<div class="panel-heading">').text(
              filtrosAplicables[elemento.llave]?filtrosAplicables[elemento.llave].titulo:elemento.llave
            ),
            $('<input>',{type:'text', class:'elastic-filter',placeholder:filtrosAplicables[elemento.llave]?filtrosAplicables[elemento.llave].titulo:elemento.llave ,filtro:elemento.llave,on:{
              keyup:function(e){
                var texto=$(e.currentTarget).val();
                if (texto.length > 0) {
                  texto = texto.toLocaleLowerCase();
                  var regla = " ul#" + 'ul'+elemento.llave + ' li[formato*="' + texto + '"]{display:block;} ';
                  regla += " ul#" + 'ul'+elemento.llave + ' li:not([formato*="' + texto + '"]){display:none;}';
                  $('#style'+elemento.llave).html(regla);
                } else {
                  $('#style'+elemento.llave).html('');
                }
              }
            }}),
            $('<style>',{id:'style'+elemento.llave}),
            $('<ul >',{class:'list-group',id:'ul'+elemento.llave}).append(
              AgregarPropiedadesListaElastica(elemento.valor,elemento.llave)
            ),
            ['instituciones','proveedores'].includes(elemento.llave)&&elemento.valor&&elemento.valor.buckets&&elemento.valor.buckets.length>=50?
              $('<a>',{
                class:'enlaceTablaGeneral ptextoColorPrimario pcursorMano',
                href:'javascript:void(0)',
                style:'width:150px;padding:5px 15px',
                text: elemento.valor.buckets.length==50? 'Mostrar Todos...':'Mostrar Menos...',
                toolTexto:elemento.valor.buckets.length==50?'Mostrar más resultados':'Mostrar menos resultados',
                toolCursor:'true',
                llave:elemento.llave,
                on:{
                  click:MostrarMasResultados
                }
              })
            :null
              
            
          )
        )
      );
      
      
    });
    AgregarToolTips();
    
    
  }
function MostrarMasResultados(e){
    switch($(e.currentTarget).attr('llave')){
        case 'instituciones':
                var filtros=ObtenerJsonFiltrosAplicados({});
                if(filtros.masinstituciones){
                    delete filtros.masinstituciones;
                }else{
                    filtros['masinstituciones']=1;
                }
                PushDireccionGraficos(AccederUrlPagina(filtros,true));

            break;
        case 'proveedores':
                var filtros=ObtenerJsonFiltrosAplicados({});
                if(filtros.masproveedores){
                    delete filtros.masproveedores;
                }else{
                    filtros['masproveedores']=1;
                }
                PushDireccionGraficos(AccederUrlPagina(filtros,true));
            break;
        default:
            break;
    }
}


  
function AgregarPropiedadesListaElastica(valor,llave){
    var elementos=[]
    $.each(valor.buckets,function(i,propiedades){
      //resultadosElastic=AsignarValor(resultadosElastic,llave,,propiedades.doc_count);
      elementos.push(
        $('<li >',{
        class:'list-group-item',
        valor:propiedades.key_as_string?propiedades.key_as_string:propiedades.key, 
        formato: (propiedades.key_as_string?propiedades.key_as_string:(traducciones[propiedades.key]?traducciones[propiedades.key].titulo:propiedades.key)).toString().toLowerCase(),'llave':llave,
        toolTexto:propiedades.key_as_string?propiedades.key_as_string:(traducciones[propiedades.key]?traducciones[propiedades.key].titulo:propiedades.key),
        toolCursor:'true',
        on:{
          click:function(e){
            var filtro=$(e.currentTarget);
            if(filtro.hasClass('active')){
              filtro.removeClass('active')
            }else{
              filtro.parent().find('.list-group-item.active').removeClass('active');
              filtro.addClass('active');
            }
            /*
            var filtros={
            };
            $('li.list-group-item.active').each(function(cla,val){
              filtros[filtrosAplicables[$(val).attr('llave')]?filtrosAplicables[$(val).attr('llave')].parametro:'' ]=$(val).attr('valor');
            });*/
            $('li.list-group-item').not('.active').remove();
            $( '.list-group' ).not(':has(li)').append(
                $('<li >',{
                    class:'list-group-item animated fadeIn noEncima'
                }
                ).append(
                    $('<div>',{class:'badge',style:'background:transparent'}).append($('<img>',{src:'/static/img/otros/loaderFiltros.svg',style:'height:20px'})),
                    $('<div>',{
                    class:'elastic-data cargandoElementoLista',
                    text:'Cargando'}
                    )
                  )
            );
            //PushDireccionGraficos(AccederUrlPagina(filtros,true));



            var filtros=ObtenerJsonFiltrosAplicados({});
            if(filtro.hasClass('active')){
                filtros[filtrosAplicables[$(e.currentTarget).attr('llave')]?filtrosAplicables[$(e.currentTarget).attr('llave')].parametro:'']=$(e.currentTarget).attr('valor');
                console.dir(filtrosAplicables[$(e.currentTarget).attr('llave')])
                console.dir($(e.currentTarget).attr('valor'));
                console.dir(JSON.stringify(filtros))
              }else{
                delete filtros[filtrosAplicables[$(e.currentTarget).attr('llave')]?filtrosAplicables[$(e.currentTarget).attr('llave')].parametro:''];
              }
            PushDireccionGraficos(AccederUrlPagina(filtros,true));
          }
        }}).append(
          $('<div class="badge">').text(/*(Validar(propiedades.pagos)&&Validar(propiedades.pagos.doc_count))?propiedades.pagos&&propiedades.pagos.doc_count:*/ ValorNumerico(propiedades.doc_count)),
          $('<div >',{
          class:'elastic-data',
          
          text:propiedades.key_as_string?propiedades.key_as_string:(traducciones[propiedades.key]?traducciones[propiedades.key].titulo:propiedades.key)}
          )
        )
      )
    });
    return elementos;
  }
  
  function PanelInicialFiltros(selector){
      $(selector).html('')
    $.each(ordenFiltros,function(indice,elemento){

        $(selector).append(
          $('<div class="list-container col-md-12 2 animated fadeIn">').append(
            $('<div class="panel panel-default ">').append(
              $('<div class="panel-heading">').text(
                filtrosAplicables[elemento]?filtrosAplicables[elemento].titulo:elemento
              ),
              $('<input>',{type:'text', class:'elastic-filter',placeholder:filtrosAplicables[elemento]?filtrosAplicables[elemento].titulo:elemento ,filtro:elemento}),
              //$('<style>',{id:'style'+elemento.llave}),
              $('<ul >',{class:'list-group',id:'ul'+elemento}).append(
                $('<li >',{
                    class:'list-group-item animated fadeIn noEncima'
                }
                ).append(
                    $('<div>',{class:'badge',style:'background:transparent'}).append($('<img>',{src:'/static/img/otros/loaderFiltros.svg',style:'height:20px'})),
                    $('<div>',{
                    class:'elastic-data cargandoElementoLista',
                    text:'Cargando'}
                    )
                  )
              )
                
              
            )
          )
        );
        
        
      });
  }