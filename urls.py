from django.urls import path
from . import views

urlpatterns = [
    path('transcribe/', views.transcribe_audio, name='transcribe'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('transcribe/', views.transcribe_audio, name='transcribe'),
]
