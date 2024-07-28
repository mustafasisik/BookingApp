from django.contrib import admin
from .models import Flat, Booking

@admin.register(Flat)
class FlatAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'flat', 'checkin', 'checkout')
    list_filter = ('flat', 'checkin', 'checkout')
    search_fields = ('flat__name',)
    date_hierarchy = 'checkin'