function ObtenerEnlaceRed(tipo,direccion){
    switch(tipo){
        case 'whatsapp':
        location.href='https://api.whatsapp.com/send?text='+encodeURIComponent(url+ direccion+'?año='+ObtenerAnoVisualizacionesDefecto());
        break;
        case 'facebook':
        location.href='http://www.facebook.com/sharer.php?u='+encodeURIComponent(url+direccion+'?año='+ObtenerAnoVisualizacionesDefecto());
        break;
        case 'twitter':
        location.href='https://twitter.com/intent/tweet?text='+encodeURIComponent(url+direccion+'?año='+ObtenerAnoVisualizacionesDefecto());
        break;
        default:
        break;
    }
    
}
function AccederVisualizacion(direccion){
    location.href=direccion+'?año='+ObtenerAnoVisualizacionesDefecto();
}
function ObtenerAnoVisualizacionesDefecto(){
    if((new Date()).getMonth()==0){
        return (new Date()).getFullYear() - 1;
    }else{
        return (new Date()).getFullYear();
    }
}