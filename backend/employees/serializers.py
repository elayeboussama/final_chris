from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Supplier_Employees, Customer_Employees



class CustomerEmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer_Employees
        fields = '__all__'


class SupplierEmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier_Employees
        fields = '__all__'
