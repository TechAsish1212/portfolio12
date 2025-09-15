import React, { useEffect, useState } from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("about");
    const [isScrolled, setIsScrolled] = useState(false);

    const menuItems = [
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "projects", label: "Projects" },
        { id: "education", label: "Education" },
    ]

    const handleMenuClick = (id) => {
        setActiveSection(id);
        setIsOpen(false);

        // Scroll to section smoothly
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 duration-300 px-[7vw] md:px-[7vw] lg:px-[20vw] ${isScrolled ? "bg-[#050414] bg-opacity-50 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
            <div className='text-white py-5 flex justify-between items-center'>
                <div className=''>
                    <span className='text-[#8245ec]'>&lt;</span>
                    <span className='text-white'>Asish</span>
                    <span className='text-[#8245ec]'>/</span>
                    <span className='text-white'>Kumar</span>
                    <span className='text-[#8245ec]'>&gt;</span>
                </div>

                {/* desktop menu */}
                <ul className='hidden md:flex space-x-8 text-gray-300'>
                    {menuItems.map(item => (
                        <li key={item.id} className={`cursor-pointer hover:text-[#8245ec] ${activeSection === item.id ? "text-[#8245ec]" : ""}`}>
                            <button className='cursor-pointer' onClick={() => handleMenuClick(item.id)}>{item.label}</button>
                        </li>
                    ))}
                </ul>

                {/* socail icons */}
                <div className='hidden md:flex space-x-5'>
                    <a href="https://github.com/TechAsish1212"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-gray-300 hover:text-[#8245ec] transition-colors duration-300'
                    >
                        <FaGithub size={24} />
                    </a>
                    <a href="https://linkedin.com/in/asish12"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-gray-300 hover:text-[#8245ec] transition-colors duration-300'
                    >
                        <FaLinkedin size={24} />
                    </a>
                </div>

                {/* mobile icons */}
                <div className='md:hidden'>
                    {
                        isOpen ? (
                            <IoClose className="text-3xl text-[#8245ec] cursor-pointer"
                                onClick={() => setIsOpen(false)} />
                        ) : (
                            <MdOutlineMenu className="text-3xl text-[#8245ec] cursor-pointer"
                                onClick={() => setIsOpen(true)} />
                        )
                    }
                </div>
            </div>
            {isOpen && (
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-[#050414] bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden">
                    <ul className="flex flex-col items-center space-y-4 py-4 text-gray-300">
                        {menuItems.map((item) => (
                            <li
                                key={item.id}
                                className={`cursor-pointer hover:text-white ${activeSection === item.id ? "text-[#8245ec]" : ""
                                    }`}
                            >
                                <button onClick={() => handleMenuClick(item.id)}>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/TechAsish1212"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                            >
                                <FaGithub size={24} />
                            </a>
                            <a
                                href="https://linkedin.com/in/asish12"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                            >
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Header;
