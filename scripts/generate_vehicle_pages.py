#!/usr/bin/env python3
"""
Generates the individual vehicle detail pages (car-*.html) for the
Echelon Exotics fleet from the CARS data below. Re-run this script
after editing CARS to regenerate all pages consistently.
"""
import os
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CARS = [
    {
        "slug": "huracan",
        "file": "car-huracan.html",
        "name": "Lamborghini Huracán",
        "type_badge": "Supercar",
        "badge": "available",
        "price": "1,500",
        "image": "images/fleet/lamborghini-huracan.jpg",
        "image_pos": "38%",
        "deposit": "$5,000",
        "hp": "630 hp",
        "torque": "443 lb-ft",
        "zero_sixty": "2.9s",
        "top_speed": "202 mph",
        "drivetrain": "AWD",
        "transmission": "7-Speed Dual-Clutch",
        "seats": "2",
        "engine": "5.2L Naturally Aspirated V10",
        "blurb": "The Huracán is Lamborghini's benchmark supercar &mdash; a naturally aspirated V10 that screams to an 8,500 RPM redline, matched to a chassis built for both track days and turning heads downtown. Echelon Exotics delivers it detailed, inspected, and ready to drive exactly as pictured, with white-glove service from reservation to return.",
    },
    {
        "slug": "maybach-gls",
        "file": "car-maybach-gls.html",
        "name": "2026 Maybach GLS",
        "type_badge": "Ultra-Luxury SUV",
        "badge": "popular",
        "price": "1,000",
        "image": "images/fleet/maybach-gls.jpg",
        "image_pos": "55%",
        "deposit": "$3,000",
        "hp": "612 hp",
        "torque": "664 lb-ft",
        "zero_sixty": "4.9s",
        "top_speed": "130 mph",
        "drivetrain": "4MATIC AWD",
        "transmission": "9-Speed Automatic",
        "seats": "5",
        "engine": "4.0L Twin-Turbo V8 w/ EQ Boost",
        "blurb": "The Maybach GLS is chauffeur-driven luxury without compromise &mdash; a first-class cabin, a whisper-quiet ride, and enough presence to anchor any arrival. It's our most requested vehicle for a reason: equally at home picking up VIP guests from the airport or gliding through the city on a Friday night.",
    },
    {
        "slug": "cullinan",
        "file": "car-cullinan.html",
        "name": "Rolls-Royce Cullinan",
        "type_badge": "Ultra-Luxury SUV",
        "badge": "available",
        "price": "1,600",
        "image": "images/fleet/rolls-royce-cullinan.jpg",
        "image_pos": "32%",
        "deposit": "$5,000",
        "hp": "563 hp",
        "torque": "627 lb-ft",
        "zero_sixty": "4.9s",
        "top_speed": "155 mph",
        "drivetrain": "AWD",
        "transmission": "8-Speed Automatic",
        "seats": "5",
        "engine": "6.75L Twin-Turbo V12",
        "blurb": "The Cullinan is Rolls-Royce's answer to the modern SUV &mdash; effortless power, a cabin engineered for silence, and the Spirit of Ecstasy leading the way. Whether it's a wedding motorcade or a weekend getaway, the Cullinan turns the drive itself into the occasion.",
    },
    {
        "slug": "gt3",
        "file": "car-gt3.html",
        "name": "Porsche GT3",
        "type_badge": "Sports Car",
        "badge": "limited",
        "price": "1,500",
        "image": None,
        "image_pos": None,
        "deposit": "$5,000",
        "hp": "502 hp",
        "torque": "346 lb-ft",
        "zero_sixty": "3.2s",
        "top_speed": "197 mph",
        "drivetrain": "RWD",
        "transmission": "7-Speed PDK",
        "seats": "2",
        "engine": "4.0L Naturally Aspirated Flat-6",
        "blurb": "The GT3 is Porsche's purest expression of the 911 &mdash; naturally aspirated, rear-wheel drive, and tuned for the road as much as the track. It's the car for drivers who want to feel every input, not just arrive somewhere fast.",
    },
    {
        "slug": "g63",
        "file": "car-g63.html",
        "name": "Mercedes-AMG G63",
        "type_badge": "Luxury SUV",
        "badge": "available",
        "price": "850",
        "image": "images/fleet/g-wagon.jpg",
        "image_pos": "38%",
        "deposit": "$3,500",
        "hp": "577 hp",
        "torque": "627 lb-ft",
        "zero_sixty": "4.5s",
        "top_speed": "137 mph",
        "drivetrain": "4MATIC AWD",
        "transmission": "9-Speed Automatic",
        "seats": "5",
        "engine": "4.0L Twin-Turbo V8",
        "blurb": "The G63 pairs an iconic, boxy silhouette with genuinely absurd power &mdash; a twin-turbo V8 in a body built for anything from cobblestone streets to unpaved trails. It's the fleet's most photographed vehicle, and for good reason.",
    },
    {
        "slug": "urus",
        "file": "car-urus.html",
        "name": "Lamborghini Urus",
        "type_badge": "Super SUV",
        "badge": "available",
        "price": "1,500",
        "image": "images/fleet/lamborghini-urus.jpg",
        "image_pos": "45%",
        "deposit": "$3,500",
        "hp": "641 hp",
        "torque": "627 lb-ft",
        "zero_sixty": "3.1s",
        "top_speed": "190 mph",
        "drivetrain": "AWD",
        "transmission": "8-Speed Automatic",
        "seats": "5",
        "engine": "4.0L Twin-Turbo V8",
        "blurb": "The Urus proves an SUV can out-accelerate most supercars without sacrificing space for five. It's Lamborghini's answer to “what if we didn't compromise,” equally at home at a black-tie event or a weekend mountain drive.",
    },
    {
        "slug": "mclaren-570s-spider",
        "file": "car-mclaren-570s-spider.html",
        "name": "McLaren 570S Spider",
        "type_badge": "Supercar",
        "badge": "available",
        "price": "1,500",
        "image": None,
        "image_pos": None,
        "deposit": "$5,000",
        "hp": "562 hp",
        "torque": "443 lb-ft",
        "zero_sixty": "3.1s",
        "top_speed": "204 mph",
        "drivetrain": "RWD",
        "transmission": "7-Speed Dual-Clutch",
        "seats": "2",
        "engine": "3.8L Twin-Turbo V8",
        "blurb": "The 570S Spider brings McLaren's motorsport DNA to open-top driving &mdash; a twin-turbo V8 right behind your head and a retractable hardtop for when the weather cooperates. Built for drivers who want supercar theater without giving up everyday usability.",
    },
    {
        "slug": "corvette-c8",
        "file": "car-corvette-c8.html",
        "name": "Corvette C8",
        "type_badge": "Sports Car",
        "badge": "available",
        "price": "650",
        "image": None,
        "image_pos": None,
        "deposit": "$2,500",
        "hp": "495 hp",
        "torque": "470 lb-ft",
        "zero_sixty": "2.9s",
        "top_speed": "194 mph",
        "drivetrain": "RWD",
        "transmission": "8-Speed Dual-Clutch",
        "seats": "2",
        "engine": "6.2L Naturally Aspirated V8",
        "blurb": "The mid-engine C8 rewrote what an American sports car could be &mdash; supercar proportions, a naturally aspirated V8 howling right behind the seats, and a price point that makes it one of our most accessible thrill rides.",
    },
    {
        "slug": "bentayga",
        "file": "car-bentayga.html",
        "name": "Bentley Bentayga",
        "type_badge": "Ultra-Luxury SUV",
        "badge": "available",
        "price": "1,000",
        "image": None,
        "image_pos": None,
        "deposit": "$3,000",
        "hp": "542 hp",
        "torque": "568 lb-ft",
        "zero_sixty": "4.4s",
        "top_speed": "180 mph",
        "drivetrain": "AWD",
        "transmission": "8-Speed Automatic",
        "seats": "5",
        "engine": "4.0L Twin-Turbo V8",
        "blurb": "The Bentayga proves an SUV can be handcrafted &mdash; a twin-turbo V8, a cabin trimmed in leather and wood veneer, and enough composure to make rough roads feel like red carpet. Ideal for clients who want luxury and capability in equal measure.",
    },
    {
        "slug": "escalade-esv",
        "file": "car-escalade-esv.html",
        "name": "Cadillac Escalade ESV Sport Platinum",
        "type_badge": "Luxury SUV",
        "badge": "available",
        "price": "600",
        "image": None,
        "image_pos": None,
        "deposit": "$2,500",
        "hp": "420 hp",
        "torque": "460 lb-ft",
        "zero_sixty": "6.0s",
        "top_speed": "130 mph",
        "drivetrain": "AWD",
        "transmission": "10-Speed Automatic",
        "seats": "7",
        "engine": "6.2L Naturally Aspirated V8",
        "blurb": "The Escalade ESV is American full-size luxury at its biggest and boldest &mdash; three rows of first-class seating, a commanding presence, and the extended wheelbase for maximum cargo and legroom. A favorite for group travel and airport runs alike.",
    },
    {
        "slug": "range-rover-p530-se",
        "file": "car-range-rover-p530-se.html",
        "name": "Range Rover P530 SE",
        "type_badge": "Luxury SUV",
        "badge": "available",
        "price": "750",
        "image": None,
        "image_pos": None,
        "deposit": "$3,000",
        "hp": "523 hp",
        "torque": "553 lb-ft",
        "zero_sixty": "4.4s",
        "top_speed": "155 mph",
        "drivetrain": "AWD",
        "transmission": "8-Speed Automatic",
        "seats": "5",
        "engine": "4.4L Twin-Turbo V8",
        "blurb": "The Range Rover pairs go-anywhere capability with a cabin that rivals any luxury sedan &mdash; the P530's twin-turbo V8 gives it real muscle, while the SE trim keeps things refined inside and out. Equally at home on a dirt road or in a hotel valet line.",
    },
]

