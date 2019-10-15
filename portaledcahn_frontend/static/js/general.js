var url=window.location.origin;
var api=url+"/api";
var estadosContrato={
    'pending':{titulo:'Pendiente',descripcion:'Este contrato se propuso pero aún no entra en vigor. Puede estar esperando ser firmado.'},
    'active':{titulo:'Activo',descripcion:'Este contrato se ha firmado por todas las partes y ahora está legalmente en proceso.'},
    'cancelled':{titulo:'Cancelado',descripcion:'Este contrato se canceló antes de ser firmado.'},
    'unsuccessful':{titulo:'Sin Éxito',descripcion:'Este contrato se firmo y entro en vigor, ahora esta cerca de cerrarse. Esto puede ser debido a la terminación exitosa del contrato, o puede ser una terminación temprana debido a que no fue finalizado.'}
   };
var defaultMoneda='HNL';
function TextoURL(texto){
    return encodeURIComponent(texto);
}
function ObtenerTextoURL(texto){
    return decodeURIComponent(texto);
}

function MostrarIntroduccion(){
    introJs().setOption("nextLabel", "Siguiente").setOption("prevLabel", "Atras").setOption("skipLabel", "SALTAR").setOption("doneLabel", "LISTO").start();
}
function DebugFecha(){
    let d =new Date();
    let fecha=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds();
    console.dir(fecha);
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

function ObtenerFecha(texto,tipo){
    if(texto){
        try {
            fecha=new Date(texto);
            switch(tipo){
                case 'fecha':
                    return fecha.getFullYear()+'-'+('0' + (fecha.getMonth()+1)).slice(-2)+'-'+('0' +fecha.getDate()).slice(-2);
                    break;
                default:
                    return fecha.getFullYear()+'-'+('0' + (fecha.getMonth()+1)).slice(-2)+'-'+('0' +fecha.getDate()).slice(-2)+' '+('0' + fecha.getHours()).slice(-2)+':'+('0' +fecha.getMinutes()).slice(-2)+':'+('0' +fecha.getSeconds()).slice(-2);
                    break;
            }
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
    if(Validar(texto)){
        return texto.toString();
    }else{
        return '';
    }
}
function reemplazarValor(texto,nombre,reemplazo)
{   console.dir(nombre)
    let regular=new RegExp(nombre, "g");;
    while(regular.test(texto)){
        console.dir(texto)
        console.dir(reemplazo)
      texto=texto.replace(nombre,reemplazo);
    }
    return texto;
  }

function VerificarCadenaRTN(texto){
    return /^HN-RTN-\d{14}$/.test(ObtenerTexto(texto));
}
function ReducirTexto(texto,maximo){
    texto=ObtenerTexto(texto);
    if(texto.length>maximo){
       return texto.substring(0, maximo)+'...';
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
function ValorNumerico(texto){
    var numero=ObtenerNumero(texto);
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
        $(elemento).attr('opcion').replace('==','=')
    );
    $(elemento).parent().parent().parent().parent().parent().find('.campoBlancoTextoSeleccion').attr(
        'opcion',$(elemento).attr('opcion')
    );
    $(elemento).parent().parent().parent().parent().parent().find('.campoBlancoTextoSeleccion').trigger('change');
}

}

function Validar(valor){
    if(valor!=null&&valor!=undefined){
        return true;
    }else{
        return false;
    }
}
function ValidarCadena(valor){
    if(valor!=null&&valor!=undefined&&valor!==''){
        return true;
    }else{
        return false;
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

function cambiarOrdenFiltro(evento,funcion){
    var elemento=$(evento.currentTarget);
    $('.ordenEncabezado').not($(elemento)).attr('opcion','neutro'); 
    $('.ordenEncabezado').not($(elemento)).find('.flechaAbajo').show();
    $('.ordenEncabezado').not($(elemento)).find('.flechaArriba').show();
    var filtro=elemento.closest('.campoFiltrado');
    switch($(elemento).attr('opcion')){
        case 'neutro':
           $(elemento).find('.flechaArriba').hide();
           $(elemento).find('.flechaAbajo').show();
           $(elemento).attr('opcion','descendente');
           if(funcion){
             funcion(filtro.attr('filtro'),'descendente')
           }
        break;
        case 'ascendente':
            $(elemento).find('.flechaArriba').show();
            $(elemento).find('.flechaAbajo').show();
            $(elemento).attr('opcion','neutro');
            if(funcion){
                funcion(filtro.attr('filtro'),'neutro')
              } 
        break;
        case 'descendente':
            $(elemento).find('.flechaArriba').show();
            $(elemento).find('.flechaAbajo').hide();
            $(elemento).attr('opcion','ascendente'); 
            if(funcion){
                funcion(filtro.attr('filtro'),'ascendente')
              } 
        break;
        default:
            $(elemento).find('.flechaArriba').show();
            $(elemento).find('.flechaAbajo').show();
            $(elemento).attr('opcion','neutro'); 
            if(funcion){
                funcion(filtro.attr('filtro'),'neutro')
              }
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
function AsignarOrdenTablaFiltros(funcion,selector){
    $(selector?selector:'.ordenEncabezado').each(function(llave,elemento){
            $(elemento).on('click',
            function(evento){
                cambiarOrdenFiltro(evento,funcion);
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
    if (!url) {url = location.href};
    nombre=encodeURIComponent(nombre);
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
                            '<div class="cajonSombreado"><div><h6 class="textoColorPrimario textoTitulo">Contratos</h6></div><table class="tablaGeneral"> <thead> <tr> <th toolTexto="buyer.name">Comprador</th> <th toolTexto="contracts[n].title">Título del Contrato</th> <th toolTexto="contracts[n].value.amount">Monto del contrato</th> </tr></thead> <tbody> <tr><td data-label="Comprador"><a href="/comprador/WDefef9" class="enlaceTablaGeneral">Lorem ipsum</a></td> <td data-label="Título del Contrato"><a href="/proceso/ocdi-1949-466226-1212/?contrato=C-2018-963-6" class="enlaceTablaGeneral">Lorem ipsum</a></td><td data-label="Monto del contrato" >1,200.00 <span class="textoColorPrimario">HNL</span></td></tr><tr> <td data-label="Comprador"><a href="/comprador/WDefef9" class="enlaceTablaGeneral">Lorem ipsum</a></td><td data-label="Título del Contrato"><a href="/proceso/ocdi-1949-466226-1212/?contrato=C-2018-963-6" class="enlaceTablaGeneral">Lorem ipsum</a></td><td data-label="Monto del contrato">1,200.00 <span class="textoColorPrimario">HNL</span></td></tr></tbody> </table></div>'
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

/*Nuevo Codigo */
function ObtenerEnlaceParte(id,arreglo,fuente){
    var elementos=[];
    if(arreglo){
      elementos=arreglo;
    }
    var partes=fuente?fuente.parties:procesoRecord.compiledRelease.parties;
    for(var i = 0; i < partes.length;i++){
        if(partes[i].id == id){
          elementos.push(partes[i]);
          if(partes[i].memberOf){
            for(var j = 0; j < partes[i].memberOf.length;j++){
              ObtenerEnlaceParte(partes[i].memberOf[j].id,elementos,fuente);
            }
  
          }
        }
    }
    return elementos;
  }
  function ObtenerElementosParte(id,fuente){
    var parte=ObtenerEnlaceParte(id,false,fuente);
    var elementos=[];
    for(var i=0;i<parte.length;i++){
      elementos.push(
        parte[i].roles.includes('buyer')?($('<a>',{text:parte[i].name,class:'enlaceTablaGeneral',href:'/comprador/'+encodeURIComponent(parte[i].name)})):(parte[i].roles.includes('supplier')?(
          $('<a>',{text:parte[i].name,class:'enlaceTablaGeneral',href:'/proveedor/'+parte[i].id})
        ):(
          $('<span>',{text:parte[i].name})
          ) 
        ) 
      )
      if(elementos.length>=1&&i+1<parte.length){
        elementos.push($('<span>',{text:' de '}));
      }
    }
    return elementos;
  }
  function ObtenerProveedores(proveedores,fuente){
    var elementos=[];
    if(proveedores){
      for(var i=0;i<proveedores.length;i++){
        elementos=elementos.concat(ObtenerElementosParte(proveedores[i].id,fuente));
      }
    }
    
    return elementos;
  }
  function ObtenerPaginacion(paginaActual, ultimaPagina) {
    var paginas=[];
    var paginasPuntos=[];
    var espaciado=2;
    var izquierda=paginaActual - espaciado;
    var derecha=paginaActual + espaciado;
    var contador=0;
    for(var i=1;i<=ultimaPagina;i++){
        if (i==1||i==ultimaPagina||i>=izquierda&&i<=derecha){
            paginas.push(i);
        }
    }
    for(var i=0;i<paginas.length;i++){
        if(contador){
            if (paginas[i]-contador!=1) {
                paginasPuntos.push('...');
            }
        }
        paginasPuntos.push(paginas[i]);
        contador=paginas[i];
    }
    return paginasPuntos;
}