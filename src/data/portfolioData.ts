import { Project, EducationItem, SkillItem, JourneyMilestone } from '../types.ts';

export const PERSONAL_INFO = {
  name: "SUDARSHAN LAMA",
  tagline: "BIT Student • Developer • AI Enthusiast",
  intro: "Building digital experiences, learning technology, and exploring the future of AI.",
  bio: "I am a BIT Semester 1 student passionate about programming, web development, artificial intelligence, and creative technology. I enjoy turning ideas into interactive digital experiences while continuously developing my technical skills.",
  email: "sudarshanlama09@gmail.com",
  location: "Kathmandu, Nepal",
  role: "Bachelor in Information Technology (BIT) Student",
  semester: "Semester 1",
  profileImage: "/assets/images/profile.png",
  heroImage: "/assets/images/hero.jpg",
  socials: {
    github: "https://github.com/sudarshanlama19",
    linkedin: "https://www.linkedin.com/in/sudarshan-lama-779431354/?isSelfProfile=true",
    instagram: "https://www.instagram.com/_lama_sudarshan/",
    email: "mailto:sudarshanlama09@gmail.com",
  }
};

export const ABOUT_STATS = [
  {
    title: "BIT Student",
    metric: "Semester 1",
    description: "Deep diving into computer science fundamentals, data structures, and computer architecture."
  },
  {
    title: "Web Development",
    metric: "Modern Web",
    description: "Crafting semantic, responsive interfaces using HTML5, CSS3, modern JavaScript, and component libraries."
  },
  {
    title: "AI Enthusiast",
    metric: "Next-Gen Tech",
    description: "Actively experimenting with prompt engineering, LLM capabilities, and AI-assisted engineering tools."
  },
  {
    title: "Creative Projects",
    metric: "Hands-on",
    description: "Iterating on real interactive applications, logic puzzles, utilities, and portfolio experiences."
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "bit-current",
    period: "Current",
    institution: "Tribhuvan University Affiliated",
    degree: "Bachelor in Information Technology (BIT)",
    status: "Semester 1 • Enrolled",
    year: "Present",
    highlights: [
      "Core computing foundations, algorithms, and computational logic",
      "C programming, digital logic, and computer organization",
      "Active participant in technical workshops and student coding groups"
    ]
  },
  {
    id: "grade-12",
    period: "12th Grade",
    institution: "Southwestern State College",
    degree: "Higher Secondary Education (+2 Science / Tech)",
    gpa: "2.94",
    year: "2026 AD",
    highlights: [
      "Strengthened mathematical reasoning, physics, and computer science basics",
      "Engaged in laboratory computing exercises and project presentations"
    ]
  },
  {
    id: "grade-10",
    period: "10th Grade",
    institution: "Vibhuti Vidhya Mandir",
    degree: "Secondary Education Examination (SEE)",
    gpa: "3.62",
    year: "2024 AD",
    highlights: [
      "Outstanding academic foundation with 3.62 GPA distinction",
      "Early exploration of computer systems, basic logic, and school tech competitions"
    ]
  }
];

export const SKILLS_DATA: SkillItem[] = [
  {
    name: "HTML5",
    category: "web",
    level: "Core Semantic",
    description: "Semantic page structure, modern accessibility standards (ARIA), microdata, and SEO best practices."
  },
  {
    name: "CSS3 & Modern Styling",
    category: "web",
    level: "Responsive & Flex/Grid",
    description: "CSS variables, Flexbox, Grid, keyframe animations, responsive media queries, and utility styling."
  },
  {
    name: "JavaScript (ES6+)",
    category: "programming",
    level: "DOM & Async Logic",
    description: "Interactive DOM manipulation, event handling, ES modules, array methods, and asynchronous data fetching."
  },
  {
    name: "C Programming",
    category: "programming",
    level: "Procedural & Pointers",
    description: "Foundational computer science, memory management, pointers, structures, file I/O, and algorithmic problem solving."
  },
  {
    name: "Basic Web Development",
    category: "web",
    level: "Full Workflow",
    description: "Designing end-to-end web pages, client-side state handling, responsive viewports, and clean modular code."
  },
  {
    name: "AI Tools",
    category: "ai",
    level: "Workflow Integration",
    description: "Leveraging state-of-the-art developer AI tools, coding assistants, image generation, and creative automation."
  },
  {
    name: "Prompt Engineering",
    category: "ai",
    level: "Structured Prompting",
    description: "System instructions, few-shot prompting, schema constraints, and utilizing AI models for problem diagnosis."
  },
  {
    name: "Responsive Web Design",
    category: "design",
    level: "Multi-Device Fluidity",
    description: "Fluid typography, mobile-first viewports, touch target ergonomics, and cross-browser consistency."
  }
];

export const FEATURED_PROJECT: Project = {
  id: "project-gamehub",
  number: "01",
  title: "GameHub Arcade",
  subtitle: "Interactive Multi-Game Web Platform",
  description: "An interactive browser arcade gaming platform featuring a suite of high-engagement web games, responsive canvas game loops, instant single & multiplayer controls, dynamic audio/visual feedback, and modern neon cyberpunk-inspired UI.",
  technologies: ["Web Gaming", "JavaScript ES6+", "HTML5 Canvas", "Tailwind CSS", "Interactive UI"],
  image: "/assets/images/gamehub.jpg",
  liveUrl: "https://gamehub-4909.ai.studio",
  githubUrl: "https://github.com/sudarshanlama19",
  features: [
    "Collection of instantly playable arcade and puzzle browser games",
    "Real-time game mechanics, particle effects, and responsive controls",
    "Modern dark arcade aesthetic with animated interactive cards",
    "Optimized performance for desktop, tablet, and mobile browsers"
  ]
};

export const JOURNEY_DATA: JourneyMilestone[] = [
  {
    year: "2024",
    title: "Completed Grade 10",
    description: "Graduated with 3.62 GPA from Vibhuti Vidhya Mandir, discovering a deep passion for logical problem solving and digital computers."
  },
  {
    year: "2026",
    title: "Completed Grade 12",
    description: "Completed higher secondary education at Southwestern State College with 2.94 GPA, laying strong foundations in science and technology."
  },
  {
    year: "2026",
    title: "Started BIT (Bachelor in IT)",
    description: "Officially commenced Semester 1 of Bachelor in Information Technology, focusing on university-grade computer science principles and C programming.",
    highlight: true
  },
  {
    year: "2026",
    title: "Began Learning Web Development",
    description: "Mastered semantic HTML5, modern CSS layouts (Flexbox & Grid), responsive UI design, and JavaScript DOM scripting."
  },
  {
    year: "2026",
    title: "Started Exploring AI-Assisted Development",
    description: "Integrating modern LLMs, prompt engineering frameworks, and generative AI tools into the coding and creative workflow."
  }
];
