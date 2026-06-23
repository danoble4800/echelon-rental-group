/* ============================================
   ECHELON RENTAL GROUP — SCRIPTS
   Includes: nav, filters, modal, i18n (EN/ES/PT)
   ============================================ */

/* ──────────────────────────────────────────
   TRANSLATIONS
────────────────────────────────────────── */
const i18n = {
  en: {
    /* Nav */
    navFleet:      'Fleet',
    navPricing:    'Pricing',
    navServe:      'Who We Serve',
    navHow:        'Why Echelon',
    navBook:       'Book Now',
    navPhone:      '📞 508-444-2276',

    /* Hero */
    heroBadge:    'Flexible Rentals · For Any Driver, Any Need',
    heroTitle:    'Drive More,<br/><span class="accent">Earn More.</span>',
    heroSubtitle: 'Echelon Rental Group offers <strong>affordable, flexible car rentals</strong> for gig drivers, daily commuters, families, and anyone in between. Compact cars, sedans, and SUVs — available daily, weekly, or monthly.',
    platformEveryday: 'Everyday Use',

    /* Booking widget */
    widgetDaily:    'Daily',
    widgetWeekly:   'Weekly',
    widgetMonthly:  'Monthly',
    widgetPickup:   'Pick-Up Date',
    widgetReturn:   'Return Date',
    widgetType:     'Vehicle Type',
    widgetAny:      'Any Vehicle',
    widgetEconomy:  'Economy',
    widgetSedan:    'Sedan',
    widgetCompact:  'Compact',
    widgetBtn:      'Check Availability',
    widgetNote:     'No hidden fees · Free cancellation up to 24hrs',

    /* Hero floats */
    heroCarsLabel: 'Cars Available',
    heroMilesLabel:'Miles Included',

    /* Stats */
    statVehicles:  'Vehicles in Fleet',
    statStarting:  'Starting Per Day',
    statSupport:   'Customer Support',
    statFees:      'Hidden Fees',

    /* Fleet */
    fleetTag:      'Economic Fleet',
    fleetH2:       'Available Right Now',
    fleetDesc:     'Compact economy cars, full-size sedans, and SUVs — our entire fleet is well-maintained, affordable, and ready for any reason you need wheels.',
    filterAll:     'All Vehicles',
    filterEconomy: 'Economy',
    filterSedan:   'Sedan',
    filterCompact: 'Compact',
    filterSuv:     'SUV',
    cardAvailable: 'Available',
    cardLimited:   '3 Left',
    cardPopular:   'Most Popular',
    bookNow:       'Book Now',
    perDay:        '/day',
    perWk:         '/wk',
    perMo:         '/mo',
    specSeats:     'Seats',
    specMpg:       'MPG',

    /* Who We Serve */
    serveTag:      'Who We Serve',
    serveH2:       'Rentals for Everyone.',
    serveDesc:     'Whether you\'re a gig driver clocking miles for DoorDash or Amazon Flex, a commuter who needs a car while yours is in the shop, a family planning a road trip, or simply someone who wants a vehicle without the commitment — Echelon has you covered with <strong>flexible, affordable rentals</strong> and a fleet to match every need.',
    serveEveryday: 'Everyday Drivers',
    ben1Title:     'No long-term commitments',
    ben1Desc:      'Rent daily, extend weekly, or lock in a monthly rate — your call.',
    ben2Title:     'Unlimited mileage included',
    ben2Desc:      'Drive as many miles as your deliveries require. No mileage caps.',
    ben3Title:     'Maintenance handled',
    ben3Desc:      'Oil changes, tire checks — we keep the car running so you stay earning.',
    ben4Title:     'Compact cars, sedans & SUVs',
    ben4Desc:      'Choose the right size for your trip — from fuel-efficient compacts to spacious SUVs.',
    earningsTitle: 'Weekly Earnings Estimate',
    earningsBadge: 'DoorDash Driver',
    earningsRow1:  'Avg. weekly earnings',
    earningsRow2:  'Echelon weekly rental',
    earningsRow3:  'Est. fuel (300mi @ 33MPG)',
    earningsTotal: 'Your take-home',
    earningsNote:  '* Estimates based on average gig earnings. Individual results vary.',
    serveCtaH3:    'Ready to start?',
    serveCtaP:     'Get your rental today — whether it\'s for deliveries, commuting, a trip, or just everyday life.',
    serveCtaBtn:   'View Available Cars',

    /* Pricing */
    pricingTag:    'Economic Pricing',
    pricingH2:     'Pick Your Plan',
    pricingDesc:   'All plans include unlimited miles, insurance options, and 24/7 roadside support — no hidden fees, no matter why you\'re renting.',
    planDaily:     'Daily',
    planDailyDesc: 'Perfect for short-term needs',
    planWeekly:    'Weekly',
    planWeeklyDesc:'Best for consistent gig work',
    planMonthly:   'Monthly',
    planMonthlyDesc:'Maximum savings, maximum flex',
    popular:       'Most Popular',
    feat1d: '✓ Unlimited mileage',        feat2d: '✓ Choose any available car',
    feat3d: '✓ 24/7 roadside assistance', feat4d: '✓ Free cancellation (24hr notice)',
    feat5d: '✓ Insurance add-on available',
    feat1w: '✓ Everything in Daily',      feat2w: '✓ Save vs. daily rate',
    feat3w: '✓ Priority car selection',   feat4w: '✓ Swap car once per week',
    feat5w: '✓ Dedicated support line',
    feat1m: '✓ Everything in Weekly',     feat2m: '✓ Best overall rate',
    feat3m: '✓ Maintenance fully covered',feat4m: '✓ Same car reserved for you',
    feat5m: '✓ Loyalty rewards on renewals',
    getStarted:    'Get Started',
    pricingNote:   'All prices shown are starting rates. Final price depends on vehicle selected. No security deposit required for qualified renters.',

    /* Compare */
    compareTag:         'Why Choose Echelon',
    compareH2:          'Why Drivers Choose Echelon',
    compareSubtitle:    'Same roads. A smarter way to rent.',
    compareCompHead:    'THE COMPETITION',
    compareEchHead:     'ECHELON',
    cFeat1: 'No Hidden Fees',        cFeat2: 'Flat, Transparent Rates',
    cFeat3: '$0 Security Deposit',   cFeat4: 'Unlimited Miles',
    cFeat5: 'Free Rental Extensions',cFeat6: 'Free Local Delivery*',
    cFeat7: 'Daily / Weekly / Monthly', cFeat8: 'Built for Gig Drivers',
    compareBannerTitle: 'GIG DRIVERS WELCOME',
    compareBannerSub:   'UBER EATS · DOORDASH · GRUBHUB',
    compareDisclaimer:  '*Free local delivery · longer distances priced by distance',
    compareTaglineMain: 'EXCELLENCE IN MOTION',
    compareTaglineSub:  'NEW ENGLAND · @echelonrentalgroup',

    /* Testimonials */
    reviewsTag:    'Real Drivers',
    reviewsH2:     'What Our Renters Say',
    review1:       '"I\'ve been doing DoorDash full-time for 8 months. Echelon\'s weekly rate keeps more of my earnings in my pocket. The Corolla is super fuel efficient — exactly what I needed."',
    review1Name:   'Marcus R.',
    review1Sub:    'DoorDash Driver · 8 months',
    review2:       '"My car broke down and I needed something same day. Echelon had me in a Civic within 2 hours. The process was so easy — just showed my license and I was out the door."',
    review2Name:   'Jessica L.',
    review2Sub:    'Uber Eats Driver · 5 months',
    review3:       '"No other rental company offers unlimited miles at this price point. I drive 400+ miles a week for GrubHub and the monthly plan is by far the most economic option out there."',
    review3Name:   'Devon K.',
    review3Sub:    'GrubHub Driver · 1 year',

    /* CTA */
    ctaH2:         'Ready to hit the road?',
    ctaP:          'Join hundreds of drivers — gig workers, commuters, and everyday renters — already rolling with Echelon.',
    ctaBtn:        'View Available Cars',
    ctaCall:       'Call Us: 508-444-2276',

    /* Footer */
    footerDesc:    'Affordable, flexible rentals for gig drivers, commuters, families, and anyone who needs a great car without the commitment.',
    footerFleet:   'Fleet',
    footerCompany: 'Company',
    footerContact: 'Contact',
    footerHours:   'Mon–Sun: 7am – 9pm',
    footerEconomy: 'Economy Cars',
    footerSedans:  'Sedans',
    footerCompact: 'Compact Cars',
    footerPricing: 'View Pricing',
    footerHow:     'Why Echelon',
    navHow:        'Why Echelon',
    footerGig:     'Driver Program',
    footerFaq:     'FAQ',
    footerContactLink: 'Contact Us',
    footerPrivacy: 'Privacy Policy',
    footerTerms:   'Terms of Service',
    footerCopy:    '© 2024 Echelon Rental Group. All rights reserved.',

    /* Modal */
    modalSubtitle: 'Complete your reservation below',
    modalFirst:    'First Name',
    modalLast:     'Last Name',
    modalPhone:    'Phone Number',
    modalEmail:    'Email Address',
    modalPickup:   'Pick-Up Date',
    modalReturn:   'Return Date',
    modalUsage:    'How Will You Use This Car?',
    modalUsage1:   'DoorDash',
    modalUsage2:   'GrubHub',
    modalUsage3:   'Uber Eats',
    modalUsage4:   'Personal Use',
    modalUsage5:   'Other Delivery',
    modalCheck:    'I confirm I have a valid driver\'s license and agree to the rental terms.',
    modalSubmit:   'Request Reservation',
    modalNote:     'We\'ll call you within 1 hour to confirm and collect payment.',

    /* Toast */
    toastTitle:    'Reservation Requested!',
    toastDesc:     'We\'ll call you within 1 hour to confirm.',
    modalBookPrefix: 'Book —',
  },

  /* ── ESPAÑOL ── */
  es: {
    navFleet:      'Flota',
    navPricing:    'Precios',
    navServe:      'A Quién Servimos',
    navHow:        '¿Por Qué Echelon?',
    navBook:       'Reservar',
    navPhone:      '📞 508-444-2276',

    heroBadge:    'Rentas Flexibles · Para Todo Conductor y Necesidad',
    heroTitle:    'Maneja Más,<br/><span class="accent">Gana Más.</span>',
    heroSubtitle: 'Echelon Rental Group ofrece <strong>rentas de autos asequibles y flexibles</strong> para conductores de reparto, viajeros diarios, familias y cualquier persona. Carros compactos, sedanes y SUVs — disponibles por día, semana o mes.',
    platformEveryday: 'Uso Diario',

    widgetDaily:   'Diario',
    widgetWeekly:  'Semanal',
    widgetMonthly: 'Mensual',
    widgetPickup:  'Fecha de Recogida',
    widgetReturn:  'Fecha de Devolución',
    widgetType:    'Tipo de Vehículo',
    widgetAny:     'Cualquier Vehículo',
    widgetEconomy: 'Económico',
    widgetSedan:   'Sedán',
    widgetCompact: 'Compacto',
    widgetBtn:     'Verificar Disponibilidad',
    widgetNote:    'Sin cargos ocultos · Cancelación gratuita hasta 24hrs',

    heroCarsLabel: 'Carros Disponibles',
    heroMilesLabel:'Millas Incluidas',

    statVehicles:  'Vehículos en Flota',
    statStarting:  'Desde Por Día',
    statSupport:   'Soporte al Cliente',
    statFees:      'Cargos Ocultos',

    fleetTag:      'Flota Económica',
    fleetH2:       'Disponibles Ahora',
    fleetDesc:     'Carros compactos, sedanes y SUVs — toda nuestra flota está bien mantenida, asequible y lista para cualquier necesidad.',
    filterAll:     'Todos',
    filterEconomy: 'Económico',
    filterSedan:   'Sedán',
    filterCompact: 'Compacto',
    filterSuv:     'SUV',
    cardAvailable: 'Disponible',
    cardLimited:   'Quedan 3',
    cardPopular:   'Más Popular',
    bookNow:       'Reservar Ahora',
    perDay:        '/día',
    perWk:         '/sem',
    perMo:         '/mes',
    specSeats:     'Asientos',
    specMpg:       'MPG',

    serveTag:      'A Quién Servimos',
    serveH2:       'Rentas para Todos.',
    serveDesc:     'Ya sea que conduzcas para DoorDash o Amazon Flex, necesites un carro mientras el tuyo está en el taller, planees un viaje en familia, o simplemente quieras un vehículo sin compromisos — Echelon te tiene con <strong>rentas flexibles y asequibles</strong> y una flota para cada necesidad.',
    serveEveryday: 'Conductores Diarios',
    ben1Title:     'Sin compromisos a largo plazo',
    ben1Desc:      'Renta por día, extiende por semana o fija una tarifa mensual — tú decides.',
    ben2Title:     'Millaje ilimitado incluido',
    ben2Desc:      'Maneja todas las millas que necesites. Sin límites de millaje.',
    ben3Title:     'Mantenimiento incluido',
    ben3Desc:      'Cambios de aceite, revisión de llantas — mantenemos el carro andando para que sigas ganando.',
    ben4Title:     'Compactos, sedanes y SUVs',
    ben4Desc:      'Elige el tamaño adecuado — desde compactos eficientes hasta SUVs espaciosos.',
    earningsTitle: 'Estimado de Ganancias Semanales',
    earningsBadge: 'Conductor DoorDash',
    earningsRow1:  'Ganancias promedio semanales',
    earningsRow2:  'Renta semanal Echelon',
    earningsRow3:  'Combustible est. (300mi @ 33MPG)',
    earningsTotal: 'Tu ganancia',
    earningsNote:  '* Estimados basados en ganancias promedio. Los resultados varían.',
    serveCtaH3:    '¿Listo para comenzar?',
    serveCtaP:     'Obtén tu renta hoy — ya sea para entregas, trabajo, un viaje o la vida diaria.',
    serveCtaBtn:   'Ver Carros Disponibles',

    pricingTag:    'Precios Económicos',
    pricingH2:     'Elige Tu Plan',
    pricingDesc:   'Todos los planes incluyen millaje ilimitado, opciones de seguro y asistencia en carretera 24/7 — sin cargos ocultos.',
    planDaily:     'Diario',
    planDailyDesc: 'Perfecto para necesidades a corto plazo',
    planWeekly:    'Semanal',
    planWeeklyDesc:'Ideal para trabajo constante',
    planMonthly:   'Mensual',
    planMonthlyDesc:'Máximo ahorro, máxima flexibilidad',
    popular:       'Más Popular',
    feat1d: '✓ Millaje ilimitado',             feat2d: '✓ Elige cualquier carro disponible',
    feat3d: '✓ Asistencia en carretera 24/7',  feat4d: '✓ Cancelación gratuita (24hrs de aviso)',
    feat5d: '✓ Seguro adicional disponible',
    feat1w: '✓ Todo lo del plan Diario',        feat2w: '✓ Ahorro vs. tarifa diaria',
    feat3w: '✓ Selección de carro prioritaria', feat4w: '✓ Cambio de carro una vez por semana',
    feat5w: '✓ Línea de soporte dedicada',
    feat1m: '✓ Todo lo del plan Semanal',       feat2m: '✓ La mejor tarifa general',
    feat3m: '✓ Mantenimiento completamente cubierto', feat4m: '✓ El mismo carro reservado para ti',
    feat5m: '✓ Recompensas por renovación',
    getStarted:    'Comenzar',
    pricingNote:   'Todos los precios mostrados son tarifas iniciales. El precio final depende del vehículo seleccionado. No se requiere depósito de seguridad para solicitantes calificados.',

    compareTag:         '¿Por Qué Echelon?',
    compareH2:          'Por Qué los Conductores Eligen Echelon',
    compareSubtitle:    'Las mismas calles. Una forma más inteligente de rentar.',
    compareCompHead:    'LA COMPETENCIA',
    compareEchHead:     'ECHELON',
    cFeat1: 'Sin Cargos Ocultos',       cFeat2: 'Tarifas Planas y Transparentes',
    cFeat3: '$0 Depósito de Seguridad', cFeat4: 'Millas Ilimitadas',
    cFeat5: 'Extensiones Gratuitas',    cFeat6: 'Entrega Local Gratis*',
    cFeat7: 'Diario / Semanal / Mensual', cFeat8: 'Hecho para Conductores Gig',
    compareBannerTitle: 'CONDUCTORES GIG BIENVENIDOS',
    compareBannerSub:   'UBER EATS · DOORDASH · GRUBHUB',
    compareDisclaimer:  '*Entrega local gratis · distancias mayores con costo adicional',
    compareTaglineMain: 'EXCELENCIA EN MOVIMIENTO',
    compareTaglineSub:  'NEW ENGLAND · @echelonrentalgroup',

    reviewsTag:    'Conductores Reales',
    reviewsH2:     'Lo Que Dicen Nuestros Clientes',
    review1:       '"Llevo 8 meses haciendo DoorDash a tiempo completo. La tarifa semanal de Echelon me deja más dinero en el bolsillo. El Corolla es super eficiente — exactamente lo que necesitaba."',
    review1Name:   'Marcus R.',
    review1Sub:    'Conductor DoorDash · 8 meses',
    review2:       '"Mi carro se descompuso y necesitaba algo el mismo día. Echelon me dio un Civic en 2 horas. El proceso fue muy fácil — solo mostré mi licencia y listo."',
    review2Name:   'Jessica L.',
    review2Sub:    'Conductora Uber Eats · 5 meses',
    review3:       '"Ninguna otra compañía ofrece millaje ilimitado a este precio. Manejo más de 400 millas a la semana para GrubHub y el plan mensual es la opción más económica que existe."',
    review3Name:   'Devon K.',
    review3Sub:    'Conductor GrubHub · 1 año',

    ctaH2:         '¿Listo para manejar?',
    ctaP:          'Únete a cientos de conductores — repartidores, viajeros y usuarios diarios — ya rodando con Echelon.',
    ctaBtn:        'Ver Carros Disponibles',
    ctaCall:       'Llámanos: 508-444-2276',

    footerDesc:    'Rentas asequibles y flexibles para conductores de reparto, viajeros, familias y cualquier persona que necesite un buen carro sin compromisos.',
    footerFleet:   'Flota',
    footerCompany: 'Empresa',
    footerContact: 'Contacto',
    footerHours:   'Lun–Dom: 7am – 9pm',
    footerEconomy: 'Carros Económicos',
    footerSedans:  'Sedanes',
    footerCompact: 'Carros Compactos',
    footerPricing: 'Ver Precios',
    footerHow:     '¿Por Qué Echelon?',
    footerGig:     'Programa de Conductores',
    footerFaq:     'Preguntas Frecuentes',
    footerContactLink: 'Contáctanos',
    footerPrivacy: 'Política de Privacidad',
    footerTerms:   'Términos de Servicio',
    footerCopy:    '© 2024 Echelon Rental Group. Todos los derechos reservados.',

    modalSubtitle: 'Completa tu reservación abajo',
    modalFirst:    'Nombre',
    modalLast:     'Apellido',
    modalPhone:    'Número de Teléfono',
    modalEmail:    'Correo Electrónico',
    modalPickup:   'Fecha de Recogida',
    modalReturn:   'Fecha de Devolución',
    modalUsage:    '¿Cómo usarás este carro?',
    modalUsage1:   'DoorDash',
    modalUsage2:   'GrubHub',
    modalUsage3:   'Uber Eats',
    modalUsage4:   'Uso Personal',
    modalUsage5:   'Otra Entrega',
    modalCheck:    'Confirmo que tengo una licencia de conducir válida y acepto los términos de alquiler.',
    modalSubmit:   'Solicitar Reservación',
    modalNote:     'Te llamaremos en 1 hora para confirmar y cobrar el pago.',

    toastTitle:    '¡Reservación Solicitada!',
    toastDesc:     'Te llamaremos en 1 hora para confirmar.',
    modalBookPrefix: 'Reservar —',
  },

  /* ── PORTUGUÊS ── */
  pt: {
    navFleet:      'Frota',
    navPricing:    'Preços',
    navServe:      'Quem Atendemos',
    navHow:        'Por Que Echelon?',
    navBook:       'Reservar',
    navPhone:      '📞 508-444-2276',

    heroBadge:    'Aluguel Flexível · Para Todo Motorista e Necessidade',
    heroTitle:    'Dirija Mais,<br/><span class="accent">Ganhe Mais.</span>',
    heroSubtitle: 'A Echelon Rental Group oferece <strong>aluguel de carros acessível e flexível</strong> para entregadores, motoristas do dia a dia, famílias e qualquer pessoa. Carros compactos, sedãs e SUVs — disponíveis diário, semanal ou mensal.',
    platformEveryday: 'Uso Diário',

    widgetDaily:   'Diário',
    widgetWeekly:  'Semanal',
    widgetMonthly: 'Mensal',
    widgetPickup:  'Data de Retirada',
    widgetReturn:  'Data de Devolução',
    widgetType:    'Tipo de Veículo',
    widgetAny:     'Qualquer Veículo',
    widgetEconomy: 'Econômico',
    widgetSedan:   'Sedã',
    widgetCompact: 'Compacto',
    widgetBtn:     'Verificar Disponibilidade',
    widgetNote:    'Sem taxas ocultas · Cancelamento gratuito em até 24hrs',

    heroCarsLabel: 'Carros Disponíveis',
    heroMilesLabel:'Quilômetros Incluídos',

    statVehicles:  'Veículos na Frota',
    statStarting:  'A Partir Por Dia',
    statSupport:   'Suporte ao Cliente',
    statFees:      'Taxas Ocultas',

    fleetTag:      'Frota Econômica',
    fleetH2:       'Disponíveis Agora',
    fleetDesc:     'Carros compactos, sedãs e SUVs — toda a nossa frota está bem mantida, acessível e pronta para qualquer necessidade.',
    filterAll:     'Todos',
    filterEconomy: 'Econômico',
    filterSedan:   'Sedã',
    filterCompact: 'Compacto',
    filterSuv:     'SUV',
    cardAvailable: 'Disponível',
    cardLimited:   'Restam 3',
    cardPopular:   'Mais Popular',
    bookNow:       'Reservar Agora',
    perDay:        '/dia',
    perWk:         '/sem',
    perMo:         '/mês',
    specSeats:     'Lugares',
    specMpg:       'MPG',

    serveTag:      'Quem Atendemos',
    serveH2:       'Aluguel para Todos.',
    serveDesc:     'Seja você um entregador rodando para DoorDash ou Amazon Flex, um motorista que precisa de carro enquanto o seu está na oficina, uma família planejando uma viagem, ou simplesmente alguém que quer um veículo sem compromisso — a Echelon tem tudo para você com <strong>aluguel flexível e acessível</strong> e uma frota para cada necessidade.',
    serveEveryday: 'Motoristas do Dia a Dia',
    ben1Title:     'Sem compromissos de longo prazo',
    ben1Desc:      'Alugue por dia, estenda por semana ou fixe uma taxa mensal — você decide.',
    ben2Title:     'Quilometragem ilimitada incluída',
    ben2Desc:      'Dirija quantos quilômetros precisar. Sem limite de quilometragem.',
    ben3Title:     'Manutenção incluída',
    ben3Desc:      'Trocas de óleo, verificação de pneus — mantemos o carro rodando para você continuar ganhando.',
    ben4Title:     'Compactos, sedãs e SUVs',
    ben4Desc:      'Escolha o tamanho certo para sua viagem — de compactos econômicos a SUVs espaçosos.',
    earningsTitle: 'Estimativa de Ganhos Semanais',
    earningsBadge: 'Motorista DoorDash',
    earningsRow1:  'Ganhos médios semanais',
    earningsRow2:  'Aluguel semanal Echelon',
    earningsRow3:  'Combustível est. (300mi @ 33MPG)',
    earningsTotal: 'Seu lucro líquido',
    earningsNote:  '* Estimativas baseadas em ganhos médios. Resultados individuais variam.',
    serveCtaH3:    'Pronto para começar?',
    serveCtaP:     'Alugue hoje — para entregas, trabalho, uma viagem ou o dia a dia.',
    serveCtaBtn:   'Ver Carros Disponíveis',

    pricingTag:    'Preços Econômicos',
    pricingH2:     'Escolha Seu Plano',
    pricingDesc:   'Todos os planos incluem quilometragem ilimitada, opções de seguro e assistência 24/7 — sem taxas ocultas.',
    planDaily:     'Diário',
    planDailyDesc: 'Perfeito para necessidades de curto prazo',
    planWeekly:    'Semanal',
    planWeeklyDesc:'Ideal para trabalho constante',
    planMonthly:   'Mensal',
    planMonthlyDesc:'Máxima economia, máxima flexibilidade',
    popular:       'Mais Popular',
    feat1d: '✓ Quilometragem ilimitada',        feat2d: '✓ Escolha qualquer carro disponível',
    feat3d: '✓ Assistência em estrada 24/7',    feat4d: '✓ Cancelamento gratuito (aviso 24hrs)',
    feat5d: '✓ Seguro adicional disponível',
    feat1w: '✓ Tudo do plano Diário',           feat2w: '✓ Economia vs. tarifa diária',
    feat3w: '✓ Seleção prioritária de carro',   feat4w: '✓ Troca de carro uma vez por semana',
    feat5w: '✓ Linha de suporte dedicada',
    feat1m: '✓ Tudo do plano Semanal',          feat2m: '✓ Melhor tarifa geral',
    feat3m: '✓ Manutenção totalmente incluída', feat4m: '✓ Mesmo carro reservado para você',
    feat5m: '✓ Recompensas por renovação',
    getStarted:    'Começar',
    pricingNote:   'Todos os preços mostrados são tarifas iniciais. O preço final depende do veículo selecionado. Não é necessário depósito de segurança para solicitantes qualificados.',

    compareTag:         'Por Que Echelon?',
    compareH2:          'Por Que os Motoristas Escolhem a Echelon',
    compareSubtitle:    'As mesmas ruas. Uma forma mais inteligente de alugar.',
    compareCompHead:    'A CONCORRÊNCIA',
    compareEchHead:     'ECHELON',
    cFeat1: 'Sem Taxas Ocultas',         cFeat2: 'Tarifas Planas e Transparentes',
    cFeat3: '$0 Depósito de Segurança',  cFeat4: 'Quilometragem Ilimitada',
    cFeat5: 'Extensões Gratuitas',       cFeat6: 'Entrega Local Grátis*',
    cFeat7: 'Diário / Semanal / Mensal', cFeat8: 'Feito para Motoristas Gig',
    compareBannerTitle: 'MOTORISTAS GIG BEM-VINDOS',
    compareBannerSub:   'UBER EATS · DOORDASH · GRUBHUB',
    compareDisclaimer:  '*Entrega local grátis · distâncias maiores com custo adicional',
    compareTaglineMain: 'EXCELÊNCIA EM MOVIMENTO',
    compareTaglineSub:  'NEW ENGLAND · @echelonrentalgroup',

    reviewsTag:    'Motoristas Reais',
    reviewsH2:     'O Que Nossos Clientes Dizem',
    review1:       '"Faço DoorDash em tempo integral há 8 meses. A tarifa semanal da Echelon deixa mais dinheiro no meu bolso. O Corolla é super econômico — exatamente o que precisava."',
    review1Name:   'Marcus R.',
    review1Sub:    'Motorista DoorDash · 8 meses',
    review2:       '"Meu carro quebrou e precisei de um no mesmo dia. A Echelon me entregou um Civic em 2 horas. O processo foi simples — mostrei minha habilitação e pronto."',
    review2Name:   'Jessica L.',
    review2Sub:    'Motorista Uber Eats · 5 meses',
    review3:       '"Nenhuma outra locadora oferece quilometragem ilimitada nesse preço. Rodo mais de 400 milhas por semana para o GrubHub e o plano mensal é de longe a opção mais econômica."',
    review3Name:   'Devon K.',
    review3Sub:    'Motorista GrubHub · 1 ano',

    ctaH2:         'Pronto para Dirigir?',
    ctaP:          'Junte-se a centenas de motoristas — entregadores, commuters e usuários do dia a dia — já rodando com a Echelon.',
    ctaBtn:        'Ver Carros Disponíveis',
    ctaCall:       'Ligue: 508-444-2276',

    footerDesc:    'Aluguel acessível e flexível para entregadores, motoristas, famílias e qualquer pessoa que precisa de um bom carro sem compromisso.',
    footerFleet:   'Frota',
    footerCompany: 'Empresa',
    footerContact: 'Contato',
    footerHours:   'Seg–Dom: 7h – 21h',
    footerEconomy: 'Carros Econômicos',
    footerSedans:  'Sedãs',
    footerCompact: 'Carros Compactos',
    footerPricing: 'Ver Preços',
    footerHow:     'Por Que Echelon?',
    footerGig:     'Programa para Motoristas',
    footerFaq:     'Perguntas Frequentes',
    footerContactLink: 'Fale Conosco',
    footerPrivacy: 'Política de Privacidade',
    footerTerms:   'Termos de Serviço',
    footerCopy:    '© 2024 Echelon Rental Group. Todos os direitos reservados.',

    modalSubtitle: 'Preencha sua reserva abaixo',
    modalFirst:    'Nome',
    modalLast:     'Sobrenome',
    modalPhone:    'Telefone',
    modalEmail:    'E-mail',
    modalPickup:   'Data de Retirada',
    modalReturn:   'Data de Devolução',
    modalUsage:    'Como Você Vai Usar Este Carro?',
    modalUsage1:   'DoorDash',
    modalUsage2:   'GrubHub',
    modalUsage3:   'Uber Eats',
    modalUsage4:   'Uso Pessoal',
    modalUsage5:   'Outra Entrega',
    modalCheck:    'Confirmo que tenho habilitação válida e concordo com os termos do aluguel.',
    modalSubmit:   'Solicitar Reserva',
    modalNote:     'Ligaremos em até 1 hora para confirmar e cobrar o pagamento.',

    toastTitle:    'Reserva Solicitada!',
    toastDesc:     'Ligaremos em até 1 hora para confirmar.',
    modalBookPrefix: 'Reservar —',
  }
};

