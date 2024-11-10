from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views
 
router = SimpleRouter()
router.register('services', views.ServiceViewSet)
router.register('reviews', views.ServiceReviewViewSet)
 
urlpatterns = router.urls + [
    path('search/', views.search, name='search')
]