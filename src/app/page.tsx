"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, ArrowLeft, Shield, Clock, Heart, Phone, Mail, User,
  Menu, X, CheckCircle, AlertCircle, Info, Sparkles, Calendar,
  Stethoscope, Brain, Moon, Flame, Activity, ShieldCheck,
  ClipboardCheck, Video, Pill, CalendarCheck, Star, MapPin,
  ChevronDown, Leaf,
} from "lucide-react";
import SmoothScroll from "@/components/shared/SmoothScroll";
import GoldenSpiral from "@/components/shared/GoldenSpiral";
import ScrollReveal, { ScrollRevealStagger } from "@/components/shared/ScrollReveal";
import NewsTicker from "@/components/shared/NewsTicker";

if (typeof window !== "undefined") { gsap.registerPlugin(ScrollTrigger); }

/* ═══════════════════════════════════════════════
   DESIGN VARIATION 4 — "CASA"
   Inspired by casadisolare.com
   Warm earth tones, oversized type, clip-path
   reveals, grain texture, overshoot easing,
   rounded pill containers, golden amber accent
   ═══════════════════════════════════════════════ */

const K = {
  brown: "#563E3B",
  amber: "#D4A43A",
  bg: "#ECE4D5",
  bgLight: "#F3EDDA",
  bgHero: "#F0ECE0",
  charcoal: "#414648",
  muted: "#7A726A",
  border: "#C1B9A4",
  white: "#FFFFFF",
  cream: "#FAF7F0",
};

const EASE = "cubic-bezier(.19, 1, .22, 1)";

/* ─── Grain Overlay ─── */
function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      opacity: 0.08,
    }} />
  );
}

/* ─── Navigation ─── */
const navLinks = [
  { label: "Process", href: "#process" },
  { label: "Our Practice", href: "#services" },
  { label: "Eligibility", href: "#quiz" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Behind The Headlines", href: "/news" },
];

function CasaNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700`}
      style={{
        padding: scrolled ? "0.75rem 0" : "1.5rem 0",
        background: scrolled ? `${K.bg}dd` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: `all 0.75s ${EASE}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <a href="#" className="font-[family-name:var(--font-display)] text-xl font-semibold" style={{ color: K.brown }}>
          Golden Ratio <span className="font-normal italic" style={{ color: K.amber }}>Clinics</span>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
              className="text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-500"
              style={{ color: K.muted, transition: `all 0.5s ${EASE}` }}
              onMouseEnter={(e) => { e.currentTarget.style.color = K.brown; e.currentTarget.style.letterSpacing = "0.12em"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = K.muted; e.currentTarget.style.letterSpacing = "0.08em"; }}
            >{l.label}</a>
          ))}
        </nav>

        {/* CTA cluster — always visible */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/portal/login"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-[12px] font-semibold uppercase tracking-[0.05em] transition-all duration-500"
            style={{ color: K.brown, border: `1.5px solid ${K.brown}`, transition: `all 0.5s ${EASE}` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = K.brown;
              e.currentTarget.style.color = K.cream;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = K.brown;
            }}
          >
            Sign In
          </a>
          <a
            href="/portal/signup"
            className="inline-flex items-center flex-shrink-0 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.05em] transition-all duration-500 whitespace-nowrap"
            style={{ background: K.amber, color: K.brown, transition: `all 0.5s ${EASE}` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(212,164,58,0.45)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Sign Up
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 ml-1" style={{ color: K.brown }} aria-label="Menu">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0" style={{ background: `${K.bg}f5`, backdropFilter: "blur(20px)" }}>
          <nav className="max-w-7xl mx-auto px-8 py-8 flex flex-col gap-2">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="py-3 text-lg font-medium" style={{ color: K.brown }}>{l.label}</a>
            ))}
            <a href="#booking" onClick={() => setIsOpen(false)} className="mt-4 py-3 rounded-full text-center font-semibold" style={{ background: K.brown, color: K.cream }}>Book Consultation</a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─── Hypnotic Scroll Effects (page-wide) ─── */
function useCasaScrollEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path reveal for major sections
      gsap.utils.toArray<HTMLElement>("[data-clip-reveal]").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(8% 8% 8% 8% round 4rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0rem)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "top 20%", scrub: 0.8 },
          }
        );
      });

      // Parallax on visuals
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          y: -80,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      // Headlines slide in with overshoot easing
      gsap.utils.toArray<HTMLElement>("[data-casa-heading]").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60, letterSpacing: "0em" },
          {
            opacity: 1, y: 0, letterSpacing: "-0.03em",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}

