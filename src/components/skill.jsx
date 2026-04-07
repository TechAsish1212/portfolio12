// import React from "react";
// import Tilt from "react-parallax-tilt";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { SkillsInfo } from "../assets/hello.js";

// const Skills = () => {
//   // Container animation for staggered children
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   // Individual item animation
//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1 },
//   };

//   // Intersection Observer
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   // Use the flat skills array directly
//   const allSkills = SkillsInfo;

//   return (
//     <section id="skills" className="relative py-16 px-6 md:px-20 text-white z-10">
//       {/* Title */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         viewport={{ once: true }}
//         className="text-center mb-12"
//       >
//         <h2 className="text-4xl font-bold">
//           My <span className="text-[#8245ec]">Skills</span>
//         </h2>
//         <p className="text-gray-400 mt-4 text-lg font-semibold max-w-2xl mx-auto">
//           A collection of my technical skills and expertise honed through various projects and experiences
//         </p>
//       </motion.div>

//       {/* Skills Card */}
//       <div ref={ref} className="flex justify-center">
//         <Tilt
//           tiltMaxAngleX={10}
//           tiltMaxAngleY={10}
//           perspective={1000}
//           scale={1.05}
//           transitionSpeed={400}
//           glareEnable={true}
//           glareColor="#8245ec"
//           glareMaxOpacity={0.2}
//           className="rounded-xl w-full max-w-5xl"
//         >
//           <motion.div
//             variants={container}
//             initial="hidden"
//             animate={inView ? "show" : "hidden"}
//             className="bg-[#0a0824] p-8 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(130,69,236,0.6)] transition"
//           >
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
//               {allSkills.map((skill, i) => (
//                 <motion.div
//                   key={i}
//                   variants={item}
//                   className="flex flex-col items-center text-center hover:scale-110 transition-transform duration-300"
//                 >
//                   <div className="mb-2 w-12 h-12 flex items-center justify-center">
//                     <img
//                       src={skill.logo}
//                       alt={skill.name}
//                       className="w-full h-full object-contain"
//                     />
//                   </div>
//                   <p className="text-sm text-gray-300">{skill.name}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </Tilt>
//       </div>
//     </section>
//   );
// };

// export default Skills;



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";

const API = "https://portfolio12server.onrender.com/api/skills";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fetch Skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(API);
        setSkills(res.data.data);
      } catch (error) {
        console.log("Skills fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="skills"
      className="relative py-16 px-6 md:px-20 text-white"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold">
          My <span className="text-[#8245ec]">Skills</span>
        </h2>
        <p className="text-gray-400 mt-3">
          Technologies I work with
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div ref={ref} className="flex justify-center">
        {loading ? (
          <section
            id='projects'
            className='py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden min-h-screen flex items-center justify-center'
          >
            <div className='text-center'>
              <div className='inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4'></div>
              <p className='text-gray-400'>Loading projects...</p>
            </div>
          </section>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill._id}
                variants={item}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-xl bg-[#8245ec] opacity-10 blur-lg group-hover:opacity-40 transition duration-300"></div>

                {/* Card */}
                <div className="relative bg-[#0a0824] border border-[#8245ec]/20 rounded-xl p-5 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-[#8245ec]/60 group-hover:shadow-[0_0_20px_rgba(130,69,236,0.5)]">

                  {/* Icon */}
                  <div className="w-12 h-12 mb-3">
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Name */}
                  <p className="text-sm text-gray-300 group-hover:text-white transition">
                    {skill.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-20 left-10 w-40 h-40 bg-[#8245ec] rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute -top-20 right-10 w-60 h-60 bg-[#8245ec] rounded-full blur-3xl opacity-30 -z-10"></div>
    </section>
  );
};

export default Skills;