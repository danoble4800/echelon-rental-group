#!/usr/bin/env python3
"""
Generates the Echelon Economic Rentals resource pages:

  economy-faq.html, economy-rental-policies.html,
  economy-cancellation-policy.html, economy-terms-of-service.html,
  economy-privacy-policy.html, economy-accessibility.html

Economic Rentals has its own rules (age 21+, unlimited miles, $0 deposit for
qualified renters, delivery work allowed), so these pages are separate from
the Exotics pages built by generate_site_pages.py. Layout helpers are shared.
The footer here mirrors the one in index.html; keep the two in sync.
Re-run this script after editing any content below.
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generate_site_pages import CONTACT_BLOCK, page_hero, policy_page  # noqa: E402
from generate_vehicle_pages import NAV_TEMPLATE  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LAST_UPDATED = "September 27, 2026"

RESOURCES = [
    ("economy-rental-policies.html", "Rental Policies"),
    ("economy-cancellation-policy.html", "Cancellation &amp; Refunds"),
    ("economy-terms-of-service.html", "Terms of Service"),
    ("economy-privacy-policy.html", "Privacy Policy"),
    ("economy-accessibility.html", "Accessibility Statement"),
]

# Same Instagram glyph as the Exotics nav.
IG_ICON = re.search(r'<svg viewBox="0 0 24 24" aria-hidden="true">.*?</svg>', NAV_TEMPLATE).group(0)

NAV = f"""  <!-- CUSTOM CURSOR RING -->
  <div aria-hidden="true" class="cursor-ring"></div>
  <div aria-hidden="true" class="cursor-dot"></div>

  <!-- ───────────── NAVIGATION ───────────── -->
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a href="index.html" class="logo">
        <span class="logo-main">ECHELON</span>
        <span class="logo-sub">ECONOMIC RENTALS</span>
      </a>
      <ul class="nav-links">
        <li><a href="index.html#fleet">Fleet</a></li>
        <li><a href="index.html#pricing">Pricing</a></li>
        <li><a href="index.html#compare">Why Echelon</a></li>
        <li><a href="economy-faq.html">FAQ</a></li>
      </ul>
      <div class="nav-actions">
        <a href="tel:+15084442276" class="nav-social" aria-label="Call Echelon">📞</a>
        <a href="https://www.instagram.com/echelonrentalgroup/" class="nav-social" target="_blank" rel="noopener noreferrer" aria-label="Follow Echelon on Instagram">{IG_ICON}</a>
        <div class="brand-switcher" id="brandSwitcher">
          <button class="brand-btn" id="brandBtn" aria-label="Switch Echelon brand">
            <span class="brand-current" id="brandLabel">Economic Rentals</span>
            <span class="brand-caret">▾</span>
          </button>
          <div class="brand-dropdown" id="brandDropdown">
            <a class="brand-option active" href="index.html">
              <span class="brand-option-name">Economic Rentals</span>
              <span class="brand-option-desc">Affordable car rentals</span>
            </a>
            <a class="brand-option" href="exotics.html">
              <span class="brand-option-name">Exotics</span>
              <span class="brand-option-desc">Luxury &amp; exotic cars</span>
            </a>
            <a class="brand-option" href="boats.html">
              <span class="brand-option-name">Boat Charters</span>
              <span class="brand-option-desc">Yacht &amp; boat charters</span>
            </a>
            <a class="brand-option" href="jets.html">
              <span class="brand-option-name">Jet Charters</span>
              <span class="brand-option-desc">Private aviation</span>
            </a>
            <a class="brand-option" href="experiences.html">
              <span class="brand-option-name">Experiences</span>
              <span class="brand-option-desc">Curated adventures</span>
            </a>
          </div>
        </div>
        <a href="index.html#fleet" class="btn btn-primary">Book Now</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <a href="index.html#fleet">Fleet</a>
      <a href="index.html#pricing">Pricing</a>
      <a href="index.html#compare">Why Echelon</a>
      <a href="economy-faq.html">FAQ</a>
      <a href="index.html#fleet" class="btn btn-primary">Book Now</a>
      <div class="mobile-brand">
        <span class="mobile-brand-label">Echelon Brands</span>
        <a class="mobile-brand-option active" href="index.html">Economic Rentals</a>
        <a class="mobile-brand-option" href="exotics.html">Exotics</a>
        <a class="mobile-brand-option" href="boats.html">Boat Charters</a>
        <a class="mobile-brand-option" href="jets.html">Jet Charters</a>
        <a class="mobile-brand-option" href="experiences.html">Experiences</a>
      </div>
      <a href="https://www.instagram.com/echelonrentalgroup/" class="mobile-social" target="_blank" rel="noopener noreferrer">{IG_ICON}Instagram</a>
    </div>
  </nav>
