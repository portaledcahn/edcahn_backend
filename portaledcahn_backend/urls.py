from django.urls import path, include
from rest_framework import routers

from . import views, viewsets

router = routers.DefaultRouter()
router.register(r'release', viewsets.ReleaseViewSet)
router.register(r'record', viewsets.RecordViewSet)
# router.register(r'contract', viewsets.ContractsViewSet)
# router.register(r'contrato', viewsets.ContratoViewSet)
# router.register(r'buyer', viewsets.BuyerViewSet)
# router.register(
# 	prefix=r'data',
# 	base_name='data',
# 	viewset=viewsets.DataViewSet
# )
# router.register(
# 	prefix=r'datarecord',
# 	base_name='datarecord',
# 	viewset =viewsets.DataRecordViewSet
# )

urlpatterns = [
	path('', include(router.urls)),
	# path('compradores/', viewsets.BuyerList.as_view()),
	path('inicio/', viewsets.Index.as_view()),
	path('buscador/', viewsets.Buscador.as_view()),
	path('proveedores/', viewsets.Proveedores.as_view()),
	path('proveedores/<path:partieId>/contratos/', viewsets.ContratosDelProveedor.as_view()),
	path('proveedores/<path:partieId>/pagos/', viewsets.PagosDelProveedor.as_view()),
	path('proveedores/<path:partieId>/', viewsets.Proveedor.as_view()),
	
	path('compradores/', viewsets.Compradores.as_view()),
	path('compradores/<path:partieId>/', viewsets.Comprador.as_view()),

	path('dashboardsefin/filtros/', viewsets.FiltrosDashboardSEFIN.as_view()),
	path('dashboardsefin/cantidaddepagos/', viewsets.GraficarCantidadDePagosMes.as_view()),
	path('dashboardsefin/montosdepagos/', viewsets.GraficarMontosDePagosMes.as_view()),
	path('dashboardsefin/estadisticamontosdepagos/', viewsets.EstadisticaMontoDePagos.as_view()),
	path('dashboardsefin/topcompradores/', viewsets.TopCompradoresPorMontoPagado.as_view()),
	path('dashboardsefin/topproveedores/', viewsets.TopProveedoresPorMontoPagado.as_view()),
]