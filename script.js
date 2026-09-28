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
    heroTitle:    'Go Anywhere.<br/><span class="accent">Pay Less.</span>',
    heroSubtitle: 'Echelon offers <strong>affordable, flexible car rentals</strong> for whatever life brings: weekend getaways, road trips, family visits, the daily commute, or a car while yours is in the shop. Compact cars, sedans, and SUVs, available by the day, week, or month.',

    /* Booking widget */
    widgetDaily:    'Daily',
    widgetWeekly:   'Weekly',
    widgetMonthly:  'Monthly',
    widgetPickup:   'Pick-Up Date',
    widgetReturn:   'Return Date',
    widgetType:     'Vehicle Type',
    widgetAny:      'Any Vehicle',
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
    fleetInsuranceNote: '<strong>A note on insurance:</strong> The prices above apply to renters who carry their own auto insurance. Don\'t have a policy? No problem — we offer coverage for the full length of your rental, available to purchase directly from us at booking.',
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
    serveH2:       'A Car for Every Reason.',
    serveDesc:     'Heading away for the weekend, visiting family, or waiting on your own car to come out of the shop? Need a dependable ride for the daily commute, or a car for a few weeks of delivery work? Echelon has you covered with <strong>flexible, affordable rentals</strong> and a fleet to match every need.',
    priceFrom: 'from',
    photoNote: 'Example vehicle',
    carDescCompact: 'Fuel-Efficient · Automatic', carDescSedan: 'Comfortable &amp; Spacious · Automatic', carDescSuv: 'Room for Family &amp; Cargo · Automatic',
    useCard1: 'Weekend Getaways', useCard2: 'Car in the Shop', useCard3: 'Daily Commuting',
    useCard4: 'Family &amp; Events', useCard5: 'Delivery &amp; Gig Work',
    ben1Title:     'No long-term commitments',
    ben1Desc:      'Rent daily, extend weekly, or lock in a monthly rate — your call.',
    ben2Title:     'Unlimited mileage included',
    ben2Desc:      'Road trip, long commute, or a full week of deliveries: drive as far as you need. No mileage caps.',
    ben3Title:     'Maintenance handled',
    ben3Desc:      'Oil changes, tire checks — we keep the car running so you can focus on the road.',
    ben4Title:     'Compact cars, sedans & SUVs',
    ben4Desc:      'Choose the right size for your trip — from fuel-efficient compacts to spacious SUVs.',
    earningsTitle: 'Gig Driver? Do the Math',
    earningsBadge: 'DoorDash Example',
    earningsRow1:  'Avg. weekly earnings',
    earningsRow2:  'Echelon weekly rental',
    earningsRow3:  'Est. fuel (300mi @ 33MPG)',
    earningsTotal: 'Your take-home',
    earningsNote:  '* Estimates based on average gig earnings. Individual results vary.',
    serveCtaH3:    'Need a car this week?',
    serveCtaP:     'Book today for a weekend away, the daily commute, a car while yours is in the shop, or a week of deliveries.',
    serveCtaBtn:   'View Available Cars',

    /* Pricing */
    pricingTag:    'Economic Pricing',
    pricingH2:     'Pick Your Plan',
    pricingDesc:   'All plans include unlimited miles, insurance options, and 24/7 roadside support — no hidden fees, no matter why you\'re renting.',
    planDaily:     'Daily',
    planDailyDesc: 'Perfect for short-term needs',
    planWeekly:    'Weekly',
    planWeeklyDesc:'Best for longer trips & steady driving',
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
    compareH2:          'Why Renters Choose Echelon',
    compareSubtitle:    'Same roads. A smarter way to rent.',
    compareCompHead:    'THE COMPETITION',
    compareEchHead:     'ECHELON',
    cFeat1: 'No Hidden Fees',        cFeat2: 'Flat, Transparent Rates',
    cFeat3: '$0 Security Deposit',   cFeat4: 'Unlimited Miles',
    cFeat5: 'Free Rental Extensions',cFeat6: 'Free Local Delivery*',
    cFeat7: 'Daily / Weekly / Monthly', cFeat8: 'Delivery & Gig Work Allowed',
    compareBannerTitle: 'EVERY TRIP WELCOME',
    compareBannerSub:   'WEEKEND TRIPS · COMMUTES · ERRANDS · GIG WORK',
    compareDisclaimer:  '*Free local delivery · longer distances priced by distance',
    compareTaglineMain: 'EXCELLENCE IN MOTION',
    compareTaglineSub:  'NEW ENGLAND · @echelonrentalgroup',

    /* Testimonials */
    reviewsTag:    'Real Renters',
    reviewsH2:     'What Our Renters Say',
    review1:       '"I\'ve been doing DoorDash full-time for 8 months. Echelon\'s weekly rate keeps more of my earnings in my pocket. The compact I got is super fuel efficient — exactly what I needed."',
    review1Name:   'Marcus R.',
    review1Sub:    'DoorDash Driver · 8 months',
    review2:       '"My car broke down and I needed something same day. Echelon had me in a compact within 2 hours. The process was so easy — just showed my license and I was out the door."',
    review2Name:   'Jessica L.',
    review2Sub:    'Uber Eats Driver · 5 months',
    review3:       '"No other rental company offers unlimited miles at this price point. I drive 400+ miles a week for GrubHub and the monthly plan is by far the most economic option out there."',
    review3Name:   'Devon K.',
    review3Sub:    'GrubHub Driver · 1 year',

    /* CTA */
    ctaH2:         'Ready to hit the road?',
    ctaP:          'Join hundreds of renters — commuters, travelers, families, and gig drivers — already rolling with Echelon.',
    ctaBtn:        'View Available Cars',
    ctaCall:       'Call Us: 508-444-2276',

    /* Hero use-case tags */
    useWeekend: 'Weekend Trips', useRoadTrip: 'Road Trips', useCommute: 'Commuting',
    useShop: 'Car in the Shop', useGig: 'Delivery Work',

    /* FAQ */
    navFaq:  'FAQ',
    faqTag:  'FAQ',
    faqH2:   'Frequently Asked Questions',
    faqDesc: 'Everything you need to know before you book. Can\'t find your answer? Call or text us any time at 508-444-2276.',
    faqQ1: 'What do I need to rent a car?',
    faqA1: 'You\'ll need to be 21 or older with a valid driver\'s license. Bring your own auto insurance, or add coverage from us for the full length of your rental when you book.',
    faqQ2: 'Is there a security deposit?',
    faqA2: 'Qualified renters pay a $0 security deposit. We\'ll confirm what applies to you when we call to confirm your reservation.',
    faqQ3: 'Are the miles really unlimited?',
    faqA3: 'Yes. Every daily, weekly, and monthly rental includes unlimited miles, so take the road trip. Just let us know before you leave New England.',
    faqQ4: 'Can I use the car for delivery apps?',
    faqA4: 'Yes. DoorDash, Grubhub, Uber Eats, Amazon Flex, and other delivery work are welcome. Passenger rideshare needs our approval first. Many personal policies don\'t cover delivery work, so ask us about coverage when you book.',
    faqQ5: 'Can you deliver the car to me?',
    faqA5: 'Yes. Local delivery and pickup are free. Longer distances are priced by distance, and we\'ll quote it when you book.',
    faqQ6: 'What if my plans change?',
    faqA6: 'Cancel with at least 24 hours\' notice at no charge. Need the car longer? Rental extensions are free at your plan\'s rate, subject to availability.',
    faqAll: 'See All FAQs',

    /* Footer */
    footerDesc:      'Affordable, flexible car rentals for everyday life, from weekend trips to the daily commute. Part of the Echelon Rental Group family.',
    footerQuick:     'Quick Links',
    footerHome:      'Home',
    footerFleetLink: 'View the Fleet',
    footerPricing:   'Pricing &amp; Plans',
    footerBook:      'Book a Car',
    footerFaq:       'FAQs',
    footerCompany:   'Company',
    footerHow:       'Why Echelon',
    footerServe:     'Who We Serve',
    footerReviews:   'Renter Reviews',
    footerResources: 'Resources',
    footerPolicies:  'Rental Policies',
    footerCancel:    'Cancellation &amp; Refunds',
    footerTerms:     'Terms of Service',
    footerPrivacy:   'Privacy Policy',
    footerAccess:    'Accessibility',
    footerBrands:    'Echelon Brands',
    footerBoats:     'Boat Charters',
    footerJets:      'Jet Charters',
    footerExperiences: 'Experiences',
    footerContact:   'Contact',
    footerHours:     'Open 24 Hours, 7 Days a Week',
    footerCopy:      '© 2026 Echelon Rental Group. All rights reserved.',
    footerPrivacyShort: 'Privacy',
    footerTermsShort:   'Terms',

    /* Modal */
    modalSubtitle: 'Complete your reservation below',
    modalFirst:    'First Name',
    modalLast:     'Last Name',
    modalPhone:    'Phone Number',
    modalEmail:    'Email Address',
    modalPickup:   'Pick-Up Date',
    modalReturn:   'Return Date',
    modalUsage:    'How Will You Use This Car?',
    useOpt0: 'Choose one…',
    useOpt1: 'Personal / Everyday Use',
    useOpt2: 'Weekend Trip or Vacation',
    useOpt3: 'Car in the Shop / Insurance Replacement',
    useOpt4: 'Commuting to Work',
    useOpt5: 'Family Visit or Special Event',
    useOpt6: 'Moving or Errands',
    useOpt7: 'Delivery Apps (DoorDash, Uber Eats, etc.)',
    useOpt8: 'Rideshare (Uber / Lyft) — needs approval',
    useOpt9: 'Other',
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
    heroTitle:    'Ve a Donde Quieras.<br/><span class="accent">Paga Menos.</span>',
    heroSubtitle: 'Echelon ofrece <strong>rentas de autos asequibles y flexibles</strong> para lo que la vida traiga: escapadas de fin de semana, viajes por carretera, visitas familiares, el trayecto diario o un carro mientras el tuyo está en el taller. Carros compactos, sedanes y SUVs, disponibles por día, semana o mes.',

    widgetDaily:   'Diario',
    widgetWeekly:  'Semanal',
    widgetMonthly: 'Mensual',
    widgetPickup:  'Fecha de Recogida',
    widgetReturn:  'Fecha de Devolución',
    widgetType:    'Tipo de Vehículo',
    widgetAny:     'Cualquier Vehículo',
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
    fleetInsuranceNote: '<strong>Una nota sobre el seguro:</strong> Los precios anteriores aplican a quienes cuentan con su propia póliza de seguro de auto. ¿No tienes una? No hay problema — ofrecemos cobertura durante toda la duración de tu alquiler, disponible para comprar directamente con nosotros al momento de reservar.',
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
    serveH2:       'Un Carro para Cada Razón.',
    serveDesc:     '¿Te vas de fin de semana, visitas a la familia o esperas que tu carro salga del taller? ¿Necesitas un transporte confiable para el trayecto diario o un carro para unas semanas de reparto? Echelon te cubre con <strong>rentas flexibles y asequibles</strong> y una flota para cada necesidad.',
    priceFrom: 'desde',
    photoNote: 'Vehículo de ejemplo',
    carDescCompact: 'Bajo Consumo · Automático', carDescSedan: 'Cómodo y Espacioso · Automático', carDescSuv: 'Espacio para Familia y Equipaje · Automático',
    useCard1: 'Escapadas de Fin de Semana', useCard2: 'Carro en el Taller', useCard3: 'Trayecto Diario',
    useCard4: 'Familia y Eventos', useCard5: 'Reparto y Trabajo por App',
    ben1Title:     'Sin compromisos a largo plazo',
    ben1Desc:      'Renta por día, extiende por semana o fija una tarifa mensual — tú decides.',
    ben2Title:     'Millaje ilimitado incluido',
    ben2Desc:      'Viaje por carretera, trayecto largo o una semana completa de repartos: maneja lo que necesites. Sin límite de millas.',
    ben3Title:     'Mantenimiento incluido',
    ben3Desc:      'Cambios de aceite, revisión de llantas — mantenemos el carro en marcha para que te enfoques en el camino.',
    ben4Title:     'Compactos, sedanes y SUVs',
    ben4Desc:      'Elige el tamaño adecuado — desde compactos eficientes hasta SUVs espaciosos.',
    earningsTitle: '¿Repartidor? Haz las Cuentas',
    earningsBadge: 'Ejemplo DoorDash',
    earningsRow1:  'Ganancias promedio semanales',
    earningsRow2:  'Renta semanal Echelon',
    earningsRow3:  'Combustible est. (300mi @ 33MPG)',
    earningsTotal: 'Tu ganancia',
    earningsNote:  '* Estimados basados en ganancias promedio. Los resultados varían.',
    serveCtaH3:    '¿Necesitas un carro esta semana?',
    serveCtaP:     'Reserva hoy para un fin de semana fuera, el trayecto diario, un carro mientras el tuyo está en el taller o una semana de repartos.',
    serveCtaBtn:   'Ver Carros Disponibles',

    pricingTag:    'Precios Económicos',
    pricingH2:     'Elige Tu Plan',
    pricingDesc:   'Todos los planes incluyen millaje ilimitado, opciones de seguro y asistencia en carretera 24/7 — sin cargos ocultos.',
    planDaily:     'Diario',
    planDailyDesc: 'Perfecto para necesidades a corto plazo',
    planWeekly:    'Semanal',
    planWeeklyDesc:'Ideal para viajes largos y uso constante',
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
    compareH2:          'Por Qué los Clientes Eligen Echelon',
    compareSubtitle:    'Las mismas calles. Una forma más inteligente de rentar.',
    compareCompHead:    'LA COMPETENCIA',
    compareEchHead:     'ECHELON',
    cFeat1: 'Sin Cargos Ocultos',       cFeat2: 'Tarifas Planas y Transparentes',
    cFeat3: '$0 Depósito de Seguridad', cFeat4: 'Millas Ilimitadas',
    cFeat5: 'Extensiones Gratuitas',    cFeat6: 'Entrega Local Gratis*',
    cFeat7: 'Diario / Semanal / Mensual', cFeat8: 'Se Permite Trabajo de Reparto',
    compareBannerTitle: 'TODO VIAJE ES BIENVENIDO',
    compareBannerSub:   'FINES DE SEMANA · TRAYECTOS · MANDADOS · REPARTO',
    compareDisclaimer:  '*Entrega local gratis · distancias mayores con costo adicional',
    compareTaglineMain: 'EXCELENCIA EN MOVIMIENTO',
    compareTaglineSub:  'NEW ENGLAND · @echelonrentalgroup',

    reviewsTag:    'Clientes Reales',
    reviewsH2:     'Lo Que Dicen Nuestros Clientes',
    review1:       '"Llevo 8 meses haciendo DoorDash a tiempo completo. La tarifa semanal de Echelon me deja más dinero en el bolsillo. El compacto que me dieron es súper eficiente — exactamente lo que necesitaba."',
    review1Name:   'Marcus R.',
    review1Sub:    'Conductor DoorDash · 8 meses',
    review2:       '"Mi carro se descompuso y necesitaba algo el mismo día. Echelon me dio un compacto en 2 horas. El proceso fue muy fácil — solo mostré mi licencia y listo."',
    review2Name:   'Jessica L.',
    review2Sub:    'Conductora Uber Eats · 5 meses',
    review3:       '"Ninguna otra compañía ofrece millaje ilimitado a este precio. Manejo más de 400 millas a la semana para GrubHub y el plan mensual es la opción más económica que existe."',
    review3Name:   'Devon K.',
    review3Sub:    'Conductor GrubHub · 1 año',

    ctaH2:         '¿Listo para manejar?',
    ctaP:          'Únete a cientos de clientes — viajeros diarios, turistas, familias y repartidores — que ya ruedan con Echelon.',
    ctaBtn:        'Ver Carros Disponibles',
    ctaCall:       'Llámanos: 508-444-2276',

    useWeekend: 'Fines de Semana', useRoadTrip: 'Viajes por Carretera', useCommute: 'Trayecto Diario',
    useShop: 'Tu Carro en el Taller', useGig: 'Trabajo de Reparto',

    navFaq:  'Preguntas',
    faqTag:  'Preguntas Frecuentes',
    faqH2:   'Preguntas Frecuentes',
    faqDesc: 'Todo lo que necesitas saber antes de reservar. ¿No encuentras tu respuesta? Llámanos o escríbenos cuando quieras al 508-444-2276.',
    faqQ1: '¿Qué necesito para rentar un carro?',
    faqA1: 'Debes tener 21 años o más y una licencia de conducir válida. Usa tu propio seguro de auto o agrega nuestra cobertura por toda la renta al reservar.',
    faqQ2: '¿Hay depósito de seguridad?',
    faqA2: 'Los clientes que califican pagan $0 de depósito. Te confirmamos lo que aplica en tu caso cuando te llamemos para confirmar la reserva.',
    faqQ3: '¿Las millas son realmente ilimitadas?',
    faqA3: 'Sí. Toda renta diaria, semanal y mensual incluye millas ilimitadas, así que haz ese viaje. Solo avísanos antes de salir de Nueva Inglaterra.',
    faqQ4: '¿Puedo usar el carro para apps de reparto?',
    faqA4: 'Sí. DoorDash, Grubhub, Uber Eats, Amazon Flex y otros trabajos de reparto son bienvenidos. Llevar pasajeros (rideshare) requiere nuestra aprobación previa. Muchas pólizas personales no cubren el reparto, así que pregúntanos por la cobertura al reservar.',
    faqQ5: '¿Pueden entregarme el carro?',
    faqA5: 'Sí. La entrega y recogida local son gratis. Las distancias más largas se cotizan según la distancia al reservar.',
    faqQ6: '¿Y si cambian mis planes?',
    faqA6: 'Cancela sin costo con al menos 24 horas de aviso. ¿Necesitas el carro más tiempo? Las extensiones son gratis a la tarifa de tu plan, sujeto a disponibilidad.',
    faqAll: 'Ver Todas las Preguntas',

    footerDesc:      'Rentas de autos asequibles y flexibles para el día a día, desde viajes de fin de semana hasta el trayecto diario. Parte de la familia Echelon Rental Group.',
    footerQuick:     'Enlaces Rápidos',
    footerHome:      'Inicio',
    footerFleetLink: 'Ver la Flota',
    footerPricing:   'Precios y Planes',
    footerBook:      'Reservar un Carro',
    footerFaq:       'Preguntas Frecuentes',
    footerCompany:   'Empresa',
    footerHow:       '¿Por Qué Echelon?',
    footerServe:     'A Quién Servimos',
    footerReviews:   'Reseñas',
    footerResources: 'Recursos',
    footerPolicies:  'Políticas de Renta',
    footerCancel:    'Cancelaciones y Reembolsos',
    footerTerms:     'Términos de Servicio',
    footerPrivacy:   'Política de Privacidad',
    footerAccess:    'Accesibilidad',
    footerBrands:    'Marcas Echelon',
    footerBoats:     'Charters de Botes',
    footerJets:      'Charters de Jets',
    footerExperiences: 'Experiencias',
    footerContact:   'Contacto',
    footerHours:     'Abierto las 24 Horas, los 7 Días de la Semana',
    footerCopy:      '© 2026 Echelon Rental Group. Todos los derechos reservados.',
    footerPrivacyShort: 'Privacidad',
    footerTermsShort:   'Términos',

    modalSubtitle: 'Completa tu reservación abajo',
    modalFirst:    'Nombre',
    modalLast:     'Apellido',
    modalPhone:    'Número de Teléfono',
    modalEmail:    'Correo Electrónico',
    modalPickup:   'Fecha de Recogida',
    modalReturn:   'Fecha de Devolución',
    modalUsage:    '¿Cómo usarás este carro?',
    useOpt0: 'Elige una opción…',
    useOpt1: 'Uso Personal / Diario',
    useOpt2: 'Fin de Semana o Vacaciones',
    useOpt3: 'Carro en el Taller / Reemplazo del Seguro',
    useOpt4: 'Ir al Trabajo',
    useOpt5: 'Visita Familiar o Evento Especial',
    useOpt6: 'Mudanza o Mandados',
    useOpt7: 'Apps de Reparto (DoorDash, Uber Eats, etc.)',
    useOpt8: 'Rideshare (Uber / Lyft) — requiere aprobación',
    useOpt9: 'Otro',
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
    heroTitle:    'Vá Aonde Quiser.<br/><span class="accent">Pague Menos.</span>',
    heroSubtitle: 'A Echelon oferece <strong>aluguel de carros acessível e flexível</strong> para tudo o que a vida pedir: escapadas de fim de semana, viagens de carro, visitas à família, o trajeto diário ou um carro enquanto o seu está na oficina. Carros compactos, sedãs e SUVs, disponíveis por dia, semana ou mês.',

    widgetDaily:   'Diário',
    widgetWeekly:  'Semanal',
    widgetMonthly: 'Mensal',
    widgetPickup:  'Data de Retirada',
    widgetReturn:  'Data de Devolução',
    widgetType:    'Tipo de Veículo',
    widgetAny:     'Qualquer Veículo',
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
    fleetInsuranceNote: '<strong>Uma nota sobre o seguro:</strong> Os preços acima se aplicam a quem já possui seguro de automóvel próprio. Não tem uma apólice? Sem problemas — oferecemos cobertura durante todo o período do aluguel, disponível para compra diretamente conosco no momento da reserva.',
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
    serveH2:       'Um Carro para Cada Motivo.',
    serveDesc:     'Vai viajar no fim de semana, visitar a família ou está esperando seu carro sair da oficina? Precisa de um carro confiável para o trajeto diário ou para algumas semanas de entregas? A Echelon tem <strong>aluguel flexível e acessível</strong> e uma frota para cada necessidade.',
    priceFrom: 'a partir de',
    photoNote: 'Veículo de exemplo',
    carDescCompact: 'Econômico · Automático', carDescSedan: 'Confortável e Espaçoso · Automático', carDescSuv: 'Espaço para Família e Bagagem · Automático',
    useCard1: 'Escapadas de Fim de Semana', useCard2: 'Carro na Oficina', useCard3: 'Trajeto Diário',
    useCard4: 'Família e Eventos', useCard5: 'Entregas e Trabalho por App',
    ben1Title:     'Sem compromissos de longo prazo',
    ben1Desc:      'Alugue por dia, estenda por semana ou fixe uma taxa mensal — você decide.',
    ben2Title:     'Quilometragem ilimitada incluída',
    ben2Desc:      'Viagem de carro, trajeto longo ou uma semana inteira de entregas: dirija o quanto precisar. Sem limite de milhas.',
    ben3Title:     'Manutenção incluída',
    ben3Desc:      'Troca de óleo, revisão de pneus — mantemos o carro rodando para você focar na estrada.',
    ben4Title:     'Compactos, sedãs e SUVs',
    ben4Desc:      'Escolha o tamanho certo para sua viagem — de compactos econômicos a SUVs espaçosos.',
    earningsTitle: 'Entregador? Faça as Contas',
    earningsBadge: 'Exemplo DoorDash',
    earningsRow1:  'Ganhos médios semanais',
    earningsRow2:  'Aluguel semanal Echelon',
    earningsRow3:  'Combustível est. (300mi @ 33MPG)',
    earningsTotal: 'Seu lucro líquido',
    earningsNote:  '* Estimativas baseadas em ganhos médios. Resultados individuais variam.',
    serveCtaH3:    'Precisa de um carro esta semana?',
    serveCtaP:     'Reserve hoje para um fim de semana fora, o trajeto diário, um carro enquanto o seu está na oficina ou uma semana de entregas.',
    serveCtaBtn:   'Ver Carros Disponíveis',

    pricingTag:    'Preços Econômicos',
    pricingH2:     'Escolha Seu Plano',
    pricingDesc:   'Todos os planos incluem quilometragem ilimitada, opções de seguro e assistência 24/7 — sem taxas ocultas.',
    planDaily:     'Diário',
    planDailyDesc: 'Perfeito para necessidades de curto prazo',
    planWeekly:    'Semanal',
    planWeeklyDesc:'Ideal para viagens longas e uso constante',
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
    compareH2:          'Por Que os Clientes Escolhem a Echelon',
    compareSubtitle:    'As mesmas ruas. Uma forma mais inteligente de alugar.',
    compareCompHead:    'A CONCORRÊNCIA',
    compareEchHead:     'ECHELON',
    cFeat1: 'Sem Taxas Ocultas',         cFeat2: 'Tarifas Planas e Transparentes',
    cFeat3: '$0 Depósito de Segurança',  cFeat4: 'Quilometragem Ilimitada',
    cFeat5: 'Extensões Gratuitas',       cFeat6: 'Entrega Local Grátis*',
    cFeat7: 'Diário / Semanal / Mensal', cFeat8: 'Trabalho de Entrega Permitido',
    compareBannerTitle: 'TODA VIAGEM É BEM-VINDA',
    compareBannerSub:   'FINS DE SEMANA · TRAJETOS · RECADOS · ENTREGAS',
    compareDisclaimer:  '*Entrega local grátis · distâncias maiores com custo adicional',
    compareTaglineMain: 'EXCELÊNCIA EM MOVIMENTO',
    compareTaglineSub:  'NEW ENGLAND · @echelonrentalgroup',

    reviewsTag:    'Clientes Reais',
    reviewsH2:     'O Que Nossos Clientes Dizem',
    review1:       '"Faço DoorDash em tempo integral há 8 meses. A tarifa semanal da Echelon deixa mais dinheiro no meu bolso. O compacto que peguei é super econômico — exatamente o que precisava."',
    review1Name:   'Marcus R.',
    review1Sub:    'Motorista DoorDash · 8 meses',
    review2:       '"Meu carro quebrou e precisei de um no mesmo dia. A Echelon me entregou um compacto em 2 horas. O processo foi simples — mostrei minha habilitação e pronto."',
    review2Name:   'Jessica L.',
    review2Sub:    'Motorista Uber Eats · 5 meses',
    review3:       '"Nenhuma outra locadora oferece quilometragem ilimitada nesse preço. Rodo mais de 400 milhas por semana para o GrubHub e o plano mensal é de longe a opção mais econômica."',
    review3Name:   'Devon K.',
    review3Sub:    'Motorista GrubHub · 1 ano',

    ctaH2:         'Pronto para Dirigir?',
    ctaP:          'Junte-se a centenas de clientes — quem vai ao trabalho, viajantes, famílias e entregadores — já rodando com a Echelon.',
    ctaBtn:        'Ver Carros Disponíveis',
    ctaCall:       'Ligue: 508-444-2276',

    useWeekend: 'Fins de Semana', useRoadTrip: 'Viagens de Carro', useCommute: 'Trajeto Diário',
    useShop: 'Carro na Oficina', useGig: 'Trabalho de Entrega',

    navFaq:  'Dúvidas',
    faqTag:  'Perguntas Frequentes',
    faqH2:   'Perguntas Frequentes',
    faqDesc: 'Tudo o que você precisa saber antes de reservar. Não encontrou sua resposta? Ligue ou mande mensagem a qualquer hora para 508-444-2276.',
    faqQ1: 'O que preciso para alugar um carro?',
    faqA1: 'Você precisa ter 21 anos ou mais e uma carteira de motorista válida. Use seu próprio seguro de carro ou contrate nossa cobertura para todo o aluguel ao reservar.',
    faqQ2: 'Tem depósito de segurança?',
    faqA2: 'Clientes qualificados pagam $0 de depósito. Confirmamos o que se aplica a você quando ligarmos para confirmar a reserva.',
    faqQ3: 'As milhas são realmente ilimitadas?',
    faqA3: 'Sim. Todo aluguel diário, semanal e mensal inclui milhas ilimitadas, então pode pegar a estrada. Só nos avise antes de sair da Nova Inglaterra.',
    faqQ4: 'Posso usar o carro para apps de entrega?',
    faqA4: 'Sim. DoorDash, Grubhub, Uber Eats, Amazon Flex e outros trabalhos de entrega são bem-vindos. Transporte de passageiros (rideshare) precisa da nossa aprovação antes. Muitos seguros pessoais não cobrem entregas, então pergunte sobre cobertura ao reservar.',
    faqQ5: 'Vocês entregam o carro?',
    faqA5: 'Sim. Entrega e retirada locais são gratuitas. Distâncias maiores são cobradas conforme a distância, com orçamento na reserva.',
    faqQ6: 'E se meus planos mudarem?',
    faqA6: 'Cancele sem custo com pelo menos 24 horas de antecedência. Precisa do carro por mais tempo? Extensões são grátis na tarifa do seu plano, conforme disponibilidade.',
    faqAll: 'Ver Todas as Perguntas',

    footerDesc:      'Aluguel de carros acessível e flexível para o dia a dia, de viagens de fim de semana ao trajeto diário. Parte da família Echelon Rental Group.',
    footerQuick:     'Links Rápidos',
    footerHome:      'Início',
    footerFleetLink: 'Ver a Frota',
    footerPricing:   'Preços e Planos',
    footerBook:      'Reservar um Carro',
    footerFaq:       'Perguntas Frequentes',
    footerCompany:   'Empresa',
    footerHow:       'Por Que Echelon?',
    footerServe:     'Quem Atendemos',
    footerReviews:   'Avaliações',
    footerResources: 'Recursos',
    footerPolicies:  'Políticas de Aluguel',
    footerCancel:    'Cancelamentos e Reembolsos',
    footerTerms:     'Termos de Serviço',
    footerPrivacy:   'Política de Privacidade',
    footerAccess:    'Acessibilidade',
    footerBrands:    'Marcas Echelon',
    footerBoats:     'Fretamento de Barcos',
    footerJets:      'Fretamento de Jatos',
    footerExperiences: 'Experiências',
    footerContact:   'Contato',
    footerHours:     'Aberto 24 Horas, 7 Dias por Semana',
    footerCopy:      '© 2026 Echelon Rental Group. Todos os direitos reservados.',
    footerPrivacyShort: 'Privacidade',
    footerTermsShort:   'Termos',

    modalSubtitle: 'Preencha sua reserva abaixo',
    modalFirst:    'Nome',
    modalLast:     'Sobrenome',
    modalPhone:    'Telefone',
    modalEmail:    'E-mail',
    modalPickup:   'Data de Retirada',
    modalReturn:   'Data de Devolução',
    modalUsage:    'Como Você Vai Usar Este Carro?',
    useOpt0: 'Escolha uma opção…',
    useOpt1: 'Uso Pessoal / Dia a Dia',
    useOpt2: 'Fim de Semana ou Férias',
    useOpt3: 'Carro na Oficina / Carro Reserva do Seguro',
    useOpt4: 'Ir ao Trabalho',
    useOpt5: 'Visita à Família ou Evento',
    useOpt6: 'Mudança ou Recados',
    useOpt7: 'Apps de Entrega (DoorDash, Uber Eats, etc.)',
    useOpt8: 'Rideshare (Uber / Lyft) — precisa de aprovação',
    useOpt9: 'Outro',
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
  setText('.nav-links a[href="#faq"]', t.navFaq);
  setText('#mobileFaq', t.navFaq);

  // ── Hero ──
  setText('.hero-badge', t.heroBadge);
  set('.hero-title', t.heroTitle);
  set('.hero-subtitle', t.heroSubtitle);

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
    vSel.options[1].text = t.filterCompact;
    vSel.options[2].text = t.filterSedan;
    vSel.options[3].text = t.filterSuv;
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
  if (t.fleetInsuranceNote) set('.fleet-insurance-note p', t.fleetInsuranceNote);

  // Fleet filters
  const filters = $$('.filter-btn');
  if (filters[0]) filters[0].textContent = t.filterAll;
  if (filters[1]) filters[1].textContent = t.filterCompact;
  if (filters[2]) filters[2].textContent = t.filterSedan;
  if (filters[3]) filters[3].textContent = t.filterSuv;

  // Car category names (cards are generic Compact/Sedan/SUV, not specific models)
  const carTypeLabels = { compact: t.filterCompact, sedan: t.filterSedan, suv: t.filterSuv };
  $$('#carGrid .car-card').forEach(card => {
    const nameEl = card.querySelector('.car-name');
    const label = carTypeLabels[card.dataset.type];
    if (nameEl && label) nameEl.textContent = label;
  });

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

  // ── FAQ, footer, and hero tags: elements tagged with data-i18n="key" ──
  $$('[data-i18n]').forEach(el => { if (t[el.dataset.i18n] != null) el.innerHTML = t[el.dataset.i18n]; });

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
   BRAND SWITCHER TOGGLE
