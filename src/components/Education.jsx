import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap } from "lucide-react";
import { education } from "../assets/hello"; // ✅ use your real education data

const Education = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: {
      y: 40,
      opacity: 0,
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    },
    show: {
      y: 0,
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="education"
      className="relative py-16 px-6 md:px-20 text-white z-10 overflow-hidden"
    >
      {/* Background decorative icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute -right-20 -top-20 text-[#8245ec] opacity-10 text-[300px] font-bold z-0"
      >
        <GraduationCap className="w-full h-full" />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-12 relative z-10"
      >
        My <span className="text-[#8245ec]">Education</span>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A journey of continuous learning and professional growth
        </p>
      </motion.h2>

      {/* Education cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 relative z-10">
        {education.map((edu, idx) => (
          <div key={idx} ref={ref} className="h-full">
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              scale={1.02}
              transitionSpeed={800}
              glareEnable={true}
              glareColor="#8245ec"
              glareMaxOpacity={0.15}
              glarePosition="all"
              className="rounded-xl h-full"
            >
              <motion.div
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                variants={container}
                className="relative h-full"
              >
                {/* Border animation */}
                <motion.div
                  variants={item}
                  className="absolute inset-0 border-2 border-[#8245ec] rounded-xl pointer-events-none"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                  }}
                />

                {/* Background highlight */}
                <motion.div
                  variants={{
                    hidden: { scaleX: 0, originX: 0 },
                    show: {
                      scaleX: 1,
                      transition: {
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0.16, 0.77, 0.47, 0.97],
                      },
                    },
                  }}
                  className="absolute inset-0 bg-[#8245ec] bg-opacity-10 rounded-xl pointer-events-none"
                />

                {/* Content */}
                <motion.div
                  variants={item}
                  className="bg-[#0a0824] p-6 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(130,69,236,0.6)] transition h-full flex flex-col border border-gray-800"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="w-8 h-8 text-[#8245ec]" />
                    <h3 className="text-2xl font-semibold">{edu.degree}</h3>
                  </div>

                  <p className="text-purple-400 text-sm font-medium mb-2">
                    {edu.school} • {edu.date}
                  </p>

                  <p className="text-gray-300 flex-grow">{edu.desc}</p>
                </motion.div>
              </motion.div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
