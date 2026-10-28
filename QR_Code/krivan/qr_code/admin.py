from django.contrib import admin

from qr_code.models import OfficeAddress, CustomerCareNumber, CompanyEmail, FactoryAddress, Product, ProductUsage, \
    ProductMedia, ContactUs, CompanyInformation, SocialMedia, ProductMultiplePhoto


# Register your models here.


class OfficeAddressInline(admin.TabularInline):
    model = OfficeAddress
    extra = 1


class CustomerCareNumberInline(admin.TabularInline):
    model = CustomerCareNumber
    extra = 1


class CompanyEmailInline(admin.TabularInline):
    model = CompanyEmail
    extra = 1


class FactoryAddressInline(admin.TabularInline):
    model = FactoryAddress
    extra = 1


class SocialMediaInline(admin.TabularInline):
    model = SocialMedia
    extra = 1
    fields = ('platform', 'icon', 'url')


@admin.register(CompanyInformation)
class CompanyInformationAdmin(admin.ModelAdmin):
    list_display = (
        'display_office_addresses',
        'display_customer_care_numbers',
        'display_emails',
        'display_factory_addresses',
        'display_social_media',
    )

    inlines = [
        OfficeAddressInline,
        CustomerCareNumberInline,
        CompanyEmailInline,
        FactoryAddressInline,
        SocialMediaInline,
    ]

    def display_office_addresses(self, obj):
        return ", ".join(
            obj.office_addresses.values_list('address', flat=True)
        )

    display_office_addresses.short_description = 'Office Address'

    def display_customer_care_numbers(self, obj):
        return ", ".join(
            obj.customer_care_numbers.values_list('number', flat=True)
        )

    display_customer_care_numbers.short_description = 'Customer Care Number'

    def display_emails(self, obj):
        return ", ".join(
            obj.emails.values_list('email', flat=True)
        )

    display_emails.short_description = 'Email'

    def display_factory_addresses(self, obj):
        return ", ".join(
            obj.factory_addresses.values_list('address', flat=True)
        )

    display_factory_addresses.short_description = 'Factory Address'

    def display_social_media(self, obj):
        return ", ".join(
            obj.social_media.values_list('platform', flat=True)
        )

    display_social_media.short_description = 'Social Media'


class ProductMultiplePhotoInline(admin.TabularInline):
    model = ProductMultiplePhoto
    extra = 1
    fields = ('photo',)


@admin.register(ProductMedia)
class ProductMediaAdmin(admin.ModelAdmin):
    list_display = ('product', 'main_picture', 'youtube_link')

    search_fields = ('product__brand_name',)

    fields = ('product', 'main_picture', 'youtube_link')

    inlines = [
        ProductMultiplePhotoInline,
    ]


@admin.register(ContactUs)
class ContactUsAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'email',
        'phone_number',
        'product',
        'created_at',
    )

    list_filter = (
        'product',
        'created_at',
    )

    search_fields = (
        'full_name',
        'email',
        'phone_number',
        'message',
        'address',
        'product__product_name',
    )

    readonly_fields = ('created_at',)

    ordering = ('-created_at',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'brand_name',
        'category',
        'manufacturer',
        'slug',
        'created_at',
    )

    list_filter = (
        'category',
        'manufacturer',
        'created_at',
    )

    search_fields = (
        'brand_name',
        'category',
        'manufacturer',
        'slug',
    )

    readonly_fields = (
        'slug',
        'qr_code',
        'created_at',
    )

    ordering = ('-created_at',)


@admin.register(ProductUsage)
class ProductUsageAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'target_crops',
    )

    list_filter = (
        'product',
        'target_crops',
    )

    search_fields = (
        'product__brand_name',
        'target_crops',
    )

    ordering = ('-id',)


admin.site.site_header = "Krivan Industries"
admin.site.site_title = "Empowering Farms, Enriching Ecosystems"
admin.site.index_title = "Empowering Farms, Enriching Ecosystems"
