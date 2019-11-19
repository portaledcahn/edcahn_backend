var filtrosAplicables={
    monedas: {titulo:'Moneda',parametro:'moneda'},
    instituciones: {titulo:'Institución Compradora',parametro:'idinstitucion'},
    años: {titulo:'Año',parametro:'año'},
    proveedores: {titulo:'Proveedor',parametro:'proveedor'},
    categorias: {titulo:'Categoría de Compra',parametro:'categoria'},
    modalidades : {titulo:'Modalidad de Compra',parametro:'modalidad'},
    sistemas :{titulo:'Sistema de Origen', parametro: 'sistema'}
    
  };
  var filtrosAplicablesR={
    moneda: {titulo:'Moneda',parametro:'monedas'},
    idinstitucion: {titulo:'Institución Compradora',parametro:'instituciones'},
    año: {titulo:'Año',parametro:'años'},
    proveedor: {titulo:'Proveedor',parametro:'proveedores'},
    modalidad: {titulo:'Modalidad de Compra',parametro:'modalidades'},
    categoria : {titulo:'Categoría de Compra',parametro:'categorias'},
    sistema: {titulo:'Sistema de Origen', parametro:'sistemas'}
  };
  var traducciones={
    'goods':{titulo:'Bienes y provisiones',descripcion:'El proceso de contrataciones involucra bienes o suministros físicos o electrónicos.'},
    'works':{titulo:'Obras',descripcion:'El proceso de contratación involucra construcción reparación, rehabilitación, demolición, restauración o mantenimiento de algún bien o infraestructura.'},
    'services':{titulo:'Servicios',descripcion:'El proceso de contratación involucra servicios profesionales de algún tipo, generalmente contratado con base de resultados medibles y entregables. Cuando el código de consultingServices está disponible o es usado por datos en algún conjunto da datos en particular, el código de servicio sólo debe usarse para servicios no de consultoría.'},
    'consultingServices':{titulo:'Servicios de consultoría',descripcion:'Este proceso de contratación involucra servicios profesionales provistos como una consultoría.'},
    'tender':{titulo:'Licitación',descripcion:'Provee información sobre una nueva licitación (llamado a propuestas). La entrega de licitación debe contener detalles de los bienes o servicios que se buscan.'},
    'awards':{titulo:'Adjudicación',descripcion:'Da información sobre la adjudicación de un contrato. Estarán presentes una o más secciones de adjudicación, y la sección de licitación puede estar poblada con detalles del proceso que llevó a la adjudicación.'},
    'contracts':{titulo:'Contrato',descripcion:'Da información sobre los detalles de un contrato que ha entrado, o entrará, en vigencia. La sección de licitación puede ser poblada con detalles del proceso que lleva al contrato, y la sección de adjudicación puede tener detalles sobre la adjudicación sobre la '},
    'planning':{
        titulo:'Planeación',
        descripcion:'Se propone o planea un proceso de contratación. La información en la sección de licitación describe el proceso propuesto. El campo tender.status debe de usarse para identificar si la planeación está en una etapa temprana o si hay planes detallados para una licitación.'
    }

  }
function InicializarCantidadProcesos(){
    
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
    $.get(api+"/indicadoresoncae/contratospormodalidad/",parametros).done(function( datos ) {
    console.dir('PROCESOS POR CATEGORIA DE COMPRA');
    console.dir(datos);
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
                data:datos.resultados.nombreModalidades,
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
                data:datos.resultados.cantidadContratos,
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
                type:'line',
                //yAxisIndex: 1,
                data:datos.resultados.montosContratos,
                yAxisIndex: 1,/*
                barMaxWidth:20,
                barGap:'0%',
                barCategoryGap: '0%',
                padding:0,*/


                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: '#27AEB4',
                        width: 4/*,
                        type: 'dashed'*/
                    }
                },
                itemStyle:{
                    color: '#27AEB4'
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
    }).fail(function() {
        
    });
    
}







function CantidadContratosCategoriaCompra(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/indicadoresoncae/cantidadcontratosporcategoria/",parametros).done(function( datos ) {
console.dir('CONTRATOS POR CATEGORIA');
console.dir(datos);
var datosPastel=[];
    datos.resultados.categorias.forEach(function(valor,indice){
        datosPastel.push(
            {
                name:traducciones[valor.name]?traducciones[valor.name].titulo:valor.name,
                value:valor.value
            }
        )
    });
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
            data: datosPastel,
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
}).fail(function() {
    
});
   
}

