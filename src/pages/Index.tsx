import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Instructors from "@/components/Instructors";
import Testimonials from "@/components/Testimonials";
import CourseOverview from "@/components/CourseOverview";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Courses />
        <CourseOverview />
        <Instructors />
        <Testimonials />
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default Index;