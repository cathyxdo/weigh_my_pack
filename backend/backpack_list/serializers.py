from rest_framework import serializers
from .models import *
from users.models import NewUser

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id','name', 'description', 'weight', 'weight_uom', 'qty', 'link', 'category']

class CategorySerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id','name', 'items', 'list']
    
class ListSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    class Meta:
        model = List
        fields = ['id','name', 'notes', 'categories']

class UserSerializer(serializers.ModelSerializer):
    lists = ListSerializer(many=True, read_only=True)
    class Meta:
        model = NewUser
        fields = ('email', 'id', 'user_name', 'first_name', 'lists')