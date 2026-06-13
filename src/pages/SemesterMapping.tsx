import { useState } from "react";
import { Search, Upload, BookOpen } from "lucide-react";

const API_URL = "http://localhost:8000/api/semester/analyze";

type Topic = {
  name: string;
  industry_relevance: string;
  industry_skill: string;
  industry_tools: string[];
  extra_learning: string[];
};


type Subject = {
  name: string;
  topics: Topic[];
};

type Skill = {
  name: string;
  category: string;
  status: string;
};

type SemesterResponse = {
  semester_detected: string;
  theory_subjects: Subject[];
  lab_subjects: Subject[];
  industry_skills: Skill[];
  industry_relevance: string;
  semester_readiness_score: number;
  summary_card_data: Record<string, any>;
};

const SemesterMapping = () => {
  const [syllabus, setSyllabus] = useState("");
  const [semester, setSemester] = useState("auto");
  const [file, setFile] = useState<File | null>(null);

  const [data, setData] = useState<SemesterResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const formData = new FormData();
      if (syllabus.trim()) formData.append("syllabus_text", syllabus);
      if (file) formData.append("syllabus_file", file);
      if (semester !== "auto") formData.append("manual_semester", semester);

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to analyze semester");
      }

      const result: SemesterResponse = await res.json();
      setData(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Semester-wise Mapping</h1>
      <p className="text-muted-foreground mb-6">
        Map your academic syllabus to industry-ready skills
      </p>

      {/* INPUT */}
      <div className="bg-card border rounded-2xl p-6 mb-6">
        <textarea
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
          placeholder="Paste syllabus text here..."
          className="w-full h-32 border rounded-xl p-3 mb-4"
        />

        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border rounded-xl px-3 py-2 mb-4"
        >
          <option value="auto">Auto-detect semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
            <option key={s} value={s}>Semester {s}</option>
          ))}
        </select>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Search size={16} />
          {loading ? "Analyzing..." : "Analyze Semester"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!data && !loading && (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="mx-auto mb-3" />
          No analysis yet
        </div>
      )}

      {/* RESULTS */}

      {data && (
        <div className="space-y-8">

          {/* Semester */}
          <div className="bg-card p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-1">Semester Identified</h3>
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-lg font-semibold">
              {data.semester_detected}
            </span>
          </div>

          {/* THEORY SUBJECTS */}
          <div className="bg-card p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-4">Theory Subjects</h3>

            <div className="space-y-6">
              {data.theory_subjects.map(subject => (
                <div key={subject.name}>
                  <h4 className="font-semibold mb-3">{subject.name}</h4>

                  {/* Topic Cards */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {subject.topics.map(topic => (
                      <div
                        key={topic.name}
                        className="border rounded-xl p-4 space-y-3"
                      >
                        {/* Topic + relevance */}
                        <div>
                          <p className="font-semibold">{topic.name}</p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${topic.industry_relevance === "High"
                            ? "bg-emerald-100 text-emerald-700"
                            : topic.industry_relevance === "Medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                            }`}>
                            {topic.industry_relevance} Industry Relevance
                          </span>
                        </div>

                        {/* Academic → Industry */}
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-xs font-semibold text-muted-foreground mb-1">
                            Academic → Industry
                          </p>
                          <p className="font-medium">{topic.industry_skill}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {topic.industry_tools.map(tool => (
                              <span
                                key={tool}
                                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Industry Booster */}
                        {topic.extra_learning.length > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <p className="text-xs font-semibold text-amber-700 mb-1">
                              🚀 To be more industry-ready, also learn:
                            </p>
                            <ul className="list-disc ml-4 text-xs text-amber-700">
                              {topic.extra_learning.map(extra => (
                                <li key={extra}>{extra}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LAB SUBJECTS */}
          <div className="bg-card p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-4">Lab / Practical Subjects</h3>

            <div className="space-y-6">
              {data.lab_subjects.map(subject => (
                <div key={subject.name}>
                  <h4 className="font-semibold mb-3">{subject.name}</h4>

                  <div className="grid md:grid-cols-2 gap-4">
                    {subject.topics.map(topic => (
                      <div
                        key={topic.name}
                        className="border rounded-xl p-4 space-y-3"
                      >
                        <p className="font-semibold">{topic.name}</p>

                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-xs font-semibold text-muted-foreground mb-1">
                            Industry Skill
                          </p>
                          <p className="font-medium">{topic.industry_skill}</p>
                        </div>

                        {topic.extra_learning.length > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <p className="text-xs font-semibold text-amber-700 mb-1">
                              🚀 Extra skills that help in industry:
                            </p>
                            <ul className="list-disc ml-4 text-xs text-amber-700">
                              {topic.extra_learning.map(extra => (
                                <li key={extra}>{extra}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* READINESS */}
          <div className="bg-card p-6 rounded-2xl">
            <h3 className="font-bold mb-2">Semester Readiness Score</h3>
            <p className="text-3xl font-bold text-primary">
              {data.semester_readiness_score}%
            </p>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-primary"
                style={{ width: `${data.semester_readiness_score}%` }}
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default SemesterMapping;