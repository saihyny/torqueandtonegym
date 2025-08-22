import { useState, useEffect } from "react";
import desktoplogo from '../../src/assets/logo_text.png';
import mobilelogo from '../../src/assets/logo_icon.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to handle scroll-based navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to ensure scroll is restored on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Function to handle link clicks in the mobile menu
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#home", title: "Home" },
    { href: "#programs", title: "Programs" },
    { href: "#trainers", title: "Trainers" },
    { href: "#success", title: "Success Stories" },
    { href: "#pricing", title: "Pricing" },
    { href: "#gallery", title: "Gallery" },
    { href: "#contact", title: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen ? "bg-background/80 backdrop-blur-md border-b border-border/30" : ""
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center flex-shrink-0">
              <img
                src={desktoplogo}
                alt="TORQUE & TONE FITNESS Desktop Logo"
                className="hidden md:block h-10 w-auto"
              />
              <img
                src={mobilelogo}
                alt="TORQUE & TONE FITNESS Mobile Logo"
                className="block md:hidden h-10 w-auto"
              />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                className="bg-primary hover:bg-primary-glow text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 glow-pulse"
              >
                Join Now
              </a>
            </div>

            {/* Mobile Menu Button (Hamburger/Close) */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-muted-foreground hover:text-primary transition-transform duration-300 ease-in-out z-50"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={toggleMenu}
        ></div>
        
        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-background/30 backdrop-blur-lg p-8 shadow-xl transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow flex flex-col justify-center space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleMobileLinkClick}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-2xl font-semibold"
                >
                  {link.title}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={handleMobileLinkClick}
              className="bg-primary hover:bg-primary-glow text-white text-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 glow-pulse mt-8"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;