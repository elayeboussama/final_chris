from django.contrib import admin
from .models import Supplier_Company, Customers_Company, Profile

# Register your models here.



admin.site.register(Profile)
admin.site.register(Supplier_Company)
admin.site.register(Customers_Company)