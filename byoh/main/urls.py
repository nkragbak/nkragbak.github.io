from django.urls import path

from . import views

app_name = "main"
urlpatterns = [
    path("", views.index, name="index"),
    path("connect", views.connect, name="connect"),
    path("library", views.library, name="library"),
]