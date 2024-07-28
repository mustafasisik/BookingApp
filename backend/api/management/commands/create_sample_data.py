from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import Flat, Booking
from datetime import timedelta
import random


class Command(BaseCommand):
    help = 'Creates sample data for Flats and Bookings'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating sample data...')

        # Create Flats
        flats = []
        for i in range(1, 6):  # Create 5 flats
            flat, created = Flat.objects.get_or_create(name=f'Flat-{i}')
            flats.append(flat)
            if created:
                self.stdout.write(f'Created Flat: {flat.name}')

        # Create Bookings
        start_date = timezone.now().date()
        for flat in flats:
            for _ in range(5):  # Create 5 bookings per flat
                checkin = start_date + timedelta(days=random.randint(1, 30))
                checkout = checkin + timedelta(days=random.randint(1, 14))
                booking = Booking.objects.create(
                    flat=flat,
                    checkin=checkin,
                    checkout=checkout
                )
                self.stdout.write(f'Created Booking: {booking}')
                start_date = checkout + timedelta(days=1)

        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))