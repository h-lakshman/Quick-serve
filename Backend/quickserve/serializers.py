from rest_framework import serializers
from .models import Service, Category, DaysAvailable, Address


class DaysOpenSerializer(serializers.ModelSerializer):
    class Meta:
        model = DaysAvailable
        fields = ('monday', 'tuesday', 'wednesday',
                  'thursday', 'friday', 'saturday', 'sunday')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('building_name', 'street', 'area',
                  'city', 'state', 'pincode',)


class ServiceSerializer(serializers.ModelSerializer):
    daysavailable = DaysOpenSerializer()
    address = AddressSerializer()

    class Meta:
        model = Service
        fields = ['id', 'name', 'phone_number', 'address', 'category',
                  'daysavailable', 'opening_time', 'closing_time']

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
# {
#     "name": "Bella's Bakery",
#     "phone_number": "9988776655",
#     "address": {
#         "building_name": "Sunrise Bakery",
#         "street": "789 Maple Avenue",
#         "area": "Old Town",
#         "city": "Sunshine City",
#         "state": "Sunny State",
#         "pincode": "11223344"
#     },
#     "category": 2,
#     "daysavailable": {
#         "monday": false,
#         "tuesday": true,
#         "wednesday": true,
#         "thursday": true,
#         "friday": true,
#         "saturday": true,
#         "sunday": false
#     },
#     "opening_time": "08:00:00",
#     "closing_time": "18:00:00"
# }
