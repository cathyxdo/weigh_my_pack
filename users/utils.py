from django.core.mail import send_mail
from django.conf import settings

def send_reset_password_email(user, reset_link):
    subject = 'Reset Your Password'
    message = f'Click the following link to reset your password: {reset_link}'
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)