// ^ Write your JavaScript code here




let themeColorsBtns = Array.from(
  document.querySelector("#theme-colors-grid").children
);
let resetSettings = document.querySelector("#reset-settings");
let closeSettings = document.querySelector("#close-settings");
let fontsBtns = document.querySelectorAll(".font-option");
let sections = document.querySelectorAll(".nav-section");
let darkLighModeBtn = document.querySelector("#theme-toggle-button");
let portfolioTabsBtn = document.querySelectorAll(".portfolio-filter");
let portfolioAllContents = document.querySelectorAll(".portfolio-item");
let prevTestimonial = document.querySelector("#prev-testimonial");
let nextTestimonial = document.querySelector("#next-testimonial");
let testimonialCard = document.querySelector(".testimonial-card");
let testimonialsCarousel = document.querySelector("#testimonials-carousel");
let carouselIndicatorBtns = document.querySelectorAll(".carousel-indicator");
let settingsToggleBtn = document.querySelector("#settings-toggle");
let settingsSidebar = document.querySelector("#settings-sidebar");
let scrollToTop = document.querySelector("#scroll-to-top");
let index = 0;
let totalCards = 6;


// restore font
if (localStorage.getItem('selectedFont') !== null) {
  let dataFont = localStorage.getItem('selectedFont')
  let selectedFont = document.querySelector(`[data-font=${dataFont}]`)
  fontOptions(selectedFont);
}

// restore mode light or dark
if (localStorage.getItem('mode') != null) {
  if (localStorage.getItem('mode') == 'dark') {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// restore selectedTheme
if (localStorage.getItem('selectedTheme') != null) {
  let title = localStorage.getItem('selectedTheme');
  let theme = document.querySelector(`[title='${title}']`)
  changeTheme(theme);
}


//* events

resetSettings.addEventListener('click', function () {
  // font tajawal
  fontOptions(fontsBtns[1]);
  localStorage.setItem('selectedFont', 'tajawal')

  // theme Purple Blue
  changeTheme(themeColorsBtns[0]);
  localStorage.setItem('selectedTheme', 'Purple Blue')

  // close sidebar 
  settingsToggleBtn.style.right = "0";
  settingsSidebar.classList.add("translate-x-full");
})


themeColorsBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    changeTheme(e.currentTarget);
    localStorage.setItem('selectedTheme', e.currentTarget.getAttribute('title'))
  });
});

// close the sidebar
closeSettings.addEventListener("click", function () {
  settingsToggleBtn.style.right = "0";
  settingsSidebar.classList.add("translate-x-full");
});

// event to change fonts
fontsBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    fontOptions(e.currentTarget);
    localStorage.setItem('selectedFont', e.currentTarget.getAttribute('data-font'))

  });
});

function changeTheme(currentTarget) {
  document.documentElement.style.cssText = `--color-primary:${currentTarget.getAttribute(
    "data-primary"
  )}; --color-secondary: ${currentTarget.getAttribute(
    "data-secondary"
  )}; --color-accent: ${currentTarget.style.backgroundColor};`;

  themeColorsBtns.forEach((btn) => {
    btn.classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900"
    );
  });

  currentTarget.classList.add(
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900"
  );
}
function fontOptions(currentTarget) {
  document.body.classList.remove(
    `font-cairo`,
    `font-tajawal`,
    `font-alexandria`
  );
  document.body.classList.add(
    `font-${currentTarget.getAttribute("data-font")}`
  );

  fontsBtns.forEach((btnUnchecked) => {
    btnUnchecked.classList.remove(
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800"
    );
    btnUnchecked.classList.add("border-slate-200", "dark:border-slate-700");
  });
  currentTarget.classList.add(
    "active",
    "border-primary",
    "bg-slate-50",
    "dark:bg-slate-800"
  );
  currentTarget.classList.remove("border-slate-200", "dark:border-slate-700");
}

// just to stop Propagation and close the side bar when clicking anywhere in the side bar
settingsSidebar.addEventListener("click", function (e) {
  e.stopPropagation();
});

