/* ──────────────────────────────────────────
   ECHELON EXOTICS — FULL FLEET PAGE
   Page-scoped: filters and sorts the .fleet-page-grid cards. Supports
   deep-linking a pre-selected filter via fleet.html?type=<category>.
────────────────────────────────────────── */
(function () {
  const grid = document.getElementById('fleetGrid');
  const filterBtns = document.querySelectorAll('#fleetFilters .filter-btn');
  const sortSelect = document.getElementById('fleetSort');
  if (!grid) return;

  const cards = () => Array.from(grid.querySelectorAll('.car-card'));

  function applyFilter(type) {
    cards().forEach(card => {
      const matches = type === 'all' || card.dataset.type === type;
      card.classList.toggle('hidden', !matches);
    });
  }

  function applySort(mode) {
    const items = cards();
    let sorted;
    switch (mode) {
      case 'price-asc':
        sorted = items.slice().sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
        break;
      case 'price-desc':
        sorted = items.slice().sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
        break;
      case 'name-asc':
        sorted = items.slice().sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        break;
      case 'hp-desc':
        sorted = items.slice().sort((a, b) => Number(b.dataset.hp) - Number(a.dataset.hp));
        break;
      default:
        sorted = items;
    }
    sorted.forEach(card => grid.appendChild(card));
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', () => applySort(sortSelect.value));
  }

  const typeParam = new URLSearchParams(window.location.search).get('type');
  if (typeParam) {
    const match = Array.from(filterBtns).find(b => b.dataset.filter === typeParam);
    if (match) {
      filterBtns.forEach(b => b.classList.remove('active'));
      match.classList.add('active');
      applyFilter(typeParam);
    }
  }
})();
