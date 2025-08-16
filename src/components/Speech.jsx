import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { InspiringQuotes } from "../assets/hello"; 

const SpeechWords = () => {
  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotate: -5
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="inspiring-words" className="relative py-16 px-6 md:px-20 text-white z-10">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-12"
      >
        <h3 >Inspiring <span className="text-[#8245ec]">Words</span> </h3>
        <p className="text-gray-400 mt-4 text-lg font-semibold">Wisdom and motivation that guides my journey</p>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={ref}>
        {InspiringQuotes.map((quote, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={cardVariants}
            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(130, 69, 236, 0.3)" }}
            className="bg-[#0a0824] p-6 rounded-xl border border-[#8245ec]/30 hover:border-[#8245ec]/60 transition-all"
          >
            <motion.div variants={textVariants}>
              <div className="text-[#8245ec] text-5xl font-serif mb-4">"</div>
              <p className="text-lg italic mb-6">{quote.text}</p>
              <div className="flex items-center">
                {quote.authorImage && (
                  <img 
                    src={quote.authorImage} 
                    alt={quote.author} 
                    className="w-10 h-10 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{quote.author}</p>
                  {quote.title && (
                    <p className="text-sm text-gray-400">{quote.title}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute -bottom-20 left-10 w-40 h-40 bg-[#8245ec] rounded-full filter blur-3xl -z-10"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute -top-20 right-10 w-60 h-60 bg-[#8245ec] rounded-full filter blur-3xl -z-10"
      />
    </section>
  );
};

export default SpeechWords;