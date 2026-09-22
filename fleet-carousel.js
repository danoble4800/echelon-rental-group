/* ──────────────────────────────────────────
   ECHELON EXOTICS — FEATURED FLEET CAROUSEL
   Page-scoped: scrolls the fleet track one card at a time via the
   prev/next buttons, on top of native touch/trackpad swipe scrolling.
────────────────────────────────────────── */
(function () {
  const track = document.querySelector('.fleet-carousel-track');
  const prevBtn = document.querySelector('.fleet-carousel-btn.prev');
  const nextBtn = document.querySelector('.fleet-carousel-btn.next');
  if (!track || !prevBtn || !nextBtn) return;

  function cardStep() {
    const card = track.querySelector('.car-card');
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '20');
    return card.getBoundingClientRect().width + gap;
  }

  function updateButtons() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= maxScroll - 4;
  }

  prevBtn.addEventListener('click', () => track.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: cardStep(), behavior: 'smooth' }));

  let ticking = false;
  track.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateButtons(); ticking = false; });
  });
  window.addEventListener('resize', updateButtons);
  updateButtons();
})();
