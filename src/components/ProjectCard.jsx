import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ 
  title, 
  tag, 
  description, 
  techIcons, 
  highlights, 
  liveLink, 
  githubLink, 
  accentColor = '#00eaee' 
}) => {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1500}
      className="h-full"
    >
      <div 
        className="h-full bg-glassBorder/10 backdrop-blur-md border border-white/5 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:border-accent group"
        style={{ '--accent': accentColor }}
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-extrabold" style={{ 
            background: `linear-gradient(90deg, ${accentColor}, #fff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {title}
          </h3>
          <span 
            className="px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap"
            style={{ 
              borderColor: `${accentColor}44`,
              color: accentColor,
              backgroundColor: `${accentColor}11`
            }}
          >
            {tag}
          </span>
        </div>

        <p className="text-[#a0a0b0] leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <div className="flex gap-4 mb-8">
          {techIcons.map((icon, idx) => (
            <div key={idx} className="hover:scale-125 transition-transform duration-300">
              {typeof icon === 'string' ? (
                <img src={icon} alt="tech" className="w-7 h-7" />
              ) : (
                <icon.component className="w-7 h-7" style={{ color: accentColor }} />
              )}
            </div>
          ))}
        </div>

        <ul className="space-y-3 mb-8">
          {highlights.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
              <span style={{ color: accentColor }}>🔥</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          {liveLink && (
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center rounded-xl font-bold transition-all duration-300"
              style={{
                background: `linear-gradient(90deg, ${accentColor}, ${accentColor}dd)`,
                color: '#08080c',
                boxShadow: `0 0 15px ${accentColor}44`
              }}
            >
              Live Demo 🚀
            </a>
          )}
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center rounded-xl font-bold border transition-all duration-300 hover:bg-white/5"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                color: '#fff'
              }}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </Tilt>
  );
};

export default ProjectCard;
