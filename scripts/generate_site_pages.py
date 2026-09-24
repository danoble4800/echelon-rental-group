#!/usr/bin/env python3
"""
Generates the Echelon Exotics company & resource pages:

  Company:   about.html, how-it-works.html, faq.html, service-areas.html
  Resources: rental-policies.html, cancellation-policy.html,
             terms-of-service.html, privacy-policy.html, accessibility.html

Nav and footer come from generate_vehicle_pages.py so every exotics page
shares one copy. Re-run this script after editing any content below.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generate_vehicle_pages import NAV_TEMPLATE, FOOTER_TEMPLATE  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LAST_UPDATED = "September 24, 2026"
PHONE = '<a href="tel:+15084442276">508-444-2276</a>'
EMAIL = '<a href="mailto:info@echelonrentalgroup.com">info@echelonrentalgroup.com</a>'

RESOURCES = [
    ("rental-policies.html", "Rental Policies"),
    ("cancellation-policy.html", "Cancellation &amp; Refunds"),
    ("terms-of-service.html", "Terms of Service"),
    ("privacy-policy.html", "Privacy Policy"),
    ("accessibility.html", "Accessibility Statement"),
]

# Line icons reused from the homepage "Why Echelon" list.
ICONS = {
    "pin": '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    "calendar": '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="m9 15 2 2 4-4"/>',
    "tag": '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
    "home": '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v12h14V9"/><path d="M10 21v-6h4v6"/>',
    "key": '<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 9.2-9.2M16 7l3 3M14 9l2 2"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "id": '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16c.6-1.5 1.8-2.3 3.2-2.3s2.6.8 3.2 2.3M14.5 10h4M14.5 13.5h3"/>',
    "shield": '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
    "card": '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
    "plane": '<path d="M10.5 20.5 12 16l-7-3.5V10l7 1.5V6a1.5 1.5 0 0 1 3 0v5.5l7-1.5v2.5L15 16l1.5 4.5-3-1z"/>',
    "star": '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
}


def icon(name):
    return (
        '<svg class="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        + ICONS[name] + "</svg>"
    )


def card(title, body, icon_name=None, chips=None):
    parts = ['        <div class="info-card">']
    if icon_name:
        parts.append("          " + icon(icon_name))
    parts.append(f"          <h3>{title}</h3>")
    parts.append(f"          <p>{body}</p>")
    if chips:
        parts.append("          <ul>" + "".join(f"<li>{c}</li>" for c in chips) + "</ul>")
    parts.append("        </div>")
    return "\n".join(parts)


def page_hero(tag, title, intro, extra=""):
    return f"""  <!-- ───────────── PAGE HERO ───────────── -->
  <section class="page-hero dark-section">
    <div class="section-inner">
      <div class="section-tag">{tag}</div>
      <h1>{title}</h1>
      <p>{intro}</p>
{extra}    </div>
  </section>
"""


def cta_band(title, body):
    return f"""  <!-- ───────────── CTA ───────────── -->
  <section class="dark-section">
    <div class="section-inner tight">
      <div class="cta-band">
        <h2>{title}</h2>
        <p>{body}</p>
        <div class="cta-actions">
          <a href="reserve.html" class="btn btn-primary btn-lg">Reserve a Car</a>
          <a href="tel:+15084442276" class="btn btn-outline-light btn-lg">Call 508-444-2276</a>
        </div>
      </div>
    </div>
  </section>
"""


def shell(filename, title, description, body):
    nav = NAV_TEMPLATE.format(reserve_href="reserve.html")
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | Echelon Exotics</title>
  <meta name="description" content="{description}" />
  <link rel="stylesheet" href="styles.css" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="1024x1024" href="/app-icon-1024.png" />
  <link rel="icon" type="image/png" sizes="180x180" href="/apple-touch-icon.png" />

  <meta property="og:type"        content="website" />
  <meta property="og:site_name"   content="Echelon Rental Group" />
  <meta property="og:title"       content="{title} | Echelon Exotics" />
  <meta property="og:description" content="{description}" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
</head>
<body class="theme-exotics">

{nav}
{body}
{FOOTER_TEMPLATE}
  <script src="brand-pages.js"></script>
  <script src="cursor-ring.js"></script>
</body>
</html>
"""


# ════════════════════════════════════════════
#   POLICY PAGES — shared sidebar layout
# ════════════════════════════════════════════

def policy_page(filename, title, tag, intro, sections):
    """sections: list of (anchor_id, heading, inner_html)."""
    resource_links = "\n".join(
        f'            <a href="{href}"' + (' aria-current="page"' if href == filename else "") + f">{label}</a>"
        for href, label in RESOURCES
    )
    toc_links = "\n".join(f'            <a href="#{sid}">{heading}</a>' for sid, heading, _ in sections)
    content = "\n\n".join(f'          <h2 id="{sid}">{heading}</h2>\n{inner.strip(chr(10))}' for sid, heading, inner in sections)
    hero = page_hero(tag, title, intro, f'      <p class="page-meta">Last updated {LAST_UPDATED}</p>\n')
    return hero + f"""
  <!-- ───────────── POLICY BODY ───────────── -->
  <section class="dark-section">
    <div class="section-inner tight">
      <div class="policy-layout">
        <aside class="policy-aside">
          <div>
            <h4>Resources</h4>
            <nav aria-label="Resources">
{resource_links}
            </nav>
          </div>
          <div class="policy-toc">
            <h4>On This Page</h4>
            <nav aria-label="On this page">
{toc_links}
            </nav>
          </div>
        </aside>
        <article class="prose">
{content}
        </article>
      </div>
    </div>
  </section>
"""


