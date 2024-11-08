from django.db import models
from authentication.models import User


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


class Address(models.Model):
    building_name = models.CharField(max_length=64)
    street = models.CharField(max_length=30)
    area = models.CharField(max_length=20)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    pincode = models.CharField(max_length=8)

    def __str__(self) -> str:
        return self.city


class Service(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=99)
    phone_number = models.CharField(max_length=12)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True)
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE)
    available_all_hours = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name


class DaysAvailable(models.Model):
    service = models.OneToOneField(
        Service, on_delete=models.PROTECT, primary_key=True)
    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)