function MontoContratosCategoriaCompra(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/indicadoresoncae/montoporcategoria/",parametros).done(function( datos ) {
console.dir('MONTOS POR CATEGORIA DE COMPRA');
console.dir(datos);
var datosPastel=[];
    datos.resultados.categorias.forEach(function(valor,indice){
        datosPastel.push(
            {
                name:traducciones[valor.name]?traducciones[valor.name].titulo:valor.name,
                value:valor.value
            }
        )
    });
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
                data: datosPastel,
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
}).fail(function() {
    
});
    
}

function Top10InstitucionesMontos(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/indicadoresoncae/topcompradores/",parametros).done(function( datos ) {
console.dir('TOP COMPRADORES');
console.dir(datos);
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
                data: datos.resultados.nombreCompradores,
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
                data:datos.resultados.montoContratado,
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
                name:'Cantidad de Procesos de Contratación',
                type:'line',
                //yAxisIndex: 1,
                data:datos.resultados.cantidadOCIDs,
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
}).fail(function() {
    
});
    
}



function MontoCatalogoElectronico(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/indicadoresoncae/catalogos/",parametros).done(function( datos ) {
console.dir('MONTO CATALOGO ELECTRONICO');
console.dir(datos);
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
                data: datos.resultados.nombreCatalogos,
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
                data:datos.resultados.montoContratado,
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
                data:datos.resultados.cantidadProcesos,
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
}).fail(function() {
    
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
    $('#quitarFiltros').on('click',function(e){
        PushDireccionGraficos(AccederUrlPagina({},true));
      });
})
function CargarGraficos(){
    InicializarCantidadProcesos();
    CantidadContratosCategoriaCompra();
    MontoContratosCategoriaCompra();
    Top10InstitucionesMontos();
    MontoCatalogoElectronico();
}
function ObtenerJsonFiltrosAplicados(parametros){
    if(Validar(ObtenerValor('moneda'))){
        parametros['moneda']=ObtenerValor('moneda');
    }
    if(Validar(ObtenerValor('idinstitucion'))){
    parametros['idinstitucion']=decodeURIComponent(ObtenerValor('idinstitucion'));
    }
    if(Validar(ObtenerValor('año'))){
      parametros['año']=ObtenerValor('año');
    }
    if(Validar(ObtenerValor('proveedor'))){
        parametros['proveedor']=decodeURIComponent(ObtenerValor('proveedor'));
    }
    if(Validar(ObtenerValor('categoria'))){
      parametros['categoria']=decodeURIComponent(ObtenerValor('categoria'));
    }
    if(Validar(ObtenerValor('modalidad'))){
        parametros['modalidad']=decodeURIComponent(ObtenerValor('modalidad'));
    }
    if(Validar(ObtenerValor('sistema'))){
        parametros['sistema']=decodeURIComponent(ObtenerValor('sistema'));
    }
    

    return parametros;
  }

  
function ObtenerFiltros(){
    var parametros=ObtenerJsonFiltrosAplicados({});
    $.get(api+"/dashboardoncae/filtros/",parametros).done(function( datos ) {

        console.dir('filtros')
    console.dir(datos);
      
       
  
    MostrarListaElastica(datos,'#elastic-list');
    MostrarEtiquetaListaElasticaAplicada();
    MostrarListaElasticaAplicados();
 // }
  
  
      
        
      }).fail(function() {
          
          
        });

}


