from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .models import Booking
from .serializers import BookingSerializer

from django.db.models import OuterRef, Subquery


class BookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        # Define a subquery to get the previous booking's ID
        previous_booking_subquery = Booking.objects.filter(
            flat=OuterRef('flat'),
            checkin__lt=OuterRef('checkin')
        ).order_by('-checkin').values('id')[:1]

        queryset = Booking.objects.select_related('flat').annotate(
            previous_booking_id=Subquery(previous_booking_subquery)
        )

        sort_by = self.request.query_params.get('sort_by', None)
        if sort_by == 'checkin':
            queryset = queryset.order_by('checkin')
        elif sort_by == 'checkout':
            queryset = queryset.order_by('checkout')

        return queryset

