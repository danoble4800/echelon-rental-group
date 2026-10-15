/* ──────────────────────────────────────────
   ECHELON EXPERIENCES — TRANSLATIONS
   Page-scoped (see brand-pages.js note). Every translatable element on
   experiences.html carries data-i18n="<key>" (or data-i18n-placeholder),
   so the page can be rearranged without breaking translations. Partner
   names, team names, and contact details are intentionally left untranslated.
────────────────────────────────────────── */
const experiencesI18n = {
  en: {
    navIncluded: "What's Included", navPartners: 'Partners', navItineraries: 'Itineraries', navPlan: 'Plan Yours', navBtn: 'Build My Itinerary',
    heroBadge: 'Custom VIP Itineraries · Boston &amp; New England',
    heroTitle: 'From Wheels Up<br /><span class="accent">to Last Call.</span>',
    heroSubtitle: '<strong>Echelon Experiences</strong> brings everything we do into one seamless itinerary — your pickup, your ride, your stay, the best seats in the house, VIP tables and dinner reservations. One call, and every detail is handled.',
    tag1: 'Custom Itineraries', tag2: 'Exotic or Chauffeured', tag3: 'Suites &amp; VIP Tables',
    ctaPlan: 'Build My Itinerary', ctaIncluded: "See What's Included",

    incTag: 'One Itinerary', incH2: 'Everything, Handled',
    incDesc: "Pick the pieces you want and we'll put them together — door to door, start to finish, with one planner and one point of contact.",
    inc1H: 'Arrival &amp; Pickup', inc1P: "We meet you wherever you land — the private jet terminal, Logan Airport, your hotel or your front door — and get you where you're going.",
    inc2H: 'Exotic Car or Chauffeur', inc2P: 'Take the wheel of one of our exotics, or sit back while a <a href="chauffeur.html">professional chauffeur</a> handles every drop-off for the night.',
    inc3H: 'Where You Stay', inc3P: 'We book you into hand-picked partner Airbnbs and luxury stays, so the whole trip is taken care of — not just the night out.',
    inc4H: 'Games &amp; Concerts', inc4P: 'Premium seats and private suites at TD Garden, Gillette Stadium and more — Celtics, Bruins, Patriots and the biggest concerts.',
    inc5H: 'Nightlife &amp; Dining', inc5P: "Guest list at Boston's biggest clubs, VIP table service, the biggest shows and events, and dinner at some of the city's best restaurants.",
    inc6H: 'Jets &amp; Yachts', inc6P: 'Add a <a href="jets.html">private jet</a> or a <a href="boats.html">yacht charter</a> from the Echelon family to take the trip even further.',

    partTag: 'Our Partners', partH2: 'The Access Behind the Experience',
    partDesc: "We've teamed up with New England's best in sports and nightlife hospitality, so you get in where others can't.",
    p1Kicker: 'Games &amp; Concerts',
    p1P: 'Exclusive seats and suites at TD Garden, Gillette Stadium and more. With over 20 years in VIP event hospitality, Seats to Suites puts you in the best spot in the building for the Celtics, Bruins, Patriots and the biggest concerts.',
    p1Stat: '20+ years in VIP event hospitality', chipConcerts: 'Concerts',
    p2Kicker: 'Nightlife &amp; Dining',
    p2P: "New England's premier hospitality, nightlife and entertainment company. Through Big Night, we get you on the guest list at Boston's biggest clubs, set you up with VIP table service, and book dinner at some of Boston's best restaurants.",
    p2Stat: "New England's premier nightlife company",
    chipGuest: 'Guest List', chipTables: 'VIP Tables', chipShows: 'Shows &amp; Events', chipDinner: 'Dinner',

    itinTag: 'Sample Itineraries', itinH2: 'A Few Ways to Do It',
    itinDesc: 'Every itinerary is built from scratch around you. Here are a few favorites to get the ideas going.',
    it1Type: 'Game Night', it1Name: 'Courtside &amp; Suites',
    it1a: 'Chauffeured pickup from your door or hotel', it1b: 'Pre-game dinner at a top Boston restaurant', it1c: 'Seats or a private suite for the Celtics or Bruins at TD Garden', it1d: 'Ride home — or on to the after-party',
    it2Type: 'Night Out', it2Name: 'The Big Night',
    it2a: 'Arrive in one of our exotics — or let a chauffeur drive', it2b: "Dinner reservations at one of Boston's best restaurants", it2c: "Guest list and VIP table service at the city's biggest club", it2d: 'Safe ride back, whenever the night ends',
    it3Type: 'Weekend', it3Name: 'Fly-In Game Weekend',
    it3a: 'Pickup at the private jet terminal or Logan', it3b: 'Check in to a hand-picked partner Airbnb', it3c: 'A suite at Gillette Stadium for the Patriots', it3d: 'Dinner, nightlife and every ride in between',
    it4Type: 'Concert Night', it4Name: 'Front Row to After-Party',
    it4a: 'Pull up to the show in an exotic', it4b: 'Premium seats or a suite for the concert', it4c: 'VIP table at the after-party', it4d: "Chauffeur on call until you're home",
    planThis: 'Plan Something Like This',

    howTag: 'How It Works', howH2: 'Built Around You',
    howDesc: 'For VIP clients, Echelon members, corporate groups and anyone with something worth celebrating.',
    s1H: 'Tell us the occasion', s1P: 'The date, the group, and what you have in mind — a game, a big night out, a full weekend, or all of it.',
    s2H: 'We build your itinerary', s2P: 'Your planner puts together the rides, the stay, the seats, the tables and the reservations, and sends you a custom quote.',
    s3H: 'You show up', s3P: 'Once you confirm, we handle every booking and stay on call the whole time. All you have to do is enjoy it.',
    priceH: 'Priced to Your Plan',
    priceP: "Because every itinerary is custom, there's no set price list. Tell us what you want and your planner will send a quote built around your date, your group and the experiences you choose.",

    schedTag: 'Plan', schedH2: 'Build Your Itinerary',
    schedDesc: "Tell us what you're planning and when — an experience planner will reach out within the hour.",
    fFirst: 'First Name', fLast: 'Last Name', fPhone: 'Phone Number', fEmail: 'Email Address',
    fOccasion: 'What are you planning?',
    optGame: 'Game Night', optNight: 'Night Out', optConcert: 'Concert Night', optWeekend: 'Weekend Trip', optCelebration: 'Celebration', optCorporate: 'Corporate / Client Event', optNotSure: 'Not Sure Yet',
    fPicks: 'What should we include?',
    pk1: 'Pickup &amp; drop-off', pk2: 'Exotic car', pk3: 'Chauffeur', pk4: 'Place to stay', pk5: 'Game or concert seats', pk6: 'Guest list / VIP table', pk7: 'Dinner reservations', pk8: 'Private jet or yacht',
    fDate: 'Date', fParty: 'Group Size',
    fNotes: 'Anything else we should know?',
    fNotesPh: 'Arriving by private jet Friday, want Celtics tickets and a table after…',
    fCheck: 'I understand every itinerary is custom, and pricing and availability are confirmed by an experience planner before booking.',
    fSubmit: 'Request My Itinerary', fNote: 'An experience planner will reach out within 1 hour.',

    footerBlurb: 'Custom VIP itineraries bringing together our cars, chauffeurs, jets and yachts with our partners at Seats to Suites and Big Night. Part of the Echelon Rental Group family.',
    footerExpH: 'Experiences', footerBrandsH: 'Echelon Brands', footerContactH: 'Contact', footerHours: 'Open 24 Hours, 7 Days a Week',
    footerCopy: '© 2026 Echelon Rental Group. All rights reserved.',
    toastTitle: 'Itinerary Requested!', toastBody: 'An experience planner will reach out within 1 hour.',
  },
  es: {
    navIncluded: 'Qué Incluye', navPartners: 'Socios', navItineraries: 'Itinerarios', navPlan: 'Planifica', navBtn: 'Crear Mi Itinerario',
    heroBadge: 'Itinerarios VIP a Medida · Boston y Nueva Inglaterra',
    heroTitle: 'Del Despegue<br /><span class="accent">a la Última Copa.</span>',
    heroSubtitle: '<strong>Echelon Experiences</strong> reúne todo lo que hacemos en un solo itinerario — tu recogida, tu auto, tu estadía, los mejores asientos, mesas VIP y reservaciones para cenar. Una llamada y cada detalle queda resuelto.',
    tag1: 'Itinerarios a Medida', tag2: 'Exótico o con Chofer', tag3: 'Suites y Mesas VIP',
    ctaPlan: 'Crear Mi Itinerario', ctaIncluded: 'Ver Qué Incluye',

    incTag: 'Un Solo Itinerario', incH2: 'Todo, Resuelto',
    incDesc: 'Elige lo que quieras y lo armamos todo — de puerta a puerta, de principio a fin, con un solo planificador y un solo contacto.',
    inc1H: 'Llegada y Recogida', inc1P: 'Te recibimos donde aterrices — la terminal de jets privados, el aeropuerto Logan, tu hotel o tu puerta — y te llevamos a donde vayas.',
    inc2H: 'Auto Exótico o Chofer', inc2P: 'Maneja uno de nuestros exóticos, o relájate mientras un <a href="chauffeur.html">chofer profesional</a> se encarga de cada traslado de la noche.',
    inc3H: 'Dónde Te Hospedas', inc3P: 'Te reservamos en Airbnbs asociados y estadías de lujo seleccionadas, para que todo el viaje esté resuelto — no solo la noche.',
    inc4H: 'Partidos y Conciertos', inc4P: 'Asientos premium y suites privadas en TD Garden, Gillette Stadium y más — Celtics, Bruins, Patriots y los mejores conciertos.',
    inc5H: 'Vida Nocturna y Cenas', inc5P: 'Lista de invitados en los clubes más grandes de Boston, servicio de mesa VIP, los mejores shows y eventos, y cenas en algunos de los mejores restaurantes de la ciudad.',
    inc6H: 'Jets y Yates', inc6P: 'Agrega un <a href="jets.html">jet privado</a> o un <a href="boats.html">yate</a> de la familia Echelon para llevar el viaje aún más lejos.',

    partTag: 'Nuestros Socios', partH2: 'El Acceso Detrás de la Experiencia',
    partDesc: 'Nos unimos a lo mejor de Nueva Inglaterra en hospitalidad deportiva y nocturna, para que entres donde otros no pueden.',
    p1Kicker: 'Partidos y Conciertos',
    p1P: 'Asientos y suites exclusivos en TD Garden, Gillette Stadium y más. Con más de 20 años en hospitalidad VIP para eventos, Seats to Suites te pone en el mejor lugar del estadio para los Celtics, Bruins, Patriots y los mejores conciertos.',
    p1Stat: 'Más de 20 años en hospitalidad VIP', chipConcerts: 'Conciertos',
    p2Kicker: 'Vida Nocturna y Cenas',
    p2P: 'La principal compañía de hospitalidad, vida nocturna y entretenimiento de Nueva Inglaterra. Con Big Night te ponemos en la lista de invitados de los clubes más grandes de Boston, te conseguimos servicio de mesa VIP y reservamos cena en algunos de los mejores restaurantes de Boston.',
    p2Stat: 'La principal compañía nocturna de Nueva Inglaterra',
    chipGuest: 'Lista de Invitados', chipTables: 'Mesas VIP', chipShows: 'Shows y Eventos', chipDinner: 'Cenas',

    itinTag: 'Itinerarios de Ejemplo', itinH2: 'Algunas Ideas',
    itinDesc: 'Cada itinerario se crea desde cero a tu medida. Aquí van algunos favoritos para inspirarte.',
    it1Type: 'Noche de Partido', it1Name: 'Cancha y Suites',
    it1a: 'Recogida con chofer desde tu casa u hotel', it1b: 'Cena antes del partido en un gran restaurante de Boston', it1c: 'Asientos o suite privada para los Celtics o Bruins en TD Garden', it1d: 'Regreso a casa — o directo al after-party',
    it2Type: 'Noche de Fiesta', it2Name: 'The Big Night',
    it2a: 'Llega en uno de nuestros exóticos — o deja que maneje un chofer', it2b: 'Reservación en uno de los mejores restaurantes de Boston', it2c: 'Lista de invitados y mesa VIP en el club más grande de la ciudad', it2d: 'Regreso seguro, a la hora que termine la noche',
    it3Type: 'Fin de Semana', it3Name: 'Fin de Semana de Partido',
    it3a: 'Recogida en la terminal de jets privados o en Logan', it3b: 'Hospedaje en un Airbnb asociado seleccionado', it3c: 'Una suite en Gillette Stadium para los Patriots', it3d: 'Cenas, vida nocturna y todos los traslados',
    it4Type: 'Noche de Concierto', it4Name: 'De Primera Fila al After-Party',
    it4a: 'Llega al show en un exótico', it4b: 'Asientos premium o suite para el concierto', it4c: 'Mesa VIP en el after-party', it4d: 'Chofer disponible hasta que llegues a casa',
    planThis: 'Planificar Algo Así',

    howTag: 'Cómo Funciona', howH2: 'Hecho a Tu Medida',
    howDesc: 'Para clientes VIP, miembros de Echelon, grupos corporativos y cualquiera con algo que celebrar.',
    s1H: 'Cuéntanos la ocasión', s1P: 'La fecha, el grupo y lo que tienes en mente — un partido, una gran noche, un fin de semana completo o todo junto.',
    s2H: 'Creamos tu itinerario', s2P: 'Tu planificador organiza los traslados, la estadía, los asientos, las mesas y las reservaciones, y te envía una cotización a medida.',
    s3H: 'Tú solo llegas', s3P: 'Cuando confirmas, nos encargamos de cada reserva y estamos disponibles todo el tiempo. Solo tienes que disfrutar.',
    priceH: 'Precio Según Tu Plan',
    priceP: 'Como cada itinerario es a medida, no hay una lista de precios fija. Cuéntanos lo que quieres y tu planificador te enviará una cotización según tu fecha, tu grupo y las experiencias que elijas.',

    schedTag: 'Planificar', schedH2: 'Crea Tu Itinerario',
    schedDesc: 'Cuéntanos qué estás planeando y cuándo — un planificador de experiencias te contactará dentro de la hora.',
    fFirst: 'Nombre', fLast: 'Apellido', fPhone: 'Número de Teléfono', fEmail: 'Correo Electrónico',
    fOccasion: '¿Qué estás planeando?',
    optGame: 'Noche de Partido', optNight: 'Noche de Fiesta', optConcert: 'Noche de Concierto', optWeekend: 'Viaje de Fin de Semana', optCelebration: 'Celebración', optCorporate: 'Evento Corporativo / Clientes', optNotSure: 'Aún No Estoy Seguro',
    fPicks: '¿Qué debemos incluir?',
    pk1: 'Recogida y regreso', pk2: 'Auto exótico', pk3: 'Chofer', pk4: 'Hospedaje', pk5: 'Asientos para partido o concierto', pk6: 'Lista de invitados / mesa VIP', pk7: 'Reservación para cenar', pk8: 'Jet privado o yate',
    fDate: 'Fecha', fParty: 'Tamaño del Grupo',
    fNotes: '¿Algo más que debamos saber?',
    fNotesPh: 'Llegamos en jet privado el viernes, queremos boletos para los Celtics y una mesa después…',
    fCheck: 'Entiendo que cada itinerario es a medida, y que el precio y la disponibilidad serán confirmados por un planificador de experiencias antes de reservar.',
    fSubmit: 'Solicitar Mi Itinerario', fNote: 'Un planificador de experiencias te contactará dentro de 1 hora.',

    footerBlurb: 'Itinerarios VIP a medida que combinan nuestros autos, choferes, jets y yates con nuestros socios Seats to Suites y Big Night. Parte de la familia Echelon Rental Group.',
    footerExpH: 'Experiencias', footerBrandsH: 'Marcas Echelon', footerContactH: 'Contacto', footerHours: 'Abierto las 24 Horas, los 7 Días de la Semana',
    footerCopy: '© 2026 Echelon Rental Group. Todos los derechos reservados.',
    toastTitle: '¡Itinerario Solicitado!', toastBody: 'Un planificador de experiencias te contactará dentro de 1 hora.',
  },
  pt: {
    navIncluded: 'O Que Inclui', navPartners: 'Parceiros', navItineraries: 'Roteiros', navPlan: 'Planeje', navBtn: 'Montar Meu Roteiro',
    heroBadge: 'Roteiros VIP Personalizados · Boston e Nova Inglaterra',
    heroTitle: 'Da Decolagem<br /><span class="accent">à Última Dose.</span>',
    heroSubtitle: 'A <strong>Echelon Experiences</strong> reúne tudo o que fazemos em um único roteiro — sua busca, seu carro, sua hospedagem, os melhores lugares da casa, mesas VIP e reservas para jantar. Uma ligação e cada detalhe está resolvido.',
    tag1: 'Roteiros Personalizados', tag2: 'Exótico ou com Motorista', tag3: 'Suítes e Mesas VIP',
    ctaPlan: 'Montar Meu Roteiro', ctaIncluded: 'Ver O Que Inclui',

    incTag: 'Um Só Roteiro', incH2: 'Tudo Resolvido',
    incDesc: 'Escolha o que quiser e nós juntamos tudo — de porta a porta, do início ao fim, com um só planejador e um só contato.',
    inc1H: 'Chegada e Busca', inc1P: 'Buscamos você onde pousar — no terminal de jatos particulares, no aeroporto Logan, no seu hotel ou na sua porta — e levamos aonde precisar.',
    inc2H: 'Carro Exótico ou Motorista', inc2P: 'Dirija um dos nossos exóticos, ou relaxe enquanto um <a href="chauffeur.html">motorista profissional</a> cuida de cada trajeto da noite.',
    inc3H: 'Onde Você Fica', inc3P: 'Reservamos Airbnbs parceiros e hospedagens de luxo selecionadas, para que a viagem inteira esteja resolvida — não só a noite.',
    inc4H: 'Jogos e Shows', inc4P: 'Lugares premium e suítes privadas no TD Garden, Gillette Stadium e mais — Celtics, Bruins, Patriots e os maiores shows.',
    inc5H: 'Vida Noturna e Jantares', inc5P: 'Lista de convidados nas maiores baladas de Boston, serviço de mesa VIP, os maiores shows e eventos, e jantar em alguns dos melhores restaurantes da cidade.',
    inc6H: 'Jatos e Iates', inc6P: 'Adicione um <a href="jets.html">jato particular</a> ou um <a href="boats.html">iate</a> da família Echelon para levar a viagem ainda mais longe.',

    partTag: 'Nossos Parceiros', partH2: 'O Acesso Por Trás da Experiência',
    partDesc: 'Nos unimos ao melhor da Nova Inglaterra em hospitalidade esportiva e vida noturna, para você entrar onde outros não entram.',
    p1Kicker: 'Jogos e Shows',
    p1P: 'Lugares e suítes exclusivos no TD Garden, Gillette Stadium e mais. Com mais de 20 anos em hospitalidade VIP para eventos, a Seats to Suites coloca você no melhor lugar da arena para os Celtics, Bruins, Patriots e os maiores shows.',
    p1Stat: 'Mais de 20 anos em hospitalidade VIP', chipConcerts: 'Shows',
    p2Kicker: 'Vida Noturna e Jantares',
    p2P: 'A principal empresa de hospitalidade, vida noturna e entretenimento da Nova Inglaterra. Com a Big Night, colocamos você na lista das maiores baladas de Boston, garantimos serviço de mesa VIP e reservamos jantar em alguns dos melhores restaurantes de Boston.',
    p2Stat: 'A principal empresa de vida noturna da Nova Inglaterra',
    chipGuest: 'Lista de Convidados', chipTables: 'Mesas VIP', chipShows: 'Shows e Eventos', chipDinner: 'Jantar',

    itinTag: 'Roteiros de Exemplo', itinH2: 'Algumas Ideias',
    itinDesc: 'Cada roteiro é criado do zero para você. Aqui estão alguns favoritos para inspirar.',
    it1Type: 'Noite de Jogo', it1Name: 'Quadra e Suítes',
    it1a: 'Busca com motorista na sua casa ou hotel', it1b: 'Jantar antes do jogo em um ótimo restaurante de Boston', it1c: 'Lugares ou suíte privada para os Celtics ou Bruins no TD Garden', it1d: 'Volta para casa — ou direto para o after-party',
    it2Type: 'Noite de Balada', it2Name: 'The Big Night',
    it2a: 'Chegue em um dos nossos exóticos — ou deixe o motorista dirigir', it2b: 'Reserva em um dos melhores restaurantes de Boston', it2c: 'Lista de convidados e mesa VIP na maior balada da cidade', it2d: 'Volta segura, na hora que a noite acabar',
    it3Type: 'Fim de Semana', it3Name: 'Fim de Semana de Jogo',
    it3a: 'Busca no terminal de jatos particulares ou no Logan', it3b: 'Hospedagem em um Airbnb parceiro selecionado', it3c: 'Uma suíte no Gillette Stadium para os Patriots', it3d: 'Jantar, vida noturna e todos os trajetos',
    it4Type: 'Noite de Show', it4Name: 'Da Primeira Fila ao After-Party',
    it4a: 'Chegue ao show em um exótico', it4b: 'Lugares premium ou suíte para o show', it4c: 'Mesa VIP no after-party', it4d: 'Motorista à disposição até você chegar em casa',
    planThis: 'Planejar Algo Assim',

    howTag: 'Como Funciona', howH2: 'Feito Para Você',
    howDesc: 'Para clientes VIP, membros Echelon, grupos corporativos e qualquer pessoa com algo para comemorar.',
    s1H: 'Conte a ocasião', s1P: 'A data, o grupo e o que você tem em mente — um jogo, uma grande noite, um fim de semana inteiro ou tudo junto.',
    s2H: 'Montamos seu roteiro', s2P: 'Seu planejador organiza os trajetos, a hospedagem, os lugares, as mesas e as reservas, e envia um orçamento personalizado.',
    s3H: 'Você só aparece', s3P: 'Depois da sua confirmação, cuidamos de cada reserva e ficamos à disposição o tempo todo. É só aproveitar.',
    priceH: 'Preço Conforme o Seu Plano',
    priceP: 'Como cada roteiro é personalizado, não existe tabela de preços fixa. Conte o que você quer e seu planejador enviará um orçamento de acordo com a data, o grupo e as experiências escolhidas.',

    schedTag: 'Planejar', schedH2: 'Monte Seu Roteiro',
    schedDesc: 'Conte o que você está planejando e quando — um planejador de experiências entrará em contato em até uma hora.',
    fFirst: 'Nome', fLast: 'Sobrenome', fPhone: 'Telefone', fEmail: 'E-mail',
    fOccasion: 'O que você está planejando?',
    optGame: 'Noite de Jogo', optNight: 'Noite de Balada', optConcert: 'Noite de Show', optWeekend: 'Viagem de Fim de Semana', optCelebration: 'Comemoração', optCorporate: 'Evento Corporativo / Clientes', optNotSure: 'Ainda Não Sei',
    fPicks: 'O que devemos incluir?',
    pk1: 'Busca e retorno', pk2: 'Carro exótico', pk3: 'Motorista', pk4: 'Hospedagem', pk5: 'Lugares para jogo ou show', pk6: 'Lista de convidados / mesa VIP', pk7: 'Reserva para jantar', pk8: 'Jato particular ou iate',
    fDate: 'Data', fParty: 'Tamanho do Grupo',
    fNotes: 'Mais alguma coisa que devemos saber?',
    fNotesPh: 'Chegamos de jato particular na sexta, queremos ingressos dos Celtics e uma mesa depois…',
    fCheck: 'Entendo que cada roteiro é personalizado, e que o preço e a disponibilidade serão confirmados por um planejador de experiências antes da reserva.',
    fSubmit: 'Solicitar Meu Roteiro', fNote: 'Um planejador de experiências entrará em contato em até 1 hora.',

    footerBlurb: 'Roteiros VIP personalizados que unem nossos carros, motoristas, jatos e iates aos nossos parceiros Seats to Suites e Big Night. Parte da família Echelon Rental Group.',
    footerExpH: 'Experiências', footerBrandsH: 'Marcas Echelon', footerContactH: 'Contato', footerHours: 'Aberto 24 Horas, 7 Dias por Semana',
    footerCopy: '© 2026 Echelon Rental Group. Todos os direitos reservados.',
    toastTitle: 'Roteiro Solicitado!', toastBody: 'Um planejador de experiências entrará em contato em até 1 hora.',
  },
};

let currentLang = localStorage.getItem('echelon-lang') || 'en';

function applyLang(lang) {
  const t = experiencesI18n[lang] || experiencesI18n.en;
  currentLang = lang;
  localStorage.setItem('echelon-lang', lang);

  document.documentElement.lang = experiencesI18n[lang] ? lang : 'en';
  document.querySelectorAll('#langLabel').forEach(el => el.textContent = lang.toUpperCase());
  document.querySelectorAll('.lang-option').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const html = t[el.dataset.i18n];
    if (html !== undefined) el.innerHTML = html;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const txt = t[el.dataset.i18nPlaceholder];
    if (txt !== undefined) el.placeholder = txt;
  });
}

applyLang(currentLang);
