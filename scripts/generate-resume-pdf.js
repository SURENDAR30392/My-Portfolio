import fs from 'fs';
import path from 'path';

function createResumePdf() {
  const lines = [
    // Header
    { font: '/F2', size: 20, x: 50, y: 790, text: 'MARTHALA SURENDAR REDDY' },
    { font: '/F1', size: 11, x: 50, y: 772, text: 'B.Tech Computer Science & Engineering | KL University (2024 - 2028)' },
    { font: '/F1', size: 9, x: 50, y: 756, text: 'Email: marthalasurendarreddy@gmail.com | Location: Andhra Pradesh, India' },
    { font: '/F1', size: 9, x: 50, y: 742, text: 'LinkedIn: in/marthalasurendarreddy | GitHub: github.com/SURENDAR30392' },
    { font: '/F1', size: 9, x: 50, y: 728, text: 'LeetCode: leetcode.com/u/kl_2400030392/ | CodeChef: codechef.com/users/kl2400030392' },

    // Section: Professional Summary
    { font: '/F2', size: 12, x: 50, y: 700, text: 'PROFESSIONAL SUMMARY' },
    { font: '/F1', size: 9.5, x: 50, y: 684, text: 'Motivated Computer Science and Engineering undergraduate at KL University with strong foundations in' },
    { font: '/F1', size: 9.5, x: 50, y: 670, text: 'Java backend engineering, Data Structures & Algorithms, and full-stack web applications using React & Firebase.' },
    { font: '/F1', size: 9.5, x: 50, y: 656, text: 'Passionate about designing scalable, maintainable architectures and active in competitive programming.' },

    // Section: Education
    { font: '/F2', size: 12, x: 50, y: 628, text: 'EDUCATION' },
    { font: '/F2', size: 10, x: 50, y: 612, text: 'KL University, Vijayawada, Andhra Pradesh, India' },
    { font: '/F1', size: 9.5, x: 50, y: 598, text: 'Bachelor of Technology (B.Tech) in Computer Science and Engineering | 2024 - 2028 (Expected)' },
    { font: '/F1', size: 9, x: 50, y: 584, text: 'Core Coursework: Data Structures & Algorithms, Object-Oriented Programming in Java, DBMS, Operating Systems' },

    // Section: Technical Skills
    { font: '/F2', size: 12, x: 50, y: 556, text: 'TECHNICAL SKILLS' },
    { font: '/F2', size: 9.5, x: 50, y: 540, text: 'Programming Languages: ' },
    { font: '/F1', size: 9.5, x: 180, y: 540, text: 'Java (Core & Advanced), Python, C, C++, JavaScript (ES6+), SQL' },
    { font: '/F2', size: 9.5, x: 50, y: 524, text: 'Frameworks & Web: ' },
    { font: '/F1', size: 9.5, x: 180, y: 524, text: 'React.js, Spring Boot, Node.js, Express, HTML5, Modern CSS, Tailwind CSS' },
    { font: '/F2', size: 9.5, x: 50, y: 508, text: 'Databases & Cloud: ' },
    { font: '/F1', size: 9.5, x: 180, y: 508, text: 'MySQL, PostgreSQL, Firebase (Firestore, Auth), AWS Cloud Basics, Docker' },
    { font: '/F2', size: 9.5, x: 50, y: 492, text: 'Developer Tools: ' },
    { font: '/F1', size: 9.5, x: 180, y: 492, text: 'Git, GitHub, Postman, Linux/Bash, VS Code, IntelliJ IDEA' },

    // Section: Projects
    { font: '/F2', size: 12, x: 50, y: 464, text: 'KEY TECHNICAL PROJECTS' },
    { font: '/F2', size: 10, x: 50, y: 448, text: 'Algorithmic Code Arena | Java, Spring Boot, React, PostgreSQL, Docker' },
    { font: '/F1', size: 9, x: 50, y: 434, text: '- Built full-stack coding platform supporting real-time problem submissions and algorithmic runtime analysis.' },
    { font: '/F1', size: 9, x: 50, y: 420, text: '- Designed containerized execution runner and optimized PostgreSQL queries for leaderboard retrieval.' },

    { font: '/F2', size: 10, x: 50, y: 398, text: 'Campus Resource Management Portal | React, Firebase Firestore, Tailwind CSS' },
    { font: '/F1', size: 9, x: 50, y: 384, text: '- Developed an authenticated academic portal with role-based access control and real-time database synchronization.' },
    { font: '/F1', size: 9, x: 50, y: 370, text: '- Deployed production web client serving course announcements and study materials with 99% uptime.' },

    { font: '/F2', size: 10, x: 50, y: 348, text: 'Enterprise Inventory & Order Backend | Java, Spring Boot, MySQL, REST APIs, JWT' },
    { font: '/F1', size: 9, x: 50, y: 334, text: '- Architected high-throughput RESTful microservices managing inventory items and transactional order processing.' },
    { font: '/F1', size: 9, x: 50, y: 320, text: '- Implemented JWT authentication, HikariCP connection pooling, and ACID-compliant relational schemas.' },

    // Section: Certifications & Competitive Programming
    { font: '/F2', size: 12, x: 50, y: 292, text: 'HONORS, CERTIFICATIONS & COMPETITIVE CODING' },
    { font: '/F2', size: 9.5, x: 50, y: 276, text: 'LeetCode Active Solver: ' },
    { font: '/F1', size: 9.5, x: 175, y: 276, text: '200+ DSA problems solved across Arrays, Trees, Dynamic Programming, and Graphs' },
    { font: '/F2', size: 9.5, x: 50, y: 260, text: 'CodeChef Competitor: ' },
    { font: '/F1', size: 9.5, x: 175, y: 260, text: 'Regular participant in Division Contests (Username: kl2400030392)' },
    { font: '/F2', size: 9.5, x: 50, y: 244, text: 'Java SE Programming: ' },
    { font: '/F1', size: 9.5, x: 175, y: 244, text: 'Comprehensive Object-Oriented Software Design & Functional Programming' },
    { font: '/F2', size: 9.5, x: 50, y: 228, text: 'Web Architecture: ' },
    { font: '/F1', size: 9.5, x: 175, y: 228, text: 'Modern Full-Stack Applications with React and Cloud Firestore' }
  ];

  // Build stream content
  let stream = 'q\n';

  // Add decorative line under header
  stream += '0.06 0.46 0.43 rg\n'; // #0F766E
  stream += '50 718 495 1.5 re f\n';
  stream += '50 644 495 0.75 re f\n';
  stream += '50 572 495 0.75 re f\n';
  stream += '50 480 495 0.75 re f\n';
  stream += '50 308 495 0.75 re f\n';
  stream += '0 0 0 rg\n'; // reset color to black

  lines.forEach(l => {
    // Escape parens and backslashes
    const escaped = l.text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    // If it's a section heading, use teal color
    if (l.size === 12) {
      stream += '0.06 0.46 0.43 rg\n';
    } else {
      stream += '0.06 0.16 0.15 rg\n'; // dark slate #102A28
    }
    stream += `BT\n${l.font} ${l.size} Tf\n1 0 0 1 ${l.x} ${l.y} Tm\n(${escaped}) Tj\nET\n`;
  });
  stream += 'Q\n';

  const streamLength = Buffer.byteLength(stream, 'latin1');

  const objects = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  objects.push(`3 0 obj\n<<\n  /Type /Page\n  /Parent 2 0 R\n  /MediaBox [0 0 595.28 841.89]\n  /Resources <<\n    /Font <<\n      /F1 4 0 R\n      /F2 5 0 R\n    >>\n  >>\n  /Contents 6 0 R\n>>\nendobj\n`);
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n');
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n');
  objects.push(`6 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}endstream\nendobj\n`);

  let fileContent = '%PDF-1.4\n%âãÏÓ\n';
  const offsets = [];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(fileContent, 'latin1'));
    fileContent += objects[i];
  }

  const xrefOffset = Buffer.byteLength(fileContent, 'latin1');
  fileContent += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;

  for (let i = 0; i < offsets.length; i++) {
    const offStr = String(offsets[i]).padStart(10, '0');
    fileContent += `${offStr} 00000 n \n`;
  }

  fileContent += `trailer\n<<\n  /Size ${objects.length + 1}\n  /Root 1 0 R\n>>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'resume.pdf');
  fs.writeFileSync(outputPath, fileContent, 'latin1');
  console.log('Successfully created valid resume PDF at:', outputPath, 'Bytes:', fs.statSync(outputPath).size);
}

createResumePdf();
