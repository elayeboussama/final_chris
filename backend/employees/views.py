from django.shortcuts import render
from django.contrib.auth.models import User
from users.serializers import UserSerializer
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerEmployeesSerializer, SupplierEmployeesSerializer
from .models import Customer_Employees
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
# from .tokens import account_activation_token
from django.utils .encoding import force_bytes, force_str
from django.shortcuts import render
from django.core.mail import send_mail
import json
from companies.serializers import CustomersCompanySerializer, SupplierCompanySerializer 
from companies.models import Customers_Company, Supplier_Company
from users.serializers import RegisterSerializer,UserSerializer
from time import sleep
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
def InviteEmployee(request):
    print(request.data)
    if request.data['inviter_type']=='customer':
        print('customer')
        company = Customers_Company.objects.get(company_owner=request.user.username)
        company_serializer = CustomersCompanySerializer(instance=company)
        print(company_serializer.data)
        permission = request.data['user']['permession']
        companyName = company_serializer.data['company_name']
        companyId= company_serializer.data['id']
        company_type= company_serializer.data['company_type']
        subject = 'Invitation to join us!'
        from_email = request.user.email
        to_email = request.data['user']['email']
        message = 'you have a new invitation from '+companyName+' to join their company,click on the link to join ' 'http://localhost:5173/registerEmployee/'+permission+'/'+companyName+'/'+to_email+'/'+str(companyId)+'/'+company_type+'/'
        send_mail(subject, message, from_email, [to_email], fail_silently=False)
    else:
        company = Supplier_Company.objects.get(company_owner=request.user.username)
        company_serializer = SupplierCompanySerializer(instance=company)
        print(company_serializer.data)
        permission = request.data['user']['permession']
        companyName = company_serializer.data['company_name']
        companyId= company_serializer.data['id']
        company_type= company_serializer.data['company_type']
        subject = 'Invitation to join us!'
        from_email = request.user.email
        to_email = request.data['user']['email']
        message = 'you have a new invitation from '+companyName+' to join their company,click on the link to join ' 'http://localhost:5173/registerEmployee/'+permission+'/'+companyName+'/'+to_email+'/'+str(companyId)+'/'+company_type+'/'
        send_mail(subject, message, from_email, [to_email], fail_silently=False)
    return Response('5it 3lik')




@api_view(['POST'])
def RegisterInvitedEmployee(request):
    print(request.data)
    if request.data['user']['company_type']=='customer':
        serializer = RegisterSerializer(data=request.data['user'])
        if serializer.is_valid():
            serializer.save()
        sleep(3)
        user_id = User.objects.get(username=request.data['user']['username'])  
        user_serializer = UserSerializer(instance=user_id)
        d={'company_id':request.data['user']['company_id'],'user_id':user_serializer.data['id'], 'user_permission':request.data['user']['user_permission']}
        employee_serializer = CustomerEmployeesSerializer(data=d)

        if employee_serializer.is_valid():
            employee_serializer.save()
    else:
        serializer = RegisterSerializer(data=request.data['user'])
        if serializer.is_valid():
            serializer.save()
        sleep(3)
        user_id = User.objects.get(username=request.data['user']['username'])  
        user_serializer = UserSerializer(instance=user_id)
        d={'company_id':request.data['user']['company_id'],'user_id':user_serializer.data['id'], 'user_permission':request.data['user']['user_permission']}
        employee_serializer = SupplierEmployeesSerializer(data=d)

        if employee_serializer.is_valid():
            employee_serializer.save()
    return Response('hello new user')




@api_view(['POST'])
def CustomerEmployeeRegister(request):

    serializer = CustomerEmployeesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def SupplierEmployeeRegister(request):
    serializer = SupplierEmployeesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)    



 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CustomerEmployeeList(request):
    l = []
    company = Customer_Employees.objects.filter(user_id=request.user.id)
    company_serializer = CustomerEmployeesSerializer(company, many=True)
    x = company_serializer.data[0]
    company_id = x['company_id']
    employee = Customer_Employees.objects.filter(company_id=company_id)
    serializer = CustomerEmployeesSerializer(employee, many=True)
    for i in serializer.data:
        x = []
        user_id = i['user_id']
        user_name = User.objects.filter(id = user_id)
        user_serializer = UserSerializer(user_name, many=True)
        if i['user_id'] != None:
            x = [i['user_id'],user_serializer.data]
            print(x)
            l.append(x)
    json_data = json.dumps(l)  
   
    return Response(json_data)



@api_view(['GET'])
def SupplierEmployeeList(request):
    employee = Supplier_Company.objects.all()
    serializer = SupplierEmployeesSerializer(company, many=True)
    return Response(serializer.data)    