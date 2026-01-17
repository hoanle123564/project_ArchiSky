// Mobile Sidebar Menu
document.addEventListener("DOMContentLoaded", function () {
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const mobileSidebar = document.getElementById("mobileSidebar");
    const mobileOverlay = document.getElementById("mobileMenuOverlay");
    const closeBtn = document.getElementById("closeSidebar");

    // Open sidebar
    if (mobileToggle) {
        mobileToggle.addEventListener("click", function () {
            mobileSidebar.classList.add("active");
            mobileOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

    // Close sidebar - X button
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            mobileSidebar.classList.remove("active");
            mobileOverlay.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    // Close sidebar - Overlay click
    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", function () {
            mobileSidebar.classList.remove("active");
            mobileOverlay.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    // Toggle submenus
    const menuItems = document.querySelectorAll(".sidebar-menu .has-submenu > a");
    menuItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const parent = this.parentElement;

            // Close other open submenus
            document
                .querySelectorAll(".sidebar-menu .has-submenu")
                .forEach(function (other) {
                    if (other !== parent) {
                        other.classList.remove("open");
                    }
                });

            // Toggle current submenu
            parent.classList.toggle("open");
        });
    });
});