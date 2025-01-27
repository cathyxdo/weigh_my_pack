from .models import Item, List, Category
from users.models import NewUser
from .serializers import ListSerializer, CategorySerializer, ItemSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permission import IsOwnerOrReadOnly
from rest_framework.exceptions import PermissionDenied, ValidationError

class ListList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = List.objects.all()
    serializer_class = ListSerializer
    def get_queryset(self):
        user = self.request.user
        return List.objects.filter(creator=user)
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class SingleList(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [IsOwnerOrReadOnly]

class ModifyCategory(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsOwnerOrReadOnly]

class ModifyItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsOwnerOrReadOnly]

class CreateCategory(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        list_id = self.request.data.get('list')
        try:
            list_object = List.objects.get(id=list_id)
        except List.DoesNotExist:
            raise ValidationError("List does not exist.")
        if list_object.creator != self.request.user:
            raise PermissionDenied("You do not own this list.")
        
        serializer.save()

class CreateItem(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        category = serializer.validated_data.get('category')
        try:
            # Retrieve the category and ensure it exists
            category = Category.objects.get(id=category.id)
        except Category.DoesNotExist:
            raise ValidationError("The specified category does not exist.")

        # Check if the category belongs to a list owned by the authenticated user
        if category.list.creator != self.request.user:
            raise PermissionDenied("You do not have permission to add items to this category.")

        # Save the item with the validated data
        serializer.save()