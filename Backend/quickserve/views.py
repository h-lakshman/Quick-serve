from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
 
from .models import Service
from .serializers import ServiceSerializer
 
 
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
 
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance)
        return Response(serializer.data, status=200)
 