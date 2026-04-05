import { Button } from '../Button'
import { Card } from '../Card'
import { Badge } from '../Badge'
import { Check } from 'lucide-react'

interface Plan {
  name: string
  description: string
  price: string
  period: string
  features: string[]
  highlighted?: boolean
  badgeText?: string
}

const plans: Plan[] = [
  {
    name: 'Ghost',
    description: 'For the lone operative',
    price: '$9',
    period: '/month',
    features: [
      'Basic terminal access',
      'Real-time alerts',
      'Community support',
      'Standard encryption',
      'Monitor 1 system',
    ],
  },
  {
    name: 'Apex',
    description: 'For the network elite',
    price: '$29',
    period: '/month',
    features: [
      'Full API access',
      'Priority support',
      'Advanced encryption',
      'Monitor 50 systems',
      'Custom dashboards',
      'Data export',
      'Team collaboration',
    ],
    highlighted: true,
    badgeText: 'MOST POPULAR',
  },
  {
    name: 'Singularity',
    description: 'For corporate overlords',
    price: 'Custom',
    period: 'Enterprise',
    features: [
      'Dedicated support',
      'Custom integrations',
      'Unlimited systems',
      'White-label options',
      'SLA guarantee',
      'Compliance tools',
      'Advanced AI insights',
    ],
  },
]

export const Pricing = () => {
  return (
    <section id="pricing" className="relative w-full py-24 md:py-32 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-wide text-accent mb-4">
            Access Tiers
          </h2>
          <p className="text-muted-foreground max-w-2xl font-mono leading-relaxed mx-auto">
            Choose your level of infiltration. Whether solo operative or corporate entity.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                transform transition-all
                ${plan.highlighted ? 'md:scale-105 lg:scale-110' : ''}
              `}
            >
              <Card
                variant="default"
                className={`
                  p-8 h-full flex flex-col
                  ${plan.highlighted ? 'border-accent border-opacity-100 shadow-neon-lg' : 'border-opacity-50'}
                `}
              >
                {/* Badge */}
                {plan.badgeText && (
                  <div className="mb-4">
                    <Badge variant="secondary">{plan.badgeText}</Badge>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-h2 font-heading uppercase tracking-wide text-foreground mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-mono text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-heading font-bold text-accent">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground font-mono text-sm">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan.highlighted ? 'glitch' : 'outline'}
                  size="lg"
                  className="w-full mb-8"
                >
                  {plan.highlighted ? 'Activate Apex' : 'Select Plan'}
                </Button>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-border via-accent via-opacity-30 to-border mb-6"></div>

                {/* Features List */}
                <ul className="space-y-4 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="font-mono text-sm text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer accent line */}
                <div className="mt-6 h-px bg-gradient-to-r from-accent to-transparent opacity-30"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
