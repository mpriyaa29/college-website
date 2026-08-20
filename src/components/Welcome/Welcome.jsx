import React from 'react';
import { motion } from 'framer-motion';
import { statisticsData } from '../../data/homeData';

const Welcome = () => {
  return (
    <section className="bg-white py-24 px-4 sm:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(201,162,39,0.4) 0%, transparent 70%)',
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Left Column - Heading */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.p
              className="text-xs tracking-[0.3em] uppercase text-skcet-gold font-medium mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Welcome to SKCET
            </motion.p>
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Engineering excellence <br/>
              <span className="text-skcet-gold italic font-semibold">since 1998.</span>
            </motion.h2>
          </div>
          
          {/* Right Column - Text */}
          <div className="lg:col-span-7 flex items-center">
            <motion.p
              className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl border-l-2 border-skcet-gold/40 pl-6 lg:pl-10 py-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Sri Krishna College of Engineering and Technology is the most sought after Institution among the premier technical Institutions in South India. Since its establishment in the year 1998, the Institution has marched towards the pinnacle of glory through its remarkable achievements in the field of Engineering Education. It is an Autonomous Institution, Affiliated to Anna University with 7 programmes being accredited by NBA and it offers 11 UG programmes, 4 PG programmes, 1 integrated programme and 8 research programmes. The Institution offers an exciting academic environment with well qualified dedicated faculty members to inspire and nurture the student fraternity. With industry drafted Choice Based Credit System (CBCS) curriculum and syllabi, the Institution takes every effort to bring its students to the forefront of the society as skillful and responsible engineers.
            </motion.p>
          </div>
        </div>

        {/* Statistics Area */}
        <motion.div 
          className="border-t border-gray-200 pt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
            {statisticsData.map((stat, index) => (
              <div key={index} className="flex flex-col items-start lg:items-center text-left lg:text-center group">
                <div className={`font-display text-4xl lg:text-5xl font-bold mb-3 transition-colors duration-500 ${stat.emphasize ? 'text-skcet-gold' : 'text-gray-900 group-hover:text-skcet-gold'}`}>
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-medium max-w-[120px] leading-tight group-hover:text-gray-700 transition-colors duration-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Welcome;
