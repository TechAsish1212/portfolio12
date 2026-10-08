import React, { useEffect, useState } from "react";

const API = "https://portfolio12server.onrender.com/api/experience";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(API);
        const result = await response.json();

        if (result.success) {
          // Handles both single object and array
          const data = Array.isArray(result.data)
            ? result.data
            : [result.data];

          setExperiences(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white py-10">
        Loading Experience...
      </div>
    );
  }

  return (
    <section
      id="experience"
      className="py-20 px-[10vw] bg-black"
    >
      <h2 className="text-4xl font-bold text-center text-white mb-12">
        Work <span className="text-purple-500">Experience</span>
      </h2>

      <div className="space-y-8">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition-all"
          >
            <div className="flex gap-4">
              <img
                src={exp.companyLogo}
                alt={exp.companyName}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-xl font-bold text-white">
                  {exp.position}
                </h3>

                <p className="text-purple-400">
                  {exp.companyName}
                </p>

                <p className="text-gray-400 text-sm">
                  {exp.employmentType} • {exp.location}
                </p>

                <p className="text-gray-500 text-sm">
                  {new Date(exp.startDate).toLocaleDateString()} -
                  {exp.currentlyWorking
                    ? " Present"
                    : new Date(exp.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="text-gray-300 mt-5">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {exp.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;