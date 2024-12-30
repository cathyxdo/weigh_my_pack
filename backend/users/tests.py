from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse, path, include
from rest_framework import status
from users.models import NewUser
from rest_framework_simplejwt.tokens import RefreshToken

# Create your tests here.

class UserTests(APITestCase):
    urlpatterns = [
        path('api/user/', include('users.urls'))
    ]
    def test_create_account(self):
        url = reverse('users:create_user')
        data = {
            'email': 'test@test.com', 
            'password': 'password'
            }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class JWTTokenAPITestCase(APITestCase):
    def setUp(self):
        # Create a user for testing
        self.user = NewUser.objects.create_user(
            email='test@test.com',
            password='testpassword'
        )

    def test_token_generation(self):
        url = reverse('users:token_obtain_pair')
        data = {
            'email': 'test@test.com',
            'password': 'testpassword'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_token_refresh(self):
        # Generate a token
        token = RefreshToken.for_user(self.user)
        refresh_url = reverse('users:token_refresh')
        data = {'refresh': str(token)}
        response = self.client.post(refresh_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)


    def test_invalid_token(self):
        # Attempt to refresh an invalid token
        invalid_refresh_url = reverse('users:token_refresh')
        data = {'refresh': 'invalid_token'}
        response = self.client.post(invalid_refresh_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
