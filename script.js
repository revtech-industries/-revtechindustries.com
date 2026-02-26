// REVTECH INDUSTRIES Company Website

document.addEventListener('DOMContentLoaded', function() {
    // Force body to be visible immediately
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    console.log('Website loading - body made visible');

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position (passive = smoother mobile scroll)
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, { passive: true });
    
    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar: Halo style — slightly brighter on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
    
    // Intersection Observer for existing .animate class (skill-category etc.)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate');
        });
    }, observerOptions);
    document.querySelectorAll('.project-card, .skill-category, .version-card-blueprint').forEach(el => observer.observe(el));

    // Section reveal — fade upward on enter viewport
    const revealSectionOptions = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' };
    const revealSectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, revealSectionOptions);
    document.querySelectorAll('.reveal-section').forEach(el => revealSectionObserver.observe(el));

    // Card reveal — scale 0.96 → 1 on enter viewport
    const revealCardOptions = { threshold: 0.12, rootMargin: '0px 0px -30px 0px' };
    const revealCardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, revealCardOptions);
    document.querySelectorAll('.reveal-card').forEach(el => revealCardObserver.observe(el));

    // Halo rings — rotate on scroll (desktop only; on mobile this causes scroll jank from DOM writes)
    const haloRings = document.querySelectorAll('.halo-ring');
    if (haloRings.length) {
        var haloScroll = function() {
            if (window.innerWidth <= 768) return;
            var deg = Math.min(window.scrollY * 0.06, 2);
            haloRings.forEach(function(el) { el.style.transform = 'rotate(' + deg + 'deg)'; });
        };
        window.addEventListener('scroll', haloScroll, { passive: true });
        haloScroll();
    }
    
    // Gallery image lazy loading (blueprint, version cards, screenshots)
    const galleryImages = document.querySelectorAll('.version-image-container img, .blueprint-container img, .screenshots-grid img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                img.onload = function() { img.style.opacity = '1'; };
                if (img.complete) img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    galleryImages.forEach(img => imageObserver.observe(img));
    
    // Website loaded successfully - no loading screen needed
    
    // Contact form validation (if you add a form later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Section and card reveal use .reveal-section / .reveal-card + .is-visible (see observers above)
    
    // Click effect for gallery version cards
    document.querySelectorAll('.version-card-blueprint').forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-link.active {
            color: var(--primary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Your scroll handling code here
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    
    // Add loading states for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            // Add a subtle loading indicator
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Add focus management for accessibility
    document.querySelectorAll('.nav-link, .btn, .document-card').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Video functionality
    const video = document.getElementById('introVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const playButton = document.getElementById('playButton');
    
    if (video && videoOverlay && playButton) {
        // Play video when overlay is clicked
        videoOverlay.addEventListener('click', function() {
            video.play();
            videoOverlay.classList.add('hidden');
        });
        
        // Show overlay when video is paused
        video.addEventListener('pause', function() {
            videoOverlay.classList.remove('hidden');
        });
        
        // Show overlay when video ends
        video.addEventListener('ended', function() {
            videoOverlay.classList.remove('hidden');
        });
        
        // Hide overlay when video starts playing
        video.addEventListener('play', function() {
            videoOverlay.classList.add('hidden');
        });
    }
    
    // Performance optimizations
    const optimizePerformance = () => {
        // Lazy load images
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = function() {
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Preload critical resources
        const preloadResources = () => {
            const criticalImages = [
                'images/artemis_logo.jpg',
                'images/micro_computer_assembly.jpg'
            ];
            
            criticalImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            });
        };
        
        preloadResources();
        
        // Debounce scroll events for better performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Scroll handling code here
            }, 10);
        }, { passive: true });
    };
    
    optimizePerformance();
    
    // Enhanced Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showFormMessage('Please fix the errors above before submitting.', 'error');
                return;
            }
            
            const formData = new FormData(contactForm);
            
            // Show loading state
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Use WordPress AJAX if available, otherwise fallback to mailto
            if (typeof revtechData !== 'undefined' && revtechData.ajaxUrl) {
                // WordPress AJAX submission
                fetch(revtechData.ajaxUrl, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        button.textContent = 'Message Sent!';
                        button.style.background = 'var(--accent-color)';
                        showFormMessage(data.data.message || 'Thank you! Your message has been sent.', 'success');
                        contactForm.reset();
                        setTimeout(() => {
                            button.textContent = originalText;
                            button.disabled = false;
                            button.style.background = '';
                            clearFormMessage();
                        }, 5000);
                    } else {
                        throw new Error(data.data.message || 'Failed to send message');
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    button.textContent = originalText;
                    button.disabled = false;
                    // Fallback to mailto
                    const data = Object.fromEntries(formData);
                    const emailBody = `New Partnership Inquiry from REVTECH INDUSTRIES Website:\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'Not provided'}\nInquiry Type: ${data.inquiry}\n\nMessage:\n${data.message}\n\n---\nSent from REVTECH INDUSTRIES Company Website`;
                    const mailtoLink = `mailto:warnecke.james@outlook.com?subject=REVTECH INDUSTRIES Partnership Inquiry - ${data.inquiry}&body=${encodeURIComponent(emailBody)}`;
                    window.location.href = mailtoLink;
                    showFormMessage('AJAX failed. Opening email client as fallback. If it doesn\'t open, please email us directly.', 'error');
                });
            } else {
                // Fallback to mailto for non-WordPress environments
                const data = Object.fromEntries(formData);
                const emailBody = `New Partnership Inquiry from REVTECH INDUSTRIES Website:\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'Not provided'}\nInquiry Type: ${data.inquiry}\n\nMessage:\n${data.message}\n\n---\nSent from REVTECH INDUSTRIES Company Website`;
                const mailtoLink = `mailto:warnecke.james@outlook.com?subject=REVTECH INDUSTRIES Partnership Inquiry - ${data.inquiry}&body=${encodeURIComponent(emailBody)}`;
                window.location.href = mailtoLink;
                button.textContent = 'Email Client Opened!';
                button.style.background = 'var(--accent-color)';
                showFormMessage('Your email client should open with a pre-filled message. If it doesn\'t open, please email us directly at warnecke.james@outlook.com', 'success');
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    contactForm.reset();
                    clearFormMessage();
                }, 5000);
            }
        });
    }
    
    // Form validation functions
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        clearFieldError(field);
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#ff6b35';
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    function clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function showFormMessage(message, type) {
        let messageElement = document.querySelector('.form-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }
        
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        
        // Scroll to message
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function clearFormMessage() {
        const messageElement = document.querySelector('.form-message');
        if (messageElement) {
            messageElement.style.display = 'none';
        }
    }

    // Closed beta request form — send request to warnecke.james@outlook.com via mailto
    const betaRequestForm = document.getElementById('betaRequestForm');
    const betaFormMessage = document.getElementById('betaFormMessage');
    if (betaRequestForm && betaFormMessage) {
        betaRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = (document.getElementById('beta-name') && document.getElementById('beta-name').value) || '';
            var email = (document.getElementById('beta-email') && document.getElementById('beta-email').value) || '';
            var platform = (document.getElementById('beta-platform') && document.getElementById('beta-platform').value) || '';
            var subject = encodeURIComponent('Artemis AI – Closed beta access request');
            var body = encodeURIComponent('New beta signup:\n\nName: ' + name + '\nEmail: ' + email + '\nPlatform interest: ' + (platform || 'Not specified') + '\n\nPlease add this person to the beta and send them the download link.');
            var mailto = 'mailto:warnecke.james@outlook.com?subject=' + subject + '&body=' + body;
            betaFormMessage.style.display = 'block';
            betaFormMessage.className = 'form-message';
            betaFormMessage.textContent = 'Opening your email client to send the request. Send the email to complete your request.';
            window.location.href = mailto;
        });
    }
    
    // Loading screen removed - website loads immediately
    
    console.log('REVTECH INDUSTRIES website loaded successfully! 🚀');
});
