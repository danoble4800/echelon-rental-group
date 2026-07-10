/* ──────────────────────────────────────────
   ECHELON EXOTICS — TRANSLATIONS
   Page-scoped on purpose (see brand-pages.js note): only this page's own
   elements are targeted, so nothing can leak into other brand pages.
   Brand/product names (Echelon, Lamborghini Huracán EVO, etc.), prices,
   and contact details are intentionally left untranslated.
────────────────────────────────────────── */
const exoticsI18n = {
  en: {
    navFleet: 'Fleet', navReserve: 'Reserve', navPricing: 'Pricing', navReviews: 'Reviews', navBtn: 'Reserve Now',
    heroBadge: 'Exotic &amp; Luxury Fleet · By Appointment or Instant Book',
    heroTitle: 'Extraordinary Cars,<br /><span class="accent">Unforgettable Drives.</span>',
    heroSubtitle: 'Echelon Exotics puts <strong>Lamborghini, Ferrari, Porsche, and Rolls-Royce</strong> within reach — hourly, daily, or for the weekend. White-glove delivery available anywhere in the region.',
    tag1: 'Same-Day Delivery', tag2: 'Chauffeur Available', tag3: '$0 Hidden Fees',
    ctaFleet: 'View the Fleet', ctaReserve: 'Reserve a Car',
    invTag: 'Exotic Fleet', invH2: 'Available Right Now',
    invDesc: 'Every car is detailed, inspected, and delivered exactly as pictured — no surprises, no substitutions without your approval.',
    badges: ['Available', 'Most Requested', 'Available', 'Limited', 'Available', 'Available'],
    types: ['Supercar', 'Ultra-Luxury SUV', 'Ultra-Luxury SUV', 'Sports Car', 'Luxury SUV', 'Super SUV'],
    specs: ['630 hp · 0–60 in 2.9s · 2 Seats', '612 hp · 5 Seats · Chauffeur Available', '563 hp · 5 Seats · Chauffeur Available', '640 hp · 0–60 in 2.6s · 4 Seats', '577 hp · 5 Seats · AWD', '641 hp · 0–60 in 3.1s · 5 Seats'],
    pills: [['AWD', 'V10', 'Delivery'], ['Chauffeur Option', 'Delivery'], ['Chauffeur Option', 'Delivery'], ['AWD', 'Delivery'], ['AWD', 'Delivery'], ['AWD', 'Delivery']],
    perDay: '/day', reserveCar: 'Reserve This Car',
    schedTag: 'Reserve', schedH2: 'Schedule Your Drive',
    schedDesc: "Tell us what you'd like to drive and when — we'll confirm availability and delivery details within the hour.",
    fFirst: 'First Name', fLast: 'Last Name', fPhone: 'Phone Number', fEmail: 'Email Address',
    fPickup: 'Pick-Up Date', fReturn: 'Return Date', fInterest: 'Vehicle of Interest',
    fDelivery: 'Delivery Location', fDeliveryHint: '(optional — concierge delivery)',
    fNotSure: 'Not Sure Yet',
    fCheck: "I confirm I have a valid driver's license and agree to the rental terms.",
    fSubmit: 'Request Reservation', fNote: "We'll call you within 1 hour to confirm and arrange delivery.",
    priceTag: 'Exotic Pricing', priceH2: 'Pick Your Plan',
    priceDesc: 'Transparent, all-in pricing — insurance, mileage, and concierge terms clearly laid out before you book.',
    tiers: [
      { name: 'Daily', desc: 'Perfect for a single unforgettable day', unit: '/day', feats: ['125 miles/day included', 'Full insurance required at booking', 'Single-day minimum', 'Pickup or delivery available'] },
      { name: 'Weekend', desc: 'Friday through Sunday', unit: '/weekend', feats: ['300 miles included', 'Complimentary delivery within 20mi', 'Priority vehicle selection', 'Dedicated concierge line'] },
      { name: 'Weekly', desc: 'Maximum time behind the wheel', unit: '/week', feats: ['Unlimited local mileage', 'One complimentary vehicle swap', 'Dedicated concierge', 'Chauffeur add-on available'] },
    ],
    popular: 'Most Popular', getStarted: 'Get Started',
    priceNote: 'All prices shown are starting rates. Final price depends on vehicle selected. Refundable security deposit required.',
    revTag: 'Our Clients', revH2: 'What Drivers Say',
    reviews: [
      { q: '"Rented the Huracán for my fortieth birthday — the delivery-to-my-door service made it feel like a five-star experience from the first minute."', name: 'Anthony V.', role: 'Weekend Rental' },
      { q: '"Cullinan was flawless for our wedding weekend. Echelon Exotics made the whole thing painless, including a driver for the reception."', name: 'Priya S.', role: 'Wedding Client' },
      { q: "\"I've rented supercars from three different companies in New England — Echelon's condition and turnaround are the best by far.\"", name: 'Marco D.', role: 'Repeat Client' },
    ],
    footerBlurb: 'Luxury and exotic car rentals with white-glove delivery, part of the Echelon Rental Group family.',
    footerFleetH: 'Fleet', footerFleet: ['Supercars', 'Ultra-Luxury SUVs', 'View Pricing'],
    footerBrandsH: 'Echelon Brands', footerContactH: 'Contact', footerHours: 'Mon–Sun: 7am – 9pm',
    footerCopy: '© 2026 Echelon Rental Group. All rights reserved.',
    toastTitle: 'Reservation Requested!', toastBody: "We'll call you within 1 hour to confirm.",
  },
  es: {
    navFleet: 'Flota', navReserve: 'Reservar', navPricing: 'Precios', navReviews: 'Reseñas', navBtn: 'Reservar Ahora',
    heroBadge: 'Flota Exótica y de Lujo · Con Cita o Reserva Instantánea',
    heroTitle: 'Autos Extraordinarios,<br /><span class="accent">Viajes Inolvidables.</span>',
    heroSubtitle: 'Echelon Exotics pone a tu alcance <strong>Lamborghini, Ferrari, Porsche y Rolls-Royce</strong> — por hora, por día o el fin de semana. Entrega de lujo disponible en toda la región.',
    tag1: 'Entrega el Mismo Día', tag2: 'Chofer Disponible', tag3: '$0 en Cargos Ocultos',
    ctaFleet: 'Ver la Flota', ctaReserve: 'Reservar un Auto',
    invTag: 'Flota Exótica', invH2: 'Disponible Ahora',
    invDesc: 'Cada auto es detallado, inspeccionado y entregado exactamente como se muestra — sin sorpresas ni sustituciones sin tu aprobación.',
    badges: ['Disponible', 'Más Solicitado', 'Disponible', 'Limitado', 'Disponible', 'Disponible'],
    types: ['Superdeportivo', 'SUV Ultra de Lujo', 'SUV Ultra de Lujo', 'Auto Deportivo', 'SUV de Lujo', 'Super SUV'],
    specs: ['630 hp · 0–100 en 2.9s · 2 Asientos', '612 hp · 5 Asientos · Chofer Disponible', '563 hp · 5 Asientos · Chofer Disponible', '640 hp · 0–100 en 2.6s · 4 Asientos', '577 hp · 5 Asientos · Tracción AWD', '641 hp · 0–100 en 3.1s · 5 Asientos'],
    pills: [['Tracción AWD', 'V10', 'Entrega'], ['Opción de Chofer', 'Entrega'], ['Opción de Chofer', 'Entrega'], ['Tracción AWD', 'Entrega'], ['Tracción AWD', 'Entrega'], ['Tracción AWD', 'Entrega']],
    perDay: '/día', reserveCar: 'Reservar Este Auto',
    schedTag: 'Reservar', schedH2: 'Programa Tu Viaje',
    schedDesc: 'Cuéntanos qué te gustaría conducir y cuándo — confirmaremos disponibilidad y detalles de entrega dentro de la hora.',
    fFirst: 'Nombre', fLast: 'Apellido', fPhone: 'Número de Teléfono', fEmail: 'Correo Electrónico',
    fPickup: 'Fecha de Recogida', fReturn: 'Fecha de Devolución', fInterest: 'Vehículo de Interés',
    fDelivery: 'Lugar de Entrega', fDeliveryHint: '(opcional — entrega de conserjería)',
    fNotSure: 'Aún No Estoy Seguro',
    fCheck: 'Confirmo que tengo una licencia de conducir válida y acepto los términos de alquiler.',
    fSubmit: 'Solicitar Reservación', fNote: 'Te llamaremos dentro de 1 hora para confirmar y coordinar la entrega.',
    priceTag: 'Precios Exóticos', priceH2: 'Elige Tu Plan',
    priceDesc: 'Precios transparentes y todo incluido — seguro, millaje y términos de conserjería claramente detallados antes de reservar.',
    tiers: [
      { name: 'Diario', desc: 'Perfecto para un día inolvidable', unit: '/día', feats: ['125 millas/día incluidas', 'Seguro completo requerido al reservar', 'Mínimo de un día', 'Recogida o entrega disponible'] },
      { name: 'Fin de Semana', desc: 'De viernes a domingo', unit: '/fin de semana', feats: ['300 millas incluidas', 'Entrega gratuita dentro de 20 millas', 'Selección prioritaria de vehículo', 'Línea de conserjería dedicada'] },
      { name: 'Semanal', desc: 'El máximo tiempo al volante', unit: '/semana', feats: ['Millaje local ilimitado', 'Un cambio de vehículo de cortesía', 'Conserjería dedicada', 'Chofer disponible como extra'] },
    ],
    popular: 'Más Popular', getStarted: 'Comenzar',
    priceNote: 'Los precios mostrados son tarifas iniciales. El precio final depende del vehículo seleccionado. Se requiere depósito de seguridad reembolsable.',
    revTag: 'Nuestros Clientes', revH2: 'Lo Que Dicen los Conductores',
    reviews: [
      { q: '"Alquilé el Huracán para mi cumpleaños número cuarenta — el servicio de entrega a domicilio lo hizo sentir como una experiencia de cinco estrellas desde el primer minuto."', name: 'Anthony V.', role: 'Alquiler de Fin de Semana' },
      { q: 'El Cullinan fue impecable para el fin de semana de nuestra boda. Echelon Exotics hizo que todo fuera muy fácil, incluyendo un chofer para la recepción.', name: 'Priya S.', role: 'Cliente de Boda' },
      { q: 'He alquilado superdeportivos de tres compañías diferentes en Nueva Inglaterra — la condición y rapidez de Echelon son las mejores por mucho.', name: 'Marco D.', role: 'Cliente Recurrente' },
    ],
    footerBlurb: 'Alquiler de autos exóticos y de lujo con entrega de conserjería, parte de la familia Echelon Rental Group.',
    footerFleetH: 'Flota', footerFleet: ['Superdeportivos', 'SUVs Ultra de Lujo', 'Ver Precios'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contacto', footerHours: 'Lun–Dom: 7am – 9pm',
    footerCopy: '© 2026 Echelon Rental Group. Todos los derechos reservados.',
    toastTitle: '¡Reservación Solicitada!', toastBody: 'Te llamaremos dentro de 1 hora para confirmar.',
  },
  pt: {
    navFleet: 'Frota', navReserve: 'Reservar', navPricing: 'Preços', navReviews: 'Avaliações', navBtn: 'Reservar Agora',
    heroBadge: 'Frota Exótica e de Luxo · Com Agendamento ou Reserva Instantânea',
    heroTitle: 'Carros Extraordinários,<br /><span class="accent">Passeios Inesquecíveis.</span>',
    heroSubtitle: 'A Echelon Exotics coloca ao seu alcance <strong>Lamborghini, Ferrari, Porsche e Rolls-Royce</strong> — por hora, por dia ou no fim de semana. Entrega de luxo disponível em toda a região.',
    tag1: 'Entrega no Mesmo Dia', tag2: 'Motorista Disponível', tag3: '$0 em Taxas Ocultas',
    ctaFleet: 'Ver a Frota', ctaReserve: 'Reservar um Carro',
    invTag: 'Frota Exótica', invH2: 'Disponível Agora',
    invDesc: 'Cada carro é detalhado, inspecionado e entregue exatamente como mostrado — sem surpresas, sem substituições sem sua aprovação.',
    badges: ['Disponível', 'Mais Procurado', 'Disponível', 'Limitado', 'Disponível', 'Disponível'],
    types: ['Superesportivo', 'SUV Ultra de Luxo', 'SUV Ultra de Luxo', 'Carro Esportivo', 'SUV de Luxo', 'Super SUV'],
    specs: ['630 cv · 0–100 em 2.9s · 2 Lugares', '612 cv · 5 Lugares · Motorista Disponível', '563 cv · 5 Lugares · Motorista Disponível', '640 cv · 0–100 em 2.6s · 4 Lugares', '577 cv · 5 Lugares · Tração AWD', '641 cv · 0–100 em 3.1s · 5 Lugares'],
    pills: [['Tração AWD', 'V10', 'Entrega'], ['Opção de Motorista', 'Entrega'], ['Opção de Motorista', 'Entrega'], ['Tração AWD', 'Entrega'], ['Tração AWD', 'Entrega'], ['Tração AWD', 'Entrega']],
    perDay: '/dia', reserveCar: 'Reservar Este Carro',
    schedTag: 'Reservar', schedH2: 'Agende Seu Passeio',
    schedDesc: 'Diga-nos o que gostaria de dirigir e quando — confirmaremos disponibilidade e detalhes de entrega dentro de uma hora.',
    fFirst: 'Nome', fLast: 'Sobrenome', fPhone: 'Telefone', fEmail: 'E-mail',
    fPickup: 'Data de Retirada', fReturn: 'Data de Devolução', fInterest: 'Veículo de Interesse',
    fDelivery: 'Local de Entrega', fDeliveryHint: '(opcional — entrega com concierge)',
    fNotSure: 'Ainda Não Sei',
    fCheck: 'Confirmo que tenho habilitação válida e concordo com os termos do aluguel.',
    fSubmit: 'Solicitar Reserva', fNote: 'Ligaremos em até 1 hora para confirmar e organizar a entrega.',
    priceTag: 'Preços Exóticos', priceH2: 'Escolha Seu Plano',
    priceDesc: 'Preços transparentes e completos — seguro, quilometragem e termos de concierge claramente detalhados antes de reservar.',
    tiers: [
      { name: 'Diário', desc: 'Perfeito para um dia inesquecível', unit: '/dia', feats: ['125 milhas/dia incluídas', 'Seguro completo exigido na reserva', 'Mínimo de um dia', 'Retirada ou entrega disponível'] },
      { name: 'Fim de Semana', desc: 'De sexta a domingo', unit: '/fim de semana', feats: ['300 milhas incluídas', 'Entrega gratuita em até 20 milhas', 'Seleção prioritária de veículo', 'Linha de concierge dedicada'] },
      { name: 'Semanal', desc: 'O máximo de tempo ao volante', unit: '/semana', feats: ['Quilometragem local ilimitada', 'Uma troca de veículo cortesia', 'Concierge dedicado', 'Motorista disponível como adicional'] },
    ],
    popular: 'Mais Popular', getStarted: 'Começar',
    priceNote: 'Os preços exibidos são tarifas iniciais. O preço final depende do veículo selecionado. Depósito de segurança reembolsável é exigido.',
    revTag: 'Nossos Clientes', revH2: 'O Que Dizem os Motoristas',
    reviews: [
      { q: '"Aluguei o Huracán para o meu aniversário de quarenta anos — o serviço de entrega na porta fez parecer uma experiência cinco estrelas desde o primeiro minuto."', name: 'Anthony V.', role: 'Aluguel de Fim de Semana' },
      { q: 'O Cullinan foi impecável para o fim de semana do nosso casamento. A Echelon Exotics tornou tudo simples, incluindo um motorista para a recepção.', name: 'Priya S.', role: 'Cliente de Casamento' },
      { q: 'Já aluguei superesportivos de três empresas diferentes na Nova Inglaterra — a condição e agilidade da Echelon são de longe as melhores.', name: 'Marco D.', role: 'Cliente Recorrente' },
    ],
    footerBlurb: 'Aluguel de carros exóticos e de luxo com entrega concierge, parte da família Echelon Rental Group.',
    footerFleetH: 'Frota', footerFleet: ['Superesportivos', 'SUVs Ultra de Luxo', 'Ver Preços'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contato', footerHours: 'Seg–Dom: 7h – 21h',
    footerCopy: '© 2026 Echelon Rental Group. Todos os direitos reservados.',
    toastTitle: 'Reserva Solicitada!', toastBody: 'Ligaremos em até 1 hora para confirmar.',
  },
};

let currentLang = localStorage.getItem('echelon-lang') || 'en';

function applyLang(lang) {
  const t = exoticsI18n[lang] || exoticsI18n.en;
  currentLang = lang;
  localStorage.setItem('echelon-lang', lang);

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  const setText = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
  const setHTML = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  document.querySelectorAll('#langLabel').forEach(el => el.textContent = lang.toUpperCase());
  document.querySelectorAll('.lang-option').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));

  const navLinks = $$('.nav-links a, .mobile-menu > a:not(.btn)');
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
    if (unitEl) unitEl.textContent = t.perDay;
    const pillEls = card.querySelectorAll('.car-specs span');
    (t.pills[i] || []).forEach((txt, j) => { if (pillEls[j]) pillEls[j].textContent = txt; });
    const btnEl = card.querySelector('.btn-book');
    if (btnEl) btnEl.textContent = t.reserveCar;
  });

  setText('#schedule .section-tag', t.schedTag);
  setText('#schedule .section-header h2', t.schedH2);
  setText('#schedule .section-header p', t.schedDesc);
  const formLabels = $$('#schedule .form-group label');
  const labelMap = [t.fFirst, t.fLast, t.fPhone, t.fEmail, t.fPickup, t.fReturn, t.fInterest, null];
  formLabels.forEach((el, i) => {
    if (i === labelMap.length - 1) return; // delivery label handled separately (has inline hint span)
    if (labelMap[i]) el.textContent = labelMap[i];
  });
  const deliveryLabel = $('#schedule select[name=vehicleInterest]') && $('#schedule select[name=vehicleInterest]').closest('.form-group').nextElementSibling.querySelector('label');
  if (deliveryLabel) deliveryLabel.innerHTML = `${t.fDelivery} <span style="font-weight:400;color:var(--dark-text-3);">${t.fDeliveryHint}</span>`;
  const interestSel = $('#interestField');
  if (interestSel) { [...interestSel.options].forEach((opt, i) => { if (i === interestSel.options.length - 1) opt.text = t.fNotSure; }); }
  setText('#schedule .checkbox-label', '');
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
    card.querySelector('.p-unit').textContent = tier.unit;
    const feats = card.querySelectorAll('.pricing-features li');
    tier.feats.forEach((txt, j) => { if (feats[j]) feats[j].textContent = '✓ ' + txt; });
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
