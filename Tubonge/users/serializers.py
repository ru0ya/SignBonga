from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from djoser.serializers import (
        UserCreateSerializer,
        UserSerializer
        )

from users.models import CustomUser, TutorProfile, LearnerProfile


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
        model = CustomUser
        fields = UserSerializer.Meta.fields + (
                'first_name',
                'last_name',
                'is_learner',
                'is_tutor',
                'learner_profile',
                'tutor_profile'
                )


class CustomUserCreateSerializer(UserCreateSerializer):
    user_type = serializers.ChoiceField(choices=['learner', 'tutor'])

    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = UserCreateSerializer.Meta.fields + (
                'first_name',
                'last_name',
                'user_type'
                )

    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        user = CustomUser.objects.create_user(**validated_data)
        user.is_learner = (user_type == 'learner')
        user.is_tutor = (user_type == 'tutor')
        user.save()

        if user.is_learner:
            LearnerProfile.objects.create(user=user)
        elif user.is_tutor:
            TutorProfile.objects.create(user=user)

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        fields = ['user']

    def get_fields(self):
        fields = super().get_fields()
        if isinstance(self.instance, LearnerProfile):
            fields['total_score'] = serializers.IntegerField()
        elif isinstance(self.instance, TutorProfile):
            fields['phone_number'] = serializers.CharField()
            fields['years_of_expertise'] = serializers.IntegerField()
        return fields
