import { ArrowRight, Sparkles, Code, Palette, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-midnight-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-electric-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Floating accent shapes */}
      <div className="absolute top-32 right-[15%] w-16 h-16 rounded-2xl border border-electric-500/20 bg-electric-500/5 backdrop-blur-sm animate-float hidden lg:block">
        <div className="w-full h-full flex items-center justify-center">
          <Code className="w-7 h-7 text-electric-300/60" />
        </div>
      </div>
      <div className="absolute bottom-40 left-[12%] w-14 h-14 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm animate-float hidden lg:block" style={{ animationDelay: '1.5s' }}>
        <div className="w-full h-full flex items-center justify-center">
          <Palette className="w-6 h-6 text-cyan-400/60" />
        </div>
      </div>
      <div className="absolute top-1/3 left-[8%] w-12 h-12 rounded-xl border border-electric-400/20 bg-electric-400/5 backdrop-blur-sm animate-float hidden lg:block" style={{ animationDelay: '3s' }}>
        <div className="w-full h-full flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-electric-300/60" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-down">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-400" />
          </span>
          <span className="text-sm text-gray-300 font-medium">Premium Digital Agency · Available for new projects</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] text-balance mb-6 animate-fade-in-up">
          Digital Experiences That{' '}
          <span className="gradient-text">Move Businesses Forward.</span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up animate-delay-200">
          NOVA Digital helps businesses grow through expert web development,
          UI/UX design, branding, and digital strategy. We craft experiences
          that engage, convert, and endure.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
          <a href="#contact" className="btn-primary group">
            Start a Project
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="#services" className="btn-secondary group">
            <Sparkles className="w-4 h-4 text-electric-400" />
            Explore Services
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-500">
          {[
            { value: '150+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '10yr', label: 'Industry Experience' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-4xl font-bold gradient-text font-display">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight-950 to-transparent" />
    </section>
  );
}
