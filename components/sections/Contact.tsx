import { Container } from "../layout/Container";
import portfolioData from "../../data/portfolio.json";
import { ContactForm } from "../ui/ContactForm";
import { SECTION_SPACING } from "../../lib/constants";

export function Contact() {
  const { email, github, linkedin, phone, location, whatsapp } = portfolioData.personalInfo;

  return (
    <section id="contact" className={`${SECTION_SPACING} relative overflow-hidden`}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] sm:h-[500px] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-500/10 to-transparent opacity-50 z-0 pointer-events-none" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.05]"
        style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)' }}
      >
        <svg className="absolute w-[200%] h-[200%] sm:w-[150%] sm:h-[150%] text-white" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 relative flex flex-col items-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-400">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
            </svg>
            <span className="text-xs font-medium tracking-[0.3em] text-gray-400 uppercase">
              RECENT GRADUATE
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-normal text-white relative z-10">
            Let&apos;s connect and<br />
            <span className="relative inline-block text-emerald-500 pb-2">grow together.</span>
          </h2>
        </div>
        
        {/* Contact Layout */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:gap-y-12 items-start">
          
          {/* Intro Text (Order 1 on mobile, Col 1 Row 1 on desktop) */}
          <div className="flex flex-col z-10 w-full order-1 lg:col-start-1 lg:row-start-1">
            <p className="text-gray-400 text-sm md:text-base lg:text-lg font-light leading-relaxed">
              I&apos;m actively seeking my first full-time role as a frontend developer. Whether you&apos;re hiring, want to collaborate on a project, or just want to chat about tech, I&apos;d love to hear from you!
            </p>
          </div>

          {/* Form (Order 2 on mobile, Col 2 Row 1-span-2 on desktop) */}
          <div className="relative group w-full order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="absolute -inset-[1px] rounded-[2rem] bg-emerald-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-700 blur-sm hidden lg:block" />
            
            <div className="relative w-full rounded-[2rem] bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 lg:border-white/10 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-500/15 to-transparent opacity-50 pointer-events-none" />
              <ContactForm />
            </div>
          </div>

          {/* Contact Details & Socials (Order 3 on mobile, Col 1 Row 2 on desktop) */}
          <div className="flex flex-col z-10 w-full space-y-12 order-3 lg:col-start-1 lg:row-start-2">
            
            {/* Contact Details */}
            <div className="space-y-6">
              {/* Email */}
              <a href={`mailto:${email}`} className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
              </a>

              {/* Phone */}
              {phone && (
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{phone}</p>
                  </div>
                </div>
              )}

              {/* Location */}
              {location && (
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-linear-to-r from-white/10 to-transparent my-2" />

            {/* Socials */}
            <div>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-6 block">
                Find me online
              </span>
              <div className="flex gap-4">
                {/* LinkedIn */}
                <a 
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 hover:text-[#0A66C2] hover:-translate-y-1 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                
                {/* GitHub */}
                <a 
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 hover:text-white hover:-translate-y-1 transition-all duration-300 group"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                {whatsapp && (
                  <a 
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366]/10 hover:border-[#25D366]/40 hover:text-[#25D366] hover:-translate-y-1 transition-all duration-300 group"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#25D366] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
