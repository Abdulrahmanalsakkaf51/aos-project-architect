"use client";

import { FormEvent, useRef, useState } from "react";

type Project = { problem: string; affected: string; outcome: string; constraints: string };

const empty: Project = { problem: "", affected: "", outcome: "", constraints: "" };
const sample: Project = {
  problem: "Our community food bank relies on spreadsheets and phone calls, causing duplicate work and delayed deliveries.",
  affected: "Food bank coordinators, volunteers, partner stores, and families waiting for essential deliveries.",
  outcome: "Create a reliable coordination process that reduces missed deliveries and gives the team a shared view of priorities.",
  constraints: "A small volunteer team, limited budget, mixed technical confidence, sensitive household information, and an eight-week pilot window."
};
const fields: { key: keyof Project; label: string; hint: string; placeholder: string }[] = [
  { key: "problem", label: "What problem are you trying to solve?", hint: "Describe the situation and why it matters.", placeholder: "Our team loses time coordinating work across disconnected tools..." },
  { key: "affected", label: "Who is affected by this problem?", hint: "Include the people, teams, or communities involved.", placeholder: "Coordinators, volunteers, and the families they support..." },
  { key: "outcome", label: "What outcome do you want?", hint: "Focus on a practical, observable improvement.", placeholder: "A dependable process with clear ownership and fewer delays..." },
  { key: "constraints", label: "What constraints or limitations exist?", hint: "Consider time, budget, privacy, skills, and policies.", placeholder: "Eight weeks, a small budget, and sensitive information..." }
];
const roles = [
  ["AT", "Atlas", "Strategy, priorities, and milestones.", "Define the pilot scope, success measures, and an achievable eight-week roadmap."],
  ["LI", "The Librarian", "Assumptions, decisions, and reusable knowledge.", "Maintain the decision log, process notes, and lessons from the pilot."],
  ["GU", "Guardian", "Risks, privacy concerns, and human approvals.", "Review household-data handling and flag changes requiring explicit approval."],
  ["HC", "Human Collaborator", "Important decisions and external actions.", "Approve the pilot plan, data rules, and communications sent to partners."]
];

export default function Home() {
  const [project, setProject] = useState(empty);
  const [result, setResult] = useState<Project | null>(null);
  const resultRef = useRef<HTMLElement>(null);
  function submit(event: FormEvent) {
    event.preventDefault();
    setResult(project);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
  }
  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="AOS Project Architect home"><span className="brand-mark" aria-hidden="true">A</span><span><b>ALSAKKAF SYSTEMS</b><strong>AOS Project Architect</strong></span></a>
      <div className="event"><span>OpenAI Build Week 2026</span><i /> <span>Work &amp; Productivity</span></div>
    </header>
    <div className="shell" id="top">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Human–AI project intelligence</p>
        <h1 id="hero-title">Turn a real-world problem into a <em>project built to move.</em></h1>
        <p className="hero-copy">Bring the challenge. AOS Project Architect shapes it into a clear brief, assigns the right partners, maps the work, and protects the decisions that matter.</p>
        <p className="status"><i />Prototype mode — AI connection coming next.</p>
      </section>
      <section className="workspace" aria-labelledby="form-title">
        <div className="section-head"><div><span>01 / DEFINE</span><h2 id="form-title">Start with the problem</h2></div><p>Four inputs give the project its foundation.</p></div>
        <form onSubmit={submit}>
          <div className="form-grid">{fields.map((field, index) => <div className="field" key={field.key}>
            <small aria-hidden="true">0{index + 1}</small><label htmlFor={field.key}>{field.label}</label><span id={`${field.key}-hint`}>{field.hint}</span>
            <textarea id={field.key} value={project[field.key]} onChange={e => setProject({ ...project, [field.key]: e.target.value })} placeholder={field.placeholder} aria-describedby={`${field.key}-hint`} required />
          </div>)}</div>
          <div className="actions"><button type="button" className="secondary" onClick={() => { setProject(sample); setResult(null); }}>↙ Load Sample Project</button><button type="submit" className="primary">Architect My Project →</button></div>
        </form>
      </section>
      {result && <section className="results" ref={resultRef} aria-labelledby="result-title">
        <div className="result-head"><div><span>02 / ARCHITECT</span><h2 id="result-title">Your project blueprint</h2></div><p className="mock"><i />Sample prototype result — AI is not connected yet.</p></div>
        <ResultCard number="01" label="Project Brief" title="A coordinated community delivery pilot">
          <p className="lead">{result.problem}</p><div className="brief-grid"><Brief label="People affected" text={result.affected} /><Brief label="Desired outcome" text={result.outcome} /><Brief label="Known constraints" text={result.constraints} /><Brief label="Success signal" text="Fewer missed deliveries, clear ownership, and one shared weekly view of priorities." /></div>
        </ResultCard>
        <ResultCard number="02" label="Partner Assignments" title="A focused team, with human judgment at the center.">
          <div className="role-grid">{roles.map((role, index) => <div className={`role role-${index}`} key={role[1]}><b className="role-icon">{role[0]}</b><h4>{role[1]}</h4><small>{role[2]}</small><p>{role[3]}</p></div>)}</div>
        </ResultCard>
        <ResultCard number="03" label="Action Plan" title="Three phases from clarity to learning.">
          <ol className="timeline"><Step time="Week 1–2" title="Map & align" text="Document today’s process, confirm the pilot group, and agree on success measures." /><Step time="Week 3–6" title="Pilot & observe" text="Run one shared coordination process, record friction, and review progress weekly." /><Step time="Week 7–8" title="Evaluate & decide" text="Compare results, record lessons, and ask the Human Collaborator to approve the next step." /></ol>
        </ResultCard>
        <div className="split">
          <ResultCard number="04" label="Risks and Human Approvals" title="Protected decisions"><ul className="risks"><Risk level="High" title="Household privacy" text="Collect only essential information. A human must approve access rules before the pilot." /><Risk level="Med" title="Volunteer adoption" text="Test the process with volunteers and provide a simple fallback." /><Risk level="Ask" title="External communication" text="Partner messages require Human Collaborator approval before sending." /></ul></ResultCard>
          <ResultCard number="05" label="Knowledge Card" title="Start small. Learn visibly." dark><blockquote>Coordination improves when ownership, privacy boundaries, and feedback are designed together—not added later.</blockquote><div className="tags"><span>Reusable pattern</span><span>Community operations</span><span>Pilot design</span></div><p className="recorded">LI &nbsp; Recorded by The Librarian</p></ResultCard>
        </div>
      </section>}
    </div>
    <footer><div className="footer-mark">A</div><blockquote>“Every solution begins with a problem, every problem becomes a project, every project creates knowledge, and every piece of knowledge strengthens AOS.”</blockquote><p>ALSAKKAF SYSTEMS · AOS Project Architect</p></footer>
  </main>;
}

function ResultCard({ number, label, title, children, dark = false }: { number: string; label: string; title: string; children: React.ReactNode; dark?: boolean }) {
  return <article className={`card ${dark ? "dark" : ""}`}><div className="card-number">{number}</div><div className="card-body"><p className="kicker">{label}</p><h3>{title}</h3>{children}</div></article>;
}
function Brief({ label, text }: { label: string; text: string }) { return <div><b>{label}</b><p>{text}</p></div>; }
function Step({ time, title, text }: { time: string; title: string; text: string }) { return <li><b>{time}</b><div><h4>{title}</h4><p>{text}</p></div></li>; }
function Risk({ level, title, text }: { level: string; title: string; text: string }) { return <li><b>{level}</b><div><h4>{title}</h4><p>{text}</p></div></li>; }
