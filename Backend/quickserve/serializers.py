from rest_framework import serializers
from .models import Service, Category, DaysAvailable, Address, Review
from django.db.models import Avg
from django.db import transaction


class DaysOpenSerializer(serializers.ModelSerializer):
    class Meta:
        model = DaysAvailable
        fields = ('monday', 'tuesday', 'wednesday',
                  'thursday', 'friday', 'saturday', 'sunday')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('building_name', 'street', 'area',
                  'city', 'state', 'pincode')


class ReviewSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(
        source='user.get_full_name', read_only=True)
    created_at = serializers.DateTimeField(
        format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'review', 'rating',
                  'created_at', 'modified_at', 'full_name']

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "Rating must be between 1 and 5.")
        return value


class ServiceSerializer(serializers.ModelSerializer):
    daysavailable = DaysOpenSerializer()
    address = AddressSerializer()
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all())
    average_rating = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'name', 'phone_number', 'address',
                  'category', 'daysavailable', 'opening_time', 'closing_time',
                  'average_rating', 'slug']

    def get_average_rating(self, obj):
        reviews = Review.objects.filter(service=obj)
        if reviews.exists():
            avg_rating = reviews.aggregate(Avg('rating'))['rating__avg']
            return round(avg_rating, 1)
        return None

    def create(self, validated_data):
        address_data = validated_data['address']
        address = Address(
            building_name=address_data.get('building_name', None),
            street=address_data.get('street', None),
            area=address_data.get('area', None),
            city=address_data.get('city', None),
            state=address_data.get('state', None),
            pincode=address_data.get('pincode', None),
        )
        address.save()
        service = Service(
            name=validated_data['name'],
            phone_number=validated_data['phone_number'],
            category=validated_data['category'],
            opening_time=validated_data['opening_time'],
            closing_time=validated_data['closing_time'],
            address=address,
        )
        service.save()

        days_available_data = validated_data['daysavailable']
        days_available = DaysAvailable(
            service=service,
            monday=days_available_data.get('monday', False),
            tuesday=days_available_data.get('tuesday', False),
            wednesday=days_available_data.get('wednesday', False),
            thursday=days_available_data.get('thursday', False),
            friday=days_available_data.get('friday', False),
            saturday=days_available_data.get('saturday', False),
            sunday=days_available_data.get('sunday', False),
        )
        days_available.save()
        return service
