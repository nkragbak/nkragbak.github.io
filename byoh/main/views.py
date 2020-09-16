from django.shortcuts import render
from django.http import HttpResponse
import os, csv


# Create your views here.
def index(request):
    return render(request, "main/index.html")

def connect(request):
    return render(request, "main/connect.html")

def library(request):
    return render(request, "main/library.html")

def quests(request):
    cities = {}
    with open('main/static/main/worldcities.csv', newline="", encoding="utf8") as csvfile:
        reader = csv.reader(csvfile, delimiter=",")
        line_count = 0
        for row in reader:
            if line_count == 0: 
                line_count +=1
            else:
                cities['city'] = row[1]
    return render(request, 'main/quests.html', cities)
