from django.conf.urls import patterns, url

from animeviewer import views

urlpatterns = patterns(
    '',
    url(r'^animeViewer/$', views.index, name='index'),
    url(r'^animeViewer/listAnimes/$', views.list_animes, name='listAnimes'),
    url(r'^animeViewer/playAnime/$', views.play_anime, name='playAnime'),
)

