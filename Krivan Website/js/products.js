/* ==========================================================================
   KRIVAN INDUSTRIES PVT. LTD. - Product Database & Filter Engine
   Verified Product Catalog Data & Rendering Utilities
   ========================================================================== */

const KrivanProducts = [
  {
    id: "kaizen-k",
    name: "KAIZEN - K",
    subtitle: "Potash Derived From Rhodophytes (Flagship Product)",
    isFlagship: true,
    category: "potash",
    categoryName: "Potash & Plant Boosters",
    image: "assets/images/products/kaizen-k.jpg",
    packing: "48 Grams, 4 Grams",
    targetCrop: "Cash Crops, Vegetables, Fruit Crops, Legumes & Floriculture",
    shortDesc: "Flagship bio-available potash derived from Rhodophytes enriched with natural minerals, auxins, and cytokinins to boost crop yield, sugar content, and drought resilience.",
    composition: [
      { label: "Water Soluble Potash (K)", value: "20.0% (Min)" },
      { label: "Total Sulphur (S)", value: "1.5%" },
      { label: "Moisture", value: "5.0% (Max)" },
      { label: "Bio-Active Extracts", value: "Rich in Minerals, Auxins & Cytokinins" }
    ],
    benefits: [
      "Contains bio-available potash which significantly improves vital plant functions.",
      "Increases yield, weight, size, and quality of crop produce.",
      "Helps activate growth-related enzymes and hormones naturally.",
      "Improves crop resistance against severe drought and thermal stress.",
      "Enhances root nutrient uptake efficiency across all growth stages.",
      "Improves shape, uniform size, vibrant color, and rich flavor of produce.",
      "Naturally rich in essential Minerals, Auxins, and Cytokinins."
    ],
    usage: "Dose: Suitable for Cash crops, Horticulture, Vegetables, Legumes, Cereals, Tuber & Bulb crops, and Floriculture."
  },
  {
    id: "thalassa",
    name: "THALASSA",
    subtitle: "Flower & Fruit Enhancer",
    isFlagship: false,
    category: "potash",
    categoryName: "Potash & Plant Boosters",
    image: "assets/images/results/grapes-yield.jpg",
    packing: "1 Litre, 500 ml",
    targetCrop: "Grapes, Tomato, Pomegranate, Chili & Vegetables",
    shortDesc: "Specialized liquid flower and fruit enhancer formulated to prevent flower drop, promote uniform fruit setting, and maximize berry/fruit size.",
    composition: [
      { label: "Formulation", value: "Bio-Active Marine & Botanical Extract" },
      { label: "Active Compounds", value: "Organic Auxins & Cytokinins" },
      { label: "Target Stage", value: "Pre-flowering & Fruit Setting Stage" }
    ],
    benefits: [
      "Prevents premature flower and fruit drop under adverse weather.",
      "Promotes uniform, profuse flowering and fruit development.",
      "Enhances fruit size, skin shine, sugar content (Brix), and color.",
      "Significantly increases marketable crop yield and shelf life."
    ],
    usage: "Foliar spray: 1.5 - 2 ml per litre of water during pre-flowering and fruit development stages."
  },
  {
    id: "kriv-vasundhara",
    name: "KRIV - VASUNDHARA",
    subtitle: "Organic Manure",
    isFlagship: false,
    category: "organic",
    categoryName: "Organic Manure & PROM",
    image: "assets/images/products/kriv-vasundhara-organic-manure.png",
    packing: "40 kg",
    targetCrop: "All Crops",
    shortDesc: "High-grade organic manure formulated to enrich soil texture, eliminate harmful contaminants, and boost crop immunity naturally.",
    composition: [
      { label: "Nitrogen (N)", value: "0.5%" },
      { label: "Phosphorus (P)", value: "0.5%" },
      { label: "Potassium (K)", value: "0.5%" },
      { label: "Organic Carbon", value: "14%" },
      { label: "C:N Ratio", value: "< 20" },
      { label: "pH Range", value: "6.5 - 7.5" },
      { label: "Moisture", value: "25% (Max)" }
    ],
    benefits: [
      "Helps in eliminating unwanted and harmful soil contamination.",
      "Improves soil fertility, texture, water retention, and soil aeration.",
      "Helps enrich soil with essential nutrients in readily available form.",
      "Improves C:N Ratio in soil for optimal biological balance.",
      "Enhances crop immunity against stress and pathogens.",
      "Creates ideal soil condition for growth of beneficial micro-organisms.",
      "Ideal and necessary for certified organic farming practices."
    ],
    usage: "Apply as base soil dressing before sowing or during early growth stages."
  },
  {
    id: "kriv-natura",
    name: "KRIV - NATURA",
    subtitle: "Potash Derived From Molasses (Granulated)",
    isFlagship: false,
    category: "potash",
    categoryName: "Potash & Plant Boosters",
    image: "assets/images/products/kriv-natura-potash.png",
    packing: "40 kg",
    targetCrop: "All Crops",
    shortDesc: "Potassium-rich granulated fertilizer derived from natural molasses to improve yield, fruit size, flavor, and shelf life.",
    composition: [
      { label: "Potash (as K₂O)", value: "14.5%" },
      { label: "Source", value: "Natural Molasses Granulated" },
      { label: "Moisture", value: "5%" }
    ],
    benefits: [
      "Potassium-rich organic fertilizer formulation.",
      "Improves crop quality, fruit size, and prolongs post-harvest shelf life.",
      "Increases drought and drought-stress resistance capacity of crops.",
      "Activates vital growth-related enzymes in plants.",
      "Enhances flavor, weight, color, and size of crop produce.",
      "Plays an essential role in vegetative and reproductive plant stages resulting in increased yield.",
      "Produces proteins, enzymes, hormones, and carbohydrates required for healthy growth."
    ],
    usage: "Broadcast evenly over soil during root development or crop flowering phase."
  },
  {
    id: "kriv-mruda",
    name: "KRIV - MRUDA",
    subtitle: "Phosphate Rich Organic Manure (PROM)",
    isFlagship: false,
    category: "organic",
    categoryName: "Organic Manure & PROM",
    image: "assets/images/products/kriv-mruda-prom.png",
    packing: "40 kg",
    targetCrop: "All Crops & All Soil Types",
    shortDesc: "Phosphate Rich Organic Manure providing soluble phosphorus and organic carbon to promote vigorous root development and soil health.",
    composition: [
      { label: "Total Phosphate", value: "8%" },
      { label: "Total Organic Carbon", value: "8%" },
      { label: "Total Nitrogen", value: "0.4%" },
      { label: "C:N Ratio", value: "20:1" },
      { label: "Moisture", value: "25% (Max)" }
    ],
    benefits: [
      "Contains phosphorus in readily soluble, bio-available form.",
      "Improves physical, chemical, and biological properties of soil.",
      "Improves soil electrical conductivity for better nutrient absorption.",
      "Improves seed germination percentage and vigor.",
      "Accelerates deep root system development.",
      "Improves crop resistance towards disease and adverse climatic conditions."
    ],
    usage: "Mix thoroughly into topsoil prior to planting or broadcasting during tilling."
  },
  {
    id: "kriv-silica",
    name: "KRIV - SILICA",
    subtitle: "Diatomite Silicon Granules",
    isFlagship: false,
    category: "potash",
    categoryName: "Potash & Plant Boosters",
    image: "assets/images/products/kriv-silica.png",
    packing: "40 kg",
    targetCrop: "All Crops",
    shortDesc: "Diatomite silicon granules that strengthen plant cell walls, enhance nutrient uptake, and build resistance against drought and heat.",
    composition: [
      { label: "Si(OH)₄", value: "0.08% Min" },
      { label: "Moisture", value: "12% Max" },
      { label: "pH Range", value: "7.5 Min" },
      { label: "Form", value: "Granular Diatomite" }
    ],
    benefits: [
      "Improves plant resilience to drought, salinity, and temperature extremes.",
      "Strengthens plant cell walls and improves water use efficiency.",
      "Boosts uptake of essential nutrients like phosphorus, potassium, and calcium.",
      "Helps in reducing heavy metal toxicity in soil by immobilizing them.",
      "Improves overall crop yield, stem firmness, and shelf life.",
      "Improves soil aeration, structure, and water retention capacity."
    ],
    usage: "Apply at basal stage or top dress during crop growth cycles."
  },
  {
    id: "kriv-luster",
    name: "KRIV - LUSTER",
    subtitle: "Maharashtra State Grade No. - II Micronutrient",
    isFlagship: false,
    category: "micronutrient",
    categoryName: "Micronutrients",
    image: "assets/images/products/kriv-luster.png",
    packing: "2 kg",
    targetCrop: "All Crops",
    shortDesc: "Chelated multi-micronutrient mixture formulated as per Maharashtra State Grade No. - II for rapid foliar uptake and deficiency correction.",
    composition: [
      { label: "Zinc (Zn)", value: "3.0%" },
      { label: "Copper (Cu)", value: "1.0%" },
      { label: "Iron (Fe)", value: "2.5%" },
      { label: "Manganese (Mn)", value: "1.0%" },
      { label: "Boron (B)", value: "0.5%" },
      { label: "Molybdenum (Mo)", value: "0.10%" }
    ],
    benefits: [
      "Scientific mixture of chelated micronutrients essential for crop growth.",
      "Corrects micronutrient deficiency symptoms rapidly.",
      "Helps crops increase uptake of primary (NPK) and secondary nutrients.",
      "Results in overall healthy foliage growth and increased yield.",
      "Facilitates instant leaf uptake when applied as a foliar spray.",
      "Increases crop resistance towards bacterial and fungal attacks."
    ],
    usage: "Foliar Spray: Dissolve recommended dosage in clean water and spray during vegetative stage."
  },
  {
    id: "kriv-boneton",
    name: "KRIV - BONETON",
    subtitle: "Bone Meal Natural Organic Fertilizer",
    isFlagship: false,
    category: "organic",
    categoryName: "Organic Manure & PROM",
    image: "assets/images/products/kriv-boneton-bonemeal.png",
    packing: "40 kg",
    targetCrop: "All Crops & Horticultural Plants",
    shortDesc: "Natural bone meal organic nutrient source providing slow-release organic phosphorus and calcium for root development.",
    composition: [
      { label: "Source", value: "Pure Organic Bone Meal" },
      { label: "Key Nutrients", value: "Organic Phosphorus & Calcium" },
      { label: "Release Type", value: "Slow Release Nutrient Supply" }
    ],
    benefits: [
      "Natural slow-release source of phosphorus for long-term plant feeding.",
      "Enhances root elongation, sturdy stems, and profuse flowering.",
      "Provides natural calcium to strengthen plant cell structures.",
      "Improves soil biological activity without chemical leaching.",
      "Ideal for fruit trees, vegetables, flowers, and field crops."
    ],
    usage: "Soil application around root zone during potting or field preparation."
  }
];

