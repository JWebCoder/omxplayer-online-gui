from django.shortcuts import render
from django.http import HttpResponse
import git 
import os

# Create your views here.
def index(request):
    
    BASE_DIR = os.path.dirname(os.path.dirname(__file__))
    g = git.cmd.Git(BASE_DIR)
    g.pull()
    return render(request, 'updater/home.html')