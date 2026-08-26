"use client";

import { createContext, useContext, useState } from "react";
import { ContactModal } from "@/components/shared/ContactModal";

interface ContactContextType {
  openContactModal: () => void;
  closeContactModal: () => void;
  isContactModalOpen: boolean;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContactModal = () => setIsOpen(true);
  const closeContactModal = () => setIsOpen(false);

  return (
    <ContactContext.Provider value={{ openContactModal, closeContactModal, isContactModalOpen: isOpen }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContactModal} />
    </ContactContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactModal must be used within a ContactProvider");
  }
  return context;
}