BY_SLUG = {c["slug"]: c for c in CARS}

USE_CASES = [
    ("🗺️", "New England Getaways"),
    ("🌄", "Scenic Coastal Drives"),
    ("📸", "Photo &amp; Video Shoots"),
    ("💕", "Date Nights"),
    ("🎉", "Weddings &amp; Events"),
    ("🎂", "Birthdays &amp; Celebrations"),
]

NAV_TEMPLATE = """  <!-- CUSTOM CURSOR RING -->
  <div aria-hidden="true" class="cursor-ring"></div>
  <div aria-hidden="true" class="cursor-dot"></div>

  <!-- ───────────── NAVIGATION ───────────── -->
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a href="exotics.html" class="logo">
        <span class="logo-main">ECHELON</span>
        <span class="logo-sub">EXOTIC RENTALS</span>
      </a>
      <ul class="nav-links">
        <li><a href="fleet.html">Fleet</a></li>
        <li><a href="exotics.html#schedule">Reserve</a></li>
        <li><a href="exotics.html#faq">FAQ</a></li>
        <li><a href="exotics.html#reviews">Reviews</a></li>
      </ul>
      <div class="nav-actions">
        <a href="tel:+15084442276" class="nav-phone">📞 508-444-2276</a>
        <a href="https://www.instagram.com/echelonrentalgroup/" class="nav-social" target="_blank" rel="noopener noreferrer" aria-label="Follow Echelon on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.4.6.2 1 .5 1.4 1 .4.4.7.8 1 1.4.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4 1-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.3-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-1 .4-.2 1.1-.4 2.3-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7 .1c-1.3.1-2.2.3-3 .6-.8.3-1.5.7-2.2 1.4C1.1 2.8.7 3.5.4 4.3c-.3.8-.5 1.7-.6 3C-.1 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6C8.3 24 8.7 24 12 24s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2C21.2 1.1 20.5.7 19.7.4c-.8-.3-1.7-.5-3-.6C15.7 0 15.3 0 12 0z"/><path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4z"/><circle cx="18.4" cy="5.6" r="1.4"/></svg></a>
        <div class="brand-switcher" id="brandSwitcher">
          <button class="brand-btn" id="brandBtn" aria-label="Switch Echelon brand">
            <span class="brand-current" id="brandLabel">Exotics</span>
            <span class="brand-caret">▾</span>
          </button>
          <div class="brand-dropdown" id="brandDropdown">
            <a class="brand-option" href="index.html">
              <span class="brand-option-name">Economic Rentals</span>
              <span class="brand-option-desc">Affordable car rentals</span>
            </a>
            <a class="brand-option active" href="exotics.html">
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
        <a href="{reserve_href}" class="btn btn-primary">Reserve Now</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <a href="fleet.html">Fleet</a>
      <a href="exotics.html#schedule">Reserve</a>
      <a href="exotics.html#faq">FAQ</a>
      <a href="exotics.html#reviews">Reviews</a>
      <a href="{reserve_href}" class="btn btn-primary">Reserve Now</a>
      <div class="mobile-brand">
        <span class="mobile-brand-label">Echelon Brands</span>
        <a class="mobile-brand-option" href="index.html">Economic Rentals</a>
        <a class="mobile-brand-option active" href="exotics.html">Exotics</a>
        <a class="mobile-brand-option" href="boats.html">Boat Charters</a>
        <a class="mobile-brand-option" href="jets.html">Jet Charters</a>
        <a class="mobile-brand-option" href="experiences.html">Experiences</a>
      </div>
      <a href="https://www.instagram.com/echelonrentalgroup/" class="mobile-social" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.4.6.2 1 .5 1.4 1 .4.4.7.8 1 1.4.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4 1-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.3-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-1 .4-.2 1.1-.4 2.3-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7 .1c-1.3.1-2.2.3-3 .6-.8.3-1.5.7-2.2 1.4C1.1 2.8.7 3.5.4 4.3c-.3.8-.5 1.7-.6 3C-.1 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6C8.3 24 8.7 24 12 24s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2C21.2 1.1 20.5.7 19.7.4c-.8-.3-1.7-.5-3-.6C15.7 0 15.3 0 12 0z"/><path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4z"/><circle cx="18.4" cy="5.6" r="1.4"/></svg>Instagram</a>
    </div>
  </nav>
"""

