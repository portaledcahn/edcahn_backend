$(function(){
    //ObtenerFiltros();
    MostrarEspera('#PesosContratos')
    MostrarSeleccionFecha();
});
window.onpopstate = function(e){
  location.reload();
}

function ObtenerFiltros(selector){
    DebugFecha();
    var parametros={masinstituciones:1};//ObtenerJsonFiltrosAplicados({});
    $.get(api+"/dashboardoncae/filtros/",parametros).done(function( datos ) {
      OcultarEspera('#PesosContratos')
        console.dir('filtros')
        DebugFecha()
    console.dir(datos);

        if(datos&&datos.respuesta&&datos.respuesta.años&&datos.respuesta.años.length){
          $('#'+selector).html('').append(
            $('<div>',{class:'contenedorFechas'}).append(
              $('<h4>',{class:'titularCajonSombreado textoAlineadoCentrado',text:'Fechas de Contratos'})
            )
          )
          datos.respuesta.años.forEach(function(elemento) {
            $('#'+selector+' .contenedorFechas').append(
              $('<div>',{class:'botonGeneral fondoColorPrimario cursorMano'+((decodeURIComponent(ObtenerValor('año'))==elemento.key_as_string)?' fondoColorSecundario':''),href:'javascript:void(0)',text:elemento.key_as_string, style:'color:white;margin:5px;display:inline-block;', fecha:elemento.key_as_string,
            on:{
              click:function(e){
                //$(e.currentTarget).attr('fecha')
                $(e.currentTarget).parent().find('.botonGeneral.fondoColorPrimario.cursorMano').removeClass('fondoColorSecundario');
                  $(e.currentTarget).addClass('fondoColorSecundario');
                var parametros=ObtenerJsonFiltrosAplicados({});
                  parametros['año']=$(e.currentTarget).attr('fecha');
                  AccederUrlPagina(parametros);
                  PushDireccion(AccederUrlPagina(parametros));
                  ObtenerContratos();
              }
            }})
            )
          });
          
        }


        if(datos&&datos.respuesta&&datos.respuesta.instituciones&&datos.respuesta.instituciones.length){
          $('#'+selector).append(
            $('<br>'),
            $('<div>',{class:'contenedorInstitucionesx'}).append(
              $('<h4>',{class:'titularCajonSombreado textoAlineadoCentrado',text:'Instituciones'})
            ),
            $('<div>',{class:'contenedorInstituciones', style:'height:65px;overflow-x:auto;white-space:nowrap'}).append(
            )
          )
          datos.respuesta.instituciones.forEach(function(elemento) {
            $('#'+selector+' .contenedorInstituciones' ).append(
              $('<div>',{class:'botonGeneral  cursorMano'+((decodeURIComponent(ObtenerValor('institucion'))==elemento.codigo)?' fondoColorPrimario':' fondoColorSecundario'),href:'javascript:void(0)',text:elemento.nombre, style:'color:white;margin:5px;display:inline-block;',codigo:elemento.codigo,nombre:elemento.nombre,
              on:{
                click:function(e){
                  $(e.currentTarget).parent().find('.botonGeneral').removeClass('fondoColorPrimario').addClass('fondoColorSecundario');
                  $(e.currentTarget).addClass('fondoColorPrimario').removeClass('fondoColorSecundario');
                  var parametros=ObtenerJsonFiltrosAplicados({});
                  parametros['institucion']=$(e.currentTarget).attr('codigo');
                  PushDireccion(AccederUrlPagina(parametros));
                  ObtenerContratos();
                }
              }})
            )
          });
          
        }
        $('#'+selector+' ' ).append(
          $('<div>',{
            id:"pesosContratosGraficos",
            style:'width:100%;height:500px'
          })
        )

        var parametros=ObtenerJsonFiltrosAplicados({})
          if(parametros.año&&parametros.institucion){
            ObtenerContratos();
          }else if(parametros.año){
            $('#pesosContratosGraficos').html(
              '<div class="textoColorGris titularColor mt-5 ">Selecciona una Institución</div>'
              );
          }

      }).fail(function() {
          
          
        });

}


function ObtenerJsonFiltrosAplicados(parametros){

    if(Validar(ObtenerValor('institucion'))){
    parametros['institucion']=decodeURIComponent(ObtenerValor('institucion'));
    }
    if(Validar(ObtenerValor('año'))){
      parametros['año']=decodeURIComponent(ObtenerValor('año'));
    }
    parametros['masinstituciones']=1;
    

    return parametros;
  }

  function AccederUrlPagina(opciones,desUrl){
    var direccion=('/pesosContratos/?'+
    
    (ValidarCadena(opciones.año)? '&año='+encodeURIComponent(opciones.año): (ValidarCadena(ObtenerValor('año'))&&!desUrl?'&año='+ObtenerValor('año'):''))+
    (ValidarCadena(opciones.institucion)? '&institucion='+encodeURIComponent(opciones.institucion): (ValidarCadena(ObtenerValor('institucion'))&&!desUrl?'&institucion='+ObtenerValor('institucion'):''))
    );
    return direccion;
  }
  function PushDireccion(direccion){
    window.history.pushState({}, document.title,direccion);
  }
function MostrarSeleccionFecha(){
    var selector='PesosContratos';
    ObtenerFiltros(selector);
   /// <span class="botonGeneral fondoColorPrimario cargaEfecto" id="promedioMonto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
}


function ObtenerContratos(){
  var parametros=ObtenerJsonFiltrosAplicados({});
  if(parametros.institucion ){
    var datos=ObtenerJsonFiltrosAplicados({});
    $.get(api + "/compradores/" + encodeURIComponent(datos.institucion) + '/contratos',{tid:'id',dependencias:1}).done(function(datos) {
        console.dir('Contratos')
        console.dir(datos);
        var resultados=[];
        if(datos&&datos.resultados&&datos.resultados.length){
          datos.resultados.forEach(function(elemento){
            if(elemento._source){

              resultados.push({
                title:elemento._source.title,
                description:elemento._source.description,
                pEndDate:(elemento._source.period? ObtenerFecha(elemento._source.period.endDate,'fecha'):null),
                pStartDate:(elemento._source.period? ObtenerFecha(elemento._source.period.startDate,'fecha'):null),
                amount:(elemento._source.extra&&elemento._source.extra.LocalCurrency?ObtenerNumero(elemento._source.extra.LocalCurrency.amount):0),
                mes:ObtenerMes((elemento._source.period? ObtenerFecha(elemento._source.period.startDate,'fecha'):null))
              });
            }
          });

        }
        console.dir(resultados);


        InicializarGraficoContratos(resultados.map(function(e){ return [e.mes,ObtenerNumero(ObtenerNumero(e.amount).toFixed(2))  ]   }));

       

    }).fail(function() {
        /*Error de Conexion al servidor */
        console.dir('error de api');

    });
  }else{





  }
  
}

function InicializarGraficoContratos(datos){
  var grafico=echarts.init(document.getElementById('pesosContratosGraficos'));
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
                    data: meses,
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
                    name:'Monto de Contrato',
                    type:'scatter',
                    data:datos,
                    itemStyle:{
                        color: '#58C5CC'
                    },
                    symbolSize:function(dataItem){
                      console.dir(dataItem)
                      return/* dataItem[1]/100*/ Math.sqrt(dataItem[1]) / 10;
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