/* ──────────────────────────────────────────
   ECHELON EXOTICS — TRANSLATIONS
   Page-scoped on purpose (see brand-pages.js note): only this page's own
   elements are targeted, so nothing can leak into other brand pages.
   Brand/product names (Echelon, Lamborghini Huracán EVO, etc.), prices,
   and contact details are intentionally left untranslated.
────────────────────────────────────────── */
const exoticsI18n = {
  en: {
    navFleet: 'Fleet', navReserve: 'Reserve', navFaq: 'FAQ', navReviews: 'Reviews', navBtn: 'Reserve Now',
    heroBadge: 'Exotic &amp; Luxury Fleet · By Appointment or Instant Book',
    heroTitle: 'Extraordinary Cars,<br /><span class="accent">Unforgettable Drives.</span>',
    heroSubtitle: 'Echelon Exotics puts <strong>Lamborghini, Ferrari, Porsche, and Rolls-Royce</strong> within reach — hourly, daily, or for the weekend. White-glove delivery available anywhere in the region.',
    tag1: 'Same-Day Delivery', tag2: 'Chauffeur Available', tag3: '$0 Hidden Fees',
    ctaFleet: 'View the Fleet', ctaReserve: 'Reserve a Car',
    invTag: 'Featured Fleet', invH2: "The Cars Everyone's Asking For",
    invDesc: 'Every car is detailed, inspected, and delivered exactly as pictured — no surprises, no substitutions without your approval.',
    badges: ['Available', 'Most Requested', 'Available', 'Limited', 'Available', 'Available'],
    types: ['Supercar', 'Ultra-Luxury SUV', 'Ultra-Luxury SUV', 'Sports Car', 'Luxury SUV', 'Super SUV'],
    specs: ['630 hp · 0–60 in 2.9s · 2 Seats', '612 hp · 5 Seats · Chauffeur Available', '563 hp · 5 Seats · Chauffeur Available', '502 hp · 0–60 in 3.2s · 2 Seats', '577 hp · 5 Seats · AWD', '641 hp · 0–60 in 3.1s · 5 Seats'],
    pills: [['AWD', 'V10', 'Delivery'], ['Chauffeur Option', 'Delivery'], ['Chauffeur Option', 'Delivery'], ['RWD', 'Delivery'], ['AWD', 'Delivery'], ['AWD', 'Delivery']],
    perDay: '/day', reserveCar: 'Reserve This Car',
    reelsTag: 'Echelon Stories', reelsH2: 'Seen on the Road',
    reelsDesc: 'Real moments from our clients and our own shoots. Tag @EchelonRentalGroup on Instagram for a chance to be featured.',
    reelsFollow: 'Follow @EchelonRentalGroup',
    whyTag: 'Why Echelon', whyH2: 'The Echelon Difference',
    whyDesc: "Locally owned, hand-picked, and built around getting you behind the wheel without the runaround.",
    reasons: [
      { title: 'Complimentary Delivery', desc: "We'll bring the car to you — the first 10 miles are on us, with delivery available further out on request." },
      { title: 'Easy Booking', desc: 'Reserve online or call us directly — most requests are confirmed within the hour, no lengthy paperwork.' },
      { title: 'Transparent Pricing', desc: "No hidden fees, no surprise charges at pickup. What you're quoted is what you pay." },
      { title: 'Locally Owned & Established', desc: 'Echelon is Massachusetts-based and locally owned — not a faceless franchise. We know our clients and our cars.' },
      { title: 'Curated Fleet', desc: 'Every vehicle is hand-selected, detailed, and inspected before it reaches you — no surprises, no substitutions.' },
    ],
    whyCta: 'Reserve Your Car',
    faqTag: 'FAQ', faqH2: 'Frequently Asked Questions',
    faqDesc: 'Everything you need to know before reserving your luxury or exotic rental.',
    faqItems: [
      { q: "What's included in the rental rate?", a: "Every rental includes 125 miles per day as a standard allowance. Need more for your trip? Let us know when you book and we'll work out a mileage plan that fits." },
      { q: 'Do I need my own insurance?', a: 'Yes — a valid personal auto insurance policy with adequate liability coverage is required for every exotic and luxury rental. Our team confirms your coverage meets our minimum requirements before delivery.' },
      { q: 'Is a security deposit required?', a: 'A refundable security deposit is required on every reservation. The exact amount depends on which vehicle you choose and is confirmed when you book.' },
      { q: 'Can you deliver the car to me?', a: "Absolutely. We offer white-glove delivery and pickup anywhere in the region — to your home, hotel, venue, or the airport. Delivery details are arranged once you submit a reservation request." },
      { q: 'Is a chauffeur available?', a: "Yes. Chauffeur service is available as an add-on for select vehicles — a great option for weddings, events, or nights out where you'd rather not drive." },
      { q: "What's the minimum age and license requirement?", a: "Renters must be at least 25 years old with a valid driver's license in good standing. Some vehicles may carry additional requirements, which we'll confirm at booking." },
    ],
    revTag: 'Our Clients', revH2: 'What Drivers Say',
    reviews: [
      { q: '"Rented the Huracán for my fortieth birthday — the delivery-to-my-door service made it feel like a five-star experience from the first minute."', name: 'Anthony V.', role: 'Weekend Rental' },
      { q: '"Cullinan was flawless for our wedding weekend. Echelon Exotics made the whole thing painless, including a driver for the reception."', name: 'Priya S.', role: 'Wedding Client' },
      { q: "\"I've rented supercars from three different companies in New England — Echelon's condition and turnaround are the best by far.\"", name: 'Marco D.', role: 'Repeat Client' },
    ],
    footerBlurb: 'Luxury and exotic car rentals with white-glove delivery, part of the Echelon Rental Group family.',
    footerFleetH: 'Fleet', footerFleet: ['Supercars', 'Ultra-Luxury SUVs', 'FAQ'],
    footerBrandsH: 'Echelon Brands', footerContactH: 'Contact', footerHours: 'Open 24 Hours, 7 Days a Week',
    footerCopy: '© 2026 Echelon Rental Group. All rights reserved.',
    toastTitle: 'Reservation Requested!', toastBody: "We'll call you within 1 hour to confirm.",
  },
  es: {
    navFleet: 'Flota', navReserve: 'Reservar', navFaq: 'FAQ', navReviews: 'Reseñas', navBtn: 'Reservar Ahora',
    heroBadge: 'Flota Exótica y de Lujo · Con Cita o Reserva Instantánea',
    heroTitle: 'Autos Extraordinarios,<br /><span class="accent">Viajes Inolvidables.</span>',
    heroSubtitle: 'Echelon Exotics pone a tu alcance <strong>Lamborghini, Ferrari, Porsche y Rolls-Royce</strong> — por hora, por día o el fin de semana. Entrega de lujo disponible en toda la región.',
    tag1: 'Entrega el Mismo Día', tag2: 'Chofer Disponible', tag3: '$0 en Cargos Ocultos',
    ctaFleet: 'Ver la Flota', ctaReserve: 'Reservar un Auto',
    invTag: 'Flota Destacada', invH2: 'Los Autos Que Todos Piden',
    invDesc: 'Cada auto es detallado, inspeccionado y entregado exactamente como se muestra — sin sorpresas ni sustituciones sin tu aprobación.',
    badges: ['Disponible', 'Más Solicitado', 'Disponible', 'Limitado', 'Disponible', 'Disponible'],
    types: ['Superdeportivo', 'SUV Ultra de Lujo', 'SUV Ultra de Lujo', 'Auto Deportivo', 'SUV de Lujo', 'Super SUV'],
    specs: ['630 hp · 0–100 en 2.9s · 2 Asientos', '612 hp · 5 Asientos · Chofer Disponible', '563 hp · 5 Asientos · Chofer Disponible', '502 hp · 0–100 en 3.2s · 2 Asientos', '577 hp · 5 Asientos · Tracción AWD', '641 hp · 0–100 en 3.1s · 5 Asientos'],
    pills: [['Tracción AWD', 'V10', 'Entrega'], ['Opción de Chofer', 'Entrega'], ['Opción de Chofer', 'Entrega'], ['Tracción Trasera', 'Entrega'], ['Tracción AWD', 'Entrega'], ['Tracción AWD', 'Entrega']],
    perDay: '/día', reserveCar: 'Reservar Este Auto',
    reelsTag: 'Historias Echelon', reelsH2: 'Visto en el Camino',
    reelsDesc: 'Momentos reales de nuestros clientes y nuestras propias sesiones. Etiqueta a @EchelonRentalGroup en Instagram para aparecer aquí.',
    reelsFollow: 'Sigue a @EchelonRentalGroup',
    whyTag: 'Por Qué Echelon', whyH2: 'La Diferencia Echelon',
    whyDesc: 'De propiedad local, seleccionados a mano, y pensados para ponerte al volante sin complicaciones.',
    reasons: [
      { title: 'Entrega Sin Costo', desc: 'Te llevamos el auto — las primeras 10 millas corren por nuestra cuenta, con entrega disponible más lejos bajo solicitud.' },
      { title: 'Reserva Fácil', desc: 'Reserva en línea o llámanos directamente — la mayoría de las solicitudes se confirman en menos de una hora, sin trámites largos.' },
      { title: 'Precios Transparentes', desc: 'Sin cargos ocultos ni sorpresas al recoger el auto. Lo que se cotiza es lo que pagas.' },
      { title: 'De Propiedad Local y Establecida', desc: 'Echelon tiene su base en Massachusetts y es de propiedad local — no una franquicia sin rostro. Conocemos a nuestros clientes y nuestros autos.' },
      { title: 'Flota Curada', desc: 'Cada vehículo es seleccionado a mano, detallado e inspeccionado antes de llegar a ti — sin sorpresas ni sustituciones.' },
    ],
    whyCta: 'Reserva Tu Auto',
    faqTag: 'FAQ', faqH2: 'Preguntas Frecuentes',
    faqDesc: 'Todo lo que necesitas saber antes de reservar tu auto de lujo o exótico.',
    faqItems: [
      { q: '¿Qué incluye la tarifa de alquiler?', a: 'Cada alquiler incluye 125 millas por día como estándar. ¿Necesitas más para tu viaje? Avísanos al reservar y ajustaremos un plan de millaje que se adapte a ti.' },
      { q: '¿Necesito mi propio seguro?', a: 'Sí — se requiere una póliza de seguro de auto personal con cobertura de responsabilidad civil adecuada para cada alquiler exótico y de lujo. Nuestro equipo confirma que tu cobertura cumple con nuestros requisitos mínimos antes de la entrega.' },
      { q: '¿Se requiere un depósito de seguridad?', a: 'Se requiere un depósito de seguridad reembolsable en cada reservación. El monto exacto depende del vehículo que elijas y se confirma al reservar.' },
      { q: '¿Pueden entregarme el auto?', a: 'Claro que sí. Ofrecemos entrega y recogida de lujo en toda la región — a tu casa, hotel, evento o el aeropuerto. Los detalles de entrega se coordinan una vez que envíes tu solicitud de reservación.' },
      { q: '¿Hay chofer disponible?', a: 'Sí. El servicio de chofer está disponible como complemento para vehículos seleccionados — ideal para bodas, eventos o noches en las que prefieras no conducir.' },
      { q: '¿Cuál es la edad mínima y el requisito de licencia?', a: 'Los arrendatarios deben tener al menos 25 años y una licencia de conducir válida y en regla. Algunos vehículos pueden tener requisitos adicionales, que confirmaremos al reservar.' },
    ],
    revTag: 'Nuestros Clientes', revH2: 'Lo Que Dicen los Conductores',
    reviews: [
      { q: '"Alquilé el Huracán para mi cumpleaños número cuarenta — el servicio de entrega a domicilio lo hizo sentir como una experiencia de cinco estrellas desde el primer minuto."', name: 'Anthony V.', role: 'Alquiler de Fin de Semana' },
      { q: 'El Cullinan fue impecable para el fin de semana de nuestra boda. Echelon Exotics hizo que todo fuera muy fácil, incluyendo un chofer para la recepción.', name: 'Priya S.', role: 'Cliente de Boda' },
      { q: 'He alquilado superdeportivos de tres compañías diferentes en Nueva Inglaterra — la condición y rapidez de Echelon son las mejores por mucho.', name: 'Marco D.', role: 'Cliente Recurrente' },
    ],
    footerBlurb: 'Alquiler de autos exóticos y de lujo con entrega de conserjería, parte de la familia Echelon Rental Group.',
    footerFleetH: 'Flota', footerFleet: ['Superdeportivos', 'SUVs Ultra de Lujo', 'FAQ'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contacto', footerHours: 'Abierto las 24 Horas, los 7 Días de la Semana',
    footerCopy: '© 2026 Echelon Rental Group. Todos los derechos reservados.',
    toastTitle: '¡Reservación Solicitada!', toastBody: 'Te llamaremos dentro de 1 hora para confirmar.',
  },
  pt: {
    navFleet: 'Frota', navReserve: 'Reservar', navFaq: 'FAQ', navReviews: 'Avaliações', navBtn: 'Reservar Agora',
    heroBadge: 'Frota Exótica e de Luxo · Com Agendamento ou Reserva Instantânea',
    heroTitle: 'Carros Extraordinários,<br /><span class="accent">Passeios Inesquecíveis.</span>',
    heroSubtitle: 'A Echelon Exotics coloca ao seu alcance <strong>Lamborghini, Ferrari, Porsche e Rolls-Royce</strong> — por hora, por dia ou no fim de semana. Entrega de luxo disponível em toda a região.',
    tag1: 'Entrega no Mesmo Dia', tag2: 'Motorista Disponível', tag3: '$0 em Taxas Ocultas',
    ctaFleet: 'Ver a Frota', ctaReserve: 'Reservar um Carro',
    invTag: 'Frota em Destaque', invH2: 'Os Carros Que Todos Pedem',
    invDesc: 'Cada carro é detalhado, inspecionado e entregue exatamente como mostrado — sem surpresas, sem substituições sem sua aprovação.',
    badges: ['Disponível', 'Mais Procurado', 'Disponível', 'Limitado', 'Disponível', 'Disponível'],
    types: ['Superesportivo', 'SUV Ultra de Luxo', 'SUV Ultra de Luxo', 'Carro Esportivo', 'SUV de Luxo', 'Super SUV'],
    specs: ['630 cv · 0–100 em 2.9s · 2 Lugares', '612 cv · 5 Lugares · Motorista Disponível', '563 cv · 5 Lugares · Motorista Disponível', '502 cv · 0–100 em 3.2s · 2 Lugares', '577 cv · 5 Lugares · Tração AWD', '641 cv · 0–100 em 3.1s · 5 Lugares'],
    pills: [['Tração AWD', 'V10', 'Entrega'], ['Opção de Motorista', 'Entrega'], ['Opção de Motorista', 'Entrega'], ['Tração Traseira', 'Entrega'], ['Tração AWD', 'Entrega'], ['Tração AWD', 'Entrega']],
    perDay: '/dia', reserveCar: 'Reservar Este Carro',
    reelsTag: 'Histórias Echelon', reelsH2: 'Visto na Estrada',
    reelsDesc: 'Momentos reais dos nossos clientes e das nossas próprias gravações. Marque @EchelonRentalGroup no Instagram para aparecer aqui.',
    reelsFollow: 'Siga @EchelonRentalGroup',
    whyTag: 'Por Que Echelon', whyH2: 'A Diferença Echelon',
    whyDesc: 'De propriedade local, selecionados à mão, e feitos para te colocar ao volante sem complicação.',
    reasons: [
      { title: 'Entrega Gratuita', desc: 'Levamos o carro até você — as primeiras 10 milhas são por nossa conta, com entrega mais distante disponível sob solicitação.' },
      { title: 'Reserva Fácil', desc: 'Reserve online ou nos ligue diretamente — a maioria dos pedidos é confirmada em até uma hora, sem burocracia.' },
      { title: 'Preços Transparentes', desc: 'Sem taxas ocultas, sem surpresas na retirada. O que é cotado é o que você paga.' },
      { title: 'Propriedade Local e Estabelecida', desc: 'A Echelon é sediada em Massachusetts e de propriedade local — não uma franquia sem rosto. Conhecemos nossos clientes e nossos carros.' },
      { title: 'Frota Curada', desc: 'Cada veículo é selecionado à mão, detalhado e inspecionado antes de chegar até você — sem surpresas, sem substituições.' },
    ],
    whyCta: 'Reserve Seu Carro',
    faqTag: 'FAQ', faqH2: 'Perguntas Frequentes',
    faqDesc: 'Tudo o que você precisa saber antes de reservar seu carro de luxo ou exótico.',
    faqItems: [
      { q: 'O que está incluído na tarifa de aluguel?', a: 'Cada aluguel inclui 125 milhas por dia como padrão. Precisa de mais para sua viagem? Avise-nos ao reservar e ajustaremos um plano de quilometragem que funcione para você.' },
      { q: 'Preciso do meu próprio seguro?', a: 'Sim — é necessária uma apólice de seguro de automóvel pessoal com cobertura de responsabilidade adequada para todo aluguel exótico e de luxo. Nossa equipe confirma que sua cobertura atende aos requisitos mínimos antes da entrega.' },
      { q: 'É necessário um depósito de segurança?', a: 'É exigido um depósito de segurança reembolsável em todas as reservas. O valor exato depende do veículo escolhido e é confirmado no momento da reserva.' },
      { q: 'Vocês entregam o carro no meu endereço?', a: 'Com certeza. Oferecemos entrega e retirada de luxo em toda a região — na sua casa, hotel, evento ou aeroporto. Os detalhes da entrega são combinados assim que você enviar sua solicitação de reserva.' },
      { q: 'Há motorista disponível?', a: 'Sim. O serviço de motorista está disponível como adicional para veículos selecionados — ótimo para casamentos, eventos ou noites em que você prefere não dirigir.' },
      { q: 'Qual é a idade mínima e o requisito de habilitação?', a: 'Os locatários devem ter pelo menos 25 anos e uma habilitação válida e em dia. Alguns veículos podem ter requisitos adicionais, que confirmaremos na reserva.' },
    ],
    revTag: 'Nossos Clientes', revH2: 'O Que Dizem os Motoristas',
    reviews: [
      { q: '"Aluguei o Huracán para o meu aniversário de quarenta anos — o serviço de entrega na porta fez parecer uma experiência cinco estrelas desde o primeiro minuto."', name: 'Anthony V.', role: 'Aluguel de Fim de Semana' },
      { q: 'O Cullinan foi impecável para o fim de semana do nosso casamento. A Echelon Exotics tornou tudo simples, incluindo um motorista para a recepção.', name: 'Priya S.', role: 'Cliente de Casamento' },
      { q: 'Já aluguei superesportivos de três empresas diferentes na Nova Inglaterra — a condição e agilidade da Echelon são de longe as melhores.', name: 'Marco D.', role: 'Cliente Recorrente' },
    ],
    footerBlurb: 'Aluguel de carros exóticos e de luxo com entrega concierge, parte da família Echelon Rental Group.',
    footerFleetH: 'Frota', footerFleet: ['Superesportivos', 'SUVs Ultra de Luxo', 'FAQ'],
    footerBrandsH: 'Marcas Echelon', footerContactH: 'Contato', footerHours: 'Aberto 24 Horas, 7 Dias por Semana',
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
  const navLabels = [t.navFleet, t.navReserve, t.navFaq, t.navReviews];
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

  setText('#stories .section-tag', t.reelsTag || 'Echelon Stories');
  setText('#stories .section-header h2', t.reelsH2 || 'Seen on the Road');
  setText('#stories .section-header p', t.reelsDesc);
  setText('#stories .explore-cta .btn', t.reelsFollow || 'Follow @EchelonRentalGroup');

  setText('#why-echelon .section-tag', t.whyTag || 'Why Echelon');
  setText('#why-echelon .section-header h2', t.whyH2 || 'The Echelon Difference');
  setText('#why-echelon .section-header p', t.whyDesc);
  const reasonCards = $$('#why-echelon .reason-item');
  reasonCards.forEach((card, i) => {
    const r = t.reasons && t.reasons[i];
    if (!r) return;
    const titleEl = card.querySelector('.reason-title');
    const descEl = card.querySelector('.reason-desc');
    if (titleEl) titleEl.textContent = r.title;
    if (descEl) descEl.textContent = r.desc;
  });
  setText('#why-echelon .explore-cta .btn', t.whyCta || 'Reserve Your Car');

  setText('#faq .section-tag', t.faqTag);
  setText('#faq .section-header h2', t.faqH2);
  setText('#faq .section-header p', t.faqDesc);
  const faqCards = $$('.faq-item');
  faqCards.forEach((card, i) => {
    const item = t.faqItems[i];
    if (!item) return;
    card.querySelector('summary').textContent = item.q;
    card.querySelector('.faq-answer').textContent = item.a;
  });

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
