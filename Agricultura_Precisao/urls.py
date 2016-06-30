"""Agricultura_Precisao URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers

from Agricultura_Precisao import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'sensorVal', views.sensorValViewSet)

urlpatterns = [
    url(r'webservices/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'^login', views.login, name='login'),
    url(r'^index', views.index, name='index'),
    url(r'^AgriculturaPrecisao', views.agricprecisao, name='agricprecisao'),
    url(r'^validate_login', views.validate_login, name='validate_login'),
    url(r'^logout', views.logout, name='logout'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest-framework')),
    url(r'^Perfil', views.perfil, name='perfil'),
    url(r'^realtime', views.realtime, name='realtime'),
    url(r'^get_100values', views.get_100values, name='get_100values'),
    url(r'^get_1000values', views.get_1000values, name='get_1000values'),
    url(r'^get_customintervalvalues', views.get_customintervalvalues, name='get_customintervalvalues'),
    url(r'^get_customdayvalues', views.get_customdayvalues, name='get_customdayvalues'),
    url(r'^get_typesensor', views.get_typesensor, name='get_typesensor'),
    url(r'^appkeys', views.appkeys, name='appkeys'),
    url(r'^alert', views.alert, name='alert'),
    url(r'^navbar', views.navbar, name='navbar'),
    url(r'^config', views.config, name='config'),
    url(r'^test', views.test, name='test'),
    # url(r'collapse/(?P<collapseid>[0-9])', views.collapse, name='collapse1'),

]
