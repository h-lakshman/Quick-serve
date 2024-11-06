from django.db import models
from authentication.models import User


<<<<<<< HEAD
=======
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


>>>>>>> quickserve
class Address(models.Model):
    building_name = models.CharField(max_length=64)
    street = models.CharField(max_length=30)
    area = models.CharField(max_length=20)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    pincode = models.CharField(max_length=8)

    def __str__(self) -> str:
        return self.city


<<<<<<< HEAD
class Category(models.Model):
    name = models.CharField(max_length=50)
=======
class Service(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=99)
    phone_number = models.CharField(max_length=12)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True)
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE, primary_key=True)
>>>>>>> quickserve

    def __str__(self) -> str:
        return self.name


class DaysAvailable(models.Model):
<<<<<<< HEAD
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


=======
    service = models.OneToOneField(
        Service, on_delete=models.PROTECT, primary_key=True)
    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)
>>>>>>> quickserve
