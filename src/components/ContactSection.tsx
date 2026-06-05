"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Mail, MapPin, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal section heading
      gsap.from("#contact h2", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // 2. Slide/Fade in Left Info Column
      gsap.from(infoRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      // 3. Slide/Fade in Right Form Column
      gsap.from(formRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section id="contact" className="section-container" ref={sectionRef} style={{ paddingBottom: "140px" }}>
      <h2 className="section-title">Contact</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "48px",
          marginTop: "20px",
        }}
      >
        {/* Info Column */}
        <div ref={infoRef} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
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
        </div>

        {/* Form Column */}
        <div ref={formRef}>
          {status === "success" ? (
            <div
              style={{
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
                padding: "24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Sparkles size={24} style={{ color: "#10b981" }} />
              <h4 style={{ color: "#065f46" }}>Message Transmitted!</h4>
              <p style={{ color: "#047857", fontSize: "0.88rem" }}>
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
        </div>
      </div>
    </section>
  );
}
