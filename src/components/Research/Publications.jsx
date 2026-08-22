import { publications } from '../../data/researchData';
import { Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Publications({ isDark = false }) {
  const t = {
    heading: isDark ? 'text-white' : 'text-skcet-navy',
    text: isDark ? 'text-white/90 group-hover:text-white' : 'text-black/80 group-hover:text-skcet-navy',
    muted: isDark ? 'text-white/40' : 'text-skcet-navy/55',
    border: isDark ? 'border-white/10' : 'border-skcet-navy/10',
    divide: isDark ? 'divide-white/10' : 'divide-skcet-navy/10',
    bullet: isDark ? 'bg-white/10' : 'bg-skcet-navy/10',
  };
  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-10">
        <h2 className="text-xs uppercase tracking-widest text-skcet-gold font-bold mb-2">
          Repository
        </h2>
        <h1 className={`font-sans text-2xl sm:text-3xl ${t.heading} font-bold tracking-tight`}>
          Research Publications
        </h1>
        <div className="w-12 h-0.5 bg-skcet-gold mt-4 rounded-full" />
      </div>

      <div className={`divide-y ${t.divide}`}>
        {publications.map((pub, index) => {
          const num = String(pub.id).padStart(2, '0');
          return (
            <motion.div
              key={pub.id}
              className="py-8 first:pt-2 last:pb-2 group flex flex-col md:flex-row gap-6 md:gap-10 items-start justify-between"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              {/* Number and Publication Info */}
              <div className="flex gap-6 items-start flex-1 min-w-0">
                <span className="font-mono text-sm font-bold text-skcet-gold/60 mt-1">
                  {num}
                </span>
                
                <div className="space-y-2 min-w-0">
                  <h3 className={`font-sans text-lg sm:text-xl font-bold leading-snug transition-colors tracking-wide ${t.text}`}>
                    {pub.title}
                  </h3>
                  
                  <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium ${t.muted}`}>
                    <span>{pub.type}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${t.bullet} hidden sm:inline`} />
                    <span>Published: {pub.year}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full md:w-auto flex-shrink-0 pt-2 md:pt-0">
                <a
                  href={pub.downloadLink}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full md:w-auto
                    inline-flex items-center justify-center gap-2.5
                    px-5 py-2.5 rounded-lg
                    border border-skcet-gold/25 hover:border-skcet-gold/60
                    bg-skcet-gold/[0.04] hover:bg-skcet-gold/[0.08]
                    text-skcet-gold hover:text-skcet-gold-light
                    text-xs font-semibold uppercase tracking-wider
                    transition-all duration-300
                  "
                >
                  <FileText size={15} />
                  <span>Download PDF</span>
                  <Download size={14} className="ml-0.5 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
