import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Programs', href: '#programs' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  const programs = [
    { name: 'Personal Training', href: '#' },
    { name: 'Group Classes', href: '#' },
    { name: 'Nutrition Coaching', href: '#' },
    { name: 'CrossFit Training', href: '#' },
    { name: 'Yoga & Flexibility', href: '#' }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-br from-background to-card border-t border-border/30">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-oswald font-bold text-gradient">
                IRONCORE FITNESS
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Transform your body and mind with our premium fitness programs. 
                Join thousands who have already started their journey to greatness.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                7-61 sree venkata sai colony beside st'anthonys high school, KOMPALLY
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  +91 9989678960
                  +91 9063678960
                  +91 9000927424
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  torquetonefitness@gmail.com
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="font-oswald font-semibold text-white">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-muted/20 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-oswald font-semibold text-white text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-6">
            <h4 className="font-oswald font-semibold text-white text-lg">
              Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={program.name}>
                  <a 
                    href={program.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm hover:underline"
                  >
                    {program.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-oswald font-semibold text-white text-lg">
              Stay Updated
            </h4>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Get the latest workout tips, nutrition advice, and exclusive member offers.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-muted/20 border border-border/30 rounded-lg text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300"
                />
                <button className="w-full bg-primary hover:bg-primary-glow text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-3">
              <h5 className="font-oswald font-semibold text-white">Hours</h5>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span>5:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekends</span>
                  <span>6:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2024 IronCore Fitness. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>

            {/* Certification Badges */}
            <div className="flex items-center gap-4">
              <div className="text-xs text-muted-foreground">
                Certified by:
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-muted/20 rounded text-xs text-primary font-semibold">
                  NASM
                </span>
                <span className="px-2 py-1 bg-muted/20 rounded text-xs text-primary font-semibold">
                  ACE
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;