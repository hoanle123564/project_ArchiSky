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
    const backToTop = document.getElementById('back-to-top');
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

// Mobile Sidebar Menu
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');
    const closeBtn = document.getElementById('closeSidebar');

    // Open sidebar
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            mobileSidebar.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close sidebar - X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            mobileSidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close sidebar - Overlay click
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function () {
            mobileSidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Toggle submenus
    const menuItems = document.querySelectorAll('.sidebar-menu .has-submenu > a');
    menuItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = this.parentElement;

            // Close other open submenus
            document.querySelectorAll('.sidebar-menu .has-submenu').forEach(function (other) {
                if (other !== parent) {
                    other.classList.remove('open');
                }
            });

            // Toggle current submenu
            parent.classList.toggle('open');
        });
    });
});