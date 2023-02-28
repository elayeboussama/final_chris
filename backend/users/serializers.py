from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Profile, Supplier_Company, Customers_Company
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(ModelSerializer):
    email = serializers.EmailField( 
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True)
    

    class Meta:
        model = User
        fields = ('id','username', 'password', 'email', 'first_name', 'last_name','is_active')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=validated_data['is_active']
        )


        
        user.set_password(validated_data['password'])
        user.save()

        return user


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'first_name', 'last_name','is_active')
    



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'



