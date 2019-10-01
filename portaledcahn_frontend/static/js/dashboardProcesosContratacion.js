
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
                data: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
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
                name:'Cantidad de Procesos de Contratación',
                type:'bar',
                data:[2, 4, 7, 23, 25, 76, 135, 162, 40, 90, 6, 110],
                itemStyle:{
                    color: '#58C5CC'
                }
            },
            {
                name:'Cantidad de Procesos en Promedio',
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


function InicializarMontoProcesos(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('montoProcesos'));
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
                name:'Monto de Procesos de Contratación',
                type:'bar',
                data:[6, 5, 10, 27, 28, 80, 200, 16, 39, 25, 7, 8],
                itemStyle:{
                    color: '#D9527B'
                }
            },
            {
                name:'Monto Promedio de Procesos de Contratación',
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



function CantidadProcesosEtapas(){
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


function CantidadProcesosEtapas(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('CantidadProcesosEtapas'));
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
                data: ['Planeación','Licitación','Adjudicación','Contrato'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
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
                name: 'Planeación',
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
                name: 'Licitación',
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
                name: 'Adjudicación',
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
                name: 'Contrato',
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

function CantidadProcesosCategoriaCompra(){
    var grafico=echarts.init(document.getElementById('CantidadProcesosCategoriaCompra'));
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
                name: 'Cantidad de Procesos por Categoría de Compra',
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

function MontoProcesosCategoriaCompra(){
    var grafico=echarts.init(document.getElementById('MontoProcesosCategoriaCompra'));
    var opciones = {
        /*title : {
            text: '同名数量统计',
            subtext: '纯属虚构',
            x:'center'
        },*/
        tooltip : {
            trigger: 'item',
            formatter:  function (e){
                console.dir(e)
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
                name: 'Monto de Procesos por Categoría de Compra',
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

function CantidadProcesosMetodoContratacion(){
    var grafico=echarts.init(document.getElementById('CantidadProcesosMetodoContratacion'));
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
                name: 'Cantidad de Procesos por Método de Contratación',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: [{name:'Compra Menor',value: 20},{name:'Licitación Privada',value: 40},{name:'Licitación Pública Nacional',value: 60},{name:'Concurso Público Nacional',value: 60}],
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
                },
                grid:{
                    containLabel:true
                },
                formatter: '{c}'
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
function MontoProcesosMetodoContratacion(){
    var grafico=echarts.init(document.getElementById('MontoProcesosMetodoContratacion'));
    var opciones = {
        /*title : {
            text: '同名数量统计',
            subtext: '纯属虚构',
            x:'center'
        },*/
        tooltip : {
            trigger: 'item',
            formatter: function (e){
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
                name: 'Monto de Procesos por Método de Contratación',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: [{name:'Compra Menor',value: 50978},{name:'Licitación Privada',value: 79784},{name:'Licitación Pública Nacional',value: 789556},{name:'Concurso Público Nacional',value: 75892}],
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
                },grid:{
                    containLabel:true
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



function Top10Proveedores(){
    //app.title = '折柱混合';
    var grafico=echarts.init(document.getElementById('top10Proveedores'));
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
        yAxis: [
            {
                
                type: 'category',
                data: ['Centro de Inmunodiagnostico Especializado, S. de R.L.','QUALITY , SISTEMAS Y REACTIVOS SOCIEDAD DE RESPONSAILIDAD LIMITADA','INFINITE TRAVEL GROUP S DE R L','Cash Business, S. de R. L.','Yip Supermercados, S. A. de C. V.','DISTRIBUIDORA CHOROTEGA','JETSTEREO S.A DE C.V.','INDUFESA','PACASA','LICONA AUTOREPUESTOS'],
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
            },
            {
                name:'Cantidad de Procesos en Promedio',
                type:'line',
                //yAxisIndex: 1,
                data:[9000,90444,59000,82000,54248,63734,79214,72792,3351,87934],
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



function Top10Proveedores2(){
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
        ]
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
            name:'Obras',
            value:181827,
            children: [
                {
                    name: 'Empresa Hondureña de Telecomunicaciones',            // First tree
                    value: 40406,
                    children: [{
                        name: 'Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                        value: 4
                    },{
                        name: 'Energía Eléctrica',       // Son of first tree
                        value: 20,
                    },{
                        name: 'Pasajes Nacionales',       // Son of first tree
                        value: 20
                    }]
                },
                {
                    name: 'Secretaría de Defensa Nacional',            // Second tree
                    value: 60609,
                    children: [{
                        name: 'Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                        value: 4
                    },{
                        name: 'Energía Eléctrica',       // Son of first tree
                        value: 20,
                    },{
                        name: 'Pasajes Nacionales',       // Son of first tree
                        value: 20
                    }]
                }, 
                {
                    name: 'Secretaria de Salud Pública',            // Second tree
                    value: 80812,
                    children: [{
                        name: 'Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                        value: 4
                    },{
                        name: 'Energía Eléctrica',       // Son of first tree
                        value: 20,
                    },{
                        name: 'Pasajes Nacionales',       // Son of first tree
                        value: 20
                    }]
                }
            ],
            itemStyle: {
                color: '#FECB7E'/*function(e){
                    var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A'];
                    return e.dataIndex<colores.length?colores[e.dataIndex]:colores[0];
                }*/
            }
            },
            {
            name:'Bienes',
            value:90912,
            children:[
                {
                    name: 'Instituto Hondureño de Seguridad Social',            // Second tree
                    value: 90912,
                    children: [{
                        name: 'Energía Eléctrica',       // Son of first tree
                        value: 20,
                        children: [{
                            name: 'Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                            value: 4
                        },{
                            name: 'Energía Eléctrica',       // Son of first tree
                            value: 20,
                        },{
                            name: 'Pasajes Nacionales',       // Son of first tree
                            value: 20
                        }]
                    }]
                }
            ],
            itemStyle: {
                color: '#DA517A'/*function(e){
                    var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A'];
                    return e.dataIndex<colores.length?colores[e.dataIndex]:colores[0];
                }*/
            }
            },
            {
            name:'Servicios',
            value:181825,
            children:[
                {
                    name: 'Empresa Nacional de Energía Eléctrica',            // Second tree
                    value: 181825,
                    children: [{
                        name: 'Energía Eléctrica',       // Son of first tree
                        value: 20,
                        children: [{
                            name: 'Mantenimiento y Reparación de Equipos y Medios de Transporte',       // First leaf of first tree
                            value: 4
                        },{
                            name: 'Energía Eléctrica',       // Son of first tree
                            value: 20,
                        },{
                            name: 'Pasajes Nacionales',       // Son of first tree
                            value: 20
                        }]
                    }]
                }
            ],
            itemStyle: {
                color: '#57C5CB'}
             
            }
        ]
        }],
        grid:{
            containLabel:true
        },
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
    InicializarCantidadProcesos();
    InicializarMontoProcesos();
    
    CantidadProcesosCategoriaCompra();
    CantidadProcesosMetodoContratacion();
    MontoProcesosCategoriaCompra();
    MontoProcesosMetodoContratacion();
    TiempoPromedioEtapas();
    CantidadProcesosEtapas();
    Top10Proveedores();
    Top10Compradores();
    SegregacionMontosContratos();
    InicializarConteo()
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