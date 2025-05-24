// Furever Yours - Landing Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
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
    }
    
    // Initialize scroll animations
    if (fadeElements.length > 0 || slideElements.length > 0) {
        window.addEventListener('scroll', handleScrollAnimations);
        handleScrollAnimations(); // Check on page load
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
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
                    itemAnswer.style.maxHeight = null;
                    itemIcon.classList.remove('fa-minus');
                    itemIcon.classList.add('fa-plus');
                });
                
                // Toggle the active state for the clicked item
                if (isActive) {
                    // Close this FAQ
                    parent.classList.remove('active');
                    question.classList.remove('active');
                    answer.style.maxHeight = null;
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                } else {
                    // Open this FAQ
                    parent.classList.add('active');
                    question.classList.add('active');
                    answer.style.maxHeight = answerContent.offsetHeight + 'px';
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            });
        });
    }

    // Scroll Reveal Animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(item => {
            const windowHeight = window.innerHeight;
            const elementTop = item.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // Header scroll effect
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
            // Improved hover transition
            item.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transition = 'transform 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000), box-shadow 0.5s ease';
            });
            
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
}); 