function AccederUrlPagina(opciones,desUrl){
    var direccion=('/dashboardProcesosContratacion/?'+
    (ValidarCadena(opciones.moneda)? '&moneda='+encodeURIComponent(opciones.moneda): (ValidarCadena(ObtenerValor('moneda'))&&!desUrl?'&moneda='+ObtenerValor('moneda'):''))+
    (ValidarCadena(opciones.idinstitucion)? '&idinstitucion='+encodeURIComponent(opciones.idinstitucion): (ValidarCadena(ObtenerValor('idinstitucion'))&&!desUrl?'&idinstitucion='+ObtenerValor('idinstitucion'):''))+
   
    (ValidarCadena(opciones.año)? '&año='+encodeURIComponent(opciones.año): (ValidarCadena(ObtenerValor('año'))&&!desUrl?'&año='+ObtenerValor('año'):''))+
    (ValidarCadena(opciones.proveedor)? '&proveedor='+encodeURIComponent(opciones.proveedor): (ValidarCadena(ObtenerValor('proveedor'))&&!desUrl?'&proveedor='+ObtenerValor('proveedor'):''))+
    (ValidarCadena(opciones.categoria)? '&categoria='+encodeURIComponent(opciones.categoria): (ValidarCadena(ObtenerValor('categoria'))&&!desUrl?'&categoria='+ObtenerValor('categoria'):''))+
    (ValidarCadena(opciones.modalidad) ? '&modalidad='+encodeURIComponent(opciones.modalidad):(ValidarCadena(ObtenerValor('modalidad'))&&!desUrl?'&modalidad='+ObtenerValor('modalidad'):''))+
    (ValidarCadena(opciones.sistema) ? '&sistema='+encodeURIComponent(opciones.sistema):(ValidarCadena(ObtenerValor('sistema'))&&!desUrl?'&sistema='+ObtenerValor('sistema'):''))
  
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
      $('ul#ul'+ filtrosAplicablesR[llave].parametro ).find(
        'li[valor="'+(valor).toString()+'"]'
      ).addClass('active');
    });
  }

  function MostrarListaElastica(datos,selector){
    $(selector).html('');
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
    
    
  }

function ValoresLlaves(llave){
    switch(llave){
        case 'años':
            return {valor:'key_as_string',cantidad:'procesos',codigo:'key_as_string'};
        case 'categorias':
            return {valor:'categoria',cantidad:'procesos',codigo:'categoria'};
        case 'instituciones':
            return {valor:'nombre',cantidad:'procesos',codigo:'codigo'};
        case 'modalidades':
            return {valor:'modalidad',cantidad:'procesos',codigo:'modalidad'};
        case 'monedas':
            return {valor:'moneda',cantidad:'procesos',codigo:'moneda'};
        case 'sistemas':
            return {valor:'id',cantidad:'ocids',codigo:'id'};
        default:
            return {valor:'key_as_string',cantidad:'procesos',codigo:'key_as_string'};
    }
}
function AgregarPropiedadesListaElastica(valor,llave){
    var elementos=[]
    $.each(valor,function(i,propiedades){
      //resultadosElastic=AsignarValor(resultadosElastic,llave,,propiedades.doc_count);
      elementos.push(
        $('<li >',{
        class:'list-group-item',
        valor:propiedades[ValoresLlaves(llave).codigo]?propiedades[ValoresLlaves(llave).codigo]:propiedades.key, 
        formato: (ObtenerTexto(traducciones[propiedades[ValoresLlaves(llave).valor]]?traducciones[propiedades[ValoresLlaves(llave).valor]].titulo:propiedades[ ValoresLlaves(llave).valor])).toString().toLowerCase(),'llave':llave,
        
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
              filtros[filtrosAplicables[$(val).attr('llave')]?filtrosAplicables[$(val).attr('llave')].parametro:'' ]=$(val).attr('valor');
            });
            PushDireccionGraficos(AccederUrlPagina(filtros,true));
          }
        }}).append(
          $('<div>',{
              class:'badge',
              toolTexto: ('Procesos: '+propiedades.procesos+'<br>Contratos: '+propiedades.contratos),
              text:propiedades[ValoresLlaves(llave).cantidad]
            }),
          $('<div >',{
          class:'elastic-data',
          toolTexto:(traducciones[propiedades[ValoresLlaves(llave).valor]]?traducciones[propiedades[ValoresLlaves(llave).valor]].titulo:propiedades[ValoresLlaves(llave).valor]),
          toolCursor:'true',
          
          text:(traducciones[propiedades[ValoresLlaves(llave).valor]]?traducciones[propiedades[ValoresLlaves(llave).valor]].titulo:propiedades[ValoresLlaves(llave).valor])}
          )
        )
      )
    });
    return elementos;
  }
