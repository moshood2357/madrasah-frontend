"use client";
import { useEffect, useState } from "react";
import { Download, FileText, FolderOpen, Search } from "lucide-react";

interface Resource {
  id:         number;
  title:      string;
  category:   string;
  file_url:   string;
  file_type:  string;
  created_at: string;
}

const fileIcon = (type: string) => {
  if (type === "pdf")                    return "bg-red-50 text-red-500";
  if (type === "docx" || type === "doc") return "bg-blue-50 text-blue-500";
  if (type === "xlsx" || type === "xls") return "bg-green-50 text-green-600";
  return "bg-forest-50 text-forest-500";
};

export default function StudentResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [search,    setSearch]    = useState("");
  const [catFilter, setCatFilter] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/`, {
      headers:     { Authorization: `Bearer ${token}` },
      credentials: "include",
      cache: "no-store",
    })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setResources(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError("Could not load resources."); setLoading(false); });
  }, []);

  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category).filter(Boolean)))];

  const filtered = resources.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                        r.category.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === "All" || r.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleDownload = (resource: Resource) => {
    const token = localStorage.getItem("access_token");
    // Open download with token in URL won't work for protected routes
    // Instead fetch as blob and trigger download
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/resources/${resource.id}/download`,
      { headers: { Authorization: `Bearer ${token}` }, credentials: "include" }
    )
      .then((r) => r.blob())
      .then((blob) => {
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement("a");
        a.href     = url;
        a.download = resource.title;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(() => alert("Download failed. Please try again."));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="page-header"><h1 className="page-header__title">Resources</h1></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="h-40 bg-parchment rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="page-header"><h1 className="page-header__title">Resources</h1></div>
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="page-header mb-0">
        <h1 className="page-header__title">Learning Resources</h1>
        <p className="page-header__subtitle">
          Download notes, PDFs, and study materials uploaded by your teachers.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-400" />
          <input
            type="text"
            placeholder="Search resources…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 max-w-xs"
          />
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                catFilter === cat
                  ? "bg-forest-900 text-white border-forest-900"
                  : "bg-white text-forest-600 border-parchment hover:border-forest-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="empty-state bg-white rounded-2xl border border-parchment py-20">
          <FolderOpen size={40} className="text-forest-200 mb-3" />
          <p className="empty-state__text text-forest-400">
            {search || catFilter !== "All"
              ? "No resources match your search."
              : "No resources uploaded yet. Check back soon."}
          </p>
        </div>
      ) : (
        <>
          <p className="text-forest-400 text-xs">
            {filtered.length} resource{filtered.length !== 1 ? "s" : ""} available
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl border border-parchment p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4 group"
              >
                {/* File icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${fileIcon(r.file_type)}`}>
                  <FileText size={26} />
                </div>

                {/* Title + meta */}
                <div className="flex-1">
                  <p className="font-semibold text-forest-900 text-sm leading-snug line-clamp-2 mb-2">
                    {r.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-neutral text-xs">{r.category}</span>
                    <span className="text-xs font-mono font-bold text-forest-400 uppercase">
                      {r.file_type}
                    </span>
                  </div>
                  <p className="text-forest-400 text-xs mt-2">
                    Added {new Date(r.created_at).toLocaleDateString("en-NG", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>

                {/* Download button */}
                <button
                  onClick={() => handleDownload(r)}
                  className="flex items-center justify-center gap-2 w-full bg-forest-900 hover:bg-forest-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors group-hover:bg-gold-500 group-hover:text-forest-900"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
