from django.urls import path

from . import views

# app_name = "users" 
urlpatterns = [
#   path("", views.index, name="index"),
    path("register", views.registration_view, name="register"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("userconfig", views.userconfig, name="userconfig")
]