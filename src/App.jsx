import { useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    title: "AI Disease Prediction",
    category: "AI / HEALTH TECH",
    description: "An intelligent clinical workspace that turns symptoms into structured predictions and clear, printable reports.",
    url: "https://disease-prediction-backend.vercel.app/",
    stack: ["Machine Learning", "Web App", "Vercel"],
    accent: "cyan",
  },
  {
    number: "02",
    title: "India Branded Sports",
    category: "SPORTS / DIGITAL BRAND",
    description: "A fast, focused sports experience built for Indian audiences with an energetic visual identity.",
    url: "https://india-branded-sports.vercel.app/",
    stack: ["Frontend", "Branding", "Responsive"],
    accent: "violet",
  },
  {
    number: "03",
    title: "Rivayat",
    category: "COMMERCE / CULTURE",
    description: "A distinctive commerce experience blending strong product storytelling with an identity rooted in tradition.",
    url: "https://rivayat.shop/",
    stack: ["E-commerce", "UX Design", "Identity"],
    accent: "orange",
  },
];

const skills = [
  "Artificial Intelligence", "React", "JavaScript", "Machine Learning",
  "Python", "AWS AI", "UI Engineering", "Product Thinking",
];

const navItems = [["About", "about"], ["Work", "work"], ["Expertise", "expertise"], ["Contact", "contact"]];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>;
}

function Reveal({ children, className = "", delay = 0 }) {
  return <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` }}>{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <a href={`#${id}`} key={id} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>
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
          <span><b>const</b> idea = <i>"ambitious"</i>;</span>
          <span><b>await</b> build(idea);</span>
          <span className="terminal-success">✓ product shipped</span>
        </code>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal className={`project-card accent-${project.accent}`} delay={index * 120}>
      <article>
        <div className="project-topline"><span>{project.category}</span><span>{project.number} / 03</span></div>
        <div className="project-art" aria-hidden="true">
          <div className="project-grid-lines" /><span className="project-orb" />
          <span className="project-code">{`{ ${project.number} }`}</span><span className="project-scan" />
        </div>
        <div className="project-content">
          <h3>{project.title}</h3><p>{project.description}</p>
          <div className="project-footer">
            <ul aria-label={`${project.title} technologies`}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
            <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ArrowIcon /></a>
          </div>
        </div>
      </article>
    </Reveal>
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
    <div className="app-shell">
      <div className="cursor-glow" aria-hidden="true" />
      <Header />
      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span /> AWS Certified AI Practitioner</p>
            <h1 id="hero-title">I engineer <br /><span>intelligent</span> ideas.</h1>
            <p className="hero-intro">I’m <strong>Shashvat Shukla</strong>, a developer turning AI, clean code, and sharp product thinking into digital experiences that feel one step ahead.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowIcon /></a>
              <a className="button button-secondary" href="https://www.linkedin.com/in/shashvat-shukla-03225b397" target="_blank" rel="noreferrer">Let’s connect</a>
            </div>
            <div className="hero-meta" aria-label="Portfolio highlights">
              <div><strong>03</strong><span>Live products</span></div>
              <div><strong>AI</strong><span>Core focus</span></div>
              <div><strong>∞</strong><span>Ideas loading</span></div>
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
            <Reveal><h2 id="about-title">Building at the intersection of <em>logic</em> and <em>imagination.</em></h2></Reveal>
            <Reveal className="about-copy" delay={100}>
              <p>I create practical systems that connect intelligent technology with interfaces people actually enjoy using. From prediction platforms to commerce and branded experiences, every build starts with a real problem and ends with a clear product.</p>
              <div className="identity-row">
                <div><span>FOCUS_01</span><strong>AI products that solve real problems</strong></div>
                <div><span>FOCUS_02</span><strong>Fast, memorable web experiences</strong></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="work section-shell" id="work" aria-labelledby="work-title">
          <Reveal className="section-label"><span>02</span><p>SELECTED / PROJECTS</p></Reveal>
          <div className="section-heading">
            <Reveal><h2 id="work-title">Work that is <em>live, useful,</em> and built to last.</h2></Reveal>
            <Reveal delay={100}><p>Three projects. Three different problems. One standard: make it work beautifully.</p></Reveal>
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
                ["02", "Train", "AI & models", "Using data and prediction to make software genuinely smarter."],
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
            <p className="contact-copy">I’m open to collaborations, ambitious projects, and conversations about technology that moves things forward.</p>
            <a className="button button-primary" href="https://www.linkedin.com/in/shashvat-shukla-03225b397" target="_blank" rel="noreferrer">Start a conversation <ArrowIcon /></a>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top"><span className="brand-mark">S</span><span className="brand-copy"><strong>SHASHVAT</strong><small>AI + WEB DEVELOPER</small></span></a>
        <p>Designed with intent. Engineered with React.</p>
        <p>© {new Date().getFullYear()} Shashvat Shukla</p>
      </footer>
    </div>
  );
}

export default App;
