from django.db import models
from django.conf import settings


class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    tutor = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE,
            related_name='courses'
            )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('title',)

    def __str__(self):
        return self.title


class Lesson(models.Model):
    title = models.CharField(max_length=10)
    description = models.TextField()
    course = models.ForeignKey(
            Course,
            on_delete=models.CASCADE,
            related_name='lessons'
            )
    order = models.IntegerField(default=0)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Booking(models.Model):
    tutor = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE,
            related_name='tutor_bookings'
            )
    learner = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE,
            related_name='learner_bookings'
            )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    lesson = models.ForeignKey(
            Lesson,
            on_delete=models.SET_NULL,
            null=True,
            blank=True
            )
    status = models.CharField(
            max_length=20,
            choices=[
                ('scheduled', 'Scheduled'),
                ('completed', 'Completed'),
                ('cancelled', 'Cancelled')
                ], default='scheduled'
            )

    def __str__(self):
        return f"{self.tutor.email} - {self.learner.email} - {self.start_time}"


class LearningProgress(models.Model):
    user = models.ForeignKey(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE
            )
    lesson = models.ForeignKey(
            Lesson,
            on_delete=models.CASCADE
            )
    completed = models.BooleanField(default=False)
    score = models.IntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['user', 'lesson']

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} -\
                {self.lesson.title}"
