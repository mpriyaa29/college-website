// ─── Autonomous Examination Cell Data Model ──────────────────────────────────
// Official Examination Domains, Regulations, Downloadable PDF Forms, Timetables, Hall Tickets & Results
// ─────────────────────────────────────────────────────────────────────────────

export const EXAM_DOMAINS = [
  {
    id: 'regulations',
    label: 'Regulations',
    icon: 'BookOpen',
    path: '/exams/regulations',
    badge: 'Autonomous',
    description: 'Academic rules, curriculum frameworks, CBCS grading systems, and credit guidelines.',
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: 'FileText',
    path: '/exams/forms',
    badge: 'Official PDFs',
    description: 'Official COE application forms for examination withdrawal, transcripts, condonation, and Ph.D registration.',
  },
  {
    id: 'hall-ticket',
    label: 'Hall Ticket',
    icon: 'CreditCard',
    path: '/exams/hall-ticket',
    badge: 'Live Portal',
    description: 'Download and verify official End Semester Autonomous Examination Hall Tickets.',
  },
  {
    id: 'timetable',
    label: 'Timetable',
    icon: 'Calendar',
    path: '/exams/timetable',
    badge: 'Apr / May 2026',
    description: 'Consolidated examination schedules for UG, PG, and Ph.D regular and arrear examinations.',
  },
  {
    id: 'results',
    label: 'Results',
    icon: 'Award',
    path: '/exams/results',
    badge: 'Autonomous COE',
    description: 'Semester-wise online results, grade statements, CGPA calculation, and revaluation portal.',
  },
  {
    id: 'arrear-application',
    label: 'Arrear Application',
    icon: 'RotateCcw',
    path: '/exams/arrear-application',
    badge: 'Registration',
    description: 'Apply for supplementary/arrear examination papers, calculate fee dues, and generate challan.',
  },
];

// ─── Official Examination PDF Forms matching uploaded scanned documents ─────
export const EXAM_FORMS = [
  {
    id: 'withdrawal-form',
    code: 'COE-FORM-01',
    title: 'Application for Withdrawal from End Semester Examinations',
    category: 'Examination Exemption',
    pages: 1,
    fileSize: '142 KB',
    description: 'Official application for candidates seeking formal withdrawal from end semester examinations due to valid reasons.',
    instructions: [
      'Fill candidate details in CAPITAL letters.',
      'Attach valid medical certificate or proof of emergency.',
      'Note: Student having standing or history of Arrear is NOT eligible for withdrawal from examination.',
      'Requires recommendations from Class Tutor, HOD, and final approval from the Principal.',
    ],
    fields: [
      'Name of the Candidate (in CAPITAL letters)',
      'Register Number',
      'Programme of Study (B.E / B.Tech / M.E / M.Tech / MBA)',
      'Branch & Period of Study',
      'Current Semester & Month / Year of Examination',
      'CGPA till last Semester',
      'History of Arrears (Yes / No)',
      'Reason for Withdrawal (Proof to be attached)',
      'Subject Details & Codes',
      'Mobile Number & Candidate / Parent Signatures',
      'Approvals: Tutor → Head of the Department → Principal',
    ],
  },
  {
    id: 'transcript-form',
    code: 'COE-FORM-02',
    title: 'Application for the Issue of Transcripts',
    category: 'Academic Records',
    pages: 1,
    fileSize: '128 KB',
    description: 'Official requisition form for obtaining certified, sealed autonomous academic grade transcripts for higher studies and verification.',
    instructions: [
      'Attach photocopy of the Consolidated Grade Sheet / Semester Grade Sheets.',
      'Attach official Bank Challan copy towards transcript processing fee.',
      'Processed by Deputy Controller of Examinations (DCOE) and certified by Controller of Examinations (COE).',
    ],
    fields: [
      'Candidate Name & Register Number',
      'Branch of Study & Year of Study',
      'Communication Address',
      'Number of Transcripts Required',
      'Contact Mobile Number',
      'Payment Details (Bank Challan No, Date, Amount Paid)',
      'Enclosures: Grade Sheets + Bank Challan',
      'Official Endorsements: Signature of DCOE & Signature of COE',
    ],
  },
  {
    id: 'condonation-form',
    code: 'COE-FORM-03',
    title: 'Application for Condonation of Shortage of Attendance',
    category: 'Attendance & Eligibility',
    pages: 2,
    fileSize: '210 KB',
    description: 'Prescribed 2-page application for condoning genuine shortage of attendance (between 65% and 74%) for end semester exams.',
    instructions: [
      'The candidates are instructed to fill up the details and reason for absence in the prescribed format.',
      'Page 2 contains the day-wise breakdown table of absence dates and medical / emergency reasons.',
      'Pay the requisite Condonation Fee at the accounts section.',
      'Verification by Faculty Advisor, recommendation of HOD, and decision by Principal.',
    ],
    fields: [
      'Year of Admission, Month & Year (Apr / Oct)',
      'Degree: B.E / B.Tech / M.Tech / MCA / MBA / M.E',
      'Candidate Name, Register Number, Current Semester, Branch',
      'Condonation details in previous semesters (Number of times, Semester details)',
      'Percentage of Attendance (%)',
      'Detailed Table: S.No, Date From/To, Reason for Absence',
      'Total Number of Days Present & Days Absent',
      'Signatures: Candidate, Faculty Advisor, Head of Department, Principal',
    ],
  },
  {
    id: 'phd-coursework-form',
    code: 'COE-FORM-04',
    title: 'Ph.D Programme Course Work – Registration Form',
    category: 'Research & Doctoral Studies',
    pages: 1,
    fileSize: '165 KB',
    description: 'Registration form for doctoral research scholars enrolling in approved semester coursework subjects under Anna University / Autonomous regulations.',
    instructions: [
      'Affix recent passport size photograph of the research scholar.',
      'Submit the filled application along with: (1) Enrolment form, (2) Course Work Registration form, (3) Minutes of the First Doctoral Committee Meeting, (4) Approved syllabus copy signed by Supervisor.',
      'Submit to the Office of the Controller of Examinations.',
    ],
    fields: [
      'Name of the Research Scholar & Registration Number',
      'Department in which the Scholar is pursuing research',
      'Category: Full Time / Part Time',
      'Date of Birth, Gender, Supervisor Name & Address',
      'Address for Communication, Email ID, Mobile Number',
      'Course Work Table: Sl.No, Course Code, Course Title, No. of Credits, Core/Elective, Course Coordinator Name & Signature',
      'Signatures: Scholar, Supervisor with Seal, HOD with Seal, Principal',
    ],
  },
];

