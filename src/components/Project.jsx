        // import React, { useState, useEffect } from 'react';
        // import { projects } from '../assets/hello';
        // import { motion, useAnimation } from 'framer-motion';
        // import { useInView } from 'react-intersection-observer';

        // const Project = () => {
        //     const [selectedProject, setSelectedProject] = useState(null);
        //     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
        //     const controls = useAnimation();
        //     const [ref, inView] = useInView({
        //         triggerOnce: true,
        //         threshold: 0.1,
        //     });

        //     useEffect(() => {
        //         if (inView) {
        //             controls.start('visible');
        //         }
        //     }, [controls, inView]);

        //     useEffect(() => {
        //         const handleMouseMove = (e) => {
        //             setMousePosition({ x: e.clientX, y: e.clientY });
        //         };

        //         window.addEventListener('mousemove', handleMouseMove);

        //         return () => {
        //             window.removeEventListener('mousemove', handleMouseMove);
        //         };
        //     }, []);

        //     const handleOpenModel = (project) => {
        //         setSelectedProject(project);
        //         document.body.style.overflow = 'hidden';
        //     };

        //     const handleCloseButton = (project) => {
        //         setSelectedProject(null);
        //         document.body.style.overflow = 'auto';
        //     };

        //     const containerVariants = {
        //         hidden: { opacity: 0 },
        //         visible: {
        //             opacity: 1,
        //             transition: {
        //                 staggerChildren: 0.2,
        //                 delayChildren: 0.3,
        //             },
        //         },
        //     };

        //     const itemVariants = {
        //         hidden: { y: 20, opacity: 0 },
        //         visible: {
        //             y: 0,
        //             opacity: 1,
        //             transition: {
        //                 duration: 0.5,
        //                 ease: 'easeOut',
        //             },
        //         },
        //     };

        //     const calculateTransform = (element) => {
        //         if (!element) return { x: 0, y: 0 };

        //         const rect = element.getBoundingClientRect();
        //         const centerX = rect.left + rect.width / 2;
        //         const centerY = rect.top + rect.height / 2;

        //         return {
        //             x: (mousePosition.x - centerX) * 0.05,
        //             y: (mousePosition.y - centerY) * 0.05,
        //         };
        //     };

        //     return (
        //         <section
        //             id='projects'
        //             className='py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden'
        //             ref={ref}
        //         >
        //             <motion.div
        //                 className="hidden lg:block absolute inset-0 pointer-events-none"
        //                 animate={{
        //                     background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(130, 69, 236, 0.15), transparent 80%`
        //                 }}
        //                 transition={{ type: 'spring', damping: 30 }}
        //             />

        //             <motion.div
        //                 initial="hidden"
        //                 animate={controls}
        //                 variants={containerVariants}
        //             >
        //                 <motion.div variants={itemVariants} className='text-center mb-16'>
        //                     <h2 className='text-4xl font-bold text-center mb-7 text-white'>
        //                         My <span className='text-[#8245ec]'>Projects</span>
        //                     </h2>
        //                     <p className='text-gray-400 text-[18px] font-semibold'>
        //                         A showcase of the projects I have worked on, highlighting my skills and experience in various technologies
        //                     </p>
        //                 </motion.div>

        //                 <motion.div
        //                     variants={containerVariants}
        //                     className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'
        //                 >
        //                     {projects.map((project, index) => (
        //                         <motion.div
        //                             key={index}
        //                             variants={itemVariants}
        //                             whileHover={{ scale: 1.03 }}
        //                             whileTap={{ scale: 0.98 }}
        //                             onClick={() => handleOpenModel(project)}
        //                             className='border border-white bg-gray-900 rounded-2xl backdrop-blur-md shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 transition-all duration-300'
        //                             ref={(el) => {
        //                                 if (el) {
        //                                     const transform = calculateTransform(el);
        //                                     el.style.transform = `translate(${transform.x}px, ${transform.y}px)`;
        //                                 }
        //                             }}
        //                         >
        //                             <div className='p-4'>
        //                                 <img
        //                                     src={project.image}
        //                                     alt={project.title}
        //                                     className='w-full h-auto object-cover rounded-xl'
        //                                 />
        //                             </div>
        //                             <div className='p-3'>
        //                                 <h3 className='text-[14px] font-semibold text-white mb-2'>
        //                                     {project.title}
        //                                 </h3>
        //                                 <p className='text-gray-400 text-[14px] mb-4 line-clamp-3'>
        //                                     {project.description}
        //                                 </p>
        //                                 <div className='mb-3'>
        //                                     {project.tags.map((tag, tagIndex) => (
        //                                         <span
        //                                             key={tagIndex}
        //                                             className='inline-block bg-[#251f38] text-xs font-semibold rounded-md text-purple-500 px-2 py-1 mb-2 text-[12px] mr-2'
        //                                         >
        //                                             {tag}
        //                                         </span>
        //                                     ))}
        //                                 </div>
        //                             </div>
        //                         </motion.div>
        //                     ))}
        //                 </motion.div>
        //             </motion.div>

        //             {selectedProject && (
        //                 <motion.div
        //                     initial={{ opacity: 0 }}
        //                     animate={{ opacity: 1 }}
        //                     exit={{ opacity: 0 }}
        //                     transition={{ duration: 0.3 }}
        //                     className='fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-90 p-4 overflow-y-auto'
        //                 >
        //                     <motion.div
        //                         initial={{ scale: 0.9, opacity: 0 }}
        //                         animate={{ scale: 1, opacity: 1 }}
        //                         exit={{ scale: 0.9, opacity: 0 }}
        //                         transition={{ type: 'spring', damping: 25 }}
        //                         className='bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl mx-auto my-8 relative'
        //                     >
        //                         {/* Close Button - Fixed Position */}
        //                         <button
        //                             onClick={handleCloseButton}
        //                             className='absolute -top-3 -right-3 z-50 bg-[#8245ec] hover:bg-purple-700 text-white 
        //                 rounded-full w-10 h-10 flex items-center justify-center shadow-lg
        //                 transition-all duration-300 hover:scale-110 cursor-pointer'
        //                         >
        //                             <span className='text-2xl font-bold'>&times;</span>
        //                         </button>

        //                         <div className='flex flex-col'>
        //                             <motion.div
        //                                 initial={{ opacity: 0, y: -20 }}
        //                                 animate={{ opacity: 1, y: 0 }}
        //                                 transition={{ delay: 0.2 }}
        //                                 className='w-full flex justify-center bg-gray-900 px-4 pt-8'
        //                             >
        //                                 <img
        //                                     src={selectedProject.image}
        //                                     alt={selectedProject.title}
        //                                     className='w-full max-h-[400px] object-contain rounded-xl shadow-2xl'
        //                                 />
        //                             </motion.div>
        //                             <motion.div
        //                                 initial={{ opacity: 0, y: 20 }}
        //                                 animate={{ opacity: 1, y: 0 }}
        //                                 transition={{ delay: 0.3 }}
        //                                 className='p-6 lg:p-8'
        //                             >
        //                                 <h3 className='text-white font-semibold mb-4 text-2xl lg:text-3xl'>
        //                                     {selectedProject.title}
        //                                 </h3>
        //                                 <p className='text-gray-400 mb-6 text-sm lg:text-base'>
        //                                     {selectedProject.description}
        //                                 </p>
        //                                 <motion.div
        //                                     initial={{ opacity: 0 }}
        //                                     animate={{ opacity: 1 }}
        //                                     transition={{ delay: 0.4 }}
        //                                     className='flex flex-wrap gap-2 mb-6'
        //                                 >
        //                                     {selectedProject.tags.map((tag, tagIndex) => (
        //                                         <span
        //                                             key={tagIndex}
        //                                             className='bg-[#251f38] text-xs font-semibold rounded-md text-purple-500 px-2 py-1'
        //                                         >
        //                                             {tag}
        //                                         </span>
        //                                     ))}
        //                                 </motion.div>
        //                                 <motion.div
        //                                     initial={{ opacity: 0 }}
        //                                     animate={{ opacity: 1 }}
        //                                     transition={{ delay: 0.5 }}
        //                                     className='flex flex-col sm:flex-row gap-4'
        //                                 >
        //                                     <a
        //                                         href={selectedProject.github}
        //                                         target='_blank'
        //                                         rel='noopener noreferrer'
        //                                         className='flex-1 bg-gray-800 hover:bg-purple-800 text-white 
        //                             px-4 py-2 rounded-xl text-sm lg:text-base font-semibold text-center
        //                             transition-colors duration-300'
        //                                     >
        //                                         View Code
        //                                     </a>
        //                                     <a
        //                                         href={selectedProject.webapp}
        //                                         target='_blank'
        //                                         rel='noopener noreferrer'
        //                                         className='flex-1 bg-purple-800 hover:bg-purple-900 text-white 
        //                             px-4 py-2 rounded-xl text-sm lg:text-base font-semibold text-center
        //                             transition-colors duration-300'
        //                                     >
        //                                         View Live
        //                                     </a>
        //                                 </motion.div>
        //                             </motion.div>
        //                         </div>
        //                     </motion.div>
        //                 </motion.div>
        //             )}
        //         </section>
        //     );
        // };

        // export default Project;

