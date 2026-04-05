import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-12 border-b border-border">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-h3 font-heading text-accent">&gt;_</div>
              <span className="font-heading text-lg font-bold text-foreground uppercase">Cyber</span>
            </div>
            <p className="text-muted-foreground font-mono text-sm leading-relaxed">
              High-tech, low-life. Your interface to the sprawl.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-label text-accent uppercase mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Security', 'API'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-accent transition-colors font-mono text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-label text-accent uppercase mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-accent transition-colors font-mono text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-label text-accent uppercase mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Cookies', 'Compliance'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-accent transition-colors font-mono text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="space-y-6">
          {/* Social icons */}
          <div className="flex items-center gap-6">
            <span className="text-label text-muted-foreground">CONNECT</span>
            <div className="flex gap-4">
              {[
                { icon: Github, href: '#github', label: 'GitHub' },
                { icon: Twitter, href: '#twitter', label: 'Twitter' },
                { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:hello@cyber.dev', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border">
            <p className="text-muted-foreground font-mono text-xs text-center">
              &copy; {currentYear} Cyberpunk Design System. All rights reserved. Keep your head down in the sprawl.
            </p>
          </div>
        </div>
      </div>

      {/* Footer accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-20"></div>
    </footer>
  )
}
