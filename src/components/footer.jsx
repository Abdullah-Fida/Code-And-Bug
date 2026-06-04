import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + copyright */}
        <div className="flex items-center gap-6">
          <AppLogo size={28} text="Signal" />
          <span className="text-dim text-sm">© 2026 Signal</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-8">
          {['Privacy', 'Terms', 'Results'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[13px] font-medium text-muted hover:text-silver transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-4">
          {[
            { name: 'Twitter', icon: 'GlobeAltIcon' },
            { name: 'LinkedIn', icon: 'LinkIcon' },
          ].map((s) => (
            <a
              key={s.name}
              href="#"
              aria-label={s.name}
              className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-sm text-muted hover:border-gold hover:text-gold transition-all duration-200"
            >
              <Icon name={s.icon as 'GlobeAltIcon'} size={15} variant="outline" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;