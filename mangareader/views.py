from django.shortcuts import render
from django.http import HttpResponse
from mangopi.site.mangapanda import MangaPanda

# Create your views here.
def index(request):
    url = MangaPanda.series('toriko').chapters[0].pages[0].image.url
    return render(request, 'manga/home.html', {'url': url})


def list_mangas(request):
    name = request.GET["name"]
    url = MangaPanda.series(name)
    return render(request, 'manga/listMangas.html', { 'name': name, 'chapters': url.chapters})


def open_chapter(request):
    name = request.GET['name']
    pages = MangaPanda.series(name).chapters[int(request.GET['pos'])].pages
    length = len(pages)
    return render(request, 'manga/chapter.html', { 'name': name, 'pages': pages, 'len': length})


def read_manga(request):
    return HttpResponse('1')