/* ─── Hero ─── */
function CasaHero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(headingRef.current, { opacity: 0, y: 80, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "expo.out" })
      .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${K.bgHero} 0%, ${K.amber}30 100%)` }}
    >
      <div className="relative max-w-5xl mx-auto px-8 text-center pt-40 pb-32 w-full">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-12"
          style={{ background: `${K.amber}15`, border: `1px solid ${K.amber}30` }}
        >
          <Shield className="w-4 h-4" style={{ color: K.amber }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: K.amber }}>Australian-Registered Practitioners</span>
        </div>

        <h1 ref={headingRef}
          className="font-[family-name:var(--font-display)] font-semibold leading-[0.95] mb-10"
          style={{ color: K.brown, fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          A gentler
          <br />
          <em style={{ color: K.amber, fontStyle: "italic" }}>path forward</em>
        </h1>

        <p ref={subRef} className="text-xl lg:text-2xl max-w-xl mx-auto mb-14" style={{ color: K.muted, lineHeight: "1.7" }}>
          Telehealth consultations with Australian-registered medical practitioners. Compassionate care, at your own pace.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center max-w-md mx-auto sm:max-w-none">
          <a href="#booking" className="group inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-full text-[15px] sm:text-lg font-semibold transition-all duration-700 whitespace-nowrap"
            style={{ background: K.brown, color: K.cream, transition: `all 0.75s ${EASE}` }}
          >
            <span className="sm:hidden">Book Pre-Screening</span>
            <span className="hidden sm:inline">Book Free Pre-Screening</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-500 group-hover:translate-x-1.5" />
          </a>
          <a href="#quiz" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-full text-[15px] sm:text-lg font-medium transition-all duration-500 whitespace-nowrap"
            style={{ border: `1.5px solid ${K.border}`, color: K.brown }}
          >
            Check Eligibility
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: K.muted }}>Scroll</span>
        <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, ${K.amber}, transparent)` }} />
      </div>
    </section>
  );
}

/* ─── Process ─── */
const steps = [
  { icon: Phone, num: "01", title: "Free Pre-Screening", desc: "Quick, confidential chat with a qualified nurse.", time: "5–10 min" },
  { icon: ClipboardCheck, num: "02", title: "Complete Intake", desc: "Simple online form covering your medical history.", time: "10–15 min" },
  { icon: Video, num: "03", title: "Doctor Consultation", desc: "Meet a TGA-authorised prescriber via telehealth.", time: "15–20 min" },
  { icon: Pill, num: "04", title: "Prescription & Delivery", desc: "E-prescription dispensed, medication delivered.", time: "1–3 days" },
  { icon: CalendarCheck, num: "05", title: "Ongoing Support", desc: "Regular follow-ups to adjust your plan.", time: "4–12 wks" },
];

