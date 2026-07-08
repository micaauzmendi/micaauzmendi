"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ContactModal } from "@/components/sections/ContactModal";
import type { Dictionary } from "@/types/dictionary";

const ContactModalContext = createContext<() => void>(() => {});

/** Opens the shared contact modal from anywhere (nav, footer, contact section). */
export const useContactModal = () => useContext(ContactModalContext);

/**
 * Renders a single ContactModal for the whole page and exposes an opener via
 * context, so every "Hablemos" button — nav, footer, the contact section —
 * drives the same modal instead of each keeping its own.
 */
export function ContactModalProvider({ dict, children }: { dict: Dictionary; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={() => setOpen(true)}>
      {children}
      <ContactModal dict={dict} open={open} onClose={() => setOpen(false)} />
    </ContactModalContext.Provider>
  );
}
