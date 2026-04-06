import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";

const GithubContributions = () => {
  return (
    <section className="py-16 px-6 md:px-20 text-white">

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold">
          GitHub <span className="text-[#8245ec]">Contribution</span>
        </h2>

        <p className="text-gray-400 mt-3">
          My real-time contribution graph
        </p>
      </motion.div>

      <div className="flex justify-center overflow-x-auto">
        <GitHubCalendar
          username="TechAsish1212"
          colorScheme="dark"
          blockSize={15}
          blockMargin={5}
          fontSize={14}
        />
      </div>

    </section>
  );
};

export default GithubContributions;