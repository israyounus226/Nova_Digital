import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-midnight-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-electric-600/15 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 animate-fade-in-down">
          <Sparkles className="w-3.5 h-3.5 text-electric-400" />
          <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Let's Build Together
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance animate-fade-in-up">
          Ready to Build Something{' '}
          <span className="gradient-text">That Matters?</span>
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
          Tell us about your vision. We'll turn it into a digital experience
          your audience won't forget. Every great project starts with a
          conversation — let's have yours today.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
          <a href="mailto:hello@novadigital.com" className="btn-primary group text-base">
            Start a Project
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="#services" className="btn-secondary text-base">
            View Our Services
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-10 text-sm text-gray-500 animate-fade-in-up animate-delay-500">
          No commitment required · Free initial consultation · Reply within 24 hours
        </p>
      </div>
    </section>
  );
}
