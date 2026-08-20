import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Trophy, Activity, Heart, Users, Briefcase, Award, Monitor, Landmark, CheckCircle, Lightbulb } from 'lucide-react';
import { exploreGroups } from '../../data/homeData';

// Map specific titles to lucide icons for visual interest
const getIconForTitle = (title) => {
  const map = {
    'Departments': BookOpen,
    'Cut-Off Marks': CheckCircle,
    'Stadium': Trophy,
    'Sports': Activity,
    'Health Centre': Heart,
    'Achievements': Award,
    'R & D Projects': Lightbulb,
    'Recruiters': Briefcase,
    'Institution': Landmark,
    'Best Practices': Monitor,
    'Entrepreneurship Development Cell': Users
  };
  const IconComponent = map[title] || ArrowRight;
  return <IconComponent size={20} strokeWidth={1.5} />;
};

const Explore = () => {
  return (
    <section className="bg-skcet-dark py-24 px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-skcet-gold/60 font-light mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Explore SKCET
          </motion.p>
          <motion.h2
            className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Everything you need to discover the institution.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {exploreGroups.map((group, groupIdx) => (
            <motion.div 
              key={groupIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + (groupIdx * 0.1) }}
              className="flex flex-col"
            >
              <h3 className="text-skcet-gold/80 text-sm font-semibold uppercase tracking-wider mb-6 pb-4 border-b border-white/10">
                {group.category}
              </h3>
              <div className="flex flex-col gap-3">
                {group.links.map((link, linkIdx) => (
                  <Link 
                    key={linkIdx} 
                    to={link.path}
                    className="group flex flex-col justify-between p-5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-[120px]"
                  >
                    <div className="text-white/40 group-hover:text-skcet-gold transition-colors duration-300">
                      {getIconForTitle(link.title)}
                    </div>
                    <div className="flex items-end justify-between mt-auto">
                      <span className="text-white/80 font-medium text-sm md:text-base pr-4 group-hover:text-white transition-colors duration-300">
                        {link.title}
                      </span>
                      <ArrowRight 
                        size={16} 
                        className="text-white/0 group-hover:text-skcet-gold -translate-x-4 group-hover:translate-x-0 transition-all duration-300" 
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
