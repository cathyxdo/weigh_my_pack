from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import List, Category, Item
from .serializers import ListSerializer, CategorySerializer, ItemSerializer
from users.models import NewUser


class ListAPITestCase(APITestCase):

    def setUp(self):
        self.user = NewUser.objects.create_user(
            email='test@test.com',
            user_name='testuser',
            first_name='testuser',
            password='testpassword'
        )
        self.client.force_authenticate(user=self.user)
        self.list_data = {'name': 'Test List', 'notes': 'Test Notes'}
        self.list = List.objects.create(creator=self.user, **self.list_data)
        self.category_data = {'name': 'TestCategory', 'list': self.list}
        self.category = Category.objects.create(**self.category_data)
        self.item_data = {'name': 'TestItem', 'weight': 10, 'weight_uom': 'oz', 'qty': 2, 'category': self.category}
        self.item = Item.objects.create(**self.item_data)


    def test_list_creation(self):
        url = reverse('lists')
        serialized_data = ListSerializer(self.list).data
        response = self.client.post(url, serialized_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_retrieval(self):
        url = reverse('list_modify', args=[self.list.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_category_creation(self):
        url = reverse('create_category')
        serialized_data = CategorySerializer(self.category).data
        response = self.client.post(url, serialized_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_item_creation(self):
        url = reverse('create_item')
        serialized_data = ItemSerializer(self.item).data
        response = self.client.post(url, serialized_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

