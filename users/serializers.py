# taken from https://github.com/veryacademy/YT-Django-DRF-Simple-Blog-Series-JWT-Part-3/blob/master/django/users/serializers.py
from rest_framework import serializers
from users.models import NewUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance