from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.urls import reverse
from main.models import exercise_item
import csv


# Create your views here.
def index(request):
    context = {}
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    try:
        context['exercise'] = exercise_item.objects.all()
        return render(request, "main/index.html", context)
    except:
        return render(request, "main/index.html", {'error': 'No data found.'})




    return render(request, "main/index.html", context)

def connect(request):
    return render(request, "main/connect.html")

def library(request):
    return render(request, "main/library.html")

def quests(request):
    return render(request, "main/quests.html")
    