CONTACT_BLOCK = f"""          <p>Questions about anything on this page? Our team is available 24 hours a day, 7 days a week.</p>
          <ul>
            <li>Call or text: {PHONE}</li>
            <li>Email: {EMAIL}</li>
            <li>Instagram: <a href="https://www.instagram.com/echelonrentalgroup/" target="_blank" rel="noopener noreferrer">@EchelonRentalGroup</a></li>
          </ul>"""


# ════════════════════════════════════════════
#   ABOUT
# ════════════════════════════════════════════

def build_about():
    values = "\n".join([
        card("Complimentary Delivery", "We bring the car to you. The first 10 miles are on us, and we can deliver further out on request.", "pin"),
        card("Easy Booking", "Reserve online or call us directly. Most requests are confirmed within the hour, with minimal paperwork.", "calendar"),
        card("Transparent Pricing", "No hidden fees and no surprise charges at pickup. What you're quoted is what you pay.", "tag"),
        card("Locally Owned", "Echelon is Massachusetts-based and locally owned, not a faceless franchise. We know our clients and our cars.", "home"),
        card("Curated Fleet", "Every vehicle is hand-selected, detailed, and inspected before it reaches you. No surprises, no substitutions.", "key"),
        card("Always Available", "Our team is on call 24 hours a day, 7 days a week, from your first question to the moment the keys come back.", "clock"),
    ])
    family = "\n".join([
        card('<a href="index.html">Economic Rentals</a>', "Affordable, everyday car rentals for when you just need to get where you're going.", chips=["Daily", "Weekly", "Monthly"]),
        card('<a href="boats.html">Boat Charters</a>', "Yacht and boat charters along the New England coast for groups, celebrations, and sunset cruises.", chips=["Yachts", "Day Charters"]),
        card('<a href="jets.html">Jet Charters</a>', "Private aviation for business trips and getaways, with no terminals and no waiting.", chips=["Private Jets", "On Demand"]),
        card('<a href="experiences.html">Experiences</a>', "Curated adventures that pair our vehicles, boats, and jets into one seamless itinerary.", chips=["Curated", "Group Friendly"]),
    ])
    body = page_hero(
        "About Us",
        'Driven by Detail,<br /><span class="accent">Built on Trust.</span>',
        "Echelon Exotics is the luxury and exotic car division of Echelon Rental Group, a locally owned Massachusetts company. We put extraordinary cars within reach without the runaround.",
    ) + f"""
  <!-- ───────────── STORY ───────────── -->
  <section class="dark-section">
    <div class="section-inner">
      <div class="split">
        <div class="prose">
          <div class="section-tag">Our Story</div>
          <h2>More Than the Keys</h2>
          <p>Echelon started with a simple idea: renting an exotic car should feel as special as driving one. Too often it means long counters, vague pricing, and a car that doesn't match the photos. We built Echelon to be the opposite.</p>
          <p>Every car in our fleet is hand-picked, professionally detailed, and inspected before every rental. We deliver it to your door, hotel, venue, or airport, walk you through it, and pick it up when you're done. Pricing is transparent from the first quote, and a real person answers the phone any time of day.</p>
          <p>Whether it's a Lamborghini for a milestone birthday, a Rolls-Royce for a wedding, or a Maybach with a chauffeur for a night in the city, our job is to make the day feel effortless so you can focus on the drive.</p>
        </div>
        <div class="split-media" role="img" aria-label="2026 Maybach GLS from the Echelon Exotics fleet" style="background-image: url('images/fleet/maybach-gls.jpg');"></div>
      </div>
    </div>
  </section>

  <!-- ───────────── VALUES ───────────── -->
  <section class="dark-section">
    <div class="section-inner tight">
      <div class="section-header">
        <div class="section-tag">What We Stand For</div>
        <h2>The Echelon Standard</h2>
        <p>The promises we make on every rental, whether it's your first or your fiftieth.</p>
      </div>
      <div class="card-grid">
{values}
      </div>
    </div>
  </section>

  <!-- ───────────── FAMILY ───────────── -->
  <section class="dark-section">
    <div class="section-inner tight">
      <div class="section-header">
        <div class="section-tag">Echelon Rental Group</div>
        <h2>One Family, Every Way to Travel</h2>
        <p>Echelon Exotics is one of five brands under the Echelon Rental Group name, each built on the same standard of service.</p>
      </div>
      <div class="card-grid two">
{family}
      </div>
    </div>
  </section>

""" + cta_band("Ready When You Are", "Browse the fleet, send a request, and we'll confirm availability and delivery details within the hour.")
    return shell("about.html", "About Us",
                 "Echelon Exotics is the locally owned, Massachusetts-based luxury and exotic car rental division of Echelon Rental Group.", body)


