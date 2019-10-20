from django.urls import path, include
from rest_framework import routers

from . import views, viewsets

router = routers.DefaultRouter()
router.register(r'release', viewsets.ReleaseViewSet)

urlpatterns = [
	path('', include(router.urls)),
	path('record/', viewsets.Record.as_view()),
	path('record/<path:pk>/', viewsets.RecordDetail.as_view()),

	path('inicio/', viewsets.Index.as_view()),
	path('buscador/', viewsets.Buscador.as_view()),
	path('proveedores/', viewsets.Proveedores.as_view()),
	path('proveedores/<path:partieId>/contratos/', viewsets.ContratosDelProveedor.as_view()),
	path('proveedores/<path:partieId>/pagos/', viewsets.PagosDelProveedor.as_view()),
	path('proveedores/<path:partieId>/', viewsets.Proveedor.as_view()),
	
	path('compradores/', viewsets.Compradores.as_view()),
	path('compradores/<path:partieId>/contratos/', viewsets.ContratosDelComprador.as_view()),
	path('compradores/<path:partieId>/pagos/', viewsets.PagosDelComprador.as_view()),
	path('compradores/<path:partieId>/', viewsets.Comprador.as_view()),

	path('dashboardsefin/filtros/', viewsets.FiltrosDashboardSEFIN.as_view()),
	path('dashboardsefin/cantidaddepagos/', viewsets.GraficarCantidadDePagosMes.as_view()),
	path('dashboardsefin/montosdepagos/', viewsets.GraficarMontosDePagosMes.as_view()),
	path('dashboardsefin/estadisticamontosdepagos/', viewsets.EstadisticaMontoDePagos.as_view()),
	path('dashboardsefin/estadisticacantidaddepagos/', viewsets.EstadisticaCantidadDePagos.as_view()),
	path('dashboardsefin/topcompradores/', viewsets.TopCompradoresPorMontoPagado.as_view()),
	path('dashboardsefin/topproveedores/', viewsets.TopProveedoresPorMontoPagado.as_view()),
	path('dashboardsefin/topobjetosgasto/', viewsets.TopObjetosDeGastoPorMontoPagado.as_view()),
	path('dashboardsefin/etapaspago/', viewsets.EtapasPagoProcesoDeCompra.as_view()),
]