"""

FOOTER = """  <!-- ───────────── FOOTER ───────────── -->
  <footer class="footer">
    <div class="footer-inner footer-inner--wide">
      <div class="footer-brand">
        <a href="index.html" class="logo footer-logo">
          <span class="logo-main">ECHELON</span>
          <span class="logo-sub">ECONOMIC RENTALS</span>
        </a>
        <p>Affordable, flexible car rentals for everyday life, from weekend trips to the daily commute. Part of the Echelon Rental Group family.</p>
        <div class="footer-socials">
          <a href="https://www.instagram.com/echelonrentalgroup" target="_blank" rel="noopener" class="social-link social-instagram">@EchelonRentalGroup</a>
        </div>
      </div>
      <div class="footer-links">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="index.html#fleet">View the Fleet</a>
        <a href="index.html#pricing">Pricing &amp; Plans</a>
        <a href="index.html#fleet">Book a Car</a>
        <a href="economy-faq.html">FAQs</a>
      </div>
      <div class="footer-links">
        <h4>Company</h4>
        <a href="index.html#compare">Why Echelon</a>
        <a href="index.html#gig-workers">Who We Serve</a>
        <a href="index.html#reviews">Renter Reviews</a>
      </div>
      <div class="footer-links">
        <h4>Resources</h4>
        <a href="economy-rental-policies.html">Rental Policies</a>
        <a href="economy-cancellation-policy.html">Cancellation &amp; Refunds</a>
        <a href="economy-terms-of-service.html">Terms of Service</a>
        <a href="economy-privacy-policy.html">Privacy Policy</a>
        <a href="economy-accessibility.html">Accessibility</a>
      </div>
      <div class="footer-links">
        <h4>Echelon Brands</h4>
        <a href="exotics.html">Exotics</a>
        <a href="boats.html">Boat Charters</a>
        <a href="jets.html">Jet Charters</a>
        <a href="experiences.html">Experiences</a>
      </div>
      <div class="footer-links">
        <h4>Contact</h4>
        <a href="tel:+15084442276">508-444-2276</a>
        <a href="mailto:info@echelonrentalgroup.com">info@echelonrentalgroup.com</a>
        <p class="footer-hours">Open 24 Hours, 7 Days a Week</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Echelon Rental Group. All rights reserved.</p>
      <div class="footer-legal">
        <a href="economy-privacy-policy.html">Privacy</a>
        <a href="economy-terms-of-service.html">Terms</a>
        <a href="economy-accessibility.html">Accessibility</a>
      </div>
    </div>
  </footer>
"""


def cta_band(title, body):
    return f"""  <!-- ───────────── CTA ───────────── -->
  <section class="dark-section">
    <div class="section-inner tight">
      <div class="cta-band">
        <h2>{title}</h2>
        <p>{body}</p>
        <div class="cta-actions">
          <a href="index.html#fleet" class="btn btn-primary btn-lg">Book a Car</a>
          <a href="tel:+15084442276" class="btn btn-outline-light btn-lg">Call 508-444-2276</a>
        </div>
      </div>
    </div>
  </section>
"""


def shell(title, description, body):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | Echelon Economic Rentals</title>
  <meta name="description" content="{description}" />
  <link rel="stylesheet" href="styles.css" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="1024x1024" href="/app-icon-1024.png" />
  <link rel="icon" type="image/png" sizes="180x180" href="/apple-touch-icon.png" />

  <meta property="og:type"        content="website" />
  <meta property="og:site_name"   content="Echelon Rental Group" />
  <meta property="og:title"       content="{title} | Echelon Economic Rentals" />
  <meta property="og:description" content="{description}" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
</head>
<body>

{NAV}
{body}
{FOOTER}
  <script src="brand-pages.js"></script>
  <script src="cursor-ring.js"></script>
  <script src="chat-widget.js" data-brand="economy"></script>
</body>
</html>
"""


