from django.contrib import admin
from .models import Service, Category, Address, DaysAvailable

admin.site.register(Service)
admin.site.register(Category)
admin.site.register(Address)
admin.site.register(DaysAvailable)
