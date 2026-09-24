/* ═══════════════════════════════════════════════════════
   Echelon Concierge — AI chat widget (bottom-right corner)
   Talks to /api/chat. Styles live in styles.css under
   "CHAT WIDGET". Follows the site language (echelon-lang).
═══════════════════════════════════════════════════════ */
(function () {
  const API_URL = '/api/chat';
  const STORE_KEY = 'echelon-chat';
  const MAX_CHARS = 1500;

  const STRINGS = {
    en: {
      launcher: 'Chat with the Echelon Concierge',
      title: 'Echelon Concierge',
      status: 'AI assistant · Online 24/7',
      close: 'Close chat',
      placeholder: 'Ask about cars, pricing, delivery…',
      send: 'Send',
      welcome: "Welcome to Echelon Exotics. I can help with our fleet, rates, deposits, delivery, and rental policies. What can I help you with?",
      suggestions: ['What are your rental requirements?', 'Which cars seat 5 or more?', 'Do you deliver to Boston Logan?'],
      foot: 'AI answers can make mistakes. To book, call or text',
      error: "Sorry, I couldn't reach our concierge. Please call or text 508-444-2276, any time.",
    },
    es: {
      launcher: 'Chatea con el Concierge de Echelon',
      title: 'Concierge Echelon',
      status: 'Asistente IA · En línea 24/7',
      close: 'Cerrar chat',
      placeholder: 'Pregunta por autos, precios, entrega…',
      send: 'Enviar',
      welcome: 'Bienvenido a Echelon Exotics. Puedo ayudarte con nuestra flota, tarifas, depósitos, entrega y políticas de alquiler. ¿En qué te puedo ayudar?',
      suggestions: ['¿Cuáles son los requisitos para alquilar?', '¿Qué autos tienen 5 asientos o más?', '¿Entregan en el aeropuerto Logan de Boston?'],
      foot: 'Las respuestas de IA pueden tener errores. Para reservar, llama o escribe al',
      error: 'Lo sentimos, no pudimos conectar con el concierge. Llama o escribe al 508-444-2276, a cualquier hora.',
    },
    pt: {
      launcher: 'Converse com o Concierge Echelon',
      title: 'Concierge Echelon',
      status: 'Assistente IA · Online 24/7',
      close: 'Fechar chat',
      placeholder: 'Pergunte sobre carros, preços, entrega…',
      send: 'Enviar',
      welcome: 'Bem-vindo à Echelon Exotics. Posso ajudar com nossa frota, tarifas, depósitos, entrega e políticas de aluguel. Como posso ajudar?',
      suggestions: ['Quais são os requisitos para alugar?', 'Quais carros têm 5 lugares ou mais?', 'Vocês entregam no aeroporto Logan de Boston?'],
      foot: 'Respostas de IA podem conter erros. Para reservar, ligue ou envie mensagem para',
      error: 'Desculpe, não conseguimos falar com o concierge. Ligue ou envie mensagem para 508-444-2276, a qualquer hora.',
    },
  };

  const lang = () => {
    try { return STRINGS[localStorage.getItem('echelon-lang')] ? localStorage.getItem('echelon-lang') : 'en'; }
    catch { return 'en'; }
  };
  const t = () => STRINGS[lang()];

  // Conversation survives page reloads within the same browser tab.
  let history = [];
  try { history = JSON.parse(sessionStorage.getItem(STORE_KEY)) || []; } catch { history = []; }
  const save = () => { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(history.slice(-30))); } catch {} };

  let busy = false;

  /* ── Build the widget ── */
  const root = document.createElement('div');
  root.className = 'ec-chat';
  root.innerHTML = `
    <section class="ec-chat-panel" id="ecChatPanel" role="dialog" aria-modal="false" aria-labelledby="ecChatTitle" hidden>
      <header class="ec-chat-header">
        <span class="ec-chat-avatar" aria-hidden="true">E</span>
        <div class="ec-chat-heading">
          <strong id="ecChatTitle"></strong>
          <span class="ec-chat-status"><span class="ec-chat-dot" aria-hidden="true"></span><span data-t="status"></span></span>
        </div>
        <button type="button" class="ec-chat-close" data-t-label="close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>
      <div class="ec-chat-log" aria-live="polite"></div>
      <div class="ec-chat-suggestions"></div>
      <form class="ec-chat-form">
        <textarea class="ec-chat-input" rows="1" maxlength="${MAX_CHARS}" aria-label="Message"></textarea>
        <button type="submit" class="ec-chat-send" data-t-label="send">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
        </button>
      </form>
      <p class="ec-chat-foot"><span data-t="foot"></span> <a href="tel:+15084442276">508-444-2276</a></p>
    </section>
    <button type="button" class="ec-chat-launcher" aria-controls="ecChatPanel" aria-expanded="false">
      <svg class="ec-chat-icon-open" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12c0 4.1-3.6 7.5-8 7.5-1.2 0-2.3-.2-3.3-.6L4 20l1.2-3.6C4.4 15.1 4 13.6 4 12c0-4.1 3.6-7.5 8-7.5s8 3.4 8 7.5z"/></svg>
      <svg class="ec-chat-icon-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>`;
  document.body.appendChild(root);

  const panel = root.querySelector('.ec-chat-panel');
  const launcher = root.querySelector('.ec-chat-launcher');
  const log = root.querySelector('.ec-chat-log');
  const suggestions = root.querySelector('.ec-chat-suggestions');
  const form = root.querySelector('.ec-chat-form');
  const input = root.querySelector('.ec-chat-input');
  const sendBtn = root.querySelector('.ec-chat-send');

  /* ── Safe, minimal formatting for replies: links, bold, bullets ── */
  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const SAFE_URL = /^(tel:\+?[\d-]+|mailto:[^\s]+|https:\/\/[^\s]+|[a-z0-9-]+\.html(#[\w-]+)?)$/i;
  function format(text) {
    return escapeHtml(text)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, url) => {
        const u = url.replace(/&amp;/g, '&');
        if (!SAFE_URL.test(u)) return label;
        const ext = u.startsWith('https://') ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${escapeHtml(u)}"${ext}>${label}</a>`;
      })
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/^\s*[-*]\s+/gm, '• ')
      .replace(/\n/g, '<br>');
  }

  function addBubble(role, text) {
    const el = document.createElement('div');
    el.className = `ec-chat-msg ec-chat-msg--${role}`;
    if (role === 'user') el.textContent = text;
    else el.innerHTML = format(text);
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function render() {
    const s = t();
    root.querySelector('#ecChatTitle').textContent = s.title;
    root.querySelectorAll('[data-t]').forEach((el) => { el.textContent = s[el.dataset.t]; });
    root.querySelectorAll('[data-t-label]').forEach((el) => el.setAttribute('aria-label', s[el.dataset.tLabel]));
    launcher.setAttribute('aria-label', s.launcher);
    input.placeholder = s.placeholder;

    log.innerHTML = '';
    addBubble('assistant', s.welcome);
    history.forEach((m) => addBubble(m.role, m.content));

    suggestions.innerHTML = '';
    suggestions.hidden = history.length > 0;
    s.suggestions.forEach((q) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'ec-chat-chip';
      chip.textContent = q;
      chip.addEventListener('click', () => send(q));
      suggestions.appendChild(chip);
    });
  }

  function setOpen(open) {
    panel.hidden = !open;
    root.classList.toggle('is-open', open);
    launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      log.scrollTop = log.scrollHeight;
      if (window.matchMedia('(pointer: fine)').matches) input.focus();
    }
  }

  async function send(text) {
    text = text.trim().slice(0, MAX_CHARS);
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    suggestions.hidden = true;
    input.value = '';
    autosize();

    history.push({ role: 'user', content: text });
    save();
    addBubble('user', text);

    const bubble = addBubble('assistant', '');
    bubble.classList.add('is-typing');
    bubble.innerHTML = '<span class="ec-chat-typing"><i></i><i></i><i></i></span>';

    let reply = '';
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, lang: lang() }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        bubble.classList.remove('is-typing');
        bubble.innerHTML = format(reply);
        log.scrollTop = log.scrollHeight;
      }
      reply = reply.trim();
      if (!reply) throw new Error('Empty reply');
      history.push({ role: 'assistant', content: reply });
      save();
    } catch {
      bubble.classList.remove('is-typing');
      bubble.classList.add('ec-chat-msg--error');
      bubble.innerHTML = format(t().error);
      // Drop the unanswered question so a retry sends a clean conversation.
      history.pop();
      save();
    } finally {
      busy = false;
      sendBtn.disabled = false;
    }
  }

  function autosize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  }

  /* ── Events ── */
  launcher.addEventListener('click', () => setOpen(panel.hidden));
  root.querySelector('.ec-chat-close').addEventListener('click', () => { setOpen(false); launcher.focus(); });
  form.addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });
  input.addEventListener('input', autosize);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(input.value); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) { setOpen(false); launcher.focus(); }
  });
  // Re-label the widget when the visitor switches the site language.
  document.querySelectorAll('.lang-option').forEach((btn) => btn.addEventListener('click', () => setTimeout(render, 0)));

  render();
})();