# ════════════════════════════════════════════
#   HOW IT WORKS
# ════════════════════════════════════════════

def build_how_it_works():
    steps = [
        ("Choose Your Car",
         '<p>Browse the <a href="fleet.html">full fleet</a> and pick the car that fits the occasion, from supercars like the Lamborghini Huracán to ultra-luxury SUVs like the Rolls-Royce Cullinan. Each vehicle page lists its daily rate, security deposit, and specs.</p>'),
        ("Request Your Reservation",
         '<p>Submit a <a href="reserve.html">reservation request</a> online, or call or text us at 508-444-2276. Tell us your dates, the car you want, and where you\'d like it delivered.</p><p>Most requests are confirmed within the hour.</p>'),
        ("Get Verified",
         '<p>Before your rental, we verify your driver\'s license, proof of insurance, and payment method, and place the refundable security deposit. We\'ll let you know exactly what we need, and it only takes a few minutes. See our <a href="rental-policies.html">Rental Policies</a> for the full requirements.</p>'),
        ("Delivery &amp; Handoff",
         '<p>We deliver the car, detailed and fueled, to your home, hotel, venue, or airport. The first 10 miles are complimentary (see <a href="service-areas.html">Service Areas</a>). You can also pick it up from our location.</p><p>At handoff we walk around the car with you, document its condition with photos, and show you the controls.</p>'),
        ("Enjoy the Drive",
         "<p>Every rental includes 125 miles per day. Our team is available 24/7 if you need anything. Want someone else behind the wheel? Add a chauffeur on select vehicles.</p>"),
        ("Return",
         "<p>At the end of your rental we pick the car up from you, or you drop it off at our location. We do a final walk-around together, and once the vehicle is inspected your security deposit is released.</p>"),
    ]
    step_items = "\n".join(
        f"        <li>\n          <div>\n            <h3>{t}</h3>\n            {b}\n          </div>\n        </li>"
        for t, b in steps
    )
    needs = "\n".join([
        card("Age 25+ &amp; Valid License", "All drivers must be at least 25 years old with a valid driver's license in good standing.", "id"),
        card("Proof of Insurance", "A valid personal auto insurance policy with coverage that extends to rental vehicles.", "shield"),
        card("Security Deposit", "A refundable deposit, placed on a major credit card, that varies by vehicle and is listed on each car's page.", "card"),
    ])
    body = page_hero(
        "How It Works",
        'From Request to <span class="accent">Redline</span>',
        "Reserving an exotic with Echelon takes minutes. Here's what happens from the moment you pick a car to the moment you hand back the keys.",
    ) + f"""
  <!-- ───────────── STEPS ───────────── -->
  <section class="dark-section">
    <div class="section-inner">
      <ol class="step-list">
{step_items}
      </ol>
    </div>
  </section>

  <!-- ───────────── WHAT YOU'LL NEED ───────────── -->
  <section class="dark-section">
    <div class="section-inner tight">
      <div class="section-header">
        <div class="section-tag">Before You Book</div>
        <h2>What You'll Need</h2>
        <p>Have these ready and your reservation can be confirmed the same day.</p>
      </div>
      <div class="card-grid">
{needs}
      </div>
      <div class="explore-cta"><a href="faq.html" class="btn btn-outline-light">Still Have Questions? Read the FAQs</a></div>
    </div>
  </section>

""" + cta_band("Pick Your Car", "Tell us what you'd like to drive and when, and we'll handle the rest.")
    return shell("how-it-works.html", "How It Works",
                 "How renting an exotic car from Echelon works: choose your car, request a reservation, get verified, and we deliver it to you.", body)


# ════════════════════════════════════════════
#   FAQ
# ════════════════════════════════════════════

