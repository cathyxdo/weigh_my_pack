from rest_framework import serializers
from .models import *

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id','name', 'description', 'weight', 'qty', 'link', 'category']

class CategorySerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id','name', 'items', 'list']
    
"""     def create(self, validated_data):
        item_data = validated_data.pop('items')
        category = Category.objects.create(**validated_data)
        for item in item_data:
            Item.objects.create(category=category, **item_data)
        return category """

class ListSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    class Meta:
        model = List
        fields = ['id','name', 'notes', 'categories']
"""     def create(self, validated_data):
        category_stuff = validated_data.pop('categories')
        new_list = List.objects.create(**validated_data)
        for i in category_stuff:
            Category.objects.create(**i, list=new_list)
        return new_list """
    