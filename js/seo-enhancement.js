/**
 * SEO Enhancement Script for Furever Yours
 * Improves accessibility, SEO, and user experience
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize data layer if not already present
    window.dataLayer = window.dataLayer || [];
    
    // Fix missing alt attributes on images
    fixMissingImageAlt();
    
    // Add title attributes to links without them
    enhanceLinks();
    
    // Implement lazy loading for images
    implementLazyLoading();
    
    // Fix heading hierarchy
    fixHeadingHierarchy();
    
    // Add schema markup to review elements
    enhanceReviewElements();
    
    // Track page engagement
    trackPageEngagement();
    
    // Implement focus visibility for accessibility
    enhanceFocusVisibility();
    
    // Send GA4 page view event with enhanced data
    sendEnhancedPageViewEvent();
});

/**
 * Fix missing alt attributes on images
 */
function fixMissingImageAlt() {
    const images = document.querySelectorAll('img:not([alt])');
    
    images.forEach(function(img) {
        // Generate alt text based on image filename or nearby text
        let altText = '';
        const src = img.getAttribute('src');
        
        if (src) {
            // Extract filename without extension
            const filename = src.split('/').pop().split('.')[0];
            // Convert kebab-case or snake_case to readable text
            altText = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
        
        // Look for nearby headings or paragraphs if filename is not descriptive enough
        if (altText.length < 5) {
            const parent = img.parentElement;
            const nearbyHeading = parent.querySelector('h1, h2, h3, h4, h5, h6');
            const nearbyParagraph = parent.querySelector('p');
            
            if (nearbyHeading) {
                altText = nearbyHeading.textContent.trim();
            } else if (nearbyParagraph) {
                altText = nearbyParagraph.textContent.trim().substring(0, 100);
            } else {
                altText = 'Furever Yours pet product image';
            }
        }
        
        img.setAttribute('alt', altText);
        
        // Log to data layer for tracking
        window.dataLayer.push({
            'event': 'accessibility_improvement',
            'category': 'image_alt',
            'action': 'fix_missing_alt',
            'label': src
        });
    });
    
    console.log('Fixed alt attributes for ' + images.length + ' images');
}

/**
 * Enhance links for better SEO and accessibility
 */
function enhanceLinks() {
    const links = document.querySelectorAll('a');
    
    links.forEach(function(link) {
        // Skip links that already have a title
        if (link.hasAttribute('title')) {
            return;
        }
        
        // Add title attribute based on link text or URL
        const linkText = link.textContent.trim();
        if (linkText && linkText.length > 1 && linkText !== '→' && !linkText.startsWith('http')) {
            link.setAttribute('title', linkText);
        } else {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                const domain = href.split('/')[2] || '';
                link.setAttribute('title', 'Visit ' + domain);
            }
        }
        
        // Add rel="noopener" and rel="noreferrer" to external links
        if (link.hostname && link.hostname !== window.location.hostname) {
            const relAttr = link.getAttribute('rel') || '';
            if (!relAttr.includes('noopener')) {
                link.setAttribute('rel', (relAttr + ' noopener noreferrer').trim());
            }
        }
        
        // Fix empty links
        if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
            link.setAttribute('role', 'button');
            link.setAttribute('tabindex', '0');
            
            // Add keyboard accessibility
            link.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    link.click();
                }
            });
        }
    });
}

/**
 * Implement lazy loading for images
 */
function implementLazyLoading() {
    // Skip if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
        return;
    }
    
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img:not([loading])');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    
                    // Load the image if it has a data-src attribute
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                        delete image.dataset.src;
                    }
                    
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            if (!image.hasAttribute('loading')) {
                // Store original src in data-src attribute and set a placeholder
                if (image.src && !image.dataset.src) {
                    image.dataset.src = image.src;
                    image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                }
                
                // Observe the image
                imageObserver.observe(image);
            }
        });
    }
}

/**
 * Fix heading hierarchy for better SEO
 */
function fixHeadingHierarchy() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    let hasPrimaryH1 = false;
    
    headings.forEach(function(heading) {
        const level = parseInt(heading.tagName.substring(1));
        
        // Check if this is an H1
        if (level === 1) {
            if (!hasPrimaryH1) {
                hasPrimaryH1 = true;
            } else {
                // Convert additional H1s to H2s
                const newHeading = document.createElement('h2');
                Array.from(heading.attributes).forEach(attr => {
                    newHeading.setAttribute(attr.name, attr.value);
                });
                newHeading.innerHTML = heading.innerHTML;
                heading.parentNode.replaceChild(newHeading, heading);
                
                // Log to data layer
                window.dataLayer.push({
                    'event': 'accessibility_improvement',
                    'category': 'heading_hierarchy',
                    'action': 'convert_h1_to_h2',
                    'label': heading.textContent.trim()
                });
            }
        }
        
        // Check for skipped heading levels
        if (level > lastLevel + 1 && level > 2) {
            const newLevel = lastLevel + 1;
            const newHeading = document.createElement('h' + newLevel);
            Array.from(heading.attributes).forEach(attr => {
                newHeading.setAttribute(attr.name, attr.value);
            });
            newHeading.innerHTML = heading.innerHTML;
            heading.parentNode.replaceChild(newHeading, heading);
            
            // Log to data layer
            window.dataLayer.push({
                'event': 'accessibility_improvement',
                'category': 'heading_hierarchy',
                'action': 'fix_skipped_level',
                'label': `h${level} to h${newLevel}: ${heading.textContent.trim()}`
            });
        }
        
        lastLevel = level;
    });
}

