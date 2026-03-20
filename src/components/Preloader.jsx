// // Preloader.jsx
// import React, { useEffect, useState } from "react";

// const text = "<Asish/kumar>";

// const Preloader = ({ onFinish }) => {
//   const [displayText, setDisplayText] = useState("");
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     let index = 0;

//     const typing = setInterval(() => {
//       setDisplayText(text.slice(0, index + 1));
//       index++;

//       if (index === text.length) {
//         clearInterval(typing);

//         // wait then fade out
//         setTimeout(() => {
//           setFadeOut(true);

//           // remove preloader after fade
//           setTimeout(() => {
//             onFinish();
//           }, 800);
//         }, 800);
//       }
//     }, 100);

//     return () => clearInterval(typing);
//   }, [onFinish]);

//   return (
//     <div
//       className={`fixed inset-0 flex items-center justify-center bg-[#050414] z-[9999] transition-opacity duration-700 ${
//         fadeOut ? "opacity-0" : "opacity-100"
//       }`}
//     >
//       <h1 className="text-3xl md:text-5xl font-mono tracking-widest">
//         <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]">
//           {displayText}
//         </span>
//         <span className="text-sky-400 animate-pulse ml-1">|</span>
//       </h1>
//     </div>
//   );
// };

// export default Preloader;

// Preloader.jsx
import React, { useEffect, useState } from "react";

const text = "<Asish/kumar>";

const Preloader = ({ onFinish }) => {
  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(typing);

        // trigger particle burst
        setDone(true);

        setTimeout(() => {
          setFadeOut(true);

          setTimeout(() => {
            onFinish();
          }, 800);
        }, 1200);
      }
    }, 90);

    return () => clearInterval(typing);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-[#050414] z-[9999] transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] bg-sky-500/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Particle Burst */}
      {done &&
        Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-sky-400 rounded-full"
            style={{
              transform: `rotate(${i * 18}deg) translateY(-80px)`,
              animation: `burst 0.8s ease-out forwards`,
            }}
          />
        ))}

      {/* Text */}
      <h1 className="text-3xl md:text-5xl font-mono tracking-widest relative">
        <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(56,189,248,0.8)] animate-[float_3s_ease-in-out_infinite]">
          {displayText}
        </span>
        <span className="text-sky-400 animate-pulse ml-1">|</span>
      </h1>

      {/* Inline Tailwind Animations */}
      <style>
        {`
          @keyframes float {
            0%,100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes burst {
            0% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
            100% {
              opacity: 0;
              transform: scale(2) translateY(-120px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Preloader;