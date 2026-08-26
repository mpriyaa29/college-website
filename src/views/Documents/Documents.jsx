"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  FileText,
  FileCheck,
  Award,
  GraduationCap,
  Briefcase,
  CheckSquare,
  Receipt,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Upload,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Download,
  Building,
  RotateCcw,
  Check
} from 'lucide-react';
import {
  DOCUMENT_CATALOG,
  DEFAULT_STUDENT,
  INITIAL_REQUESTS
} from '../../data/documentsData';

// Map string icon names to Lucide icons
const iconMap = {
  FileCheck,
  Award,
  GraduationCap,
  FileText,
  Briefcase,
  CheckSquare,
  Receipt,
  ShieldCheck,
};

const CATEGORIES = ['All', 'Academic', 'Certificates', 'Recommendations', 'Administrative', 'Verification'];

const Documents = () => {
  const { scrollY } = useScroll();
  const [imgSrc, setImgSrc] = useState('/images/documents-header.jpg');

  const y = useTransform(scrollY, [0, 400], [0, 120]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.08]);
  const imageOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const textY = useTransform(scrollY, [0, 200], [0, -30]);

  // Catalog Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Requests state
  const [requestsList, setRequestsList] = useState(INITIAL_REQUESTS);
  const [requestStatusFilter, setRequestStatusFilter] = useState('All');
  const [requestSearchQuery, setRequestSearchQuery] = useState('');

  // Active Tracking Modal state
  const [trackingRequest, setTrackingRequest] = useState(null);

  // Application Wizard state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedDocForApply, setSelectedDocForApply] = useState(null);
  const [applyStep, setApplyStep] = useState(1); // 1: Info, 2: Form, 3: Review, 4: Success

  // Form inputs state
  const [formData, setFormData] = useState({
    name: DEFAULT_STUDENT.name,
    registerNumber: DEFAULT_STUDENT.registerNumber,
    department: DEFAULT_STUDENT.department,
    programme: DEFAULT_STUDENT.programme,
    yearSemester: DEFAULT_STUDENT.yearSemester,
    section: DEFAULT_STUDENT.section,
    email: DEFAULT_STUDENT.email,
    mobile: DEFAULT_STUDENT.mobile,
    purpose: '',
    otherPurpose: '',
    deliveryPreference: 'Digital + Hard Copy',
    specificDetails: {},
    attachedFiles: [],
    confirmedAccurate: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState(null);

  // Filter Catalog
  const filteredCatalog = useMemo(() => {
    return DOCUMENT_CATALOG.filter((doc) => {
      const matchesCategory =
        selectedCategoryFilter === 'All' || doc.category === selectedCategoryFilter;
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategoryFilter]);

  // Filter Requests
  const filteredRequests = useMemo(() => {
    return requestsList.filter((req) => {
      let matchesStatus = true;
      if (requestStatusFilter === 'Active') {
        matchesStatus = req.statusType === 'pending' || req.statusType === 'in_progress';
      } else if (requestStatusFilter === 'Pending') {
        matchesStatus = req.statusType === 'pending';
      } else if (requestStatusFilter === 'Approved') {
        matchesStatus = req.currentStatus === 'COMPLETED' || req.statusType === 'completed';
      } else if (requestStatusFilter === 'Rejected') {
        matchesStatus = req.statusType === 'rejected';
      } else if (requestStatusFilter === 'Completed') {
        matchesStatus = req.statusType === 'completed';
      }

      const matchesSearch =
        req.id.toLowerCase().includes(requestSearchQuery.toLowerCase()) ||
        req.documentName.toLowerCase().includes(requestSearchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [requestsList, requestStatusFilter, requestSearchQuery]);

  // Open Application Flow
  const handleStartApply = (doc) => {
    setSelectedDocForApply(doc);
    setApplyStep(1);
    setFormData({
      name: DEFAULT_STUDENT.name,
      registerNumber: DEFAULT_STUDENT.registerNumber,
      department: DEFAULT_STUDENT.department,
      programme: DEFAULT_STUDENT.programme,
      yearSemester: DEFAULT_STUDENT.yearSemester,
      section: DEFAULT_STUDENT.section,
      email: DEFAULT_STUDENT.email,
      mobile: DEFAULT_STUDENT.mobile,
      purpose: doc.purposeOptions[0] || '',
      otherPurpose: '',
      deliveryPreference: doc.hardCopyAvailable ? 'Digital + Hard Copy' : 'Digital E-Document Only',
      specificDetails: {},
      attachedFiles: [],
      confirmedAccurate: false,
    });
    setFormErrors({});
    setIsApplyModalOpen(true);
  };

  // Re-submit / Edit from rejected request
  const handleResubmitFromRejected = (rejectedReq) => {
    const doc = DOCUMENT_CATALOG.find((d) => d.id === rejectedReq.documentId) || DOCUMENT_CATALOG[0];
    setSelectedDocForApply(doc);
    setApplyStep(2); // Jump directly to form
    setFormData({
      name: DEFAULT_STUDENT.name,
      registerNumber: DEFAULT_STUDENT.registerNumber,
      department: DEFAULT_STUDENT.department,
      programme: DEFAULT_STUDENT.programme,
      yearSemester: DEFAULT_STUDENT.yearSemester,
      section: DEFAULT_STUDENT.section,
      email: DEFAULT_STUDENT.email,
      mobile: DEFAULT_STUDENT.mobile,
      purpose: rejectedReq.purpose || doc.purposeOptions[0] || '',
      otherPurpose: '',
      deliveryPreference: rejectedReq.deliveryPreference || 'Digital + Hard Copy',
      specificDetails: { ...rejectedReq.specificDetails },
      attachedFiles: [...(rejectedReq.attachedFiles || [])],
      confirmedAccurate: false,
    });
    setFormErrors({});
    setTrackingRequest(null);
    setIsApplyModalOpen(true);
  };

  // File Upload Handler (Simulated)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter(f => f.size <= 5 * 1024 * 1024); // max 5MB
    if (validFiles.length < files.length) {
      setFormErrors(prev => ({ ...prev, files: 'One or more files exceeded the 5MB size limit.' }));
    } else {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next.files;
        return next;
      });
    }

    const newNames = validFiles.map(f => f.name);
    setFormData(prev => ({
      ...prev,
      attachedFiles: [...prev.attachedFiles, ...newNames]
    }));
  };

  const handleRemoveFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachedFiles: prev.attachedFiles.filter((_, i) => i !== index)
    }));
  };

  // Step 2 Form Validation
  const validateFormStep = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Student Name is required.';
    if (!formData.registerNumber.trim()) errors.registerNumber = 'Register Number is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid college email is required.';
    if (!formData.mobile.trim() || formData.mobile.length < 10) errors.mobile = 'Valid 10-digit mobile number is required.';
    if (!formData.purpose) errors.purpose = 'Please select a purpose for your request.';
    if (formData.purpose === 'Other' && !formData.otherPurpose.trim()) {
      errors.otherPurpose = 'Please specify the exact purpose.';
    }

    // Validate specific fields
    if (selectedDocForApply?.specificFields) {
      selectedDocForApply.specificFields.forEach(field => {
        if (field.required && !formData.specificDetails[field.id]?.trim()) {
          errors[field.id] = `${field.label} is required.`;
        }
      });
    }

    // Validate required attachment if needed
    if (selectedDocForApply?.requiresAttachment && formData.attachedFiles.length === 0) {
      errors.files = 'Please attach the required supporting document.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToReview = () => {
    if (validateFormStep()) {
      setApplyStep(3);
    }
  };

  // Submit Request Flow
  const handleFinalSubmit = () => {
    if (!formData.confirmedAccurate) {
      setFormErrors({ confirm: 'Please check the confirmation box before submitting.' });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    setTimeout(() => {
      const randIdNum = Math.floor(100000 + Math.random() * 900000);
      const newId = `DOC-2026-${randIdNum}`;
      const now = new Date();
      const submissionDateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const timestampStr = `${submissionDateStr}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const isCoeFlow = selectedDocForApply.flowType === 'coe_exam';

      const timeline = isCoeFlow
        ? [
            {
              stage: '01 Request Submitted',
              description: 'Application successfully logged on student portal.',
              status: 'completed',
              timestamp: timestampStr,
              actor: `Student (${formData.name})`,
            },
            {
              stage: '02 Tutor Approval',
              description: 'Forwarded to Class Tutor for academic standing verification.',
              status: 'in_progress',
              timestamp: 'In Review',
              actor: DEFAULT_STUDENT.mentorName,
            },
            {
              stage: '03 HOD Approval',
              description: 'Awaiting Tutor clearance to forward to Controller of Examinations (COE).',
              status: 'not_reached',
              timestamp: 'Queued',
              actor: DEFAULT_STUDENT.hodName,
            },
            {
              stage: '04 COE Verification & Approval',
              description: 'Controller of Examinations (COE) grade audit, credit ledger & exam wing clearance.',
              status: 'not_reached',
              timestamp: 'Queued',
              actor: DEFAULT_STUDENT.coeName,
            },
            {
              stage: '05 Document Processing',
              description: 'Preparation of official COE certificate with security hologram & QR seal.',
              status: 'not_reached',
              timestamp: `Expected in ${selectedDocForApply.processingTime}`,
              actor: 'Autonomous Examination Section',
            },
            {
              stage: '06 E-Document Delivered',
              description: `Digitally signed official e-document will be sent to ${formData.email}.`,
              status: 'not_reached',
              timestamp: 'Pending',
              actor: 'COE Exam Portal Mailer',
            },
            {
              stage: '07 Hard Copy Ready',
              description: formData.deliveryPreference.includes('Hard Copy') 
                ? 'Sealed copy available for physical pickup at COE Dispatch Counter 02.' 
                : 'Not requested (Digital Only).',
              status: 'not_reached',
              timestamp: 'Pending',
              actor: 'COE Dispatch Counter 02',
            },
          ]
        : [
            {
              stage: '01 Request Submitted',
              description: 'Application successfully logged on portal.',
              status: 'completed',
              timestamp: timestampStr,
              actor: `Student (${formData.name})`,
            },
            {
              stage: '02 Tutor Approval',
              description: 'Forwarded to Class Tutor for verification.',
              status: 'in_progress',
              timestamp: 'In Review',
              actor: DEFAULT_STUDENT.mentorName,
            },
            {
              stage: '03 HOD Approval',
              description: 'Awaiting Tutor clearance.',
              status: 'not_reached',
              timestamp: 'Queued',
              actor: DEFAULT_STUDENT.hodName,
            },
            {
              stage: '04 Dean Approval',
              description: 'Dean Academic clearance queue.',
              status: 'not_reached',
              timestamp: 'Queued',
              actor: DEFAULT_STUDENT.deanName,
            },
            {
              stage: '05 Administrative Verification',
              description: 'Administration Office verification.',
              status: 'not_reached',
              timestamp: 'Queued',
              actor: 'Student Records Section',
            },
            {
              stage: '06 Document Processing',
              description: 'Preparation of digital certificate with QR seal.',
              status: 'not_reached',
              timestamp: `Expected in ${selectedDocForApply.processingTime}`,
              actor: 'SKCET Document Automation Core',
            },
            {
              stage: '07 E-Document Delivered',
              description: `Will be sent to ${formData.email}.`,
              status: 'not_reached',
              timestamp: 'Pending',
              actor: 'Institutional Mailer',
            },
            {
              stage: '08 Hard Copy Ready',
              description: formData.deliveryPreference.includes('Hard Copy') 
                ? 'Physical pickup at Counter 04 upon completion.' 
                : 'Not requested (Digital Only).',
              status: 'not_reached',
              timestamp: 'Pending',
              actor: 'Central Dispatch Desk',
            },
          ];

      const newRequestObject = {
        id: newId,
        documentId: selectedDocForApply.id,
        documentName: selectedDocForApply.name,
        code: selectedDocForApply.code || selectedDocForApply.name,
        flowType: selectedDocForApply.flowType,
        submissionDate: submissionDateStr,
        currentStatus: 'TUTOR_PENDING',
        statusLabel: 'Tutor Approval Pending',
        statusType: 'pending',
        deliveryPreference: formData.deliveryPreference,
        purpose: formData.purpose === 'Other' ? formData.otherPurpose : formData.purpose,
        specificDetails: { ...formData.specificDetails },
        attachedFiles: [...formData.attachedFiles],
        timeline: timeline,
      };

      setRequestsList(prev => [newRequestObject, ...prev]);
      setSubmittedRequestId(newId);
      setIsSubmitting(false);
      setApplyStep(4);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-0 pb-20 text-gray-800">

      {/* ── Dynamic Hero Header for Documents ── */}
      <div className="relative w-full h-[200px] sm:h-[240px] md:h-[270px] lg:h-[300px] overflow-hidden bg-skcet-dark flex items-center justify-center">
        <motion.div 
          style={{ y, scale, opacity: imageOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={imgSrc}
            alt="Documents Campus"
            className="w-full h-full object-cover"
            loading="eager"
            onError={() => {
              if (imgSrc !== '/images/hero-poster.webp') {
                setImgSrc('/images/hero-poster.webp');
              }
            }}
          />
          <div className="absolute inset-0 bg-skcet-navy/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-skcet-navy/30 via-skcet-navy/50 to-skcet-navy/80" />
        </motion.div>

        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center h-full pt-16 sm:pt-20 lg:pt-24"
        >
          <div className="flex items-center gap-2 text-[9px] sm:text-xs font-light uppercase tracking-[0.2em] text-skcet-gold/90 mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <span className="text-white font-normal">Documents</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight mb-3 drop-shadow-md">
            Document Services
          </h1>
          
          <div className="w-12 h-[1px] bg-skcet-gold/60 rounded-full mb-3 shadow-sm" />

          <p className="text-skcet-gold/90 font-light text-[10px] sm:text-xs flex items-center justify-center gap-2 flex-wrap tracking-wide drop-shadow-sm">
            <span>28+ Years of Excellence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-skcet-gold/40" />
            <span>NAAC A++ Grade</span>
            <span className="w-1.5 h-1.5 rounded-full bg-skcet-gold/40" />
            <span>NIRF Rank 100</span>
          </p>
        </motion.div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          1. PAGE INTRODUCTION
         ─────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-skcet-navy text-amber-400 flex items-center justify-center flex-shrink-0 shadow-xs">
              <FileCheck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-0.5">
                <ShieldCheck size={14} /> Student Records & Certification Cell
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-skcet-navy tracking-tight">
                Academic & Student Records
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
                Apply for official college documents digitally and track your request from submission to delivery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-gray-600 bg-white border border-gray-200 px-3.5 py-2 rounded-xl shadow-2xs self-start sm:self-auto">
            <Clock size={15} className="text-emerald-600" />
            <span>Avg. Turnaround: <strong>3–5 Working Days</strong></span>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          2. AVAILABLE DOCUMENTS CATALOG
         ─────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        
        {/* Header + Search + Category Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-skcet-navy">
              Available Documents
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select an official document to view requirements and initiate your digital application.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategoryFilter === cat
                  ? 'bg-skcet-navy text-amber-400 shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Document Cards Grid */}
        {filteredCatalog.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-2xs">
            <FileText size={32} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-sm font-bold text-gray-800">No documents found</h3>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your search query or category filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryFilter('All');
              }}
              className="mt-4 text-xs font-semibold text-amber-700 hover:text-amber-800 underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCatalog.map((doc) => {
              const Icon = iconMap[doc.icon] || FileText;
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all duration-200 group shadow-2xs"
                >
                  <div>
                    {/* Top Row: Icon + Document Code + Category Badge */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-10 h-10 rounded-xl bg-skcet-navy/5 text-skcet-navy group-hover:bg-skcet-navy group-hover:text-amber-400 flex items-center justify-center transition-colors">
                        <Icon size={20} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                          {doc.code || doc.name}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wider">
                          {doc.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-bold text-gray-900 text-base mb-1.5 leading-snug group-hover:text-skcet-navy transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3.5">
                      {doc.description}
                    </p>

                    {/* Metadata & Approval Flow indicators */}
                    <div className="space-y-2 text-[11px] text-gray-600 border-t border-gray-100 pt-3 mb-5">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Approval Flow:</span>
                        <span className={`font-semibold px-2 py-0.5 rounded text-[10.5px] ${
                          doc.flowType === 'coe_exam'
                            ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {doc.flowSummary}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Processing:</span>
                        <span className="font-medium text-gray-800">{doc.processingTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Available:</span>
                        <span className="font-medium text-gray-800">{doc.delivery}</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Action */}
                  <button
                    type="button"
                    onClick={() => handleStartApply(doc)}
                    className="w-full bg-skcet-navy hover:bg-[#121c33] text-white font-semibold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer group-hover:bg-skcet-navy"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={14} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          4. MY REQUESTS & TRACKING TABLE
         ─────────────────────────────────────────────────────────────────────── */}
      <div id="my-requests-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-skcet-navy">
                  My Document Requests
                </h3>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  {filteredRequests.length} Record(s)
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Real-time tracking of your digital applications through Tutor, HOD, Dean, and Admin approvals.
              </p>
            </div>

            {/* Request Status Filter Tabs & Search */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Active', 'Pending', 'Approved', 'Rejected'].map((statusTab) => (
                <button
                  key={statusTab}
                  type="button"
                  onClick={() => setRequestStatusFilter(statusTab)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    requestStatusFilter === statusTab
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {statusTab}
                </button>
              ))}
            </div>
          </div>

          {/* Search within requests */}
          <div className="mb-5 max-w-sm">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={requestSearchQuery}
                onChange={(e) => setRequestSearchQuery(e.target.value)}
                placeholder="Search by Request ID or Document..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
          </div>

          {/* Requests Table */}
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg">
              <FileText size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-xs text-gray-500 font-medium">No document requests match the selected criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setRequestStatusFilter('All');
                  setRequestSearchQuery('');
                }}
                className="mt-3 text-xs text-amber-700 font-semibold underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 uppercase text-[10px]">
                    <th className="py-3 px-3 font-semibold">Request ID</th>
                    <th className="py-3 px-3 font-semibold">Document Name</th>
                    <th className="py-3 px-3 font-semibold">Submitted Date</th>
                    <th className="py-3 px-3 font-semibold">Delivery Format</th>
                    <th className="py-3 px-3 font-semibold text-center">Current Status</th>
                    <th className="py-3 px-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredRequests.map((req) => {
                    const isRejected = req.statusType === 'rejected';
                    const isCompleted = req.statusType === 'completed' || req.currentStatus === 'COMPLETED';

                    return (
                      <tr key={req.id} className="hover:bg-gray-50/70 transition-colors">
                        {/* Request ID */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span className="font-mono font-bold text-skcet-navy">
                            {req.id}
                          </span>
                        </td>

                        {/* Document Name */}
                        <td className="py-3.5 px-3 text-gray-900 font-semibold max-w-xs">
                          {req.documentName}
                          <span className="block text-[11px] font-normal text-gray-400">{req.purpose}</span>
                        </td>

                        {/* Submitted Date */}
                        <td className="py-3.5 px-3 text-gray-600 whitespace-nowrap">
                          {req.submissionDate}
                        </td>

                        {/* Delivery */}
                        <td className="py-3.5 px-3 text-gray-600 whitespace-nowrap text-[11px]">
                          {req.deliveryPreference}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 text-[10.5px] uppercase font-bold px-2.5 py-1 rounded-full ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800'
                                : isRejected
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {isCompleted && <CheckCircle2 size={12} />}
                            {isRejected && <XCircle size={12} />}
                            {!isCompleted && !isRejected && <Clock size={12} />}
                            <span>{req.statusLabel}</span>
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setTrackingRequest(req)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-skcet-navy hover:bg-[#121c33] text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                            >
                              <span>Track Request</span>
                              <ArrowRight size={12} className="text-amber-400" />
                            </button>

                            {isCompleted && (
                              <button
                                type="button"
                                onClick={() => alert(`Downloading Official E-Document: ${req.documentName} (${req.id}.pdf)`)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors cursor-pointer"
                                title="Download E-Document PDF"
                              >
                                <Download size={13} /> Download
                              </button>
                            )}

                            {isRejected && (
                              <button
                                type="button"
                                onClick={() => handleResubmitFromRejected(req)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-rose-300 bg-rose-50 text-rose-800 hover:bg-rose-100 text-xs font-semibold transition-colors cursor-pointer"
                                title="Resubmit with corrections"
                              >
                                <RotateCcw size={12} /> Resubmit
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          5. AMAZON-STYLE VERTICAL TRACKING TIMELINE MODAL
         ─────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {trackingRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="bg-skcet-navy text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
                    <FileCheck size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm sm:text-base">Document Tracking Lifecycle</h3>
                      <span className="text-[11px] font-mono px-2 py-0.2 rounded bg-white/10 text-amber-300">
                        {trackingRequest.id}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300">{trackingRequest.documentName}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTrackingRequest(null)}
                  className="text-gray-400 hover:text-white text-xs px-2 py-1 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Scrollable Tracking Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Summary Info Header Box */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400 uppercase text-[10px] block">Student</span>
                    <span className="font-semibold text-gray-900">{DEFAULT_STUDENT.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase text-[10px] block">Register No</span>
                    <span className="font-mono font-semibold text-gray-900">{DEFAULT_STUDENT.registerNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase text-[10px] block">Submission Date</span>
                    <span className="text-gray-800">{trackingRequest.submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase text-[10px] block">Delivery Format</span>
                    <span className="font-medium text-gray-800">{trackingRequest.deliveryPreference}</span>
                  </div>
                </div>

                {/* Rejection Alert Banner (if rejected) */}
                {trackingRequest.statusType === 'rejected' && (
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex items-start gap-3">
                    <XCircle size={18} className="text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                        Application Rejected at {trackingRequest.rejectionStage || 'Approval Stage'}
                      </h4>
                      <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                        <strong>Reason:</strong> {trackingRequest.rejectionReason}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleResubmitFromRejected(trackingRequest)}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        <RotateCcw size={13} /> Edit & Resubmit Application
                      </button>
                    </div>
                  </div>
                )}

                {/* Ready / Completed Banner (if completed) */}
                {(trackingRequest.currentStatus === 'COMPLETED' || trackingRequest.statusType === 'completed') && (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                          Official Document Ready & Issued
                        </h4>
                        <p className="text-xs text-emerald-700 mt-0.5">
                          Digital copy dispatched to <strong>{DEFAULT_STUDENT.email}</strong>.
                        </p>
                        {trackingRequest.hardCopyInstructions && (
                          <p className="text-[11px] text-emerald-800 mt-2 bg-emerald-100/60 p-2 rounded border border-emerald-200">
                            <strong>Hard Copy:</strong> {trackingRequest.hardCopyInstructions}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Downloading Official E-Document: ${trackingRequest.documentName} (${trackingRequest.id}.pdf)`)}
                      className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 flex-shrink-0 shadow-2xs cursor-pointer"
                    >
                      <Download size={14} /> Download E-Doc
                    </button>
                  </div>
                )}

                {/* ── Vertical Amazon-Style Tracking Timeline ── */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Approval & Verification Chain
                  </h4>

                  <div className="relative pl-6 space-y-6">
                    {/* Continuous Vertical Line */}
                    <div className="absolute left-2.5 top-2 bottom-4 w-0.5 bg-gray-200" />

                    {trackingRequest.timeline.map((step, index) => {
                      const isDone = step.status === 'completed';
                      const isCurrent = step.status === 'in_progress';
                      const isRejectedStage = step.status === 'rejected';
                      const isNotReached = step.status === 'not_reached';

                      return (
                        <div key={index} className="relative flex items-start gap-3.5 group">
                          {/* Dot / Icon */}
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all ${
                              isDone
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : isRejectedStage
                                ? 'bg-rose-600 text-white ring-4 ring-rose-100'
                                : isCurrent
                                ? 'bg-skcet-navy text-amber-400 ring-4 ring-amber-100 animate-pulse'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {isDone && <Check size={11} strokeWidth={3} />}
                            {isRejectedStage && <XCircle size={13} />}
                            {isCurrent && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                            {isNotReached && <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />}
                          </div>

                          {/* Details Content */}
                          <div className={`flex-1 ${isNotReached ? 'opacity-40' : ''}`}>
                            <div className="flex items-center justify-between gap-2">
                              <h5 className={`font-bold text-xs ${isRejectedStage ? 'text-rose-700' : isCurrent ? 'text-skcet-navy' : isDone ? 'text-gray-900' : 'text-gray-600'}`}>
                                {step.stage}
                              </h5>
                              <span className="text-[10px] text-gray-400 font-mono whitespace-nowrap">
                                {step.timestamp}
                              </span>
                            </div>

                            <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                              {step.description}
                            </p>

                            {step.actor && (
                              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
                                <Building size={12} className="text-gray-400" />
                                <span>{step.actor}</span>
                              </div>
                            )}

                            {step.reason && (
                              <div className="mt-2 bg-rose-50 text-rose-800 p-2.5 rounded text-xs border border-rose-200">
                                <strong>Remark:</strong> {step.reason}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-3.5 flex justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setTrackingRequest(null)}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Close Tracking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────────────────
          6. DYNAMIC APPLICATION WIZARD MODAL (Multi-Step Form)
         ─────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isApplyModalOpen && selectedDocForApply && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col"
            >
              {/* Wizard Top Header */}
              <div className="bg-skcet-navy text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                      Step {applyStep} of 4
                    </span>
                    <h3 className="font-semibold text-sm sm:text-base">
                      {selectedDocForApply.name} Application
                    </h3>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-0.5">
                    {applyStep === 1 && 'Document Information & Requirements'}
                    {applyStep === 2 && 'Enter Application Details'}
                    {applyStep === 3 && 'Review Application Before Submission'}
                    {applyStep === 4 && 'Request Submitted Successfully'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="text-gray-400 hover:text-white text-xs px-2 py-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Progress Steps Header Bar */}
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-2.5 flex items-center justify-between text-[11px] font-semibold text-gray-500 flex-shrink-0">
                <span className={applyStep >= 1 ? 'text-skcet-navy font-bold' : ''}>01 Requirements</span>
                <span className="text-gray-300">›</span>
                <span className={applyStep >= 2 ? 'text-skcet-navy font-bold' : ''}>02 Fill Details</span>
                <span className="text-gray-300">›</span>
                <span className={applyStep >= 3 ? 'text-skcet-navy font-bold' : ''}>03 Review</span>
                <span className="text-gray-300">›</span>
                <span className={applyStep >= 4 ? 'text-emerald-700 font-bold' : ''}>04 Submit</span>
              </div>

              {/* Wizard Body Content */}
              <div className="p-6 overflow-y-auto flex-1">
                
                {/* ── STEP 1: DOCUMENT INFO & REQUIREMENTS ── */}
                {applyStep === 1 && (
                  <div className="space-y-5">
                    <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">
                        Purpose & Overview
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {selectedDocForApply.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Estimated Turnaround</span>
                        <span className="font-bold text-gray-900">{selectedDocForApply.processingTime}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Delivery Channels</span>
                        <span className="font-bold text-gray-900">{selectedDocForApply.delivery}</span>
                      </div>
                    </div>

                    {/* Approval Chain Notice */}
                    <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                      selectedDocForApply.flowType === 'coe_exam'
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}>
                      <div>
                        <span className="text-[10px] uppercase font-bold block text-gray-500">Official Approval Route</span>
                        <span className="font-bold">{selectedDocForApply.flowSummary}</span>
                      </div>
                      {selectedDocForApply.flowType === 'coe_exam' && (
                        <span className="text-[10.5px] font-bold px-2 py-0.5 rounded bg-amber-200/80 text-amber-950">
                          Autonomous COE Wing
                        </span>
                      )}
                    </div>

                    {/* Requirements Checklist */}
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                        Required Information Checklist
                      </h5>
                      <ul className="space-y-2 text-xs text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                          <span>Student academic identity (Register No., Department, Semester)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                          <span>Specific purpose of document request (Internship, Loan, Visa, etc.)</span>
                        </li>
                        {selectedDocForApply.requiresAttachment && (
                          <li className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                            <span>Supporting proof document: <strong>{selectedDocForApply.attachmentPrompt || 'PDF/JPG File'}</strong></span>
                          </li>
                        )}
                        <li className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                          <span>Active college email address for digital delivery</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setIsApplyModalOpen(false)}
                        className="text-xs text-gray-500 hover:text-gray-700 font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => setApplyStep(2)}
                        className="bg-skcet-navy hover:bg-[#121c33] text-white font-semibold text-xs px-6 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <span>Continue Application</span>
                        <ArrowRight size={14} className="text-amber-400" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: DYNAMIC FORM ── */}
                {applyStep === 2 && (
                  <form className="space-y-4">
                    
                    {/* Pre-filled Student Details (Read-only / Context) */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Student Profile (Pre-filled)</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">Verified Student</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-800">
                        <div>
                          <span className="text-gray-400 block text-[10px]">Name</span>
                          <strong>{formData.name}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Register No.</span>
                          <strong className="font-mono">{formData.registerNumber}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Department</span>
                          <span>{formData.department}</span>
                        </div>
                      </div>
                    </div>

                    {/* Purpose Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Purpose of Request <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      >
                        <option value="">Select Purpose...</option>
                        {selectedDocForApply.purposeOptions.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      {formErrors.purpose && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {formErrors.purpose}
                        </p>
                      )}
                    </div>

                    {/* If "Other" purpose is selected */}
                    {formData.purpose === 'Other' && (
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Specify Exact Purpose <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.otherPurpose}
                          onChange={(e) => setFormData(prev => ({ ...prev, otherPurpose: e.target.value }))}
                          placeholder="Please provide explicit reason for requesting this document"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                        />
                        {formErrors.otherPurpose && (
                          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {formErrors.otherPurpose}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Document-Specific Dynamic Context Fields */}
                    {selectedDocForApply.specificFields.map((field) => (
                      <div key={field.id}>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === 'select' ? (
                          <select
                            value={formData.specificDetails[field.id] || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              specificDetails: { ...prev.specificDetails, [field.id]: e.target.value }
                            }))}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                          >
                            <option value="">Select option...</option>
                            {field.options?.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            value={formData.specificDetails[field.id] || ''}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              specificDetails: { ...prev.specificDetails, [field.id]: e.target.value }
                            }))}
                            placeholder={field.placeholder || ''}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                          />
                        )}
                        {formErrors[field.id] && (
                          <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {formErrors[field.id]}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* Delivery Preference */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Delivery Preference <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <label className={`p-3 rounded-lg border flex items-center gap-2.5 cursor-pointer text-xs transition-all ${
                          formData.deliveryPreference === 'Digital E-Document Only'
                            ? 'border-amber-500 bg-amber-50/50 font-bold'
                            : 'border-gray-200 bg-white'
                        }`}>
                          <input
                            type="radio"
                            name="deliveryPreference"
                            value="Digital E-Document Only"
                            checked={formData.deliveryPreference === 'Digital E-Document Only'}
                            onChange={(e) => setFormData(prev => ({ ...prev, deliveryPreference: e.target.value }))}
                            className="text-amber-600"
                          />
                          <div>
                            <span>Digital E-Document Only</span>
                            <span className="block text-[10px] font-normal text-gray-500">Sent to student email</span>
                          </div>
                        </label>

                        {selectedDocForApply.hardCopyAvailable && (
                          <label className={`p-3 rounded-lg border flex items-center gap-2.5 cursor-pointer text-xs transition-all ${
                            formData.deliveryPreference === 'Digital + Hard Copy'
                              ? 'border-amber-500 bg-amber-50/50 font-bold'
                              : 'border-gray-200 bg-white'
                          }`}>
                            <input
                              type="radio"
                              name="deliveryPreference"
                              value="Digital + Hard Copy"
                              checked={formData.deliveryPreference === 'Digital + Hard Copy'}
                              onChange={(e) => setFormData(prev => ({ ...prev, deliveryPreference: e.target.value }))}
                              className="text-amber-600"
                            />
                            <div>
                              <span>Digital + Hard Copy</span>
                              <span className="block text-[10px] font-normal text-gray-500">Pickup at Counter 04</span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Supporting Document Upload Component */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Supporting Documents {selectedDocForApply.requiresAttachment ? <span className="text-red-500">*</span> : <span className="text-gray-400 font-normal">(Optional)</span>}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-amber-400 transition-colors bg-gray-50/50">
                        <Upload size={20} className="mx-auto text-gray-400 mb-1.5" />
                        <label className="text-xs font-semibold text-skcet-navy hover:underline cursor-pointer">
                          <span>Click to Upload File</span>
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[10.5px] text-gray-400 mt-0.5">
                          PDF, JPG, PNG (Max 5MB per file)
                        </p>
                      </div>

                      {/* Attached File List */}
                      {formData.attachedFiles.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          {formData.attachedFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md text-xs">
                              <span className="text-gray-800 font-medium truncate max-w-xs">{file}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(idx)}
                                className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                                title="Remove file"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {formErrors.files && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {formErrors.files}
                        </p>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setApplyStep(1)}
                        className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <ArrowLeft size={13} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={handleProceedToReview}
                        className="bg-skcet-navy hover:bg-[#121c33] text-white font-semibold text-xs px-6 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <span>Review Application</span>
                        <ArrowRight size={14} className="text-amber-400" />
                      </button>
                    </div>
                  </form>
                )}

                {/* ── STEP 3: REVIEW SCREEN ── */}
                {applyStep === 3 && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 divide-y divide-gray-200 text-xs">
                      <div className="pb-3 flex justify-between items-center">
                        <span className="text-gray-500 uppercase text-[10px] font-bold">Document Requested</span>
                        <strong className="text-skcet-navy text-sm">{selectedDocForApply.name}</strong>
                      </div>
                      
                      <div className="py-3 grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-400 block text-[10px]">Student Name</span>
                          <strong>{formData.name}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Register No.</span>
                          <strong className="font-mono">{formData.registerNumber}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Department</span>
                          <span>{formData.department}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">Email For E-Doc</span>
                          <span>{formData.email}</span>
                        </div>
                      </div>

                      <div className="py-3">
                        <span className="text-gray-400 block text-[10px]">Purpose</span>
                        <strong className="text-gray-800">
                          {formData.purpose === 'Other' ? formData.otherPurpose : formData.purpose}
                        </strong>
                      </div>

                      {Object.keys(formData.specificDetails).length > 0 && (
                        <div className="py-3 space-y-1.5">
                          <span className="text-gray-400 block text-[10px]">Specific Information</span>
                          {Object.entries(formData.specificDetails).map(([k, v]) => (
                            <div key={k} className="flex justify-between">
                              <span className="text-gray-500">{k}:</span>
                              <span className="font-medium text-gray-800">{v}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-3 flex justify-between">
                        <span className="text-gray-400 text-[10px]">Delivery Preference</span>
                        <span className="font-bold text-gray-900">{formData.deliveryPreference}</span>
                      </div>
                    </div>

                    {/* Confirmation Checkbox */}
                    <div className="bg-amber-50/40 border border-amber-200 rounded-lg p-3.5">
                      <label className="flex items-start gap-2.5 text-xs text-gray-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.confirmedAccurate}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, confirmedAccurate: e.target.checked }));
                            setFormErrors({});
                          }}
                          className="mt-0.5 text-skcet-navy rounded"
                        />
                        <span>
                          I confirm that all information and attached proofs provided are authentic and accurate. I understand that the application will proceed through the institutional approval chain.
                        </span>
                      </label>
                      {formErrors.confirm && (
                        <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1 font-semibold">
                          <AlertCircle size={12} /> {formErrors.confirm}
                        </p>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setApplyStep(2)}
                        className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <ArrowLeft size={13} /> Edit Details
                      </button>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleFinalSubmit}
                        className="bg-skcet-navy hover:bg-[#121c33] text-white font-semibold text-xs px-7 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Request</span>
                            <Check size={14} className="text-amber-400" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: SUCCESS CONFIRMATION ── */}
                {applyStep === 4 && (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 size={32} />
                    </div>

                    <div>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                        Request Submitted Successfully!
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                        Your document request has been received and routed to your Class Tutor for primary review.
                      </p>
                    </div>

                    {/* Generated Request ID Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-w-md mx-auto text-xs text-left space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-400">Request ID:</span>
                        <span className="font-mono font-bold text-skcet-navy text-sm">{submittedRequestId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Document:</span>
                        <span className="font-bold text-gray-900">{selectedDocForApply.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expected Turnaround:</span>
                        <span className="font-medium text-gray-800">{selectedDocForApply.processingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Delivery:</span>
                        <span className="font-medium text-gray-800">{formData.deliveryPreference}</span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsApplyModalOpen(false);
                          const req = requestsList.find(r => r.id === submittedRequestId);
                          if (req) setTrackingRequest(req);
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-skcet-navy text-white text-xs font-semibold hover:bg-[#121c33] transition-colors cursor-pointer shadow-xs"
                      >
                        Track Request
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsApplyModalOpen(false)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        View My Requests
                      </button>
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

export default Documents;
