// import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import { BsBoxArrowUpRight } from "react-icons/bs";
// import { motion } from "framer-motion";
// import { talkImg } from "../assets/hello";

// // Generate random stars
// const generateStars = (count = 80) => {
//     return Array.from({ length: count }).map(() => ({
//         x: Math.random() * 100 + "%",
//         y: Math.random() * 100 + "%",
//         size: Math.random() * 2 + 1,
//         delay: Math.random() * 2
//     }));
// };

// const ContactFormModal = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         subject: "",
//         message: ""
//     });
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [isSending, setIsSending] = useState(false);
//     const [stars] = useState(generateStars());

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSending(true);
//         try {
//             const response = await fetch("https://formspree.io/f/xwpqzjbn", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ ...formData, _replyto: formData.email }),
//             });

//             if (response.ok) {
//                 setIsSubmitted(true);
//                 setTimeout(() => {
//                     setFormData({ name: "", email: "", subject: "", message: "" });
//                     setIsSubmitted(false);
//                     onClose();
//                 }, 10000);
//             } else throw new Error("Failed to send message");
//         } catch (error) {
//             alert("Error sending message. Please try again later.");
//         } finally {
//             setIsSending(false);
//         }
//     };

//     return (
//         <motion.div
//             className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//         >
//             {/* Blinking stars in modal background */}
//             <div className="absolute inset-0">
//                 {stars.map((star, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute bg-white rounded-full"
//                         style={{
//                             left: star.x,
//                             top: star.y,
//                             width: star.size,
//                             height: star.size,
//                         }}
//                         animate={{ opacity: [0, 1, 0] }}
//                         transition={{
//                             duration: 1.5 + Math.random(), // slight random duration
//                             repeat: Infinity,
//                             delay: star.delay
//                         }}
//                     />
//                 ))}
//             </div>

//             <motion.div
//                 className="relative bg-[#1a1a2e] rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//             >
//                 <div className="flex flex-col md:flex-row">
//                     {/* Left Side */}
//                     <div className="hidden md:block md:w-1/3 bg-[#8245ec] p-8 flex flex-col items-center justify-center relative z-10">
//                         <img        
//                             src={talkImg}
//                             alt="Profile"
//                             className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-lg"
//                         />
//                         <h3 className="mt-6 text-white text-xl font-bold">Asish Kumar Bera</h3>
//                         <p className="text-white opacity-80 mt-2">Your message will be sent to:</p>
//                         <p className="text-white font-mono mt-1">berarebati7679@gmail.com</p>
//                         <p className="text-gray-400 mt-6 text-lg font-semibold text-center">
//                             Reach out today and let's discuss how I can help you achieve your goals.
//                         </p>
//                     </div>

//                     <div className="w-full md:w-2/3 p-8 relative z-10">
//                         <button
//                             onClick={onClose}
//                             className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 cursor-pointer"
//                         >
//                             <IoMdClose size={24} />
//                         </button>

//                         {isSubmitted ? (
//                             <div className="text-center py-12">
//                                 <h3 className="text-2xl text-[#8245ec] font-bold mb-4">Thank You!</h3>
//                                 <p className="text-gray-300">Your message has been sent successfully.</p>
//                                 <p className="text-gray-300 mt-2">I'll get back to you soon!</p>
//                             </div>
//                         ) : (
//                             <>
//                                 <h2 className="text-2xl font-bold text-white mb-6">
//                                     Get in Touch <BsBoxArrowUpRight className="inline-block ml-2 items-center mb-3" />
//                                 </h2>
//                                 <form onSubmit={handleSubmit}>
//                                     {["name", "email", "subject"].map((field) => (
//                                         <div className="mb-4" key={field}>
//                                             <label htmlFor={field} className="block text-gray-300 mb-2">
//                                                 {field.charAt(0).toUpperCase() + field.slice(1)}
//                                             </label>
//                                             <input
//                                                 type={field === "email" ? "email" : "text"}
//                                                 id={field}
//                                                 name={field}
//                                                 value={formData[field]}
//                                                 onChange={handleInputChange}
//                                                 className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
//                                                 required
//                                             />
//                                         </div>
//                                     ))}
//                                     <div className="mb-6">
//                                         <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
//                                         <textarea
//                                             id="message"
//                                             name="message"
//                                             value={formData.message}
//                                             onChange={handleInputChange}
//                                             rows="4"
//                                             className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
//                                             required
//                                         ></textarea>
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         className="w-full py-3 bg-[#8245ec] text-white font-semibold rounded-lg hover:bg-[#6f30d9] transition flex items-center justify-center cursor-pointer"
//                                         disabled={isSending}
//                                     >
//                                         {isSending ? "Sending..." : "Send Message"}
//                                     </button>
//                                 </form>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// export default ContactFormModal;



