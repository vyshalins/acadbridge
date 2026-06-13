import { useState } from "react";
import {
  Search,
  CheckCircle,
  AlertTriangle,
  Target,
  BookOpen,
} from "lucide-react";

const API_URL = "http://localhost:8000/api/role-fit/analyze";

/* ================= TYPES ================= */

type LearningPlanItem = {
  skill: string;
  topics: string[];
};

type RoleFitResponse = {
  role_fit_percentage: number;
  strengths: string[];
  missing_skills: string[];
  in_progress_skills: string[];
  learning_plan: LearningPlanItem[];
};

/* ================= COMPONENT ================= */

const RoleFit = () => {
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState("");
  const [data, setData] = useState<RoleFitResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ================= HANDLER ================= */

  const handleAnalyze = async () => {
    if (!targetRole.trim() || !skills.trim()) {
      setError("Please enter both target role and current skills.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_role: targetRole,
          current_skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Role fit analysis failed");
      }

      const result: RoleFitResponse = await res.json();

      // 🛡️ Frontend safety (extra protection)
      setData({
        role_fit_percentage: result.role_fit_percentage ?? 0,
        strengths: result.strengths ?? [],
        missing_skills: result.missing_skills ?? [],
        in_progress_skills: result.in_progress_skills ?? [],
        learning_plan: result.learning_plan ?? [],
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Role Fit & Skill Gap</h1>
      <p className="text-muted-foreground mb-6">
        Understand how well you match a role and what to learn next
      </p>

      {/* INPUT */}
      <div className="bg-card p-6 rounded-2xl mb-6 border">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">
              Target Role *
            </label>
            <input
              className="w-full p-3 border rounded-xl"
              placeholder="e.g. Data Analyst, ML Engineer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              Current Skills (comma separated) *
            </label>
            <input
              className="w-full p-3 border rounded-xl"
              placeholder="SQL, Excel, Python"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-5 bg-primary text-primary-foreground px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
        >
          <Search size={16} />
          {loading ? "Analyzing..." : "Analyze Role Fit"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!data && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <p className="font-bold text-lg">No Analysis Yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Enter a role and your skills to see your fit.
          </p>
        </div>
      )}

      {/* RESULTS */}
      {data && !loading && (
        <div className="space-y-6">

          {/* SCORE */}
          <div className="bg-card p-6 rounded-2xl border">
            <h3 className="font-bold mb-2">Role Fit Score</h3>
            <p className="text-3xl font-bold text-primary mb-2">
              {data.role_fit_percentage}%
            </p>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${data.role_fit_percentage}%` }}
              />
            </div>
          </div>

          {/* STRENGTHS */}
          <div className="bg-card p-6 rounded-2xl border">
            <h3 className="font-bold mb-3">Strengths</h3>
            {(data.strengths ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No strong matches yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {data.strengths.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* MISSING SKILLS */}
          <div className="bg-card p-6 rounded-2xl border">
            <h3 className="font-bold mb-3">Missing Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(data.missing_skills ?? []).map((s) => (
                <span
                  key={s}
                  className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* LEARNING PLAN */}
          <div className="bg-card p-6 rounded-2xl border">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              What to Learn
            </h3>

            {(data.learning_plan ?? []).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No learning recommendations available.
              </p>
            ) : (
              <table className="w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left">Skill</th>
                    <th className="p-3 text-left">Important Topics to Cover</th>
                  </tr>
                </thead>
                <tbody>
                  {data.learning_plan.map((lp) => (
                    <tr key={lp.skill} className="border-t">
                      <td className="p-3 font-semibold">
                        {lp.skill}
                      </td>
                      <td className="p-3">
                        {lp.topics.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleFit;