FAQ_GROUPS = [
    ("booking", "Booking &amp; Requirements", [
        ("How do I reserve a car?",
         'Submit a request on our <a href="reserve.html">reservation page</a>, or call or text us at 508-444-2276. Most requests are confirmed within the hour. See <a href="how-it-works.html">How It Works</a> for the full process.'),
        ("What's the minimum age and license requirement?",
         "Renters must be at least 25 years old with a valid driver's license in good standing. Some vehicles may carry additional requirements, which we'll confirm at booking."),
        ("Do I need my own insurance?",
         'Yes. A valid personal auto insurance policy with adequate liability coverage is required for every exotic and luxury rental, and it must extend to rental vehicles. Our team confirms your coverage meets our minimum requirements before delivery. See our <a href="rental-policies.html#insurance">Rental Policies</a>.'),
        ("Can someone else drive the car?",
         "Only drivers listed on the rental agreement and verified by our team may drive the vehicle. Each additional driver must meet the same age, license, and insurance requirements."),
        ("How far in advance should I book?",
         "We recommend booking at least a few days ahead, and earlier for weekends, holidays, and wedding season. Same-day requests are often possible, so call us and we'll check availability."),
    ]),
    ("pricing", "Pricing &amp; Deposits", [
        ("What's included in the rental rate?",
         "Every rental includes 125 miles per day as a standard allowance. Need more for your trip? Let us know when you book and we'll work out a mileage plan that fits."),
        ("Is a security deposit required?",
         "A refundable security deposit is required on every reservation. The exact amount depends on which vehicle you choose and is listed on each vehicle's page and confirmed when you book."),
        ("When do I get my deposit back?",
         'Your deposit is released after the vehicle is returned and inspected, usually within 7 business days. How quickly it appears in your account depends on your card issuer. See <a href="cancellation-policy.html#deposits">Cancellation &amp; Refunds</a>.'),
        ("Are there any hidden fees?",
         "No. What you're quoted is what you pay. Charges that can apply after a rental, such as extra mileage, fuel, tolls, tickets, or damage, only apply when they happen and are outlined in our Rental Policies."),
    ]),
    ("delivery", "Delivery &amp; Pickup", [
        ("Can you deliver the car to me?",
         'Absolutely. We offer white-glove delivery and pickup to your home, hotel, venue, or the airport. The first 10 miles are complimentary. See <a href="service-areas.html">Service Areas</a> for where we deliver.'),
        ("Can I pick the car up myself?",
         "Yes. Self-pickup is available at our location. We'll share the address and pickup instructions with your confirmation."),
        ("Do you deliver to airports?",
         'Yes. We regularly meet clients at Boston Logan and other regional airports and private terminals. <a href="service-areas.html#airports">See airport delivery</a>.'),
    ]),
    ("during", "During Your Rental", [
        ("Is a chauffeur available?",
         "Yes. Chauffeur service is available as an add-on for select vehicles, a great option for weddings, events, or nights out when you'd rather not drive."),
        ("What if something goes wrong on the road?",
         "Call us right away at 508-444-2276. We're available 24/7. For accidents, make sure everyone is safe, contact the police if needed, and then call us before arranging any towing or repairs."),
        ("Can I smoke or bring pets in the car?",
         'Smoking and vaping are not permitted in any vehicle. Pets are only allowed with prior approval. Cleaning fees apply otherwise. See our <a href="rental-policies.html#vehicle-care">Rental Policies</a>.'),
        ("Can I take the car to a track or out of state?",
         'Track use, racing, and off-road driving are prohibited. Travel outside New England requires approval in advance, so just ask when you book.'),
    ]),
    ("changes", "Changes &amp; Cancellations", [
        ("Can I change my reservation?",
         "Yes. Date and vehicle changes are free, subject to availability, when requested at least 24 hours before your rental starts."),
        ("What is your cancellation policy?",
         'Cancel 72 or more hours before your rental for a full refund. Cancellations made 24–72 hours in advance receive a 50% refund or a full credit toward a future rental. Cancellations within 24 hours and no-shows are non-refundable. Full details are in our <a href="cancellation-policy.html">Cancellation &amp; Refund Policy</a>.'),
        ("What if I return the car late?",
         'Returns more than 30 minutes past your scheduled time are billed hourly, and returns more than 3 hours late are billed as an additional day. If you think you\'ll be late, let us know as early as possible. See <a href="rental-policies.html#returns">Rental Policies</a>.'),
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
        "Everything you need to know before reserving your luxury or exotic rental. Can't find your answer? Call or text us at 508-444-2276, any time.",
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

""" + cta_band("Still Have a Question?", "Our team is available 24 hours a day, 7 days a week, and happy to help you pick the right car.")
    return shell("faq.html", "FAQs",
                 "Answers to common questions about renting an exotic or luxury car from Echelon: requirements, deposits, delivery, cancellations, and more.", body)


# ════════════════════════════════════════════
#   SERVICE AREAS
# ════════════════════════════════════════════

def build_service_areas():
    regions = "\n".join([
        card("Greater Boston", "Downtown, the Back Bay, the Seaport, Cambridge, and the surrounding suburbs.", "pin",
             ["Boston", "Cambridge", "Brookline", "Newton", "Quincy"]),
        card("MetroWest", "Suburban delivery to homes, offices, and venues west of the city.", "pin",
             ["Framingham", "Natick", "Wellesley", "Marlborough"]),
        card("Central Massachusetts", "Worcester and the surrounding towns.", "pin",
             ["Worcester", "Shrewsbury", "Westborough"]),
        card("South Shore &amp; South Coast", "From the South Shore down to the South Coast.", "pin",
             ["Brockton", "Plymouth", "New Bedford", "Fall River"]),
        card("Cape Cod", "Summer weekends, weddings, and getaways on the Cape.", "pin",
             ["Hyannis", "Falmouth", "Chatham"]),
        card("Rhode Island", "Just across the border for weekends by the water.", "pin",
             ["Providence", "Newport"]),
    ])
    airports = "\n".join([
        card("Boston Logan International (BOS)", "Meet your car curbside or at the rental lot when you land.", "plane"),
        card("Rhode Island T.F. Green (PVD)", "Convenient for the South Coast, Rhode Island, and Cape trips.", "plane"),
        card("Private &amp; Regional Terminals", 'Including Hanscom Field (BED) and Norwood (OWD). Flying private? Pair your car with an <a href="jets.html" class="inline-link">Echelon Jet Charter</a>.', "plane"),
    ])
    body = page_hero(
        "Service Areas",
        'We Bring the Car <span class="accent">to You</span>',
        "Echelon Exotics is based in Massachusetts and delivers across the state and into Rhode Island, to homes, hotels, venues, and airports.",
    ) + f"""
  <!-- ───────────── HOW DELIVERY WORKS ───────────── -->
  <section class="dark-section">
    <div class="section-inner tight">
      <div class="card-grid">
{card("Complimentary Delivery", "The first 10 miles of delivery and pickup are on us. Beyond that, delivery is quoted at booking, with no surprises.", "tag")}
{card("Self-Pickup", "Prefer to come to us? Self-pickup is available at our location. The address is shared with your confirmation.", "home")}
{card("Anywhere in New England", "Need the car somewhere we haven't listed? Delivery elsewhere in New England is available on request.", "pin")}
      </div>
    </div>
  </section>

  <!-- ───────────── REGIONS ───────────── -->
  <section class="dark-section">
    <div class="section-inner tight">
      <div class="section-header">
        <div class="section-tag">Where We Deliver</div>
        <h2>Areas We Serve</h2>
        <p>A sample of the towns we deliver to most often. Don't see yours? Just ask.</p>
      </div>
      <div class="card-grid">
{regions}
      </div>
    </div>
  </section>

  <!-- ───────────── AIRPORTS ───────────── -->
  <section class="dark-section" id="airports">
    <div class="section-inner tight">
      <div class="section-header">
        <div class="section-tag">Airport Delivery</div>
        <h2>Land and Drive</h2>
        <p>Send us your flight details and we'll time the delivery to your arrival.</p>
      </div>
      <div class="card-grid">
{airports}
      </div>
    </div>
  </section>

""" + cta_band("Tell Us Where to Meet You", "Add your delivery address, hotel, or venue to your reservation request and we'll confirm the details.")
    return shell("service-areas.html", "Service Areas",
                 "Echelon Exotics delivers luxury and exotic rental cars across Massachusetts and Rhode Island, including Boston, Worcester, Cape Cod, Providence, and major airports.", body)


# ════════════════════════════════════════════
#   RENTAL POLICIES
# ════════════════════════════════════════════

def build_rental_policies():
    sections = [
        ("eligibility", "Driver Eligibility", """
          <ul>
            <li>All drivers must be <strong>25 years of age or older</strong>.</li>
            <li>A valid, unexpired driver's license in good standing is required. International renters must also present a valid passport and, where applicable, an International Driving Permit.</li>
            <li>Only drivers listed on the rental agreement and verified by Echelon may operate the vehicle.</li>
            <li>Some vehicles may carry additional requirements, such as driving history or experience. We'll confirm these at booking.</li>
            <li>Echelon may decline any rental at its discretion, including when verification can't be completed.</li>
          </ul>"""),
        ("insurance", "Insurance Requirements", """
          <p>Every renter must carry a valid personal auto insurance policy with <strong>liability, comprehensive, and collision coverage that extends to rental vehicles</strong>. Coverage limits must meet the minimums we confirm at booking for the vehicle you choose.</p>
          <p>We verify your coverage before delivery. Your insurance is primary for the duration of the rental. Credit card rental coverage alone is generally not sufficient for exotic and luxury vehicles.</p>"""),
        ("deposit", "Security Deposit &amp; Payment", """
          <ul>
            <li>A <strong>refundable security deposit</strong> is required on every reservation. The amount varies by vehicle and is listed on each vehicle's page in our <a href="fleet.html">fleet</a>.</li>
            <li>The deposit is held on a major credit card in the primary renter's name. Debit cards and prepaid cards are not accepted for deposits.</li>
            <li>The deposit is released after the vehicle is returned and inspected. See <a href="cancellation-policy.html#deposits">Cancellation &amp; Refunds</a> for timing.</li>
            <li>Any charges incurred during the rental, such as extra mileage, fuel, tolls, violations, cleaning, or damage, may be deducted from the deposit or charged to the card on file.</li>
          </ul>"""),
        ("mileage", "Mileage", """
          <p>Every rental includes <strong>125 miles per day</strong>. Additional miles are billed at the per-mile rate listed on your rental agreement. If you're planning a longer trip, let us know when you book and we'll set up a mileage plan that fits.</p>"""),
        ("delivery", "Delivery &amp; Pickup", """
          <ul>
            <li>The first <strong>10 miles</strong> of delivery and pickup are complimentary. Delivery beyond that is quoted at booking. See <a href="service-areas.html">Service Areas</a>.</li>
            <li>Self-pickup is available at our location. The address is provided with your confirmation.</li>
            <li>At handoff, we inspect the vehicle with you and photograph its condition. Both parties sign off before the rental begins.</li>
            <li>Chauffeur service is available as an add-on for select vehicles and must be arranged at booking.</li>
          </ul>"""),
        ("fuel", "Fuel", """
          <p>Vehicles are delivered with a full tank and must be returned at the same fuel level using the manufacturer's recommended grade (premium unless otherwise noted). If the vehicle comes back with less fuel, a refueling charge applies.</p>"""),
        ("vehicle-care", "Vehicle Care", """
          <ul>
            <li><strong>No smoking or vaping</strong> of any kind in any vehicle.</li>
            <li>Pets are not permitted without prior approval.</li>
            <li>Vehicles should be returned in the condition they were received, allowing for normal use. Excessive dirt, stains, sand, or odors will incur a cleaning fee.</li>
            <li>Do not alter, remove, or add anything to the vehicle, including wraps, decals, or accessories.</li>
          </ul>"""),
        ("prohibited", "Prohibited Uses", """
          <p>The following are strictly prohibited and void any coverage or protection provided by Echelon:</p>
          <ul>
            <li>Racing, track days, speed tests, drifting, or any competitive driving</li>
            <li>Off-road driving or towing of any kind</li>
            <li>Driving under the influence of alcohol, drugs, or any impairing substance</li>
            <li>Rideshare, delivery, or any commercial use for hire</li>
            <li>Use by any driver not listed on the rental agreement</li>
            <li>Travel outside New England without prior written approval</li>
            <li>Any illegal purpose</li>
          </ul>
          <p>Vehicles may be equipped with GPS and telematics systems to protect the vehicle and support recovery.</p>"""),
        ("tolls", "Tolls, Tickets &amp; Violations", """
          <p>The renter is responsible for all tolls, parking tickets, speeding and red-light camera violations, and towing or impound fees incurred during the rental. These will be charged to the card on file along with a reasonable administrative fee.</p>"""),
        ("returns", "Returns &amp; Late Returns", """
          <ul>
            <li>Vehicles must be returned at the date, time, and location on your rental agreement.</li>
            <li>A <strong>30-minute grace period</strong> applies. After that, late returns are billed hourly, and returns more than <strong>3 hours late</strong> are billed as an additional rental day.</li>
            <li>Need more time? Contact us before your return time. Extensions are subject to availability.</li>
            <li>Early returns are not refunded for unused time.</li>
          </ul>"""),
        ("damage", "Accidents, Damage &amp; Breakdowns", """
          <ul>
            <li>Report any accident, damage, warning light, or mechanical issue to Echelon <strong>immediately</strong> at 508-444-2276, any time.</li>
            <li>In an accident, make sure everyone is safe, contact the police when required, and obtain a police report. Do not arrange towing or repairs without our approval.</li>
            <li>The renter is responsible for damage to the vehicle during the rental period, including repair costs, diminished value, and loss of use while the vehicle is out of service, to the extent permitted by law.</li>
          </ul>"""),
        ("contact", "Questions", CONTACT_BLOCK),
    ]
    body = policy_page(
        "rental-policies.html", "Rental Policies", "Resources",
        "The standards every Echelon Exotics rental follows, covering eligibility, insurance, deposits, mileage, and vehicle care. Your signed rental agreement governs each rental.",
        sections,
    )
    return shell("rental-policies.html", "Rental Policies",
                 "Echelon Exotics rental policies: driver eligibility, insurance, security deposits, mileage, fuel, prohibited uses, and returns.", body)


# ════════════════════════════════════════════
#   CANCELLATION & REFUNDS
# ════════════════════════════════════════════

def build_cancellation():
    sections = [
        ("summary", "At a Glance", """
          <div class="fact-sheet">
            <div class="fact-row"><span>72+ hours before pickup</span><span>Full refund</span></div>
            <div class="fact-row"><span>24&ndash;72 hours before pickup</span><span>50% refund or 100% credit</span></div>
            <div class="fact-row"><span>Under 24 hours / no-show</span><span>Non-refundable</span></div>
            <div class="fact-row"><span>Security deposit</span><span>Released after inspection</span></div>
          </div>"""),
        ("cancelling", "Cancelling a Reservation", """
          <p>To cancel, call, text, or email us. Your cancellation is effective at the time we receive it, and we'll confirm it in writing.</p>
          <ul>
            <li><strong>72 hours or more</strong> before your scheduled pickup or delivery time: full refund of all rental charges paid.</li>
            <li><strong>Between 24 and 72 hours</strong> before: your choice of a 50% refund of rental charges, or a 100% credit toward a future rental taken within 12 months.</li>
            <li><strong>Less than 24 hours</strong> before, or a no-show: rental charges are non-refundable.</li>
          </ul>"""),
        ("changes", "Changing a Reservation", """
          <p>Date, time, and vehicle changes are free when requested at least 24 hours before your rental begins, subject to availability. If you switch to a vehicle with a different rate, the price difference applies. Changes requested within 24 hours are handled case by case.</p>"""),
        ("our-cancellations", "If We Need to Cancel", """
          <p>If Echelon cancels your reservation, or your reserved vehicle becomes unavailable for reasons within our control, we'll offer a comparable vehicle. If none suits you, you'll receive a full refund.</p>
          <p>If severe weather or road conditions make a rental unsafe, we'll work with you to reschedule at no charge.</p>"""),
        ("early-returns", "Early Returns", """
          <p>Rental time that goes unused because a vehicle is returned early is not refunded.</p>"""),
        ("deposits", "Security Deposit Refunds", """
          <ul>
            <li>Your security deposit is released once the vehicle is returned and inspected, typically within <strong>7 business days</strong>.</li>
            <li>Any charges from the rental, such as extra mileage, fuel, tolls, violations, cleaning, or damage, are deducted first, with an itemized summary sent to you.</li>
            <li>Depending on your card issuer, a released deposit or refund may take an additional 5&ndash;10 business days to appear on your statement.</li>
          </ul>"""),
        ("how-refunds", "How Refunds Are Issued", """
          <p>Refunds are returned to the original form of payment. Credits are tied to the primary renter's name and are non-transferable.</p>"""),
        ("contact", "Questions", CONTACT_BLOCK),
    ]
    body = policy_page(
        "cancellation-policy.html", "Cancellation &amp; Refund Policy", "Resources",
        "Plans change, and we get it. Here's how cancellations, changes, and refunds work for Echelon Exotics reservations.",
        sections,
    )
    return shell("cancellation-policy.html", "Cancellation &amp; Refund Policy",
                 "How cancellations, reservation changes, security deposits, and refunds work at Echelon Exotics.", body)


# ════════════════════════════════════════════
#   TERMS OF SERVICE
# ════════════════════════════════════════════

def build_terms():
    sections = [
        ("acceptance", "Acceptance of These Terms", """
          <p>These Terms of Service govern your use of the Echelon Exotics website and the services offered through it by Echelon Rental Group ("Echelon," "we," "us"). By using this website or submitting a reservation request, you agree to these terms. If you don't agree, please don't use the website.</p>"""),
        ("reservations", "Reservations", """
          <ul>
            <li>Submitting a reservation request does not guarantee a vehicle. A reservation is confirmed only when Echelon confirms it with you directly.</li>
            <li>Every rental is governed by a separate rental agreement signed before the rental begins, along with our <a href="rental-policies.html">Rental Policies</a> and <a href="cancellation-policy.html">Cancellation &amp; Refund Policy</a>. If those documents conflict with these terms, the rental agreement controls.</li>
            <li>You agree that the information you provide is accurate and complete.</li>
          </ul>"""),
        ("pricing", "Pricing &amp; Availability", """
          <p>Rates, vehicles, and availability shown on the website may change without notice. We make every effort to keep information accurate, but errors can occur. If a posted price is wrong, we'll contact you before confirming your reservation. Vehicle photos are representative of the vehicle you'll receive.</p>"""),
        ("communications", "Communications", """
          <p>By submitting a request, you agree that Echelon may contact you by phone, text message, or email about your reservation. Message and data rates may apply. You can ask us to stop non-essential messages at any time.</p>"""),
        ("website-use", "Use of the Website", """
          <p>You agree not to misuse the website, including by attempting to gain unauthorized access, interfering with its operation, submitting false or fraudulent requests, or using automated tools to collect its content.</p>"""),
        ("ip", "Intellectual Property", """
          <p>All content on this website, including text, photographs, videos, logos, and design, is owned by or licensed to Echelon Rental Group and may not be copied or reused without our written permission. Vehicle manufacturer names and logos belong to their respective owners and are used only to identify the vehicles we offer. Echelon is not affiliated with or endorsed by those manufacturers.</p>"""),
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
    body = policy_page(
        "terms-of-service.html", "Terms of Service", "Resources",
        "The terms that apply when you use the Echelon Exotics website and request a reservation.",
        sections,
    )
    return shell("terms-of-service.html", "Terms of Service",
                 "Terms of Service for the Echelon Exotics website and reservation requests.", body)


# ════════════════════════════════════════════
#   PRIVACY POLICY
# ════════════════════════════════════════════

def build_privacy():
    sections = [
        ("overview", "Overview", """
          <p>This Privacy Policy explains what personal information Echelon Rental Group ("Echelon," "we," "us") collects through the Echelon Exotics website and our rental services, how we use it, and the choices you have. <strong>We do not sell your personal information.</strong></p>"""),
        ("collect", "Information We Collect", """
          <h3>Information you give us</h3>
          <ul>
            <li><strong>Reservation requests:</strong> name, phone number, email address, rental dates, vehicle of interest, and delivery location.</li>
            <li><strong>Rental verification:</strong> driver's license details, proof of insurance, and payment card information needed to confirm a rental and hold a security deposit.</li>
            <li><strong>Communications:</strong> anything you share when you call, text, email, or message us on Instagram.</li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li><strong>Server logs:</strong> our hosting provider records standard technical data such as IP address, browser type, and pages requested, for security and reliability.</li>
            <li><strong>Language preference:</strong> if you choose a language, it's saved in your browser's local storage so the site remembers it. It isn't sent to us.</li>
            <li><strong>Vehicle data:</strong> our vehicles may be equipped with GPS and telematics systems that record location and driving data during a rental.</li>
          </ul>
          <p>We do not use advertising cookies or third-party tracking pixels on the Echelon Exotics website.</p>"""),
        ("use", "How We Use Your Information", """
          <ul>
            <li>To respond to your requests, confirm reservations, and arrange delivery and pickup</li>
            <li>To verify eligibility, insurance, and payment, and to process deposits, charges, and refunds</li>
            <li>To protect our vehicles, recover them if necessary, and resolve tolls, violations, or damage</li>
            <li>To contact you about your rental by phone, text, or email</li>
            <li>To improve our website and services, and to comply with legal obligations</li>
          </ul>"""),
        ("share", "How We Share Information", """
          <p>We share personal information only as needed to run our business:</p>
          <ul>
            <li><strong>Service providers</strong> that help us operate, such as website hosting, Google Workspace (where reservation requests are stored), and payment processors, which may use it only to provide services to us</li>
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
            <li>You can clear your language preference by clearing your browser's site data.</li>
          </ul>
          <p>To make a request, contact us using the details below. We may need to verify your identity before acting on it.</p>"""),
        ("children", "Children's Privacy", """
          <p>Our services are intended for adults. We do not knowingly collect personal information from children under 13 through this website.</p>"""),
        ("changes", "Changes to This Policy", """
          <p>We may update this policy from time to time. The "Last updated" date at the top of this page shows when it last changed.</p>"""),
        ("contact", "Contact", CONTACT_BLOCK),
    ]
    body = policy_page(
        "privacy-policy.html", "Privacy Policy", "Resources",
        "How Echelon collects, uses, and protects your personal information.",
        sections,
    )
    return shell("privacy-policy.html", "Privacy Policy",
                 "How Echelon Rental Group collects, uses, shares, and protects personal information through the Echelon Exotics website and rentals.", body)


# ════════════════════════════════════════════
#   ACCESSIBILITY
# ════════════════════════════════════════════

def build_accessibility():
    sections = [
        ("commitment", "Our Commitment", """
          <p>Echelon Rental Group wants everyone to be able to browse our fleet, request a reservation, and reach our team, regardless of ability or the technology they use. We're working to make the Echelon Exotics website conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong>.</p>"""),
        ("measures", "What We're Doing", """
          <ul>
            <li>Using semantic HTML, headings, and landmarks so screen readers can navigate each page</li>
            <li>Providing text alternatives for meaningful images and labels for form fields and buttons</li>
            <li>Supporting keyboard navigation for menus, FAQs, galleries, and forms</li>
            <li>Keeping text and interface colors at readable contrast against our dark theme</li>
            <li>Pausing the scrolling brand marquee when your device requests reduced motion</li>
            <li>Designing layouts that work on phones, tablets, and desktops, and with browser zoom</li>
          </ul>"""),
        ("limitations", "Known Limitations", """
          <p>We're still improving some areas of the site:</p>
          <ul>
            <li>Echelon Stories videos don't yet include captions or transcripts. They're short vehicle showcases, and we're working on adding captions.</li>
            <li>The custom cursor effect is decorative only, and it's disabled on touch devices.</li>
          </ul>
          <p>If any part of the site gets in your way, please tell us. We'll help you directly and use your feedback to fix it.</p>"""),
        ("assistance", "Need Help Booking?", f"""
          <p>You never need to use the website to rent with us. Our team can take your entire reservation by phone, text, or email, 24 hours a day, 7 days a week.</p>
          <p>If you have questions about getting in and out of a particular vehicle, or about accommodations such as chauffeur service, ask us before you book and we'll help you find the right fit.</p>"""),
        ("feedback", "Feedback &amp; Contact", CONTACT_BLOCK.replace(
            "Questions about anything on this page?",
            "To report an accessibility barrier or request information in another format, reach out. We aim to respond within 2 business days.",
        )),
    ]
    body = policy_page(
        "accessibility.html", "Accessibility Statement", "Resources",
        "Our commitment to making Echelon Exotics usable for everyone, and how to reach us if something isn't working for you.",
        sections,
    )
    return shell("accessibility.html", "Accessibility Statement",
                 "Echelon Exotics' commitment to web accessibility, the measures we take, known limitations, and how to get help.", body)


PAGES = {
    "about.html": build_about,
    "how-it-works.html": build_how_it_works,
    "faq.html": build_faq,
    "service-areas.html": build_service_areas,
    "rental-policies.html": build_rental_policies,
    "cancellation-policy.html": build_cancellation,
    "terms-of-service.html": build_terms,
    "privacy-policy.html": build_privacy,
    "accessibility.html": build_accessibility,
}


def main():
    for filename, build in PAGES.items():
        path = os.path.join(ROOT, filename)
        with open(path, "w") as f:
            f.write(build())
        print("wrote", path)


if __name__ == "__main__":
    main()