function CasaProcess() {
  return (
    <section id="process" className="py-32 lg:py-48" style={{ background: K.cream }}>
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-24">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: K.amber }}>Your Journey</p>
            <h2 className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl font-semibold leading-[1.0] mb-6"
              style={{ color: K.brown, letterSpacing: "-0.03em" }}
            >
              Simple, supportive,
              <br /><em style={{ color: K.amber }}>designed for you</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 0.08} y={20}>
              <div className="rounded-[2.5rem] p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10 transition-all duration-700"
                style={{ background: K.white, border: `1px solid ${K.border}40`, transition: `all 0.75s ${EASE}` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = K.bgLight; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = K.white; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="flex items-center gap-6">
                  <span className="text-[13px] font-bold tracking-[0.1em]" style={{ color: K.amber }}>{s.num}</span>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${K.amber}10` }}>
                    <s.icon className="w-6 h-6" style={{ color: K.amber }} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: K.brown }}>{s.title}</h3>
                  <p className="text-[15px]" style={{ color: K.muted }}>{s.desc}</p>
                </div>
                <span className="text-[12px] font-semibold px-4 py-1.5 rounded-full" style={{ background: `${K.amber}10`, color: K.amber }}>{s.time}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Our Practice ─── */
const conditions = [
  { icon: Stethoscope, title: "Doctor-Led Care", desc: "Australian-registered practitioners with current Ahpra registration." },
  { icon: Heart, title: "Nurse-Led Intake", desc: "Registered nurses guide you through every step before your consultation." },
  { icon: Shield, title: "Strictly Confidential", desc: "Your information is protected under Australian Privacy Principles." },
  { icon: Video, title: "Telehealth Convenience", desc: "Secure video or phone consultations from anywhere in Australia." },
  { icon: Clock, title: "Considered & Unrushed", desc: "Every patient gets the time they need with their doctor." },
  { icon: ShieldCheck, title: "Australia-Wide", desc: "Telehealth coverage across every state and territory." },
];

function CasaServices() {
  return (
    <section data-clip-reveal id="services" className="py-32 lg:py-48" style={{ background: K.bg }}>
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: K.amber }}>Our Practice</p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl font-semibold leading-[1.0]"
                style={{ color: K.brown, letterSpacing: "-0.03em" }}
              >
                Who we <em style={{ color: K.amber }}>help</em>
              </h2>
            </div>
            <p className="text-lg" style={{ color: K.muted, lineHeight: "1.7" }}>
              Our clinic offers consultations across a range of general health concerns. Each appointment is conducted with the same care and clinical rigour you&apos;d expect from any medical practice.
            </p>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {conditions.map((c) => (
            <div key={c.title} className="rounded-[2rem] p-8 transition-all duration-700 cursor-default"
              style={{ background: K.white, transition: `all 0.75s ${EASE}` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(86,62,59,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${K.amber}10` }}>
                <c.icon className="w-6 h-6" style={{ color: K.amber }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: K.brown }}>{c.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: K.muted }}>{c.desc}</p>
            </div>
          ))}
        </ScrollRevealStagger>

        <ScrollReveal delay={0.3}>
          <div className="mt-16 p-8 rounded-[2rem] text-center max-w-3xl mx-auto" style={{ background: K.charcoal }}>
            <Shield className="w-7 h-7 mx-auto mb-4" style={{ color: K.amber }} />
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
              <strong style={{ color: K.white }}>Regulatory Commitment</strong> — Operating under TGA Special Access Scheme. All prescribing by qualified practitioners. No prescription guarantee.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Service Eligibility ─── */
const questions = [
  { id: "age", question: "Are you 18 years or older?", subtext: "Our consultations are available to adults only.", options: [{ label: "Yes, I'm 18+", value: "yes", score: 1 }, { label: "No", value: "no", score: 0 }] },
  { id: "location", question: "Located in Australia?", subtext: "Our practitioners are registered to practise in Australia.", options: [{ label: "Yes", value: "yes", score: 1 }, { label: "No", value: "no", score: 0 }] },
  { id: "history", question: "Have you previously consulted a doctor about your general health?", subtext: "Helpful context for our clinical team.", options: [{ label: "Yes, regularly", value: "regular", score: 2 }, { label: "Occasionally", value: "occasional", score: 1 }, { label: "Not in recent years", value: "none", score: 1 }] },
  { id: "ready", question: "Comfortable with telehealth consultations?", subtext: "Telehealth is equivalent to in-person under Australian law.", options: [{ label: "Yes", value: "yes", score: 2 }, { label: "Prefer phone", value: "phone", score: 2 }, { label: "Not sure", value: "unsure", score: 1 }] },
  { id: "expectation", question: "What would you like to discuss?", subtext: "Helps our intake team prepare for your appointment.", options: [{ label: "General wellbeing", value: "general", score: 1 }, { label: "Long-standing concern", value: "ongoing", score: 1 }, { label: "Second opinion", value: "second", score: 1 }, { label: "Prefer to discuss with doctor", value: "private", score: 1 }] },
];

