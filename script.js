// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const slideInterval = 5000; // 5 seconds per slide
let slideshowInterval = null;
let userInteracted = false;

// Enable user interaction flag on any interaction
document.addEventListener('click', () => { userInteracted = true; }, { once: true });
document.addEventListener('touchstart', () => { userInteracted = true; }, { once: true });
document.addEventListener('scroll', () => { userInteracted = true; }, { once: true });

// Preload all videos on page load
function preloadVideos() {
    slides.forEach((slide, index) => {
        const video = slide.querySelector('video');
        if (video) {
            console.log('Preloading video for slide', index);
            video.muted = true; // Ensure muted for autoplay
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('muted', '');
            video.defaultMuted = true;
            video.volume = 0;
            
            // Set video source explicitly
            const source = video.querySelector('source');
            if (source && source.src) {
                video.src = source.src;
            }
            
            video.load(); // Force load the video
            
            // Add event listeners for debugging
            video.addEventListener('loadeddata', () => {
                console.log('Video data loaded for slide', index);
            });
            
            video.addEventListener('canplay', () => {
                console.log('Video can play for slide', index);
            });
            
            video.addEventListener('canplaythrough', () => {
                console.log('Video can play through for slide', index);
            });
            
            video.addEventListener('playing', () => {
                console.log('Video is actually playing for slide', index);
            });
            
            video.addEventListener('pause', () => {
                console.log('Video paused for slide', index);
            });
            
            video.addEventListener('stalled', () => {
                console.warn('Video stalled for slide', index);
            });
            
            video.addEventListener('error', (e) => {
                console.error('Video error for slide', index, ':', e);
                console.error('Video src:', video.src);
                console.error('Video readyState:', video.readyState);
            });
        }
    });
}

function forcePlayVideo(video, index, retryCount = 0) {
    if (!video || retryCount > 5) {
        console.error('Failed to play video after', retryCount, 'attempts');
        return;
    }
    
    // Ensure video is ready
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.currentTime = 0;
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('✓ Video playing successfully for slide', index);
        }).catch(error => {
            console.error('✗ Video play failed (attempt ' + (retryCount + 1) + ') for slide', index, ':', error.message);
            
            // Different retry strategies
            if (retryCount < 2) {
                // First retry: just try again
                setTimeout(() => {
                    forcePlayVideo(video, index, retryCount + 1);
                }, 100);
            } else if (retryCount < 4) {
                // Second retry: reload first
                setTimeout(() => {
                    video.load();
                    setTimeout(() => {
                        forcePlayVideo(video, index, retryCount + 1);
                    }, 200);
                }, 100);
            } else {
                // Final retry: wait for user interaction
                if (!userInteracted) {
                    console.warn('Waiting for user interaction to play video');
                    const tryAfterInteraction = () => {
                        if (userInteracted) {
                            forcePlayVideo(video, index, retryCount + 1);
                        }
                    };
                    setTimeout(tryAfterInteraction, 500);
                } else {
                    setTimeout(() => {
                        forcePlayVideo(video, index, retryCount + 1);
                    }, 300);
                }
            }
        });
    }
}

function showSlide(index) {
    console.log('\n=== Showing slide:', index, 'of', slides.length, '===');
    
    // First, hide all slides and pause only non-active videos
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.zIndex = '0';
        
        // Only pause videos that are NOT in the slide we're about to show
        if (i !== index) {
            const video = slide.querySelector('video');
            if (video) {
                try {
                    video.pause();
                } catch (e) {
                    console.error('Error pausing video', i, ':', e);
                }
            }
        }
    });
    
    // Then activate the current slide
    const currentSlideElement = slides[index];
    currentSlideElement.classList.add('active');
    currentSlideElement.style.zIndex = '1';
    
    // Check if this slide has a video
    const video = currentSlideElement.querySelector('video');
    if (video) {
        console.log('Attempting to play video for slide', index);
        
        // Multiple attempts to ensure video plays
        setTimeout(() => {
            forcePlayVideo(video, index);
        }, 50);
        
        // Additional backup attempt
        setTimeout(() => {
            if (video.paused) {
                console.warn('Video still paused after 300ms, trying again');
                forcePlayVideo(video, index);
            }
        }, 300);
        
        // Final check
        setTimeout(() => {
            if (video.paused) {
                console.error('⚠ Video failed to play for slide', index, 'after multiple attempts');
            } else {
                console.log('✓ Video confirmed playing for slide', index);
            }
        }, 1000);
    } else {
        console.log('Slide', index, 'is an image (no video)');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    console.log('Moving to slide:', currentSlide);
    showSlide(currentSlide);
}

