document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // COUNTDOWN TIMER
    // ======================
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const diff = endOfDay - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdown').textContent = `${hours}h ${minutes}m ${seconds}s`;

        const finalHours = hours.toString().padStart(2, '0');
        const finalMins = minutes.toString().padStart(2, '0');
        const finalSecs = seconds.toString().padStart(2, '0');

        const finalCountdown = document.getElementById('final-countdown');
        if(finalCountdown) {
            finalCountdown.innerHTML = `<span>${finalHours}</span>:<span>${finalMins}</span>:<span>${finalSecs}</span>`;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ======================
    // SALES COUNTER
    // ======================
    function animateSalesCounter() {
        const target = 2918;
        const duration = 3000;
        const start = target - 100;
        const salesCounter = document.getElementById('sales-counter');

        if(!salesCounter) return;

        let startTime = null;

        function animation(currentTime) {
            if(!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const increment = Math.floor(progress / duration * 100);
            const currentValue = start + increment;

            salesCounter.textContent = currentValue.toLocaleString();

            if(progress < duration) {
                requestAnimationFrame(animation);
            } else {
                salesCounter.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(animation);
    }

    animateSalesCounter();

    // ======================
    // AGE SLIDER
    // ======================
    const ageSlider = document.getElementById('age-slider');
    const ageDisplay = document.getElementById('age-display');
    const agingFace = document.getElementById('aging-face');

    if(ageSlider && ageDisplay && agingFace) {
        ageSlider.addEventListener('input', function() {
            const age = this.value;
            ageDisplay.textContent = age;

            const opacity = 1 - (age - 40) * 0.03;
            const blur = (age - 40) * 0.1;
            const brightness = 100 - (age - 40) * 0.5;
            agingFace.style.opacity = opacity;
            agingFace.style.filter = `blur(${blur}px) brightness(${brightness}%)`;
        });
    }

    // ======================
    // FAQ ACCORDION
    // ======================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if(otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-toggle').textContent = '+';
                }
            });

            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');

            if(item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '×';
            } else {
                answer.style.maxHeight = '0';
                toggle.textContent = '+';
            }
        });
    });

    // ======================
    // SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ======================
    // BUTTON BEHAVIORS
    // ======================
    
    // 1. Hero Button - Smooth scroll to offer
    const heroCta = document.getElementById('scroll-to-offer');
    if(heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            const offerSection = document.getElementById('offer');
            if(offerSection) {
                offerSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // 2. Checkout Button - Direct to payment
    const checkoutBtn = document.getElementById('checkout-button');
    if(checkoutBtn) {
        // No additional JS needed - uses default link behavior
    }

    // ======================
    // SCROLL ANIMATIONS
    // ======================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.proof-content, .problem-card, .testimonial-card, .benefit-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    const animatedElements = document.querySelectorAll('.proof-content, .problem-card, .testimonial-card, .benefit-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});