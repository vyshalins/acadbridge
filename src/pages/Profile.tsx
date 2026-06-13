import { User, Mail, GraduationCap, Building, BookOpen, Layers, Target, Award } from "lucide-react";

const Profile = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
      <p className="text-muted-foreground mb-6">Your basic information and academic summary</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-5">Basic Information</h3>
          <div className="space-y-4">
            {[
              { icon: User, label: "Name", value: "John Doe" },
              { icon: Mail, label: "Email", value: "john.doe@university.edu" },
              { icon: GraduationCap, label: "Degree", value: "B.Tech Computer Science" },
              { icon: BookOpen, label: "Branch", value: "Computer Science & Engineering" },
              { icon: Building, label: "College", value: "XYZ Institute of Technology" },
              { icon: Layers, label: "Current Semester", value: "Semester 5" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Summary */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-5">Academic Summary</h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: BookOpen, label: "Total Subjects Analyzed", value: "7", color: "text-primary" },
              { icon: Layers, label: "Total Skills Extracted", value: "47", color: "text-emerald-500" },
              { icon: Target, label: "Role Fit Score", value: "72%", color: "text-purple-500" },
              { icon: Award, label: "Semester Readiness", value: "83%", color: "text-orange-500" },
            ].map((item) => (
              <div key={item.label} className="bg-muted rounded-xl p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-xl font-bold text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
