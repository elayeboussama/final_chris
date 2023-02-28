from django.urls import path 
from . import views 
from .views import ProjectView


urlpatterns = [
    path('', views.getRoutes),
    path('create-project/', ProjectView.as_view(), name='project_register'),
    path('project-list/', views.ProjectList, name='project-list'),
    path('project-create/', views.ProjectCreate, name='project-create'),
    path('project-update/<str:pk>/', views.ProjectUpdate, name='project-update'),
    path('project-delete/<str:pk>/', views.ProjectDelete, name='project-delete'),
    path('project-created/', views.ProjectCreated, name='project-created'),
    path('project-members/list/<str:pk>/', views.List_Project_Member, name='List_Project_Member'),
    path('project-members/register/', views.Add_Member, name='Add_Member'),
    path('project-members-delete/<str:pk>/', views.Member_Delete, name='member-delete'),
    path('external-projects/', views.List_External_Projects, name='project-external'),
]