def economy_policy_page(filename, title, intro, sections):
    return policy_page(filename, title, "Resources", intro, sections,
                       resources=RESOURCES, last_updated=LAST_UPDATED)


# ════════════════════════════════════════════
#   FAQ
# ════════════════════════════════════════════

FAQ_GROUPS = [
    ("booking", "Booking &amp; Requirements", [
        ("How do I book a car?",
         'Pick a car in our <a href="index.html#fleet">fleet</a>, tap "Book Now," and send your request. We\'ll call you within about an hour to confirm and collect payment. You can also call or text us at 508-444-2276.'),
        ("What do I need to rent?",
         "You'll need to be 21 or older with a valid, unexpired driver's license. You'll also need insurance: either your own auto policy that covers rental cars, or coverage you buy from us at booking."),
        ("I don't have car insurance. Can I still rent?",
         "Yes. We offer coverage for the full length of your rental, available to purchase directly from us when you book. Our listed rates are for renters who carry their own insurance, so we'll quote the coverage cost when we confirm your booking."),
        ("Can someone else drive the car?",
         "Only drivers listed on the rental agreement may drive. Each additional driver must meet the same age, license, and insurance requirements."),
        ("Can I get a car the same day?",
         "Often, yes. Call or text us at 508-444-2276 and we'll check what's available."),
    ]),
    ("pricing", "Rates, Plans &amp; Deposits", [
        ("How much does it cost?",
         'Compacts start at $80/day, sedans at $100/day, and SUVs at $150/day. Weekly and monthly plans cost less per day. See <a href="index.html#pricing">Pricing &amp; Plans</a> for every rate.'),
        ("Should I rent daily, weekly, or monthly?",
         "Daily works for a short trip or a quick replacement. Weekly is our most popular plan: it saves over the daily rate and adds priority car selection and a free car swap each week. Monthly has our best rate, fully covered maintenance, and the same car reserved for you."),
        ("Is there a security deposit?",
         "Qualified renters pay a $0 security deposit. We'll confirm what applies to you when we call to confirm your reservation."),
        ("Are there any hidden fees?",
         'No. What you\'re quoted is what you pay. Charges that can come up after a rental, such as fuel, tolls, tickets, or cleaning, only apply if they happen and are explained in our <a href="economy-rental-policies.html">Rental Policies</a>.'),
    ]),
    ("using", "Using the Car", [
        ("Are the miles really unlimited?",
         "Yes. Every rental includes unlimited miles. Planning to leave New England? Just let us know before you go."),
        ("Can I use the car for DoorDash, Grubhub, or other delivery apps?",
         'Yes. Delivery work, including DoorDash, Grubhub, Uber Eats, and Amazon Flex, is welcome. Many personal auto policies don\'t cover delivery work, so check yours or ask us about coverage when you book. See <a href="economy-rental-policies.html#permitted-use">Permitted Use</a>.'),
        ("Can I drive for Uber or Lyft?",
         "Driving passengers for a rideshare service requires our approval before your rental starts. Ask us when you book."),
        ("Who handles maintenance?",
         "We do. Oil changes and tire checks are on us, and on the monthly plan all maintenance is covered. If a warning light comes on, call us."),
        ("What if the car breaks down?",
         "24/7 roadside assistance is included. Call us at 508-444-2276 and we'll get you help. Don't arrange towing or repairs yourself without talking to us first."),
    ]),
    ("delivery", "Delivery &amp; Pickup", [
        ("Can you deliver the car to me?",
         "Yes. Local delivery and pickup are free. Longer distances are priced by distance, and we'll quote it when you book."),
    ]),
    ("changes", "Changes &amp; Cancellations", [
        ("What is your cancellation policy?",
         'Cancellations made at least 24 hours before your rental starts are free. Cancellations with less notice, and no-shows, are handled case by case. See our <a href="economy-cancellation-policy.html">Cancellation &amp; Refund Policy</a>.'),
        ("Can I extend my rental?",
         "Yes, and extensions are free: you just keep paying your plan's rate. Contact us before your return time. Extensions are subject to availability."),
        ("What if I'm running late on my return?",
         "Let us know as early as you can. Late returns are handled case by case."),
    ]),
]