// import React, { useState, useEffect } from "react";
// import { IoMdClose } from "react-icons/io";
// import { BsBoxArrowUpRight } from "react-icons/bs";
// import { motion } from "framer-motion";

// const API = "https://portfolio12server.onrender.com/api/profile";
// const CONTACT_API = "https://portfolio12server.onrender.com/api/contact";

// // Generate random stars
// const generateStars = (count = 80) => {
//     return Array.from({ length: count }).map(() => ({
//         x: Math.random() * 100 + "%",
//         y: Math.random() * 100 + "%",
//         size: Math.random() * 2 + 1,
//         delay: Math.random() * 2
//     }));
// };

// const ContactFormModal = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         subject: "",
//         message: ""
//     });
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [isSending, setIsSending] = useState(false);
//     const [error, setError] = useState("");
//     const [stars] = useState(generateStars());
    
//     // State for profile data from API
//     const [profileData, setProfileData] = useState({
//         talkImg: "",
//         name: "Asish Kumar Bera",
//         email: "portfolio.p2019@gmail.com"
//     });
//     const [loading, setLoading] = useState(true);

//     // Fetch profile data from API
//     useEffect(() => {
//         const fetchProfileData = async () => {
//             try {
//                 const response = await fetch(API);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const result = await response.json();
                
//                 if (result.success && result.data) {
//                     setProfileData({
//                         talkImg: result.data.talkImg || "",
//                         name: result.data.name || "Asish Kumar Bera",
//                         email: "portfolio.p2019@gmail.com"
//                     });
//                 }
//             } catch (err) {
//                 console.error("Error fetching profile data:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfileData();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         // Clear error when user starts typing
//         if (error) setError("");
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSending(true);
//         setError("");
        
