/* ──────────────────────────────────────────
   ECHELON MEMBER AREA (/member)
   Loaded by portal.html; portal-app.js calls MemberApp.enter() once a member
   signs in. Data and the concierge come from /api/member.
     Home      card, standing, next drive, what the concierge remembers
     My Drives reservations in every division with the member's email
     Concierge AI chat that drafts requests; a person on the team confirms
     Requests  what the member asked for and the team's replies
────────────────────────────────────────── */
(function () {
  const $ = (sel, root) => (root || document).querySelector(sel);

  const ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 16v-3l2-5h14l2 5v3"/><path d="M3 16h18v2H3z"/><circle cx="7" cy="16" r="1.6"/><circle cx="17" cy="16" r="1.6"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/></svg>',
  };
  const TABS = [['home', 'Home', 'home'], ['drives', 'My Drives', 'car'], ['concierge', 'Concierge', 'chat'], ['requests', 'Requests', 'inbox']];
  const CHIPS = ['Same as last time', 'What can I drive this weekend?', 'Airport pickup', 'Plan a special night'];
  const HISTORY_SENT = 10;     // recent chat turns sent with each message

  let me, h, data = null, tab = 'home', chat = [], busy = false, timer = null;
  let esc;

  function store(key, val) { try { sessionStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ } }
  function restore(key) { try { return JSON.parse(sessionStorage.getItem(key) || 'null'); } catch (e) { return null; } }
  const chatKey = () => 'memberChat:' + me.email;

  const api = (body) => h.request('/api/member', { method: 'POST', body: JSON.stringify(body) });

  async function refresh(quiet) {
    if (!quiet) h.loading(true);
    try {
      data = await h.request('/api/member');
      render();
    } catch (e) {
      if (!quiet) $('#memberView').innerHTML = '<div class="p-empty">' + esc(e.message) + '</div>';
    } finally { if (!quiet) h.loading(false); }
  }

  function enter(user, helpers) {
    me = user; h = helpers; esc = helpers.esc;
    chat = restore(chatKey()) || [];
    try { tab = sessionStorage.getItem('memberTab') || 'home'; } catch (e) { /* ignore */ }
    if (!TABS.some((t) => t[0] === tab)) tab = 'home';
    refresh();
    clearInterval(timer);
    // Team replies show up without a reload.
    timer = setInterval(() => { if (!document.hidden && !$('#memberView').hidden && !busy) refresh(true); }, 45000);
  }

  function setTab(t) {
    tab = t;
    try { sessionStorage.setItem('memberTab', t); } catch (e) { /* ignore */ }
    render();
    window.scrollTo(0, 0);
    if (t === 'concierge') { const i = $('#mChatInput'); if (i && window.matchMedia('(min-width: 821px)').matches) i.focus(); }
  }

  // ── Render ──
  function render() {
    if (!data) return;
    const open = data.requests.filter((r) => r.status === 'New' || r.status === 'In Progress').length;
    const view = { home: home, drives: drives, concierge: concierge, requests: requests }[tab]();
    $('#memberView').innerHTML =
      '<div class="m-shell"><nav class="m-side" aria-label="Member menu">' +
      TABS.map((t) => '<button type="button" class="m-nav" data-mtab="' + t[0] + '"' + (t[0] === tab ? ' aria-current="page"' : '') + '>' + ICON[t[2]] +
        '<span>' + t[1] + '</span>' + (t[0] === 'requests' && open ? '<span class="m-count">' + open + '</span>' : '') + '</button>').join('') +
      '<div class="m-side-foot">Your concierge: <b>' + esc(data.member.concierge) + '</b><br>Text 508-444-2276 any time.</div></nav>' +
      '<div class="m-main">' + view + '</div></div>';
    if (tab === 'concierge') { const m = $('#mMsgs'); if (m) m.scrollTop = m.scrollHeight; }
  }

  function greeting() {
    const hr = new Date().getHours();
    return hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
  }

  function cardHtml(m) {
    return '<div class="m-card" role="img" aria-label="Echelon ' + esc(m.tier) + ' member card' + (m.no ? ', Member number ' + esc(m.no) : '') + '">' +
      '<div class="m-card-top"><span class="m-card-brand">ECHELON</span><span class="m-card-tier">' + esc(m.tier) + '</span></div>' +
      (m.no ? '<div class="m-card-no">MEMBER Nº<b>' + esc(m.no) + '</b></div>'
        : '<div class="m-card-no">MEMBER Nº<b class="m-card-pending">— — — —</b><small>Issued after your first completed booking</small></div>') +
      '<div class="m-card-name"><b>' + esc(m.name) + '</b><span>' + (m.joined ? 'Since ' + esc(sinceText(m.joined)) : '') + '</span></div></div>';
  }

  function sinceText(v) {
    const d = new Date(v);
    return isNaN(d) ? v : d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  // Tier rules from members.html: Silver after the first completed booking; Black at three
  // completed bookings (or $10,000 / the Full Echelon within 12 months); Upper Echelon by invitation.
  function standing(m, done) {
    if (m.tier === 'Upper Echelon') return { note: 'The highest tier. Thank you for being here.', pct: 100 };
    if (m.tier === 'Black') return { note: 'Upper Echelon is by invitation only.', pct: 100 };
    if (m.tier === 'Silver') return { next: 'Black', note: Math.min(done, 3) + ' of 3 completed bookings toward Black (or $10,000, or the Full Echelon, within 12 months).', pct: Math.min(done, 3) / 3 * 100 };
    return { next: 'Silver', note: 'Your first completed booking makes you Silver and issues your Member Nº.', pct: done ? 100 : 0 };
  }

  function dateChip(d) {
    const day = d.day ? new Date(d.day + 'T12:00:00') : null;
    return '<div class="m-date">' + (day ? '<b>' + day.getDate() + '</b><span>' + day.toLocaleDateString('en-US', { month: 'short' }) + '</span>' : '<b>—</b><span>TBD</span>') + '</div>';
  }

  function driveWhen(d) {
    const fmt = (v) => { const x = new Date(String(v).length === 10 ? v + 'T12:00:00' : v); return isNaN(x) ? v : x.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }); };
    return (d.pickup ? fmt(d.pickup) : 'Date to confirm') + (d.returnDate && d.returnDate !== d.pickup ? ' – ' + fmt(d.returnDate) : '');
  }

  function statusChip(s) {
    const tone = /complete|confirm/i.test(s) ? 'good' : /book/i.test(s) ? 'info' : /new|request|contact/i.test(s) ? 'gold' : '';
    return '<span class="p-chip' + (tone ? ' p-chip--' + tone : '') + '">' + esc(s) + '</span>';
  }

  function home() {
    const m = data.member, d = data.drives, st = standing(m, d.completed), next = d.upcoming[0];
    const replies = data.requests.filter((r) => r.reply).slice(0, 2);
    return '<p class="p-eyebrow">' + (m.no ? 'Member Nº ' + esc(m.no) : 'Echelon Members') + '</p>' +
      '<h1 class="m-title">' + greeting() + ', ' + esc(m.firstName) + '.</h1>' +
      '<p class="m-lede">Your membership in one place, with your concierge a message away.</p>' +
      '<div class="m-grid">' +
      '<div class="m-stack">' + cardHtml(m) +
      '<section class="m-panel"><h2 class="m-sec">Your standing</h2>' +
      '<div class="m-standing"><span><b>' + d.completed + '</b> completed booking' + (d.completed === 1 ? '' : 's') + '</span>' + (st.next ? '<span>Next: <span class="m-tier">' + st.next + '</span></span>' : '') + '</div>' +
      '<div class="m-progress"><i style="width:' + st.pct + '%"></i></div><p class="p-muted p-small">' + esc(st.note) + '</p>' +
      '<p class="p-small"><a href="/members#tiers" class="m-link">See every tier and perk</a></p></section></div>' +
      '<div class="m-stack">' +
      (next ? '<section class="m-panel m-next"><p class="p-eyebrow">Next drive</p><div class="m-next-car">' + esc(next.vehicle || next.division) + '</div>' +
        '<dl class="m-kv"><dt>When</dt><dd>' + esc(driveWhen(next)) + '</dd>' + (next.where ? '<dt>Where</dt><dd>' + esc(next.where) + '</dd>' : '') + '<dt>Status</dt><dd>' + statusChip(next.status) + '</dd></dl>' +
        '<div class="p-actions"><button type="button" class="p-btn p-btn--gold p-btn--sm" data-mtab="concierge">Message your concierge</button></div></section>'
        : '<section class="m-panel m-next"><p class="p-eyebrow">Next drive</p><div class="m-next-car">Nothing booked yet</div>' +
        '<p class="p-muted p-small">Tell your concierge what you have in mind and the team will arrange it.</p>' +
        '<div class="p-actions" style="margin-top:12px"><button type="button" class="p-btn p-btn--gold p-btn--sm" data-mtab="concierge">Plan something</button></div></section>') +
      (replies.length ? '<section class="m-panel"><h2 class="m-sec">Latest from the team</h2>' + replies.map((r) =>
        '<div class="m-reply"><b>' + esc(r.handler || 'Echelon') + ' · ' + esc(r.what) + '</b>' + esc(r.reply) + '</div>').join('') + '</section>' : '') +
      prefsPanel() + '</div></div>';
  }

  function prefsPanel() {
    const p = data.member.prefs;
    return '<section class="m-panel"><h2 class="m-sec">What your concierge remembers</h2><div class="m-prefs">' +
      (p.length ? p.map((x, i) => '<span class="m-pref">' + esc(x) + '<button type="button" data-forget="' + i + '" aria-label="Forget ' + esc(x) + '">×</button></span>').join('')
        : '<span class="p-muted p-small">Nothing yet. As you chat and drive with us, your concierge will suggest things worth remembering.</span>') +
      '</div><p class="p-muted p-small" style="margin-top:12px">You\'re in control: remove anything and it\'s forgotten. The team sees the same list.</p></section>';
  }

  function driveRow(d, past) {
    return '<div class="m-drive">' + dateChip(d) + '<div><div class="m-drive-car">' + esc(d.vehicle || d.division) + '</div>' +
      '<div class="m-drive-meta">' + esc(d.division) + ' · ' + esc(driveWhen(d)) + (d.where ? ' · ' + esc(d.where) : '') + '</div></div>' +
      (past ? '<button type="button" class="p-btn p-btn--sm" data-again="' + esc(d.vehicle || d.division) + '">Book again</button>' : statusChip(d.status)) + '</div>';
  }

  function drives() {
    const d = data.drives;
    return '<p class="p-eyebrow">My Drives</p><h1 class="m-title">Your drives</h1>' +
      '<p class="m-lede">Upcoming reservations and everything you\'ve booked with us, across every Echelon division.</p>' +
      '<div class="m-stack"><section class="m-panel"><h2 class="m-sec">Upcoming</h2>' +
      (d.upcoming.length ? d.upcoming.map((x) => driveRow(x, false)).join('') : '<p class="p-muted p-small">Nothing upcoming. <button type="button" class="p-link" data-mtab="concierge">Ask your concierge</button></p>') + '</section>' +
      '<section class="m-panel"><h2 class="m-sec">Past</h2>' +
      (d.past.length ? d.past.map((x) => driveRow(x, true)).join('') : '<p class="p-muted p-small">Your past bookings will show here.</p>') + '</section>' +
      '<p class="p-muted p-small">Booked under a different email? Text 508-444-2276 and we\'ll link it to your membership.</p></div>';
  }

  function concierge() {
    const first = data.member.firstName;
    const hello = greeting() + ', ' + first + '. How can I help? A drive, a chauffeur, a night out, a charter, just say the word.';
    return '<div class="m-chat"><div class="m-chat-head"><span class="m-seal">E</span><div><b>Echelon Concierge</b>' +
      '<small><span class="m-online"></span>AI-assisted · ' + esc(data.member.concierge === 'the Echelon team' ? 'the team' : data.member.concierge) + ' confirms every booking</small></div>' +
      (chat.length ? '<button type="button" class="p-link m-chat-clear" data-clear>New chat</button>' : '') + '</div>' +
      '<div class="m-msgs" id="mMsgs" aria-live="polite"><div class="m-msg m-msg--ai">' + esc(hello) + '</div>' +
      chat.map(msgHtml).join('') + (busy ? '<div class="m-typing" aria-label="Concierge is typing"><i></i><i></i><i></i></div>' : '') + '</div>' +
      '<div class="m-chips">' + CHIPS.map((c) => '<button type="button" class="m-chip" data-say="' + esc(c) + '">' + esc(c) + '</button>').join('') + '</div>' +
      '<form class="m-composer" id="mComposer"><input id="mChatInput" autocomplete="off" maxlength="1500" placeholder="Ask for anything: a car, a table, a time…" aria-label="Message your concierge" />' +
      '<button class="p-btn p-btn--gold p-btn--sm" type="submit"' + (busy ? ' disabled' : '') + '>Send</button></form>' +
      '<p class="m-disclose">Your concierge is an AI that knows your bookings and preferences. Prices, availability and bookings are always confirmed by a person on the Echelon team.</p></div>';
  }

  function msgHtml(m, i) {
    if (m.role === 'draft') {
      const sent = m.ref ? data.requests.find((r) => r.ref === m.ref) : null;
      const rows = [['What', m.draft.what], ['When', m.draft.when], ['Where', m.draft.where], ['Extras', m.draft.extras]];
      return '<div class="m-draft"><h4>Request for the team</h4><dl class="m-kv">' + rows.map((r) => '<dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd>').join('') + '</dl>' +
        '<div class="p-actions">' + (m.ref ? statusChip(sent ? sent.label : 'Sent to the team')
          : '<button type="button" class="p-btn p-btn--gold p-btn--sm" data-send="' + i + '">Send to ' + esc(data.member.concierge === 'the Echelon team' ? 'the team' : data.member.concierge) + '</button>' +
            '<button type="button" class="p-btn p-btn--sm" data-change>Change something</button>') + '</div></div>' +
        (sent && sent.reply ? '<div class="m-msg m-msg--team"><span>' + esc(sent.handler || 'Echelon') + ' · Echelon team</span>' + esc(sent.reply) + '</div>' : '');
    }
    if (m.role === 'remember') {
      return m.done ? '' : '<div class="m-remember">Remember “' + esc(m.text) + '” for next time?' +
        '<button type="button" class="p-link" data-remember="' + i + '">Yes, remember</button><button type="button" class="p-link" data-skip="' + i + '">No thanks</button></div>';
    }
    return '<div class="m-msg m-msg--' + (m.role === 'user' ? 'me' : 'ai') + '">' + esc(m.content) + '</div>';
  }

  function requests() {
    const list = data.requests;
    return '<p class="p-eyebrow">Requests</p><h1 class="m-title">Your requests</h1>' +
      '<p class="m-lede">Everything you\'ve asked for and where it stands. Replies come from a person on the team.</p>' +
      '<section class="m-panel">' + (list.length ? list.map((r) =>
        '<div class="m-req"><div class="m-req-head"><b>' + esc(r.what) + '</b>' + statusChip(r.label) + '</div>' +
        '<div class="m-drive-meta">' + esc(r.when) + ' · ' + esc(r.where) + (r.extras && r.extras !== '—' ? ' · ' + esc(r.extras) : '') + '</div>' +
        (r.reply ? '<div class="m-reply"><b>' + esc(r.handler || 'Echelon') + ':</b> ' + esc(r.reply) + '</div>' : '') + '</div>').join('')
        : '<p class="p-muted">No requests yet. <button type="button" class="p-link" data-mtab="concierge">Ask your concierge for anything.</button></p>') + '</section>';
  }

  // ── Concierge ──
  function saveChat() { store(chatKey(), chat.slice(-40)); }

  async function say(text) {
    text = String(text || '').trim();
    if (!text || busy) return;
    chat.push({ role: 'user', content: text });
    busy = true; saveChat(); render();
    try {
      const history = chat.filter((m) => m.role === 'user' || m.role === 'assistant').slice(-HISTORY_SENT)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
      const out = await api({ action: 'chat', messages: history });
      chat.push({ role: 'assistant', content: out.text });
      if (out.draft) chat.push({ role: 'draft', draft: out.draft, ask: text });
      if (out.remember) chat.push({ role: 'remember', text: out.remember });
    } catch (e) {
      chat.push({ role: 'assistant', content: e.message || 'Something went wrong. Please try again.' });
    } finally {
      busy = false; saveChat(); render();
      const i = $('#mChatInput'); if (i && window.matchMedia('(min-width: 821px)').matches) i.focus();
    }
  }

  async function savePrefs(next, msg) {
    try {
      const out = await api({ action: 'setPrefs', prefs: next });
      data.member.prefs = out.prefs;
      render();
      h.toast(msg);
    } catch (e) { h.toast(e.message, true); }
  }

  // ── Events ──
  document.addEventListener('click', async (e) => {
    if (!$('#memberView') || $('#memberView').hidden || !e.target.closest('#memberView')) return;
    const t = e.target.closest('button');
    if (!t) return;
    const d = t.dataset;
    if (d.mtab) return setTab(d.mtab);
    if (d.say) { if (tab !== 'concierge') setTab('concierge'); return say(d.say); }
    if (d.again) { setTab('concierge'); return say('I\'d like the ' + d.again + ' again.'); }
    if (d.clear !== undefined) { chat = []; saveChat(); return render(); }
    if (d.change !== undefined) { const i = $('#mChatInput'); i.value = 'Change: '; i.focus(); return; }
    if (d.send !== undefined) {
      const m = chat[+d.send];
      if (!m || m.ref || t.disabled) return;
      t.disabled = true;
      try {
        const out = await api({ action: 'sendRequest', draft: m.draft, ask: m.ask });
        m.ref = out.ref;
        const who = data.member.concierge === 'the Echelon team' ? 'the team' : data.member.concierge;
        chat.push({ role: 'assistant', content: 'Done. I\'ve passed this to ' + who + ', who will confirm with you here, usually within the hour. You can follow it under Requests.' });
        saveChat();
        await refresh(true);
        h.toast('Request sent to the team');
      } catch (err) { t.disabled = false; h.toast(err.message, true); }
      return;
    }
    if (d.remember !== undefined || d.skip !== undefined) {
      const m = chat[+(d.remember !== undefined ? d.remember : d.skip)];
      if (!m) return;
      m.done = true; saveChat();
      if (d.remember !== undefined) return savePrefs(data.member.prefs.concat([m.text]), 'Saved to what your concierge remembers');
      return render();
    }
    if (d.forget !== undefined) {
      const next = data.member.prefs.slice(); next.splice(+d.forget, 1);
      return savePrefs(next, 'Forgotten');
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.id !== 'mComposer') return;
    e.preventDefault();
    const i = $('#mChatInput');
    const v = i.value;
    i.value = '';
    say(v);
  });

  window.MemberApp = { enter: enter };
})();