// ─── Autonomous Academic Regulations Data ─────────────────────────────────────
export const ACADEMIC_REGULATIONS = [
  {
    code: 'R2022',
    title: 'Regulations 2022 (Choice Based Credit System - CBCS)',
    degree: 'B.E. / B.Tech (Undergraduate Programmes)',
    effective: 'Academic Year 2022–2023 Onwards',
    highlights: [
      'Outcome Based Education (OBE) and AICTE model curriculum aligned.',
      'Industry 4.0 integrated verticals and emerging domain minors.',
      'Mandatory Industrial Internships (1-month Summer & 6-month Semester Track).',
      'Relative & Absolute grading framework with continuous assessment (50:50 weightage).',
    ],
    pdfLink: '#r2022-ug-curriculum',
  },
  {
    code: 'R2020',
    title: 'Regulations 2020 (Autonomous Curriculum & Syllabi)',
    degree: 'B.E. / B.Tech / M.E. / M.Tech / MBA / MCA',
    effective: 'Academic Year 2020–2021 to 2023–2024',
    highlights: [
      'Credit transfer for NPTEL / SWAYAM / Coursera professional certifications.',
      'Fast-track completion option for 8th semester full-time corporate internships.',
      'Honors Degree and Minors Specialization degree pathway.',
      'Autonomous evaluation scheme with double valuation system.',
    ],
    pdfLink: '#r2020-autonomous',
  },
  {
    code: 'R2018',
    title: 'Regulations 2018 (Autonomous Framework)',
    degree: 'Undergraduate & Postgraduate Regulations',
    effective: 'Academic Year 2018–2019 Onwards',
    highlights: [
      'Foundational CBCS structure with elective baskets.',
      'Internal Assessment Component (CIA 40 marks) + End Semester (ESE 60 marks).',
      'Comprehensive supplementary and arrear examination guidelines.',
    ],
    pdfLink: '#r2018-autonomous',
  },
];