function CasaQuiz() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const total = questions.length;
  const progress = step >= 0 ? ((step + 1) / total) * 100 : 0;

  const handleAnswer = (qId: string, val: string, score: number) => {
    setAnswers((p) => ({ ...p, [qId]: val }));
    setScores((p) => ({ ...p, [qId]: score }));
    setTimeout(() => {
      if (step < total - 1) setStep((s) => s + 1);
      else {
        setStep(total);
        const ts = Object.values({ ...scores, [qId]: score }).reduce((a, b) => a + b, 0);
        fetch("/api/quiz", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers: { ...answers, [qId]: val }, totalScore: ts, resultCategory: ts >= 5 ? "likely_eligible" : ts >= 3 ? "possibly_eligible" : "not_eligible" }) }).catch(() => {});
      }
    }, 400);
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <section id="quiz" className="py-32 lg:py-48" style={{ background: K.bgLight }}>
      <div className="max-w-2xl mx-auto px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: K.amber }}>2-Minute Guide</p>
            <h2 className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl font-semibold leading-[1.0]" style={{ color: K.brown, letterSpacing: "-0.03em" }}>
              Are you <em style={{ color: K.amber }}>eligible?</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="rounded-[2.5rem] overflow-hidden" style={{ background: K.white }}>
          {step >= 0 && step < total && (
            <div className="h-1" style={{ background: K.bg }}><div className="h-full transition-all duration-700" style={{ width: `${progress}%`, background: K.amber, transition: `width 0.75s ${EASE}` }} /></div>
          )}
          <div className="p-10 lg:p-14">
            {step === -1 && (
              <div className="text-center py-8">
                <div className="w-18 h-18 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8" style={{ background: `${K.amber}10`, width: "4.5rem", height: "4.5rem" }}>
                  <Sparkles className="w-8 h-8" style={{ color: K.amber }} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: K.brown }}>Quick Eligibility Guide</h3>
                <p className="mb-4 max-w-md mx-auto" style={{ color: K.muted }}>Five questions. Not a medical assessment.</p>
                <div className="inline-flex items-start gap-3 text-left p-5 rounded-2xl mb-8 max-w-md" style={{ background: K.bgLight }}>
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: K.amber }} />
                  <p className="text-[13px]" style={{ color: K.muted }}><strong style={{ color: K.brown }}>Note:</strong> General indication only.</p>
                </div>
                <button onClick={() => setStep(0)} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold" style={{ background: K.brown, color: K.cream }}>
                  Begin <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step >= 0 && step < total && (
              <div key={step}>
                <div className="flex justify-between mb-10">
                  <span className="text-[13px] font-medium" style={{ color: K.muted }}>{step + 1} / {total}</span>
                  {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1 text-[13px]" style={{ color: K.muted }}><ArrowLeft className="w-4 h-4" /> Back</button>}
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: K.brown }}>{questions[step].question}</h3>
                <p className="mb-10" style={{ color: K.muted }}>{questions[step].subtext}</p>
                <div className="space-y-3">
                  {questions[step].options.map((o) => (
                    <button key={o.value} onClick={() => handleAnswer(questions[step].id, o.value, o.score)}
                      className="w-full text-left p-5 rounded-2xl transition-all duration-500"
                      style={{ border: `2px solid ${answers[questions[step].id] === o.value ? K.amber : K.border}40`, background: answers[questions[step].id] === o.value ? `${K.amber}08` : K.white, transition: `all 0.5s ${EASE}` }}
                    >
                      <span className="font-semibold" style={{ color: K.brown }}>{o.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === total && (
              <div className="text-center py-6">
                {totalScore >= 5 ? (
                  <><div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `${K.amber}15` }}><CheckCircle className="w-8 h-8" style={{ color: K.amber }} /></div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: K.brown }}>You may be a good candidate</h3></>
                ) : totalScore >= 3 ? (
                  <><div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `${K.amber}15` }}><Info className="w-8 h-8" style={{ color: K.amber }} /></div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: K.brown }}>Let&apos;s chat</h3></>
                ) : (
                  <><div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: K.bg }}><AlertCircle className="w-8 h-8" style={{ color: K.muted }} /></div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: K.brown }}>May not be the right fit now</h3></>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                  <a href="#booking" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold" style={{ background: K.brown, color: K.cream }}>Book Pre-Screening <ArrowRight className="w-5 h-5" /></a>
                  <button onClick={() => { setStep(-1); setAnswers({}); setScores({}); }} className="px-8 py-4 rounded-full font-medium" style={{ border: `1.5px solid ${K.border}`, color: K.muted }}>Retake</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Sarah M.", loc: "Brisbane", quote: "The team made me feel completely at ease. Seamless and genuine.", rating: 5 },
  { name: "James T.", loc: "Melbourne", quote: "After years trying different medications, I finally found relief.", rating: 5 },
  { name: "Linda K.", loc: "Perth", quote: "Nervous at first but the nursing team was incredible.", rating: 5 },
];

