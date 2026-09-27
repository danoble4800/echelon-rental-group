/* ──────────────────────────────────────────
   ECHELON EXOTICS — RESERVATION FORM SUBMIT
   Page-scoped: posts to /api/lead, which saves to the
   "Echelon Exotic Rental Reservations" Google Sheet. Loaded after
   brand-pages.js so this overrides that file's shared, visual-only
   submitInquiry() for this page only — Boat Charters, Jet Charters,
   and Experiences keep the placeholder until they get their own
   endpoint wired up the same way.
────────────────────────────────────────── */
function submitInquiry(e) {
  e.preventDefault();
  const form = e.target;
  const button = form.querySelector('button[type="submit"]');
  if (button.disabled) return;           // ignore double taps while sending
  button.disabled = true;

  const payload = {
    form:             'exotics',
    firstName:        form.firstName.value,
    lastName:         form.lastName.value,
    phone:            form.phone.value,
    email:            form.email.value,
    pickupDate:       form.pickupDate.value,
    returnDate:       form.returnDate.value,
    vehicleInterest:  form.vehicleInterest.value,
    deliveryLocation: form.deliveryLocation.value
  };

  // /api/lead saves the reservation to the Google Sheet and emails the team.
  fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      showToast();
      form.reset();
    })
    .catch(() => alert("Sorry, we couldn't send your reservation. Please call or text us at 508-444-2276 and we'll book it for you."))
    .finally(() => { button.disabled = false; });
}

/* A vehicle detail page's "Book Now" / "Reserve Now" links point here
   as exotics.html?vehicle=<name>#schedule — pre-fill and jump to the
   form the same way an in-page "Reserve This Car" click does. */
(function () {
  const vehicle = new URLSearchParams(window.location.search).get('vehicle');
  if (vehicle && typeof selectForSchedule === 'function') {
    selectForSchedule(vehicle);
  }
})();