def build_faq():
    jump = "\n".join(f'        <a href="#{gid}">{label}</a>' for gid, label, _ in FAQ_GROUPS)
    groups = []
    for gid, label, items in FAQ_GROUPS:
        details = "\n".join(
            f'          <details class="faq-item">\n            <summary>{q}</summary>\n            <p class="faq-answer">{a}</p>\n          </details>'
            for q, a in items
        )
        groups.append(f'      <div class="faq-group" id="{gid}">\n        <h2>{label}</h2>\n        <div class="faq-list">\n{details}\n        </div>\n      </div>')
    body = page_hero(
        "FAQs",
        "Just the Facts",
        "Everything you need to know before renting with Echelon Economic Rentals. Can't find your answer? Call or text us at 508-444-2276, any time.",
    ) + f"""
  <!-- ───────────── FAQ GROUPS ───────────── -->
  <section class="faq dark-section">
    <div class="section-inner">
      <nav class="faq-jump" aria-label="FAQ categories">
{jump}
      </nav>
{chr(10).join(groups)}
    </div>
  </section>

""" + cta_band("Still Have a Question?", "Our team is available 24 hours a day, 7 days a week, and happy to help you pick the right car and plan.")
    return shell("FAQs",
                 "Answers to common questions about renting from Echelon Economic Rentals: requirements, rates, deposits, delivery work, cancellations, and more.", body)


# ════════════════════════════════════════════
#   RENTAL POLICIES
# ════════════════════════════════════════════

