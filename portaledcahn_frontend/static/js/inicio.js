
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
        window.location.href="/busqueda?q="+$('#campoBlancoBusquedaProcesos').val()+'&metodo=proceso';
    });
    $('#campoBlancoBusquedaProcesos').on('keydown',function(e){
        teclaCodigo=e.keyCode ? e.keyCode : e.which;
        if(teclaCodigo=='13'){
            window.location.href="/busqueda?q="+$('#campoBlancoBusquedaProcesos').val()+'&metodo=proceso';
        }
    });
    /*Anadir Titles a los campos de busqueda*/
    AgregarToolTips();
})




