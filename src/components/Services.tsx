import { Code2, Palette, Search, Sparkles, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Website Development',
    description:
      'Lightning-fast, scalable websites and web apps built with modern frameworks. From landing pages to complex platforms, we engineer experiences that perform.',
    accent: 'from-electric-400 to-electric-700',
    glow: 'shadow-electric-500/20',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Human-centered interfaces that feel intuitive and look stunning. We research, prototype, and refine every pixel to create designs users love.',
    accent: 'from-cyan-400 to-cyan-600',
    glow: 'shadow-cyan-500/20',
  },
  {
    icon: Search,
    title: 'SEO & Digital Marketing',
    description:
      'Data-driven strategies that put your brand in front of the right audience. Technical SEO, content, and campaigns that deliver measurable growth.',
    accent: 'from-electric-300 to-electric-600',
    glow: 'shadow-electric-400/20',
  },
  {
    icon: Sparkles,
    title: 'Branding & Identity',
    description:
      'Distinctive brand identities that resonate. From logo systems to complete visual languages, we help you stand apart and stay memorable.',
    accent: 'from-cyan-400 to-electric-500',
    glow: 'shadow-cyan-400/20',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative section-padding">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-5">
            <span className="text-xs font-semibold text-electric-300 uppercase tracking-wider">
              What We Do
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-balance">
            Services Built for{' '}
            <span className="gradient-text">Modern Brands</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We offer end-to-end digital services that cover every stage of
            your brand's journey — from first concept to lasting growth.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative glass-card rounded-2xl p-8 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center shadow-lg ${service.glow} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  {service.title}
                  <ArrowUpRight className="w-4 h-4 text-electric-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${service.accent} transition-all duration-500 group-hover:w-full`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