FOOTER_TEMPLATE = """  <!-- ───────────── FOOTER ───────────── -->
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="exotics.html" class="logo footer-logo">
          <span class="logo-main">ECHELON</span>
          <span class="logo-sub">EXOTIC RENTALS</span>
        </a>
        <p>Luxury and exotic car rentals with white-glove delivery, part of the Echelon Rental Group family.</p>
        <div class="footer-socials">
          <a href="https://www.instagram.com/echelonrentalgroup" target="_blank" rel="noopener" class="social-link social-instagram">@EchelonRentalGroup</a>
        </div>
      </div>
      <div class="footer-links">
        <h4>Fleet</h4>
        <a href="fleet.html">View Full Fleet</a>
        <a href="fleet.html?type=Supercar">Supercars</a>
        <a href="fleet.html?type=Ultra-Luxury+SUV">Ultra-Luxury SUVs</a>
        <a href="exotics.html#faq">FAQ</a>
      </div>
      <div class="footer-links">
        <h4>Echelon Brands</h4>
        <a href="index.html">Economic Rentals</a>
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
    </div>
  </footer>
"""


def gallery_html(car):
    if car["image"]:
        style = f"background: url('{car['image']}') center {car['image_pos']} / cover no-repeat;"
        return f'<div class="vehicle-gallery-main" style="{style}"></div>'
    return (
        '<div class="vehicle-gallery-main" style="background: linear-gradient(135deg, #101010 0%, #1c1c1c 50%, #0a0a0a 100%);">'
        '<span class="inv-icon">🚗</span>'
        '<span class="vehicle-gallery-caption">Photos coming soon</span>'
        "</div>"
    )