/* ──────────────────────────────────────────
   LANGUAGE APPLICATION
────────────────────────────────────────── */
let currentLang = localStorage.getItem('echelon-lang') || 'en';
let currentModalPrices = { daily: '88', weekly: '440', monthly: '1300' };

function applyLang(lang) {
  const t = i18n[lang] || i18n.en;
  currentLang = lang;
  localStorage.setItem('echelon-lang', lang);

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
  const setText = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
  const setAll = (sel, txt) => $$(sel).forEach(el => el.textContent = txt);
  const setAllHTML = (sel, html) => $$(sel).forEach(el => el.innerHTML = html);
  const setAttr = (sel, attr, val) => { const el = $(sel); if (el) el.setAttribute(attr, val); };

  // ── Language button label ──
  setText('#langLabel', lang.toUpperCase());
  $$('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // ── Nav ──
  setText('.nav-links a[href="#fleet"]', t.navFleet);
  setText('.nav-links a[href="#pricing"]', t.navPricing);
  setText('.nav-links a[href="#gig-workers"]', t.navServe);
  setText('.nav-links a[href="#compare"]', t.navHow);
  setText('#navBookBtn', t.navBook);
  setText('#mobileFleet', t.navFleet);
  setText('#mobilePricing', t.navPricing);
  setText('#mobileServe', t.navServe);
  setText('#mobileHow', t.navHow);
  setText('#mobileBookBtn', t.navBook);

  // ── Hero ──
  setText('.hero-badge', t.heroBadge);
  set('.hero-title', t.heroTitle);
  set('.hero-subtitle', t.heroSubtitle);
  setText('.platform-tag.everyday', t.platformEveryday);

  // Widget tabs (hero + modal)
  $$('.wtab[data-plan="daily"]').forEach(el => el.textContent = t.widgetDaily);
  $$('.wtab[data-plan="weekly"]').forEach(el => el.textContent = t.widgetWeekly);
  $$('.wtab[data-plan="monthly"]').forEach(el => el.textContent = t.widgetMonthly);

  // Widget field labels
  const wLabels = $$('.widget-field label');
  if (wLabels[0]) wLabels[0].textContent = t.widgetPickup;
  if (wLabels[1]) wLabels[1].textContent = t.widgetReturn;
  if (wLabels[2]) wLabels[2].textContent = t.widgetType;

  // Vehicle type select options
  const vSel = $('#vehicleType');
  if (vSel && vSel.options.length >= 4) {
    vSel.options[0].text = t.widgetAny;
    vSel.options[1].text = t.widgetEconomy;
    vSel.options[2].text = t.widgetSedan;
    vSel.options[3].text = t.widgetCompact;
  }

  setText('.btn-search', t.widgetBtn);
  setText('.widget-note', t.widgetNote);
  setText('.stat-1 .stat-label', t.heroCarsLabel);
  setText('.stat-2 .stat-label', t.heroMilesLabel);

  // ── Stats bar ──
  const statLabels = $$('.stat-item span');
  if (statLabels[0]) statLabels[0].textContent = t.statVehicles;
  if (statLabels[1]) statLabels[1].textContent = t.statStarting;
  if (statLabels[2]) statLabels[2].textContent = t.statSupport;
  if (statLabels[3]) statLabels[3].textContent = t.statFees;

  // ── Fleet ──
  const fleetTags = $$('.fleet .section-tag');
  if (fleetTags[0]) fleetTags[0].textContent = t.fleetTag;
  const fleetH2s = $$('.fleet .section-header h2');
  if (fleetH2s[0]) fleetH2s[0].textContent = t.fleetH2;
  const fleetDescs = $$('.fleet .section-header p');
  if (fleetDescs[0]) fleetDescs[0].textContent = t.fleetDesc;

  // Fleet filters
  const filters = $$('.filter-btn');
  if (filters[0]) filters[0].textContent = t.filterAll;
  if (filters[1]) filters[1].textContent = t.filterCompact;
  if (filters[2]) filters[2].textContent = t.filterSedan;
  if (filters[3]) filters[3].textContent = t.filterSuv;

  // Car availability badges
  $$('.car-available:not(.limited)').forEach(el => el.textContent = t.cardAvailable);
  $$('.car-available.limited').forEach(el => el.textContent = t.cardLimited);
  $$('.car-popular-badge').forEach(el => el.textContent = t.cardPopular);

  // Book Now buttons (car cards)
  $$('.btn-book').forEach(el => el.textContent = t.bookNow);

  // Car alt prices per-unit labels
  $$('.car-alt-prices small').forEach((el, i) => {
    el.textContent = i % 2 === 0 ? t.perWk : t.perMo;
  });

  // Car specs (seats label inside emoji spans — only update the text after the emoji)
  // The specs format is "🪑 5 Seats" — update all seat/mpg labels
  $$('.car-specs span').forEach(el => {
    const text = el.textContent;
    if (text.includes('Seat') || text.includes('Asient') || text.includes('Lugar')) {
      const num = text.match(/\d+/)?.[0] || '5';
      el.textContent = `🪑 ${num} ${t.specSeats}`;
    }
    if (text.includes('MPG')) {
      const num = text.match(/\d+/)?.[0] || '32';
      el.textContent = `⛽ ${num} ${t.specMpg}`;
    }
  });

  // ── Who We Serve ──
  const serveSectionTag = $('.gig-section .section-tag');
  if (serveSectionTag) serveSectionTag.textContent = t.serveTag;

  const serveH2 = $('.gig-content h2');
  if (serveH2) serveH2.textContent = t.serveH2;

  set('.gig-desc', t.serveDesc);

  // Platform logo last card (Everyday Drivers)
  const platformCards = $$('.platform-logo-card span:last-child');
  if (platformCards[4]) platformCards[4].textContent = t.serveEveryday;

  // Benefits
  const benItems = $$('.benefit-item');
  const benData = [
    [t.ben1Title, t.ben1Desc],
    [t.ben2Title, t.ben2Desc],
    [t.ben3Title, t.ben3Desc],
    [t.ben4Title, t.ben4Desc],
  ];
  benItems.forEach((item, i) => {
    if (!benData[i]) return;
    const strong = item.querySelector('strong');
    const p = item.querySelector('p');
    if (strong) strong.textContent = benData[i][0];
    if (p) p.textContent = benData[i][1];
  });

  // Earnings card
  setText('.earnings-header span:first-child', t.earningsTitle);
  setText('.earnings-badge', t.earningsBadge);
  const eRows = $$('.earnings-row span');
  if (eRows[0]) eRows[0].textContent = t.earningsRow1;
  if (eRows[1]) eRows[1].textContent = t.earningsRow2;
  if (eRows[2]) eRows[2].textContent = t.earningsRow3;
  if (eRows[3]) eRows[3].textContent = t.earningsTotal;
  setText('.earnings-disclaimer', t.earningsNote);

  // Serve CTA card
  setText('.gig-cta-card h3', t.serveCtaH3);
  setText('.gig-cta-card p', t.serveCtaP);
  setText('.gig-cta-card .btn', t.serveCtaBtn);

  // ── Pricing ──
  const pTags = $$('.pricing .section-tag');
  if (pTags[0]) pTags[0].textContent = t.pricingTag;
  const pH2s = $$('.pricing .section-header h2');
  if (pH2s[0]) pH2s[0].textContent = t.pricingH2;
  const pDescs = $$('.pricing .section-header p');
  if (pDescs[0]) pDescs[0].textContent = t.pricingDesc;

  const pCards = $$('.pricing-card');
  if (pCards[0]) {
    pCards[0].querySelector('.pricing-card-header h3').textContent = t.planDaily;
    pCards[0].querySelector('.pricing-card-header p').textContent = t.planDailyDesc;
    const f = pCards[0].querySelectorAll('.pricing-features li');
    [t.feat1d,t.feat2d,t.feat3d,t.feat4d,t.feat5d].forEach((txt,i) => { if(f[i]) f[i].textContent = txt; });
    const btn0 = pCards[0].querySelector('.btn');
    if (btn0) btn0.textContent = t.getStarted;
  }
  if (pCards[1]) {
    setText('.pricing-popular-tag', t.popular);
    pCards[1].querySelector('.pricing-card-header h3').textContent = t.planWeekly;
    pCards[1].querySelector('.pricing-card-header p').textContent = t.planWeeklyDesc;
    const f = pCards[1].querySelectorAll('.pricing-features li');
    [t.feat1w,t.feat2w,t.feat3w,t.feat4w,t.feat5w].forEach((txt,i) => { if(f[i]) f[i].textContent = txt; });
    const btn1 = pCards[1].querySelector('.btn');
    if (btn1) btn1.textContent = t.getStarted;
  }
  if (pCards[2]) {
    pCards[2].querySelector('.pricing-card-header h3').textContent = t.planMonthly;
    pCards[2].querySelector('.pricing-card-header p').textContent = t.planMonthlyDesc;
    const f = pCards[2].querySelectorAll('.pricing-features li');
    [t.feat1m,t.feat2m,t.feat3m,t.feat4m,t.feat5m].forEach((txt,i) => { if(f[i]) f[i].textContent = txt; });
    const btn2 = pCards[2].querySelector('.btn');
    if (btn2) btn2.textContent = t.getStarted;
  }
  setText('.pricing-note', t.pricingNote);

  // ── Compare Section ──
  setText('#compareTag',         t.compareTag);
  setText('#compareH2',          t.compareH2);
  set('#compareSubtitle',        `<em>${t.compareSubtitle}</em>`);
  setText('#compareCompHead',    t.compareCompHead);
  setText('#compareEchHead',     t.compareEchHead);
  setText('#cFeat1', t.cFeat1); setText('#cFeat2', t.cFeat2);
  setText('#cFeat3', t.cFeat3); setText('#cFeat4', t.cFeat4);
  setText('#cFeat5', t.cFeat5); setText('#cFeat6', t.cFeat6);
  setText('#cFeat7', t.cFeat7); setText('#cFeat8', t.cFeat8);
  setText('#compareBannerTitle', t.compareBannerTitle);
  setText('#compareBannerSub',   t.compareBannerSub);
  setText('#compareDisclaimer',  t.compareDisclaimer);
  setText('#compareTaglineMain', t.compareTaglineMain);
  setText('#compareTaglineSub',  t.compareTaglineSub);

  // ── Testimonials ──
  const revTags = $$('.testimonials .section-tag');
  if (revTags[0]) revTags[0].textContent = t.reviewsTag;
  const revH2s = $$('.testimonials .section-header h2');
  if (revH2s[0]) revH2s[0].textContent = t.reviewsH2;

  const revCards = $$('.testimonial-card');
  const revData = [
    [t.review1, t.review1Name, t.review1Sub],
    [t.review2, t.review2Name, t.review2Sub],
    [t.review3, t.review3Name, t.review3Sub],
  ];
  revCards.forEach((card, i) => {
    if (!revData[i]) return;
    const p = card.querySelector('p');
    const name = card.querySelector('.testimonial-author strong');
    const sub  = card.querySelector('.testimonial-author span');
    if (p)    p.textContent    = revData[i][0];
    if (name) name.textContent = revData[i][1];
    if (sub)  sub.textContent  = revData[i][2];
  });

  // ── CTA Banner ──
  setText('.cta-text h2', t.ctaH2);
  setText('.cta-text p', t.ctaP);
  const ctaBtns = $$('.cta-actions .btn');
  if (ctaBtns[0]) ctaBtns[0].textContent = t.ctaBtn;
  if (ctaBtns[1]) ctaBtns[1].textContent = t.ctaCall;

  // ── Footer ──
  setText('.footer-brand p', t.footerDesc);

  const fHeadings = $$('.footer-links h4');
  if (fHeadings[0]) fHeadings[0].textContent = t.footerFleet;
  if (fHeadings[1]) fHeadings[1].textContent = t.footerCompany;
  if (fHeadings[2]) fHeadings[2].textContent = t.footerContact;

  const fFleetLinks = $$('.footer-inner .footer-links:nth-child(2) a');
  if (fFleetLinks[0]) fFleetLinks[0].textContent = t.footerEconomy;
  if (fFleetLinks[1]) fFleetLinks[1].textContent = t.footerSedans;
  if (fFleetLinks[2]) fFleetLinks[2].textContent = t.footerCompact;
  if (fFleetLinks[3]) fFleetLinks[3].textContent = t.footerPricing;

  const fCompLinks = $$('.footer-inner .footer-links:nth-child(3) a');
  if (fCompLinks[0]) fCompLinks[0].textContent = t.footerHow;
  if (fCompLinks[1]) fCompLinks[1].textContent = t.footerGig;
  if (fCompLinks[2]) fCompLinks[2].textContent = t.footerFaq;
  if (fCompLinks[3]) fCompLinks[3].textContent = t.footerContactLink;

  setText('.footer-hours', t.footerHours);
  setText('.footer-bottom p', t.footerCopy);

  const fLegal = $$('.footer-legal a');
  if (fLegal[0]) fLegal[0].textContent = t.footerPrivacy;
  if (fLegal[1]) fLegal[1].textContent = t.footerTerms;

  // ── Modal ──
  setText('.modal-header p', t.modalSubtitle);

  const mTabs = $$('.modal-tab');
  if (mTabs[0]) mTabs[0].textContent = t.widgetDaily;
  if (mTabs[1]) mTabs[1].textContent = t.widgetWeekly;
  if (mTabs[2]) mTabs[2].textContent = t.widgetMonthly;

  const mLabels = $$('.modal-form .form-group label');
  const labelMap = [
    t.modalFirst, t.modalLast, t.modalPhone,
    t.modalEmail, t.modalPickup, t.modalReturn, t.modalUsage
  ];
  mLabels.forEach((label, i) => {
    if (labelMap[i]) label.textContent = labelMap[i];
  });

  const usageSel = $('.modal-form select');
  if (usageSel && usageSel.options.length >= 5) {
    usageSel.options[0].text = t.modalUsage1;
    usageSel.options[1].text = t.modalUsage2;
    usageSel.options[2].text = t.modalUsage3;
    usageSel.options[3].text = t.modalUsage4;
    usageSel.options[4].text = t.modalUsage5;
  }

  const checkLabel = $('.checkbox-label');
  if (checkLabel) {
    const cb = checkLabel.querySelector('input[type="checkbox"]');
    checkLabel.innerHTML = '';
    if (cb) checkLabel.appendChild(cb);
    checkLabel.appendChild(document.createTextNode(' ' + t.modalCheck));
  }

  setText('.modal-form .btn-full', t.modalSubmit);
  setText('.modal-note', t.modalNote);

  // ── Toast ──
  setText('.toast strong', t.toastTitle);
  setText('.toast p', t.toastDesc);

  // Update modal unit label if open
  updateModalUnit();
}

/* ──────────────────────────────────────────
   LANGUAGE SWITCHER TOGGLE
────────────────────────────────────────── */
const langSwitcher = document.getElementById('langSwitcher');
const langBtn      = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

langBtn && langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langSwitcher.classList.toggle('open');
  langDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
  langSwitcher && langSwitcher.classList.remove('open');
  langDropdown && langDropdown.classList.remove('open');
});

