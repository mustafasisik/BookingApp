from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Booking
from .serializers import BookingSerializer


class BookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer

    def get_queryset(self):
        queryset = Booking.objects.all()
        sort_by = self.request.query_params.get('sort_by', None)
        if sort_by == 'checkin':
            queryset = queryset.order_by('checkin')
        return queryset