// ----------------------------------
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const API = "https://portfolio12server.onrender.com/api/project";

const Project = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Fetch projects from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                
                // Handle the specific response format: { success: true, data: [...] }
                let projectsArray = [];
                if (result.success && Array.isArray(result.data)) {
                    projectsArray = result.data;
                } else if (Array.isArray(result)) {
                    projectsArray = result;
                } else {
                    console.error('Unexpected data format:', result);
                    projectsArray = [];
                }
                
                setProjects(projectsArray);
                setError(null);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError("Failed to load projects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleOpenModel = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseButton = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const calculateTransform = (element) => {
        if (!element) return { x: 0, y: 0 };

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        return {
            x: (mousePosition.x - centerX) * 0.05,
            y: (mousePosition.y - centerY) * 0.05,
        };
    };

    // Loading state
    if (loading) {
        return (
            <section
                id='projects'
                className='py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden min-h-screen flex items-center justify-center'
            >
                <div className='text-center'>
                    <div className='inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4'></div>
                    <p className='text-gray-400'>Loading projects...</p>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section
                id='projects'
                className='py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden min-h-screen flex items-center justify-center'
            >
                <div className='text-center'>
                    <div className='text-red-500 text-5xl mb-4'>⚠️</div>
                    <p className='text-red-400 mb-4'>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors'
                    >
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section
            id='projects'
            className='py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden'
            ref={ref}
        >
            <motion.div
                className="hidden lg:block absolute inset-0 pointer-events-none"
                animate={{
                    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(130, 69, 236, 0.15), transparent 80%`
                }}
                transition={{ type: 'spring', damping: 30 }}
            />

            <motion.div
                initial="hidden"
                animate={controls}
                variants={containerVariants}
            >
                <motion.div variants={itemVariants} className='text-center mb-16'>
                    <h2 className='text-4xl font-bold text-center mb-7 text-white'>
                        My <span className='text-[#8245ec]'>Projects</span>
                    </h2>
                    <p className='text-gray-400 text-[18px] font-semibold'>
                        A showcase of the projects I have worked on, highlighting my skills and experience in various technologies
                    </p>
                </motion.div>

                {projects.length === 0 ? (
                    <motion.div 
                        variants={itemVariants}
                        className='text-center text-gray-400 py-12'
                    >
                        No projects found.
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id || index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOpenModel(project)}
                                className='border border-white bg-gray-900 rounded-2xl backdrop-blur-md shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 transition-all duration-300'
                                ref={(el) => {
                                    if (el) {
                                        const transform = calculateTransform(el);
                                        el.style.transform = `translate(${transform.x}px, ${transform.y}px)`;
                                    }
                                }}
                            >
                                <div className='p-4'>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className='w-full h-auto object-cover rounded-xl'
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                        }}
                                    />
                                </div>
                                <div className='p-3'>
                                    <h3 className='text-[14px] font-semibold text-white mb-2'>
                                        {project.title}
                                    </h3>
                                    <p className='text-gray-400 text-[14px] mb-4 line-clamp-3'>
                                        {project.description}
                                    </p>
                                    <div className='mb-3'>
                                        {project.tags && project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className='inline-block bg-[#251f38] text-xs font-semibold rounded-md text-purple-500 px-2 py-1 mb-2 text-[12px] mr-2'
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </motion.div>

            {selectedProject && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-90 p-4 overflow-y-auto'
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handleCloseButton();
                        }
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className='bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl mx-auto my-8 relative'
                    >
                        {/* Close Button - Fixed Position */}
                        <button
                            onClick={handleCloseButton}
                            className='absolute -top-3 -right-3 z-50 bg-[#8245ec] hover:bg-purple-700 text-white 
                    rounded-full w-10 h-10 flex items-center justify-center shadow-lg
                    transition-all duration-300 hover:scale-110 cursor-pointer'
                        >
                            <span className='text-2xl font-bold'>&times;</span>
                        </button>

                        <div className='flex flex-col'>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className='w-full flex justify-center bg-gray-900 px-4 pt-8'
                            >
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className='w-full max-h-[400px] object-contain rounded-xl shadow-2xl'
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                                    }}
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className='p-6 lg:p-8'
                            >
                                <h3 className='text-white font-semibold mb-4 text-2xl lg:text-3xl'>
                                    {selectedProject.title}
                                </h3>
                                <p className='text-gray-400 mb-6 text-sm lg:text-base'>
                                    {selectedProject.description}
                                </p>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className='flex flex-wrap gap-2 mb-6'
                                >
                                    {selectedProject.tags && selectedProject.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className='bg-[#251f38] text-xs font-semibold rounded-md text-purple-500 px-2 py-1'
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className='flex flex-col sm:flex-row gap-4'
                                >
                                    <a
                                        href={selectedProject.github}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex-1 bg-gray-800 hover:bg-purple-800 text-white 
                                px-4 py-2 rounded-xl text-sm lg:text-base font-semibold text-center
                                transition-colors duration-300'
                                    >
                                        View Code
                                    </a>
                                    <a
                                        href={selectedProject.webapp}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex-1 bg-purple-800 hover:bg-purple-900 text-white 
                                px-4 py-2 rounded-xl text-sm lg:text-base font-semibold text-center
                                transition-colors duration-300'
                                    >
                                        View Live
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};

export default Project;
// ---------------------------------


// import React, { useState, useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import axios from 'axios';

// const API = "https://portfolio12server.onrender.com/api/project";

// const Project = () => {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedProject, setSelectedProject] = useState(null);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//     const controls = useAnimation();
//     const [ref, inView] = useInView({
//         triggerOnce: true,
//         threshold: 0.1,
//     });

//     // ✅ Fetch Projects from Backend
//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const res = await axios.get(API);
//                 setProjects(res.data.data);
//             } catch (error) {
//                 console.log("Project fetch error:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjects();
//     }, []);

//     // Animation trigger
//     useEffect(() => {
//         if (inView) {
//             controls.start('visible');
//         }
//     }, [controls, inView]);

//     // Mouse glow effect
//     useEffect(() => {
//         const handleMouseMove = (e) => {
//             setMousePosition({ x: e.clientX, y: e.clientY });
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         return () => window.removeEventListener('mousemove', handleMouseMove);
//     }, []);

//     const handleOpenModel = (project) => {
//         setSelectedProject(project);
//         document.body.style.overflow = 'hidden';
//     };

//     const handleCloseButton = () => {
//         setSelectedProject(null);
//         document.body.style.overflow = 'auto';
//     };

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2,
//                 delayChildren: 0.3,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 duration: 0.5,
//                 ease: 'easeOut',
//             },
//         },
//     };

//     const calculateTransform = (element) => {
//         if (!element) return { x: 0, y: 0 };

//         const rect = element.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;

//         return {
//             x: (mousePosition.x - centerX) * 0.05,
//             y: (mousePosition.y - centerY) * 0.05,
//         };
//     };

//     return (
//         <section
//             id='projects'
//             className='py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden'
//             ref={ref}
//         >
//             {/* Background Glow */}
//             <motion.div
//                 className="hidden lg:block absolute inset-0 pointer-events-none"
//                 animate={{
//                     background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(130, 69, 236, 0.15), transparent 80%)`
//                 }}
//                 transition={{ type: 'spring', damping: 30 }}
//             />

//             <motion.div initial="hidden" animate={controls} variants={containerVariants}>

//                 {/* Heading */}
//                 <motion.div variants={itemVariants} className='text-center mb-16'>
//                     <h2 className='text-4xl font-bold text-white'>
//                         My <span className='text-[#8245ec]'>Projects</span>
//                     </h2>
//                     <p className='text-gray-400 mt-3'>
//                         A showcase of my work and skills
//                     </p>
//                 </motion.div>

//                 {/* Projects */}
//                 <motion.div
//                     variants={containerVariants}
//                     className='grid grid-cols-1 md:grid-cols-2 gap-8'
//                 >
//                     {loading ? (
//                         <p className="text-gray-400 col-span-2 text-center">
//                             Loading projects...
//                         </p>
//                     ) : (
//                         projects.map((project) => (
//                             <motion.div
//                                 key={project._id}
//                                 variants={itemVariants}
//                                 whileHover={{ scale: 1.03 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 onClick={() => handleOpenModel(project)}
//                                 className='border border-white bg-gray-900 rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 transition-all duration-300'
//                                 ref={(el) => {
//                                     if (el) {
//                                         const transform = calculateTransform(el);
//                                         el.style.transform = `translate(${transform.x}px, ${transform.y}px)`;
//                                     }
//                                 }}
//                             >
//                                 <div className='p-4'>
//                                     <img
//                                         src={project.image}
//                                         alt={project.title}
//                                         className='w-full rounded-xl'
//                                     />
//                                 </div>

//                                 <div className='p-3'>
//                                     <h3 className='text-white font-semibold mb-2'>
//                                         {project.title}
//                                     </h3>

//                                     <p className='text-gray-400 text-sm mb-3 line-clamp-3'>
//                                         {project.description}
//                                     </p>

//                                     <div>
//                                         {project.tags?.map((tag, i) => (
//                                             <span
//                                                 key={i}
//                                                 className='inline-block bg-[#251f38] text-purple-400 text-xs px-2 py-1 rounded mr-2 mb-2'
//                                             >
//                                                 {tag}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))
//                     )}
//                 </motion.div>
//             </motion.div>

//             {/* Modal */}
//             {selectedProject && (
//                 <motion.div
//                     className='fixed inset-0 bg-black/90 flex justify-center items-start z-50 p-4 overflow-y-auto'
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                 >
//                     <motion.div
//                         className='bg-gray-900 rounded-xl max-w-3xl w-full relative my-10'
//                         initial={{ scale: 0.9 }}
//                         animate={{ scale: 1 }}
//                     >
//                         {/* Close */}
//                         <button
//                             onClick={handleCloseButton}
//                             className='absolute -top-3 -right-3 bg-purple-600 w-10 h-10 rounded-full text-white text-xl'
//                         >
//                             ×
//                         </button>

//                         <div className='p-6'>
//                             <img
//                                 src={selectedProject.image}
//                                 alt={selectedProject.title}
//                                 className='w-full rounded-xl mb-6'
//                             />

//                             <h3 className='text-2xl text-white mb-3'>
//                                 {selectedProject.title}
//                             </h3>

//                             <p className='text-gray-400 mb-4'>
//                                 {selectedProject.description}
//                             </p>

//                             <div className='flex flex-wrap gap-2 mb-6'>
//                                 {selectedProject.tags?.map((tag, i) => (
//                                     <span
//                                         key={i}
//                                         className='bg-[#251f38] text-purple-400 text-xs px-2 py-1 rounded'
//                                     >
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div>

//                             <div className='flex gap-4'>
//                                 <a
//                                     href={selectedProject.github}
//                                     target='_blank'
//                                     rel='noopener noreferrer'
//                                     className='flex-1 bg-gray-800 text-white px-4 py-2 rounded text-center'
//                                 >
//                                     View Code
//                                 </a>

//                                 <a
//                                     href={selectedProject.webapp}
//                                     target='_blank'
//                                     rel='noopener noreferrer'
//                                     className='flex-1 bg-purple-700 text-white px-4 py-2 rounded text-center'
//                                 >
//                                     View Live
//                                 </a>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </section>
//     );
// };

// export default Project;




// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import axios from 'axios';

// const API = "https://portfolio12server.onrender.com/api/project";

// // --- Helper Components ---
// const LazyImage = ({ src, alt, className }) => {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const imgRef = useRef();

//   useEffect(() => {
//     // Use Intersection Observer to lazy load images
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           setImageSrc(src);
//           observer.unobserve(entry.target);
//         }
//       });
//     }, { rootMargin: '200px' }); // Start loading when 200px before viewport

//     if (imgRef.current) {
//       observer.observe(imgRef.current);
//     }

//     return () => {
//       if (imgRef.current) observer.unobserve(imgRef.current);
//     };
//   }, [src]);

//   const handleLoad = () => {
//     setIsLoading(false);
//   };

//   const handleError = () => {
//     setIsLoading(false);
//     setHasError(true);
//     console.error(`Failed to load image: ${src}`);
//   };

//   return (
//     <div ref={imgRef} className={`relative ${className}`}>
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-xl">
//           <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}
//       {hasError ? (
//         <div className="w-full h-48 bg-gray-800 rounded-xl flex items-center justify-center">
//           <span className="text-gray-400">Image unavailable</span>
//         </div>
//       ) : (
//         imageSrc && (
//           <img
//             src={imageSrc}
//             alt={alt}
//             onLoad={handleLoad}
//             onError={handleError}
//             className={`w-full h-auto rounded-xl transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
//           />
//         )
//       )}
//     </div>
//   );
// };

// // --- Main Component ---
// const Project = () => {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedProject, setSelectedProject] = useState(null);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//     const [imageErrors, setImageErrors] = useState({});

//     const controls = useAnimation();
//     const [ref, inView] = useInView({
//         triggerOnce: true,
//         threshold: 0.1,
//     });

//     // Fetch Projects from Backend
//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const res = await axios.get(API, { timeout: 10000 }); // 10s timeout
                
//                 // Validate response structure
//                 if (res.data && Array.isArray(res.data.data)) {
//                     // Filter out projects with missing critical fields
//                     const validProjects = res.data.data.filter(project => 
//                         project._id && project.title && project.image
//                     );
//                     setProjects(validProjects);
//                     if (validProjects.length === 0) {
//                         setError('No valid projects found');
//                     }
//                 } else {
//                     throw new Error('Invalid API response format');
//                 }
//             } catch (error) {
//                 console.error("Project fetch error:", error);
//                 if (error.code === 'ECONNABORTED') {
//                     setError('Request timeout. Please check your connection.');
//                 } else if (error.response) {
//                     setError(`Server error: ${error.response.status}`);
//                 } else if (error.request) {
//                     setError('Network error. Cannot reach the server.');
//                 } else {
//                     setError('Failed to load projects. Please try again later.');
//                 }
//                 // Fallback to local demo data if needed
//                 setProjects([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjects();
//     }, []);

//     // Animation trigger
//     useEffect(() => {
//         if (inView) {
//             controls.start('visible');
//         }
//     }, [controls, inView]);

//     // Optimized mouse glow effect
//     useEffect(() => {
//         let rafId = null;
//         const handleMouseMove = (e) => {
//             if (rafId) cancelAnimationFrame(rafId);
//             rafId = requestAnimationFrame(() => {
//                 setMousePosition({ x: e.clientX, y: e.clientY });
//             });
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//             if (rafId) cancelAnimationFrame(rafId);
//         };
//     }, []);

//     const handleOpenModal = useCallback((project) => {
//         setSelectedProject(project);
//         document.body.style.overflow = 'hidden';
//     }, []);

//     const handleCloseModal = useCallback(() => {
//         setSelectedProject(null);
//         document.body.style.overflow = 'auto';
//     }, []);

//     // Handle escape key for modal
//     useEffect(() => {
//         const handleEscape = (e) => {
//             if (e.key === 'Escape' && selectedProject) {
//                 handleCloseModal();
//             }
//         };
//         window.addEventListener('keydown', handleEscape);
//         return () => window.removeEventListener('keydown', handleEscape);
//     }, [selectedProject, handleCloseModal]);

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2,
//                 delayChildren: 0.3,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 duration: 0.5,
//                 ease: 'easeOut',
//             },
//         },
//     };

//     // Safe image URL with fallback
//     const getSafeImageUrl = (url) => {
//         if (!url) return null;
//         // Validate URL format
//         try {
//             new URL(url);
//             return url;
//         } catch {
//             return null;
//         }
//     };

//     return (
//         <section
//             id='projects'
//             className='py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden'
//             ref={ref}
//         >
//             {/* Background Glow - Optimized with will-change */}
//             <motion.div
//                 className="hidden lg:block absolute inset-0 pointer-events-none will-change-transform"
//                 animate={{
//                     background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(130, 69, 236, 0.15), transparent 80%)`
//                 }}
//                 transition={{ type: 'spring', damping: 30, stiffness: 200 }}
//             />

//             <motion.div initial="hidden" animate={controls} variants={containerVariants}>

//                 {/* Heading */}
//                 <motion.div variants={itemVariants} className='text-center mb-16'>
//                     <h2 className='text-4xl font-bold text-white'>
//                         My <span className='text-[#8245ec]'>Projects</span>
//                     </h2>
//                     <p className='text-gray-400 mt-3'>
//                         A showcase of my work and skills
//                     </p>
//                 </motion.div>

//                 {/* Projects Grid */}
//                 <motion.div
//                     variants={containerVariants}
//                     className='grid grid-cols-1 md:grid-cols-2 gap-8'
//                 >
//                     {loading ? (
//                         <div className="col-span-2 flex flex-col items-center justify-center py-12">
//                             <div className="w-12 h-12 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
//                             <p className="text-gray-400 mt-4">Loading projects...</p>
//                         </div>
//                     ) : error ? (
//                         <div className="col-span-2 text-center py-12">
//                             <p className="text-red-400 mb-4">{error}</p>
//                             <button
//                                 onClick={() => window.location.reload()}
//                                 className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//                             >
//                                 Retry
//                             </button>
//                         </div>
//                     ) : projects.length === 0 ? (
//                         <div className="col-span-2 text-center py-12">
//                             <p className="text-gray-400">No projects available at the moment.</p>
//                         </div>
//                     ) : (
//                         projects.map((project) => (
//                             <motion.div
//                                 key={project._id}
//                                 variants={itemVariants}
//                                 whileHover={{ scale: 1.03 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 onClick={() => handleOpenModal(project)}
//                                 className='border border-white/10 bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/30 transition-all duration-300 hover:border-purple-500/30'
//                             >
//                                 <div className='p-4'>
//                                     <LazyImage
//                                         src={getSafeImageUrl(project.image)}
//                                         alt={project.title}
//                                         className='w-full rounded-xl overflow-hidden'
//                                     />
//                                 </div>

//                                 <div className='p-5 pt-0'>
//                                     <h3 className='text-white font-semibold mb-2 text-lg'>
//                                         {project.title}
//                                     </h3>

//                                     <p className='text-gray-400 text-sm mb-3 line-clamp-3'>
//                                         {project.description || 'No description available'}
//                                     </p>

//                                     <div className='flex flex-wrap gap-2'>
//                                         {project.tags?.slice(0, 4).map((tag, i) => (
//                                             <span
//                                                 key={`${project._id}-tag-${i}`}
//                                                 className='inline-block bg-[#251f38] text-purple-400 text-xs px-2 py-1 rounded'
//                                             >
//                                                 {tag}
//                                             </span>
//                                         ))}
//                                         {project.tags?.length > 4 && (
//                                             <span className='inline-block bg-[#251f38] text-purple-400 text-xs px-2 py-1 rounded'>
//                                                 +{project.tags.length - 4}
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))
//                     )}
//                 </motion.div>
//             </motion.div>

//             {/* Modal - Improved with focus trap and better accessibility */}
//             {selectedProject && (
//                 <motion.div
//                     className='fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-start z-50 p-4 overflow-y-auto'
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onClick={handleCloseModal}
//                     role="dialog"
//                     aria-modal="true"
//                     aria-labelledby="modal-title"
//                 >
//                     <motion.div
//                         className='bg-gray-900 rounded-xl max-w-3xl w-full relative my-10 mx-auto'
//                         initial={{ scale: 0.9, y: 20 }}
//                         animate={{ scale: 1, y: 0 }}
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         {/* Close button */}
//                         <button
//                             onClick={handleCloseModal}
//                             className='absolute -top-3 -right-3 bg-purple-600 w-10 h-10 rounded-full text-white text-xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400'
//                             aria-label="Close modal"
//                         >
//                             ×
//                         </button>

//                         <div className='p-6'>
//                             {/* Modal Image */}
//                             <div className='rounded-xl overflow-hidden bg-gray-800'>
//                                 <img
//                                     src={getSafeImageUrl(selectedProject.image) || '/placeholder-image.png'}
//                                     alt={selectedProject.title}
//                                     className='w-full h-auto max-h-80 object-contain'
//                                     onError={(e) => {
//                                         e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="1"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpath d="M21 15l-5-4-3 3-4-4-6 6"%3E%3C/path%3E%3C/svg%3E';
//                                     }}
//                                 />
//                             </div>

//                             <h3 id="modal-title" className='text-2xl text-white mt-6 mb-3 font-bold'>
//                                 {selectedProject.title}
//                             </h3>

//                             <p className='text-gray-400 mb-4 leading-relaxed'>
//                                 {selectedProject.description || 'No description available'}
//                             </p>

//                             <div className='flex flex-wrap gap-2 mb-6'>
//                                 {selectedProject.tags?.map((tag, i) => (
//                                     <span
//                                         key={`modal-tag-${i}`}
//                                         className='bg-[#251f38] text-purple-400 text-xs px-2 py-1 rounded'
//                                     >
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div>

//                             <div className='flex flex-col sm:flex-row gap-4'>
//                                 {selectedProject.github && (
//                                     <a
//                                         href={selectedProject.github}
//                                         target='_blank'
//                                         rel='noopener noreferrer'
//                                         className='flex-1 bg-gray-800 text-white px-4 py-2 rounded text-center hover:bg-gray-700 transition-colors'
//                                     >
//                                         View Code
//                                     </a>
//                                 )}
//                                 {selectedProject.webapp && (
//                                     <a
//                                         href={selectedProject.webapp}
//                                         target='_blank'
//                                         rel='noopener noreferrer'
//                                         className='flex-1 bg-purple-700 text-white px-4 py-2 rounded text-center hover:bg-purple-600 transition-colors'
//                                     >
//                                         View Live
//                                     </a>
//                                 )}
//                                 {!selectedProject.github && !selectedProject.webapp && (
//                                     <p className='text-gray-500 text-center w-full'>No links available</p>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </section>
//     );
// };

// export default Project;