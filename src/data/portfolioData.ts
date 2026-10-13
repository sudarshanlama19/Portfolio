import { Project, EducationItem, SkillItem, JourneyMilestone } from '../types.ts';

export const PERSONAL_INFO = {
  name: "SUDARSHAN LAMA",
  headline: "BIT Student | Aspiring Web Developer | AI Enthusiast",
  sentence: "I enjoy learning new technologies and building creative digital projects.",
  tagline: "BIT Student | Aspiring Web Developer | AI Enthusiast",
  intro: "I enjoy learning new technologies and building creative digital projects.",
  bio: "I am a Bachelor in Information Technology (BIT) Semester 1 student based in Kathmandu, Nepal. Passionate about computer science foundations, modern web engineering, and artificial intelligence, I build interactive digital experiences while actively learning technologies that shape the web.",
  background: "Currently pursuing a Bachelor in Information Technology (BIT) at university, with strong academic distinctions including a 3.62 GPA in Grade 10 (SEE) from Vibhuti Vidhya Mandir and completing Grade 12 (SLC) from Southwestern State College.",
  interests: "Web engineering, interactive browser platforms, procedural C programming, retro arcade game development, and modern generative AI tools.",
  learningGoals: "Mastering core data structures, memory architecture, advanced procedural and object-oriented systems, and scalable full-stack web applications.",
  futureAmbitions: "Aspiring software engineer dedicated to building high-performance, accessible, and creative digital applications that solve real-world problems.",
  email: "sudarshanlama09@gmail.com",
  location: "Kathmandu, Nepal",
  role: "Bachelor in Information Technology (BIT) Student",
  semester: "Semester 1",
  profileImage: "/assets/images/profile.png",
  heroImage: "/assets/images/hero.jpg",
  whatsapp: "+977 9744690125",
  whatsappUrl: "https://wa.me/9779744690125",
  socials: {
    github: "https://github.com/sudarshanlama19",
    linkedin: "https://www.linkedin.com/in/sudarshan-lama-779431354/?isSelfProfile=true",
    instagram: "https://www.instagram.com/_lama_sudarshan/",
    email: "mailto:sudarshanlama09@gmail.com",
    whatsapp: "https://wa.me/9779744690125",
  }
};

export const ABOUT_STATS = [
  {
    title: "Academic Background",
    metric: "BIT Sem 1",
    description: "Enrolled in Bachelor in Information Technology, mastering computational mathematics, algorithms, and logic."
  },
  {
    title: "Core Interests",
    metric: "Web & Games",
    description: "Building responsive front-ends, browser game loops (Canvas), and interactive digital tools."
  },
  {
    title: "Learning Goals",
    metric: "C & Full-Stack",
    description: "Deepening memory discipline, pointers, clean architectures, and modern component systems."
  },
  {
    title: "Future Ambitions",
    metric: "Software Eng",
    description: "Committed to engineering scalable, user-centric software products and exploring applied AI systems."
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "bit-current",
    period: "Current",
    institution: "University Curriculum (Tribhuvan University Affiliated)",
    degree: "Bachelor in Information Technology (BIT)",
    status: "Semester 1 • Currently Enrolled",
    year: "Present",
    highlights: [
      "Core computing foundations, algorithms, and computational logic",
      "C programming, digital logic, and computer organization",
      "Hands-on software development and technical problem solving"
    ]
  },
  {
    id: "ai-bootcamp",
    period: "Certification",
    institution: "AI Technology Training",
    degree: "Basic AI Bootcamp Training Certificate",
    status: "Completed & Certified",
    year: "2026 AD",
    highlights: [
      "Completed in 2026 AD after SLC, mastering prompt engineering, model architectures, and LLM reasoning",
      "Practical workflows integrating generative AI into developer environments",
      "Ethical AI principles and creative automation experiments"
    ]
  },
  {
    id: "grade-12",
    period: "Grade 12",
    institution: "Southwestern State College",
    degree: "School Leaving Certificate (SLC)",
    gpa: "2.94",
    year: "2026 AD",
    highlights: [
      "Strengthened mathematical reasoning, physics, and computer science basics",
      "Engaged in laboratory computing exercises and technical project demonstrations"
    ]
  },
  {
    id: "grade-10",
    period: "Grade 10",
    institution: "Vibhuti Vidhya Mandir",
    degree: "Secondary Education Examination (SEE)",
    gpa: "3.62",
    year: "2024 AD",
    highlights: [
      "Achieved outstanding Distinction GPA of 3.62 in 2024 AD",
      "Early exploration of computer systems, algorithmic logic, and school tech events"
    ]
  }
];

