import Footer from "@/components/footer/Footer";
import HomeView from "@/components/home/Hero"; // This contains both Hero + Welcome now
import PhilosophicalThread from "@/components/home/PhilosophicalThread";
import ScheduleSection from "@/components/home/ScheduleSection";
import ServicesSection from "@/components/home/ServicesSection";
import AnimatedTestimonialsSection from "@/components/home/Testimonial";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import Navbar from "@/components/navbar/Navbar";

export default function HomePage() {
  return (
    <div>
      <HomeView /> {/* Hero + Intro combined */}
      <PhilosophicalThread />
      <ServicesSection />
      <WhyChooseUsSection />
      <AnimatedTestimonialsSection />
      <ScheduleSection />
    </div>
  );
}
