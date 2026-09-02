export const site = {
  name: "SK",
  role: "AI Engineer",
  // one-liner shown in the hero — refine once specialization is locked
  tagline: "I build and ship machine-learning models.",
  specialization: "NLP · Computer Vision · MLOps",
  location: "Remote",
  availability: "Open to work",
  email: "mastersk0210@gmail.com",
  // primary CTA
  calUrl: "https://cal.com/sk", // TODO: replace with real Cal.com link
  links: {
    github: "https://github.com/", // TODO
    linkedin: "https://linkedin.com/in/", // TODO
    huggingface: "https://huggingface.co/", // TODO
    kaggle: "https://kaggle.com/", // TODO
  },
  url: "https://sk-portfolio.vercel.app", // TODO: custom domain
} as const;

export type Site = typeof site;
