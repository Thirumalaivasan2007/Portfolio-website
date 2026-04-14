import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Instagram, Facebook, Twitter, ExternalLink, 
  Code, Brain, Globe, MessageSquare, ChevronUp, Mail, Phone 
} from 'lucide-react';
import ProjectCard from './components/ProjectCard';

const App = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [result, setResult] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const phrases = ["Full-Stack Developer", "AI Engineer", "MERN Stack Expert"];
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
    setResult("Sending...");
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
      setResult("Message Sent Successfully! ✅");
      setFormData({ fullName: '', email: '', mobile: '', subject: '', message: '' });
      setTimeout(() => setResult(''), 5000);
    } else {
      setResult(data.message);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

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
      accentColor: "#0ef",
      techIcons: [
        { component: Code },
        { component: Brain },
        { component: Globe }
      ]
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
      accentColor: "#0ef",
      techIcons: [
        { component: Code },
        { component: Brain }
      ]
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
    <div className="bg-bgDark min-h-screen text-white font-poppins transition-colors duration-500 overflow-x-hidden">
      {/* Header */}
      <nav className={`fixed top-0 left-0 w-full px-[10%] py-4 flex justify-between items-center z-[100] transition-all duration-300 ${isScrolled ? 'bg-bgDark/80 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
        <a href="#home" className="text-2xl md:text-3xl font-black tracking-tighter hover:scale-105 transition-transform text-neonCyan text-glow-cyan">
          THIRUMALAIVASAN
        </a>
        <div className="space-x-8 hidden lg:flex">
          {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold uppercase tracking-widest hover:text-neonCyan transition-all duration-300 relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neonCyan transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-[10%] py-24 flex-col lg:flex-row gap-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neonCyan/5 to-transparent pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 text-center lg:text-left z-10"
        >
          <h3 className="clean-greeting">Hello, It's Me</h3>
          <h1 className="single-line-name justify-center lg:justify-start">
            Thirumalai<span className="cyan-text">vasan T</span>
          </h1>
          <h3 className="text-2xl md:text-4xl font-bold mb-8 opacity-90 tracking-tight">
            <span className="text-white/80">I am a </span>
            <span className="text-neonCyan">{text}</span>
            <span className="animate-pulse text-neonCyan ml-1">|</span>
          </h3>
          <p className="text-lg mb-10 leading-relaxed text-gray-400 max-w-2xl">
            Hyper-focused on building the next generation of AI-native applications. Specializing in MERN stack, on-device LLMs, and high-performance cloud architectures.
          </p>
          
          <div className="flex justify-center lg:justify-start gap-6 mb-12">
            {[
              { href: "https://www.linkedin.com/in/t-thirumalai-944tv", icon: Linkedin, color: "#0077b5" },
              { href: "https://www.instagram.com/_.mighty._.boy.__.thiru._", icon: Instagram, color: "#e4405f" },
              { href: "https://www.facebook.com/thiru.malai.943716", icon: Facebook, color: "#1877f2" },
              { href: "https://x.com/Thirumalai443", icon: Twitter, color: "#1da1f2" }
            ].map((social, i) => (
              <motion.a 
                key={i} href={social.href} target="_blank" rel="noopener noreferrer" 
                whileHover={{ rotateY: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 border border-white/10 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm group transition-all duration-300"
              >
                <social.icon className="w-6 h-6 text-gray-400 group-hover:text-neonCyan transition-colors" />
              </motion.a>
            ))}
          </div>

          <a href="#portfolio" className="inline-flex items-center gap-2 py-4 px-10 bg-neonCyan text-bgDark rounded-full font-black text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,238,255,0.4)] hover:scale-105 active:scale-95">
            View Projects <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center items-center z-10"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
            className="relative w-80 h-80 md:w-[32rem] md:h-[32rem] group cursor-pointer"
          >
             {/* Hexagon Bounds & Glow */}
             <div className="absolute inset-0 bg-neonCyan/20 animate-pulse-cyan hexagon-image-container p-1 shadow-neon"></div>
             <div className="absolute inset-0 bg-neonCyan hexagon-image-container opacity-20 blur-3xl group-hover:opacity-40 transition-opacity"></div>
             
             {/* RGB Glitch Layers */}
             <div className="absolute inset-2 hexagon-image-container overflow-hidden bg-bgDark">
                {/* Red Glitch Layer */}
                <motion.img 
                  src="/image1.jpeg" 
                  alt="Profile Glitch" 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:animate-[glitch-rgb_0.3s_infinite] glitch-layer brightness-150 saturate-200"
                  style={{ filter: "url(#red-filter)" }} 
                />
                
                {/* Original/Base Layer */}
                <img 
                  src="/image1.jpeg" 
                  alt="Profile" 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-30 group-hover:scale-110" 
                />

                {/* Blue Glitch Overlay */}
                <motion.img 
                  src="/image1.jpeg" 
                  alt="Profile Glitch" 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:animate-[glitch-rgb_0.2s_infinite_reverse] glitch-layer brightness-150 saturate-200"
                  style={{ filter: "url(#blue-filter)" }} 
                />
             </div>

             {/* SVG Color Filters for Glitch */}
             <svg className="hidden">
               <filter id="red-filter">
                 <feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
               </filter>
               <filter id="blue-filter">
                 <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0" />
               </filter>
             </svg>
          </motion.div>
        </motion.div>
      </section>
      {/* About Section */}
      <section id="about" className="py-32 px-[10%] bg-[#0a0a0f] relative border-y border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neonCyan/5 blur-[120px] rounded-full"></div>
        <div className="flex flex-col md:flex-row items-center gap-20 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 lg:max-w-[450px] relative group"
          >
             <div className="absolute -inset-4 bg-neonCyan/10 blur-2xl group-hover:bg-neonCyan/20 transition-all duration-700"></div>
             <img src="/image1.jpeg" alt="About Me" className="relative w-full aspect-[4/5] object-cover rounded-[2.5rem] border border-white/10 z-10 transition-all duration-700 group-hover:rounded-[1rem] group-hover:brightness-110" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              A Bit <span className="text-neonCyan border-b-4 border-neonCyan/20 pb-1">About Me</span>
            </h2>
            <h3 className="text-2xl font-bold text-neonCyan tracking-widest uppercase opacity-80">Full-Stack AI Architect</h3>
            <p className="text-xl leading-relaxed text-gray-300 italic font-medium">
              "Building intelligent digital ecosystems, one line of code at a time."
            </p>
            <p className="text-lg leading-relaxed text-gray-400 font-medium">
              Currently a 2nd-year CSE student, I have evolved from a traditional MERN developer into an AI-focused architect. I integrate LLMs (Gemini, Ollama) directly into the web application fabric to create experiences that don't just respond, but anticipate user needs.
            </p>
            <motion.a 
              href="#portfolio" 
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-4 px-10 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-neonCyan hover:text-bgDark transition-all duration-300 group"
            >
              Explore My Work
              <div className="w-8 h-8 rounded-full bg-neonCyan group-hover:bg-bgDark flex items-center justify-center transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-[10%] relative overflow-hidden bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24 relative"
        >
          <h2 className="text-6xl md:text-8xl font-black opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap hidden md:block select-none tracking-[0.4em]">ARCHITECTURE</h2>
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Latest <span className="text-neonCyan border-b-4 border-neonCyan/20 pb-2">Masterpieces</span></h2>
          <div className="w-24 h-1.5 bg-neonCyan mx-auto rounded-full group-hover:w-48 transition-all"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-[10%] bg-bgDark">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-24 tracking-[0.25em] uppercase">Deep <span className="text-neonCyan">Services</span></h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: Code, title: "Web Architecture", desc: "Crafting bulletproof frontend systems and ultra-secure Node.js backends." },
            { icon: Brain, title: "Intelligence Integration", desc: "Fine-tuning LLMs and embedding vector-memory AI into your existing workflow." },
            { icon: Globe, title: "HyperScale DevOps", desc: "Automated CI/CD pipelines and zero-downtime deployments on high-performance clouds." }
          ].map((service, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/5 p-12 rounded-[2rem] group transition-all duration-500 hover:border-neonCyan/20 hover:bg-neonCyan/5"
            >
              <service.icon className="w-16 h-16 text-neonCyan mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-[10%] bg-[#0a0a0f]">
        <h2 className="text-4xl md:text-6xl font-black mb-20 text-center uppercase tracking-tighter">Terminal <span className="text-neonCyan">Input</span></h2>
        
        <div className="grid lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
          <div className="lg:col-span-1 space-y-10">
            <h3 className="text-2xl font-bold border-l-4 border-neonCyan pl-6">Contact Channels</h3>
            <div className="space-y-6">
              <a href="mailto:thirumalaivasan944@gmail.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-neonCyan/50 transition-colors">
                  <Mail className="w-6 h-6 text-neonCyan" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Email Address</p>
                  <p className="font-bold group-hover:text-neonCyan transition-colors">thirumalaivasan944@gmail.com</p>
                </div>
              </a>
              <a href="tel:+917305164503" className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-neonCyan/50 transition-colors">
                  <Phone className="w-6 h-6 text-neonCyan" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Mobile Number</p>
                  <p className="font-bold group-hover:text-neonCyan transition-colors">+91 73051 64503</p>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-12 rounded-[3rem] border border-white/5 shadow-2xl relative">
            <div className="absolute -top-6 right-12 px-6 py-2 bg-neonCyan text-bgHard font-black rounded-xl text-xs uppercase tracking-widest shadow-neon">Secure Form</div>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="System Name" required className="p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all" />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Header" required className="p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all" />
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Network ID" required className="p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all" />
            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Input Subject" required className="p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all" />
            <textarea name="message" value={formData.message} onChange={handleInputChange} rows="6" placeholder="Transmission Content..." required className="md:col-span-2 p-5 bg-bgDark rounded-2xl border border-white/5 focus:border-neonCyan outline-none transition-all resize-none"></textarea>
            
            <div className="md:col-span-2 flex flex-col items-center gap-6 mt-4">
              <button type="submit" className="w-full py-5 bg-neonCyan text-bgDark rounded-2xl font-black text-xl hover:shadow-[0_0_40px_rgba(0,238,255,0.4)] transition-all">EXECUTE TRANSMISSION</button>
              <AnimatePresence>
                {result && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-lg font-black text-neonCyan uppercase tracking-widest text-shadow-neon"
                  >
                    {result}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-bgDark px-[10%] flex flex-col items-center gap-8 border-t border-white/5">
        <h2 className="text-2xl font-black tracking-tighter text-neonCyan text-glow-cyan">THIRUMALAIVASAN</h2>
        <div className="text-sm font-semibold opacity-50 uppercase tracking-[0.5em]">
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