/**
 * Enhance review elements with structured data
 */
function enhanceReviewElements() {
    const reviewElements = document.querySelectorAll('.hero-testimonial, .product-rating');
    
    reviewElements.forEach(function(element) {
        // Skip if already enhanced
        if (element.hasAttribute('itemscope')) {
            return;
        }
        
        // Add structured data attributes
        element.setAttribute('itemscope', '');
        element.setAttribute('itemtype', 'https://schema.org/Review');
        
        // Find and enhance reviewer
        const reviewerElement = element.querySelector('.testimonial-author');
        if (reviewerElement) {
            reviewerElement.setAttribute('itemprop', 'author');
            reviewerElement.setAttribute('itemscope', '');
            reviewerElement.setAttribute('itemtype', 'https://schema.org/Person');
            
            // Extract name from format "- Name"
            const reviewerName = reviewerElement.textContent.trim().replace(/^-\s*/, '');
            
            // Create or update the name property
            let nameElement = reviewerElement.querySelector('[itemprop="name"]');
            if (!nameElement) {
                nameElement = document.createElement('span');
                nameElement.setAttribute('itemprop', 'name');
                nameElement.textContent = reviewerName;
                reviewerElement.textContent = '- ';
                reviewerElement.appendChild(nameElement);
            }
        }
        
        // Find and enhance review text
        const reviewTextElement = element.querySelector('p');
        if (reviewTextElement && !reviewTextElement.hasAttribute('itemprop')) {
            reviewTextElement.setAttribute('itemprop', 'reviewBody');
        }
        
        // Find and enhance rating
        const stars = element.querySelectorAll('.fa-star, .fa-star-half-alt');
        if (stars.length > 0) {
            const rating = stars.length - (element.querySelectorAll('.fa-star-half-alt').length * 0.5);
            
            // Create rating element if not exists
            let ratingElement = element.querySelector('[itemprop="ratingValue"]');
            if (!ratingElement) {
                ratingElement = document.createElement('meta');
                ratingElement.setAttribute('itemprop', 'ratingValue');
                ratingElement.setAttribute('content', rating.toString());
                element.appendChild(ratingElement);
            }
        }
    });
}

/**
 * Track page engagement for analytics
 */
function trackPageEngagement() {
    // Track scroll depth
    let maxScrollDepth = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);
        
        if (scrollPercentage > maxScrollDepth) {
            maxScrollDepth = scrollPercentage;
        }
    });
    
    // Track time spent on page
    const startTime = new Date().getTime();
    let timeSpent = 0;
    
    // Update time spent every second
    const timeTracker = setInterval(function() {
        timeSpent = Math.floor((new Date().getTime() - startTime) / 1000);
    }, 1000);
    
    // Send engagement data when user leaves page
    window.addEventListener('beforeunload', function() {
        clearInterval(timeTracker);
        
        // Send final engagement data
        window.dataLayer.push({
            'event': 'page_engagement',
            'max_scroll_depth': maxScrollDepth,
            'time_spent_seconds': timeSpent
        });
    });
}

/**
 * Enhance focus visibility for accessibility
 */
function enhanceFocusVisibility() {
    // Add focus styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        *:focus-visible {
            outline: 3px solid #2196F3 !important;
            outline-offset: 2px !important;
        }
        
        .skip-to-content {
            position: absolute;
            top: -40px;
            left: 0;
            background: #2196F3;
            color: white;
            padding: 8px;
            z-index: 100;
            transition: top 0.3s;
        }
        
        .skip-to-content:focus {
            top: 0;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add roles to improve screen reader experience
    document.querySelectorAll('header').forEach(el => el.setAttribute('role', 'banner'));
    document.querySelectorAll('footer').forEach(el => el.setAttribute('role', 'contentinfo'));
    document.querySelectorAll('nav').forEach(el => el.setAttribute('role', 'navigation'));
    document.querySelectorAll('.hamburger').forEach(el => {
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', 'Toggle navigation menu');
        el.setAttribute('tabindex', '0');
    });
}

/**
 * Send enhanced page view event to GA4
 */
function sendEnhancedPageViewEvent() {
    // Extract structured data for rich GA4 events
    const pageData = {
        'page_title': document.title,
        'page_location': window.location.href,
        'page_path': window.location.pathname
    };
    
    // Add custom dimensions based on page content
    const sections = Array.from(document.querySelectorAll('section[id]')).map(s => s.id);
    const hasProducts = document.getElementById('products') !== null;
    const hasFAQ = document.getElementById('faq') !== null;
    
    // Push enhanced page view event to data layer
    window.dataLayer.push({
        'event': 'enhanced_page_view',
        ...pageData,
        'page_sections': sections.join(','),
        'has_products': hasProducts,
        'has_faq': hasFAQ,
        'page_language': document.documentElement.lang,
        'device_type': getDeviceType(),
        'viewport_width': window.innerWidth,
        'viewport_height': window.innerHeight
    });
}

/**
 * Get device type based on screen width
 */
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 576) return 'mobile';
    if (width < 992) return 'tablet';
    return 'desktop';
} 