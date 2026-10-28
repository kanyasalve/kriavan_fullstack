/* ==========================================================================
   KRIVAN INDUSTRIES PVT. LTD. - Main Application Script
   Handles Navigation, Form Handling, WhatsApp CTA, and Gallery Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  highlightActiveNavLink();
  initBackToTop();
  initContactForm();
  initGalleryModal();
});

/* 1. Navbar Scroll Effect */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-krivan');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 2. Highlight Active Page Link */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-krivan');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* 3. Back to Top Button */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* 4. Interactive Contact Form Validation & Submission Feedback */
function initContactForm() {
  const form = document.getElementById('krivanContactForm');
  if (!form) return;

  // Pre-fill product if passed in URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const selectedProduct = urlParams.get('product');
  if (selectedProduct) {
    const productSelect = document.getElementById('enquiryProduct');
    if (productSelect) {
      productSelect.value = selectedProduct;
    }
  }

  // Handle in-place "Other" profession text input field
  const roleSelect = document.getElementById('userRole');
  const roleCustomGroup = document.getElementById('userRoleCustomGroup');
  const roleCustomInput = document.getElementById('userRoleCustom');
  const roleResetBtn = document.getElementById('userRoleResetBtn');

  function showSelectMode() {
    if (roleSelect && roleCustomGroup && roleCustomInput) {
      roleSelect.classList.remove('d-none');
      roleSelect.value = 'Farmer';
      roleSelect.setAttribute('required', 'required');
      roleCustomGroup.classList.add('d-none');
      roleCustomInput.removeAttribute('required');
      roleCustomInput.value = '';
    }
  }

  function showCustomInputMode() {
    if (roleSelect && roleCustomGroup && roleCustomInput) {
      roleSelect.classList.add('d-none');
      roleSelect.removeAttribute('required');
      roleCustomGroup.classList.remove('d-none');
      roleCustomInput.setAttribute('required', 'required');
      roleCustomInput.focus();
    }
  }

  if (roleSelect) {
    roleSelect.addEventListener('change', () => {
      if (roleSelect.value === 'Other') {
        showCustomInputMode();
      }
    });
  }

  if (roleResetBtn) {
    roleResetBtn.addEventListener('click', () => {
      showSelectMode();
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const name = document.getElementById('userName')?.value || '';
    const phone = document.getElementById('userPhone')?.value || '';
    
    const isCustomMode = roleCustomGroup && !roleCustomGroup.classList.contains('d-none');
    const roleSelectVal = roleSelect?.value || 'Farmer';
    const customRoleText = roleCustomInput?.value?.trim();
    const role = (isCustomMode && customRoleText) ? customRoleText : roleSelectVal;

    const product = document.getElementById('enquiryProduct')?.value || 'General Inquiry';
    const message = document.getElementById('userMessage')?.value || '';

    // Trigger Success Modal
    const modalEl = document.getElementById('enquirySuccessModal');
    if (modalEl) {
      const bsModal = new bootstrap.Modal(modalEl);
      bsModal.show();
    } else {
      alert(`Thank you, ${name}! Your enquiry for ${product} has been received. Our agricultural expert will contact you at ${phone} shortly.`);
    }

    // Optional direct WhatsApp payload button update
    const waBtn = document.getElementById('directWhatsAppBtn');
    if (waBtn) {
      const text = `Hello Krivan Industries, I am a ${role}. Name: ${name}, Phone: ${phone}. Product Enquiry: ${product}. Message: ${message}`;
      waBtn.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
    }

    form.reset();
    showSelectMode();
    form.classList.remove('was-validated');
  });
}

/* 5. Gallery Lightbox Modal */
function initGalleryModal() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modalImg = document.getElementById('galleryModalImage');
  const modalTitle = document.getElementById('galleryModalTitle');

  if (!galleryItems.length || !modalImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const title = item.getAttribute('data-title');

      if (imgSrc) modalImg.src = imgSrc;
      if (title && modalTitle) modalTitle.innerText = title;

      const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
      galleryModal.show();
    });
  });
}
