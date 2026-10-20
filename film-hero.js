// Exotics film hero: cuts between the reel previews in the hero.
// Desktop plays each clip twice (sharp 9:16 frame + blurred backdrop);
// mobile only plays the full-bleed backdrop. Only the first clip loads
// up front — the rest wait for window load so the page paints fast.
(function () {
  const ambient = document.getElementById('filmAmbient');
  const frame = document.getElementById('filmFrame');
  if (!ambient) return;

  // Reel 5 (phone in a cupholder) is left out on purpose — not a hero shot.
  const scenes = [
    { src: 'videos/reels/reel-2-preview.mp4', poster: 'videos/reels/reel-2-poster.jpg', title: 'Night at Encore', sub: 'Maybach GLS' },
    { src: 'videos/reels/reel-3-preview.mp4', poster: 'videos/reels/reel-3-poster.jpg', title: 'Showroom Night',  sub: 'Maybach GLS' },
    { src: 'videos/reels/reel-1-preview.mp4', poster: 'videos/reels/reel-1-poster.jpg', title: 'On Set',          sub: 'Maybach GLS' },
    { src: 'videos/reels/reel-4-preview.mp4', poster: 'videos/reels/reel-4-poster.jpg', title: 'After Hours',     sub: 'Showroom' },
  ];
  const CYCLE = 7000;

  // Reduced motion or Data Saver: keep the still poster (set in CSS).
  const saveData = navigator.connection && navigator.connection.saveData;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || saveData) return;

  const desktop = matchMedia('(min-width: 861px)').matches;

  function makeVideo(s, eager) {
    const v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    v.preload = eager ? 'auto' : 'none';
    v.poster = s.poster;
    if (eager) v.src = s.src;
    v.dataset.src = s.src;
    return v;
  }
  const load = (v) => { if (!v.getAttribute('src')) { v.src = v.dataset.src; v.preload = 'auto'; } };

  const sets = [scenes.map((s, k) => { const v = makeVideo(s, k === 0); ambient.appendChild(v); return v; })];
  if (desktop && frame) {
    sets.push(scenes.map((s, k) => { const v = makeVideo(s, k === 0); frame.prepend(v); return v; }));
  }

  const ticks = document.getElementById('filmTicks');
  if (ticks) scenes.forEach(() => { const t = document.createElement('span'); t.className = 'film-tick'; t.innerHTML = '<i></i>'; ticks.appendChild(t); });
  const num = document.getElementById('filmSceneNum');
  const title = document.getElementById('filmSceneTitle');
  const sub = document.getElementById('filmSceneSub');

  let i = -1;
  let timer = null;
  function show(n) {
    const prev = i;
    i = n % scenes.length;
    sets.forEach((set) => {
      if (prev >= 0) { const p = set[prev]; p.classList.remove('on'); setTimeout(() => p.pause(), 1200); }
      const v = set[i];
      load(v);
      v.currentTime = 0;
      v.play().catch(() => {});
      v.classList.add('on');
    });
    if (num) num.textContent = 'SCENE 0' + (i + 1);
    if (title) title.textContent = scenes[i].title;
    if (sub) sub.textContent = scenes[i].sub;
    if (ticks) [...ticks.children].forEach((t, k) => { t.className = 'film-tick' + (k < i ? ' done' : k === i ? ' active' : ''); });
    if (timer) sets.forEach((set) => load(set[(i + 1) % scenes.length]));
  }
  show(0);

  const start = () => { if (!timer) timer = setInterval(() => show(i + 1), CYCLE); };
  const stop = () => { clearInterval(timer); timer = null; sets.forEach((set) => set[i].pause()); };

  function begin() {
    // Warm up the next clip only, so each cut is ready without pulling every file at once.
    sets.forEach((set) => load(set[1]));
    start();
  }
  if (document.readyState === 'complete') begin(); else addEventListener('load', begin, { once: true });

  // Pause when the hero is off screen or the tab is hidden.
  const hero = ambient.closest('.hero');
  let visible = true;
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) { sets.forEach((set) => set[i].play().catch(() => {})); start(); } else stop();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else if (visible) { sets.forEach((set) => set[i].play().catch(() => {})); start(); }
  });
})();