// ─── Sample Timetable Schedules ──────────────────────────────────────────────
export const EXAM_TIMETABLES = [
  {
    id: 'TT-UG-SEM6',
    title: 'End Semester Examinations — April / May 2026 (Theory & Practical)',
    batch: 'B.E. / B.Tech (Regular - VI Semester & Arrear All Semesters)',
    releaseDate: '15 Mar 2026',
    sessions: 'FN: 09:30 AM – 12:30 PM | AN: 01:30 PM – 04:30 PM',
    status: 'Official Schedule Published',
    schedules: [
      { date: '12-May-2026', session: 'FN', code: '22CS601', title: 'Compiler Engineering & Design', dept: 'CSE' },
      { date: '15-May-2026', session: 'FN', code: '22CS602', title: 'Cloud Native Computing & DevOps', dept: 'CSE' },
      { date: '18-May-2026', session: 'FN', code: '22CS603', title: 'Cryptography and Cyber Security', dept: 'CSE' },
      { date: '21-May-2026', session: 'FN', code: '22CS611', title: 'Deep Learning and Vision Systems (Elective IV)', dept: 'CSE' },
      { date: '25-May-2026', session: 'FN', code: '22MG601', title: 'Total Quality Management & Engineering Ethics', dept: 'All Branches' },
    ],
  },
  {
    id: 'TT-PG-SEM2',
    title: 'M.E. / M.Tech / MBA / MCA Autonomous Examinations — May 2026',
    batch: 'Postgraduate Regular (II Semester) & Supplementary',
    releaseDate: '18 Mar 2026',
    sessions: 'FN: 09:30 AM – 12:30 PM',
    status: 'Official Schedule Published',
    schedules: [
      { date: '14-May-2026', session: 'FN', code: '22MCS201', title: 'Advanced Algorithms and Distributed Computing', dept: 'M.E. CSE' },
      { date: '16-May-2026', session: 'FN', code: '22MCS202', title: 'Internet of Things and Smart Sensors', dept: 'M.E. CSE' },
      { date: '19-May-2026', session: 'FN', code: '22MBA201', title: 'Corporate Strategic Management', dept: 'MBA' },
    ],
  },
  {
    id: 'TT-PHD-CW',
    title: 'Ph.D Doctoral Programme Course Work Examinations — May 2026',
    batch: 'Doctoral Research Scholars (Regular & Direct)',
    releaseDate: '20 Mar 2026',
    sessions: 'FN: 09:30 AM – 12:30 PM',
    status: 'Official Schedule Published',
    schedules: [
      { date: '22-May-2026', session: 'FN', code: '22PHD101', title: 'Research Methodology, IPR & Publication Ethics', dept: 'Ph.D All Branches' },
      { date: '26-May-2026', session: 'FN', code: '22PHD204', title: 'Advanced Optimization Techniques & Heuristics', dept: 'Ph.D Engineering' },
    ],
  },
  {
    id: 'TT-SUPP-ARR',
    title: 'Autonomous Arrear & Special Supplementary Schedule — June 2026',
    batch: 'UG / PG Arrear Candidates (All Prior Semesters 1 to 5)',
    releaseDate: '22 Mar 2026',
    sessions: 'FN: 09:30 AM – 12:30 PM | AN: 01:30 PM – 04:30 PM',
    status: 'Official Schedule Published',
    schedules: [
      { date: '02-Jun-2026', session: 'FN', code: '22MA401', title: 'Probability, Statistics and Queuing Theory', dept: 'CSE / IT' },
      { date: '04-Jun-2026', session: 'FN', code: '22CS401', title: 'Operating Systems & System Architecture', dept: 'CSE' },
      { date: '06-Jun-2026', session: 'FN', code: '22CS402', title: 'Design and Analysis of Algorithms', dept: 'CSE' },
    ],
  },
];

// ─── Active Issued Hall Tickets Database ──────────────────────────────────────
export const SAMPLE_HALL_TICKETS = {
  '7376231CS201': {
    regNo: '7376231CS201',
    dob: '2004-05-14',
    name: 'Rahul Sundaram',
    degree: 'B.E. Computer Science and Engineering',
    semester: 'VI Semester (Regular)',
    examCenter: 'SKCET Campus, Academic Block III',
    hallNo: 'AB-304 (Desk 18)',
    status: 'ISSUED',
    issuedDate: '10 Apr 2026',
    examTitle: 'End Semester Examinations — April / May 2026',
    examSubjects: [
      { code: '22CS601', name: 'Compiler Engineering & Design', date: '12-May-2026', session: 'FN (09:30 AM – 12:30 PM)', hall: 'AB-304' },
      { code: '22CS602', name: 'Cloud Native Computing & DevOps', date: '15-May-2026', session: 'FN (09:30 AM – 12:30 PM)', hall: 'AB-304' },
      { code: '22CS603', name: 'Cryptography and Cyber Security', date: '18-May-2026', session: 'FN (09:30 AM – 12:30 PM)', hall: 'AB-304' },
      { code: '22CS611', name: 'Deep Learning and Vision Systems', date: '21-May-2026', session: 'FN (09:30 AM – 12:30 PM)', hall: 'AB-304' },
      { code: '22MG601', name: 'Total Quality Management & Ethics', date: '25-May-2026', session: 'FN (09:30 AM – 12:30 PM)', hall: 'AB-304' },
    ],
  },
  '7376221EC105': {
    regNo: '7376221EC105',
    dob: '2003-11-20',
    name: 'Priya Mahalingam',
    degree: 'B.E. Electronics and Communication Engineering',
    semester: 'VIII Semester (Final Year)',
    examCenter: 'SKCET Campus, Main Block B',
    hallNo: 'MB-112 (Desk 04)',
    status: 'ISSUED',
    issuedDate: '12 Apr 2026',
    examTitle: 'End Semester Examinations — April / May 2026',
    examSubjects: [
      { code: '22EC801', name: 'Satellite Communication & Radar Systems', date: '11-May-2026', session: 'FN (09:30 AM – 12:30 PM)', hall: 'MB-112' },
      { code: '22EC802', name: 'Optical Networks & Photonic Devices', date: '14-May-2026', session: 'FN (09:30 AM – 12:30 PM)', hall: 'MB-112' },
    ],
  },
};

