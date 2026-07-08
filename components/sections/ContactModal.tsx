"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Mail, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/types/dictionary";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface ContactModalProps {
  dict: Dictionary;
  open: boolean;
  onClose: () => void;
}

type SendStatus = "idle" | "sending" | "sent" | "error";

export function ContactModal({ dict, open, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    setStatus("idle");
    firstFieldRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const messageBody = message.trim() || dict.cta.defaultMessage;
  const whatsappHref = buildWhatsAppUrl(
    dict.personalInfo.phone,
    [
      name ? `${dict.cta.nameLabel}: ${name}` : null,
      email ? `${dict.cta.emailFieldLabel}: ${email}` : null,
      "",
      messageBody,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  );

  // Sends the message straight to Mica's inbox via FormSubmit (no backend). The
  // very first submission triggers a one-time activation email she must confirm;
  // after that, every submission is forwarded to her address.
  async function handleSend() {
    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${dict.personalInfo.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name || "—",
          email: email || "—",
          message: messageBody,
          _subject: `${name || dict.personalInfo.name} — ${dict.cta.modalTitle}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { success?: boolean | string };
      setStatus(response.ok && (data.success === true || data.success === "true") ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label={dict.cta.closeModalLabel}
            className="absolute inset-0 bg-text/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-card bg-surface p-8 shadow-[0_40px_100px_-30px_rgba(45,42,41,0.5)]"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              aria-label={dict.cta.closeModalLabel}
              onClick={onClose}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-accent"
            >
              <X size={18} />
            </button>

            <h3 id="contact-modal-title" className="pr-8 font-heading text-2xl font-medium text-text">
              {dict.cta.modalTitle}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">{dict.cta.modalDescription}</p>

            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  {dict.cta.nameLabel}
                </label>
                <input
                  ref={firstFieldRef}
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={dict.cta.namePlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-accent-support/40 bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  {dict.cta.emailFieldLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={dict.cta.emailFieldPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-accent-support/40 bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-mono text-xs uppercase tracking-wider text-text-muted"
                >
                  {dict.cta.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={dict.cta.messagePlaceholder}
                  className="mt-1.5 w-full resize-none rounded-xl border border-accent-support/40 bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            {status === "sent" ? (
              <p className="mt-6 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-text">
                {dict.cta.successMessage}
              </p>
            ) : (
              <>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={handleSend}
                    variant="primary"
                    className="flex-1 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={status === "sending"}
                  >
                    <Mail size={16} aria-hidden="true" />
                    {status === "sending" ? dict.cta.sendingLabel : dict.cta.sendEmailButton}
                  </Button>
                  <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="outline" className="flex-1">
                    <MessageCircle size={16} aria-hidden="true" />
                    {dict.cta.whatsappButton}
                  </Button>
                </div>
                {status === "error" ? <p className="mt-3 text-sm text-accent">{dict.cta.errorMessage}</p> : null}
              </>
            )}

            <div className="mt-6 flex items-center justify-center gap-6 border-t border-accent-support/20 pt-5">
              <a
                href={dict.personalInfo.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent"
              >
                {dict.cta.linkedinLabel} <ExternalLink size={12} aria-hidden="true" />
              </a>
              <a
                href={dict.personalInfo.behance.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent"
              >
                {dict.cta.behanceLabel} <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
