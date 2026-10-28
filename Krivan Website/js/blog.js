/* ==========================================================================
   KRIVAN INDUSTRIES PVT. LTD. - Agro Blog & News Engine
   Handles Homepage Top 3 Auto-Scrolling Ticker & Dedicated Blog Page Logic
   ========================================================================== */

const KrivanAgroBlogs = [
  {
    id: "soil-fertility-potash",
    title: {
      en: "Maximizing Soil Fertility & Crop Yield with Rhodophyte Bio-Potash",
      mr: "ऱ्होडोफायटा बायो-पोटाश वापरून जमिनीची सुपीकता आणि पीक उत्पादन कसे वाढवावे"
    },
    category: "catPotashTech",
    categoryLabel: { en: "Potash & Nutrients", mr: "पोटाश तंत्रज्ञान" },
    date: "2026-09-18",
    readTime: "4 min read",
    author: "Dr. A. R. Patil (Agro-Scientist)",
    source: {
      en: "Krivan Agro Bulletin",
      mr: "कृवाण कृषी बुलेटिन"
    },
    badge: "Featured",
    image: "assets/images/products/kaizen-k.jpg",
    excerpt: {
      en: "Discover how ocean-derived bio-available potash enhances root structure, soil microbial balance, and drought resilience compared to chemical MOP.",
      mr: "रासायनिक MOP च्या तुलनेत सागरी ऱ्होडोफायटापासून मिळणारे पोटाश मुळांची वाढ, मातीतील सूक्ष्मजीव आणि दुष्काळ सहन करण्याची क्षमता कशी वाढवते ते जाणून घ्या."
    },
    content: {
      en: `
        <p class="lead">Soil health is the foundation of sustainable agriculture. Continuous application of heavy chemical fertilizers often leads to soil salinity, compaction, and micro-nutrient locking.</p>
        <h4>The Role of Bio-Available Potash</h4>
        <p>Potash derived from natural marine red algae (Rhodophytes) like <strong>KAIZEN - K</strong> provides 20% organic potash combined with naturally occurring trace minerals and alginates. Unlike chemical Muriate of Potash (KCl), bio-potash does not release harmful chloride ions into the root zone.</p>
        <div class="p-3 bg-light rounded border-start border-4 border-success my-3">
          <strong>Key Takeaway:</strong> Regular use improves cation exchange capacity (CEC), enhances fruit sugar content (Brix), and prevents leaf tip burning during dry spells.
        </div>
        <h4>Application Guidelines</h4>
        <ul>
          <li><strong>Drip Irrigation:</strong> 1 - 2 kg per acre depending on crop stage.</li>
          <li><strong>Foliar Spray:</strong> 2 to 3 grams per liter of clean water during flowering and fruit setting.</li>
        </ul>
      `,
      mr: `
        <p class="lead">मातीचे आरोग्य हा शाश्वत शेतीचा पाया आहे. रासायनिक खतांच्या अतिवापरामुळे जमिनीचा क्षारपडपणा वाढतो आणि सुपीकता कमी होते.</p>
        <h4>जैविक पोटाशचे महत्त्व</h4>
        <p>कायझेन-के (KAIZEN - K) सारखे नैसर्गिक सागरी लाल शेवाळापासून बनवलेले पोटाश पिकांना लगेच उपलब्ध होते. यामध्ये २०% जैविक पोटाश सोबत नैसर्गिक सूक्ष्म अन्नद्रव्ये असतात.</p>
        <div class="p-3 bg-light rounded border-start border-4 border-success my-3">
          <strong>महत्त्वाचा मुद्दा:</strong> यामुळे फळांची साईज, वजन आणि साखरेचे (Brix) प्रमाण वाढते आणि झाडांची दुष्काळ सहन करण्याची क्षमता सुधारते.
        </div>
      `
    }
  },
  {
    id: "organic-prom-fertilizer",
    title: {
      en: "PROM (Phosphate Rich Organic Manure): Eco-Friendly Alternative to SSP",
      mr: "प्रॉम (PROM): सिंगल सुपर फॉस्फेटला सेंद्रिय व पर्यावरणपूरक पर्याय"
    },
    category: "catSoilHealth",
    categoryLabel: { en: "Soil Health", mr: "माती आरोग्य" },
    date: "2026-09-10",
    readTime: "5 min read",
    author: "Krivan Technical Bureau",
    source: {
      en: "ICAR Soil Research Bureau",
      mr: "आय.सी.ए.आर. माती संशोधन मंडळ"
    },
    badge: "Trending",
    image: "assets/images/products/kaizen-k-spec.png",
    excerpt: {
      en: "Phosphate Rich Organic Manure (KRIV MRUDA) slowly releases phosphorus while conditioning acidic or alkaline soils for multi-harvest crops.",
      mr: "कृवाण मृदा (KRIV MRUDA) प्रॉम खत पिकांना हळूहळू आणि दीर्घकाळ स्फुरद पुरवते आणि जमिनीचा सामू (pH) संतुलित ठेवते."
    },
    content: {
      en: `
        <p class="lead">Phosphate fixation in soil is a major challenge for Indian farmers. Up to 70% of chemical DAP applied to fields gets locked in the soil and remains unavailable to plants.</p>
        <h4>Why Choose PROM?</h4>
        <p><strong>KRIV MRUDA (PROM)</strong> combines fine rock phosphate with organic compost. Beneficial micro-organisms solubilize locked phosphorus over time, ensuring a continuous supply throughout crop development.</p>
        <ul>
          <li>Improves soil humus and carbon-to-nitrogen ratio.</li>
          <li>Prevents soil hardening and promotes earthworm activity.</li>
          <li>Reduces input costs compared to synthetic DAP/DAP replacement.</li>
        </ul>
      `,
      mr: `
        <p class="lead">शेतकऱ्यांसाठी रासायनिक स्फुरद खतांचे फिक्सेशन होणे ही मोठी समस्या आहे. DAP मधील जवळजवळ ७०% स्फुरद मातीत अडकून राहते.</p>
        <h4>प्रॉम खताचे फायदे</h4>
        <p><strong>कृवाण मृदा (PROM)</strong> मध्ये फाइन रॉक फॉस्फेट आणि सेंद्रिय कंपोस्टचे उत्तम मिश्रण असते. हे खत मातीचा पोत सुधारते आणि जमिनीतील सेंद्रिय कर्ब वाढवते.</p>
      `
    }
  },
  {
    id: "monsoon-crop-nutrition-plan",
    title: {
      en: "Integrated Plant Nutrition Management (IPNM) for Rabi & Kharif Crops",
      mr: "रब्बी व खरीप पिकांसाठी एकात्मिक अन्नद्रव्य व्यवस्थापन (IPNM) मार्गदर्शक"
    },
    category: "catCropCare",
    categoryLabel: { en: "Crop Care", mr: "पीक काळजी" },
    date: "2026-09-02",
    readTime: "3 min read",
    author: "S. K. Deshmukh (Senior Agronomist)",
    source: {
      en: "Krishi Vigyan Kendra",
      mr: "कृषी विज्ञान केंद्र"
    },
    badge: "Guide",
    image: "assets/images/results/tomato-trial.jpg",
    excerpt: {
      en: "Step-by-step guidance on balancing bio-fertilizers, silicon granules, and micronutrient foliar sprays for maximum harvest protection.",
      mr: "उत्पादनात वाढ मिळवण्यासाठी सेंद्रिय खते, सिलिकॉन आणि सूक्ष्म अन्नद्रव्यांचा योग्य प्रकारे कसा वापर करावा याचे सविस्तर मार्गदर्शन."
    },
    content: {
      en: `
        <p class="lead">Balanced crop nutrition is essential to achieve high yields in horticultural and field crops such as Sugarcane, Cotton, Grapes, Pomegranate, and Tomatoes.</p>
        <h4>4 Pillars of Integrated Plant Nutrition</h4>
        <ol>
          <li><strong>Base Soil Dressing:</strong> Apply KRIV Natura / KRIV Vasundhara organic manure before sowing.</li>
          <li><strong>Root Strengthening:</strong> Soil application of Diatomite Silicon (KRIV SILICA) to protect stem walls against pests.</li>
          <li><strong>Fruit Development:</strong> Kaizen-K Potash spray during fruit formation.</li>
          <li><strong>Micronutrient Boost:</strong> Chelated Zinc, Iron, and Boron to prevent deficiency chlorosis.</li>
        </ol>
      `,
      mr: `
        <p class="lead">ऊस, कापूस, द्राक्ष, डाळिंब आणि टोमॅटो या पिकांचे उच्च उत्पादन घेण्यासाठी एकात्मिक अन्नद्रव्य व्यवस्थापन अत्यंत गरजेचे आहे.</p>
        <h4>अन्नद्रव्य व्यवस्थापनाचे ४ टप्पे</h4>
        <ol>
          <li><strong>पायाभूत खत डोस:</strong> पेरणीपूर्वी कृवाण नटुरा किंवा वसुंधरा सेंद्रिय खताचा वापर.</li>
          <li><strong>खोडाची मजबुती:</strong> सिलिकॉन खताचा वापर करून किडींपासून संरक्षण.</li>
          <li><strong>फळ धारणा:</strong> कायझेन-के चा फवारा.</li>
        </ol>
      `
    }
  },
  {
    id: "empty-slot-placeholder-1",
    title: {
      en: "Fertilizer Subsidy Policy & Market Price Outlook",
      mr: "खत अनुदान धोरण आणि बाजारभाव आढावा"
    },
    category: "catMarketTrends",
    categoryLabel: { en: "Agro Market Updates", mr: "कृषी बाजार अपडेट" },
    date: "2026-09-25",
    readTime: "Upcoming",
    author: "National Agro Bureau",
    source: {
      en: "Agro Market Review",
      mr: "कृषी बाजार समीक्षा"
    },
    badge: "Slot Empty",
    image: "assets/images/results/grapes-yield.jpg",
    isEmptySlot: true,
    excerpt: {
      en: "Reserved news slot for upcoming government fertilizer subsidy releases, crop MSP announcements, and seasonal market price reports.",
      mr: "सरकारी खत अनुदान, पीक हमीभाव आणि हंगामी बाजारभावाच्या बातमीसाठी आरक्षित जागा."
    },
    content: {
      en: "<p class=\"text-muted italic\">This news slot is reserved for upcoming government agro market policy updates.</p>",
      mr: "<p class=\"text-muted italic\">ही बातमीची जागा सध्या नवीन अपडेट्ससाठी आरक्षित आहे.</p>"
    }
  }
];

