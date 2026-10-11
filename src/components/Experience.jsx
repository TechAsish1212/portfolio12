// import React, { useEffect, useState } from "react";

// const API = "https://portfolio12server.onrender.com/api/experience";

// const Experience = () => {
//   const [experiences, setExperiences] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [flippedId, setFlippedId] = useState(null);

//   useEffect(() => {
//     const fetchExperiences = async () => {
//       try {
//         const response = await fetch(API);
//         const result = await response.json();

//         if (result.success) {
//           // Handles both single object and array
//           const data = Array.isArray(result.data)
//             ? result.data
//             : [result.data];

//           setExperiences(data);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExperiences();
//   }, []);

//   const toggleFlip = (id) => {
//     setFlippedId((prev) => (prev === id ? null : id));
//   };

//   if (loading) {
//     return (
//       <div className="text-center text-white py-10">
//         Loading Experience...
//       </div>
//     );
//   }

//   return (
//     <section
//       id="experience"
//       className="py-20 px-[10vw] bg-black"
//     >
//       <h2 className="text-4xl font-bold text-center text-white mb-12">
//         Work <span className="text-purple-500">Experience</span>
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-14 justify-items-center">
//         {experiences.map((exp) => {
//           const isFlipped = flippedId === exp._id;

//           return (
//             <div
//               key={exp._id}
//               onClick={() => toggleFlip(exp._id)}
//               className="relative w-full max-w-[340px] h-[520px] cursor-pointer"
//               style={{ perspective: "1500px" }}
//             >
//               {/* Lanyard clip */}
//               <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
//                 <div className="w-20 h-6 bg-gray-300 rounded-t-md border border-gray-400" />
//                 <div className="w-10 h-3 bg-gray-400 mx-auto rounded-b-sm" />
//               </div>

//               {/* Card */}
//               <div
//                 className="relative w-full h-full transition-transform duration-700 ease-in-out"
//                 style={{
//                   transformStyle: "preserve-3d",
//                   transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
//                 }}
//               >
//                 {/* ---------- FRONT ---------- */}
//                 <div
//                   className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-white"
//                   style={{ backfaceVisibility: "hidden" }}
//                 >
//                   {/* Decorative curved purple shapes */}
//                   <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//                     <svg
//                       viewBox="0 0 340 520"
//                       className="w-full h-full"
//                       preserveAspectRatio="none"
//                     >
//                       <path
//                         d="M0,0 L340,0 L340,120 C220,180 120,140 0,260 Z"
//                         fill="#4c1d95"
//                         opacity="0.95"
//                       />
//                       <path
//                         d="M0,120 C120,180 220,140 340,200 L340,260 C220,220 120,260 0,320 Z"
//                         fill="#a855f7"
//                         opacity="0.55"
//                       />
//                       <path
//                         d="M0,320 C120,260 220,300 340,260 L340,520 L0,520 Z"
//                         fill="#6b21a8"
//                         opacity="0.15"
//                       />
//                     </svg>
//                   </div>

//                   {/* Company Logo + Name */}
//                   <div className="relative z-10 flex flex-col items-center pt-8">
//                     <img
//                       src={exp.companyLogo}
//                       alt={exp.companyName}
//                       className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md bg-white"
//                     />
//                     <h3 className="mt-2 text-white text-lg font-bold tracking-wide uppercase drop-shadow">
//                       {exp.companyName}
//                     </h3>
//                   </div>

//                   {/* Person Photo */}
//                   <div className="relative z-10 flex flex-col items-center mt-6">
//                     <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-purple-100 flex items-center justify-center">
//                       {exp.Image ? (
//                         <img
//                           src={exp.Image}
//                           alt={exp.position}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-purple-700 text-4xl font-bold">
//                           {exp.companyName?.charAt(0)}
//                         </span>
//                       )}
//                     </div>

//                     {/* Name / Position */}
//                     <h4 className="mt-4 text-2xl font-extrabold text-purple-900 uppercase tracking-wide text-center px-4">
//                       {exp.position}
//                     </h4>
//                   </div>

