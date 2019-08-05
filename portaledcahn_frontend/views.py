from django.shortcuts import render

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
    return render(request,'busqueda/busqueda.html')

def Comprador(request):
    return render(request,'comprador/comprador.html')

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

def Proveedor(request):
    return render(request,'proveedor/proveedor.html')

def Proveedores(request):
    return render(request,'proveedores/proveedores.html')
    
def Visualizaciones(request):
    return render(request,'visualizaciones/visualizaciones.html')

def Dashboard_Oncae(request):
    return render(request,'dashboard_oncae/dashboard_oncae.html')

def Dashboard_Sefin(request):
    return render(request,'dashboard_sefin/dashboard_sefin.html')
