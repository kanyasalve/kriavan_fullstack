from django.urls import path
from qr_code.views import error_page, index

urlpatterns = [
    path('404/', error_page, name='error_page'),
    path('krivan/products/<slug:slug>/', index, name='index'),
]
