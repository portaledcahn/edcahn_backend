from django.urls import path, include
from portaledcahn_frontend import views as frontend_views

urlpatterns = [
	path('', frontend_views.Inicio),
    path('proceso/<str:ocid>/', frontend_views.Proceso),
    path('proceso/', frontend_views.Proceso),
    path('servicio/', frontend_views.Api),
    path('acerca/', frontend_views.Acerca),
    path('busqueda/', frontend_views.Busqueda),
    path('comprador/', frontend_views.Comprador),
    path('comprador/<str:id>/', frontend_views.Comprador),
    path('compradores/', frontend_views.Compradores),
    path('descargas/', frontend_views.Descargas),
    path('preguntas/', frontend_views.Preguntas),
    path('procesos_comprador/', frontend_views.Procesos_Comprador),
    path('procesos_proveedor/', frontend_views.Procesos_Proveedor),
    path('proveedor/', frontend_views.Proveedor),
    path('proveedor/<str:id>/', frontend_views.Proveedor),
    path('proveedores/', frontend_views.Proveedores),
    path('visualizaciones/', frontend_views.Visualizaciones),
]