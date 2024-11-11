from rest_framework import serializers
from .models import Service, Category, DaysAvailable, Address, Review


class DaysOpenSerializer(serializers.ModelSerializer):
    class Meta:
        model = DaysAvailable
        fields = ('monday', 'tuesday', 'wednesday',
                  'thursday', 'friday', 'saturday', 'sunday')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')  # Include ID so it can be referenced directly


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('building_name', 'street', 'area',
                  'city', 'state', 'pincode')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('service', 'user', 'review',
                  'rating', 'created_at', 'modified_at')

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

    class Meta:
        model = Service
        fields = ['id', 'name', 'phone_number', 'address',
                  'category', 'daysavailable', 'opening_time', 'closing_time']

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address = Address.objects.create(**address_data)

        days_available_data = validated_data.pop('daysavailable')

        service = Service.objects.create(
            address=address,
            **validated_data
        )

        DaysAvailable.objects.create(
            service=service,
            **days_available_data
        )

        return service