// Straight Micronutrient Fertilizer Grades
const MicronutrientGrades = [
  "Zinc EDTA (12%)",
  "Zinc Sulphate Mono-hydrate (Zn-33%)",
  "Di Sodium Tetra Borate Penta Hydrate (14.5%)",
  "Borax 10.5% (Soil application)",
  "Ferrous Sulphate (Fe- 19%)",
  "Zinc Sulphate Heptahydrate (21%)",
  "Iron Fe 12% chelated",
  "Manganese Sulphate (Mn 30.5%)",
  "Copper Sulphate (Cu 24%)",
  "Di-Sodium Octa Borate Tetra Hydrate (B 20%)"
];

// Water Soluble NPK Grades
const WaterSolubleGrades = [
  "19 : 19 : 19 (Balanced NPK)",
  "13 : 40 : 13 (High Phosphate)",
  "12 : 61 : 00 (Mono Ammonium Phosphate)",
  "11 : 54 : 25 (Starter Booster)",
  "00 : 52 : 34 (Mono Potassium Phosphate)",
  "00 : 60 : 20 (High Potash & Phosphate)",
  "00 : 00 : 50 (Sulphate of Potash)",
  "11 : 36 : 24 (Vegetative Special)",
  "24 : 24 : 00 (Growth Special)",
  "06 : 45 : 06 (Rooting Special)"
];

