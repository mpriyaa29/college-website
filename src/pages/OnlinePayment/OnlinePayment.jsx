import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  User,
  Calendar,
  Receipt,
  Printer,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Mail,
  ShieldCheck,
  RotateCcw,
  FileCheck
} from 'lucide-react';
import {
  FEE_CATEGORIES,
  SAMPLE_STUDENTS,
  PAYMENT_METHODS,
} from '../../data/paymentData';

// ─── Helper: Number to Words (Indian Currency Format) ─────────────────────────
const numberToWords = (num) => {
  if (!num || isNaN(num) || num <= 0) return 'Rupees Zero Only';

  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? '-' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + inWords(n % 100) : '');
    if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + inWords(n % 1000) : '');
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + inWords(n % 100000) : '');
    return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + inWords(n % 10000000) : '');
  };

  const words = inWords(Math.floor(num)).trim();
  return `Rupees ${words} Only`;
};

// ─── Helper: Format Date like 21-Aug-2026 ─────────────────────────────────────
const formatReceiptDate = (d = new Date()) => {
  const dateObj = typeof d === 'string' ? new Date(d) : d;
  const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj;
  const day = String(validDate.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[validDate.getMonth()];
  const year = validDate.getFullYear();
  return `${day}-${month}-${year}`;
};

const OnlinePayment = () => {
  // Navigation & Category state
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Verification input state
  const [regNo, setRegNo] = useState('');
  const [dob, setDob] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [verifiedStudent, setVerifiedStudent] = useState(null);

  // Fee selection & Part-Payment state
  const [activeFeeItem, setActiveFeeItem] = useState(null);
  const [isPartPayment, setIsPartPayment] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [partError, setPartError] = useState('');

  // Payment Checkout & Modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [paymentStep, setPaymentStep] = useState('select'); // 'select' | 'processing' | 'receipt'
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [emailNotification, setEmailNotification] = useState(null);

  // Handle clicking on a fee type
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setAuthError('');
    if (!verifiedStudent) {
      // Prompt verification for this category
      setRegNo('');
      setDob('');
    } else {
      // Find fee under this category
      const fee = verifiedStudent.allocatedFees.find(f => f.category === cat.id);
      if (fee) {
        setActiveFeeItem(fee);
        setIsPartPayment(false);
        setCustomAmount('');
      } else {
        const fallbackFee = {
          id: `FE-${cat.id}`,
          category: cat.id,
          title: cat.title,
          totalAmount: 35000,
          paidAmount: 0,
          pendingAmount: 35000,
          minPartPayment: 10000,
          dueDate: '25 Mar 2026',
          status: 'pending',
        };
        setActiveFeeItem(fallbackFee);
        setIsPartPayment(false);
        setCustomAmount('');
      }
    }
  };

  // Quick Demo Auto-fill
  const handleQuickFill = (roll) => {
    const s = SAMPLE_STUDENTS[roll];
    if (s) {
      setRegNo(s.rollNo);
      setDob(s.dob);
      setAuthError('');
    }
  };

  // Verify Student with RegNo & DOB
  const handleVerifyStudent = (e) => {
    if (e) e.preventDefault();
    const cleanReg = regNo.trim().toUpperCase();
    const cleanDob = dob.trim();

    if (!cleanReg) {
      setAuthError('Please enter your Register Number.');
      return;
    }
    if (!cleanDob) {
      setAuthError('Please select or enter your Date of Birth (DOB).');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    setTimeout(() => {
      setAuthLoading(false);
      const student = SAMPLE_STUDENTS[cleanReg];

      if (student) {
        if (student.dob === cleanDob || !student.dob) {
          setVerifiedStudent({ ...student });
          // Find fee under current selected category
          const fee = student.allocatedFees.find(f => f.category === selectedCategory?.id);
          setActiveFeeItem(fee || {
            id: `FE-${selectedCategory?.id || 'GEN'}`,
            category: selectedCategory?.id || 'general',
            title: selectedCategory?.title || 'Fee Allocation',
            totalAmount: 40000,
            paidAmount: 0,
            pendingAmount: 40000,
            minPartPayment: 10000,
            dueDate: '25 Mar 2026',
            status: 'pending',
          });
          setIsPartPayment(false);
          setCustomAmount('');
        } else {
          setAuthError('Invalid Date of Birth for the entered Register Number.');
        }
      } else {
        // Dynamic fallback verification
        const dynamicStudent = {
          rollNo: cleanReg,
          dob: cleanDob,
          name: `Scholar (${cleanReg})`,
          department: 'B.E. Engineering & Technology',
          year: 'Current Academic Term',
          quota: 'Institutional Quota',
          email: `${cleanReg.toLowerCase()}@skcet.ac.in`,
          phone: '+91 98XXX XXXXX',
          fatherName: 'Guardian',
          allocatedFees: [
            {
              id: `FE-${selectedCategory?.id.toUpperCase() || 'COL'}-D1`,
              category: selectedCategory?.id || 'college-higher-exam-1st',
              title: selectedCategory?.title || 'Academic Fee Allocation',
              totalAmount: 45000,
              paidAmount: 15000,
              pendingAmount: 30000,
              minPartPayment: 10000,
              dueDate: '25 Mar 2026',
              status: 'partial',
            },
          ],
          history: [
            {
              id: 'TXN-SKCET-20260821-00124',
              receiptNo: 'SKCET/FEES/2026/00124',
              date: '21-Aug-2026',
              paymentMode: 'Online / UPI',
              category: selectedCategory?.id || 'college-higher-exam-1st',
              feeHead: 'Tuition Fee',
              feeTitle: `${selectedCategory?.title || 'Academic Term'} (Initial Installment)`,
              description: 'Semester / Academic Tuition',
              amountPaid: 15000,
              status: 'Success',
              balanceRemaining: 30000,
            }
          ],
        };
        setVerifiedStudent(dynamicStudent);
        setActiveFeeItem(dynamicStudent.allocatedFees[0]);
        setIsPartPayment(false);
        setCustomAmount('');
      }
    }, 600);
  };

  // Calculate payment amounts
  const payableNow = isPartPayment 
    ? (parseFloat(customAmount) || 0)
    : (activeFeeItem?.pendingAmount || 0);

  const remainingAfterPayment = activeFeeItem 
    ? Math.max(0, activeFeeItem.pendingAmount - payableNow)
    : 0;

  // Validate and open payment checkout
  const handleProceedToPayment = () => {
    setPartError('');
    if (!activeFeeItem || activeFeeItem.pendingAmount <= 0) {
      setPartError('There are no pending dues for this fee category.');
      return;
    }

    if (isPartPayment) {
      const amt = parseFloat(customAmount);
      if (!amt || isNaN(amt) || amt <= 0) {
        setPartError('Please enter a valid part payment amount.');
        return;
      }
      if (amt < activeFeeItem.minPartPayment) {
        setPartError(`Minimum part payment allowed is ₹${activeFeeItem.minPartPayment.toLocaleString('en-IN')}.`);
        return;
      }
      if (amt > activeFeeItem.pendingAmount) {
        setPartError(`Part payment cannot exceed pending due of ₹${activeFeeItem.pendingAmount.toLocaleString('en-IN')}.`);
        return;
      }
    }

    setIsCheckoutOpen(true);
    setPaymentStep('select');
  };

  // Simulate Payment Execution & Receipt + Email Dispatch
  const handleExecutePayment = () => {
    setPaymentStep('processing');

    setTimeout(() => {
      const randNum = String(Math.floor(1000 + Math.random() * 9000)).padStart(5, '0');
      const dateFormatted = formatReceiptDate(new Date());
      const dateKey = dateFormatted.replace(/-/g, '');
      const transactionId = `TXN-SKCET-${dateKey}-${randNum}`;
      const receiptNo = `SKCET/FEES/2026/${randNum}`;
      const chosenMethodObj = PAYMENT_METHODS.find(m => m.id === selectedMethod);
      const modeString = chosenMethodObj?.name?.split('(')[0]?.trim() || 'Online / UPI';

      // Determine Fee Head & Description
      let feeHead = 'Tuition Fee';
      let feeDescription = 'Semester / Academic Tuition';

      if (selectedCategory?.id?.includes('hostel')) {
        feeHead = 'Hostel Fee';
        feeDescription = 'Boarding & Room Amenities';
      } else if (selectedCategory?.id?.includes('mess')) {
        feeHead = 'Mess Fee';
        feeDescription = 'Food & Dining Advance';
      } else if (selectedCategory?.id?.includes('transport')) {
        feeHead = 'Transport Fee';
        feeDescription = 'College Bus Pass Route Fee';
      } else if (selectedCategory?.id?.includes('special')) {
        feeHead = 'Special Course Fee';
        feeDescription = 'Certification / Value-Added Course';
      } else if (selectedCategory?.id?.includes('exam')) {
        feeHead = 'Examination Fee';
        feeDescription = 'Autonomous Semester Examination';
      }

      const newReceipt = {
        receiptNo,
        transactionId,
        paymentDate: dateFormatted,
        paymentMode: modeString,
        student: { ...verifiedStudent },
        items: [
          {
            head: feeHead,
            description: isPartPayment ? `${feeDescription} (Part Payment)` : feeDescription,
            amount: payableNow,
            status: 'PAID',
          }
        ],
        totalAmount: payableNow,
        amountInWords: numberToWords(payableNow),
        verificationId: `SKCET-TXN-${randNum}`,
        balanceRemaining: remainingAfterPayment,
      };

      // Add to student's history
      const newHistoryEntry = {
        id: transactionId,
        receiptNo,
        date: dateFormatted,
        paymentDate: dateFormatted,
        category: activeFeeItem.category,
        feeHead: feeHead,
        feeTitle: `${activeFeeItem.title} ${isPartPayment ? '(Part Payment)' : '(Full Settlement)'}`,
        description: feeDescription,
        amountPaid: payableNow,
        totalAmount: payableNow,
        paymentMode: modeString,
        status: 'Success',
        balanceRemaining: remainingAfterPayment,
        student: { ...verifiedStudent },
        items: [
          {
            head: feeHead,
            description: isPartPayment ? `${feeDescription} (Part Payment)` : feeDescription,
            amount: payableNow,
            status: 'PAID',
          }
        ],
        amountInWords: numberToWords(payableNow),
        verificationId: `SKCET-TXN-${randNum}`,
      };

      // Update student allocated fee
      const updatedAllocated = verifiedStudent.allocatedFees.map(fee => {
        if (fee.id === activeFeeItem.id) {
          const newPaid = fee.paidAmount + payableNow;
          const newPending = Math.max(0, fee.totalAmount - newPaid);
          return {
            ...fee,
            paidAmount: newPaid,
            pendingAmount: newPending,
            status: newPending === 0 ? 'paid' : 'partial',
          };
        }
        return fee;
      });

      const updatedStudent = {
        ...verifiedStudent,
        allocatedFees: updatedAllocated,
        history: [newHistoryEntry, ...verifiedStudent.history],
      };

      setVerifiedStudent(updatedStudent);
      setActiveFeeItem(updatedAllocated.find(f => f.id === activeFeeItem.id));
      setActiveReceipt(newReceipt);
      setPaymentStep('receipt');

      // Dispatch confirmation email notice
      setEmailNotification({
        email: verifiedStudent.email,
        receiptNo: receiptNo,
        amount: payableNow,
      });

      // Clear part payment input
      setIsPartPayment(false);
      setCustomAmount('');
    }, 1800);
  };

  // Helper to open past receipt from history
  const handleViewHistoricalReceipt = (record) => {
    const feeHead = record.feeHead || (record.category?.includes('hostel') ? 'Hostel Fee' : record.category?.includes('transport') ? 'Transport Fee' : 'Tuition Fee');
    const feeDesc = record.description || record.feeTitle || 'Academic & Institutional Dues';
    const amount = record.amountPaid || record.totalAmount || 0;
    const randId = record.id?.split('-').pop() || '00124';

    const formattedReceipt = {
      receiptNo: record.receiptNo || `SKCET/FEES/2026/${randId}`,
      transactionId: record.id || `TXN-SKCET-20260821-${randId}`,
      paymentDate: record.paymentDate || record.date || '21-Aug-2026',
      paymentMode: record.paymentMode || 'Online / UPI',
      student: record.student || { ...verifiedStudent },
      items: record.items || [
        {
          head: feeHead,
          description: feeDesc,
          amount: amount,
          status: 'PAID',
        }
      ],
      totalAmount: amount,
      amountInWords: record.amountInWords || numberToWords(amount),
      verificationId: record.verificationId || `SKCET-TXN-${randId}`,
      balanceRemaining: record.balanceRemaining || 0,
    };

    setActiveReceipt(formattedReceipt);
    setIsCheckoutOpen(true);
    setPaymentStep('receipt');
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-32 sm:pt-36 lg:pt-40 pb-20 text-gray-800">
      
      {/* ───────────────────────────────────────────────────────────────────────
          1. CLEAN TOPIC HEADER
         ─────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
              <ShieldCheck size={16} /> Official Institutional Portal
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-skcet-navy tracking-tight">
              Online Fee Payment Portal
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 bg-white border border-gray-200 px-3.5 py-2 rounded-xl shadow-xs self-start sm:self-auto">
            <Lock size={14} className="text-emerald-600" />
            <span>256-Bit SSL Encrypted & PCI-DSS Certified</span>
          </div>
        </div>
      </div>

      {/* Confirmation Email Toast Banner */}
      <AnimatePresence>
        {emailNotification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6"
          >
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-900">
                    Payment Confirmation Email Sent!
                  </div>
                  <div className="text-xs text-emerald-700 mt-0.5">
                    Official e-receipt ({emailNotification.receiptNo}) has been dispatched to <strong>{emailNotification.email}</strong>.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEmailNotification(null)}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold px-2 py-1 cursor-pointer"
              >
                ✕ Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────────────────
          2. EXACT 8 PAYMENT TYPES GRID (Matching Reference)
         ─────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-gray-500">
            Select Payment Category
          </h2>
          {selectedCategory && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setVerifiedStudent(null);
                setActiveFeeItem(null);
              }}
              className="text-xs text-amber-700 hover:text-amber-800 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw size={12} /> Clear Selection
            </button>
          )}
        </div>

        {/* Rows 1 & 2: 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {FEE_CATEGORIES.slice(0, 6).map((cat) => {
            const isSelected = selectedCategory?.id === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={`
                  p-6 sm:p-7 rounded-sm transition-all text-center flex items-center justify-center min-h-[96px] cursor-pointer
                  ${isSelected
                    ? 'border-[2.5px] border-[#f59e0b] bg-white text-gray-900 font-bold shadow-xs'
                    : 'border border-gray-300 bg-white hover:border-gray-400 text-gray-800 font-medium hover:bg-gray-50/50 shadow-2xs'}
                `}
              >
                <span className="text-xs sm:text-[13px] leading-snug">
                  {cat.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 3: Centered 2 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {FEE_CATEGORIES.slice(6, 8).map((cat) => {
            const isSelected = selectedCategory?.id === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={`
                  p-6 sm:p-7 rounded-sm transition-all text-center flex items-center justify-center min-h-[96px] cursor-pointer
                  ${isSelected
                    ? 'border-[2.5px] border-[#f59e0b] bg-white text-gray-900 font-bold shadow-xs'
                    : 'border border-gray-300 bg-white hover:border-gray-400 text-gray-800 font-medium hover:bg-gray-50/50 shadow-2xs'}
                `}
              >
                <span className="text-xs sm:text-[13px] leading-snug">
                  {cat.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          3. AUTHENTICATION / VERIFICATION FORM (When Category Clicked)
         ─────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedCategory && !verifiedStudent && (
          <motion.div
            key="auth-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
          >
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-skcet-navy text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    Student Verification — {selectedCategory.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Enter your Register Number and Date of Birth to fetch your allocated dues.
                  </p>
                </div>
              </div>

              <form onSubmit={handleVerifyStudent} className="space-y-4 max-w-xl">
                {/* Field 1: Reg No */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Register Number / Roll No
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      placeholder="e.g. 7376231CS201"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 uppercase tracking-wider"
                    />
                  </div>
                </div>

                {/* Field 2: Date of Birth */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Date of Birth (DOB)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Calendar size={16} />
                    </div>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                    />
                  </div>
                </div>

                {authError && (
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1.5 pt-1">
                    <AlertCircle size={14} /> {authError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full sm:w-auto bg-skcet-navy hover:bg-[#121c33] text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  {authLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & View Allocated Dues</span>
                      <ArrowRight size={16} className="text-amber-400" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Auto-Fill Helpers for Easy Testing */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span className="font-semibold text-gray-700">Quick Test Profiles:</span>
                {Object.keys(SAMPLE_STUDENTS).map((roll) => (
                  <button
                    key={roll}
                    type="button"
                    onClick={() => handleQuickFill(roll)}
                    className="px-2.5 py-1 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-mono text-xs transition-colors cursor-pointer"
                  >
                    {roll} (DOB: {SAMPLE_STUDENTS[roll].dob})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────────────────
          4. ALLOCATED FEES & PART - PART PAYMENT
         ─────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {verifiedStudent && selectedCategory && (
          <motion.div
            key="fee-breakdown"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10"
          >
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
              
              {/* Student Identification Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-skcet-navy text-amber-400 font-display text-xl font-bold flex items-center justify-center shadow-xs">
                    {verifiedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 text-lg">{verifiedStudent.name}</h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                        {verifiedStudent.rollNo}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{verifiedStudent.department} · {verifiedStudent.year}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">DOB</span>
                    <span className="font-semibold text-gray-800">{verifiedStudent.dob}</span>
                  </div>
                  <div className="border-l pl-3 border-gray-200">
                    <span className="text-gray-400 block text-[10px] uppercase">Email For Receipt</span>
                    <span className="font-semibold text-gray-800">{verifiedStudent.email}</span>
                  </div>
                  <div className="border-l pl-3 border-gray-200">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={13} /> Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Fee Allocation Cards / Table */}
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Allocated Fee Breakdown: <span className="text-skcet-navy">{selectedCategory.title}</span>
              </h4>

              {activeFeeItem ? (
                <div className="bg-gray-50/70 border border-gray-200 rounded-lg p-5 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-4">
                    <div>
                      <h5 className="font-bold text-gray-900 text-base">{activeFeeItem.title}</h5>
                      <p className="text-xs text-gray-500 mt-0.5">Due Date: {activeFeeItem.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                        activeFeeItem.pendingAmount === 0 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : activeFeeItem.paidAmount > 0 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-rose-100 text-rose-800'
                      }`}>
                        {activeFeeItem.pendingAmount === 0 ? 'Settled' : activeFeeItem.paidAmount > 0 ? 'Partially Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center mb-6">
                    <div className="bg-white p-3 rounded-md border border-gray-200">
                      <span className="text-[11px] text-gray-400 uppercase font-medium block">Total Allocated</span>
                      <span className="font-display text-base font-bold text-gray-900">
                        ₹{activeFeeItem.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-md border border-gray-200">
                      <span className="text-[11px] text-gray-400 uppercase font-medium block">Paid So Far</span>
                      <span className="font-display text-base font-bold text-emerald-700">
                        ₹{activeFeeItem.paidAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-md border border-amber-200 bg-amber-50/30">
                      <span className="text-[11px] text-amber-800 uppercase font-bold block">Remaining Due</span>
                      <span className="font-display text-base font-bold text-skcet-navy">
                        ₹{activeFeeItem.pendingAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* ── PART - PART PAYMENT OPTION ── */}
                  {activeFeeItem.pendingAmount > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                      <h6 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                        Choose Payment Structure
                      </h6>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {/* Option 1: Full Payment */}
                        <div
                          onClick={() => setIsPartPayment(false)}
                          className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                            !isPartPayment ? 'bg-amber-50/60 border-amber-400 ring-1 ring-amber-400' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${!isPartPayment ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300'}`}>
                              {!isPartPayment && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-gray-900 block">Full Settlement</span>
                              <span className="text-[11px] text-gray-500">Pay entire remaining balance</span>
                            </div>
                          </div>
                          <span className="font-display text-sm font-bold text-gray-900">
                            ₹{activeFeeItem.pendingAmount.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Option 2: Part Payment */}
                        <div
                          onClick={() => setIsPartPayment(true)}
                          className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                            isPartPayment ? 'bg-amber-50/60 border-amber-400 ring-1 ring-amber-400' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isPartPayment ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300'}`}>
                              {isPartPayment && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-gray-900 block">Part - Part Payment</span>
                              <span className="text-[11px] text-gray-500">Pay installment amount</span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            Flexible
                          </span>
                        </div>
                      </div>

                      {/* Part Payment Input */}
                      {isPartPayment && (
                        <div className="bg-amber-50/40 border border-amber-200 rounded-lg p-4 mb-4">
                          <label className="block text-xs font-bold text-gray-800 mb-1.5">
                            Enter Part Payment Amount (₹)
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              value={customAmount}
                              onChange={(e) => {
                                setCustomAmount(e.target.value);
                                setPartError('');
                              }}
                              placeholder={`Min ₹${activeFeeItem.minPartPayment.toLocaleString('en-IN')}`}
                              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
                            <span>Minimum Part Payment: <strong>₹{activeFeeItem.minPartPayment.toLocaleString('en-IN')}</strong></span>
                            <span>Remaining Balance Post-Pay: <strong>₹{remainingAfterPayment.toLocaleString('en-IN')}</strong></span>
                          </div>
                        </div>
                      )}

                      {partError && (
                        <p className="text-xs text-red-600 font-medium flex items-center gap-1 mb-4">
                          <AlertCircle size={14} /> {partError}
                        </p>
                      )}

                      {/* Total & Proceed Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-medium">Amount to Pay Now</span>
                          <span className="font-display text-2xl font-bold text-skcet-navy">
                            ₹{payableNow.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleProceedToPayment}
                          className="bg-skcet-navy hover:bg-[#121c33] text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Lock size={16} className="text-amber-400" />
                          <span>Proceed to Payment Gateway</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeFeeItem.pendingAmount === 0 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                      <p className="text-xs text-emerald-800 font-semibold">
                        All dues for this category have been cleared! You can view and download your payment receipts from the history below.
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-500">No allocated fee record found under this category.</p>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────────────────
          5. PAYMENT MODAL (Checkout Simulation & Instant Bill Generation)
         ─────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200"
            >
              {/* Modal Top Bar */}
              <div className="bg-skcet-navy text-white px-6 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
                    <Lock size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">SKCET Secure Payment Gateway</h3>
                    <p className="text-[11px] text-gray-300">256-Bit SSL Institutional Terminal</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-gray-400 hover:text-white text-xs px-2 py-1 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Step 1: Select Payment Mode */}
              {paymentStep === 'select' && (
                <div className="p-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-500 block">{activeFeeItem?.title}</span>
                      <div className="font-semibold text-gray-900 text-sm mt-0.5">
                        {verifiedStudent?.name} ({verifiedStudent?.rollNo})
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 uppercase block font-medium">Payable Amount</span>
                      <span className="font-display text-xl font-bold text-skcet-navy">
                        ₹{payableNow.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Select Payment Method
                  </h4>

                  <div className="space-y-2.5 mb-6">
                    {PAYMENT_METHODS.map((m) => {
                      const isSelected = selectedMethod === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => setSelectedMethod(m.id)}
                          className={`p-3.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                            isSelected ? 'bg-amber-50/60 border-amber-400 shadow-xs' : 'bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                            <div className="text-xs text-gray-500">{m.subtitle}</div>
                          </div>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                            {m.badge}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleExecutePayment}
                    className="w-full bg-skcet-navy hover:bg-[#121c33] text-white font-semibold py-3.5 rounded-lg shadow-sm flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
                  >
                    <Lock size={16} className="text-amber-400" />
                    <span>Pay ₹{payableNow.toLocaleString('en-IN')} Securely</span>
                  </button>
                </div>
              )}

              {/* Step 2: Processing state */}
              {paymentStep === 'processing' && (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 border-4 border-amber-200 border-t-skcet-navy rounded-full animate-spin mx-auto mb-6" />
                  <h4 className="font-semibold text-gray-900 text-lg mb-2">Processing Transaction...</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Contacting banking server, issuing bill, and generating digital receipt. Please do not refresh.
                  </p>
                </div>
              )}

              {/* Step 3: Official SKCET Payment Receipt Matching Exact Document Format */}
              {paymentStep === 'receipt' && activeReceipt && (
                <div className="p-4 sm:p-6 max-h-[85vh] overflow-y-auto bg-gray-100/60">
                  
                  {/* ── Exact Receipt Container ── */}
                  <div
                    id="skcet-official-receipt"
                    className="bg-white border border-gray-300 shadow-md p-6 sm:p-8 max-w-2xl mx-auto rounded-none text-black font-sans"
                  >
                    {/* 1. Header with Emblem & Title */}
                    <div className="flex items-center justify-center gap-4 mb-4 text-center">
                      <img
                        src="/images/skcet-emblem.png"
                        alt="SKCET Emblem"
                        className="h-16 sm:h-20 w-auto object-contain flex-shrink-0"
                        loading="eager"
                      />
                      <div className="text-center">
                        <h2 className="font-bold text-[#0c1f40] text-sm sm:text-base md:text-lg tracking-wide uppercase leading-snug">
                          SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY
                        </h2>
                        <p className="text-[10.5px] text-gray-700 mt-1 leading-snug">
                          An Autonomous Institution | Affiliated to Anna University | Accredited by NAAC with A++ Grade
                        </p>
                        <p className="text-[10.5px] text-gray-700 leading-snug">
                          Kuniamuthur, Coimbatore – 641008
                        </p>
                      </div>
                    </div>

                    {/* 2. Navy Bar: ONLINE FEE PAYMENT RECEIPT */}
                    <div className="bg-[#0c1f40] text-white py-2 px-4 text-center mb-4">
                      <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase">
                        ONLINE FEE PAYMENT RECEIPT
                      </h3>
                    </div>

                    {/* 3. Transaction Metadata 2x2 Grid */}
                    <table className="w-full text-xs border border-gray-300 mb-5 border-collapse">
                      <tbody>
                        <tr className="border-b border-gray-300">
                          <td className="w-1/4 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Receipt No.</td>
                          <td className="w-1/4 p-2 font-mono font-medium text-gray-900 border-r border-gray-300">{activeReceipt.receiptNo}</td>
                          <td className="w-1/4 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Payment Date</td>
                          <td className="w-1/4 p-2 text-gray-900">{activeReceipt.paymentDate}</td>
                        </tr>
                        <tr>
                          <td className="w-1/4 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Transaction ID</td>
                          <td className="w-1/4 p-2 font-mono font-medium text-gray-900 border-r border-gray-300">{activeReceipt.transactionId}</td>
                          <td className="w-1/4 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Payment Mode</td>
                          <td className="w-1/4 p-2 text-gray-900">{activeReceipt.paymentMode}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* 4. STUDENT DETAILS */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c1f40] mb-2">
                        STUDENT DETAILS
                      </h4>
                      <table className="w-full text-xs border border-gray-300 border-collapse">
                        <tbody>
                          <tr className="border-b border-gray-300">
                            <td className="w-1/4 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Student Name</td>
                            <td className="w-1/4 p-2 font-bold text-gray-900 border-r border-gray-300">{activeReceipt.student.name}</td>
                            <td className="w-1/4 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Register Number</td>
                            <td className="w-1/4 p-2 font-mono font-bold text-gray-900">{activeReceipt.student.rollNo}</td>
                          </tr>
                          <tr>
                            <td className="w-1/4 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Programme / Class</td>
                            <td className="w-1/4 p-2 text-gray-900 border-r border-gray-300">{activeReceipt.student.year}</td>
                            <td className="w-1/4 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Department</td>
                            <td className="w-1/4 p-2 text-gray-900">{activeReceipt.student.department}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* 5. PAYMENT DETAILS Table */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c1f40] mb-2">
                        PAYMENT DETAILS
                      </h4>
                      <table className="w-full text-xs border border-gray-300 border-collapse">
                        <thead>
                          <tr className="bg-[#0c1f40] text-white">
                            <th className="p-2 text-center w-12 border-r border-gray-600">S.No.</th>
                            <th className="p-2 text-left border-r border-gray-600">Fee Head</th>
                            <th className="p-2 text-left border-r border-gray-600">Description</th>
                            <th className="p-2 text-right border-r border-gray-600">Amount (₹)</th>
                            <th className="p-2 text-center w-20">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                          {activeReceipt.items.map((item, idx) => (
                            <tr key={idx} className={idx % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}>
                              <td className="p-2 text-center border-r border-gray-300 font-mono">{String(idx + 1).padStart(2, '0')}</td>
                              <td className="p-2 font-semibold text-gray-900 border-r border-gray-300">{item.head}</td>
                              <td className="p-2 text-gray-700 border-r border-gray-300">{item.description}</td>
                              <td className="p-2 text-right font-semibold text-gray-900 border-r border-gray-300">
                                {item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                              </td>
                              <td className="p-2 text-center">
                                <span className="text-emerald-700 font-bold text-[11px]">PAID</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-50/90 font-bold border-t-2 border-gray-300">
                            <td colSpan={3} className="p-2.5 text-right uppercase text-[#0c1f40] border-r border-gray-300">
                              TOTAL AMOUNT PAID
                            </td>
                            <td className="p-2.5 text-right font-display text-sm text-[#0c1f40] border-r border-gray-300">
                              ₹{activeReceipt.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="p-2.5 text-center text-emerald-800 font-bold">
                              SUCCESS
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* 6. PAYMENT SUMMARY */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c1f40] mb-2">
                        PAYMENT SUMMARY
                      </h4>
                      <table className="w-full text-xs border border-gray-300 border-collapse">
                        <tbody className="divide-y divide-gray-300">
                          <tr>
                            <td className="w-1/3 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Amount in Words</td>
                            <td className="p-2 font-medium text-gray-900 italic">{activeReceipt.amountInWords}</td>
                          </tr>
                          <tr>
                            <td className="w-1/3 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Payment Status</td>
                            <td className="p-2 font-bold text-emerald-700 uppercase">SUCCESSFUL</td>
                          </tr>
                          <tr>
                            <td className="w-1/3 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Payment Gateway</td>
                            <td className="p-2 text-gray-800">SKCET Secure Fee Payment Gateway</td>
                          </tr>
                          <tr>
                            <td className="w-1/3 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Security</td>
                            <td className="p-2 text-gray-800">256-bit SSL Encrypted Transaction</td>
                          </tr>
                          <tr>
                            <td className="w-1/3 bg-gray-50/80 p-2 font-semibold text-gray-700 border-r border-gray-300">Receipt Verification ID</td>
                            <td className="p-2 font-mono font-bold text-gray-900">{activeReceipt.verificationId}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* 7. Footer Disclaimers */}
                    <div className="text-[10px] text-gray-500 text-center space-y-1 pt-2 border-t border-gray-200">
                      <p className="font-medium text-gray-600">This is a computer-generated receipt. No signature is required.</p>
                      <p className="text-gray-400">
                        SAMPLE / DEMO FORMAT — For UI and design purposes only. Refer to the authorized institutional payment portal for official payment confirmation.
                      </p>
                      <p className="text-gray-600 font-medium pt-1">
                        Sri Krishna College of Engineering and Technology • Kuniamuthur, Coimbatore – 641008 • www.skcet.ac.in
                      </p>
                    </div>

                  </div>

                  {/* Actions Outside Printable Area */}
                  <div className="mt-5 max-w-2xl mx-auto flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex-1 bg-skcet-navy hover:bg-[#121c33] text-white font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                    >
                      <Printer size={15} /> Print / Save PDF Receipt
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="px-6 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-xs cursor-pointer shadow-xs transition-all"
                    >
                      Done
                    </button>
                  </div>

                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────────────────────
          6. PAYMENT HISTORY & BILLS (Below the Whole Process)
         ─────────────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <Receipt size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">Payment & Transaction History</h3>
                <p className="text-xs text-gray-500">
                  {verifiedStudent 
                    ? `Records for ${verifiedStudent.name} (${verifiedStudent.rollNo})` 
                    : 'Verify your register number above to view your transaction log'}
                </p>
              </div>
            </div>

            {verifiedStudent && (
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {verifiedStudent.history.length} Record(s)
              </span>
            )}
          </div>

          {verifiedStudent ? (
            verifiedStudent.history.length === 0 ? (
              <div className="text-center py-10 text-xs text-gray-400">
                No past transactions recorded on this portal yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 uppercase text-[10px]">
                      <th className="py-3 px-3 font-semibold">Date & Time</th>
                      <th className="py-3 px-3 font-semibold">Receipt No</th>
                      <th className="py-3 px-3 font-semibold">Fee Description</th>
                      <th className="py-3 px-3 font-semibold">Payment Mode</th>
                      <th className="py-3 px-3 font-semibold text-right">Amount Paid</th>
                      <th className="py-3 px-3 font-semibold text-center">Status</th>
                      <th className="py-3 px-3 font-semibold text-right">Bill / Slip</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {verifiedStudent.history.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-3 text-gray-600 whitespace-nowrap">{record.date}</td>
                        <td className="py-3.5 px-3 font-mono font-semibold text-gray-800">{record.receiptNo}</td>
                        <td className="py-3.5 px-3 text-gray-900 max-w-xs">{record.feeTitle}</td>
                        <td className="py-3.5 px-3 text-gray-600">{record.paymentMode}</td>
                        <td className="py-3.5 px-3 text-right font-bold text-gray-900 whitespace-nowrap font-display">
                          ₹{record.amountPaid.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleViewHistoricalReceipt(record)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-gray-300 hover:border-amber-400 hover:bg-amber-50 text-gray-700 hover:text-amber-900 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <FileCheck size={13} /> View Bill
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg">
              <Receipt size={28} className="mx-auto text-gray-300 mb-2" />
              <p className="text-xs text-gray-500 font-medium">
                Please select a payment category above and authenticate with your Register Number & DOB to access your complete payment history and bills.
              </p>
            </div>
          )}
        </div>
      </div>

    </main>
  );
};

export default OnlinePayment;
