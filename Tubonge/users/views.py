from typing import Type
from rest_framework import (
        serializers,
        status,
        permissions,
        generics
        )
from django.db import models
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


from users.models import (
        CustomUser,
        LearnerProfile,
        TutorProfile
        )
from users.serializers import (
        CustomUserSerializer,
        LearnerProfileSerializer,
        TutorProfileSerializer
        )


class CreateProfileView(APIView):
    permission_classes = [IsAuthenticated]
    profile_model: Type[models.Model] = None
    serializer_class: Type[serializers.ModelSerializer] = None
    user_type_field: str = None

    def post(self, request):
        user = request.user

        if not getattr(user, self.user_type_field):
            return Response(
                    {"detail": f"User is not registered as a \
                            {self.profile_model.__name__}."},
                    status=status.HTTP_403_FORBIDDEN
                    )

        if self.profile_model.objects.filter(user=user).exists():
            return Response(
                    {"detail": f"{self.profile_model.__name__} \
                            already exists."},
                    status=status.HTTP_400_BAD_REQUEST
                    )
            
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(
                        serializer.data,
                        status=status.HTTP_201_CREATED
                        )
            return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                    )


class CreateLearnerProfileView(CreateProfileView):
    profile_model = LearnerProfile
    serializer_class = LearnerProfileSerializer
    user_field_type = 'is_learner'


class CreateTutorProfileView(CreateProfileView):
    profile_model = TutorProfile
    serializer_class = TutorProfileSerializer
    user_field_type = 'is_tutor'


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data)
