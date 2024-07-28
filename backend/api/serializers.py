from rest_framework import serializers
from .models import Flat, Booking


class BookingSerializer(serializers.ModelSerializer):
    flat_name = serializers.CharField(source='flat.name', read_only=True)
    previous_booking_id = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = ['id', 'flat_name', 'checkin', 'checkout', 'previous_booking_id']

    def get_previous_booking_id(self, obj):
        previous_booking = Booking.objects.filter(
            flat=obj.flat,
            checkin__lt=obj.checkin
        ).order_by('-checkin').first()
        return previous_booking.id if previous_booking else None