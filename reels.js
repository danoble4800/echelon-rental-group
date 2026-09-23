// Echelon Stories: muted previews play while the section is on screen;
// tapping a card opens a story-style viewer (tap/swipe/arrow keys to move
// between stories, swipe down or Esc to close).
(function () {
  const cards = Array.from(document.querySelectorAll('.reel-card'));
  const viewer = document.getElementById('reelViewer');
  if (!cards.length || !viewer) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Card previews: only play what's visible ──
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const v = target.querySelector('.reel-preview');
        if (isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    }, { threshold: 0.6 });
    cards.forEach((c) => io.observe(c));
  }

  // ── Viewer ──
  const video = viewer.querySelector('.reel-video');
  const backdrop = viewer.querySelector('.reel-viewer-backdrop');
  const title = viewer.querySelector('.reel-viewer-title');
  const progress = viewer.querySelector('.reel-progress');
  const muteBtn = viewer.querySelector('.reel-mute');
  const prevNav = viewer.querySelector('.reel-viewer-nav.prev');
  const nextNav = viewer.querySelector('.reel-viewer-nav.next');
  let current = 0;
  let muted = false;
  let lastFocus = null;
  let raf = null;

  progress.innerHTML = cards.map(() => '<span><i></i></span>').join('');
  const bars = Array.from(progress.querySelectorAll('i'));

  function tick() {
    if (video.duration) bars[current].style.width = `${(video.currentTime / video.duration) * 100}%`;
    raf = requestAnimationFrame(tick);
  }

  function show(i) {
    current = i;
    const card = cards[i];
    bars.forEach((b, j) => { b.style.width = j < i ? '100%' : '0'; });
    title.textContent = card.querySelector('.reel-title').textContent;
    backdrop.style.backgroundImage = `url('${card.dataset.poster}')`;
    video.poster = card.dataset.poster;
    video.src = card.dataset.src;
    video.muted = muted;
    video.play().catch(() => {
      // Autoplay with sound blocked: fall back to muted.
      muted = true; video.muted = true; syncMute(); video.play().catch(() => {});
    });
    prevNav.disabled = i === 0;
    nextNav.disabled = i === cards.length - 1;
  }

  function open(i) {
    lastFocus = document.activeElement;
    cards.forEach((c) => c.querySelector('.reel-preview').pause());
    viewer.hidden = false;
    document.body.classList.add('reel-open');
    show(i);
    cancelAnimationFrame(raf);
    tick();
    viewer.querySelector('.reel-close').focus();
  }

  function close() {
    viewer.hidden = true;
    document.body.classList.remove('reel-open');
    video.pause();
    video.removeAttribute('src');
    video.load();
    cancelAnimationFrame(raf);
    if (lastFocus) lastFocus.focus();
  }

  const next = () => (current < cards.length - 1 ? show(current + 1) : close());
  const prev = () => (current > 0 ? show(current - 1) : (video.currentTime = 0));

  function syncMute() {
    muteBtn.classList.toggle('is-muted', muted);
    muteBtn.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
  }

  cards.forEach((card, i) => card.addEventListener('click', () => open(i)));
  video.addEventListener('ended', next);
  viewer.querySelector('.reel-close').addEventListener('click', close);
  viewer.querySelector('.reel-tap.prev').addEventListener('click', prev);
  viewer.querySelector('.reel-tap.next').addEventListener('click', next);
  prevNav.addEventListener('click', prev);
  nextNav.addEventListener('click', next);
  backdrop.addEventListener('click', close);
  muteBtn.addEventListener('click', () => { muted = !muted; video.muted = muted; syncMute(); });

  document.addEventListener('keydown', (e) => {
    if (viewer.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Swipe left/right to change story, down to close.
  let sx = null, sy = null;
  viewer.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  viewer.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    sx = sy = null;
    if (dy > 80 && Math.abs(dy) > Math.abs(dx)) close();
    else if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  });
})();
