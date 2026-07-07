/* ──────────────────────────────────────────
   ECHELON BOAT CHARTERS — TRANSLATIONS
   Page-scoped (see brand-pages.js note) — only this page's elements are
   targeted. Brand/product names, marina names, prices, and contact
   details are intentionally left untranslated.
────────────────────────────────────────── */
const boatsI18n = {
  en: {
    navFleet: 'Fleet', navReserve: 'Charter', navPricing: 'Pricing', navReviews: 'Reviews', navBtn: 'Book Charter',
    heroBadge: 'Private Charters · Captained &amp; Bareboat Available',
    heroTitle: 'Your Day on the Water,<br /><span class="accent">Perfected.</span>',
    heroSubtitle: 'From half-day sunset cruises to full-day offshore charters, <strong>Echelon Boat Charters</strong> connects you with well-maintained boats and experienced captains up and down the coast.',
    tag1: 'Captained or Bareboat', tag2: 'Fuel Included', tag3: 'No License Required*',
    ctaFleet: 'View the Fleet', ctaReserve: 'Book a Charter',
    invTag: 'Charter Fleet', invH2: 'Available Right Now',
    invDesc: 'Every boat is inspected, fueled, and ready to launch — captained options include a licensed, experienced captain.',
    badges: ['Available', 'Most Requested', 'Available', 'Limited'],
    types: ['Captained', 'Captained', 'Bareboat', 'Bareboat'],
    specs: ['Up to 6 Guests · Fishing or Cruising', 'Up to 12 Guests · Sunset &amp; Private Events', 'Up to 8 Guests · No License Required With Captain', 'Up to 10 Guests · Calm-Water Family Cruising'],
    pills: [['Fishing Gear', 'Captain Included'], ['Event-Ready', 'Captain Included'], ['Day Cruising', 'Captain Add-On'], ['Family Friendly', 'Captain Add-On']],
    perHalfDay: '/half-day', perFullDay: '/full-day', reserveBoat: 'Reserve This Boat',
    contactPricing: 'Contact Us for Pricing',
    schedTag: 'Book', schedH2: 'Schedule Your Charter',
    schedDesc: "Tell us your dates and how many guests are joining — we'll confirm the right boat and captain within the hour.",
    fFirst: 'First Name', fLast: 'Last Name', fPhone: 'Phone Number', fEmail: 'Email Address',
    fDeparture: 'Departure Location', fDate: 'Charter Date', fDuration: 'Duration', fParty: 'Party Size', fInterest: 'Boat of Interest',
    durations: ['Half-Day (4 hrs)', 'Full-Day (8 hrs)', 'Multi-Day / Weekend'],
    fNotSure: 'Not Sure Yet',
    fCheck: 'I understand a licensed captain is required unless I hold a valid boating certification.',
    fSubmit: 'Request Charter', fNote: "We'll call you within 1 hour to confirm and arrange dockage.",
    priceTag: 'Charter Pricing', priceH2: 'Pick Your Plan',
    priceDesc: 'Fuel, safety gear, and dockage assistance included — no hidden fees, whichever boat you choose.',
    tiers: [
      { name: 'Half-Day', desc: '4 hours on the water', unit: '/charter', feats: ['Fuel included up to 20mi', 'Captain optional add-on', 'Safety gear included', 'Free cancellation (48hr notice)'] },
      { name: 'Full-Day', desc: '8 hours, plenty of time to explore', unit: '/charter', feats: ['Fuel included up to 40mi', 'Cooler &amp; safety gear included', 'Priority boat selection', 'Dedicated dockmaster support'] },
      { name: 'Multi-Day / Weekend', desc: 'Extended charters &amp; getaways', unit: '/weekend', feats: ['Dockage assistance included', 'Provisioning concierge available', 'Captain strongly recommended', 'Flexible departure windows'] },
    ],
    popular: 'Most Popular', getStarted: 'Get Started',
    priceNote: 'Pricing varies by holiday, season, departure location, and charter length — contact us for an accurate quote. Refundable damage deposit required.',
    revTag: 'Our Clients', revH2: 'What Guests Say',
    reviews: [
      { q: '"Chartered the 45\' for my parents\' anniversary — captain knew all the best spots for sunset. Worth every penny."', name: 'Rebecca T.', role: 'Anniversary Charter' },
      { q: '"First time renting a boat without owning one — the bareboat checkout process was quick and the pontoon was perfect for the kids."', name: 'James O.', role: 'Family Cruise' },
      { q: '"Went offshore on the center console with a great captain, came back with striped bass for dinner. Booking was easy end to end."', name: 'Kevin M.', role: 'Fishing Charter' },
    ],
    footerBlurb: 'Captained and bareboat boat charters up and down the coast, part of the Echelon Rental Group family.',
    footerFleetH: 'Fleet', footerFleet: ['Center Consoles', 'Motor Yachts', 'View Pricing'],
    footerBrandsH: 'Echelon Brands', footerContactH: 'Contact', footerHours: 'Mon–Sun: 7am – 9pm',
    footerCopy: '© 2026 Echelon Rental Group. All rights reserved.',
    toastTitle: 'Charter Requested!', toastBody: "We'll call you within 1 hour to confirm.",
  },
  es: {
    navFleet: 'Flota', navReserve: 'Reservar', navPricing: 'Precios', navReviews: 'Reseñas', navBtn: 'Reservar Charter',
    heroBadge: 'Charters Privados · Con Capitán o Sin Capitán',
    heroTitle: 'Tu Día en el Agua,<br /><span class="accent">Perfeccionado.</span>',
    heroSubtitle: 'Desde cruceros de medio día al atardecer hasta charters de día completo mar adentro, <strong>Echelon Boat Charters</strong> te conecta con embarcaciones bien mantenidas y capitanes experimentados a lo largo de la costa.',
    tag1: 'Con o Sin Capitán', tag2: 'Combustible Incluido', tag3: 'No Requiere Licencia*',
    ctaFleet: 'Ver la Flota', ctaReserve: 'Reservar un Charter',
    invTag: 'Flota de Charter', invH2: 'Disponible Ahora',
    invDesc: 'Cada embarcación es inspeccionada, cargada de combustible y lista para zarpar — las opciones con capitán incluyen un capitán con licencia y experiencia.',
    badges: ['Disponible', 'Más Solicitado', 'Disponible', 'Limitado'],
    types: ['Con Capitán', 'Con Capitán', 'Sin Capitán', 'Sin Capitán'],
    specs: ['Hasta 6 Invitados · Pesca o Paseo', 'Hasta 12 Invitados · Atardeceres y Eventos Privados', 'Hasta 8 Invitados · No Requiere Licencia con Capitán', 'Hasta 10 Invitados · Paseo Familiar en Aguas Tranquilas'],
    pills: [['Equipo de Pesca', 'Capitán Incluido'], ['Lista para Eventos', 'Capitán Incluido'], ['Paseo Diurno', 'Capitán Opcional'], ['Ideal para Familias', 'Capitán Opcional']],
    perHalfDay: '/medio día', perFullDay: '/día completo', reserveBoat: 'Reservar Esta Embarcación',
    contactPricing: 'Contáctenos para Cotización',
    schedTag: 'Reservar', schedH2: 'Programa Tu Charter',
    schedDesc: 'Cuéntanos tus fechas y cuántos invitados vienen — confirmaremos la embarcación y el capitán adecuados dentro de la hora.',
    fFirst: 'Nombre', fLast: 'Apellido', fPhone: 'Número de Teléfono', fEmail: 'Correo Electrónico',
    fDeparture: 'Lugar de Salida', fDate: 'Fecha del Charter', fDuration: 'Duración', fParty: 'Tamaño del Grupo', fInterest: 'Embarcación de Interés',
    durations: ['Medio Día (4 hrs)', 'Día Completo (8 hrs)', 'Varios Días / Fin de Semana'],
    fNotSure: 'Aún No Estoy Seguro',
    fCheck: 'Entiendo que se requiere un capitán con licencia a menos que tenga una certificación de navegación válida.',
    fSubmit: 'Solicitar Charter', fNote: 'Te llamaremos dentro de 1 hora para confirmar y coordinar el atraque.',
    priceTag: 'Precios de Charter', priceH2: 'Elige Tu Plan',
    priceDesc: 'Combustible, equipo de seguridad y asistencia de atraque incluidos — sin cargos ocultos, sin importar la embarcación que elijas.',
    tiers: [
      { name: 'Medio Día', desc: '4 horas en el agua', unit: '/charter', feats: ['Combustible incluido hasta 20 millas', 'Capitán opcional como extra', 'Equipo de seguridad incluido', 'Cancelación gratuita (aviso de 48 hrs)'] },
      { name: 'Día Completo', desc: '8 horas, tiempo de sobra para explorar', unit: '/charter', feats: ['Combustible incluido hasta 40 millas', 'Nevera y equipo de seguridad incluidos', 'Selección prioritaria de embarcación', 'Soporte dedicado del muelle'] },
      { name: 'Varios Días / Fin de Semana', desc: 'Charters extendidos y escapadas', unit: '/fin de semana', feats: ['Asistencia de atraque incluida', 'Conserjería de aprovisionamiento disponible', 'Se recomienda encarecidamente capitán', 'Horarios de salida flexibles'] },
    ],
    popular: 'Más Popular', getStarted: 'Comenzar',
    priceNote: 'El precio varía según el día festivo, la temporada, el lugar de salida y la duración del charter — contáctenos para una cotización exacta. Se requiere depósito por daños reembolsable.',
    revTag: 'Nuestros Clientes', revH2: 'Lo Que Dicen Nuestros Invitados',
    reviews: [
      { q: 'Reservamos el de 45 pies para el aniversario de mis padres — el capitán conocía los mejores lugares para el atardecer. Valió cada centavo.', name: 'Rebecca T.', role: 'Charter de Aniversario' },
      { q: 'Primera vez que alquilo un bote sin ser dueño — el proceso sin capitán fue rápido y el pontón fue perfecto para los niños.', name: 'James O.', role: 'Paseo Familiar' },
      { q: 'Salimos mar adentro en la lancha con un gran capitán, volvimos con lubinas para la cena. Reservar fue fácil de principio a fin.', name: 'Kevin M.', role: 'Charter de Pesca' },
    ],
    footerBlurb: 'Charters de embarcaciones con o sin capitán a lo largo de la costa, parte de la familia Echelon Rental Group.',
    footerFleetH: 'Flota', footerFleet: ['Lanchas', 'Yates a Motor', 'Ver Precios'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contacto', footerHours: 'Lun–Dom: 7am – 9pm',
    footerCopy: '© 2026 Echelon Rental Group. Todos los derechos reservados.',
    toastTitle: '¡Charter Solicitado!', toastBody: 'Te llamaremos dentro de 1 hora para confirmar.',
  },
  pt: {
    navFleet: 'Frota', navReserve: 'Reservar', navPricing: 'Preços', navReviews: 'Avaliações', navBtn: 'Reservar Charter',
    heroBadge: 'Charters Privados · Com ou Sem Capitão',
    heroTitle: 'Seu Dia na Água,<br /><span class="accent">Aperfeiçoado.</span>',
    heroSubtitle: 'De cruzeiros de meio dia ao pôr do sol a charters de dia inteiro em alto-mar, a <strong>Echelon Boat Charters</strong> conecta você a barcos bem cuidados e capitães experientes por toda a costa.',
    tag1: 'Com ou Sem Capitão', tag2: 'Combustível Incluído', tag3: 'Sem Necessidade de Habilitação*',
    ctaFleet: 'Ver a Frota', ctaReserve: 'Reservar um Charter',
    invTag: 'Frota de Charter', invH2: 'Disponível Agora',
    invDesc: 'Cada barco é inspecionado, abastecido e pronto para navegar — as opções com capitão incluem um capitão habilitado e experiente.',
    badges: ['Disponível', 'Mais Procurado', 'Disponível', 'Limitado'],
    types: ['Com Capitão', 'Com Capitão', 'Sem Capitão', 'Sem Capitão'],
    specs: ['Até 6 Convidados · Pesca ou Passeio', 'Até 12 Convidados · Pôr do Sol e Eventos Privados', 'Até 8 Convidados · Sem Habilitação com Capitão', 'Até 10 Convidados · Passeio Familiar em Águas Calmas'],
    pills: [['Equipamento de Pesca', 'Capitão Incluído'], ['Pronto para Eventos', 'Capitão Incluído'], ['Passeio Diurno', 'Capitão Opcional'], ['Ideal para Famílias', 'Capitão Opcional']],
    perHalfDay: '/meio dia', perFullDay: '/dia inteiro', reserveBoat: 'Reservar Este Barco',
    contactPricing: 'Entre em Contato para Cotação',
    schedTag: 'Reservar', schedH2: 'Agende Seu Charter',
    schedDesc: 'Diga-nos suas datas e quantos convidados vêm — confirmaremos o barco e o capitão certos dentro de uma hora.',
    fFirst: 'Nome', fLast: 'Sobrenome', fPhone: 'Telefone', fEmail: 'E-mail',
    fDeparture: 'Local de Partida', fDate: 'Data do Charter', fDuration: 'Duração', fParty: 'Tamanho do Grupo', fInterest: 'Barco de Interesse',
    durations: ['Meio Dia (4 hrs)', 'Dia Inteiro (8 hrs)', 'Vários Dias / Fim de Semana'],
    fNotSure: 'Ainda Não Sei',
    fCheck: 'Entendo que é necessário um capitão habilitado, a menos que eu tenha uma certificação de navegação válida.',
    fSubmit: 'Solicitar Charter', fNote: 'Ligaremos em até 1 hora para confirmar e organizar a atracação.',
    priceTag: 'Preços de Charter', priceH2: 'Escolha Seu Plano',
    priceDesc: 'Combustível, equipamento de segurança e assistência de atracação incluídos — sem taxas ocultas, seja qual for o barco escolhido.',
    tiers: [
      { name: 'Meio Dia', desc: '4 horas na água', unit: '/charter', feats: ['Combustível incluído até 20 milhas', 'Capitão opcional como adicional', 'Equipamento de segurança incluído', 'Cancelamento gratuito (aviso de 48h)'] },
      { name: 'Dia Inteiro', desc: '8 horas, tempo de sobra para explorar', unit: '/charter', feats: ['Combustível incluído até 40 milhas', 'Cooler e equipamento de segurança incluídos', 'Seleção prioritária de barco', 'Suporte dedicado da marina'] },
      { name: 'Vários Dias / Fim de Semana', desc: 'Charters estendidos e escapadas', unit: '/fim de semana', feats: ['Assistência de atracação incluída', 'Concierge de abastecimento disponível', 'Capitão fortemente recomendado', 'Horários de partida flexíveis'] },
    ],
    popular: 'Mais Popular', getStarted: 'Começar',
    priceNote: 'O preço varia de acordo com feriado, época do ano, local de partida e duração do charter — entre em contato conosco para uma cotação precisa. Depósito de danos reembolsável é exigido.',
    revTag: 'Nossos Clientes', revH2: 'O Que Dizem Nossos Convidados',
    reviews: [
      { q: 'Reservamos o de 45 pés para o aniversário de casamento dos meus pais — o capitão conhecia os melhores lugares para o pôr do sol. Valeu cada centavo.', name: 'Rebecca T.', role: 'Charter de Aniversário' },
      { q: 'Primeira vez alugando um barco sem ser dono — o processo sem capitão foi rápido e o pontoon foi perfeito para as crianças.', name: 'James O.', role: 'Passeio em Família' },
      { q: 'Fomos ao alto-mar na lancha com um ótimo capitão, voltamos com robalos para o jantar. Reservar foi fácil do início ao fim.', name: 'Kevin M.', role: 'Charter de Pesca' },
    ],
    footerBlurb: 'Charters de barcos com ou sem capitão por toda a costa, parte da família Echelon Rental Group.',
    footerFleetH: 'Frota', footerFleet: ['Lanchas', 'Iates a Motor', 'Ver Preços'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contato', footerHours: 'Seg–Dom: 7h – 21h',
    footerCopy: '© 2026 Echelon Rental Group. Todos os direitos reservados.',
    toastTitle: 'Charter Solicitado!', toastBody: 'Ligaremos em até 1 hora para confirmar.',
  },
};

let currentLang = localStorage.getItem('echelon-lang') || 'en';

function applyLang(lang) {
  const t = boatsI18n[lang] || boatsI18n.en;
  currentLang = lang;
  localStorage.setItem('echelon-lang', lang);

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  const setText = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
  const setHTML = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  document.querySelectorAll('#langLabel').forEach(el => el.textContent = lang.toUpperCase());
  document.querySelectorAll('.lang-option').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));

  const navLabels = [t.navFleet, t.navReserve, t.navPricing, t.navReviews];
  document.querySelectorAll('.nav-links li a').forEach((el, i) => { if (navLabels[i]) el.textContent = navLabels[i]; });
  document.querySelectorAll('.mobile-menu > a:not(.btn)').forEach((el, i) => { if (navLabels[i]) el.textContent = navLabels[i]; });
  document.querySelectorAll('.nav-actions .btn-primary, .mobile-menu .btn-primary').forEach(el => el.textContent = t.navBtn);

  setHTML('.hero-badge', `<span class="badge-dot"></span>${t.heroBadge}`);
  setHTML('.hero-title', t.heroTitle);
  setHTML('.hero-subtitle', t.heroSubtitle);
  const tags = $$('.hero-platforms .platform-tag');
  [t.tag1, t.tag2, t.tag3].forEach((txt, i) => { if (tags[i]) tags[i].textContent = txt; });
  const heroCtas = $$('.hero-content .cta-actions .btn');
  if (heroCtas[0]) heroCtas[0].textContent = t.ctaFleet;
  if (heroCtas[1]) heroCtas[1].textContent = t.ctaReserve;

  setText('#inventory .section-tag', t.invTag);
  setText('#inventory .section-header h2', t.invH2);
  setText('#inventory .section-header p', t.invDesc);

  const cards = $$('#inventory .inventory-card');
  cards.forEach((card, i) => {
    const badgeEl = card.querySelector('.car-available, .car-popular-badge');
    if (badgeEl && t.badges[i]) badgeEl.textContent = t.badges[i];
    const typeEl = card.querySelector('.car-type-badge');
    if (typeEl && t.types[i]) typeEl.textContent = t.types[i];
    const specEl = card.querySelector('.car-year');
    if (specEl && t.specs[i]) specEl.innerHTML = t.specs[i];
    const contactEl = card.querySelector('.car-price-contact');
    if (contactEl) contactEl.textContent = t.contactPricing;
    const pillEls = card.querySelectorAll('.car-specs span');
    (t.pills[i] || []).forEach((txt, j) => { if (pillEls[j]) pillEls[j].textContent = txt; });
    const btnEl = card.querySelector('.btn-book');
    if (btnEl) btnEl.textContent = t.reserveBoat;
  });

  setText('#schedule .section-tag', t.schedTag);
  setText('#schedule .section-header h2', t.schedH2);
  setText('#schedule .section-header p', t.schedDesc);
  const formLabels = $$('#schedule .form-group label');
  const labelMap = [t.fFirst, t.fLast, t.fPhone, t.fEmail, t.fDeparture, t.fDate, t.fDuration, t.fParty, t.fInterest];
  formLabels.forEach((el, i) => { if (labelMap[i]) el.textContent = labelMap[i]; });

  const durationSel = document.querySelector('select[name=duration]');
  if (durationSel) t.durations.forEach((txt, i) => { if (durationSel.options[i]) durationSel.options[i].text = txt; });
  const interestSel = $('#interestField');
  if (interestSel) { const last = interestSel.options[interestSel.options.length - 1]; if (last) last.text = t.fNotSure; }

  const checkLabel = $('#schedule .checkbox-label');
  if (checkLabel) { const input = checkLabel.querySelector('input'); checkLabel.textContent = ''; if (input) checkLabel.appendChild(input); checkLabel.append(' ' + t.fCheck); }
  setText('#schedule button[type=submit]', t.fSubmit);
  setText('#schedule .modal-note', t.fNote);

  setText('#pricing .section-tag', t.priceTag);
  setText('#pricing .section-header h2', t.priceH2);
  setText('#pricing .section-header p', t.priceDesc);
  const priceCards = $$('.pricing-card');
  priceCards.forEach((card, i) => {
    const tier = t.tiers[i];
    if (!tier) return;
    card.querySelector('.pricing-card-header h3').textContent = tier.name;
    card.querySelector('.pricing-card-header p').textContent = tier.desc;
    const quoteEl = card.querySelector('.p-quote');
    if (quoteEl) quoteEl.textContent = t.contactPricing;
    const feats = card.querySelectorAll('.pricing-features li');
    tier.feats.forEach((txt, j) => { if (feats[j]) feats[j].innerHTML = '✓ ' + txt; });
    const btn = card.querySelector('.btn');
    if (btn) btn.textContent = t.getStarted;
    const tag = card.querySelector('.pricing-popular-tag');
    if (tag) tag.textContent = t.popular;
  });
  setText('.pricing-note', t.priceNote);

  setText('#reviews .section-tag', t.revTag);
  setText('#reviews .section-header h2', t.revH2);
  const revCards = $$('.testimonial-card');
  revCards.forEach((card, i) => {
    const r = t.reviews[i];
    if (!r) return;
    card.querySelector('p').textContent = r.q;
    card.querySelector('.testimonial-author strong').textContent = r.name;
    card.querySelector('.testimonial-author span').textContent = r.role;
  });

  setText('.footer-brand p', t.footerBlurb);
  const footerHeads = $$('.footer-links h4');
  if (footerHeads[0]) footerHeads[0].textContent = t.footerFleetH;
  if (footerHeads[1]) footerHeads[1].textContent = t.footerBrandsH;
  if (footerHeads[2]) footerHeads[2].textContent = t.footerContactH;
  const fleetLinks = footerHeads[0] && footerHeads[0].parentElement.querySelectorAll('a');
  if (fleetLinks) t.footerFleet.forEach((txt, i) => { if (fleetLinks[i]) fleetLinks[i].textContent = txt; });
  setText('.footer-hours', t.footerHours);
  setText('.footer-bottom p', t.footerCopy);

  setText('#toast strong', t.toastTitle);
  setText('#toast p', t.toastBody);
}

applyLang(currentLang);
