/* ──────────────────────────────────────────
   ECHELON EXOTICS — RESERVATION FORM SUBMIT
   Page-scoped: posts to the Apps Script Web App bound to the
   "Echelon Exotic Rental Reservations" Google Sheet. Loaded after
   brand-pages.js so this overrides that file's shared, visual-only
   submitInquiry() for this page only — Boat Charters, Jet Charters,
   and Experiences keep the placeholder until they get their own
   endpoint wired up the same way.
────────────────────────────────────────── */
const EXOTICS_RESERVATION_ENDPOINT = 'https://script.google.com/macros/s/AKfycbztTb8TSdAMHOy-nq-csXu4FRjcKk8NGO_srQsZlbytJEMkFDY7MqKcd-bs0vDm7rPn/exec';

function submitInquiry(e) {
  e.preventDefault();
  const form = e.target;
  const payload = {
    firstName:        form.firstName.value,
    lastName:         form.lastName.value,
    phone:            form.phone.value,
    email:            form.email.value,
    pickupDate:       form.pickupDate.value,
    returnDate:       form.returnDate.value,
    vehicleInterest:  form.vehicleInterest.value,
    deliveryLocation: form.deliveryLocation.value
  };

  fetch(EXOTICS_RESERVATION_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  })
    .then(() => { showToast(); form.reset(); })
    .catch(() => { showToast(); form.reset(); });
}
