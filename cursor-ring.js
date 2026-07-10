/* ──────────────────────────────────────────
   ECHELON RENTAL GROUP — CUSTOM CURSOR RING
   Shared across all brand pages. Skips touch/coarse pointers automatically.
────────────────────────────────────────── */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const ring = document.querySelector('.cursor-ring');
  const dot = document.querySelector('.cursor-dot');
  if (!ring || !dot) return;

  document.body.classList.add('cursor-ring-enabled');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let visible = false;

  const setVisible = (show) => {
    if (visible === show) return;
    visible = show;
    ring.style.opacity = show ? '1' : '0';
    dot.style.opacity = show ? '1' : '0';
  };

  const isInteractive = (el) =>
    !!(el && el.closest('a, button, .btn, input, select, textarea, [role="button"]'));

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setVisible(true);
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    ring.classList.toggle('is-active', isInteractive(e.target));
  });

  document.addEventListener('mouseleave', () => setVisible(false));
  document.addEventListener('mouseenter', () => setVisible(true));

  function animate() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();
