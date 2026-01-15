import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { talkImg } from "../assets/hello";

// Generate random stars
const generateStars = (count = 80) => {
    return Array.from({ length: count }).map(() => ({
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2
    }));
};

const ContactFormModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [stars] = useState(generateStars());

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        try {
            const response = await fetch("https://formspree.io/f/xwpqzjbn", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, _replyto: formData.email }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setFormData({ name: "", email: "", subject: "", message: "" });
                    setIsSubmitted(false);
                    onClose();
                }, 10000);
            } else throw new Error("Failed to send message");
        } catch (error) {
            alert("Error sending message. Please try again later.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Blinking stars in modal background */}
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
                            duration: 1.5 + Math.random(), // slight random duration
                            repeat: Infinity,
                            delay: star.delay
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="relative bg-[#1a1a2e] rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Left Side */}
                    <div className="hidden md:block md:w-1/3 bg-[#8245ec] p-8 flex flex-col items-center justify-center relative z-10">
                        <img        
                            src={talkImg}
                            alt="Profile"
                            className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-lg"
                        />
                        <h3 className="mt-6 text-white text-xl font-bold">Asish Kumar Bera</h3>
                        <p className="text-white opacity-80 mt-2">Your message will be sent to:</p>
                        <p className="text-white font-mono mt-1">berarebati7679@gmail.com</p>
                        <p className="text-gray-400 mt-6 text-lg font-semibold text-center">
                            Reach out today and let's discuss how I can help you achieve your goals.
                        </p>
                    </div>

                    <div className="w-full md:w-2/3 p-8 relative z-10">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 cursor-pointer"
                        >
                            <IoMdClose size={24} />
                        </button>

                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <h3 className="text-2xl text-[#8245ec] font-bold mb-4">Thank You!</h3>
                                <p className="text-gray-300">Your message has been sent successfully.</p>
                                <p className="text-gray-300 mt-2">I'll get back to you soon!</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Get in Touch <BsBoxArrowUpRight className="inline-block ml-2 items-center mb-3" />
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    {["name", "email", "subject"].map((field) => (
                                        <div className="mb-4" key={field}>
                                            <label htmlFor={field} className="block text-gray-300 mb-2">
                                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                            </label>
                                            <input
                                                type={field === "email" ? "email" : "text"}
                                                id={field}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
                                                required
                                            />
                                        </div>
                                    ))}
                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-[#8245ec] text-white font-semibold rounded-lg hover:bg-[#6f30d9] transition flex items-center justify-center cursor-pointer"
                                        disabled={isSending}
                                    >
                                        {isSending ? "Sending..." : "Send Message"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ContactFormModal;