def price_numeric(car):
    return car["price"].replace(",", "")


def hp_numeric(car):
    return car["hp"].split()[0]


def badge_html(car):
    if car["badge"] == "popular":
        return '<div class="car-popular-badge">Most Requested</div>'
    if car["badge"] == "limited":
        return '<div class="car-available limited">Limited</div>'
    return '<div class="car-available">Available</div>'


def mini_card_html(car):
    badge = badge_html(car)
    if car["image"]:
        style = f"background: url('{car['image']}') center {car['image_pos']} / cover no-repeat;"
        img_inner = f'<div class="car-card-img" style="{style}">{badge}</div>'
    else:
        style = "background: linear-gradient(135deg, #101010 0%, #1c1c1c 50%, #0a0a0a 100%); justify-content:center;"
        img_inner = f'<div class="car-card-img" style="{style}">{badge}<span class="inv-icon">🚗</span></div>'
    data_attrs = (
        f'data-type="{car["type_badge"]}" data-price="{price_numeric(car)}" '
        f'data-hp="{hp_numeric(car)}" data-name="{car["name"]}"'
    )
    return f"""        <a href="{car['file']}" class="car-card inventory-card" style="display:block;" {data_attrs}>
          {img_inner}
          <div class="car-card-body">
            <div class="car-top">
              <div>
                <span class="car-type-badge">{car['type_badge']}</span>
                <h3 class="car-name">{car['name']}</h3>
              </div>
              <div class="car-price-box">
                <span class="car-price">${car['price']}</span>
                <span class="car-price-unit">/day</span>
              </div>
            </div>
            <span class="btn btn-book" style="display:block;">View Details</span>
          </div>
        </a>
"""


