from django.conf.urls import patterns, url

from wareztuga import views

urlpatterns = patterns(
    '',
    url(r'^wareztuga/$', views.index, name='index'),
)

