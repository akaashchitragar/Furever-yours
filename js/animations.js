// Hero Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on page load
    const animateElements = document.querySelectorAll('.fade-in');
    
    animateElements.forEach(element => {
        element.classList.add('active');
    });
    
    // Floating paw animation enhancement
    const floatingPaw = document.querySelector('.floating-paw');
    
    if (floatingPaw) {
        // Add random slight position variations to make animation more natural
        setInterval(() => {
            const randomX = Math.random() * 10 - 5; // Random value between -5 and 5
            const randomRotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees
            
            floatingPaw.style.transform = `translateX(${randomX}px) rotate(${randomRotation}deg)`;
            
            // Reset after a short delay
            setTimeout(() => {
                floatingPaw.style.transform = '';
            }, 500);
        }, 3000);
        
        // Add click interaction for the paw
        floatingPaw.addEventListener('click', function() {
            this.style.transform = 'scale(1.3) rotate(15deg)';
            
            // Bounce effect
            setTimeout(() => {
                this.style.transform = 'scale(0.8) rotate(-10deg)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }, 200);
            
            // Scroll to products section
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Parallax effect for background shapes
    window.addEventListener('mousemove', function(e) {
        const shapes = document.querySelectorAll('.shape');
        
        // Get mouse position relative to the viewport
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move shapes slightly based on mouse position
        shapes.forEach(shape => {
            const shiftX = (mouseX - 0.5) * 20; // max 10px shift
            const shiftY = (mouseY - 0.5) * 20; // max 10px shift
            
            shape.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
        });
        
        // Move the floating paw for an interactive effect
        if (floatingPaw) {
            const pawShiftX = (mouseX - 0.5) * 15;
            const pawShiftY = (mouseY - 0.5) * 15;
            floatingPaw.style.transform = `translate(${pawShiftX}px, ${pawShiftY}px)`;
        }
    });
    
    // Add scroll animation for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroScroll = document.querySelector('.hero-scroll');
        
        if (scrollPosition > 50) {
            heroScroll.style.opacity = '0';
            heroScroll.style.visibility = 'hidden';
        } else {
            heroScroll.style.opacity = '1';
            heroScroll.style.visibility = 'visible';
        }
    });
    
    // Add click event for the scroll down button
    const scrollDownBtn = document.querySelector('.hero-scroll a');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Add a class to the product card when user scrolls to it
    const productCards = document.querySelectorAll('.product-card');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function handleScroll() {
        productCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('in-viewport');
            }
        });
    }
    
    // Initial check and add scroll listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);
});

// Furever Yours - Product Section Animations

document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for product section background
    const productsSection = document.querySelector('.products');
    
    if (productsSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const sectionTop = productsSection.offsetTop;
            const scrollOffset = scrollPosition - sectionTop;
            
            if (scrollOffset > -500 && scrollOffset < 500) {
                const productsBg = document.querySelector('.products-bg');
                if (productsBg) {
                    productsBg.style.transform = `translateY(${scrollOffset * 0.05}px)`;
                }
            }
        });
    }
    
    // Staggered reveal animation for product items
    const productItems = document.querySelectorAll('.product-item');
    
    if (productItems.length) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const productObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation with delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                    }, index * 150);
                    
                    // Stop observing after animation
                    productObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Start observing product items
        productItems.forEach(item => {
            item.classList.add('product-animate');
            productObserver.observe(item);
        });
    }
    
    // Animate benefits on scroll
    const benefitsList = document.querySelectorAll('.benefits-list li');
    
    if (benefitsList.length) {
        const benefitsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation with delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('benefit-in-view');
                    }, index * 200);
                    
                    // Stop observing after animation
                    benefitsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        // Start observing benefit items
        benefitsList.forEach(item => {
            item.classList.add('benefit-animate');
            benefitsObserver.observe(item);
        });
    }
    
    // Product image hover zoom effect
    const productImages = document.querySelectorAll('.product-image');
    
    if (productImages.length) {
        productImages.forEach(image => {
            const parent = image.closest('.product-item');
            
            parent.addEventListener('mouseenter', () => {
                // Ensure image animation works regardless of card animation
                image.style.transform = 'scale(1.08)';
                image.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                // Ensure image stays above card with z-index
                image.style.position = 'relative';
                image.style.zIndex = '2';
            });
            
            parent.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
                // Reset z-index after hover
                setTimeout(() => {
                    image.style.zIndex = '';
                }, 300);
            });
        });
    }
    
    // Animated benefits icon
    const benefitIcons = document.querySelectorAll('.benefit-icon');
    
    if (benefitIcons.length) {
        benefitIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    iconElement.style.transform = 'scale(1.2)';
                    iconElement.style.transition = 'transform 0.3s ease';
                }
            });
            
            icon.addEventListener('mouseleave', () => {
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    iconElement.style.transform = 'scale(1)';
                }
            });
        });
    }
});

