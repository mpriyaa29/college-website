"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  FileText,
  CreditCard,
  Calendar,
  Award,
  RotateCcw,
  Download,
  Printer,
  Eye,
  AlertCircle,
  Search,
  ShieldCheck,
  FileCheck,
  ChevronRight,
  Lock,
  ArrowLeft,
  User,
  Users,
  Mail
} from 'lucide-react';
import {
  EXAM_DOMAINS,
  EXAM_FORMS,
  ACADEMIC_REGULATIONS,
  EXAM_TIMETABLES,
  SAMPLE_HALL_TICKETS,
  UPCOMING_EXAM_PORTALS,
  ARREAR_SEMESTERS_DATA,
  SAMPLE_RESULTS_DATA,
} from '../../data/examsData';

// Map icon strings to Lucide components
const iconMap = {
  BookOpen,
  FileText,
  CreditCard,
  Calendar,
  Award,
  RotateCcw,
};

const Exams = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Derive active domain directly from URL (e.g. /exams/forms -> 'forms')
  const pathParts = pathname.split('/').filter(Boolean);
  const currentSubdomain = pathParts[1];
  const activeDomainId = (currentSubdomain && EXAM_DOMAINS.some(d => d.id === currentSubdomain))
    ? currentSubdomain
    : 'regulations';

  // Forms Domain State
  const [selectedFormForPreview, setSelectedFormForPreview] = useState(null);
  const [formsSearchQuery, setFormsSearchQuery] = useState('');
  const [selectedFormCategory, setSelectedFormCategory] = useState('All');

  // Hall Ticket State (Initially empty with no hall ticket displayed)
  const [hallTicketRegNo, setHallTicketRegNo] = useState('');
  const [hallTicketDob, setHallTicketDob] = useState('');
  const [activeHallTicket, setActiveHallTicket] = useState(null);
  const [searchedHallTicketReg, setSearchedHallTicketReg] = useState('');
  const [hallTicketNotFound, setHallTicketNotFound] = useState(false);
  const [hallTicketError, setHallTicketError] = useState('');
  const [isHallTicketViewOpen, setIsHallTicketViewOpen] = useState(false);

  // Timetable State (Topic list initially, dedicated view on click)
  const [selectedTimetable, setSelectedTimetable] = useState(null);

  // Results State (Ask reg & dob first, dedicated view on submit)
  const [resultsRegNo, setResultsRegNo] = useState('');
  const [resultsDob, setResultsDob] = useState('');
  const [activeResult, setActiveResult] = useState(null);
  const [isResultViewOpen, setIsResultViewOpen] = useState(false);
  const [resultsError, setResultsError] = useState('');

  // Arrear Application State (Select Exam Semester First -> Show papers -> Confirm Pop-up -> Online Payment)
  const [selectedArrearSemesterId, setSelectedArrearSemesterId] = useState('sem-4');
  const [selectedArrearSubjects, setSelectedArrearSubjects] = useState(['22CS401']);
  const [isArrearConfirmModalOpen, setIsArrearConfirmModalOpen] = useState(false);

  // Handle clicking on domain in left navigation
  const handleDomainSelect = (domainId) => {
    router.push(`/exams/${domainId}`);
    window.scrollTo({ top: 140, behavior: 'smooth' });
  };

  // Hall ticket verification & lookup
  const handleSearchHallTicket = (e) => {
    if (e) e.preventDefault();
    setHallTicketError('');
    const reg = hallTicketRegNo.trim().toUpperCase();
    const dob = hallTicketDob.trim();

    if (!reg) {
      setHallTicketError('Please enter your Student Register Number.');
      return;
    }
    if (!dob) {
      setHallTicketError('Please enter your Date of Birth.');
      return;
    }
    
    setSearchedHallTicketReg(reg);
    const found = SAMPLE_HALL_TICKETS[reg];

    if (found) {
      if (!found.dob || found.dob === dob) {
        setActiveHallTicket(found);
        setHallTicketNotFound(false);
        setIsHallTicketViewOpen(true);
        window.scrollTo({ top: 140, behavior: 'smooth' });
      } else {
        setActiveHallTicket(null);
        setHallTicketNotFound(false);
        setHallTicketError('Date of Birth does not match the registered examination record for this Register Number.');
        setIsHallTicketViewOpen(false);
      }
    } else {
      setActiveHallTicket(null);
      setHallTicketNotFound(true);
      setIsHallTicketViewOpen(false);
    }
  };

  // Results search & verification
  const handleSearchResults = (e) => {
    if (e) e.preventDefault();
    setResultsError('');
    const reg = resultsRegNo.trim().toUpperCase();
    const dob = resultsDob.trim();

    if (!reg) {
      setResultsError('Please enter your Student Register Number.');
      return;
    }
    if (!dob) {
      setResultsError('Please enter your Date of Birth.');
      return;
    }

    const found = SAMPLE_RESULTS_DATA[reg];
    if (found) {
      if (!found.dob || found.dob === dob) {
        setActiveResult(found);
        setIsResultViewOpen(true);
        setResultsError('');
        window.scrollTo({ top: 140, behavior: 'smooth' });
      } else {
        setActiveResult(null);
        setIsResultViewOpen(false);
        setResultsError('Date of Birth does not match the registered examination records.');
      }
    } else {
      setActiveResult(null);
      setIsResultViewOpen(false);
      setResultsError('No examination results found for the entered Register Number. Please verify your credentials.');
    }
  };

  // Arrear helper functions
  const currentSemesterData = ARREAR_SEMESTERS_DATA.find(s => s.id === selectedArrearSemesterId) || ARREAR_SEMESTERS_DATA[3];

  const handleToggleArrearSubject = (code) => {
    if (selectedArrearSubjects.includes(code)) {
      setSelectedArrearSubjects(selectedArrearSubjects.filter(c => c !== code));
    } else {
      setSelectedArrearSubjects([...selectedArrearSubjects, code]);
    }
  };

  const totalArrearFee = currentSemesterData.subjects
    .filter(s => selectedArrearSubjects.includes(s.code))
    .reduce((sum, s) => sum + s.fee, 0);

  const handleProceedToArrearPayment = () => {
    setIsArrearConfirmModalOpen(false);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('arrear_payment_state', JSON.stringify({
        fromArrear: true,
        rollNo: '7376231CS201',
        dob: '2004-05-14',
        categoryId: 'college-higher-exam-1st',
        feeTitle: `Autonomous Arrear Examination Fee — ${currentSemesterData.label}`,
        totalAmount: totalArrearFee,
        selectedPapers: currentSemesterData.subjects.filter(s => selectedArrearSubjects.includes(s.code)),
      }));
    }
    router.push('/online-payment');
  };

  // Filtered forms
  const filteredForms = EXAM_FORMS.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(formsSearchQuery.toLowerCase()) ||
                          form.code.toLowerCase().includes(formsSearchQuery.toLowerCase()) ||
                          form.category.toLowerCase().includes(formsSearchQuery.toLowerCase());
    const matchesCategory = selectedFormCategory === 'All' || form.category === selectedFormCategory;
    return matchesSearch && matchesCategory;
  });

  const formCategories = ['All', ...new Set(EXAM_FORMS.map(f => f.category))];

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-32 sm:pt-36 lg:pt-40 pb-24 text-gray-800">
      
      {/* ── Page Header (Clean White Theme matching Documents.jsx) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <Link href="/" className="hover:text-amber-800 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-800">Autonomous Examinations</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-skcet-navy tracking-tight">
                Office of the Controller of Examinations
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
                Autonomous examination frameworks, official downloadable forms, end-semester schedules, hall tickets, and results portal.
              </p>
            </div>

            <div className="bg-white border border-gray-200 px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-xs text-gray-700 shadow-2xs self-start md:self-auto">
              <ShieldCheck size={18} className="text-amber-600" />
              <div>
                <div className="text-[11px] font-bold text-skcet-navy">Autonomous Examination Cell</div>
                <div className="text-[10px] text-gray-500">Affiliated to Anna University, Chennai</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile Horizontal Quick-Nav Bar ── */}
      <div className="lg:hidden sticky top-24 z-30 bg-[#f8f9fa]/95 backdrop-blur-md border-y border-gray-200 px-4 py-3 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {EXAM_DOMAINS.map((domain) => {
            const Icon = iconMap[domain.icon] || FileText;
            const isActive = activeDomainId === domain.id;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => handleDomainSelect(domain.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-skcet-navy text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon size={13} />
                <span>{domain.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Layout: Left Navigation + Selected Domain Content Pane ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-8 relative">
        
        {/* ── Desktop Left Navigation Sidebar ── */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0 lg:sticky lg:top-36 z-20">
          <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-xs space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Examination Domains
            </div>

            <nav aria-label="Examination Sections" className="space-y-1">
              {EXAM_DOMAINS.map((domain) => {
                const Icon = iconMap[domain.icon] || FileText;
                const isActive = activeDomainId === domain.id;

                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => handleDomainSelect(domain.id)}
                    className={`w-full text-left rounded-xl p-3 flex items-center justify-between transition-all duration-200 cursor-pointer group ${
                      isActive
                        ? 'bg-skcet-navy text-white shadow-xs font-semibold'
                        : 'text-gray-700 hover:bg-gray-100/80 hover:text-skcet-navy'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
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
          </div>
        </aside>

        {/* ── Main Content Area: ONLY THE SELECTED DOMAIN IS DISPLAYED ── */}
        <div className="flex-1 min-w-0 w-full">
          <AnimatePresence mode="wait">

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 1: REGULATIONS
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === 'regulations' && (
              <motion.div
                key="regulations"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                    <BookOpen size={15} />
                    <span>Autonomous Academic Regulations</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                    Curriculum & Assessment Regulations
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Official rules governing the Choice Based Credit System (CBCS), grade point averages, and award of autonomous degrees.
                  </p>
                </div>

                {/* ── Controller of Examinations Official Presentation Card with Updated Photo ── */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs overflow-hidden border border-gray-200">
                  <div className="text-center mb-6">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-skcet-navy">
                      Controller Of Examinations
                    </h3>
                    <div className="w-20 h-0.5 bg-skcet-gold mx-auto mt-2 rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
                    {/* Left Column: Officer Photograph smoothly smudged directly into the white background without border card */}
                    <div className="relative flex items-center justify-center h-full min-h-[380px] p-1 bg-white">
                      <div className="relative w-full h-full max-h-[460px] flex items-center justify-center overflow-hidden">
                        <img
                          src="/images/coe-ramesh-kumar.png"
                          alt="Dr. R. Ramesh Kumar, Controller Of Examinations"
                          className="w-full h-full object-cover object-[center_15%] rounded-3xl transition-transform duration-500 hover:scale-[1.02]"
                          style={{
                            maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)',
                          }}
                        />
                        {/* Soft white perimeter smudge overlay */}
                        <div
                          className="pointer-events-none absolute inset-0 rounded-3xl"
                          style={{
                            background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 52%, rgba(255,255,255,0.7) 82%, #ffffff 100%)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Right Column: Custom White Institutional Card matching reference media_1787326319255.png */}
                    <div className="relative bg-[#fcfdfd] text-[#0c1b33] p-7 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between overflow-hidden">
                      {/* Top-Left Ribbon Bookmark */}
                      <div className="absolute top-0 left-6 sm:left-8 w-12 h-14 bg-[#0c1b33] flex items-center justify-center shadow-md [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)]">
                        <User size={20} className="text-[#d4a320] -mt-1" />
                      </div>

                      {/* Background Heraldic Shield Watermark at Bottom Right */}
                      <div className="absolute -bottom-6 -right-6 w-48 h-48 opacity-[0.06] pointer-events-none select-none">
                        <img
                          src="/images/skcet-emblem.png"
                          alt=""
                          className="w-full h-full object-contain filter grayscale"
                        />
                      </div>

                      <div className="relative z-10 pt-8 sm:pt-6">
                        {/* Officer Title & Designation */}
                        <div className="mb-5">
                          <h4 className="text-2xl sm:text-[26px] font-bold text-[#0c1b33] tracking-tight leading-tight">
                            Dr. R. Ramesh Kumar
                          </h4>
                          <p className="text-sm sm:text-base font-semibold text-[#c59b27] mt-1">
                            Controller Of Examinations
                          </p>
                          <div className="w-14 h-0.5 bg-[#c59b27]/60 mt-1.5 rounded-full" />
                        </div>

                        {/* E-mail Contact */}
                        <div className="flex items-center gap-3.5 mb-6">
                          <div className="w-9 h-9 rounded-full bg-[#0c1b33] flex items-center justify-center text-white shadow-xs flex-shrink-0">
                            <Mail size={15} className="text-white" />
                          </div>
                          <div className="text-sm">
                            <span className="text-[#c59b27] font-bold mr-1.5">E-mail:</span>
                            <span className="text-[#0c1b33] font-bold tracking-tight font-sans">coe@skcet.ac.in</span>
                          </div>
                        </div>

                        {/* Elegant Central Divider with Center Diamond Accent */}
                        <div className="relative my-6 flex items-center justify-center">
                          <div className="w-full h-px bg-slate-200" />
                          <div className="absolute w-2.5 h-2.5 bg-[#c59b27] rotate-45 border-2 border-white shadow-2xs" />
                        </div>

                        {/* Deputy COE's Section */}
                        <div>
                          <div className="flex items-center gap-3.5 mb-3">
                            <div className="w-9 h-9 rounded-full bg-[#0c1b33] flex items-center justify-center text-white shadow-xs flex-shrink-0">
                              <Users size={16} className="text-[#d4a320]" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-sm sm:text-[15px] font-bold text-[#0c1b33] tracking-wider uppercase font-sans">
                                Deputy COE&apos;s
                              </h5>
                              <div className="w-24 h-0.5 bg-[#c59b27] mt-1 rounded-full" />
                            </div>
                          </div>

                          <div className="space-y-2 pt-2 text-xs sm:text-[13px] font-semibold text-[#0c1b33]">
                            {[
                              'Dr. R. Sarathkumar',
                              'Dr. G. Sophia Jasmine',
                              'Dr. T. Nithiyanandhan',
                              'Dr. K. Vishnu Murthy',
                              'Mr. N. Aravindkumar'
                            ].map((name, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 py-1.5 border-b border-dashed border-slate-200/80 last:border-b-0">
                                <span className="text-[#c59b27] font-bold text-sm leading-none select-none">»</span>
                                <span className="text-[#0c1b33] tracking-wide">{name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regulation Cards */}
                <div className="space-y-4">
                  {ACADEMIC_REGULATIONS.map((reg) => (
                    <div
                      key={reg.code}
                      className="bg-white border border-gray-200 hover:border-amber-400/80 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-xs hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                        <div>
                          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200">
                            {reg.code}
                          </span>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-skcet-navy mt-2">
                            {reg.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">{reg.degree} · Effective: {reg.effective}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => alert(`Downloading Official Gazette: ${reg.title}`)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white font-bold text-xs transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
                        >
                          <Download size={14} />
                          <span>Download PDF</span>
                        </button>
                      </div>

                      <div className="space-y-2 text-xs text-gray-600">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400 block">Key Highlights:</span>
                        {reg.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className="text-amber-600 mt-0.5">✦</span>
                            <span className="leading-relaxed">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CBCS Grading System Table */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                  <h3 className="text-base font-bold text-skcet-navy mb-1">
                    CBCS 10-Point Letter Grading & Performance Scale
                  </h3>
                  <p className="text-xs text-gray-500 mb-5">Calculated based on relative & absolute evaluation standards.</p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-skcet-navy uppercase text-[10px] font-bold tracking-wider">
                          <th className="py-3 px-3">Letter Grade</th>
                          <th className="py-3 px-3">Grade Point</th>
                          <th className="py-3 px-3">Performance Category</th>
                          <th className="py-3 px-3">Marks Range (Approx)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                        <tr><td className="py-3 px-3 font-bold text-amber-700 font-mono">O</td><td className="py-3 px-3 font-bold font-mono">10</td><td className="py-3 px-3">Outstanding</td><td className="py-3 px-3">91 – 100</td></tr>
                        <tr><td className="py-3 px-3 font-bold text-emerald-700 font-mono">A+</td><td className="py-3 px-3 font-bold font-mono">9</td><td className="py-3 px-3">Excellent</td><td className="py-3 px-3">81 – 90</td></tr>
                        <tr><td className="py-3 px-3 font-bold text-emerald-700 font-mono">A</td><td className="py-3 px-3 font-bold font-mono">8</td><td className="py-3 px-3">Very Good</td><td className="py-3 px-3">71 – 80</td></tr>
                        <tr><td className="py-3 px-3 font-bold text-blue-700 font-mono">B+</td><td className="py-3 px-3 font-bold font-mono">7</td><td className="py-3 px-3">Good</td><td className="py-3 px-3">61 – 70</td></tr>
                        <tr><td className="py-3 px-3 font-bold text-blue-700 font-mono">B</td><td className="py-3 px-3 font-bold font-mono">6</td><td className="py-3 px-3">Average</td><td className="py-3 px-3">50 – 60</td></tr>
                        <tr><td className="py-3 px-3 font-bold text-rose-700 font-mono">RA / U</td><td className="py-3 px-3 font-bold font-mono">0</td><td className="py-3 px-3">Re-Appearance (Arrear)</td><td className="py-3 px-3">&lt; 50</td></tr>
                        <tr><td className="py-3 px-3 font-bold text-amber-700 font-mono">W</td><td className="py-3 px-3 font-bold font-mono">0</td><td className="py-3 px-3">Withdrawal</td><td className="py-3 px-3">—</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 2: FORMS (CORE USER REQUIREMENT WITH OFFICIAL PDF PREVIEW)
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === 'forms' && (
              <motion.div
                key="forms"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                    <FileText size={15} />
                    <span>Official PDF Forms Repository</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                    Downloadable COE Examination Forms
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Access and print official prescribed application forms for exam withdrawal, transcripts, condonation, and Ph.D registration.
                  </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 p-4 rounded-2xl shadow-xs">
                  {/* Category Filter Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    {formCategories.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedFormCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          selectedFormCategory === cat
                            ? 'bg-skcet-navy text-white shadow-xs'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search input */}
                  <div className="relative w-full sm:w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search forms..."
                      value={formsSearchQuery}
                      onChange={(e) => setFormsSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Forms Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredForms.map((form) => (
                    <div
                      key={form.id}
                      className="bg-white border border-gray-200 hover:border-amber-400/80 rounded-2xl p-6 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                            {form.code}
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium">
                            {form.category} · {form.pages} Page ({form.fileSize})
                          </span>
                        </div>

                        <h3 className="font-display text-base font-bold text-skcet-navy leading-snug mb-2">
                          {form.title}
                        </h3>

                        <p className="text-xs text-gray-600 leading-relaxed mb-4">
                          {form.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedFormForPreview(form)}
                          className="flex-1 py-2 px-3 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <Eye size={13} />
                          <span>View Official PDF</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFormForPreview(form);
                            setTimeout(() => window.print(), 300);
                          }}
                          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 transition-colors cursor-pointer"
                          title="Print Document"
                        >
                          <Printer size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 3: HALL TICKET (VERIFICATION FIRST -> DEDICATED VIEW)
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === 'hall-ticket' && (
              <motion.div
                key="hall-ticket"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {isHallTicketViewOpen && activeHallTicket ? (
                  /* ── DEDICATED HALL TICKET LANDING VIEW ── */
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 p-4 rounded-2xl shadow-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setIsHallTicketViewOpen(false);
                          setActiveHallTicket(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-gray-300"
                      >
                        <ArrowLeft size={14} />
                        <span>Exit / Back to Search</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-5 py-2 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <Printer size={15} />
                        <span>Print / Save Hall Ticket</span>
                      </button>
                    </div>

                    {/* Hall Ticket Printable Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-md text-gray-900 font-sans">
                      <div className="flex items-center justify-between border-b-2 border-skcet-navy pb-4 mb-6">
                        <img src="/images/skcet-emblem.png" alt="SKCET" className="h-16 w-auto object-contain" />
                        <div className="text-center flex-1 px-4">
                          <h2 className="font-bold text-base sm:text-lg uppercase tracking-tight text-skcet-navy">
                            SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY
                          </h2>
                          <p className="text-[11px] text-gray-600 font-medium mt-0.5">
                            (An Autonomous Institution · Affiliated to Anna University, Chennai)
                          </p>
                          <span className="inline-block mt-1 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
                            {activeHallTicket.examTitle} — Official Hall Ticket
                          </span>
                        </div>
                        <div className="w-16 text-right font-mono text-[10px] text-gray-400">
                          COE-HT-26
                        </div>
                      </div>

                      {/* Candidate Particulars Table */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border border-gray-200 p-4 rounded-xl text-xs mb-6">
                        <div><strong className="text-gray-500 min-w-28 inline-block">Register Number:</strong> <span className="font-mono font-bold text-skcet-navy">{activeHallTicket.regNo}</span></div>
                        <div><strong className="text-gray-500 min-w-28 inline-block">Candidate Name:</strong> <span className="font-bold text-gray-900">{activeHallTicket.name}</span></div>
                        <div><strong className="text-gray-500 min-w-28 inline-block">Degree & Branch:</strong> <span className="text-gray-800">{activeHallTicket.degree}</span></div>
                        <div><strong className="text-gray-500 min-w-28 inline-block">Semester:</strong> <span className="text-gray-800">{activeHallTicket.semester}</span></div>
                        <div><strong className="text-gray-500 min-w-28 inline-block">Examination Center:</strong> <span className="text-gray-800">{activeHallTicket.examCenter}</span></div>
                        <div><strong className="text-gray-500 min-w-28 inline-block">Allotted Hall / Desk:</strong> <span className="font-bold text-amber-800">{activeHallTicket.hallNo}</span></div>
                      </div>

                      {/* Subject Schedule Matrix */}
                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-xs text-left border border-gray-200">
                          <thead>
                            <tr className="bg-gray-100 border-b border-gray-200 text-skcet-navy uppercase text-[10.5px] font-bold">
                              <th className="py-2.5 px-3 border-r border-gray-200">Date & Session</th>
                              <th className="py-2.5 px-3 border-r border-gray-200">Course Code</th>
                              <th className="py-2.5 px-3 border-r border-gray-200">Course Title</th>
                              <th className="py-2.5 px-3 text-center">Invigilator Sign</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {activeHallTicket.examSubjects.map((sub, idx) => (
                              <tr key={idx}>
                                <td className="py-3 px-3 font-semibold border-r border-gray-200">{sub.date} · {sub.session}</td>
                                <td className="py-3 px-3 font-mono font-bold border-r border-gray-200 text-skcet-navy">{sub.code}</td>
                                <td className="py-3 px-3 border-r border-gray-200">{sub.name}</td>
                                <td className="py-3 px-3 text-center text-gray-300 font-mono">__________</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Signatures */}
                      <div className="flex justify-between items-end pt-8 text-xs font-semibold text-gray-700">
                        <div className="text-center"><div className="w-36 border-b border-gray-400 mb-1" />Candidate Signature</div>
                        <div className="text-center"><div className="w-36 border-b border-gray-400 mb-1" />Controller of Examinations</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── CREDENTIAL VERIFICATION FORM ── */
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                        <CreditCard size={15} />
                        <span>Autonomous Examination Hall Ticket Portal</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                        Download Examination Hall Ticket
                      </h2>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1">
                        Enter your Student Register Number and Date of Birth to verify credential allotment and download your hall ticket.
                      </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                      <form onSubmit={handleSearchHallTicket} className="space-y-4 max-w-xl">
                        <div>
                          <label className="text-[10.5px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                            Student Register Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={hallTicketRegNo}
                            onChange={(e) => setHallTicketRegNo(e.target.value)}
                            placeholder="e.g. 7376231CS201"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono uppercase text-gray-900 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="text-[10.5px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                            Date of Birth <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={hallTicketDob}
                            onChange={(e) => setHallTicketDob(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                        >
                          <Search size={14} />
                          <span>Verify & Access Hall Ticket</span>
                        </button>
                      </form>

                      {hallTicketError && (
                        <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs flex items-center gap-2 font-medium">
                          <AlertCircle size={15} className="flex-shrink-0 text-rose-600" />
                          <span>{hallTicketError}</span>
                        </div>
                      )}

                      {hallTicketNotFound && (
                        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 space-y-2">
                          <div className="flex items-center gap-2 font-bold text-amber-950">
                            <AlertCircle size={16} className="text-amber-700" />
                            <span>Hall Ticket Not Issued Yet for Register No: {searchedHallTicketReg}</span>
                          </div>
                          <p className="leading-relaxed text-amber-800">
                            The hall ticket for candidate <strong>{searchedHallTicketReg}</strong> has not been generated or released yet. Please check again after the seating allotment announcement.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Upcoming Scheduled Exams (Locked Portals) */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                          Academic Schedule Portals
                        </span>
                        <h3 className="text-base font-bold text-skcet-navy">
                          Upcoming Scheduled Examination Portals
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {UPCOMING_EXAM_PORTALS.map((portal) => (
                          <div
                            key={portal.id}
                            className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="font-bold text-sm text-skcet-navy font-mono">{portal.name}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-200 text-gray-700 border border-gray-300">
                                  {portal.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 font-medium mb-1">{portal.fullTitle}</p>
                              <p className="text-[11px] text-gray-500 mb-3">{portal.scheduledDates}</p>
                              <p className="text-[11px] text-gray-600 leading-snug">{portal.statusDetail}</p>
                            </div>

                            <button
                              type="button"
                              disabled
                              className="w-full py-2 rounded-xl bg-gray-200 text-gray-500 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed mt-4"
                            >
                              <Lock size={12} />
                              <span>Hall Ticket Portal Locked (Just Scheduled)</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 4: TIMETABLE (TOPIC LIST -> DEDICATED SCHEDULE VIEW)
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === 'timetable' && (
              <motion.div
                key="timetable"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {selectedTimetable ? (
                  /* ── DEDICATED TIMETABLE SCHEDULE LANDING VIEW ── */
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 p-4 rounded-2xl shadow-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedTimetable(null)}
                        className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-gray-300"
                      >
                        <ArrowLeft size={14} />
                        <span>Exit / Back to Timetables</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-5 py-2 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <Printer size={15} />
                        <span>Print / Download Timetable</span>
                      </button>
                    </div>

                    {/* Timetable Schedule Table matching media_1787323670869.png */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4 mb-6">
                        <div>
                          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                            {selectedTimetable.status}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-skcet-navy mt-2">
                            {selectedTimetable.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {selectedTimetable.batch} · Sessions: <strong className="text-gray-800">{selectedTimetable.sessions}</strong>
                          </p>
                        </div>
                        <div className="text-left sm:text-right text-xs text-gray-500">
                          Published: <span className="text-skcet-navy font-mono font-bold">{selectedTimetable.releaseDate}</span>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-skcet-navy uppercase text-[10.5px] font-bold tracking-wider">
                              <th className="py-3 px-3 border-r border-gray-200">DATE</th>
                              <th className="py-3 px-3 border-r border-gray-200">SESSION</th>
                              <th className="py-3 px-3 border-r border-gray-200">COURSE CODE</th>
                              <th className="py-3 px-3 border-r border-gray-200">COURSE TITLE</th>
                              <th className="py-3 px-3">BRANCH</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                            {selectedTimetable.schedules.map((s, idx) => (
                              <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                                <td className="py-3.5 px-3 font-semibold border-r border-gray-200">{s.date}</td>
                                <td className="py-3.5 px-3 font-mono font-bold text-amber-800 border-r border-gray-200">{s.session}</td>
                                <td className="py-3.5 px-3 font-mono font-bold text-skcet-navy border-r border-gray-200">{s.code}</td>
                                <td className="py-3.5 px-3 border-r border-gray-200">{s.title}</td>
                                <td className="py-3.5 px-3 text-gray-600">{s.dept}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-[11px] text-gray-500 mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <span>FN Session: 09:30 AM – 12:30 PM | AN Session: 01:30 PM – 04:30 PM</span>
                        <span>Office of Controller of Examinations, SKCET</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── TIMETABLE TOPICS LIST (CLICK TO NAVIGATE) ── */
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                        <Calendar size={15} />
                        <span>Autonomous Examination Schedule</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                        End-Semester Examination Timetables
                      </h2>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1">
                        Select an examination programme topic below to view and download the official scheduled timetable matrix.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {EXAM_TIMETABLES.map((tt) => (
                        <div
                          key={tt.id}
                          onClick={() => {
                            setSelectedTimetable(tt);
                            window.scrollTo({ top: 140, behavior: 'smooth' });
                          }}
                          className="bg-white border border-gray-200 hover:border-amber-400/80 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                                {tt.status}
                              </span>
                              <span className="text-xs text-gray-400 font-mono">Released: {tt.releaseDate}</span>
                            </div>
                            <h3 className="text-lg font-bold text-skcet-navy group-hover:text-amber-800 transition-colors">
                              {tt.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {tt.batch}
                            </p>
                          </div>

                          <button
                            type="button"
                            className="px-5 py-2.5 rounded-xl bg-skcet-navy group-hover:bg-skcet-navy-light text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer flex-shrink-0 shadow-xs"
                          >
                            <span>View Timetable Schedule</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 5: RESULTS (VERIFY-FIRST CREDENTIALS -> DEDICATED VIEW)
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {isResultViewOpen && activeResult ? (
                  /* ── DEDICATED RESULTS LANDING VIEW ── */
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 p-4 rounded-2xl shadow-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setIsResultViewOpen(false);
                          setActiveResult(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-gray-300"
                      >
                        <ArrowLeft size={14} />
                        <span>Exit / Back to Search</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-5 py-2 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        <Printer size={15} />
                        <span>Print / Download Result Sheet</span>
                      </button>
                    </div>

                    {/* Results Card matching media_1787323670876.png */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5 mb-6">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-skcet-navy">{activeResult.name}</h3>
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                              {activeResult.regNo}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{activeResult.branch} · {activeResult.semester}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center bg-amber-50 px-5 py-2.5 rounded-xl border border-amber-200">
                            <span className="text-[10px] text-amber-800 uppercase font-mono block">SGPA</span>
                            <span className="text-2xl font-display font-bold text-amber-900">{activeResult.sgpa}</span>
                          </div>
                          <div className="text-center bg-emerald-50 px-5 py-2.5 rounded-xl border border-emerald-200">
                            <span className="text-[10px] text-emerald-800 uppercase font-mono block">CGPA</span>
                            <span className="text-2xl font-display font-bold text-emerald-900">{activeResult.cgpa}</span>
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-xs text-left border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-skcet-navy uppercase text-[10.5px] font-bold tracking-wider">
                              <th className="py-3 px-3 border-r border-gray-200">SUBJECT CODE</th>
                              <th className="py-3 px-3 border-r border-gray-200">SUBJECT NAME</th>
                              <th className="py-3 px-3 text-center border-r border-gray-200">CREDITS</th>
                              <th className="py-3 px-3 text-center border-r border-gray-200">GRADE</th>
                              <th className="py-3 px-3 text-center border-r border-gray-200">POINTS</th>
                              <th className="py-3 px-3 text-center">RESULT</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 text-gray-800 font-medium">
                            {activeResult.grades.map((g, i) => (
                              <tr key={i} className="hover:bg-amber-50/30">
                                <td className="py-3 px-3 font-mono font-bold text-skcet-navy border-r border-gray-200">{g.code}</td>
                                <td className="py-3 px-3 border-r border-gray-200">{g.title}</td>
                                <td className="py-3 px-3 text-center font-mono border-r border-gray-200">{g.credits}</td>
                                <td className="py-3 px-3 text-center font-mono font-bold text-amber-800 border-r border-gray-200">{g.grade}</td>
                                <td className="py-3 px-3 text-center font-mono border-r border-gray-200">{g.gradePoint}</td>
                                <td className="py-3 px-3 text-center">
                                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                    {g.result}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-[10.5px] text-gray-400 border-t border-gray-200 pt-3 text-center">
                        This is a computerized grade statement issued by Sri Krishna College of Engineering and Technology Autonomous Examination Cell.
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── RESULTS INITIAL VERIFICATION FORM (NO INITIAL RESULTS DISPLAYED) ── */
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                        <Award size={15} />
                        <span>Autonomous Grade Sheet & SGPA / CGPA Ledger</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                        End-Semester Examination Results Portal
                      </h2>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1">
                        Enter your Student Register Number and Date of Birth to verify your credentials and view your official grade report.
                      </p>
                    </div>

                    {/* Lookup Form */}
                    <form onSubmit={handleSearchResults} className="bg-white border border-gray-200 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-xs">
                      <div className="flex-1 w-full">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                          Student Register Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={resultsRegNo}
                          onChange={(e) => setResultsRegNo(e.target.value)}
                          placeholder="e.g. 7376231CS201"
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono uppercase text-gray-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="flex-1 w-full">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-gray-600 block mb-1">
                          Date of Birth <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={resultsDob}
                          onChange={(e) => setResultsDob(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto mt-auto px-6 py-2.5 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer h-10 shadow-xs"
                      >
                        <Search size={14} />
                        <span>Verify & View Result</span>
                      </button>
                    </form>

                    {resultsError && (
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-800 font-medium flex items-center gap-2">
                        <AlertCircle size={15} className="flex-shrink-0 text-rose-600" />
                        <span>{resultsError}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* ═════════════════════════════════════════════════════════════════════
                DOMAIN 6: ARREAR APPLICATION (EXAM SELECTOR -> SUBJECTS -> CONFIRM -> PAY)
               ═════════════════════════════════════════════════════════════════════ */}
            {activeDomainId === 'arrear-application' && (
              <motion.div
                key="arrear-application"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 text-amber-700 text-xs uppercase font-bold tracking-wider mb-1">
                    <RotateCcw size={15} />
                    <span>Supplementary Paper Registration Portal</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-skcet-navy">
                    Arrear Examination Application & Fee Payment
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Select your examination semester first, choose your standing arrear subjects, and proceed directly to online fee payment.
                  </p>
                </div>

                {/* Step 1: Select Examination Semester */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-xs">
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block mb-1">
                      Step 1: Select Examination Semester
                    </span>
                    <h3 className="text-lg font-bold text-skcet-navy">
                      Choose Semester to View Arrear Papers
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                    {ARREAR_SEMESTERS_DATA.map((sem) => {
                      const isSelected = selectedArrearSemesterId === sem.id;
                      return (
                        <button
                          key={sem.id}
                          type="button"
                          onClick={() => {
                            setSelectedArrearSemesterId(sem.id);
                            setSelectedArrearSubjects(sem.subjects.map(s => s.code));
                          }}
                          className={`py-3 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                            isSelected
                              ? 'bg-skcet-navy text-white border-skcet-navy shadow-xs'
                              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          {sem.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Subject Selection Card matching media_1787323670872.png */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4 mb-5">
                    <div>
                      <h3 className="font-bold text-skcet-navy text-base">Select Arrear Papers to Register</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Fees per theory paper: ₹450 | Practical / Project: ₹600</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
                      April / May 2026 Session
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {currentSemesterData.subjects.map((sub) => {
                      const isChecked = selectedArrearSubjects.includes(sub.code);
                      return (
                        <div
                          key={sub.code}
                          onClick={() => handleToggleArrearSubject(sub.code)}
                          className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 text-amber-600 accent-amber-600 rounded cursor-pointer"
                            />
                            <div>
                              <span className="font-mono font-bold text-skcet-navy text-xs">{sub.code}</span>
                              <h4 className="text-sm font-semibold text-gray-900">{sub.name}</h4>
                              <span className="text-[11px] text-gray-500">{sub.credits} Credits · {sub.type}</span>
                            </div>
                          </div>
                          <span className="font-display font-bold text-base text-amber-900">
                            ₹{sub.fee}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-skcet-navy text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                    <div>
                      <span className="text-[10px] text-white/60 uppercase block">Total Examination Fee</span>
                      <span className="font-display text-2xl font-bold text-amber-300">
                        ₹{totalArrearFee.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={selectedArrearSubjects.length === 0}
                      onClick={() => setIsArrearConfirmModalOpen(true)}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-skcet-gold hover:bg-amber-400 text-skcet-dark font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <FileCheck size={16} />
                      <span>Submit Application & Pay</span>
                    </button>
                  </div>
                </div>

                {/* Arrear Confirmation Pop-up Modal */}
                <AnimatePresence>
                  {isArrearConfirmModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white text-gray-900 border border-gray-200 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5"
                      >
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={20} className="text-amber-600" />
                            <h3 className="text-lg font-bold text-skcet-navy">
                              Confirm Arrear Registration
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsArrearConfirmModalOpen(false)}
                            className="text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="space-y-3 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Selected Semester:</span>
                            <strong className="text-gray-900">{currentSemesterData.label}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Papers Selected:</span>
                            <strong className="text-amber-800">{selectedArrearSubjects.length} Paper(s)</strong>
                          </div>
                          <div className="border-t border-gray-200 pt-2 space-y-1">
                            {currentSemesterData.subjects
                              .filter(s => selectedArrearSubjects.includes(s.code))
                              .map(s => (
                                <div key={s.code} className="flex justify-between text-[11px] text-gray-700">
                                  <span>{s.code} – {s.name}</span>
                                  <span className="font-mono font-semibold text-gray-900">₹{s.fee}</span>
                                </div>
                              ))}
                          </div>
                          <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
                            <span className="font-bold text-gray-900">Total Fee Due:</span>
                            <strong className="text-amber-800 font-display text-base">₹{totalArrearFee}</strong>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed">
                          Proceeding will submit your arrear application and navigate directly to the <strong>Online Fee Payment Portal</strong> to complete your fee payment and generate your official receipt.
                        </p>

                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsArrearConfirmModalOpen(false)}
                            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs text-gray-700 font-semibold transition-colors cursor-pointer"
                          >
                            Cancel / Modify
                          </button>
                          <button
                            type="button"
                            onClick={handleProceedToArrearPayment}
                            className="px-5 py-2.5 rounded-xl bg-skcet-navy hover:bg-skcet-navy-light text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                          >
                            <span>Confirm & Proceed to Online Payment</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          OFFICIAL PDF FORM PREVIEW & PRINT MODAL
          (Replicating the exact layout of the 4 uploaded scanned documents)
         ─────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedFormForPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="bg-white text-black rounded-xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden border border-gray-300"
            >
              {/* Modal Top Bar (Non-printable) */}
              <div className="bg-skcet-navy text-white px-6 py-3 flex items-center justify-between print:hidden">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                    {selectedFormForPreview.code}
                  </span>
                  <span className="text-sm font-semibold truncate max-w-md">
                    {selectedFormForPreview.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-500 text-skcet-navy font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer size={13} /> Print / Save PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFormForPreview(null)}
                    className="text-gray-300 hover:text-white px-2 py-1 text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Form Printable Body matching uploaded scanned PDF */}
              <div className="p-8 sm:p-12 max-h-[80vh] overflow-y-auto font-serif text-black leading-relaxed bg-white">
                
                {/* 1. Header with SKCET Emblem & Sri Krishna Institutions */}
                <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-5">
                  <img src="/images/skcet-emblem.png" alt="SKCET" className="h-16 w-auto object-contain" />
                  <div className="text-center flex-1 px-4">
                    <h2 className="font-bold text-base sm:text-lg uppercase tracking-tight text-black font-sans">
                      SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-gray-800 font-sans mt-0.5">
                      (An Autonomous Institution. Affiliated to Anna University, Chennai)
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-gray-800 font-sans">
                      Kuniamuthur, Coimbatore – 641 008
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider block text-gray-600">
                      SRI KRISHNA
                    </span>
                    <span className="text-[9px] font-sans text-gray-500 block">
                      INSTITUTIONS
                    </span>
                  </div>
                </div>

                {/* Form Title */}
                <div className="text-center mb-6">
                  <h3 className="font-bold text-sm sm:text-base underline uppercase tracking-wide">
                    {selectedFormForPreview.title}
                  </h3>
                </div>

                {/* ── CONDITIONAL FORM LAYOUT PER PDF ── */}

                {/* 1. WITHDRAWAL FORM */}
                {selectedFormForPreview.id === 'withdrawal-form' && (
                  <div className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">1. Name of the Candidate in CAPITAL letters:</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">2. Register Number:</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">3. Programme of Study:</span>
                      <span className="col-span-8">B.E / B.Tech / M.E / M.Tech / MBA</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">4. Branch:</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">5. Period of Study:</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">6. Current Semester & Month & Year of Exam:</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">7. CGPA till last Semester:</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">8. History of Arrears (Yes/No):</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">9. Reason for Withdrawal (Proof to be attached):</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">10. Subject Details:</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-4 font-semibold">11. Mobile Number:</span>
                      <span className="col-span-8 border-b border-black h-6"></span>
                    </div>

                    <p className="mt-6 italic text-[11px]">
                      I hereby declare that the information furnished above is true. So far I have not applied for withdrawal of Examinations.
                    </p>

                    <div className="flex justify-between pt-8 text-xs font-semibold">
                      <span>Name & Signature of the Candidate</span>
                      <span>Signature of the Parent</span>
                    </div>

                    <div className="bg-gray-100 p-2 text-[10.5px] border border-gray-300 mt-4">
                      <strong>Note:</strong> Student having standing or history of Arrear is not eligible for withdrawal from examination.
                    </div>

                    <div className="pt-6 text-center font-bold text-xs">
                      Recommended and Forwarded
                    </div>

                    <div className="flex justify-between pt-8 text-xs">
                      <span>Tutor</span>
                      <span>Head of the Department</span>
                    </div>

                    <div className="text-center pt-8 border-t border-black mt-6 font-bold">
                      Approved / Not Approved
                      <div className="pt-6 font-normal">Principal</div>
                    </div>
                  </div>
                )}

                {/* 2. TRANSCRIPT FORM */}
                {selectedFormForPreview.id === 'transcript-form' && (
                  <div className="space-y-4 text-xs font-sans">
                    <table className="w-full border border-black border-collapse text-xs">
                      <tbody>
                        <tr className="border-b border-black">
                          <td className="p-2 w-1/4 border-r border-black font-semibold">1. Name :</td>
                          <td className="p-2 w-1/4 border-r border-black"></td>
                          <td className="p-2 w-1/4 border-r border-black font-semibold">Reg. No. :</td>
                          <td className="p-2 w-1/4"></td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-2 border-r border-black font-semibold">2. Branch of Study :</td>
                          <td className="p-2 border-r border-black"></td>
                          <td className="p-2 border-r border-black font-semibold">Year of Study :</td>
                          <td className="p-2"></td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-2 border-r border-black font-semibold">3. Address :</td>
                          <td colSpan={3} className="p-2 h-12"></td>
                        </tr>
                        <tr className="border-b border-black">
                          <td className="p-2 border-r border-black font-semibold">4. No of Transcripts required :</td>
                          <td className="p-2 border-r border-black"></td>
                          <td className="p-2 border-r border-black font-semibold">Contact No :</td>
                          <td className="p-2"></td>
                        </tr>
                        <tr>
                          <td colSpan={2} className="p-2 border-r border-black align-top">
                            <span className="font-semibold block mb-2">5. Payment Details :</span>
                            <div className="space-y-1 text-[11px]">
                              <div>Bank Challan No :</div>
                              <div>Date :</div>
                              <div>Amount Paid :</div>
                            </div>
                          </td>
                          <td colSpan={2} className="p-2 align-bottom text-right">
                            <div className="pt-8">Signature of the Candidate</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="pt-3">
                      <span className="font-bold text-xs block mb-1">Enclosures:</span>
                      <ol className="list-decimal pl-5 space-y-1 text-[11px]">
                        <li>Photocopy of the Consolidated Grade sheet / Semester grade sheets.</li>
                        <li>Bank Challan</li>
                      </ol>
                    </div>

                    <div className="border border-black p-4 mt-6">
                      <span className="font-bold uppercase text-[11px] block mb-6">For Office Use Only:</span>
                      <div className="flex justify-between text-xs pt-8">
                        <span>Signature of DCOE</span>
                        <span>Signature of COE</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. CONDONATION FORM */}
                {selectedFormForPreview.id === 'condonation-form' && (
                  <div className="space-y-4 text-xs font-sans">
                    <div className="text-right text-[11px] font-mono font-bold mb-2">[CONDONATION FORM]</div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>Year of Admission: <span className="border-b border-black inline-block w-24"></span></div>
                      <div>Month / Year: <span className="border-b border-black inline-block w-24"></span></div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border border-black p-2 my-2 text-center text-[11px]">
                      <div>B.E [ &nbsp; ]</div>
                      <div>B.TECH [ &nbsp; ]</div>
                      <div>M.TECH [ &nbsp; ]</div>
                      <div>MCA [ &nbsp; ]</div>
                      <div>MBA [ &nbsp; ]</div>
                      <div>M.E [ &nbsp; ]</div>
                    </div>

                    <table className="w-full border border-black border-collapse">
                      <tbody>
                        <tr className="border-b border-black"><td className="p-2 w-1/3 border-r border-black font-semibold">1. Name:</td><td className="p-2"></td></tr>
                        <tr className="border-b border-black"><td className="p-2 border-r border-black font-semibold">2. Register No:</td><td className="p-2"></td></tr>
                        <tr className="border-b border-black"><td className="p-2 border-r border-black font-semibold">3. Current Semester:</td><td className="p-2"></td></tr>
                        <tr className="border-b border-black"><td className="p-2 border-r border-black font-semibold">4. Branch:</td><td className="p-2"></td></tr>
                        <tr className="border-b border-black"><td className="p-2 border-r border-black font-semibold">5. Previous Condonations:</td><td className="p-2">Number of times: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Semester:</td></tr>
                        <tr><td className="p-2 border-r border-black font-semibold">6. Percentage of Attendance (%):</td><td className="p-2"></td></tr>
                      </tbody>
                    </table>

                    <div className="flex justify-between pt-6 text-xs">
                      <span>Date:</span>
                      <span>Signature of the Candidate</span>
                    </div>

                    <div className="border-t border-black pt-4 mt-4">
                      <span className="font-bold block mb-1">CERTIFICATE:</span>
                      <p className="text-[11px]">Certified that the above details of Attendance Furnished by the candidate have been verified and found CORRECT / INCORRECT</p>
                      
                      <div className="text-center font-bold my-4">RECOMMENDED / NOT RECOMMENDED</div>
                      
                      <div className="flex justify-between pt-4 text-xs">
                        <span>Signature of Faculty Advisor</span>
                        <span>Signature of Head of Department</span>
                      </div>

                      <div className="text-center pt-6 border-t border-black mt-4 font-bold">
                        CONDONED / NOT CONDONED
                        <div className="pt-4 font-normal">PRINCIPAL</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. PHD COURSE WORK FORM */}
                {selectedFormForPreview.id === 'phd-coursework-form' && (
                  <div className="space-y-4 text-xs font-sans">
                    <div className="text-center font-bold text-xs mb-2">
                      Ph.D PROGRAMME<br />COURSE WORK – REGISTRATION FORM
                    </div>

                    <div className="border border-black p-2 font-bold bg-gray-50">I. DETAILS OF THE SCHOLAR</div>
                    
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-8 space-y-2">
                        <div>1. Name of the Scholar: <span className="border-b border-black inline-block w-48"></span></div>
                        <div>2. Registration Number: <span className="border-b border-black inline-block w-48"></span></div>
                        <div>3. Department: <span className="border-b border-black inline-block w-48"></span></div>
                        <div>4. Category: Full time / Part time</div>
                        <div>5. Date of Birth: <span className="border-b border-black inline-block w-24"></span> &nbsp; Gender: Male / Female</div>
                        <div>6. Supervisor Name & Address: <span className="border-b border-black inline-block w-48"></span></div>
                      </div>
                      <div className="col-span-4 border border-black h-32 flex items-center justify-center text-center text-[10px] text-gray-500">
                        Paste recent Passport Size Photograph
                      </div>
                    </div>

                    <div className="border border-black p-2 font-bold bg-gray-50 mt-4">II. COURSE WORK REGISTERED IN THE CURRENT SEMESTER</div>

                    <table className="w-full border border-black border-collapse text-center text-[11px]">
                      <thead>
                        <tr className="bg-gray-100 border-b border-black">
                          <th className="p-1.5 border-r border-black w-10">Sl.No</th>
                          <th className="p-1.5 border-r border-black">Course Code</th>
                          <th className="p-1.5 border-r border-black">Course Title</th>
                          <th className="p-1.5 border-r border-black">Credits</th>
                          <th className="p-1.5 border-r border-black">Core / Elective</th>
                          <th className="p-1.5">Coordinator Signature</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black">
                        {[1, 2, 3, 4].map(n => (
                          <tr key={n} className="h-8">
                            <td className="border-r border-black">{n}</td>
                            <td className="border-r border-black"></td>
                            <td className="border-r border-black"></td>
                            <td className="border-r border-black"></td>
                            <td className="border-r border-black"></td>
                            <td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="flex justify-between pt-8 text-xs">
                      <span>Signature of Supervisor with seal</span>
                      <span>Signature of the Scholar</span>
                      <span>Signature of HOD with seal</span>
                    </div>

                    <div className="text-center pt-8 border-t border-black mt-6 font-bold">
                      Signature of the Principal
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default Exams;