//         try {
//             const response = await fetch(CONTACT_API, {
//                 method: "POST",
//                 headers: { 
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (response.ok && data.success) {
//                 setIsSubmitted(true);
//                 // Reset form after successful submission
//                 setFormData({ name: "", email: "", subject: "", message: "" });
//                 // Close modal after 3 seconds
//                 setTimeout(() => {
//                     setIsSubmitted(false);
//                     onClose();
//                 }, 3000);
//             } else {
//                 throw new Error(data.message || "Failed to send message");
//             }
//         } catch (error) {
//             console.error("Error sending message:", error);
//             setError(error.message || "Error sending message. Please try again later.");
//         } finally {
//             setIsSending(false);
//         }
//     };

//     return (
//         <motion.div
//             className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={(e) => {
//                 if (e.target === e.currentTarget) {
//                     onClose();
//                 }
//             }}
//         >
//             {/* Blinking stars in modal background */}
//             <div className="absolute inset-0">
//                 {stars.map((star, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute bg-white rounded-full"
//                         style={{
//                             left: star.x,
//                             top: star.y,
//                             width: star.size,
//                             height: star.size,
//                         }}
//                         animate={{ opacity: [0, 1, 0] }}
//                         transition={{
//                             duration: 1.5 + Math.random(),
//                             repeat: Infinity,
//                             delay: star.delay
//                         }}
//                     />
//                 ))}
//             </div>

//             <motion.div
//                 className="relative bg-[#1a1a2e] rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
//                 initial={{ scale: 0.9, y: 20 }}
//                 animate={{ scale: 1, y: 0 }}
//                 exit={{ scale: 0.9, y: 20 }}
//             >
//                 <div className="flex flex-col md:flex-row">
//                     {/* Left Side */}
//                     <div className="hidden md:block md:w-1/3 bg-[#8245ec] p-8 flex flex-col items-center justify-center relative z-10">
//                         {!loading && profileData.talkImg && (
//                             <img        
//                                 src={profileData.talkImg}
//                                 alt="Profile"
//                                 className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-lg"
//                                 onError={(e) => {
//                                     e.target.src = 'https://via.placeholder.com/160x160?text=Profile';
//                                 }}
//                             />
//                         )}
//                         {loading && (
//                             <div className="rounded-full w-40 h-40 bg-purple-300 animate-pulse border-4 border-white shadow-lg"></div>
//                         )}
//                         <h3 className="mt-6 text-white text-xl font-bold">
//                             {loading ? "Loading..." : profileData.name}
//                         </h3>
//                         <p className="text-white opacity-80 mt-2">Your message will be sent to:</p>
//                         <p className="text-white font-mono mt-1">{profileData.email}</p>
//                         <p className="text-gray-400 mt-6 text-lg font-semibold text-center">
//                             Reach out today and let's discuss how I can help you achieve your goals.
//                         </p>
//                     </div>

//                     <div className="w-full md:w-2/3 p-8 relative z-10">
//                         <button
//                             onClick={onClose}
//                             className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 cursor-pointer"
//                         >
//                             <IoMdClose size={24} />
//                         </button>

//                         {isSubmitted ? (
//                             <div className="text-center py-12">
//                                 <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
//                                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                                     </svg>
//                                 </div>
//                                 <h3 className="text-2xl text-[#8245ec] font-bold mb-4">Thank You!</h3>
//                                 <p className="text-gray-300">Your message has been sent successfully.</p>
//                                 <p className="text-gray-300 mt-2">I'll get back to you soon!</p>
//                             </div>
//                         ) : (
//                             <>
//                                 <h2 className="text-2xl font-bold text-white mb-6">
//                                     Get in Touch <BsBoxArrowUpRight className="inline-block ml-2 items-center mb-3" />
//                                 </h2>
                                
//                                 {error && (
//                                     <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
//                                         <p className="text-red-500 text-sm">{error}</p>
//                                     </div>
//                                 )}
                                
//                                 <form onSubmit={handleSubmit}>
//                                     {["name", "email", "subject"].map((field) => (
//                                         <div className="mb-4" key={field}>
//                                             <label htmlFor={field} className="block text-gray-300 mb-2">
//                                                 {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
//                                             </label>
//                                             <input
//                                                 type={field === "email" ? "email" : "text"}
//                                                 id={field}
//                                                 name={field}
//                                                 value={formData[field]}
//                                                 onChange={handleInputChange}
//                                                 className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
//                                                 required
//                                                 disabled={isSending}
//                                             />
//                                         </div>
//                                     ))}
//                                     <div className="mb-6">
//                                         <label htmlFor="message" className="block text-gray-300 mb-2">
//                                             Message <span className="text-red-500">*</span>
//                                         </label>
//                                         <textarea
//                                             id="message"
//                                             name="message"
//                                             value={formData.message}
//                                             onChange={handleInputChange}
//                                             rows="4"
//                                             className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
//                                             required
//                                             disabled={isSending}
//                                         ></textarea>
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         className="w-full py-3 bg-[#8245ec] text-white font-semibold rounded-lg hover:bg-[#6f30d9] transition flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//                                         disabled={isSending}
//                                     >
//                                         {isSending ? (
//                                             <>
//                                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                 </svg>
//                                                 Sending...
//                                             </>
//                                         ) : "Send Message"}
//                                     </button>
//                                 </form>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// export default ContactFormModal;


// ------------
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { motion } from "framer-motion";

const API = "https://portfolio12server.onrender.com/api/profile";
const CONTACT_API = "https://portfolio12server.onrender.com/api/contact";

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
    const [error, setError] = useState("");
    const [stars] = useState(generateStars());
    
    // State for profile data from API
    const [profileData, setProfileData] = useState({
        talkImg: "",
        name: "Asish Kumar Bera",
        email: "portfolio.p2019@gmail.com"
    });
    const [loading, setLoading] = useState(true);

    // Fetch profile data from API
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                
                if (result.success && result.data) {
                    setProfileData({
                        talkImg: result.data.talkImg || "",
                        name: result.data.name || "Asish Kumar Bera",
                        email: "portfolio.p2019@gmail.com"
                    });
                }
            } catch (err) {
                console.error("Error fetching profile data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setError("");
        
        try {
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

            const response = await fetch(CONTACT_API, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Check if response is ok
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server response:", errorText);
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setIsSubmitted(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => {
                    setIsSubmitted(false);
                    onClose();
                }, 3000);
            } else {
                throw new Error(data.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Detailed error:", error);
            
            if (error.name === 'AbortError') {
                setError("Request timeout. The server might be waking up. Please try again in a moment.");
            } else if (error.message.includes("Failed to fetch") || error.message.includes("ENETUNREACH")) {
                setError("Cannot connect to server. Please ensure you're connected to the internet and try again.");
            } else if (error.message.includes("status: 404")) {
                setError("API endpoint not found. Please check if the server is running correctly.");
            } else if (error.message.includes("status: 500")) {
                setError("Server error. Please try again later or contact directly via email.");
            } else {
                setError(error.message || "Error sending message. Please try again later.");
            }
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
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
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
                        {!loading && profileData.talkImg && (
                            <img        
                                src={profileData.talkImg}
                                alt="Profile"
                                className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-lg"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/160x160?text=Profile';
                                }}
                            />
                        )}
                        {loading && (
                            <div className="rounded-full w-40 h-40 bg-purple-300 animate-pulse border-4 border-white shadow-lg"></div>
                        )}
                        <h3 className="mt-6 text-white text-xl font-bold">
                            {loading ? "Loading..." : profileData.name}
                        </h3>
                        <p className="text-white opacity-80 mt-2">Your message will be sent to:</p>
                        <p className="text-white font-mono mt-1">{profileData.email}</p>
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
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl text-[#8245ec] font-bold mb-4">Thank You!</h3>
                                <p className="text-gray-300">Your message has been sent successfully.</p>
                                <p className="text-gray-300 mt-2">I'll get back to you soon!</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    Get in Touch <BsBoxArrowUpRight className="inline-block ml-2 items-center mb-3" />
                                </h2>
                                
                                {error && (
                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
                                        <p className="text-red-500 text-sm">{error}</p>
                                        {error.includes("Cannot connect") && (
                                            <p className="text-gray-300 text-sm mt-2">
                                                Try refreshing the page or email me directly at:
                                                <a href="mailto:portfolio.p2019@gmail.com" className="text-[#8245ec] ml-1 underline">
                                                    portfolio.p2019@gmail.com
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                )}
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-300 mb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
                                            required
                                            disabled={isSending}
                                            placeholder="Your name"
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-300 mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
                                            required
                                            disabled={isSending}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="subject" className="block text-gray-300 mb-2">
                                            Subject <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
                                            required
                                            disabled={isSending}
                                            placeholder="Message subject"
                                        />
                                    </div>
                                    
                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-gray-300 mb-2">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full px-4 py-2 bg-[#16213e] border border-[#8245ec] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#8245ec]"
                                            required
                                            disabled={isSending}
                                            placeholder="Your message..."
                                        ></textarea>
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-[#8245ec] text-white font-semibold rounded-lg hover:bg-[#6f30d9] transition flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isSending}
                                    >
                                        {isSending ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : "Send Message"}
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
// ----------