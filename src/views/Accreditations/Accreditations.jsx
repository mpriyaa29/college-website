import React, { useState } from 'react';

export default function Accreditations() {
    const [activeDomain, setActiveDomain] = useState('naac');

    const navItems = [
        { id: 'naac', num: '01', label: 'NAAC' },
        { id: 'nba', num: '02', label: 'NBA' },
        { id: 'nirf', num: '03', label: 'NIRF' },
        { id: 'iqac', num: '04', label: 'IQAC' },
        { id: 'siro', num: '05', label: 'SIRO' },
        { id: 'other', num: '06', label: <>Other<br />Recognitions</> }
    ];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        :root{
          --navy:#1c2b4a;
          --gold:#c8952b;
          --gold-light:#e8b84b;
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
          padding:56px 64px 48px 56px;
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
          display:flex;
          align-items:center;
          margin-bottom:22px;
        }
        .head h1{
          font-family:'Playfair Display',serif;
          font-size:44px;
          font-weight:600;
          margin:0 0 4px 0;
          color:var(--navy);
          letter-spacing:.5px;
        }
        .head .subtitle{
          font-size:15px;
          color:var(--muted-2);
          letter-spacing:.3px;
          margin:0;
        }
        .head-rule{
          width:46px;
          height:3px;
          background:var(--gold);
          margin-top:10px;
          border-radius:2px;
        }

        .desc{
          max-width:760px;
          color:#3f4759;
          font-size:15.5px;
          line-height:1.7;
          margin:22px 0 30px 0;
        }

        .section-label{
          font-size:12px;
          font-weight:700;
          letter-spacing:1.6px;
          color:var(--navy);
          text-transform:uppercase;
          margin:0 0 8px 0;
        }
        .section-rule{
          width:34px;
          height:2px;
          background:var(--gold);
          margin-bottom:20px;
          border-radius:2px;
        }

        /* Status strip */
        .status-strip{
          display:flex;
          align-items:center;
          background:var(--panel);
          border:1px solid var(--line);
          border-radius:10px;
          padding:26px 30px;
          margin-bottom:36px;
          gap:0;
          flex-wrap:wrap;
        }
        .status-hero{
          flex:0 0 auto;
          padding-right:34px;
          border-right:1px solid var(--line);
          margin-right:34px;
          text-align:center;
          min-width:150px;
        }
        .status-hero .big{
          font-family:'Playfair Display',serif;
          font-size:52px;
          font-weight:700;
          color:var(--navy);
          line-height:1;
        }
        .status-hero .grade-caption{
          margin-top:10px;
          font-size:11px;
          font-weight:700;
          letter-spacing:1.4px;
          color:var(--gold);
          text-transform:uppercase;
        }

        .stat{
          flex:1 1 140px;
          padding:0 26px;
          border-right:1px solid var(--line);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          gap:8px;
          min-width:120px;
        }
        .stat:last-child{border-right:none;}
        .stat .stat-label{
          font-size:10.5px;
          font-weight:700;
          letter-spacing:1.2px;
          color:var(--muted-2);
          text-transform:uppercase;
        }
        .stat .stat-value{
          font-family:'Playfair Display',serif;
          font-size:19px;
          font-weight:600;
          color:var(--navy);
        }

        /* Timeline */
        .timeline{
          display:flex;
          align-items:flex-start;
          gap:0;
          margin:8px 0 40px 10px;
          max-width:640px;
        }
        .tl-node{
          display:flex;
          flex-direction:column;
          align-items:center;
          width:150px;
          text-align:center;
        }
        .tl-year{
          font-family:'Playfair Display',serif;
          font-size:20px;
          font-weight:700;
          color:var(--navy);
          margin-bottom:12px;
        }
        .tl-dot{
          width:14px;
          height:14px;
          border-radius:50%;
          margin-bottom:14px;
        }
        .tl-dot.past{ background:var(--navy); }
        .tl-dot.current{ background:var(--gold); }
        .tl-connector{
          flex:1;
          height:2px;
          margin-top:21px;
          background:linear-gradient(to right, var(--navy), var(--gold));
          position:relative;
          min-width:40px;
        }
        .tl-connector::before{
          content:'';
          position:absolute;
          left:50%; top:50%;
          transform:translate(-50%,-50%);
          width:8px; height:8px;
          border-radius:50%;
          background:var(--navy);
        }
        .tl-cycle{
          font-size:12px;
          font-weight:700;
          letter-spacing:.6px;
          text-transform:uppercase;
          margin-bottom:6px;
        }
        .tl-node:first-child .tl-cycle{ color:var(--muted-2); }
        .tl-node:last-child .tl-cycle{ color:var(--gold); }
        .tl-grade{ font-size:14.5px; font-weight:600; color:var(--navy); margin-bottom:3px; }
        .tl-meta{ font-size:12.5px; color:var(--muted); line-height:1.6; }

        /* Documents / list rows */
        .doc-list{
          border-top:1px solid var(--line);
        }
        .doc-row{
          display:flex;
          align-items:center;
          gap:22px;
          padding:16px 4px;
          border-bottom:1px solid var(--line);
        }
        .doc-num{
          font-family:'Playfair Display',serif;
          font-weight:700;
          color:var(--gold);
          font-size:16px;
          width:26px;
        }
        .doc-title{
          flex:1;
          font-size:15px;
          color:var(--text);
          font-weight:500;
        }
        .doc-link{
          font-size:13.5px;
          font-weight:600;
          color:var(--gold);
          text-decoration:none;
          display:flex;
          align-items:center;
          gap:6px;
          white-space:nowrap;
        }
        .doc-link:hover{ color:var(--navy); }

        /* Generic content blocks reused across domains */
        .grid-2{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:14px;
          margin-bottom:36px;
        }
        .cardline{
          background:var(--panel);
          border:1px solid var(--line);
          border-radius:10px;
          padding:16px 20px;
        }
        .cardline .cl-title{ font-size:14px; font-weight:600; color:var(--navy); margin-bottom:6px; }
        .cardline .cl-meta{ font-size:12.5px; color:var(--muted); line-height:1.7; }

        .badge{
          display:inline-block;
          padding:3px 11px;
          border-radius:20px;
          font-size:11px;
          font-weight:700;
          letter-spacing:.4px;
          background:rgba(200,149,43,.12);
          color:var(--gold);
          margin-left:8px;
        }

        .achv-year-block{ margin-bottom:26px; }
        .achv-year-title{
          font-family:'Playfair Display',serif;
          font-size:18px;
          font-weight:700;
          color:var(--navy);
          margin-bottom:10px;
        }
        .achv-list{ margin:0; padding-left:18px; }
        .achv-list li{
          font-size:14px;
          color:#3f4759;
          line-height:1.8;
        }

        .scroll-area{
          max-height:520px;
          overflow-y:auto;
          padding-right:10px;
        }
        .scroll-area::-webkit-scrollbar{ width:6px; }
        .scroll-area::-webkit-scrollbar-thumb{ background:var(--line); border-radius:4px; }

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
          .status-strip{ padding:20px; }
          .status-hero{ border-right:none; margin-right:0; padding-right:0; margin-bottom:16px; }
          .grid-2{ grid-template-columns:1fr; }
          .timeline{ flex-wrap:wrap; }
        }
      `}</style>

            {/* paddingTop is added to push content below a fixed global navbar if present */}
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

                        {/* ---------- 01 NAAC ---------- */}
                        <section className={`domain ${activeDomain === 'naac' ? 'active' : ''}`} id="naac">
                            <div className="head">
                                <div>
                                    <h1>NAAC</h1>
                                    <p className="subtitle">National Assessment and Accreditation Council</p>
                                    <div className="head-rule"></div>
                                </div>
                            </div>
                            <p className="desc">NAAC provides institutional-level assessment and accreditation, reflecting the institution's commitment to academic quality, governance and continuous improvement.</p>

                            <p className="section-label">Accreditation Status</p>
                            <div className="section-rule"></div>
                            <div className="status-strip">
                                <div className="status-hero">
                                    <div className="big">A++</div>
                                    <div className="grade-caption">NAAC Grade</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Assessment Date</div>
                                    <div className="stat-value">09.08.2024</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Cycle</div>
                                    <div className="stat-value">2nd Cycle</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">CGPA</div>
                                    <div className="stat-value">3.71 / 4</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">EC No.</div>
                                    <div className="stat-value">EC (SC-211)</div>
                                </div>
                            </div>

                            <p className="section-label">Accreditation Journey</p>
                            <div className="section-rule"></div>
                            <div className="timeline">
                                <div className="tl-node">
                                    <div className="tl-year">2015</div>
                                    <div className="tl-dot past"></div>
                                    <div className="tl-cycle">1st Cycle</div>
                                    <div className="tl-grade">A Grade</div>
                                    <div className="tl-meta">CGPA 3.42 / 4<br />03.03.2015<br />EC No. SC005</div>
                                </div>
                                <div className="tl-connector"></div>
                                <div className="tl-node">
                                    <div className="tl-year">2024</div>
                                    <div className="tl-dot current"></div>
                                    <div className="tl-cycle">2nd Cycle</div>
                                    <div className="tl-grade">A++ Grade</div>
                                    <div className="tl-meta">CGPA 3.71 / 4<br />09.08.2024<br />EC No. EC (SC-211)</div>
                                </div>
                            </div>

                            <p className="section-label">NAAC Documents</p>
                            <div className="section-rule"></div>
                            <div className="doc-list">
                                <div className="doc-row"><div className="doc-num">01</div><div className="doc-title">NAAC Certificate of Accreditation</div><a className="doc-link" href="#">View Document</a></div>
                                <div className="doc-row"><div className="doc-num">02</div><div className="doc-title">NAAC Quality Profile</div><a className="doc-link" href="#">View Document</a></div>
                                <div className="doc-row"><div className="doc-num">03</div><div className="doc-title">NAAC Accreditation Document</div><a className="doc-link" href="#">View Document</a></div>
                            </div>
                        </section>

                        {/* ---------- 02 NBA ---------- */}
                        <section className={`domain ${activeDomain === 'nba' ? 'active' : ''}`} id="nba">
                            <div className="head">
                                <div>
                                    <h1>NBA</h1>
                                    <p className="subtitle">National Board of Accreditation</p>
                                    <div className="head-rule"></div>
                                </div>
                            </div>
                            <p className="desc">NBA accredits individual programmes rather than the institution as a whole, certifying that a course of study meets defined quality benchmarks in curriculum, faculty and outcomes.</p>

                            <p className="section-label">Accreditation Status</p>
                            <div className="section-rule"></div>
                            <div className="status-strip">
                                <div className="status-hero">
                                    <div className="big">7</div>
                                    <div className="grade-caption">Programmes Accredited</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Current Cycle</div>
                                    <div className="stat-value">2023–2026</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Earliest Cycle</div>
                                    <div className="stat-value">2006</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Valid Until</div>
                                    <div className="stat-value">30.06.2026</div>
                                </div>
                            </div>

                            <p className="section-label">Programme-wise Accreditation</p>
                            <div className="section-rule"></div>
                            <div className="grid-2">
                                <div className="cardline">
                                    <div className="cl-title">CSE, ECE, IT, Mechanical <span className="badge">Cycle IV</span></div>
                                    <div className="cl-meta">Cycle I: 27.06.2006 &nbsp;·&nbsp; Cycle II: 16.09.2011 &nbsp;·&nbsp; Cycle III: 2017–20<br />Current: 2023–24 to 2025–26 — valid till 30.06.2026</div>
                                </div>
                                <div className="cardline">
                                    <div className="cl-title">Electrical & Electronics (EEE) <span className="badge">Compliance</span></div>
                                    <div className="cl-meta">Cycle I: 16.04.2009 &nbsp;·&nbsp; Cycle II: 2020–23<br />Current: 2023–24 to 2025–26 — valid till 30.06.2026</div>
                                </div>
                                <div className="cardline">
                                    <div className="cl-title">Mechatronics Engineering (MCT) <span className="badge">Compliance</span></div>
                                    <div className="cl-meta">Cycle I: 16.04.2009 &nbsp;·&nbsp; Cycle II: 2018–21 (ext. 2021–22)<br />Current: 2022–23 to 2024–25 — valid till 30.06.2025</div>
                                </div>
                                <div className="cardline">
                                    <div className="cl-title">Civil Engineering <span className="badge">Compliance</span></div>
                                    <div className="cl-meta">Cycle I: 2020–23<br />Current: 2023–24 to 2025–26 — valid till 30.06.2026</div>
                                </div>
                            </div>

                            <p className="section-label">NBA Documents</p>
                            <div className="section-rule"></div>
                            <div className="doc-list">
                                <div className="doc-row"><div className="doc-num">01</div><div className="doc-title">NBA Accreditation Certificate</div><a className="doc-link" href="#">View Document</a></div>
                                <div className="doc-row"><div className="doc-num">02</div><div className="doc-title">NBA DCP (Data Capture Plan)</div><a className="doc-link" href="#">View Document</a></div>
                            </div>
                        </section>

                        {/* ---------- 03 NIRF ---------- */}
                        <section className={`domain ${activeDomain === 'nirf' ? 'active' : ''}`} id="nirf">
                            <div className="head">
                                <div>
                                    <h1>NIRF</h1>
                                    <p className="subtitle">National Institutional Ranking Framework</p>
                                    <div className="head-rule"></div>
                                </div>
                            </div>
                            <p className="desc">NIRF is the Ministry of Education's annual ranking of Indian institutions across parameters such as teaching, research, outreach and placements.</p>

                            <p className="section-label">Latest Ranking</p>
                            <div className="section-rule"></div>
                            <div className="status-strip">
                                <div className="status-hero">
                                    <div className="big">100</div>
                                    <div className="grade-caption">Engineering · 2025</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Innovation Band</div>
                                    <div className="stat-value">11–50</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">2023 Rank</div>
                                    <div className="stat-value">77th</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Category</div>
                                    <div className="stat-value">Engineering</div>
                                </div>
                            </div>

                            <p className="section-label">Ranking History</p>
                            <div className="section-rule"></div>
                            <div className="timeline" style={{ maxWidth: '100%' }}>
                                <div className="tl-node"><div className="tl-year">2019</div><div className="tl-dot past"></div><div className="tl-grade">97th</div></div>
                                <div className="tl-connector"></div>
                                <div className="tl-node"><div className="tl-year">2021</div><div className="tl-dot past"></div><div className="tl-grade">78th</div></div>
                                <div className="tl-connector"></div>
                                <div className="tl-node"><div className="tl-year">2022</div><div className="tl-dot past"></div><div className="tl-grade">73rd</div></div>
                                <div className="tl-connector"></div>
                                <div className="tl-node"><div className="tl-year">2023</div><div className="tl-dot past"></div><div className="tl-grade">77th</div></div>
                                <div className="tl-connector"></div>
                                <div className="tl-node"><div className="tl-year">2025</div><div className="tl-dot current"></div><div className="tl-grade">100th</div></div>
                            </div>

                            <p className="section-label">NIRF Documents</p>
                            <div className="section-rule"></div>
                            <div className="doc-list">
                                <div className="doc-row"><div className="doc-num">01</div><div className="doc-title">NIRF 2026 — Overall</div><a className="doc-link" href="#">View Document</a></div>
                                <div className="doc-row"><div className="doc-num">02</div><div className="doc-title">NIRF 2026 — Engineering</div><a className="doc-link" href="#">View Document</a></div>
                                <div className="doc-row"><div className="doc-num">03</div><div className="doc-title">NIRF 2026 — Management</div><a className="doc-link" href="#">View Document</a></div>
                                <div className="doc-row"><div className="doc-num">04</div><div className="doc-title">NIRF 2026 — Innovation</div><a className="doc-link" href="#">View Document</a></div>
                                <div className="doc-row"><div className="doc-num">05</div><div className="doc-title">NIRF 2026 — Sustainable Institutions</div><a className="doc-link" href="#">View Document</a></div>
                            </div>
                        </section>

                        {/* ---------- 04 IQAC ---------- */}
                        <section className={`domain ${activeDomain === 'iqac' ? 'active' : ''}`} id="iqac">
                            <div className="head">
                                <div>
                                    <h1>IQAC</h1>
                                    <p className="subtitle">Internal Quality Assurance Cell</p>
                                    <div className="head-rule"></div>
                                </div>
                            </div>
                            <p className="desc">Established in 2015, the IQAC drives a culture of quality through systematic documentation, institutional policy, academic audits, stakeholder feedback and Outcome-Based Education practices.</p>

                            <p className="section-label">Cell Status</p>
                            <div className="section-rule"></div>
                            <div className="status-strip">
                                <div className="status-hero">
                                    <div className="big">2015</div>
                                    <div className="grade-caption">Cell Established</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">AQAR Reports</div>
                                    <div className="stat-value">2018–2023</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Minutes On File</div>
                                    <div className="stat-value">2018–2024</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Committee</div>
                                    <div className="stat-value">2025–26</div>
                                </div>
                            </div>

                            <p className="section-label">AQAR Reports</p>
                            <div className="section-rule"></div>
                            <div className="doc-list">
                                <div className="doc-row"><div className="doc-num">01</div><div className="doc-title">AQAR (AY 2022–2023)</div><a className="doc-link" href="#">Download</a></div>
                                <div className="doc-row"><div className="doc-num">02</div><div className="doc-title">AQAR (AY 2021–2022)</div><a className="doc-link" href="#">Download</a></div>
                                <div className="doc-row"><div className="doc-num">03</div><div className="doc-title">AQAR (AY 2020–2021)</div><a className="doc-link" href="#">Download</a></div>
                                <div className="doc-row"><div className="doc-num">04</div><div className="doc-title">AQAR (AY 2019–2020)</div><a className="doc-link" href="#">Download</a></div>
                                <div className="doc-row"><div className="doc-num">05</div><div className="doc-title">AQAR (AY 2018–2019)</div><a className="doc-link" href="#">Download</a></div>
                            </div>
                        </section>

                        {/* ---------- 05 SIRO ---------- */}
                        <section className={`domain ${activeDomain === 'siro' ? 'active' : ''}`} id="siro">
                            <div className="head">
                                <div>
                                    <h1>SIRO</h1>
                                    <p className="subtitle">Scientific and Industrial Research Organisation</p>
                                    <div className="head-rule"></div>
                                </div>
                            </div>
                            <p className="desc">Recognised under the DSIR SIRO Recognition Scheme, which brings together non-commercial organisations to promote scientific and industrial research, and the design and development of indigenous technology toward technological self-reliance.</p>

                            <p className="section-label">Recognition Status</p>
                            <div className="section-rule"></div>
                            <div className="status-strip">
                                <div className="status-hero">
                                    <div className="big">DSIR</div>
                                    <div className="grade-caption">SIRO Recognised</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Recognised In</div>
                                    <div className="stat-value">2023</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Earlier Centre</div>
                                    <div className="stat-value">DST-IEDC, 2017</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">Focus</div>
                                    <div className="stat-value">R&D Self-Reliance</div>
                                </div>
                            </div>

                            <p className="section-label">Recognition Journey</p>
                            <div className="section-rule"></div>
                            <div className="timeline">
                                <div className="tl-node">
                                    <div className="tl-year">2017</div>
                                    <div className="tl-dot past"></div>
                                    <div className="tl-cycle">Set Up</div>
                                    <div className="tl-grade">DST–IEDC Centre</div>
                                    <div className="tl-meta">With ICTACT Academic<br />Partner Excellence</div>
                                </div>
                                <div className="tl-connector"></div>
                                <div className="tl-node">
                                    <div className="tl-year">2023</div>
                                    <div className="tl-dot current"></div>
                                    <div className="tl-cycle">Recognised</div>
                                    <div className="tl-grade">SIRO by DSIR</div>
                                    <div className="tl-meta">Department of Scientific<br />& Industrial Research</div>
                                </div>
                            </div>
                        </section>

                        {/* ---------- 06 Other Recognitions ---------- */}
                        <section className={`domain ${activeDomain === 'other' ? 'active' : ''}`} id="other">
                            <div className="head">
                                <div>
                                    <h1>Other Recognitions</h1>
                                    <p className="subtitle">Additional awards, ratings & partnerships</p>
                                    <div className="head-rule"></div>
                                </div>
                            </div>
                            <p className="desc">Beyond formal accreditation and ranking bodies, SKCET has been recognised through global sustainability ratings, government innovation programmes and industry partnerships.</p>

                            <p className="section-label">Highlights</p>
                            <div className="section-rule"></div>
                            <div className="status-strip">
                                <div className="status-hero">
                                    <div className="big">601–800</div>
                                    <div className="grade-caption">THE Impact Ratings 2026</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">QS Rating</div>
                                    <div className="stat-value">I-Gauge</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">AICTE Centre</div>
                                    <div className="stat-value">Aero Vision Drone</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-label">NPTEL 2024</div>
                                    <div className="stat-value">66th / 6598</div>
                                </div>
                            </div>

                            <p className="section-label">Selected Recognitions</p>
                            <div className="section-rule"></div>
                            <div className="scroll-area">
                                <div className="achv-year-block">
                                    <ul className="achv-list">
                                        <li>Times Higher Education (THE) SDG Impact Rankings 2025 &amp; Impact Ratings 2026 — Global band 601–800</li>
                                        <li>QS I-Gauge rating</li>
                                        <li>AICTE IDEA Lab &amp; Aero Vision Drone Centre of Excellence recognition</li>
                                        <li>Nodal Centre for Virtual Labs, IIT Delhi (2024)</li>
                                        <li>India STEM Award 2022 — AICRA</li>
                                        <li>AICTE-Lilavati Award — Winner 2021–22 (Technology for Women)</li>
                                        <li>ARIIA Ranking — All-India 2nd (2020), 4th (2022), 11th (2023)</li>
                                        <li>ISO 9001:2008 / ISO 9001:2000 certification</li>
                                        <li>MoUs: Wipro, TCS, Virtusa, ERNET, NASSCOM, Kingston University (London), Avila University (USA), UTP Malaysia</li>
                                        <li>UYIR Best Volunteering College Award — road safety awareness</li>
                                        <li>Nodal host, Smart India Hackathon — 6 editions through 2025</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </>
    );
}
