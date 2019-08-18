DebugFecha()
CargarEstadisticas();

$(function(){
    /*Anadir eventos a los elementos*/
    $('#campoBlancoBusquedaProcesosBoton').on('click',function(e){
        window.location.href="/busqueda?term="+ encodeURIComponent($('#campoBlancoBusquedaProcesos').val()) +'&metodo=proceso';
    });
    $('#campoBlancoBusquedaProcesos').on('keydown',function(e){
        teclaCodigo=e.keyCode ? e.keyCode : e.which;
        if(teclaCodigo=='13'){
            window.location.href="/busqueda?term="+encodeURIComponent($('#campoBlancoBusquedaProcesos').val()) +'&metodo=proceso';
        }
    });
    /*Anadir Titles a los campos de busqueda*/
    AgregarToolTips();
    VerificarIntroduccion('INTROJS_INICIO',1);
})




function CargarEstadisticas(){
    $.get(api+"/inicio",function(datos){
        DebugFecha();
        if(datos){
            $('#compradores').attr('data-to', ObtenerNumero(datos.compradores));
            $('#contratos').attr('data-to', ObtenerNumero(datos.contratos));
            $('#pagos').attr('data-to', ObtenerNumero(datos.pagos));
            $('#procesos').attr('data-to', ObtenerNumero(datos.procesos));
            $('#proveedores').attr('data-to', ObtenerNumero(datos.proveedores));
        }
        $('.contenedorEstadisticaInicial').show();
        EfectoEstadisticas();
    }).fail(function() {
        /*Error de Conexion al servidor */
        $('.contenedorEstadisticaInicial').show();
        EfectoEstadisticas();
        
      });
}

function EfectoEstadisticas(){
    $('.tiempo').countTo({
        formatter: function (value, options) {
          value = value.toFixed(options.decimals);
          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return value;
      }
      });
}