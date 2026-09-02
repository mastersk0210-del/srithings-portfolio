export const site = {
  name: "Srikaran Sankar",
  shortName: "Srikaran",
  role: "AI/ML Engineer",
  // hero headline
  tagline: "I'm an AI engineer who turns messy data into models that ship.",
  // sub-line under the headline
  specialization:
    "Two years bridging data engineering and applied ML — pipelines, data quality, training, evaluation, deployment.",
  location: "Dublin, Ireland",
  availability: "Open to work · Stamp 2 visa",
  email: "mastersk0210@gmail.com",
  // primary CTA → LinkedIn
  linkedin: "https://www.linkedin.com/in/srikaran-sankar",
  links: {
    github: "https://github.com/mastersk0210-del",
    linkedin: "https://www.linkedin.com/in/srikaran-sankar",
    email: "mailto:mastersk0210@gmail.com",
    whatsapp: "https://wa.me/353894002480",
    // TODO: replace with your Instagram handle
    instagram: "https://instagram.com/",
  },
  url: "https://srithings.info",
} as const;

export type Site = typeof site;