def build_rental_policies():
    sections = [
        ("eligibility", "Driver Eligibility", """
          <ul>
            <li>All drivers must be <strong>21 years of age or older</strong>.</li>
            <li>A valid, unexpired driver's license is required.</li>
            <li>Only drivers listed on the rental agreement may operate the vehicle. Each additional driver must meet the same requirements.</li>
            <li>Echelon may decline any rental at its discretion, including when verification can't be completed.</li>
          </ul>"""),
        ("insurance", "Insurance", """
          <p>Every rental must be insured in one of two ways:</p>
          <ul>
            <li><strong>Your own policy:</strong> a valid personal auto insurance policy that extends to rental vehicles. Our listed rates apply to renters who carry their own insurance.</li>
            <li><strong>Coverage from Echelon:</strong> don't have a policy? You can buy coverage from us for the full length of your rental when you book.</li>
          </ul>
          <p>If you'll use the car for delivery work, check that your policy covers it. Many personal policies exclude delivery driving. Ask us about coverage when you book.</p>"""),
        ("deposit", "Security Deposit &amp; Payment", """
          <ul>
            <li>Qualified renters pay a <strong>$0 security deposit</strong>. We'll confirm what applies to you when we call to confirm your reservation.</li>
            <li>Payment is collected when we confirm your reservation by phone.</li>
            <li>Any charges from the rental, such as fuel, tolls, violations, or cleaning, are charged to the payment method on file.</li>
          </ul>"""),
        ("plans", "Daily, Weekly &amp; Monthly Plans", """
          <ul>
            <li><strong>Daily:</strong> any available car, unlimited miles, 24/7 roadside assistance, and an optional insurance add-on.</li>
            <li><strong>Weekly:</strong> everything in Daily, plus a lower rate than daily, priority car selection, one car swap per week, and a dedicated support line.</li>
            <li><strong>Monthly:</strong> everything in Weekly, plus our best rate, fully covered maintenance, the same car reserved for you, and loyalty rewards on renewals.</li>
            <li>Rates are listed on our <a href="index.html#pricing">Pricing &amp; Plans</a> section and are starting rates. The final price depends on the vehicle.</li>
          </ul>"""),
        ("mileage", "Mileage &amp; Travel", """
          <p>Every rental includes <strong>unlimited miles</strong>. If you plan to take the car outside New England, let us know before you go.</p>"""),
        ("permitted-use", "Permitted Use", """
          <p>Our cars are for everyday life, whatever that looks like for you: weekend trips, road trips, commuting, errands, family visits, moving, or a replacement while your own car is in the shop.</p>
          <ul>
            <li><strong>Delivery work is welcome.</strong> You may use the car for DoorDash, Grubhub, Uber Eats, Amazon Flex, and similar delivery services.</li>
            <li><strong>Passenger rideshare needs approval.</strong> Driving passengers for Uber, Lyft, or similar services requires Echelon's approval before your rental starts.</li>
          </ul>"""),
        ("prohibited", "Prohibited Uses", """
          <p>The following are not allowed:</p>
          <ul>
            <li>Racing, speed tests, or any competitive driving</li>
            <li>Off-road driving or towing of any kind</li>
            <li>Driving under the influence of alcohol, drugs, or any impairing substance</li>
            <li>Passenger rideshare without Echelon's prior approval</li>
            <li>Use by any driver not listed on the rental agreement</li>
            <li>Any illegal purpose</li>
          </ul>"""),
        ("delivery", "Delivery &amp; Pickup", """
          <ul>
            <li>Local delivery and pickup are <strong>free</strong>. Longer distances are priced by distance and quoted at booking.</li>
            <li>At handoff, we check the vehicle's condition with you before the rental begins.</li>
          </ul>"""),
        ("fuel", "Fuel", """
          <p>Return the car with <strong>the same fuel level it had at pickup</strong>. If it comes back with less fuel, a refueling charge applies.</p>"""),
        ("vehicle-care", "Vehicle Care &amp; Maintenance", """
          <ul>
            <li><strong>No smoking or vaping</strong> of any kind in any vehicle.</li>
            <li>Pets are not permitted without prior approval.</li>
            <li>Return the car in the condition you received it, allowing for normal use. Excessive dirt, stains, or odors will incur a cleaning fee.</li>
            <li>Routine maintenance, such as oil changes and tire checks, is handled by Echelon. On the monthly plan, maintenance is fully covered. If we need the car for scheduled service during a long rental, we'll arrange it with you.</li>
            <li>If a warning light comes on, call us.</li>
          </ul>"""),
        ("tolls", "Tolls, Tickets &amp; Violations", """
          <p>The renter is responsible for all tolls, parking tickets, speeding and red-light camera violations, and towing or impound fees incurred during the rental. These are charged to the payment method on file.</p>"""),
        ("returns", "Extensions &amp; Returns", """
          <ul>
            <li>Extensions are <strong>free</strong>: keep the car at your plan's rate. Contact us before your return time. Extensions are subject to availability.</li>
            <li>Return the car at the date and time on your rental agreement. Running late? Tell us as early as you can. Late returns are handled case by case.</li>
          </ul>"""),
        ("damage", "Accidents, Damage &amp; Breakdowns", """
          <ul>
            <li>24/7 roadside assistance is included with every rental.</li>
            <li>Report any accident, damage, warning light, or breakdown to Echelon <strong>right away</strong> at 508-444-2276, any time.</li>
            <li>In an accident, make sure everyone is safe, contact the police when required, and get a police report. Don't arrange towing or repairs without our approval.</li>
            <li>The renter is responsible for damage to the vehicle during the rental, to the extent permitted by law and subject to any coverage purchased from Echelon.</li>
          </ul>"""),
        ("contact", "Questions", CONTACT_BLOCK),
    ]
    body = economy_policy_page(
        "economy-rental-policies.html", "Rental Policies",
        "The standards every Echelon Economic Rentals rental follows, covering eligibility, insurance, plans, permitted use, and vehicle care. Your signed rental agreement governs each rental.",
        sections,
    )
    return shell("Rental Policies",
                 "Echelon Economic Rentals policies: driver eligibility, insurance, deposits, daily/weekly/monthly plans, delivery work, fuel, and returns.", body)


# ════════════════════════════════════════════
#   CANCELLATION & REFUNDS
# ════════════════════════════════════════════

