from django.urls import path, include
from rest_framework.routers import DefaultRouter

from tubonge.views import (
        CourseViewSet,
        LessonViewSet,
        BookingViewSet,
        LearningProgressViewSet
        )


router = DefaultRouter()
router.register(r'', CourseViewSet)
router.register(r'', LessonViewSet)
router.register(r'', BookingViewSet)
router.register(r'', LearningProgressViewSet)

urlpatterns = [
        path('', include(router.urls)),
        ]
