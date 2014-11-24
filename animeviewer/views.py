from django.shortcuts import render, redirect
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
    return render(request, 'anime/listEpisodes.html', { 'episodes': episodes})


def get_episode_link(request):
    pageLink = request.GET["pageLink"]
    links = anime.getAnimeLinks(pageLink)
    if hasattr(links, 'hd'):
        return redirect (links.hd)
    else:
        return redirect (links.normal)

def refresh_episode(request):
    episodeId = request.GET["episodeId"]
    episodeNumber = request.GET["episodeNumber"]
    animes = animeDB()
    animes.openConnection()
    episode = animes.updateEpisodeMetadataDB(episodeId, episodeNumber)
    animes.closeConnection()
    return render(request, 'anime/episode.html', { 'usePageLink': True, 'episodeData': episode, 'number': episodeNumber })
    
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
