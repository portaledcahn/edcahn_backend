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

