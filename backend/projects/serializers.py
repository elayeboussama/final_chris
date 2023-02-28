from rest_framework import serializers
from .models import Project, Project_Members





class ProjectSerializer(serializers.ModelSerializer):

    

    class Meta:
        model = Project
        fields = '__all__'



class ProjectMembersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project_Members
        fields = '__all__'