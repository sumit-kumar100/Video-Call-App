from django.urls import path
from app import views

urlpatterns = [
    path('AddUser/', views.AddUser, name='AddUser'),
    path('GetUser/', views.GetUser, name='GetUser')
]
