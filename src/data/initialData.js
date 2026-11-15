export const initialPortfolioData = {
  profile: {
    name: "Marthala Surendar Reddy",
    initials: "MSR",
    tagline: "Full Stack Developer · Java Specialist · Problem Solver",
    title: "B.Tech Computer Science and Engineering Student",
    university: "KL University",
    graduationYear: "2028",
    location: "Andhra Pradesh, India",
    email: "marthalasurendarreddy@gmail.com",
    phone: "+91 98765 43210",
    avatar: "/msr-portrait.svg",
    intro: "B.Tech CSE student at KL University passionate about architecting scalable backend systems, mastering data structures & algorithms, and engineering responsive web applications.",
    bio: [
      "I am Marthala Surendar Reddy (MSR), a Computer Science and Engineering undergraduate at KL University with an unwavering passion for software craftsmanship. My focus spans core Java backend engineering, full-stack web architectures, and algorithmic problem solving.",
      "I believe in building software that balances computational rigor with clean, intuitive design. Whether designing RESTful microservices, optimizing relational and NoSQL database schemas, or building full-stack web platforms, I strive to write maintainable, production-ready code.",
      "Driven by continuous learning, I actively solve challenges on LeetCode and contribute to open-source projects on GitHub, aiming to create real-world technological impact."
    ],
    stats: [
      { label: "DSA Problems", value: "150+" },
      { label: "Projects Built", value: "8+" },
      { label: "Hackathons", value: "3+" },
      { label: "Expected Grad", value: "2028" }
    ],
    availableForWork: true
  },

  academicJourney: [
    {
      year: "Year 4 · 2027 – 2028",
      title: "Advanced Systems, Capstone & Graduation",
      desc: "Architecting cloud-native distributed systems, completing senior capstone engineering projects, and transitioning into full-time software engineering roles."
    },
    {
      year: "Year 3 · 2026 – 2027",
      title: "Full Stack & Cloud Architecture",
      desc: "Deepening expertise in Spring Boot microservices, Docker containerization, AWS cloud infrastructure, and large-scale web systems."
    },
    {
      year: "Year 2 · 2025 – 2026",
      title: "Web Platforms, Databases & Hackathons",
      desc: "Building production React web applications with Firebase, designing relational schemas in MySQL/PostgreSQL, and competing in state & national hackathons."
    },
    {
      year: "Year 1 · 2024 – 2025",
      title: "Foundations, Data Structures & Java",
      desc: "Enrolled in B.Tech Computer Science at KL University. Mastered core Java, Object-Oriented Programming, algorithmic problem solving, and version control."
    }
  ],

  skills: [
    // Programming Languages
    { id: "sk-1", name: "Java", category: "Programming Languages", proficiency: 90, icon: "Code", isSample: true, displayOrder: 1 },
    { id: "sk-2", name: "Python", category: "Programming Languages", proficiency: 85, icon: "Terminal", isSample: true, displayOrder: 2 },
    { id: "sk-3", name: "C", category: "Programming Languages", proficiency: 80, icon: "Cpu", isSample: true, displayOrder: 3 },
    { id: "sk-4", name: "C++", category: "Programming Languages", proficiency: 82, icon: "Binary", isSample: true, displayOrder: 4 },
    { id: "sk-5", name: "JavaScript (ES6+)", category: "Programming Languages", proficiency: 88, icon: "FileCode", isSample: true, displayOrder: 5 },
    { id: "sk-6", name: "Data Structures & Algorithms", category: "Programming Languages", proficiency: 86, icon: "GitFork", isSample: true, displayOrder: 6 },

    // Backend & Cloud
    { id: "sk-7", name: "Spring Boot", category: "Backend & Cloud", proficiency: 82, icon: "Server", isSample: true, displayOrder: 7 },
    { id: "sk-8", name: "Node.js", category: "Backend & Cloud", proficiency: 80, icon: "Layers", isSample: true, displayOrder: 8 },
    { id: "sk-9", name: "MySQL", category: "Backend & Cloud", proficiency: 85, icon: "Database", isSample: true, displayOrder: 9 },
    { id: "sk-10", name: "PostgreSQL", category: "Backend & Cloud", proficiency: 80, icon: "Database", isSample: true, displayOrder: 10 },
    { id: "sk-11", name: "Firebase (Firestore, Auth, Storage)", category: "Backend & Cloud", proficiency: 90, icon: "Flame", isSample: true, displayOrder: 11 },
    { id: "sk-12", name: "AWS Cloud Basics", category: "Backend & Cloud", proficiency: 75, icon: "Cloud", isSample: true, displayOrder: 12 },
    { id: "sk-13", name: "Docker Containerization", category: "Backend & Cloud", proficiency: 74, icon: "Box", isSample: true, displayOrder: 13 },

    // Frontend & Tools
    { id: "sk-14", name: "React.js", category: "Frontend & Tools", proficiency: 88, icon: "Layout", isSample: true, displayOrder: 14 },
    { id: "sk-15", name: "HTML5 & Modern CSS", category: "Frontend & Tools", proficiency: 92, icon: "Code2", isSample: true, displayOrder: 15 },
    { id: "sk-16", name: "Tailwind CSS", category: "Frontend & Tools", proficiency: 90, icon: "Palette", isSample: true, displayOrder: 16 },
    { id: "sk-17", name: "Git & GitHub", category: "Frontend & Tools", proficiency: 88, icon: "GitBranch", isSample: true, displayOrder: 17 },
    { id: "sk-18", name: "Postman API Testing", category: "Frontend & Tools", proficiency: 85, icon: "Send", isSample: true, displayOrder: 18 },
    { id: "sk-19", name: "Linux & Bash", category: "Frontend & Tools", proficiency: 78, icon: "TerminalSquare", isSample: true, displayOrder: 19 }
  ],

  projects: [
    {
      id: "proj-1",
      title: "Algorithmic Code Arena",
      level: "Advanced",
      description: "A full-stack algorithmic challenge platform supporting problem solving, test runner execution, and real-time execution statistics.",
      problem: "Students and developers needed an uncluttered, responsive platform to practice core data structures and algorithmic patterns with immediate feedback.",
      solution: "Engineered a responsive web client with a secure code execution runner, tracking problem completion and runtime complexity analysis.",
      techUsed: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker"],
      tags: ["Full Stack", "Data Structures", "Java", "Docker"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/SURENDAR30392",
      liveUrl: "https://github.com/SURENDAR30392",
      featured: true,
      displayOrder: 1,
      isSample: true,
      published: true
    },
    {
      id: "proj-2",
      title: "Campus Resource Management Portal",
      level: "Advanced",
      description: "A centralized cloud portal for academic resource distribution, event scheduling, and student departmental coordination at KL University.",
      problem: "Departmental announcements and educational resources were scattered across multiple unofficial messaging channels.",
      solution: "Developed an authenticated portal with role-based access control, real-time Firestore database synchronization, and file storage.",
      techUsed: ["React", "Firebase Firestore", "Authentication", "Tailwind CSS"],
      tags: ["Firebase", "React", "Cloud Firestore", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/SURENDAR30392",
      liveUrl: "https://github.com/SURENDAR30392",
      featured: true,
      displayOrder: 2,
      isSample: true,
      published: true
    },
    {
      id: "proj-3",
      title: "Enterprise Inventory & Order Backend",
      level: "Intermediate",
      description: "High-throughput RESTful inventory tracking service with ACID-compliant relational transactions and token-based authentication.",
      problem: "Businesses often suffer from inventory discrepancies and slow query responses during high traffic volume.",
      solution: "Built a structured Spring Boot REST API with connection pooling, JPA query optimization, and structured error responses.",
      techUsed: ["Java", "Spring Boot", "MySQL", "JWT", "REST APIs"],
      tags: ["Backend", "Java", "Spring Boot", "MySQL"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/SURENDAR30392",
      liveUrl: "https://github.com/SURENDAR30392",
      featured: true,
      displayOrder: 3,
      isSample: true,
      published: true
    },
    {
      id: "proj-4",
      title: "Smart Cloud Task Planner",
      level: "Intermediate",
      description: "A distraction-free task planner featuring offline synchronization, categorized project workspaces, and instant search.",
      problem: "Existing task management platforms are bloated with unnecessary widgets that distract from focused task completion.",
      solution: "Crafted a clean, high-performance web application emphasizing keyboard shortcuts, responsive UI, and persistent storage.",
      techUsed: ["React", "JavaScript", "HTML5", "CSS3", "Local Storage"],
      tags: ["Frontend", "React", "Productivity"],
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/SURENDAR30392",
      liveUrl: "https://github.com/SURENDAR30392",
      featured: false,
      displayOrder: 4,
      isSample: true,
      published: true
    },
    {
      id: "proj-5",
      title: "Distributed File Storage Utility",
      level: "Intermediate",
      description: "A secure file sharing microservice supporting chunked uploads, checksum validation, and expiring pre-signed URLs.",
      problem: "Transferring large binary assets securely between internal services requires robust checksumming and access expiry.",
      solution: "Implemented an authenticated storage service with AWS S3 / Firebase Storage integration and upload progress monitoring.",
      techUsed: ["Node.js", "Express", "Firebase Storage", "Docker"],
      tags: ["Cloud", "Storage", "Node.js"],
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/SURENDAR30392",
      liveUrl: "https://github.com/SURENDAR30392",
      featured: false,
      displayOrder: 5,
      isSample: true,
      published: true
    },
    {
      id: "proj-6",
      title: "Real-Time Collaborative Markdown Editor",
      level: "Intermediate",
      description: "Browser-based markdown documentation editor with live preview, syntax highlighting, and export capabilities.",
      problem: "Technical writers and programmers need a rapid, lightweight tool for drafting documentation with real-time preview.",
      solution: "Developed an accessible editor leveraging client-side rendering, KaTeX math parsing, and instant markdown serialization.",
      techUsed: ["React", "Tailwind CSS", "JavaScript"],
      tags: ["Frontend", "Tools", "Markdown"],
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/SURENDAR30392",
      liveUrl: "https://github.com/SURENDAR30392",
      featured: false,
      displayOrder: 6,
      isSample: true,
      published: true
    }
  ],

  education: [
    {
      id: "edu-1",
      institution: "KL University",
      degree: "B.Tech in Computer Science and Engineering",
      dates: "2024 – 2028 (Expected)",
      location: "Vijayawada, Andhra Pradesh, India",
      description: "Pursuing Bachelor of Technology in Computer Science and Engineering. Focusing on Data Structures & Algorithms, Object-Oriented Software Design in Java, Database Management Systems, and Cloud Computing.",
      highlights: [
        "Core Coursework: Data Structures, OOP with Java, Database Systems, Computer Networks",
        "Active member of departmental coding and technical forums",
        "Consistent academic performance and active hackathon participation"
      ],
      isSample: false
    }
  ],

  experience: [
    {
      id: "exp-1",
      role: "Student Software Developer",
      organization: "KL University Technical Labs",
      dates: "2024 – Present",
      location: "Andhra Pradesh, India",
      description: "Designing and developing web modules and algorithmic utilities as part of technical projects and academic practical labs.",
      isSample: true
    },
    {
      id: "exp-2",
      role: "Backend & Systems Intern (Placeholder)",
      organization: "Academic Internship Lab",
      dates: "2025 (Projected)",
      location: "Remote / Hybrid",
      description: "Placeholder record for forthcoming software engineering internship experiences. Editable via the Super Admin Dashboard.",
      isSample: true
    }
  ],

  certifications: [
    {
      id: "cert-1",
      title: "Java SE Programming & Object-Oriented Design",
      organization: "Oracle / Certified Academy (Placeholder)",
      date: "2025",
      credentialUrl: "https://github.com/SURENDAR30392",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      isSample: true,
      published: true
    },
    {
      id: "cert-2",
      title: "Data Structures & Algorithms in Java",
      organization: "LeetCode / HackerRank Verified",
      date: "2025",
      credentialUrl: "https://leetcode.com/u/kl_2400030392/",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      isSample: true,
      published: true
    },
    {
      id: "cert-3",
      title: "Full Stack Web Development with React & Node",
      organization: "Technical Learning Academy (Placeholder)",
      date: "2024",
      credentialUrl: "https://github.com/SURENDAR30392",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      isSample: true,
      published: true
    },
    {
      id: "cert-4",
      title: "Cloud Computing & DevOps Fundamentals",
      organization: "AWS Training & Certification (Placeholder)",
      date: "2025",
      credentialUrl: "https://github.com/SURENDAR30392",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      isSample: true,
      published: true
    }
  ],

  achievements: [
    {
      id: "ach-1",
      title: "150+ Problems Solved on LeetCode",
      organization: "LeetCode Competitive Programming",
      date: "2024 – Present",
      description: "Consistent problem solver across arrays, binary trees, dynamic programming, and graph algorithms on profile kl_2400030392.",
      isSample: false
    },
    {
      id: "ach-2",
      title: "University Hackathon Finalist",
      organization: "KL University Tech Fest",
      date: "2025",
      description: "Collaborated in a team of 4 to design and deploy a full-stack campus management prototype within 36 hours.",
      isSample: true
    },
    {
      id: "ach-3",
      title: "Open Source Repository Contributor",
      organization: "GitHub Community",
      date: "2024 – Present",
      description: "Maintains public development repositories on GitHub (SURENDAR30392) documenting clean code and algorithms.",
      isSample: false
    }
  ],

  testimonials: [
    {
      id: 1,
      quote: "Surendar demonstrates a solid grasp of core Java fundamentals and object-oriented architecture. His dedication to writing clean and organized code is evident in every lab assignment.",
      author: "Faculty Mentor",
      role: "Department of CSE, KL University"
    },
    {
      id: 2,
      quote: "Working alongside Surendar during project sprints has been fantastic. He quickly breaks down algorithmic bottlenecks and delivers responsive frontend components without hesitation.",
      author: "Hackathon Teammate",
      role: "KL University Peer Engineer"
    },
    {
      id: 3,
      quote: "A disciplined developer with strong problem-solving initiative. His consistent LeetCode practice and enthusiasm for cloud engineering make him a standout peer.",
      author: "Technical Club Lead",
      role: "Coding Club Member"
    }
  ],

  social: {
    linkedin: "https://www.linkedin.com/in/marthalasurendarreddy/",
    github: "https://github.com/SURENDAR30392",
    leetcode: "https://leetcode.com/u/kl_2400030392/",
    email: "marthalasurendarreddy@gmail.com",
    githubUsername: "SURENDAR30392",
    leetcodeUsername: "kl_2400030392"
  },

  settings: {
    seoTitle: "Marthala Surendar Reddy | Full Stack Developer | KL University",
    seoDescription: "Official developer portfolio of Marthala Surendar Reddy (MSR) — B.Tech Computer Science student at KL University specializing in Java, Backend, and Full Stack Development.",
    sectionsEnabled: {
      hero: true,
      work: true,
      about: true,
      skills: true,
      codingProfiles: true,
      honors: true,
      testimonials: true,
      contact: true
    },
    footerTagline: "Full-Stack Developer & B.Tech CSE Student building next-gen digital solutions.",
    copyrightText: `© ${new Date().getFullYear()} Marthala Surendar Reddy. All rights reserved.`
  },

  resume: {
    url: "/resume.pdf",
    enabled: true,
    lastUpdated: "November 2026",
    filename: "Marthala_Surendar_Reddy_Resume.pdf"
  },

  messages: []
};

