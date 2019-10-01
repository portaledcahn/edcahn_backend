var compradorId='';
var datosComprador={};
$(function(){
  compradorId=$('#compradorId').val();
  $('.opcionFiltroBusquedaPagina').on('click',function(e){
    $(e.currentTarget).addClass('active')
  });
  tippy('#informacionTipoDatos', {
    arrow: true,
    arrowType: 'round',
    content:'¿Que son estos tipos de datos?'
  });
  tippy('#buscarInformacion', {
    arrow: true,
    arrowType: 'round',
    content:'Haz click para buscar'
  });
  $.datepicker.regional['es'] = {
  closeText: 'Cerrar',
  prevText: '< Ant',
  nextText: 'Sig >',
  currentText: 'Hoy',
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
  dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
  weekHeader: 'Sm',
  dateFormat: 'dd/mm/yy',
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: ''
  };
  $.datepicker.setDefaults( $.datepicker.regional[ "es" ] );
  $('.fecha').datepicker({
         "dateFormat": 'yy-mm-dd'
     });
  $('.fecha').mask('0000-00-00');
  $('.OpcionFiltroBusquedaNumerico input').on('change',function(evento){
    cambiarFiltroNumerico(evento.currentTarget);
  });



ObtenerComprador()
});

function ObtenerComprador(){
  DebugFecha();
  MostrarEspera('body .tamanoMinimo');
  $.get(api+"/compradores/"+encodeURIComponent(compradorId)/*url+"/static/"+procesoOcid+".json"*/,function(datos){
      DebugFecha();
      datosComprador=datos;
      console.dir(datos)
      OcultarEspera('body .tamanoMinimo');
      if(datos.id){
          
          AnadirdatosComprador();
          $('.contenedorTablas').show()
          //CargarContratosProveedor();
          
AsignarOrdenTabla();
AnadirSubtabla();
AgregarToolTips();
VerificarIntroduccion('INTROJS_COMPRADOR',1);
      }else{
          $('#noEncontrado').show();
      }
      
  }).fail(function() {
  /*Error de Conexion al servidor */
  console.dir('error get');
  
  OcultarEspera('body .tamanoMinimo');
  $('#noEncontrado').show();
  
});
}


function AnadirdatosComprador(){
  $('.contenedorInformacion').append(
      $('<div>',{class:'row mt-5'}).append(
          $('<div>',{class:'col-md-12'}).append(
              $('<h1>',{class:'textoColorPrimario mt-3 tituloDetalleProceso',toolTexto:'buyer.name'}).text(
                  datosComprador.name
              )
          )
      ),
      $('<div>',{class:'row'}).append(
          $('<h4>',{class:'text-primary-edcax titularCajonSombreado  col-md-12'}).text(
              'Información del Comprador'
          )
          ),
      $('<div>',{class:'row'}).append(
          $('<div>',{class:'col-md-12'}).append(
              $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos','data-step':"1",'data-intro':"Puedes visualizar la dirección de un comprador en esta sección, en caso de que este disponible."}).append(
                  $('<div>',{class:'contenedorProceso informacionProceso'}).append(

                      (datosComprador.id?
                          $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                              $('<table>').append(
                                $('<tbody>').append(
                                  $('<tr>').append(
                                      $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].id"}).text('Identificación:'),
                                      $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                          VerificarCadenaRTN(datosComprador.id)? 
                                          $('<span>',{class:'botonGeneral fondoColorPrimario'}).text('RTN'):$('<span>').text(datosComprador.id),
                                          VerificarCadenaRTN(datosComprador.id)?
                                          $('<span>').text(datosComprador.id.replace('HN-RTN-',' ')):null
                                              
                                      )
                                ))):null),
                      (datosComprador.address&&datosComprador.address.streetAddress?
                      $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                          $('<table>').append(
                              $('<tbody>').append(
                              $('<tr>').append(
                                  $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].address.streetAddress"}).text('Dirección:'),
                                  $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                      datosComprador.address.streetAddress
                                  )
                              ))):null)
                  )
              )
          )
      ),
     (datosComprador.contactPoint&&(datosComprador.contactPoint.name||datosComprador.contactPoint.telephone||datosComprador.contactPoint.faxNumber||datosComprador.contactPoint.email))? $('<div>',{class:'row'}).append(
          $('<h4>',{class:'text-primary-edcax titularCajonSombreado  col-md-12 mt-5'}).text(
              'Datos de Contacto'
          )
          ):null,
          (datosComprador.contactPoint&&(datosComprador.contactPoint.name||datosComprador.contactPoint.telephone||datosComprador.contactPoint.faxNumber||datosComprador.contactPoint.email))?$('<div>',{class:'row'}).append(
          $('<div>',{class:'col-md-12 mt-2'}).append(
              $('<div>',{class:'cajonSombreado contenedorDetalleProcesoDatos','data-step':"2",'data-intro':"Puedes visualizar los datos de contacto de un comprador en esta sección, en caso de que este disponible."}).append(
                  $('<div>',{class:'contenedorProceso informacionProceso'}).append(

                      (datosComprador.contactPoint&&datosComprador.contactPoint.name?
                          $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                              $('<table>').append(
                                $('<tbody>').append(
                                  $('<tr>').append(
                                      $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].contactPoint.name"}).text('Nombre:'),
                                      $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                          datosComprador.contactPoint.name
                                      )
                                ))):null),
                      (datosComprador.contactPoint&&datosComprador.contactPoint.telephone?
                      $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                          $('<table>').append(
                              $('<tbody>').append(
                              $('<tr>').append(
                                  $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].contactPoint.telephone"}).text('Telefono:'),
                                  $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                      datosComprador.contactPoint.telephone
                                  )
                              ))):null),
                      (datosComprador.contactPoint&&datosComprador.contactPoint.faxNumber?
                          $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                              $('<table>').append(
                                  $('<tbody>').append(
                                  $('<tr>').append(
                                      $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].contactPoint.faxNumber"}).text('FAX:'),
                                      $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                          datosComprador.contactPoint.faxNumber
                                      )
                                  ))):null),
                      (datosComprador.contactPoint&&datosComprador.contactPoint.email?
                      $('<div>',{class:'contenedorTablaCaracteristicas',style:'width:100%'}).append(
                          $('<table>').append(
                              $('<tbody>').append(
                              $('<tr>').append(
                                  $('<td>',{class:'tituloTablaCaracteristicas',toolTexto:"parties[n].contactPoint.email"}).text('Correo Electrónico:'),
                                  $('<td>',{class:'contenidoTablaCaracteristicas'})).append(
                                      datosComprador.contactPoint.email
                                  )
                              ))):null)
                  )
              )
          )
      ):null




  )
}