
$(function(){
    /*Anadir eventos a los elementos*/
    $('.tiempo').countTo({
        formatter: function (value, options) {
          value = value.toFixed(options.decimals);
          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return value;
      }
      });
    /*Anadir eventos a los elementos*/
    $('#campoBlancoBusquedaProcesosBoton').on('click',function(e){
        window.location.href="busqueda.html";
    });
    $('#campoBlancoBusquedaProcesos').on('keydown',function(e){
        teclaCodigo=e.keyCode ? e.keyCode : e.which;
        if(teclaCodigo=='13'){
            window.location.href="busqueda.html";
        }
    });
    /*Anadir Titles a los campos de busqueda*/
    tippy('#campoBlancoBusquedaProcesosBoton', {
        arrow: true,
        arrowType: 'round',
        content:'Haz click para buscar'
    });
    tippy('#campoBlancoBusquedaProcesos', {
        arrow: true,
        arrowType: 'round',
        content:'Ingresa un texto a buscar',
        placement: 'bottom'
    });
    tippy('#botonBlancoFiltroBusquedaInicio', {
        arrow: true,
        arrowType: 'round',
        content:'Selecciona un filtro'
    });
})