def build_cancellation():
    sections = [
        ("summary", "At a Glance", """
          <div class="fact-sheet">
            <div class="fact-row"><span>24+ hours before pickup</span><span>Free cancellation</span></div>
            <div class="fact-row"><span>Under 24 hours / no-show</span><span>Case by case</span></div>
            <div class="fact-row"><span>Rental extensions</span><span>Free, at your plan's rate</span></div>
            <div class="fact-row"><span>Security deposit</span><span>$0 for qualified renters</span></div>
          </div>"""),
        ("cancelling", "Cancelling a Reservation", """
          <p>To cancel, call, text, or email us. Your cancellation is effective when we receive it, and we'll confirm it with you.</p>
          <ul>
            <li><strong>24 hours or more</strong> before your scheduled pickup or delivery: free cancellation, with a full refund of any rental charges paid.</li>
            <li><strong>Less than 24 hours</strong> before, or a no-show: handled case by case. Contact us as soon as you know your plans have changed.</li>
          </ul>"""),
        ("changes", "Changing a Reservation", """
          <p>Need different dates or a different car? Contact us and we'll update your reservation, subject to availability. If you switch to a vehicle or plan with a different rate, the new rate applies.</p>"""),
        ("extensions", "Extensions &amp; Returns", """
          <p>Extensions are free: you keep the car at your plan's rate. Contact us before your return time. Extensions are subject to availability.</p>
          <p>Returning the car early, or running late? Let us know as early as you can. Early and late returns are handled case by case.</p>"""),
        ("our-cancellations", "If We Need to Cancel", """
          <p>If Echelon cancels your reservation, or your reserved car becomes unavailable for reasons within our control, we'll offer a comparable vehicle. If none works for you, you'll receive a full refund of any rental charges paid.</p>"""),
        ("deposits", "Security Deposits", """
          <p>Qualified renters pay a $0 security deposit. If a deposit applies to your rental, we'll tell you before you pay, and it's released after the car is returned and inspected, minus any charges from the rental.</p>"""),
        ("how-refunds", "How Refunds Are Issued", """
          <p>Refunds are returned to the original form of payment. Depending on your bank or card issuer, it may take several business days to appear on your statement.</p>"""),
        ("contact", "Questions", CONTACT_BLOCK),
    ]
    body = economy_policy_page(
        "economy-cancellation-policy.html", "Cancellation &amp; Refund Policy",
        "Plans change, and we get it. Here's how cancellations, changes, extensions, and refunds work for Echelon Economic Rentals reservations.",
        sections,
    )
    return shell("Cancellation &amp; Refund Policy",
                 "How cancellations, reservation changes, extensions, and refunds work at Echelon Economic Rentals.", body)


# ════════════════════════════════════════════
#   TERMS OF SERVICE
# ════════════════════════════════════════════

def build_terms():
    sections = [
        ("acceptance", "Acceptance of These Terms", """
          <p>These Terms of Service govern your use of the Echelon Economic Rentals website and the services offered through it by Echelon Rental Group ("Echelon," "we," "us"). By using this website or submitting a reservation request, you agree to these terms. If you don't agree, please don't use the website.</p>"""),
        ("reservations", "Reservations", """
          <ul>
            <li>Submitting a reservation request does not guarantee a vehicle. A reservation is confirmed only when Echelon confirms it with you directly.</li>
            <li>Every rental is governed by a separate rental agreement signed before the rental begins, along with our <a href="economy-rental-policies.html">Rental Policies</a> and <a href="economy-cancellation-policy.html">Cancellation &amp; Refund Policy</a>. If those documents conflict with these terms, the rental agreement controls.</li>
            <li>You agree that the information you provide is accurate and complete.</li>
          </ul>"""),
        ("pricing", "Pricing &amp; Availability", """
          <p>Rates, vehicles, and availability shown on the website may change without notice. Listed prices are starting rates for renters who carry their own insurance. We make every effort to keep information accurate, but errors can occur. If a posted price is wrong, we'll contact you before confirming your reservation. Vehicles are listed by class (compact, sedan, SUV), and the specific make and model you receive may vary.</p>"""),
        ("communications", "Communications", """
          <p>By submitting a request, you agree that Echelon may contact you by phone, text message, or email about your reservation. Message and data rates may apply. You can ask us to stop non-essential messages at any time.</p>"""),
        ("chat", "Chat Assistant", """
          <p>The chat assistant on this website uses artificial intelligence to answer general questions. Its answers are for information only and may contain mistakes. It can't make, change, or confirm reservations. Your rental agreement and our published policies control over anything the assistant says.</p>"""),
        ("website-use", "Use of the Website", """
          <p>You agree not to misuse the website, including by attempting to gain unauthorized access, interfering with its operation, submitting false or fraudulent requests, or using automated tools to collect its content.</p>"""),
        ("ip", "Intellectual Property", """
          <p>All content on this website, including text, images, logos, and design, is owned by or licensed to Echelon Rental Group and may not be copied or reused without our written permission. Names of third-party services, such as delivery apps, belong to their respective owners and are used only to describe how our cars can be used. Echelon is not affiliated with or endorsed by those companies.</p>"""),
        ("third-party", "Third-Party Links", """
          <p>The website links to third-party services such as Instagram. We aren't responsible for their content or practices, and your use of them is governed by their own terms.</p>"""),
        ("disclaimers", "Disclaimers", """
          <p>The website is provided "as is" and "as available." To the fullest extent permitted by law, Echelon disclaims all warranties, express or implied, regarding the website and its content.</p>"""),
        ("liability", "Limitation of Liability", """
          <p>To the fullest extent permitted by law, Echelon will not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website. Liability related to a rental is governed by your rental agreement.</p>"""),
        ("law", "Governing Law", """
          <p>These terms are governed by the laws of the Commonwealth of Massachusetts, without regard to its conflict-of-law rules. Any dispute will be resolved in the state or federal courts located in Massachusetts.</p>"""),
        ("changes", "Changes to These Terms", """
          <p>We may update these terms from time to time. The "Last updated" date at the top of this page shows when they last changed. Continued use of the website means you accept the updated terms.</p>"""),
        ("contact", "Contact", CONTACT_BLOCK),
    ]
    body = economy_policy_page(
        "economy-terms-of-service.html", "Terms of Service",
        "The terms that apply when you use the Echelon Economic Rentals website and request a reservation.",
        sections,
    )
    return shell("Terms of Service",
                 "Terms of Service for the Echelon Economic Rentals website and reservation requests.", body)


