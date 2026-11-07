import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail, Linkedin, Github, Copy, Check, ArrowUpRight, ArrowRight,
  Code2, Database, Cpu, Sparkles, Menu, X,
} from "lucide-react";

/* ---------- design tokens ----------
bg-void       #0D0A16   base background
bg-panel      #161129   card surface
bg-panel-2    #1E1836   raised panel
violet        #9B6BFF   primary accent
pink          #C77DFF   secondary accent (gradient partner)
text-hi       #F3F0FA   primary text
text-mid      #B4ACC9   secondary text
text-low      #6F6690   muted / labels
line          #2A2347   hairline borders
------------------------------------- */

const DATA = {
  name: "Piyush",
  role: "Software Developer",
  tagline:
    "CS undergraduate who ships full-stack apps end to end — from schema design to a polished UI.",
  email: "vishukawatra7@gmail.com",
  linkedin: "https://www.linkedin.com/in/piyush-kwatra-9a97823ab/",
  github: "https://github.com/Piyush00189",
  summary:
    "Computer Science undergraduate with hands-on experience building full-stack desktop applications in Python and Java, including a 20+ module AI-integrated nutrition app and a relational database system for hotel management. Comfortable across the stack: schema design, backend logic, authentication, and UI. Currently sharpening data structures and system design fundamentals while looking for an entry-level Software Developer role.",
  education: [
    { degree: "B.Tech, Computer Science Engineering", school: "Maharaja Ranjit Singh Punjab Technical University, Bathinda", period: "2023 – 2027 (Pursuing)" },
    { degree: "CBSE Class XII", school: "DAV Public School, Rania", period: "70%" },
    { degree: "HBSE Class X", school: "B.S High School, Rania", period: "82%" },
  ],
  services: [
    {
      icon: Code2,
      title: "Full-Stack Desktop Apps",
      body: "End-to-end desktop applications in Python and Java — UI, business logic, and persistence layer built and wired together as one cohesive product.",
    },
    {
      icon: Database,
      title: "Database Design & Management",
      body: "Relational schema design, normalized SQL queries, and connecting applications to MySQL for reliable, structured data storage.",
    },
    {
      icon: Cpu,
      title: "Java Backend Development",
      body: "OOP-based backend modules, reusable class structures, and test-driven debugging — the discipline behind Piesoft's production releases.",
    },
  ],
  experience: {
    role: "Java Developer Intern",
    company: "Piesoft Informatics Pvt. Ltd.",
    period: "2-month internship",
    lines: [
      "Developed and maintained Java-based backend modules, applying OOP principles to structure reusable, maintainable code.",
      "Wrote and executed test cases to debug application logic, improving reliability ahead of internal releases.",
      "Integrated SQL databases for persistent data storage and retrieval, working directly with queries and schema design.",
    ],
  },
  projects: [
    {
      id: "diet",
      tag: "python project",
      name: "NutriApp",
      stack: ["Python", "CustomTkinter", "MySQL", "Google Gemini API"],
      blurb:
        "A full desktop nutrition application spanning 20+ interconnected modules — authentication, calculators, meal planning, and progress tracking.",
      bullets: [
        "bcrypt-hashed credentials with role-based access for users and admins",
        "Google Gemini API powers AI-driven diet planning, nutrition lookup, and health tips",
        "Live dashboard with real-time BMI, calorie/water goals and streaks",
      ],
      stat: { value: "20+", label: "modules" },
      featured: true,
    },
    {
      id: "smartstay",
      tag: "sql project",
      name: "Smart Stay — Hotel Booking & Billing System",
      stack: ["MySQL", "Relational schema design"],
      blurb:
        "A relational database system covering room bookings, guest accounts, payments, in-room food ordering and guest feedback.",
      bullets: [
        "Booking workflow tracking room type/status, check-in/check-out and payment method",
        "Billing module computing charges from room price, stay duration and extras",
        "Admin login, itemized food ordering, and a guest feedback module",
      ],
    },
  ],
  technical: ["Java", "Python", "SQL", "Git", "GitHub", "MySQL", "VS Code", "Apache NetBeans"],
  focusAreas: [
    { label: "Object-Oriented Programming", value: 85 },
    { label: "Database Design (DBMS)", value: 80 },
    { label: "Data Structures & Algorithms", value: 65 },
    { label: "Operating Systems", value: 60 },
  ],
};

