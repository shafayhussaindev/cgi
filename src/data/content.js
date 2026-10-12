// This file holds ALL the text and links used on the website.
// To change any wording, edit it here. You do not need to touch the page files.

// ---------- Global settings ----------
export const site = {
  name: "Consumer Goods Intelligence",
  tagline:
    "Digital transformation for fashion, footwear, electronics, textiles and consumer goods supply chains.",
  linkedinUrl: "#", // TODO: paste your LinkedIn page link here
  websiteText: "connectedconsumergoods.ai",
  websiteUrl: "https://connectedconsumergoods.ai",
};

// ---------- Navigation links (used in the navbar and footer) ----------
export const navLinks = [
  { label: "Home", to: "/" },
  { label: "The Shift", to: "/the-shift" },
  { label: "What We Do", to: "/what-we-do" },
  { label: "Focus Areas", to: "/focus-areas" },
];

// ---------- Home page ----------
export const home = {
  hero: {
    eyebrow: "Consumer Goods Intelligence",
    title: "Making sense of digital transformation in consumer goods",
    text: "Plain-English insight on Digital Product Passports, ESG transparency, supply-chain visibility and the virtual factory, for the people building consumer goods.",
    linkedinButton: "LinkedIn",
    exploreButton: "Explore the shift",
    // Background image behind the heading (put the file in /public)
    image: "/hero-bg.webp",
  },
  shiftPreview: {
    eyebrow: "The Shift",
    title: "Four forces are reshaping our industry at the same time",
    linkText: "Read more",
  },
  whatWeDoPreview: {
    eyebrow: "What We Do",
    title: "One place to make sense of it all",
    buttonText: "What we do",
  },
  focusPreview: {
    eyebrow: "Focus Areas",
    title: "What we publish on",
    linkText: "See all focus areas",
  },
};

// ---------- The Shift page ----------
export const shift = {
  eyebrow: "The Shift",
  title: "Four forces are reshaping our industry at the same time",
  intro:
    "Most companies are facing all four at once, with fragmented systems that were never built to talk to each other.",
  forces: [
    {
      number: "01",
      title: "Digital Product Passports",
      text: "Regulation is arriving faster than most teams are ready for, and it reaches deep into product and supplier data.",
      // Icon in the card's circle (see components/Icon.jsx for the choices)
      icon: "qr-code",
      // Optional photo: put the file in /public and give its path here
      image: "/dpp.webp",
      imageAlt:
        "Folded textiles with a Digital Product Passport QR tag next to a phone showing the product's materials, origin and supply-chain journey",
    },
    {
      number: "02",
      title: "ESG transparency",
      text: "No longer optional. Buyers and consumers now expect credible, product-level sustainability information.",
      icon: "leaf",
      image: "/esg.webp",
      imageAlt:
        "Folded textiles with an ESG transparency QR tag beside a tablet showing environmental, social and governance metrics",
    },
    {
      number: "03",
      title: "Supply-chain visibility",
      text: "A competitive advantage rather than a back-office task, built on connected supplier and production data.",
      icon: "truck",
      image: "/supply-chain.webp",
      imageAlt:
        "Laptop showing a supply-chain visibility dashboard with orders, shipments and suppliers, in front of a container port",
    },
    {
      number: "04",
      title: "Digital sales and engagement",
      text: "Now depend directly on the quality and structure of the product data behind every channel.",
      icon: "trending-up",
      image: "/digital-sales.webp",
      imageAlt:
        "Laptop showing a digital sales and engagement dashboard beside a phone with a home textiles shop, next to folded fabrics",
    },
  ],
};

// ---------- What We Do page ----------
export const whatWeDo = {
  eyebrow: "What We Do",
  title: "One place to make sense of it all",
  paragraphs: [
    "This platform exists to make the next phase of digital transformation clear, practical and free of jargon for the people building consumer goods.",
    "We connect the conversation around product data, production intelligence, compliance, ESG transparency and digital growth, so static product information and live production data finally work together.",
    "Expect founder perspectives, plain-English explainers and the regulatory updates that actually matter.",
  ],
  panel: {
    title: "Static data meets live production",
    text: "The recipe and the heartbeat of a product, brought together into a single connected operating model.",
    columns: [
      {
        label: "Static intelligence",
        text: "Product, material and supplier data. The foundation for compliance and digital services.",
      },
      {
        label: "Live intelligence",
        text: "Orders, logistics, quality and production flows, connected to the factory floor.",
      },
    ],
  },
};

