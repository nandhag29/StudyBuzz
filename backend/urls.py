# urls.py

from django.urls import path
from . import views

urlpatterns = [
    # ... other paths ...
    path('transcribe/', views.transcribe_view, name='transcribe_view'),
]
