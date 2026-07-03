/* ──────────────────────────────────────────
   ECHELON JET CHARTERS — TRANSLATIONS
   Page-scoped (see brand-pages.js note) — only this page's elements are
   targeted. Brand/aircraft names, prices, and contact details are
   intentionally left untranslated.
────────────────────────────────────────── */
const jetsI18n = {
  en: {
    navFleet: 'Aircraft', navReserve: 'Charter', navPricing: 'Pricing', navReviews: 'Reviews', navBtn: 'Request Flight',
    heroBadge: 'On-Demand Private Aviation · Nationwide Network',
    heroTitle: 'Skip the Terminal,<br /><span class="accent">Fly on Your Time.</span>',
    heroSubtitle: '<strong>Echelon Jet Charters</strong> arranges private flights for business, family travel, and special occasions — light jets to midsize cabins, wheels-up in hours, not days.',
    tag1: '4-Hour Notice', tag2: 'Nationwide Coverage', tag3: 'Dedicated Flight Coordinator',
    ctaFleet: 'View Aircraft', ctaReserve: 'Request a Flight',
    invTag: 'Aircraft Network', invH2: 'Available Right Now',
    invDesc: 'Access to a vetted, nationwide network of operators — every aircraft meets strict safety and maintenance standards.',
    badges: ['Available', 'Available', 'Most Requested', 'Limited'],
    types: ['Light Jet', 'Light Jet', 'Midsize Jet', 'Super-Midsize'],
    specs: ['Up to 6 Passengers · ~2,000mi Range', 'Up to 8 Passengers · ~1,970mi Range', 'Up to 9 Passengers · ~2,900mi Range', 'Up to 10 Passengers · ~3,600mi Range'],
    pills: [['Light Baggage', '4hr Notice'], ['Extra Baggage', '4hr Notice'], ['Stand-Up Cabin', '4hr Notice'], ['Coast-to-Coast', '4hr Notice']],
    perHr: '/flight hr', reserveJet: 'Request This Aircraft',
    schedTag: 'Charter', schedH2: 'Request Your Flight',
    schedDesc: "Tell us your route and passenger count — a flight coordinator will confirm aircraft and pricing within the hour.",
    fFirst: 'First Name', fLast: 'Last Name', fPhone: 'Phone Number', fEmail: 'Email Address',
    fDeparture: 'Departure City / Airport', fDestination: 'Destination City / Airport', fDate: 'Flight Date', fPassengers: 'Passengers', fInterest: 'Aircraft of Interest',
    fNotSure: 'Not Sure Yet',
    fCheck: 'I understand final pricing depends on aircraft availability and routing.',
    fSubmit: 'Request Flight', fNote: 'A flight coordinator will call within 1 hour to confirm.',
    priceTag: 'Charter Pricing', priceH2: 'Pick Your Plan',
    priceDesc: 'On-demand booking or a prepaid Jet Card — pricing scales with how often you fly.',
    tiers: [
      { name: 'On-Demand', desc: 'Pay-per-trip booking', unit: '/flight hr', feats: ['4-hour minimum notice', 'No membership required', 'Nationwide network access', 'Dedicated flight coordinator'] },
      { name: 'Jet Card (25 Hours)', desc: 'Prepaid block, locked rate', unit: '/block', feats: ['Locked hourly rate', 'Priority scheduling', 'No blackout dates', '25 flight hours included'] },
      { name: 'Corporate / Fleet', desc: 'For teams &amp; frequent travel', unit: '', feats: ['Dedicated account manager', 'Monthly invoicing', 'Multi-aircraft access', 'Volume-based rates'] },
    ],
    customLabel: 'custom', customUnit: 'Pricing',
    popular: 'Most Popular', getStarted: 'Get Started',
    priceNote: 'All prices shown are starting rates. Final price depends on aircraft, routing, and availability.',
    revTag: 'Our Clients', revH2: 'What Flyers Say',
    reviews: [
      { q: '"Needed to get to a closing 900 miles away same-day — Echelon had a Phenom wheels-up in under 3 hours."', name: 'Daniel K.', role: 'Business Client' },
      { q: '"The Jet Card has completely changed how our leadership team travels — no more layovers, no more wasted days."', name: 'Sandra L.', role: 'COO' },
      { q: '"Flew the family down for a long weekend on the Citation — smoother and honestly less stressful than driving to the airport."', name: 'Michael R.', role: 'Family Travel' },
    ],
    footerBlurb: 'On-demand private aviation for business and leisure, part of the Echelon Rental Group family.',
    footerFleetH: 'Aircraft', footerFleet: ['Light Jets', 'Midsize Jets', 'View Pricing'],
    footerBrandsH: 'Echelon Brands', footerContactH: 'Contact', footerHours: 'Mon–Sun: 7am – 9pm',
    footerCopy: '© 2026 Echelon Rental Group. All rights reserved.',
    toastTitle: 'Flight Requested!', toastBody: 'A flight coordinator will call within 1 hour.',
  },
  es: {
    navFleet: 'Aeronaves', navReserve: 'Charter', navPricing: 'Precios', navReviews: 'Reseñas', navBtn: 'Solicitar Vuelo',
    heroBadge: 'Aviación Privada Bajo Demanda · Red Nacional',
    heroTitle: 'Olvídate de la Terminal,<br /><span class="accent">Vuela Cuando Quieras.</span>',
    heroSubtitle: '<strong>Echelon Jet Charters</strong> organiza vuelos privados para negocios, viajes familiares y ocasiones especiales — desde jets ligeros hasta cabinas midsize, listos para despegar en horas, no días.',
    tag1: 'Aviso de 4 Horas', tag2: 'Cobertura Nacional', tag3: 'Coordinador de Vuelo Dedicado',
    ctaFleet: 'Ver Aeronaves', ctaReserve: 'Solicitar un Vuelo',
    invTag: 'Red de Aeronaves', invH2: 'Disponible Ahora',
    invDesc: 'Acceso a una red nacional de operadores verificados — cada aeronave cumple con estrictos estándares de seguridad y mantenimiento.',
    badges: ['Disponible', 'Disponible', 'Más Solicitado', 'Limitado'],
    types: ['Jet Ligero', 'Jet Ligero', 'Jet Midsize', 'Super-Midsize'],
    specs: ['Hasta 6 Pasajeros · Alcance de ~2,000 millas', 'Hasta 8 Pasajeros · Alcance de ~1,970 millas', 'Hasta 9 Pasajeros · Alcance de ~2,900 millas', 'Hasta 10 Pasajeros · Alcance de ~3,600 millas'],
    pills: [['Equipaje Ligero', 'Aviso de 4h'], ['Equipaje Extra', 'Aviso de 4h'], ['Cabina de Pie', 'Aviso de 4h'], ['Costa a Costa', 'Aviso de 4h']],
    perHr: '/hora de vuelo', reserveJet: 'Solicitar Esta Aeronave',
    schedTag: 'Charter', schedH2: 'Solicita Tu Vuelo',
    schedDesc: 'Cuéntanos tu ruta y número de pasajeros — un coordinador de vuelo confirmará la aeronave y el precio dentro de la hora.',
    fFirst: 'Nombre', fLast: 'Apellido', fPhone: 'Número de Teléfono', fEmail: 'Correo Electrónico',
    fDeparture: 'Ciudad / Aeropuerto de Salida', fDestination: 'Ciudad / Aeropuerto de Destino', fDate: 'Fecha del Vuelo', fPassengers: 'Pasajeros', fInterest: 'Aeronave de Interés',
    fNotSure: 'Aún No Estoy Seguro',
    fCheck: 'Entiendo que el precio final depende de la disponibilidad de la aeronave y la ruta.',
    fSubmit: 'Solicitar Vuelo', fNote: 'Un coordinador de vuelo te llamará dentro de 1 hora para confirmar.',
    priceTag: 'Precios de Charter', priceH2: 'Elige Tu Plan',
    priceDesc: 'Reserva bajo demanda o una Jet Card prepagada — el precio se ajusta según la frecuencia con la que vuelas.',
    tiers: [
      { name: 'Bajo Demanda', desc: 'Reserva por viaje', unit: '/hora de vuelo', feats: ['Aviso mínimo de 4 horas', 'Sin membresía requerida', 'Acceso a red nacional', 'Coordinador de vuelo dedicado'] },
      { name: 'Jet Card (25 Horas)', desc: 'Bloque prepagado, tarifa fija', unit: '/bloque', feats: ['Tarifa por hora fija', 'Programación prioritaria', 'Sin fechas de restricción', '25 horas de vuelo incluidas'] },
      { name: 'Corporativo / Flotilla', desc: 'Para equipos y viajes frecuentes', unit: '', feats: ['Gerente de cuenta dedicado', 'Facturación mensual', 'Acceso a múltiples aeronaves', 'Tarifas por volumen'] },
    ],
    customLabel: 'personalizado', customUnit: 'Precio',
    popular: 'Más Popular', getStarted: 'Comenzar',
    priceNote: 'Los precios mostrados son tarifas iniciales. El precio final depende de la aeronave, la ruta y la disponibilidad.',
    revTag: 'Nuestros Clientes', revH2: 'Lo Que Dicen Nuestros Pasajeros',
    reviews: [
      { q: 'Necesitaba llegar a un cierre a 900 millas el mismo día — Echelon tuvo un Phenom listo para despegar en menos de 3 horas.', name: 'Daniel K.', role: 'Cliente Corporativo' },
      { q: 'La Jet Card ha cambiado por completo cómo viaja nuestro equipo directivo — sin escalas, sin días perdidos.', name: 'Sandra L.', role: 'Directora de Operaciones' },
      { q: 'Llevé a la familia de fin de semana largo en el Citation — más cómodo y honestamente menos estresante que manejar al aeropuerto.', name: 'Michael R.', role: 'Viaje Familiar' },
    ],
    footerBlurb: 'Aviación privada bajo demanda para negocios y ocio, parte de la familia Echelon Rental Group.',
    footerFleetH: 'Aeronaves', footerFleet: ['Jets Ligeros', 'Jets Midsize', 'Ver Precios'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contacto', footerHours: 'Lun–Dom: 7am – 9pm',
    footerCopy: '© 2026 Echelon Rental Group. Todos los derechos reservados.',
    toastTitle: '¡Vuelo Solicitado!', toastBody: 'Un coordinador de vuelo te llamará dentro de 1 hora.',
  },
  pt: {
    navFleet: 'Aeronaves', navReserve: 'Charter', navPricing: 'Preços', navReviews: 'Avaliações', navBtn: 'Solicitar Voo',
    heroBadge: 'Aviação Privada Sob Demanda · Rede Nacional',
    heroTitle: 'Esqueça o Terminal,<br /><span class="accent">Voe no Seu Horário.</span>',
    heroSubtitle: 'A <strong>Echelon Jet Charters</strong> organiza voos privados para negócios, viagens em família e ocasiões especiais — de jatos leves a cabines midsize, prontos para decolar em horas, não dias.',
    tag1: 'Aviso de 4 Horas', tag2: 'Cobertura Nacional', tag3: 'Coordenador de Voo Dedicado',
    ctaFleet: 'Ver Aeronaves', ctaReserve: 'Solicitar um Voo',
    invTag: 'Rede de Aeronaves', invH2: 'Disponível Agora',
    invDesc: 'Acesso a uma rede nacional de operadores verificados — cada aeronave atende a rígidos padrões de segurança e manutenção.',
    badges: ['Disponível', 'Disponível', 'Mais Procurado', 'Limitado'],
    types: ['Jato Leve', 'Jato Leve', 'Jato Midsize', 'Super-Midsize'],
    specs: ['Até 6 Passageiros · Alcance de ~2.000 milhas', 'Até 8 Passageiros · Alcance de ~1.970 milhas', 'Até 9 Passageiros · Alcance de ~2.900 milhas', 'Até 10 Passageiros · Alcance de ~3.600 milhas'],
    pills: [['Bagagem Leve', 'Aviso de 4h'], ['Bagagem Extra', 'Aviso de 4h'], ['Cabine em Pé', 'Aviso de 4h'], ['Costa a Costa', 'Aviso de 4h']],
    perHr: '/hora de voo', reserveJet: 'Solicitar Esta Aeronave',
    schedTag: 'Charter', schedH2: 'Solicite Seu Voo',
    schedDesc: 'Diga-nos sua rota e número de passageiros — um coordenador de voo confirmará a aeronave e o preço dentro de uma hora.',
    fFirst: 'Nome', fLast: 'Sobrenome', fPhone: 'Telefone', fEmail: 'E-mail',
    fDeparture: 'Cidade / Aeroporto de Partida', fDestination: 'Cidade / Aeroporto de Destino', fDate: 'Data do Voo', fPassengers: 'Passageiros', fInterest: 'Aeronave de Interesse',
    fNotSure: 'Ainda Não Sei',
    fCheck: 'Entendo que o preço final depende da disponibilidade da aeronave e da rota.',
    fSubmit: 'Solicitar Voo', fNote: 'Um coordenador de voo ligará em até 1 hora para confirmar.',
    priceTag: 'Preços de Charter', priceH2: 'Escolha Seu Plano',
    priceDesc: 'Reserva sob demanda ou um Jet Card pré-pago — o preço varia conforme a frequência com que você voa.',
    tiers: [
      { name: 'Sob Demanda', desc: 'Reserva por viagem', unit: '/hora de voo', feats: ['Aviso mínimo de 4 horas', 'Sem assinatura necessária', 'Acesso à rede nacional', 'Coordenador de voo dedicado'] },
      { name: 'Jet Card (25 Horas)', desc: 'Pacote pré-pago, tarifa fixa', unit: '/pacote', feats: ['Tarifa horária fixa', 'Agendamento prioritário', 'Sem datas de restrição', '25 horas de voo incluídas'] },
      { name: 'Corporativo / Frota', desc: 'Para equipes e viagens frequentes', unit: '', feats: ['Gerente de conta dedicado', 'Faturamento mensal', 'Acesso a múltiplas aeronaves', 'Tarifas por volume'] },
    ],
    customLabel: 'personalizado', customUnit: 'Preço',
    popular: 'Mais Popular', getStarted: 'Começar',
    priceNote: 'Os preços exibidos são tarifas iniciais. O preço final depende da aeronave, rota e disponibilidade.',
    revTag: 'Nossos Clientes', revH2: 'O Que Dizem Nossos Passageiros',
    reviews: [
      { q: 'Precisava chegar a um fechamento de contrato a 900 milhas no mesmo dia — a Echelon tinha um Phenom pronto para decolar em menos de 3 horas.', name: 'Daniel K.', role: 'Cliente Corporativo' },
      { q: 'O Jet Card mudou completamente como nossa liderança viaja — sem escalas, sem dias perdidos.', name: 'Sandra L.', role: 'Diretora de Operações' },
      { q: 'Levei a família para um fim de semana prolongado no Citation — mais tranquilo e honestamente menos estressante do que dirigir até o aeroporto.', name: 'Michael R.', role: 'Viagem em Família' },
    ],
    footerBlurb: 'Aviação privada sob demanda para negócios e lazer, parte da família Echelon Rental Group.',
    footerFleetH: 'Aeronaves', footerFleet: ['Jatos Leves', 'Jatos Midsize', 'Ver Preços'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contato', footerHours: 'Seg–Dom: 7h – 21h',
    footerCopy: '© 2026 Echelon Rental Group. Todos os direitos reservados.',
    toastTitle: 'Voo Solicitado!', toastBody: 'Um coordenador de voo ligará em até 1 hora.',
  },
};

let currentLang = localStorage.getItem('echelon-lang') || 'en';

function applyLang(lang) {
  const t = jetsI18n[lang] || jetsI18n.en;
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
    if (specEl && t.specs[i]) specEl.textContent = t.specs[i];
    const unitEl = card.querySelector('.car-price-unit');
    if (unitEl) unitEl.textContent = t.perHr;
    const pillEls = card.querySelectorAll('.car-specs span');
    (t.pills[i] || []).forEach((txt, j) => { if (pillEls[j]) pillEls[j].textContent = txt; });
    const btnEl = card.querySelector('.btn-book');
    if (btnEl) btnEl.textContent = t.reserveJet;
  });

  setText('#schedule .section-tag', t.schedTag);
  setText('#schedule .section-header h2', t.schedH2);
  setText('#schedule .section-header p', t.schedDesc);
  const formLabels = $$('#schedule .form-group label');
  const labelMap = [t.fFirst, t.fLast, t.fPhone, t.fEmail, t.fDeparture, t.fDestination, t.fDate, t.fPassengers, t.fInterest];
  formLabels.forEach((el, i) => { if (labelMap[i]) el.textContent = labelMap[i]; });

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
    card.querySelector('.pricing-card-header p').innerHTML = tier.desc;
    const fromEl = card.querySelector('.p-from');
    const priceEl = card.querySelector('.p-price');
    const unitEl = card.querySelector('.p-unit');
    if (i === 2) {
      if (fromEl) fromEl.textContent = t.customLabel;
      if (priceEl) priceEl.textContent = t.customUnit;
      if (unitEl) unitEl.textContent = '';
    } else if (unitEl) {
      unitEl.textContent = tier.unit;
    }
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