// Furever Yours - Bento Grid Animations for About Section
document.addEventListener('DOMContentLoaded', function() {
    // Staggered reveal animation for bento tiles
    const bentoTiles = document.querySelectorAll('.bento-tile');
    
    if (bentoTiles.length) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const bentoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation with delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('bento-tile-reveal');
                    }, index * 100);
                    
                    // Stop observing after animation
                    bentoObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Start observing bento tiles
        bentoTiles.forEach(tile => {
            tile.classList.add('bento-tile-animate');
            bentoObserver.observe(tile);
        });
    }
    
    // Interactive hover effects for bento tiles
    bentoTiles.forEach(tile => {
        // Subtle parallax effect on mouse move
        tile.addEventListener('mousemove', function(e) {
            if (!tile.classList.contains('founder-tile')) { // Skip for founder tile (has image)
                const rect = tile.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element
                
                // Calculate percentage position
                const xPercent = x / rect.width;
                const yPercent = y / rect.height;
                
                // Calculate the tilt effect (max 5deg)
                const tiltX = (0.5 - yPercent) * 5;
                const tiltY = (xPercent - 0.5) * 5;
                
                // Apply the transform
                tile.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Subtle shadow change
                tile.style.boxShadow = `0 ${10 + Math.abs(tiltX)}px ${20 + Math.abs(tiltY)}px rgba(0,0,0,0.1)`;
            }
        });
        
        // Reset on mouse leave
        tile.addEventListener('mouseleave', function() {
            tile.style.transform = '';
            tile.style.boxShadow = '';
        });
    });
    
    // Special animation for icon tiles
    const tileIcons = document.querySelectorAll('.tile-icon');
    
    if (tileIcons.length) {
        tileIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    iconElement.style.transform = 'scale(1.2) rotate(5deg)';
                    iconElement.style.transition = 'transform 0.3s ease';
                }
            });
            
            icon.addEventListener('mouseleave', () => {
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    iconElement.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
});

// Furever Yours - How It Works Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced hover effects for steps
    const steps = document.querySelectorAll('.step');
    
    if (steps.length) {
        steps.forEach((step, index) => {
            // Add staggered animation on scroll
            step.style.transitionDelay = `${index * 0.1}s`;
            
            // Add mouse move effect for each step card
            step.addEventListener('mousemove', function(e) {
                const rect = step.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element
                
                // Calculate percentage position
                const xPercent = x / rect.width;
                const yPercent = y / rect.height;
                
                // Calculate the subtle tilt effect (max 3deg)
                const tiltX = (0.5 - yPercent) * 3;
                const tiltY = (xPercent - 0.5) * 3;
                
                // Apply subtle transform
                step.style.transform = `translateY(-5px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
            
            // Reset on mouse leave
            step.addEventListener('mouseleave', function() {
                step.style.transform = '';
                
                // Add a subtle bounce effect when mouse leaves
                setTimeout(() => {
                    step.style.transform = 'translateY(-8px)';
                    
                    setTimeout(() => {
                        step.style.transform = 'translateY(-10px) scale(1.02)';
                    }, 150);
                }, 100);
            });
            
            // Add interactive effect to step numbers
            const stepNumber = step.querySelector('.step-number');
            if (stepNumber) {
                step.addEventListener('mouseenter', () => {
                    stepNumber.style.transform = 'scale(1.15)';
                    stepNumber.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    
                    // Add slight rotation to step number
                    stepNumber.style.transform = 'scale(1.15) rotate(10deg)';
                    
                    setTimeout(() => {
                        stepNumber.style.transform = 'scale(1.15) rotate(0deg)';
                    }, 200);
                });
                
                step.addEventListener('mouseleave', () => {
                    stepNumber.style.transform = 'none';
                });
            }
        });
    }
    
    // Animate connectors on scroll
    const stepConnectors = document.querySelectorAll('.step-connector');
    if (stepConnectors.length) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const connectorObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.overflow = 'hidden';
                    
                    const connector = entry.target.querySelector('::before');
                    if (connector) {
                        connector.style.animation = 'connectorGrow 1.5s ease forwards';
                    } else {
                        // If we can't select the pseudo-element directly, add a class
                        entry.target.classList.add('connector-animated');
                    }
                    
                    // Stop observing after animation
                    connectorObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Start observing connectors
        stepConnectors.forEach(connector => {
            connectorObserver.observe(connector);
        });
    }
}); 