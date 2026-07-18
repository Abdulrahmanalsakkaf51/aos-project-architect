"use client";

import { FormEvent, useRef, useState } from "react";
import type { GeneratedProject, ProjectInput } from "@/lib/project-schema";

const empty: ProjectInput = { problem: "", affected: "", outcome: "", constraints: "" };
const sample: ProjectInput = {
  problem: "Our community food bank relies on spreadsheets and phone calls, causing duplicate work and delayed deliveries.",
  affected: "Food bank coordinators, volunteers, partner stores, and families waiting for essential deliveries.",
  outcome: "Create a reliable coordination process that reduces missed deliveries and gives the team a shared view of priorities.",
  constraints: "A small volunteer team, limited budget, mixed technical confidence, sensitive household information, and an eight-week pilot window.",
};
const fields: { key: keyof ProjectInput; label: string; hint: string; placeholder: string; maxLength: number }[] = [
  { key: "problem", label: "What problem are you trying to solve?", hint: "Describe the situation and why it matters.", placeholder: "Our team loses time coordinating work across disconnected tools...", maxLength: 2000 },
  { key: "affected", label: "Who is affected by this problem?", hint: "Include the people, teams, or communities involved.", placeholder: "Coordinators, volunteers, and the families they support...", maxLength: 1000 },
  { key: "outcome", label: "What outcome do you want?", hint: "Focus on a practical, observable improvement.", placeholder: "A dependable process with clear ownership and fewer delays...", maxLength: 1000 },
  { key: "constraints", label: "What constraints or limitations exist?", hint: "Consider time, budget, privacy, skills, and policies.", placeholder: "Eight weeks, a small budget, and sensitive information...", maxLength: 1000 },
];

