// Initialize data layer
window.dataLayer = window.dataLayer || [];

// Helper function to push events to data layer
function pushEvent(eventName, eventParams) {
    dataLayer.push({
        'event': eventName,
        ...eventParams
    });
}

// Enhanced eCommerce tracking - Product impressions
document.addEventListener('DOMContentLoaded', function() {
    // Track product impressions on page load
    const productItems = document.querySelectorAll('.product-item');
    if (productItems.length > 0) {
        const impressions = [];
        
        productItems.forEach(function(product, index) {
            const productTitle = product.querySelector('.product-title').textContent;
            const productPrice = product.querySelector('.product-price').textContent.replace('$', '');
            const productCategory = 'Snuffle Mats';
            
            impressions.push({
                'item_id': 'SM-' + (index + 1),
                'item_name': productTitle,
                'item_category': productCategory,
                'price': productPrice,
                'currency': 'USD',
                'index': index,
                'quantity': 1
            });
        });
        
        if (impressions.length > 0) {
            pushEvent('view_item_list', {
                'item_list_name': 'Product Collection',
                'items': impressions
            });
        }
    }
});

// Track product clicks with enhanced data
document.querySelectorAll('.product-item').forEach(function(product, index) {
    product.addEventListener('click', function() {
        const productTitle = this.querySelector('.product-title').textContent;
        const productPrice = this.querySelector('.product-price').textContent.replace('$', '');
        const productDescription = this.querySelector('.product-description').textContent;
        const productCategory = 'Snuffle Mats';
        
        pushEvent('select_item', {
            'item_list_name': 'Product Collection',
            'items': [{
                'item_id': 'SM-' + (index + 1),
                'item_name': productTitle,
                'item_category': productCategory,
                'price': productPrice,
                'currency': 'USD',
                'index': index,
                'quantity': 1,
                'item_description': productDescription
            }]
        });
    });
});

// Track quick action buttons on products
document.querySelectorAll('.quick-action-btn').forEach(function(button) {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering the parent product click
        
        const product = this.closest('.product-item');
        const productTitle = product.querySelector('.product-title').textContent;
        const isViewAction = this.querySelector('.fa-eye') !== null;
        const isCartAction = this.querySelector('.fa-shopping-bag') !== null;
        
        if (isViewAction) {
            pushEvent('view_item', {
                'item_name': productTitle,
                'action_type': 'quick_view'
            });
        } else if (isCartAction) {
            const productPrice = product.querySelector('.product-price').textContent.replace('$', '');
            const productIndex = Array.from(document.querySelectorAll('.product-item')).indexOf(product);
            
            pushEvent('add_to_cart', {
                'currency': 'USD',
                'value': productPrice,
                'items': [{
                    'item_id': 'SM-' + (productIndex + 1),
                    'item_name': productTitle,
                    'price': productPrice,
                    'currency': 'USD',
                    'quantity': 1
                }]
            });
        }
    });
});

// Track form submissions with improved data
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Get form fields if available
            const nameField = contactForm.querySelector('[name="name"]');
            const emailField = contactForm.querySelector('[name="email"]');
            
            pushEvent('generate_lead', {
                'form_id': 'contact-form',
                'form_type': 'contact',
                'has_name': nameField ? true : false,
                'has_email': emailField ? true : false,
                'form_length': contactForm.elements.length
            });
        });
    }
    
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            pushEvent('newsletter_signup', {
                'form_id': 'subscribe-form',
                'form_type': 'newsletter',
                'signup_location': 'footer'
            });
        });
    }
});

// Track outbound links with improved data
document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    link.addEventListener('click', function(event) {
        const href = this.getAttribute('href');
        if (!href.includes('fureveryours.com')) {
            const linkType = href.includes('facebook.com') ? 'social' : 
                           href.includes('instagram.com') ? 'social' : 
                           href.includes('twitter.com') ? 'social' : 'external';
            
            pushEvent('outbound_link_click', {
                'link_url': href,
                'link_text': this.textContent.trim() || this.getAttribute('aria-label') || 'icon link',
                'link_type': linkType,
                'link_domain': new URL(href).hostname
            });
        }
    });
});

