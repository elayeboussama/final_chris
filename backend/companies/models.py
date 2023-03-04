from django.db import models
from django.contrib.auth.models import User
# Create your models here.



class Supplier_Company(models.Model):
    # this is for list one 
    company_name = models.CharField(max_length=50)
    employees_number = models.CharField(max_length=200)
    adress = models.CharField(max_length=200)
    project_size = models.CharField(max_length=200)
    expertise = models.CharField(max_length=50)
    company_type = models.CharField(max_length=50 , default = 'supplier')
    company_owner = models.CharField(max_length=200, null=True)



class Customers_Company(models.Model):
    # this is for list two
    company_name = models.CharField(max_length=50)
    employees_number = models.CharField(max_length=200)
    adress = models.CharField(max_length=200)
    company_type = models.CharField(max_length=50 , default = 'customer')
    company_owner = models.CharField(max_length=200, null=True)