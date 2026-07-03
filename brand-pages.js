/* ──────────────────────────────────────────
   SHARED JS FOR NEW BRAND PAGES
   (Exotics / Boat Charters / Jet Charters / Experiences)
   Kept separate from script.js on purpose: script.js runs applyLang()
   on load, which targets generic classes like .pricing-card and
   .testimonial-card that these pages also use — sharing it would
   silently overwrite this page's content with the economy page's text.
────────────────────────────────────────── */

/* Brand switcher dropdown */
const brandSwitcher = document.getElementById('brandSwitcher');
const brandBtn      = document.getElementById('brandBtn');
const brandDropdown = document.getElementById('brandDropdown');

brandBtn && brandBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  brandSwitcher.classList.toggle('open');
  brandDropdown.classList.toggle('open');
});

/* Language switcher dropdown — toggle behavior only. Each page defines
   its own global applyLang(lang) (see e.g. exotics-i18n.js) so content
   never leaks between pages; this file just wires the UI + persistence. */
const langSwitcher = document.getElementById('langSwitcher');
const langBtn      = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

langBtn && langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langSwitcher.classList.toggle('open');
  langDropdown.classList.toggle('open');
});

document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof applyLang === 'function') applyLang(btn.dataset.lang);
    langSwitcher && langSwitcher.classList.remove('open');
    langDropdown && langDropdown.classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

document.addEventListener('click', () => {
  brandSwitcher && brandSwitcher.classList.remove('open');
  brandDropdown && brandDropdown.classList.remove('open');
  langSwitcher && langSwitcher.classList.remove('open');
  langDropdown && langDropdown.classList.remove('open');
});

/* Sticky nav background on scroll */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* Mobile hamburger menu */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* Scroll-reveal animation */
const brandObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      brandObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.inventory-card, .pricing-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  brandObserver.observe(el);
});

/* Inventory card "Reserve" buttons jump to the on-page scheduling section
   and pre-fill the interest field with that item's name. */
function selectForSchedule(name) {
  const field = document.getElementById('interestField');
  if (field) field.value = name;
  const target = document.getElementById('schedule');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

/* Visual-only submit: this preview round intentionally does not persist
   anywhere (see plan) — validates, shows the same success toast pattern
   as the economy site, then resets the form. */
function submitInquiry(e) {
  e.preventDefault();
  const form = e.target;
  showToast();
  form.reset();
}
