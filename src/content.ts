/** Everything the page says about the work, in one place. */

export interface Project {
  slug: string;
  name: string;
  /** What it is, in one line, written for someone who has never seen it. */
  pitch: string;
  /** The hard parts: what this project proves. */
  highlights: string[];
  stack: string[];
  image: string;
  alt: string;
  live?: string;
  code: string;
  year: string;
}

export const FEATURED: Project[] = [
  {
    slug: "skystore",
    name: "SkyStore",
    pitch: "A sportswear store that reads the real weather outside and picks your outfit for it.",
    highlights: [
      "Live weather from Open-Meteo, turned into outfit picks from the catalogue",
      "Shop filters kept in the URL, hover swaps, quick add by size and a bag drawer",
      "A static Next.js 16 export, with a build fix so links prefetch on GitHub Pages",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind"],
    image: "project-skystore",
    alt: "SkyStore home page: the headline Dressed for any sky over runners at dawn, noon and dusk",
    live: "https://iliasjf.github.io/SkyStore/",
    code: "https://github.com/IliasJf/SkyStore",
    year: "2026",
  },
  {
    slug: "mawid",
    name: "Mawid",
    pitch: "Online booking for barbershops: customers book on their phone, the owner runs the day from one sheet.",
    highlights: [
      "A booking engine that refuses double bookings, covered by 20 automated tests",
      "Live on a Cloudflare Worker with a database and a PIN-protected owner area",
      "English, French and Arabic, right to left, with one-tap WhatsApp reminders",
    ],
    stack: ["React", "TypeScript", "Cloudflare"],
    image: "project-mawid",
    alt: "Mawid booking confirmation: an appointment card stamped Booked, with its booking code",
    live: "https://iliasjf.github.io/mawid/",
    code: "https://github.com/IliasJf/mawid",
    year: "2026",
  },
  {
    slug: "clientdesk",
    name: "ClientDesk",
    pitch: "A workspace for freelancers where clients, projects and invoices always add up.",
    highlights: [
      "Invoices with tax, discounts and partial payments; overdue ones stand out",
      "PDF export, and amounts in US dollars, euros and dirhams",
      "Dark mode, and 12 automated tests on the money logic",
    ],
    stack: ["React", "TypeScript", "Cloudflare D1"],
    image: "project-clientdesk",
    alt: "ClientDesk overview: money outstanding and received, projects in progress and invoices to follow up",
    live: "https://iliasjf.github.io/clientdesk/",
    code: "https://github.com/IliasJf/clientdesk",
    year: "2026",
  },
];

export const MORE: Project[] = [
  {
    slug: "tabletap",
    name: "TableTap",
    pitch: "A café QR menu: guests order from the table on WhatsApp, owners edit the menu in three languages.",
    highlights: ["Email sign-in and spam limits", "29 automated tests"],
    stack: ["React", "TypeScript", "Cloudflare"],
    image: "project-tabletap",
    alt: "TableTap café home page with the headline Good food. Slow mornings.",
    live: "https://iliasjf.github.io/tabletap/",
    code: "https://github.com/IliasJf/tabletap",
    year: "2026",
  },
  {
    slug: "halden",
    name: "Halden Estates",
    pitch: "A property agency site: search homes on a map with price pins, save the ones you like and compare them side by side.",
    highlights: ["Map pins that group and follow the list", "Compare up to three saved homes"],
    stack: ["React", "TypeScript", "Leaflet"],
    image: "project-halden-estates",
    alt: "Halden Estates home page: a modern villa with a pool and a property search bar",
    live: "https://iliasjf.github.io/halden-estates/",
    code: "https://github.com/IliasJf/halden-estates",
    year: "2026",
  },
  {
    slug: "dashboard",
    name: "Shop Dashboard",
    pitch: "Daily sales, busy hours, best sellers and low-stock alerts for a neighbourhood shop.",
    highlights: ["Charts drawn without libraries", "Built from what I see at work in retail"],
    stack: ["JavaScript", "CSS"],
    image: "project-shop-dashboard",
    alt: "Shop dashboard: weekly sales, a daily sales chart and low-stock products",
    live: "https://iliasjf.github.io/shop-dashboard/",
    code: "https://github.com/IliasJf/shop-dashboard",
    year: "2026",
  },
];

export const ARCHIVE = [
  { name: "Dental Clinic Website", what: "Appointment form saved to MySQL", stack: "PHP · MySQL", year: "2022", code: "https://github.com/IliasJf/Dentist-WebSite" },
  { name: "NonProductStock", what: "Windows app for spare parts and stock levels", stack: "C# · SQL Server", year: "2022", code: "https://github.com/IliasJf/NonProductStock" },
];

export const EXPERIENCE = [
  { role: "Store Délégué", place: "BIM Maroc", when: "2026 – now", text: "Promoted from Store Associate after five months. I run daily operations, stock and the team with the store manager: every day I see what makes a customer buy or walk out." },
  { role: "Freelance web developer & digital ads", place: "Self-employed", when: "2022 – 2025", text: "Built and updated websites for individuals and small businesses, and ran the social media ad campaigns that sent people to them." },
  { role: "Web app developer intern", place: "Lear Corporation", when: "2022", text: "Built a web app for managing urban cleanliness and improved its database queries and API integrations." },
  { role: "IT technician", place: "Province de Benslimane", when: "2021", text: "Entered and integrated data, and solved day-to-day technical problems." },
];

export const STACK = ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS", "Node.js", "Cloudflare Workers & D1", "Git & GitHub", "Accessibility", "Automated testing", "PHP & MySQL"];

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/ilias-jafaoui",
  github: "https://github.com/IliasJf",
};
