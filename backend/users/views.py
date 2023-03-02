from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, ProfileSerializer
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import Profile
from employees.models import Customer_Employees, Supplier_Employees
from employees.serializers import CustomerEmployeesSerializer, SupplierEmployeesSerializer
from time import sleep
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from .tokens import account_activation_token
from django.utils .encoding import force_bytes, force_str
from django.shortcuts import render
from django.core.mail import send_mail
from companies.serializers import CustomersCompanySerializer, SupplierCompanySerializer
from companies.models import Customers_Company, Supplier_Company            

@api_view(['GET'])
def activate(request, uidb64, token):
    User=get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(id=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None:
        user.is_active = True
        user.save()
        user_serializer = UserSerializer(user)
        return render(request,'activated.html')
    else:
        return Http404


def activateEmail(request, user, to_email):
    subject = 'Please Activate Your Account'
    uid= urlsafe_base64_encode(force_bytes(user['id'])),
    token = account_activation_token.make_token(user),
    from_email = 'zicklerchristopher@gmail.com'
    for i in uid:
        u_id = i 
    for j in token:
        verif_token = j
    message = 'hello '+ user['username']+' , click on the link to activate your account.'+'http://127.0.0.1:8000/users/activate/'+u_id+'/'+verif_token+'/'
    send_mail(subject, message, from_email, [to_email], fail_silently=False)
    try:
        print(force_str(urlsafe_base64_decode(uid)))
    except:
        pass

@api_view(['POST'])
def ResendactivateEmail(request):
    print(request.data)
    User = get_user_model()
    user = User.objects.get(email=request.data['email'])
    user_serializer = UserSerializer(instance=user)
    subject = 'Please Activate Your Account'
    uid= urlsafe_base64_encode(force_bytes(user_serializer.data['id'])),
    token = account_activation_token.make_token(user_serializer.data),
    from_email = 'zicklerchristopher@gmail.com'
    to_email = str(user_serializer.data['email'])
    print(to_email)
    for i in uid:
        u_id = i 
    for j in token:
        verif_token = j
    message = 'hello, here is the new link, '+' , click on the link to activate your account.'+'http://127.0.0.1:8000/users/activate/'+u_id+'/'+verif_token+'/'
    send_mail(subject, message, from_email, ['mohamedaziz.chibani0@gmail.com'], fail_silently=False)
    try:
        print(force_str(urlsafe_base64_decode(uid)))
    except:
        pass
    return Response('c bon 3awedna b3athna')









@api_view(['POST'])
def RegisterUser(request):
    if request.data['company_type'] == 'customer':
        print('saving customer')
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        sleep(3) 
         
        user_id = User.objects.get(username=serializer.data['username'])  
        user_serializer = UserSerializer(instance=user_id)
        
        serializer = CustomersCompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        sleep(3)    
        print('now creating the company')    
        company = Customers_Company.objects.get(company_owner=user_serializer.data['username'])
        print('now serializer company')
        company_serializer = CustomersCompanySerializer(instance=company)    
        print(company_serializer.data)
        d={'company_id':company_serializer.data['id'],'user_id':user_serializer.data['id'], 'user_permission':'admin'} 
        employee_serializer = CustomerEmployeesSerializer(data=d)

        if employee_serializer.is_valid():
            employee_serializer.save()
        user_data = user_serializer.data 
        activateEmail(request,user_data,request.data['email'])    
    else:
        print('tawa bch nsajlou supplier')
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        sleep(3) 
         
        user_id = User.objects.get(username=serializer.data['username'])  
        user_serializer = UserSerializer(instance=user_id)
        
        serializer = SupplierCompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        sleep(3)    
        print('now creating the company')    
        company = Supplier_Company.objects.get(company_owner=user_serializer.data['username'])
        print('now serializer company')
        company_serializer = SupplierCompanySerializer(instance=company)    
        print(company_serializer.data)
        d={'company_id':company_serializer.data['id'],'user_id':user_serializer.data['id'], 'user_permission':'admin'} 
        employee_serializer = SupplierEmployeesSerializer(data=d)

        if employee_serializer.is_valid():
            employee_serializer.save()
        user_data = user_serializer.data 
        activateEmail(request,user_data,request.data['email']) 
       
    return Response(serializer.data)
   


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(user)
        # Add custom claims
        try:
            # profile = Profile.objects.get(profile_owner_id=user.id)
            # serializer = ProfileSerializer(instance=profile)
            # user_type=serializer.data['user_type']
            # adress = serializer.data['adress']
            # delievery_service = serializer.data['delievery_service']
            # token['user_type']= user_type
            # token['adress']= adress
            # token['delievery_service']= delievery_service

           
            profile = Customer_Employees.objects.get(user_id=user.id)
            serializer = CustomerEmployeesSerializer(instance=profile)
            print(serializer.data)
            print(serializer.data)
            token['user_permission'] = serializer.data['user_permission']
            token['user_type'] = 'customer'
            print(token['user_type'])

        except:
            token['user_type'] = 'supplier'
            profile = Supplier_Employees.objects.get(user_id=user.id)
            serializer = SupplierEmployeesSerializer(instance=profile)
            token['user_permission'] = serializer.data['user_permission']
        token['username'] = user.username,
        token['email'] = user.email,
        token['password'] = user.password,
        token['first_name'] = user.first_name,
        token['last_name'] = user.last_name,
        

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ProfileList(request):
    profile = User.objects.filter(id=request.user.id)
    serializer = UserSerializer(profile, many=True)
    return Response(serializer.data)





@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/users/login',
        '/users/login/refresh',
        '/users/register',

    ]

    return Response(routes)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def UserUpdate(request, pk):
    project = User.objects.get(id=pk)
    serializer = UserSerializer(instance=project, data=request.data)
    if serializer.is_valid():
        
        serializer.save(profile_owner=request.user)
    else:
        print('valid e not serializer')
    return Response(serializer.data)

class ProfileView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.request.user.profile.all()

    def perform_create(self, serializer):
        serializer.save(profile_owner=self.request.user)