//                   {/* Quick info */}
//                   <div className="relative z-10 mt-6 px-8 space-y-1.5 text-sm">
//                     <div className="flex">
//                       <span className="w-20 text-gray-600 font-semibold">ID</span>
//                       <span className="text-gray-800">
//                         : {exp._id?.slice(-10).toUpperCase()}
//                       </span>
//                     </div>
//                     <div className="flex">
//                       <span className="w-20 text-gray-600 font-semibold">Location</span>
//                       <span className="text-gray-800 truncate">: {exp.location}</span>
//                     </div>
//                     <div className="flex">
//                       <span className="w-20 text-gray-600 font-semibold">Start</span>
//                       <span className="text-gray-800">
//                         : {new Date(exp.startDate).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Barcode */}
//                   <div className="relative z-10  flex flex-col items-center">
//                     <div className="flex items-end gap-[2px] h-10">
//                       <p className="text-purple-500">{exp.companyLink}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ---------- BACK ---------- */}
//                 <div
//                   className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-white"
//                   style={{
//                     backfaceVisibility: "hidden",
//                     transform: "rotateY(180deg)",
//                   }}
//                 >
//                   {/* Decorative curves back */}
//                   <div className="absolute inset-0 pointer-events-none">
//                     <svg
//                       viewBox="0 0 340 520"
//                       className="w-full h-full"
//                       preserveAspectRatio="none"
//                     >
//                       <path
//                         d="M0,0 L340,0 L340,80 C200,140 120,80 0,160 Z"
//                         fill="#4c1d95"
//                         opacity="0.95"
//                       />
//                       <path
//                         d="M0,160 C120,80 200,140 340,80 L340,140 C200,200 120,140 0,220 Z"
//                         fill="#a855f7"
//                         opacity="0.55"
//                       />
//                     </svg>
//                   </div>

//                   {/* Header */}
//                   <div className="relative z-10 flex flex-col items-center pt-10">
//                     <img
//                       src={exp.companyLogo}
//                       alt={exp.companyName}
//                       className="w-12 h-12 rounded-full object-cover border-2 border-white shadow bg-white"
//                     />
//                     <h3 className="mt-2 text-white text-lg font-bold tracking-wide uppercase">
//                       {exp.companyName}
//                     </h3>
//                   </div>

//                   {/* Details */}
//                   <div className="relative z-10 px-8 mt-8 space-y-3 text-sm text-gray-700">
//                     <div className="flex items-start gap-2">
//                       <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
//                       <p className="leading-relaxed">
//                         <strong>Role:</strong> {exp.position}
//                         {exp.employmentType && ` • ${exp.employmentType}`}
//                       </p>
//                     </div>

//                     <div className="flex items-start gap-2">
//                       <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
//                       <p className="leading-relaxed">
//                         <strong>Duration:</strong>{" "}
//                         {new Date(exp.startDate).toLocaleDateString()} -{" "}
//                         {exp.currentlyWorking
//                           ? "Present"
//                           : new Date(exp.endDate).toLocaleDateString()}
//                       </p>
//                     </div>

//                     <div className="flex items-start gap-2">
//                       <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
//                       <p className="leading-relaxed">
//                         <strong>Location:</strong> {exp.location}
//                       </p>
//                     </div>

//                     <div className="flex items-start gap-2">
//                       <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
//                       <p className="leading-relaxed">
//                         <strong>Status:</strong>{" "}
//                         {exp.currentlyWorking ? "Currently Working" : "Completed"}
//                       </p>
//                     </div>

//                     <div className="flex items-start gap-2">
//                       <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
//                       <p className="leading-relaxed line-clamp-4">
//                         {exp.description}
//                       </p>
//                     </div>

//                     {exp.technologies?.length > 0 && (
//                       <div>
//                         <p className="font-semibold text-purple-900 mb-1">
//                           Technologies
//                         </p>
//                         <div className="flex flex-wrap gap-1.5">
//                           {exp.technologies.map((tech, index) => (
//                             <span
//                               key={index}
//                               className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs border border-purple-200"
//                             >
//                               {tech}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                 </div>
//               </div>

//               {/* Flip hint */}
//               <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
//                 {isFlipped ? "Click to flip back" : "Click to view details"}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default Experience;  


import React, { useEffect, useState } from "react";

