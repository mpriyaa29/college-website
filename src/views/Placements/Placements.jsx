import React, { useState } from 'react';

export default function Placements() {
  const [activeDomain, setActiveDomain] = useState('team');
  const [activeYear, setActiveYear] = useState('2025');
  const [activeDept, setActiveDept] = useState('CSE');

  const navItems = [
    { id: 'team', num: '01', label: 'Placement Team' },
    { id: 'statistics', num: '02', label: 'Statistics' },
    { id: 'recruiters', num: '03', label: 'Recruiters' }
  ];

  const depts = ['AI&DS', 'Civil', 'CSBS', 'CSE', 'ECE', 'EEE', 'IT', 'MCT', 'MECH', 'M.Tech CSE', 'MBA'];

  const recruiters = [
    "Amazon", "IBM", "Oracle", "PayPal", "Salesforce", "JPMorgan Chase", "PwC",
    "Cognizant", "TCS", "Infosys", "Wipro", "HCL", "Capgemini", "Zoho", "Freshworks",
    "Thoughtworks", "Tiger Analytics", "NTT Data", "Verizon", "Axis Bank", "ICICI Bank",
    "Kotak Mahindra", "City Union Bank", "Federal Bank", "Bosch", "Ford", "Hyundai",
    "Ashok Leyland", "Bridgestone", "Titan Company", "Schneider Electric", "L&T Technology",
    "Tech Mahindra", "EPAM", "Virtusa", "Sopra Steria", "CGI", "SuperOps.ai", "Trustrace",
    "Facilio", "Securden", "Mitsogo"
  ];

  const deptCoordinators = [
    { name: 'Ms. K. Sudha', dept: 'CSE' },
    { name: 'Dr. S. Abirami', dept: 'CSE' },
    { name: 'Ms. A. Gomathi', dept: 'CSE' },
    { name: 'Dr. M. Diwakaran', dept: 'IT' },
    { name: 'Mr. Lal Prakash', dept: 'IT' },
    { name: 'Ms. T. Sangeetha', dept: 'IT' },
    { name: 'Ms. S. Malathi', dept: 'IT' },
    { name: 'Mr. G.S. Pugalendhi', dept: 'AI&DS' },
    { name: 'Dr. R. Arunkumar', dept: 'AI&DS' },
    { name: 'Ms. G. Anitha', dept: 'CYS' },
    { name: 'Mr. T.R. Kalaiarasan', dept: 'CSBS & CSD' },
    { name: 'Mr. K. Mohan', dept: 'AIML & IoT' },
    { name: 'Ms. S. Kanagapriya', dept: 'M.Tech CSE' },
    { name: 'Dr. S. Gowthami', dept: 'ECE' },
    { name: 'Dr. P. Rajasekar', dept: 'ECE' },
    { name: 'Mr. S. Shanmuga Raju', dept: 'ECE' },
    { name: 'Dr. T. Bharani Prakash', dept: 'EEE' },
    { name: 'Ms. Pavithra C', dept: 'EEE' },
    { name: 'Ms. S. Nithyapriya', dept: 'MCT' },
    { name: 'Dr. R. Arunbharathi', dept: 'Mech' },
    { name: 'Mr. K. Mohan', dept: 'Mech' },
    { name: 'Dr. S. Ramakrishnan', dept: 'Civil' },
    { name: 'Dr. K.V. Manju', dept: 'MBA' }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        :root{
          --navy:#1c2b4a;
          --gold:#c8952b;
          --bg:#fafaf8;
          --panel:#ffffff;
          --line:#e7e4dc;
          --text:#1c2b4a;
          --muted:#6b7280;
          --muted-2:#9aa0ab;
        }

        .acc-wrapper {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .acc-wrapper * {
          box-sizing: border-box;
        }

        .layout{
          display:flex;
          min-height:100vh;
        }

        /* ---------- Sidebar ---------- */
        .sidebar{
          width:260px;
          flex:0 0 260px;
          background:var(--bg);
          border-right:1px solid var(--line);
          padding:56px 0 40px 46px;
          position:relative;
        }

        .nav-item{
          position:relative;
          display:flex;
          align-items:center;
          gap:18px;
          padding:0 0 46px 0;
          cursor:pointer;
          user-select:none;
          background:none;
          border:none;
          text-align:left;
          width:100%;
        }
        .nav-item:last-child{padding-bottom:0;}

        .nav-line{
          position:absolute;
          left:22px;
          top:44px;
          width:1px;
          height:calc(100% - 30px);
          background:var(--line);
          z-index:0;
        }
        .nav-item:last-child .nav-line{display:none;}

        .nav-circle{
          flex:0 0 44px;
          width:44px;
          height:44px;
          border-radius:50%;
          border:1.5px solid var(--line);
          background:var(--panel);
          display:flex;
          align-items:center;
          justify-content:center;
          font-family:'Inter',sans-serif;
          font-size:13px;
          font-weight:600;
          color:var(--muted-2);
          letter-spacing:.5px;
          z-index:1;
          transition:all .25s ease;
        }

        .nav-label{
          font-size:16px;
          font-weight:500;
          color:#8b8f99;
          letter-spacing:.2px;
          transition:all .25s ease;
          line-height:1.3;
        }

        .nav-item.active .nav-circle{
          background:var(--gold);
          border-color:var(--gold);
          color:#fff;
          box-shadow:0 0 0 5px rgba(200,149,43,0.16);
        }
        .nav-item.active .nav-label{
          color:var(--gold);
          font-weight:600;
        }
        .nav-item:not(.active):hover .nav-label{ color:var(--navy); }
        .nav-item:not(.active):hover .nav-circle{ border-color:var(--navy); color:var(--navy); }

        /* ---------- Main panel ---------- */
        .main{
          flex:1;
          padding:56px 64px 80px 56px;
          overflow:hidden;
        }

        .domain{ display:none; }
        .domain.active{ display:block; animation:fade .35s ease; }

        @keyframes fade{
          from{opacity:0; transform:translateY(6px);}
          to{opacity:1; transform:translateY(0);}
        }

        /* Header */
        .head{
          margin-bottom:32px;
        }
        .head h1{
          font-family:'Playfair Display',serif;
          font-size:46px;
          font-weight:600;
          margin:0 0 6px 0;
          color:var(--navy);
          letter-spacing:1px;
          line-height:1.1;
          text-transform:uppercase;
        }
        .head .subtitle{
          font-size:16px;
          color:var(--muted-2);
          letter-spacing:.3px;
          margin:0;
          font-weight:400;
        }
        .head-rule{
          width:52px;
          height:3px;
          background:var(--gold);
          margin-top:14px;
        }

        .desc{
          max-width:820px;
          color:#3f4759;
          font-size:16px;
          line-height:1.8;
          margin:28px 0 44px 0;
        }

        .section-label{
          font-size:12px;
          font-weight:700;
          letter-spacing:1.8px;
          color:var(--navy);
          text-transform:uppercase;
          margin:0 0 10px 0;
        }
        .section-rule{
          width:100%;
          border-bottom:1px solid var(--line);
          margin-bottom:32px;
        }
        .section-rule-short{
          width:36px;
          height:2px;
          background:var(--gold);
          margin-bottom:28px;
        }

        /* Grid text block */
        .grid-2-text{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:48px;
          margin-bottom:56px;
        }
        .editorial-block h3{
          font-family:'Playfair Display',serif;
          font-size:24px;
          color:var(--navy);
          margin-bottom:18px;
          font-weight:600;
        }
        .editorial-block p{
          font-size:15px;
          line-height:1.8;
          color:#3f4759;
          margin:0;
        }

        /* Numbered editorial list */
        .numbered-list{
          border-top:1px solid var(--line);
          margin-bottom:56px;
        }
        .nl-item{
          display:flex;
          align-items:flex-start;
          padding:24px 0;
          border-bottom:1px solid var(--line);
        }
        .nl-num{
          font-family:'Playfair Display',serif;
          font-size:24px;
          color:var(--gold);
          font-weight:600;
          width:60px;
          flex:0 0 60px;
          margin-top:-4px;
        }
        .nl-text{
          font-size:15.5px;
          color:#293345;
          line-height:1.8;
          flex:1;
        }

        /* Director Block */
        .director-block{
          display:flex;
          align-items:flex-start;
          gap:44px;
          margin-bottom:60px;
        }
        .director-info{
          flex:1;
        }
        .director-info h2{
          font-family:'Playfair Display',serif;
          font-size:32px;
          color:var(--navy);
          margin:0 0 8px 0;
        }
        .director-info .role{
          font-size:13px;
          text-transform:uppercase;
          letter-spacing:1.5px;
          color:var(--gold);
          font-weight:700;
          margin-bottom:24px;
        }
        .director-info p{
          font-size:15px;
          color:#4a5568;
          margin-bottom:8px;
        }
        .director-image-container{
          width:300px;
          height:380px;
          flex:0 0 300px;
          background:var(--panel);
          border:4px solid #fff;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.15);
          overflow:hidden;
          position:relative;
        }
        .director-image-container::before {
          content: '';
          position:absolute;
          top:0; left:0; right:0; bottom:0;
          border:1px solid var(--line);
          z-index: 10;
          pointer-events: none;
        }
        .director-image{
          width:100%;
          height:100%;
          object-fit:cover;
          object-position:top;
          transition:transform .5s ease;
        }
        .director-image-container:hover .director-image{
          transform:scale(1.03);
        }

        /* Coordinators list */
        .coord-list{
          display:flex;
          flex-direction:column;
          gap:14px;
          margin-bottom:48px;
        }
        .coord-item{
          display:grid;
          grid-template-columns:220px 1fr;
          align-items:center;
          padding-bottom:14px;
          border-bottom:1px solid var(--line);
        }
        .coord-item:last-child{ border-bottom:none; }
        .coord-name{
          font-size:16px;
          color:var(--navy);
          font-weight:600;
        }
        .coord-dept{
          font-size:14px;
          color:var(--muted);
        }

        .dept-list-text{
          font-size:15px;
          line-height:1.9;
          color:#3f4759;
          margin-top:16px;
        }

        /* Statistics Editorial */
        .year-selector{
          display:flex;
          align-items:center;
          gap:32px;
          margin-bottom:40px;
          border-bottom:1px solid var(--line);
        }
        .year-btn{
          background:none;
          border:none;
          padding:0 0 16px 0;
          font-family:'Playfair Display',serif;
          font-size:24px;
          font-weight:600;
          color:var(--muted-2);
          cursor:pointer;
          position:relative;
          transition:color .25s ease;
        }
        .year-btn.active{
          color:var(--navy);
        }
        .year-btn::after{
          content:'';
          position:absolute;
          left:0; bottom:-1px;
          width:100%; height:2px;
          background:transparent;
          transition:background .25s ease;
        }
        .year-btn.active::after{
          background:var(--gold);
        }

        .stats-grid{
          display:grid;
          grid-template-columns:repeat(4, 1fr);
          gap:0;
          border-top:1px solid var(--line);
          border-bottom:1px solid var(--line);
          margin-bottom:60px;
        }
        .stat-block{
          padding:40px 30px;
          border-right:1px solid var(--line);
          display:flex;
          flex-direction:column;
          justify-content:center;
        }
        .stat-block:last-child{
          border-right:none;
        }
        .stat-big{
          font-family:'Playfair Display',serif;
          font-size:56px;
          font-weight:500;
          color:var(--navy);
          line-height:1;
          margin-bottom:12px;
        }
        .stat-sub{
          font-size:12px;
          font-weight:700;
          letter-spacing:1px;
          text-transform:uppercase;
          color:var(--muted);
        }
        .stat-super{
          font-size:18px;
          vertical-align:top;
          color:var(--gold);
        }

        /* Dept Selector Tabs */
        .dept-tabs{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          margin-bottom:40px;
        }
        .dept-tab{
          background:none;
          border:1px solid var(--line);
          padding:10px 22px;
          font-size:13px;
          font-weight:600;
          color:var(--muted);
          cursor:pointer;
          border-radius:30px;
          transition:all .25s ease;
        }
        .dept-tab.active{
          background:var(--navy);
          border-color:var(--navy);
          color:#fff;
        }
        .dept-tab:not(.active):hover{
          border-color:var(--gold);
          color:var(--gold);
        }
        
        .dept-stats-placeholder{
          width:100%;
          min-height:500px;
          border:1px dashed var(--line);
          background:var(--panel);
          display:flex;
          align-items:center;
          justify-content:center;
          color:var(--muted-2);
          font-size:14px;
          letter-spacing:1px;
          text-transform:uppercase;
        }

        /* Recruiters */
        .big-highlight{
          font-family:'Playfair Display',serif;
          font-size:110px;
          font-weight:500;
          color:var(--navy);
          line-height:0.9;
          margin-bottom:12px;
        }
        .big-highlight-sub{
          font-size:15px;
          letter-spacing:3px;
          text-transform:uppercase;
          color:var(--gold);
          font-weight:700;
          margin-bottom:56px;
        }

        .recruiter-images{
          display:flex;
          flex-direction:column;
          gap:40px;
          margin-bottom:60px;
        }
        .rec-img-item{
          width:100%;
          height:auto;
          border:1px solid var(--line);
          background:var(--panel);
          padding:30px;
        }

        .co-list-wrap{
          border-top:1px solid var(--line);
        }
        .co-list-row{
          display:flex;
          border-bottom:1px solid var(--line);
        }
        .co-list-col{
          flex:1;
          padding:24px 20px;
          border-right:1px solid var(--line);
          font-size:15.5px;
          color:#293345;
          font-weight:500;
        }
        .co-list-col:last-child{
          border-right:none;
        }

        @media (max-width: 900px){
          .layout{ flex-direction:column; }
          .sidebar{
            width:100%; flex:none;
            display:flex; overflow-x:auto;
            padding:24px 20px;
            border-right:none;
            border-bottom:1px solid var(--line);
          }
          .nav-item{ flex-direction:column; padding:0 24px 0 0; gap:8px; width:auto; }
          .nav-line{ display:none; }
          .main{ padding:32px 22px; }
          
          .director-block{ flex-direction:column; gap:30px; }
          .director-image-container{ width:100%; height:auto; aspect-ratio: 3/4; max-height:420px; }
          
          .grid-2-text{ grid-template-columns:1fr; gap:36px; }
          
          .stats-grid{ grid-template-columns:1fr 1fr; border-top:none; margin-bottom:40px; }
          .stat-block{ border-top:1px solid var(--line); padding:30px 20px; text-align:center; }
          .stat-block:nth-child(even){ border-right:none; }
          
          .recruiter-images{ flex-direction:column; }
          .co-list-row{ flex-direction:column; border-bottom:none; }
          .co-list-col{ border-right:none; border-bottom:1px solid var(--line); padding:16px 10px; }
          
          .big-highlight{ font-size:80px; }
        }
      `}</style>

      <div className="acc-wrapper pt-20">
        <div className="layout">
          {/* ===================== SIDEBAR ===================== */}
          <nav className="sidebar" id="sidebar">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-item ${activeDomain === item.id ? 'active' : ''}`}
                onClick={() => setActiveDomain(item.id)}
              >
                <div className="nav-line"></div>
                <div className="nav-circle">{item.num}</div>
                <div className="nav-label">{item.label}</div>
              </button>
            ))}
          </nav>

          {/* ===================== MAIN PANEL ===================== */}
          <main className="main">

            {/* ---------- 01 TEAM ---------- */}
            <section className={`domain ${activeDomain === 'team' ? 'active' : ''}`} id="team">
              <div className="head">
                <h1>Placement &<br />Training Cell</h1>
                <p className="subtitle">Preparing students for the corporate world</p>
                <div className="head-rule"></div>
              </div>

              <div className="director-block">
                <div className="director-info">
                  <div className="role">Placement Director</div>
                  <h2>Dr. Jayasudha Subburaj</h2>
                  <p>9442 346 613 / 9842 230 087</p>
                  <p>placement@skcet.ac.in</p>

                  <div className="desc" style={{ marginTop: '36px', marginBottom: '0' }}>
                    The Placement and Training Cell follows a student-centric approach to prepare students for the corporate world, with training activities planned throughout the year to prepare students for campus selection.<br /><br />
                    The placement records have set standards over the years, with new organizations visiting every year, and alumni performance across product-based, service-based, and core sectors appreciated by recruiting partners.
                  </div>
                </div>
                <div className="director-image-container">
                  <img src="/placement-director.jpg" alt="Dr. Jayasudha Subburaj, Placement Director" className="director-image" />
                </div>
              </div>

              <div className="grid-2-text">
                <div className="editorial-block">
                  <p className="section-label">Vision</p>
                  <div className="section-rule-short"></div>
                  <p>To bridge the gap between candidate skills and industry needs by producing competent resources equipped with personality development and campus recruitment training along with professional etiquette to thrive in their career.</p>
                </div>
                <div className="editorial-block">
                  <p className="section-label">Mission</p>
                  <div className="section-rule-short"></div>
                  <p>To strive for 100% placement by inviting recruitment teams from different corporates, through numerous training programs, workshops, seminars, and industry interactions, alongside faculty development programs for 360-degree improvement in student performance.</p>
                </div>
              </div>

              <p className="section-label">Key Responsibilities</p>
              <div className="numbered-list">
                <div className="nl-item">
                  <div className="nl-num">01</div>
                  <div className="nl-text">To train students to enhance their skills to face Campus drives by organizing training in Quantitative Aptitude, Logical Reasoning, Verbal, Soft Skills, Technical Training, and future skills through expert trainers and Corporate Officials</div>
                </div>
                <div className="nl-item">
                  <div className="nl-num">02</div>
                  <div className="nl-text">To support and give career guidance by organizing guest lectures by eminent personalities from corporate, academics, and SKCET Alumni.</div>
                </div>
                <div className="nl-item">
                  <div className="nl-num">03</div>
                  <div className="nl-text">To organize campus drives for final year students with Companies throughout India</div>
                </div>
              </div>

              <p className="section-label">Placement Coordinators</p>
              <div className="section-rule-short"></div>

              <div className="coord-list">
                <div className="coord-item">
                  <div className="coord-name">Mr. N. Girinath</div>
                  <div className="coord-dept">ECE</div>
                </div>
                <div className="coord-item">
                  <div className="coord-name">Dr. M. Kavitha</div>
                  <div className="coord-dept">CSE</div>
                </div>
                <div className="coord-item">
                  <div className="coord-name">Dr. S. Dilip Kumar</div>
                  <div className="coord-dept">EEE</div>
                </div>
              </div>

              <div style={{ marginTop: '56px' }}></div>
              <p className="section-label">Department Co-ordinators</p>
              <div className="section-rule-short"></div>

              <div className="coord-list">
                {deptCoordinators.map((coord, idx) => (
                  <div className="coord-item" key={idx}>
                    <div className="coord-name">{coord.name}</div>
                    <div className="coord-dept">{coord.dept}</div>
                  </div>
                ))}
              </div>

            </section>

            {/* ---------- 02 STATISTICS ---------- */}
            <section className={`domain ${activeDomain === 'statistics' ? 'active' : ''}`} id="statistics">
              <div className="head">
                <h1>Placement<br />Statistics</h1>
                <p className="subtitle">A record of opportunity and achievement</p>
                <div className="head-rule"></div>
              </div>

              <div className="year-selector">
                <button
                  className={`year-btn ${activeYear === '2025' ? 'active' : ''}`}
                  onClick={() => setActiveYear('2025')}
                >
                  2025
                </button>
                <button
                  className={`year-btn ${activeYear === '2024' ? 'active' : ''}`}
                  onClick={() => setActiveYear('2024')}
                >
                  2024
                </button>
              </div>

              {activeYear === '2025' && (
                <div className="stats-grid">
                  <div className="stat-block">
                    <div className="stat-big">90<span className="stat-super">.9%</span></div>
                    <div className="stat-sub">Placement Rate</div>
                  </div>
                  <div className="stat-block">
                    <div className="stat-big">₹47<span className="stat-super">L</span></div>
                    <div className="stat-sub">Highest Package</div>
                  </div>
                  <div className="stat-block">
                    <div className="stat-big">₹6<span className="stat-super">.20L</span></div>
                    <div className="stat-sub">Average Package</div>
                  </div>
                  <div className="stat-block">
                    <div className="stat-big">221</div>
                    <div className="stat-sub">Recruiters</div>
                  </div>
                </div>
              )}

              {activeYear === '2024' && (
                <div className="stats-grid">
                  <div className="stat-block">
                    <div className="stat-big">92<span className="stat-super">.6%</span></div>
                    <div className="stat-sub">Placement Rate</div>
                  </div>
                  <div className="stat-block">
                    <div className="stat-big">₹51<span className="stat-super">L</span></div>
                    <div className="stat-sub">Highest Package</div>
                  </div>
                  <div className="stat-block">
                    <div className="stat-big">₹51<span className="stat-super">L</span></div>
                    <div className="stat-sub">Microsoft Package</div>
                  </div>
                  <div className="stat-block">
                    <div className="stat-big">₹50<span className="stat-super">L</span></div>
                    <div className="stat-sub">Amazon Package</div>
                  </div>
                </div>
              )}

              <p className="section-label">Department-wise Placement</p>
              <div className="section-rule-short"></div>

              <div className="dept-tabs">
                {depts.map(d => (
                  <button
                    key={d}
                    className={`dept-tab ${activeDept === d ? 'active' : ''}`}
                    onClick={() => setActiveDept(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="dept-stats-placeholder">
                [ {activeDept} Infographic Data Area ]
              </div>
            </section>

            {/* ---------- 03 RECRUITERS ---------- */}
            <section className={`domain ${activeDomain === 'recruiters' ? 'active' : ''}`} id="recruiters">
              <div className="head">
                <h1>Our<br />Recruiters</h1>
                <p className="subtitle">Industry partnerships that create opportunity</p>
                <div className="head-rule"></div>
              </div>

              <div style={{ marginTop: '50px' }}>
                <div className="big-highlight">190+</div>
                <div className="big-highlight-sub">Recruiting Organisations</div>
              </div>

              <div className="recruiter-images">
                <img src="/recruiters-1.png" alt="Recruiters List 1" className="rec-img-item" />
                <img src="/recruiters-2.png" alt="Recruiters List 2" className="rec-img-item" />
                <img src="/recruiters-3.png" alt="Recruiters List 3" className="rec-img-item" />
              </div>

              <p className="section-label">Selected Hiring Partners</p>

              <div className="co-list-wrap">
                {/* We create rows of 4 items theoretically, but for clean structural flow we can do a flex row loop */}
                {Array.from({ length: Math.ceil(recruiters.length / 4) }).map((_, rowIndex) => (
                  <div className="co-list-row" key={rowIndex}>
                    {recruiters.slice(rowIndex * 4, rowIndex * 4 + 4).map((company, colIndex) => (
                      <div className="co-list-col" key={colIndex}>
                        {company}
                      </div>
                    ))}
                    {/* Fill empty columns if array length isn't multiple of 4 */}
                    {recruiters.slice(rowIndex * 4, rowIndex * 4 + 4).length < 4 &&
                      Array.from({ length: 4 - recruiters.slice(rowIndex * 4, rowIndex * 4 + 4).length }).map((_, emptyIndex) => (
                        <div className="co-list-col" key={`empty-${emptyIndex}`}></div>
                      ))}
                  </div>
                ))}
              </div>

            </section>

          </main>
        </div>
      </div>
    </>
  );
}