# ════════════════════════════════════════════
#   PRIVACY POLICY
# ════════════════════════════════════════════

def build_privacy():
    sections = [
        ("overview", "Overview", """
          <p>This Privacy Policy explains what personal information Echelon Rental Group ("Echelon," "we," "us") collects through the Echelon Economic Rentals website and our rental services, how we use it, and the choices you have. <strong>We do not sell your personal information.</strong></p>"""),
        ("collect", "Information We Collect", """
          <h3>Information you give us</h3>
          <ul>
            <li><strong>Reservation requests:</strong> name, phone number, email address, rental dates, the car you're interested in, and how you plan to use it.</li>
            <li><strong>Rental verification:</strong> driver's license details, insurance information, and payment information needed to confirm a rental.</li>
            <li><strong>Chat messages:</strong> anything you type into the chat assistant on our website.</li>
            <li><strong>Communications:</strong> anything you share when you call, text, email, or message us on Instagram.</li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li><strong>Server logs:</strong> our hosting provider records standard technical data such as IP address, browser type, and pages requested, for security and reliability.</li>
            <li><strong>Browser storage:</strong> your language choice is saved in your browser's local storage, and your current chat conversation is kept in session storage until you close the tab. Neither is used for tracking.</li>
            <li><strong>Vehicle data:</strong> our vehicles may be equipped with GPS and telematics systems that record location and driving data during a rental.</li>
          </ul>
          <p>We do not use advertising cookies or third-party tracking pixels on the Echelon Economic Rentals website.</p>"""),
        ("use", "How We Use Your Information", """
          <ul>
            <li>To respond to your requests, confirm reservations, and arrange delivery and pickup</li>
            <li>To verify eligibility, insurance, and payment, and to process charges and refunds</li>
            <li>To answer your questions through the chat assistant</li>
            <li>To protect our vehicles, recover them if necessary, and resolve tolls, violations, or damage</li>
            <li>To contact you about your rental by phone, text, or email</li>
            <li>To improve our website and services, and to comply with legal obligations</li>
          </ul>"""),
        ("share", "How We Share Information", """
          <p>We share personal information only as needed to run our business:</p>
          <ul>
            <li><strong>Service providers</strong> that help us operate, such as website hosting, Google Workspace (where reservation requests are stored), email delivery, payment processors, and our AI provider (Anthropic), which processes chat messages to generate the assistant's replies. They may use it only to provide services to us.</li>
            <li><strong>Insurance companies</strong> when verifying coverage or handling a claim</li>
            <li><strong>Toll authorities and law enforcement</strong> when resolving violations, responding to legal process, or protecting our vehicles, customers, or others</li>
            <li><strong>Within Echelon Rental Group</strong>, so our brands can serve you consistently</li>
          </ul>
          <p>Our website loads fonts from Google Fonts, which receives your IP address when fonts are requested.</p>"""),
        ("retention", "Data Retention &amp; Security", """
          <p>We keep personal information only as long as needed for the purposes above, including legal, tax, and insurance requirements. We use reasonable administrative, technical, and physical safeguards to protect it, consistent with Massachusetts data security regulations (201 CMR 17.00). No method of transmission or storage is completely secure.</p>"""),
        ("choices", "Your Choices &amp; Rights", """
          <ul>
            <li>You can request access to, correction of, or deletion of your personal information, subject to legal and contractual retention requirements.</li>
            <li>You can opt out of non-essential texts or emails at any time by replying STOP or contacting us.</li>
            <li>You can clear your language preference and chat history by clearing your browser's site data.</li>
          </ul>
          <p>To make a request, contact us using the details below. We may need to verify your identity before acting on it.</p>"""),
        ("children", "Children's Privacy", """
          <p>Our services are intended for adults. We do not knowingly collect personal information from children under 13 through this website.</p>"""),
        ("changes", "Changes to This Policy", """
          <p>We may update this policy from time to time. The "Last updated" date at the top of this page shows when it last changed.</p>"""),
        ("contact", "Contact", CONTACT_BLOCK),
    ]
    body = economy_policy_page(
        "economy-privacy-policy.html", "Privacy Policy",
        "How Echelon collects, uses, and protects your personal information.",
        sections,
    )
    return shell("Privacy Policy",
                 "How Echelon Rental Group collects, uses, shares, and protects personal information through the Echelon Economic Rentals website and rentals.", body)


