var url=window.location.origin;
//url='http://www.contratacionesabiertas.gob.hn'
var api=url+"/api";
//api='http://200.13.162.86'+"/api";
var estadosContrato={
    'pending':{titulo:'Pendiente',descripcion:'Este contrato se propuso pero aún no entra en vigor. Puede estar esperando ser firmado.'},
    'active':{titulo:'Activo',descripcion:'Este contrato se ha firmado por todas las partes y ahora está legalmente en proceso.'},
    'cancelled':{titulo:'Cancelado',descripcion:'Este contrato se canceló antes de ser firmado.'},
    'unsuccessful':{titulo:'Sin Éxito',descripcion:'Este contrato se firmo y entro en vigor, ahora esta cerca de cerrarse. Esto puede ser debido a la terminación exitosa del contrato, o puede ser una terminación temprana debido a que no fue finalizado.'},
    'terminated':{
        titulo:'Terminado',
        descripcion:'Este contrato se firmo y entro en vigor, ahora esta cerca de cerrarse. Esto puede ser debido a la terminación exitosa del contrato, o puede ser una terminación temprana debido a que no fue finalizado.'
    }
   };
var defaultMoneda='HNL';

var meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

/**
 * Obtiene el nombre de un mes, recibiendo el numero del mes 
 * @constructor
 * @param {string} numero - EL numero del mes empezando por 01 hasta 12.
 */
function ObtenerMesNombre(numero){
    numero=ObtenerNumero(numero);
    if(numero > 0 && numero < 13){
        return meses[numero - 1];
    }else{
        return '';
    }

}
/**
 * Inicializa el tour con INTRO JS 
 * @constructor
 */
function MostrarIntroduccion(){
    introJs().setOption("nextLabel", "Siguiente").setOption("prevLabel", "Atras").setOption("skipLabel", "SALTAR").setOption("doneLabel", "LISTO").start();
}

/**
 * Imprime un momento de la fecha, util para verificar tiempos 
 * @constructor
 */
function DebugFecha(){
    let d =new Date();
    let fecha=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds();
    console.dir(fecha);
}

/**
 * Obtiene un arreglo de las paletas de colores creadas en base a un nombre 
 * @constructor
 * @param {string} paleta - El nombre de la plateta que se desea obtener.
 */
function ObtenerColores(paleta){
    var Paletas={
        'Basica':['#57C5CB','#DA517A','#FECB7E','#F79A6A','#ADA7FC','#B2F068','#6AECF4','#45B4E7','#AD61ED','#6569CC'],
        'Pastel1':['#285189','#04869C','#4F3B78','#9E0B28','#DA517A','#45B4E7','#0B3C77','#F79A6A','#AD61ED','#6569CC'],
        'Pastel2':['#82CCB5','#DD86B9','#FFF68F','#F9B48A','#F497AA','#B6D884','#6BCADE','#71ABDD','#FDCD7B','#9977B4'],
        'Pastel3':['#9DDAEC','#F29AC0','#FEDDB4','#FFAAA5','#C1ACD3','#B9DB9F','#B0DDD6','#DCEDC1','#EDEEA2','#FF8B94']
    }
    return Paletas[paleta?paleta:'Basica'];
}

/**
 * Obtiene una de las paletas de colores creadas en base a un nombre 
 * @constructor
 * @param {string} paleta - El nombre de la plateta que se desea obtener.
 */
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

/**
 * Parte una cadena de texto por limite de caracteres, buscando el  ultimo espacio o el ultimo salto de linea 
 * @constructor
 * @param {string} cadena - La cadena que se desea obtener.
 * @param {string} limite - Limite de carácteres por linea.
 */
function ObtenerParrafo(cadena,limite){
    var parrafo = ''; 
    var subCadena = cadena;
    while (subCadena.length > limite) {
        var c = subCadena.substring(0,limite);
        limiteLinea = c.lastIndexOf(' ');
        var limiteLinea2 =c.lastIndexOf('\n');
        if (limiteLinea2 != -1) {limiteLinea = limiteLinea2;}
        if (limiteLinea == -1) {limiteLinea = limite;}
        parrafo += c.substring(0,limiteLinea) + '\n';
        subCadena = subCadena.substring(limiteLinea+1);
    }
    return parrafo + subCadena;
}

/**
 * Elimina una cookie
 * @constructor
 * @param {string} nombre - nombre de la cookie a eliminar.
 */
function EliminarCookie(nombre){
    document.cookie=nombre+'=;path=/;Max-Age=0';
}
/**
 * Obtiene el valor de una cookie, si no se encuentra se devuelve null
 * @constructor
 * @param {string} nombre - nombre de la cookie a obtener.
 */
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

function EsBiciesto(ano){
    if(ano){
        ano=Number(ano);
        return (((ano%4===0)&&(ano%100!==0))||(ano%400===0));
    }else{
        return false;
    }
    
}

