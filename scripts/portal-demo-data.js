// Sample spreadsheets for the local Echelon Portal demo (PORTAL_DEMO=1 npm run preview).
// Everything here is made up and only lives in memory while the preview runs.
//
// Demo logins (password for all three: demo-password):
//   owner@demo.test       owner      → full CRM
//   staff@demo.test       employee   → Reservations + Referrals
//   marcus@demo.test      ambassador → dashboard for code MARCUS (try /r/marcus)

import { scryptSync } from "node:crypto";

const hash = (pw) => {
  const salt = Buffer.from("demo-salt-000000");
  return `scrypt$${salt.toString("base64")}$${scryptSync(pw, salt, 32).toString("base64")}`;
};

const daysAgo = (n, h = 14) => {
  const d = new Date(Date.now() - n * 864e5);
  d.setHours(h, 5, 0, 0);
  return d.toLocaleString("en-US").replace(",", "");
};
const dateIn = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);

export function demoSheets() {
  const pw = hash("demo-password");
  return {
    // Stand-in for "Echelon Exotic Rental Reservations" (same id the portal reads).
    "1S-r52l5vyU1qSWeHTf0ADD8sJ-kIF1S8v3uUejctug8": {
      tabs: [
        {
          title: "Sheet1",
          statusOptions: ["New", "Contacted", "Booked", "Completed", "Not a Fit"],
          rows: [
            ["Timestamp", "First Name", "Last Name", "Phone", "Email", "Pickup Date", "Return Date", "Vehicle Interest", "Delivery Location", "Status", "Follow-up", "Notes"],
            [daysAgo(9), "Avery", "Stone", "(555) 010-2231", "avery.stone@example.com", dateIn(-4), dateIn(-2), "Lamborghini Urus", "Seaport Hotel, Boston", "Completed", "", "Returned clean"],
            [daysAgo(6), "Jordan", "Blake", "(555) 010-8812", "jordan.blake@example.com", dateIn(5), dateIn(7), "Rolls-Royce Cullinan", "Wedding at The Newbury", "Booked", dateIn(3), "Deposit received"],
            [daysAgo(3), "Riley", "Chen", "(555) 010-4410", "riley.chen@example.com", dateIn(12), dateIn(13), "Mercedes G63", "Logan Airport", "Contacted", dateIn(1), "Waiting on insurance card"],
            [daysAgo(1), "Sam", "Ortiz", "(555) 010-7765", "sam.ortiz@example.com", dateIn(20), dateIn(22), "Porsche GT3", "Cambridge", "New", "", ""],
            [daysAgo(0, 9), "Taylor", "Reed", "(555) 010-3309", "taylor.reed@example.com", dateIn(9), dateIn(10), "Lamborghini Huracán", "Newport, RI", "", "", ""],
          ],
        },
        { title: "Summary", rows: [["Summary"]] },
      ],
    },
    // Stand-in for "Echelon Economy Rental Reservations".
    "1yLtkutu_BCfYvo9a32T6U7CilrZ6cFkTgoQvq8XAUaA": {
      tabs: [
        {
          title: "Sheet1",
          statusOptions: ["New", "Contacted", "Booked", "Completed", "Not a Fit"],
          rows: [
            ["Timestamp", "First Name", "Last Name", "Phone", "Email", "Pick-Up Date", "Return Date", "Use Case", "Car", "Status", "Follow-up Date", "Notes"],
            [daysAgo(4), "Chris", "Nolan", "5085550144", "chris.nolan@example.com", dateIn(2), dateIn(9), "DoorDash", "Honda Civic", "Contacted", dateIn(0), "Sent rental agreement"],
            [daysAgo(0, 8), "Dana", "Ruiz", "7745550190", "dana.ruiz@example.com", dateIn(5), dateIn(6), "Personal Use", "Toyota Camry", "", "", ""],
          ],
        },
        { title: "Summary", rows: [["Summary"]] },
      ],
    },
    // Stand-in for "Echelon Chauffeur Reservations".
    "1zDNYG4I4GnKNGQWWE4l5xobWg5_ZxsqpV01pmL-EMyc": {
      tabs: [
        {
          title: "Reservations",
          statusOptions: ["New", "Contacted", "Booked", "Completed", "Not a Fit"],
          rows: [
            ["Submitted", "First Name", "Last Name", "Phone", "Email", "Ride Date", "Pickup Time", "Service Type", "Passengers", "Vehicle", "Pickup Address", "Drop-off Address", "Status", "Follow-up Date", "Notes"],
            [daysAgo(1, 13), "Morgan", "Wells", "(555) 010-6620", "morgan.wells@example.com", dateIn(8), "18:30", "Wedding / Event", "4", "Rolls-Royce Cullinan", "The Langham, Boston", "Castle Hill, Ipswich", "New", "", ""],
          ],
        },
        { title: "Summary", rows: [["Summary"]] },
      ],
    },
    "demo-crm": {
      tabs: [
        {
          title: "Team",
          rows: [
            ["Email", "Name", "Role", "Code", "Status", "Commission %", "Customer Perk", "Phone", "Payout Method", "Added", "Password", "Failed Logins", "Locked Until"],
            ["owner@demo.test", "Demo Owner", "owner", "", "Active", "", "", "", "", dateIn(-30), pw, "", ""],
            ["staff@demo.test", "Demo Staff", "employee", "", "Active", "", "", "", "", dateIn(-20), pw, "", ""],
            ["marcus@demo.test", "Marcus Hale", "ambassador", "MARCUS", "Active", "10", "Complimentary delivery on your first rental", "(555) 010-1000", "Zelle (555) 010-1000", dateIn(-15), pw, "", ""],
            ["lena@demo.test", "Lena Park", "ambassador", "LENA", "Active", "8", "Free extra hour on your first rental", "", "PayPal lena@demo.test", dateIn(-5), "", "", ""],
          ],
        },
        {
          title: "Referrals",
          rows: [
            ["Submitted", "Code", "First Name", "Last Name", "Email", "Phone", "Vehicle", "Pickup", "Return", "Status", "Rental Total", "Commission", "Paid On", "Notes"],
            [daysAgo(9), "MARCUS", "Avery", "Stone", "avery.stone@example.com", "(555) 010-2231", "Lamborghini Urus", dateIn(-4), dateIn(-2), "Completed", "3000", "300", "", ""],
            [daysAgo(6), "MARCUS", "Jordan", "Blake", "jordan.blake@example.com", "(555) 010-8812", "Rolls-Royce Cullinan", dateIn(5), dateIn(7), "Booked", "", "", "", ""],
            [daysAgo(1), "LENA", "Sam", "Ortiz", "sam.ortiz@example.com", "(555) 010-7765", "Porsche GT3", dateIn(20), dateIn(22), "New", "", "", "", ""],
          ],
        },
        {
          title: "Clicks",
          rows: [
            ["Time", "Code", "Page", "Visitor"],
            ...Array.from({ length: 23 }, (_, i) => [daysAgo(i % 28, 10 + (i % 9)), i % 4 ? "MARCUS" : "LENA", "/", `v${i}`]),
          ],
        },
        {
          title: "Payouts",
          rows: [["Date", "Code", "Amount", "Method", "Note", "Recorded By"], [dateIn(-12), "MARCUS", "150", "Zelle", "August rentals", "owner@demo.test"]],
        },
        {
          title: "Applications",
          rows: [
            ["Submitted", "First Name", "Last Name", "Email", "Phone", "Instagram", "City", "Birthdate", "Followers", "How They'd Promote", "Status", "Reviewed", "Notes"],
            [daysAgo(2, 14), "Devon", "Price", "devon.price@example.com", "(555) 010-5521", "@devonprice", "Boston, MA", "1998-04-12", "10K–50K", "I shoot car content around Boston and host monthly meetups.", "New", "", ""],
          ],
        },
      ],
    },
    "demo-other": { tabs: [{ title: "Sheet1", rows: [] }] },
  };
}
