import { useEffect, useRef, useState } from 'react';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: '1234 Fitness Boulevard\nIronCore District, Gym City 90210',
      link: '#'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+1 (555) 123-4567\nText us anytime',
      link: 'tel:+15551234567'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: 'info@ironcorefitness.com\nSupport available 24/7',
      link: 'mailto:info@ironcorefitness.com'
    },
    {
      icon: '🕒',
      title: 'Hours',
      details: 'Mon-Fri: 5:00 AM - 11:00 PM\nSat-Sun: 6:00 AM - 10:00 PM',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: '📷', href: '#', name: 'Instagram' },
    { icon: '👥', href: '#', name: 'Facebook' },
    { icon: '🐦', href: '#', name: 'Twitter' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/919989678960?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen bg-black relative overflow-hidden py-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              JOIN OUR COMMUNITY
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Ready to transform your life? Get in touch with us today and start your journey 
              to becoming the strongest version of yourself.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                      Get Started Today
                    </h3>
                    <p className="text-gray-400">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-white block">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-white block">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white block">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-white block">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your fitness goals..."
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition-all duration-200"
                      />
                    </div>

                    <button 
                      onClick={handleSubmit}
                      className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Join Our Community
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              
              {/* Contact Info Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={info.title} 
                    className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center space-y-4 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto text-2xl">
                        {info.icon}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-white">
                          {info.title}
                        </h4>
                        <p className="text-sm text-gray-400 whitespace-pre-line">
                          {info.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-64 bg-gradient-to-br from-gray-800/20 to-gray-900/40 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-4xl">📍</div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-white">
                          Find Us Here
                        </h4>
                        <p className="text-sm text-gray-400">
                          Interactive map coming soon
                        </p>
                        <button onClick={() => window.open('https://www.google.com/maps/place/BARBELL+FITNESS+CLUB+(KOMPALLY)/@17.5467234,78.4873498,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8500108407cf:0x7fa695ff96089354!8m2!3d17.5467183!4d78.4899247!16s%2Fg%2F11wfr6hkkr?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D')} className="px-6 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-300">
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '750ms' }}>
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center space-y-4 shadow-lg">
                  <h4 className="font-bold text-white">
                    Follow Our Journey
                  </h4>
                  <p className="text-sm text-gray-400">
                    Stay connected for daily motivation, tips, and success stories
                  </p>
                  <div className="flex justify-center gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 text-xl"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;