import { useState, useEffect } from "react";
import desktoplogo from '../../src/assets/logo_text.png'
import mobilelogo from '../../src/assets/logo_icon.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/30" : ""
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            {/* Desktop Logo: Hidden on small screens, visible on medium and up */}
            <img
              src={desktoplogo}
              alt="TORQUE & TONE FITNESS"
              className="hidden md:block h-10 w-auto" // Added responsive classes
            />
            {/* Mobile Logo: Visible on small screens, hidden on medium and up */}
             <img
              src={mobilelogo}
              alt="TORQUE & TONE FITNESS"
              className="block md:hidden h-10 w-auto" // Added responsive classes
            />
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#programs"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Programs
            </a>
            <a
              href="#trainers"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Trainers
            </a>
            <a
              href="#success"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Success Stories
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="bg-primary hover:bg-primary-glow text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 glow-pulse"
            >
              Join Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-md">
          <div className="container mx-auto px-6 lg:px-8 py-4 flex flex-col space-y-4">
            <a href="#home" className="text-muted-foreground hover:text-primary">Home</a>
            <a href="#programs" className="text-muted-foreground hover:text-primary">Programs</a>
            <a href="#trainers" className="text-muted-foreground hover:text-primary">Trainers</a>
            <a href="#success" className="text-muted-foreground hover:text-primary">Success Stories</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;