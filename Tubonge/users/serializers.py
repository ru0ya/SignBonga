from rest_framework import serializers
from django.db import transaction
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

from djoser.serializers import (
        UserCreateSerializer,
        UserSerializer
        )

from users.models import TutorProfile, LearnerProfile


User = get_user_model()


class LearnerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnerProfile
        fields = ['total_score']


class TutorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorProfile
        fields = ['phone_number', 'years_of_experience']


class CustomUserSerializer(UserSerializer):
    learner_profile = LearnerProfileSerializer(read_only=True)
    tutor_profile = TutorProfileSerializer(read_only=True)

    class Meta(UserSerializer.Meta):
        model = User
        fields = UserSerializer.Meta.fields + (
                'first_name',
                'last_name',
                'user_type',
                'learner_profile',
                'tutor_profile'
                )


class CustomUserCreateSerializer(UserCreateSerializer):
    user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = UserCreateSerializer.Meta.fields + (
                'first_name',
                'last_name',
                'user_type'
                )

    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        password = validated_data.pop('password')

        with transaction.atomic():
            user = User.objects.create_user(
                    **validated_data,
                    # user_type=user_type
                    )
            user.user_type = user_type
            # user.is_learner = (user_type == 'learner')
            # user.is_tutor = (user_type == 'tutor')
            #user.set_password(password)
            user.save()

            if user_type == 'learner':
                LearnerProfile.objects.create(user=user)
            elif user_type == 'tutor':
                TutorProfile.objects.create(user=user)
        
        return user
