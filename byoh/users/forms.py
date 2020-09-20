from django import forms
from django.contrib.auth.forms import UserCreationForm

from users.models import User

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=60, help_text='Required. Add a valid email address')

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'city', 'password1', 'password2')