document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  const navActions = document.querySelector('.nav-actions');
  const siteHeader = document.querySelector('.site-header');

  // ============================================
  // NAVBAR TOGGLE - Premium Mobile Navigation
  // ============================================
  function toggleMenu() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    const newExpanded = !isExpanded;

    navToggle.setAttribute('aria-expanded', String(newExpanded));
    primaryNav.classList.toggle('active', newExpanded);
    navActions.classList.toggle('active', newExpanded);
    document.body.classList.toggle('menu-open', newExpanded);

    // Move focus to first nav link when opening
    if (newExpanded) {
      const firstNavLink = primaryNav.querySelector('a');
      if (firstNavLink) {
        setTimeout(() => firstNavLink.focus(), 100);
      }
    }
  }

  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('active');
    navActions.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (navToggle && primaryNav) {
    // Toggle click handler
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking on nav links
    const navLinks = primaryNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          closeMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (primaryNav.classList.contains('active')) {
        if (!siteHeader.contains(e.target)) {
          closeMenu();
        }
      }
    });

    // Keyboard accessibility
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && primaryNav.classList.contains('active')) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Handle window resize - reset menu state when going to desktop
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth >= 1024) {
          closeMenu();
        }
      }, 250);
    });
  }

  // Image Slider Functionality
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Start the slider
  showSlide(currentSlide);
  setInterval(nextSlide, 2000); // Change image every 2 seconds

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe about section elements
  const aboutContent = document.querySelector('.about__content');
  const aboutImage = document.querySelector('.about__image');

  if (aboutContent) observer.observe(aboutContent);
  if (aboutImage) observer.observe(aboutImage);

  // Treatment section scroll animations
  const treatmentHeader = document.querySelector('.treatment-header');
  if (treatmentHeader) observer.observe(treatmentHeader);

  // Treatment cards scroll animation with staggered effect
  const treatmentCards = document.querySelectorAll('.treatment-card');
  treatmentCards.forEach((card, index) => {
    observer.observe(card);
    // Add staggered delay for smoother animation
    card.style.transitionDelay = `${index * 0.15}s`;
  });

  // Enhanced treatment card hover effects
  treatmentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ============================================
  // WHY LUXURY SECTION - Scroll & Parallax Effects
  // ============================================
  const whyLuxurySection = document.querySelector('.why-luxury');
  const whyLuxuryBg = document.querySelector('.why-luxury__bg-image');
  const whyLuxuryImage = document.querySelector('.why-luxury__image');

  if (whyLuxurySection && whyLuxuryBg) {
    // Parallax effect on scroll
    let ticking = false;
    
    function updateWhyLuxuryParallax() {
      const rect = whyLuxurySection.getBoundingClientRect();
      const scrollProgress = -rect.top / rect.height;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Subtle parallax for background
        const bgOffset = scrollProgress * 30;
        whyLuxuryBg.style.transform = `scale(1.15) translateY(${bgOffset}px)`;
        
        // Subtle parallax for main image (opposite direction)
        if (whyLuxuryImage) {
          const imageOffset = scrollProgress * -20;
          whyLuxuryImage.style.transform = `translateY(${imageOffset}px)`;
        }
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateWhyLuxuryParallax);
        ticking = true;
      }
    }, { passive: true });

    // Intersection Observer for section visibility
    const whyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          whyLuxurySection.classList.add('is-visible');
        }
      });
    }, { threshold: 0.2 });

    whyObserver.observe(whyLuxurySection);
  }

  // Gallery scroll animations and lightbox
  const galleryItems = document.querySelectorAll('.gallery__item');
  const lightbox = document.querySelector('.gallery-lightbox');
  const lightboxImage = document.querySelector('.gallery-lightbox__image');
  const lightboxCaption = document.querySelector('.gallery-lightbox__caption');
  const closeLightboxBtn = document.querySelector('.gallery-lightbox__close');
  const prevLightbox = document.querySelector('.gallery-lightbox__nav--prev');
  const nextLightbox = document.querySelector('.gallery-lightbox__nav--next');
  const lightboxBackdrop = document.querySelector('.gallery-lightbox');
  let activeGalleryIndex = 0;

  const galleryData = Array.from(galleryItems).map(item => ({
    src: item.dataset.image,
    title: item.dataset.title,
    alt: item.querySelector('img')?.alt || item.dataset.title
  }));

  function openLightbox(index) {
    activeGalleryIndex = index;
    updateLightbox(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightboxView() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightbox(index) {
    const imageItem = galleryData[index];
    if (!imageItem) return;
    lightboxImage.src = imageItem.src;
    lightboxImage.alt = imageItem.alt;
    lightboxCaption.textContent = imageItem.title;
  }

  function showNextLightbox() {
    activeGalleryIndex = (activeGalleryIndex + 1) % galleryData.length;
    updateLightbox(activeGalleryIndex);
  }

  function showPrevLightbox() {
    activeGalleryIndex = (activeGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox(activeGalleryIndex);
  }

  galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1 + 0.1}s`;
    observer.observe(item);

    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightboxView);
  }

  if (prevLightbox) {
    prevLightbox.addEventListener('click', showPrevLightbox);
  }

  if (nextLightbox) {
    nextLightbox.addEventListener('click', showNextLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', (event) => {
      if (event.target === lightboxBackdrop) {
        closeLightboxView();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') {
      closeLightboxView();
    }
    if (event.key === 'ArrowRight') {
      showNextLightbox();
    }
    if (event.key === 'ArrowLeft') {
      showPrevLightbox();
    }
  });

  // Testimonials carousel functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevArrow = document.querySelector('.carousel-prev');
  const nextArrow = document.querySelector('.carousel-next');

  let currentTestimonialSlide = 0;
  let autoplayInterval;

  function updateTestimonialCarousel() {
    // Update track position
    carouselTrack.style.transform = `translateX(-${currentTestimonialSlide * 100}%)`;

    // Update active slide
    testimonialSlides.forEach((slide, index) => {
      if (index === currentTestimonialSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentTestimonialSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextTestimonialSlide() {
    currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonialSlides.length;
    updateTestimonialCarousel();
  }

  function prevTestimonialSlide() {
    currentTestimonialSlide = (currentTestimonialSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    updateTestimonialCarousel();
  }

  function goToTestimonialSlide(slideIndex) {
    currentTestimonialSlide = slideIndex;
    updateTestimonialCarousel();
  }

  // Event listeners
  if (nextArrow) {
    nextArrow.addEventListener('click', nextTestimonialSlide);
  }

  if (prevArrow) {
    prevArrow.addEventListener('click', prevTestimonialSlide);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToTestimonialSlide(index));
  });

  // Autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextTestimonialSlide, 4000); // Change slide every 4 seconds
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Pause autoplay on hover
  const carouselContainer = document.querySelector('.testimonials-carousel');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
  }

  // Start autoplay
  startAutoplay();

  // Initialize first slide
  updateTestimonialCarousel();

  // Testimonials header scroll animation
  const testimonialsHeader = document.querySelector('.testimonials-header');
  if (testimonialsHeader) observer.observe(testimonialsHeader);

  // Contact form scroll animations
  const contactFormHeader = document.querySelector('.contact-premium__form-header');
  const contactFormFields = document.querySelectorAll('.contact-premium__field');
  const contactFormButton = document.querySelector('.contact-premium__button');
  const contactTrust = document.querySelector('.contact-premium__trust');

  if (contactFormHeader) observer.observe(contactFormHeader);
  contactFormFields.forEach(field => observer.observe(field));
  if (contactFormButton) observer.observe(contactFormButton);
  if (contactTrust) observer.observe(contactTrust);

  // Location map scroll animations
  const locationMapHeader = document.querySelector('.location-map-header');
  const locationMapContainer = document.querySelector('.location-map-container');
  if (locationMapHeader) observer.observe(locationMapHeader);
  if (locationMapContainer) observer.observe(locationMapContainer);

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left - next slide
      nextTestimonialSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right - previous slide
      prevTestimonialSlide();
    }
  }

  // Add touch event listeners
  if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    carouselContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // =============== Contact Form Initialization ===============
  const contactForm = document.getElementById('contactForm');
  const formInputs = document.querySelectorAll('.contact-premium__input');

  // Add floating label animation on focus/blur
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });

    // Initialize state if field has value
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });

  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = this.querySelector('.contact-premium__button');
      const originalText = submitBtn.textContent;

      // Disable button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate form submission (in production, this would send to a server)
      setTimeout(() => {
        // Show success state
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, rgba(100, 200, 100, 0.95), rgba(80, 180, 80, 0.85))';

        // Reset form
        this.reset();

        // Reset all inputs to unfocused state
        formInputs.forEach(input => {
          input.parentElement.classList.remove('focused');
        });

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 3000);
      }, 1500);
    });
  }

  // =============== Back to Top Button ===============
  const backToTopBtn = document.querySelector('.back-to-top');

  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  window.addEventListener('scroll', toggleBackToTop);
  backToTopBtn.addEventListener('click', scrollToTop);

  // =============== Newsletter Form ===============
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = this.querySelector('.newsletter-input');
      const submitBtn = this.querySelector('.newsletter-submit');
      const originalIcon = submitBtn.innerHTML;

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderBottomColor = '#ff6b6b';
        setTimeout(() => {
          emailInput.style.borderBottomColor = '';
        }, 2000);
        return;
      }

      // Disable button and show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>';

      // Simulate subscription (in production, this would send to a server)
      setTimeout(() => {
        // Show success
        submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>';

        // Reset form
        emailInput.value = '';

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalIcon;
        }, 3000);
      }, 1500);
    });
  }

  // =============== Instagram Strip Animation ===============
  // Duplicate images for seamless loop
  const instagramStrip = document.querySelector('.instagram-strip__container');
  if (instagramStrip) {
    const images = instagramStrip.querySelectorAll('.instagram-strip__image');
    images.forEach(img => {
      const clone = img.cloneNode(true);
      instagramStrip.appendChild(clone);
    });
  }
});
