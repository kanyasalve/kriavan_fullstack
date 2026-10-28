from django.shortcuts import render, redirect
from django.contrib import messages

from qr_code.models import (
    Product,
    CompanyInformation,
    ContactUs,
)


def error_page(request):
    return render(request, '404.html')


def index(request, slug):
    try:
        product = (Product.objects.prefetch_related('usages','media__multiple_photos').filter(slug=slug).first())

        company = (
            CompanyInformation.objects.prefetch_related(
                'office_addresses',
                'customer_care_numbers',
                'emails',
                'factory_addresses',
                'social_media').first())

        if not product:
            return render(request, '404.html')

        other_products = (
            Product.objects
            .exclude(id=product.id)
            .prefetch_related('media')
            .order_by('-created_at')[:6]
        )

        if request.method == 'POST':
            full_name = request.POST.get('full_name', '').strip()
            email = request.POST.get('email', '').strip()
            phone_number = request.POST.get('phone_number', '').strip()
            message = request.POST.get('message', '').strip()
            address = request.POST.get('address', '').strip()

            ContactUs.objects.create(
                product=product,
                full_name=full_name,
                email=email,
                phone_number=phone_number,
                message=message,
                address=address,
            )

            messages.success(
                request,
                'Your enquiry has been submitted successfully.'
            )

            return redirect('index', slug=product.slug)

        context = {
            'product': product,
            'company': company,
            'other_products': other_products
        }

        return render(request, 'index.html', context)

    except Exception:
        return render(request, '404.html')
