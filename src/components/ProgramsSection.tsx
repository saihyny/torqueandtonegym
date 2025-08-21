import React, { useState, useEffect } from 'react';
import { Dumbbell, Users, Apple, Zap, Target, Heart, Music, Activity } from 'lucide-react';
import { SkiperCard } from "@/components/ui/skiper-card"; // Adjust this import path if needed
import ProgramModal from './ProgramModal'; // Import the new modal component

const ProgramsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const programs = [
  {
    title: 'Strength & Conditioning',
    description: 'High-energy group workouts that motivate and challenge you alongside fellow fitness enthusiasts.',
    icon: Users,
    bgColor: "bg-blue-950/20",
    iconBg: "bg-blue-500"
  },
  {
    title: 'Personal Training',
    description: 'One-on-one sessions with certified trainers tailored to your specific goals and fitness level.',
    icon: Dumbbell,
    bgColor: "bg-orange-950/20",
    iconBg: "bg-orange-500"
  },
  {
    title: 'Yoga',
    description: 'Improve mobility, balance, and mental wellness through guided yoga and stretching sessions.',
    icon: Heart,
    bgColor: "bg-pink-950/20",
    iconBg: "bg-pink-500"
  },
  {
    title: 'Zumba',
    description: 'Fun, high-energy dance workouts that combine Latin rhythms with cardio training.',
    icon: Music,
    bgColor: "bg-red-950/20",
    iconBg: "bg-red-500"
  },
  {
    title: 'Boxing & MMA',
    description: 'Learn striking, footwork, and conditioning with boxing and mixed martial arts inspired training.',
    icon: Activity,
    bgColor: "bg-gray-950/20",
    iconBg: "bg-gray-500"
  },
  {
    title: 'CrossFit',
    description: 'Intense functional fitness workouts that build strength, endurance, and mental toughness.',
    icon: Zap,
    bgColor: "bg-yellow-950/20",
    iconBg: "bg-yellow-500"
  },
  {
    title: 'Hyrox',
    description: 'A unique fitness race combining running with functional workouts for the ultimate test of endurance.',
    icon: Target,
    bgColor: "bg-purple-950/20",
    iconBg: "bg-purple-500"
  }
];

  const handleCardClick = (program) => {
    setSelectedProgram(program);
  };

  const handleCloseModal = () => {
    setSelectedProgram(null);
  };

  return (
    <div className="relative min-h-screen bg-black text-white p-4 lg:p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-5xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            ELITE PROGRAMS
          </h1>
          <p className="text-xl lg:text-xl text-gray-400 leading-relaxed">
            Choose from our comprehensive range of fitness programs designed to transform your body and mind. 
            Each program is crafted by expert trainers to deliver maximum results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className={`transition-all duration-700 h-full cursor-pointer ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms`, perspective: '1000px' }}
              onClick={() => handleCardClick(program)}
            >
              <SkiperCard
                title={program.title}
                description={program.description}
                background={<div className={`absolute inset-0 rounded-2xl opacity-50 ${program.bgColor}`} />}
              >
                <div className={`w-16 h-16 rounded-lg ${program.iconBg} flex items-center justify-center mb-4 shadow-lg`}>
                  <program.icon className="w-8 h-8 text-white" />
                </div>
              </SkiperCard>
            </div>
          ))}
        </div>
        
        <div className={`
          text-center mt-20 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }
        `}>
          
          
        </div>
      </div>
      <ProgramModal program={selectedProgram} onClose={handleCloseModal} />
    </div>
  );
};

export default ProgramsSection;