// Track CTA button clicks with enhanced data
document.querySelectorAll('.btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        const buttonLocation = this.closest('section') ? this.closest('section').id : 'unknown';
        const isPrimary = this.classList.contains('btn-primary');
        const isSecondary = this.classList.contains('btn-secondary');
        
        pushEvent('cta_click', {
            'cta_text': buttonText,
            'cta_location': buttonLocation,
            'cta_type': isPrimary ? 'primary' : isSecondary ? 'secondary' : 'other'
        });
    });
});

// Track navigation clicks with section data
document.querySelectorAll('.nav-links a').forEach(function(navLink) {
    navLink.addEventListener('click', function() {
        const targetSection = this.getAttribute('href').replace('#', '');
        
        pushEvent('navigation_click', {
            'nav_item': this.textContent.trim(),
            'nav_section': 'header',
            'target_section': targetSection
        });
    });
});

// Track enhanced scroll depth
let scrollDepthTriggered = {
    '25': false,
    '50': false,
    '75': false,
    '90': false
};

window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    const visibleSection = getVisibleSection();
    
    if (scrollPercent >= 25 && !scrollDepthTriggered['25']) {
        pushEvent('scroll_depth', { 
            'depth': '25%',
            'visible_section': visibleSection
        });
        scrollDepthTriggered['25'] = true;
    }
    
    if (scrollPercent >= 50 && !scrollDepthTriggered['50']) {
        pushEvent('scroll_depth', { 
            'depth': '50%',
            'visible_section': visibleSection
        });
        scrollDepthTriggered['50'] = true;
    }
    
    if (scrollPercent >= 75 && !scrollDepthTriggered['75']) {
        pushEvent('scroll_depth', { 
            'depth': '75%',
            'visible_section': visibleSection
        });
        scrollDepthTriggered['75'] = true;
    }
    
    if (scrollPercent >= 90 && !scrollDepthTriggered['90']) {
        pushEvent('scroll_depth', { 
            'depth': '90%',
            'visible_section': visibleSection
        });
        scrollDepthTriggered['90'] = true;
    }
});

// Function to determine which section is currently most visible
function getVisibleSection() {
    const sections = document.querySelectorAll('section');
    let mostVisibleSection = null;
    let maxVisibleHeight = 0;
    
    sections.forEach(function(section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the section is visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        
        if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            mostVisibleSection = section.id;
        }
    });
    
    return mostVisibleSection;
}

// Track time on page with progressive intervals
let timeIntervals = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
let intervalIndex = 0;

function trackTimeOnPage() {
    if (intervalIndex < timeIntervals.length) {
        const seconds = timeIntervals[intervalIndex];
        setTimeout(function() {
            pushEvent('time_on_page', {
                'time_seconds': seconds,
                'time_readable': formatTime(seconds)
            });
            intervalIndex++;
            trackTimeOnPage();
        }, seconds * 1000 - (intervalIndex > 0 ? timeIntervals[intervalIndex-1] * 1000 : 0));
    }
}

function formatTime(seconds) {
    if (seconds < 60) return seconds + '_seconds';
    if (seconds < 3600) return Math.floor(seconds/60) + '_minutes';
    return Math.floor(seconds/3600) + '_hours';
}

trackTimeOnPage();

// Track FAQ interactions
document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
        const faqText = this.querySelector('h3').textContent;
        const isExpanding = !this.parentElement.classList.contains('active');
        
        pushEvent('faq_interaction', {
            'faq_question': faqText,
            'action': isExpanding ? 'expand' : 'collapse'
        });
    });
});

// Track cookie consent interaction
document.addEventListener('DOMContentLoaded', function() {
    const cookieAccept = document.querySelector('.cookie-accept');
    const cookieMore = document.querySelector('.cookie-more');
    
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            pushEvent('cookie_consent', {
                'action': 'accept'
            });
        });
    }
    
    if (cookieMore) {
        cookieMore.addEventListener('click', function() {
            pushEvent('cookie_consent', {
                'action': 'learn_more'
            });
        });
    }
});

// Track site performance metrics
window.addEventListener('load', function() {
    setTimeout(function() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
            const domReadyTime = timing.domComplete - timing.domLoading;
            
            pushEvent('performance_metrics', {
                'page_load_time': pageLoadTime,
                'dom_ready_time': domReadyTime,
                'connection_time': timing.responseEnd - timing.requestStart,
                'redirect_time': timing.redirectEnd - timing.redirectStart || 0,
                'dns_time': timing.domainLookupEnd - timing.domainLookupStart,
                'server_response_time': timing.responseStart - timing.requestStart
            });
        }
    }, 0);
}); 