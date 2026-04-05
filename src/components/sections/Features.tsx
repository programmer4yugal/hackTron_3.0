import { Card } from '../Card'
import { Zap, Shield, Wifi, Cpu, Eye, Lock } from 'lucide-react'

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
  accentColor: 'accent' | 'accent-secondary' | 'accent-tertiary'
}

const features: FeatureItem[] = [
  {
    icon: <Zap size={24} />,
    title: 'Hypercharged',
    description: 'Experience lightning-fast performance with neon-level intensity. Every interaction crackles with digital energy.',
    accentColor: 'accent',
  },
  {
    icon: <Shield size={24} />,
    title: 'Fortified',
    description: 'Military-grade security protecting your data. Your fortress in the sprawl, impenetrable and unwavering.',
    accentColor: 'accent-secondary',
  },
  {
    icon: <Wifi size={24} />,
    title: 'Connected',
    description: 'Always online, always synchronized. One with the network, flowing through digital highways.',
    accentColor: 'accent-tertiary',
  },
  {
    icon: <Cpu size={24} />,
    title: 'Optimized',
    description: 'Precision-engineered for maximum efficiency. Every byte counts in the machine code of freedom.',
    accentColor: 'accent',
  },
  {
    icon: <Eye size={24} />,
    title: 'Aware',
    description: 'Real-time intelligence at your fingertips. See the sprawl, understand the flow, predict the future.',
    accentColor: 'accent-secondary',
  },
  {
    icon: <Lock size={24} />,
    title: 'Encrypted',
    description: 'Your secrets are safe. Encrypted chains bind your data beyond corporate reach, in the void.',
    accentColor: 'accent-tertiary',
  },
]

export const Features = () => {
  return (
    <section id="features" className="relative w-full py-24 md:py-32 bg-background circuit-grid border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-wide text-accent mb-4">
            The Arsenal
          </h2>
          <p className="text-muted-foreground max-w-2xl font-mono leading-relaxed">
            Tools and features designed for the digital insurgent. Everything you need to navigate the sprawl.
          </p>
        </div>

        {/* Features Grid - 3 columns with staggered heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="default"
              hoverEffect
              className={`
                p-6 flex flex-col 
                ${index % 2 === 0 ? 'lg:pb-10' : 'lg:pt-10'}
                ${index === 5 ? 'lg:col-span-1 lg:row-span-2' : ''}
              `}
            >
              {/* Icon with glow */}
              <div className={`
                mb-4 text-${feature.accentColor} 
                drop-shadow-neon p-3 w-fit
              `}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-h3 font-heading mb-3 uppercase text-foreground">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground font-mono text-sm leading-relaxed flex-grow">
                {feature.description}
              </p>

              {/* Accent line */}
              <div className={`mt-4 h-px bg-gradient-to-r from-${feature.accentColor} to-transparent opacity-50`}></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