def build_page(car):
    others = [c for c in CARS if c["slug"] != car["slug"]][:4]
    explore_cards = "\n".join(mini_card_html(c) for c in others)
    use_case_items = "\n".join(
        f'          <div class="use-case-item"><span class="use-case-icon">{icon}</span><span>{label}</span></div>'
        for icon, label in USE_CASES
    )
    vehicle_q = quote(car["name"])

    nav = NAV_TEMPLATE.format(reserve_href=f"exotics.html?vehicle={vehicle_q}#schedule")
    footer = FOOTER_TEMPLATE

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{car['name']} | Echelon Exotics</title>
  <link rel="stylesheet" href="styles.css" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="1024x1024" href="/app-icon-1024.png" />
  <link rel="icon" type="image/png" sizes="180x180" href="/apple-touch-icon.png" />

  <meta property="og:type"        content="website" />
  <meta property="og:site_name"   content="Echelon Rental Group" />
  <meta property="og:title"       content="{car['name']} | Echelon Exotics" />
  <meta property="og:description" content="Reserve the {car['name']} from Echelon Exotics — ${car['price']}/day, white-glove delivery available." />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
</head>
<body class="theme-exotics">

{nav}
  <!-- ───────────── VEHICLE HERO ───────────── -->
  <section class="vehicle-hero dark-section" style="padding-top: calc(var(--nav-h) + 40px);">
    <div class="section-inner">
      <a href="fleet.html" class="vehicle-back-link">← Back to Fleet</a>
      <div class="vehicle-hero-grid">
        <div class="vehicle-gallery">
          {gallery_html(car)}
        </div>
        <div class="vehicle-hero-info">
          <span class="car-type-badge">{car['type_badge']}</span>
          <h1 class="vehicle-name">{car['name']}</h1>
          <div class="vehicle-price-row">
            <span class="vehicle-price">${car['price']}</span>
            <span class="vehicle-price-unit">/day</span>
          </div>
          <div class="quick-facts-grid">
            <div class="quick-fact"><span class="qf-label">Age Requirement</span><span class="qf-value">25+ with valid license</span></div>
            <div class="quick-fact"><span class="qf-label">Security Deposit</span><span class="qf-value">{car['deposit']} (refundable)</span></div>
            <div class="quick-fact"><span class="qf-label">Mileage Allowance</span><span class="qf-value">125 mi/day included</span></div>
            <div class="quick-fact"><span class="qf-label">Self-Pickup</span><span class="qf-value">Available at our location</span></div>
            <div class="quick-fact" style="grid-column: 1 / -1;"><span class="qf-label">Delivery</span><span class="qf-value">Complimentary within 10 miles — additional mileage available on request</span></div>
          </div>
          <div class="vehicle-cta-row">
            <a href="exotics.html?vehicle={vehicle_q}#schedule" class="btn btn-primary btn-lg">Book Now</a>
            <a href="tel:+15084442276" class="btn btn-outline-light btn-lg">Call Us</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ───────────── SPECS ───────────── -->
  <section class="dark-section" id="specs">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-tag">Specifications</div>
        <h2>Under the Hood</h2>
      </div>
      <div class="specs-grid">
        <div class="spec-item"><span class="spec-value">{car['hp']}</span><span class="spec-label">Horsepower</span></div>
        <div class="spec-item"><span class="spec-value">{car['torque']}</span><span class="spec-label">Torque</span></div>
        <div class="spec-item"><span class="spec-value">{car['zero_sixty']}</span><span class="spec-label">0–60 mph</span></div>
        <div class="spec-item"><span class="spec-value">{car['top_speed']}</span><span class="spec-label">Top Speed</span></div>
        <div class="spec-item"><span class="spec-value">{car['drivetrain']}</span><span class="spec-label">Drivetrain</span></div>
        <div class="spec-item"><span class="spec-value">{car['seats']}</span><span class="spec-label">Seats</span></div>
      </div>
    </div>
  </section>

  <!-- ───────────── ABOUT ───────────── -->
  <section class="dark-section">
    <div class="section-inner">
      <div class="vehicle-about-content">
        <div class="section-tag">About This Car</div>
        <p>{car['blurb']}</p>
      </div>
    </div>
  </section>

  <!-- ───────────── USE CASES ───────────── -->
  <section class="dark-section">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-tag">Make It Yours</div>
        <h2>Ways to Experience the {car['name'].split()[-1]}</h2>
      </div>
      <div class="use-case-grid">
{use_case_items}
      </div>
    </div>
  </section>

  <!-- ───────────── FACT SHEET ───────────── -->
  <section class="dark-section">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-tag">Fact Sheet</div>
        <h2>{car['name']}, In Detail</h2>
      </div>
      <div class="fact-sheet">
        <div class="fact-row"><span>Engine</span><span>{car['engine']}</span></div>
        <div class="fact-row"><span>Horsepower</span><span>{car['hp']}</span></div>
        <div class="fact-row"><span>Torque</span><span>{car['torque']}</span></div>
        <div class="fact-row"><span>0–60 mph</span><span>{car['zero_sixty']}</span></div>
        <div class="fact-row"><span>Top Speed</span><span>{car['top_speed']}</span></div>
        <div class="fact-row"><span>Drivetrain</span><span>{car['drivetrain']}</span></div>
        <div class="fact-row"><span>Transmission</span><span>{car['transmission']}</span></div>
        <div class="fact-row"><span>Seats</span><span>{car['seats']}</span></div>
      </div>
    </div>
  </section>

  <!-- ───────────── EXPLORE MORE ───────────── -->
  <section class="dark-section">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-tag">Explore More</div>
        <h2>More From the Fleet</h2>
      </div>
      <div class="explore-grid">
{explore_cards}      </div>
      <div class="explore-cta"><a href="fleet.html" class="btn btn-outline-light">View Full Fleet</a></div>
    </div>
  </section>

