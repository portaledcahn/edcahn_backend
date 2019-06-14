from django.urls import path, include
from rest_framework import routers

from . import views, viewsets

router = routers.DefaultRouter()
router.register(r'release', viewsets.ReleaseViewSet)
router.register(r'record', viewsets.RecordViewSet)

urlpatterns = [
	path('', include(router.urls)),
]