export default function Home() {
  const [project, setProject] = useState<ProjectInput>(empty);
  const [result, setResult] = useState<GeneratedProject | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLElement>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (isGenerating) return;
    setIsGenerating(true); setError(""); setResult(null);
    try {
      const response = await fetch("/api/architect", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(project) });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message = payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string" ? payload.error : "The project could not be generated. Please try again.";
        throw new Error(message);
      }
      setResult(payload as GeneratedProject);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The project could not be generated. Please try again.");
    } finally { setIsGenerating(false); }
  }

  return <main>
    <header className="site-header"><a className="brand" href="#top" aria-label="AOS Project Architect home"><span className="brand-mark" aria-hidden="true">A</span><span><b>ALSAKKAF SYSTEMS</b><strong>AOS Project Architect</strong></span></a><div className="event"><span>OpenAI Build Week 2026</span><i /> <span>Work &amp; Productivity</span></div></header>
    <div className="shell" id="top">
      <section className="hero" aria-labelledby="hero-title"><p className="eyebrow">Human–AI project intelligence</p><h1 id="hero-title">Turn a real-world problem into a <em>project built to move.</em></h1><p className="hero-copy">Bring the challenge. AOS Project Architect shapes it into a clear brief, assigns the right partners, maps the work, and protects the decisions that matter.</p><p className="status"><i />GPT-5.6 connected · Structured human review workflow</p></section>
      <section className="workspace" aria-labelledby="form-title" aria-busy={isGenerating}>
        <div className="section-head"><div><span>01 / DEFINE</span><h2 id="form-title">Start with the problem</h2></div><p>Four inputs give the project its foundation.</p></div>
        <form onSubmit={submit}><div className="form-grid">{fields.map((field, index) => <div className="field" key={field.key}><small aria-hidden="true">0{index + 1}</small><label htmlFor={field.key}>{field.label}</label><span id={`${field.key}-hint`}>{field.hint}</span><textarea id={field.key} value={project[field.key]} onChange={(event) => setProject({ ...project, [field.key]: event.target.value })} placeholder={field.placeholder} aria-describedby={`${field.key}-hint`} maxLength={field.maxLength} disabled={isGenerating} required /></div>)}</div>
          {error && <p className="form-error" role="alert">{error}</p>}{isGenerating && <p className="generating" role="status"><i aria-hidden="true" /> Atlas, The Librarian, and Guardian are architecting your complete project. This may take up to two minutes…</p>}
          <div className="actions"><button type="button" className="secondary" disabled={isGenerating} onClick={() => { setProject(sample); setResult(null); setError(""); }}>↙ Load Sample Project</button><button type="submit" className="primary" disabled={isGenerating}>{isGenerating ? "Architecting Project…" : "Architect My Project →"}</button></div>
        </form>
      </section>
      {result && <section className="results" ref={resultRef} aria-labelledby="result-title">
        <div className="result-head"><div><span>02 / ARCHITECT</span><h2 id="result-title">Your project blueprint</h2></div><p className="mock"><i />Generated with GPT-5.6 · Human review required</p></div>
        <ResultCard number="01" label="Project Brief" title={result.projectBrief.title}><p className="lead">{result.projectBrief.problemStatement}</p><div className="brief-grid"><Brief label="People affected" text={result.projectBrief.affectedPeople} /><Brief label="Desired outcome" text={result.projectBrief.desiredOutcome} /><ListBlock label="Success measures" items={result.projectBrief.successMeasures} /><ListBlock label="Known constraints" items={result.projectBrief.constraints} /></div></ResultCard>
        <ResultCard number="02" label="Partner Assignments" title="A focused team, with human judgment at the center."><div className="role-grid"><Role index={0} code="AT" name="Atlas" responsibility={result.partnerAssignments.atlas.responsibility} items={result.partnerAssignments.atlas.tasks} /><Role index={1} code="LI" name="The Librarian" responsibility={result.partnerAssignments.librarian.responsibility} items={result.partnerAssignments.librarian.tasks} /><Role index={2} code="GU" name="Guardian" responsibility={result.partnerAssignments.guardian.responsibility} items={result.partnerAssignments.guardian.tasks} /><Role index={3} code="HC" name="Human Collaborator" responsibility={result.partnerAssignments.humanCollaborator.responsibility} items={result.partnerAssignments.humanCollaborator.approvalsRequired} approvals /></div></ResultCard>
        <ResultCard number="03" label="Action Plan" title="Workstreams and milestones from clarity to learning."><div className="workstreams">{result.actionPlan.workstreams.map((stream) => <article key={stream.title}><div><span className={`priority priority-${stream.priority.toLowerCase()}`}>{stream.priority}</span><b>{stream.owner}</b></div><h4>{stream.title}</h4><p>{stream.objective}</p><ItemList items={stream.tasks} /></article>)}</div><h4 className="subheading">Milestones</h4><ol className="timeline">{result.actionPlan.milestones.map((milestone) => <Step key={`${milestone.period}-${milestone.title}`} time={milestone.period} title={milestone.title} text={milestone.outcome} />)}</ol></ResultCard>
        <div className="split"><ResultCard number="04" label="Risks and Human Approvals" title="Protected decisions"><ul className="risks">{result.risksAndApprovals.risks.map((risk) => <Risk key={risk.title} level={risk.level} title={risk.title} text={`${risk.description} Mitigation: ${risk.mitigation}`} />)}</ul><div className="approval-box"><h4>Human Collaborator approval required</h4><ItemList items={result.risksAndApprovals.humanApprovals} /></div><div className="assumptions"><h4>Assumptions to verify</h4><ItemList items={result.risksAndApprovals.assumptions} /></div></ResultCard>
          <ResultCard number="05" label="Knowledge Card" title="Knowledge to carry forward." dark><blockquote>{result.knowledgeCard.summary}</blockquote><KnowledgeList label="Lessons" items={result.knowledgeCard.lessons} /><KnowledgeList label="Reusable knowledge" items={result.knowledgeCard.reusableKnowledge} /><KnowledgeList label="Unanswered questions" items={result.knowledgeCard.unansweredQuestions} /><p className="future-use"><b>Future use</b>{result.knowledgeCard.futureUse}</p><p className="recorded">LI &nbsp; Recorded by The Librarian · Review before reuse</p></ResultCard></div>
      </section>}
    </div>
    <footer><div className="footer-mark">A</div><blockquote>“Every solution begins with a problem, every problem becomes a project, every project creates knowledge, and every piece of knowledge strengthens AOS.”</blockquote><p>ALSAKKAF SYSTEMS · AOS Project Architect</p></footer>
  </main>;
}

function ResultCard({ number, label, title, children, dark = false }: { number: string; label: string; title: string; children: React.ReactNode; dark?: boolean }) { return <article className={`card ${dark ? "dark" : ""}`}><div className="card-number">{number}</div><div className="card-body"><p className="kicker">{label}</p><h3>{title}</h3>{children}</div></article>; }
function Brief({ label, text }: { label: string; text: string }) { return <div><b>{label}</b><p>{text}</p></div>; }
function ListBlock({ label, items }: { label: string; items: string[] }) { return <div><b>{label}</b><ItemList items={items} /></div>; }
function ItemList({ items }: { items: string[] }) { return <ul className="item-list">{items.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul>; }
function Role({ index, code, name, responsibility, items, approvals = false }: { index: number; code: string; name: string; responsibility: string; items: string[]; approvals?: boolean }) { return <div className={`role role-${index}`}><b className="role-icon">{code}</b><h4>{name}</h4><small>{responsibility}</small><p className="role-task-label">{approvals ? "Approvals required" : "Assigned tasks"}</p><ItemList items={items} /></div>; }
function Step({ time, title, text }: { time: string; title: string; text: string }) { return <li><b>{time}</b><div><h4>{title}</h4><p>{text}</p></div></li>; }
function Risk({ level, title, text }: { level: string; title: string; text: string }) { return <li><b>{level}</b><div><h4>{title}</h4><p>{text}</p></div></li>; }
function KnowledgeList({ label, items }: { label: string; items: string[] }) { return <div className="knowledge-section"><h4>{label}</h4><ItemList items={items} /></div>; }