"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

export default function EnhancedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { name: "Events", link: '/Upcomingevents/details', icon: "🎯" },
    { name: "Our Team", link: "/team", icon: "👥" },
    { name: "Leaderboard", link: "/leaderboard", icon: "🏆" },
    { name: "Workshop", link: "/workshop", icon: "🔧" },
    { name: "About Us", link: "/about_us", icon: "ℹ️" },
    { name: "Alumni", link: "/alumni", icon: "🎓" },
    { name: "Contact Us", link: "/contact_us", icon: "📞" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 20px rgba(74, 108, 210, 0.3); }
          50% { opacity: 1; box-shadow: 0 0 30px rgba(74, 108, 210, 0.6); }
        }
        
        .cosmic-glow {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(74, 108, 210, 0.1),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        
        .nav-item-glow {
          position: relative;
        }
        
        .nav-item-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(90deg, #4a6cd2, #7c4dff, #4a6cd2);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
          filter: blur(8px);
        }
        
        .nav-item-glow:hover::before {
          opacity: 0.4;
          animation: glow-pulse 2s infinite;
        }
        
        .mobile-menu-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-menu-item:hover {
          transform: translateX(8px);
          background: rgba(74, 108, 210, 0.15);
        }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, rgba(74, 108, 210, 0.1), rgba(124, 77, 255, 0.1));
          border: 1px solid rgba(74, 108, 210, 0.3);
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, #4a6cd2, #7c4dff);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .gradient-border:hover::before {
          opacity: 1;
        }
      `}</style>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${poppins.className}`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(13, 13, 30, 0.95) 0%, rgba(25, 25, 50, 0.92) 100%)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(150%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(150%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(74, 108, 210, 0.2)' : 'none',
        }}
      >
        <div className="relative">
          {/* Cosmic glow effect */}
          {isScrolled && (
            <div className="absolute bottom-0 left-0 right-0 h-[1px] cosmic-glow" />
          )}

          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-6 py-4">
            
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-300" />
                <Image
                  src="/photos/UrjaSangam/Rgipt_logo.png"
                  alt="College Logo"
                  width={40}
                  height={40}
                  className="relative z-10 rounded-full"
                />
              </motion.div>

              {/* Animated Separator */}
              <div className="relative h-8 w-[2px] hidden sm:block">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4a6cd2] to-transparent"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: -360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative hidden sm:block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-all duration-300" />
                <Image
                  src="/photos/UrjaSangam/urjasangam_logo_background.png"
                  alt="Urja Sangam Logo"
                  width={45}
                  height={45}
                  className="relative z-10 rounded-full"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => (
                <Link 
                  key={item.name}
                  href={item.link}
                  onClick={(e) => handleSmoothScroll(e, item.link)}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-4 py-2.5 text-sm font-medium tracking-wide text-gray-300 hover:text-white transition-all duration-300 nav-item-glow rounded-xl"
                >
                  <motion.span 
                    className="relative z-10 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </motion.span>
                  
                  {hoveredItem === item.name && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-gradient-to-r from-[#4a6cd2]/20 to-[#7c4dff]/20 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(74, 108, 210, 0.2), rgba(124, 77, 255, 0.2))',
                  border: '1px solid rgba(74, 108, 210, 0.4)',
                }}
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a6cd2] to-[#7c4dff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(74, 108, 210, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #4a6cd2, #7c4dff)',
                  boxShadow: '0 4px 15px rgba(74, 108, 210, 0.3)',
                }}
              >
                <motion.span 
                  className="relative z-10"
                  animate={{ 
                    textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Sign Up
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#7c4dff] to-[#4a6cd2]"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ opacity: 0.3 }}
                />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative p-2.5 rounded-xl gradient-border"
            >
              <div className="space-y-1.5">
                <motion.div
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  className="w-6 h-0.5 bg-white rounded-full"
                />
                <motion.div
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  className="w-6 h-0.5 bg-white rounded-full"
                />
                <motion.div
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  className="w-6 h-0.5 bg-white rounded-full"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ paddingTop: '72px' }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[90%] max-w-md overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(13, 13, 30, 0.98) 0%, rgba(25, 25, 50, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(74, 108, 210, 0.3)',
              }}
            >
              <div className="p-6 space-y-6">
                {/* Mobile Menu Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between pb-4 border-b border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/photos/UrjaSangam/urjasangam_logo_background.png"
                      alt="Logo"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-lg">IEEE RGIPT</h3>
                      <p className="text-gray-400 text-xs">Student Branch</p>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation Items */}
                <div className="space-y-2">
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs uppercase tracking-wider text-[#4a6cd2] mb-3 px-4 font-semibold"
                  >
                    Navigation
                  </motion.p>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 text-white rounded-xl mobile-menu-item"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                        <motion.div
                          className="ml-auto text-gray-400"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Auth Buttons - Mobile */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 pt-6 border-t border-white/10"
                >
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-6 py-4 text-base font-semibold text-white rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(74, 108, 210, 0.2), rgba(124, 77, 255, 0.2))',
                      border: '1px solid rgba(74, 108, 210, 0.4)',
                    }}
                  >
                    Login
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-6 py-4 text-base font-semibold text-white rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, #4a6cd2, #7c4dff)',
                      boxShadow: '0 4px 20px rgba(74, 108, 210, 0.4)',
                    }}
                  >
                    Sign Up
                  </motion.button>
                </motion.div>

                {/* Footer Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 text-center text-xs text-gray-400"
                >
                  <p>© 2025 IEEE RGIPT Student Branch</p>
                  <p className="mt-1">All rights reserved</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}