import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  FileCheck,
  Award,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Search,
  Phone,
  Mail,
  Calculator,
  Sparkles,
  ShieldCheck,
  Download,
  ExternalLink,
  Printer,
  Info,
  CheckSquare,
  Square,
  Building2,
  FileText,
  AlertTriangle,
  TrendingUp,
  Filter,
  Eye
} from 'lucide-react';
import {
  ADMISSION_DOMAINS,
  ADMISSION_REPORTING_DOCUMENTS,
  UG_PROGRAMMES,
  PG_PROGRAMMES,
  STATE_GOVERNMENT_SCHOLARSHIP,
  INSTITUTIONAL_SCHOLARSHIPS_DATA,
  ADMISSION_STEPS,
  CUTOFF_YEARS,
  COMMUNITY_CATEGORIES,
  DEPARTMENT_CUTOFFS_DATA,
} from '../../data/admissionsData';

const iconMap = {
  GraduationCap,
  FileCheck,
  Award,
  Calculator,
  CreditCard,
};

const Admissions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive active domain directly from URL (e.g. /admissions/cutoff -> 'cutoff', /admissions/fees -> 'cutoff')
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSubdomain = pathParts[1];
  const normalizedSubdomain = currentSubdomain === 'fees' ? 'cutoff' : currentSubdomain;
  const activeDomainId = (normalizedSubdomain && ADMISSION_DOMAINS.some(d => d.id === normalizedSubdomain))
    ? normalizedSubdomain
    : '2026';

  // Reporting Documents Modal state
  const [selectedReportingDoc, setSelectedReportingDoc] = useState(null);

  // Programme filter state
  const [programmeFilter, setProgrammeFilter] = useState('All');
  const [programmeSearch, setProgrammeSearch] = useState('');

  // Cutoff Calculator state
  const [mathsMarks, setMathsMarks] = useState('');
  const [physicsMarks, setPhysicsMarks] = useState('');
  const [chemistryMarks, setChemistryMarks] = useState('');
  const [userCommunity, setUserCommunity] = useState('OC');
  const [calculatedCutoff, setCalculatedCutoff] = useState(null);

  // Department Cutoffs Table state
  const [selectedCutoffYear, setSelectedCutoffYear] = useState('2025');
  const [cutoffDeptSearch, setCutoffDeptSearch] = useState('');
  const [selectedCommunityFilter, setSelectedCommunityFilter] = useState('All');

  // Scholarships State
  const [scholarshipSectionFilter, setScholarshipSectionFilter] = useState('all');
  const [checkedDocs, setCheckedDocs] = useState(['doc-1', 'doc-3', 'doc-4']);
  const [selectedScholarshipForm, setSelectedScholarshipForm] = useState(null);

  // Enquiry / Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    candidateName: '',
    email: '',
    phone: '',
    programme: 'B.E. Computer Science and Engineering',
    cutoff: '',
    state: 'Tamil Nadu',
    inquiryType: 'Admission 2026',
  });
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const handleDomainSelect = (domainId) => {
    navigate(`/admissions/${domainId}`);
    window.scrollTo({ top: 140, behavior: 'smooth' });
  };

  // Toggle document in checklist
  const handleToggleDoc = (docId) => {
    if (checkedDocs.includes(docId)) {
      setCheckedDocs(checkedDocs.filter(id => id !== docId));
    } else {
      setCheckedDocs([...checkedDocs, docId]);
    }
  };

  const handleSelectAllDocs = () => {
    if (checkedDocs.length === STATE_GOVERNMENT_SCHOLARSHIP.documentsChecklist.length) {
      setCheckedDocs([]);
    } else {
      setCheckedDocs(STATE_GOVERNMENT_SCHOLARSHIP.documentsChecklist.map(d => d.id));
    }
  };

  // Cutoff calculation logic
  const handleCalculateCutoff = (e) => {
    e.preventDefault();
    const m = parseFloat(mathsMarks) || 0;
    const p = parseFloat(physicsMarks) || 0;
    const c = parseFloat(chemistryMarks) || 0;

    if (m > 100 || p > 100 || c > 100 || m < 0 || p < 0 || c < 0) {
      alert('Please enter valid marks between 0 and 100 for each subject.');
      return;
    }

    const total = m + (p / 2) + (c / 2);
    setCalculatedCutoff(total.toFixed(2));
  };

  // Enquiry submission handler
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryForm.candidateName || !enquiryForm.phone) {
      alert('Please fill out your name and contact mobile number.');
      return;
    }
    setEnquirySuccess(true);
    setTimeout(() => {
      setIsApplyModalOpen(false);
      setEnquirySuccess(false);
      setEnquiryForm({
        candidateName: '',
        email: '',
        phone: '',
        programme: 'B.E. Computer Science and Engineering',
        cutoff: '',
        state: 'Tamil Nadu',
        inquiryType: 'Admission 2026',
      });
    }, 2000);
  };

  // Filter programmes for Admission 2026
  const filteredUG = UG_PROGRAMMES.filter(p => {
    return p.name.toLowerCase().includes(programmeSearch.toLowerCase()) ||
           p.code.toLowerCase().includes(programmeSearch.toLowerCase());
  });

  // Filter department cutoffs
  const filteredCutoffs = DEPARTMENT_CUTOFFS_DATA.filter(dept => {
    return dept.name.toLowerCase().includes(cutoffDeptSearch.toLowerCase()) ||
           dept.shortName.toLowerCase().includes(cutoffDeptSearch.toLowerCase()) ||
           dept.code.toLowerCase().includes(cutoffDeptSearch.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-32 sm:pt-36 lg:pt-40 pb-24 text-gray-800">

      {/* ── Page Header matching Documents.jsx styling ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <Link to="/" className="hover:text-amber-800 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-800">Admissions 2026</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-skcet-navy tracking-tight">
                Admissions & Cut-off Portal 2026–2027
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
                Join a premier autonomous institution ranked among India&apos;s top engineering colleges with NBA Tier-I accreditations, reporting documents, and cut-off calculator.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <div className="bg-white border border-gray-200 px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-xs text-gray-700 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>TNEA Counseling Code: <strong className="text-skcet-navy font-bold font-mono">2718</strong></span>
              </div>

              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-skcet-gold hover:bg-amber-400 text-skcet-dark font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Sparkles size={14} />
                <span>Apply / Enquire Now</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Main Layout: Sticky Sidebar Navigation + Single Selected Content View ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-8 relative">

        {/* ── Left Sticky Subdomain Navigation ── */}
        <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-36 z-20">
          <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-xs space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Admission Domains
            </div>

            <nav className="space-y-1">
              {ADMISSION_DOMAINS.map((domain) => {
                const Icon = iconMap[domain.icon] || GraduationCap;
                const isActive = activeDomainId === domain.id;

                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => handleDomainSelect(domain.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 cursor-pointer group ${
                      isActive
                        ? 'bg-skcet-navy text-white shadow-xs font-semibold'
                        : 'text-gray-700 hover:bg-gray-100/80 hover:text-skcet-navy'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive ? 'bg-amber-400 text-skcet-navy' : 'bg-gray-100 text-gray-600 group-hover:bg-amber-100 group-hover:text-amber-800'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className={`text-xs font-semibold leading-tight ${isActive ? 'text-white' : 'text-gray-800'}`}>
                          {domain.label}
                        </div>
                        <div className={`text-[10px] mt-0.5 ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                          {domain.badge}
                        </div>
                      </div>
                    </div>

                    <ChevronRight size={15} className={`${isActive ? 'text-amber-400' : 'text-gray-300 group-hover:translate-x-0.5 transition-transform'}`} />
                  </button>
                );
              })}
            </nav>

            {/* Quick Contact Box in Sidebar */}
            <div className="pt-3 border-t border-gray-100 px-3 pb-2 text-[11px] text-gray-500 space-y-2">
              <span className="font-bold uppercase tracking-wider text-gray-400 text-[10px] block">Admission Helpline</span>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Phone size={13} className="text-amber-600" />
                <span>0422-2678001 / 8002</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Mail size={13} className="text-amber-600" />
                <span>admissions@skcet.ac.in</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Right Content Area: ONLY THE SELECTED DOMAIN IS DISPLAYED ── */}
        <div className="flex-1 min-w-0 w-full">
          <AnimatePresence mode="wait">

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 1: ADMISSION 2026 (REPORTING PDFS & PROGRAMMES OFFERED)
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === '2026' && (
              <motion.div
                key="2026"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                    <GraduationCap size={15} />
                    <span>Academic Year 2026–2027 Admissions</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                    Undergraduate & Postgraduate Admissions 2026
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Explore degree programmes, download mandatory reporting document checklists (PDFs), and complete your enrollment.
                  </p>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-xs">
                    <span className="text-2xl font-display font-bold text-skcet-navy block">98%</span>
                    <span className="text-[11px] text-gray-500 font-medium">Placement Record</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-xs">
                    <span className="text-2xl font-display font-bold text-amber-600 block">₹44 LPA</span>
                    <span className="text-[11px] text-gray-500 font-medium">Highest Package</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-xs">
                    <span className="text-2xl font-display font-bold text-skcet-navy block">250+</span>
                    <span className="text-[11px] text-gray-500 font-medium">Recruiting Corporates</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-xs">
                    <span className="text-2xl font-display font-bold text-emerald-600 block">NAAC A++</span>
                    <span className="text-[11px] text-gray-500 font-medium">Highest Grade (3.62/4)</span>
                  </div>
                </div>

                {/* ── ADMISSION REPORTING DOCUMENTS & PDF CHECKLISTS (FOR REFERENCE & USAGE) ── */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-amber-700" />
                        <h3 className="font-display font-bold text-skcet-navy text-lg">
                          Admission Reporting Document Checklists (For Reference & Use)
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Download and view the official lists of documents to be submitted at the time of reporting to the college for admission.
                      </p>
                    </div>

                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 self-start sm:self-auto">
                      AY 2026–2027
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ADMISSION_REPORTING_DOCUMENTS.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-gray-50/70 border border-gray-200 hover:border-amber-400 hover:shadow-sm rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-skcet-navy text-white">
                              {doc.code}
                            </span>
                            <span className="text-[10.5px] text-gray-400 font-mono">
                              {doc.fileSize}
                            </span>
                          </div>

                          <h4 className="font-display font-bold text-sm text-skcet-navy leading-snug">
                            {doc.title}
                          </h4>

                          <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                            {doc.subtitle}
                          </p>

                          <div className="text-[10.5px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200 font-medium">
                            {doc.particulars.length} Document Particulars for Reference
                          </div>
                        </div>

                        <div className="pt-4 mt-3 border-t border-gray-200/80 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedReportingDoc(doc)}
                            className="flex-1 py-2 px-3 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                          >
                            <Eye size={13} />
                            <span>View PDF</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedReportingDoc(doc);
                              setTimeout(() => window.print(), 300);
                            }}
                            className="p-2 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors cursor-pointer"
                            title="Print / Save PDF"
                          >
                            <Printer size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Search Bar & Filter for Programmes */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-gray-200 p-4 rounded-2xl shadow-xs">
                  <div className="relative w-full sm:w-80">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={programmeSearch}
                      onChange={(e) => setProgrammeSearch(e.target.value)}
                      placeholder="Search engineering branch..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">Filter:</span>
                    <button
                      type="button"
                      onClick={() => setProgrammeFilter('All')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                        programmeFilter === 'All' ? 'bg-skcet-navy text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      B.E. / B.Tech (UG)
                    </button>
                    <button
                      type="button"
                      onClick={() => setProgrammeFilter('PG')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                        programmeFilter === 'PG' ? 'bg-skcet-navy text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      M.E. / MBA / MCA (PG)
                    </button>
                  </div>
                </div>

                {/* Programmes Grid */}
                <div className="space-y-4">
                  {programmeFilter !== 'PG' && filteredUG.map((prog) => (
                    <div
                      key={prog.code}
                      className="bg-white border border-gray-200 hover:border-amber-400/80 rounded-2xl p-6 transition-all duration-300 shadow-xs hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                              {prog.code}
                            </span>
                            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              {prog.accreditation}
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-skcet-navy mt-1.5">
                            {prog.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Duration: {prog.duration} · Annual Intake: <strong className="text-gray-800">{prog.intake} Seats</strong>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setEnquiryForm(prev => ({ ...prev, programme: prog.name, inquiryType: 'Programme Admission' }));
                            setIsApplyModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
                        >
                          <span>Apply for {prog.code}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>

                      <div className="text-xs text-gray-600 space-y-2">
                        <div className="flex items-start gap-2">
                          <strong className="text-gray-700 min-w-20">Eligibility:</strong>
                          <span>{prog.eligibility}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {prog.highlights.map((h, i) => (
                            <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {programmeFilter === 'PG' && PG_PROGRAMMES.map((prog) => (
                    <div
                      key={prog.code}
                      className="bg-white border border-gray-200 hover:border-amber-400/80 rounded-2xl p-6 transition-all duration-300 shadow-xs hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                        <div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                            {prog.code}
                          </span>
                          <h3 className="font-display text-lg font-bold text-skcet-navy mt-1.5">
                            {prog.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Duration: {prog.duration} · Annual Intake: <strong className="text-gray-800">{prog.intake} Seats</strong>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setEnquiryForm(prev => ({ ...prev, programme: prog.name, inquiryType: 'PG Admission' }));
                            setIsApplyModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
                        >
                          <span>Apply for {prog.code}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>

                      <div className="text-xs text-gray-600">
                        <strong className="text-gray-700 mr-2">Eligibility:</strong>
                        <span>{prog.eligibility}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 2: ADMISSION PROCEDURE (TNEA SINGLE WINDOW & MANAGEMENT)
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === 'procedure' && (
              <motion.div
                key="procedure"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                    <FileCheck size={15} />
                    <span>Counseling & Enrollment Guidelines</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                    Step-by-Step Admission Procedure 2026
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Guidelines for Tamil Nadu Engineering Admissions (TNEA), Management Quota merit enrollment, and Lateral Entry admissions.
                  </p>
                </div>

                {/* Steps Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ADMISSION_STEPS.map((s) => (
                    <div
                      key={s.step}
                      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs relative overflow-hidden"
                    >
                      <span className="text-4xl font-display font-bold text-gray-100 absolute right-4 top-4">
                        {s.step}
                      </span>
                      <div className="relative z-10">
                        <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          Step {s.step}
                        </span>
                        <h3 className="font-display font-bold text-base text-skcet-navy mt-3">
                          {s.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed mt-2">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prescribed Documents Checklist */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                  <h3 className="font-bold text-skcet-navy text-base mb-1 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <span>Mandatory Certificates for Reporting Day</span>
                  </h3>
                  <p className="text-xs text-gray-500 mb-5">
                    Originals plus 3 sets of self-attested photocopies are required at the time of admission confirmation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>10th (SSLC) Original Marksheet</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>12th (HSC) Original Marksheet</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Transfer Certificate (TC) & Conduct Certificate</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Permanent Community Certificate (if applicable)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>First Graduate Certificate & Joint Declaration (if applicable)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>TNEA Allotment Order with Fee Receipt</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 3: SCHOLARSHIPS (FULL RE-ARCHITECTURE ACCORDING TO SPEC)
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === 'scholarships' && (
              <motion.div
                key="scholarships"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {/* ── Scholarships Header Banner & Verification Metadata ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-5">
                  <div>
                    <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                      <Award size={15} />
                      <span>Financial Aid & Educational Grants</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                      Scholarships & Financial Assistance
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-2xl">
                      Access official State Government Post-Matric schemes and Sri Krishna Institutional merit & hardship fee waivers in one unified portal.
                    </p>
                  </div>

                  <div className="self-start sm:self-auto flex flex-col items-end gap-1.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Verified: Academic Year 2026–2027</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Published per DOTE / Welfare Norms</span>
                  </div>
                </div>

                {/* ── Section Quick-Switch Tabs ── */}
                <div className="flex flex-wrap items-center gap-2 bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200 w-fit">
                  <button
                    type="button"
                    onClick={() => setScholarshipSectionFilter('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      scholarshipSectionFilter === 'all'
                        ? 'bg-white text-skcet-navy shadow-xs'
                        : 'text-gray-600 hover:text-skcet-navy'
                    }`}
                  >
                    All Funding Schemes
                  </button>
                  <button
                    type="button"
                    onClick={() => setScholarshipSectionFilter('state-govt')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      scholarshipSectionFilter === 'state-govt'
                        ? 'bg-skcet-navy text-white shadow-xs'
                        : 'text-gray-600 hover:text-skcet-navy'
                    }`}
                  >
                    <span>1. State Government (PMSS)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScholarshipSectionFilter('institutional')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      scholarshipSectionFilter === 'institutional'
                        ? 'bg-skcet-navy text-white shadow-xs'
                        : 'text-gray-600 hover:text-skcet-navy'
                    }`}
                  >
                    <Building2 size={13} />
                    <span>2. SKCET Institutional Schemes</span>
                  </button>
                </div>

                {/* ═══════════════════════════════════════════════════════════════════
                    SECTION 1: STATE GOVERNMENT SCHOLARSHIPS (TAMIL NADU PMSS)
                   ═══════════════════════════════════════════════════════════════════ */}
                {(scholarshipSectionFilter === 'all' || scholarshipSectionFilter === 'state-govt') && (
                  <div className="space-y-8 pt-2">
                    
                    {/* Section 1 Intro Box */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                        <div>
                          <span className="text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                            State Government of Tamil Nadu
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-skcet-navy mt-2">
                            {STATE_GOVERNMENT_SCHOLARSHIP.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Administered by: {STATE_GOVERNMENT_SCHOLARSHIP.administeredBy}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <a
                            href={STATE_GOVERNMENT_SCHOLARSHIP.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold border border-gray-200 transition-colors"
                          >
                            <span>e-Scholarship Portal</span>
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {STATE_GOVERNMENT_SCHOLARSHIP.intro}
                      </p>

                      {/* Rates note */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
                        <Info size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong className="font-semibold text-blue-950">Scholarship Support Amount: </strong>
                          {STATE_GOVERNMENT_SCHOLARSHIP.ratesNote}{' '}
                          <a
                            href={STATE_GOVERNMENT_SCHOLARSHIP.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline font-semibold hover:text-blue-950 inline-flex items-center gap-1"
                          >
                            <span>View official rate schedules at escholarship.tn.gov.in</span>
                            <ExternalLink size={11} />
                          </a>.
                        </div>
                      </div>
                    </div>

                    {/* Eligibility Checklist */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                          Eligibility Criteria
                        </span>
                        <h3 className="text-lg font-bold text-skcet-navy">
                          Who Qualifies for Post-Matric State Scholarships?
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {STATE_GOVERNMENT_SCHOLARSHIP.eligibilityChecklist.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 leading-relaxed"
                          >
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fresh vs Renewal Comparison Track & PDF Downloads */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                          Application Tracks
                        </span>
                        <h3 className="text-lg font-bold text-skcet-navy">
                          Fresh vs Renewal Application Tracks
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Determine your track and download the official prescribed application forms below.
                        </p>
                      </div>

                      {/* Comparison Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {STATE_GOVERNMENT_SCHOLARSHIP.tracks.map((t, idx) => (
                          <div
                            key={idx}
                            className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex flex-col justify-between space-y-3"
                          >
                            <div>
                              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-skcet-navy text-white">
                                {t.track}
                              </span>
                              <div className="mt-3 text-xs space-y-2 text-gray-700">
                                <div><strong className="text-gray-900">Who:</strong> {t.who}</div>
                                <div><strong className="text-gray-900">When:</strong> {t.when}</div>
                                <div className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200 p-2.5 rounded-lg mt-2 font-medium">
                                  <strong>Document Rule:</strong> {t.note}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Four Official PDF Download Buttons */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                          Official Downloadable Application Forms (Current Academic Year)
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {STATE_GOVERNMENT_SCHOLARSHIP.forms.map((form) => (
                            <div
                              key={form.id}
                              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 flex-shrink-0">
                                  <FileText size={18} />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-skcet-navy truncate">
                                    {form.communityGroup} — {form.type}
                                  </div>
                                  <div className="text-[10.5px] text-gray-500">
                                    PDF Document · {form.fileSize} ({form.pages})
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setSelectedScholarshipForm(form)}
                                className="px-3.5 py-2 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs flex-shrink-0"
                              >
                                <Download size={13} />
                                <span>Download</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Interactive 11-Item Document Assembly Checklist */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-5">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                            Document Dossier
                          </span>
                          <h3 className="text-lg font-bold text-skcet-navy flex items-center gap-2">
                            <CheckSquare size={18} className="text-emerald-600" />
                            <span>Mandatory Documents Assembly Checklist (Fresh Application)</span>
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Tick off documents as you gather your physical folder before submitting to the Scholarship Cell.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <button
                            type="button"
                            onClick={handleSelectAllDocs}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            {checkedDocs.length === STATE_GOVERNMENT_SCHOLARSHIP.documentsChecklist.length ? 'Uncheck All' : 'Check All'}
                          </button>
                          <button
                            type="button"
                            onClick={() => window.print()}
                            className="px-3 py-1.5 rounded-lg bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                          >
                            <Printer size={13} />
                            <span>Print Checklist</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {STATE_GOVERNMENT_SCHOLARSHIP.documentsChecklist.map((doc, idx) => {
                          const isChecked = checkedDocs.includes(doc.id);
                          return (
                            <div
                              key={doc.id}
                              onClick={() => handleToggleDoc(doc.id)}
                              className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                                isChecked
                                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              <div className="mt-0.5">
                                {isChecked ? (
                                  <CheckSquare size={16} className="text-emerald-600" />
                                ) : (
                                  <Square size={16} className="text-gray-400" />
                                )}
                              </div>
                              <div className="text-xs min-w-0">
                                <div className="font-bold flex items-center gap-1.5">
                                  <span className="font-mono text-[11px] text-gray-400 font-normal">#{idx + 1}</span>
                                  <span className={isChecked ? 'text-emerald-900 font-bold' : 'text-gray-900'}>{doc.title}</span>
                                </div>
                                <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                  {doc.desc}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <span>Items Prepared: <strong className="text-emerald-700 font-bold">{checkedDocs.length} of {STATE_GOVERNMENT_SCHOLARSHIP.documentsChecklist.length}</strong></span>
                        <span className="italic text-[11px]">Keep original certificates ready for physical verification.</span>
                      </div>
                    </div>

                    {/* Application Process Flow */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                      <div className="mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                          Submission Roadmap
                        </span>
                        <h3 className="text-lg font-bold text-skcet-navy">
                          6-Step Scholarship Application & Sanction Flow
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {STATE_GOVERNMENT_SCHOLARSHIP.processSteps.map((s) => (
                          <div
                            key={s.step}
                            className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col justify-between"
                          >
                            <div>
                              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                                Step {s.step}
                              </span>
                              <h4 className="font-bold text-xs text-skcet-navy mt-2.5">
                                {s.title}
                              </h4>
                              <p className="text-[11px] text-gray-600 leading-relaxed mt-1.5">
                                {s.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Important Policy Note & Cycle Notice */}
                    <div className="space-y-3">
                      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 text-xs text-amber-950 flex items-start gap-3 shadow-2xs">
                        <AlertTriangle size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong className="font-bold uppercase tracking-wider text-[11px] text-amber-900 block mb-1">
                            Single Scholarship Policy Rule
                          </strong>
                          {STATE_GOVERNMENT_SCHOLARSHIP.policyRuleAlert}
                        </div>
                      </div>

                      <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-[11px] text-gray-600 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Info size={14} className="text-gray-500" />
                          <span>{STATE_GOVERNMENT_SCHOLARSHIP.cycleNotice}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 font-mono">Scholarship Office / SKCET</span>
                      </div>
                    </div>

                  </div>
                )}

                {/* ═══════════════════════════════════════════════════════════════════
                    SECTION 2: SKCET INSTITUTIONAL SCHOLARSHIPS
                   ═══════════════════════════════════════════════════════════════════ */}
                {(scholarshipSectionFilter === 'all' || scholarshipSectionFilter === 'institutional') && (
                  <div className="space-y-8 pt-4 border-t-2 border-dashed border-gray-200">
                    
                    {/* Section 2 Header */}
                    <div>
                      <span className="text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                        Sri Krishna Group of Institutions
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-skcet-navy mt-2">
                        SKCET Institutional Scholarships & Concessions
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {INSTITUTIONAL_SCHOLARSHIPS_DATA.intro}
                      </p>
                    </div>

                    {/* Three Institutional Schemes */}
                    <div className="space-y-4">
                      {INSTITUTIONAL_SCHOLARSHIPS_DATA.schemes.map((sch) => (
                        <div
                          key={sch.id}
                          className="bg-white border border-gray-200 hover:border-amber-400/80 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-3.5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2.5">
                              <h4 className="font-display text-lg font-bold text-skcet-navy">
                                {sch.title}
                              </h4>
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                                {sch.badge}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setEnquiryForm(prev => ({
                                  ...prev,
                                  inquiryType: `Scholarship: ${sch.title}`,
                                }));
                                setIsApplyModalOpen(true);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto shadow-2xs flex items-center gap-1"
                            >
                              <span>Apply / Enquire</span>
                              <ChevronRight size={13} />
                            </button>
                          </div>

                          <p className="text-xs text-gray-700 leading-relaxed font-medium">
                            {sch.summary}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                              <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Academic Eligibility</span>
                              <span className="text-gray-800 leading-snug">{sch.eligibility}</span>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                              <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Income / Verification</span>
                              <span className="text-gray-800 leading-snug">{sch.incomeCondition}</span>
                            </div>
                            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                              <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">Benefit Coverage</span>
                              <span className="text-emerald-900 font-semibold leading-snug">{sch.coverage}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* How to Apply for Institutional Schemes */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                      <div className="flex items-center gap-2">
                        <Building2 size={18} className="text-skcet-navy" />
                        <h4 className="text-base font-bold text-skcet-navy">
                          {INSTITUTIONAL_SCHOLARSHIPS_DATA.howToApply.title}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700">
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                          <strong className="text-gray-900 block font-bold">Submission Procedure & Timing:</strong>
                          <p className="leading-relaxed">{INSTITUTIONAL_SCHOLARSHIPS_DATA.howToApply.procedure}</p>
                          <p className="text-[11px] text-amber-800 font-semibold">Timing: {INSTITUTIONAL_SCHOLARSHIPS_DATA.howToApply.timing}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                          <strong className="text-gray-900 block font-bold">Contact & Counter Location:</strong>
                          <p className="leading-relaxed">{INSTITUTIONAL_SCHOLARSHIPS_DATA.howToApply.contactOffice}</p>
                          <div className="pt-2 flex items-center gap-3 text-[11px] text-gray-600 font-medium">
                            <span>Phone: 0422-2678001 (Ext: 204)</span>
                            <span>·</span>
                            <span>scholarships@skcet.ac.in</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 4: CUT-OFF & CALCULATOR (REPLACES FEE STRUCTURE SECTION)
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === 'cutoff' && (
              <motion.div
                key="cutoff"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                    <Calculator size={15} />
                    <span>TNEA Engineering Admissions · Counseling Code 2718</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                    TNEA Cut-off Calculator & Department Trends
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Calculate your normalized 12th TNEA engineering cutoff score out of 200 and explore multi-year closing cutoff ranks across all branches.
                  </p>
                </div>

                {/* ── 1. Interactive 12th Cut-off Calculator Card ── */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="font-display font-bold text-skcet-navy text-lg flex items-center gap-2">
                        <Calculator size={18} className="text-amber-700" />
                        <span>12th TNEA Engineering Cut-off Calculator</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Standard DOTE Formula: <strong>Mathematics (100) + [Physics (100) ÷ 2] + [Chemistry (100) ÷ 2] = Total / 200</strong>
                      </p>
                    </div>

                    <div className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl font-mono font-bold self-start sm:self-auto">
                      Max Score: 200.00
                    </div>
                  </div>

                  <form onSubmit={handleCalculateCutoff} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                          Mathematics (Max 100) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max="100"
                          value={mathsMarks}
                          onChange={(e) => setMathsMarks(e.target.value)}
                          placeholder="e.g. 96"
                          required
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                          Physics (Max 100) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max="100"
                          value={physicsMarks}
                          onChange={(e) => setPhysicsMarks(e.target.value)}
                          placeholder="e.g. 92"
                          required
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                          Chemistry (Max 100) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          min="0"
                          max="100"
                          value={chemistryMarks}
                          onChange={(e) => setChemistryMarks(e.target.value)}
                          placeholder="e.g. 94"
                          required
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono text-gray-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                          Community Category
                        </label>
                        <select
                          value={userCommunity}
                          onChange={(e) => setUserCommunity(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          {COMMUNITY_CATEGORIES.map(c => (
                            <option key={c.code} value={c.code}>{c.code} — {c.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] text-gray-500 italic">
                        Marks can include decimals per official board marksheets.
                      </span>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer h-10 shadow-xs"
                      >
                        <Calculator size={14} />
                        <span>Calculate Cut-off</span>
                      </button>
                    </div>
                  </form>

                  {/* Calculated Result Banner */}
                  {calculatedCutoff && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-[10.5px] uppercase font-bold tracking-wider text-emerald-800 block">
                          Your Normalized TNEA Engineering Cut-off ({userCommunity} Category):
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-3xl sm:text-4xl font-display font-bold text-emerald-900 font-mono">
                            {calculatedCutoff}
                          </span>
                          <span className="text-sm font-semibold text-emerald-700">/ 200.00</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEnquiryForm(prev => ({
                              ...prev,
                              cutoff: calculatedCutoff,
                              inquiryType: `Cutoff Eligibility: ${calculatedCutoff} (${userCommunity})`,
                            }));
                            setIsApplyModalOpen(true);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>Apply / Enquire with this Cut-off →</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── 2. Department-wise Cut-off Marks Across Years ── */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-skcet-navy" />
                        <h3 className="text-lg font-bold text-skcet-navy">
                          Department-wise Closing Cut-offs Across Years
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Historical TNEA Single Window Round-1/2 closing cutoff marks for SKCET (Autonomous).
                      </p>
                    </div>

                    {/* Year Selector Pills */}
                    <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-xl border border-gray-200 self-start sm:self-auto">
                      <span className="text-[10px] font-bold uppercase text-gray-400 px-2">Year:</span>
                      {CUTOFF_YEARS.map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setSelectedCutoffYear(yr)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedCutoffYear === yr
                              ? 'bg-skcet-navy text-white shadow-2xs'
                              : 'text-gray-600 hover:text-skcet-navy'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search department (e.g. CSE, ECE, AI)..."
                        value={cutoffDeptSearch}
                        onChange={(e) => setCutoffDeptSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Filter size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">Highlight Category:</span>
                      <select
                        value={selectedCommunityFilter}
                        onChange={(e) => setSelectedCommunityFilter(e.target.value)}
                        className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="All">All Categories</option>
                        {COMMUNITY_CATEGORIES.map(c => (
                          <option key={c.code} value={c.code}>{c.code}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Cutoffs Table */}
                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-skcet-navy uppercase text-[10px] font-bold tracking-wider">
                          <th className="py-3 px-3">Code</th>
                          <th className="py-3 px-3">Department Name</th>
                          <th className="py-3 px-3 text-center">Intake</th>
                          <th className={`py-3 px-3 text-center font-mono ${selectedCommunityFilter === 'OC' ? 'bg-amber-100 text-amber-900 font-bold' : ''}`}>OC</th>
                          <th className={`py-3 px-3 text-center font-mono ${selectedCommunityFilter === 'BC' ? 'bg-amber-100 text-amber-900 font-bold' : ''}`}>BC</th>
                          <th className={`py-3 px-3 text-center font-mono ${selectedCommunityFilter === 'BCM' ? 'bg-amber-100 text-amber-900 font-bold' : ''}`}>BCM</th>
                          <th className={`py-3 px-3 text-center font-mono ${selectedCommunityFilter === 'MBC' ? 'bg-amber-100 text-amber-900 font-bold' : ''}`}>MBC</th>
                          <th className={`py-3 px-3 text-center font-mono ${selectedCommunityFilter === 'SC' ? 'bg-amber-100 text-amber-900 font-bold' : ''}`}>SC</th>
                          <th className={`py-3 px-3 text-center font-mono ${selectedCommunityFilter === 'SCA' ? 'bg-amber-100 text-amber-900 font-bold' : ''}`}>SCA</th>
                          <th className={`py-3 px-3 text-center font-mono ${selectedCommunityFilter === 'ST' ? 'bg-amber-100 text-amber-900 font-bold' : ''}`}>ST</th>
                          <th className="py-3 px-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                        {filteredCutoffs.map((dept) => {
                          const yearData = dept.years[selectedCutoffYear] || dept.years['2025'];
                          const userCutoffNum = parseFloat(calculatedCutoff) || 0;
                          const targetCutoff = yearData[userCommunity] || 200;
                          const isEligible = userCutoffNum > 0 && userCutoffNum >= targetCutoff;

                          return (
                            <tr
                              key={dept.code}
                              className={`transition-colors ${
                                isEligible ? 'bg-emerald-50/50 hover:bg-emerald-50' : 'hover:bg-amber-50/30'
                              }`}
                            >
                              <td className="py-3 px-3 font-mono font-bold text-skcet-navy">
                                {dept.code}
                              </td>
                              <td className="py-3 px-3 font-semibold text-gray-900">
                                <div className="flex items-center gap-2">
                                  <span>{dept.name}</span>
                                  {isEligible && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                      Eligible ({userCommunity})
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-3 text-center font-mono text-gray-500">
                                {dept.intake}
                              </td>
                              <td className={`py-3 px-3 text-center font-mono font-bold ${selectedCommunityFilter === 'OC' ? 'bg-amber-50 text-amber-950 font-bold' : 'text-gray-800'}`}>
                                {yearData.OC.toFixed(2)}
                              </td>
                              <td className={`py-3 px-3 text-center font-mono font-bold ${selectedCommunityFilter === 'BC' ? 'bg-amber-50 text-amber-950 font-bold' : 'text-gray-800'}`}>
                                {yearData.BC.toFixed(2)}
                              </td>
                              <td className={`py-3 px-3 text-center font-mono font-bold ${selectedCommunityFilter === 'BCM' ? 'bg-amber-50 text-amber-950 font-bold' : 'text-gray-800'}`}>
                                {yearData.BCM.toFixed(2)}
                              </td>
                              <td className={`py-3 px-3 text-center font-mono font-bold ${selectedCommunityFilter === 'MBC' ? 'bg-amber-50 text-amber-950 font-bold' : 'text-gray-800'}`}>
                                {yearData.MBC.toFixed(2)}
                              </td>
                              <td className={`py-3 px-3 text-center font-mono font-bold ${selectedCommunityFilter === 'SC' ? 'bg-amber-50 text-amber-950 font-bold' : 'text-gray-800'}`}>
                                {yearData.SC.toFixed(2)}
                              </td>
                              <td className={`py-3 px-3 text-center font-mono font-bold ${selectedCommunityFilter === 'SCA' ? 'bg-amber-50 text-amber-950 font-bold' : 'text-gray-800'}`}>
                                {yearData.SCA.toFixed(2)}
                              </td>
                              <td className={`py-3 px-3 text-center font-mono font-bold ${selectedCommunityFilter === 'ST' ? 'bg-amber-50 text-amber-950 font-bold' : 'text-gray-800'}`}>
                                {yearData.ST.toFixed(2)}
                              </td>
                              <td className="py-3 px-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEnquiryForm(prev => ({
                                      ...prev,
                                      programme: dept.name,
                                      cutoff: calculatedCutoff || '',
                                      inquiryType: `Admission Enquiry — ${dept.shortName}`,
                                    }));
                                    setIsApplyModalOpen(true);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-skcet-navy hover:bg-skcet-navy-light text-white text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                                >
                                  Enquire
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 pt-2">
                    <span>Note: Cut-offs are normalized out of 200 as per Anna University / TNEA single window counseling norms.</span>
                    <span className="font-semibold text-skcet-navy">TNEA College Code: 2718</span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* ── Official Reporting Document PDF Preview & Print Modal (Matching Uploaded Screenshots) ── */}
      <AnimatePresence>
        {selectedReportingDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white text-gray-900 rounded-2xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl border border-gray-300"
            >
              {/* Modal Top Action Bar (Non-printable) */}
              <div className="bg-skcet-navy text-white px-6 py-3.5 flex items-center justify-between print:hidden">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                    {selectedReportingDoc.code}
                  </span>
                  <span className="text-sm font-semibold truncate max-w-md">
                    {selectedReportingDoc.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded-lg bg-skcet-gold hover:bg-amber-400 text-skcet-dark font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Printer size={13} /> Print / Save PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedReportingDoc(null)}
                    className="text-gray-300 hover:text-white px-2 py-1 text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* PDF Document Body matching exact layout of user's uploaded screenshot */}
              <div className="p-8 sm:p-12 max-h-[80vh] overflow-y-auto bg-white font-sans text-black">
                {/* Centered Document Title */}
                <div className="text-center mb-6 space-y-1">
                  <h2 className="font-bold text-base sm:text-lg uppercase tracking-tight text-black">
                    {selectedReportingDoc.title}
                  </h2>
                  <p className="text-xs sm:text-[13px] font-semibold text-black underline decoration-black underline-offset-4">
                    {selectedReportingDoc.subtitle}
                  </p>
                </div>

                {/* Table of Particulars matching uploaded image */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-black border-collapse">
                    <thead>
                      <tr className="border-b border-black">
                        <th className="py-2.5 px-3 border-r border-black w-14 text-center font-bold">
                          S. No
                        </th>
                        <th className="py-2.5 px-4 font-bold">
                          Particulars
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                      {selectedReportingDoc.particulars.map((item) => (
                        <tr key={item.sno} className="border-b border-black">
                          <td className="py-3 px-3 border-r border-black text-center font-medium align-top">
                            {item.sno}
                          </td>
                          <td className="py-3 px-4 leading-relaxed font-normal">
                            {item.text}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-300 text-center text-[11px] text-gray-500">
                  Sri Krishna College of Engineering and Technology · Office of Admissions 2026–2027
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Official Download / Print Modal for Scholarship Application Forms ── */}
      <AnimatePresence>
        {selectedScholarshipForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white text-gray-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-skcet-navy text-base">
                      {selectedScholarshipForm.communityGroup} — {selectedScholarshipForm.type}
                    </h3>
                    <p className="text-xs text-gray-500">{selectedScholarshipForm.filename} · {selectedScholarshipForm.fileSize}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedScholarshipForm(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                >
                  ✕
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-xs text-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Scheme Type:</span>
                  <strong className="text-gray-900">Tamil Nadu Post-Matric Scholarship (PMSS)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Community Target:</span>
                  <strong className="text-skcet-navy">{selectedScholarshipForm.communityGroup}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Submission Mode:</span>
                  <span>Physical Dossier + Online e-Scholarship Forwarding</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Verification Counter:</span>
                  <span>SKCET Scholarship Office, Administrative Block</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Ensure that the original income certificate, parent salary/pension certificate, and community certificate are attached with this completed form before handing it to your department tutor.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedScholarshipForm(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setSelectedScholarshipForm(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download size={14} />
                  <span>Download / Print Official PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Enquiry / Direct Application Modal ── */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white text-gray-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-skcet-navy">
                    Admission & Cut-off Enquiry 2026
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{enquiryForm.inquiryType}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                >
                  ✕
                </button>
              </div>

              {enquirySuccess ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 size={42} className="text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-gray-900">Enquiry Registered!</h4>
                  <p className="text-xs text-gray-600">Our Admission Counselor will reach out to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                      Student Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={enquiryForm.candidateName}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, candidateName: e.target.value }))}
                      placeholder="e.g. Rahul Sundaram"
                      required
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="e.g. 9876543210"
                        required
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                        12th Cutoff Score
                      </label>
                      <input
                        type="text"
                        value={enquiryForm.cutoff}
                        onChange={(e) => setEnquiryForm(prev => ({ ...prev, cutoff: e.target.value }))}
                        placeholder="e.g. 192.5"
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 text-gray-900 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. rahul@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                      Preferred Programme
                    </label>
                    <select
                      value={enquiryForm.programme}
                      onChange={(e) => setEnquiryForm(prev => ({ ...prev, programme: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 text-gray-900 cursor-pointer"
                    >
                      {UG_PROGRAMMES.map(p => (
                        <option key={p.code} value={p.name}>{p.name}</option>
                      ))}
                      {PG_PROGRAMMES.map(p => (
                        <option key={p.code} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplyModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white font-bold text-xs cursor-pointer shadow-xs"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default Admissions;
