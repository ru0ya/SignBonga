from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


from tubonge.serializers import (
        CourseSerializer,
        LessonSerializer,
        BookingSerializer,
        LearningProgress
        )
from tubonge.models import (
        Course,
        Lesson,
        Booking,
        LearningProgress
        )


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permissions_classes = [IsAuthenticated]


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