function CasaTestimonials() {
  return (
    <section data-clip-reveal className="py-32 lg:py-48" style={{ background: K.charcoal }}>
      <div className="max-w-7xl mx-auto px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: K.amber }}>Patient Stories</p>
            <h2 className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl font-semibold leading-[1.0]" style={{ color: K.white, letterSpacing: "-0.03em" }}>
              Trusted <em style={{ color: K.amber }}>nationwide</em>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="grid md:grid-cols-3 gap-5" stagger={0.12}>
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-[2rem] p-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex gap-1 mb-6">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4" style={{ color: K.amber, fill: K.amber }} />)}</div>
              <p className="text-lg leading-relaxed mb-8 italic" style={{ color: "rgba(255,255,255,0.6)" }}>&ldquo;{t.quote}&rdquo;</p>
              <p className="font-semibold" style={{ color: K.white }}>{t.name}</p>
              <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.35)" }}>{t.loc}</p>
            </div>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}

/* ─── Booking Form ─── */
const timeSlots = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM"];

function CasaBooking() {
  const [fd, setFd] = useState({ firstName: "", lastName: "", email: "", phone: "", preferredDate: "", preferredTime: "", contactMethod: "phone", message: "", consent: false });
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [err, setErr] = useState("");
  const hc = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => { const t = e.target; const v = t instanceof HTMLInputElement && t.type === "checkbox" ? t.checked : t.value; setFd((p) => ({ ...p, [t.name]: v })); };
  const hs = async (e: FormEvent) => { e.preventDefault(); setStatus("submitting"); setErr(""); try { const r = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fd) }); if (!r.ok) { const d = await r.json(); throw new Error(d.error); } setStatus("success"); setFd({ firstName: "", lastName: "", email: "", phone: "", preferredDate: "", preferredTime: "", contactMethod: "phone", message: "", consent: false }); } catch (e) { setStatus("error"); setErr(e instanceof Error ? e.message : "Try again."); } };
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); const minDate = tomorrow.toISOString().split("T")[0];
  const inp = "w-full px-4 py-3.5 rounded-xl text-[15px] outline-none transition-all duration-500";

  return (
    <section id="booking" className="py-32 lg:py-48" style={{ background: K.cream }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <ScrollReveal>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: K.amber }}>Book Your Call</p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl font-semibold leading-[1.0] mb-8" style={{ color: K.brown, letterSpacing: "-0.03em" }}>
                Start with a <em style={{ color: K.amber }}>free</em> call
              </h2>
              <p className="text-lg mb-12" style={{ color: K.muted, lineHeight: "1.7" }}>Confidential, free, no obligation.</p>
              <div className="space-y-5">
                {[{ icon: Clock, t: "5–10 min call" }, { icon: User, t: "Registered nurse" }, { icon: Shield, t: "100% confidential" }, { icon: CheckCircle, t: "No cost, no pressure" }].map((i) => (
                  <div key={i.t} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${K.amber}10` }}><i.icon className="w-5 h-5" style={{ color: K.amber }} /></div>
                    <p style={{ color: K.brown }}>{i.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            {status === "success" ? (
              <div className="rounded-[2.5rem] p-12 text-center" style={{ background: K.white }}>
                <CheckCircle className="w-12 h-12 mx-auto mb-6" style={{ color: K.amber }} />
                <h3 className="text-2xl font-bold mb-4" style={{ color: K.brown }}>Thank you</h3>
                <p className="mb-8" style={{ color: K.muted }}>We&apos;ll be in touch within one business day.</p>
                <button onClick={() => setStatus("idle")} className="px-8 py-3 rounded-full font-medium" style={{ border: `1.5px solid ${K.border}`, color: K.muted }}>Book Another</button>
              </div>
            ) : (
              <form onSubmit={hs} className="rounded-[2.5rem] p-8 lg:p-10" style={{ background: K.white }}>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {[{ n: "firstName", l: "First Name *", p: "Jane" }, { n: "lastName", l: "Last Name *", p: "Smith" }].map((f) => (
                    <div key={f.n}><label className="block text-[13px] font-semibold mb-2" style={{ color: K.brown }}>{f.l}</label>
                    <input type="text" name={f.n} required value={(fd as Record<string,string|boolean>)[f.n] as string} onChange={hc} className={inp} placeholder={f.p} style={{ background: K.bgLight, border: `1.5px solid transparent`, color: K.brown, transition: `all 0.5s ${EASE}` }} onFocus={(e) => e.target.style.borderColor = K.amber} onBlur={(e) => e.target.style.borderColor = "transparent"} /></div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-[13px] font-semibold mb-2" style={{ color: K.brown }}>Email *</label><input type="email" name="email" required value={fd.email} onChange={hc} className={inp} placeholder="jane@example.com" style={{ background: K.bgLight, border: `1.5px solid transparent`, color: K.brown, transition: `all 0.5s ${EASE}` }} onFocus={(e) => e.target.style.borderColor = K.amber} onBlur={(e) => e.target.style.borderColor = "transparent"} /></div>
                  <div><label className="block text-[13px] font-semibold mb-2" style={{ color: K.brown }}>Phone *</label><input type="tel" name="phone" required value={fd.phone} onChange={hc} className={inp} placeholder="0412 345 678" style={{ background: K.bgLight, border: `1.5px solid transparent`, color: K.brown, transition: `all 0.5s ${EASE}` }} onFocus={(e) => e.target.style.borderColor = K.amber} onBlur={(e) => e.target.style.borderColor = "transparent"} /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-[13px] font-semibold mb-2" style={{ color: K.brown }}>Date *</label><input type="date" name="preferredDate" required min={minDate} value={fd.preferredDate} onChange={hc} className={inp} style={{ background: K.bgLight, border: `1.5px solid transparent`, color: K.brown, transition: `all 0.5s ${EASE}` }} onFocus={(e) => e.target.style.borderColor = K.amber} onBlur={(e) => e.target.style.borderColor = "transparent"} /></div>
                  <div><label className="block text-[13px] font-semibold mb-2" style={{ color: K.brown }}>Time *</label><select name="preferredTime" required value={fd.preferredTime} onChange={hc} className={inp} style={{ background: K.bgLight, border: `1.5px solid transparent`, color: K.brown, transition: `all 0.5s ${EASE}` }} onFocus={(e) => e.target.style.borderColor = K.amber} onBlur={(e) => e.target.style.borderColor = "transparent"}><option value="">Select</option>{timeSlots.map((s) => <option key={s} value={s}>{s} AEST</option>)}</select></div>
                </div>
                <div className="mb-4"><label className="block text-[13px] font-semibold mb-3" style={{ color: K.brown }}>Contact Method</label>
                  <div className="flex gap-3">{[{ v: "phone", l: "Phone" }, { v: "video", l: "Video" }].map((o) => (
                    <label key={o.v} className="flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer transition-all duration-500" style={{ border: `2px solid ${fd.contactMethod === o.v ? K.amber : K.border}40`, background: fd.contactMethod === o.v ? `${K.amber}08` : "transparent", transition: `all 0.5s ${EASE}` }}>
                      <input type="radio" name="contactMethod" value={o.v} checked={fd.contactMethod === o.v} onChange={hc} className="sr-only" /><span className="text-[14px] font-medium" style={{ color: K.brown }}>{o.l}</span>
                    </label>
                  ))}</div>
                </div>
                <div className="mb-5"><label className="block text-[13px] font-semibold mb-2" style={{ color: K.brown }}>Message (optional)</label><textarea name="message" rows={3} value={fd.message} onChange={hc} className={`${inp} resize-none`} placeholder="Brief description" style={{ background: K.bgLight, border: `1.5px solid transparent`, color: K.brown, transition: `all 0.5s ${EASE}` }} onFocus={(e) => e.target.style.borderColor = K.amber} onBlur={(e) => e.target.style.borderColor = "transparent"} /></div>
                <label className="flex items-start gap-3 mb-6 cursor-pointer"><input type="checkbox" name="consent" required checked={fd.consent} onChange={hc} className="mt-1 w-4 h-4 rounded" /><span className="text-[13px] leading-relaxed" style={{ color: K.muted }}>I consent to being contacted. Info handled per Australian Privacy Principles.</span></label>
                {status === "error" && <div className="flex items-center gap-2 p-4 rounded-xl mb-4" style={{ background: "#FEF2F2" }}><AlertCircle className="w-4 h-4 text-red-500" /><p className="text-[13px] text-red-600">{err}</p></div>}
                <button type="submit" disabled={status === "submitting"} className="w-full py-4 rounded-full font-semibold text-[15px] transition-all duration-500 disabled:opacity-50" style={{ background: K.brown, color: K.cream, transition: `all 0.5s ${EASE}` }}>
                  {status === "submitting" ? "Submitting..." : "Request My Free Call"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function CasaAbout() {
  return (
    <section id="about" className="py-32 lg:py-48" style={{ background: K.bg }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: K.amber }}>About</p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl font-semibold leading-[1.0] mb-8" style={{ color: K.brown, letterSpacing: "-0.03em" }}>
                Rooted in <em style={{ color: K.amber }}>balance</em>
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: K.muted }}>Founded on a belief that everyone deserves compassionate, evidence-based healthcare. Finding the perfect balance between science and empathy.</p>
              <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-10">
                {[{ n: "2,500+", l: "Patients" }, { n: "50+", l: "Prescribers" }, { n: "4.9/5", l: "Rating" }].map((s) => (
                  <div key={s.l}><p className="text-2xl sm:text-3xl font-bold mb-1 whitespace-nowrap" style={{ color: K.amber }}>{s.n}</p><p className="text-[12px] sm:text-[13px]" style={{ color: K.muted }}>{s.l}</p></div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div data-parallax className="rounded-[2.5rem] aspect-[4/5] flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(180deg, ${K.bgHero}, ${K.amber}25)` }}>
              <div className="text-center">
                <GoldenSpiral size={300} color={`${K.brown}25`} strokeWidth={1.5} animate={false} className="mx-auto mb-6 w-52 h-52" />
                <p className="font-[family-name:var(--font-display)] text-3xl italic" style={{ color: `${K.brown}40` }}>φ = 1.618</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
const faqs = [
  { q: "Who runs the consultations?", a: "Our consultations are conducted by Australian-registered medical practitioners holding current Ahpra registration." },
  { q: "Consultation cost?", a: "The pre-screening call with one of our nurses is free of charge. Doctor consultation fees are disclosed in full before any appointment is booked." },
  { q: "Will I receive a prescription?", a: "We can't tell you that. The outcome of any consultation is determined by your doctor following clinical assessment." },
  { q: "Medicare or private health insurance?", a: "Currently our consultations are not covered by Medicare or most private health insurers. Costs are disclosed before any appointment." },
  { q: "How long does the process take?", a: "Most patients are seen within one week. Pre-screening calls are usually scheduled within one business day." },
  { q: "All telehealth?", a: "Yes. Under Australian law, telehealth consultations are equivalent to in-person consultations." },
];

function CasaFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-32 lg:py-48" style={{ background: K.cream }}>
      <div className="max-w-3xl mx-auto px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: K.amber }}>FAQ</p>
            <h2 className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl font-semibold leading-[1.0]" style={{ color: K.brown, letterSpacing: "-0.03em" }}>
              Common <em style={{ color: K.amber }}>questions</em>
            </h2>
          </div>
        </ScrollReveal>
        {faqs.map((f, i) => (
          <ScrollReveal key={i} delay={i * 0.04}>
            <div style={{ borderBottom: `1px solid ${K.border}40` }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center py-7 text-left">
                <span className="text-lg font-semibold pr-8" style={{ color: K.brown }}>{f.q}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-500 ${open === i ? "rotate-180" : ""}`} style={{ color: K.muted, transition: `transform 0.5s ${EASE}` }} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${open === i ? "max-h-40 pb-7" : "max-h-0"}`} style={{ transition: `all 0.5s ${EASE}` }}>
                <p className="text-[15px] leading-relaxed" style={{ color: K.muted }}>{f.a}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CasaCTA() {
  return (
    <section className="py-32 lg:py-48 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${K.bg}, ${K.amber}20)` }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05]">
        <GoldenSpiral size={500} color={K.brown} strokeWidth={2} animate={false} />
      </div>
      <div className="relative max-w-3xl mx-auto px-8 text-center">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-5xl lg:text-7xl font-semibold leading-[0.95] mb-10" style={{ color: K.brown, letterSpacing: "-0.04em" }}>
            Ready for a gentler <em style={{ color: K.amber }}>path?</em>
          </h2>
          <p className="text-xl mb-14" style={{ color: K.muted }}>Free, no-obligation pre-screening call.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#booking" className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-700" style={{ background: K.brown, color: K.cream, transition: `all 0.75s ${EASE}` }}>
              Book Your Free Call <ArrowRight className="w-5 h-5" />
            </a>
            <a href="tel:1800000000" className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-medium text-lg" style={{ border: `1.5px solid ${K.border}`, color: K.brown }}>
              <Phone className="w-4 h-4" /> 1800 GR CLINIC
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function CasaFooter() {
  const yr = new Date().getFullYear();
  return (
    <footer style={{ background: K.charcoal, color: "rgba(255,255,255,0.78)" }}>
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-4">Golden Ratio <em style={{ color: K.amber }}>Clinics</em></p>
            <p className="text-[14px] leading-relaxed mb-4">A regulated telehealth medical service operating across Australia.</p>
            <div className="flex items-center gap-2 text-[12px]" style={{ color: `${K.amber}70` }}><Shield className="w-3.5 h-3.5" /> Australian-Registered Practitioners</div>
          </div>
          <div><h4 className="text-[12px] font-bold text-white uppercase tracking-[0.15em] mb-5">Links</h4><nav className="space-y-2.5">{[
            { l: "Process", h: "#process" },
            { l: "Our Practice", h: "#services" },
            { l: "Eligibility", h: "#quiz" },
            { l: "About", h: "#about" },
            { l: "FAQ", h: "#faq" },
            { l: "Legal & Compliance", h: "/news" },
            { l: "Booking", h: "#booking" },
          ].map((item) => <a key={item.l} href={item.h} className="block text-[14px] hover:text-white transition-colors">{item.l}</a>)}</nav></div>
          <div><h4 className="text-[12px] font-bold text-white uppercase tracking-[0.15em] mb-5">Contact</h4><div className="space-y-3"><a href="tel:1800000000" className="flex items-center gap-2 text-[14px] hover:text-white"><Phone className="w-4 h-4" /> 1800 GR CLINIC</a><a href="mailto:hello@goldenratioclinics.com.au" className="flex items-center gap-2 text-[14px] hover:text-white"><Mail className="w-4 h-4" /> hello@goldenratioclinics.com.au</a><div className="flex items-center gap-2 text-[14px]"><MapPin className="w-4 h-4" /> Australia-wide</div></div></div>
          <div><h4 className="text-[12px] font-bold text-white uppercase tracking-[0.15em] mb-5">Legal</h4><nav className="space-y-2.5"><a href="/privacy" className="block text-[14px] hover:text-white">Privacy</a><a href="/terms" className="block text-[14px] hover:text-white">Terms</a><a href="/complaints" className="block text-[14px] hover:text-white">Complaints</a></nav></div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}><div className="max-w-7xl mx-auto px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-4"><p className="text-[12px]">&copy; {yr} Golden Ratio Clinics</p><p className="text-[11px] max-w-2xl text-center lg:text-right leading-relaxed"><strong className="text-white/50">Medical Disclaimer:</strong> The information on this website is for general informational purposes only. All clinical decisions are made by your doctor during your consultation. Golden Ratio Clinics operates as a regulated telehealth medical practice in Australia, in accordance with Australian therapeutic goods law and Ahpra prescribing guidance.</p></div></div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════ */
export default function CasaVariation() {
  useCasaScrollEffects();
  return (
    <SmoothScroll>
      <GrainOverlay />
      <CasaNav />
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <NewsTicker
          label="Behind The Headlines"
          theme={{
            background: "#414648",
            border: "rgba(212, 164, 58, 0.4)",
            text: "rgba(252, 248, 240, 0.95)",
            accent: "#D4A43A",
            separator: "rgba(212, 164, 58, 0.6)",
          }}
        />
      </div>
      <main className="pb-12">
        <CasaHero />
        <CasaProcess />
        <CasaServices />
        <CasaQuiz />
        {/* Testimonials removed for TGA compliance */}
        <CasaBooking />
        <CasaAbout />
        <CasaFAQ />
        <CasaCTA />
      </main>
      <CasaFooter />
    </SmoothScroll>
  );
}
