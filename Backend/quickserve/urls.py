from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register('services', views.ServiceViewSet)
router.register(
    r'services/(?P<service_slug>[^/]+)/reviews',
    views.ReviewViewSet,
    basename='service-reviews'
)
router.register('categories', views.CategoryViewSet, basename='categories')

urlpatterns = router.urls + [
    path('search/', views.search, name='search')
]
