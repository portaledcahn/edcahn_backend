var url=window.location.origin;
var api=`${url}/api`;

function ObtenerFecha(texto){
    if(texto){
        try {
            fecha=new Date(texto);
            return fecha.getFullYear()+'-'+('0' + (fecha.getMonth()+1)).slice(-2)+'-'+('0' +fecha.getDate()).slice(-2)+' '+('0' + fecha.getHours()).slice(-2)+':'+('0' +fecha.getMinutes()).slice(-2)+':'+('0' +fecha.getSeconds()).slice(-2);
          }
          catch(error) {
            return ''
          }
    }else{
        return '';
    }
}

function ObtenerNumero(texto){
    if(Number(texto)){
        return Number(texto);
    }else{
        return 0;
    }
}

function ObtenerTexto(texto){
    if(texto){
        return texto.toString();
    }else{
        return '';
    }
}
function ReducirTexto(texto,maximo){
    texto=ObtenerTexto(texto);
    if(texto.length>maximo){
       return texto.substring(0, maximo);
    }else{
        return texto;
    }
}
function ObtenerExtension(direccion){
    var texto=ObtenerTexto(direccion);
    var extension=texto.match(/\.[^\.]+$/);
    if(extension&&extension[0]){
        return extension[0].toUpperCase();
    }else{
        return 'ARCHIVO'
    }
    
}

function ValorMoneda(texto){
    var numero=ObtenerNumero(texto);
    numero=numero.toFixed(2);
    numero=numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return numero;
}
function TraduceTexto(texto){
    switch(texto){
        case 'planned':
            return 'Planeado';
            break;
        case 'buyer':
            return 'Comprador';
            break;
        case 'complete':
            return 'Completado';
            break;
        case 'contractSigned':
            return 'Contrato Firmado'
            break;
        default:
            return texto;
            break;
    }
}

function DescargarElemento(direccion){
    var enlace=document.createElement('a');
    document.body.appendChild(enlace);
    enlace.href=direccion;
    enlace.click();
}

function MostrarEspera(selector){
    if($(selector+' .espera').length){
        $(selector+' .espera').show();
    }else{
        $(selector).append(
            $('<div>',{class:'espera'}).append(
                $('<img>',{class:'imagen',src:'/static/img/otros/loader.svg'})
            )
        )
    }
}

function OcultarEspera(selector){
    if($(selector+' .espera').length){
        $(selector+' .espera').hide();
    }
}


/*Nuevos Plugins*/

function cambiarFiltroNumerico(elemento){
if($(elemento).is(":checked")){
    $(elemento).parent().parent().parent().parent().parent().find('.btnFiltroNumerico').html(
        $(elemento).attr('opcion')
    );
    $(elemento).parent().parent().parent().parent().parent().find('.campoBlancoTextoSeleccion').attr(
        $(elemento).attr('opcion')
    );
}

}
function cambiarOrden(evento){
    var elemento=$(evento.currentTarget);
    switch($(elemento).attr('opcion')){
        case 'neutro':
           $(elemento).find('.flechaArriba').hide();
           $(elemento).find('.flechaAbajo').show();
           $(elemento).attr('opcion','descendente');  
        break;
        case 'ascendente':
            $(elemento).find('.flechaArriba').show();
            $(elemento).find('.flechaAbajo').show();
            $(elemento).attr('opcion','neutro'); 
        break;
        case 'descendente':
            $(elemento).find('.flechaArriba').show();
            $(elemento).find('.flechaAbajo').hide();
            $(elemento).attr('opcion','ascendente'); 
        break;
        default:
            $(elemento).find('.flechaArriba').show();
            $(elemento).find('.flechaAbajo').show();
            $(elemento).attr('opcion','neutro'); 
        break;
    }  
}


function AsignarOrdenTabla(){
    $('.ordenEncabezado').each(function(llave,elemento){
            $(elemento).on('click',
            function(evento){
                cambiarOrden(evento);
            })
            
        }
    )
}

function AgregarToolTips(){
    $('.toolTip').each(
        function(llave,elemento){
            $(elemento).css('outline','0')
            var parametros={
                arrow: true,
                arrowType: 'round',
                content:$(elemento).attr('toolTexto')
              };
            if($(elemento).attr('toolPosicion')){
                parametros['placement']=$(elemento).attr('toolPosicion');
            }
            tippy($(elemento).get(),parametros);
        }
    )
}

function ObtenerValor( nombre, url ) {
    if (!url) url = location.href;
    nombre = nombre.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+nombre+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}


function AnadirSubtabla(){
    
    $('.filaSubTabla.procesos').each(
        function(llave,elemento){
            $(elemento).on('click',function(e){
                if(!$(e.currentTarget).hasClass('clicked')){
                    $(e.currentTarget).after($('<tr>').append(
                        $('<td colspan="'+$(e.currentTarget).find('td').length+'">').html(
                            '<table class="tablaGeneral cajonSombreado" > <thead> <tr> <th>Titulo</th> <th>Monto del contrato</th> <th>Fecha del contrato</th> <th>Estado</th> </tr></thead> <tbody> <tr> <td data-label="Titulo">Paga mensual</td><td data-label="Monto del contrato">1,200.00 <span class="textoColorPrimario">HNL</span></td><td data-label="Fecha del contrato">2019-02-02 01:01:01</td><td data-label="Estado">Firmado</td></tr><tr> <td data-label="Titulo">Paga mensual</td><td data-label="Monto del contrato">1,200.00 <span class="textoColorPrimario">HNL</span></td><td data-label="Fecha del contrato">2019-02-02 01:01:01</td><td data-label="Estado">Firmado</td></tr></tbody> </table>'
                        )
                    ));
                    $(e.currentTarget).addClass('clicked');
                }
                
            })
        }
    );
    $('.filaSubTabla.pagos').each(
        function(llave,elemento){
            $(elemento).on('click',function(e){
                if(!$(e.currentTarget).hasClass('clicked')){
                    $(e.currentTarget).after($('<tr>').append(
                        $('<td colspan="'+$(e.currentTarget).find('td').length+'">').html(
                            '<table class="tablaGeneral cajonSombreado" > <thead> <tr> <th>Descripción de la transacción</th> <th>Objeto de gasto</th> <th>Monto del pago</th> <th>Fecha del pago</th> </tr></thead> <tbody> <tr> <td data-label="Descripción de la transacción">paga mensual</td><td data-label="Objeto de gasto">Compra de suminitros</td><td data-label="Monto del pago">146.00 <span class="textoColorPrimario">HNL</span></td><td data-label="Fecha del pago">2019-02-02 01:01:01</td></tr><tr> <td data-label="Descripción de la transacción">paga mensual</td><td data-label="Objeto de gasto">Compra de suminitros</td><td data-label="Monto del pago">146.00 <span class="textoColorPrimario">HNL</span></td><td data-label="Fecha del pago">2019-02-02 01:01:01</td></tr></tbody> </table>'
                        )
                        
                    ));
                    $(e.currentTarget).addClass('clicked');
                }
                
            })
        }
    );
}