{footer}
  <script src="brand-pages.js"></script>
  <script src="cursor-ring.js"></script>
</body>
</html>
"""


def build_fleet_page():
    seen = []
    for c in CARS:
        if c["type_badge"] not in seen:
            seen.append(c["type_badge"])

    filter_btns = '\n        <button class="filter-btn active" data-filter="all">All Vehicles</button>'
    for t in seen:
        filter_btns += f'\n        <button class="filter-btn" data-filter="{t}">{t}</button>'

    cards = "\n".join(mini_card_html(c) for c in CARS)

    nav = NAV_TEMPLATE.format(reserve_href="exotics.html#schedule")
    footer = FOOTER_TEMPLATE

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Full Fleet | Echelon Exotics</title>
  <link rel="stylesheet" href="styles.css" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="1024x1024" href="/app-icon-1024.png" />
  <link rel="icon" type="image/png" sizes="180x180" href="/apple-touch-icon.png" />

  <meta property="og:type"        content="website" />
  <meta property="og:site_name"   content="Echelon Rental Group" />
  <meta property="og:title"       content="The Full Fleet | Echelon Exotics" />
  <meta property="og:description" content="Browse, filter, and sort the complete Echelon Exotics fleet — supercars, ultra-luxury SUVs, and more." />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
</head>
<body class="theme-exotics">

{nav}
  <!-- ───────────── FLEET PAGE HEADER + FILTER / SORT / GRID ─────────────
       One section (not two) so .section-inner's padding doesn't stack —
       that was the cause of the huge black gap around the header. ── -->
  <section class="dark-section" style="padding-top: calc(var(--nav-h) + 40px);">
    <div class="section-inner" style="padding-top: 0; padding-bottom: 60px;">
      <div class="section-header" style="margin-bottom: 32px;">
        <div class="section-tag">Full Inventory</div>
        <h2>The Complete Echelon Exotics Fleet</h2>
        <p>Browse, filter, and sort every vehicle available to reserve today.</p>
      </div>
      <div class="fleet-toolbar">
        <div class="fleet-filters" id="fleetFilters">{filter_btns}
        </div>
        <div class="sort-control">
          <label class="sort-label" for="fleetSort">Sort by</label>
          <select id="fleetSort" class="sort-select">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A&ndash;Z</option>
            <option value="hp-desc">Horsepower: High to Low</option>
          </select>
        </div>
      </div>
      <div class="fleet-page-grid" id="fleetGrid">
{cards}      </div>
    </div>
  </section>

{footer}
  <script src="brand-pages.js"></script>
  <script src="fleet-page.js"></script>
  <script src="cursor-ring.js"></script>
</body>
</html>
"""


def main():
    for car in CARS:
        html = build_page(car)
        path = os.path.join(ROOT, car["file"])
        with open(path, "w") as f:
            f.write(html)
        print("wrote", path)

    fleet_html = build_fleet_page()
    fleet_path = os.path.join(ROOT, "fleet.html")
    with open(fleet_path, "w") as f:
        f.write(fleet_html)
    print("wrote", fleet_path)


if __name__ == "__main__":
    main()
