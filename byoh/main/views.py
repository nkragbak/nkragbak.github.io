from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.urls import reverse
import csv


# Create your views here.
def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    return render(request, "main/index.html")

def connect(request):
    return render(request, "main/connect.html")

def library(request):
    return render(request, "main/library.html")

def quests(request):
    return render(request, "main/quests.html")
    