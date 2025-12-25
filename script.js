// Hero Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const slideInterval = 5000; // 5 seconds per slide

function showSlide(index) {
    console.log('Showing slide:', index, 'of', slides.length);
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            
            // Check if this slide has a video
            const video = slide.querySelector('video');
            if (video) {
                // Reset video to start
                video.currentTime = 0;
                // Try to play the video
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Video playing successfully');
                    }).catch(error => {
                        console.log('Video autoplay prevented:', error);
                        // If autoplay fails, just continue with the slideshow
                    });
                }
            }
        } else {
            // Pause videos on inactive slides
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    console.log('Moving to slide:', currentSlide);
    showSlide(currentSlide);
}

// Start the slideshow
if (slides.length > 0) {
    console.log('Starting slideshow with', slides.length, 'slides');
    showSlide(currentSlide);
    // Automatically advance every 5 seconds
    setInterval(nextSlide, slideInterval);
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

console.log('Dazzling Angels Day Spa website loaded successfully!');
