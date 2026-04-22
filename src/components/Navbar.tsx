import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const navItems = [
  { path: '/', label: 'Главная' },
  { path: '/protocols', label: 'Клинические схемы' },
  { path: '/ergonomics', label: 'Эргономика' },
  { path: '/athletics', label: 'Атлетика' },
  { path: '/research', label: 'Исследования' },
  { path: '/tools', label: 'Инструменты' },
] as const;

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const active = useMemo(() => {
    const hit = navItems.find(i => i.path === location.pathname);
    return hit?.path ?? '';
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] glass-nav z-50">
      <div className="container mx-auto px-6 h-full flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3 group relative" onClick={() => setOpen(false)}>
          <div className="absolute -left-3 w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
          <span className="font-black text-xl tracking-tight text-white">IT Health Lab</span>
        </Link>

        <nav className="ml-auto hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = active === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 text-sm font-semibold transition-colors ${isActive ? 'text-primary' : 'text-muted hover:text-primary'}`}
              >
                {item.label}
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

        <button
          className="ml-auto md:hidden w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
          onClick={() => setOpen(v => !v)}
          aria-label="Меню"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, y: 0, pointerEvents: 'auto' },
          closed: { opacity: 0, y: -8, pointerEvents: 'none' },
        }}
        id="mobile-nav-menu"
        className="md:hidden absolute top-[72px] left-0 right-0 glass-nav border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition ${active === item.path ? 'bg-primary/15 text-primary' : 'text-muted hover:bg-white/5 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
