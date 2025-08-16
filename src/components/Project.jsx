import React, { useState, useEffect } from 'react';
import { projects } from '../assets/hello';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Project = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

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

    const handleCloseButton = (project) => {
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

                <motion.div
                    variants={containerVariants}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
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
                                    {project.tags.map((tag, tagIndex) => (
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
            </motion.div>

            {selectedProject && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-90 p-4 overflow-y-auto'
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
                transition-all duration-300 hover:scale-110'
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
                                    {selectedProject.tags.map((tag, tagIndex) => (
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