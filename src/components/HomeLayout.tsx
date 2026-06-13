import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, FileText, Target, Map, LogOut, Search, User } from "lucide-react";

const navItems = [
  { to: "/home", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/home/semester", icon: BookOpen, label: "Semester Mapping" },
  { to: "/home/resume", icon: FileText, label: "ATS Resume" },
  { to: "/home/role-fit", icon: Target, label: "Role Fit & Gap" },
  { to: "/home/roadmap", icon: Map, label: "Career Roadmap" },
];

const HomeLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-[250px] bg-card border-r border-border flex flex-col fixed h-full z-10">
        <div className="p-5 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold text-foreground leading-tight">AcadBridge</p>
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Intelligence Platform</p>
          </div>
        </div>

        <p className="px-5 pt-4 pb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">Navigation</p>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 mt-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-[250px] flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-end px-6 gap-4 sticky top-0 z-10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-52"
            />
          </div>
          <button
            onClick={() => navigate("/home/profile")}
            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
