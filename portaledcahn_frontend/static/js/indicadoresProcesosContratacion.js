
function InicializarCantidadProcesos(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('cantidadProcesos'));
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
                data: ['Compra Menor','Licitación privada','Licitación pública nacional','Licitación pública nacional','Concurso público nacional','Concurso Privado','Concurso Publico Internacional','Contratación Directa'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel:{
                    interval:0,
                    rotate:85,
                    showMinLabel:false,
                    padding:[0,0,0,0]
                },
                //boundaryGap:false,
                scale: true,
                barGap:'0',
                barCategoryGap: '0',
                nameGap:"0",
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                  //  interval: 8,
                    inside: false,
                    length: 5,
                    padding:0
                }
                ,padding:0
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Cantidad de Contratos',/*
                min: 0,
                max: 250,
                interval: 50,*/
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: 'Monto de Contratos',/*
                min: 0,
                max: 25,
                interval: 5,*/
                axisLabel: {
                    formatter: '{value} HNL'
                }
            }
        ],
        series: [
            {
                name:'Cantidad de Contratos',
                type:'bar',
                data:[2, 4, 7, 23, 25, 76, 135, 162, 40, 90, 6, 110],
                itemStyle:{
                    color: '#DA517A'
                },
                barMaxWidth:20,
                barGap:'0%',
                barCategoryGap: '0%',
                padding:0
            },
            {
                name:'Monto de Contratos',
                type:'bar',
                //yAxisIndex: 1,
                data:[4, 4.5, 25, 26, 27, 80, 150, 35, 23.5, 23, 6.5, 6.2],
                itemStyle:{
                    color: '#27AEB4'
                },
                yAxisIndex: 1,
                barMaxWidth:20,
                barGap:'0%',
                barCategoryGap: '0%',
                padding:0

                
            }
        ],
        grid:{
            containLabel:true
        }
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}







function CantidadContratosCategoriaCompra(){
    var grafico=echarts.init(document.getElementById('CantidadContratosCategoriaCompra'));
    var opciones = {
        /*title : {
            text: '同名数量统计',
            subtext: '纯属虚构',
            x:'center'
        },*/
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20/*,
            data: ['lengend data 1','lengend data 2','lengend data 3'],
    
            selected: [false,false,true]*/
        },
        series : [
            {
                name: 'Cantidad de Contratos por Categoría de Compra',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: [{name:'Obras',value: 20},{name:'Bienes',value: 40},{name:'Servicios',value: 60}],
                itemStyle: {
                    color: function(e){
                        var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A'];
                        return colores[e.dataIndex];
                    },//['#57C5CB','#DA517A','#FECB7E','#F79A6A'],
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        grid:{
            containLabel:true
        }
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}

function MontoContratosCategoriaCompra(){
    var grafico=echarts.init(document.getElementById('MontoContratosCategoriaCompra'));
    var opciones = {
        /*title : {
            text: '同名数量统计',
            subtext: '纯属虚构',
            x:'center'
        },*/
        tooltip : {
            trigger: 'item',
            formatter:  function (e){
                return "{a} <br/>{b}: {c} HNL ({d}%)".replace('{d}',e.percent).replace('{a}',e.seriesName).replace('{b}',e.name).replace('{c}',ValorMoneda(e.value));
            }
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20/*,
            data: ['lengend data 1','lengend data 2','lengend data 3'],
    
            selected: [false,false,true]*/
        },
        series : [
            {
                name: 'Monto de Contratos por Categoría de Compra',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: [{name:'Obras',value: 60912},{name:'Bienes',value: 50928},{name:'Servicios',value: 73490}],
                itemStyle: {
                    color: function(e){
                        var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A'];
                        return colores[e.dataIndex];
                    },//['#57C5CB','#DA517A','#FECB7E','#F79A6A'],
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        grid:{
            containLabel:true
        }
    };
    grafico.setOption(opciones, true);

    
    window.addEventListener("resize", function(){
        grafico.resize();
    });
}


/*
,
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
        ]
*/
function Top10InstitucionesMontos(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('top10InstitucionesMontos'));
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
                },
                position:'bottom'
            },
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
                position:'top'
            }
        ],
        yAxis: [
            {
                
                type: 'category',
                data: ['Secretaria de Salud Pública','Empresa Nacional de Energía Eléctrica','Empresa Hondureña de Telecomunicaciones','Secretaría de Defensa Nacional'
            ,'Instituto Hondureño de Seguridad Social','Consejo Nacional Supervisor de Cooperativas','Instituto Nacional de Previsión del Magisterio','Secretaría de Desarrollo Económico','Direccion de la Marina Mercante','Fondo Hondureño de Inversión Social'],
                axisPointer: {
                    type: 'shadow'
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
                name:'Monto Contratado',
                type:'bar',
                data:[150000,80444,69000,72000,64248,93734,99214,92792,4351,97934],
                itemStyle:{
                    color: '#DA517A'
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
            },
            {
                name:'Cantidad de Contratos',
                type:'line',
                //yAxisIndex: 1,
                data:[9000,90444,59000,82000,54248,63734,79214,72792,3351,87934],
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: '#57C5CB',
                        width: 4/*,
                        type: 'dashed'*/
                    }
                },
                itemStyle:{
                    color: '#57C5CB'
                },
                xAxisIndex: 1
            }
        ],
        grid:{
            containLabel:true
        },
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



function MontoCatalogoElectronico(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('montoCatalogoElectronico'));
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
                },
                position:'top'
            },
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                },
                position:'bottom'
            }
        ],
        yAxis: [
            {
                
                type: 'category',
                data: ['Útiles de Oficina','Alimentos y Bebidas','Bienes Infórmaticos','Elementos de Limpieza y Aseo Personal','Impresoras y Escáneres','Llantas y Cámaras De Aire','Material Médico Quirúrgico','Tintas y Tóner','Lubricantes para Vehículo','Fondo Hondureño de Inversión Social'],
                axisPointer: {
                    type: 'shadow'
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
                name:'Monto de Contrato',
                type:'bar',
                data:[150000,80444,69000,72000,64248,93734,99214,92792,4351,97934],
                itemStyle:{
                    color: '#FECB7E'
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
            },
            {
                name:'Cantidad de Contratos',
                type:'line',
                //yAxisIndex: 1,
                data:[9000,90444,59000,82000,54248,63734,79214,72792,3351,87934],
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: '#57C5CB',
                        width: 4/*,
                        type: 'dashed'*/
                    }
                },
                itemStyle:{
                    color: '#57C5CB'
                },
                xAxisIndex: 1
            }
        ],
        grid:{
            containLabel:true
        },
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
    InicializarCantidadProcesos();
    
    CantidadContratosCategoriaCompra();
    MontoContratosCategoriaCompra();
    Top10InstitucionesMontos();
    MontoCatalogoElectronico();
    //InicializarConteo()
    view = new ElasticList({
        el: $("#elastic-list"),
        data: dataElastic,
        hasFilter: true,
        onchange: function (filters) {
        },
        columns: [
            {
              title: "Selección",
                attr: "selection"
            },{
                title: "Categoría",
                attr: "category"
            },
            {
                title: "Institución",
                attr: "name"
            }, {
                title: "Año",
                attr: "year"
            },{
              title: "Moneda",
                attr: "coin"
            } ]
    });
})