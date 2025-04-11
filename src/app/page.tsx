"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Initialize carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === 1 ? 0 : 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    
    setFormStatus("submitting");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-900 text-white py-1 px-2 sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image 
              src="/images/lovas-logo.png"
              alt="lovas energy services logo"
              width={106}
              height={106}
              className="mr-4"
            />
            <div className="hidden sm:block overflow-hidden">
              <h1 className="text-xl md:text-2xl font-bold relative">
                <span className="animate-reveal-text">Lovas Energy Services</span>
              </h1>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#about" className="hover:text-blue-200">About</a>
            <a href="#services" className="hover:text-blue-200">Services</a>
            <a href="#contact" className="hover:text-blue-200">Contact</a>
          </div>
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-blue-900 p-4">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#services" className="hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#contact" className="hover:text-blue-200" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative bg-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0"></div>
          <div className="absolute inset-0 bg-[url('/images/main-banner2.png')] bg-cover bg-center z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-gradient-to-r from-blue-900/80 via-blue-800/90 to-blue-900/80 backdrop-blur-sm p-8 rounded-lg max-w-3xl mx-auto text-center border-l-4 border-blue-400 animate-fade-in-up">
                <h2 className="text-5xl font-bold mb-6 text-white drop-shadow-md">Innovative Energy Solutions</h2>
                <p className="text-xl mb-8 text-white/90 animate-pulse-slow">Transforming the way we power the world</p>
                <a href="#contact" className="btn-primary">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-blue-900 mb-6">About Us</h3>
                <p className="text-gray-700 mb-6">
                  Lovas Energy Services specializes in burner management and combustion control for the oil and gas industry. With decades of experience, we provide powerful, reliable, and safe solutions that meet the highest industry standards.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Experience</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Decades of industry experience</li>
                      <li>• Veteran-owned business</li>
                      <li>• Established industry presence</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Expertise</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Industry-specific knowledge</li>
                      <li>• Custom solutions</li>
                      <li>• Advanced technology</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Reliability</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 24/7 support availability</li>
                      <li>• Quality assurance</li>
                      <li>• Long-term partnerships</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">Innovation</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Industry-leading solutions</li>
                      <li>• Continuous improvement</li>
                      <li>• Forward-thinking approaches</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gray-100 border border-gray-200">
                  <iframe 
                    src="https://player.vimeo.com/video/918951646?h=e65e25a932&color=0d6ef2&title=0&byline=0&portrait=0" 
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowFullScreen
                    title="Lovas Energy Services"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h3 className="text-3xl font-bold text-blue-900 mb-6">Our Services</h3>
                <p className="text-gray-700 max-w-xl">
                  Lovas Energy Services offers a comprehensive range of solutions for the oil and gas industry.
                  Our expertise spans from equipment and components to specialized services and engineering.
                </p>
              </div>
              
              <div className="md:w-1/2">
                <div className="carousel relative overflow-hidden rounded-lg shadow-xl h-[250px]">
                  <div className="carousel-inner flex">
                    <div className={`absolute inset-0 w-full carousel-item ${currentSlide === 0 ? 'active' : ''}`}>
                      <Image 
                        src="/images/lovas-equipment-1.jpeg" 
                        alt="Lovas Energy Equipment" 
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 to-transparent p-4">
                        <p className="text-white text-sm font-semibold">Advanced Equipment</p>
                      </div>
                    </div>
                    <div className={`absolute inset-0 w-full carousel-item ${currentSlide === 1 ? 'active' : ''}`}>
                      <Image 
                        src="/images/lovas-equipment-2.jpeg" 
                        alt="Lovas Energy Field Services" 
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 to-transparent p-4">
                        <p className="text-white text-sm font-semibold">Field Services</p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="carousel-prev absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-blue-900 p-1 rounded-full"
                    onClick={() => handleSlideChange(currentSlide === 0 ? 1 : 0)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    className="carousel-next absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-blue-900 p-1 rounded-full"
                    onClick={() => handleSlideChange(currentSlide === 1 ? 0 : 1)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <div className="carousel-indicators absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                    <button 
                      onClick={() => handleSlideChange(0)}
                      className={`carousel-indicator w-2 h-2 rounded-full bg-white hover:opacity-100 ${currentSlide === 0 ? 'opacity-100' : 'opacity-50'}`}
                    ></button>
                    <button 
                      onClick={() => handleSlideChange(1)}
                      className={`carousel-indicator w-2 h-2 rounded-full bg-white hover:opacity-100 ${currentSlide === 1 ? 'opacity-100' : 'opacity-50'}`}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md service-card">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-blue-900 mb-2">Burner Management</h4>
                <p className="text-gray-600">Comprehensive burner management systems with intuitive controls for monitoring and safely managing your industrial heating equipment.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md service-card">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-blue-900 mb-2">Combustion Control</h4>
                <p className="text-gray-600">Advanced combustion control products and services designed for optimal performance, safety, and compliance in industrial applications.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md service-card">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-blue-900 mb-2">Field Services</h4>
                <p className="text-gray-600">Expert installation, maintenance, startup, and commissioning services for all your energy equipment needs across WTX, STX, and SENM regions.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
              <h4 className="text-2xl font-bold text-blue-900 mb-6 text-center">Complete Service Offerings</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg transition-all hover:bg-blue-50">
                  <h5 className="font-bold text-blue-900 mb-1">Equipment</h5>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Burners</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Controllers</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Valves and Solenoids</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Fuel Trains</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>New/Used Equipment</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg transition-all hover:bg-blue-50">
                  <h5 className="font-bold text-blue-900 mb-1">Components</h5>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Pilots and Flare Pilots</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Flame Arrestors</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Power Distribution</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Instrumentation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Installation Components</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg transition-all hover:bg-blue-50">
                  <h5 className="font-bold text-blue-900 mb-1">Professional Services</h5>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Engineering and Design</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Consulting</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Monitoring and Safety</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Preventative Maintenance</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg transition-all hover:bg-blue-50">
                  <h5 className="font-bold text-blue-900 mb-1">Field Operations</h5>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Installation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Startup and Commissioning</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Field Services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <a href="#contact" className="btn-primary inline-flex items-center">
                Request Service Information
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 bg-blue-800 text-white">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-900/50 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                  </div>
                  <p className="flex-grow italic mb-4">
                    Lovas Energy Services transformed our operations with their burner management systems. Their expertise in the oil and gas industry is unmatched, and their responsive support has saved us countless hours of downtime.
                  </p>
                  <div>
                    <p className="font-bold">James Thompson</p>
                    <p className="text-sm text-blue-200">Operations Manager</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/50 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                  </div>
                  <p className="flex-grow italic mb-4">
                    We&apos;ve partnered with Lovas Energy for over five years, and their combustion control solutions have consistently delivered reliability and efficiency. Their field services team responds quickly and solves problems the first time.
                  </p>
                  <div>
                    <p className="font-bold">Sarah Rodriguez</p>
                    <p className="text-sm text-blue-200">Technical Director</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/50 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                  </div>
                  <p className="flex-grow italic mb-4">
                    As a veteran-owned business ourselves, we appreciate Lovas Energy&apos;s commitment to quality and service. Their engineering team designed a custom solution for our SENM operations that improved safety and cut maintenance costs by 30%.
                  </p>
                  <div>
                    <p className="font-bold">Michael Reyes</p>
                    <p className="text-sm text-blue-200">CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-blue-900 mb-6">Contact Us</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold text-blue-900 mb-4">Get in Touch</h4>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                  {formStatus === "success" && (
                    <p className="text-green-600 text-center">Message sent successfully!</p>
                  )}
                  {formStatus === "error" && (
                    <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
                  )}
                </form>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold text-blue-900 mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-900 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-gray-700">713-449-4847</p>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-900 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-700">Sales@lovasenergy.com</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">Service Areas</h4>
                  <p className="text-gray-700 mb-4">We proudly serve the following regions:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-blue-900 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      West Texas (WTX)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-blue-900 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      South Texas (STX)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-blue-900 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Southeast New Mexico (SENM)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white p-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Image 
                src="/images/lovas-logo.png"
                alt="Lovas Energy Services Logo"
                width={213}
                height={213}
                className="mb-4"
              />
              <p className="text-blue-200">Innovative energy solutions for a better tomorrow.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-blue-200 hover:text-white">About</a></li>
                <li><a href="#services" className="text-blue-200 hover:text-white">Services</a></li>
                <li><a href="#contact" className="text-blue-200 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-blue-200">713-449-4847</p>
              <p className="text-blue-200">Sales@lovasenergy.com</p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p>Copyright © 2024 Lovas Energy Services - All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

