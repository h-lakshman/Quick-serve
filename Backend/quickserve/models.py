from django.db import models
from authentication.models import User
from django.utils.text import slugify
import random
import string


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
    slug = models.SlugField(unique=True, blank=True, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True)
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    address = models.OneToOneField(
        Address, on_delete=models.CASCADE)
    available_all_hours = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            slug = slugify(self.name)
            original_slug = slug
            while Service.objects.filter(slug=slug).exists():
                slug = f"{original_slug}-{self._generate_random_string()}"
            self.slug = slug
        super().save(*args, **kwargs)

    def _generate_random_string(self, length=6):
        """Generate a random string of letters and digits."""
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))


class Review(models.Model):
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.CharField(max_length=1000)
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)


class DaysAvailable(models.Model):
    service = models.OneToOneField(
        Service, on_delete=models.SET_NULL, null=True, related_name='daysavailable')
    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)
