import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SkillsInfo } from "../assets/hello";

const Skills = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="relative py-16 px-6 md:px-20 text-white z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-12"
      >
        My <span className="text-[#8245ec]">Skills</span>
        <p className="text-gray-400 mt-4 text-lg font-semibold">A collection of my technical skills and expertise honed through various projects and experiences</p>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {SkillsInfo.map((category, idx) => (
          <div key={idx} ref={ref} className="h-full">
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={400}
              glareEnable={true}
              glareColor="#8245ec"
              glareMaxOpacity={0.2}
              className="rounded-xl h-full"
            >
              <motion.div
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                variants={container}
                className="bg-[#0a0824] p-6 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(130,69,236,0.6)] transition h-full flex flex-col"
              >
                <motion.h3 variants={item} className="text-2xl font-semibold mb-6 border-b border-[#8245ec] pb-2">
                  {category.title}
                </motion.h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 flex-grow">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="mb-2 w-12 h-12 flex items-center justify-center">
                        <img 
                          src={skill.logo} 
                          alt={skill.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-gray-300">{skill.name}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;