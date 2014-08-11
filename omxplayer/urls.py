from django.conf.urls import patterns, url

from omxplayer import views

urlpatterns = patterns(
    '',
    url(r'^$', views.index, name='index'),
    url(r'^listFiles/$', views.list_files, name='listFiles'),
    url(r'^playFile/$', views.play_file, name='playFile'),
    url(r'^command/$', views.run_cmd, name='run_cmd'),
)

