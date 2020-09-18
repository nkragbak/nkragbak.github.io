from django.shortcuts import render
from django.http import HttpResponse
import csv


# Create your views here.
def index(request):
    return render(request, "main/index.html")

def connect(request):
    return render(request, "main/connect.html")

def library(request):
    return render(request, "main/library.html")

def quests(request):
    return render(request, "main/quests.html")
    
    
    
#    cities = {}
#    fields = []
#    rows = []

#    with open('main/static/main/worldcities.csv', 'r', encoding="utf8") as csvfile:
#        reader = csv.reader(csvfile)
    