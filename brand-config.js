/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DYNAMIC BRANDING & LOCATION SYSTEM
 * Centralized configuration for instant global updates
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// 1. CENTRALIZED BRAND CONFIGURATION (EDIT ONLY THIS)
// ═══════════════════════════════════════════════════════════════════════════
const BRAND_CONFIG = {
  // ─── Brand Identity ───
  brandName: "YOUR BEAUTY ESSENCE",
  tagline: "Luxury dermatology & aesthetic care designed for radiant confidence.",
  shortTagline:"Luxury aesthetic care",
  year: "2026",
  
  // ─── Logo & Assets ───
  logo: "./assets/LOGO.png",
  logoInverted: "./assets/LOGO-white.png", // Optional: for dark footer
  favicon: "./assets/favicon.ico",
  
  // ─── Location ───
  city: "NEW YORK",
  country: "Pakistan",
  locationShort: "your city location",
  locationFull: "XYZ Street, Downtown, Your City",
  mapQuery: "Plot 45, MM Alam Road, Gulberg III, Lahore, Pakistan",
  mapDirections: "https://maps.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA&z=15&output=embed",
  
  // ─── Contact Info ───
  phone: "00000000000",
  phoneDisplay: "00000000000",
  email: "info@yourbeauty.com",
  whatsapp: "000000000000",
  whatsappText: "Hi, I want to book a consultation",
  whatsappLink: "https://wa.me/000000000000?text=Hi, I want to book a consultation",
  
  // ─── Social Media ───
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  
  // ─── Business Hours (Optional) ───
  hoursWeekday: "10:00 AM - 8:00 PM",
  hoursWeekend: "12:00 PM - 6:00 PM",
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. BRAND ENGINE - SYNC CSS VARIABLES WITH JS CONFIG
// ═══════════════════════════════════════════════════════════════════════════
const BrandEngine = {
  // Cache DOM elements for performance
  elements: {},
  
  /**
   * Initialize the branding system
   */
  init() {
    this.cacheElements();
    this.syncCSSVariables();
    this.replacePlaceholders();
    this.updateDataAttributes();
    this.updateMetaTags();
    this.updateLinks();
    this.updateVisibility();
  },
  
  /**
   * Cache DOM elements for efficient updates
   */
  cacheElements() {
    this.elements = {
      // Brand elements
      brandNames: document.querySelectorAll('[data-brand="name"], .brand__name, .footer-logo__text'),
      taglines: document.querySelectorAll('[data-brand="tagline"]'),
      logos: document.querySelectorAll('[data-brand="logo"], .brand__logo, .footer-logo__image'),
      
      // Location elements
      cities: document.querySelectorAll('[data-location="city"]'),
      countries: document.querySelectorAll('[data-location="country"]'),
      locationShort: document.querySelectorAll('[data-location="short"]'),
      locationFull: document.querySelectorAll('[data-location="full"]'),
      mapIframes: document.querySelectorAll('[data-location="map"]'),
      mapLinks: document.querySelectorAll('[data-location="map-link"], [data-location="directions"]'),
      
      // Contact elements
      phones: document.querySelectorAll('[data-contact="phone"]'),
      phoneDisplays: document.querySelectorAll('[data-contact="phone-display"]'),
      emails: document.querySelectorAll('[data-contact="email"]'),
      whatsappLinks: document.querySelectorAll('[data-contact="whatsapp"]'),
      addresses: document.querySelectorAll('[data-contact="address"]'),
      
      // Social elements
      instagramLinks: document.querySelectorAll('[data-social="instagram"]'),
      facebookLinks: document.querySelectorAll('[data-social="facebook"]'),
      
      // Content areas with placeholders
      allContent: document.querySelectorAll('[data-brand], [data-location], [data-contact], [data-social]'),
      textNodes: this.getTextNodesWithPlaceholders(),
      
      // Hero elements
      heroEyebrows: document.querySelectorAll('[data-hero="eyebrow"]'),
    };
  },
  
  /**
   * Sync JS config with CSS :root variables
   */
  syncCSSVariables() {
    const root = document.documentElement;
    
    // Brand variables
    root.style.setProperty('--brand-name', `"${BRAND_CONFIG.brandName}"`);
    root.style.setProperty('--brand-tagline', `"${BRAND_CONFIG.tagline}"`);
    root.style.setProperty('--brand-logo', `url("${BRAND_CONFIG.logo}")`);
    root.style.setProperty('--brand-year', `"${BRAND_CONFIG.year}"`);
    
    // Location variables
    root.style.setProperty('--location-city', `"${BRAND_CONFIG.city}"`);
    root.style.setProperty('--location-country', `"${BRAND_CONFIG.country}"`);
    root.style.setProperty('--location-short', `"${BRAND_CONFIG.locationShort}"`);
    root.style.setProperty('--location-full', `"${BRAND_CONFIG.locationFull}"`);
    root.style.setProperty('--location-map-query', `"${BRAND_CONFIG.mapQuery}"`);
    
    // Contact variables
    root.style.setProperty('--contact-phone', `"${BRAND_CONFIG.phone}"`);
    root.style.setProperty('--contact-phone-display', `"${BRAND_CONFIG.phoneDisplay}"`);
    root.style.setProperty('--contact-email', `"${BRAND_CONFIG.email}"`);
    root.style.setProperty('--contact-address', `"${BRAND_CONFIG.locationFull}"`);
    root.style.setProperty('--contact-whatsapp', `"${BRAND_CONFIG.whatsapp}"`);
    root.style.setProperty('--contact-whatsapp-text', `"${BRAND_CONFIG.whatsappText}"`);
    
    // Social variables
    root.style.setProperty('--social-instagram', `"${BRAND_CONFIG.instagram}"`);
    root.style.setProperty('--social-facebook', `"${BRAND_CONFIG.facebook}"`);
    root.style.setProperty('--social-whatsapp', `"${BRAND_CONFIG.whatsappLink}"`);
  },
  
  /**
   * Replace {{placeholder}} syntax in text content
   */
  replacePlaceholders() {
    const placeholders = {
      '{{brand-name}}': BRAND_CONFIG.brandName,
      '{{tagline}}': BRAND_CONFIG.tagline,
      '{{short-tagline}}': BRAND_CONFIG.shortTagline,
      '{{year}}': BRAND_CONFIG.year,
      '{{city}}': BRAND_CONFIG.city,
      '{{country}}': BRAND_CONFIG.country,
      '{{location-short}}': BRAND_CONFIG.locationShort,
      '{{location-full}}': BRAND_CONFIG.locationFull,
      '{{phone}}': BRAND_CONFIG.phone,
      '{{phone-display}}': BRAND_CONFIG.phoneDisplay,
      '{{email}}': BRAND_CONFIG.email,
      '{{address}}': BRAND_CONFIG.locationFull,
    };
    
    // Replace in data-attribute elements
    this.elements.allContent.forEach(el => {
      this.replaceTextInElement(el, placeholders);
    });
    
    // Replace in text nodes
    this.elements.textNodes.forEach(node => {
      let text = node.textContent;
      let hasChanges = false;
      
      Object.entries(placeholders).forEach(([placeholder, value]) => {
        if (text.includes(placeholder)) {
          text = text.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        node.textContent = text;
      }
    });
  },
  
  /**
   * Helper: Replace text in element including child text nodes
   */
  replaceTextInElement(element, placeholders) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      let text = node.textContent;
      let hasChanges = false;
      
      Object.entries(placeholders).forEach(([placeholder, value]) => {
        if (text.includes(placeholder)) {
          text = text.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        node.textContent = text;
      }
    }
  },
  
  /**
   * Get all text nodes that might contain placeholders
   */
  getTextNodesWithPlaceholders() {
    const textNodes = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (node.textContent.includes('{{') && node.parentElement.tagName !== 'SCRIPT') {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        }
      },
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }
    
    return textNodes;
  },
  
  /**
   * Hide elements with empty values
   */
  updateVisibility() {
    // Hide social links with empty URLs
    ['instagram', 'facebook'].forEach(social => {
      const links = document.querySelectorAll(`[data-social="${social}"]`);
      const value = BRAND_CONFIG[social];
      links.forEach(link => {
        if (!value || value === '#' || value === '') {
          link.style.display = 'none';
        } else {
          link.style.display = '';
        }
      });
    });
    
    // Hide WhatsApp if empty
    const whatsappLinks = document.querySelectorAll('[data-contact="whatsapp"]');
    if (!BRAND_CONFIG.whatsappLink || BRAND_CONFIG.whatsappLink === '') {
      whatsappLinks.forEach(link => {
        if (link.classList.contains('whatsapp-float')) {
          link.style.display = 'none';
        }
      });
    }
  },
  
  /**
   * Update elements with data-* attributes
   */
  updateDataAttributes() {
    // Brand name elements
    this.elements.brandNames.forEach(el => {
      el.textContent = BRAND_CONFIG.brandName;
    });
    
    // Tagline elements
    this.elements.taglines.forEach(el => {
      el.textContent = BRAND_CONFIG.tagline;
    });
    
    // City elements
    this.elements.cities.forEach(el => {
      el.textContent = BRAND_CONFIG.city;
    });
    
    // Country elements
    this.elements.countries.forEach(el => {
      el.textContent = BRAND_CONFIG.country;
    });
    
    // Location short
    this.elements.locationShort.forEach(el => {
      el.textContent = BRAND_CONFIG.locationShort;
    });
    
    // Location full
    this.elements.locationFull.forEach(el => {
      el.textContent = BRAND_CONFIG.locationFull;
    });
    
    // Phone
    this.elements.phones.forEach(el => {
      el.textContent = BRAND_CONFIG.phone;
      if (el.tagName === 'A') {
        el.href = `tel:${BRAND_CONFIG.phone.replace(/\s/g, '')}`;
      }
    });
    
    // Phone display
    this.elements.phoneDisplays.forEach(el => {
      el.textContent = BRAND_CONFIG.phoneDisplay;
    });
    
    // Email
    this.elements.emails.forEach(el => {
      el.textContent = BRAND_CONFIG.email;
      if (el.tagName === 'A') {
        el.href = `mailto:${BRAND_CONFIG.email}`;
      }
    });
    
    // WhatsApp
    this.elements.whatsappLinks.forEach(el => {
      el.href = BRAND_CONFIG.whatsappLink;
    });
    
    // Address
    this.elements.addresses.forEach(el => {
      el.textContent = BRAND_CONFIG.locationFull;
    });
    
    // Hero eyebrow
    this.elements.heroEyebrows.forEach(el => {
      el.textContent = `${BRAND_CONFIG.shortTagline}`;
    });
    
    // Logo images
    this.elements.logos.forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = BRAND_CONFIG.logo;
        el.alt = `${BRAND_CONFIG.brandName} logo`;
      }
    });
    
    // Map iframes
    this.elements.mapIframes.forEach(el => {
      if (el.tagName === 'IFRAME') {
        el.src = `https://maps.google.com/maps?q=${BRAND_CONFIG.mapQuery}&output=embed`;
      }
    });
    
    // Map links (View on Map)
    this.elements.mapLinks.forEach(el => {
      if (el.tagName === 'A') {
        el.href = BRAND_CONFIG.mapDirections || `https://maps.google.com/maps?q=${BRAND_CONFIG.mapQuery}`;
      }
    });
    
    // Instagram
    this.elements.instagramLinks.forEach(el => {
      el.href = BRAND_CONFIG.instagram;
    });
    
    // Facebook
    this.elements.facebookLinks.forEach(el => {
      el.href = BRAND_CONFIG.facebook;
    });
  },
  
  /**
   * Update meta tags
   */
  updateMetaTags() {
    // Page title
    document.title = `${BRAND_CONFIG.brandName} | ${BRAND_CONFIG.shortTagline}`;
    
    // Meta description (if exists)
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = `${BRAND_CONFIG.brandName} - ${BRAND_CONFIG.tagline} Located in ${BRAND_CONFIG.locationShort}.`;
    }
  },
  
  /**
   * Update all links with dynamic hrefs
   */
  updateLinks() {
    // WhatsApp float button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
      whatsappFloat.href = BRAND_CONFIG.whatsappLink;
    }
    
    // Map directions
    const mapDirections = document.querySelector('[data-location="directions"]');
    if (mapDirections) {
      mapDirections.href = BRAND_CONFIG.mapDirections;
    }
  },
  
  /**
   * PUBLIC API: Update brand config live without reload
   * @param {Object} newConfig - New configuration values
   */
  updateBrandConfig(newConfig) {
    // Merge new config with existing
    Object.assign(BRAND_CONFIG, newConfig);
    
    // Re-run all updates
    this.syncCSSVariables();
    this.replacePlaceholders();
    this.updateDataAttributes();
    this.updateMetaTags();
    this.updateLinks();
    this.updateVisibility();
    
    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('brandConfigUpdated', { 
      detail: BRAND_CONFIG 
    }));
    
    console.log('✅ Brand config updated:', BRAND_CONFIG);
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  BrandEngine.init();
});

// ═══════════════════════════════════════════════════════════════════════════
// 4. GLOBAL EXPORTS (for console access)
// ═══════════════════════════════════════════════════════════════════════════
window.BRAND_CONFIG = BRAND_CONFIG;
window.BrandEngine = BrandEngine;
window.updateBrandConfig = (newConfig) => BrandEngine.updateBrandConfig(newConfig);
