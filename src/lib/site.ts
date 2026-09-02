export const site = {
  name: "Srikaran Sankar",
  shortName: "Srikaran",
  role: "AI/ML Engineer",
  // hero headline
  tagline: "I build the pipeline from raw data to production ML.",
  // sub-line under the headline
  specialization:
    "Two years bridging data engineering and applied ML — ETL/ELT, data quality, and models that ship.",
  location: "Dublin, Ireland",
  availability: "Open to work · Stamp 2 visa",
  email: "mastersk0210@gmail.com",
  // primary CTA → LinkedIn
  linkedin: "https://www.linkedin.com/in/srikaran-sankar",
  links: {
    github: "https://github.com/mastersk07",
    linkedin: "https://www.linkedin.com/in/srikaran-sankar",
    email: "mailto:mastersk0210@gmail.com",
    whatsapp: "https://wa.me/353894002480",
    // TODO: replace with your Instagram handle
    instagram: "https://instagram.com/",
  },
  url: "https://srithings.info",
} as const;

export type Site = typeof site;