/* ================= ================= =================
   1. HOMEPAGE AUTO-SCROLLING TOP 3 NEWS TICKER ENGINE
   ================= ================= ================= */

let autoScrollInterval = null;
let currentNewsIndex = 0;

function initHomepageAgroNewsTicker() {
  const container = document.getElementById('homepageAgroNewsTrack');
  if (!container) return;

  renderTop3NewsTrack();

  const prevBtn = document.getElementById('newsTickerPrev');
  const nextBtn = document.getElementById('newsTickerNext');
  const dotsContainer = document.getElementById('newsTickerDots');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopNewsAutoScroll();
      slideNewsPrev();
      startNewsAutoScroll();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopNewsAutoScroll();
      slideNewsNext();
      startNewsAutoScroll();
    });
  }

  const wrapper = document.getElementById('newsTickerWrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopNewsAutoScroll);
    wrapper.addEventListener('mouseleave', startNewsAutoScroll);
    
    let touchStartX = 0;
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) {
        slideNewsNext();
      } else if (touchEndX - touchStartX > 50) {
        slideNewsPrev();
      }
    }, { passive: true });
  }

  window.addEventListener('krivanLanguageChanged', () => {
    renderTop3NewsTrack();
  });

  startNewsAutoScroll();
}

function getTop3Articles() {
  return KrivanAgroBlogs.slice(0, 3);
}

