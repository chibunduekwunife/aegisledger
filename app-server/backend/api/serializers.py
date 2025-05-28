from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Transaction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}, "username": {"read_only": True}}

    def create(self, validated_data):
        # Set username to email on registration
        email = validated_data.get("email")
        validated_data["username"] = email
        user = User.objects.create_user(**validated_data)
        return user
    
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'id', 
            'name', 
            'amount', 
            'category',
            'type',
            'date', 
            'notes', 
            'created_at', 
            'author'
        ]
        read_only_fields = ['id', 'created_at', 'author']
        # extra_kwargs = {read_only_fields: {"read_only": True}}