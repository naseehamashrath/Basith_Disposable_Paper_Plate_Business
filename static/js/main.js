/**
 * Basith Paper Plates - Main Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // 0. Apply Background Images (Fix for Linter)
    document.querySelectorAll('[data-bg]').forEach(el => {
        el.style.backgroundImage = `url('${el.dataset.bg}')`;
    });

    // 1. Scroll Animations (IntersectionObserver)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // 2. Form Handling
    const form = document.getElementById('enquiryForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            try {
                // Collect products with quantities
                let products = [];
                const dropdown = document.getElementById('product_interest');
                if (dropdown && dropdown.value !== 'General Enquiry') {
                    products.push(dropdown.value);
                }

                document.querySelectorAll('.qty-item').forEach(item => {
                    const nameSpan = item.querySelector('span');
                    const qtyInput = item.querySelector('input');
                    if (nameSpan && qtyInput && qtyInput.value && parseInt(qtyInput.value) > 0) {
                        products.push(`${nameSpan.innerText} (${qtyInput.value})`);
                    }
                });

                const productInterest = products.length > 0 ? products.join(", ") : "General Enquiry";

                const formData = {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    product_interest: productInterest,
                    message: document.getElementById('message').value
                };

                const response = await fetch('/api/enquire', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Thank you! Your enquiry has been sent successfully.");
                    form.reset();
                } else {
                    alert("Error: " + (result.error || "Something went wrong"));
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert("Network error. Please try again.");
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 3. Page View Analytics (Simple)
    trackPageView();
});

/**
 * Switch Hero Image
 */
function changeHeroImage(filename, thumbElement) {
    const mainImg = document.getElementById('heroMainImage');
    const path = `static/assets/${filename}`; // Simulating URL construction

    // Fade out
    mainImg.style.opacity = 0;

    setTimeout(() => {
        mainImg.src = path; // In a real Flask template this might tricky in JS but path works if relative
        // Actually, we should grab the src from the thumbnail to be safe regarding url_for
        if (thumbElement) {
            const thumbImg = thumbElement.querySelector('img');
            if (thumbImg) mainImg.src = thumbImg.src;
        }
        mainImg.style.opacity = 1;
    }, 200);

    // Update active class
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    if (thumbElement) thumbElement.classList.add('active');
}

/**
 * Sends a basic page view event to the backend.
 */
function trackPageView() {
    try {
        fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                page: window.location.pathname,
                device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
            })
        }).catch(err => console.log('Analytics skipped'));
    } catch (e) {
        // Ignore analytics errors
    }
}

/**
 * Helper to pre-fill the form when clicking "Enquire" on a product
 */
function enquireProduct(productName) {
    const formSection = document.getElementById('contact');

    // Find input matching product name (simple search)
    const inputs = document.querySelectorAll('.qty-item');
    let targetInput = null;

    inputs.forEach(item => {
        const name = item.querySelector('span').innerText;
        // Check fuzzy match
        if (productName.includes(name) || name.includes(productName)) {
            targetInput = item.querySelector('input');
        }
    });

    // Smooth scroll to form
    formSection.scrollIntoView({ behavior: 'smooth' });

    if (targetInput) {
        setTimeout(() => {
            targetInput.focus();
            // Flash effect for visibility
            targetInput.style.borderColor = 'var(--primary-color)';
            targetInput.style.boxShadow = '0 0 10px var(--primary-color)';
            setTimeout(() => {
                targetInput.style.borderColor = '';
                targetInput.style.boxShadow = '';
            }, 1000);
        }, 800);
    }
}
