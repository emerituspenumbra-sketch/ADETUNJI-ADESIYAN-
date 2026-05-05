/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ArrowRight, 
  PenTool, 
  Share2, 
  Users, 
  BarChart3,
  Globe,
  Briefcase,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Using Formspree as a functional backend for a static-first portfolio
      // This is the industry standard for ensuring "functional" forms without a custom server
      const response = await fetch("https://formspree.io/f/xvgopkzw", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          _replyto: data.email,
          _subject: `Portfolio Inquiry: ${data.subject}`,
          recipient: "emerituspenumbra@gmail.com"
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        formRef.current?.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-brand-accent shadow-2xl shadow-black/5 relative overflow-hidden">
      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center space-y-6"
        >
          <div className="bg-green-50 text-green-600 p-6 rounded-full">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <h3 className="text-3xl font-display font-bold">Message Sent Successfully</h3>
          <p className="text-brand-muted max-w-xs mx-auto">
            Thank you for reaching out, Adetunji. I'll get back to you within 24 hours.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="text-xs font-bold uppercase tracking-widest border-b-2 border-brand-primary pb-1 hover:opacity-50 transition-opacity"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <span className="section-label">Get in touch</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight mt-4">
                Let's start a <br/>conversation.
              </h3>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-brand-muted text-lg leading-relaxed">
                Whether you have a project in mind or just want to say hi, my inbox is always open.
              </p>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" 
                  required 
                  placeholder="John Doe"
                  className="w-full bg-brand-accent/30 border-b-2 border-transparent focus:border-brand-primary px-4 py-4 rounded-xl transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Email</label>
                <input 
                  id="email"
                  type="email" 
                  name="email" 
                  required 
                  placeholder="john@example.com"
                  className="w-full bg-brand-accent/30 border-b-2 border-transparent focus:border-brand-primary px-4 py-4 rounded-xl transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Subject</label>
              <input 
                id="subject"
                type="text" 
                name="subject" 
                required 
                placeholder="How can I help you?"
                className="w-full bg-brand-accent/30 border-b-2 border-transparent focus:border-brand-primary px-4 py-4 rounded-xl transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-brand-muted">Message</label>
              <textarea 
                id="message"
                name="message" 
                required 
                rows={5}
                placeholder="Write your message here..."
                className="w-full bg-brand-accent/30 border-b-2 border-transparent focus:border-brand-primary px-4 py-4 rounded-xl transition-all outline-none resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-brand-primary text-white py-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50 transition-all text-xl"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
            
            {status === 'error' && (
              <p className="text-red-500 text-sm text-center font-medium">Something went wrong. Please try again or email me directly.</p>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-primary selection:bg-brand-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-accent">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display font-extrabold text-xl tracking-tighter">
            AA.
          </div>
          <div className="flex gap-8 text-xs font-semibold tracking-widest uppercase">
            <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
            <a href="#experience" className="hover:opacity-50 transition-opacity">Experience</a>
            <a href="#skills" className="hover:opacity-50 transition-opacity">Skills</a>
            <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-40 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="flex flex-col gap-8"
          >
            <motion.span variants={FADE_UP_ANIMATION_VARIANTS} className="section-label">
              Based in Lagos, Nigeria
            </motion.span>
            
            <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="editorial-title text-[clamp(3.5rem,15vw,12rem)]">
              Adesiyan<br />Adetunji
            </motion.h1>

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col md:flex-row md:items-center gap-6 mt-4">
              <h2 className="text-xl md:text-2xl font-light text-brand-muted max-w-md leading-relaxed">
                Social Media Manager & Content Writer specializing in community growth and narrative crafting.
              </h2>
              <div className="h-px flex-1 bg-brand-accent hidden md:block" />
              <div className="flex gap-4">
                <a 
                  href="mailto:emerituspenumbra@gmail.com" 
                  className="bg-brand-primary text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Work with me <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Info Grid */}
        <section id="about" className="px-6 py-24 bg-brand-accent/50 border-y border-brand-accent overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Professional Summary */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              className="lg:col-span-2 space-y-6"
            >
              <span className="section-label">Professional Summary</span>
              <p className="text-2xl md:text-3xl leading-snug font-light">
                Results-driven specialist with expert-level proficiency in content creation, 
                copywriting, and social media strategy. I build engaging communities and craft 
                compelling narratives that elevate brand visibility.
              </p>
            </motion.div>

            {/* Contact Quick Links */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 20 }}
              className="bg-white p-8 rounded-3xl border border-brand-accent shadow-sm"
            >
              <span className="section-label mb-8">Let's Connect</span>
              <div className="space-y-6">
                <a href="mailto:emerituspenumbra@gmail.com" className="flex items-start gap-4 group">
                  <div className="bg-brand-accent p-3 rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">Email</div>
                    <div className="text-sm font-medium">emerituspenumbra@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+2348136075395" className="flex items-start gap-4 group">
                  <div className="bg-brand-accent p-3 rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">Phone</div>
                    <div className="text-sm font-medium">+234 813 607 5395</div>
                  </div>
                </a>
                <a href="https://linkedin.com/in/adesiyan-adetunji" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                  <div className="bg-brand-accent p-3 rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">LinkedIn</div>
                    <div className="text-sm font-medium">adesiyan-adetunji</div>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="px-6 py-24 max-w-7xl mx-auto">
          <span className="section-label">Core Expertise</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { 
                icon: Share2, 
                title: "Social Media", 
                desc: "Expert-level management across Instagram, X, Meta, and TikTok.",
                tags: ["Strategy", "Growth", "Engagement"]
              },
              { 
                icon: PenTool, 
                title: "Content Writing", 
                desc: "Specialized in blog posts, SEO articles, and ghostwriting.",
                tags: ["SEO", "Storytelling", "Ghostwriting"]
              },
              { 
                icon: Users, 
                title: "Community", 
                desc: "Building and nurturing thriving online communities & networks.",
                tags: ["Networking", "Moderation", "Influencers"]
              },
              { 
                icon: BarChart3, 
                title: "Analytics", 
                desc: "Data-driven refining of strategies and performance reporting.",
                tags: ["Meta Suite", "Insights", "Reporting"]
              }
            ].map((skill, index) => (
              <motion.div 
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl border border-brand-accent card-hover group"
              >
                <skill.icon className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform text-brand-muted group-hover:text-brand-primary" />
                <h3 className="text-xl font-bold mb-4">{skill.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-6">
                  {skill.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded bg-brand-accent font-semibold text-brand-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="px-6 py-24 bg-brand-primary text-white">
          <div className="max-w-7xl mx-auto">
            <span className="section-label text-zinc-500">Career Journey</span>
            <div className="mt-20 space-y-24">
              {/* SMM Role */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Social Media Manager</div>
                  <div className="text-3xl font-display font-medium">Lead Content Strategist</div>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <ul className="space-y-4 text-zinc-400 text-lg leading-relaxed">
                    <li className="flex gap-4">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                      Created and scheduled high-engagement content across all platforms resulting in significant conversion growth.
                    </li>
                    <li className="flex gap-4">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                      Developed full-scale content calendars and campaigns aligned with global product launches.
                    </li>
                    <li className="flex gap-4">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                      Provided premium ghostwriting for LinkedIn thought leaders and international newsletters.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Freelance Role */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-24 border-t border-zinc-800">
                <div className="md:col-span-1">
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">2019 – 2021</div>
                  <div className="text-3xl font-display font-medium">Content Specialist</div>
                  <div className="text-sm text-zinc-500 mt-2">Freelance / Personal Projects</div>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <ul className="space-y-4 text-zinc-400 text-lg leading-relaxed">
                    <li className="flex gap-4">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                      Delivered 50+ high-retention ghostwritten pieces including e-books and industry whitepapers.
                    </li>
                    <li className="flex gap-4">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                      Optimized content for search engines (SEO) across education, lifestyle, and business niches.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Extra */}
        <section className="px-6 py-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="section-label">Education</span>
            <div className="mt-8 p-10 bg-brand-accent rounded-[3rem]">
              <h3 className="text-2xl font-bold mb-2">Federal Polytechnic Ado-Ekiti</h3>
              <p className="text-brand-muted mb-4 uppercase tracking-wider text-xs font-semibold">HND in Extension Management • 2020</p>
              <div className="flex items-center gap-2 text-sm text-brand-muted">
                <MapPin className="w-4 h-4" /> Ekiti State, Nigeria
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center gap-6">
            <span className="section-label">Philosophy</span>
            <blockquote className="text-3xl font-display font-light leading-tight">
              "Crafting narratives that don't just fill space, but build bridges between brands and their audiences."
            </blockquote>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="px-6 py-24 md:py-40 bg-zinc-50">
          <div className="max-w-4xl mx-auto space-y-24">
            <motion.div 
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <h2 className="editorial-title text-5xl md:text-8xl mb-12">Ready to elevate your brand?</h2>
              <div className="flex flex-wrap justify-center gap-6">
                <a 
                  href="mailto:emerituspenumbra@gmail.com" 
                  className="bg-brand-primary text-white border border-brand-primary px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:bg-transparent hover:text-brand-primary transition-all text-xl"
                >
                  Quick Email <Mail className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com/in/adesiyan-adetunji" 
                  target="_blank"
                  rel="noreferrer"
                  className="border border-brand-primary px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:bg-brand-primary hover:text-white transition-all text-xl"
                >
                  LinkedIn <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </motion.div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="px-6 py-12 border-t border-brand-accent text-center text-xs uppercase tracking-[0.2em] text-brand-muted font-bold">
        © 2026 Adesiyan Adetunji • Lagos, Nigeria
      </footer>
    </div>
  );
}
