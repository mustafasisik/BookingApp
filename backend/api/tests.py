from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Booking, Flat
from .serializers import BookingSerializer

class BookingListViewTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.flat1 = Flat.objects.create(name='Flat 1')
        self.flat2 = Flat.objects.create(name='Flat 2')
        self.booking1 = Booking.objects.create(flat=self.flat1, checkin='2023-01-01', checkout='2023-01-10')
        self.booking2 = Booking.objects.create(flat=self.flat2, checkin='2023-01-05', checkout='2023-01-15')
        self.booking3 = Booking.objects.create(flat=self.flat1, checkin='2023-01-03', checkout='2023-01-12')
        self.booking4 = Booking.objects.create(flat=self.flat2, checkin='2023-01-02', checkout='2023-01-14')
        self.url = reverse('booking-list')

    def test_get_bookings(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 4)  # Assuming all bookings are returned

    def test_pagination(self):
        response = self.client.get(self.url, {'page': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)

    def test_get_bookings_sorted_by_checkin(self):
        response = self.client.get(self.url, {'sort_by': 'checkin'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        checkin_dates = [booking['checkin'] for booking in response.data['results']]
        self.assertEqual(checkin_dates, sorted(checkin_dates))

    def test_get_bookings_sorted_by_checkout(self):
        response = self.client.get(self.url, {'sort_by': 'checkout'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        checkout_dates = [booking['checkout'] for booking in response.data['results']]
        self.assertEqual(checkout_dates, sorted(checkout_dates))
