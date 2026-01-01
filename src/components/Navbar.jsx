import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../components/ui/navigation-menu.jsx';
import { Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/flashcards', label: 'Flash Cards' },
    { path: '/about', label: 'About Us' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300 ${scrolled ? 'top-4' : 'top-6'}`}
      >
        <motion.nav
          className={`glass glass-border rounded-xl px-8 py-4 transition-all duration-300 ${scrolled ? 'glow shadow-lg shadow-primary/20' : ''}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <NavigationMenu>
            <NavigationMenuList className="flex gap-8">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`text-base font-normal transition-all duration-300 ease-in-out hover:text-primary cursor-pointer relative group ${isActive(item.path) ? 'text-primary' : 'text-gray-100'
                          }`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary transform origin-left"
                          initial={{ scaleX: isActive(item.path) ? 1 : 0 }}
                          animate={{ scaleX: isActive(item.path) ? 1 : 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        {!isActive(item.path) && (
                          <motion.span
                            className="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 -z-0"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </motion.nav>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
      >
        <nav className="glass glass-border px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-headline font-medium text-gray-50 gradient-text-primary">
            Flashcards
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-transparent text-gray-100 hover:bg-primary/20 hover:text-primary transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="glass glass-border mt-2 mx-4 rounded-xl overflow-hidden bg-tertiary"
            >
              <NavigationMenu className="w-full">
                <NavigationMenuList className="flex flex-col w-full">
                  {navItems.map((item, index) => (
                    <NavigationMenuItem key={item.path} className="w-full">
                      <NavigationMenuLink asChild>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Link
                            to={item.path}
                            className={`block w-full px-6 py-4 text-base font-normal transition-all duration-200 ease-in-out hover:bg-primary/20 cursor-pointer relative ${isActive(item.path)
                                ? 'text-primary bg-primary/10'
                                : 'text-gray-100'
                              }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="relative z-10">{item.label}</span>
                            {isActive(item.path) && (
                              <motion.div
                                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-purple-500"
                                layoutId="activeIndicator"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                          </Link>
                        </motion.div>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

export default Navbar
