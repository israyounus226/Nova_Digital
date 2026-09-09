import { Lightbulb, PenTool, Hammer, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Strategy',
    description:
      'We dive deep into your business, audience, and goals to define a clear digital roadmap that aligns with your vision.',
    number: '01',
  },
  {
    icon: PenTool,
    title: 'Design',
    description:
      'We craft beautiful, user-centered interfaces — wireframes, prototypes, and visual systems that bring your brand to life.',
    number: '02',
  },
  {
    icon: Hammer,
    title: 'Build',
    description:
      'We engineer robust, scalable solutions with clean code and modern tech stacks, rigor tested for performance and quality.',
    number: '03',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    description:
      'We launch, measure, and optimize. Through analytics and iteration, we ensure your product keeps evolving and growing.',
    number: '04',
  },
];

export default function About() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-midnight-900/50" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-5">
            <span className="text-xs font-semibold text-electric-300 uppercase tracking-wider">
              How We Work
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-balance">
            Our Approach:{' '}
            <span className="gradient-text">Strategy → Design → Build → Grow</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A proven four-step process that transforms ideas into impactful
            digital products — and keeps them growing long after launch.
          </p>
        </div>

        {/* Process timeline */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Card */}
                  <div className="glass-card rounded-2xl p-7 h-full relative overflow-hidden">
                    {/* Number watermark */}
                    <span className="absolute top-4 right-5 text-5xl font-bold text-white/[0.04] font-display select-none">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-electric-500 to-electric-700 flex items-center justify-center shadow-lg shadow-electric-500/20 mb-5 transition-transform duration-500 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Step indicator */}
                    <div className="text-xs font-semibold text-electric-400 uppercase tracking-wider mb-2">
                      Step {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-electric-400 to-cyan-400 transition-all duration-500 group-hover:w-full" />
                  </div>

                  {/* Arrow between steps - desktop */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-16 -right-3 w-6 h-6 items-center justify-center text-electric-500/40 z-10">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
