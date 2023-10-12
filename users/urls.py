from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, ChangePasswordView, PasswordResetRequestView, PasswordResetConfirmView

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('changepassword/', ChangePasswordView.as_view(), name='change_password'),
    path('forgot-password/', PasswordResetRequestView.as_view(), name='forgot_password'),
    path('reset-password/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name="reset_password"),
]