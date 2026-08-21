// ─── Navigation Data ─────────────────────────────────────────────────────────
// Single source of truth for all nav structure.
// Add pages / routes here as the site grows.
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  {
    id: 'about',
    label: 'About',
    path: '/about',
    children: [
      { label: 'Institution',  path: '/about/institution' },
      { label: 'Management',   path: '/about/management' },
      { label: 'Principal',    path: '/about/principal' },
      { label: 'Core Values',  path: '/about/core-values' },
      { label: 'CSR',          path: '/about/csr' },
    ],
  },
  {
    id: 'achievements',
    label: 'Achievements',
    path: '/achievements',
    children: [
      { label: 'Recent Highlights',          path: '/achievements/recent-highlights' },
      { label: 'Institutional Achievements', path: '/achievements/institutional' },
      { label: 'Rankings',                   path: '/achievements/rankings' },
      { label: 'Historical Milestones',      path: '/achievements/milestones' },
      { label: 'Department Achievements',    path: '/achievements/department-achievements' },
    ],
  },
  {
    id: 'accreditations',
    label: 'Accreditations',
    path: '/accreditations',
    children: [
      { label: 'NAAC',  path: '/accreditations/naac' },
      { label: 'NBA',   path: '/accreditations/nba' },
      { label: 'NIRF',  path: '/accreditations/nirf' },
      { label: 'IQAC',  path: '/accreditations/iqac' },
      { label: 'SIRO',  path: '/accreditations/siro' },
      { label: 'Other Recognitions', path: '/accreditations/other' },
    ],
  },
  {
    id: 'online-payment',
    label: 'Online Payment',
    path: '/online-payment',
    children: [],
  },
  {
    id: 'academics',
    label: 'Academics',
    path: '/academics',
    children: [
      { label: 'Departments',        path: '/academics/departments' },
      { label: 'Programmes',         path: '/academics/programmes' },
      { label: 'Academic Calendar',  path: '/academics/calendar' },
      { label: 'Library',            path: '/academics/library' },
      { label: 'Skill Development',  path: '/academics/skill-development' },
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    path: '/admissions',
    children: [
      { label: 'Admission 2026',      path: '/admissions/2026' },
      { label: 'Admission Procedure', path: '/admissions/procedure' },
      { label: 'Scholarships',        path: '/admissions/scholarships' },
      { label: 'Fees',                path: '/admissions/fees' },
    ],
  },
  {
    id: 'student-life',
    label: 'Student Life',
    path: '/student-life',
    children: [
      { label: 'Campus',        path: '/student-life/campus' },
      { label: 'Hostel',        path: '/student-life/hostel' },
      { label: 'Sports',        path: '/student-life/sports' },
      { label: 'Clubs',         path: '/student-life/clubs' },
      { label: 'Transport',     path: '/student-life/transport' },
      { label: 'Gym',           path: '/student-life/gym' },
      { label: 'Health Centre', path: '/student-life/health-centre' },
      { label: 'Gallery',       path: '/student-life/gallery' },
    ],
  },
  {
    id: 'innovations',
    label: 'Innovations',
    path: '/innovations',
    children: [
      { label: 'Innovation Initiatives', path: '/innovations/initiatives' },
      { label: 'Idea Lab',               path: '/innovations/idea-lab' },
      { label: 'Entrepreneurship',       path: '/innovations/entrepreneurship' },
      { label: 'Innovation Projects',    path: '/innovations/projects' },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    path: '/research',
    children: [
      { label: 'R&D',              path: '/research/rd' },
      { label: 'Publications',     path: '/research/publications' },
      { label: 'Patents',          path: '/research/patents' },
      { label: 'Research Centres', path: '/research/centres' },
      { label: 'Research Projects', path: '/research/projects' },
    ],
  },
  {
    id: 'exams',
    label: 'Exams',
    path: '/exams',
    children: [
      { label: 'Regulations',       path: '/exams/regulations' },
      { label: 'Forms',             path: '/exams/forms' },
      { label: 'Hall Ticket',       path: '/exams/hall-ticket' },
      { label: 'Timetable',         path: '/exams/timetable' },
      { label: 'Results',           path: '/exams/results' },
      { label: 'Arrear Application', path: '/exams/arrear-application' },
    ],
  },
  {
    id: 'placements',
    label: 'Placements',
    path: '/placements',
    children: [
      { label: 'Placement Team',       path: '/placements/team' },
      { label: 'Statistics',           path: '/placements/statistics' },
      { label: 'Recruiters',           path: '/placements/recruiters' },
      { label: 'Career Opportunities', path: '/placements/careers' },
    ],
  },
  {
    id: 'documents',
    label: 'Documents',
    path: '/documents',
    children: [
      { label: 'Mandatory Disclosures',    path: '/documents/mandatory-disclosures' },
      { label: 'AICTE Documents',          path: '/documents/aicte' },
      { label: 'Anna University Documents', path: '/documents/anna-university' },
      { label: 'Prospectus',               path: '/documents/prospectus' },
      { label: 'Policies',                 path: '/documents/policies' },
      { label: 'Reports',                  path: '/documents/reports' },
    ],
  },
];
