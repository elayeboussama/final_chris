from django.urls import path 
from . import views


urlpatterns = [
    path('', views.getRoutes),
    path('customer/register/',views.CustomerCompanyRegister,name = 'CustomerCompanyRegister'),
    path('supplier/register/',views.SupplierCompanyRegister,name = 'SupplierCompanyRegister'),
    path('customer/list/',views.CustomerCompanyList,name = 'CustomerCompanyList'),
    path('supplier/list/',views.SupplierCompanyList,name = 'SupplierCompanyList'),
]
