var url=window.location.origin;
var api=url+"/api";
function MostrarIntroduccion(){
    introJs().setOption("nextLabel", "Siguiente").setOption("prevLabel", "Atras").setOption("skipLabel", "SALTAR").setOption("doneLabel", "LISTO").start();
}

function VerificarIntroduccion(variable,veces){
    var introduccion=ObtenerCookie(variable);
    if(introduccion===null){
        DefinirCookie(variable,(veces?veces:1) - 1,365);
        MostrarIntroduccion();
    }else{
        var restantes=ObtenerNumero(introduccion);
        if(restantes>0){
            DefinirCookie(variable,(restantes - 1),365);
            MostrarIntroduccion();
        }
    }
}

function EliminarCookie(nombre){
    document.cookie=nombre+'=;path=/;Max-Age=0';
}
function ObtenerCookie(nombre){
    var vs = document.cookie.split(';');
    if(vs.length>0){
      for(let i=0;i<vs.length;i++){
        var index=Number(vs[i].indexOf('='));
        if(vs[i].substring(0, index).trim()==nombre){
          return vs[i].substring(index+1);
        }
      }
    }
    return null;
}
function DefinirCookie(nombre,valor,dias){

    document.cookie = nombre+'='+valor+'; path=/; expires='+ObtenerDuracionCookie(dias ? dias : 40);
}
function ObtenerDuracionCookie(dia) {
    var d = new Date();
    d.setTime(d.getTime() + (dia * 24 * 60 * 60 * 1000));
    return d.toUTCString();
}

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
    $('[toolTexto]').each(
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
                if(!$(e.currentTarget).hasClass('abierta')){
                    $(e.currentTarget).after($('<tr class="subTabla">').append(
                        $('<td colspan="'+$(e.currentTarget).find('td').length+'">').html(
                            '<div class="cajonSombreado"><div><h6 class="textoColorPrimario textoTitulo">Procesos de Contratación</h6></div><table class="tablaGeneral"> <thead> <tr> <th toolTexto="buyer.name">Comprador</th> <th toolTexto="contracts[n].title">Título del Contrato</th> <th toolTexto="contracts[n].value.amount">Monto del contrato</th> </tr></thead> <tbody> <tr><td data-label="Comprador"><a href="/comprador/WDefef9" class="enlaceTablaGeneral">Lorem ipsum</a></td> <td data-label="Título del Contrato"><a href="/proceso/ocdi-1949-466226-1212/?contrato=C-2018-963-6" class="enlaceTablaGeneral">Lorem ipsum</a></td><td data-label="Monto del contrato" >1,200.00 <span class="textoColorPrimario">HNL</span></td></tr><tr> <td data-label="Comprador"><a href="/comprador/WDefef9" class="enlaceTablaGeneral">Lorem ipsum</a></td><td data-label="Título del Contrato"><a href="/proceso/ocdi-1949-466226-1212/?contrato=C-2018-963-6" class="enlaceTablaGeneral">Lorem ipsum</a></td><td data-label="Monto del contrato">1,200.00 <span class="textoColorPrimario">HNL</span></td></tr></tbody> </table></div>'
                        )
                    ));
                    $(e.currentTarget).addClass('abierta');
                }else{
                    if($(e.currentTarget).next('.subTabla').length){
                        $(e.currentTarget).next('.subTabla').remove();
                        $(e.currentTarget).removeClass('abierta');
                    }
                    
                }
                AgregarToolTips();
            })
        }
    );
    $('.filaSubTabla.contratos').each(
        function(llave,elemento){
            $(elemento).on('click',function(e){
                if(!$(e.currentTarget).hasClass('abierta')){
                    $(e.currentTarget).after($('<tr class="subTabla">').append(
                        $('<td colspan="'+$(e.currentTarget).find('td').length+'">').html(
                            '<div class="cajonSombreado"><div><h6 class="textoColorPrimario textoTitulo">Contratos</h6></div><table class="tablaGeneral " > <thead> <tr> <th toolTexto="contracts[n].title">Título del Contrato</th> <th toolTexto="contracts[n].value.amount">Monto del contrato</th> <th toolTexto="contracts[n].dateSigned">Fecha del contrato</th> <th toolTexto="contracts[n].status">Estado</th> </tr></thead> <tbody> <tr> <td data-label="Título del Contrato"><a href="/proceso/ocdi-1949-466226-1212/?contrato=C-2018-963-6" class="enlaceTablaGeneral">Lorem ipsum</a></td><td data-label="Monto del contrato">1,200.00 <span class="textoColorPrimario">HNL</span></td><td data-label="Fecha del contrato">2019-02-02 01:01:01</td><td data-label="Estado">Firmado</td></tr><tr> <td data-label="Título del Contrato"><a href="/proceso/ocdi-1949-466226-1212/?contrato=C-2018-963-6" class="enlaceTablaGeneral">Lorem ipsum</a></td><td data-label="Monto del contrato">1,200.00 <span class="textoColorPrimario">HNL</span></td><td data-label="Fecha del contrato">2019-02-02 01:01:01</td><td data-label="Estado">Firmado</td></tr></tbody> </table></div>'
                        )
                    ));
                    $(e.currentTarget).addClass('abierta');
                }else{
                    if($(e.currentTarget).next('.subTabla').length){
                        $(e.currentTarget).next('.subTabla').remove();
                        $(e.currentTarget).removeClass('abierta');
                    }
                    
                }
                AgregarToolTips();
            })
        }
    );
    $('.filaSubTabla.pagos').each(
        function(llave,elemento){
            $(elemento).on('click',function(e){
                if(!$(e.currentTarget).hasClass('abierta')){
                    $(e.currentTarget).after($('<tr class="subTabla">').append(
                        $('<td colspan="'+$(e.currentTarget).find('td').length+'">').html(
                            '<div class="cajonSombreado"><div><h6 class="textoColorPrimario textoTitulo">Pagos</h6></div><table class="tablaGeneral " > <thead> <tr> <th toolTexto="contracts[n].implementation .transactions[n].payee">Descripción de la transacción</th> <th toolTexto="planning.budget.budgetBreakdown.[n].classifications.objeto">Objeto de gasto</th> <th toolTexto="contracts[n].implementation. transactions[n].value.amount">Monto del pago</th> <th toolTexto="contracts[n].implemntation .transactions[n].date">Fecha del pago</th> </tr></thead> <tbody> <tr> <td data-label="Descripción de la transacción">Lorem ipsum</td><td data-label="Objeto de gasto">Compra de suminitros</td><td data-label="Monto del pago">146.00 <span class="textoColorPrimario">HNL</span></td><td data-label="Fecha del pago">2019-02-02 01:01:01</td></tr><tr> <td data-label="Descripción de la transacción">Lorem ipsum</td><td data-label="Objeto de gasto">Compra de suminitros</td><td data-label="Monto del pago">146.00 <span class="textoColorPrimario">HNL</span></td><td data-label="Fecha del pago">2019-02-02 01:01:01</td></tr></tbody> </table></div>'
                        )
                        
                    ));
                    $(e.currentTarget).addClass('abierta');
                }else{
                    if($(e.currentTarget).next('.subTabla').length){
                        $(e.currentTarget).next('.subTabla').remove();
                        $(e.currentTarget).removeClass('abierta');
                    }
                    
                }
                AgregarToolTips();
            })
        }
    );
    
}