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
	path('proveedores/<path:partieId>/productos/', viewsets.ProductosDelProveedor.as_view()),
	path('proveedores/<path:partieId>/contratos/', viewsets.ContratosDelProveedor.as_view()),
	path('proveedores/<path:partieId>/pagos/', viewsets.PagosDelProveedor.as_view()),
	path('proveedores/<path:partieId>/', viewsets.Proveedor.as_view()),
	
	path('compradores/', viewsets.Compradores.as_view()),
	path('compradores/<path:partieId>/procesos/', viewsets.ProcesosDelComprador.as_view()),
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

	path('dashboardoncae/filtros/', viewsets.FiltrosDashboardONCAE.as_view()),
	path('dashboardoncae/procesosporcategoria/', viewsets.GraficarProcesosPorCategorias.as_view()),
	path('dashboardoncae/procesospormodalidad/', viewsets.GraficarProcesosPorModalidad.as_view()),
	path('dashboardoncae/cantidaddeprocesos/', viewsets.GraficarCantidadDeProcesosMes.as_view()),
	path('dashboardoncae/estadisticacantidaddeprocesos/', viewsets.EstadisticaCantidadDeProcesos.as_view()),
	path('dashboardoncae/procesosporetapa/', viewsets.GraficarProcesosPorEtapa.as_view()),
	path('dashboardoncae/montosdecontratos/', viewsets.GraficarMontosDeContratosMes.as_view()),
	path('dashboardoncae/estadisticacantidaddecontratos/', viewsets.EstadisticaCantidadDeContratos.as_view()),
	path('dashboardoncae/estadisticamontosdecontratos/', viewsets.EstadisticaMontosDeContratos.as_view()),
	path('dashboardoncae/contratosporcategoria/', viewsets.GraficarContratosPorCategorias.as_view()),
	path('dashboardoncae/contratospormodalidad/', viewsets.GraficarContratosPorModalidad.as_view()),
	path('dashboardoncae/topcompradores/', viewsets.TopCompradoresPorMontoContratado.as_view()),
	path('dashboardoncae/topproveedores/', viewsets.TopProveedoresPorMontoContratado.as_view()),
	path('dashboardoncae/tiemposporetapa/', viewsets.GraficarProcesosTiposPromediosPorEtapa.as_view()),

	path('indicadoresoncae/filtros/', viewsets.FiltrosDashboardONCAE.as_view()),
	path('indicadoresoncae/montoporcategoria/', viewsets.IndicadorMontoContratadoPorCategoria.as_view()),
	path('indicadoresoncae/cantidadcontratosporcategoria/', viewsets.IndicadorCantidadProcesosPorCategoria.as_view()),
	path('indicadoresoncae/topcompradores/', viewsets.IndicadorTopCompradores.as_view()),
	path('indicadoresoncae/catalogos/', viewsets.IndicadorCatalogoElectronico.as_view()),
	path('indicadoresoncae/contratospormodalidad/', viewsets.IndicadorContratosPorModalidad.as_view()),

]