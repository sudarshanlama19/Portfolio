export type Language = 'en' | 'ne';

export interface Translations {
  nav: {
    home: string;
    about: string;
    education: string;
    skills: string;
    websites: string;
    journey: string;
    contact: string;
    connect: string;
  };
  hero: {
    status: string;
    tagline: string;
    intro: string;
    exploreWebsites: string;
    getInTouch: string;
    profiles: string;
    academics: string;
    academicsValue: string;
    distinction: string;
    focusAreas: string;
    focusAreasValue: string;
    scrollDown: string;
    changePhoto: string;
    edit: string;
    photoPosition: string;
    center: string;
    left: string;
    right: string;
    ownerOnly: string;
    ownerActive: string;
  };
  about: {
    badge: string;
    title: string;
    subtitlePrefix: string;
    subtitleHighlight: string;
    bio: string;
    paragraph: string;
    devSummary: string;
    program: string;
    location: string;
    distinctionGrade: string;
    focus: string;
    focusValue: string;
  };
  education: {
    badge: string;
    title: string;
    current: string;
    achievedGpa: string;
  };
  skills: {
    badge: string;
    title: string;
    all: string;
    web: string;
    programming: string;
    ai: string;
    design: string;
    curriculumTitle: string;
    curriculumDesc: string;
    discussStack: string;
  };
  websites: {
    badge: string;
    title: string;
    liveBadge: string;
    featuredBadge: string;
    visitWebsite: string;
    launchOnline: string;
    launchWebsite: string;
    preview: string;
    builtWith: string;
  };
  journey: {
    badge: string;
    title: string;
    nextChapter: string;
    nextTitle: string;
    nextDesc: string;
    connectBtn: string;
  };
  contact: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    directEmail: string;
    profiles: string;
    sendDirect: string;
    dispatchedNotice: string;
    yourName: string;
    yourEmail: string;
    subject: string;
    message: string;
    sendBtn: string;
    sending: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      education: 'Education',
      skills: 'Skills',
      websites: 'My Websites',
      journey: 'Journey',
      contact: 'Contact',
      connect: 'Connect',
    },
    hero: {
      status: 'BIT Semester 1 • Open to Collaboration',
      tagline: 'BIT Student • Developer • AI Enthusiast',
      intro: 'Building digital experiences, learning technology, and exploring the future of AI.',
      exploreWebsites: 'Explore My Websites',
      getInTouch: 'Get in Touch',
      profiles: 'Profiles',
      academics: 'Academics',
      academicsValue: 'BIT Sem 1',
      distinction: 'Distinction GPA',
      focusAreas: 'Focus Areas',
      focusAreasValue: 'Web & AI',
      scrollDown: 'Scroll Down',
      changePhoto: 'Change Photo',
      edit: 'Edit',
      photoPosition: 'Photo Placement',
      center: 'Top / Center',
      left: 'Left Side',
      right: 'Right Side',
      ownerOnly: 'Owner Protected',
      ownerActive: 'Owner Mode',
    },
    about: {
      badge: 'Discovery & Narrative',
      title: 'ABOUT ME',
      subtitlePrefix: 'Curious technologist turning logical code into',
      subtitleHighlight: 'interactive digital reality',
      bio: 'I am a BIT Semester 1 student passionate about programming, web development, artificial intelligence, and creative technology. I enjoy turning ideas into interactive digital experiences while continuously developing my technical skills.',
      paragraph: 'Currently navigating the first semester of my Bachelor in Information Technology (BIT) at university, I balance foundational computer science (computational mathematics, logic, and procedural C programming) with modern front-end web engineering, interactive browser platforms, and cutting-edge artificial intelligence workflows.',
      devSummary: 'Developer Summary',
      program: 'Current Program',
      location: 'Location',
      distinctionGrade: 'Grade 10 Distinction',
      focus: 'Primary Focus',
      focusValue: 'Web Platforms & Games',
    },
    education: {
      badge: 'Academic Foundation',
      title: 'EDUCATION',
      current: 'Current',
      achievedGpa: 'Achieved GPA:',
    },
    skills: {
      badge: 'Technical Capabilities',
      title: 'SKILLS & TOOLKIT',
      all: 'All Skills',
      web: 'Core Web',
      programming: 'Programming',
      ai: 'AI & Prompts',
      design: 'Design',
      curriculumTitle: 'Undergraduate Curriculum & Practical Coding Focus',
      curriculumDesc: 'Focusing on procedural C, computational mathematics, and modular modern web interfaces.',
      discussStack: 'Discuss Technical Stack →',
    },
    websites: {
      badge: 'Digital Creations & Platforms',
      title: 'MY WEBSITES',
      liveBadge: 'Live Interactive Web Experience',
      featuredBadge: 'FEATURED WEBSITE',
      visitWebsite: 'Visit Website',
      launchOnline: 'Launch Online',
      launchWebsite: 'Launch Website',
      preview: 'In-App Preview',
      builtWith: 'Built With',
    },
    journey: {
      badge: 'Milestones & Growth',
      title: 'MY JOURNEY',
      nextChapter: 'Next Chapter',
      nextTitle: 'Preparing for Advanced Software Engineering & AI Integration',
      nextDesc: 'Deepening understanding of algorithmic complexity, data structures, full-stack systems, and modern AI engineering tools.',
      connectBtn: 'Connect with Sudarshan',
    },
    contact: {
      badge: 'Get In Touch',
      title1: "LET'S BUILD",
      title2: 'SOMETHING',
      subtitle: '"Have an idea, project, or collaboration in mind? Let\'s connect."',
      directEmail: 'Direct Email',
      profiles: 'Interactive Connected Profiles',
      sendDirect: 'Send a Direct Message',
      dispatchedNotice: "Your message is dispatched securely to Sudarshan's email inbox.",
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      subject: 'Subject (Optional)',
      message: 'Your Message',
      sendBtn: 'Send Message to Sudarshan',
      sending: 'Sending Message...',
    },
  },
  ne: {
    nav: {
      home: 'गृहपृष्ठ',
      about: 'मेरो बारेमा',
      education: 'शिक्षा',
      skills: 'दक्षता',
      websites: 'मेरो वेबसाइटहरू',
      journey: 'मेरो यात्रा',
      contact: 'सम्पर्क',
      connect: 'जोडिनुहोस्',
    },
    hero: {
      status: 'बीआईटी पहिलो सेमेस्टर • सहकार्यका लागि खुला',
      tagline: 'बीआईटी विद्यार्थी • विकासकर्ता • एआई उत्साही',
      intro: 'डिजिटल अनुभव निर्माण गर्दै, प्रविधि सिक्दै, र एआईको भविष्य अन्वेषण गर्दै।',
      exploreWebsites: 'मेरो वेबसाइटहरू हेर्नुहोस्',
      getInTouch: 'सम्पर्क गर्नुहोस्',
      profiles: 'प्रोफाइलहरू',
      academics: 'अध्ययन',
      academicsValue: 'बीआईटी सेमेस्टर १',
      distinction: 'विशिष्ट श्रेणी जीपीए',
      focusAreas: 'केन्द्रित क्षेत्र',
      focusAreasValue: 'वेब र एआई',
      scrollDown: 'तल हेर्नुहोस्',
      changePhoto: 'फोटो परिवर्तन',
      edit: 'सम्पादन',
      photoPosition: 'फोटो स्थान',
      center: 'माथि / केन्द्र',
      left: 'बायाँ साइड',
      right: 'दायाँ साइड',
      ownerOnly: 'मालिक मात्र',
      ownerActive: 'मालिक मोड',
    },
    about: {
      badge: 'परिचय र कथा',
      title: 'मेरो बारेमा',
      subtitlePrefix: 'तार्किक कोडलाई रूपान्तरण गर्दै',
      subtitleHighlight: 'अन्तरक्रियात्मक डिजिटल वास्तविकतामा',
      bio: 'म बीआईटी पहिलो सेमेस्टरको विद्यार्थी हुँ जो प्रोग्रामिङ, वेब विकास, आर्टिफिसियल इन्टेलिजेन्स र रचनात्मक प्रविधिप्रति समर्पित छु। म आफ्ना विचारहरूलाई अन्तरक्रियात्मक डिजिटल अनुभवहरूमा रूपान्तरण गर्न रुचाउँछु।',
      paragraph: 'हाल विश्वविद्यालयमा सूचना प्रविधि स्नातक (BIT) को पहिलो सेमेस्टर अध्ययन गर्दै, म कम्प्युटर विज्ञानका आधारभूत विषयहरू (प्रक्रियात्मक सी प्रोग्रामिङ, तर्क र कम्प्युटेसनल गणित) सँगै आधुनिक फ्रन्ट-एन्ड वेब विकास र एआई प्रविधिहरूमा अभ्यास गर्दैछु।',
      devSummary: 'विकासकर्ता सारांश',
      program: 'हालको अध्ययन',
      location: 'ठेगाना',
      distinctionGrade: 'कक्षा १० विशिष्ट श्रेणी',
      focus: 'प्रमुख प्राथमिकता',
      focusValue: 'वेब प्लेटफर्म र गेमहरू',
    },
    education: {
      badge: 'शैक्षिक पृष्ठभूमि',
      title: 'शिक्षा',
      current: 'हाल अध्ययनरत',
      achievedGpa: 'प्राप्त जीपीए:',
    },
    skills: {
      badge: 'प्राविधिक क्षमताहरू',
      title: 'दक्षता र उपकरणहरू',
      all: 'सबै दक्षता',
      web: 'वेब विकास',
      programming: 'प्रोग्रामिङ',
      ai: 'एआई र प्रम्प्ट्स',
      design: 'डिजाइन',
      curriculumTitle: 'स्नातक पाठ्यक्रम र व्यावहारिक कोडिङ अभ्यास',
      curriculumDesc: 'प्रक्रियात्मक सी, कम्प्युटेसनल गणित र आधुनिक वेब इन्टरफेसमा विशेष ध्यान।',
      discussStack: 'प्राविधिक विषयमा कुरा गर्नुहोस् →',
    },
    websites: {
      badge: 'डिजिटल सिर्जना र प्लेटफर्महरू',
      title: 'मेरो वेबसाइटहरू',
      liveBadge: 'प्रत्यक्ष अन्तरक्रियात्मक वेब अनुभव',
      featuredBadge: 'विशेष वेबसाइट',
      visitWebsite: 'वेबसाइट खोल्नुहोस्',
      launchOnline: 'अनलाइन सुरु गर्नुहोस्',
      launchWebsite: 'वेबसाइट चलाउनुहोस्',
      preview: 'एप भित्र पूर्वावलोकन',
      builtWith: 'निर्माण प्रविधि',
    },
    journey: {
      badge: 'माइलस्टोन र प्रगति',
      title: 'मेरो यात्रा',
      nextChapter: 'आगामी अध्याय',
      nextTitle: 'उन्नत सफ्टवेयर इन्जिनियरिङ र एआई एकीकरणको तयारी',
      nextDesc: 'एल्गोरिदम जटिलता, डाटा संरचना, फुल-स्ट्याक प्रणाली र आधुनिक एआई इन्जिनियरिङको गहिरो अध्ययन।',
      connectBtn: 'सुदर्शनसँग जोडिनुहोस्',
    },
    contact: {
      badge: 'सम्पर्क गर्नुहोस्',
      title1: 'केही नयाँ',
      title2: 'निर्माण गरौँ',
      subtitle: '"कुनै नयाँ विचार, परियोजना वा सहकार्यको सोच छ? जोडिनुहोस्।"',
      directEmail: 'प्रत्यक्ष इमेल',
      profiles: 'सक्रिय सामाजिक प्रोफाइलहरू',
      sendDirect: 'सिधै सन्देश पठाउनुहोस्',
      dispatchedNotice: 'तपाईंको सन्देश सिधै सुदर्शनको इमेलमा सुरक्षित रूपमा पुग्नेछ।',
      yourName: 'तपाईंको नाम',
      yourEmail: 'तपाईंको इमेल',
      subject: 'विषय (वैकल्पिक)',
      message: 'तपाईंको सन्देश',
      sendBtn: 'सुदर्शनलाई सन्देश पठाउनुहोस्',
      sending: 'सन्देश पठाउँदै...',
    },
  },
};
