import { motion } from "framer-motion";
const Languages = () => {
  
  const languages = [
    {name:"React", image:"../../src/assets/languages/01.png"},
    { name: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Ruby", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
    { name: "Swift", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
    { name: "Go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
    { name: "PHP", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Kotlin", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Dart", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  ];

  // Duplicate the array to create a seamless loop
  const duplicatedLanguages = [...languages, ...languages];
  
  return (
    
    <div className="w-full bg-white relative overflow-hidden">
      <div 
        className="relative overflow-hidden"
      >
        {/* First marquee */}
        <motion.div 
          className="flex gap-8 md:gap-12 items-center flex-shrink-0"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop",
            delay:2
          }}
        >
          {duplicatedLanguages.map((language, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.15, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className=" p-4 rounded-2xl flex items-center justify-center w-20 h-20 md:w-24 md:h-24">
                <img 
                  src={language.image} 
                  alt={language.name} 
                  className="w-12 h-12 md:w-16 md:h-16 object-contain" 
                />
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Languages;