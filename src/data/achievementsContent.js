// ─── Achievements Section Content ───────────────────────────────────────────
// Real content scraped directly from https://skcet.ac.in/about-us/achievements/
// Matching the theme and data architecture of About Content.
// ─────────────────────────────────────────────────────────────────────────────

const ACHIEVEMENTS_CONTENT = {
  /* ── 0. Recent Highlights (Image & Title Carousel) ──────────────── */
  'recent-highlights': {
    slides: [
      {
        id: 'sih-2024',
        title: 'Smart India Hackathon 2024 — Six Grand Slam Winner Teams Winning ₹6,00,000',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'nirf-2025',
        title: 'NIRF 2025 — 100th Rank in Engineering Category & 11–50 Band in Innovation',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'nptel-2024',
        title: 'Swayam NPTEL — 66th Rank Pan-India among 6,598 Institutions & 1st in Coimbatore Zone',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'the-qs-2025',
        title: 'Times Higher Education (THE) SDG Impact & QS World University Rankings 2025',
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'cisco-idea-lab',
        title: 'Cisco NetAcad Excellence Award & AICTE IDEA Lab Inauguration',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'drone-coe',
        title: 'Aero Vision Drone Centre of Excellence for Advanced UAV Research',
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80',
      },
      {
        id: 'iic-2024',
        title: 'Institution’s Innovation Council (IIC) 4-Star Rating & MoE Top 100 Mentor Grant',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
      },
    ],
  },

  /* ── 1. Institutional Achievements (Yearly from 2025 down to 2010) ─── */
  'institutional-achievements': {
    intro: `Sri Krishna College of Engineering and Technology has established a stellar track record of sustained excellence across academics, cutting-edge research, competitive hackathons, national rankings, and industry partnerships since 1998. Explore our year-by-year journey of milestones and triumphs.`,
    stats: [
      { label: 'NIRF Engineering', value: 'Top 100', sub: 'National Rank' },
      { label: 'ARIIA Innovation', value: 'Top Band', sub: 'All India Rank' },
      { label: 'Swayam NPTEL', value: '66th', sub: 'Pan India (6598 Inst)' },
      { label: 'SIH Nodal Centre', value: '6 Times', sub: 'National Host' },
      { label: 'SIH 2024 Winners', value: '6 Teams', sub: '₹6,00,000 Won' },
      { label: 'IIC Star Rating', value: '5 Star', sub: 'MoE Innovation Cell' },
    ],
    years: [
      {
        year: '2025',
        highlights: [
          {
            text: '100th Rank in Engineering Category and 11 – 50 Band in Innovation Category in NIRF 2025.',
            tag: 'NIRF Ranking',
            category: 'rankings',
          },
          {
            text: "The Institution’s Innovation Council (IIC) of SKCET is declared as one of the top Institutions across the country in Annual Performance ratings for the year 2020 – 2022. The IIC of SKCET has been bestowed with 4 star ratings for its outstanding performance.",
            tag: 'Innovation Rating',
            category: 'innovation',
          },
          {
            text: 'SKCET received NetAcad Excellence Award from CISCO Networking Academy (NetAcad), Bengaluru Campus in recognition of outstanding achievements in networking education, technical skills, and leadership.',
            tag: 'Excellence Award',
            category: 'awards',
          },
          {
            text: 'SKCET proud to be recognized by AICTE for establishing IDEA LAB on campus.',
            tag: 'AICTE Recognition',
            category: 'research',
          },
          {
            text: 'Proud host of Smart India Hackathon (SIH) 2025 for the 6th consecutive time.',
            tag: 'Hackathon Host',
            category: 'hackathons',
          },
          {
            text: 'Stellar Global recognition in the prestigious Times Higher Education (THE) SDG Impact Rankings 2025.',
            tag: 'Global Ranking',
            category: 'rankings',
          },
          {
            text: 'SKCET imprinted its footprint in the prestigious QS World University Ratings.',
            tag: 'QS Rating',
            category: 'rankings',
          },
          {
            text: 'Established state-of-the-art Aero Vision Drone Centre of Excellence.',
            tag: 'Centre of Excellence',
            category: 'research',
          },
        ],
      },
      {
        year: '2024',
        highlights: [
          {
            text: 'Smart India Hackathon 2024: SKCET Wins Big! Six teams emerged victorious, winning a cash prize of Rs. 1,00,000/- each.',
            tag: 'SIH Winner',
            category: 'hackathons',
          },
          {
            text: 'SKCET Triumphs in Swayam NPTEL Local Chapter Ranking: Secured 66th rank pan India among 6,598 Institutions in the July-Oct 2024 exams. SKCET is ranked 17th at Tamil Nadu level and 1st in Coimbatore zone among engineering colleges.',
            tag: 'NPTEL Pan-India',
            category: 'academics',
          },
          {
            text: 'Proud Host of Smart India Hackathon 2024 for the 5th time.',
            tag: 'Hackathon Host',
            category: 'hackathons',
          },
          {
            text: 'SKCET signed Landmark MoU with ERNET (Education and Research Network of India), an autonomous scientific society under Ministry of Electronics and Information Technology (MeitY), Government of India.',
            tag: 'MeitY MoU',
            category: 'collaborations',
          },
          {
            text: 'SKCET becomes Nodal Resource Centre under IIT Delhi – Virtual Labs, Ministry of Education under the National Mission on Education through ICT, Government of India.',
            tag: 'IIT Delhi Nodal',
            category: 'collaborations',
          },
          {
            text: 'SKCET is now a proud partner of CODISSIA DEFENCE INNOVATION AND ATAL INCUBATION CENTRE (CDIIC), Coimbatore.',
            tag: 'Defence Innovation',
            category: 'innovation',
          },
          {
            text: 'SKCET becomes CENTRE FOR INTERNATIONAL RELATIONS (CIR) Research Attachment and Partnership Initiative in collaboration with Universiti Teknologi PETRONAS (UTP), Malaysia.',
            tag: 'International Partner',
            category: 'collaborations',
          },
          {
            text: 'SKCET becomes Nodal Resource Center for Spoken Tutorial, IIT Bombay.',
            tag: 'IIT Bombay Nodal',
            category: 'collaborations',
          },
          {
            text: 'Memorandum of Understanding with NITTTR Chennai, Ministry of Education.',
            tag: 'MoE NITTTR',
            category: 'collaborations',
          },
          {
            text: 'Established Swayam Prabha Technology Channel at Vankatram Learning Centre.',
            tag: 'Technology',
            category: 'infrastructure',
          },
          {
            text: 'Approved as Institute Level Research Centre by Anna University.',
            tag: 'Anna University',
            category: 'research',
          },
          {
            text: 'The Institution’s Innovation Council (IIC) of SKCET is declared as one of the top Institutions across the country & bestowed with 4 star ratings for its outstanding performance.',
            tag: 'IIC 4-Star',
            category: 'innovation',
          },
          {
            text: 'The IIC of SKCET is chosen among the Top 100 Institutions Pan India by the MoE under the Mentor-Mentee scheme with funds to a tune of Rs. 2.25 lakhs sanctioned for mentoring 5 upcoming Institutions in Innovation, Entrepreneurship, Start-up and IPR.',
            tag: 'MoE Mentorship',
            category: 'innovation',
          },
          {
            text: 'Sri Krishna Institutions (SKI) signed MoU with NASSCOM Future Skills Prime, India’s Technology Skilling hub — First Institution in the country to offer a joint certification course with NASSCOM.',
            tag: 'NASSCOM MoU',
            category: 'collaborations',
          },
        ],
      },
      {
        year: '2023',
        highlights: [
          {
            text: '77th Rank in Engineering Category (2023), 101-125 Band in Management, 101 – 150 Band in Overall Ranking in NIRF 2023.',
            tag: 'NIRF 2023',
            category: 'rankings',
          },
          {
            text: '11th Rank in ARIIA Ranking (NIRF Innovation top band).',
            tag: 'ARIIA Rank 11',
            category: 'rankings',
          },
          {
            text: 'The UG Programmes B.E Computer Science and Engineering, B.E Electronics and Communication Engineering, B.E Mechanical Engineering, and B.Tech Information Technology are awarded NBA Accreditation status for 3 years upto 30.06.2026.',
            tag: 'NBA Accreditation',
            category: 'academics',
          },
          {
            text: '4th Rank in Tamil Nadu Engineering Admissions (TNEA).',
            tag: 'TNEA Rank 4',
            category: 'rankings',
          },
          {
            text: 'SKCET was crowned as NATIONAL WINNER: SKILL-A-THON 2022 at High Impact Industry Interaction Event at 50th ICT Bridge 2023 and received the Gold partner award from the Hon’ble Minister Thiru. T. Mano Thangaraj.',
            tag: 'National Winner',
            category: 'awards',
          },
          {
            text: 'Awarded "The Most Engaged Institutions of the Year 2023" at ICT BRIDGE 2023.',
            tag: 'ICT Academy',
            category: 'awards',
          },
          {
            text: 'Appreciated by Infosys Springboard Team for being Number 1 in Tamil Nadu in terms of maximum certifications completed in niche skills like Cyber Security, AI, and IoT.',
            tag: 'Infosys #1',
            category: 'academics',
          },
          {
            text: 'SKCET was invited to display its best practices and innovations at the Ministry of Education’s Mega Expo celebrating the 3rd Anniversary of the National Education Policy (NEP) 2020 at Pragati Maidan, New Delhi.',
            tag: 'MoE NEP Expo',
            category: 'innovation',
          },
          {
            text: 'Conferred 23rd Rank at National Level, 2nd Rank at State Level, and 1st Rank at District Level in NPTEL Exams during Jan – Apr 2023.',
            tag: 'NPTEL Top Rank',
            category: 'academics',
          },
          {
            text: 'Recognized with SIRO by the Department of Scientific and Industrial Research (DSIR).',
            tag: 'DSIR SIRO',
            category: 'research',
          },
          {
            text: '20 students along with 2 faculty members of SKCET visited the new International Exhibition cum Convention Centre (IECC), "Bharat Mandapam" at Pragati Maidan, New Delhi, interacting with National Leaders on leveraging youth power for building a better India.',
            tag: 'National Delegation',
            category: 'events',
          },
          {
            text: '10 first-year students along with a faculty member had the honor of attending the Foundation Day Celebration of Various States and Union Territories at Raj Bhavan, Chennai.',
            tag: 'Raj Bhavan Visit',
            category: 'events',
          },
        ],
      },
      {
        year: '2022',
        highlights: [
          {
            text: 'SKCET has been conferred the 73rd Rank in National Institutional Ranking Framework Ranking 2021 by AICTE, MoE under ‘Engineering Category’.',
            tag: 'NIRF Rank 73',
            category: 'rankings',
          },
          {
            text: 'Achieved All-India 4th rank in ARIIA Ranking.',
            tag: 'ARIIA Rank 4',
            category: 'rankings',
          },
          {
            text: 'Proud recipient of Academic Partner Excellence Awards 2022, for training the Highest Number of Students through ICT Academy.',
            tag: 'ICT Academy Award',
            category: 'awards',
          },
          {
            text: 'Certificate of Appreciation by Bhumi Campus Awards 2022, for our dedicated efforts towards developing Unique Social Initiatives.',
            tag: 'Bhumi Award',
            category: 'awards',
          },
          {
            text: 'Awarded as Winner in AICTE-Lilavati Award 2021-22 by the Ministry of Education (MoE) under the sub-category ‘Technology for Women’. Also secured the 2nd runner-up prize in AICTE-Lilavati Award 2020-21 under ‘Sanitation and Hygiene’.',
            tag: 'AICTE Lilavati Winner',
            category: 'awards',
          },
          {
            text: 'Bestowed with the INDIA STEM AWARD 2022 by the All India Council for Robotics & Automation (AICRA).',
            tag: 'India STEM Award',
            category: 'awards',
          },
          {
            text: 'SKCET IIC Team honoured with "Best Performer" in the poster contest at IIC regional meet held at Sathyabama Institute of Science and Technology.',
            tag: 'IIC Best Performer',
            category: 'innovation',
          },
          {
            text: 'Awarded "Best Spoke Institution for IEDP Promotional activities" under PMO-IEDP for the academic year 2021-22.',
            tag: 'PMO-IEDP Award',
            category: 'innovation',
          },
          {
            text: 'The Institution’s Innovation Council (IIC) of SKCET bestowed with prestigious 5 Star ratings for its outstanding annual performance.',
            tag: '5-Star IIC',
            category: 'innovation',
          },
        ],
      },
      {
        year: '2021',
        highlights: [
          {
            text: 'Ranked 78th in NIRF Ranking 2021 under Engineering Category.',
            tag: 'NIRF Rank 78',
            category: 'rankings',
          },
          {
            text: 'Achieved All-India 2nd rank in ARIIA Ranking 2020.',
            tag: 'ARIIA Rank 2',
            category: 'rankings',
          },
          {
            text: 'Recognized as the Top 5th Private Engineering College with best value for money in India Today MRDA Rankings 2021.',
            tag: 'India Today Top 5',
            category: 'rankings',
          },
          {
            text: 'Conferred with National Rank in AICTE-Clean and Smart Campus 2020, and ranked 2nd in Clean & Smart Campus 2019 by Swachh Bharat Mission Council.',
            tag: 'Clean & Smart Campus',
            category: 'awards',
          },
          {
            text: 'Conferred with National Third Rank in Utkrisht Sansthan Vishwakarma Award (USVA) 2019.',
            tag: 'USVA 3rd Rank',
            category: 'awards',
          },
          {
            text: 'Proud recipient of Learnathon Awards 2020 for training students in Industry 4.0 courses by ICT Academy.',
            tag: 'Learnathon Award',
            category: 'academics',
          },
          {
            text: 'Received ‘Best CoE partner award 2021’ by Virtusa for second year in a row for Full-stack Java domain.',
            tag: 'Virtusa CoE Partner',
            category: 'collaborations',
          },
          {
            text: 'Bestowed with certificate of appreciation for Maximum student participation in ‘Capgemini Tech Challenge 2021’ for the second consecutive time.',
            tag: 'Capgemini Award',
            category: 'awards',
          },
          {
            text: 'Conferred with “Best Hiring Partner 2021” award by Informatica for outstanding performance in internship by SKCET students.',
            tag: 'Informatica Award',
            category: 'collaborations',
          },
          {
            text: 'Received “Best Campus Partner college 2021” from Kovai.co for stellar student performance.',
            tag: 'Kovai.co Award',
            category: 'collaborations',
          },
          {
            text: 'Chosen as prestigious nodal center to host the software edition of Toycathon 2021 (Virtual Mode).',
            tag: 'Toycathon Nodal',
            category: 'hackathons',
          },
        ],
      },
      {
        year: '2020',
        highlights: [
          {
            text: 'NBA Accreditation awarded for 3 years to 6 UG Programmes: Civil, EEE, CSE, IT, ECE, and Mechanical Engineering.',
            tag: 'NBA 6 Programmes',
            category: 'academics',
          },
          {
            text: 'Awarded III Prize in AICTE-Utkrisht Sansthan Vishwakarma Award (USVA) at National level and First Prize in Tamil Nadu region for enhancing village income through technology/management practices.',
            tag: 'USVA National III',
            category: 'awards',
          },
          {
            text: 'Recipient of three prominent ICT Academy Partner Excellence Awards 2020: Highest Industry Institute Interaction 2020 (out of 232 institutions), National Cloud Champion Institution (500+ colleges), and National Cloud Champion Coordinator.',
            tag: 'ICT Academy Triple Award',
            category: 'awards',
          },
          {
            text: 'Honoured with “Industry Academia Excellence Award” for excellence in industry-based initiatives on campus.',
            tag: 'Industry Academia',
            category: 'awards',
          },
        ],
      },
      {
        year: '2019',
        highlights: [
          {
            text: 'Successfully obtained Extension of Autonomous Status for 5 Years.',
            tag: 'Autonomous Extension',
            category: 'academics',
          },
          {
            text: 'Launched exclusive B.E degree program in Computer Science and Business Systems in partnership with Tata Consultancy Services (TCS) Ltd.',
            tag: 'TCS Degree Program',
            category: 'collaborations',
          },
          {
            text: 'Launched exclusive M.Tech Computer Science and Engineering (5 year Integrated) degree program powered by Virtusa Corporation.',
            tag: 'Virtusa M.Tech',
            category: 'collaborations',
          },
          {
            text: 'Conferred with Second National Rank in SWACHH Campus Rankings 2019 consecutively for the second year by MHRD, Government of India.',
            tag: 'Swachh Campus 2nd',
            category: 'rankings',
          },
          {
            text: 'Ranked second in the Clean & Smart Campus: 2019 awards instituted by Swachh Bharat Mission Council.',
            tag: 'Smart Campus 2nd',
            category: 'awards',
          },
          {
            text: '“National Third Rank” for the One Student-One Tree Initiative in Jal Shakti Abhiyan for mega plantation of 10,050 trees at SKCET campus.',
            tag: 'Jal Shakti 3rd Rank',
            category: 'awards',
          },
          {
            text: 'Ranked 97th in NIRF Ranking 2019 – Engineering Category.',
            tag: 'NIRF Rank 97',
            category: 'rankings',
          },
          {
            text: 'One among the Top 100 Institutions across India in ARIIA Ranking 2019.',
            tag: 'ARIIA Top 100',
            category: 'rankings',
          },
          {
            text: 'Chosen as one of 28 prestigious nodal centers for the third consecutive year to host the software edition of Smart India Hackathon 2019.',
            tag: 'SIH Nodal Host',
            category: 'hackathons',
          },
          {
            text: 'Conferred 22nd Rank at National Level and 3rd Rank in Coimbatore zone in NPTEL Exams during Nov / Dec 2019.',
            tag: 'NPTEL Rank 22',
            category: 'academics',
          },
          {
            text: 'Received Academic Partner Excellence Award 2019 from ICT Academy.',
            tag: 'ICT Partner Award',
            category: 'awards',
          },
          {
            text: '‘Distinctive Citation’ for Research and Innovation and ‘Torchbearer’ award in Higher Education from India Didac Association partnered with MSDE, MeitY, AICTE, Digital India, Skill India, and UNESCO.',
            tag: 'Didac Torchbearer',
            category: 'awards',
          },
          {
            text: 'One among 8 partner institutes of AICTE across the Nation for FDP programs, and selected as Nodal Center for MHRD Innovation Cell.',
            tag: 'AICTE Partner FDP',
            category: 'collaborations',
          },
          {
            text: 'Identified to mentor 10 non-accredited Institutions in our geographic vicinity to support them in obtaining NAAC accreditation.',
            tag: 'NAAC Mentorship',
            category: 'academics',
          },
          {
            text: 'Selected among 800 institutions by MHRD for establishing Institution Innovation Council (IIC) to promote research culture among students.',
            tag: 'IIC Setup',
            category: 'innovation',
          },
          {
            text: 'Kovai Vizha Best Innovation Award bagged by SAR – SKCET Club.',
            tag: 'SAR Club Award',
            category: 'innovation',
          },
          {
            text: 'Significant laurels in Hack Harvard 2019 (Harvard University, USA), Hack & Roll 2020 (NTU Singapore), TCS Connect XR Hackathon, TN Police Hackathon, Cameron Innovay, and Indian Karting Race.',
            tag: 'Global Hackathons',
            category: 'hackathons',
          },
          {
            text: 'Awarded “Best Engineering College in Tamil Nadu” for the Year 2019 for outstanding contributions towards education, skill development, and research.',
            tag: 'Best College in TN',
            category: 'awards',
          },
        ],
      },
      {
        year: '2018',
        highlights: [
          {
            text: 'Acquired 2nd Rank in National Level SWACHH Campus Rankings.',
            tag: 'Swachh Campus 2nd',
            category: 'rankings',
          },
          {
            text: 'Secured 13th Rank at National Level in NPTEL Examinations.',
            tag: 'NPTEL Rank 13',
            category: 'academics',
          },
          {
            text: 'One among 28 Nodal Centres across India for AICTE Smart India Hackathon and one among 8 Institutes chosen for live video sessions.',
            tag: 'SIH Nodal Centre',
            category: 'hackathons',
          },
          {
            text: 'Final Year Civil Engineering and CSE students won Persistent Systems Inspiration Award with cash prize of Rs. 10,000/- under Ministry of Water Resources, Ganga River Development.',
            tag: 'Persistent Award',
            category: 'awards',
          },
        ],
      },
      {
        year: '2017',
        highlights: [
          {
            text: 'DSIR – Scientific Research Organization (SIRO) Recognized DST – IEDC Research Centre established along with ICTACT Academic Partner Excellence.',
            tag: 'DSIR SIRO & IEDC',
            category: 'research',
          },
          {
            text: 'Initiation of PMKVY Skill Development Programme on campus.',
            tag: 'PMKVY Launch',
            category: 'academics',
          },
          {
            text: 'The college was one among 26 Nodal Centres across India for AICTE Smart India Hackathon and one among 6 Institutes for live video sessions.',
            tag: 'SIH Nodal Centre',
            category: 'hackathons',
          },
          {
            text: 'Obtained NBA Accreditation for 4 courses: CSE, ECE, IT, and Mechanical Engineering.',
            tag: 'NBA 4 Courses',
            category: 'academics',
          },
          {
            text: 'SAE India SKCET Collegiate Club received Best Student of the Year award, Best Collegiate Club in Southern Region, and Best Club Display award for 5 consecutive times.',
            tag: 'SAE India Awards',
            category: 'awards',
          },
        ],
      },
      {
        year: '2016',
        highlights: [
          {
            text: 'Full-fledged Axis Bank Branch with 24/7 ATM facility inaugurated on campus.',
            tag: 'Campus Banking',
            category: 'infrastructure',
          },
          {
            text: 'New Classroom Block-5 inaugurated.',
            tag: 'Block-5 Opening',
            category: 'infrastructure',
          },
          {
            text: 'Industry involvement in syllabus drafting with faculty visiting over 130 industries for industry-ready curriculum design.',
            tag: 'Industry Syllabus',
            category: 'academics',
          },
          {
            text: 'SAE India SKCET Collegiate Club bagged Best Faculty Advisor award (2nd time), Best Student of the Year, Best Collegiate Club in Southern Region, and Best Club Display (4 times).',
            tag: 'SAE India Club',
            category: 'awards',
          },
        ],
      },
      {
        year: '2015',
        highlights: [
          {
            text: 'The Institution was accredited by NAAC with prestigious ‘A’ Grade.',
            tag: 'NAAC ‘A’ Grade',
            category: 'academics',
          },
          {
            text: 'All classrooms were converted to modern studio rooms fitted with interactive smart whiteboards.',
            tag: 'Smart Classrooms',
            category: 'infrastructure',
          },
          {
            text: 'State Bank of India ATM center opened in Amenities Center; New Alumni Office inaugurated in the Administrative Block.',
            tag: 'Campus Amenities',
            category: 'infrastructure',
          },
          {
            text: 'Marked the grand opening of Ramakrishna Rural Health Center at the Campus.',
            tag: 'Rural Health Center',
            category: 'infrastructure',
          },
          {
            text: 'Initiated industry involvement in syllabus drafting with visits to around 120 industries for industry-ready syllabus.',
            tag: 'Industry Syllabus',
            category: 'academics',
          },
        ],
      },
      {
        year: '2014',
        highlights: [
          {
            text: 'Established Controller of Examination (CoE) Office, Placement & Training Division, and Principal’s Office.',
            tag: 'Admin Infrastructure',
            category: 'infrastructure',
          },
          {
            text: 'Opening of Civil Engineering Block and Extension of Mechanical Workshop Block to augment Civil Engineering Laboratories.',
            tag: 'Civil Engg Block',
            category: 'infrastructure',
          },
          {
            text: 'Inauguration of SAE Lab and Incubation Centre at Administrative Block.',
            tag: 'Incubation Centre',
            category: 'innovation',
          },
          {
            text: 'Sanctioned strength of ME – CSE and ME – PED increased from 18 to 24 seats.',
            tag: 'Intake Expansion',
            category: 'academics',
          },
        ],
      },
      {
        year: '2013',
        highlights: [
          {
            text: 'Total intake in each respective branch of B.E CSE, B.E ECE, and B.Tech IT increased to 180 (Total intake in B.E/B.Tech increased to 1,080).',
            tag: 'Intake 1080',
            category: 'academics',
          },
          {
            text: 'New Classroom Block 3 opened.',
            tag: 'Block 3 Opening',
            category: 'infrastructure',
          },
          {
            text: 'Inauguration of DST-sponsored Innovation and Entrepreneurship Development Centre (IEDC) at Administrative Block.',
            tag: 'DST IEDC',
            category: 'innovation',
          },
          {
            text: 'MCA Department granted Research Centre recognition by Anna University for pursuing PhD / M.S. programmes by Research.',
            tag: 'PhD Research Centre',
            category: 'research',
          },
        ],
      },
      {
        year: '2012',
        highlights: [
          {
            text: 'Total intake in B.E Mechanical and B.E ECE increased to 180 (Total Intake in B.E/B.Tech increased to 900).',
            tag: 'Intake 900',
            category: 'academics',
          },
          {
            text: 'UG programme B.E Civil Engineering course started.',
            tag: 'B.E Civil Launch',
            category: 'academics',
          },
          {
            text: 'PG programmes M.E Engineering Design and M.E Power Electronics & Drives courses started.',
            tag: 'New PG Programmes',
            category: 'academics',
          },
        ],
      },
      {
        year: '2011',
        highlights: [
          {
            text: 'College attained prestigious Autonomous Status (2011 – 2016).',
            tag: 'Autonomous Status',
            category: 'academics',
          },
          {
            text: 'Total intake in B.E / B.Tech increased to 720.',
            tag: 'Intake 720',
            category: 'academics',
          },
          {
            text: 'PG Programmes M.E Software Engineering and M.E Applied Electronics courses started.',
            tag: 'New PG Courses',
            category: 'academics',
          },
          {
            text: 'Vankatram Learning Centre (Central Library) was formally inaugurated on 24th November 2011 by His Excellency the Governor of Tamil Nadu, Dr. K. Rosaiah.',
            tag: 'Central Library',
            category: 'infrastructure',
          },
        ],
      },
      {
        year: '2010',
        highlights: [
          {
            text: 'Inauguration of Sri Krishna Hall – indoor sports stadium cum auditorium.',
            tag: 'Sri Krishna Hall',
            category: 'infrastructure',
          },
          {
            text: 'Recognition of institution to become eligible for funding from UGC for research work under 2(f) & 12(B) of the UGC Act, 1956.',
            tag: 'UGC 2(f) & 12(B)',
            category: 'research',
          },
          {
            text: 'ISO Certification upgraded to ISO 9001:2008 by TUV South Asia Pvt Ltd.',
            tag: 'ISO 9001:2008',
            category: 'academics',
          },
          {
            text: 'First International Conference on Intelligent Design and Analysis of Engineering Products, System Computation organized.',
            tag: 'Intl Conference',
            category: 'research',
          },
        ],
      },
    ],
  },

  /* ── 2. Rankings & Recognitions ────────────────────────────────────── */
  rankings: {
    intro: `SKCET consistently secures premier ranks across national and global ranking frameworks including NIRF, ARIIA, Swayam NPTEL, QS World Ratings, and THE SDG Impact Rankings.`,
    rankCards: [
      {
        badge: 'NIRF 2025',
        title: 'Top 100 in Engineering',
        rank: '100th',
        sub: 'National Institutional Ranking Framework, Ministry of Education, GoI',
        highlight: 'Rank 100 in Engineering Category & 11–50 Band in Innovation Category',
      },
      {
        badge: 'ARIIA / Innovation',
        title: 'All India Rank in Innovation',
        rank: 'Top 4',
        sub: 'Ministry of Education Innovation Cell (ARIIA Ranking)',
        highlight: 'Rank 2 (2020), Rank 4 (2021, 2022), Rank 11 (2023)',
      },
      {
        badge: 'Swayam NPTEL 2024',
        title: 'National & State Leader',
        rank: '66th',
        sub: 'Among 6,598 Higher Educational Institutions Pan-India',
        highlight: '17th in Tamil Nadu and 1st in Coimbatore Zone among Engineering Colleges',
      },
      {
        badge: 'IIC Performance',
        title: '5-Star / 4-Star Rating',
        rank: '5 ★',
        sub: 'Institution’s Innovation Council, Ministry of Education',
        highlight: 'Top 100 Mentoring Institution Pan India with Rs. 2.25L Grant',
      },
      {
        badge: 'THE Impact Rankings',
        title: 'Global SDG Recognition',
        rank: 'Global',
        sub: 'Times Higher Education SDG Impact Ratings 2025',
        highlight: 'Recognized for impactful contributions to UN Sustainable Development Goals',
      },
      {
        badge: 'QS Ratings',
        title: 'Global Excellence Footprint',
        rank: 'QS',
        sub: 'QS World University Rankings Rating System',
        highlight: 'Demonstrated benchmark standards across teaching, research, and employability',
      },
      {
        badge: 'India Today MRDA',
        title: 'Value for Money',
        rank: 'Top 5th',
        sub: 'India Today MRDA Ranking of Best Private Engineering Colleges',
        highlight: 'Recognized among top private engineering institutions offering highest ROI',
      },
      {
        badge: 'TNEA Admissions',
        title: 'Student Preference',
        rank: '4th',
        sub: 'Tamil Nadu Engineering Admissions (TNEA) Merit Ranking',
        highlight: 'Among the most sought-after colleges for engineering aspirants across Tamil Nadu',
      },
    ],
    nirfJourney: [
      { year: '2025', rank: '100th Rank (Engineering) | 11-50 Band (Innovation)' },
      { year: '2024', rank: '83rd Rank (Engineering)' },
      { year: '2023', rank: '77th Rank (Engineering) | 101-125 (Management) | 101-150 (Overall)' },
      { year: '2022', rank: '73rd Rank (Engineering)' },
      { year: '2021', rank: '78th Rank (Engineering)' },
      { year: '2020', rank: '83rd Rank (Engineering)' },
      { year: '2019', rank: '97th Rank (Engineering)' },
    ],
  },

  /* ── 3. Historical Milestones (1998 - 2007) ─────────────────────────── */
  'historical-milestones': {
    intro: `From our humble beginnings in 1998 with four engineering departments to a nationally acclaimed autonomous powerhouse, explore the formative foundation that paved the way for SKCET's greatness.`,
    milestones: [
      {
        year: '2007',
        items: [
          'Obtained NBA-AICTE Accreditation for MCA, MCT, and EEE courses.',
          'Hall of Residence for Women Block 2 inaugurated.',
        ],
      },
      {
        year: '2006',
        items: [
          'Obtained NBA-AICTE Accreditation for BE Mech, ECE, CSE, B.Tech IT, and MBA Courses.',
          'First place for the Best-Maintained Garden in educational institution category at Kovai Flower Show (2nd time).',
          'Additional rooms & dining hall block for the Hall of Residence for Men opened.',
        ],
      },
      {
        year: '2005',
        items: [
          'College garden adjudged Best-Maintained Garden among educational institutions at the KOVAI Flower Show.',
          'Total intake in B.E / B.Tech increased to 420.',
          'Awarded Best College for Voluntary Blood Donation by Bharathiar University.',
        ],
      },
      {
        year: '2004',
        items: [
          'Introduction of student group accident insurance policies.',
          'PG programmes ME in CAD/CAM, Computer Science and Engineering, and Communication Systems started.',
          'Central Library Block and additional Hall of Residence in Men’s Block opened.',
          'Extension Counter of “The Lakshmi Vilas Bank” inside the Campus opened.',
        ],
      },
      {
        year: '2003',
        items: [
          'Ranked 3rd among 228 affiliated colleges in Tamil Nadu in Anna University Examinations.',
          'ISTE Student Chapter of SKCET inaugurated by Prof. H. P. Sinha, Program Director and Executive Secretary, ISTE, New Delhi.',
          'First Alumni Meet held on 18th January 2003 with more than 120 Alumni.',
        ],
      },
      {
        year: '2002',
        items: [
          'ISO 9001:2000 Certification obtained.',
          'Total intake in B.E / B.Tech increased to 400.',
          'College newsletter “Panchajanya” released.',
          'Inauguration of MCT/EEE block by Mr. Ramasamy, Chairman, Roots Industries, Coimbatore.',
          'First college website launched, developed by J. Karthick of IV B.Tech IT.',
        ],
      },
      {
        year: '2001',
        items: [
          'MBA, B.E EEE, and M.Sc CT courses started.',
          'Total intake in B.E / B.Tech increased to 380.',
          'First State level Technical Symposium “TECHSEM” conducted.',
          'ECE, CSE Blocks, Hall of Residence – Men and Women, MBA & MCA Blocks completed.',
        ],
      },
      {
        year: '2000',
        items: [
          'ISO 9001:2000 Certification obtained.',
          'Total intake in B.E / B.Tech increased to 400.',
          'College newsletter “Panchajanya” released.',
          'Inauguration of MCT/EEE block by Mr. Ramasamy, Chairman, Roots Industries, Coimbatore.',
        ],
      },
      {
        year: '1999',
        items: [
          'B.Sc CT and B.Sc IT Programmes started.',
          'Total intake in B.E / B.Tech increased to 240.',
          'Formal Inauguration of Classroom Block 1 by Sri Azim Premji, Chairman, Wipro Technologies.',
        ],
      },
      {
        year: '1998',
        items: [
          'Sri Krishna College of Engineering and Technology started on 8th September 1998 with four branches of Engineering (MECH, ECE, CSE, IT) and an initial intake of 180 students.',
        ],
      },
    ],
  },

  /* ── 4. Department Achievements ────────────────────────────────────── */
  'department-achievements': {
    departments: [
      {
        id: 'cse', code: 'CSE', name: 'Computer Science and Engineering',
        highlights: [
          'NBA Accreditation awarded for 3 years up to 30.06.2026.',
          'Ranked #1 in Infosys Springboard Tamil Nadu for maximum certifications in Cyber Security, AI, and IoT.',
          'Six SIH 2024 winning teams from CSE department, winning ₹6,00,000 in prize money.',
          'Students won Hack Harvard 2019 (Harvard University, USA) and Hack & Roll 2020 (NTU Singapore).',
          'Established as Nodal Resource Centre under IIT Delhi – Virtual Labs, Ministry of Education.',
          'SKCET becomes Nodal Resource Center for Spoken Tutorial, IIT Bombay.',
          'B.E CSE in partnership with TCS Ltd. — exclusive industry-integrated degree program.',
          'M.Tech CSE (5-year Integrated) powered by Virtusa Corporation launched.',
          'ARIIA Rank 2 (2020) — top innovation performance nationally for CSE-led research.',
        ],
      },
      {
        id: 'it', code: 'IT', name: 'Information Technology',
        highlights: [
          'NBA Accreditation awarded for 3 years up to 30.06.2026.',
          'B.Tech IT students consistently rank among top performers in NPTEL national examinations.',
          'IT students won prizes in TCS Connect XR Hackathon and TN Police Hackathon.',
          'Active participation in Toycathon 2021 — SKCET chosen as prestigious nodal center.',
          'IT Club achieved Best Spoke Institution for IEDP Promotional activities under PMO-IEDP 2021-22.',
          'Received Best CoE Partner Award by Virtusa for Full-stack Java domain (2 consecutive years).',
        ],
      },
      {
        id: 'aids', code: 'AI & DS', name: 'Artificial Intelligence & Data Science',
        highlights: [
          'Department established with cutting-edge AI & Data Science curriculum aligned with industry 4.0.',
          'Students participated in national-level hackathons including Smart India Hackathon 2024 & 2025.',
          'AICTE IDEA Lab — students leverage the lab for AI research and prototype development.',
          'Cisco NetAcad Excellence Award received, with AI being a key domain of certification.',
          'Aero Vision Drone Centre of Excellence leverages AI navigation developed by AI & DS students.',
          'Active industry collaborations with leading AI companies through MoUs and internships.',
        ],
      },
      {
        id: 'csbs', code: 'CSBS', name: 'Computer Science and Business Systems',
        highlights: [
          'Launched in partnership with TCS Ltd. — one of India\'s first CSBS programs.',
          'Industry-integrated curriculum designed with direct TCS input for real-world relevance.',
          'Students benefit from TCS mentorship, internships, and placement pipeline.',
          'Participated in Smart India Hackathon 2024 as one of the winning teams.',
          'Strong placements with TCS and partner MNCs owing to the dedicated industry-linked program.',
        ],
      },
      {
        id: 'ece', code: 'ECE', name: 'Electronics and Communication Engineering',
        highlights: [
          'NBA Accreditation awarded for 3 years up to 30.06.2026.',
          'Aero Vision Drone Centre of Excellence — ECE students lead UAV hardware & RF research.',
          'Students secured significant laurels in Cameron Innovay and Indian Karting Race competitions.',
          'ECE students won Persistent Systems Inspiration Award under Ministry of Water Resources.',
          'DSIR – Scientific Research Organization (SIRO) recognized ECE-led research contributions.',
          'Active participation in Smart India Hackathon as nodal center for 6 consecutive years.',
          'Students recognized in IIC annual performance ratings for innovation and entrepreneurship.',
        ],
      },
      {
        id: 'eee', code: 'EEE', name: 'Electrical and Electronics Engineering',
        highlights: [
          'NBA Accreditation awarded for 6 UG Programmes including EEE (2020).',
          'Ranked 2nd in Clean & Smart Campus 2019 by Swachh Bharat Mission Council — EEE dept. led initiative.',
          'USVA National Third Rank (2019) for enhancing village income through EEE technology practices.',
          'First NBA-AICTE Accreditation obtained for EEE (2007) — a foundational milestone.',
          'Participation in energy-focused research projects recognized by the DSIR SIRO certification.',
          'EEE students actively contribute to Jal Shakti Abhiyan and sustainability initiatives.',
        ],
      },
      {
        id: 'mech', code: 'MECH', name: 'Mechanical Engineering',
        highlights: [
          'NBA Accreditation awarded for 3 years up to 30.06.2026.',
          'SAE India SKCET Collegiate Club — Best Student of the Year, Best Club in Southern Region (5 times).',
          'SAE India Club received Best Faculty Advisor Award (2nd time), Best Club Display (4 consecutive times).',
          'SAE Lab and Incubation Centre inaugurated at Administrative Block (2014).',
          'Students won prizes in Indian Karting Race and national-level design challenges.',
          'Mechanical students lead hands-on research at the Aero Vision Drone Centre of Excellence.',
          'Industry-integrated curriculum with faculty visiting 130+ industries for syllabus design.',
        ],
      },
      {
        id: 'mct', code: 'MCT', name: 'Mechatronics Engineering',
        highlights: [
          'Mechatronics program integrates mechanical, electronics, and computing for advanced automation.',
          'Students participate in national robotics competitions and smart manufacturing challenges.',
          'AICTE IDEA Lab used extensively by MCT students for prototype and robotics development.',
          'MCT students contribute to Aero Vision Drone Centre UAV mechanical systems research.',
          'Collaboration with industry partners for real-world mechatronics system design projects.',
          'Active participation in Smart India Hackathon 2024 and 2025 under manufacturing problems.',
        ],
      },
      {
        id: 'civil', code: 'CIVIL', name: 'Civil Engineering',
        highlights: [
          'Civil Engineering Block and Extension of Mechanical Workshop Block inaugurated (2014).',
          'Final year Civil students won Persistent Systems Inspiration Award under Ministry of Water Resources, Ganga River Development.',
          'Jal Shakti Abhiyan — National Third Rank for planting 10,050 trees on SKCET campus.',
          'NAAC \'A\' Grade accreditation (2015) with Civil Engineering contributing to infrastructure excellence.',
          'Students recognized for research in sustainable construction and water conservation.',
          'ISO 9001:2008 certification — Civil department systems & quality protocols cited.',
        ],
      },
      {
        id: 'csd', code: 'CSD', name: 'Computer Science and Design',
        highlights: [
          'CSD program bridges technology and design for UI/UX, digital media, and creative computing.',
          'Students recognized at national design competitions and digital innovation challenges.',
          'Collaboration with NASSCOM Future Skills Prime for design-linked certification courses.',
          'Students participate in national hackathons and creative tech competitions under SIH.',
          'AICTE IDEA Lab provides design prototyping facilities leveraged by CSD students.',
          'Industry tie-ups for live project experience in UX design and digital product development.',
        ],
      },
      {
        id: 'mba', code: 'MBA', name: 'School of Management (MBA)',
        highlights: [
          'MBA program ranked 101-125 Band in Management Category — NIRF 2023.',
          'NASSCOM Future Skills Prime MoU — MBA students among the first to earn joint certification.',
          'ICT Academy Awards: Most Engaged Institution 2023 & National SKILL-A-THON 2022 winners.',
          'India Didac Torchbearer Award in Higher Education for MBA-led innovation in management education.',
          'MBA students represent SKCET at national-level government and industry interface programs.',
          'Industry Academia Excellence Award recognizing MBA-led industry-based campus initiatives.',
        ],
      },
      {
        id: 'sh', code: 'S&H', name: 'Science and Humanities',
        highlights: [
          'S&H department supports all engineering programs with foundational science and communication skills.',
          'Faculty contribute to research publications recognized under DSIR SIRO certification.',
          'Students from S&H actively participate in cultural events, NSS, and social outreach programs.',
          'Recognized for Bhumi Campus Awards 2022 — dedicated efforts towards Unique Social Initiatives.',
          'AICTE-Lilavati Award 2021-22 winner under \'Sanitation and Hygiene\' — S&H faculty-led initiative.',
          'First International Conference on Intelligent Design (2010) organized with S&H faculty involvement.',
        ],
      },
    ],
  },
};

export default ACHIEVEMENTS_CONTENT;