/* Helper Functions */
function getProductById(id) {
  return KrivanProducts.find(p => p.id === id) || KrivanProducts[0];
}

function renderProductCardHTML(p) {
  const isFlagship = p.isFlagship ? `<span class="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-1 shadow-sm z-2"><i class="bi bi-star-fill text-dark me-1"></i> Flagship Product</span>` : '';
  
  return `
    <div class="col-lg-4 col-md-6 mb-4 product-item" data-category="${p.category}">
      <div class="product-card ${p.isFlagship ? 'border-success shadow-lg' : ''}">
        <div class="product-card-img-wrapper position-relative">
          ${isFlagship}
          <span class="product-badge">${p.categoryName}</span>
          <img src="${p.image}" alt="${p.name} Packaging" class="product-card-img" loading="lazy">
        </div>
        <div class="product-card-body">
          <h3 class="product-card-title">${p.name}</h3>
          <div class="text-success small fw-bold mb-2">${p.subtitle}</div>
          <p class="product-card-desc">${p.shortDesc}</p>
          <div class="mb-3">
            <span class="product-spec-pill"><i class="bi bi-box-seam me-1"></i> ${p.packing}</span>
            <span class="product-spec-pill"><i class="bi bi-tree me-1"></i> ${p.targetCrop}</span>
          </div>
          <div class="mt-auto d-flex gap-2">
            <a href="product-details.html?id=${p.id}" class="btn btn-krivan btn-krivan-primary flex-grow-1">
              <span data-i18n="viewDetails">View Details</span> <i class="bi bi-arrow-right ms-1"></i>
            </a>
            <a href="contact.html?product=${encodeURIComponent(p.name)}" class="btn btn-krivan btn-krivan-outline px-3" title="Enquire for ${p.name}">
              <i class="bi bi-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
