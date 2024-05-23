"""
This file contains the serializers for the CustomUser model in the Django application.

Serializers in Django REST Framework are similar to Django Form classes, and include similar validation flags 
on the various fields, such as required, max_length and default.

The CustomUserSerializer class is a subclass of the ModelSerializer class that provides a useful shortcut for 
creating serializers that deal with model instances and querysets.

The Meta class within the CustomUserSerializer class provides necessary metadata to the ModelSerializer class 
to determine which model is being serialized and what fields should be included in the serialized representation.

The fields in the Meta class are 'id', 'username', 'is_staff', 'is_active', and 'is_superuser'. These fields 
represent the data that will be included in the serialized output and deserialized input.
"""
# Import the serializers module from the rest_framework package
from rest_framework import serializers

# Import the CustomUser model from the current directory's models module
from .models import UserProfile

# Define a serializer for the CustomUser model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'username', 'email', 'thread_id', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserProfile.objects.create_user(**validated_data)
        return user
    