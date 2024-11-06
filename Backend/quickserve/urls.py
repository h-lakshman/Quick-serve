from rest_framework.routers import SimpleRouter
from .views import ServiceViewSet

router = SimpleRouter()
router.register('services', ServiceViewSet)

urlpatterns = router.urls
