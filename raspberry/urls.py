from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^', include('mainSite.urls', namespace="main")),
    url(r'^', include('omxplayer.urls', namespace="omxplayer")),
    url(r'^', include('mangareader.urls', namespace="mangareader")),
    url(r'^admin/', include(admin.site.urls)),
)
