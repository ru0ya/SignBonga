from rest_framework import serializers

from tubonge.models import (
        Course,
        Lesson,
        Booking,
        LearningProgress
        )


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('title', 'description', 'tutor', 'created_at')


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = (
                'title',
                'description',
                'course',
                'content',
                'created_at'
                )
        ordering = ['order']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = (
                'tutor',
                'learner',
                'start_time',
                'end_time',
                'lesson',
                'status'
                )


class LearningProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningProgress
        fields = (
                'user',
                'lesson',
                'completed',
                'score', 
                'completed_at'
                )
                
