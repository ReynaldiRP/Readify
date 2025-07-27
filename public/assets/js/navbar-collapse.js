// Use event delegation instead of direct element selection
document.addEventListener("click", function (e) {
  // Check if clicked element or its parent has navbar-trigger attribute
  const trigger = e.target.closest("[navbar-trigger]");
  if (!trigger) return;

  e.preventDefault();

  const navbar_menus = document.querySelector("[navbar-menu]");
  const backdrop = document.querySelector(".navbar-backdrop");
  const bar1 = document.querySelector("[bar1]");
  const bar2 = document.querySelector("[bar2]");
  const bar3 = document.querySelector("[bar3]");

  if (!navbar_menus) return;

  const elements = navbar_menus.querySelectorAll("a");

  if (navbar_menus.classList.contains("lg-max:max-h-0")) {
    // Opening Navbar
    navbar_menus.classList.remove("lg-max:max-h-0");
    navbar_menus.classList.add("lg-max:max-h-54");
  } else {
    // Closing Navbar
    navbar_menus.classList.remove("lg-max:max-h-54");
    navbar_menus.classList.add("lg-max:max-h-0");
  }

  toggleNavItems();

  function toggleNavItems() {
    if (backdrop) backdrop.classList.toggle("hidden");
    if (bar1) {
      bar1.classList.toggle("rotate-44");
      bar1.classList.toggle("origin-10-10");
      bar1.classList.toggle("mt-1");
    }
    if (bar2) bar2.classList.toggle("opacity-0");
    if (bar3) {
      bar3.classList.toggle("-rotate-44");
      bar3.classList.toggle("origin-10-90");
      bar3.classList.toggle("mt-0.75");
      bar3.classList.toggle("mt-1.75");
    }
  }
});

// Handle closing navbar when clicking on links or backdrop
document.addEventListener("click", function (e) {
  const navbar_menus = document.querySelector("[navbar-menu]");
  if (!navbar_menus) return;

  const isNavLink = e.target.closest("[navbar-menu] a");
  const isBackdrop = e.target.classList.contains("navbar-backdrop");

  if (isNavLink || isBackdrop) {
    if (navbar_menus.classList.contains("lg-max:max-h-54")) {
      navbar_menus.classList.remove("lg-max:max-h-54");
      navbar_menus.classList.add("lg-max:max-h-0");

      const backdrop = document.querySelector(".navbar-backdrop");
      const bar1 = document.querySelector("[bar1]");
      const bar2 = document.querySelector("[bar2]");
      const bar3 = document.querySelector("[bar3]");

      if (backdrop) backdrop.classList.add("hidden");
      if (bar1) {
        bar1.classList.remove("rotate-44", "origin-10-10", "mt-1");
      }
      if (bar2) bar2.classList.remove("opacity-0");
      if (bar3) {
        bar3.classList.remove("-rotate-44", "origin-10-90", "mt-0.75");
        bar3.classList.add("mt-1.75");
      }
    }
  }
});
