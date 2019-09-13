from django.shortcuts import render
from portaledcahn_backend import documents
from django.core.paginator import Paginator, Page, EmptyPage, PageNotAnInteger

class DSEPaginator(Paginator):
    """
    Override Django's built-in Paginator class to take in a count/total number of items;
    Elasticsearch provides the total as a part of the query results, so we can minimize hits.
    """
    def __init__(self, *args, **kwargs):
        super(DSEPaginator, self).__init__(*args, **kwargs)
        self._count = self.object_list.hits.total
        print("Total", self.object_list.hits.total)

    def page(self, number):
        # this is overridden to prevent any slicing of the object_list - Elasticsearch has
        # returned the sliced data already.
        number = self.validate_number(number)
        return Page(self.object_list, number, self)

# Create your views here.
def Inicio(request):
    return render(request,'inicio/inicio.html')

def Proceso(request,ocid=''):
    return render(request,'proceso/proceso.html',{'ocid':ocid.replace('"','')})

def Api(request):
    return render(request,'api/api.html')

def Acerca(request):
    return render(request,'acerca/acerca.html')

def Busqueda(request):
    """page = int(request.GET.get('page', '1'))
    start = (page-1) * 10
    end = start + 10

    q = my_param = request.GET.get('q', '')

    query = {
      "query": {
        "bool": {
          "must": [
            {
              "query_string": {
                "query": q
              }
            },
            {
              "match": {
                "data.releases.tag": "contract"
              }
            }
          ]
        }        
        },
          "aggs" : {
            "distinct_suppliers" : {
                "cardinality" : {
                  "field" : "data.compiledRelease.contracts.suppliers.id.keyword"
                }
            },
            "distinct_buyers" : {
                "cardinality" : {
                  "field" : "data.compiledRelease.contracts.buyer.id.keyword"
                }
            },
            "distinct_contracts" : {
                "cardinality" : {
                  "field" : "data.compiledRelease.contracts.id.keyword"
                }
            },
            "avg_amount": {
                "avg": {
                    "field": "data.compiledRelease.contracts.value.amount"
                }
            }
        }  
    } 

    response = documents.DataDocument.search().from_dict(query)[start:end].execute()

    # for h in response.hits:
    #     print (h.data.ocid)

    paginator = DSEPaginator(response, 1)
    
    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(0)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    context = {
        "resultados": response.hits,
        "resumen": response.aggregations,
        "q": q,
        "posts": posts
    }"""

    return render(request,'busqueda/busqueda.html')

def Comprador(request,id=''):
    return render(request,'comprador/comprador.html',{'id':id})

def Compradores(request):
    return render(request,'compradores/compradores.html')

def Descargas(request):
    return render(request,'descargas/descargas.html')

def Preguntas(request):
    return render(request,'preguntas/preguntas.html')

def Procesos_Comprador(request):
    return render(request,'procesos_comprador/procesos_comprador.html')

def Procesos_Proveedor(request):
    return render(request,'procesos_proveedor/procesos_proveedor.html')

def Proveedor(request,id=''):
    return render(request,'proveedor/proveedor.html',{'id':id})

def Proveedores(request):
    parametros = {
      "nombre" : request.GET.get('nombre',''),
      "identificacion" : request.GET.get('identificacion',''),
      "tmc" : request.GET.get('tmc','').replace(">", "").replace("<", "").replace("=", ""),
      "pmc" : request.GET.get('pmc','').replace(">", "").replace("<", "").replace("=", ""),
      "mamc" : request.GET.get('mamc','').replace(">", "").replace("<", "").replace("=", ""),
      "fua" : request.GET.get('fua','').replace(">", "").replace("<", "").replace("=", ""),
      "memc" : request.GET.get('memc','').replace(">", "").replace("<", "").replace("=", ""),
      "paginarPor" : int(request.GET.get('paginarPor','')),
      "orderBy" : request.GET.get('orderBy','')
    }
    parametros['operadortmc'] = verificarOperador(request.GET.get('tmc',''))
    parametros['operadorpmc'] = verificarOperador(request.GET.get('pmc',''))
    parametros['operadormamc'] = verificarOperador(request.GET.get('mamc',''))
    parametros['operadormemc'] = verificarOperador(request.GET.get('memc',''))
    parametros['operadorfua'] = verificarOperador(request.GET.get('fua',''))

    parametros['ordennombre'] = verificarOrden(request.GET.get('orderBy',''),'nombre')
    parametros['ordenidentificacion'] = verificarOrden(request.GET.get('orderBy',''),'identificacion')
    parametros['ordentmc'] = verificarOrden(request.GET.get('orderBy',''),'tmc')
    parametros['ordenpmc'] = verificarOrden(request.GET.get('orderBy',''),'pmc')
    parametros['ordenmamc'] = verificarOrden(request.GET.get('orderBy',''),'mamc')
    parametros['ordenfua'] = verificarOrden(request.GET.get('orderBy',''),'fua')
    parametros['ordenmemc'] = verificarOrden(request.GET.get('orderBy',''),'memc')
    
    return render(request,'proveedores/proveedores.html',parametros)
    
def Visualizaciones(request):
    return render(request,'visualizaciones/visualizaciones.html')

def Dashboard_Oncae(request):
    return render(request,'dashboard_oncae/dashboard_oncae.html')

def Dashboard_Sefin(request):
    return render(request,'dashboard_sefin/dashboard_sefin.html')


def verificarOperador(filtro):
    operador='<'
    if(filtro):
      if('>' in filtro):
        operador='>'
      if('=' in filtro):
        operador='='
    return operador

def verificarOrden(filtro,nombre):
    filtrosProveedoresPropiedades = {
    "fecha_ultimo_proceso" : "fua",
    "id" : "identificacion",
    "mayor_monto_contratado" : "mamc",
    "menor_monto_contratado" : "memc",
    "name" : "nombre",
    "procesos" : "procesos",
    "promedio_monto_contratado" : "pmc",
    "total_monto_contratado" : "tmc"
    }
    orden='neutro'
    if((filtro.replace("desc(", "").replace("asc(", "").replace(")", "") in filtrosProveedoresPropiedades) and filtrosProveedoresPropiedades[filtro.replace("desc(", "").replace("asc(", "").replace(")", "")] == nombre):
      if(filtro):
        if('asc(' in filtro):
          orden='ascendente'
        if('desc(' in filtro):
          orden='descendente'
    return orden