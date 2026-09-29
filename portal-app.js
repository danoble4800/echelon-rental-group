/* ──────────────────────────────────────────
   ECHELON PORTAL (/portal)
   One sign-in for the team and ambassadors (api/auth.js). What loads next
   depends on the role the server reports:
     owner / employee → Echelon CRM tabs (api/portal.js)
     ambassador       → their own dashboard
   The server checks the role on every request; hiding tabs here is only
   for tidiness, not security.
────────────────────────────────────────── */
(function () {
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const usd = (n) => '$' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });

  const PERKS = [
    'Complimentary delivery on your first rental',
    '$100 off your first rental',
    'Free extra hour on your first rental',
    'Complimentary detail and full tank at pickup',
    'Complimentary chauffeured airport pickup',
    'Priority booking on holiday weekends',
  ];

  let me = null;
  let tab = 'reservations';
  const state = {};

  // ── API ──
  async function request(url, opts) {
    const res = await fetch(url, Object.assign({ credentials: 'same-origin', headers: { 'Content-Type': 'application/json' } }, opts));
    const body = await res.json().catch(() => ({}));
    if (res.status === 401 && url.indexOf('/api/portal') === 0) { showAuth('login'); throw new Error(body.error || 'Please sign in again.'); }
    if (!res.ok) throw new Error(body.error || 'Something went wrong.');
    return body;
  }
  const get = (view, extra) => request('/api/portal?view=' + view + (extra || ''));
  const post = (action, data) => request('/api/portal', { method: 'POST', body: JSON.stringify(Object.assign({ action: action }, data)) });
  const auth = (action, data) => request('/api/auth', { method: 'POST', body: JSON.stringify(Object.assign({ action: action }, data)) });

  // ── Small UI helpers ──
  let toastTimer;
  function toast(msg, bad) {
    const t = $('#toast');
    t.textContent = msg;
    t.className = 'p-toast show' + (bad ? ' bad' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.className = 'p-toast'; }, 2600);
  }
  function loading(on) { $('#loading').hidden = !on; }
  async function copy(text, label) {
    try { await navigator.clipboard.writeText(text); toast((label || 'Link') + ' copied'); }
    catch (e) { window.prompt('Copy this:', text); }
  }

  function parseDate(v) {
    if (!v) return null;
    let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(v);
    if (m) return new Date(+m[3], +m[1] - 1, +m[2]);
    const d = new Date(v);
    return isNaN(d) ? null : d;
  }
  function shortDate(v) {
    const d = parseDate(v);
    return d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : (v || '');
  }
  function isoDate(v) {
    const d = parseDate(v);
    if (!d) return '';
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function ago(v) {
    const d = new Date(v);
    if (isNaN(d)) return v || '';
    const mins = Math.round((Date.now() - d) / 60000);
    if (mins < 60) return Math.max(mins, 1) + 'm ago';
    if (mins < 1440) return Math.round(mins / 60) + 'h ago';
    const days = Math.round(mins / 1440);
    return days < 30 ? days + 'd ago' : shortDate(v);
  }
  function statusTone(s) {
    s = (s || '').toLowerCase();
    if (/complete|paid/.test(s)) return 'good';
    if (/book|confirm/.test(s)) return 'info';
    if (/contact|pending|follow/.test(s)) return 'warn';
    if (/fit|cancel|lost|eligible|paused/.test(s)) return 'bad';
    if (/new|^$/.test(s)) return 'gold';
    return '';
  }
  const chip = (text, tone) => '<span class="p-chip' + (tone ? ' p-chip--' + tone : '') + '">' + esc(text) + '</span>';
  const options = (list, current) => list.map((o) => '<option' + (o === current ? ' selected' : '') + '>' + esc(o) + '</option>').join('');
  const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };

  // ── Views ──
  function show(view) {
    $('#authView').hidden = view !== 'auth';
    $('#staffView').hidden = view !== 'staff';
    $('#ambView').hidden = view !== 'amb';
    $('#userBar').hidden = view === 'auth';
  }

  async function start() {
    const setup = new URLSearchParams(location.search).get('setup');
    if (setup) return showSetup(setup);
    loading(true);
    try {
      me = (await request('/api/auth')).user;
      enter();
    } catch (e) {
      showAuth('login');
    } finally {
      loading(false);
    }
  }

  function enter() {
    $('#userName').textContent = me.name || me.email;
    $('#userRole').textContent = me.role;
    $('#userRole').className = 'p-chip' + (me.role === 'ambassador' ? ' p-chip--gold' : '');
    if (me.role === 'ambassador') {
      show('amb');
      loadDashboard();
    } else {
      show('staff');
      $$('#staffTabs [data-owner]').forEach((b) => { b.hidden = me.role !== 'owner'; });
      const saved = sessionStorageGet('portalTab');
      selectTab(saved && (me.role === 'owner' || ['reservations', 'referrals'].indexOf(saved) >= 0) ? saved : 'reservations');
    }
  }

  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  // ── Auth screens ──
  function showAuth(mode) {
    show('auth');
    me = null;
    $('#loginForm').hidden = mode !== 'login';
    $('#forgotForm').hidden = mode !== 'forgot';
    $('#setupForm').hidden = mode !== 'setup';
    $('#authError').textContent = '';
    $('#authTitle').textContent = mode === 'forgot' ? 'Set or reset password' : mode === 'setup' ? 'Create your password' : 'Sign in';
    if (mode === 'login') $('#authLead').textContent = 'Sign in with the email Echelon added you with.';
    if (mode === 'forgot') $('#authLead').textContent = "Enter the email you were added with and we'll send you a link to set your password.";
    const first = $('#' + mode + 'Form input');
    if (first) setTimeout(() => first.focus(), 50);
  }

  async function showSetup(token) {
    showAuth('setup');
    $('#authLead').textContent = 'Checking your link…';
    try {
      const who = await auth('checkSetup', { token: token });
      $('#authLead').textContent = 'Welcome' + (who.name ? ', ' + who.name.split(' ')[0] : '') + '. Choose a password for ' + who.email + ' (at least 10 characters).';
      $('#setupForm').dataset.token = token;
    } catch (e) {
      $('#setupForm').hidden = true;
      $('#authLead').textContent = e.message;
      $('#authError').innerHTML = '<button type="button" class="p-link" data-auth="login">Go to sign in</button>';
    }
  }

  $('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target, btn = $('button[type=submit]', f);
    btn.disabled = true;
    $('#authError').textContent = '';
    try {
      me = (await auth('login', { email: f.email.value, password: f.password.value })).user;
      f.reset();
      enter();
    } catch (err) {
      $('#authError').textContent = err.message;
    } finally { btn.disabled = false; }
  });

  $('#forgotForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target, btn = $('button[type=submit]', f);
    btn.disabled = true;
    try {
      await auth('forgot', { email: f.email.value });
      $('#authLead').textContent = "If that email is on the team, a link is on its way. It works for 2 hours. Didn't get it? Ask an Echelon owner to text you one.";
    } catch (err) {
      $('#authError').textContent = err.message;
    } finally { btn.disabled = false; }
  });

  $('#setupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target;
    if (f.password.value.length < 10) { $('#authError').textContent = 'Use at least 10 characters.'; return; }
    if (f.password.value !== f.confirm.value) { $('#authError').textContent = "Those passwords don't match."; return; }
    try {
      me = (await auth('setup', { token: f.dataset.token, password: f.password.value })).user;
      history.replaceState(null, '', '/portal');
      f.reset();
      enter();
    } catch (err) {
      $('#authError').textContent = err.message;
    }
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-auth]');
    if (a) showAuth(a.dataset.auth);
  });

  $('#signOut').addEventListener('click', async () => {
    await auth('logout').catch(() => {});
    showAuth('login');
  });

  // ── Staff tabs ──
  $('#staffTabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-tab]');
    if (b) selectTab(b.dataset.tab);
  });

  function selectTab(name) {
    tab = name;
    sessionStorageSet('portalTab', name);
    $$('#staffTabs [data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === name)));
    ({ reservations: loadReservations, referrals: loadReferrals, ambassadors: loadAmbassadors, team: loadTeam })[name]();
  }

  async function load(view, fn) {
    const panel = $('#staffPanel');
    panel.innerHTML = '';
    loading(true);
    try {
      state[view] = await get(view);
      if (tab === view) fn();
    } catch (e) {
      panel.innerHTML = '<div class="p-empty">' + esc(e.message) + '</div>';
    } finally { loading(false); }
  }

  // Reservations ─────────────────────────────
  let resFilter = 'Open';
  let resQuery = '';

  function loadReservations() { return load('reservations', renderReservations); }

  function followState(r) {
    const d = parseDate(r.followUp);
    if (!d) return null;
    const diff = Math.round((d - today0()) / 864e5);
    return diff < 0 ? 'overdue' : diff === 0 ? 'today' : null;
  }

  function renderReservations() {
    const data = state.reservations;
    const all = data.reservations;
    const closed = /complete|fit|cancel|lost/i;
    const groups = [['Open', (r) => !closed.test(r.status)], ['Follow-up due', (r) => !!followState(r)]]
      .concat(data.statusOptions.map((s) => [s, (r) => r.status === s]))
      .concat([['No status', (r) => !r.status], ['All', () => true]]);
    const test = (groups.find((g) => g[0] === resFilter) || groups[0])[1];
    const q = resQuery.toLowerCase();
    const list = all.filter(test).filter((r) => !q || [r.firstName, r.lastName, r.email, r.phone, r.vehicle, r.delivery, r.referral && r.referral.name].join(' ').toLowerCase().indexOf(q) >= 0);

    $('#staffPanel').innerHTML =
      '<div class="p-toolbar"><div><p class="p-eyebrow">Echelon Exotics</p><h2 class="p-h2">Reservations</h2></div>' +
      '<input class="p-search" type="search" placeholder="Search name, car, phone…" value="' + esc(resQuery) + '" id="resSearch" /></div>' +
      '<div class="p-filters">' + groups.map((g) => {
        const n = all.filter(g[1]).length;
        return (n || g[0] === 'All' || g[0] === 'Open') ? '<button type="button" class="p-filter" data-filter="' + esc(g[0]) + '" aria-pressed="' + (g[0] === resFilter) + '">' + esc(g[0]) + '<b>' + n + '</b></button>' : '';
      }).join('') + '</div>' +
      '<div class="p-list">' + (list.length ? list.map((r) => resCard(r, data.statusOptions)).join('') : '<div class="p-empty">Nothing here.</div>') + '</div>';

    $('#resSearch').addEventListener('input', (e) => {
      resQuery = e.target.value;
      clearTimeout(renderReservations.t);
      renderReservations.t = setTimeout(() => { renderReservations(); const s = $('#resSearch'); s.focus(); s.setSelectionRange(s.value.length, s.value.length); }, 250);
    });
  }

  function resCard(r, statuses) {
    const tel = (r.phone || '').replace(/[^\d+]/g, '');
    const fs = followState(r);
    const name = (r.firstName + ' ' + r.lastName).trim() || r.email;
    return '<article class="p-card' + (fs ? ' p-card--flag' : '') + '" data-row="' + r.row + '" data-email="' + esc(r.email) + '">' +
      '<div class="p-card-head"><div><h3 class="p-card-title">' + esc(name) + '</h3>' +
      '<p class="p-card-sub">Requested ' + esc(ago(r.submitted)) + '</p></div>' +
      '<div class="p-actions">' + chip(r.status || 'New', statusTone(r.status)) +
      (r.referral ? chip('✦ via ' + r.referral.name, 'gold') : '') +
      (fs ? chip(fs === 'today' ? 'Follow up today' : 'Follow-up overdue', 'warn') : '') + '</div></div>' +
      '<div class="p-meta"><span><strong>' + esc(r.vehicle || 'Any vehicle') + '</strong></span>' +
      '<span>' + esc(shortDate(r.pickup)) + (r.returnDate ? ' → ' + esc(shortDate(r.returnDate)) : '') + '</span>' +
      (r.delivery ? '<span>' + esc(r.delivery) + '</span>' : '') + '</div>' +
      '<div class="p-actions">' +
      (tel ? '<a class="p-btn p-btn--sm" href="tel:' + esc(tel) + '">Call</a><a class="p-btn p-btn--sm" href="sms:' + esc(tel) + '">Text</a>' : '') +
      (r.email ? '<a class="p-btn p-btn--sm" href="mailto:' + esc(r.email) + '">Email</a>' : '') +
      '<span class="p-muted p-small" style="align-self:center">' + esc(r.phone) + (r.email ? ' · ' + esc(r.email) : '') + '</span></div>' +
      '<div class="p-divider"></div>' +
      '<div class="p-edit">' +
      '<label class="p-field">Status<select name="status"><option value="">—</option>' + options(statuses, r.status) + '</select></label>' +
      '<label class="p-field">Follow-up<input type="date" name="followUp" value="' + esc(isoDate(r.followUp)) + '" /></label>' +
      '<label class="p-field p-field--wide">Notes<textarea name="notes" rows="2">' + esc(r.notes) + '</textarea></label>' +
      '<div class="p-save-row"><button type="button" class="p-btn p-btn--gold p-btn--sm" data-save-res disabled>Save</button><span class="p-saved"></span></div>' +
      '</div></article>';
  }

  // Referrals ─────────────────────────────
  let refFilter = 'Open';

  function loadReferrals() { return load('referrals', renderReferrals); }

  function renderReferrals() {
    const data = state.referrals;
    const all = data.referrals;
    const groups = [['Open', (r) => ['New', 'Booked'].indexOf(r.status) >= 0], ['Unpaid', (r) => r.status === 'Completed' && !r.paidOn]]
      .concat(data.statuses.map((s) => [s, (r) => r.status === s])).concat([['All', () => true]]);
    const test = (groups.find((g) => g[0] === refFilter) || groups[0])[1];
    const list = all.filter(test);
    $('#staffPanel').innerHTML =
      '<div class="p-toolbar"><div><p class="p-eyebrow">Ambassador program</p><h2 class="p-h2">Referrals</h2></div></div>' +
      '<p class="p-muted p-small">Bookings made through an ambassador\'s link. Mark one <strong>Completed</strong> with the rental price (before deposit and tax) once the car is back, and the commission is worked out for you.</p>' +
      '<div class="p-filters">' + groups.map((g) => {
        const n = all.filter(g[1]).length;
        return '<button type="button" class="p-filter" data-rfilter="' + esc(g[0]) + '" aria-pressed="' + (g[0] === refFilter) + '">' + esc(g[0]) + '<b>' + n + '</b></button>';
      }).join('') + '</div>' +
      '<div class="p-list">' + (list.length ? list.map((r) => refCard(r, data.statuses)).join('') : '<div class="p-empty">No referrals here yet. They show up when someone books through an ambassador link.</div>') + '</div>';
  }

  function refCard(r, statuses) {
    return '<article class="p-card" data-ref-row="' + r.row + '" data-email="' + esc(r.email) + '">' +
      '<div class="p-card-head"><div><h3 class="p-card-title">' + esc(r.firstName + ' ' + r.lastName) + '</h3>' +
      '<p class="p-card-sub">Referred by <strong>' + esc(r.ambassador) + '</strong> (' + esc(r.code) + ') · ' + esc(ago(r.submitted)) + '</p></div>' +
      '<div class="p-actions">' + chip(r.status, statusTone(r.status)) + (r.paidOn ? chip('Paid ' + shortDate(r.paidOn), 'good') : '') + '</div></div>' +
      '<div class="p-meta"><span><strong>' + esc(r.vehicle || 'Any vehicle') + '</strong></span><span>' + esc(shortDate(r.pickup)) + (r.returnDate ? ' → ' + esc(shortDate(r.returnDate)) : '') + '</span>' +
      (r.commission ? '<span>Commission <strong>' + usd(r.commission) + '</strong></span>' : '') + '</div>' +
      '<div class="p-edit">' +
      '<label class="p-field">Status<select name="status">' + options(statuses, r.status) + '</select></label>' +
      '<label class="p-field">Rental price ($)<input type="text" inputmode="decimal" name="rentalTotal" value="' + esc(r.rentalTotal) + '" placeholder="e.g. 3000" /></label>' +
      '<label class="p-field p-field--wide">Notes<textarea name="notes" rows="2">' + esc(r.notes) + '</textarea></label>' +
      '<div class="p-save-row"><button type="button" class="p-btn p-btn--gold p-btn--sm" data-save-ref disabled>Save</button><span class="p-saved"></span></div>' +
      '</div></article>';
  }

  // Ambassadors (owner) ─────────────────────────────
  function loadAmbassadors() { return load('ambassadors', renderAmbassadors); }

  function renderAmbassadors(newLink) {
    const data = state.ambassadors;
    const list = data.ambassadors;
    const active = list.filter((a) => /^active$/i.test(a.status));
    const sum = (k) => list.reduce((s, a) => s + (a.stats[k] || 0), 0);
    $('#staffPanel').innerHTML =
      '<div class="p-toolbar"><div><p class="p-eyebrow">Ambassador program</p><h2 class="p-h2">Ambassadors</h2></div>' +
      '<button type="button" class="p-btn p-btn--gold" id="addAmbBtn">+ Add ambassador</button></div>' +
      '<div class="p-stats">' +
      stat('Active ambassadors', active.length) + stat('Link clicks · 30 days', sum('clicks30')) +
      stat('Referred bookings', sum('referred'), sum('completed') + ' completed') + stat('Owed to ambassadors', usd(sum('balance')), usd(sum('paid')) + ' paid so far', true) +
      '</div>' +
      (newLink ? setupBox(newLink.name, newLink.link) : '') +
      '<form class="p-card p-form" id="addAmbForm" hidden>' +
      '<h3 class="p-card-title">New ambassador</h3>' +
      '<div class="p-grid-2">' +
      '<label>Full name<input name="name" required /></label>' +
      '<label>Email<input type="email" name="email" required /></label>' +
      '<label>Phone<input type="tel" name="phone" /></label>' +
      '<label>Link code (optional)<input name="code" placeholder="Made from first name" /></label>' +
      '<label>Commission %<input type="text" inputmode="decimal" name="commission" value="' + esc(data.defaultCommission) + '" /></label>' +
      '<label>Payout method<input name="payoutMethod" placeholder="Zelle 555-555-5555" /></label>' +
      '</div>' +
      '<label>Their clients get<select name="perk">' + options(PERKS, data.defaultPerk) + '</select></label>' +
      '<div class="p-actions"><button type="submit" class="p-btn p-btn--gold">Add and get setup link</button><button type="button" class="p-btn p-btn--ghost" id="addAmbCancel">Cancel</button></div>' +
      '</form>' +
      '<div class="p-list">' + (list.length ? list.map(ambCard).join('') : '<div class="p-empty">No ambassadors yet. Add your first one above.</div>') + '</div>';

    $('#addAmbBtn').addEventListener('click', () => { $('#addAmbForm').hidden = false; $('#addAmbForm input').focus(); });
    $('#addAmbCancel').addEventListener('click', () => { $('#addAmbForm').hidden = true; });
    $('#addAmbForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = e.target;
      try {
        const out = await post('addPerson', { role: 'ambassador', name: f.name.value, email: f.email.value, phone: f.phone.value, code: f.code.value, commission: f.commission.value, payoutMethod: f.payoutMethod.value, perk: f.perk.value });
        state.ambassadors = await get('ambassadors');
        renderAmbassadors({ name: f.name.value, link: out.setupLink });
        toast('Added with code ' + out.code);
      } catch (err) { toast(err.message, true); }
    });
  }

  function stat(label, value, note, gold) {
    return '<div class="p-stat' + (gold ? ' p-stat--gold' : '') + '"><p class="p-stat-label">' + esc(label) + '</p><p class="p-stat-value">' + esc(value) + '</p>' + (note ? '<p class="p-stat-note">' + esc(note) + '</p>' : '') + '</div>';
  }

  function setupBox(name, link) {
    const text = 'Hi ' + String(name).split(' ')[0] + ', here is your link to set up your Echelon Ambassador account: ' + link;
    return '<div class="p-setup-link"><strong>Setup link for ' + esc(name) + '</strong>' +
      '<span class="p-muted p-small">Send this to them. It works once, for 3 days. They choose their own password.</span>' +
      '<code>' + esc(link) + '</code><div class="p-actions">' +
      '<button type="button" class="p-btn p-btn--sm p-btn--gold" data-copy="' + esc(link) + '" data-copy-label="Setup link">Copy link</button>' +
      '<a class="p-btn p-btn--sm" href="sms:?&body=' + encodeURIComponent(text) + '">Text it</a></div></div>';
  }

  function ambCard(a) {
    const s = a.stats;
    const active = /^active$/i.test(a.status);
    return '<article class="p-card" data-amb="' + esc(a.email) + '">' +
      '<div class="p-card-head"><div><h3 class="p-card-title">' + esc(a.name) + '</h3>' +
      '<p class="p-card-sub">' + esc(a.email) + (a.phone ? ' · ' + esc(a.phone) : '') + '</p></div>' +
      '<div class="p-actions">' + chip(a.code, 'gold') + chip(active ? 'Active' : 'Paused', active ? 'good' : 'bad') +
      (a.hasPassword ? '' : chip('Not set up yet', 'warn')) + '</div></div>' +
      '<div class="p-mini"><span>Clicks (30d) <b>' + s.clicks30 + '</b></span><span>Referred <b>' + s.referred + '</b></span><span>Booked <b>' + s.booked + '</b></span>' +
      '<span>Completed <b>' + s.completed + '</b></span><span>Earned <b>' + usd(s.earned) + '</b></span><span>Owed <b>' + usd(s.balance) + '</b></span></div>' +
      '<div class="p-meta"><span>' + esc(a.commission) + '% commission</span><span>Clients get: ' + esc(a.perk || state.ambassadors.defaultPerk) + '</span>' + (a.payoutMethod ? '<span>Pays to: ' + esc(a.payoutMethod) + '</span>' : '') + '</div>' +
      '<div class="p-actions">' +
      (a.link ? '<button type="button" class="p-btn p-btn--sm" data-copy="' + esc(a.link) + '" data-copy-label="Referral link">Copy referral link</button>' : '') +
      '<button type="button" class="p-btn p-btn--sm" data-view-dash="' + esc(a.code) + '" data-name="' + esc(a.name) + '">View dashboard</button>' +
      '<button type="button" class="p-btn p-btn--sm" data-setup="' + esc(a.email) + '" data-name="' + esc(a.name) + '">' + (a.hasPassword ? 'Password reset link' : 'Setup link') + '</button>' +
      (s.balance > 0 ? '<button type="button" class="p-btn p-btn--sm" data-toggle="pay">Record payout</button>' : '') +
      '<button type="button" class="p-btn p-btn--sm p-btn--ghost" data-toggle="edit">Edit</button></div>' +
      '<div class="p-slot"></div>' +
      '<form class="p-form" data-form="pay" hidden><div class="p-grid-2">' +
      '<label>Amount ($)<input type="text" inputmode="decimal" name="amount" value="' + esc(s.balance) + '" /></label>' +
      '<label>Method<input name="method" value="' + esc(a.payoutMethod) + '" /></label>' +
      '<label>Note<input name="note" placeholder="e.g. October rentals" /></label></div>' +
      '<div class="p-actions"><button type="submit" class="p-btn p-btn--gold p-btn--sm">Save payout</button></div></form>' +
      '<form class="p-form" data-form="edit" hidden><div class="p-grid-2">' +
      '<label>Name<input name="name" value="' + esc(a.name) + '" /></label>' +
      '<label>Phone<input name="phone" value="' + esc(a.phone) + '" /></label>' +
      '<label>Link code<input name="code" value="' + esc(a.code) + '" /></label>' +
      '<label>Commission %<input name="commission" inputmode="decimal" value="' + esc(a.commission) + '" /></label>' +
      '<label>Payout method<input name="payoutMethod" value="' + esc(a.payoutMethod) + '" /></label>' +
      '<label>Status<select name="status">' + options(['Active', 'Paused'], active ? 'Active' : 'Paused') + '</select></label></div>' +
      '<label>Their clients get<select name="perk">' + options(PERKS.indexOf(a.perk) >= 0 || !a.perk ? PERKS : [a.perk].concat(PERKS), a.perk || state.ambassadors.defaultPerk) + '</select></label>' +
      '<p class="p-muted p-small">Changing the code breaks links they already shared.</p>' +
      '<div class="p-actions"><button type="submit" class="p-btn p-btn--gold p-btn--sm">Save changes</button></div></form>' +
      '</article>';
  }

  // Team (owner) ─────────────────────────────
  function loadTeam() { return load('team', renderTeam); }

  function renderTeam(newLink) {
    const list = state.team.team;
    $('#staffPanel').innerHTML =
      '<div class="p-toolbar"><div><p class="p-eyebrow">Access</p><h2 class="p-h2">Team</h2></div>' +
      '<button type="button" class="p-btn p-btn--gold" id="addTeamBtn">+ Add team member</button></div>' +
      '<p class="p-muted p-small"><strong>Owners</strong> see everything. <strong>Employees</strong> see Reservations and Referrals only. Ambassadors never see the CRM.</p>' +
      (newLink ? setupBox(newLink.name, newLink.link) : '') +
      '<form class="p-card p-form" id="addTeamForm" hidden><h3 class="p-card-title">New team member</h3><div class="p-grid-2">' +
      '<label>Full name<input name="name" required /></label><label>Email<input type="email" name="email" required /></label>' +
      '<label>Phone<input type="tel" name="phone" /></label><label>Role<select name="role"><option value="employee">Employee</option><option value="owner">Owner</option></select></label></div>' +
      '<div class="p-actions"><button type="submit" class="p-btn p-btn--gold">Add and get setup link</button></div></form>' +
      '<div class="p-list">' + list.map((p) => {
        const active = /^active$/i.test(p.status);
        return '<article class="p-card" data-member="' + esc(p.email) + '"><div class="p-card-head"><div>' +
          '<h3 class="p-card-title">' + esc(p.name) + (p.self ? ' <span class="p-muted p-small">(you)</span>' : '') + '</h3>' +
          '<p class="p-card-sub">' + esc(p.email) + (p.phone ? ' · ' + esc(p.phone) : '') + '</p></div>' +
          '<div class="p-actions">' + chip(p.role, p.role === 'owner' ? 'gold' : '') + chip(active ? 'Active' : 'Paused', active ? 'good' : 'bad') + (p.hasPassword ? '' : chip('Not set up yet', 'warn')) + '</div></div>' +
          '<div class="p-actions">' +
          '<button type="button" class="p-btn p-btn--sm" data-setup="' + esc(p.email) + '" data-name="' + esc(p.name) + '">' + (p.hasPassword ? 'Password reset link' : 'Setup link') + '</button>' +
          (p.self ? '' :
            '<button type="button" class="p-btn p-btn--sm" data-member-set="role" data-value="' + (p.role === 'owner' ? 'employee' : 'owner') + '">Make ' + (p.role === 'owner' ? 'employee' : 'owner') + '</button>' +
            '<button type="button" class="p-btn p-btn--sm p-btn--ghost" data-member-set="status" data-value="' + (active ? 'Paused' : 'Active') + '">' + (active ? 'Pause access' : 'Restore access') + '</button>') +
          '</div><div class="p-slot"></div></article>';
      }).join('') + '</div>';

    $('#addTeamBtn').addEventListener('click', () => { $('#addTeamForm').hidden = false; $('#addTeamForm input').focus(); });
    $('#addTeamForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = e.target;
      try {
        const out = await post('addPerson', { role: f.role.value, name: f.name.value, email: f.email.value, phone: f.phone.value });
        state.team = await get('team');
        renderTeam({ name: f.name.value, link: out.setupLink });
      } catch (err) { toast(err.message, true); }
    });
  }

  // ── Shared click / change handling in the staff panel ──
  $('#staffPanel').addEventListener('input', (e) => {
    const card = e.target.closest('.p-card');
    const btn = card && $('[data-save-res], [data-save-ref]', card);
    if (btn) { btn.disabled = false; $('.p-saved', card).textContent = ''; }
  });

  $('#staffPanel').addEventListener('click', async (e) => {
    const t = e.target;
    const filter = t.closest('[data-filter]');
    if (filter) { resFilter = filter.dataset.filter; return renderReservations(); }
    const rfilter = t.closest('[data-rfilter]');
    if (rfilter) { refFilter = rfilter.dataset.rfilter; return renderReferrals(); }

    const copyBtn = t.closest('[data-copy]');
    if (copyBtn) return copy(copyBtn.dataset.copy, copyBtn.dataset.copyLabel);

    const saveRes = t.closest('[data-save-res]');
    if (saveRes) {
      const card = saveRes.closest('.p-card');
      saveRes.disabled = true;
      const fields = { status: $('[name=status]', card).value, followUp: $('[name=followUp]', card).value, notes: $('[name=notes]', card).value };
      try {
        await post('updateReservation', Object.assign({ row: +card.dataset.row, email: card.dataset.email }, fields));
        const r = state.reservations.reservations.find((x) => x.row === +card.dataset.row);
        Object.assign(r, fields);
        $('.p-saved', card).textContent = 'Saved';
      } catch (err) { saveRes.disabled = false; toast(err.message, true); }
      return;
    }

    const saveRef = t.closest('[data-save-ref]');
    if (saveRef) {
      const card = saveRef.closest('.p-card');
      saveRef.disabled = true;
      const fields = { status: $('[name=status]', card).value, rentalTotal: $('[name=rentalTotal]', card).value, notes: $('[name=notes]', card).value };
      if (fields.status === 'Completed' && !Number(String(fields.rentalTotal).replace(/[^\d.]/g, ''))) {
        saveRef.disabled = false;
        return toast('Add the rental price so the commission can be worked out', true);
      }
      try {
        const out = await post('updateReferral', Object.assign({ row: +card.dataset.refRow, email: card.dataset.email }, fields));
        const r = state.referrals.referrals.find((x) => x.row === +card.dataset.refRow);
        Object.assign(r, fields, { commission: out.commission });
        $('.p-saved', card).textContent = out.commission ? 'Saved · commission ' + usd(out.commission) : 'Saved';
      } catch (err) { saveRef.disabled = false; toast(err.message, true); }
      return;
    }

    const setup = t.closest('[data-setup]');
    if (setup) {
      try {
        const out = await post('setupLink', { email: setup.dataset.setup });
        $('.p-slot', setup.closest('.p-card')).innerHTML = setupBox(setup.dataset.name, out.setupLink);
      } catch (err) { toast(err.message, true); }
      return;
    }

    const toggle = t.closest('[data-toggle]');
    if (toggle) {
      const form = $('[data-form="' + toggle.dataset.toggle + '"]', toggle.closest('.p-card'));
      form.hidden = !form.hidden;
      return;
    }

    const dash = t.closest('[data-view-dash]');
    if (dash) return previewDashboard(dash.dataset.viewDash, dash.dataset.name);

    const memberSet = t.closest('[data-member-set]');
    if (memberSet) {
      const email = memberSet.closest('[data-member]').dataset.member;
      const change = {}; change[memberSet.dataset.memberSet] = memberSet.dataset.value;
      try {
        await post('updatePerson', Object.assign({ email: email }, change));
        state.team = await get('team');
        renderTeam();
        toast('Updated');
      } catch (err) { toast(err.message, true); }
    }
  });

  $('#staffPanel').addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form]');
    if (!form) return;
    e.preventDefault();
    const email = form.closest('[data-amb]').dataset.amb;
    const a = state.ambassadors.ambassadors.find((x) => x.email === email);
    try {
      if (form.dataset.form === 'pay') {
        await post('recordPayout', { code: a.code, amount: form.amount.value, method: form.method.value, note: form.note.value });
        toast('Payout recorded');
      } else {
        await post('updatePerson', { email: email, name: form.name.value, phone: form.phone.value, code: form.code.value, commission: form.commission.value, payoutMethod: form.payoutMethod.value, status: form.status.value, perk: form.perk.value });
        toast('Saved');
      }
      state.ambassadors = await get('ambassadors');
      renderAmbassadors();
    } catch (err) { toast(err.message, true); }
  });

  // ── Ambassador dashboard ──
  async function loadDashboard(code) {
    const panel = $('#ambPanel');
    panel.innerHTML = '';
    loading(true);
    try {
      renderDashboard(await get('dashboard', code ? '&code=' + encodeURIComponent(code) : ''));
    } catch (e) {
      panel.innerHTML = '<div class="p-empty">' + esc(e.message) + '</div>';
    } finally { loading(false); }
  }

  function previewDashboard(code, name) {
    show('amb');
    $('#previewBar').hidden = false;
    $('#previewName').textContent = name;
    window.scrollTo(0, 0);
    loadDashboard(code);
  }

  $('#previewBack').addEventListener('click', () => {
    $('#previewBar').hidden = true;
    show('staff');
    selectTab('ambassadors');
  });

  function renderDashboard(d) {
    const a = d.ambassador, s = d.stats;
    const first = (a.name || '').split(' ')[0];
    const captions = [
      'Planning something unforgettable? Book an exotic with Echelon Exotic Rentals through my link and get ' + lowerFirst(a.perk) + ': ' + a.link,
      'Lamborghini, Rolls-Royce, G-Wagon, delivered to your door. Use my Echelon link for ' + lowerFirst(a.perk) + ' → ' + a.link,
      'Wedding, birthday or just because. Echelon Exotic Rentals makes the entrance. My link gets you ' + lowerFirst(a.perk) + ': ' + a.link,
    ];

    $('#ambPanel').innerHTML =
      '<section class="p-hero">' +
      '<div><p class="p-eyebrow">Echelon Ambassador</p><h1 class="p-title">Welcome back, ' + esc(first) + '</h1>' +
      '<p class="p-muted">Share your link. When someone books an Exotic through it, you earn <strong style="color:var(--text)">' + esc(a.commission) + '%</strong> of the rental price once the rental is complete.</p></div>' +
      '<div class="p-linkbox"><code>' + esc(a.link.replace(/^https?:\/\//, '')) + '</code>' +
      '<button type="button" class="p-btn p-btn--gold p-btn--sm" data-copy="' + esc(a.link) + '" data-copy-label="Your link">Copy link</button>' +
      (navigator.share ? '<button type="button" class="p-btn p-btn--sm" id="shareLink">Share</button>' : '') + '</div>' +
      '<div class="p-perk"><span style="color:var(--gold)">✦</span><span>Your clients get <strong>' + esc(a.perk) + '</strong>. Your code is <strong>' + esc(a.code) + '</strong> if they call or text to book.</span></div>' +
      '</section>' +

      '<div class="p-stats">' +
      stat('Balance owed to you', usd(s.balance), s.paid ? usd(s.paid) + ' paid so far' : 'Paid monthly', true) +
      stat('Total earned', usd(s.earned), s.completed + ' completed rental' + (s.completed === 1 ? '' : 's')) +
      stat('Bookings from your link', s.referred, s.booked ? s.booked + ' upcoming' : '') +
      stat('Link visits · 30 days', s.clicks30, s.clicksAll + ' all time') +
      '</div>' +

      '<section class="p-card"><h2 class="p-h2">Your referrals</h2>' +
      (d.referrals.length
        ? '<div class="p-rows">' + d.referrals.map((r) => row(
            '<strong>' + esc(r.customer) + '</strong><span>' + esc(r.vehicle || 'Any vehicle') + ' · pickup ' + esc(shortDate(r.pickup)) + '</span>',
            chip(r.paidOn ? 'Paid' : r.status, statusTone(r.paidOn ? 'paid' : r.status)) +
            '<span>' + (r.commission != null ? '<strong>' + usd(r.commission) + '</strong>' : 'after rental') + '</span>')).join('') + '</div>'
        : '<p class="p-muted">No bookings yet. Share your link to get your first one. They show up here as soon as someone books.</p>') +
      '</section>' +

      '<section class="p-card"><h2 class="p-h2">Ready-to-post captions</h2><div class="p-list">' +
      captions.map((c) => '<div class="p-caption"><p>' + esc(c) + '</p><button type="button" class="p-btn p-btn--sm" data-copy="' + esc(c) + '" data-copy-label="Caption">Copy caption</button></div>').join('') +
      '</div><p class="p-muted p-small">When you post about Echelon, add #ad or "Echelon ambassador" so followers know you\'re partnered with us. The FTC requires it.</p></section>' +

      '<section class="p-card"><h2 class="p-h2">How you earn</h2><ul class="p-rules">' +
      '<li>Anyone who opens your link is tied to you for 60 days. If they book an Exotic in that time, it\'s yours.</li>' +
      '<li>You earn ' + esc(a.commission) + '% of the rental price (not the deposit, taxes or fees) once the rental is complete and the car is back.</li>' +
      '<li>Payouts go out monthly' + (a.payoutMethod ? ' to <strong style="color:var(--text)">' + esc(a.payoutMethod) + '</strong>' : '') + '. Booking with your own link doesn\'t count.</li>' +
      '<li>Questions? Call or text 508-444-2276.</li></ul></section>' +

      (d.payouts.length ? '<section class="p-card"><h2 class="p-h2">Payout history</h2><div class="p-rows">' +
        d.payouts.map((p) => row('<strong>' + esc(shortDate(p.date)) + '</strong><span>' + esc(p.method || '—') + '</span>', '<strong>' + usd(p.amount) + '</strong>')).join('') +
        '</div></section>' : '');

    const share = $('#shareLink');
    if (share) share.addEventListener('click', () => navigator.share({ title: 'Echelon Exotic Rentals', text: 'Book an exotic with Echelon through my link and get ' + lowerFirst(a.perk) + '.', url: a.link }).catch(() => {}));
  }

  function row(left, right) {
    return '<div class="p-row"><div class="p-row-main">' + left + '</div><div class="p-row-side">' + right + '</div></div>';
  }

  function lowerFirst(s) { s = String(s || ''); return /^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s; }

  $('#ambPanel').addEventListener('click', (e) => {
    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn) copy(copyBtn.dataset.copy, copyBtn.dataset.copyLabel);
  });

  start();
})();
