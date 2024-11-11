from django.contrib import admin

from .models import Service, Category, DaysAvailable, Address, Review

admin.site.register(Service)
admin.site.register(Category)
admin.site.register(DaysAvailable)
admin.site.register(Address)
admin.site.register(Review)
