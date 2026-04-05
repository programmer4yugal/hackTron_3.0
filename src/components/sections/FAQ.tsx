import { useState } from 'react'
import { Card } from '../Card'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Is my data truly encrypted?',
    answer: 'Yes. Military-grade AES-256 encryption protects all data at rest and in transit. Your secrets stay secret. No backdoors, no compromise.',
  },
  {
    question: 'Can I integrate with existing systems?',
    answer: 'Absolutely. Our API supports REST, GraphQL, and WebSocket protocols. Connect anything, anywhere. The network flows where you need it.',
  },
  {
    question: 'What happens if I exceed my limit?',
    answer: 'Your service continues uninterrupted. Once detected, we notify you with options to upgrade or adjust your tier. Transparency is key.',
  },
  {
    question: 'How many team members can I add?',
    answer: 'Unlimited on Apex and Singularity plans. Each member can have granular permissions tailored to their role and clearance level.',
  },
  {
    question: 'Do you offer SLA guarantees?',
    answer: '99.99% uptime SLA on Enterprise plans. Standard tiers receive community support within 24 hours. Premium support available for all.',
  },
  {
    question: 'Can I export my data?',
    answer: 'Yes. All plans allow data export in JSON, CSV, or native formats. Your data belongs to you. Leave anytime without friction.',
  },
]

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative w-full py-24 md:py-32 bg-background circuit-grid border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-wide text-accent mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl font-mono leading-relaxed">
            Intel for the curious. If you don't find what you're looking for, reach out to our support channel.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              variant="terminal"
              className={`
                overflow-hidden transition-all
                ${openIndex === index ? 'border-accent' : ''}
              `}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-muted hover:bg-opacity-30 transition-colors"
              >
                <h3 className="text-lg font-mono font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`
                    text-accent flex-shrink-0 transition-transform
                    ${openIndex === index ? 'rotate-180' : ''}
                  `}
                />
              </button>

              {/* Expanded content */}
              {openIndex === index && (
                <div className="px-6 pb-6 border-t border-border">
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 pt-16 border-t border-border text-center">
          <p className="text-foreground font-heading text-xl uppercase mb-4">
            Need Help?
          </p>
          <p className="text-muted-foreground font-mono mb-6">
            Reach out to our 24/7 support or join the operative community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@cyber.dev"
              className="px-6 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-background transition-all chamfer-sm font-mono uppercase"
            >
              Contact Support
            </a>
            <a
              href="#community"
              className="px-6 py-2 border-2 border-accent-secondary text-accent-secondary hover:bg-accent-secondary hover:text-background transition-all chamfer-sm font-mono uppercase"
            >
              Join Community
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