// ─── Upcoming Scheduled Exams (Access Locked / Scheduled Only) ───────────────
export const UPCOMING_EXAM_PORTALS = [
  {
    id: 'cia-2',
    name: '1) CIA 2 EXAMINATION',
    fullTitle: 'Continuous Internal Assessment 2 (CIA-2)',
    scheduledDates: '15 Sep 2026 – 22 Sep 2026',
    session: 'FN: 09:30 AM – 11:30 AM | AN: 01:30 PM – 03:30 PM',
    status: 'Scheduled',
    statusDetail: 'Time Table finalized by COE. Hall Ticket generation is scheduled and portal access will be unlocked 3 days prior to examination commencement.',
    badge: 'Access Locked · Just Scheduled',
  },
  {
    id: 'end-sem-odd',
    name: '2) END SEMESTER (ODD)',
    fullTitle: 'End Semester Autonomous Examinations (Odd Semester)',
    scheduledDates: '10 Nov 2026 – 30 Nov 2026',
    session: 'Autonomous Regular & Supplementary Examinations (Theory & Practical)',
    status: 'Scheduled',
    statusDetail: 'Autonomous Odd Semester Examinations officially scheduled on academic calendar. Seating matrix and hall ticket allocation will open post timetable notification.',
    badge: 'Access Locked · Just Scheduled',
  },
];

