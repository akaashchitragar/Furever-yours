// Furever Yours - Landing Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Prevent body scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !hamburger.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust offset based on screen size
                let offset = 80;
                if (window.innerWidth <= 768) {
                    offset = 70;
                }
                if (window.innerWidth <= 576) {
                    offset = 60;
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations with better performance
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');
    
    // Function to check if element is in viewport with better performance
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top <= windowHeight * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations with debounce for performance
    let scrollTimeout;
    function handleScrollAnimations() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            // Fade in animations
            fadeElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('active')) {
                    element.classList.add('active');
                }
            });
            
            // Slide in animations
            slideElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('active')) {
                    element.classList.add('active');
                }
            });
        });
    }
    
    // Initialize scroll animations
    if (fadeElements.length > 0 || slideElements.length > 0) {
        window.addEventListener('scroll', handleScrollAnimations);
        // Also check on resize for responsive layouts
        window.addEventListener('resize', handleScrollAnimations);
        handleScrollAnimations(); // Check on page load
    }

    // FAQ Accordion - Make accessible
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            // Add ARIA attributes for accessibility
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('tabindex', '0');
            
            // Handle both click and keyboard events
            const handleFaqToggle = () => {
                const answer = question.nextElementSibling;
                const parent = question.closest('.faq-item');
                const answerContent = answer.querySelector('.faq-answer-content');
                const icon = question.querySelector('.faq-icon i');
                
                // Check if this FAQ item is already active
                const isActive = parent.classList.contains('active');
                
                // Close all FAQs first
                faqItems.forEach(item => {
                    const itemQuestion = item.querySelector('.faq-question');
                    const itemAnswer = item.querySelector('.faq-answer');
                    const itemIcon = itemQuestion.querySelector('.faq-icon i');
                    
                    // Skip if this is the clicked item
                    if (itemQuestion === question) return;
                    
                    item.classList.remove('active');
                    itemQuestion.classList.remove('active');
                    itemQuestion.setAttribute('aria-expanded', 'false');
                    itemAnswer.style.maxHeight = null;
                    itemIcon.classList.remove('fa-minus');
                    itemIcon.classList.add('fa-plus');
                });
                
                // Toggle the active state for the clicked item
                if (isActive) {
                    // Close this FAQ
                    parent.classList.remove('active');
                    question.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = null;
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                } else {
                    // Open this FAQ
                    parent.classList.add('active');
                    question.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answerContent.offsetHeight + 'px';
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            };
            
            question.addEventListener('click', handleFaqToggle);
            
            // Keyboard accessibility
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFaqToggle();
                }
            });
        });
    }

    // Scroll Reveal Animation with better performance
    let revealTimeout;
    function revealOnScroll() {
        if (revealTimeout) {
            window.cancelAnimationFrame(revealTimeout);
        }
        
        revealTimeout = window.requestAnimationFrame(() => {
            const reveals = document.querySelectorAll('.reveal');
            const windowHeight = window.innerHeight;
            
            reveals.forEach(item => {
                const elementTop = item.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);
    revealOnScroll(); // Run once on load

    // Header scroll effect
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }



    // Cookie consent banner
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptCookieBtn = document.querySelector('.cookie-accept');
    
    if (cookieBanner && acceptCookieBtn) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            // Show banner with a slight delay
            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 2000);
            
            // Handle accept button click
            acceptCookieBtn.addEventListener('click', () => {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieBanner.classList.remove('visible');
            });
        }
    }
    
    // Enhanced product hover effects
    const productItems = document.querySelectorAll('.product-item');
    
    if (productItems.length) {
        productItems.forEach(item => {
            // Skip hover effects on mobile (better performance)
            if (window.innerWidth > 768) {
                // Improved hover transition
                item.addEventListener('mouseenter', function() {
                    this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transition = 'transform 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000), box-shadow 0.5s ease';
                });
            }
            
            // Make entire product card clickable
            item.addEventListener('click', function(e) {
                // Ignore clicks on action buttons
                if (e.target.closest('.quick-action-btn')) return;
                
                // Get the main product view link
                const viewDetailsBtn = this.querySelector('.quick-action-btn');
                if (viewDetailsBtn) {
                    viewDetailsBtn.click();
                }
            });
        });
    }
    
    // Fix image aspect ratios for responsive layouts
    function maintainImageAspectRatios() {
        const productImages = document.querySelectorAll('.product-image');
        
        productImages.forEach(img => {
            if (img.complete) {
                handleImageLoad(img);
            } else {
                img.addEventListener('load', () => handleImageLoad(img));
            }
        });
    }
    
    function handleImageLoad(img) {
        const container = img.closest('.product-image-wrapper');
        if (container) {
            // Only set aspect ratio if not already done by CSS
            if (!container.style.aspectRatio) {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                container.style.aspectRatio = aspectRatio;
            }
        }
    }
    
    // Run on load and resize
    maintainImageAspectRatios();
    window.addEventListener('resize', maintainImageAspectRatios);
    
    // Handle responsive videos
    const resizeVideos = () => {
        const videos = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]');
        videos.forEach(video => {
            const container = video.parentElement;
            if (container) {
                container.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
                container.style.position = 'relative';
                video.style.position = 'absolute';
                video.style.top = '0';
                video.style.left = '0';
                video.style.width = '100%';
                video.style.height = '100%';
            }
        });
    };
    
    resizeVideos();
    window.addEventListener('resize', resizeVideos);
    
    // Comparison Slider Functionality
    window.currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const sliderTrack = document.getElementById('sliderTrack');
    
    if (slides.length > 0 && sliderTrack) {
        // Initialize slider
        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            
            // Move slider track
            const translateX = -index * 100;
            sliderTrack.style.transform = `translateX(${translateX}%)`;
            
            window.currentSlide = index;
        }
        
        // Auto-play slider
        function autoSlide() {
            const nextSlide = (window.currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        }
        
        // Start auto-play
        let autoPlayInterval = setInterval(autoSlide, 5000);
        
        // Pause auto-play on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(autoSlide, 5000);
            });
        }
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            sliderContainer.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
        }
        
        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    const nextSlide = (window.currentSlide + 1) % slides.length;
                    showSlide(nextSlide);
                } else {
                    // Swipe right - previous slide
                    const prevSlide = (window.currentSlide - 1 + slides.length) % slides.length;
                    showSlide(prevSlide);
                }
            }
        }
    }
});

// Global functions for slider controls (called from HTML)
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let newSlide;
    if (direction === 1) {
        // Next slide
        newSlide = (window.currentSlide + 1) % slides.length;
    } else {
        // Previous slide
        newSlide = (window.currentSlide - 1 + slides.length) % slides.length;
    }
    
    showSlideGlobal(newSlide);
}

function currentSlide(index) {
    showSlideGlobal(index - 1); // Convert to 0-based index
}

function showSlideGlobal(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const sliderTrack = document.getElementById('sliderTrack');
    
    if (!slides.length || !sliderTrack) return;
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    // Move slider track
    const translateX = -index * 100;
    sliderTrack.style.transform = `translateX(${translateX}%)`;
    
    window.currentSlide = index;
}