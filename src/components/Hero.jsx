import React, { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { BsBoxArrowUpRight } from "react-icons/bs";
import heroImage, { cv } from "../assets/hello";
import { motion, AnimatePresence } from "framer-motion";
import ContactFormModal from "./ContactFormModal";

// Generate blinking stars
const generateStars = (count = 100) => {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * 100 + "%",
    y: Math.random() * 100 + "%",
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2,
  }));
};

const Hero = () => {
  const [transformStyle, setTransformStyle] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [stars] = useState(generateStars());

  const handleMouseMove = (e) => {
    const { offsetWidth: width, offsetHeight: height } = e.currentTarget;
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    const rotateX = (y / height - 0.5) * 20;
    const rotateY = (x / width - 0.5) * -20;
    setTransformStyle(
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    );
  };

  const handleMouseLeave = () =>
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1)");

  return (
    <div className="relative w-full bg-[#050414] overflow-hidden">
      {/* Blinking Stars */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        id="about"
        className="relative z-10 w-full py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Profile Image */}
        <motion.div
          className="flex-1 flex justify-center"
          style={{ perspective: "1000px" }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={heroImage}
            alt="Profile"
            className="rounded-2xl shadow-[0_0_30px_rgba(130,69,236,0.5)] object-cover w-72 h-72 md:w-96 md:h-96 transition-transform duration-200 ease-out"
            style={{ transform: transformStyle }}
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="flex-1 flex flex-col justify-center text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Namaste 🙏🏻, I'm{" "}
            <span className="text-[#8245ec]">
              <br />
              Asish Kumar Bera
            </span>
          </h1>
          <h3 className="text-3xl text-gray-300 mb-4 leading-relaxed">
            I love turning ideas into scalable web apps with clean code and
            seamless <span className="text-[#8245ec]">user experiences.</span>
          </h3>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Let's build something amazing—reach out for collaborations or
            freelance projects!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href={cv}
              download
              className="px-6 py-3 bg-[#8245ec] text-white font-semibold rounded-full shadow-lg hover:bg-[#6f30d9] transition inline-flex items-center justify-center md:justify-start gap-2"
            >
              Download CV
              <IoMdDownload />
            </a>
            <button
              onClick={() => setShowContactForm(true)}
              className="px-6 py-3 border-2 border-[#8245ec] text-[#8245ec] font-semibold rounded-full hover:bg-[#8245ec] hover:text-white transition cursor-pointer"
            >
              Let's talk
              <BsBoxArrowUpRight className="inline-block ml-2 items-center mb-2" />
            </button>
          </div>
        </motion.div>
      </motion.section>

      {/* Contact Form Modal with AnimatePresence */}
      <AnimatePresence>
        {showContactForm && (
          <ContactFormModal onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
