// Vehicle detail pages: thumbnails, prev/next arrows, arrow keys and swipe
// all switch the main gallery photo.
(function () {
  const main = document.querySelector('.vehicle-gallery-main');
  const thumbs = Array.from(document.querySelectorAll('.vehicle-thumb'));
  if (!main || thumbs.length < 2) return;
  const count = main.querySelector('.vehicle-gallery-count');
  let current = 0;

  function show(i) {
    current = (i + thumbs.length) % thumbs.length;
    const thumb = thumbs[current];
    main.style.backgroundImage = `url('${thumb.dataset.src}')`;
    main.style.backgroundPosition = `center ${thumb.dataset.pos}`;
    thumbs.forEach((t) => t.classList.toggle('is-active', t === thumb));
    thumb.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    if (count) count.textContent = `${current + 1} / ${thumbs.length}`;
  }

  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => show(i)));
  main.querySelector('.vehicle-gallery-nav.prev')?.addEventListener('click', () => show(current - 1));
  main.querySelector('.vehicle-gallery-nav.next')?.addEventListener('click', () => show(current + 1));

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  let startX = null;
  main.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  main.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
