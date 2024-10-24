from django.urls import path

from stayingalive.views import staying_alive

urlpatterns = [
        path("health/", staying_alive, name='keep_active'),
        ]
