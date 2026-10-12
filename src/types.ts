export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl?: string;
  features: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  institution: string;
  degree: string;
  gpa?: string;
  year: string;
  status?: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  category: 'web' | 'programming' | 'ai' | 'design';
  level: string;
  description: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}
