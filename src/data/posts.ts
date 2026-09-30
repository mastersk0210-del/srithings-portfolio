export type FigureName =
  | "everyday-ai"
  | "rules-vs-learning"
  | "learn-by-example"
  | "generative-ai"
  | "ingredients"
  | "training-loop"
  | "neural-network"
  | "next-token";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; code: string; lang?: string }
  /** inline infographic from components/blog/Figures.tsx */
  | { type: "figure"; name: FigureName; caption?: string };

export type Post = {
  slug: string;
  title: string;
  summary: string; // one line for the card + meta description
  date: string; // ISO, e.g. "2026-09-30"
  tags: string[];
  /** drafts render in `next dev` only — never in a production build */
  draft?: boolean;
  body: PostBlock[];
};

/**
 * Blog posts, newest first after sorting. To publish: add an entry, set `draft` to
 * false (or remove it), and deploy.
 */
const allPosts: Post[] = [
  {
    slug: "how-does-ai-actually-work",
    title: "How Does AI Actually Work? A Beginner's Guide",
    summary:
      "The key ideas behind AI in plain language, from how a model learns to how a chatbot writes a reply, one word at a time.",
    date: "2026-09-30",
    tags: ["AI basics", "Neural networks", "LLMs"],
    body: [
      {
        type: "p",
        text: "In my last post, I wrote that AI isn't magic, it's a tool. That naturally leads to the next question: if it isn't magic, then how does it actually work?",
      },
      {
        type: "p",
        text: "You don't need a computer science degree to understand the basics. In this post, I'll walk through the key ideas behind AI in plain language, from how a model learns to how a chatbot writes a reply, one word at a time.",
      },
      { type: "h2", text: "The three ingredients: data, model and computing power" },
      { type: "p", text: "Every modern AI system is built from three things." },
      {
        type: "ul",
        items: [
          "Data is the raw material. It can be text, images, audio, numbers or code. The more varied and high-quality the data, the more the AI can learn.",
          "A model is the structure that does the learning. Think of it as an empty brain with millions or even billions of adjustable settings, called parameters.",
          "Computing power is the energy that makes learning possible. Training a large model can take thousands of specialised chips running for weeks.",
        ],
      },
      {
        type: "figure",
        name: "ingredients",
        caption: "Data, a model and computing power: the three ingredients of every AI system.",
      },
      {
        type: "p",
        text: "Put simply: the model learns from the data, and computing power makes that learning happen at scale.",
      },
      { type: "h2", text: "How a model learns: training by trial and error" },
      {
        type: "p",
        text: "Training is where the real learning happens, and it works a lot like practising for an exam.",
      },
      {
        type: "ol",
        items: [
          'Guess. The model is shown an example, say a photo, and makes a guess: "This is a dog."',
          'Check. The guess is compared with the correct answer: "Actually, it\'s a cat."',
          "Measure the error. The system calculates how wrong the guess was. This number is called the loss.",
          "Adjust. The model slightly tweaks its parameters so that next time, the guess is a little closer to right.",
          "Repeat. This loop runs millions or billions of times across the whole dataset.",
        ],
      },
      {
        type: "figure",
        name: "training-loop",
        caption: "The training loop. Each pass makes a tiny correction; millions of passes add up.",
      },
      {
        type: "p",
        text: "No single step teaches the model much. But after enough repetitions, those tiny adjustments add up, and the model becomes surprisingly good at the task. Once training is finished, the parameters are fixed, and the model is ready to be used.",
      },
      { type: "h2", text: "Neural networks, simply explained" },
      {
        type: "p",
        text: "Most modern AI models are neural networks, loosely inspired by how neurons in the brain connect to each other.",
      },
      {
        type: "p",
        text: "Imagine a stack of layers. The first layer receives the input, such as the pixels of an image. Each layer passes signals to the next, and every connection has a strength, or weight, that decides how much one signal matters. These weights are the parameters the model adjusts during training.",
      },
      {
        type: "p",
        text: 'Each layer learns to notice something slightly more complex than the one before. In an image model, early layers might detect edges and colours, middle layers might recognise shapes like eyes or ears, and later layers might put it all together to say "cat". Nobody programs these steps by hand. The network discovers them on its own during training.',
      },
      {
        type: "figure",
        name: "neural-network",
        caption: "Each layer builds on the last: pixels become edges, edges become shapes, shapes become “cat”.",
      },
      {
        type: "p",
        text: "When a network has many layers, we call it deep learning, which is the technology behind most of today's AI breakthroughs.",
      },
      { type: "h2", text: "How AI chatbots write their answers" },
      {
        type: "p",
        text: "Chatbots like ChatGPT, Gemini and Claude are powered by large language models (LLMs). Here's what happens behind the scenes, step by step.",
      },
      {
        type: "ol",
        items: [
          "Text becomes tokens. Your message is broken into small pieces called tokens. A token might be a whole word, part of a word or a punctuation mark. The model works with numbers, so each token is turned into a numerical form it can process.",
          'The model predicts the next token. During training, an LLM reads enormous amounts of text and learns one core skill: predicting what comes next. Given "The sun rises in the", it learns that "east" is a very likely next word.',
          "It builds the answer one piece at a time. When you ask a question, the model predicts the most suitable next token, adds it to the reply, then predicts the next one, and so on. That's why you often see answers appear word by word.",
          'It pays attention to context. Modern LLMs use a design called the transformer, which lets the model weigh how every word in your message relates to every other word. This "attention" is what helps it keep track of meaning across long sentences and conversations.',
          "It's fine-tuned to be helpful. A model that only predicts text isn't automatically a good assistant. So after the main training, it's refined with examples of good conversations and with feedback from people who rate its answers. This step teaches it to follow instructions, stay on topic and avoid harmful replies.",
        ],
      },
      {
        type: "figure",
        name: "next-token",
        caption: "Next-token prediction, one step at a time. Percentages are illustrative.",
      },
      { type: "h2", text: "Why AI still makes mistakes" },
      {
        type: "p",
        text: "Once you understand how AI works, its mistakes start to make sense.",
      },
      {
        type: "ul",
        items: [
          "It predicts; it doesn't look things up. A language model generates what sounds right based on patterns. If it hasn't learned a fact well, it may produce something plausible but false.",
          "It only knows its training data. If information was missing, outdated or biased in the data, the model will reflect that.",
          "It has no real-world experience. It has read about the world but never lived in it, so common sense can sometimes slip.",
        ],
      },
      {
        type: "p",
        text: "This is why many AI tools now connect to web search or trusted documents, so they can ground their answers in real sources. It's also why checking important facts yourself is still a good habit.",
      },
      { type: "h2", text: "Final thoughts" },
      {
        type: "p",
        text: "Strip away the buzzwords, and AI comes down to a simple idea: learn patterns from lots of examples, then use those patterns to make predictions. Neural networks, training loops and transformers are just clever ways of doing that at enormous scale.",
      },
      {
        type: "p",
        text: "Understanding this makes you a better AI user. You'll know why it's brilliant at some tasks, why it stumbles on others, and when to trust your own judgement over its answer.",
      },
      {
        type: "p",
        text: "Which part of AI would you like me to explore next: image generators, AI in education, or the ethics of AI? Let me know in the comments below.",
      },
    ],
  },
  {
    slug: "ai-isnt-magic",
    title: "AI isn't magic. It's a tool.",
    summary:
      "A simple, practical view of what AI actually is, what it can do, and where it falls short.",
    date: "2026-09-30",
    tags: ["AI basics", "Generative AI"],
    body: [
      {
        type: "p",
        text: 'A few years ago, "artificial intelligence" sounded like something out of a sci-fi movie. Today it writes emails, suggests songs, fixes code, translates menus, and helps students understand tricky concepts at 2 a.m.',
      },
      { type: "figure", name: "everyday-ai" },
      {
        type: "p",
        text: "But for all the hype, many people still aren't sure what AI actually is, what it can do, and where it falls short. In this post, I want to cut through the noise and share a simple, practical view: AI isn't magic. It's a tool. And like any tool, it's most useful when you understand how it works.",
      },
      { type: "h2", text: "What AI actually is, in plain words" },
      {
        type: "p",
        text: "At its core, AI is software that learns patterns from data instead of following only hand-written rules. A traditional program is told exactly what to do, step by step. An AI system is shown thousands or millions of examples and learns to spot patterns on its own.",
      },
      {
        type: "figure",
        name: "rules-vs-learning",
        caption: "Traditional programs follow rules a person wrote. Machine learning works out the rules from examples.",
      },
      {
        type: "p",
        text: "Think of how you learned to recognise a cat. Nobody gave you a rulebook of whisker lengths and ear angles. You simply saw many cats, and your brain figured it out. Machine learning works in a similar way, just with maths and a lot of computing power.",
      },
      {
        type: "figure",
        name: "learn-by-example",
        caption: "No rulebook, just examples. The model learns what a cat looks like, then spots one it has never seen.",
      },
      {
        type: "p",
        text: "The AI tools making headlines today, like chatbots and image generators, are called generative AI. They are trained on huge amounts of text, images or code, and they produce new content by predicting what is most likely to come next. That is why they can sound fluent and confident, even when they are wrong.",
      },
      {
        type: "figure",
        name: "generative-ai",
        caption: "Generative AI learns from huge amounts of content, then creates new content by predicting what comes next.",
      },
    ],
  },
];

export const posts = allPosts
  .filter((p) => !p.draft || process.env.NODE_ENV === "development")
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function readingMinutes(post: Post) {
  const words = post.body
    .map((b) =>
      b.type === "ul" || b.type === "ol" ? b.items.join(" ") : b.type === "code" ? b.code : b.type === "figure" ? "" : b.text,
    )
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
