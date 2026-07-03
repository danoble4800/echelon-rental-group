/* ──────────────────────────────────────────
   ECHELON EXPERIENCES — TRANSLATIONS
   Page-scoped (see brand-pages.js note) — only this page's elements are
   targeted. Brand/package names, prices, and contact details are
   intentionally left untranslated.
────────────────────────────────────────── */
const experiencesI18n = {
  en: {
    navFleet: 'Packages', navReserve: 'Plan Yours', navPricing: 'Pricing', navReviews: 'Reviews', navBtn: 'Plan My Experience',
    heroBadge: 'Curated Adventures · Guided or Self-Drive',
    heroTitle: "Don't Just Rent It.<br /><span class=\"accent\">Experience It.</span>",
    heroSubtitle: '<strong>Echelon Experiences</strong> pairs our exotic cars, boats, and jets with guided itineraries — coastal drives, island-hopping days, and once-in-a-lifetime celebrations, planned for you.',
    tag1: 'Fully Planned', tag2: 'Photography Add-On', tag3: 'Custom Itineraries',
    ctaFleet: 'View Packages', ctaReserve: 'Plan My Experience',
    invTag: 'Signature Packages', invH2: 'Available Right Now',
    invDesc: 'Every experience is planned end-to-end — the vehicle, the route, and the reservations are handled for you.',
    badges: ['Available', 'Most Requested', 'Available', 'Limited'],
    types: ['Half-Day', 'Evening', 'Evening', 'Multi-Day'],
    specs: ['Guided Drive · Lunch Stop Included · Up to 2 Guests/Car', '4-Hour Private Cruise · Catered Dinner · Up to 10 Guests', '30-Min Scenic Flight · Reserved Dinner · Up to 4 Guests', 'Exotic Car + Charter + Photography · Fully Customizable'],
    pills: [['Rotating Exotic', 'Lunch Included'], ['Catered Dinner', 'Sunset Timing'], ['Partner Aircraft', 'Reserved Table'], ['Photography', 'Fully Custom']],
    perExp: '/experience', fromLabel: '/from', planThis: 'Plan This Experience',
    schedTag: 'Plan', schedH2: 'Plan Your Experience',
    schedDesc: "Tell us what you're celebrating and when — an experience planner will build your itinerary within the hour.",
    fFirst: 'First Name', fLast: 'Last Name', fPhone: 'Phone Number', fEmail: 'Email Address',
    fExperience: 'Experience', fDate: 'Date', fParty: 'Party Size',
    fNotSure: 'Not Sure Yet',
    fCheck: 'I understand pricing and availability are confirmed by an experience planner before booking.',
    fSubmit: 'Request This Experience', fNote: 'An experience planner will call within 1 hour to confirm.',
    priceTag: 'Package Pricing', priceH2: 'Pick Your Tier',
    priceDesc: 'Every tier includes full planning and coordination — you show up, we handle the rest.',
    tiers: [
      { name: 'Essentials', desc: 'One signature experience', unit: '/experience', feats: ['One signature experience', 'Standard scheduling window', 'Dedicated day-of coordinator', 'Free rescheduling (72hr notice)'] },
      { name: 'Signature', desc: 'Priority dates &amp; photography', unit: '/experience', feats: ['Priority date selection', 'Complimentary photography add-on', 'Custom itinerary tweaks', 'Dedicated experience planner'] },
      { name: 'Bespoke', desc: 'Fully custom, multi-day', unit: '', feats: ['Fully custom multi-day itinerary', 'Combines cars, boats &amp; jets', 'Dedicated experience planner', 'On-site coordination team'] },
    ],
    customLabel: 'custom', customUnit: 'Pricing',
    popular: 'Most Popular', getStarted: 'Get Started',
    priceNote: 'All prices shown are starting rates. Final price depends on package selected and customizations.',
    revTag: 'Our Clients', revH2: 'What Guests Say',
    reviews: [
      { q: '"Booked the Coastal Supercar Drive for our anniversary — the planning, the car, the lunch spot, all handled. Best gift I\'ve ever given my husband."', name: 'Nicole F.', role: 'Anniversary Gift' },
      { q: '"The Milestone Package for my son\'s graduation was seamless — Echelon coordinated everything so we just showed up and enjoyed it."', name: 'Robert H.', role: 'Graduation Celebration' },
      { q: '"Sunset Yacht &amp; Dinner exceeded expectations — the catering alone was restaurant-quality."', name: 'Ana C.', role: 'Sunset Yacht &amp; Dinner' },
    ],
    footerBlurb: 'Curated adventures pairing our exotic cars, boats, and jets with fully planned itineraries, part of the Echelon Rental Group family.',
    footerFleetH: 'Packages', footerFleet: ['Coastal Drives', 'Celebrations', 'View Pricing'],
    footerBrandsH: 'Echelon Brands', footerContactH: 'Contact', footerHours: 'Mon–Sun: 7am – 9pm',
    footerCopy: '© 2026 Echelon Rental Group. All rights reserved.',
    toastTitle: 'Experience Requested!', toastBody: 'An experience planner will call within 1 hour.',
  },
  es: {
    navFleet: 'Paquetes', navReserve: 'Planifica', navPricing: 'Precios', navReviews: 'Reseñas', navBtn: 'Planificar Mi Experiencia',
    heroBadge: 'Aventuras Curadas · Guiadas o Autoconducidas',
    heroTitle: 'No Solo lo Alquiles.<br /><span class="accent">Vívelo.</span>',
    heroSubtitle: '<strong>Echelon Experiences</strong> combina nuestros autos exóticos, embarcaciones y jets con itinerarios guiados — paseos costeros, días de isla en isla y celebraciones únicas, planeadas para ti.',
    tag1: 'Totalmente Planeado', tag2: 'Fotografía Incluida como Extra', tag3: 'Itinerarios Personalizados',
    ctaFleet: 'Ver Paquetes', ctaReserve: 'Planificar Mi Experiencia',
    invTag: 'Paquetes Exclusivos', invH2: 'Disponible Ahora',
    invDesc: 'Cada experiencia se planea de principio a fin — el vehículo, la ruta y las reservaciones están a cargo nuestro.',
    badges: ['Disponible', 'Más Solicitado', 'Disponible', 'Limitado'],
    types: ['Medio Día', 'Noche', 'Noche', 'Varios Días'],
    specs: ['Paseo Guiado · Almuerzo Incluido · Hasta 2 Invitados/Auto', 'Crucero Privado de 4 Horas · Cena con Catering · Hasta 10 Invitados', 'Vuelo Panorámico de 30 Min · Cena Reservada · Hasta 4 Invitados', 'Auto Exótico + Charter + Fotografía · Totalmente Personalizable'],
    pills: [['Exótico Rotativo', 'Almuerzo Incluido'], ['Cena con Catering', 'Horario de Atardecer'], ['Aeronave Asociada', 'Mesa Reservada'], ['Fotografía', 'Totalmente Personalizado']],
    perExp: '/experiencia', fromLabel: '/desde', planThis: 'Planificar Esta Experiencia',
    schedTag: 'Planificar', schedH2: 'Planifica Tu Experiencia',
    schedDesc: 'Cuéntanos qué estás celebrando y cuándo — un planificador de experiencias armará tu itinerario dentro de la hora.',
    fFirst: 'Nombre', fLast: 'Apellido', fPhone: 'Número de Teléfono', fEmail: 'Correo Electrónico',
    fExperience: 'Experiencia', fDate: 'Fecha', fParty: 'Tamaño del Grupo',
    fNotSure: 'Aún No Estoy Seguro',
    fCheck: 'Entiendo que el precio y la disponibilidad serán confirmados por un planificador de experiencias antes de reservar.',
    fSubmit: 'Solicitar Esta Experiencia', fNote: 'Un planificador de experiencias te llamará dentro de 1 hora para confirmar.',
    priceTag: 'Precios de Paquetes', priceH2: 'Elige Tu Nivel',
    priceDesc: 'Cada nivel incluye planificación y coordinación completas — tú solo apareces, nosotros nos encargamos del resto.',
    tiers: [
      { name: 'Esenciales', desc: 'Una experiencia exclusiva', unit: '/experiencia', feats: ['Una experiencia exclusiva', 'Ventana de programación estándar', 'Coordinador dedicado el día del evento', 'Reprogramación gratuita (aviso de 72 hrs)'] },
      { name: 'Exclusivo', desc: 'Fechas prioritarias y fotografía', unit: '/experiencia', feats: ['Selección prioritaria de fecha', 'Fotografía de cortesía como extra', 'Ajustes personalizados de itinerario', 'Planificador de experiencias dedicado'] },
      { name: 'A Medida', desc: 'Totalmente personalizado, varios días', unit: '', feats: ['Itinerario de varios días totalmente personalizado', 'Combina autos, embarcaciones y jets', 'Planificador de experiencias dedicado', 'Equipo de coordinación en el lugar'] },
    ],
    customLabel: 'personalizado', customUnit: 'Precio',
    popular: 'Más Popular', getStarted: 'Comenzar',
    priceNote: 'Los precios mostrados son tarifas iniciales. El precio final depende del paquete seleccionado y las personalizaciones.',
    revTag: 'Nuestros Clientes', revH2: 'Lo Que Dicen Nuestros Invitados',
    reviews: [
      { q: 'Reservamos el Coastal Supercar Drive para nuestro aniversario — la planificación, el auto, el lugar del almuerzo, todo resuelto. El mejor regalo que le he dado a mi esposo.', name: 'Nicole F.', role: 'Regalo de Aniversario' },
      { q: 'El Milestone Package para la graduación de mi hijo fue perfecto — Echelon coordinó todo para que solo llegáramos y lo disfrutáramos.', name: 'Robert H.', role: 'Celebración de Graduación' },
      { q: 'Sunset Yacht & Dinner superó las expectativas — el catering por sí solo fue de calidad de restaurante.', name: 'Ana C.', role: 'Sunset Yacht & Dinner' },
    ],
    footerBlurb: 'Aventuras exclusivas que combinan nuestros autos exóticos, embarcaciones y jets con itinerarios totalmente planeados, parte de la familia Echelon Rental Group.',
    footerFleetH: 'Paquetes', footerFleet: ['Paseos Costeros', 'Celebraciones', 'Ver Precios'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contacto', footerHours: 'Lun–Dom: 7am – 9pm',
    footerCopy: '© 2026 Echelon Rental Group. Todos los derechos reservados.',
    toastTitle: '¡Experiencia Solicitada!', toastBody: 'Un planificador de experiencias te llamará dentro de 1 hora.',
  },
  pt: {
    navFleet: 'Pacotes', navReserve: 'Planeje', navPricing: 'Preços', navReviews: 'Avaliações', navBtn: 'Planejar Minha Experiência',
    heroBadge: 'Aventuras Selecionadas · Guiadas ou Auto-Dirigidas',
    heroTitle: 'Não Apenas Alugue.<br /><span class="accent">Viva a Experiência.</span>',
    heroSubtitle: 'A <strong>Echelon Experiences</strong> combina nossos carros exóticos, barcos e jatos com roteiros guiados — passeios costeiros, dias de ilha em ilha e celebrações únicas, planejados para você.',
    tag1: 'Totalmente Planejado', tag2: 'Fotografia como Adicional', tag3: 'Roteiros Personalizados',
    ctaFleet: 'Ver Pacotes', ctaReserve: 'Planejar Minha Experiência',
    invTag: 'Pacotes Exclusivos', invH2: 'Disponível Agora',
    invDesc: 'Cada experiência é planejada do início ao fim — o veículo, a rota e as reservas ficam por nossa conta.',
    badges: ['Disponível', 'Mais Procurado', 'Disponível', 'Limitado'],
    types: ['Meio Dia', 'Noite', 'Noite', 'Vários Dias'],
    specs: ['Passeio Guiado · Almoço Incluído · Até 2 Convidados/Carro', 'Cruzeiro Privado de 4 Horas · Jantar com Buffet · Até 10 Convidados', 'Voo Panorâmico de 30 Min · Jantar Reservado · Até 4 Convidados', 'Carro Exótico + Charter + Fotografia · Totalmente Personalizável'],
    pills: [['Exótico Rotativo', 'Almoço Incluído'], ['Jantar com Buffet', 'Horário do Pôr do Sol'], ['Aeronave Parceira', 'Mesa Reservada'], ['Fotografia', 'Totalmente Personalizado']],
    perExp: '/experiência', fromLabel: '/a partir de', planThis: 'Planejar Esta Experiência',
    schedTag: 'Planejar', schedH2: 'Planeje Sua Experiência',
    schedDesc: 'Diga-nos o que está comemorando e quando — um planejador de experiências montará seu roteiro dentro de uma hora.',
    fFirst: 'Nome', fLast: 'Sobrenome', fPhone: 'Telefone', fEmail: 'E-mail',
    fExperience: 'Experiência', fDate: 'Data', fParty: 'Tamanho do Grupo',
    fNotSure: 'Ainda Não Sei',
    fCheck: 'Entendo que o preço e a disponibilidade serão confirmados por um planejador de experiências antes da reserva.',
    fSubmit: 'Solicitar Esta Experiência', fNote: 'Um planejador de experiências ligará em até 1 hora para confirmar.',
    priceTag: 'Preços de Pacotes', priceH2: 'Escolha Seu Nível',
    priceDesc: 'Todo nível inclui planejamento e coordenação completos — você só aparece, nós cuidamos do resto.',
    tiers: [
      { name: 'Essencial', desc: 'Uma experiência exclusiva', unit: '/experiência', feats: ['Uma experiência exclusiva', 'Janela de agendamento padrão', 'Coordenador dedicado no dia', 'Reagendamento gratuito (aviso de 72h)'] },
      { name: 'Assinatura', desc: 'Datas prioritárias e fotografia', unit: '/experiência', feats: ['Seleção prioritária de data', 'Fotografia cortesia como adicional', 'Ajustes personalizados de roteiro', 'Planejador de experiências dedicado'] },
      { name: 'Sob Medida', desc: 'Totalmente personalizado, vários dias', unit: '', feats: ['Roteiro de vários dias totalmente personalizado', 'Combina carros, barcos e jatos', 'Planejador de experiências dedicado', 'Equipe de coordenação no local'] },
    ],
    customLabel: 'personalizado', customUnit: 'Preço',
    popular: 'Mais Popular', getStarted: 'Começar',
    priceNote: 'Os preços exibidos são tarifas iniciais. O preço final depende do pacote selecionado e das personalizações.',
    revTag: 'Nossos Clientes', revH2: 'O Que Dizem Nossos Convidados',
    reviews: [
      { q: 'Reservamos o Coastal Supercar Drive para o nosso aniversário — o planejamento, o carro, o local do almoço, tudo resolvido. O melhor presente que já dei ao meu marido.', name: 'Nicole F.', role: 'Presente de Aniversário' },
      { q: 'O Milestone Package para a formatura do meu filho foi perfeito — a Echelon coordenou tudo para que só chegássemos e aproveitássemos.', name: 'Robert H.', role: 'Celebração de Formatura' },
      { q: 'Sunset Yacht & Dinner superou as expectativas — o buffet sozinho já tinha qualidade de restaurante.', name: 'Ana C.', role: 'Sunset Yacht & Dinner' },
    ],
    footerBlurb: 'Aventuras selecionadas combinando nossos carros exóticos, barcos e jatos com roteiros totalmente planejados, parte da família Echelon Rental Group.',
    footerFleetH: 'Pacotes', footerFleet: ['Passeios Costeiros', 'Celebrações', 'Ver Preços'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contato', footerHours: 'Seg–Dom: 7h – 21h',
    footerCopy: '© 2026 Echelon Rental Group. Todos os direitos reservados.',
    toastTitle: 'Experiência Solicitada!', toastBody: 'Um planejador de experiências ligará em até 1 hora.',
  },
};

let currentLang = localStorage.getItem('echelon-lang') || 'en';

function applyLang(lang) {
  const t = experiencesI18n[lang] || experiencesI18n.en;
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
    if (unitEl) unitEl.textContent = (i === 3 ? t.fromLabel : t.perExp);
    const pillEls = card.querySelectorAll('.car-specs span');
    (t.pills[i] || []).forEach((txt, j) => { if (pillEls[j]) pillEls[j].textContent = txt; });
    const btnEl = card.querySelector('.btn-book');
    if (btnEl) btnEl.textContent = t.planThis;
  });

  setText('#schedule .section-tag', t.schedTag);
  setText('#schedule .section-header h2', t.schedH2);
  setText('#schedule .section-header p', t.schedDesc);
  const formLabels = $$('#schedule .form-group label');
  const labelMap = [t.fFirst, t.fLast, t.fPhone, t.fEmail, t.fExperience, t.fDate, t.fParty];
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
