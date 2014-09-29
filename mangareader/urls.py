from django.conf.urls import patterns, url

from mangareader import views

urlpatterns = patterns(
    '',
    url(r'^mangaReader/$', views.index, name='index'),
    url(r'^mangaReader/listMangas/$', views.list_mangas, name='listMangas'),
    url(r'^mangaReader/openChapter/$', views.open_chapter, name='openChapter'),
)

