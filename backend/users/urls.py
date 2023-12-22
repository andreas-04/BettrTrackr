from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet


# Create an instance of DefaultRouter
router = DefaultRouter()

# Register the CustomUserViewSet with the router under the 'users' prefix
router.register(r'users', CustomUserViewSet)

# Define the URL patterns for this app
urlpatterns = [
    # Include the URLs from the router
    path('', include(router.urls)),
]