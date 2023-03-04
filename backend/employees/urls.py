from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.getRoutes,),
    path('customer/register/',views.CustomerEmployeeRegister,name = 'CustomerEmployeeRegister'),
    path('supplier/register/',views.SupplierEmployeeRegister,name = 'SupplierEmployeeRegister'),
    path('customer/list/',views.CustomerEmployeeList,name = 'CustomerEmployeeList'),
    path('supplier/list/',views.SupplierEmployeeList,name = 'SupplierEmployeeList'),
    path('invite/',views.InviteEmployee,name = 'Invite'),
]