export const SKILLS_DATA: SkillItem[] = [
  {
    name: "HTML5",
    category: "web",
    level: "Core Semantic",
    description: "Semantic document structure, accessibility standards (ARIA), SEO best practices, and modern web APIs."
  },
  {
    name: "CSS3 & Modern Styling",
    category: "web",
    level: "Responsive Layouts",
    description: "Flexbox, CSS Grid, media queries, CSS custom properties, smooth transitions, and responsive viewports."
  },
  {
    name: "JavaScript (ES6+)",
    category: "programming",
    level: "Interactive DOM & Logic",
    description: "Modern JavaScript, event handling, ES modules, array methods, DOM manipulation, and asynchronous workflows."
  },
  {
    name: "C Programming",
    category: "programming",
    level: "Procedural & Memory",
    description: "Pointers, memory management, structs, file I/O, control flow, and computational problem solving."
  },
  {
    name: "Basic Web Development",
    category: "web",
    level: "End-to-End Workflow",
    description: "Building responsive websites, component structure, clean semantic markup, and client-side state."
  },
  {
    name: "AI Tools & Workflows",
    category: "ai",
    level: "Applied Integration",
    description: "Active use of modern developer AI assistants, Gemini, ChatGPT, and automated coding workflows."
  },
  {
    name: "Prompt Engineering",
    category: "ai",
    level: "Structured Techniques",
    description: "System instructions, structured outputs, iterative prompt refinement, and AI problem diagnosis."
  },
  {
    name: "Developer Tools (Git & VS Code)",
    category: "design",
    level: "Version Control & Tooling",
    description: "Git version control, GitHub repositories, Vite build tooling, terminal basics, and modern IDE workflows."
  }
];

export const PROJECTS_GALLERY: Project[] = [
  {
    id: "project-gamehub",
    number: "01",
    title: "GameHub Arcade",
    subtitle: "Interactive Multi-Game Web Platform",
    description: "An interactive browser arcade gaming platform featuring a suite of high-engagement web games, responsive canvas game loops, instant single & multiplayer controls, dynamic audio/visual feedback, and modern neon cyberpunk-inspired UI.",
    technologies: ["JavaScript ES6+", "HTML5 Canvas", "Tailwind CSS", "Interactive Web Loops", "Vite"],
    image: "/assets/images/gamehub.jpg",
    liveUrl: "https://gamehub-4909.ai.studio",
    githubUrl: "https://github.com/sudarshanlama19",
    features: [
      "Collection of playable browser arcade & puzzle games",
      "Real-time game mechanics, particle effects, and responsive controls",
      "Modern dark arcade aesthetic with animated interactive cards",
      "Smooth performance optimized across desktop, tablet, and mobile"
    ]
  }
];

export const FEATURED_PROJECT: Project = PROJECTS_GALLERY[0];

export const JOURNEY_DATA: JourneyMilestone[] = [
  {
    year: "2024 AD",
    title: "Completed Grade 10 at Vibhuti Vidhya Mandir",
    description: "Achieved a 3.62 GPA distinction in Secondary Education Examination (SEE), sparking a passion for computational logic and programming."
  },
  {
    year: "2026 AD",
    title: "Completed Grade 12 (SLC) at Southwestern State College",
    description: "Graduated with a 2.94 GPA in School Leaving Certificate (SLC - Grade 12), strengthening foundations in science, mathematics, and computing."
  },
  {
    year: "2026 AD",
    title: "Completed Basic AI Course Training",
    description: "Completed basic AI course training in 2026 AD after SLC, earning certification in generative AI concepts, prompt engineering methodologies, and modern AI development tools."
  },
  {
    year: "2026 AD",
    title: "Enrolled in BIT (Bachelor in IT) & Built GameHub",
    description: "Commenced Semester 1 of Bachelor in Information Technology, deepening C programming skills while building and launching the GameHub Arcade web platform.",
    highlight: true
  },
  {
    year: "Future Goals",
    title: "Full-Stack Software Engineering & Advanced AI",
    description: "Advancing toward mastering full-stack software architecture, data structures, backend engineering, and building production-grade digital applications."
  }
];