────────────────────────────────────────── */
const brandSwitcher = document.getElementById('brandSwitcher');
const brandBtn      = document.getElementById('brandBtn');
const brandDropdown = document.getElementById('brandDropdown');

brandBtn && brandBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  brandSwitcher.classList.toggle('open');
  brandDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
  brandSwitcher && brandSwitcher.classList.remove('open');
  brandDropdown && brandDropdown.classList.remove('open');
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
  const toISO = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const pickupEl = document.getElementById('pickupDate');
  const returnEl = document.getElementById('returnDate');
  if (pickupEl) { pickupEl.value = toISO(today); pickupEl.min = toISO(today); }
  if (returnEl) { returnEl.value = toISO(tomorrow); returnEl.min = toISO(tomorrow); }

  if (pickupEl && returnEl) {
    pickupEl.addEventListener('change', () => {
      const p = new Date(pickupEl.value + 'T00:00');
      const r = new Date(returnEl.value + 'T00:00');
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
  const type = document.getElementById('vehicleType').value || 'all';
  const filterBtn = document.querySelector(`.filter-btn[data-filter="${type}"]`);
  if (filterBtn) filterBtn.click();
  document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
}

/* ──────────────────────────────────────────
   BOOKING MODAL
────────────────────────────────────────── */
let currentModalCar = '';

function openModal(carName, daily, weekly, monthly) {
  currentModalPrices = { daily, weekly, monthly };
  currentModalCar = carName;
  const t = i18n[currentLang] || i18n.en;
  document.getElementById('modalCarName').textContent = `${t.modalBookPrefix} ${carName}`;

  const heroPlan = document.querySelector('.wtab.active')?.dataset.plan || 'daily';
  document.querySelectorAll('.modal-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.modalPlan === heroPlan));
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
const BOOKING_ERROR = {
  en: "Sorry, we couldn't send your reservation. Please call or text us at 508-444-2276 and we'll book it for you.",
  es: "Lo sentimos, no pudimos enviar tu reserva. Llámanos o envíanos un mensaje al 508-444-2276 y la haremos por ti.",
  pt: "Desculpe, não conseguimos enviar sua reserva. Ligue ou mande mensagem para 508-444-2276 e faremos a reserva para você."
};

function submitBooking(e) {
  e.preventDefault();
  const form = e.target;
  const button = form.querySelector('button[type="submit"]');
  if (button.disabled) return;           // ignore double taps while sending
  button.disabled = true;

  const payload = {
    form:       'economy',
    firstName:  form.firstName.value,
    lastName:   form.lastName.value,
    phone:      form.phone.value,
    email:      form.email.value,
    pickupDate: form.pickupDate.value,
    returnDate: form.returnDate.value,
    useCase:    form.useCase.value,
    car:        currentModalCar
  };

  // /api/lead saves the reservation to the Google Sheet and emails the team.
  fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      closeModal();
      showToast();
      form.reset();
    })
    .catch(() => alert(BOOKING_ERROR[currentLang] || BOOKING_ERROR.en))
    .finally(() => { button.disabled = false; });
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