document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    applyLang(btn.dataset.lang);
    langSwitcher && langSwitcher.classList.remove('open');
    langDropdown && langDropdown.classList.remove('open');
    // Close mobile menu
    document.getElementById('mobileMenu').classList.remove('open');
  });
});


/* ──────────────────────────────────────────
   STICKY NAV
────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* ──────────────────────────────────────────
   MOBILE MENU
────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ──────────────────────────────────────────
   DEFAULT DATES
────────────────────────────────────────── */
(function setDefaultDates() {
  const today    = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const toISO = d => d.toISOString().split('T')[0];

  const pickupEl = document.getElementById('pickupDate');
  const returnEl = document.getElementById('returnDate');
  if (pickupEl) { pickupEl.value = toISO(today); pickupEl.min = toISO(today); }
  if (returnEl) { returnEl.value = toISO(tomorrow); returnEl.min = toISO(tomorrow); }

  if (pickupEl && returnEl) {
    pickupEl.addEventListener('change', () => {
      const p = new Date(pickupEl.value);
      const r = new Date(returnEl.value);
      if (r <= p) {
        const next = new Date(p);
        next.setDate(p.getDate() + 1);
        returnEl.value = toISO(next);
      }
      returnEl.min = pickupEl.value;
    });
  }
})();

/* ──────────────────────────────────────────
   HERO WIDGET TABS
────────────────────────────────────────── */
document.querySelectorAll('.wtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.wtab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* ──────────────────────────────────────────
   FLEET FILTERS
────────────────────────────────────────── */
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleEl);

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.car-card').forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'fadeInUp 0.3s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ──────────────────────────────────────────
   SCROLL TO FLEET