// ---------- Focus Areas page ----------
export const focusAreas = {
  eyebrow: "Focus Areas",
  title: "What we publish on",
  intro:
    "Seven connected themes, covered each week across fashion, footwear, textiles, electronics and beyond.",
  areas: [
    {
      number: "01",
      title: "Digital Product Passports & compliance",
      text: "What the regulation means and the data it demands.",
    },
    {
      number: "02",
      title: "Fashion, footwear & textiles",
      text: "From tech pack and bill of materials to product passport.",
    },
    {
      number: "03",
      title: "Electronics & consumer goods",
      text: "Component, supplier and compliance data at scale.",
    },
    {
      number: "04",
      title: "Virtual factory & Industry 4.0",
      text: "Digital twins, RFID, barcode and production connectivity.",
    },
    {
      number: "05",
      title: "ESG, circularity & transparency",
      text: "Turning product data into credible sustainability communication.",
    },
    {
      number: "06",
      title: "B2B and B2C digital growth",
      text: "Product data as a marketing and sales asset.",
    },
    {
      number: "07",
      title: "Supplier, factory & supply-chain visibility",
      text: "Connected data across the whole chain.",
    },
  ],
};

// ---------- Contact page ----------
export const contact = {
  eyebrow: "Contact",
  title: "Let's talk",
  text: "Questions, partnerships or story ideas? Send us a message and we'll get back to you.",
  reasons: ["General question", "Partnership", "Media", "Other"],
  submitText: "Send message",
  successMessage: "Thank you. Your message has been received.",
  errors: {
    name: "Please enter your name",
    email: "Please enter your email",
    emailFormat: "Please enter a valid email address",
    message: "Please enter a message",
  },
  linkedinTitle: "Prefer LinkedIn?",
  linkedinText: "Follow the page or send us a message there.",
};

// ---------- LinkedIn band (shown above the footer on every page) ----------
export const linkedinBand = {
  title: "Stay ahead of what is coming",
  text: "Follow the page for weekly insight on digital transformation, Digital Product Passports, ESG and the virtual factory. The newsletter launches soon.",
  buttonText: "LinkedIn",
};

// ---------- Footer ----------
export const footer = {
  contactEyebrow: "Contact us",
  contactTitle: "Let's talk about your digital transformation.",
  contactButton: "Get in touch",
  // Photo behind the frosted glass footer (the same one as the Home hero)
  backgroundImage: "/hero-bg.webp",
  exploreTitle: "Explore",
  connectTitle: "Connect",
  rights: "Consumer Goods Intelligence. All rights reserved.",
  termsText: "Terms & Conditions",
  privacyText: "Privacy Policy",
  cookieText: "Cookie settings",
};

// ---------- Cookie banner and settings popup ----------
export const cookies = {
  bannerText:
    "We use cookies to keep this site working and, with your permission, to understand how it is used.",
  privacyLinkText: "Read our Privacy Policy",
  acceptAll: "Accept all",
  rejectAll: "Reject all",
  settings: "Cookie settings",
  modalTitle: "Cookie settings",
  save: "Save preferences",
  categories: [
    {
      key: "necessary",
      title: "Necessary",
      text: "Required for the site to work. Always on.",
    },
    {
      key: "analytics",
      title: "Analytics",
      text: "Helps us understand which pages are useful.",
    },
    {
      key: "marketing",
      title: "Marketing",
      text: "Used to measure LinkedIn and other campaigns.",
    },
  ],
};

// ---------- Legal pages ----------
export const legal = {
  notice: "Placeholder text. Replace with your final legal wording before launch.",
  terms: {
    eyebrow: "Legal",
    title: "Terms & Conditions",
    lastUpdated: "10 October 2026",
    sections: [
      {
        heading: "Introduction",
        text: "These terms explain the rules for using this website. By using the website you agree to them. Placeholder text.",
      },
      {
        heading: "Use of the website",
        text: "You may read, share and link to our content for personal and professional use. Do not misuse the website or try to disrupt it. Placeholder text.",
      },
      {
        heading: "Intellectual property",
        text: "The text, logo and design of this website belong to Consumer Goods Intelligence unless stated otherwise. Placeholder text.",
      },
      {
        heading: "Limitation of liability",
        text: "The content is for general information only and is not legal or professional advice. Placeholder text.",
      },
      {
        heading: "Changes",
        text: "We may update these terms from time to time. The date at the top shows the latest version. Placeholder text.",
      },
      {
        heading: "Contact",
        text: "If you have questions about these terms, please use the contact page. Placeholder text.",
      },
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    lastUpdated: "10 October 2026",
    sections: [
      {
        heading: "Information we collect",
        text: "We only collect the information you choose to send us, such as your name and email address in the contact form. Placeholder text.",
      },
      {
        heading: "Cookies",
        text: "We use necessary cookies to keep the site working. Analytics and marketing cookies are only used if you allow them in Cookie settings. Placeholder text.",
      },
      {
        heading: "How we use information",
        text: "We use your information to reply to your message and to improve the website. We do not sell your data. Placeholder text.",
      },
      {
        heading: "Your rights",
        text: "You can ask to see, correct or delete the information we hold about you at any time. Placeholder text.",
      },
      {
        heading: "Contact",
        text: "If you have questions about your privacy, please use the contact page. Placeholder text.",
      },
    ],
  },
};

// ---------- 404 page ----------
export const notFound = {
  eyebrow: "Error 404",
  title: "Page not found",
  text: "The page you are looking for does not exist or has moved.",
  buttonText: "Back to home",
};
