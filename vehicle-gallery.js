// Vehicle detail pages: clicking a thumbnail swaps the main gallery photo.
(function () {
  const main = document.querySelector('.vehicle-gallery-main');
  const thumbs = document.querySelectorAll('.vehicle-thumb');
  if (!main || !thumbs.length) return;
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      main.style.backgroundImage = `url('${thumb.dataset.src}')`;
      main.style.backgroundPosition = `center ${thumb.dataset.pos}`;
      thumbs.forEach((t) => t.classList.toggle('is-active', t === thumb));
    });
  });
})();