function ObtenerMes(texto){
    if(texto){
        try {
            fecha=new Date(texto);
            return meses[fecha.getMonth()];
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

function ContenerCadena(texto,palabra){
    texto=ObtenerTexto(texto);
    palabra=ObtenerTexto(palabra);
    if(texto.trim().toLowerCase().indexOf(palabra.trim().toLowerCase())!=-1){
    return true;
    }
    else{
    return false;
    }
}
function SanitizarId(texto){
    texto=ObtenerTexto(texto);
    return reemplazarValor(reemplazarValor(reemplazarValor(texto,'\\\\',''),'/',''),' ','');
}
function reemplazarValor(texto,nombre,reemplazo)
{   
    let regular=new RegExp(nombre, "g");;
    while(regular.test(texto)){
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

function ObtenerObligacionesTransaccion(transaccion,obligaciones){
    var arregloObligaciones=[];
    if(transaccion.financialObligationIds && transaccion.financialObligationIds.length && obligaciones && obligaciones.length){
      for(i=0;i<obligaciones.length;i++){
        if(transaccion.financialObligationIds.includes(obligaciones[i].id)){
          arregloObligaciones.push(
            obligaciones[i]
          )
        }
      }
    }
    return arregloObligaciones;
  }

function DescargarElemento(direccion){
    var enlace=document.createElement('a');
    document.body.appendChild(enlace);
    enlace.href=direccion;
    enlace.click();
}

function MostrarEspera(selector,elemento){
    elemento=true;
    if($(selector+' .espera'+(elemento?'.elemento':'')).length){
        $(selector+' .espera'+(elemento?'.elemento':'')).show();
    }else{
        $(selector).append(
            $('<div>',{class:'espera'+(elemento?' elemento':'')}).append(
                $('<img>',{class:'imagen',src:'/static/img/otros/loader.svg'}),
                $('<div>',{text:'Cargando',class:'textoCargando'})
            )
        )
    }
}


function OcultarEspera(selector){
    if($(selector+' .espera').length){
        $(selector+' .espera').hide();
    }
}

function MostrarReloj(selector,elemento){
    if($(selector+' .esperaReloj').length){
        $(selector+' .esperaReloj').show();
    }else{
        $(selector).append(
            $('<div>',{class:'esperaReloj'}).append(
                $('<div>',{class:'reloj'}).append(
                    $('<div>',{class:'flecha hora'}),
                    $('<div>',{class:'flecha minuto'})
                ),
                $('<div>',{text:'Cargando',class:'textoCargando'})
            )
        )
    }
}

function OcultarReloj(selector){
    if($(selector+' .esperaReloj').length){
        $(selector+' .esperaReloj').hide();
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
            if($(elemento).attr('toolFlecha')&&$(elemento).attr('toolFlecha')=="false"){
                parametros['arrow']=false;
            }
            if($(elemento).attr('toolCursor')&&$(elemento).attr('toolCursor')=="true"){
                parametros['followCursor']=true;
            }else if ($(elemento).attr('toolCursor')){
                parametros['followCursor']=$(elemento).attr('followCursor');
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
/*Obtener partes involucradas*/
function ConcatenarEnlace(partes){
    var arregloNombres=partes.map(function(parte){return parte.name;}).reverse();
    return arregloNombres.join(' - ');
  }
function ObtenerEnlaceParte(id,arreglo,fuente){
    var elementos=[];
    if(arreglo){
      elementos=arreglo;
    }
    var partes=fuente&&fuente.parties?fuente.parties:((typeof(procesoRecord)!='undefined')&&procesoRecord.compiledRelease&&procesoRecord.compiledRelease.parties?procesoRecord.compiledRelease.parties:[]);
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
        parte[i].roles.includes('buyer')?($('<a>',{text:parte[i].name,class:'enlaceTablaGeneral',href:'/comprador/'+encodeURIComponent( parte[i].id/*ConcatenarEnlace(ObtenerEnlaceParte(parte[i].id,false,fuente))*//* parte[i].name*/)})):(parte[i].roles.includes('supplier')?(
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

function convertirArregloObjetosCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}
function downloadCSV(args) {
    var data, filename, link;

    var csv = convertArrayOfObjectsToCSV({
        data: stockData
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}
function ArregloJSON(json,resultado,delimitador,path){
    path=ValidarCadena(path)?path:'';
    $.each(json,function(indice,valor){
        if(typeof(valor)==='object'&&typeof(valor.getMonth)!=='function'){
            ArregloJSON(valor,resultado,delimitador,path+(ValidarCadena(path)?delimitador:'')+indice);
        }else{
            
            //var objeto={};
            resultado[path+(ValidarCadena(path)?delimitador:'')+indice]=valor;
            /*resultado.push(
                objeto
            );*/
        }
    });
    return resultado;
}
function ObtenerMatrizObjeto(arreglo){
    var encabezados=[];
    var cuerpo=[];
    var resultados=[];
    arreglo.forEach(function(valor,indice){
        var fila=ArregloJSON(valor,{},'/');
        resultados.push(fila);
        encabezados=encabezados.concat(Object.keys(fila));
        encabezados=encabezados.filter(function(valorFila, indiceFila){ return (encabezados.indexOf(valorFila) === indiceFila);});
    });
    cuerpo.push(encabezados);
    resultados.forEach(function(valorFila,indiceFila){
        var fila=[]
        encabezados.forEach(function(valorEncabezado,indiceEncabezado){
            if(Validar(valorFila[valorEncabezado])){
                fila.push(valorFila[valorEncabezado]);
            }else{
                fila.push('');
            }
        });
        cuerpo.push(fila);
    });
    
    return cuerpo;
}
function DescargarCSV(arreglo,nombre){
if(arreglo.length>1){
    var cadenaCSV='';
    arreglo.forEach(function(fila,indice){
        fila=fila.map(function(e){return reemplazarValor(reemplazarValor(e,'\n',' '),',','.');});
        cadenaCSV+=fila.join(',')+((indice<arreglo.length-1)?'\n':'');
    });

    var blob = new Blob(["\uFEFF"+cadenaCSV], { type: "text/csv;charset=utf-8" });
    saveAs(blob, nombre?('Portal de Contrataciones Abiertas de Honduras - '+nombre+'.csv'):'Portal de Contrataciones Abiertas de Honduras.csv');

}
}
function DescargarJSON(objeto,nombre){
    if(objeto){
        var blob = new Blob([JSON.stringify(objeto)], { type: "application/json" });
        saveAs(blob, nombre?('Portal de Contrataciones Abiertas de Honduras - '+nombre+'.json'):'Portal de Contrataciones Abiertas de Honduras.json');
    }
}
function DescargarXLSX(arreglo,nombre){
    if(arreglo.length>1){
        var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: nombre?nombre:'',
        Subject: "Portal de Contrataciones Abiertas de Honduras",
        Author: "Portal de Contrataciones Abiertas de Honduras",
        CreatedDate: new Date()
    };
    wb.SheetNames.push(nombre?nombre:'');
    var ws_data = arreglo;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets[nombre?nombre:''] = ws;
    var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'binary'
    });
    saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }),nombre?('Portal de Contrataciones Abiertas de Honduras - '+nombre+'.xlsx'):'Portal de Contrataciones Abiertas de Honduras.xlsx');
    }
}

function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}

function AbrirModalDescarga(selector,titulo,creacion){
    if(!$('body #'+selector).length){
        $('body').append(
            $('<div>',{class:'modal fade',id:selector,tabindex:'-1',role:'dialog','aria-hidden':'true','aria-labelledby':'modalDescarga'}).append(
                $('<div>',{class:'modal-dialog',role:'document'}).append(
                    $('<div>',{class:'modal-content'}).append(
                        $('<div>',{class:'modal-header'}).append(
                            $('<span>',{class:'titularCajonSombreado'}).text(
                                titulo
                            )
                        ),
                        $('<div>',{class:'modal-body textoAlineadoCentrado'}).append(
                            $('<div>',{style:'min-height:200px;position:relative',class:'contenedorEspera'}).append(
                                $('<div>',{class:'espera elemento'}).append(
                                    $('<img>',{class:'imagen',src:'/static/img/otros/loader.svg'}),
                                    $('<div>',{text:'Obteniendo Datos',class:'textoCargando'})
                                ),
                                $('<i>',{class:'fas fa-file-download textoColorPrimario descargaIcono fadeIn animated',style:'display:none;font-size:100px;line-height:200px'})
                            )
                            
                        ),
                        $('<div>',{class:'modal-footer'}).append(
                            $('<button>',{class:'botonGeneral fondoColorSecundario','data-dismiss':'modal',type:'button'}).text(
                                'Cancelar'
                            ),$('<button>',{class:'botonGeneral fondoColorGris botonDescarga',type:'button'}).text(
                                'Descargar'
                            )
                        )
                    )
                )
            )
        )
    }
    if(!creacion){
        $('body #'+selector).modal();
    }
    

}
function EliminarEventoModalDescarga(selector){
    if($('body #'+selector).length){
        $('body #'+selector+' .descargaIcono').hide();
        $('body #'+selector+' .botonDescarga').removeClass('fondoColorPrimario').addClass('fondoColorGris');
        $('body #'+selector+' .botonDescarga').off();
        $('body #'+selector+' .contenedorEspera .espera').show();
    }
    
}
function AgregarEventoModalDescarga(selector,funcion){
    if($('body #'+selector).length){
        $('body #'+selector+' .botonDescarga').removeClass('fondoColorGris').addClass('fondoColorPrimario');
        $('body #'+selector+' .botonDescarga').on({
            click:function(e){
                funcion();
            }
        });
        OcultarEspera('body #'+selector+' .contenedorEspera');
        $('body #'+selector+' .descargaIcono').show();
    }
    
    
}