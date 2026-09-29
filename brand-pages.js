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

document.querySelectorAll('.inventory-card, .pricing-card, .testimonial-card, .faq-item').forEach(el => {
  // Cards inside a horizontally-scrolling carousel start clipped out of
  // view by the track's overflow, so they never register as intersecting
  // the viewport and would stay invisible forever — skip the reveal
  // animation for those and just show them right away.
  if (el.closest('.fleet-carousel-track')) return;
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

/* Ambassador referral links. /r/<code> redirects to /?ref=<code>; a valid code is kept
   in this browser for 60 days (the most recent link wins) and exotics-form.js sends it
   with the reservation. One click per code per day is logged for the ambassador's
   dashboard in the Echelon Portal (/portal). */
const REF_KEY  = 'echelonRef';
const REF_DAYS = 60;

function savedReferral() {
  try {
    const ref = JSON.parse(localStorage.getItem(REF_KEY) || 'null');
    return ref && Date.now() - ref.at < REF_DAYS * 864e5 ? ref : null;
  } catch (e) { return null; }
}

function showReferralPerk(ref) {
  if (!ref || document.getElementById('schedule')) return;   // the reserve page shows it on the form
  const pill = document.createElement('div');
  pill.className = 'ref-pill';
  pill.setAttribute('role', 'status');
  pill.innerHTML = '<span class="ref-pill-mark">✦</span><span class="ref-pill-text"></span>' +
    '<a class="ref-pill-cta" href="reserve.html">Reserve</a>' +
    '<button type="button" class="ref-pill-close" aria-label="Dismiss">×</button>';
  const text = pill.querySelector('.ref-pill-text');
  text.innerHTML = '<small></small><span></span>';
  text.firstChild.textContent = 'Referred by ' + ref.name;
  text.lastChild.textContent = ref.perk;
  pill.querySelector('.ref-pill-close').addEventListener('click', () => pill.remove());
  document.body.appendChild(pill);
}

(function captureReferral() {
  const params = new URLSearchParams(window.location.search);
  const code = (params.get('ref') || '').trim().toUpperCase();
  if (!/^[A-Z0-9-]{2,24}$/.test(code)) return;
  // Drop ?ref= from the address bar so a shared copy of this URL doesn't carry the code.
  params.delete('ref');
  history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params : '') + location.hash);

  fetch('/api/ref?code=' + encodeURIComponent(code))
    .then(res => (res.ok ? res.json() : null))
    .then(info => {
      if (!info || !info.ok) return;
      const ref = { code: info.code, name: info.name, perk: info.perk, at: Date.now() };
      try {
        localStorage.setItem(REF_KEY, JSON.stringify(ref));
        let visitor = localStorage.getItem('echelonVisitor');
        if (!visitor) {
          visitor = Math.random().toString(36).slice(2) + Date.now().toString(36);
          localStorage.setItem('echelonVisitor', visitor);
        }
        const clickKey = 'echelonRefClick:' + ref.code;
        const today = new Date().toDateString();
        if (localStorage.getItem(clickKey) !== today) {
          localStorage.setItem(clickKey, today);
          fetch('/api/ref', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: ref.code, page: location.pathname, visitor: visitor }),
            keepalive: true
          }).catch(() => {});
        }
      } catch (e) { /* storage blocked (private mode): the perk still shows for this visit */ }
      showReferralPerk(ref);
      if (typeof showReferralOnForm === 'function') showReferralOnForm(ref);
    })
    .catch(() => {});
})();
