import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, BookOpen, FileText, Target, Map } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Semester Mapping",
    desc: "Map your academic syllabus to real industry skills instantly.",
  },
  {
    icon: FileText,
    title: "ATS Resume Builder",
    desc: "Generate keyword-optimized resumes that pass ATS filters.",
  },
  {
    icon: Target,
    title: "Role Fit Analysis",
    desc: "Discover your fit score and close skill gaps strategically.",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    desc: "Get a month-by-month personalized career development plan.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-card">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">AcadBridge</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#stats" className="text-muted-foreground hover:text-foreground transition-colors">Stats</a>
          <button onClick={() => navigate("/login")} className="text-primary font-medium hover:underline">Sign In</button>
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center pt-20 pb-16 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">AI-Powered Academic Intelligence</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight max-w-4xl">
          Bridging <span className="text-primary">Academics</span> to Careers
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          Transform your semester syllabus into industry-ready skills, ATS-optimized resumes, and actionable career roadmaps.
        </p>
        <div className="flex gap-4 mt-10">
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="#features"
            className="border border-border bg-card text-foreground px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-muted transition-colors"
          >
            Explore Features <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Everything you need to <span className="text-primary">bridge the gap</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
          {features.map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-primary rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to transform your career?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Join thousands of students who've bridged the gap between academics and industry.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-card text-primary px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Start Now — It's Free <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">AcadBridge</span>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 AcadBridge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
