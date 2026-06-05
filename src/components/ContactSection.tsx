"use client";

import React, { useState } from "react";
import { Send, Mail, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("transmitting");
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <section id="contact" className="section-container" style={{ paddingBottom: "140px" }}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Contact
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "48px",
          marginTop: "20px",
        }}
      >
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ display: "flex", flexDirection: "column", gap: "28px" }}
        >
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>
              Get In Touch
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Have questions, collaboration ideas, or want to send telemetry to the d1ggas crew?
              Drop us a message, and our automated queue will handle the transmission.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-blue)",
                }}
              >
                <Mail size={16} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Email</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>crew@d1ggas.com</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-blue)",
                }}
              >
                <MapPin size={16} />
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Location</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>Manila, Philippines</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {status === "success" ? (
            <div
              style={{
                background: "var(--success-bg)",
                border: "1px solid var(--success-border)",
                padding: "24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                transition: "background-color 0.3s ease, border-color 0.3s ease",
              }}
            >
              <Sparkles size={24} style={{ color: "var(--success-text)" }} />
              <h4 style={{ color: "var(--success-text)" }}>Message Transmitted!</h4>
              <p style={{ color: "var(--success-muted)", fontSize: "0.88rem" }}>
                Thank you. Your message has been sent to our system mainframe.
              </p>
              <button
                className="btn-secondary"
                onClick={() => setStatus(null)}
                style={{ marginTop: "12px", padding: "8px 24px" }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  className="form-input"
                  style={{ resize: "none" }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={status === "transmitting"}
                style={{ justifyContent: "center" }}
              >
                {status === "transmitting" ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