function renderTop3NewsTrack() {
  const container = document.getElementById('homepageAgroNewsTrack');
  const dotsContainer = document.getElementById('newsTickerDots');
  if (!container) return;

  const currentLang = localStorage.getItem('krivan_lang') || 'en';
  const top3 = getTop3Articles();

  container.innerHTML = top3.map((article, idx) => {
    const title = article.title[currentLang] || article.title.en;
    const excerpt = article.excerpt[currentLang] || article.excerpt.en;
    const source = article.source[currentLang] || article.source.en;
    const readBtnText = currentLang === 'mr' ? 'संपूर्ण बातमी वाचा' : 'Read Article';
    
    return `
      <div class="col-md-4 col-12 news-slide-item">
        <!-- Background Image Card displaying Title, Description, Writer & Source -->
        <div class="blog-card-bg-box text-white" style="background-image: url('${article.image}');">
          <div class="blog-card-bg-overlay"></div>
          <div class="blog-card-content d-flex flex-column justify-content-between h-100">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="blog-source-badge"><i class="bi bi-journal-check me-1"></i>${source}</span>
                <span class="badge bg-success shadow-sm">${article.badge}</span>
              </div>
            </div>
            <div>
              <h5 class="fw-bold text-white mb-2 text-line-clamp-2">${title}</h5>
              <p class="text-light small opacity-90 mb-3 text-line-clamp-3">${excerpt}</p>
              <div class="pt-2 border-top border-secondary d-flex align-items-center justify-content-between">
                <span class="blog-writer-tag"><i class="bi bi-pencil-square me-1 text-warning"></i>${article.author}</span>
                <button class="btn btn-sm btn-krivan btn-krivan-secondary read-blog-btn px-3 rounded-pill" data-id="${article.id}">
                  ${readBtnText} <i class="bi bi-arrow-right-short"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (dotsContainer) {
    dotsContainer.innerHTML = top3.map((_, idx) => `
      <button class="news-dot-btn ${idx === currentNewsIndex ? 'active' : ''}" data-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>
    `).join('');

    dotsContainer.querySelectorAll('.news-dot-btn').forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        goToNewsSlide(index);
      });
    });
  }

  container.querySelectorAll('.read-blog-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openBlogDetailModal(id);
    });
  });

  updateSlideTransform();
}

function slideNewsNext() {
  const top3 = getTop3Articles();
  currentNewsIndex = (currentNewsIndex + 1) % top3.length;
  updateSlideTransform();
}

function slideNewsPrev() {
  const top3 = getTop3Articles();
  currentNewsIndex = (currentNewsIndex - 1 + top3.length) % top3.length;
  updateSlideTransform();
}

function goToNewsSlide(index) {
  currentNewsIndex = index;
  updateSlideTransform();
}

function updateSlideTransform() {
  const container = document.getElementById('homepageAgroNewsTrack');
  const dotsContainer = document.getElementById('newsTickerDots');
  if (!container) return;

  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    const slideWidth = container.clientWidth;
    container.style.transform = `translateX(-${currentNewsIndex * slideWidth}px)`;
  } else {
    container.style.transform = `translateX(0px)`;
  }

  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.news-dot-btn');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentNewsIndex);
    });
  }
}

function startNewsAutoScroll() {
  if (autoScrollInterval) clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(() => {
    slideNewsNext();
  }, 4000);
}

function stopNewsAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
}

/* ================= ================= =================
   2. DEDICATED BLOG PAGE ENGINE (CALENDAR & NEWSLETTER)
   ================= ================= ================= */

function initDedicatedBlogPage() {
  const blogContainer = document.getElementById('krivanBlogGrid');
  if (!blogContainer) return;

  let activeCategory = 'all';
  let searchQuery = '';
  let selectedCalendarDate = '';

  const categoryBtns = document.querySelectorAll('.blog-cat-btn');
  const searchInput = document.getElementById('blogSearchInput');
  const calendarPicker = document.getElementById('blogCalendarPicker');
  const clearDateBtn = document.getElementById('clearDateBtn');
  const resetCalendarFilterBtn = document.getElementById('resetCalendarFilterBtn');

  function renderGrid() {
    const currentLang = localStorage.getItem('krivan_lang') || 'en';
    
    let filtered = KrivanAgroBlogs.filter(article => {
      const matchCat = activeCategory === 'all' || article.category === activeCategory;
      const title = (article.title[currentLang] || article.title.en).toLowerCase();
      const excerpt = (article.excerpt[currentLang] || article.excerpt.en).toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || title.includes(q) || excerpt.includes(q);

      let matchDate = true;
      if (selectedCalendarDate) {
        matchDate = article.date === selectedCalendarDate;
      }

      return matchCat && matchSearch && matchDate;
    });

    if (filtered.length === 0) {
      const emptyMsg = currentLang === 'mr' ? 'या तारखेचे किंवा फिल्टरचे कोणतेही लेख आढळले नाहीत.' : 'No agro news found for the selected filter or date.';
      blogContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="empty-blog-box p-5 bg-white rounded-4 shadow-sm border">
            <i class="bi bi-calendar-x display-1 text-muted mb-3 d-block"></i>
            <h4 class="text-muted mb-2">${emptyMsg}</h4>
            <p class="text-secondary small mb-4">Try selecting another calendar date or clearing filters.</p>
            <button class="btn btn-krivan btn-krivan-primary rounded-pill px-4" id="emptyResetBtn">
              <i class="bi bi-arrow-counterclockwise me-1"></i> View All Articles
            </button>
          </div>
        </div>
      `;

      document.getElementById('emptyResetBtn')?.addEventListener('click', () => {
        resetAllFilters();
      });
      return;
    }

    // Render 2-Column Cards Layout displaying Background Image, Title, Description, Writer & Source
    blogContainer.innerHTML = filtered.map(article => {
      const title = article.title[currentLang] || article.title.en;
      const excerpt = article.excerpt[currentLang] || article.excerpt.en;
      const source = article.source[currentLang] || article.source.en;
      const readBtnText = currentLang === 'mr' ? 'संपूर्ण बातमी वाचा' : 'Read Article';
      const isSlotEmpty = article.isEmptySlot;

      return `
        <div class="col-md-6 mb-4 reveal-on-scroll">
          <div class="blog-card-bg-box text-white ${isSlotEmpty ? 'border-dashed border-2 border-warning' : ''}" style="background-image: url('${article.image}');">
            <div class="blog-card-bg-overlay"></div>
            <div class="blog-card-content d-flex flex-column justify-content-between h-100">
              
              <!-- Card Top: Source Badge & Article Date -->
              <div>
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <span class="blog-source-badge"><i class="bi bi-newspaper me-1"></i>${source}</span>
                  <span class="badge bg-light text-dark opacity-90"><i class="bi bi-calendar3 me-1"></i>${article.date}</span>
                </div>
              </div>

              <!-- Card Body: Title, Small Description & Writer -->
              <div>
                <h4 class="fw-bold text-white mb-2 text-line-clamp-2">${title}</h4>
                <p class="text-light small opacity-90 mb-3 text-line-clamp-3">${excerpt}</p>
                
                <div class="pt-3 border-top border-secondary-subtle d-flex align-items-center justify-content-between">
                  <span class="blog-writer-tag"><i class="bi bi-pencil-square me-1 text-warning"></i>${article.author}</span>
                  <button class="btn btn-krivan btn-krivan-secondary btn-sm rounded-pill px-3 read-blog-btn" data-id="${article.id}">
                    ${readBtnText} <i class="bi bi-arrow-right-short"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.read-blog-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openBlogDetailModal(id);
      });
    });

    if (typeof initScrollAnimations === 'function') initScrollAnimations();
  }

  function resetAllFilters() {
    activeCategory = 'all';
    searchQuery = '';
    selectedCalendarDate = '';

    categoryBtns.forEach(b => b.classList.remove('active', 'btn-success'));
    categoryBtns.forEach(b => b.classList.add('btn-outline-success'));
    categoryBtns[0]?.classList.add('active', 'btn-success');
    categoryBtns[0]?.classList.remove('btn-outline-success');

    if (searchInput) searchInput.value = '';
    if (calendarPicker) calendarPicker.value = '';
    if (clearDateBtn) clearDateBtn.classList.add('d-none');

    renderMiniCalendarWidget(selectedCalendarDate);
    renderGrid();
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active', 'btn-success'));
      categoryBtns.forEach(b => b.classList.add('btn-outline-success'));

      btn.classList.add('active', 'btn-success');
      btn.classList.remove('btn-outline-success');

      activeCategory = btn.getAttribute('data-cat');
      renderGrid();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderGrid();
    });
  }

  if (calendarPicker) {
    calendarPicker.addEventListener('change', (e) => {
      selectedCalendarDate = e.target.value;
      if (selectedCalendarDate) {
        clearDateBtn?.classList.remove('d-none');
      } else {
        clearDateBtn?.classList.add('d-none');
      }
      renderMiniCalendarWidget(selectedCalendarDate);
      renderGrid();
    });
  }

  if (clearDateBtn) {
    clearDateBtn.addEventListener('click', () => {
      selectedCalendarDate = '';
      if (calendarPicker) calendarPicker.value = '';
      clearDateBtn.classList.add('d-none');
      renderMiniCalendarWidget('');
      renderGrid();
    });
  }

  if (resetCalendarFilterBtn) {
    resetCalendarFilterBtn.addEventListener('click', resetAllFilters);
  }

  const newsletterForm = document.getElementById('blogNewsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('newsletterSuccessMsg');
      if (msg) {
        msg.classList.remove('d-none');
        setTimeout(() => msg.classList.add('d-none'), 4000);
      }
      newsletterForm.reset();
    });
  }

  window.addEventListener('krivanLanguageChanged', () => {
    renderMiniCalendarWidget(selectedCalendarDate);
    renderGrid();
  });

  renderMiniCalendarWidget('');
  renderGrid();
}

function renderMiniCalendarWidget(activeDateStr) {
  const container = document.getElementById('miniCalendarDays');
  if (!container) return;

  const publishedDates = KrivanAgroBlogs.map(b => b.date);

  let daysHTML = '';
  daysHTML += `<div class="calendar-day-cell empty-cell"></div>`;
  daysHTML += `<div class="calendar-day-cell empty-cell"></div>`;

  for (let d = 1; d <= 30; d++) {
    const dayStr = d < 10 ? `0${d}` : `${d}`;
    const fullDate = `2026-09-${dayStr}`;
    const hasArticle = publishedDates.includes(fullDate);
    const isSelected = activeDateStr === fullDate;

    daysHTML += `
      <div class="calendar-day-cell ${hasArticle ? 'has-article' : ''} ${isSelected ? 'selected-date' : ''}" data-date="${fullDate}">
        ${d}
      </div>
    `;
  }

  container.innerHTML = daysHTML;

  container.querySelectorAll('.calendar-day-cell:not(.empty-cell)').forEach(cell => {
    cell.addEventListener('click', () => {
      const date = cell.getAttribute('data-date');
      const calendarPicker = document.getElementById('blogCalendarPicker');
      const clearDateBtn = document.getElementById('clearDateBtn');

      if (calendarPicker) calendarPicker.value = date;
      if (clearDateBtn) clearDateBtn.classList.remove('d-none');

      renderMiniCalendarWidget(date);
      
      const grid = document.getElementById('krivanBlogGrid');
      if (grid) {
        const event = new Event('change');
        calendarPicker?.dispatchEvent(event);
      }
    });
  });
}

/* ================= ================= =================
   3. ARTICLE DETAIL MODAL READER
   ================= ================= ================= */

function openBlogDetailModal(id) {
  const article = KrivanAgroBlogs.find(b => b.id === id);
  if (!article) return;

  const currentLang = localStorage.getItem('krivan_lang') || 'en';
  const title = article.title[currentLang] || article.title.en;
  const content = article.content[currentLang] || article.content.en;
  const source = article.source[currentLang] || article.source.en;

  let modalEl = document.getElementById('blogDetailModal');
  if (!modalEl) {
    const modalHTML = `
      <div class="modal fade" id="blogDetailModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div class="modal-content rounded-4 border-0 shadow-lg">
            <div class="modal-header bg-success text-white">
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-journal-text fs-4"></i>
                <h5 class="modal-title text-white fw-bold" id="blogModalTitle">Article Details</h5>
              </div>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4" id="blogModalBody">
            </div>
            <div class="modal-footer bg-light">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <a href="contact.html" class="btn btn-krivan btn-krivan-primary">Inquire Product Application</a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modalEl = document.getElementById('blogDetailModal');
  }

  document.getElementById('blogModalTitle').innerText = title;
  document.getElementById('blogModalBody').innerHTML = `
    <div class="mb-3 d-flex align-items-center gap-2 flex-wrap text-muted small">
      <span class="badge bg-success"><i class="bi bi-journal-check me-1"></i>Source: ${source}</span>
      <span><i class="bi bi-calendar3 me-1"></i>Date: ${article.date}</span>
      <span><i class="bi bi-clock me-1"></i>${article.readTime}</span>
      <span><i class="bi bi-pencil-square me-1"></i>Writer: ${article.author}</span>
    </div>
    <img src="${article.image}" alt="${title}" class="img-fluid rounded-3 mb-4 w-100 object-fit-cover" style="max-height: 320px;">
    <div class="blog-full-article">
      ${content}
    </div>
  `;

  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

/* Document Ready Auto Init */
document.addEventListener('DOMContentLoaded', () => {
  initHomepageAgroNewsTicker();
  initDedicatedBlogPage();
});