// ─── Semester-wise Arrear Examination Papers ─────────────────────────────────
export const ARREAR_SEMESTERS_DATA = [
  {
    id: 'sem-1',
    semesterNumber: 1,
    title: 'Semester 1 (Autonomous Regular / Arrear)',
    label: 'Semester 1',
    subjects: [
      { code: '22MA101', name: 'Calculus and Linear Algebra', credits: 4, fee: 450, type: 'Theory' },
      { code: '22PH101', name: 'Engineering Physics & Optics', credits: 3, fee: 450, type: 'Theory' },
      { code: '22CS101', name: 'Problem Solving and Python Programming', credits: 3, fee: 450, type: 'Theory' },
      { code: '22CS102', name: 'Python Programming Laboratory', credits: 2, fee: 600, type: 'Practical' },
    ],
  },
  {
    id: 'sem-2',
    semesterNumber: 2,
    title: 'Semester 2 (Autonomous Regular / Arrear)',
    label: 'Semester 2',
    subjects: [
      { code: '22MA201', name: 'Differential Equations and Complex Variables', credits: 4, fee: 450, type: 'Theory' },
      { code: '22EE201', name: 'Basic Electrical & Electronics Engineering', credits: 3, fee: 450, type: 'Theory' },
      { code: '22CS201', name: 'Data Structures and Algorithms', credits: 4, fee: 450, type: 'Theory' },
      { code: '22CS202', name: 'Data Structures Laboratory', credits: 2, fee: 600, type: 'Practical' },
    ],
  },
  {
    id: 'sem-3',
    semesterNumber: 3,
    title: 'Semester 3 (Autonomous Regular / Arrear)',
    label: 'Semester 3',
    subjects: [
      { code: '22MA301', name: 'Discrete Mathematics and Graph Theory', credits: 4, fee: 450, type: 'Theory' },
      { code: '22CS301', name: 'Digital Principles and System Design', credits: 4, fee: 450, type: 'Theory' },
      { code: '22CS302', name: 'Object Oriented Programming with Java', credits: 3, fee: 450, type: 'Theory' },
      { code: '22CS303', name: 'Computer Organization & Architecture', credits: 3, fee: 450, type: 'Theory' },
    ],
  },
  {
    id: 'sem-4',
    semesterNumber: 4,
    title: 'Semester 4 (Autonomous Regular / Arrear)',
    label: 'Semester 4',
    subjects: [
      { code: '22CS401', name: 'Operating Systems & System Architecture', credits: 3, fee: 450, type: 'Theory' },
      { code: '22CS402', name: 'Design and Analysis of Algorithms', credits: 4, fee: 450, type: 'Theory' },
      { code: '22MA401', name: 'Probability, Statistics and Queuing Theory', credits: 4, fee: 450, type: 'Theory' },
      { code: '22CS403', name: 'Software Engineering Methodologies', credits: 3, fee: 450, type: 'Theory' },
    ],
  },
  {
    id: 'sem-5',
    semesterNumber: 5,
    title: 'Semester 5 (Autonomous Regular / Arrear)',
    label: 'Semester 5',
    subjects: [
      { code: '22CS501', name: 'Database Management Systems', credits: 4, fee: 450, type: 'Theory' },
      { code: '22CS502', name: 'Computer Networks and Protocols', credits: 3, fee: 450, type: 'Theory' },
      { code: '22CS503', name: 'Theory of Computation', credits: 4, fee: 450, type: 'Theory' },
      { code: '22CS504', name: 'Full Stack Web Development Lab', credits: 2, fee: 600, type: 'Practical' },
    ],
  },
  {
    id: 'sem-6',
    semesterNumber: 6,
    title: 'Semester 6 (Autonomous Regular / Arrear)',
    label: 'Semester 6',
    subjects: [
      { code: '22CS601', name: 'Compiler Engineering & Design', credits: 3, fee: 450, type: 'Theory' },
      { code: '22CS602', name: 'Cloud Native Computing & DevOps', credits: 3, fee: 450, type: 'Theory' },
      { code: '22CS603', name: 'Cryptography and Cyber Security', credits: 3, fee: 450, type: 'Theory' },
      { code: '22CS611', name: 'Deep Learning and Vision Systems', credits: 3, fee: 450, type: 'Theory' },
    ],
  },
];

// ─── Sample Autonomous Results Ledger ─────────────────────────────────────────
export const SAMPLE_RESULTS_DATA = {
  '7376231CS201': {
    regNo: '7376231CS201',
    dob: '2004-05-14',
    name: 'Rahul Sundaram',
    branch: 'B.E. Computer Science and Engineering',
    semester: 'Semester V (Nov / Dec 2025 Session)',
    sgpa: '8.82',
    cgpa: '8.76',
    resultStatus: 'PASS - FIRST CLASS WITH DISTINCTION',
    grades: [
      { code: '22CS501', title: 'Design and Analysis of Algorithms', credits: 4, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: '22CS502', title: 'Database Management Systems', credits: 4, grade: 'A+', gradePoint: 9, result: 'PASS' },
      { code: '22CS503', title: 'Computer Networks & Security', credits: 3, grade: 'A+', gradePoint: 9, result: 'PASS' },
      { code: '22CS504', title: 'Theory of Computation', credits: 4, grade: 'A', gradePoint: 8, result: 'PASS' },
      { code: '22CS505', title: 'Full Stack Web Development Lab', credits: 2, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: '22CS506', title: 'Networks Simulation Lab', credits: 2, grade: 'A+', gradePoint: 9, result: 'PASS' },
      { code: '22CS507', title: 'Professional Communication Lab', credits: 1, grade: 'O', gradePoint: 10, result: 'PASS' },
    ],
  },
  '7376221EC105': {
    regNo: '7376221EC105',
    dob: '2003-11-20',
    name: 'Priya Mahalingam',
    branch: 'B.E. Electronics and Communication Engineering',
    semester: 'Semester VII (Nov / Dec 2025 Session)',
    sgpa: '9.14',
    cgpa: '9.02',
    resultStatus: 'PASS - FIRST CLASS WITH DISTINCTION',
    grades: [
      { code: '22EC701', title: 'Wireless Cellular Communications', credits: 4, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: '22EC702', title: 'Embedded Systems & Real Time OS', credits: 4, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: '22EC703', title: 'Microwave and Optical Engineering', credits: 3, grade: 'A+', gradePoint: 9, result: 'PASS' },
      { code: '22EC704', title: 'Embedded System Design Lab', credits: 2, grade: 'O', gradePoint: 10, result: 'PASS' },
    ],
  },
};
