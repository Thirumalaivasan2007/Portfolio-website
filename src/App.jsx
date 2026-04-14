import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Instagram, Facebook, Twitter, ExternalLink, 
  Code, Brain, Globe, MessageSquare, ChevronUp, Mail, Phone,
  Menu, X 
} from 'lucide-react';
import ProjectCard from './components/ProjectCard';

const App = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [result, setResult] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const phrases = ["Full-Stack Developer", "AI Engineer", "MERN Stack Specialist"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timeout;
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  const [formData, setFormData] = useState({
    fullName: '', email: '', mobile: '', subject: '', message: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setResult("Sending Transmission...");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "a001f6a4-740b-47ec-a832-4ef758a327e5",
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        subject: formData.subject,
        message: formData.message,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setResult("Transmission Successful! ✅");
      setFormData({ fullName: '', email: '', mobile: '', subject: '', message: '' });
      setTimeout(() => setResult(''), 5000);
    } else {
      setResult("Error: " + data.message);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const projects = [
    {
      title: "Zylron AI Web",
      tag: "Cloud Edition",
      description: "A high-performance AI assistant interface utilizing next-gen LLM APIs with real-time streaming and context preservation.",
      highlights: [
        "Real-time token streaming with Gemini Pro API",
        "Cloud-native deployment with Vercel",
        "Persistent session history and vector memory"
      ],
      githubLink: "https://github.com/Thirumalaivasan2007/Zylron-AI-Web.git",
      liveLink: "https://zylron-ai-web.vercel.app/",
      accentColor: "#00eaee",
      techIcons: [ { component: Code }, { component: Brain }, { component: Globe } ]
    },
    {
      title: "Zylron AI Local",
      tag: "Ollama Edition",
      description: "Privacy-first local AI powered by on-device Transformer models, ensuring zero latency and 100% data security.",
      highlights: [
        "Integration with local Ollama instances",
        "Edge-optimized inference with zero data leakage",
        "Custom system prompt injection framework"
      ],
      githubLink: "https://github.com/Thirumalaivasan2007/zylron-ai-ollama",
      accentColor: "#00eaee",
      techIcons: [ { component: Code }, { component: Brain } ]
    },
    {
      title: "Feastify",
      tag: "Full-Stack AI",
      description: "A high-performance food delivery web application built with a modern decoupled architecture. Features advanced automation.",
      highlights: [
        "AI Smart Engine for cart cross-selling",
        "Geolocation auto-fill via Nominatim API",
        "Automated Nodemailer order alerts"
      ],
      githubLink: "https://github.com/Thirumalaivasan2007/Feastify-web.git",
      liveLink: "https://feastify-food-web.vercel.app",
      accentColor: "#ff3366",
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
      ]
    }
  ];

  return (
    <div className="bg-bgDark min-h-screen text-white font-sans transition-colors duration-500 overflow-x-hiddenSelection:bg-neonCyan/30">
      {/* Header */}
      <nav className={`fixed top-0 left-0 w-full px-[5%] md:px-[10%] py-4 flex justify-between items-center z-[100] transition-all duration-300 ${isScrolled ? 'bg-bgDark/80 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
        <a href="#home" className="text-xl md:text-3xl font-black tracking-tighter hover:scale-105 transition-transform text-neonCyan text-glow-cyan">
          THIRUMALAIVASAN
        </a>

        {/* Desktop Nav links */}
        <div className="space-x-8 hidden md:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-semibold uppercase tracking-[0.2em] hover:text-neonCyan transition-all duration-300 relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neonCyan transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-neonCyan hover:bg-white/5 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-bgDark border-b border-white/5 flex flex-col items-center py-8 space-y-6 md:hidden backdrop-blur-xl bg-bgDark/95"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-bold uppercase tracking-widest hover:text-neonCyan transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-[6%] md:px-[10%] py-24 flex-col xl:flex-row gap-12 md:gap-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neonCyan/5 to-transparent pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left z-10 order-1"
        >
          <h3 className="clean-greeting">Hello, It's Me</h3>
          <h1 className="single-line-name">
            Thirumalai<span className="cyan-accent">vasan T</span>
          </h1>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">
            <span className="text-white/90">I am a </span>
            <span className="text-neonCyan">{text}</span>
            <span className="animate-pulse text-neonCyan ml-1">|</span>
          </h3>
          <p className="text-lg mb-10 leading-relaxed text-[#a0a0b0] max-w-2xl">
            Building high-performance, AI-native digital ecosystems. Specializing in the MERN stack, on-device LLM integration, and scalable cloud architectures that define the next generation of deep tech.
          </p>
          
          <div className="flex justify-center lg:justify-start gap-6 mb-12">
            {[
              { href: "https://www.linkedin.com/in/t-thirumalai-944tv", icon: Linkedin },
              { href: "https://www.instagram.com/_.mighty._.boy.__.thiru._", icon: Instagram },
              { href: "https://www.facebook.com/thiru.malai.943716", icon: Facebook },
              { href: "https://x.com/Thirumalai443", icon: Twitter }
            ].map((social, i) => (
              <motion.a 
                key={i} href={social.href} target="_blank" rel="noopener noreferrer" 
                whileHover={{ rotate: 15, scale: 1.15 }}
                className="w-14 h-14 border border-white/10 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm group transition-all duration-300 hover:border-neonCyan/50"
              >
                <social.icon className="w-6 h-6 text-white group-hover:text-neonCyan transition-colors" />
              </motion.a>
            ))}
          </div>

          <a href="#portfolio" className="inline-flex items-center gap-3 py-4 px-10 bg-neonCyan text-bgDark rounded-full font-black text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,234,238,0.5)] hover:scale-105 active:scale-95">
            View Projects <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center items-center z-10 order-2"
        >
          {/* Hexagon Portrait System */}
          <div className="hexagon-wrapper w-72 h-80 md:w-[28rem] md:h-[32rem]">
            <div className="hexagon-border"></div>
            <div className="hexagon-inner">
               <img 
                 src="/image1.jpeg" 
                 alt="Portrait" 
                 className="hexagon-image"
               />
            </div>
          </div>
        </motion.div>
      </section>

      {/* About + Achievements Section */}
      <section id="about" className="py-32 px-[6%] md:px-[10%] bg-[#0a0a0f] relative border-y border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neonCyan/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left Column: Refined Hexagon Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative w-[300px] h-[330px] md:w-[350px] md:h-[400px] group">
              {/* 3px Cyan Border Layer */}
              <div className="absolute inset-0 bg-neonCyan hexagon-shape transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,234,238,0.4)]"></div>
              
              {/* Image Layer (Clipped) */}
              <div className="absolute inset-[3px] bg-bgDark hexagon-shape overflow-hidden">
                <img 
                  src="/image1.jpeg" 
                  alt="About Me" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Text & Achievements */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                A BIT <span className="text-neonCyan">ABOUT ME</span>
              </h2>
              <h3 className="text-xl font-bold text-neonCyan tracking-widest uppercase opacity-80">Full-Stack AI Architect</h3>
            </div>

            <div className="space-y-4 text-lg leading-relaxed text-[#a0a0b0]">
              <p className="italic font-medium text-white/90">
                "Building intelligent digital ecosystems, one line of code at a time."
              </p>
              <p>
                Currently a 2nd-year CSE student, I have evolved from a traditional MERN developer into an AI-focused architect. I integrate LLMs (Gemini, Ollama) directly into web applications to create predictive user experiences.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/5">
              <h4 className="text-xl font-black uppercase tracking-widest text-white">Key Achievements & Skills</h4>
              <ul className="space-y-4">
                <li className="achievement-item">
                  <span><strong>Feature Project:</strong> Fully designed and deployed 'Feastify' with a custom AI cross-selling engine.</span>
                </li>
                <li className="achievement-item">
                  <span><strong>AI Integration:</strong> Expertly implemented Nominatim Geolocation and secure vector-memory interfaces.</span>
                </li>
                <li className="achievement-item">
                  <span><strong>Cloud Distribution:</strong> Proficient in deploying distributed MERN systems via Vercel and render.</span>
                </li>
                <li className="achievement-item">
                  <span><strong>Problem Solving:</strong> Aggressive participant in cross-platform hackathons and architecture challenges.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-neonCyan text-bgDark rounded-xl font-black text-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,234,238,0.5)] hover:scale-105"
              >
                Hire Me ↗
              </a>
              <button 
                onClick={() => alert("My Resume is currently being updated! Please check back soon 🔥")}
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-neonCyan text-neonCyan rounded-xl font-black text-lg transition-all duration-300 hover:bg-neonCyan/10 hover:shadow-[0_0_20px_rgba(0,234,238,0.3)]"
              >
                View Resume 📄
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-[10%] relative bg-[#08080c]">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold text-neonCyan tracking-[0.5em] uppercase mb-4">Latest Projects</h2>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">My <span className="text-neonCyan">Masterpieces</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-[10%] bg-[#0a0a0f]">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tighter uppercase">Deep <span className="text-neonCyan">Services</span></h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: Code, title: "Web Architecture", desc: "Crafting bulletproof frontend systems and ultra-secure Node.js backends." },
            { icon: Brain, title: "Intelligence Integration", desc: "Fine-tuning LLMs and embedding vector-memory AI into your existing workflow." },
            { icon: Globe, title: "HyperScale DevOps", desc: "Automated CI/CD pipelines and zero-downtime deployments on high-performance clouds." }
          ].map((service, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="glass-card p-12 rounded-[2rem] group transition-all duration-500 hover:border-neonCyan/30"
            >
              <service.icon className="w-16 h-16 text-neonCyan mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{service.title}</h3>
              <p className="text-[#a0a0b0] leading-relaxed text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-[10%] bg-[#08080c]">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center uppercase tracking-tighter">Get In <span className="text-neonCyan">Touch</span></h2>
        
        <div className="grid lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
          <div className="lg:col-span-1 space-y-10">
            <h3 className="text-2xl font-bold border-l-4 border-neonCyan pl-6 uppercase tracking-widest">Contact Info</h3>
            <div className="space-y-6">
              <a href="mailto:thirumalaivasan944@gmail.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-neonCyan/50 transition-colors">
                  <Mail className="w-6 h-6 text-neonCyan" />
                </div>
                <div>
                  <p className="text-xs text-[#a0a0b0] font-bold uppercase tracking-widest">Email</p>
                  <p className="font-bold group-hover:text-neonCyan transition-colors">thirumalaivasan944@gmail.com</p>
                </div>
              </a>
              <a href="tel:+917305164503" className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-neonCyan/50 transition-colors">
                  <Phone className="w-6 h-6 text-neonCyan" />
                </div>
                <div>
                  <p className="text-xs text-[#a0a0b0] font-bold uppercase tracking-widest">Phone</p>
                  <p className="font-bold group-hover:text-neonCyan transition-colors">+91 73051 64503</p>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 glass-card p-12 rounded-[3.5rem] relative">
            <div className="absolute -top-6 right-12 px-6 py-2 bg-neonCyan text-bgDark font-black rounded-xl text-xs uppercase tracking-widest shadow-neon">Let's Talk</div>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Name" required className="p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all" />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all" />
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile" required className="p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all" />
            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" required className="p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all" />
            <textarea name="message" value={formData.message} onChange={handleInputChange} rows="6" placeholder="Your Message..." required className="md:col-span-2 p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all resize-none"></textarea>
            
            <div className="md:col-span-2 flex flex-col items-center gap-6 mt-4">
              <button type="submit" className="w-full py-5 bg-neonCyan text-bgDark rounded-2xl font-black text-xl hover:shadow-[0_0_40px_rgba(0,234,238,0.5)] transition-all">Send Message</button>
              <AnimatePresence>
                {result && (
                  <motion.p initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-lg font-black text-neonCyan uppercase tracking-widest text-glow-cyan text-center">
                    {result}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#060608] px-[10%] flex flex-col items-center gap-8 border-t border-white/5">
        <h2 className="text-2xl font-black tracking-widest text-neonCyan text-glow-cyan uppercase">THIRUMALAIVASAN</h2>
        <div className="text-sm font-semibold opacity-40 uppercase tracking-[0.5em] text-center">
          &copy; {new Date().getFullYear()} THIRUMALAI.ENGINEERING
        </div>
        <a href="#home" className="w-14 h-14 bg-neonCyan text-bgDark flex items-center justify-center rounded-2xl hover:scale-110 transition-transform shadow-neon">
          <ChevronUp className="w-8 h-8" />
        </a>
      </footer>
    </div>
  );
};

export default App;
