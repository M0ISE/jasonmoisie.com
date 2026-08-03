/**
 * The single source for who this is and how to reach them.
 *
 * Contact details were duplicated across the footer and the About sidebar,
 * which is two places to forget. Everything that renders them now imports
 * from here — including the résumé, which is the one place a wrong number
 * actually costs something.
 */
export const profile = {
  name: "Jason Moisiadis",
  pronouns: "they/he",
  location: "Sydney, Australia",
  /** The line the home page opens with. The résumé leads on the same claim. */
  title: "Experience designer",
  summary:
    "Experience designer grounded in UX and service design, currently in Tech Services at Lush — training, troubleshooting and building the tooling that keeps a shop floor running. I open a problem up properly before building, because working out what people actually need is the same discipline whether the thing is an immersive experience or a stock system.",
  email: "jason.moisie@gmail.com",
  phone: "+61 420 288 843",
  /** tel: needs no spaces; the display form above does. */
  phoneHref: "tel:+61420288843",
  site: "jasonmoisie.com",
  siteUrl: "https://jasonmoisie.com",
  linkedin: "https://www.linkedin.com/in/jasonmoisiadis/",
  github: "https://github.com/M0ISE",
  instagram: "https://www.instagram.com/moisie.jpg/",
} as const;

/** Footer and sidebar both render this set, in this order. */
export const contactLinks = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Phone", href: profile.phoneHref },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "GitHub", href: profile.github },
] as const;
