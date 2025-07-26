var expand_trigger = document.querySelector("[navbar-trigger]");
var bar1 = document.querySelector("[bar1]");
var bar2 = document.querySelector("[bar2]");
var bar3 = document.querySelector("[bar3]");
var navbar_menus = document.querySelector("[navbar-menu]");
const collapse_height = navbar_menus.scrollHeight;

expand_trigger.addEventListener("click", function () {
  elements = navbar_menus.querySelectorAll("a");
  if (navbar_menus.classList.contains("lg-max:max-h-0")) {
    navbar_menus.classList.remove("lg-max:max-h-0");
    navbar_menus.classList.add("lg-max:max-h-54");
  } else {
    navbar_menus.classList.remove("lg-max:max-h-54");
    navbar_menus.classList.add("lg-max:max-h-0");
  }
  bar1.classList.toggle("rotate-44");
  bar1.classList.toggle("origin-10-10");
  bar1.classList.toggle("mt-1");

  bar2.classList.toggle("opacity-0");

  bar3.classList.toggle("-rotate-44");
  bar3.classList.toggle("origin-10-90");
  bar3.classList.toggle("mt-0.75");
  bar3.classList.toggle("mt-1.75");
});
