import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const gymTestimonials = [
  {
    name: "Ravi Kumar",
    designation: "Software Engineer",
    quote:
      "IronCore Fitness in Kompally completely changed my lifestyle. The trainers are highly professional and helped me lose 8kg in 3 months with the right mix of workouts and diet guidance.",
    src: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Sharma",
    designation: "College Student",
    quote:
      "The best gym in Kompally! The ambiance is super motivating, and the ladies-only sessions made me feel very comfortable. I also love the Zumba and yoga classes here.",
    src: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aditya Reddy",
    designation: "Business Owner",
    quote:
      "State-of-the-art equipment and very clean environment. The personal training program is worth every rupee. My strength and stamina have improved a lot in just 2 months.",
    src: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    name: "Sneha Patel",
    designation: "Designer",
    quote:
      "Affordable memberships, flexible timings, and excellent trainers. The nutrition advice they gave me was spot on. I feel healthier and more confident every day.",
    src: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    name: "Vikram Singh",
    designation: "MBA Student",
    quote:
      "IronCore Fitness is not just a gym, it’s a community. The trainers push you to do your best. The CrossFit sessions are my favorite part of the week!",
    src: "https://randomuser.me/api/portraits/men/41.jpg",
  },
]

export default function GymReviews() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Members Say
      </h2>
      <AnimatedTestimonials testimonials={gymTestimonials} autoplay />
    </div>
  )
}
