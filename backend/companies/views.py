from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.response import Response
from .serializers import CustomersCompanySerializer, SupplierCompanySerializer
from .models import Customers_Company, Supplier_Company
# Create your views here.



@api_view(['GET'])
def getRoutes(request):
    routes = [
        'customer/register',
        'supplier/register',
        'customer/list',
        'supplier/list',
        
    ]

    return Response(routes)



@api_view(['POST'])
def CustomerCompanyRegister(request):
    serializer = CustomersCompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def SupplierCompanyRegister(request):
    serializer = SupplierCompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)    


@api_view(['GET'])
def CustomerCompanyList(request):
    company = Customers_Company.objects.all()
    serializer = CustomersCompanySerializer(company, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def SupplierCompanyList(request):
    company = Supplier_Company.objects.all()
    serializer = SupplierCompanySerializer(company, many=True)
    return Response(serializer.data)    