import React from 'react';
import { X } from 'lucide-react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

const ProgramModal = ({ program, onClose }) => {
  // Return null if no program is selected to prevent rendering an empty modal
  if (!program) return null;

  // Motion values to track the mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Function to update mouse coordinates relative to the modal
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Content specific to each program
const content = {
  'Strength & Conditioning': {
    details: "Build overall power, endurance, and resilience with structured strength and conditioning programs. Our sessions combine resistance training, cardio, and functional movements to help you perform at your best.",
    benefits: [
      'Improved strength and endurance',
      'Enhanced athletic performance',
      'Balanced full-body training',
      'Boosted metabolism and energy levels'
    ]
  },
  'Personal Training': {
    details: "Our certified personal trainers create customized workout plans to help you achieve your specific fitness goals. We'll focus on proper form, progressive overload, and consistent motivation to ensure you get the best results.",
    benefits: [
      'Personalized workout plans',
      'One-on-one coaching and motivation',
      'Faster results and improved form',
      'Flexible scheduling'
    ]
  },
  'Yoga': {
    details: "Enhance your mind-body connection with yoga sessions that focus on flexibility, mobility, balance, and mindfulness. A perfect way to recover, restore, and grow stronger mentally and physically.",
    benefits: [
      'Increased flexibility and mobility',
      'Stress reduction and relaxation',
      'Improved balance and posture',
      'Enhanced recovery and injury prevention'
    ]
  },
  'Zumba': {
    details: "Turn your workouts into a dance party with our fun, high-energy Zumba classes. Burn calories, boost your mood, and improve coordination while moving to lively rhythms.",
    benefits: [
      'Fun and engaging workouts',
      'Boosted cardiovascular health',
      'Improved coordination and rhythm',
      'Stress relief through dance'
    ]
  },
  'Boxing & MMA': {
    details: "Train like a fighter with boxing and MMA-inspired workouts. Develop striking skills, footwork, conditioning, and mental toughness while getting an incredible full-body workout.",
    benefits: [
      'Improved strength and conditioning',
      'Enhanced self-defense skills',
      'Boosted confidence and focus',
      'High-intensity calorie burn'
    ]
  },
  'CrossFit': {
    details: "Push your limits with our intense CrossFit program. Combining elements of weightlifting, gymnastics, and metabolic conditioning, these workouts are designed to build elite-level fitness.",
    benefits: [
      'Build functional strength',
      'Improve cardiovascular endurance',
      'Join a supportive community',
      'Challenge your mental toughness'
    ]
  },
  'Hyrox': {
    details: "Test your endurance and performance with Hyrox training — a unique combination of running and functional fitness movements designed to prepare you for competition-style events.",
    benefits: [
      'Boosted stamina and endurance',
      'Functional, competition-based workouts',
      'Improved mental resilience',
      'Preparation for Hyrox events and races'
    ]
  }
};


  const programContent = content[program.title];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Main modal container with animations and mouse move handler */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
      >
        {/* Animated glowing border and cursor light effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                rgba(132, 102, 213, 0.2),
                transparent 80%
              )
            `,
          }}
        />
        {/* Animated border gradient */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-70" />

        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white hover:scale-110 hover:bg-slate-300 bordre-2 border-slate-200 transition-colors z-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2"
          >
            <X size={20} />
          </button>
        
          
          <div className="flex items-center mb-6 gap-4">
            <div className={`w-16 h-16 rounded-lg ${program.iconBg} flex items-center justify-center mr-6 shadow-lg`}>
              <program.icon className="w-8 h-8 text-white " />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent ">{program.title}</h2>
          </div>
          
          <p className="text-lg text-gray-300 mb-6">{programContent.details}</p>
          
          <h3 className="text-2xl font-semibold mb-4 text-white">Key Benefits:</h3>
          <ul className="space-y-3">
            {programContent.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-4 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <span className="text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

      </motion.div>
    </div>
  );
};

export default ProgramModal;