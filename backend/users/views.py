from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, ChangePasswordSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import NewUser
from rest_framework import generics
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import send_reset_password_email
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.conf import settings

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = NewUser
    permission_classes = [IsAuthenticated]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj
    
    

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = NewUser.objects.get(email=email)
        except NewUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Generate a token for the user
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)

        # Encode the user's email and token in the reset link
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        frontend_url = settings.FRONTEND_URL
        reset_link = f'{frontend_url}/reset-password/{uidb64}/{token}/'

        send_reset_password_email(user, reset_link)

        return Response({'message': 'Password reset email sent'})


class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        # Decode the user's ID from the URL
        uid = force_str(urlsafe_base64_decode(uidb64))
        try:
            user = NewUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, NewUser.DoesNotExist):
            user = None

        # Validate the user and token
        token_generator = PasswordResetTokenGenerator()
        if user is not None and token_generator.check_token(user, token):
            # Allow the user to set a new password
            new_password = request.data.get('new_password')
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password reset successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid reset link'}, status=status.HTTP_400_BAD_REQUEST)