// Team Carousel - Custom carousel that slides one item at a time
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('teamCarouselTrack');
    const prevBtn = document.getElementById('teamPrevBtn');
    const nextBtn = document.getElementById('teamNextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    const items = track.querySelectorAll('.team-carousel-item');
    const totalItems = items.length;
    const visibleItems = 3; // Number of items visible at once
    let currentIndex = 0;
    const maxIndex = totalItems - visibleItems;

    function updateCarousel() {
        // Calculate the width of one item including gap
        const gap = 24;
        const containerWidth = track.parentElement.offsetWidth;
        const itemWidth = (containerWidth - (gap * (visibleItems - 1))) / visibleItems;
        const translateX = currentIndex * (itemWidth + gap);
        track.style.transform = `translateX(-${translateX}px)`;
    }

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Handle window resize
    window.addEventListener('resize', updateCarousel);
});

// Back to top button
document.addEventListener('DOMContentLoaded', function () {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});