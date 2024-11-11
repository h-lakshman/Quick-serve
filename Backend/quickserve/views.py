from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.request import HttpRequest
from rest_framework.decorators import api_view
from rest_framework.decorators import action

from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    @action(detail=False, methods=['get'], url_path='(?P<slug>[^/]+)')
    def get_service_by_name(self, request, slug=None):
        try:
            service = Service.objects.get(slug=slug)
            serializer = self.get_serializer(service)
            return Response(serializer.data, status=200)
        except Service.DoesNotExist:
            return Response({
                'detail': 'Service doesnot exists'
            }, status=400)


@api_view(['GET'])
def search(request):
    location = request.GET.get('find_loc', default='')
    category_name = request.GET.get('find_desc', default='')
    queryset = Service.objects.all()

    if not category_name and not location:
        return Response({
            'detail': 'Please provide at least one search parameter: category (find_desc) or location (find_loc).'
        }, status=400)

    if category_name:
        queryset = queryset.filter(category__name__icontains=category_name)

    if location:
        queryset = queryset.filter(
            Q(address__street__icontains=location) |
            Q(address__area__icontains=location) |
            Q(address__city__icontains=location) |
            Q(address__state__icontains=location)
        )

    if not queryset.exists():
        if category_name:
            queryset = Service.objects.filter(
                category__name__icontains=category_name)

        if not queryset.exists():
            return Response({
                'detail': 'No services found matching your search criteria.',
            }, status=404)

    serializer = ServiceSerializer(queryset, many=True)
    return Response(serializer.data, status=200)
