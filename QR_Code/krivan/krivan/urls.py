from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('krivan/admin/', admin.site.urls),
    path('', include('qr_code.urls')),

    # ckeditor urls
    path("ckeditor5/", include("django_ckeditor_5.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# wrong url handler
urlpatterns += [
    re_path(r'^.*$', lambda request: render(request, '404.html'), name='catch-all'),
]