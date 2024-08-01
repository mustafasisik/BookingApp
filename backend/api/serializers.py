from rest_framework import serializers
from .models import Flat, Booking


class BookingSerializer(serializers.ModelSerializer):
    flat_name = serializers.CharField(source='flat.name', read_only=True)
    previous_booking_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'flat_name', 'checkin', 'checkout', 'previous_booking_id']
