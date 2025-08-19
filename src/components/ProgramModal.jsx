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
    'Personal Training': {
      details: "Our certified personal trainers create customized workout plans to help you achieve your specific fitness goals. We'll focus on proper form, progressive overload, and consistent motivation to ensure you get the best results.",
      benefits: ['Personalized workout plans', 'One-on-one coaching and motivation', 'Faster results and improved form', 'Flexible scheduling']
    },
    'Group Classes': {
      details: "Experience the energy and camaraderie of our group fitness classes. From high-intensity interval training (HIIT) to calming yoga sessions, there's a class for every interest and fitness level.",
      benefits: ['Motivating group environment', 'Variety of classes to choose from', 'Fun and engaging workouts', 'Full-body conditioning']
    },
    'Nutrition Coaching': {
      details: 'Unlock your full potential with our expert nutrition coaching. We’ll help you develop sustainable eating habits that complement your training and accelerate your progress.',
      benefits: ['Customized meal plans', 'Expert dietary guidance', 'Improved energy levels', 'Sustainable lifestyle changes']
    },
    'CrossFit Training': {
      details: 'Push your limits with our intense CrossFit program. Combining elements of weightlifting, gymnastics, and metabolic conditioning, these workouts are designed to build elite-level fitness.',
      benefits: ['Build functional strength', 'Improve cardiovascular endurance', 'Join a supportive community', 'Challenge your mental toughness']
    },
    'Yoga & Flexibility': {
      details: 'Enhance your mind-body connection with our yoga and flexibility classes. Improve your range of motion, reduce stress, and prevent injuries with our guided sessions.',
      benefits: ['Increased flexibility and mobility', 'Stress reduction and mental clarity', 'Improved balance and posture', 'Injury prevention and recovery']
    },
    'Athletic Performance': {
      details: 'Take your athletic abilities to the next level with our specialized performance training. We focus on sport-specific drills, strength and conditioning, and injury prevention to help you excel in your chosen discipline.',
      benefits: ['Sport-specific skill development', 'Enhanced speed, power, and agility', 'Injury prevention strategies', 'Competitive edge in your sport']
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
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center mb-6">
            <div className={`w-16 h-16 rounded-lg ${program.iconBg} flex items-center justify-center mr-6 shadow-lg`}>
              <program.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">{program.title}</h2>
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