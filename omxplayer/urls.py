from django.conf.urls import patterns, url

from omxplayer import views

urlpatterns = patterns(
    '',
    url(r'^omxplayer/$', views.index, name='index'),
    url(r'^omxplayer/listFiles/$', views.list_files, name='listFiles'),
    url(r'^omxplayer/playFile/$', views.play_file, name='playFile'),
    url(r'^omxplayer/command/$', views.run_cmd, name='run_cmd'),
)

