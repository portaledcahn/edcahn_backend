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
]