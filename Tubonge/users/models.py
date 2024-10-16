from django.db import models
from django.db.models import Count, Q
from django.conf import settings
from django.apps import apps
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
        AbstractBaseUser,
        BaseUserManager,
        PermissionsMixin
        )


class UserManager(BaseUserManager):
    def create_user(
            self,
            id,
            email,
            first_name,
            last_name,
            password=None,
            **extra_fields
            ):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(
                email=email,
                **extra_fields
                )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
            self,
            id,
            email,
            first_name,
            last_name,
            password=None,
            **extra_fields
            ):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        superuser = self.create_user(
                id,
                email,
                first_name,
                last_name,
                password,
                **extra_fields
                )

        return superuser



class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(max_length=36, primary_key=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_joined = models.DateTimeField(_("created date"), auto_now_add=True)
    email = models.EmailField(_('email address'), unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    @property
    def is_learner(self):
        return hasattr(self, 'learner_profile')

    @property
    def is_tutor(self):
        return hasattr(self, 'learner_profile')


class LearnerProfile(models.Model):
    user = models.OneToOneField(
            CustomUser,
            on_delete=models.CASCADE,
            related_name='learner_profile'
            )
    total_score = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.email}"

    def get_progress_percentage(self):
        Lesson = apps.get_model('lessons', 'Lesson')
        total_lessons = Lesson.objects.count()
        if total_lessons == 0:
            return 0
        completed_lessons = self.lesson_progress.filter(
                is_completed=True
                ).count()
        return (completed_lessons / total_lessons) * 100


class TutorProfile(models.Model):
    user = models.OneToOneField(
            CustomUser,
            on_delete=models.CASCADE,
            related_name='tutor_profile'
            )
    phone_number = models.CharField(
            max_length=10,
            null=True,
            blank=True
            )
    years_of_experience = models.PositiveIntegerField(default=0)
