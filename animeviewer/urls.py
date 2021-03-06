from django.conf.urls import patterns, url

from animeviewer import views

urlpatterns = patterns(
    '',
    url(r'^animeViewer/$', views.index, name='index'),
    url(r'^animeViewer/listEpisodes/$', views.list_episodes, name='listEpisodes'),
    url(r'^animeViewer/getEpisodeLink/$', views.get_episode_link, name='getEpisodeLink'),
    url(r'^animeViewer/refreshEpisode/$', views.refresh_episode, name='refreshEpisode'),
    url(r'^animeViewer/searchEpisodes/$', views.search_episodes, name='searchEpisodes'),
    url(r'^animeViewer/playAnime/$', views.play_anime, name='playAnime'),
)

