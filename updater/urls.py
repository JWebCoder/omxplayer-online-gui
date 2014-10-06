from django.conf.urls import patterns, url

from updater import views

urlpatterns = patterns(
    '',
    url(r'^updater/$', views.index, name='index'),
)

