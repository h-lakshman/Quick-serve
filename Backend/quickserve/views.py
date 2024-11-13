from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from .models import Service, Review, User, Category
from .serializers import ServiceSerializer, ReviewSerializer, CategorySerializer
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import ValidationError
from .models import Service, Review, User
from .serializers import ReviewSerializer

from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from .models import Service, Review, User
from .serializers import ReviewSerializer, ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    @action(detail=False, methods=['get', 'put', 'delete', 'patch'], url_path='(?P<slug>[^/]+)')
    def get_service_by_name(self, request, slug=None):
        try:
            service = Service.objects.get(slug=slug)
            serializer = self.get_serializer(service)
            return Response(serializer.data, status=200)
        except Service.DoesNotExist:
            return Response({
                'detail': 'Service does not exist'
            }, status=400)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        service_slug = self.kwargs.get('service_slug')
        return Review.objects.filter(service__slug=service_slug)

    def perform_create(self, serializer):
        try:
            token = self.request.headers.get('token')
            if not token:
                raise ValidationError({'detail': 'Token is required.'})

            try:
                access_token = AccessToken(token)
            except TokenError as e:
                raise ValidationError({'detail': f'Invalid token: {str(e)}'})

            user_id = access_token.payload.get('user_id')

            if not user_id:
                raise ValidationError(
                    {'detail': 'Invalid token - no user_id found.'})

            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                raise ValidationError({'detail': 'User not found.'})

            service = Service.objects.get(slug=self.kwargs.get('service_slug'))
            print("user", user)
            serializer.save(service=service, user=user)

        except Service.DoesNotExist:
            raise ValidationError({'detail': 'Service not found.'})
        except Exception as e:
            raise ValidationError({'detail': f'Error: {str(e)}'})


@api_view(['GET'])
def search(request):
    location = request.GET.get('find_loc', default='')
    category_name = request.GET.get('find_desc', default='')
    queryset = Service.objects.all()
    desired = True
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
        desired = False
        if category_name:
            queryset = Service.objects.filter(
                category__name__icontains=category_name)

        if not queryset.exists():
            return Response({
                'detail': 'No services found matching your search criteria.',
                'desired': desired,
            }, status=404)

    serializer = ServiceSerializer(queryset, many=True)
    return Response({
        "results": serializer.data,
        "desired": desired
    }, status=200)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@api_view(['GET'])
def my_buisness(request):
    if request.method == "GET":
        token = request.headers.get('token')
        if not token:
            return Response({'detail': 'Token is required.'}, status=400)

        try:
            access_token = AccessToken(token)
        except TokenError as e:
            return Response({'detail': f'Invalid token: {str(e)}'}, status=400)

        user_id = access_token.payload.get('user_id')

        if not user_id:
            return Response(
                {'detail': 'Invalid token - no user_id found.'}, status=400)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=400)

        services = Service.objects.filter(user=user)

        if not services:
            return Response({'detail': 'No services found for this user.'}, status=404)

        service_serializer = ServiceSerializer(services, many=True)
        return Response({'services': service_serializer.data}, status=200)
