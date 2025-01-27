from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import List, Category, Item

class IsOwnerOrReadOnly(BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        if isinstance(obj, List):
            return obj.creator == request.user
        
        if isinstance(obj, Category):
            return obj.list.creator == request.user
        
        if isinstance(obj, Item):
            return obj.category.list.creator == request.user
        return False