/* ──────────────────────────────────────────
   ECHELON MEMBERS (/members)
   Card renderer (flip + tilt), tier tabs, comparison table, the Full Echelon
   marks, founding-number count and the join form. Text comes from
   members-i18n.js (membersT()); applyLang() calls membersRender() so the
   rendered parts follow the language switcher.

   Join requests go to /api/join, which saves them to the Echelon CRM
   (Members tab) and emails the team. GET /api/join returns how many founding
   numbers (Nº 0001–0099) remain.
────────────────────────────────────────── */
(function () {
  const TIERS = {
    member: { label: 'Member', fill: 'mbFoil', no: null },
    silver: { label: 'Silver', fill: 'mbGraphite', no: '0412' },
    black: { label: 'Black', fill: 'mbFoil', no: '0147', nfc: true },
    upper: { label: 'Upper Echelon', fill: 'mbFoil', no: '0007', nfc: true },
  };
  const ORDER = ['member', 'silver', 'black', 'upper'];
  const MIN_AGE = 21;
  const FOUNDING = 99;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  /* ── Cards ── */
  const mark = (fill) => `<svg class="mc-mark" viewBox="66 15 163 97" style="fill:url(#${fill})" aria-hidden="true"><use href="#mbBars"/></svg>`;
  const NFC = '<svg class="mc-nfc" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8.5a5 5 0 0 1 0 7"/><path d="M10.5 6a8.5 8.5 0 0 1 0 12"/><path d="M14 3.5a12 12 0 0 1 0 17"/></svg>';

  // Illustrative QR-style pattern (the real card carries the member's own link).
  function qr(size) {
    size = size || 25;
    let s = 7, cells = '';
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    const inFinder = (x, y) => (x < 7 && y < 7) || (x > size - 8 && y < 7) || (x < 7 && y > size - 8);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      if (!inFinder(x, y) && rnd() > 0.52) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
    const f = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
    return `<svg viewBox="-1 -1 ${size + 2} ${size + 2}" aria-hidden="true"><rect x="-1" y="-1" width="${size + 2}" height="${size + 2}" fill="#fff"/><g fill="#111">${cells}${f(0, 0)}${f(size - 7, 0)}${f(0, size - 7)}</g></svg>`;
  }

  function front(tier, name, no) {
    const d = TIERS[tier];
    const num = no
      ? `<div class="mc-no-label">Member Nº</div><div class="mc-no">${no}</div>`
      : '<div class="mc-no-label">Member Nº</div><div class="mc-no pending">— — — —</div><div class="mc-pending-note">Issued with your first booking</div>';
    return `<div class="mc mc-front mt-${tier}"><div class="mc-sheen"></div>
      <div class="mc-top"><div class="mc-brand">${mark(d.fill)}<span class="mc-wordmark">ECHELON</span></div><div class="mc-tier">${d.label}</div></div>
      ${d.nfc ? NFC : ''}<div>${num}</div>
      <div class="mc-bottom"><span class="mc-name">${esc(name)}</span><span>Since 2026</span></div></div>`;
  }

  function back(tier, no) {
    const d = TIERS[tier];
    const named = tier === 'black' || tier === 'upper';
    const marks = ['mbRoad', 'mbWater', 'mbAir', 'mbEvening'].map((i) => `<svg viewBox="0 0 24 24"><use href="#${i}"/></svg>`).join('');
    return `<div class="mc mc-back mt-${tier}" aria-hidden="true"><div class="mc-sheen"></div>
      <div class="mc-back-grid"><div>
        <div class="mc-k">Your concierge</div><div class="mc-v">${named ? 'Your named concierge' : 'Echelon Concierge'}</div>
        <div class="mc-k">Text anytime</div><div class="mc-v">508-444-2276</div>
        <div class="mc-k">Request a booking</div><div class="mc-v">echelonrentalgroup.com</div>
      </div><div class="mc-qr">${qr()}<div class="mc-qr-cap">${d.nfc ? 'Tap or scan' : 'Scan'}</div></div></div>
      <div class="mc-foot"><span class="mc-divmarks">${marks}</span><span class="mc-fine">${no ? 'Nº ' + no + ' · ' : ''}Non-transferable</span></div></div>`;
  }

  // Renders a flippable card into `box`. Click / Enter / Space flips it; a mouse tilts it.
  function renderCard(box, tier, name, no) {
    box.innerHTML = `<div class="mb-tilt"><div class="mb-flip" role="button" tabindex="0" aria-label="${esc(TIERS[tier].label)} card. Flip to see the back.">
      <div class="mb-flip-inner">${front(tier, name, no)}${back(tier, no)}</div></div></div>`;
    if (box.dataset.bound) return;
    box.dataset.bound = '1';
    box.addEventListener('click', (e) => {
      if (box.dataset.swiped) { delete box.dataset.swiped; return; }
      const flip = e.target.closest('.mb-flip');
      if (flip) flip.classList.toggle('flipped');
    });
    box.addEventListener('keydown', (e) => {
      const flip = e.target.closest('.mb-flip');
      if (flip && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); flip.classList.toggle('flipped'); }
    });
    if (reduced) return;
    box.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const tilt = box.querySelector('.mb-tilt');
      const r = box.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`;
    });
    box.addEventListener('pointerleave', () => { const tilt = box.querySelector('.mb-tilt'); if (tilt) tilt.style.transform = ''; });
  }

  /* ── Tiers ── */
  const tabs = [...document.querySelectorAll('#mbTabs [data-tier]')];
  const tierCard = $('mbTierCard');
  const tierCopy = $('mbTierCopy');
  const tierPanel = $('mbTierPanel');
  let currentTier = 'black';

  function showTier(tier, animate, focusTab) {
    currentTier = tier;
    const t = membersT();
    tabs.forEach((b) => {
      const on = b.dataset.tier === tier;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focusTab) b.focus();
    });
    tierPanel.setAttribute('aria-labelledby', 'mbTab-' + tier);
    document.querySelectorAll('#mbTierDots i').forEach((d, i) => d.classList.toggle('on', ORDER[i] === tier));
    const info = t.tiers[tier];
    const label = tier === 'member' ? t.tierMember : TIERS[tier].label;
    renderCard(tierCard, tier, t.yourName, TIERS[tier].no);
    tierCopy.innerHTML = `<h3 class="mb-tier-name">${esc(label)}</h3><div class="mb-hairline"></div>
      <p class="mb-tier-earn">${esc(t.howYouGetIt)}</p><p class="mb-tier-earn-v">${esc(info.earn)}</p>
      <ul class="mb-perks">${info.perks.map((p) => `<li><span>${p}</span></li>`).join('')}</ul>`;
    if (animate && !reduced) {
      [tierCard, tierCopy].forEach((el) => { el.classList.remove('mb-fade'); void el.offsetWidth; el.classList.add('mb-fade'); });
    }
    const tab = tabs.find((b) => b.dataset.tier === tier);
    const strip = tab.parentElement;
    if (strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: tab.offsetLeft - 20, behavior: reduced ? 'auto' : 'smooth' });
  }
  tabs.forEach((b) => b.addEventListener('click', () => showTier(b.dataset.tier, true)));
  $('mbTabs').addEventListener('keydown', (e) => {
    const i = ORDER.indexOf(currentTier);
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? ORDER.length - 1 : null;
    if (next == null) return;
    e.preventDefault();
    showTier(ORDER[(next + ORDER.length) % ORDER.length], true, true);
  });
  // Swipe the card sideways to change tier (phones).
  let swipeX = null;
  tierCard.addEventListener('pointerdown', (e) => { swipeX = e.clientX; });
  tierCard.addEventListener('pointerup', (e) => {
    if (swipeX == null) return;
    const dx = e.clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) < 40) return;
    const i = ORDER.indexOf(currentTier) + (dx < 0 ? 1 : -1);
    if (i < 0 || i >= ORDER.length) return;
    tierCard.dataset.swiped = '1';
    showTier(ORDER[i], true);
  });

  /* ── Comparison table ── */
  function renderCompare() {
    const rows = membersT().compare;
    $('mbCompareBody').innerHTML = rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((c) =>
      c.startsWith('~') ? `<td class="dim">${esc(c.slice(1))}</td>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('');
  }

  /* ── The Full Echelon marks ── */
  const marks = [...document.querySelectorAll('#mbMarks .mb-mark')];
  function renderMarks() {
    const t = membersT();
    marks.forEach((m, i) => { m.querySelector('small').textContent = m.classList.contains('on') ? t.marksSample[i] : t.marksEmpty; });
    const n = marks.filter((m) => m.classList.contains('on')).length;
    const status = $('mbMarksStatus');
    status.classList.toggle('done', n === 3);
    status.innerHTML = n === 3 ? t.marksDone : t.marksProgress(n);
  }
  marks.forEach((m) => m.addEventListener('click', () => {
    const on = !m.classList.contains('on');
    m.classList.toggle('on', on);
    m.setAttribute('aria-pressed', String(on));
    renderMarks();
  }));

  /* ── Division carousel dots (phones) ── */
  const divs = $('mbDivs');
  const divDots = [...document.querySelectorAll('#mbDivDots i')];
  divs.addEventListener('scroll', () => {
    const cols = [...divs.children];
    const mid = divs.scrollLeft + divs.clientWidth / 2;
    let best = 0;
    cols.forEach((c, i) => { if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) < Math.abs(cols[best].offsetLeft + cols[best].offsetWidth / 2 - mid)) best = i; });
    divDots.forEach((d, i) => d.classList.toggle('on', i === best));
  }, { passive: true });

  /* ── Founding numbers ── */
  function renderTicks(claimed) {
    $('mbTicks').innerHTML = Array.from({ length: FOUNDING }, (_, i) => `<i class="${i < claimed ? 'on' : ''}"></i>`).join('');
    $('mbRemaining').textContent = FOUNDING - claimed;
  }
  renderTicks(0);
  fetch('/api/join').then((r) => (r.ok ? r.json() : null)).then((d) => {
    if (d && Number.isFinite(d.remaining)) renderTicks(Math.max(0, Math.min(FOUNDING, FOUNDING - d.remaining)));
  }).catch(() => {});

  $('mbPassQr').innerHTML = qr();

  /* ── Join form ── */
  const form = $('mbForm');
  const error = $('mbError');

  function age(v) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    if (!m) return null;
    const now = new Date();
    let a = now.getFullYear() - +m[1];
    if (now.getMonth() + 1 < +m[2] || (now.getMonth() + 1 === +m[2] && now.getDate() < +m[3])) a--;
    return a;
  }
  function fail(msg, field) {
    error.textContent = msg;
    error.hidden = false;
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); }
  }

  const today = new Date();
  form.birthdate.max = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate()).toISOString().slice(0, 10);

  // An ambassador's link (/r/CODE) is saved by brand-pages.js; carry it into the form.
  try {
    const ref = JSON.parse(localStorage.getItem('echelonRef') || 'null');
    if (ref && ref.code && Date.now() - ref.at < 60 * 864e5) form.code.value = ref.code;
  } catch (e) {}

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = membersT();
    error.hidden = true;
    const button = form.querySelector('button[type="submit"]');
    if (button.disabled) return;

    const missing = ['firstName', 'lastName', 'email', 'phone', 'birthdate', 'city']
      .map((k) => form[k]).find((f) => !f.value.trim());
    if (missing) return fail(t.errMissing, missing);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim())) return fail(t.errEmail, form.email);
    if (form.phone.value.replace(/\D/g, '').length < 10) return fail(t.errPhone, form.phone);
    const a = age(form.birthdate.value);
    if (a == null) return fail(t.errDob, form.birthdate);
    if (a < MIN_AGE) return fail(t.errAge, form.birthdate);
    if (!form.agree.checked) return fail(t.errAgree, form.agree);

    const payload = {
      firstName: form.firstName.value, lastName: form.lastName.value, email: form.email.value, phone: form.phone.value,
      birthdate: form.birthdate.value, city: form.city.value, heard: form.heard.value, code: form.code.value,
      interests: [...form.querySelectorAll('input[name="interests"]:checked')].map((i) => i.value),
      sms: form.sms.checked, agree: true, lang: currentLang, website: form.website.value,
    };

    button.disabled = true;
    button.textContent = t.fSending;
    fetch('/api/join', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then((res) => res.json().catch(() => ({})).then((body) => {
        if (res.ok) return;
        const err = new Error(body.error || '');
        err.code = body.code;
        throw err;
      }))
      .then(() => {
        if (window.va) window.va('event', { name: 'Member Joined' });
        const first = form.firstName.value.trim();
        const name = `${first} ${form.lastName.value.trim()}`;
        $('mbApprovedHi').textContent = membersT().okHi(first);
        renderCard($('mbNewCard'), 'member', name, null);
        form.hidden = true;
        const done = $('mbApproved');
        done.hidden = false;
        done.dataset.name = name;
        done.focus();
        done.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      })
      .catch((err) => {
        const t2 = membersT();
        const key = { missing: 'errMissing', email: 'errEmail', phone: 'errPhone', agree: 'errAgree', dob: 'errDob', age: 'errAge', exists: 'errExists', send: 'errSend' }[err.code];
        fail((key && t2[key]) || err.message || t2.errSend);
      })
      .finally(() => {
        button.disabled = false;
        button.textContent = membersT().fSubmit;
      });
  });

  /* ── Sticky "Request Access" on phones: shown between the hero buttons and the form ── */
  const sticky = $('mbSticky');
  if ('IntersectionObserver' in window) {
    const seen = new Map();
    const update = () => sticky.classList.toggle('away', [...seen.values()].some(Boolean));
    const heroIo = new IntersectionObserver((ents) => ents.forEach((en) => {
      seen.set('hero', en.isIntersecting || en.boundingClientRect.top > 0); update();
    }));
    heroIo.observe(document.querySelector('.mb-hero-ctas'));
    const joinIo = new IntersectionObserver((ents) => ents.forEach((en) => { seen.set('join', en.isIntersecting); update(); }));
    joinIo.observe($('join'));
    const footIo = new IntersectionObserver((ents) => ents.forEach((en) => { seen.set('foot', en.isIntersecting); update(); }));
    footIo.observe(document.querySelector('.footer'));
  }

  /* ── Language-dependent rendering ── */
  window.membersRender = function () {
    const t = membersT();
    renderCard(document.querySelector('[data-card="black"]'), 'black', t.yourName, '0147');
    showTier(currentTier, false);
    renderCompare();
    renderMarks();
    form.querySelector('button[type="submit"]').textContent = t.fSubmit;
    const done = $('mbApproved');
    if (!done.hidden && done.dataset.name) $('mbApprovedHi').textContent = t.okHi(done.dataset.name.split(' ')[0]);
  };
  applyLang(currentLang);
})();
