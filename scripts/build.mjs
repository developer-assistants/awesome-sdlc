import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DOCS_DIR = path.join(ROOT, "docs");
const SITE_URL = "https://developer-assistants.github.io/awesome-sdlc";
const REPO_URL = "https://github.com/developer-assistants/awesome-sdlc";
const GSC_META = '<meta name="google-site-verification" content="HqgfQrEQATXaycciOAu8GzuJP8BSRHtaR1JrgBtnApU" />';

function renderLayout({
  slug,
  title,
  description,
  body,
  schemaType = "TechArticle",
  extraJsonLd = null
}) {
  const isHome = slug === "";
  const base = isHome ? "./" : "../";
  const canonical = isHome ? `${SITE_URL}/` : `${SITE_URL}/${slug}/`;

  const navItems = [
    { href: `${base}phases/`, label: "Phases", key: "phases" },
    { href: `${base}models/`, label: "Models", key: "models" },
    { href: `${base}checklist/`, label: "Checklist", key: "checklist" },
    { href: `${base}diagram/`, label: "Diagram", key: "diagram" },
    { href: `${base}templates/`, label: "Templates", key: "templates" },
    { href: `${base}cheat-sheet/`, label: "Cheat sheet", key: "cheat-sheet" }
  ];

  const navHtml = navItems
    .map(
      (item) =>
        `<li><a href="${item.href}"${slug === item.key ? ' aria-current="page"' : ""}>${item.label}</a></li>`
    )
    .join("\n            ");

  const jsonLd = extraJsonLd || {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    headline: title,
    description,
    url: canonical,
    isAccessibleForFree: true,
    license: "https://opensource.org/licenses/MIT",
    publisher: {
      "@type": "Organization",
      name: "Developer Assistants",
      url: "https://github.com/developer-assistants"
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${GSC_META}
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="${isHome ? "website" : "article"}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@600&family=Red+Hat+Text:wght@400;500&family=Red+Hat+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${base}assets/site.css">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <header class="site-header">
    <div class="container nav-bar">
      <a class="brand" href="${base}">
        <span>awesome-sdlc</span>
        <span class="brand-tag">MIT open source</span>
      </a>
      <nav aria-label="Primary navigation">
        <ul class="nav-list">
            ${navHtml}
            <li><a href="${REPO_URL}">GitHub</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
${body}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="${base}">awesome-sdlc</a>
          <p class="footer-note">Open-source SDLC guides, templates, diagrams, and browser tools by Developer Assistants.</p>
        </div>
        <div>
          <div class="footer-col-title">Guides</div>
          <ul class="footer-links">
            <li><a href="${base}meaning/">Meaning</a></li>
            <li><a href="${base}phases/">Phases</a></li>
            <li><a href="${base}models/">Models</a></li>
            <li><a href="${base}agile/">Agile</a></li>
            <li><a href="${base}waterfall/">Waterfall</a></li>
            <li><a href="${base}examples/">Examples</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">Tools</div>
          <ul class="footer-links">
            <li><a href="${base}checklist/">Checklist</a></li>
            <li><a href="${base}diagram/">Diagram</a></li>
            <li><a href="${base}templates/">Templates</a></li>
            <li><a href="${base}interview-questions/">Quiz &amp; Q&amp;A</a></li>
            <li><a href="${base}cheat-sheet/">Cheat sheet</a></li>
            <li><a href="${REPO_URL}">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>MIT License</span>
        <span><a href="${base}sitemap.xml">Sitemap</a> / <a href="${base}llms.txt">llms.txt</a></span>
      </div>
    </div>
  </footer>

  <script src="${base}assets/tools.js" defer></script>
</body>
</html>
`;
}

const PAGES = [
  {
    slug: "",
    title: "Software Development Life Cycle (SDLC): Complete Guide, Templates & Tools",
    description: "Free open-source Software Development Life Cycle (SDLC) guide, 7 phases, models comparison, downloadable templates, diagrams, and interactive browser tools.",
    schemaType: "WebSite",
    body: `    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <h1>Software development life cycle</h1>
          <p class="lead">Guides, Markdown templates, diagrams, and browser tools for software teams.</p>
          <div class="btn-row">
            <a class="btn btn--primary" href="./checklist/">Open checklist tool</a>
            <a class="btn" href="./phases/">Read the 7 phases</a>
          </div>
        </div>

        <div class="notebook-card" data-checklist-app="hero">
          <div class="notebook-head">
            <span class="notebook-title">SDLC checklist preview</span>
            <span class="notebook-stat" data-progress-pct>0%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" data-progress-bar></div>
          </div>
          <div class="notebook-body" data-checklist-body>
            <div class="phase-group">
              <div class="phase-heading"><span>1. Planning</span><span class="phase-count">0/3</span></div>
              <ul class="check-list">
                <li class="check-item"><label><input type="checkbox"><span>Define project scope and non-goals</span></label></li>
                <li class="check-item"><label><input type="checkbox"><span>Identify stakeholders and release owner</span></label></li>
                <li class="check-item"><label><input type="checkbox"><span>Estimate timeline, budget, and hosting cost</span></label></li>
              </ul>
            </div>
          </div>
          <div class="notebook-foot">
            <button type="button" class="btn btn--primary btn--sm" data-copy-md>Copy Markdown checklist</button>
            <a class="btn btn--sm" href="./checklist/">All 7 phases</a>
            <span class="status-note" data-checklist-status aria-live="polite"></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Interactive browser tools</h2>
            <p>Runs locally in plain JavaScript. No backend or signup.</p>
          </div>
        </div>
        <ul class="ruled-list">
          <li class="ruled-row">
            <a href="./checklist/">SDLC checklist generator</a>
            <span class="ruled-desc">Track seven phases and copy Markdown.</span>
            <span class="ruled-meta">checklist</span>
          </li>
          <li class="ruled-row">
            <a href="./models/">SDLC model selector</a>
            <span class="ruled-desc">Match five models to project constraints.</span>
            <span class="ruled-meta">selector</span>
          </li>
          <li class="ruled-row">
            <a href="./diagram/">SDLC diagram generator</a>
            <span class="ruled-desc">Export SVG, PNG, and Mermaid charts.</span>
            <span class="ruled-meta">svg / png</span>
          </li>
          <li class="ruled-row">
            <a href="./templates/">Template builder</a>
            <span class="ruled-desc">Generate PRD, SRS, design, and runbook docs.</span>
            <span class="ruled-meta">markdown</span>
          </li>
          <li class="ruled-row">
            <a href="./interview-questions/">SDLC quiz</a>
            <span class="ruled-desc">Eight scenario questions with explanations.</span>
            <span class="ruled-meta">quiz</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Compare SDLC models</h2>
            <p>Switch between the five standard delivery models to see where each fits.</p>
          </div>
          <a class="btn btn--sm" href="./models/">Open model selector</a>
        </div>

        <div data-model-tabs>
          <div class="tab-strip" role="tablist" aria-label="SDLC models">
            <button type="button" class="tab-btn" role="tab" aria-selected="true" aria-controls="panel-agile">Agile</button>
            <button type="button" class="tab-btn" role="tab" aria-selected="false" aria-controls="panel-waterfall">Waterfall</button>
            <button type="button" class="tab-btn" role="tab" aria-selected="false" aria-controls="panel-vmodel">V-Model</button>
            <button type="button" class="tab-btn" role="tab" aria-selected="false" aria-controls="panel-spiral">Spiral</button>
            <button type="button" class="tab-btn" role="tab" aria-selected="false" aria-controls="panel-iterative">Iterative</button>
          </div>

          <div id="panel-agile" role="tabpanel" class="grid-3">
            <div class="sheet-box">
              <h3>Best fit</h3>
              <p>SaaS products, mobile apps, and evolving requirements.</p>
            </div>
            <div class="sheet-box">
              <h3>Cadence</h3>
              <p>One to three week sprints with continuous CI testing.</p>
            </div>
            <div class="sheet-box">
              <h3>Guide</h3>
              <p><a href="./agile/">Read Agile SDLC guide</a></p>
            </div>
          </div>
          <div id="panel-waterfall" role="tabpanel" class="grid-3" hidden>
            <div class="sheet-box">
              <h3>Best fit</h3>
              <p>Fixed-scope contracts and regulated stage-gate work.</p>
            </div>
            <div class="sheet-box">
              <h3>Cadence</h3>
              <p>Sequential phases with formal sign-off before coding.</p>
            </div>
            <div class="sheet-box">
              <h3>Guide</h3>
              <p><a href="./waterfall/">Read Waterfall SDLC guide</a></p>
            </div>
          </div>
          <div id="panel-vmodel" role="tabpanel" class="grid-3" hidden>
            <div class="sheet-box">
              <h3>Best fit</h3>
              <p>Medical devices, aerospace, and audited banking.</p>
            </div>
            <div class="sheet-box">
              <h3>Cadence</h3>
              <p>Every specification pairs directly with a verification test.</p>
            </div>
            <div class="sheet-box">
              <h3>Guide</h3>
              <p><a href="./models/">Open SDLC model selector</a></p>
            </div>
          </div>
          <div id="panel-spiral" role="tabpanel" class="grid-3" hidden>
            <div class="sheet-box">
              <h3>Best fit</h3>
              <p>Large, novel R&amp;D systems with high technical risk.</p>
            </div>
            <div class="sheet-box">
              <h3>Cadence</h3>
              <p>Repeats objectives, risk prototypes, build, and review.</p>
            </div>
            <div class="sheet-box">
              <h3>Guide</h3>
              <p><a href="./models/">Open SDLC model selector</a></p>
            </div>
          </div>
          <div id="panel-iterative" role="tabpanel" class="grid-3" hidden>
            <div class="sheet-box">
              <h3>Best fit</h3>
              <p>Platform migrations with clear core architecture.</p>
            </div>
            <div class="sheet-box">
              <h3>Cadence</h3>
              <p>Thin end-to-end release expanded over planned milestones.</p>
            </div>
            <div class="sheet-box">
              <h3>Guide</h3>
              <p><a href="./models/">Open SDLC model selector</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Reference guides</h2>
            <p>Focused pages for engineers and technical leads.</p>
          </div>
        </div>
        <div class="grid-3">
          <div class="sheet-box">
            <h3><a href="./meaning/">SDLC meaning</a></h3>
            <p>Definition, roles, and lifecycle comparisons.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./phases/">SDLC phases</a></h3>
            <p>Seven stages, artifacts, and exit gates.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./examples/">SDLC examples</a></h3>
            <p>SaaS, REST API, and firmware walkthroughs.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./agile/">Agile vs SDLC</a></h3>
            <p>How sprints execute every lifecycle stage.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./waterfall/">Waterfall SDLC</a></h3>
            <p>Sequential gates, strengths, and limits.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./cheat-sheet/">SDLC cheat sheet</a></h3>
            <p>Printable one-page developer summary.</p>
          </div>
        </div>
      </div>
    </section>`
  },
  {
    slug: "meaning",
    title: "SDLC Meaning: What Is the Software Development Life Cycle?",
    description: "Clear definition of the Software Development Life Cycle (SDLC), how it works, who participates in each stage, and why teams use it.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC meaning</span></nav>
        <h1>SDLC meaning: what is the software development life cycle?</h1>
        <p class="lead">SDLC is the structured process engineering teams follow to plan, design, build, test, deploy, and maintain software systems.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>Plain definition</h2>
        <p>The Software Development Life Cycle (SDLC) breaks software delivery into ordered stages with clear inputs, outputs, and quality checks. Instead of writing code immediately after an idea appears, a team defines the problem, agrees on requirements, designs the system, implements and tests the code, ships to production, and maintains it over time.</p>
        <p>Every software team follows some form of SDLC, whether they write down formal specifications for a regulated bank or run two-week sprints at a ten-person startup. The difference between teams is how much time they spend in each stage and how often they loop back.</p>

        <h2>Why SDLC exists</h2>
        <p>Fixing a requirements mistake after launch typically costs 10x to 100x more than catching it during planning or design. A defined lifecycle gives product managers, developers, QA engineers, and operations staff shared checkpoints so defects, security flaws, and scope creep surface before users hit them.</p>

        <h2>Core roles in the lifecycle</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Role</th><th>Primary responsibility</th><th>Main artifacts</th></tr>
            </thead>
            <tbody>
              <tr><td>Product manager</td><td>Defines user problems, priorities, and acceptance criteria.</td><td>PRD, roadmap, backlog</td></tr>
              <tr><td>Software architect / tech lead</td><td>Designs service boundaries, data models, and security controls.</td><td>Architecture design doc, ADRs</td></tr>
              <tr><td>Software engineer</td><td>Writes application code, automated tests, and migrations.</td><td>Pull requests, unit tests, API specs</td></tr>
              <tr><td>QA engineer</td><td>Designs test plans, exploratory checks, and regression suites.</td><td>Test plan, bug reports, sign-off</td></tr>
              <tr><td>DevOps / SRE</td><td>Maintains CI/CD pipelines, deployments, and observability.</td><td>Runbooks, alerts, SLO dashboards</td></tr>
            </tbody>
          </table>
        </div>

        <h2>SDLC vs STLC vs PDLC</h2>
        <p>Three related acronyms often get mixed up in interviews and documentation. SDLC covers the entire engineering lifecycle of the software. STLC (Software Testing Life Cycle) zooms into the testing stage: test planning, test case creation, environment setup, execution, and defect closure. PDLC (Product Development Life Cycle) sits one level wider and includes market research, pricing, launch marketing, and sunsetting the product.</p>

        <h2>Next steps</h2>
        <p>Explore the <a href="../phases/">seven SDLC phases in detail</a>, compare <a href="../models/">Waterfall, Agile, Spiral, and V-Model</a>, or open the <a href="../checklist/">interactive SDLC checklist generator</a>.</p>
      </div>
    </section>`
  },
  {
    slug: "phases",
    title: "7 SDLC Phases Explained with Real Examples and Deliverables",
    description: "Complete breakdown of all 7 phases of the Software Development Life Cycle (Planning, Requirements, Design, Implementation, Testing, Deployment, Maintenance).",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC phases</span></nav>
        <h1>The 7 phases of the software development life cycle</h1>
        <p class="lead">Every phase takes a concrete input, produces a verifiable artifact, and reduces a specific class of delivery risk.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Phase</th><th>Goal</th><th>Typical artifacts</th><th>Exit gate</th></tr>
            </thead>
            <tbody>
              <tr><td>1. Planning</td><td>Confirm feasibility, scope, budget, and schedule.</td><td>Project charter, risk register</td><td>Stakeholder go/no-go approval</td></tr>
              <tr><td>2. Requirements</td><td>Turn goals into testable functional and non-functional specs.</td><td>PRD, SRS, user stories</td><td>Signed-off acceptance criteria</td></tr>
              <tr><td>3. System design</td><td>Define architecture, database schema, APIs, and security.</td><td>Architecture doc, ERD, OpenAPI spec</td><td>Design review sign-off</td></tr>
              <tr><td>4. Implementation</td><td>Write clean, reviewed code and automated unit tests.</td><td>Commits, pull requests, CI builds</td><td>Merged PRs with green CI</td></tr>
              <tr><td>5. Testing</td><td>Verify correctness, performance, and security before release.</td><td>Test plan, QA report, load test</td><td>Zero open Sev-1/Sev-2 bugs</td></tr>
              <tr><td>6. Deployment</td><td>Ship to production with minimal downtime and rollback safety.</td><td>Release notes, runbook, telemetry</td><td>Production health checks pass</td></tr>
              <tr><td>7. Maintenance</td><td>Monitor, patch, and evolve the live system.</td><td>Post-mortems, patches, backlog</td><td>Continuous SLO compliance</td></tr>
            </tbody>
          </table>
        </div>

        <h2>1. Planning</h2>
        <p>The team agrees on why the project exists, who pays for it, and what is out of scope. Example: before building a self-serve billing portal, the engineering manager estimates six weeks for two backend engineers and one frontend engineer, confirms Stripe fees, and explicitly defers multi-currency invoicing to phase two.</p>

        <h2>2. Requirements analysis</h2>
        <p>Product and engineering translate business goals into concrete specifications. Functional requirements describe what the system must do (for example, "users can download PDF invoices for the past 24 months"). Non-functional requirements define constraints such as p95 latency under 250ms, 99.9% uptime, and PCI compliance boundaries.</p>

        <h2>3. System design</h2>
        <p>Engineers choose data stores, service boundaries, authentication flows, and failure handling. Writing a short Architecture Design Document (ADD) before coding surfaces expensive mistakes such as missing database indexes, unversioned API payloads, or single points of failure. Grab a starter in our <a href="../templates/">Template Builder</a>.</p>

        <h2>4. Implementation</h2>
        <p>Developers write code against small, reviewable pull requests. Modern teams pair implementation with continuous integration: every push runs linters, type checks, static security scans, and unit tests automatically.</p>

        <h2>5. Testing</h2>
        <p>QA and developers verify the build across multiple layers: unit tests for logic, integration tests for database and API contracts, end-to-end tests for critical user flows, and load tests for peak traffic. In regulated industries, users also complete formal User Acceptance Testing (UAT) in staging.</p>

        <h2>6. Deployment</h2>
        <p>Code moves to production through automated pipelines. Teams reduce blast radius using blue-green deployments, canary rollouts (sending 5% of traffic to the new version first), and backward-compatible database migrations so rollbacks stay safe.</p>

        <h2>7. Maintenance</h2>
        <p>Most software spends 70% or more of its life in maintenance. Maintenance falls into four categories: corrective (fixing bugs), adaptive (updating for new OS or API versions), perfective (improving speed or usability), and preventive (refactoring and dependency upgrades).</p>

        <div class="btn-row">
          <a class="btn btn--primary" href="../checklist/">Track these 7 phases in the checklist tool</a>
          <a class="btn" href="../diagram/">Generate a phase diagram</a>
        </div>
      </div>
    </section>`
  },
  {
    slug: "models",
    title: "SDLC Models Compared: Waterfall, Agile, V-Model, Spiral, Iterative",
    description: "Compare the five main SDLC models and use the interactive SDLC Model Selector to pick the right methodology for your project.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC models</span></nav>
        <h1>SDLC models and methodology selector</h1>
        <p class="lead">Different projects face different uncertainty and compliance rules. Choose your project parameters below to see which SDLC model fits best.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="tool-panel" data-model-selector>
          <h2>Interactive SDLC model selector</h2>
          <p class="footer-note" style="margin-bottom: var(--space-lg);">Adjust the five project parameters. Scores update immediately in your browser.</p>
          <form>
            <div class="field-grid">
              <div class="field">
                <label for="ms-stability">Requirements stability</label>
                <select id="ms-stability" name="stability">
                  <option value="changing">Frequently changing (discovery ongoing)</option>
                  <option value="mixed">Core is fixed, details evolve</option>
                  <option value="fixed">Fixed and signed off up front</option>
                </select>
              </div>
              <div class="field">
                <label for="ms-cadence">Release cadence</label>
                <select id="ms-cadence" name="cadence">
                  <option value="continuous">Weekly or continuous releases</option>
                  <option value="milestone">Planned quarterly milestones</option>
                  <option value="single">Single major launch</option>
                </select>
              </div>
              <div class="field">
                <label for="ms-compliance">Compliance and audit rigor</label>
                <select id="ms-compliance" name="compliance">
                  <option value="low">Low (standard commercial app)</option>
                  <option value="medium">Medium (SOC 2 / GDPR)</option>
                  <option value="high">High (medical, aerospace, banking)</option>
                </select>
              </div>
              <div class="field">
                <label for="ms-risk">Technical risk and novelty</label>
                <select id="ms-risk" name="risk">
                  <option value="low">Low (proven stack and patterns)</option>
                  <option value="medium">Medium (some new integrations)</option>
                  <option value="high">High (unproven R&amp;D or scale)</option>
                </select>
              </div>
              <div class="field">
                <label for="ms-team">Team size</label>
                <select id="ms-team" name="team">
                  <option value="small">Small (2 to 8 engineers)</option>
                  <option value="medium">Medium (9 to 30 engineers)</option>
                  <option value="large">Large (30+ engineers, multiple vendors)</option>
                </select>
              </div>
            </div>
          </form>
          <div data-selector-result aria-live="polite"></div>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <h2>Side-by-side comparison of SDLC models</h2>
        <div class="table-wrap" style="margin-top: var(--space-lg);">
          <table class="data-table">
            <thead>
              <tr><th>Model</th><th>Best for</th><th>Change tolerance</th><th>Testing timing</th><th>Main risk</th></tr>
            </thead>
            <tbody>
              <tr><td><a href="../agile/">Agile (Scrum / Kanban)</a></td><td>SaaS, consumer apps, startups</td><td>High</td><td>Continuous inside every sprint</td><td>Scope drift without strong backlog grooming</td></tr>
              <tr><td><a href="../waterfall/">Waterfall</a></td><td>Fixed-bid contracts, stable specs</td><td>Low</td><td>After implementation finishes</td><td>Late discovery of requirement gaps</td></tr>
              <tr><td>V-Model</td><td>Medical, automotive, regulated finance</td><td>Low</td><td>Test design starts alongside specs</td><td>Heavy documentation overhead</td></tr>
              <tr><td>Spiral</td><td>Large, high-risk, novel R&amp;D systems</td><td>Medium to high</td><td>End of every risk cycle</td><td>Costly risk analysis expertise</td></tr>
              <tr><td>Iterative</td><td>Platform migrations, phased rollouts</td><td>Medium</td><td>After each incremental build</td><td>Early architecture may need rework</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>`
  },
  {
    slug: "examples",
    title: "SDLC Examples: 3 Real-World Software Projects Walked Through",
    description: "Concrete Software Development Life Cycle examples: a SaaS Stripe billing feature, a public REST API, and an offline-first mobile app.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC examples</span></nav>
        <h1>Real-world SDLC examples</h1>
        <p class="lead">How the seven SDLC phases look in practice across three everyday software engineering projects.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>Example 1: Adding subscription billing to a B2B SaaS app (Agile)</h2>
        <p>A six-person SaaS team wants to move from manual PDF invoices to automated card billing.</p>
        <ol>
          <li>Planning: Target a four-week launch for monthly and annual plans; defer enterprise wire transfers to Q3.</li>
          <li>Requirements: Users upgrade or downgrade plans self-serve; failed charges retry three times over seven days; webhook events must be idempotent.</li>
          <li>Design: Store subscription state in a local PostgreSQL table synced from Stripe webhooks; never store raw card numbers.</li>
          <li>Implementation: Build checkout session endpoints, webhook signature verification, and billing settings UI in two two-week sprints.</li>
          <li>Testing: Replay Stripe CLI test events for payment succeeded, failed, and chargeback scenarios in staging.</li>
          <li>Deployment: Enable the billing tab for 10% of workspaces via feature flag, verify webhook logs, then open to 100%.</li>
          <li>Maintenance: Alert on webhook 5xx errors and reconcile subscription counts nightly.</li>
        </ol>

        <h2>Example 2: Shipping a public rate-limited REST API (Iterative)</h2>
        <p>A logistics company exposes shipment tracking endpoints to external partners.</p>
        <ol>
          <li>Planning: Define a 99.95% uptime SLO and assign a dedicated API platform squad.</li>
          <li>Requirements: OAuth 2.0 client credentials, 120 requests per minute per key, OpenAPI 3.1 docs, and JSON error codes following RFC 9457.</li>
          <li>Design: Put an API gateway in front of a read-replica database with Redis token-bucket rate limiting.</li>
          <li>Implementation: Generate server stubs from the OpenAPI contract and write contract tests before wiring resolvers.</li>
          <li>Testing: Run k6 load tests at 3x expected peak traffic and verify 429 Retry-After headers.</li>
          <li>Deployment: Release v1 behind a versioned path (/v1/shipments) with canary traffic routing.</li>
          <li>Maintenance: Publish deprecation headers six months before retiring any field.</li>
        </ol>

        <h2>Example 3: Firmware update for a medical infusion pump (V-Model)</h2>
        <p>An embedded systems team updates dosage-calculation firmware under FDA Class II oversight.</p>
        <ol>
          <li>Planning: Freeze scope, assign safety officer, and schedule formal external audit dates.</li>
          <li>Requirements: Baseline every dosage boundary and alarm trigger in a traceable SRS document.</li>
          <li>Design: Map hardware interrupts, memory bounds, and fail-safe shutdown states.</li>
          <li>Implementation: Write MISRA-C compliant code with mandatory dual-engineer code reviews.</li>
          <li>Testing: Run unit, hardware-in-the-loop integration, system, and clinical acceptance tests linked 1-to-1 to the SRS.</li>
          <li>Deployment: Sign firmware binaries with hardware security modules and distribute via controlled hospital updates.</li>
          <li>Maintenance: Track field telemetry and maintain long-term audit archives.</li>
        </ol>

        <div class="btn-row">
          <a class="btn btn--primary" href="../checklist/">Build a checklist for your project</a>
          <a class="btn" href="../templates/">Generate project templates</a>
        </div>
      </div>
    </section>`
  },
  {
    slug: "templates",
    title: "SDLC Templates: Free Markdown Builder for PRD, SRS, Design & Test Plans",
    description: "Free interactive SDLC Template Builder. Fill your project details and copy or download Markdown templates for PRD, SRS, Architecture Doc, Test Plan, Runbook, and Post-Mortem.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC templates</span></nav>
        <h1>SDLC templates and Markdown builder</h1>
        <p class="lead">Customize standard engineering documents in your browser and download ready-to-commit Markdown files.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="tool-panel" data-template-builder>
          <div class="field-grid">
            <div class="field">
              <label for="tpl-type">Template type</label>
              <select id="tpl-type" data-tpl-type>
                <option value="prd">Product Requirements Document (PRD)</option>
                <option value="srs">Software Requirements Specification (SRS)</option>
                <option value="design">Architecture Design Document (ADD)</option>
                <option value="testplan">QA Test Plan</option>
                <option value="release">Deployment Runbook</option>
                <option value="postmortem">Incident Post-Mortem</option>
              </select>
            </div>
            <div class="field">
              <label for="tpl-name">Project name</label>
              <input id="tpl-name" type="text" data-tpl-name value="Payments API v2">
            </div>
            <div class="field">
              <label for="tpl-owner">Owner or team</label>
              <input id="tpl-owner" type="text" data-tpl-owner value="Core Platform Team">
            </div>
            <div class="field">
              <label for="tpl-date">Target date</label>
              <input id="tpl-date" type="date" data-tpl-date>
            </div>
            <div class="field">
              <label for="tpl-stack">Tech stack</label>
              <input id="tpl-stack" type="text" data-tpl-stack value="TypeScript, PostgreSQL, Redis, Docker">
            </div>
            <div class="field">
              <label for="tpl-scope">Summary or scope</label>
              <input id="tpl-scope" type="text" data-tpl-scope value="Process recurring subscriptions with idempotent webhook handling.">
            </div>
          </div>

          <pre class="code-block" data-tpl-output></pre>

          <div class="btn-row" style="margin-top: var(--space-md);">
            <button type="button" class="btn btn--primary" data-tpl-copy>Copy Markdown</button>
            <button type="button" class="btn" data-tpl-download>Download .md file</button>
            <span class="status-note" data-tpl-status aria-live="polite"></span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <h2>Raw Markdown templates on GitHub</h2>
        <ul class="ruled-list" style="margin-top: var(--space-lg);">
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/prd-template.md">prd-template.md</a><span class="ruled-desc">Product goals, non-goals, user stories, and release criteria.</span><span class="ruled-meta">Phase 1-2</span></li>
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/srs-template.md">srs-template.md</a><span class="ruled-desc">Functional and non-functional requirements with IDs.</span><span class="ruled-meta">Phase 2</span></li>
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/architecture-design-doc.md">architecture-design-doc.md</a><span class="ruled-desc">Context, components, data model, failure modes, and rollout plan.</span><span class="ruled-meta">Phase 3</span></li>
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/test-plan.md">test-plan.md</a><span class="ruled-desc">Test matrix, staging setup, automated suites, and exit gates.</span><span class="ruled-meta">Phase 5</span></li>
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/release-runbook.md">release-runbook.md</a><span class="ruled-desc">Pre-flight checks, deployment steps, and rollback commands.</span><span class="ruled-meta">Phase 6</span></li>
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/post-mortem.md">post-mortem.md</a><span class="ruled-desc">Blameless incident timeline, root cause, and follow-up tasks.</span><span class="ruled-meta">Phase 7</span></li>
        </ul>
      </div>
    </section>`
  },
  {
    slug: "diagram",
    title: "SDLC Diagram Generator: Download Free SVG, PNG & Mermaid Charts",
    description: "Interactive SDLC Diagram Generator. Customize phase labels for 7-Phase Cycle, Waterfall, Agile Sprint, V-Model, or Spiral and download SVG, PNG, or Mermaid code.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC diagram</span></nav>
        <h1>SDLC diagram generator</h1>
        <p class="lead">Pick an SDLC model, customize phase names, and export clean SVG, PNG, or Mermaid diagrams for technical docs and slide decks.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="tool-panel" data-diagram-app>
          <div class="field-grid">
            <div class="field">
              <label for="dg-model">Diagram model</label>
              <select id="dg-model" data-diagram-model>
                <option value="cycle">7-Phase SDLC Cycle</option>
                <option value="waterfall">Waterfall Cascade</option>
                <option value="agile">Agile Sprint Loop</option>
                <option value="vmodel">V-Model (Verification and Validation)</option>
                <option value="spiral">Spiral Risk Quadrants</option>
              </select>
            </div>
            <div class="field">
              <label for="dg-title">Diagram title</label>
              <input id="dg-title" type="text" data-diagram-title value="Software Development Life Cycle">
            </div>
          </div>

          <div class="field" style="margin-bottom: var(--space-md);">
            <label for="dg-phases">Phase labels (one per line, used in Cycle, Waterfall, and Agile views)</label>
            <textarea id="dg-phases" data-diagram-phases>Planning
Requirements
Design
Implementation
Testing
Deployment
Maintenance</textarea>
          </div>

          <div class="diagram-stage" data-diagram-stage></div>

          <div class="btn-row">
            <button type="button" class="btn btn--primary" data-dl-svg>Download SVG</button>
            <button type="button" class="btn" data-dl-png>Download PNG</button>
            <button type="button" class="btn" data-copy-mermaid>Copy Mermaid code</button>
            <span class="status-note" data-diagram-status aria-live="polite"></span>
          </div>

          <h3 style="margin-top: var(--space-lg); margin-bottom: var(--space-xs);">Mermaid source</h3>
          <pre class="code-block" data-mermaid-out></pre>
        </div>
      </div>
    </section>`
  },
  {
    slug: "checklist",
    title: "SDLC Checklist Generator: Interactive 7-Phase Project Checklist",
    description: "Free interactive SDLC Checklist Generator for SaaS web apps, REST APIs, mobile apps, and enterprise systems. Track progress and export Markdown.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC checklist</span></nav>
        <h1>Interactive SDLC checklist generator</h1>
        <p class="lead">Select a project profile, check off tasks across all seven phases, add custom items, and export directly to GitHub issues or pull request templates.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="notebook-card" data-checklist-app="full">
          <div class="notebook-head">
            <span class="notebook-title">Project progress</span>
            <span class="notebook-stat" data-progress-pct>0%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" data-progress-bar></div>
          </div>

          <div class="notebook-body">
            <div class="field-grid">
              <div class="field">
                <label for="cl-preset">Project preset</label>
                <select id="cl-preset" data-preset-select>
                  <option value="saas">SaaS Web Application</option>
                  <option value="api">Backend API / Microservice</option>
                  <option value="mobile">Mobile App (iOS / Android)</option>
                  <option value="enterprise">Regulated Enterprise System</option>
                </select>
              </div>
              <form class="field" data-add-item-form>
                <label for="cl-custom">Add custom task</label>
                <div style="display: flex; gap: var(--space-xs); flex-wrap: wrap;">
                  <input id="cl-custom" type="text" data-custom-text placeholder="Example: Run accessibility audit" style="flex: 1; min-width: 180px;">
                  <select data-custom-phase aria-label="Phase for custom task">
                    <option value="0">1. Planning</option>
                    <option value="1">2. Requirements</option>
                    <option value="2">3. Design</option>
                    <option value="3">4. Implementation</option>
                    <option value="4">5. Testing</option>
                    <option value="5">6. Deployment</option>
                    <option value="6">7. Maintenance</option>
                  </select>
                  <button type="submit" class="btn btn--sm">Add</button>
                </div>
              </form>
            </div>

            <div data-checklist-body></div>
          </div>

          <div class="notebook-foot">
            <div class="btn-row">
              <button type="button" class="btn btn--primary" data-copy-md>Copy Markdown checklist</button>
              <button type="button" class="btn" data-download-md>Download .md</button>
              <button type="button" class="btn" data-reset-checklist>Reset</button>
            </div>
            <span class="status-note" data-checklist-status aria-live="polite"></span>
          </div>
        </div>
      </div>
    </section>`
  },
  {
    slug: "agile",
    title: "Agile SDLC Explained: SDLC vs Agile Comparison for Developers",
    description: "Understand how Agile fits inside the Software Development Life Cycle, how sprints execute all seven SDLC phases, and how Agile compares to Waterfall.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>Agile SDLC</span></nav>
        <h1>Agile SDLC and SDLC vs Agile</h1>
        <p class="lead">Agile does not replace the Software Development Life Cycle. It runs the SDLC phases in short, repeating loops so teams ship working code early.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>How SDLC and Agile relate</h2>
        <p>A common interview misconception treats SDLC and Agile as competing options. SDLC is the overarching concept covering planning, requirements, design, coding, testing, deployment, and maintenance. Agile is one way to organize those phases.</p>
        <p>In a traditional sequential lifecycle, a team finishes all requirements and design before writing a single line of production code. In Agile SDLC, the team scopes a thin slice of work, designs it, builds it, tests it, and ships it inside a one- to three-week sprint, then repeats using feedback from real users.</p>

        <h2>SDLC vs Agile comparison table</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Dimension</th><th>Traditional sequential SDLC</th><th>Agile SDLC</th></tr>
            </thead>
            <tbody>
              <tr><td>Requirements</td><td>Frozen up front in a detailed SRS.</td><td>Maintained in a prioritized backlog that evolves.</td></tr>
              <tr><td>Design</td><td>Completed once before coding starts.</td><td>Emergent architecture refined each sprint.</td></tr>
              <tr><td>Testing</td><td>Dedicated QA phase after code freeze.</td><td>Automated tests written alongside every story.</td></tr>
              <tr><td>Releases</td><td>Infrequent large launches.</td><td>Small, frequent increments.</td></tr>
              <tr><td>Customer feedback</td><td>Collected at UAT or after launch.</td><td>Reviewed at every sprint demo.</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Scrum vs Kanban inside Agile SDLC</h2>
        <p>Scrum uses fixed-length sprints (commonly two weeks), sprint planning, daily standups, demos, and retrospectives. It fits product teams building new features on a predictable cadence.</p>
        <p>Kanban removes fixed sprints in favor of continuous flow with strict work-in-progress (WIP) limits. It fits platform teams, SRE groups, and support engineering where priorities shift daily.</p>

        <h2>When Agile struggles</h2>
        <p>Agile fails when teams skip design and automated testing under the excuse of moving fast. Without CI pipelines, code reviews, and clear acceptance criteria, short sprints accumulate technical debt quickly.</p>

        <p>Compare Agile against <a href="../waterfall/">Waterfall SDLC</a> or test your project constraints in the <a href="../models/">SDLC Model Selector</a>.</p>
      </div>
    </section>`
  },
  {
    slug: "waterfall",
    title: "Waterfall SDLC: Stages, Pros, Cons, and When to Use It",
    description: "Practical guide to the Waterfall Software Development Life Cycle model: sequential stages, strengths, failure modes, and when Waterfall outperforms Agile.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>Waterfall SDLC</span></nav>
        <h1>Waterfall SDLC</h1>
        <p class="lead">The sequential SDLC model where each stage completes and signs off before the next stage starts.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>How Waterfall works</h2>
        <p>In Waterfall, work flows downward through requirements, system design, implementation, testing, deployment, and maintenance. Each stage ends with a formal review gate and frozen documentation. Moving backward to change an earlier decision requires a formal change request.</p>

        <h2>Where Waterfall works well</h2>
        <ul>
          <li>Fixed-price vendor contracts where scope, deliverables, and payment milestones must be agreed before work begins.</li>
          <li>Hardware-coupled or embedded systems where physical manufacturing deadlines lock interfaces early.</li>
          <li>Small, well-understood internal migrations where requirements are already documented and stable.</li>
          <li>Audited regulatory environments that require signed stage-gate evidence before code enters production.</li>
        </ul>

        <h2>Where Waterfall breaks down</h2>
        <p>Because integration and testing happen near the end of the schedule, misunderstood requirements or architectural bottlenecks stay hidden for months. When schedules slip during implementation, testing is often compressed to keep the launch date, which raises production defect rates.</p>

        <h2>Modern hybrid: Water-Scrum-Fall</h2>
        <p>Many enterprises combine Waterfall budgeting and annual release governance with Agile engineering sprints inside the build phase. This keeps financial predictability while still letting developers test and integrate code continuously.</p>

        <p>Compare with <a href="../agile/">Agile SDLC</a> or generate a Waterfall diagram in the <a href="../diagram/">SDLC Diagram Generator</a>.</p>
      </div>
    </section>`
  },
  {
    slug: "interview-questions",
    title: "SDLC Interview Questions, Answers & Interactive Quiz",
    description: "Common Software Development Life Cycle (SDLC) interview questions with direct engineering answers, plus an interactive 8-question SDLC quiz.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>Interview questions</span></nav>
        <h1>SDLC interview questions and quiz</h1>
        <p class="lead">Practice with an 8-question scenario quiz, then review concise answers to the most frequent developer and QA interview questions.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="tool-panel" data-quiz-app>
          <div style="display: flex; justify-content: space-between; align-items: baseline; gap: var(--space-md); flex-wrap: wrap; margin-bottom: var(--space-md);">
            <h2>Interactive SDLC quiz</h2>
            <span class="ruled-meta" data-quiz-progress>Question 1 of 8</span>
          </div>
          <h3 data-quiz-question style="margin-bottom: var(--space-md);"></h3>
          <div data-quiz-options></div>
          <p class="status-note" data-quiz-feedback style="margin-top: var(--space-sm); color: var(--color-ink-2);" aria-live="polite"></p>
          <div class="btn-row" style="margin-top: var(--space-md);">
            <button type="button" class="btn btn--primary" data-quiz-next hidden>Next question</button>
            <button type="button" class="btn" data-quiz-restart hidden>Restart quiz</button>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container prose">
        <h2>Common SDLC interview questions</h2>

        <details class="qa-item" open>
          <summary>1. What are the seven phases of SDLC in order?</summary>
          <p>Planning, requirements analysis, system design, implementation, testing, deployment, and maintenance. Some teams merge planning and requirements into a six-phase list.</p>
        </details>

        <details class="qa-item">
          <summary>2. What is the difference between verification and validation?</summary>
          <p>Verification checks whether the software matches its specification ("did we build the product right?") using reviews, static analysis, and unit/integration tests. Validation checks whether the software solves the user problem ("did we build the right product?") through user acceptance testing and beta feedback.</p>
        </details>

        <details class="qa-item">
          <summary>3. When would you choose Waterfall over Agile?</summary>
          <p>Choose Waterfall when requirements are fixed and verified up front, external compliance demands signed stage gates, or the work is a fixed-scope vendor contract where mid-project scope changes are disallowed.</p>
        </details>

        <details class="qa-item">
          <summary>4. What is shift-left testing?</summary>
          <p>Shift-left testing moves quality checks earlier in the lifecycle: reviewing requirements for testability, writing automated unit and contract tests during development, and running security scanners on every pull request rather than waiting for a final QA stage.</p>
        </details>

        <details class="qa-item">
          <summary>5. What is a Requirements Traceability Matrix (RTM)?</summary>
          <p>An RTM is a table linking every requirement ID to its design component, test cases, and release verification result. It proves that no requirement was missed and no extra untested scope slipped in.</p>
        </details>

        <details class="qa-item">
          <summary>6. How do CI/CD pipelines fit into SDLC?</summary>
          <p>Continuous Integration automates the boundary between implementation and testing by building and testing every commit. Continuous Delivery and Deployment automate packaging, staging verification, and production rollout with fast rollbacks.</p>
        </details>

        <details class="qa-item">
          <summary>7. What are the four types of software maintenance?</summary>
          <p>Corrective (bug fixes), adaptive (environment, OS, or dependency updates), perfective (performance and UX improvements), and preventive (refactoring and technical debt reduction).</p>
        </details>

        <details class="qa-item">
          <summary>8. What is the main weakness of the V-Model?</summary>
          <p>Like Waterfall, the V-Model assumes requirements stay stable. If product needs change halfway through implementation, both specification documents and paired test plans have to be rewritten.</p>
        </details>
      </div>
    </section>`
  },
  {
    slug: "cheat-sheet",
    title: "SDLC Cheat Sheet: One-Page Quick Reference for Developers",
    description: "Printable one-page Software Development Life Cycle (SDLC) cheat sheet covering all 7 phases, models, testing levels, deployment strategies, and artifacts.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC cheat sheet</span></nav>
        <h1>SDLC developer cheat sheet</h1>
        <p class="lead">Concise one-page reference of phases, models, testing layers, and deployment strategies. Press Ctrl+P or Cmd+P to print cleanly.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid-2">
          <div class="sheet-box">
            <h3>7 phases at a glance</h3>
            <ol style="margin: 0; padding-left: var(--space-lg); color: var(--color-ink-2); font-size: var(--text-sm);">
              <li>Planning: scope, budget, timeline, risks.</li>
              <li>Requirements: PRD, SRS, acceptance criteria.</li>
              <li>Design: architecture, schema, API contracts.</li>
              <li>Implementation: code, PR reviews, CI checks.</li>
              <li>Testing: unit, integration, E2E, security, load.</li>
              <li>Deployment: canary, blue-green, migrations.</li>
              <li>Maintenance: monitoring, patches, post-mortems.</li>
            </ol>
          </div>

          <div class="sheet-box">
            <h3>Model selection shortcuts</h3>
            <ul style="margin: 0; padding-left: var(--space-lg); color: var(--color-ink-2); font-size: var(--text-sm);">
              <li>Requirements change weekly: Agile (Scrum / Kanban).</li>
              <li>Fixed scope and contract: Waterfall.</li>
              <li>Safety-critical or audited: V-Model.</li>
              <li>High technical R&amp;D risk: Spiral.</li>
              <li>Clear core, phased features: Iterative.</li>
            </ul>
          </div>

          <div class="sheet-box">
            <h3>Testing pyramid</h3>
            <ul style="margin: 0; padding-left: var(--space-lg); color: var(--color-ink-2); font-size: var(--text-sm);">
              <li>Unit tests: fast, isolated functions (largest share).</li>
              <li>Integration tests: DB queries, queues, API contracts.</li>
              <li>End-to-end tests: critical browser or mobile journeys.</li>
              <li>Non-functional: load, chaos, accessibility, SAST/DAST.</li>
            </ul>
          </div>

          <div class="sheet-box">
            <h3>Deployment strategies</h3>
            <ul style="margin: 0; padding-left: var(--space-lg); color: var(--color-ink-2); font-size: var(--text-sm);">
              <li>Rolling: replace instances in batches; low infra cost.</li>
              <li>Blue-green: run two environments; instant traffic switch.</li>
              <li>Canary: send 5% to 10% traffic to new version first.</li>
              <li>Feature flags: decouple code deploy from user launch.</li>
            </ul>
          </div>
        </div>

        <div class="btn-row" style="margin-top: var(--space-xl);">
          <button type="button" class="btn btn--primary" onclick="window.print()">Print cheat sheet</button>
          <a class="btn" href="../checklist/">Open checklist tool</a>
          <a class="btn" href="../templates/">Open template builder</a>
        </div>
      </div>
    </section>`
  }
];

function buildAll() {
  for (const page of PAGES) {
    const outDir = page.slug ? path.join(DOCS_DIR, page.slug) : DOCS_DIR;
    fs.mkdirSync(outDir, { recursive: true });
    const html = renderLayout(page);
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
  }

  const today = new Date().toISOString().slice(0, 10);
  const sitemapUrls = PAGES.map((p) => {
    const loc = p.slug ? `${SITE_URL}/${p.slug}/` : `${SITE_URL}/`;
    const priority = p.slug === "" ? "1.0" : "0.8";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  }).join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;
  fs.writeFileSync(path.join(DOCS_DIR, "sitemap.xml"), sitemap, "utf8");

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(DOCS_DIR, "robots.txt"), robots, "utf8");

  const llms = `# Software Development Life Cycle (SDLC): Complete Guide, Templates & Tools

> Free, open-source collection of SDLC guides, Markdown templates, SVG/PNG diagrams, checklists, examples, and browser tools maintained by Developer Assistants.

- Repository: ${REPO_URL}
- Live site: ${SITE_URL}/

## Guides
- [SDLC Guide](${SITE_URL}/): Overview, interactive checklist preview, and model comparison.
- [SDLC Meaning](${SITE_URL}/meaning/): Plain definition, roles, and SDLC vs STLC vs PDLC.
- [SDLC Phases](${SITE_URL}/phases/): All seven phases with artifacts, exit gates, and examples.
- [SDLC Models](${SITE_URL}/models/): Waterfall, Agile, V-Model, Spiral, Iterative, plus interactive Model Selector.
- [SDLC Examples](${SITE_URL}/examples/): Real-world SaaS, REST API, and regulated firmware walkthroughs.
- [Agile SDLC](${SITE_URL}/agile/): SDLC vs Agile comparison, Scrum vs Kanban.
- [Waterfall SDLC](${SITE_URL}/waterfall/): Sequential stage gates, strengths, and trade-offs.
- [SDLC Cheat Sheet](${SITE_URL}/cheat-sheet/): Printable one-page reference.

## Interactive Tools
- [SDLC Checklist Generator](${SITE_URL}/checklist/): Track 7-phase progress and export Markdown.
- [SDLC Diagram Generator](${SITE_URL}/diagram/): Generate and download SVG, PNG, and Mermaid diagrams.
- [SDLC Template Builder](${SITE_URL}/templates/): Customize and download PRD, SRS, Design Doc, Test Plan, Runbook, and Post-Mortem templates.
- [SDLC Interview Questions & Quiz](${SITE_URL}/interview-questions/): 8-question interactive quiz and Q&A bank.
`;
  fs.writeFileSync(path.join(DOCS_DIR, "llms.txt"), llms, "utf8");

  console.log(`Built ${PAGES.length} static pages, sitemap.xml, robots.txt, and llms.txt into docs/.`);
}

buildAll();
