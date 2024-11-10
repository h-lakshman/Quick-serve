from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.request import HttpRequest
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated
from .models import Service, ServiceReview
from .serializers import ServiceSerializer, ServiceReviewSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance)
        return Response(serializer.data, status=200)


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


class ServiceReviewViewSet(viewsets.ModelViewSet):
    queryset = ServiceReview.objects.all()
    serializer_class = ServiceReviewSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        service = Service.objects.get(id=request.data['service'])
        rating_value = request.data['rating']
        review_text = request.data['review_text']
        
        existing_review = ServiceReview.objects.filter(user=request.user, service=service)
        if existing_review.exists():
            return Response({"detail": "You have already reviewed this service."}, status=400)

        review = ServiceReview.objects.create(
            service=service,
            user=request.user,
            rating=rating_value,
            review_text=review_text
        )
        return Response(ServiceReviewSerializer(review).data, status=201)
