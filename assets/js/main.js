// Team Carousel - Custom carousel that slides one item at a time with responsive support
function initTeamCarousel() {
  const track = document.getElementById("teamCarouselTrack");
  const prevBtn = document.getElementById("teamPrevBtn");
  const nextBtn = document.getElementById("teamNextBtn");
  const prevBtnBottom = document.getElementById("teamPrevBtnBottom");
  const nextBtnBottom = document.getElementById("teamNextBtnBottom");

  if (!track) {
    console.log("Team carousel track not found");
    return;
  }

  const items = track.querySelectorAll(".team-carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;

  // Get visible items based on screen width
  function getVisibleItems() {
    const width = window.innerWidth;
    if (width >= 1024) {
      return 3; // Desktop: 3 items
    } else if (width >= 768) {
      return 2; // Tablet: 2 items
    } else {
      return 1; // Mobile: 1 item
    }
  }

  function getMaxIndex() {
    const visibleItems = getVisibleItems();
    return Math.max(0, totalItems - visibleItems);
  }

  function updateCarousel() {
    const visibleItems = getVisibleItems();
    const gap = 24;
    const containerWidth = track.parentElement.offsetWidth;
    const itemWidth =
      (containerWidth - gap * (visibleItems - 1)) / visibleItems;
    const translateX = currentIndex * (itemWidth + gap);
    track.style.transform = `translateX(-${translateX}px)`;

    // Ensure currentIndex doesn't exceed maxIndex after resize
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
      const newTranslateX = currentIndex * (itemWidth + gap);
      track.style.transform = `translateX(-${newTranslateX}px)`;
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  function goNext() {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateCarousel();
    }
  }

  // Connect top navigation buttons
  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);

  // Connect bottom navigation buttons
  if (prevBtnBottom) prevBtnBottom.addEventListener("click", goPrev);
  if (nextBtnBottom) nextBtnBottom.addEventListener("click", goNext);

  // Handle window resize
  window.addEventListener("resize", function () {
    updateCarousel();
  });

  // Initial update
  updateCarousel();
  console.log("Team carousel initialized with", totalItems, "items");
}

// Portfolio Carousel - Custom carousel with dynamic indicators
function initPortfolioCarousel() {
  const track = document.getElementById("portfolioCarouselTrack");
  const indicatorsContainer = document.getElementById("portfolioIndicators");

  if (!track) {
    console.log("Portfolio carousel track not found");
    return;
  }

  const items = track.querySelectorAll(".portfolio-carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;

  // Get visible items based on screen width
  function getVisibleItems() {
    const width = window.innerWidth;
    if (width >= 1024) {
      return 4; // Desktop: 4 items
    } else if (width >= 768) {
      return 2; // Tablet: 2 items
    } else {
      return 1; // Mobile: 1 item
    }
  }

  function getMaxIndex() {
    const visibleItems = getVisibleItems();
    return Math.max(0, totalItems - visibleItems);
  }

  function getNumPages() {
    const visibleItems = getVisibleItems();
    return Math.ceil(totalItems / visibleItems);
  }

  function updateIndicators() {
    if (!indicatorsContainer) return;

    const numPages = getNumPages();
    const visibleItems = getVisibleItems();
    const currentPage = Math.floor(currentIndex / visibleItems);

    // Clear existing indicators
    indicatorsContainer.innerHTML = "";

    // Create new indicators
    for (let i = 0; i < numPages; i++) {
      const indicator = document.createElement("button");
      indicator.className = "portfolio-indicator" + (i === currentPage ? " active" : "");
      indicator.addEventListener("click", function () {
        currentIndex = i * visibleItems;
        // Ensure currentIndex doesn't exceed maxIndex
        if (currentIndex > getMaxIndex()) {
          currentIndex = getMaxIndex();
        }
        updateCarousel();
        updateIndicators();
      });
      indicatorsContainer.appendChild(indicator);
    }
  }

  function updateCarousel() {
    const visibleItems = getVisibleItems();
    const gap = 15;
    const containerWidth = track.parentElement.offsetWidth;
    const itemWidth =
      (containerWidth - gap * (visibleItems - 1)) / visibleItems;
    const translateX = currentIndex * (itemWidth + gap);
    track.style.transform = `translateX(-${translateX}px)`;

    // Ensure currentIndex doesn't exceed maxIndex after resize
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
      const newTranslateX = currentIndex * (itemWidth + gap);
      track.style.transform = `translateX(-${newTranslateX}px)`;
    }
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    // Adjust currentIndex when visible items change
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    updateCarousel();
    updateIndicators();
  });

  // Initial update
  updateCarousel();
  updateIndicators();
  console.log("Portfolio carousel initialized with", totalItems, "items");
}

// Back to top button
document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});



async function loadSection(elementId, filePath, callback) {
  const response = await fetch(filePath);
  const html = await response.text();
  document.getElementById(elementId).innerHTML = html;
  // Execute callback after section is loaded
  if (callback && typeof callback === "function") {
    callback();
  }
}

// Load sections
document.addEventListener("DOMContentLoaded", function () {
  loadSection("section_1", "sections/section_1.html");
  loadSection("section_2", "sections/section_2.html");
  loadSection("section_3", "sections/section_3.html");
  // Initialize portfolio carousel after section 4 is loaded
  loadSection("section_4", "sections/section_4.html", initPortfolioCarousel);
  loadSection("section_5", "sections/section_5.html");
  // Initialize team carousel after section 6 is loaded
  loadSection("section_6", "sections/section_6.html", initTeamCarousel);
  loadSection("section_7", "sections/section_7.html");
  loadSection("section_8", "sections/section_8.html");
  loadSection("section_9", "sections/section_9.html");
  loadSection("section_10", "sections/section_10.html");
  loadSection("section_11", "sections/section_11.html");
});
