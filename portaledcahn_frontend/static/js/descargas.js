$('.opcionFiltroBusquedaPagina').on('click',function(e){
    $(e.currentTarget).addClass('active')
  })
  tippy('#buscarInformacion', {
    arrow: true,
    arrowType: 'round',
    content:'Haz click para buscar'
  });
var selector='descargas';
$(function(){
  AgregarResultados(1);
  $('#'+selector+'Buscar').on({
    change:function(e){
      AgregarResultados(1);
    }
  });
  $('#'+selector+'Buscar').next('i').on({
    click:function(e){
      AgregarResultados(1);
    }
  });
  $('#'+selector+'CantidadResultados').on({
    change:function(e){
      AgregarResultados(1);
    }
  });
  
})
var descargasOncae=[ 
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2019 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2019_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2019.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2019.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2019.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2018 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2018_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2018.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2018.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2018.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2017 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2017_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2017.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2017.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2017.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2016 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2016_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2016.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2016.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2016.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2015 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2015_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2015.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2015.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2015.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2014 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2014_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2014.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2014.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2014.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2013 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2013_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2013.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2013.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2013.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2012 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2012_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2012.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2012.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2012.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2011 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2011_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2011.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2011.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2011.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2010 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2010_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2010.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2010.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2010.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2009 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2009_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2009.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2009.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2009.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2008 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2008_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2008.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2008.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2008.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2007 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2007_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2007.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2007.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2007.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2006 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2006_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2006.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2006.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2006.xlsx"
  },
  { 
     "fuente":"HonduCompras 1.0 - Módulo de Difusión de Compras y Contrataciones",
     "fecha":" 2005 ",
     "json":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2005_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/HC1/HC1_2005.md5",
     "csv":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2005.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/HC1/HC1_datos_2005.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2019 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2019_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2019.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2019.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2019.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2018 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2018_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2018.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2018.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2018.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2017 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2017_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2017.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2017.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2017.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2016 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2016_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2016.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2016.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2016.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2015 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2015_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2015.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2015.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2015.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2014 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2014_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2014.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2014.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2014.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2013 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2013_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2013.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2013.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2013.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2012 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2012_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2012.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2012.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2012.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2011 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2011_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2011.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2011.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2011.xlsx"
  },
  { 
     "fuente":"Módulo de Difusión Directa de Contratos",
     "fecha":" 2010 ",
     "json":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2010_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/DDC/DDC_2010.md5",
     "csv":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2010.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/DDC/DDC_datos_2010.xlsx"
  },
  { 
     "fuente":"Catálogo Electrónico",
     "fecha":" 2019 ",
     "json":"http://181.210.15.175/datosabiertos/CE/CE_datos_2019_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/CE/CE_2019.md5",
     "csv":"http://181.210.15.175/datosabiertos/CE/CE_datos_2019.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/CE/CE_datos_2019.xlsx"
  },
  { 
     "fuente":"Catálogo Electrónico",
     "fecha":" 2018 ",
     "json":"http://181.210.15.175/datosabiertos/CE/CE_datos_2018_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/CE/CE_2018.md5",
     "csv":"http://181.210.15.175/datosabiertos/CE/CE_datos_2018.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/CE/CE_datos_2018.xlsx"
  },
  { 
     "fuente":"Catálogo Electrónico",
     "fecha":" 2017 ",
     "json":"http://181.210.15.175/datosabiertos/CE/CE_datos_2017_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/CE/CE_2017.md5",
     "csv":"http://181.210.15.175/datosabiertos/CE/CE_datos_2017.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/CE/CE_datos_2017.xlsx"
  },
  { 
     "fuente":"Catálogo Electrónico",
     "fecha":" 2016 ",
     "json":"http://181.210.15.175/datosabiertos/CE/CE_datos_2016_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/CE/CE_2016.md5",
     "csv":"http://181.210.15.175/datosabiertos/CE/CE_datos_2016.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/CE/CE_datos_2016.xlsx"
  },
  { 
     "fuente":"Catálogo Electrónico",
     "fecha":" 2015 ",
     "json":"http://181.210.15.175/datosabiertos/CE/CE_datos_2015_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/CE/CE_2015.md5",
     "csv":"http://181.210.15.175/datosabiertos/CE/CE_datos_2015.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/CE/CE_datos_2015.xlsx"
  },
  { 
     "fuente":"Catálogo Electrónico",
     "fecha":" 2014 ",
     "json":"http://181.210.15.175/datosabiertos/CE/CE_datos_2014_json.zip",
     "md5":"http://181.210.15.175/datosabiertos/CE/CE_2014.md5",
     "csv":"http://181.210.15.175/datosabiertos/CE/CE_datos_2014.zip",
     "xlsx":"http://181.210.15.175/datosabiertos/CE/CE_datos_2014.xlsx"
  }
];


