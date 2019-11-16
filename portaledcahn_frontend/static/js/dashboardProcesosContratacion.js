var filtrosAplicables={
    monedas: {titulo:'Moneda',parametro:'moneda'},
    instituciones: {titulo:'Institución Compradora',parametro:'idinstitucion'},
    años: {titulo:'Año',parametro:'año'},
    proveedores: {titulo:'Proveedor',parametro:'proveedor'},
    categorias: {titulo:'Categoría de Compra',parametro:'categoria'},
    modalidades : {titulo:'Modalidad de Compra',parametro:'modalidad'}
    
  };
  var filtrosAplicablesR={
    moneda: {titulo:'Moneda',parametro:'monedas'},
    idinstitucion: {titulo:'Institución Compradora',parametro:'instituciones'},
    año: {titulo:'Año',parametro:'años'},
    proveedor: {titulo:'Proveedor',parametro:'proveedores'},
    modalidad: {titulo:'Modalidad de Compra',parametro:'modalidades'},
    categoria : {titulo:'Categoría de Compra',parametro:'categorias'}
    
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
  window.onpopstate = function(e){
    location.reload();
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
    //CantidadPagosEtapas()
    
    //TiempoPromedioEtapas();

    
    
 
    //SegregacionMontosContratos();
    $('#quitarFiltros').on('click',function(e){
        PushDireccionGraficos(AccederUrlPagina({},true));
      });

    //VerificarIntroduccion('INTROJS_BUSQUEDA',1);
})
function CargarGraficos(){
    CargarCajonesCantidadProcesos();
    CargarCajonesCantidadContratos();
    CargarCajonesMontoContratos();
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
    
}

