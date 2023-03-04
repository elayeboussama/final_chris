from django.urls import path
from . import views
from .views import MyTokenObtainPairView, ProfileView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('register/', views.RegisterUser, name='auth_register'),
    path('user/update/<str:pk>/', views.UserUpdate, name='user_update'),
    path('profile/', ProfileView.as_view(), name='profile_register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/fetch/', views.ProfileList, name='profile-fetch'),
    path('activate/<str:uidb64>/<str:token>/', views.activate, name='activate'),
    path('reactivate/', views.ResendactivateEmail, name='reactivate'),
    
]