import { useEffect, useRef, useState } from "react";

const projects = [
  {
    number: "01",
    title: "AI Disease Prediction",
    category: "AI / HEALTH TECH",
    description: "An intelligent clinical workspace that turns symptoms into structured predictions and clear, printable reports.",
    url: "https://disease-prediction-backend.vercel.app/",
    stack: ["Machine Learning", "Web App", "Vercel"],
    role: "AI product · Full-stack delivery",
    outcome: "Structured predictions and printable reports in one workflow.",
    accent: "cyan",
  },
  {
    number: "02",
    title: "India Branded Sports",
    category: "SPORTS / DIGITAL BRAND",
    description: "A fast, focused sports experience built for Indian audiences with an energetic visual identity.",
    url: "https://india-branded-sports.vercel.app/",
    stack: ["Frontend", "Branding", "Responsive"],
    role: "Frontend · Experience design",
    outcome: "A responsive brand experience designed for fast exploration.",
    accent: "violet",
  },
  {
    number: "03",
    title: "Rivayat",
    category: "COMMERCE / CULTURE",
    description: "A distinctive commerce experience blending strong product storytelling with an identity rooted in tradition.",
    url: "https://rivayat.shop/",
    stack: ["E-commerce", "UX Design", "Identity"],
    role: "Commerce · Product experience",
    outcome: "Product discovery and cultural storytelling in one storefront.",
    accent: "orange",
  },
];

const skills = [
  "Artificial Intelligence", "React", "JavaScript", "Machine Learning",
  "Python", "AWS AI", "UI Engineering", "Product Thinking",
];

const navItems = [["About", "about"], ["Work", "work"], ["Expertise", "expertise"], ["Contact", "contact"]];

const socialLinks = [
  {
    code: "IG",
    label: "Instagram",
    handle: "@shashvat_shukla__",
    url: "https://www.instagram.com/shashvat_shukla__?igsh=MWJmaDJzcmZtZDF3MQ==",
  },
  {
    code: "GH",
    label: "GitHub",
    handle: "@shashvatshukla-coder",
    url: "https://github.com/shashvatshukla-coder",
  },
  {
    code: "IN",
    label: "LinkedIn",
    handle: "Shashvat Shukla",
    url: "https://www.linkedin.com/in/shashvat-shukla-03225b397",
  },
];

const openPortfolioChat = (mode) => {
  window.dispatchEvent(new CustomEvent("open-shashvat-chat", { detail: { mode } }));
};

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>;
}

function Reveal({ children, className = "", delay = 0 }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` }}>{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const closeMenu = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="Shashvat Shukla — home">
        <span className="brand-mark">S</span>
        <span className="brand-copy"><strong>SHASHVAT</strong><small>AI + WEB DEVELOPER</small></span>
      </a>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((value) => !value)}>
        <span /><span /><span /><em>{open ? "Close" : "Menu"}</em>
      </button>
      <nav id="main-nav" className={open ? "is-open" : ""} aria-label="Main navigation">
        {navItems.map(([label, id], index) => (
          <a href={`#${id}`} className={activeSection === id ? "is-active" : ""} aria-current={activeSection === id ? "location" : undefined} key={id} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>
        ))}
      </nav>
      <a className="status-pill" href="#contact"><span /> Available to build</a>
    </header>
  );
}

