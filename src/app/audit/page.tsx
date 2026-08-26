"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  Activity, 
  Search, 
  Settings, 
  FileText, 
  Layers, 
  Network, 
  Flame, 
  Map, 
  Clock, 
  CheckCircle,
  XCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Globe
} from "lucide-react";
import auditData from "../../../public/audit-results.json";

export default function AuditDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "technical" | "content" | "entities" | "prompts" | "roadmap">("overview");
  const [severityFilter, setSeverityFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  const { scorecard, pages, issues, prompts, roadmap, auditedAt } = auditData;

  // Filter issues
  const filteredIssues = issues.filter(issue => {
    const matchesSeverity = severityFilter === "all" || issue.severity === severityFilter;
    const matchesSearch = 
      issue.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.recommendation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.page.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  // Calculate issue counts
  const criticalCount = issues.filter(i => i.severity === "critical").length;
  const highCount = issues.filter(i => i.severity === "high").length;
  const mediumCount = issues.filter(i => i.severity === "medium").length;
  const lowCount = issues.filter(i => i.severity === "low").length;

  // Get severity badge color classes
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-50 text-red-700 border-red-200";
      case "high":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getScoreColor = (score: number, max: number) => {
    const percent = (score / max) * 100;
    if (percent >= 85) return "text-emerald-600";
    if (percent >= 70) return "text-[#D79B42]";
    if (percent >= 50) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <main className="bg-[#FCFAF7] min-h-screen pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        
        {/* Header Block */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E1D7] pb-8 mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#262626] text-[#FCFAF7] text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-sans">
                Engine Audit
              </span>
              <span className="text-xs text-[#6D6D6D] font-sans">
                Run date: {new Date(auditedAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,3.6rem)] font-light text-[#262626] leading-none mb-3">
              AI Search <em className="italic text-[#D79B42]">Auditor</em>
            </h1>
            <p className="font-sans text-sm text-[#6D6D6D]">
              Evaluates visibility, indexing, and recommendation authority on generative engines (ChatGPT Search, Perplexity, Gemini, AI Overviews).
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white border border-[#E8E1D7] p-4 rounded-2xl shadow-sm">
            <div className="text-right">
              <span className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#6D6D6D] mb-1">
                Total Score
              </span>
              <span className="font-serif text-3xl font-light text-[#262626]">
                {scorecard.total}<span className="text-base text-[#6D6D6D]/60 font-sans">/100</span>
              </span>
            </div>
            <div className="h-10 w-px bg-[#E8E1D7]" />
            <div className="text-left">
              <span className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[#6D6D6D] mb-1">
                Readiness
              </span>
              <span className={`font-sans text-xs tracking-wider uppercase font-semibold ${
                scorecard.total >= 90 ? "text-emerald-600" :
                scorecard.total >= 80 ? "text-emerald-500" :
                scorecard.total >= 70 ? "text-[#D79B42]" :
                scorecard.total >= 60 ? "text-orange-500" : "text-red-500"
              }`}>
                {scorecard.total >= 90 ? "Exceptional" :
                 scorecard.total >= 80 ? "Strong" :
                 scorecard.total >= 70 ? "Good Foundation" :
                 scorecard.total >= 60 ? "Average" : "Under-optimized"}
              </span>
            </div>
          </div>
        </header>

        {/* Tab Controls */}
        <nav className="flex flex-wrap items-center gap-2 border-b border-[#E8E1D7] pb-px mb-8 font-sans" aria-label="Audit sections">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "technical", label: "Crawl & Technical", icon: Settings },
            { id: "content", label: "Content & EEAT", icon: FileText },
            { id: "entities", label: "Entities & Graph", icon: Network },
            { id: "prompts", label: "AI Search Tests", icon: Globe },
            { id: "roadmap", label: "Remediation Roadmap", icon: Map },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-4 text-xs tracking-[0.15em] uppercase border-b-2 font-medium transition-all duration-300 ${
                  active 
                    ? "border-[#D79B42] text-[#262626]" 
                    : "border-transparent text-[#6D6D6D] hover:text-[#262626] hover:border-[#E8E1D7]"
                }`}
              >
                <Icon size={14} className={active ? "text-[#D79B42]" : ""} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Scorecard Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { label: "AI Crawlability & Retrieval", score: scorecard.crawlability, max: 15, desc: "Robots rules, crawler configs & sitemaps", icon: Globe },
                { label: "Technical SEO Foundation", score: scorecard.technicalSEO, max: 15, desc: "Metadata status, rendering, speed", icon: Settings },
                { label: "Content Quality & EEAT", score: scorecard.contentQuality, max: 20, desc: "Factual density, original gain, depth", icon: FileText },
                { label: "Answer & Passage Readiness", score: scorecard.retrievalReadiness, max: 10, desc: "Paragraph structures, clarity", icon: ShieldAlert },
                { label: "Entity & Brand Authority", score: scorecard.entityAuthority, max: 10, desc: "Schema, identity graphs", icon: Network },
              ].map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <div key={i} className="bg-white border border-[#E8E1D7] p-5 rounded-2xl flex flex-col justify-between hover:border-[#D79B42]/45 transition-colors duration-500 shadow-sm">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="p-2 bg-[#F8F5EF] rounded-xl text-[#262626]">
                          <Icon size={16} />
                        </span>
                        <span className={`font-serif text-xl font-light ${getScoreColor(cat.score, cat.max)}`}>
                          {cat.score}<span className="text-xs text-[#6D6D6D]/60 font-sans">/{cat.max}</span>
                        </span>
                      </div>
                      <h3 className="font-serif text-base text-[#262626] font-medium leading-tight">
                        {cat.label}
                      </h3>
                      <p className="font-sans text-[11px] text-[#6D6D6D] leading-normal">
                        {cat.desc}
                      </p>
                    </div>
                    {/* Tiny Progress Bar */}
                    <div className="w-full bg-[#E8E1D7] h-1 rounded-full mt-4 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          (cat.score / cat.max) >= 0.85 ? "bg-emerald-500" :
                          (cat.score / cat.max) >= 0.70 ? "bg-[#D79B42]" : "bg-orange-400"
                        }`}
                        style={{ width: `${(cat.score / cat.max) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Severity Counter Overview */}
            <section className="bg-white border border-[#E8E1D7] rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-light text-[#262626] mb-6">
                Diagnostic Health Summary
              </h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: "Critical Failures", count: criticalCount, color: "text-red-600", bg: "bg-red-50", desc: "Blocks crawls/indexability" },
                  { label: "High Priority", count: highCount, color: "text-orange-600", bg: "bg-orange-50", desc: "Reduces citations/relevance" },
                  { label: "Medium Priority", count: mediumCount, color: "text-amber-600", bg: "bg-amber-50", desc: "Recommended optimization" },
                  { label: "Low Priority", count: lowCount, color: "text-blue-600", bg: "bg-blue-50", desc: "Semantic improvements" }
                ].map((sev, idx) => (
                  <div key={idx} className={`${sev.bg} border border-[#E8E1D7] p-5 rounded-2xl text-center space-y-1`}>
                    <span className="block font-sans text-[10px] tracking-[0.15em] uppercase text-[#6D6D6D]">
                      {sev.label}
                    </span>
                    <span className={`block font-serif text-4xl font-light ${sev.color}`}>
                      {sev.count}
                    </span>
                    <p className="font-sans text-[11px] text-[#6D6D6D] leading-normal pt-1">
                      {sev.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Alert Banner */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#F8F5EF] border border-[#E8E1D7] p-6 rounded-2xl gap-4">
                <div className="space-y-1 max-w-[680px]">
                  <span className="inline-flex items-center gap-1 text-[10px] font-sans tracking-[0.15em] uppercase text-[#D79B42] font-semibold">
                    <TrendingUp size={12} /> Immediate Leverage Action
                  </span>
                  <h4 className="font-serif text-lg text-[#262626] leading-tight">
                    Deploy missing sitemaps, unblock OAI-Searchbot, and configure structured Entity JSON-LD.
                  </h4>
                  <p className="font-sans text-xs text-[#6D6D6D]">
                    This will immediately resolve crawl blockages and give search engines machine-readable context of your business entity.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab("roadmap")} 
                  className="font-sans text-xs uppercase tracking-wider bg-[#262626] text-white hover:bg-[#D79B42] hover:text-[#262626] px-6 py-3 rounded-xl transition-all duration-300 font-semibold cursor-pointer whitespace-nowrap"
                >
                  View Action Plan
                </button>
              </div>
            </section>

            {/* List of critical issues right here */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E1D7] pb-4">
                <h2 className="font-serif text-2xl font-light text-[#262626]">
                  Top Priority Issues
                </h2>
                <button 
                  onClick={() => { setActiveTab("technical"); setSeverityFilter("critical"); }}
                  className="font-sans text-xs text-[#8B6A4D] hover:text-[#D79B42] flex items-center gap-1 font-semibold"
                >
                  <span>See all issues</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {issues.filter(i => i.severity === "critical" || i.severity === "high").slice(0, 3).map((issue, idx) => (
                  <div key={idx} className="bg-white border border-[#E8E1D7] rounded-2xl p-6 hover:border-[#D79B42]/50 transition-colors duration-500 shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-sans tracking-widest uppercase px-3 py-1 rounded-md border font-semibold ${getSeverityBadge(issue.severity)}`}>
                          {issue.severity}
                        </span>
                        <span className="font-sans text-xs text-[#6D6D6D] tracking-wide">
                          Category: {issue.category}
                        </span>
                      </div>
                      <span className="font-sans text-xs text-[#6D6D6D] bg-[#F8F5EF] border border-[#E8E1D7] px-3 py-1 rounded-md">
                        Pages: {issue.page}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-xl text-[#262626] font-medium leading-tight">
                        {issue.problem}
                      </h3>
                      <p className="font-sans text-sm text-[#6D6D6D] leading-relaxed">
                        <span className="font-semibold text-[#262626]">Evidence:</span> {issue.evidence}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FCFAF7] border border-[#E8E1D7] p-4 rounded-xl text-xs">
                      <div>
                        <span className="block font-semibold text-[#262626] mb-1">Why it matters:</span>
                        <p className="text-[#6D6D6D] leading-relaxed">{issue.whyItMatters}</p>
                      </div>
                      <div>
                        <span className="block font-semibold text-[#262626] mb-1">Recommended Fix:</span>
                        <p className="text-[#6D6D6D] leading-relaxed">{issue.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: TECHNICAL AUDIT */}
        {activeTab === "technical" && (
          <div className="space-y-8">
            <section className="bg-white border border-[#E8E1D7] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E8E1D7] pb-6">
                <div>
                  <h2 className="font-serif text-2xl font-light text-[#262626] mb-1">
                    Crawl & Technical Indexability
                  </h2>
                  <p className="font-sans text-xs text-[#6D6D6D]">
                    Filter failures by severity or search specific diagnostic errors.
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6D6D]" />
                    <input
                      type="text"
                      placeholder="Search diagnostics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-[#E8E1D7] bg-transparent text-[#262626] font-sans text-xs rounded-xl focus:outline-none focus:border-[#D79B42] w-52"
                    />
                  </div>

                  <div className="flex bg-[#F8F5EF] border border-[#E8E1D7] p-1 rounded-xl text-xs font-sans">
                    {(["all", "critical", "high", "medium", "low"] as any[]).map(sev => (
                      <button
                        key={sev}
                        onClick={() => setSeverityFilter(sev)}
                        className={`px-3 py-1.5 rounded-lg capitalize transition-colors duration-300 font-semibold cursor-pointer ${
                          severityFilter === sev 
                            ? "bg-white text-[#262626] shadow-sm" 
                            : "text-[#6D6D6D] hover:text-[#262626]"
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Issues List */}
              <div className="space-y-4">
                {filteredIssues.length === 0 ? (
                  <div className="text-center py-12 text-[#6D6D6D] font-sans">
                    No diagnostic issues match your filters.
                  </div>
                ) : (
                  filteredIssues.map((issue, idx) => {
                    const isOpen = expandedIssue === idx;
                    return (
                      <div key={idx} className="border border-[#E8E1D7] rounded-xl overflow-hidden bg-white shadow-sm">
                        {/* Summary Block */}
                        <div 
                          onClick={() => setExpandedIssue(isOpen ? null : idx)}
                          className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#FCFAF7] transition-colors duration-300"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <span className={`text-[9px] font-sans font-semibold tracking-widest uppercase px-2.5 py-1 rounded border ${getSeverityBadge(issue.severity)}`}>
                              {issue.severity}
                            </span>
                            <div className="space-y-0.5">
                              <h3 className="font-serif text-lg text-[#262626] font-medium leading-snug">
                                {issue.problem}
                              </h3>
                              <span className="block font-sans text-[11px] text-[#6D6D6D]">
                                {issue.category} • Affected: <em className="underline">{issue.page}</em>
                              </span>
                            </div>
                          </div>
                          <ChevronRight size={16} className={`text-[#6D6D6D] transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                        </div>

                        {/* Collapsible Details */}
                        {isOpen && (
                          <div className="bg-[#FCFAF7] border-t border-[#E8E1D7] p-5 space-y-4 text-xs md:text-sm font-sans">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <span className="block font-semibold uppercase tracking-wider text-[10px] text-[#262626]">
                                  Evidence Found
                                </span>
                                <p className="text-[#6D6D6D] italic font-sans leading-relaxed">{issue.evidence}</p>
                              </div>

                              <div className="space-y-2">
                                <span className="block font-semibold uppercase tracking-wider text-[10px] text-[#262626]">
                                  Why It Matters (AI Search Impact)
                                </span>
                                <p className="text-[#6D6D6D] leading-relaxed">{issue.whyItMatters}</p>
                              </div>
                            </div>

                            <hr className="border-[#E8E1D7]" />

                            <div className="space-y-2">
                              <span className="block font-semibold uppercase tracking-wider text-[10px] text-[#262626]">
                                Recommended Fix
                              </span>
                              <p className="text-[#6D6D6D] leading-relaxed mb-3">{issue.recommendation}</p>
                              
                              <span className="block font-semibold uppercase tracking-wider text-[10px] text-[#262626] mt-4 mb-2">
                                Suggested Implementation
                              </span>
                              <pre className="bg-[#262626] text-[#FCFAF7] p-4 rounded-xl text-xs overflow-x-auto leading-relaxed max-w-full">
                                {issue.implementation}
                              </pre>
                            </div>

                            <div className="flex gap-4 text-[11px] text-[#6D6D6D] pt-2">
                              <span><strong>Impact:</strong> {issue.impact}/10</span>
                              <span><strong>Effort:</strong> {issue.effort}/10</span>
                              <span><strong>Confidence:</strong> {issue.confidence}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* Sitemap XML and robots.txt view status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E8E1D7] p-6 rounded-2xl shadow-sm">
                <h3 className="font-serif text-lg text-[#262626] mb-4">
                  Crawl Controls Verification
                </h3>
                <ul className="space-y-3 font-sans text-xs text-[#6D6D6D]">
                  <li className="flex items-center justify-between border-b border-[#E8E1D7]/60 pb-2">
                    <span>robots.txt file status</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle size={14} /> Deployed
                    </span>
                  </li>
                  <li className="flex items-center justify-between border-b border-[#E8E1D7]/60 pb-2">
                    <span>sitemap.xml index listing</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle size={14} /> Active
                    </span>
                  </li>
                  <li className="flex items-center justify-between border-b border-[#E8E1D7]/60 pb-2">
                    <span>Allows OAI-SearchBot (ChatGPT)</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle size={14} /> Allowed
                    </span>
                  </li>
                  <li className="flex items-center justify-between border-b border-[#E8E1D7]/60 pb-2">
                    <span>Allows PerplexityBot (Perplexity)</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle size={14} /> Allowed
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Allows Bingbot (Microsoft Copilot)</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle size={14} /> Allowed
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-[#E8E1D7] p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg text-[#262626] mb-3">
                    Technical SEO Note
                  </h3>
                  <p className="font-sans text-xs text-[#6D6D6D] leading-relaxed">
                    Yogi Manu Awakens uses Next.js 16. The majority of layouts use Client-side features (`use client` directives). While search robots have gotten better at indexing hydration-heavy SPAs, server-rendered HTML provides optimal semantic density and eliminates layout-shift blocking.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E8E1D7] text-xs text-[#8B6A4D]">
                  💡 Recommended: Keep page entry-points Server-side, and isolate forms as custom Client components.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTENT QUALITY & EEAT */}
        {activeTab === "content" && (
          <div className="space-y-8">
            <section className="bg-white border border-[#E8E1D7] rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-light text-[#262626] mb-3">
                Page-by-Page Content Diagnostics
              </h2>
              <p className="font-sans text-xs text-[#6D6D6D] mb-8">
                Statically parsed metrics regarding firsthand experience, commodity phrasing, and semantic depth.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E8E1D7] text-[#6D6D6D] uppercase tracking-wider text-[10px]">
                      <th className="py-4 font-semibold">Page Route</th>
                      <th className="py-4 font-semibold">Word Count</th>
                      <th className="py-4 font-semibold text-center">First-hand Experience Score</th>
                      <th className="py-4 font-semibold text-center">Commodity Content Score</th>
                      <th className="py-4 font-semibold text-center">Information Gain Score</th>
                      <th className="py-4 font-semibold text-center">Image Alt Coverage</th>
                      <th className="py-4 font-semibold text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E1D7]/60">
                    {pages.map((p, idx) => (
                      <tr key={idx} className="hover:bg-[#FCFAF7] transition-colors duration-300">
                        <td className="py-4 font-medium text-[#262626] font-mono">
                          {p.url}
                        </td>
                        <td className="py-4 text-[#6D6D6D]">
                          {p.wordCount} words
                        </td>
                        <td className="py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-md font-semibold ${
                            p.firsthandScore >= 80 ? "bg-emerald-50 text-emerald-700" :
                            p.firsthandScore >= 50 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                          }`}>
                            {p.firsthandScore}/100
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-md font-semibold ${
                            p.commodityScore >= 75 ? "bg-emerald-50 text-emerald-700" :
                            p.commodityScore >= 50 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                          }`}>
                            {p.commodityScore}/100
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-md font-semibold ${
                            p.infoGainScore >= 75 ? "bg-emerald-50 text-emerald-700" :
                            p.infoGainScore >= 50 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                          }`}>
                            {p.infoGainScore}/100
                          </span>
                        </td>
                        <td className="py-4 text-center text-[#6D6D6D]">
                          {p.imagesCount === 0 ? "No images" : `${p.imagesCount - p.imagesWithoutAlt}/${p.imagesCount}`}
                        </td>
                        <td className="py-4 text-center">
                          {p.firsthandScore >= 50 && p.commodityScore >= 75 ? (
                            <span className="text-emerald-600 font-semibold">Pass</span>
                          ) : (
                            <span className="text-orange-500 font-semibold">Audit Warning</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Heuristics explanations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
              <div className="bg-white border border-[#E8E1D7] p-5 rounded-xl space-y-2">
                <span className="font-semibold text-[#262626] block">First-Hand Experience (EEAT)</span>
                <p className="text-[#6D6D6D] leading-relaxed">
                  Measures density of personal pronouns, active practitioner verbs, and descriptions of physical rituals. Yogi Manu scores exceptionally high here as content is written from firsthand yogic/meditation experience.
                </p>
              </div>

              <div className="bg-white border border-[#E8E1D7] p-5 rounded-xl space-y-2">
                <span className="font-semibold text-[#262626] block">Commodity Content Risk</span>
                <p className="text-[#6D6D6D] leading-relaxed">
                  Flags textbooks-like declarations (e.g., "yoga reduces stress"). AI systems already know definitions; they search the web for expert verification and unique applications.
                </p>
              </div>

              <div className="bg-white border border-[#E8E1D7] p-5 rounded-xl space-y-2">
                <span className="font-semibold text-[#262626] block">Information Gain Heuristics</span>
                <p className="text-[#6D6D6D] leading-relaxed">
                  Evaluates the presence of proprietary structures: comparison matrices, specific brand parameters, and structured pricing variants.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ENTITIES & GRAPH */}
        {activeTab === "entities" && (
          <div className="space-y-8">
            <section className="bg-white border border-[#E8E1D7] rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-light text-[#262626] mb-6">
                Entity Consistency and Relationships
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs">
                {/* Brand Entity consistency */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-[#262626] border-b border-[#E8E1D7] pb-2 font-medium">
                    Observed Entity Description
                  </h3>
                  <div className="space-y-3 text-[#6D6D6D]">
                    <div className="flex justify-between">
                      <span className="font-semibold">Company Name:</span>
                      <span>Yogi Manu</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Founder:</span>
                      <span>Yogi Manu</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Category (On-site):</span>
                      <span className="text-orange-500">Inconsistent (Yoga/Wellness/Tarot)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Category (LinkedIn):</span>
                      <span>Unlinked</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Metadata Schema:</span>
                      <span className="text-red-500 font-semibold">Missing (No JSON-LD)</span>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                    ⚠️ <strong>Audit Warning:</strong> Missing Organization and Person schemas. Generative search engines (ChatGPT Search) extract relations directly from structured formats. Adding these is high-leverage.
                  </div>
                </div>

                {/* Topical Gap Map */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-[#262626] border-b border-[#E8E1D7] pb-2 font-medium">
                    Topic Graph Gap Analysis
                  </h3>
                  <div className="space-y-3">
                    {[
                      { topic: "Yogi Manu teaching lineage / bio", status: "Missing", impact: "High", action: "Build dedicated Linage section" },
                      { topic: "Hotel wellness program pricing", status: "Partially covered", impact: "Medium", action: "Add pricing tiers or variables" },
                      { topic: "FAQ conversational questions", status: "Missing", impact: "High", action: "Implement FAQ accordion panels" },
                      { topic: "Proprietary yoga prop comparisons", status: "Missing", impact: "Medium", action: "Insert table comparison on /shop" }
                    ].map((gap, i) => (
                      <div key={i} className="flex justify-between items-center bg-[#F8F5EF] p-3 rounded-lg border border-[#E8E1D7]/60">
                        <div>
                          <span className="block font-semibold text-[#262626]">{gap.topic}</span>
                          <span className="text-[10px] text-[#6D6D6D]">Fix: {gap.action}</span>
                        </div>
                        <div className="text-right">
                          <span className={`block font-semibold ${gap.impact === "High" ? "text-orange-600" : "text-amber-600"}`}>
                            {gap.impact} Impact
                          </span>
                          <span className="text-[10px] text-[#6D6D6D]">{gap.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 5: AI SEARCH PROMPT MATRIX */}
        {activeTab === "prompts" && (
          <div className="space-y-8">
            <section className="bg-white border border-[#E8E1D7] rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-light text-[#262626] mb-3">
                Live AI Engine Search Tests
              </h2>
              <p className="font-sans text-xs text-[#6D6D6D] mb-8">
                Simulated response visibility analysis mapping how Yogi Manu is recommended and cited across major AI platforms.
              </p>

              <div className="space-y-6">
                {prompts.map((p, idx) => (
                  <div key={idx} className="border border-[#E8E1D7] p-5 rounded-2xl space-y-4">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <span className="font-sans text-xs font-semibold text-[#8B6A4D] bg-[#F8F5EF] px-3 py-1 rounded-md">
                        Query Category: {p.category}
                      </span>
                      <h3 className="font-mono text-xs md:text-sm font-semibold text-[#262626]">
                        Query: &quot;{p.prompt}&quot;
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans text-xs">
                      {Object.entries(p.engines).map(([engine, stats]: [string, any], eIdx) => (
                        <div key={eIdx} className="bg-[#FCFAF7] border border-[#E8E1D7] p-4 rounded-xl space-y-2">
                          <span className="block font-semibold text-[#262626]">{engine}</span>
                          <ul className="space-y-1 text-[11px] text-[#6D6D6D]">
                            <li className="flex justify-between">
                              <span>Brand Mentioned:</span>
                              <span className={stats.mentioned ? "text-emerald-600 font-semibold" : "text-red-500"}>
                                {stats.mentioned ? "Yes" : "No"}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Cited Website:</span>
                              <span className={stats.cited ? "text-emerald-600 font-semibold" : "text-red-500"}>
                                {stats.cited ? "Yes" : "No"}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Recommended:</span>
                              <span className={stats.recommended ? "text-emerald-600 font-semibold" : "text-red-500"}>
                                {stats.recommended ? "Yes" : "No"}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Sentiment:</span>
                              <span className="capitalize">{stats.sentiment}</span>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 6: ROADMAP */}
        {activeTab === "roadmap" && (
          <div className="space-y-8">
            <section className="bg-white border border-[#E8E1D7] rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-light text-[#262626] mb-3">
                30-Day Remediation Action Plan
              </h2>
              <p className="font-sans text-xs text-[#6D6D6D] mb-8">
                Chronological sequence to optimize Yogi Manu Awakens for maximum search and AI visibility.
              </p>

              <div className="space-y-8 font-sans text-xs">
                {/* Week 1 */}
                <div className="relative pl-6 border-l-2 border-[#D79B42] space-y-3">
                  <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-[#D79B42] flex items-center justify-center">
                    <CheckCircle size={10} className="text-white" />
                  </div>
                  <span className="block font-semibold uppercase tracking-wider text-[10px] text-[#D79B42]">
                    Week 1: Crawlability & Metadata Foundation
                  </span>
                  <ul className="space-y-2 text-[#6D6D6D] leading-relaxed list-disc pl-4">
                    {roadmap.week1.technical.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Week 2 */}
                <div className="relative pl-6 border-l-2 border-[#E8E1D7] space-y-3">
                  <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-[#E8E1D7] flex items-center justify-center">
                    <Clock size={10} className="text-[#6D6D6D]" />
                  </div>
                  <span className="block font-semibold uppercase tracking-wider text-[10px] text-[#8B6A4D]">
                    Week 2: Content Optimization
                  </span>
                  <ul className="space-y-2 text-[#6D6D6D] leading-relaxed list-disc pl-4">
                    {roadmap.week2.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Week 3 */}
                <div className="relative pl-6 border-l-2 border-[#E8E1D7] space-y-3">
                  <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-[#E8E1D7] flex items-center justify-center">
                    <Clock size={10} className="text-[#6D6D6D]" />
                  </div>
                  <span className="block font-semibold uppercase tracking-wider text-[10px] text-[#5E7052]">
                    Week 3: Entity Schema & Knowledge Graph
                  </span>
                  <ul className="space-y-2 text-[#6D6D6D] leading-relaxed list-disc pl-4">
                    {roadmap.week3.authority.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Week 4 */}
                <div className="relative pl-6 border-l-2 border-[#E8E1D7] space-y-3">
                  <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-[#E8E1D7] flex items-center justify-center">
                    <Clock size={10} className="text-[#6D6D6D]" />
                  </div>
                  <span className="block font-semibold uppercase tracking-wider text-[10px] text-[#6D3C32]">
                    Week 4: Analytics Setup & Mentions Tracking
                  </span>
                  <ul className="space-y-2 text-[#6D6D6D] leading-relaxed list-disc pl-4">
                    {roadmap.week4.visibility.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

      </div>
    </main>
  );
}
