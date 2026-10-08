import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap } from "lucide-react";
import axios from "axios";

const API = "https://portfolio12server.onrender.com/api/education";

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // ✅ Fetch Education Data
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get(API);
        setEducation(res.data.data);
      } catch (error) {
        console.log("Education fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return (
    <section
      id="education"
      className="relative py-16 px-6 md:px-20 text-white z-10 overflow-hidden"
    >
      {/* Background Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute -right-20 -top-20 text-[#8245ec] text-[300px] z-0"
      >
        <GraduationCap className="w-full h-full" />
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12 z-10 relative"
      >
        <h2 className="text-4xl font-bold">
          My <span className="text-[#8245ec]">Education</span>
        </h2>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A journey of continuous learning
        </p>
      </motion.div>

      {/* Content */}
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        {loading ? (
          <p className="text-gray-400 col-span-2 text-center">
            Loading education...
          </p>
        ) : (
          education.map((edu) => (
            <div key={edu._id} className="h-full">
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={800}
                glareEnable
                glareMaxOpacity={0.15}
                className="rounded-xl h-full"
              >
                <motion.div
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  variants={container}
                  className="relative h-full"
                >
                  {/* Border */}
                  <motion.div
                    variants={item}
                    className="absolute inset-0 border-2 border-[#8245ec] rounded-xl"
                  />

                  {/* Glow */}
                  <motion.div
                    variants={{
                      hidden: { scaleX: 0 },
                      show: { scaleX: 1, transition: { duration: 0.8 } },
                    }}
                    className="absolute inset-0 bg-[#8245ec]/10 rounded-xl"
                  />

                  {/* Card */}
                  <motion.div
                    variants={item}
                    className="bg-[#0a0824] p-6 rounded-xl border border-gray-800 h-full flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="w-8 h-8 text-[#8245ec]" />
                      <h3 className="text-xl font-semibold">
                        {edu.degree}
                      </h3>
                    </div>

                    <p className="text-purple-400 text-sm mb-2">
                      {edu.school} • {edu.date}
                    </p>

                    <p className="text-gray-300 flex-grow">
                      {edu.description}
                    </p>
                  </motion.div>
                </motion.div>
              </Tilt>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Education;