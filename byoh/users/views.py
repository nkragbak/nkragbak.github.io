from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from users.forms import RegistrationForm, UserAuthenticationForm


def registration_view(request):
    context = {}
    if request.POST:
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(email=email, password=raw_password)
            login(request, user)
            return redirect('main:index')
        else:
            context['registration_form'] = form
    else: #GET request
        form = RegistrationForm()
        context['registration_form'] = form
    return render(request, "users/registration.html", context)


def login_view(request):
    
    context = {}

    user = request.user
    if user.is_authenticated:
        return redirect('main:index')

    if request.POST:
        form = UserAuthenticationForm(request.POST)
        if form.is_valid():
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(email=email, password=password)

            if user:
                login(request, user)
                return redirect('main:index')

    else:
        form = UserAuthenticationForm()

    context['login_form'] = form
    return render(request, "users/login.html", context)
    

def logout_view(request):
    
    context = {}

    logout(request)
    
    if request.POST:
        form = UserAuthenticationForm(request.POST)
        if form.is_valid():
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(email=email, password=password)

            if user:
                login(request, user)
                return redirect('main:index')
    
    context['login_form'] = UserAuthenticationForm()

    return render(request, "users/login.html", context)

def userconfig(request):
    return render(request, "users/userconfig.html")