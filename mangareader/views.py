from django.shortcuts import render
from django.http import HttpResponse
from mangopi.site.mangapanda import MangaPanda

# Create your views here.
def index(request):
    return render(request, 'manga/home.html')


def list_mangas(request):
    name = request.GET["name"]
    series = MangaPanda.series(name)
    return render(request, 'manga/listMangas.html', { 'name': name, 'chapters': series.chapters})


def open_chapter(request):
    name = request.GET['name']
    pos = int(request.GET['pos'])
    pages = MangaPanda.series(name).chapters[pos].pages
    length = len(pages)
    return render(request, 'manga/chapter.html', { 'name': name, 'pages': pages, 'num': pos})


def read_manga(request):
    return HttpResponse('1')
