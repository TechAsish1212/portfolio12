import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";

const API_URL = "https://portfolio12server.onrender.com/api/chat";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Asish's AI assistant. Ask me anything about his work, skills, or projects.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: "user", content: text };
    const next = [...messages, userMessage];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    const aiIndex = next.length;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setMessages((prev) => {
          const copy = [...prev];
          copy[aiIndex] = {
            role: "assistant",
            content:
              errData.error || "Sorry, something went wrong. Please try again.",
          };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) accumulated = parsed.error;
            else if (parsed.content) accumulated += parsed.content;

            setMessages((prev) => {
              const copy = [...prev];
              copy[aiIndex] = { role: "assistant", content: accumulated };
              return copy;
            });
          } catch (e) {
            // partial JSON, ignore
          }
        }
      }

      if (!accumulated) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[aiIndex] = {
            role: "assistant",
            content: "I didn't get a response. Please try again.",
          };
          return copy;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[aiIndex] = {
          role: "assistant",
          content: "Network error. Please try again in a moment.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center
                   rounded-full bg-[#8245ec] text-white
                   shadow-[0_0_25px_rgba(130,69,236,0.7)]
                   hover:shadow-[0_0_35px_rgba(130,69,236,0.9)]
                   transition-shadow cursor-pointer"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaTimes size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaCommentDots size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[9999] flex h-[500px] w-[340px] flex-col
                       overflow-hidden rounded-2xl
                       bg-[#0a0820]/95 backdrop-blur-md
                       border border-[#8245ec]/30
                       shadow-[0_0_40px_rgba(130,69,236,0.35)]
                       sm:w-[380px]
                       max-sm:left-3 max-sm:right-3 max-sm:w-auto"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#8245ec]/20 bg-gradient-to-r from-[#8245ec]/20 to-transparent px-4 py-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full
                                bg-[#8245ec] text-sm font-bold text-white
                                shadow-[0_0_15px_rgba(130,69,236,0.8)]">
                  A
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full
                                 bg-green-400 border-2 border-[#0a0820]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white leading-tight">
                  Asish's AI Assistant
                </p>
                <p className="text-xs text-gray-400">
                  Ask about my work, skills, projects
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1.5 text-gray-400 transition-colors
                           hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex flex-1 flex-col gap-3 overflow-y-auto p-4
                         [scrollbar-width:thin]
                         [&::-webkit-scrollbar]:w-1.5
                         [&::-webkit-scrollbar-thumb]:rounded-full
                         [&::-webkit-scrollbar-thumb]:bg-[#8245ec]/40
                         [&::-webkit-scrollbar-track]:bg-transparent"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl
                              px-3.5 py-2.5 text-sm leading-relaxed
                    ${
                      m.role === "user"
                        ? "self-end rounded-br-sm bg-[#8245ec] text-white shadow-[0_0_15px_rgba(130,69,236,0.4)]"
                        : "self-start rounded-bl-sm bg-white/5 text-gray-100 border border-white/10"
                    }`}
                >
                  {m.content ||
                    (m.role === "assistant" &&
                      loading &&
                      i === messages.length - 1 && (
                        <span className="inline-flex gap-1 py-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8245ec] [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8245ec] [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8245ec]" />
                        </span>
                      ))}
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-[#8245ec]/20 bg-black/30 px-3 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={loading}
                className="flex-1 rounded-xl bg-white/5 border border-white/10
                           px-3.5 py-2.5 text-sm text-white
                           outline-none placeholder:text-gray-500
                           focus:border-[#8245ec]/60 focus:ring-2 focus:ring-[#8245ec]/20
                           disabled:opacity-60 transition-all"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                           bg-[#8245ec] text-white
                           shadow-[0_0_15px_rgba(130,69,236,0.5)]
                           transition-all
                           hover:shadow-[0_0_25px_rgba(130,69,236,0.8)]
                           disabled:cursor-not-allowed disabled:opacity-40
                           disabled:shadow-none cursor-pointer"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}