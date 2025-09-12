from django.urls import path, include

urlpatterns = [
    path('', include('contact_app.urls')),
]
