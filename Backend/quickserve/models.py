from django.db import models
from authentication.models import User


class Address(models.Model):
    building_name = models.CharField(max_length=64)
    street = models.CharField(max_length=30)
    area = models.CharField(max_length=20)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    pincode = models.CharField(max_length=8)

    def __str__(self) -> str:
        return self.city


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


class DaysAvailable(models.Model):
    class days(models.TextChoices):
        Sunday = "Sunday", "Sunday"
        Monday = "Monday", "Monday"
        Tuesday = "Tuesday", "Tuesday"
        Wednesday = "Wednesday", "Wednesday"
        Thursday = "Thursday", "Thursday"
        Friday = "Friday", "Friday"
        Saturday = "Saturday", "Saturday"
    day = models.CharField(max_length=10, choices=days.choices, unique=True)

    def __str__(self) -> str:
        return self.day


class Service(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=99)
    phone_number = models.CharField(max_length=12)
    address = models.OneToOneField(Address, on_delete=models.PROTECT)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True)
    days_open = models.ManyToManyField(DaysAvailable, related_name="services")
    opening_time = models.TimeField()
    closing_time = models.TimeField()

    def __str__(self) -> str:
        return self.name


