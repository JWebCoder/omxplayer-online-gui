from django.shortcuts import render
from django.http import HttpResponse
from animapy import anime

# Create your views here.
def index(request):
    return render(request, 'anime/home.html')


def list_animes(request):
    name = request.GET["name"]
    results = anime.searchAnimes(name, 5)
    return render(request, 'anime/listAnimes.html', { 'name': name, 'results': results})


def play_anime(request):
    name = request.GET['name']
    pos = int(request.GET['pos'])
    pages = MangaPanda.series(name).chapters[pos].pages
    length = len(pages)
    return render(request, 'anime/play.html', { 'name': name, 'pages': pages, 'num': pos})
