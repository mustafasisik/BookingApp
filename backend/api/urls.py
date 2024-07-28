from django.urls import path
from .views import HelloWorld, BookingListView

urlpatterns = [
    path('hello/', HelloWorld.as_view(), name='hello_world'),
    path('bookings/', BookingListView.as_view(), name='booking-list'),
]