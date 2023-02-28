from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Supplier_Company, Customers_Company
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password







class SupplierCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier_Company
        fields = '__all__'


class CustomersCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers_Company                                         
        fields = '__all__'        