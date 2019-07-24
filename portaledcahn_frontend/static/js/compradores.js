

  $(function(){
    $('.opcionFiltroBusquedaPagina').on('click',function(e){
      $(e.currentTarget).addClass('active')
    })
  
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
    AsignarOrdenTabla();
  })