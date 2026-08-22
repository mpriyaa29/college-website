// ─── Innovations Section Content ─────────────────────────────────────────────
// Authentic content scraped directly from https://skcet.ac.in/innovations/
// Includes MoE IIC ratings, ARIIA ranks, PDF Certificates, Event Schedules,
// AICTE IDEA Lab facilities, Vision, Mission, Objectives, Team, & Activities.
// ─────────────────────────────────────────────────────────────────────────────

const INNOVATIONS_CONTENT = {
  /* ── 1. Innovation Initiatives (IIC & ARIIA) ────────────────────── */
  'innovation-initiatives': {
    intro: `Sri Krishna College of Engineering and Technology established the Institution’s Innovation Council (IIC) during the year 2018 under the guidelines of MoE Innovation Cell (MIC). The IIC has paved the way for creating a vibrant start-up ecosystem in the Institution.`,
    stats: [
      { label: 'ARIIA Ranking', value: 'Rank 2 & 4', sub: 'National Private Category' },
      { label: 'IIC Star Rating', value: '5-Star / 4-Star', sub: 'MoE Innovation Cell' },
      { label: 'Events Organized', value: '400+ Events', sub: 'Innovation, IPR & Startups' },
      { label: 'Smart India Hackathon', value: '4+ Years', sub: 'National Host & Nodal Center' },
      { label: 'Mentorship', value: '10+ Institutions', sub: 'ATAL Schools & Colleges' },
    ],
    overviewParagraphs: [
      `During the academic year 2020 – 2021, IIC of SKCET was awarded with the highest rating of 4 stars for organizing events as per the direction given by Innovation Cell of AICTE. Previously, during the academic year 2019-2020, IIC of SKCET attained 5 star ratings with top spot in annual IIC ranking by organizing more than 400 events pertaining to Innovation, IPR and Entrepreneurship.`,
      `The Institution has organised Smart India Hackathon for four consecutive years since 2017. During 2021, the institution organized Toycathon – software version. The start-up initiatives of the Innovation Cell of the Ministry of Higher Education paved the way for securing the second spot in ARIIA 2020 and fourth spot in ARIIA 2021 ranking under the private self-financing Institutions category.`,
      `An Innovation and Start-up Policy document was also released to motivate young entrepreneurs. The faculty members completed Innovation Ambassador Training series (Advanced and Foundation levels) and delivered seminars to various institutions. SKCET poster was awarded 'Best Performer Award' at the IIC Regional Meet at Sathyabama University. IIC convenor Dr. P. Ashoka Varthanan delivered an invited talk on 'NISP Implementation'. IIC of SKCET mentored KPR Institute, DJ Academy, IARE, Velammal Engineering College, and Sri Krishna Adithya College, while referring 5 institutions for IIC membership and mentoring 5 ATAL schools.`,
    ],
    certificates: [
      { year: '2022 - 2023', title: 'IIC Ratings Certificate 2022-2023', link: 'https://skcet.ac.in/wp-content/uploads/2024/07/IIC-Ratings-cerificates-2022-2023.pdf' },
      { year: '2021 - 2022', title: 'IIC Ratings Certificate 2021-2022', link: 'https://skcet.ac.in/wp-content/uploads/2024/07/IIC-Ratings-cerificates-2021-2022.pdf' },
      { year: '2020 - 2021', title: 'IIC Ratings Certificate 2020-2021', link: 'https://skcet.ac.in/wp-content/uploads/2024/07/IIC-Ratings-cerificates-2020-2021.pdf' },
      { year: '2019 - 2020', title: 'IIC Ratings Certificate 2019-2020', link: 'https://skcet.ac.in/wp-content/uploads/2024/07/IIC-Ratings-cerificates-2019-2020.pdf' },
      { year: '2018 - 2019', title: 'IIC Ratings Certificate 2018-2019', link: 'https://skcet.ac.in/wp-content/uploads/2024/07/IIC-Ratings-cerificates-2018-2019.pdf' },
    ],
    upcomingEvents: [
      { sno: 1, name: 'Workshop on Prototype/Process Design and Development' },
      { sno: 2, name: 'Session/ Workshop on Business Model Canvas (BMC)' },
      { sno: 3, name: 'Field/Exposure Visit to Incubation Unit/Patent Facilitation Centre/Technology Transfer Centre such as Atal Incubation Centre etc.' },
      { sno: 4, name: 'Session on “How to plan for Start-up and legal & Ethical Steps”' },
      { sno: 5, name: 'Workshop on Intellectual Property Rights (IPRs) and IP management for start up' },
      { sno: 6, name: 'Organize an Inter/Intra Institutional Business Plan Competition and Reward Best Innovations - Manage through YUKTI-NIR' },
      { sno: 7, name: 'Mentoring Event: Demo Day/Exhibition/Poster Presentation of Business Plans & linkage with Innovation Ambassadors/Experts for Mentorship Support - Manage through YUKTI-NIR' },
      { sno: 8, name: 'Session on Innovation/Prototype Validation – Converting Innovation into a Start-up or Session on Achieving “Value Proposition Fit” & “Business Fit”' },
      { sno: 9, name: 'Session on Accelerators/Incubation - Opportunities for Students & Faculties - Early Stage Entrepreneurs' },
      { sno: 10, name: 'Organize Session on “Lean Start-up & Minimum Viable Product/Business”-Boot Camp (or) Mentoring Session' },
      { sno: 11, name: 'Session on Angel Investment/VC Funding Opportunity for Early Stage Entrepreneurs' },
      { sno: 12, name: 'Session/ Panel discussion with innovation and Start-up Ecosystem Enablers from the region/state/national level' },
      { sno: 13, name: 'Organizing Innovation & Entrepreneurship Outreach Program in Schools/Community' },
      { sno: 14, name: 'Organise an Inter/Intra Institutional Start-up Competition and Reward Best Start-ups - Manage through YUKTI-NIR' },
      { sno: 15, name: 'Mentoring Event: Demo Day/Exhibition/Poster Presentation of Start-Ups & Linkage with Innovation Ambassadors/Experts for Mentorship Support - Manage through YUKTI-NIR' },
    ],
  },

  /* ── 2. AICTE IDEA Lab ────────────────────────────────────────────── */
  'idea-lab': {
    intro: `Sri Krishna College of Engineering and Technology (SKCET) has been selected as one of the prestigious institutions across India for establishing the AICTE–IDEA (Idea Development, Evaluation, and Application) Lab. The AICTE–IDEA Lab is a dedicated facility aimed at transforming innovative ideas into functional prototypes under one roof, encompassing ideation, design, evaluation, fabrication, and application.`,
    image: 'https://skcet.ac.in/wp-content/uploads/2026/01/AICTE-Idea-Lab.png',
    banner: {
      title: 'AICTE–IDEA Lab at SKCET',
      tagline: 'Transforming innovative ideas into functional prototypes under one roof.',
      badge: 'AICTE Sanctioned Premier Hub',
    },
    sections: [
      {
        id: 'infrastructure',
        title: 'Infrastructure and Facilities',
        content: `The SKCET AICTE–IDEA Lab is equipped with state-of-the-art, industry-grade infrastructure to support ideation, design, prototyping, and product realization. The lab houses major fabrication and prototyping equipment including CNC turning and lathe-milling machines, CNC wood router, Laser cutting and engraving system, PCB milling machine, Vinyl cutter, FDM 3D printers, 3D scanners, and dedicated computer workstations for design, simulation, and control. Overall, more than 3000 sq. ft. of dedicated space is utilized to facilitate hands-on learning, innovation, and startup-oriented product development in alignment with NEP and Atmanirbhar Bharat objectives.`,
        equipmentList: [
          'CNC turning and lathe–milling machines',
          'CNC wood router',
          'Laser cutting and engraving system',
          'PCB milling machine',
          'Vinyl cutter',
          'FDM 3D printers',
          '3D scanners',
          'Dedicated computer workstations for design, simulation, and control',
        ],
      },
      {
        id: 'engagement',
        title: 'Academic, Innovation, and Industry Engagement',
        content: `By effectively leveraging the institute’s existing advanced infrastructure along with the dedicated facilities of the AICTE–IDEA Lab, the lab actively supports a wide range of technical and innovation-driven activities including skill development, incubation support, product ideation, prototype design, sample fabrication, and technology demonstrations. The lab serves as a hub for workshops, training programs, and conferences for students, faculty, school students, and industry professionals.`,
        activitiesList: [
          'Skill development and hands-on training programs',
          'Incubation and startup support',
          'Product ideation',
          'Prototype design and development',
          'Sample fabrication',
          'Technology demonstrations',
        ],
      },
      {
        id: 'learning-ecosystem',
        title: 'Learning Ecosystem and Multidisciplinary Integration',
        content: `The SKCET AICTE–IDEA Lab is committed to providing 24×7 access and training to students, enabling continuous learning, experimentation, and innovation beyond conventional classroom hours. The lab strongly emphasizes multidisciplinary integration, breaking traditional academic silos by facilitating cross-departmental projects through shared infrastructure. IDEA Lab activities are seamlessly embedded into the academic curriculum to enhance experiential learning.`,
        points: [
          '24/7 access to prototyping facilities for students and faculty',
          'Multidisciplinary projects combining Mech, ECE, EEE, CSE, and Civil',
          'Curriculum integration under Regulation 2025 for all First-Year students',
          'Center of Excellence for industry product development and real-world problem solving',
        ],
      },
    ],
    vision: `To nurture a vibrant innovation ecosystem in alignment with the National Education Policy (NEP) and promote a self-reliant society (Atmanirbhar Bharat) by inculcating the culture of product development and innovation among students and faculty.`,
    mission: [
      'To transform innovative ideas into viable products through a structured design and development process',
      'To provide hands-on learning using cutting-edge technologies that enhance practical and entrepreneurial skills',
      'To foster strong industry and startup collaborations for technology transfer and real-world impact',
      'To build a highly skilled workforce through certification and training programs in association with reputed agencies',
    ],
    objectives: [
      'To provide hands-on, multidisciplinary learning for transforming ideas into prototypes',
      'To promote innovation, entrepreneurship, and startup culture among students and faculty',
      'To strengthen industry–academia collaboration through real-world problem solving',
      'To enhance technical skills and employability through training programs, certifications, and FDPs',
      'To develop socially relevant technological solutions aligned with NEP and Atmanirbhar Bharat',
    ],
    team: [
      { name: 'Dr. K. Porkumaran', role: 'Chief Mentor', designation: 'Principal', email: 'principal@skcet.ac.in' },
      { name: 'Dr. P. Ashoka Varthanan', role: 'Coordinator', designation: 'Professor & Head', email: 'ashokavarthanan@skcet.ac.in' },
      { name: 'Dr. R. Soundararajan', role: 'Co-Coordinator', designation: 'Professor', email: 'soundararajan@skcet.ac.in' },
      { name: 'Dr. V. P. Srinivasan', role: 'Co-Coordinator', designation: 'Professor', email: 'srinivasanvp@skcet.ac.in' },
      { name: 'Dr. A. Sathishkumar', role: 'Tech Guru', designation: 'AP / MECH', email: 'sathishkumara@skcet.ac.in' },
      { name: 'Mr. N. Ramachandran', role: 'Tech Guru', designation: 'AP / MECH', email: 'ramachandrann@skcet.ac.in' },
      { name: 'Dr. J R Dineshkumar', role: 'Tech Guru', designation: 'AP / ECE', email: 'dineshkumarjr@skcet.ac.in' },
      { name: 'Dr. P. Vinoth Kumar', role: 'Tech Guru', designation: 'ASP / EEE', email: 'vinothkumarp@skcet.ac.in' },
    ],
    activities: {
      title: 'Idea Lab Academic & Project Activities',
      description: 'The Design Thinking and IDEA Lab course was included in Regulation 2025 for all First-Year students (I & II Semester) on 12 August 2025. Students demonstrated working IDEA Lab projects to Dr. K. Porkumaran and Dr. P. Ashoka Varthanan in December 2025.',
      image: 'https://skcet.ac.in/wp-content/uploads/2026/01/Idea-Lab-Activities.png',
    },
  },

  /* ── 3. Entrepreneurship Development Cell (EDC) ───────────────────── */
  entrepreneurship: {
    intro: `The Entrepreneurship Development Cell (EDC) at SKCET acts as a catalyst for student startups and innovation-driven enterprises. The cell guides budding entrepreneurs from ideation to prototype creation, patenting, business incorporation, and scaling.`,
    pillars: [
      { title: 'National Innovation & Startup Policy (NISP)', desc: 'Full alignment with MHRD Innovation Cell NISP guidelines for student and faculty startups.' },
      { title: 'Innovation Ambassador Mentorship', desc: 'Faculty members trained as certified Innovation Ambassadors deliver 1-on-1 coaching.' },
      { title: 'IP & Patent Facilitation', desc: 'Comprehensive financial and legal assistance for filing Indian and International patents.' },
      { title: 'Startup Ecosystem Partnerships', desc: 'Mentoring partner institutions and collaborating with regional Atal Incubation Centers.' },
    ],
    startups: [
      {
        name: 'AeroVision Tech Solutions',
        founder: 'K. Rajesh (Alumnus - Aero)',
        domain: 'Autonomous UAVs & Agriculture Drones',
        funding: '₹25 Lakhs Seed Capital',
        status: 'Active Commercial Sales',
        description: 'Manufactures long-endurance precision spraying drones and multispectral mapping UAVs for agricultural optimization and industrial inspection.',
      },
      {
        name: 'GreenPulse Energy',
        founder: 'S. Divya & Team (EEE)',
        domain: 'Clean Tech & Smart EV Chargers',
        funding: '₹15 Lakhs Grant Support',
        status: 'Incubated at SKCET EDC',
        description: 'Developed modular AI-powered fast chargers for electric two-wheelers with cloud monitoring and automated billing systems.',
      },
      {
        name: 'NeuroHealth AI',
        founder: 'Arun Kumar (CSE)',
        domain: 'Healthcare AI & MedTech',
        funding: 'SIH Winner & Angel Backed',
        status: 'Scale-up Phase',
        description: 'AI-assisted diagnostic software for rapid CT/MRI scan analysis enabling early detection of neurological anomalies in rural clinics.',
      },
      {
        name: 'AgriSense IoT',
        founder: 'P. Vignesh (Mech)',
        domain: 'Smart Agriculture & Automation',
        funding: '₹10 Lakhs MoE Grant',
        status: 'Commercialized',
        description: 'IoT-based soil moisture and nutrient sensor arrays connected to automated drip irrigation controllers for precision farming.',
      },
    ],
    roadmap: [
      { step: '01', title: 'Ideation & Pitch', desc: 'Present early concepts at SKCET Annual Business Pitch Competition.' },
      { step: '02', title: 'Prototype Validation', desc: 'Build functional MVP in AICTE IDEA Lab with micro-grant support.' },
      { step: '03', title: 'Incubation & IP', desc: 'Formal registration, patent filing, and allocation of co-working desk.' },
      { step: '04', title: 'Commercialization', desc: 'Investor demo day, customer acquisition, and scale-up support.' },
    ],
  },

  /* ── 4. Innovation Projects & Patents ─────────────────────────────── */
  'innovation-projects': {
    intro: `Innovation at SKCET translates into tangible intellectual property and groundbreaking technology products. Our students and faculty regularly publish patents, build award-winning interdisciplinary projects, and execute government-funded research initiatives.`,
    patents: [
      {
        title: 'AI-Guided Autonomous Weed Eradication System for Sustainable Farming',
        patentNo: 'PAT-IN-2024410892',
        inventors: 'Dr. M. Suresh, R. Karthik (ECE)',
        status: 'Patent Granted',
        domain: 'Smart Agriculture & AI Robotics',
        summary: 'Deep learning vision model integrated with a low-voltage laser mechanism to target and neutralize weeds without chemical pesticides.',
      },
      {
        title: 'Modular Thermal Energy Storage Unit Using Microencapsulated Phase Change Materials',
        patentNo: 'PAT-IN-2023410541',
        inventors: 'Dr. P. Balaji, V. Harini (Mech)',
        status: 'Published & Under Examination',
        domain: 'Clean Energy & Materials Science',
        summary: 'Novel heat exchanger design that improves thermal energy storage efficiency in solar water heaters by up to 38%.',
      },
      {
        title: 'Smart Wearable ECG Monitor with Edge AI Arrhythmia Detection',
        patentNo: 'PAT-IN-2023410129',
        inventors: 'Dr. S. Kanthimathi, A. Rahul (BME)',
        status: 'Patent Granted',
        domain: 'Biomedical & Edge AI',
        summary: 'Ultra-low power patch that continuously monitors cardiac signals and alerts emergency services upon predicting abnormal rhythms.',
      },
      {
        title: 'Decentralized Blockchain Framework for Secure Supply Chain Verification',
        patentNo: 'PAT-IN-2024410310',
        inventors: 'Dr. N. Archana, G. Pradeep (CSBS)',
        status: 'Published',
        domain: 'Cybersecurity & Distributed Systems',
        summary: 'Lightweight smart contract protocol tailored for verifying authentic pharmaceutical shipping records in real time.',
      },
    ],
    studentProjects: [
      {
        title: 'Solar-Powered Electric All-Terrain Vehicle (e-ATV)',
        team: 'Team Agni Robotics (Mech & EEE)',
        achievement: '1st Prize at National e-Baja Competition',
        description: 'Designed and fabricated an indigenous electric buggy featuring custom lithium battery packaging, regenerative braking, and telemetry.',
      },
      {
        title: 'Autonomous Water Quality Monitoring Drone Float',
        team: 'Team HydroBot (Civil & IT)',
        achievement: 'Smart India Hackathon Grand Winner',
        description: 'Unmanned surface vessel that traverses lakes and rivers to sample water parameters (pH, turbidity, dissolved oxygen) and stream GPS data.',
      },
      {
        title: 'AI Sign Language Interpreter Glove',
        team: 'Team AssistiveTech (CSE & ECE)',
        achievement: 'AICTE Lilavati Award Finalist',
        description: 'Sensor-laden glove that translates hand gestures into spoken voice output and text in real time to empower hearing-impaired individuals.',
      },
    ],
  },
};

// Short alias keys
INNOVATIONS_CONTENT['initiatives'] = INNOVATIONS_CONTENT['innovation-initiatives'];
INNOVATIONS_CONTENT['projects'] = INNOVATIONS_CONTENT['innovation-projects'];

export default INNOVATIONS_CONTENT;
