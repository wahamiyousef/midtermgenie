import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={`scroll-smooth font-lato flex justify-center items-center fixed inset-x-0 top-3 z-10 transition-all duration-300 ${
          isAtTop ? "w-full px-6" : "w-[100%] px-6"
        }`}
      >
        <nav
          className={`scroll-smooth flex justify-center items-center gap-2 border border-[#91a77d] rounded-full bg-[#5d6142]/20 h-12 px-4 backdrop-blur transition-all duration-300 ${
            isAtTop ? "w-full" : "w-[40%]"
          }`}
        >
          <Button variant="outline" onClick={() => scrollToSection("home")}>
            Home
          </Button>
          <Button variant="outline" onClick={() => scrollToSection("about")}>
            About
          </Button>
          <Button variant="outline" onClick={() => scrollToSection("projects")}>
            Projects
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("contact")}>
            Contact
          </Button>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
