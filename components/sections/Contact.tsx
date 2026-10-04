import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";

export function Contact() {
  const { email, github, linkedin } = portfolioData.personalInfo;

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] sm:h-[500px] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-500/10 via-purple-500/5 to-transparent opacity-50 z-0 pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-20 mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)">
        <svg className="absolute w-[200%] h-[200%] sm:w-[150%] sm:h-[150%] text-accent" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] mb-8">
          <span className="text-sm sm:text-lg">🎓</span>
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-gray-400 uppercase">
            Recent Graduate
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-center mb-6 leading-[1.1] sm:leading-[1.1]">
          Let&apos;s connect and <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
            grow together.
          </span>
        </h2>
        
        <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl text-center mb-12 sm:mb-16 font-light px-2">
          I&apos;m actively seeking my first full-time role as a frontend developer. Whether you&apos;re hiring, want to collaborate on a project, or just want to chat about tech, I&apos;d love to hear from you!
        </p>

        {/* Contact Card */}
        <div className="w-full max-w-4xl relative group">
          {/* Animated border glow (visible mostly on desktop) */}
          <div className="hidden sm:block absolute -inset-[1px] rounded-[2rem] bg-linear-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 opacity-20 group-hover:opacity-50 transition-opacity duration-700 blur-sm" />
          
          <div className="relative w-full rounded-3xl sm:rounded-[2rem] bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 sm:border-white/10 p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden">
            
            {/* Ambient inner glow for mobile */}
            <div className="absolute top-0 left-0 w-full h-32 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-500/20 via-purple-500/5 to-transparent opacity-50 pointer-events-none" />

            {/* Left Column: Email */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:w-1/2 md:pr-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-5 sm:mb-6 shadow-inner">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-wide">Reach Out</h3>
              <p className="text-muted-foreground mb-8 text-sm sm:text-base max-w-[280px]">
                My inbox is always open. Feel free to drop a message!
              </p>
              <a 
                href={`mailto:${email}`}
                className="group/btn relative inline-flex items-center justify-center w-full md:w-auto h-12 sm:h-14 px-8 rounded-xl sm:rounded-2xl bg-white text-black font-semibold text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)]"
              >
                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-gray-200 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center">
                  Drop an Email
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 -mr-1 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Divider */}
            <div className="md:hidden w-full h-[1px] bg-linear-to-r from-transparent via-white/10 to-transparent my-8" />
            <div className="hidden md:block w-[1px] self-stretch bg-linear-to-b from-transparent via-white/10 to-transparent mx-4 lg:mx-8" />

            {/* Right Column: Socials */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 z-10 md:pl-4">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-6 sm:mb-8 text-center">
                Or Connect On
              </span>
              <div className="flex gap-4 sm:gap-6 w-full justify-center">
                
                {/* GitHub */}
                <a 
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[24px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(255,255,255,0.2)] transition-all duration-500 group/icon"
                  aria-label="GitHub"
                >
                  <div className="absolute inset-0 rounded-2xl sm:rounded-[24px] bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 group-hover/icon:text-white relative z-10 transition-colors mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-500 group-hover/icon:text-gray-300 relative z-10 transition-colors">GitHub</span>
                </a>
                
                {/* LinkedIn */}
                <a 
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[24px] bg-white/[0.02] border border-white/5 hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(10,102,194,0.3)] transition-all duration-500 group/icon"
                  aria-label="LinkedIn"
                >
                  <div className="absolute inset-0 rounded-2xl sm:rounded-[24px] bg-linear-to-b from-[#0A66C2]/10 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 group-hover/icon:text-[#0A66C2] relative z-10 transition-colors mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-500 group-hover/icon:text-[#0A66C2]/80 relative z-10 transition-colors">LinkedIn</span>
                </a>
              </div>
            </div>
            
          </div>
        </div>

      </Container>
    </section>
  );
}
