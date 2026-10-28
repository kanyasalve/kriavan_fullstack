from io import BytesIO

from django.core.files import File
from django.db import models
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field
import qrcode


# Create your models here

class CompanyInformation(models.Model):
    class Meta:
        verbose_name_plural = 'Company Information'

    def __str__(self):
        return "Company Information"


class OfficeAddress(models.Model):
    company = models.ForeignKey(CompanyInformation, on_delete=models.CASCADE, related_name='office_addresses')
    address = models.TextField()

    def __str__(self):
        return self.address


class CustomerCareNumber(models.Model):
    company = models.ForeignKey(CompanyInformation, on_delete=models.CASCADE, related_name='customer_care_numbers')
    number = models.CharField(max_length=255)

    def __str__(self):
        return self.number


class CompanyEmail(models.Model):
    company = models.ForeignKey(CompanyInformation, on_delete=models.CASCADE, related_name='emails')
    email = models.EmailField()

    def __str__(self):
        return self.email


class FactoryAddress(models.Model):
    company = models.ForeignKey(CompanyInformation, on_delete=models.CASCADE, related_name='factory_addresses')
    address = models.TextField()

    def __str__(self):
        return self.address


class SocialMedia(models.Model):
    company = models.ForeignKey(CompanyInformation, on_delete=models.CASCADE, related_name='social_media')
    platform = models.CharField(max_length=100)
    icon = models.CharField(max_length=255, help_text='Mention here icon name like bi bi-instagram, bi bi-facebook')
    url = models.URLField()

    def __str__(self):
        return self.platform


class Product(models.Model):
    brand_name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255)

    benefits = CKEditor5Field()
    specification = CKEditor5Field()
    composition = CKEditor5Field()

    qr_code = models.ImageField(upload_to="qr_code/", blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['brand_name', 'category', 'manufacturer']),
            models.Index(fields=['benefits', 'specification', 'composition']),
            models.Index(fields=['qr_code', 'slug', 'created_at']),
        ]

        verbose_name_plural = 'Products'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.brand_name)
        super().save(*args, **kwargs)

        from django.urls import reverse

        qr_url = f"http://127.0.0.1:8000{reverse('index', kwargs={'slug': self.slug})}"

        qr_image = qrcode.make(qr_url)

        buffer = BytesIO()
        qr_image.save(buffer, format="PNG")
        buffer.seek(0)

        file_name = f"{self.slug}.png"

        self.qr_code.save(
            file_name,
            File(buffer),
            save=False
        )

        super().save(update_fields=["qr_code"])

    def __str__(self):
        return self.brand_name


class ProductUsage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="usages")
    target_crops = models.CharField(max_length=255)

    purpose = CKEditor5Field()
    dosage = CKEditor5Field()

    application_method = CKEditor5Field()
    application_stage = CKEditor5Field()

    precautions = CKEditor5Field()
    safety_instructions = CKEditor5Field()

    class Meta:
        indexes = [
            models.Index(fields=['product', 'target_crops']),
            models.Index(fields=['purpose', 'dosage']),
            models.Index(fields=['application_method', 'application_stage']),
            models.Index(fields=['precautions', 'safety_instructions']),
        ]

        verbose_name_plural = 'Products Usage'

    def __str__(self):
        return f"{self.product.brand_name} - {self.target_crops}"


class ProductMedia(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="media")
    main_picture = models.ImageField(upload_to="products/")
    youtube_link = models.URLField(blank=True, null=True, help_text='Give embedded iframe code of the YouTube video here.')

    def __str__(self):
        return self.product.brand_name


class ProductMultiplePhoto(models.Model):
    product_media = models.ForeignKey(ProductMedia, on_delete=models.CASCADE, related_name="multiple_photos")
    photo = models.ImageField(upload_to="products/")

    def __str__(self):
        return self.product_media.product.brand_name


class ContactUs(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="contact_requests", blank=True, null=True)
    full_name = models.CharField(max_length=255)

    email = models.EmailField()
    phone_number = models.CharField(max_length=255)

    message = models.TextField()
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        indexes = [
            models.Index(fields=['product', 'full_name']),
            models.Index(fields=['email', 'phone_number']),
            models.Index(fields=['message', 'address', 'created_at']),
        ]

        verbose_name_plural = 'Contact Us'

    def __str__(self):
        return self.full_name