// Start the slideshow
if (slides.length > 0) {
    console.log('Starting slideshow with', slides.length, 'slides');
    console.log('Browser:', navigator.userAgent);
    
    // Preload all videos first
    preloadVideos();
    
    // Wait for videos to start loading, then show first slide
    setTimeout(() => {
        showSlide(currentSlide);
        // Automatically advance every 5 seconds
        slideshowInterval = setInterval(nextSlide, slideInterval);
    }, 1000);
} else {
    console.log('No slides found for slideshow');
}

// Smooth Scrolling & Navigation
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Handler - Netlify Forms handles the submission automatically
const bookingForm = document.querySelector('.booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        // FormSubmit will handle the form submission
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.service-card, .testimonial-card, .feature-item, .stat-item, .gallery-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const countUp = (counter) => {
    const target = counter.innerText;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
    
    let count = 0;
    const increment = numericTarget / speed;
    
    const updateCount = () => {
        count += increment;
        if (count < numericTarget) {
            counter.innerText = Math.ceil(count) + (isPercentage ? '%' : isPlus ? '+' : '');
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCount();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const counter = entry.target.querySelector('.stat-number');
            if (counter) {
                countUp(counter);
                entry.target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            }
        });
        
        // Re-apply load more logic after filter
        setTimeout(() => {
            applyLoadMoreLogic();
        }, 10);
    });
});

// Gallery Load More Functionality
const loadMoreBtn = document.querySelector('.load-more-btn');
const itemsToShow = 12; // Show 12 items initially

function applyLoadMoreLogic() {
    const visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
    
    // Remove all hidden-initially classes first
    galleryItems.forEach(item => item.classList.remove('hidden-initially'));
    
    // Hide items beyond initial count
    visibleItems.forEach((item, index) => {
        if (index >= itemsToShow) {
            item.classList.add('hidden-initially');
        }
    });
    
    // Show/hide load more button
    if (visibleItems.length > itemsToShow) {
        loadMoreBtn?.classList.remove('hidden');
    } else {
        loadMoreBtn?.classList.add('hidden');
    }
}

// Show more items when button is clicked
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const hiddenItems = document.querySelectorAll('.gallery-item.hidden-initially');
        const itemsToReveal = Array.from(hiddenItems).slice(0, 9); // Show 9 more at a time
        
        itemsToReveal.forEach(item => {
            item.classList.remove('hidden-initially');
        });
        
        // Hide button if no more hidden items
        const remainingHidden = document.querySelectorAll('.gallery-item.hidden-initially:not(.hide)');
        if (remainingHidden.length === 0) {
            loadMoreBtn.classList.add('hidden');
        }
    });
}

// Initialize on page load
applyLoadMoreLogic();

// Video error handling for better debugging
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('error', (e) => {
        console.error('Video failed to load:', video.querySelector('source')?.src);
        console.error('Error details:', e);
    });
    
    video.addEventListener('loadedmetadata', () => {
        console.log('Video loaded successfully:', video.querySelector('source')?.src);
    });
});

// Booking Form - Send via Email
function sendEmail(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Build email body
    const subject = `Booking Request - ${name}`;
    const body = `
BOOKING REQUEST
===============

Name: ${name}
Email: ${email}
Phone: ${phone}
Date: ${date}
Time: ${time}
Service: ${service}

Special Requests:
${message || 'None'}

---
Sent from Dazzling Angels Day Spa website
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:bookings@dazzlingangelsspa.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    return false;
}

console.log('Dazzling Angels Day Spa website loaded successfully!');