────────────────────────────────────────── */
function scrollToFleet() {
  document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
}

/* ──────────────────────────────────────────
   BOOKING MODAL
────────────────────────────────────────── */
function openModal(carName, daily, weekly, monthly) {
  currentModalPrices = { daily, weekly, monthly };
  const t = i18n[currentLang] || i18n.en;
  document.getElementById('modalCarName').textContent = `${t.modalBookPrefix} ${carName}`;

  document.querySelectorAll('.modal-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector('.modal-tab[data-modal-plan="daily"]').classList.add('active');
  updateModalUnit();

  const pickup = document.getElementById('pickupDate').value;
  const ret    = document.getElementById('returnDate').value;
  if (pickup) document.getElementById('modalPickup').value = pickup;
  if (ret)    document.getElementById('modalReturn').value = ret;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateModalUnit() {
  const t = i18n[currentLang] || i18n.en;
  const activeTab = document.querySelector('.modal-tab.active');
  const plan = activeTab ? activeTab.dataset.modalPlan : 'daily';
  const priceEl = document.getElementById('modalPrice');
  const unitEl  = document.getElementById('modalUnit');
  const unitMap = { daily: t.perDay, weekly: t.perWk, monthly: t.perMo };
  if (priceEl) priceEl.textContent = `$${currentModalPrices[plan]}`;
  if (unitEl)  unitEl.textContent  = unitMap[plan] || t.perDay;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    updateModalUnit();
  });
});

document.getElementById('modalOverlay').addEventListener('click', closeModal);
document.querySelector('.modal').addEventListener('click', e => e.stopPropagation());
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ──────────────────────────────────────────
   BOOKING FORM SUBMIT
────────────────────────────────────────── */
function submitBooking(e) {
  e.preventDefault();
  closeModal();
  showToast();
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

/* ──────────────────────────────────────────
   SCROLL ANIMATIONS
────────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.car-card, .pricing-card, .step-card, .testimonial-card, .benefit-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

/* ──────────────────────────────────────────
   SMOOTH ANCHORS
────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ──────────────────────────────────────────
   INIT — apply saved language on load
────────────────────────────────────────── */
applyLang(currentLang);