# ════════════════════════════════════════════
#   ACCESSIBILITY
# ════════════════════════════════════════════

def build_accessibility():
    sections = [
        ("commitment", "Our Commitment", """
          <p>Echelon Rental Group wants everyone to be able to browse our cars, request a reservation, and reach our team, regardless of ability or the technology they use. We're working to make the Echelon Economic Rentals website conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong>.</p>"""),
        ("measures", "What We're Doing", """
          <ul>
            <li>Using headings and landmarks so screen readers can navigate each page</li>
            <li>Providing labels for form fields and buttons</li>
            <li>Supporting keyboard navigation for menus, FAQs, the booking form, and the chat assistant</li>
            <li>Offering the homepage in English, Spanish, and Portuguese</li>
            <li>Designing layouts that work on phones, tablets, and desktops, and with browser zoom</li>
          </ul>"""),
        ("limitations", "Known Limitations", """
          <p>We're still improving some areas of the site:</p>
          <ul>
            <li>Vehicle illustrations on the homepage are decorative and don't yet have text descriptions. Each car's details are listed in text next to it.</li>
            <li>The custom cursor effect is decorative only, and it's disabled on touch devices.</li>
          </ul>
          <p>If any part of the site gets in your way, please tell us. We'll help you directly and use your feedback to fix it.</p>"""),
        ("assistance", "Need Help Booking?", """
          <p>You never need to use the website to rent with us. Our team can take your entire reservation by phone, text, or email, 24 hours a day, 7 days a week.</p>
          <p>If you need a vehicle with particular features, ask us before you book and we'll help you find the right fit.</p>"""),
        ("feedback", "Feedback &amp; Contact", CONTACT_BLOCK.replace(
            "Questions about anything on this page?",
            "To report an accessibility barrier or request information in another format, reach out. We aim to respond within 2 business days.",
        )),
    ]
    body = economy_policy_page(
        "economy-accessibility.html", "Accessibility Statement",
        "Our commitment to making Echelon Economic Rentals usable for everyone, and how to reach us if something isn't working for you.",
        sections,
    )
    return shell("Accessibility Statement",
                 "Echelon Economic Rentals' commitment to web accessibility, the measures we take, known limitations, and how to get help.", body)


PAGES = {
    "economy-faq.html": build_faq,
    "economy-rental-policies.html": build_rental_policies,
    "economy-cancellation-policy.html": build_cancellation,
    "economy-terms-of-service.html": build_terms,
    "economy-privacy-policy.html": build_privacy,
    "economy-accessibility.html": build_accessibility,
}


def main():
    for filename, build in PAGES.items():
        path = os.path.join(ROOT, filename)
        with open(path, "w") as f:
            f.write(build())
        print("wrote", path)


if __name__ == "__main__":
    main()