function TechVisual() {
  return (
    <div className="tech-visual" aria-label="Developer system visualization">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="core"><span className="core-ring" /><span className="core-dot" /><strong>AI</strong><small>ONLINE</small></div>
      <div className="data-node node-one"><i /><span>REACT</span><strong>READY</strong></div>
      <div className="data-node node-two"><i /><span>MODELS</span><strong>ACTIVE</strong></div>
      <div className="data-node node-three"><i /><span>CLOUD</span><strong>SYNCED</strong></div>
      <div className="terminal-card">
        <div className="terminal-top"><span /><span /><span /><small>builder.tsx</small></div>
        <code>
          <span><b>const</b> brief = <i>"real problem"</i>;</span>
          <span><b>await</b> engineer(brief);</span>
          <span className="terminal-success">✓ production ready</span>
        </code>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal className={`project-card accent-${project.accent}`} delay={index * 120}>
      <article>
        <div className="project-topline"><span>{project.category}</span><span>LIVE · {project.number} / 03</span></div>
        <div className="project-art" aria-hidden="true">
          <div className="project-grid-lines" /><span className="project-orb" />
          <span className="project-code">{`{ ${project.number} }`}</span><span className="project-scan" />
        </div>
        <div className="project-content">
          <p className="project-role">{project.role}</p>
          <h3>{project.title}</h3><p>{project.description}</p>
          <div className="project-outcome"><span>DELIVERED</span><p>{project.outcome}</p></div>
          <div className="project-footer">
            <ul aria-label={`${project.title} technologies`}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
            <a href={project.url} target="_blank" rel="noreferrer" aria-label={`View live ${project.title}`}><span>View live</span><ArrowIcon /></a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const emptyChatForm = { name: "", email: "", message: "", website: "" };
const firstAiMessage = {
  role: "assistant",
  text: "Hey — I’m Shashvat AI, an AI version of this portfolio. Ask me about the projects, skills, or how we could build something useful together.",
};
const suggestedQuestions = ["What does Shashvat build?", "Tell me about Rivayat", "How can we collaborate?"];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("ai");
  const [form, setForm] = useState(emptyChatForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [aiMessages, setAiMessages] = useState([firstAiMessage]);
  const [aiInput, setAiInput] = useState("");
  const [aiStatus, setAiStatus] = useState("idle");
  const [aiError, setAiError] = useState("");
  const messageListRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    const handleOpenRequest = (event) => {
      setMode(event.detail?.mode === "message" ? "message" : "ai");
      setOpen(true);
    };
    window.addEventListener("open-shashvat-chat", handleOpenRequest);
    return () => window.removeEventListener("open-shashvat-chat", handleOpenRequest);
  }, []);

  useEffect(() => {
    if (mode === "ai" && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [aiMessages, aiStatus, mode]);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitMessage = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Message could not be sent.");
      setStatus("success");
      setForm(emptyChatForm);
    } catch (submitError) {
      setStatus("error");
      setError(submitError.message || "Something went wrong. Please try again.");
    }
  };

  const startAnotherMessage = () => {
    setStatus("idle");
    setError("");
  };

  const sendAiMessage = async (event, suggestedText) => {
    event?.preventDefault();
    const text = String(suggestedText || aiInput).trim();
    if (!text || aiStatus === "sending") return;

    const nextMessages = [...aiMessages, { role: "user", text }];
    setAiMessages(nextMessages);
    setAiInput("");
    setAiStatus("sending");
    setAiError("");

    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Shashvat AI could not respond.");
      setAiMessages((current) => [...current, { role: "assistant", text: result.reply }]);
      setAiStatus("idle");
    } catch (requestError) {
      setAiStatus("error");
      setAiError(requestError.message || "The AI connection is unavailable. Please try again.");
    }
  };

  const resetAiChat = () => {
    setAiMessages([firstAiMessage]);
    setAiInput("");
    setAiError("");
    setAiStatus("idle");
  };

  return (
    <aside className={`chat-widget ${open ? "is-open" : ""}`}>
      {open && (
        <div className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <div className="chat-header">
            <span className="chat-avatar">S</span>
            <div>
              <h2 id="chat-title">{mode === "ai" ? "Shashvat AI" : "Message Shashvat"}</h2>
              <p><i /> {mode === "ai" ? "AI persona · not the real Shashvat" : "Messages go directly to my inbox"}</p>
            </div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="chat-tabs" role="tablist" aria-label="Chat options">
            <button type="button" role="tab" aria-selected={mode === "ai"} className={mode === "ai" ? "is-active" : ""} onClick={() => setMode("ai")}>Ask Shashvat AI</button>
            <button type="button" role="tab" aria-selected={mode === "message"} className={mode === "message" ? "is-active" : ""} onClick={() => setMode("message")}>Send a message</button>
          </div>

          {mode === "ai" ? (
            <div className="ai-chat">
              <div className="ai-messages" ref={messageListRef} aria-live="polite">
                {aiMessages.map((message, index) => (
                  <div className={`ai-bubble ${message.role}`} key={`${message.role}-${index}`}>
                    <span>{message.role === "assistant" ? "AI" : "YOU"}</span>
                    <p>{message.text}</p>
                  </div>
                ))}
                {aiStatus === "sending" && (
                  <div className="ai-bubble assistant ai-typing"><span>AI</span><p><i /><i /><i /></p></div>
                )}
              </div>
              {aiMessages.length === 1 && (
                <div className="ai-suggestions">
                  {suggestedQuestions.map((question) => <button type="button" onClick={() => sendAiMessage(null, question)} key={question}>{question}</button>)}
                </div>
              )}
              {aiError && <div className="ai-error" role="alert"><span>{aiError}</span><button type="button" onClick={() => { setAiError(""); setAiStatus("idle"); }}>Dismiss</button></div>}
              <form className="ai-composer" onSubmit={sendAiMessage}>
                <input value={aiInput} onChange={(event) => setAiInput(event.target.value)} maxLength="1200" placeholder="Ask about Shashvat…" aria-label="Message Shashvat AI" />
                <button type="submit" disabled={!aiInput.trim() || aiStatus === "sending"} aria-label="Send to Shashvat AI"><ArrowIcon /></button>
              </form>
              <div className="ai-footer"><small>Powered by Gemini · AI responses may be inaccurate</small><button type="button" onClick={resetAiChat}>Reset</button></div>
            </div>
          ) : status === "success" ? (
            <div className="chat-success" role="status">
              <span>✓</span>
              <h3>Message transmitted.</h3>
              <p>Thanks for reaching out. Your message is now in Shashvat’s inbox.</p>
              <button type="button" onClick={startAnotherMessage}>Send another message</button>
            </div>
          ) : (
            <form className="chat-form" onSubmit={submitMessage}>
              <div className="chat-message">
                <span>SS</span>
                <p>Hey! Tell me about your idea, project, or collaboration.</p>
              </div>
              <label>
                <span>Your name</span>
                <input name="name" value={form.name} onChange={updateField} maxLength="80" autoComplete="name" placeholder="Enter your name" required />
              </label>
              <label>
                <span>Your email</span>
                <input type="email" name="email" value={form.email} onChange={updateField} maxLength="160" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <label>
                <span>Your message</span>
                <textarea name="message" value={form.message} onChange={updateField} minLength="10" maxLength="3000" rows="4" placeholder="What would you like to build?" required />
              </label>
              <label className="chat-honeypot" aria-hidden="true">
                Website<input name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" />
              </label>
              {error && <p className="chat-error" role="alert">{error}</p>}
              <button className="chat-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Transmitting…" : "Send message"}<ArrowIcon />
              </button>
              <small className="chat-privacy">Your details are used only to reply to this message.</small>
            </form>
          )}
        </div>
      )}

      <button className="chat-launcher" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? "Close Shashvat AI" : "Open Shashvat AI"}>
        <span className="chat-launcher-icon">{open ? "×" : "//"}</span>
        <span><strong>{open ? "Close chat" : "Talk to Shashvat AI"}</strong><small>{open ? "Return to portfolio" : "AI persona + direct messages"}</small></span>
      </button>
    </aside>
  );
}

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));

    const onPointerMove = (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="cursor-glow" aria-hidden="true" />
      <Header />
      <main id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span /> AWS Certified · AI + Web Developer</p>
            <h1 id="hero-title">I build intelligent products for <span>real-world use.</span></h1>
            <p className="hero-intro">I’m <strong>Shashvat Shukla</strong>, an AWS Certified AI Practitioner creating AI tools, modern web applications, and digital commerce experiences—from product thinking to production deployment.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">View selected work <ArrowIcon /></a>
              <button className="button button-secondary" type="button" onClick={() => openPortfolioChat("message")}>Start a project</button>
            </div>
            <div className="hero-meta" aria-label="Portfolio highlights">
              <div><strong>03</strong><span>Live products</span></div>
              <div><strong>AWS</strong><span>AI certified</span></div>
              <div><strong>FULL</strong><span>Idea to launch</span></div>
            </div>
          </div>
          <TechVisual />
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><span /> Scroll to explore</a>
        </section>

        <section className="ticker" aria-label="Core skills"><div>
          {[...skills, ...skills].map((skill, index) => <span key={`${skill}-${index}`}>{skill}<i>✦</i></span>)}
        </div></section>

        <section className="about section-shell" id="about" aria-labelledby="about-title">
          <Reveal className="section-label"><span>01</span><p>ABOUT / PROFILE</p></Reveal>
          <div className="about-layout">
            <Reveal><h2 id="about-title">Product thinking backed by <em>technical execution.</em></h2></Reveal>
            <Reveal className="about-copy" delay={100}>
              <p>I create practical systems that connect intelligent technology with interfaces people enjoy using. Every project starts with a clear problem, moves through focused engineering, and ends as a polished product people can access.</p>
              <div className="credential-card">
                <span className="credential-mark">AWS</span>
                <span><small>VERIFIED CREDENTIAL</small><strong>AWS Certified AI Practitioner</strong></span>
                <i>✓</i>
              </div>
              <div className="identity-row">
                <div><span>FOCUS_01</span><strong>AI products that solve real problems</strong></div>
                <div><span>FOCUS_02</span><strong>Fast, memorable web experiences</strong></div>
                <div><span>FOCUS_03</span><strong>Reliable delivery from concept to cloud</strong></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="work section-shell" id="work" aria-labelledby="work-title">
          <Reveal className="section-label"><span>02</span><p>SELECTED / PROJECTS</p></Reveal>
          <div className="section-heading">
            <Reveal><h2 id="work-title">Work that is <em>live, useful,</em> and built to last.</h2></Reveal>
            <Reveal delay={100}><p>Selected products across AI, digital brands, and commerce—each live, responsive, and built around a clear user need.</p></Reveal>
          </div>
          <div className="project-list">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}</div>
        </section>

        <section className="expertise section-shell" id="expertise" aria-labelledby="expertise-title">
          <Reveal className="section-label"><span>03</span><p>EXPERTISE / TOOLKIT</p></Reveal>
          <div className="expertise-layout">
            <Reveal className="expertise-intro">
              <h2 id="expertise-title">A modern stack for <em>ambitious builds.</em></h2>
              <p>Strategy, intelligence, interface, and deployment—connected as one product workflow.</p>
            </Reveal>
            <div className="capability-grid">
              {[
                ["01", "Think", "Product strategy", "Turning a rough idea into a focused, buildable experience."],
                ["02", "Engineer", "AI systems", "Using data, models, and careful product design to make software genuinely useful."],
                ["03", "Craft", "React interfaces", "Responsive, accessible experiences with a distinct visual system."],
                ["04", "Ship", "Cloud deployment", "Taking products from local code to reliable live experiences."],
              ].map(([number, verb, title, copy], index) => (
                <Reveal className="capability" delay={index * 90} key={number}>
                  <span>{number}</span><p>{verb}</p><h3>{title}</h3><small>{copy}</small>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-grid" aria-hidden="true" />
          <Reveal>
            <p className="eyebrow"><span /> SYSTEM READY · LET’S BUILD</p>
            <h2 id="contact-title">Have a bold idea?<br /><em>Let’s make it real.</em></h2>
            <p className="contact-copy">Share the problem, goal, or early idea. You can message me directly or explore the portfolio with Shashvat AI first.</p>
            <div className="contact-actions">
              <button className="button button-primary" type="button" onClick={() => openPortfolioChat("message")}>Send a project brief <ArrowIcon /></button>
              <button className="button button-secondary" type="button" onClick={() => openPortfolioChat("ai")}>Ask Shashvat AI</button>
            </div>
            <div className="social-links" aria-label="Social profiles">
              {socialLinks.map((social) => (
                <a href={social.url} target="_blank" rel="noreferrer" key={social.label}>
                  <span className="social-code">{social.code}</span>
                  <span className="social-copy"><small>{social.label}</small><strong>{social.handle}</strong></span>
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      <ChatWidget />

      <footer className="site-footer">
        <a className="brand" href="#top"><span className="brand-mark">S</span><span className="brand-copy"><strong>SHASHVAT</strong><small>AI + WEB DEVELOPER</small></span></a>
        <div className="footer-socials">
          <a href="https://www.instagram.com/shashvat_shukla__?igsh=MWJmaDJzcmZtZDF3MQ==" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://github.com/shashvatshukla-coder" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/shashvat-shukla-03225b397" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <p>© {new Date().getFullYear()} Shashvat Shukla</p>
      </footer>
    </div>
  );
}

export default App;
