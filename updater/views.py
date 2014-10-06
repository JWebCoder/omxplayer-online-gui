from django.shortcuts import render
from django.http import HttpResponse
import git 


# Create your views here.
def index(request):
    g = git.cmd.Git('~/raspberry/')
    g.pull()
    return render(request, 'updater/home.html')