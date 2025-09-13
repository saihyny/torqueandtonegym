// src/data/equipmentData.ts

export interface EquipmentItem {
  name: string;
  description: string;
  imagePaths: string[]; // Array of paths to images for this equipment
  maskType: "type-1" | "type-2" | "type-3"; // Example mask types, adjust as needed
}

// Using import.meta.glob for Vite-compatible dynamic imports
const airSkiMachineImages = Object.values(import.meta.glob('/src/assets/Equepments/air-ski-machine/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }));
const cableCrossoverMachineImages = Object.values(import.meta.glob('/src/assets/Equepments/cable-crosssover-machine/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }));
const indoorCycleBikeImages = Object.values(import.meta.glob('/src/assets/Equepments/indoor-cycle-bike/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }));
const legCurlExtensionMachineImages = Object.values(import.meta.glob('/src/assets/Equepments/leg-curl-extension-machine/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }));
const pinLoadedMachineImages = Object.values(import.meta.glob('/src/assets/Equepments/pin-loaded-machine/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }));
const rearDeltMachineImages = Object.values(import.meta.glob('/src/assets/Equepments/rear-delt-machine/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }));
const squatRackImages = Object.values(import.meta.glob('/src/assets/Equepments/squat-rack/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }));
const weightBenchImages = Object.values(import.meta.glob('/src/assets/Equepments/weight-bench/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }));
const weightSledImages = Object.values(import.meta.glob('/src/assets/Equepments/weight-sled/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' }));


export const equipmentData: EquipmentItem[] = [
  {
    name: "Air-Ski Machine",
    description: "Full-body cardio and strength training for a powerful workout.",
    imagePaths: airSkiMachineImages,
    maskType: "type-1",
  },
  {
    name: "Cable Crossover Machine",
    description: "Versatile machine for various strength training exercises.",
    imagePaths: cableCrossoverMachineImages,
    maskType: "type-2",
  },
  {
    name: "Indoor Cycle Bike",
    description: "High-intensity cardio for endurance and leg strength.",
    imagePaths: indoorCycleBikeImages,
    maskType: "type-1",
  },
  {
    name: "Leg Curl Extension Machine",
    description: "Targeted workout for quadriceps and hamstrings.",
    imagePaths: legCurlExtensionMachineImages,
    maskType: "type-3",
  },
  {
    name: "Pin-Loaded Machine",
    description: "Easy-to-adjust resistance for focused muscle development.",
    imagePaths: pinLoadedMachineImages,
    maskType: "type-2",
  },
  {
    name: "Rear-Delt Machine",
    description: "Isolates and strengthens the rear deltoid muscles.",
    imagePaths: rearDeltMachineImages,
    maskType: "type-1",
  },
  {
    name: "Squat Rack",
    description: "Essential for heavy-duty squats, presses, and strength training.",
    imagePaths: squatRackImages,
    maskType: "type-3",
  },
  {
    name: "Weight Bench",
    description: "Adjustable bench for free weights and various exercises.",
    imagePaths: weightBenchImages,
    maskType: "type-2",
  },
  {
    name: "Weight Sled",
    description: "Build explosive power and conditioning with pushing and pulling exercises.",
    imagePaths: weightSledImages,
    maskType: "type-1",
  },
];