from django.contrib import admin
from tubonge.models import (
        Course,
        Lesson,
        Booking,
        LearningProgress
        )


admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(Booking)
admin.site.register(LearningProgress)
