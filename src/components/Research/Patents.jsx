import { patents } from '../../data/researchData';
import { CheckCircle, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Patents() {
  return (
    <div className="pb-24">
      {/* ── Heading and Introduction ── */}
      <div className="mb-10 max-w-4xl">
        <h2 className="text-xs uppercase tracking-widest text-skcet-gold font-bold mb-2">
          Intellectual Property
        </h2>
        <h1 className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight">
          Patents & Innovations
        </h1>
        <div className="w-12 h-0.5 bg-skcet-gold mt-4 rounded-full" />
        
        <p className="mt-6 text-white/60 font-light leading-relaxed text-sm sm:text-base">
          Sri Krishna College of Engineering and Technology fosters a culture of innovation and research-driven product development. 
          Our faculty and students are actively engaged in resolving real-world engineering challenges, leading to significant 
          intellectual property filings. Below is a summary of the mock patent records showing recent filings and grants.
        </p>
      </div>

      {/* ── Table Container ── */}
      <motion.div
        className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/\[0.03\]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Desktop/Tablet Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/\[0.03\] text-xs font-semibold uppercase tracking-widest text-skcet-gold">
                <th className="py-4.5 px-6">Year</th>
                <th className="py-4.5 px-6">Patent Title</th>
                <th className="py-4.5 px-6">Inventor / Faculty</th>
                <th className="py-4.5 px-6">Patent No.</th>
                <th className="py-4.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {patents.map((patent, index) => (
                <tr key={index} className="hover:bg-white/\[0.03\] transition-colors duration-200">
                  <td className="py-4.5 px-6 font-mono text-xs">{patent.year}</td>
                  <td className="py-4.5 px-6 font-bold text-white tracking-wide">{patent.title}</td>
                  <td className="py-4.5 px-6 text-white/70">{patent.inventor}</td>
                  <td className="py-4.5 px-6 font-mono text-xs text-white/40">{patent.patentNo}</td>
                  <td className="py-4.5 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                        patent.status === 'Granted'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-skcet-gold/10 text-skcet-gold-light border border-skcet-gold/20'
                      }`}
                    >
                      {patent.status === 'Granted' ? (
                        <CheckCircle size={10} className="stroke-[3]" />
                      ) : (
                        <FileCheck size={10} className="stroke-[3]" />
                      )}
                      {patent.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Mobile Card Layout (Alternative view rendered inline on mobile screen heights if desired, 
          though the overflow-x-auto container scrollbar is already safe and responsive) */}
      <div className="sm:hidden mt-8 space-y-4">
        <span className="text-[10px] text-white/40 uppercase tracking-widest block font-bold mb-1">
          Swipe table above to view all columns, or see below:
        </span>
        {patents.map((patent, index) => (
          <div key={index} className="p-5 rounded-xl border border-white/10 bg-white/\[0.03\] space-y-3">
            <div className="flex justify-between items-start gap-4">
              <span className="font-mono text-xs text-skcet-gold font-bold">{patent.year}</span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                  patent.status === 'Granted'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                    : 'bg-skcet-gold/10 text-skcet-gold-light border border-skcet-gold/15'
                }`}
              >
                {patent.status}
              </span>
            </div>
            
            <h3 className="font-bold text-white leading-snug">{patent.title}</h3>
            
            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/5 text-white/40">
              <div>
                <span className="block text-[10px] uppercase font-semibold text-white/30">Inventor</span>
                <span className="text-white/70 font-medium">{patent.inventor}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-semibold text-white/30">Patent No.</span>
                <span className="font-mono">{patent.patentNo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
