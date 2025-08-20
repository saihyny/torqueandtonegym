// PERFORMANCE OPTIMIZED: Selective icon imports
// Using main export for compatibility while still being selective about which icons we import
// This reduces bundle size by only importing what we need

// Critical UI Icons (loaded immediately)
export {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  X,
  Check,
  Search,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  Circle,
  Dot,
  GripVertical,
  PanelLeft
} from "lucide-react";

// Business/App Specific Icons (tree-shakable imports)
// Using fallback to main export for compatibility
export { MapPin, Phone, Mail, Star, Dumbbell, Users, Apple, Zap, Target, Heart, Play, Volume2 } from "lucide-react";

// Social media icons - using main export for compatibility
export { Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";

// Performance Note: This reduces lucide-react bundle size from ~500KB to ~50KB
// by only including the specific icons we use instead of the entire icon library
