import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, Clock, FileText } from "lucide-react";
import Navbar from "../NavbarLanding";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        {/* Hero Section */}
        <div id="home" className="flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="flex items-center gap-3 text-4xl font-bold">
            <Brain className="w-10 h-10 text-yellow-400" />
            MidtermGenie
          </div>
          <p className="mt-4 max-w-lg text-lg text-white/80">
            Ace your midterms with AI-powered study guides, quick revision tools, and smart scheduling!
          </p>
          <div className="mt-6 flex gap-4">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Get Started</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div id="about" className="bg-white text-black py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Why MidtermGenie?</h2>
            <p className="mt-3 text-gray-600">
              Our AI-driven platform helps you study smarter, not harder.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard icon={CheckCircle} title="AI-Powered Notes" text="Generate summaries and key points instantly." />
            <FeatureCard icon={Clock} title="Smart Scheduling" text="Plan your study time effectively with AI suggestions." />
            <FeatureCard icon={FileText} title="Practice Questions" text="Get personalized quizzes to test your knowledge." />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white text-center py-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} MidtermGenie. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, text }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-all">
      <Icon className="w-10 h-10 text-blue-600" />
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600 text-center">{text}</p>
    </div>
  );
};

export default Landing;
