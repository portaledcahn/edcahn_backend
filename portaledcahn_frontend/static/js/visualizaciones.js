function ObtenerEnlaceRed(tipo,direccion){
    switch(tipo){
        case 'whatsapp':
        location.href='https://api.whatsapp.com/send?text='+encodeURIComponent(url+ direccion+'?año='+2019/*(new Date()).getFullYear()*/);
        break;
        case 'facebook':
        location.href='http://www.facebook.com/sharer.php?u='+encodeURIComponent(url+direccion+'?año='+2019/*(new Date()).getFullYear()*/);
        break;
        case 'twitter':
        location.href='https://twitter.com/intent/tweet?text='+encodeURIComponent(url+direccion+'?año='+2019/*(new Date()).getFullYear()*/);
        break;
        default:
        break;
    }
    
}
function AccederVisualizacion(direccion){
    location.href=direccion+'?año='+2019/*(new Date()).getFullYear()*/;
}