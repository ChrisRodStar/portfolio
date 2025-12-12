"use client";

import { useState, useEffect } from "react";

// Note: Metadata must be in a separate file for client components
// See src/app/(about)/resume/layout.tsx for SEO metadata

const resumeData = {
  name: "Christopher Rodriguez",
  title: "Full Stack Developer",
  location: "Greensboro, NC",
  email: "chris@example.com",
  github: "ChrisRodStar",
  linkedin: "ChrisRodStar",
  summary:
    "Self-taught developer passionate about building clean, fast web applications. Focused on modern frameworks and great user experiences.",
  skills: [
    "JavaScript/TypeScript",
    "React/Next.js",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
    "Git/GitHub",
    "Vercel",
    "REST APIs",
  ],
  experience: [
    {
      role: "Full Stack Developer",
      company: "Freelance",
      period: "2023 - Present",
      highlights: [
        "Building modern web applications with Next.js and React",
        "Implementing responsive designs with Tailwind CSS",
        "Deploying and maintaining projects on Vercel",
      ],
    },
  ],
  education: [
    {
      degree: "Self-Taught Developer",
      institution: "Online Resources & Projects",
      period: "2022 - Present",
      details: "Continuous learning through building real-world projects",
    },
  ],
};

const commands = [
  { cmd: "cat resume.txt", section: "header" },
  { cmd: "cat skills.txt", section: "skills" },
  { cmd: "cat experience.txt", section: "experience" },
  { cmd: "cat education.txt", section: "education" },
];

export default function ResumePage() {
  const [visibleSections, setVisibleSections] = useState<number>(0);
  const typing = visibleSections < commands.length;

  useEffect(() => {
    if (visibleSections < commands.length) {
      // After typing animation, show the content
      const typingTimer = setTimeout(() => {
        setVisibleSections((prev) => prev + 1);
      }, 1200);

      return () => clearTimeout(typingTimer);
    }
  }, [visibleSections]);

  return (
    <main className="p-4 md:p-8 max-w-4xl mx-auto flex flex-col flex-1">
      <div className="card overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-mantle border-b border-card-border">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-muted text-sm ml-2">~/resume</span>
        </div>

        {/* Terminal Content */}
        <div className="p-4 font-mono text-sm space-y-4 bg-crust">
          {/* Header Section */}
          {visibleSections >= 0 && (
            <div>
              <p className="text-muted mb-2">
                <span className="text-accent">$</span>{" "}
                <span className="typewriter-cmd inline-block">{commands[0].cmd}</span>
              </p>
              {visibleSections >= 1 && (
                <div className="pl-4 border-l-2 border-accent/30 animate-border-glow space-y-1">
                  <p className="text-accent text-lg font-bold animate-slide-left">{resumeData.name}</p>
                  <p className="text-foreground animate-slide-left stagger-1 opacity-0">{resumeData.title}</p>
                  <p className="text-muted animate-slide-left stagger-2 opacity-0">{resumeData.location}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs">
                    <a
                      href={`https://github.com/${resumeData.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors animate-slide-up stagger-3 opacity-0"
                    >
                      github/{resumeData.github}
                    </a>
                    <a
                      href={`https://linkedin.com/in/${resumeData.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors animate-slide-up stagger-4 opacity-0"
                    >
                      linkedin/{resumeData.linkedin}
                    </a>
                  </div>
                  <p className="text-muted mt-3 text-xs leading-relaxed max-w-xl animate-fade-in stagger-5 opacity-0">
                    {resumeData.summary}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Skills Section */}
          {visibleSections >= 1 && (
            <div>
              <p className="text-muted mb-2">
                <span className="text-accent">$</span>{" "}
                <span className="typewriter-cmd inline-block">{commands[1].cmd}</span>
              </p>
              {visibleSections >= 2 && (
                <div className="pl-4 border-l-2 border-accent/30 animate-border-glow">
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, i) => (
                      <span
                        key={skill}
                        className={`px-2 py-1 text-xs bg-surface text-accent rounded border border-accent/30
                          animate-scale-in opacity-0 hover:animate-glow transition-all duration-300
                          stagger-${i + 1}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Experience Section */}
          {visibleSections >= 2 && (
            <div>
              <p className="text-muted mb-2">
                <span className="text-accent">$</span>{" "}
                <span className="typewriter-cmd inline-block">{commands[2].cmd}</span>
              </p>
              {visibleSections >= 3 && (
                <div className="pl-4 border-l-2 border-accent/30 animate-border-glow space-y-4">
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="animate-slide-up">
                      <p className="text-foreground font-medium animate-slide-left">{exp.role}</p>
                      <p className="text-accent text-xs animate-slide-left stagger-1 opacity-0">{exp.company}</p>
                      <p className="text-muted text-xs mb-2 animate-slide-left stagger-2 opacity-0">{exp.period}</p>
                      <ul className="space-y-1">
                        {exp.highlights.map((h, j) => (
                          <li
                            key={j}
                            className={`text-muted text-xs animate-slide-left opacity-0 stagger-${j + 3}`}
                          >
                            <span className="text-accent mr-2">→</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Education Section */}
          {visibleSections >= 3 && (
            <div>
              <p className="text-muted mb-2">
                <span className="text-accent">$</span>{" "}
                <span className="typewriter-cmd inline-block">{commands[3].cmd}</span>
              </p>
              {visibleSections >= 4 && (
                <div className="pl-4 border-l-2 border-accent/30 animate-border-glow space-y-3">
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="animate-slide-up">
                      <p className="text-foreground font-medium animate-slide-left">{edu.degree}</p>
                      <p className="text-accent text-xs animate-slide-left stagger-1 opacity-0">{edu.institution}</p>
                      <p className="text-muted text-xs animate-slide-left stagger-2 opacity-0">{edu.period}</p>
                      <p className="text-muted text-xs mt-1 animate-fade-in stagger-3 opacity-0">{edu.details}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Cursor */}
          <p className="text-muted">
            <span className="text-accent">$</span>{" "}
            {typing ? (
              <span className="cursor-blink">|</span>
            ) : (
              <span className="text-muted">
                exit <span className="cursor-blink">|</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