function ObtenerFiltros(){
    var parametros=ObtenerJsonFiltrosAplicados({});
    $.get(api+"/dashboardoncae/filtros/",parametros).done(function( datos ) {
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
       /* if(datos.respuesta.objetosGasto){
            delete datos.respuesta.objetosGasto;
        }*/
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
    

    return parametros;
  }

  function AccederUrlPagina(opciones,desUrl){
    var direccion=('/dashboardProcesosContratacion/?'+
    (ValidarCadena(opciones.moneda)? '&moneda='+encodeURIComponent(opciones.moneda): (ValidarCadena(ObtenerValor('moneda'))&&!desUrl?'&moneda='+ObtenerValor('moneda'):''))+
    (ValidarCadena(opciones.idinstitucion)? '&idinstitucion='+encodeURIComponent(opciones.idinstitucion): (ValidarCadena(ObtenerValor('idinstitucion'))&&!desUrl?'&idinstitucion='+ObtenerValor('idinstitucion'):''))+
   
    (ValidarCadena(opciones.año)? '&año='+encodeURIComponent(opciones.año): (ValidarCadena(ObtenerValor('año'))&&!desUrl?'&año='+ObtenerValor('año'):''))+
    (ValidarCadena(opciones.proveedor)? '&proveedor='+encodeURIComponent(opciones.proveedor): (ValidarCadena(ObtenerValor('proveedor'))&&!desUrl?'&proveedor='+ObtenerValor('proveedor'):''))+
    (ValidarCadena(opciones.categoria)? '&categoria='+encodeURIComponent(opciones.categoria): (ValidarCadena(ObtenerValor('categoria'))&&!desUrl?'&categoria='+ObtenerValor('categoria'):''))+
    (ValidarCadena(opciones.modalidad) ? '&modalidad='+encodeURIComponent(opciones.modalidad):(ValidarCadena(ObtenerValor('modalidad'))&&!desUrl?'&modalidad='+ObtenerValor('modalidad'):''))
  
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
        console.dir('ul#ul'+filtrosAplicablesR[llave].parametro)
        console.dir('li[valor="'+(valor).toString().toLowerCase()+'"]')
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
        formato: ((traducciones[propiedades[ValoresLlaves(llave).valor]]?traducciones[propiedades[ValoresLlaves(llave).valor]].titulo:propiedades[ValoresLlaves(llave).valor])).toString().toLowerCase(),'llave':llave,
        
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
  
function InicializarCantidadProcesos(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
    $.get(api+"/dashboardoncae/cantidaddeprocesos/",parametros).done(function( datos ) {
    var grafico=echarts.init(document.getElementById('cantidadProcesos'));
    var opciones = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            formatter:  function (e){
                return "{b0}<br>{a0} {s0} {c0} Procesos <br>{a1} {s1} {c1} %".replace('{c0}',e[0].value).replace('{c1}',e[1].value).replace('{a0}',e[0].marker).replace('{a1}',e[1].marker).replace('{b0}',e[0].name).replace('{s0}',e[0].seriesName).replace('{s1}',e[1].seriesName);;
            }
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
                name:'Cantidad de Procesos de Contratación',
                type:'bar',
                data:datos.resultados.cantidadprocesos,
                itemStyle:{
                    color: '#58C5CC'
                }
            },
            {
                name:'Porcentaje de la Cantidad de Procesos de Contratación en Relación a los Demás Meses',
                type:'line',
                //yAxisIndex: 1,
                data:datos.resultados.promedioprocesos.map(function(e){return ObtenerNumero((ObtenerNumero(e)*100).toFixed(2))}),
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


function InicializarMontoProcesos(){
    //app.title = '折柱混合';
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
    $.get(api+"/dashboardoncae/montosdecontratos/",parametros).done(function( datos ) {

    var grafico=echarts.init(document.getElementById('montoProcesos'));
    var opciones = {
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
            /*right: 10,
            top: 20,
            bottom: 20*//*,
            data: ['lengend data 1','lengend data 2','lengend data 3'],
    
            selected: [false,false,true]*/
        },
        grid:{
            containLabel:true
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false,title:'Vista',lang: ['Vista de Datos', 'Cerrar', 'Actualizar'] },
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
                name:'Monto de Procesos de Contratación',
                type:'bar',
                data:datos.resultados.monto_contratos_mes,
                itemStyle:{
                    color: '#D9527B'
                }
            },
            {
                name:'Monto Promedio de Procesos de Contratación',
                type:'line',
                data:datos.resultados.monto_contratos_mes.map(function(e){return ObtenerNumero(((ObtenerNumero(e)/ObtenerNumero(datos.resultados.total_monto_contratos))*100).toFixed(2))}),//datos.resultados.cantidad_contratos_mes.map(function(e){return ObtenerNumero((ObtenerNumero(e)*100).toFixed(2))}),
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





function CantidadProcesosEtapas(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
    $.get(api+"/dashboardoncae/procesosporetapa/",parametros).done(function( datos ) {
    console.dir('PROCESOS POR ETAPA')
    console.dir(datos)
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
                    data: datos.resultados.etapas.map(function(e){return (traducciones[e]?traducciones[e].titulo:e);}),
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Cantidad',
                    min: 0,/*
                    max: 250,
                    interval: 50,*/
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
                    name:'Procesos',
                    type:'bar',
                    data:datos.resultados.procesos,
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
    }).fail(function() {
    
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
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardoncae/procesosporcategoria/",parametros).done(function( datos ) {
console.dir('PROCESOS POR CATEGORIA DE COMPRA')
console.dir(datos)
var datosPastel=[];
datos.resultados.categorias.forEach(function(valor,indice){
    datosPastel.push(
        {
            name:traducciones[valor]?traducciones[valor].titulo:valor,
            value:datos.resultados.procesos[indice]?datos.resultados.procesos[indice]:0
        }
    )
});
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
                data: datosPastel,//[{name:'Obras',value: 20},{name:'Bienes',value: 40},{name:'Servicios',value: 60}],
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

function MontoProcesosCategoriaCompra(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
    $.get(api+"/dashboardoncae/contratosporcategoria/",parametros).done(function( datos ) {
    console.dir('CONTRATOS POR CATEGORIA DE COMPRA')
    console.dir(datos)
    var datosPastel=[];
    datos.resultados.categorias.forEach(function(valor,indice){
        datosPastel.push(
            {
                name:traducciones[valor.name]?traducciones[valor.name].titulo:valor.name,
                value:valor.value
            }
        )
    });
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
                        var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A','#ADA7FC','#B2F068','#6AECF4','#45B4E7','#AD61ED'];
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
    }).fail(function(e) {
        
    });
    
}

function CantidadProcesosMetodoContratacion(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardoncae/procesospormodalidad/",parametros).done(function( datos ) {
console.dir('PROCESOS POR MODALIDAD DE COMPRA')
console.dir(datos)
var datosPastel=[];
datos.resultados.modalidades.forEach(function(valor,indice){
    datosPastel.push(
        {
            name:traducciones[valor]?traducciones[valor].titulo:valor,
            value:datos.resultados.procesos[indice]?datos.resultados.procesos[indice]:0
        }
    )
});
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
            name: 'Cantidad de Procesos por Modalidad de Contratación',
            type: 'pie',
            radius : '55%',
            center: ['40%', '50%'],
            data: datosPastel,//[{name:'Compra Menor',value: 20},{name:'Licitación Privada',value: 40},{name:'Licitación Pública Nacional',value: 60},{name:'Concurso Público Nacional',value: 60}],
            itemStyle: {
                color: function(e){
                    var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A','#ADA7FC','#B2F068','#6AECF4','#45B4E7','#AD61ED'];
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

}).fail(function() {
    
});

}
function MontoProcesosMetodoContratacion(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardoncae/contratospormodalidad/",parametros).done(function( datos ) {
console.dir('MONTO POR MODALIDAD DE CONTRATACION')
console.dir(datos)
var datosPastel=[];
    datos.resultados.modalidades.forEach(function(valor,indice){
        datosPastel.push(
            {
                name:traducciones[valor.name]?traducciones[valor.name].titulo:valor.name,
                value:valor.value
            }
        )
    });
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
                name: 'Monto de Contratos por Método de Contratación',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data:datosPastel,
                itemStyle: {
                    color: function(e){
                        var colores=['#57C5CB','#DA517A','#FECB7E','#F79A6A','#ADA7FC','#B2F068','#6AECF4','#45B4E7','#AD61ED'];
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
}).fail(function() {
    
});
    
}

function Top10Compradores(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardoncae/topcompradores/",parametros).done(function( datos ) {
console.dir('TOP COMPRADORES')
console.dir(datos)
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
}).fail(function() {
    
});
   
}



function Top10Proveedores(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardoncae/topproveedores/",parametros).done(function( datos ) {
console.dir('TOP PROVEEDORES')
console.dir(datos)
}).fail(function() {
    
});
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
function InicializarConteo(){
    $('.conteo.moneda').countTo({
        formatter: function (value, options) {
          value = value.toFixed(2/*options.decimals*/);
          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return value;
      }
      });/*
      $('.conteo').not('.moneda').countTo({
        formatter: function (value, options) {
            value = value.toFixed(options.decimals);
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return value;
        }
      });*/
}

function CargarCajonesCantidadProcesos(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardoncae/estadisticacantidaddeprocesos/",parametros).done(function( datos ) {
    console.dir('cantidad***')
console.dir(datos);
    $('#CantidadProcesosPromedio').attr('data-to',datos.resultados.promedio);
    $('#CantidadProcesosMenor').attr('data-to',datos.resultados.menor);
    $('#CantidadProcesosMayor').attr('data-to',datos.resultados.mayor);
    $('#CantidadProcesosTotal').attr('data-to',datos.resultados.total);
/*
    $('.conteo').not('.moneda').countTo({
        formatter: function (value, options) {
            value = value.toFixed(options.decimals);
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return value;
        },
        from: 0, to: 500
      });*/
      $('.cantidadProcesos .conteo').not('.moneda').each(function(index,elemento){
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
function CargarCajonesCantidadContratos(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardoncae/estadisticacantidaddecontratos/",parametros).done(function( datos ) {
    console.dir('cantidad***')
console.dir(datos);
    $('#CantidadContratosPromedio').attr('data-to',datos.resultados.promedio);
    $('#CantidadContratosMenor').attr('data-to',datos.resultados.menor);
    $('#CantidadContratosMayor').attr('data-to',datos.resultados.mayor);
    $('#CantidadContratosTotal').attr('data-to',datos.resultados.total);
/*
    $('.conteo').not('.moneda').countTo({
        formatter: function (value, options) {
            value = value.toFixed(options.decimals);
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return value;
        },
        from: 0, to: 500
      });*/
      $('.cantidadContratos .conteo').not('.moneda').each(function(index,elemento){
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
function CargarCajonesMontoContratos(){
    var parametros={}
    parametros=ObtenerJsonFiltrosAplicados(parametros)
$.get(api+"/dashboardoncae/estadisticamontosdecontratos/",parametros).done(function( datos ) {
    console.dir('cantidad***')
console.dir(datos);
    $('#MontoContratosPromedio').attr('data-to',datos.resultados.promedio);
    $('#MontoContratosMenor').attr('data-to',datos.resultados.menor);
    $('#MontoContratosMayor').attr('data-to',datos.resultados.mayor);
    $('#MontoContratosTotal').attr('data-to',datos.resultados.total);
/*
    $('.conteo').not('.moneda').countTo({
        formatter: function (value, options) {
            value = value.toFixed(options.decimals);
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return value;
        },
        from: 0, to: 500
      });*/
      $('.montoContratos .conteo.moneda').each(function(index,elemento){
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