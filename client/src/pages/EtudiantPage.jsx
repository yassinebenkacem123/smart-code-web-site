import PlatformCourses from "../components/PlatformCourses";
import EtudiantHeroSection from "../components/EtudiantHeroSection";
import { useState, useEffect } from "react";
import Languages from "../components/Languages";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const EtudiantPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollToCourses, setScrollToCourses] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setStartAnimation(true); // Trigger animation when scrolling starts
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener
    };
  }, []);

  return (
    <main className="h-screen">
      <EtudiantHeroSection 
        setSearchTerm = {setSearchTerm}
        setScrollToCourses={setScrollToCourses}
      />
      <motion.div 
        initial={{ width: "0%" }} 
        animate={startAnimation ? { width: "100%" } : { width: "0%" }} // Animate only when scrolling starts
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-8 bg-black relative  w-full"
     >
     </motion.div>
      <Languages />
      <motion.div 
      initial={{ left: "100%" }} // Start from the right
      animate={startAnimation ?{ left:"0%"}:{left:'100%'}} // Move to the left

      transition={{ duration: 2, ease: "easeInOut" }}
      className="w-full flex justify-end h-8 relative bg-black">
      </motion.div>
      <div className="w-full h-5 bg-white"></div>
      <PlatformCourses
        searchTerm={searchTerm}
        scrollToCourses={scrollToCourses}
        setScrollToCourses={setScrollToCourses}
      />
      <Footer />
    </main>
  );
};

export default EtudiantPage