const API = "https://portfolio12server.onrender.com/api/experience";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedId, setFlippedId] = useState(null);

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

  const toggleFlip = (id) => {
    setFlippedId((prev) => (prev === id ? null : id));
  };

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

      {/* ✅ Changed: flex + justify-center makes 1 card centered, many cards wrap centered */}
      <div className="flex flex-wrap justify-center gap-14">
        {experiences.map((exp) => {
          const isFlipped = flippedId === exp._id;

          return (
            <div
              key={exp._id}
              onClick={() => toggleFlip(exp._id)}
              className="relative w-full max-w-[340px] h-[520px] cursor-pointer"
              style={{ perspective: "1500px" }}
            >
              {/* Lanyard clip */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                <div className="w-20 h-6 bg-gray-300 rounded-t-md border border-gray-400" />
                <div className="w-10 h-3 bg-gray-400 mx-auto rounded-b-sm" />
              </div>

              {/* Card */}
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* ---------- FRONT ---------- */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-white"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Decorative curved purple shapes */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <svg
                      viewBox="0 0 340 520"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,0 L340,0 L340,120 C220,180 120,140 0,260 Z"
                        fill="#4c1d95"
                        opacity="0.95"
                      />
                      <path
                        d="M0,120 C120,180 220,140 340,200 L340,260 C220,220 120,260 0,320 Z"
                        fill="#a855f7"
                        opacity="0.55"
                      />
                      <path
                        d="M0,320 C120,260 220,300 340,260 L340,520 L0,520 Z"
                        fill="#6b21a8"
                        opacity="0.15"
                      />
                    </svg>
                  </div>

                  {/* Company Logo + Name */}
                  <div className="relative z-10 flex flex-col items-center pt-8">
                    <img
                      src={exp.companyLogo}
                      alt={exp.companyName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md bg-white"
                    />
                    <h3 className="mt-2 text-white text-lg font-bold tracking-wide uppercase drop-shadow">
                      {exp.companyName}
                    </h3>
                  </div>

                  {/* Person Photo */}
                  <div className="relative z-10 flex flex-col items-center mt-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-purple-100 flex items-center justify-center">
                      {exp.Image ? (
                        <img
                          src={exp.Image}
                          alt={exp.position}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-purple-700 text-4xl font-bold">
                          {exp.companyName?.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Name / Position */}
                    <h4 className="mt-4 text-2xl font-extrabold text-purple-900 uppercase tracking-wide text-center px-4">
                      {exp.position}
                    </h4>
                  </div>

                  {/* Quick info */}
                  <div className="relative z-10 mt-6 px-8 space-y-1.5 text-sm">
                    <div className="flex">
                      <span className="w-20 text-gray-600 font-semibold">ID</span>
                      <span className="text-gray-800">
                        : {exp._id?.slice(-10).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-20 text-gray-600 font-semibold">Location</span>
                      <span className="text-gray-800 truncate">: {exp.location}</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 text-gray-600 font-semibold">Start</span>
                      <span className="text-gray-800">
                        : {new Date(exp.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Company Link */}
                  <div className="relative z-10 flex mt-2 flex-col items-center">
                    <p className="text-purple-500">{exp.companyLink}</p>
                  </div>
                </div>

                {/* ---------- BACK ---------- */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-white"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Decorative curves back */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg
                      viewBox="0 0 340 520"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,0 L340,0 L340,80 C200,140 120,80 0,160 Z"
                        fill="#4c1d95"
                        opacity="0.95"
                      />
                      <path
                        d="M0,160 C120,80 200,140 340,80 L340,140 C200,200 120,140 0,220 Z"
                        fill="#a855f7"
                        opacity="0.55"
                      />
                    </svg>
                  </div>

                  {/* Header */}
                  <div className="relative z-10 flex flex-col items-center pt-10">
                    <img
                      src={exp.companyLogo}
                      alt={exp.companyName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow bg-white"
                    />
                    <h3 className="mt-2 text-white text-lg font-bold tracking-wide uppercase">
                      {exp.companyName}
                    </h3>
                  </div>

                  {/* Details */}
                  <div className="relative z-10 px-8 mt-8 space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
                      <p className="leading-relaxed">
                        <strong>Role:</strong> {exp.position}
                        {exp.employmentType && ` • ${exp.employmentType}`}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
                      <p className="leading-relaxed">
                        <strong>Duration:</strong>{" "}
                        {new Date(exp.startDate).toLocaleDateString()} -{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : new Date(exp.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
                      <p className="leading-relaxed">
                        <strong>Location:</strong> {exp.location}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
                      <p className="leading-relaxed">
                        <strong>Status:</strong>{" "}
                        {exp.currentlyWorking ? "Currently Working" : "Completed"}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 rounded-full bg-purple-700 shrink-0" />
                      <p className="leading-relaxed line-clamp-4">
                        {exp.description}
                      </p>
                    </div>

                    {exp.technologies?.length > 0 && (
                      <div>
                        <p className="font-semibold text-purple-900 mb-1">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs border border-purple-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Flip hint */}
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
                {isFlipped ? "Click to flip back" : "Click to view details"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;