function ObtenerResultadosFiltrados(){
  return descargasOncae.filter(function(elemento){
    if(ValidarCadena($('#'+selector+'Buscar').val().trim())){
      return (ContenerCadena(elemento.fuente,$('#'+selector+'Buscar').val().trim())||ContenerCadena(elemento.fecha,$('#'+selector+'Buscar').val().trim()));
    }else{
      return true;
    }
  });
}

function ObtenerResultadosPagina(){
  return ObtenerNumero($('#'+selector+'CantidadResultados').val())?ObtenerNumero($('#'+selector+'CantidadResultados').val()):5;
}
function AgregarResultados(pagina){
  var filtrados=ObtenerResultadosFiltrados();
  $('#'+selector).html('');
  $.each(filtrados,function(i,descarga){
    if(!(i<=((ObtenerResultadosPagina()*pagina)-1)&&i>=((ObtenerResultadosPagina()*pagina)-ObtenerResultadosPagina()))){
      return;
    }
    $('#'+selector).append(
      $('<div>',{class:'cajonDescarga posicionRelativa textoColorBlanco fondoColorClaro transicion'}).append(
        $('<div>',{class:'contenedorFechaDescarga fondoColorSecundario'}).append(
          $('<span>',{class:'fechaMesDescarga textoColorBlanco',html:'&nbsp;'}),
          $('<span>',{class:'fechaAnoDescarga textoColorBlanco',text:descarga.fecha})
        ),
        $('<div>',{class:'contenedorPropiedadesDescarga'}).append(
          $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-12 col-sm-6 col-md-6 col-lg-6'}).append(
              $('<span>',{class:'tituloDescarga textoColorSecundario'}),
              $('<span>',{class:'descripcionDescarga textoColorSecundario',text:descarga.fuente})
            ),
            $('<div>',{class:'col-12 col-sm-6 col-md-6 col-lg-6'}).append(
              $('<div>',{class:'contenedorClasesArchivos'}).append(
                $('<a>',{href:descarga.json,target:'_blank'}).append(
                  $('<span>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor'}).append(
                    $('<i>',{class:'fas fa-file-download'}),
                    ' .JSON'
                  )
                ),
                $('<a>',{href:descarga.csv,target:'_blank'}).append(
                  $('<span>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor'}).append(
                    $('<i>',{class:'fas fa-file-download'}),
                    ' .CSV'
                  )
                ),
                $('<a>',{href:descarga.xls,target:'_blank'}).append(
                  $('<span>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor'}).append(
                    $('<i>',{class:'fas fa-file-download'}),
                    ' .XLS'
                  )
                ),
                $('<a>',{href:descarga.md5,target:'_blank'}).append(
                  $('<span>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor'}).append(
                    $('<i>',{class:'fas fa-file-download'}),
                    ' .MD5'
                  )
                )
              )
            )
          )
        )
      )
    )
  })
  MostrarPaginacion(pagina);

}


function MostrarPaginacion(pagina){
  $('#'+selector+'Mostrando').html(
    'Mostrando '+(ObtenerResultadosPagina()*pagina-ObtenerResultadosPagina()+1)+' a '+(Math.ceil(ObtenerResultadosFiltrados().length/ObtenerResultadosPagina())==pagina?ObtenerResultadosFiltrados().length:ObtenerResultadosPagina()*pagina)+' de '+ObtenerResultadosFiltrados().length+' Descargas'
  )
  var paginacion=ObtenerPaginacion(pagina, Math.ceil(ObtenerResultadosFiltrados().length/ObtenerResultadosPagina()))  ;
  $('.navegacionTablaGeneral').html('');
  if(pagina>1){
    $('.navegacionTablaGeneral').append(
      $('<a href="javascript:AgregarResultados('+(pagina-1)+')" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-left"></i></span></a>')
    );
  }
  
  for(var i=0; i<paginacion.length;i++){
    if(paginacion[i]=='...'){
      $('.navegacionTablaGeneral').append(
        $('<a href="javascript:void(0)" class="numerosNavegacionTablaGeneral numeroNormalNavegacionTablaGeneral">').append($('<span>').text(paginacion[i]))
      );
    }else{
      $('.navegacionTablaGeneral').append(
        $('<a href="javascript:AgregarResultados('+paginacion[i]+')" class="numerosNavegacionTablaGeneral '+((paginacion[i]==pagina)?'current':'')+'">').append($('<span>').text(paginacion[i]))
      );
    }
  }
  if(pagina<=((ObtenerResultadosPagina()*pagina)-1)){
    $('.navegacionTablaGeneral').append(
      $('<a href="javascript:AgregarResultados('+(pagina+1)+')" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-right"></i></span></a>')
    );
  }
  
}