const SECTIONS = ["home", "about", "services", "skills", "portfolio", "contact"];

/* ---------------- utility hooks ---------------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function useTilt({ maxTilt = 8, scale = 1.02, glare = true } = {}) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [transition, setTransition] = useState("transform 0.5s cubic-bezier(.23,1,.32,1)");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const onMouseMove = useCallback(
    (e) => {
      if (reducedMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTransition("transform 0.06s linear");
      setTransform(
        `perspective(1000px) rotateX(${(-py * maxTilt * 2).toFixed(2)}deg) rotateY(${(px * maxTilt * 2).toFixed(2)}deg) scale(${scale})`
      );
      if (glare) {
        setGlareStyle({ opacity: 0.08, background: `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, #ffffff, transparent 60%)` });
      }
    },
    [maxTilt, scale, glare, reducedMotion]
  );

  const onMouseLeave = useCallback(() => {
    setTransition("transform 0.6s cubic-bezier(.23,1,.32,1)");
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlareStyle({ opacity: 0 });
  }, []);

  return { ref, style: { transform, transition }, glareStyle, onMouseMove, onMouseLeave };
}

function TiltCard({ children, className = "", style = {}, maxTilt = 8, scale = 1.02 }) {
  const tilt = useTilt({ maxTilt, scale, glare: true });
  return (
    <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} className={`tilt-card relative ${className}`} style={{ ...style, ...tilt.style }}>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit]" style={{ ...tilt.glareStyle, transition: "opacity 0.3s ease", mixBlendMode: "overlay" }} />
      {children}
    </div>
  );
}

/* ---------------- progress bar (animates on reveal) ---------------- */
function SkillBar({ label, value, delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm" style={{ color: "#E4DFF2" }}>{label}</span>
        <span className="mono text-xs" style={{ color: "#9B6BFF" }}>{shown ? value : 0}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#211B3A" }}>
        <div
          className="h-full rounded-full"
          style={{
            width: shown ? `${value}%` : "0%",
            background: "linear-gradient(90deg, #9B6BFF, #C77DFF)",
            transition: `width 1.1s cubic-bezier(.23,1,.32,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ---------------- avatar with orbiting tech badges ---------------- */
function AvatarOrbit() {
  const orbitItems = [
    { label: "Java", angle: 0 },
    { label: "Py", angle: 120 },
    { label: "SQL", angle: 240 },
  ];
  const tilt = useTilt({ maxTilt: 6, scale: 1.02, glare: false });
  return (
    <div className="relative mx-auto" style={{ width: 300, height: 300, perspective: 1000 }}>
      <div className="orb-blob absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, rgba(155,107,255,0.55), rgba(199,125,255,0.15) 55%, transparent 70%)", filter: "blur(30px)" }} />
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} className="absolute inset-6 rounded-full flex items-center justify-center" style={{ ...tilt.style, background: "linear-gradient(160deg, #1E1836, #14102A)", border: "1px solid #33285C", boxShadow: "0 30px 70px -20px rgba(155,107,255,0.45)" }}>
        <span className="mono font-bold" style={{ fontSize: 72, background: "linear-gradient(160deg, #C7B4FF, #9B6BFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          P
        </span>
      </div>
      <div className="orbit-ring absolute inset-0">
        {orbitItems.map((o) => (
          <div
            key={o.label}
            className="orbit-item absolute"
            style={{ ["--angle"]: `${o.angle}deg`, top: "50%", left: "50%" }}
          >
            <div className="mono text-[11px] px-2.5 py-1.5 rounded-md" style={{ background: "#1E1836", border: "1px solid #362A5E", color: "#C7B4FF", boxShadow: "0 10px 25px -8px rgba(0,0,0,0.6)" }}>
              {o.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
      className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded transition-colors"
      style={{ border: "1px solid #33285C", color: copied ? "#C77DFF" : "#B4ACC9", background: "#1A1430" }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "copied" : "copy"}
    </button>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="mono text-xs mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full" style={{ border: "1px solid #33285C", color: "#C77DFF" }}>
      <Sparkles size={12} /> {children}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#0D0A16", color: "#F3F0FA", minHeight: "100vh" }} className="antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { font-family: 'Inter', system-ui, sans-serif; }
        h1,h2,h3,.display { font-family: 'Outfit', system-ui, sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
        ::selection { background: #9B6BFF; color: #0D0A16; }

        .grad-text { background: linear-gradient(135deg, #C7B4FF, #9B6BFF 60%, #C77DFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        @keyframes blobFloat { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(10px,-14px) scale(1.05); } }
        .orb-blob { animation: blobFloat 8s ease-in-out infinite; }

        @keyframes orbitSpin { from { transform: translate(-50%,-50%) rotate(0deg) translateX(128px) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg) translateX(128px) rotate(-360deg); } }
        .orbit-item { animation: orbitSpin 16s linear infinite; animation-delay: calc(var(--angle) / 360deg * -16s); transform: translate(-50%,-50%) rotate(var(--angle)) translateX(128px) rotate(calc(-1 * var(--angle))); }

        .nav-link { position: relative; }
        .nav-link::after { content: ""; position: absolute; left: 0; bottom: -4px; height: 2px; width: 0; background: linear-gradient(90deg,#9B6BFF,#C77DFF); transition: width 0.25s ease; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #EDE7FF; }

        .tilt-card { will-change: transform; transition-property: box-shadow, border-color; transition-duration: 0.3s; }
        .tilt-card:hover { box-shadow: 0 35px 60px -25px rgba(155,107,255,0.35) !important; border-color: #4A3B80 !important; }

        .tag { transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
        .tag:hover { transform: translateY(-2px); border-color: #9B6BFF !important; color: #E4DFF2 !important; }

        .cta-btn { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .cta-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 35px -12px rgba(155,107,255,0.5); }

        .dot-nav span { transition: all 0.3s ease; }

        a:focus-visible, button:focus-visible { outline: 2px solid #C77DFF; outline-offset: 3px; border-radius: 4px; }

        @media (prefers-reduced-motion: reduce) {
          .orb-blob, .orbit-item { animation: none !important; }
          * { transition: none !important; }
        }

        .bg-glow { background: radial-gradient(600px 400px at 15% 10%, rgba(155,107,255,0.18), transparent 60%), radial-gradient(500px 400px at 90% 30%, rgba(199,125,255,0.12), transparent 60%); }
      `}</style>

      {/* SIDE DOT NAV */}
      <nav className="dot-nav hidden lg:flex flex-col gap-4 fixed right-6 top-1/2 -translate-y-1/2 z-50">
        {SECTIONS.map((id) => (
          <button key={id} onClick={() => scrollTo(id)} aria-label={id} className="group flex items-center gap-2 justify-end">
            <span className="mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#C7B4FF" }}>{id}</span>
            <span
              className="rounded-full"
              style={{
                width: active === id ? 10 : 7,
                height: active === id ? 10 : 7,
                background: active === id ? "linear-gradient(135deg,#9B6BFF,#C77DFF)" : "#33285C",
                boxShadow: active === id ? "0 0 12px rgba(155,107,255,0.8)" : "none",
              }}
            />
          </button>
        ))}
      </nav>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40" style={{ background: "rgba(13,10,22,0.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid #1F1A38" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="display text-base font-bold flex items-center gap-1">
            Portfolio<span style={{ color: "#9B6BFF" }}>.</span>
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#B4ACC9" }}>
            {SECTIONS.map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className={`nav-link capitalize ${active === id ? "active" : ""}`}>
                {id}
              </button>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm" style={{ color: "#B4ACC9" }}>
            {SECTIONS.map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left capitalize">{id}</button>
            ))}
          </div>
        )}
      </header>

      {/* HOME */}
      <section id="home" className="bg-glow relative pt-40 pb-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow>hello, it's me</Eyebrow>
            <h1 className="display text-5xl sm:text-6xl font-extrabold leading-[1.05] mb-3">
              <span className="grad-text">{DATA.name}</span>
            </h1>
            <div className="text-lg sm:text-xl mb-5" style={{ color: "#D8D2EC" }}>
              And I'm a <span style={{ color: "#C77DFF", fontWeight: 600 }}>{DATA.role}</span>
            </div>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "#B4ACC9" }}>
              {DATA.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button onClick={() => scrollTo("portfolio")} className="cta-btn px-5 py-3 rounded-md font-semibold text-sm inline-flex items-center gap-2" style={{ background: "linear-gradient(135deg,#9B6BFF,#C77DFF)", color: "#0D0A16" }}>
                View work <ArrowRight size={15} />
              </button>
              <button onClick={() => scrollTo("contact")} className="cta-btn px-5 py-3 rounded-md font-semibold text-sm" style={{ border: "1px solid #33285C", color: "#F3F0FA" }}>
                Contact me
              </button>
            </div>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: DATA.github },
                { icon: Linkedin, href: DATA.linkedin },
                { icon: Mail, href: `mailto:${DATA.email}` },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: "1px solid #33285C", color: "#B4ACC9" }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <AvatarOrbit />
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-24" style={{ borderTop: "1px solid #1A1530" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal><Eyebrow>about me</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="display text-3xl sm:text-4xl font-bold mb-6">{DATA.role} in the making</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-base sm:text-lg leading-relaxed max-w-3xl mb-12" style={{ color: "#C6C0DA" }}>
              {DATA.summary}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="grid sm:grid-cols-3 gap-6" style={{ perspective: 1000 }}>
              {DATA.education.map((ed) => (
                <TiltCard key={ed.degree} maxTilt={6} className="p-5 rounded-lg" style={{ background: "#161129", border: "1px solid #241D40" }}>
                  <div className="mono text-[11px] mb-2" style={{ color: "#6F6690" }}>{ed.period}</div>
                  <div className="font-semibold text-sm mb-1" style={{ color: "#F3F0FA" }}>{ed.degree}</div>
                  <div className="text-sm" style={{ color: "#9088A8" }}>{ed.school}</div>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-24" style={{ borderTop: "1px solid #1A1530" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal><Eyebrow>what I do</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="display text-3xl sm:text-4xl font-bold mb-12">My services</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
            {DATA.services.map((s, idx) => (
              <Reveal key={s.title} delay={idx * 120}>
                <TiltCard maxTilt={7} className="p-7 rounded-xl h-full flex flex-col" style={{ background: "#161129", border: "1px solid #241D40" }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg,#9B6BFF,#C77DFF)" }}>
                    <s.icon size={20} color="#0D0A16" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3" style={{ color: "#F3F0FA" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#ACA4C4" }}>{s.body}</p>
                  <button onClick={() => scrollTo("portfolio")} className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "#C77DFF" }}>
                    See it in action <ArrowUpRight size={14} />
                  </button>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-6 py-24" style={{ borderTop: "1px solid #1A1530" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal><Eyebrow>my skills</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="display text-3xl sm:text-4xl font-bold mb-12">Tools & focus areas</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12">
            <Reveal delay={100}>
              <div className="mono text-xs mb-4" style={{ color: "#6F6690" }}>TECHNICAL SKILLS</div>
              <div className="flex flex-wrap gap-3">
                {DATA.technical.map((s) => (
                  <span key={s} className="tag text-sm px-4 py-2 rounded-md" style={{ background: "#1A1430", border: "1px solid #2A2250", color: "#D8D2EC" }}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="mono text-xs mb-4" style={{ color: "#6F6690" }}>FOCUS AREAS</div>
              {DATA.focusAreas.map((f, i) => (
                <SkillBar key={f.label} label={f.label} value={f.value} delay={i * 120} />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="px-6 py-24" style={{ borderTop: "1px solid #1A1530" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal><Eyebrow>latest work</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="display text-3xl sm:text-4xl font-bold mb-4">Portfolio</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-sm mb-12 max-w-lg" style={{ color: "#ACA4C4" }}>
              A snapshot of hands-on projects — plus the internship that shaped how I write backend code.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-6" style={{ perspective: 1400 }}>
            {DATA.projects.map((p, idx) => (
              <Reveal key={p.id} delay={idx * 120} className={p.featured ? "md:col-span-2" : ""}>
                <TiltCard maxTilt={6} className="p-7 rounded-xl h-full flex flex-col" style={{ background: "#161129", border: "1px solid #241D40" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="mono text-[10px] mb-2 inline-block px-2 py-0.5 rounded" style={{ background: "#2A2250", color: "#C7B4FF" }}>{p.tag}</div>
                      <h3 className="text-xl font-bold" style={{ color: "#F3F0FA" }}>{p.name}</h3>
                    </div>
                    {p.stat && (
                      <div className="text-right shrink-0">
                        <div className="mono text-2xl font-bold grad-text">{p.stat.value}</div>
                        <div className="mono text-[10px]" style={{ color: "#6F6690" }}>{p.stat.label}</div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: "#ACA4C4" }}>{p.blurb}</p>
                  <ul className="space-y-2 mb-6">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="text-sm flex gap-2" style={{ color: "#C6C0DA" }}>
                        <span className="mono shrink-0" style={{ color: "#C77DFF" }}>·</span>{b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid #241D40" }}>
                    {p.stack.map((s) => (
                      <span key={s} className="tag mono text-[11px] px-2.5 py-1 rounded" style={{ border: "1px solid #2A2250", color: "#9088A8" }}>{s}</span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div style={{ perspective: 1200 }}>
              <TiltCard maxTilt={4} className="p-6 rounded-xl" style={{ background: "#14102A", border: "1px solid #241D40" }}>
                <div className="mono text-xs mb-3" style={{ color: "#6F6690" }}>// {DATA.experience.period}</div>
                <div className="font-semibold mb-3" style={{ color: "#C7B4FF" }}>
                  {DATA.experience.role} <span style={{ color: "#6F6690" }}>@ {DATA.experience.company}</span>
                </div>
                <ul className="space-y-1.5">
                  {DATA.experience.lines.map((l, i) => (
                    <li key={i} className="text-sm flex gap-2" style={{ color: "#B4ACC9" }}>
                      <span style={{ color: "#9B6BFF" }}>›</span>{l}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24" style={{ borderTop: "1px solid #1A1530" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Reveal><Eyebrow>contact me</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="display text-3xl sm:text-4xl font-bold mb-4">Let's work together</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-base leading-relaxed max-w-md mb-8" style={{ color: "#ACA4C4" }}>
                Open to entry-level software developer roles and collaborative projects — reach out any time, I reply fast.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${DATA.email}`} className="cta-btn inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm" style={{ background: "linear-gradient(135deg,#9B6BFF,#C77DFF)", color: "#0D0A16" }}>
                  <Mail size={16} /> Email me
                </a>
                <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="cta-btn inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm" style={{ border: "1px solid #33285C", color: "#F3F0FA" }}>
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
                </a>
                <a href={DATA.github} target="_blank" rel="noreferrer" className="cta-btn inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm" style={{ border: "1px solid #33285C", color: "#F3F0FA" }}>
                  <Github size={16} /> GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="grid gap-4" style={{ perspective: 1000 }}>
              <TiltCard maxTilt={5} className="p-5 rounded-lg flex items-center justify-between gap-3" style={{ background: "#161129", border: "1px solid #241D40" }}>
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={18} style={{ color: "#C77DFF" }} className="shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[11px] mono" style={{ color: "#6F6690" }}>email</div>
                    <div className="text-sm truncate" style={{ color: "#F3F0FA" }}>{DATA.email}</div>
                  </div>
                </div>
                <CopyButton value={DATA.email} />
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="px-6 py-8" style={{ borderTop: "1px solid #1A1530" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 mono text-xs" style={{ color: "#6F6690" }}>
          <span>© {new Date().getFullYear()} {DATA.name}</span>
          <span>built with React</span>
        </div>
      </footer>
    </div>
  );
}