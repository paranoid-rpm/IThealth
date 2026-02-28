import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Главная' },
    { path: '/protocols', label: 'Клинические протоколы' },
    { path: '/ergonomics', label: 'Эргономика GOST' },
    { path: '/research', label: 'Исследования' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] glass-nav z-50">
      <div className="container mx-auto px-6 h-full flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="absolute -left-3 w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
          <span className="font-black text-xl tracking-tight text-white">IT Health Lab</span>
        </Link>
        
        <nav className="ml-auto hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={`relative py-2 text-sm font-semibold transition-colors ${isActive ? 'text-primary' : 'text-muted hover:text-primary'}`}
              >
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}