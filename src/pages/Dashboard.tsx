import { useNavigate } from "react-router-dom";
import { Layers, TrendingUp, Target, Award, BookOpen, FileText, Map, ArrowUpRight } from "lucide-react";

const stats = [
  { icon: Layers, value: "47", label: "Skills Identified", sub: "+12 this semester", color: "text-primary" },
  { icon: TrendingUp, value: "87%", label: "ATS Score", sub: "+5% improvement", color: "text-emerald-500" },
  { icon: Target, value: "72%", label: "Role Fit Score", sub: "Frontend Developer", color: "text-purple-500" },
  { icon: Award, value: "83%", label: "Semester Readiness", sub: "Semester 5", color: "text-orange-500" },
];

const quickActions = [
  { icon: BookOpen, title: "Semester Mapping", desc: "Analyze your syllabus and map skills", to: "/home/semester", gradient: "from-blue-500 to-blue-600" },
  { icon: FileText, title: "ATS Resume", desc: "Generate an ATS-optimized resume", to: "/home/resume", gradient: "from-indigo-500 to-purple-500" },
  { icon: Target, title: "Role Fit Analysis", desc: "Check your fit for target roles", to: "/home/role-fit", gradient: "from-purple-500 to-violet-600" },
  { icon: Map, title: "Career Roadmap", desc: "Build your career plan month by month", to: "/home/roadmap", gradient: "from-teal-500 to-cyan-500" },
];

const recentActivity = [
  { text: "Analyzed Semester 5 syllabus", time: "2 hours ago" },
  { text: "Generated ATS resume for Data Analyst", time: "5 hours ago" },
  { text: "Completed Role Fit analysis", time: "1 day ago" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Welcome back! Here's your career intelligence overview.</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm font-medium text-foreground">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((a) => (
          <button
            key={a.title}
            onClick={() => navigate(a.to)}
            className={`bg-gradient-to-br ${a.gradient} rounded-2xl p-5 text-left text-primary-foreground group hover:shadow-lg transition-shadow relative overflow-hidden`}
          >
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-3">
              <a.icon className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 absolute top-4 right-4 opacity-60" />
            <p className="font-bold">{a.title}</p>
            <p className="text-sm opacity-80 mt-1">{a.desc}</p>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">{a.text}</span>
              </div>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
