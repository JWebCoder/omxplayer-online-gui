from django.shortcuts import render
from django.http import HttpResponse
from animapy import anime
from animeviewer.animeDB import animeDB

# Create your views here.
def index(request):
    animes = animeDB()
    animes.openConnection()
    animeList = animes.getAnimeList()
    animes.closeConnection()
    return render(request, 'anime/home.html', { 'animeList': animeList })


def list_episodes(request):
    animeId = request.GET["animeId"]
    animes = animeDB()
    animes.openConnection()
    episodes = animes.getEpisodeList(animeId)
    animes.closeConnection()
    name = "Naruto"
    return render(request, 'anime/listEpisodes.html', { 'name': name, 'episodes': episodes})


def search_episodes(request):
    name = request.GET["name"]
    results = anime.searchAnimes(name, 5)
    return render(request, 'anime/listSearch.html', { 'name': name, 'results': results})


def play_anime(request):
    name = request.GET['name']
    pos = int(request.GET['pos'])
    pages = MangaPanda.series(name).chapters[pos].pages
    length = len(pages)
    return render(request, 'anime/play.html', { 'name': name, 'pages': pages, 'num': pos})
