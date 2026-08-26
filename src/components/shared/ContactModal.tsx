"use client";

import { useEffect, useActionState, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContactInquiry } from "@/app/actions";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [state, formAction, isPending] = useActionState(submitContactInquiry, null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#262626]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="relative w-full max-w-[520px] bg-[#FCFAF7] border border-[#E8E1D7] rounded-3xl p-6 md:p-10 shadow-xl z-10 overflow-y-auto max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-[#6D6D6D] hover:text-[#262626] rounded-full hover:bg-[#E8E1D7]/30 transition-colors duration-200 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {state?.success ? (
              <div className="text-center py-8">
                <p className="font-serif text-2xl text-[#262626] mb-3">Thank you.</p>
                <p className="font-sans text-sm text-[#6D6D6D] mb-6">
                  Your message has been received peacefully. We will get back to you soon.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center min-h-[44px] px-8 font-sans text-xs tracking-wider uppercase font-semibold bg-[#262626] text-[#FCFAF7] rounded-xl hover:bg-[#D79B42] transition-colors duration-300 cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <h2 id="modal-title" className="font-serif text-2xl md:text-3xl font-light text-[#262626] mb-2">
                    Get in touch.
                  </h2>
                  <p className="font-sans text-xs text-[#6D6D6D] leading-relaxed max-w-[360px] mx-auto">
                    Send a message and we will get back to you peacefully soon.
                  </p>
                </div>

                <form action={formAction} className="space-y-6">
                  {state?.error && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-sans text-center">
                      {state.error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="modal-name" className="block font-sans text-[10px] tracking-widest uppercase text-[#6D6D6D] font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      required
                      disabled={isPending}
                      className="w-full bg-transparent border-b border-[#E8E1D7] py-2 text-[#262626] font-sans text-base focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="modal-email" className="block font-sans text-[10px] tracking-widest uppercase text-[#6D6D6D] font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      required
                      disabled={isPending}
                      className="w-full bg-transparent border-b border-[#E8E1D7] py-2 text-[#262626] font-sans text-base focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="modal-message" className="block font-sans text-[10px] tracking-widest uppercase text-[#6D6D6D] font-medium">
                      Message
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      required
                      rows={4}
                      disabled={isPending}
                      className="w-full bg-transparent border-b border-[#E8E1D7] py-2 text-[#262626] font-sans text-base resize-none focus:outline-none focus:border-[#D79B42] transition-colors duration-300 disabled:opacity-50"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex items-center justify-center min-h-[48px] px-10 font-sans text-xs tracking-wider uppercase font-semibold bg-[#262626] text-[#FCFAF7] rounded-2xl hover:bg-[#D79B42] transition-colors duration-500 disabled:opacity-50 cursor-pointer"
                    >
                      {isPending ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
