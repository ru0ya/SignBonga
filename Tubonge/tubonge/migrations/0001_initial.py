# Generated by Django 5.1.2 on 2024-10-17 20:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('tutor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=10)),
                ('description', models.TextField()),
                ('order', models.IntegerField(default=0)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='tubonge.course')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('status', models.CharField(choices=[('scheduled', 'Scheduled'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], default='scheduled', max_length=20)),
                ('learner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='learner_bookings', to=settings.AUTH_USER_MODEL)),
                ('tutor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tutor_bookings', to=settings.AUTH_USER_MODEL)),
                ('lesson', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tubonge.lesson')),
            ],
        ),
        migrations.CreateModel(
            name='LearningProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField(default=False)),
                ('score', models.IntegerField(default=0)),
                ('completed_at', models.DateTimeField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tubonge.lesson')),
            ],
            options={
                'unique_together': {('user', 'lesson')},
            },
        ),
    ]