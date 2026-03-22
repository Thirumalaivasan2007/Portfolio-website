import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Facebook, Twitter, ExternalLink, Code, Brain, Globe, MessageSquare, ChevronUp, Mail, Phone } from 'lucide-react';

const App = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [result, setResult] = useState('');
  const phrases = ["Full-Stack Developer", "AI Engineer", "MERN Stack Expert"];
  
  // ... (keeping typing effect logic same as previous)
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

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

  // Contact Form Setup
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setResult("Sending...");
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
      setTimeout(() => setResult(''), 5000); // Clear success message after 5s
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="bg-bgDark min-h-screen text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full px-[10%] py-6 bg-bgDark/80 backdrop-blur-md flex justify-between items-center z-[100] border-b border-white/5">
        <a href="#home" className="text-3xl font-bold text-white cursor-default">
          Portfolio
        </a>
        <nav className="space-x-8 hidden lg:block">
          {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-medium hover:text-neonCyan transition-all duration-300">
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center px-[10%] py-24 flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Hello, It's Me</h3>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-2 whitespace-nowrap">Thirumalaivasan T</h1>
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            And I'm a <span className="text-neonCyan whitespace-nowrap">{text}</span><span className="animate-pulse text-neonCyan">|</span>
          </h3>
          <p className="text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-gray-400">
            I am a 2nd-year CSE student building the future of web apps with AI integrations, cloud deployments, and scalable MERN stack solutions.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center lg:justify-start gap-4 mb-10">
            {[
              { href: "https://www.linkedin.com/in/t-thirumalai-944tv", icon: Linkedin },
              { href: "https://www.instagram.com/_.mighty._.boy.__.thiru._", icon: Instagram },
              { href: "https://www.facebook.com/thiru.malai.943716", icon: Facebook },
              { href: "https://x.com/Thirumalai443", icon: Twitter }
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" 
                 className="inline-flex justify-center items-center w-12 h-12 border-2 border-neonCyan rounded-full text-neonCyan hover:bg-neonCyan hover:text-bgDark transition-all duration-500 shadow-[0_0-.5rem_#0ef] hover:shadow-[0_0_1.5rem_#0ef]">
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <a href="#contact" className="inline-block py-3 px-10 bg-neonCyan text-bgDark rounded-full shadow-[0_0_1rem_#0ef] hover:shadow-none hover:bg-transparent hover:text-neonCyan border-2 border-neonCyan font-bold text-lg transition-all duration-300">
            Contact Me
          </a>
        </div>
        
        <div className="flex-1 flex justify-center items-center order-1 lg:order-2">
          <div className="relative w-72 h-72 md:w-[28rem] md:h-[28rem] group">
             <div className="absolute inset-0 bg-neonCyan hexagon-image-container filter drop-shadow-[0_0_2rem_#0ef] transition-transform duration-500 group-hover:scale-105 opacity-60"></div>
             <img src="/image1.jpeg" alt="Profile" className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-cover hexagon-image-container z-10 bg-bgDark border-[0.2rem] border-neonCyan transition-all duration-500 group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-[10%] bg-[#1b1f24] flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 lg:max-w-[400px]">
           <div className="relative group mx-auto">
             <div className="absolute inset-0 bg-neonCyan hexagon-image-container opacity-40 blur-xl"></div>
             <img src="/image1.jpeg" alt="About Me" className="relative w-full aspect-square object-cover hexagon-image-container border-2 border-neonCyan z-10 transition-all duration-500" />
           </div>
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">About <span className="text-neonCyan">Me</span></h2>
          <h3 className="text-2xl font-bold text-neonCyan">Full-Stack AI Developer!</h3>
          <p className="text-lg leading-relaxed text-gray-300 italic">
            "Pushing the boundaries of what AI can achieve on the web."
          </p>
          <p className="text-lg leading-relaxed text-gray-400">
            Currently a 2nd-year CSE student, I have dedicated my time to mastering the MERN stack while integrating advanced AI functionalities via Google Gemini and Local Ollama instances. My focus is on creating responsive, high-performance applications that aren't just tools, but intelligent assistants.
          </p>
          <a href="#portfolio" className="inline-block px-8 py-3 bg-neonCyan text-bgDark rounded-full font-bold hover:shadow-[0_0_1rem_#0ef] transition-all duration-300 mt-4">
            Read More
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-[10%] bg-bgDark">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">Our <span className="text-neonCyan">Services</span></h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Code, title: "Web Development", desc: "Building scalable, responsive, and robust websites using the MERN stack and modern CSS frameworks." },
            { icon: Brain, title: "AI Integration", desc: "Embedding Google Gemini and Local LLMs (Ollama) into web apps for intelligent user experiences." },
            { icon: Globe, title: "Cloud Deployment", desc: "Expertise in deploying enterprise-grade applications on Vercel, Netlify, and Cloud environments." }
          ].map((service, i) => (
            <div key={i} className="bg-[#1b1f24] p-10 rounded-3xl border-2 border-transparent hover:border-neonCyan transition-all duration-500 text-center hover:scale-105 group">
              <service.icon className="w-16 h-16 text-neonCyan mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{service.desc}</p>
              <a href="#contact" className="inline-block px-6 py-2 bg-neonCyan text-bgDark rounded-full font-semibold hover:shadow-[0_0_1rem_#0ef] transition-all duration-300">Explore</a>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-[10%] bg-[#1b1f24]">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">Latest <span className="text-neonCyan">Projects</span></h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Project 1 */}
          <div className="relative group rounded-3xl overflow-hidden border-2 border-slate-800 hover:border-neonCyan transition-all duration-500 bg-bgDark">
            <div className="p-10 space-y-6">
              <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold text-neonCyan">Zylron AI Web</h3>
                  <div className="flex gap-4">
                    <a href="https://github.com/Thirumalaivasan2007/Zylron-AI-Web.git" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neonCyan transition-colors"><Github className="w-7 h-7"/></a>
                    <a href="https://zylron-ai-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neonCyan transition-colors"><ExternalLink className="w-7 h-7"/></a>
                  </div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">Cloud Edition: A high-performance AI assistant interface utilizing next-gen LLM APIs with real-time streaming and context preservation.</p>
              <div className="flex gap-3">
                <span className="text-xs px-3 py-1 bg-neonCyan/10 text-neonCyan border border-neonCyan/30 rounded-full font-bold">Cloud</span>
                <span className="text-xs px-3 py-1 bg-neonCyan/10 text-neonCyan border border-neonCyan/30 rounded-full font-bold">Gemini</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="relative group rounded-3xl overflow-hidden border-2 border-slate-800 hover:border-neonCyan transition-all duration-500 bg-bgDark">
            <div className="p-10 space-y-6">
              <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold text-neonCyan">Zylron AI (Local)</h3>
                  <div className="flex gap-4">
                    <a href="https://github.com/Thirumalaivasan2007/zylron-ai-ollama" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neonCyan transition-colors"><Github className="w-7 h-7"/></a>
                  </div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">Ollama Edition: Privacy-first local AI powered by on-device Transformer models, ensuring zero latency and 100% data security.</p>
              <div className="flex gap-3">
                <span className="text-xs px-3 py-1 bg-neonCyan/10 text-neonCyan border border-neonCyan/30 rounded-full font-bold">Local LLM</span>
                <span className="text-xs px-3 py-1 bg-neonCyan/10 text-neonCyan border border-neonCyan/30 rounded-full font-bold">Offline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-[10%] bg-bgDark text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Contact <span className="text-neonCyan">Me!</span></h2>
        
        {/* Info Cards */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-12 max-w-4xl mx-auto">
          {/* Email Card */}
          <div className="flex-1 bg-[#323946] p-8 rounded-2xl shadow-lg border border-transparent hover:border-neonCyan transition-all duration-300 group">
            <Mail className="w-10 h-10 text-neonCyan mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-gray-400 text-lg mb-2">Email Me</h3>
            <a href="mailto:thirumalaivasan944@gmail.com" className="text-white text-xl font-bold hover:text-neonCyan transition-colors">
              thirumalaivasan944@gmail.com
            </a>
          </div>

          {/* Phone Card */}
          <div className="flex-1 bg-[#323946] p-8 rounded-2xl shadow-lg border border-transparent hover:border-neonCyan transition-all duration-300 group">
            <Phone className="w-10 h-10 text-neonCyan mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-gray-400 text-lg mb-2">Call / WhatsApp</h3>
            <a href="tel:+917305164503" className="text-white text-xl font-bold hover:text-neonCyan transition-colors">
              +91 73051 64503
            </a>
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" required className="p-4 bg-[#323946] rounded-xl border-2 border-transparent focus:border-neonCyan focus:shadow-[0_0_1rem_#0ef] outline-none transition-all" />
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" required className="p-4 bg-[#323946] rounded-xl border-2 border-transparent focus:border-neonCyan focus:shadow-[0_0_1rem_#0ef] outline-none transition-all" />
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile Number" required className="p-4 bg-[#323946] rounded-xl border-2 border-transparent focus:border-neonCyan focus:shadow-[0_0_1rem_#0ef] outline-none transition-all" />
          <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Email Subject" required className="p-4 bg-[#323946] rounded-xl border-2 border-transparent focus:border-neonCyan focus:shadow-[0_0_1rem_#0ef] outline-none transition-all" />
          <textarea name="message" value={formData.message} onChange={handleInputChange} rows="8" placeholder="Your Message" required className="md:col-span-2 p-4 bg-[#323946] rounded-xl border-2 border-transparent focus:border-neonCyan focus:shadow-[0_0_1rem_#0ef] outline-none transition-all resize-none"></textarea>
          <div className="md:col-span-2 mt-4 space-y-4">
             <button type="submit" className="px-12 py-4 bg-neonCyan text-bgDark rounded-full font-bold text-xl hover:shadow-[0_0_1.5rem_#0ef] transition-all duration-300">Send Message</button>
             {result && (
               <p className="text-xl font-bold text-neonCyan animate-pulse drop-shadow-[0_0_0.5rem_#0ef]">
                 {result}
               </p>
             )}
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#1b1f24] px-[10%] flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-lg font-medium">
          Copyright &copy; {new Date().getFullYear()} by <span className="text-neonCyan">Thirumalaivasan T</span> | All Rights Reserved.
        </div>
        <a href="#home" className="p-3 bg-neonCyan text-bgDark rounded-xl hover:shadow-[0_0_1rem_#0ef] transition-all duration-300">
          <ChevronUp className="w-6 h-6" />
        </a>
      </footer>
    </div>
  );
};

export default App;
