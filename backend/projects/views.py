from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import permissions
from .serializers import ProjectSerializer, ProjectMembersSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
import json
from rest_framework.response import Response
from .models import Project, Project_Members
from users.serializers import UserSerializer
# Create your views here.




@api_view(['GET'])
def getRoutes(request):
    routes = {
        'List':'/project-list/',
        'Detail view':'/project-detail/<str:pk>/',
        'Create':'/project-create/',
        'Createed-project':'/project-created/',
        'Update':'/project-update/<str:pk>/',
        'Delete':'/project-delete/<str:pk>',
    }
    

    return Response(routes)

@api_view(['GET'])
def ProjectList(request):
    project = Project.objects.filter(status='1')
    serializer = ProjectSerializer(project, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ProjectCreated(request):
    project = Project.objects.filter(project_owner=request.user)
    serializer = ProjectSerializer(project, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ProjectCreate(request):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(project_owner=request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ProjectUpdate(request, pk):
    project = Project.objects.get(id=int(pk))
    serializer = ProjectSerializer(instance=project,data=request.data)
    if serializer.is_valid():
        serializer.save(project_owner=request.user)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def ProjectDelete(request, pk):
    project = Project.objects.get(id=pk)
    project.delete()
    return Response('Item succesfully deleted!')



##################


# now we'll create the views of the projects members 


##################




@api_view(['POST'])
def Add_Member(request):
    serializer = ProjectMembersSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)



@api_view(['GET'])
def List_Project_Member(request,pk):

    l = []

    members = Project_Members.objects.filter(id_project=pk)
    serializer = ProjectMembersSerializer(members, many=True)
    for i in serializer.data:
        x= []
        user = User.objects.filter(id=i['id_user'])
        user_serializer = UserSerializer(user, many=True)
        for j in user_serializer.data:
            
            x = [i['id_user'],j['username'],i['user_role'],j['email']] 
            l.append(x)
        
    json_data = json.dumps(l)    
    return Response(json_data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def List_External_Projects(request):

    l = []
    members = Project_Members.objects.filter(id_user=request.user.id)
    serializer = ProjectMembersSerializer(members, many=True)
    print(serializer.data)
    for i in serializer.data:
        x= []
        # print(i['id_project'])
        project = Project.objects.filter(id=i['id_project'])
        project_serializer = ProjectSerializer(project, many=True)
        print(project_serializer.data)
        for j in project_serializer.data:
            x = [i['id_project'],j['title'],i['user_role'],j['description'],j['status']] 
            l.append(x)
        
    json_data = json.dumps(l)    
    return Response(json_data)


@api_view(['DELETE'])
def Member_Delete(request, pk):
    member = Project_Members.objects.get(id_user=pk)
    member.delete()
    return Response('mumber succesfully deleted!')


  

#this is nothing
class ProjectView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return self.request.user.project.all()

    def perform_create(self, serializer):
        serializer.save(project_owner=self.request.user)