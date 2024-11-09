from django.contrib import admin
 
from .models import Service, Category, DaysAvailable, Address
 
admin.site.register(Service)
admin.site.register(Category)
admin.site.register(DaysAvailable)
admin.site.register(Address)