//settingsToggleBtn open the side bar when clicking on the settingsToggleBtn
settingsToggleBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  settingsToggleBtn.style.right = "20rem";
  settingsSidebar.classList.remove("translate-x-full");
});

// close the side bar when clicking anywhere in the window
window.addEventListener("click", function () {
  settingsToggleBtn.style.right = "0";
  settingsSidebar.classList.add("translate-x-full");
});

// scroll to top btn
scrollToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// dot btns
carouselIndicatorBtns.forEach((indicator, indicatorIndex) => {
  indicator.addEventListener("click", function () {
    index = indicatorIndex;
    slide();
  });
});

//next and previous
prevTestimonial.addEventListener("click", function () {
  --index;
  slide();
});
nextTestimonial.addEventListener("click", function () {
  ++index;
  slide();
});

//* window scroll
window.addEventListener("scroll", function () {
  // navbar updated with the current scroll section
  scrollSection();

  // scroll to top visibility
  scrollToTopVisibility();
});

//* modes
darkLighModeBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem('mode', 'dark');
  } else {
    localStorage.setItem('mode', 'light');
  }
});

function dotBtnColor() {
  carouselIndicatorBtns.forEach((indicator) => {
    indicator.classList.remove("active", "scale-125", "bg-accent");
    indicator.classList.add("bg-slate-400", "dark:bg-slate-600");
  });
  carouselIndicatorBtns[index].classList.remove(
    "bg-slate-400",
    "dark:bg-slate-600"
  );
  carouselIndicatorBtns[index].classList.add(
    "active",
    "scale-125",
    "bg-accent"
  );
}

function slide() {
  if (index > totalCards - 3) index = 0;
  if (index < 0) index = totalCards - 3;
  dotBtnColor();
  let cardWidth = testimonialCard.offsetWidth;
  testimonialsCarousel.style.cssText = `transform: translateX(${index * cardWidth
    }px);`;
}

portfolioTabsBtn.forEach((tabBtn) => {
  tabBtn.addEventListener("click", function () {
    // change selected btn color
    changePortfolioTabBtnColor(tabBtn);
    // all contents display none
    hideAllContent();
    displayContent(tabBtn)
  });
});

function scrollToTopVisibility() {
  if (window.scrollY >= sections[1].offsetTop - 100) {
    scrollToTop.classList.remove("opacity-0", "invisible");
    scrollToTop.classList.add("opacity-100", "visible");
  } else {
    scrollToTop.classList.remove("opacity-100", "visible");
    scrollToTop.classList.add("opacity-0", "invisible");
  }
}

function scrollSection() {
  let currentScrollY = window.scrollY;

  sections.forEach((section) => {
    let top = section.offsetTop - 100;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");
    let currentLink = document.querySelector(`.nav-links a[href='#${id}']`);

    if (currentScrollY > top && currentScrollY < top + height) {
      currentLink.classList.add("active");
    } else {
      currentLink.classList.remove("active");
    }
  });
}
function changePortfolioTabBtnColor(tabBtn) {
  portfolioTabsBtn.forEach((btn) => {
    btn.classList.remove(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50"
    );
    btn.classList.add(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700"
    );
  });
  tabBtn.classList.add(
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
    "shadow-lg",
    "shadow-primary/50"
  );

  tabBtn.classList.remove(
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
    "border",
    "border-slate-300",
    "dark:border-slate-700"
  );
}

function hideAllContent() {
  // all contents display none
  portfolioAllContents.forEach((content) => {
    content.classList.add("hiddeContent");
  });
}

function displayContent(tabBtn) {
  setTimeout(() => {
    // display content
    portfolioAllContents.forEach((content) => {
      if (tabBtn.getAttribute("data-filter") === "all") {
        content.classList.remove("display-none");
        requestAnimationFrame(() => { content.classList.remove("hiddeContent"); })
      } else if (
        content.getAttribute("data-category") ==
        tabBtn.getAttribute("data-filter")
      ) {
        content.classList.remove("display-none");
        requestAnimationFrame(() => { content.classList.remove("hiddeContent"); })

      } else {
        content.classList.add("display-none");
      }
    });
  }, 300);

}
