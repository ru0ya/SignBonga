from django.contrib import admin
from users.models import (
        CustomUser,
        LearnerProfile,
        TutorProfile
        )


admin.site.register(CustomUser)
admin.site.register(LearnerProfile)
admin.site.register(TutorProfile)
