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
            <span class="ruled-desc">Generate PRD, SRS, ADR, and runbook docs.</span>
            <span class="ruled-meta">markdown</span>
          </li>
          <li class="ruled-row">
            <a href="./interview-questions/">SDLC quiz</a>
            <span class="ruled-desc">Fifteen scenario questions with explanations.</span>
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
            <p>Definition, roles, cost curves, and SSDLC.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./phases/">SDLC phases</a></h3>
            <p>Seven stages, deliverables, and DORA metrics.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./examples/">SDLC examples</a></h3>
            <p>SaaS, API, mobile, and firmware walkthroughs.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./agile/">Agile vs SDLC</a></h3>
            <p>Sprints, DoR/DoD, and Agile metrics.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./waterfall/">Waterfall SDLC</a></h3>
            <p>Stage gates, CCB, and hybrid models.</p>
          </div>
          <div class="sheet-box">
            <h3><a href="./cheat-sheet/">SDLC cheat sheet</a></h3>
            <p>Printable reference, DORA, and RACI matrix.</p>
          </div>
        </div>
      </div>
    </section>`
  },
  {
    slug: "meaning",
    title: "SDLC Meaning: What Is the Software Development Life Cycle?",
    description: "Complete definition of the Software Development Life Cycle (SDLC): history, defect cost curve, roles, Secure SDLC (SSDLC), and SDLC vs STLC vs PDLC.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC meaning</span></nav>
        <h1>SDLC meaning: what is the software development life cycle?</h1>
        <p class="lead">SDLC is the structured engineering process teams follow to plan, specify, design, build, test, deploy, and maintain software systems with predictable quality.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>Plain definition</h2>
        <p>The Software Development Life Cycle (SDLC) divides software creation into ordered stages with concrete inputs, verifiable deliverables, and clear ownership. Rather than jumping straight from a Slack message into production code, a team validates feasibility, writes testable requirements, reviews the architecture, implements code with automated tests, deploys safely, and monitors live behavior.</p>
        <p>Every software organization runs an SDLC, whether it is documented in a 200-page ISO 12207 manual for aviation software or executed as lightweight GitHub issues and two-week sprints at a five-person startup. The difference is formality and loop speed.</p>

        <h2>Short history of SDLC</h2>
        <p>Structured software lifecycles emerged in the late 1960s as mainframe systems grew too complex for ad-hoc coding. In 1970, Winston Royce published a paper describing sequential phases (often cited as the origin of Waterfall, even though Royce himself warned that pure top-down flow without feedback loops is risky). In 1986, Barry Boehm introduced the Spiral model to handle technical risk through iterative prototypes. In 2001, the Agile Manifesto shifted industry practice toward short iterations, automated tests, and direct user feedback. Over the last decade, DevOps and DevSecOps folded continuous integration, deployment automation, and security scanning directly into every phase.</p>

        <h2>Why SDLC matters: the cost of fixing defects</h2>
        <p>Empirical software engineering studies (including IBM Systems Sciences Institute and NIST reports) consistently show that defects become dramatically more expensive the later they are discovered. A missing requirement takes minutes to fix during planning, hours during design, days during QA, and weeks (plus incident response and customer churn) after production launch.</p>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Stage where defect is caught</th><th>Typical relative cost to fix</th><th>What happens</th></tr>
            </thead>
            <tbody>
              <tr><td>Requirements / Planning</td><td>1x</td><td>Edit a ticket or PRD paragraph before engineering starts.</td></tr>
              <tr><td>System design</td><td>3x to 5x</td><td>Update an API schema, ERD, or design doc before writing code.</td></tr>
              <tr><td>Implementation (unit tests / PR)</td><td>5x to 10x</td><td>Refactor a branch before merge; no staging or ops impact.</td></tr>
              <tr><td>Integration / QA testing</td><td>15x to 30x</td><td>Triage bug, reproduce in staging, patch, re-run regression suite.</td></tr>
              <tr><td>Production</td><td>50x to 100x+</td><td>On-call incident, rollback, data backfill, post-mortem, and SLA credits.</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Core roles in the lifecycle</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Role</th><th>Primary responsibility</th><th>Main artifacts</th></tr>
            </thead>
            <tbody>
              <tr><td>Product manager</td><td>Defines user problems, scope, priorities, and acceptance criteria.</td><td>PRD, roadmap, prioritized backlog</td></tr>
              <tr><td>Software architect / tech lead</td><td>Designs service boundaries, data models, scaling limits, and security controls.</td><td>Architecture design doc, ADRs, RFCs</td></tr>
              <tr><td>Software engineer</td><td>Writes application code, automated unit/integration tests, and migrations.</td><td>Pull requests, tests, OpenAPI specs</td></tr>
              <tr><td>QA / SDET engineer</td><td>Designs test plans, exploratory testing, and automated E2E suites.</td><td>Test plan, bug reports, release sign-off</td></tr>
              <tr><td>Security engineer (AppSec)</td><td>Runs threat modeling, SAST/DAST rules, dependency policies, and pen tests.</td><td>Threat model, security review, SBOM</td></tr>
              <tr><td>DevOps / SRE</td><td>Maintains CI/CD pipelines, infrastructure as code, rollouts, and alerts.</td><td>Runbooks, Terraform/IaC, SLO dashboards</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Secure SDLC (SSDLC / DevSecOps)</h2>
        <p>Traditional teams bolted security on as a manual penetration test right before launch, causing last-minute delays. A Secure SDLC (SSDLC) embeds security checks inside each phase: threat modeling during design, secret scanning and static analysis (SAST) on every pull request, Software Bill of Materials (SBOM) generation in CI, dynamic testing (DAST) in staging, and automated CVE patching in maintenance.</p>

        <h2>SDLC vs STLC vs PDLC</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Acronym</th><th>Full name</th><th>Scope</th><th>Primary owner</th></tr>
            </thead>
            <tbody>
              <tr><td>SDLC</td><td>Software Development Life Cycle</td><td>End-to-end engineering from planning to production maintenance.</td><td>Engineering, Product, QA, SRE</td></tr>
              <tr><td>STLC</td><td>Software Testing Life Cycle</td><td>Verification and validation: test planning, case design, environment setup, execution, closure.</td><td>QA / SDET</td></tr>
              <tr><td>PDLC</td><td>Product Development Life Cycle</td><td>Commercial lifecycle: market discovery, pricing, launch marketing, growth, sunsetting.</td><td>Product Management &amp; Business</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Next steps</h2>
        <div class="btn-row">
          <a class="btn btn--primary" href="../phases/">Explore all 7 SDLC phases</a>
          <a class="btn" href="../models/">Compare SDLC models</a>
          <a class="btn" href="../checklist/">Open checklist generator</a>
        </div>
      </div>
    </section>`
  },
  {
    slug: "phases",
    title: "7 SDLC Phases Explained with Deliverables, Pitfalls & DORA Metrics",
    description: "Deep engineering guide to all 7 phases of the Software Development Life Cycle: Planning, Requirements, Design, Implementation, Testing, Deployment, Maintenance, plus SSDLC and DORA metrics.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC phases</span></nav>
        <h1>The 7 phases of the software development life cycle</h1>
        <p class="lead">Every phase takes a concrete input, produces a verifiable artifact, runs a security check, and closes with an explicit exit gate.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Phase</th><th>Primary goal</th><th>Deliverables</th><th>Security gate (SSDLC)</th><th>Exit gate</th></tr>
            </thead>
            <tbody>
              <tr><td>1. Planning</td><td>Confirm feasibility, scope, budget, and timeline.</td><td>Project charter, risk register</td><td>Data classification &amp; compliance scope</td><td>Stakeholder go/no-go</td></tr>
              <tr><td>2. Requirements</td><td>Write testable functional and non-functional specs.</td><td>PRD, SRS, user stories</td><td>Abuse cases &amp; privacy requirements</td><td>Signed acceptance criteria</td></tr>
              <tr><td>3. System design</td><td>Define architecture, data model, APIs, and resilience.</td><td>ADD, ERD, ADRs, OpenAPI spec</td><td>Threat model (STRIDE) &amp; auth boundaries</td><td>Design review sign-off</td></tr>
              <tr><td>4. Implementation</td><td>Write reviewed code, migrations, and unit tests.</td><td>PRs, unit tests, CI artifacts</td><td>Secret scan, SAST, dependency audit</td><td>Merged PRs, green CI</td></tr>
              <tr><td>5. Testing</td><td>Verify correctness, latency, and security in staging.</td><td>Test plan, QA report, load test</td><td>DAST, authz matrix, pen test</td><td>Zero open Sev-1/Sev-2 bugs</td></tr>
              <tr><td>6. Deployment</td><td>Ship to production with safe rollback paths.</td><td>Release notes, runbook, metrics</td><td>Signed container image &amp; SBOM</td><td>Healthy canary &amp; SLOs</td></tr>
              <tr><td>7. Maintenance</td><td>Operate, patch, and evolve the live system.</td><td>Post-mortems, patches, backlog</td><td>CVE patching &amp; access reviews</td><td>Continuous SLO compliance</td></tr>
            </tbody>
          </table>
        </div>

        <h2>1. Planning</h2>
        <p>Planning answers whether a project should be built now, what it will cost, and what happens if dependencies slip. Engineers evaluate technical feasibility (TELOS: Technical, Economic, Legal, Operational, Schedule) rather than guessing dates in a vacuum.</p>
        <p>Concrete example: before building a self-serve billing portal, the engineering manager estimates six weeks for two backend engineers and one frontend engineer, confirms payment gateway transaction fees, verifies PCI SAQ-A scope so raw card numbers never touch company servers, and explicitly defers multi-currency invoicing to phase two.</p>
        <p>Common pitfall: skipping explicit non-goals. When non-goals are unwritten, every stakeholder assumes their edge case is included in v1.</p>

        <h2>2. Requirements analysis</h2>
        <p>Product and engineering convert business objectives into testable specifications. Functional requirements describe observable system behavior ("export filtered ledger rows to CSV within 5 seconds for up to 50,000 rows"). Non-functional requirements specify operational boundaries: availability (99.9% monthly uptime allows 43.8 minutes of downtime), p95 latency under 250ms, GDPR deletion within 30 days, and WCAG 2.1 AA accessibility.</p>
        <p>Common pitfall: writing vague adjectives like "fast", "scalable", or "user-friendly" without numbers that QA can test.</p>

        <h2>3. System design</h2>
        <p>Tech leads translate requirements into concrete components: database schemas, indexing strategies, caching tiers, message queues, authentication flows, and external API contracts. Teams document major trade-offs in short Architecture Decision Records (ADRs) committed inside the repository so future engineers understand why PostgreSQL was chosen over a document store or why a monolith beat microservices.</p>
        <p>Common pitfall: designing only the happy path and ignoring timeouts, duplicate webhooks, partial failures, and rate limits. Start from our <a href="../templates/">Architecture Design Doc and ADR templates</a>.</p>

        <h2>4. Implementation</h2>
        <p>Developers break design components into small, reviewable pull requests (ideally under 300 lines of diff). Every commit triggers automated Continuous Integration: formatting, linting, strict type checks, unit tests, secret scanning, and static security analysis. Keeping branches short-lived (trunk-based development) avoids painful merge conflicts.</p>
        <p>Common pitfall: letting pull requests sit unreviewed for days or batching unrelated refactors with feature changes.</p>

        <h2>5. Testing</h2>
        <p>Testing verifies that the software meets specifications (verification) and solves the user problem (validation). Teams layer tests using the testing pyramid: thousands of fast unit tests (milliseconds), targeted integration tests against real database containers (seconds), and a focused suite of end-to-end tests covering revenue-critical user paths. Before major launches, teams also run load tests at 2x expected peak traffic and verify role-based access control.</p>
        <p>Common pitfall: treating QA as a manual bottleneck at the end of a release instead of automating regression checks in CI.</p>

        <h2>6. Deployment</h2>
        <p>Deployment promotes an immutable, tested build artifact from staging to production. For zero-downtime releases, teams use expand-and-contract database migrations: first add new nullable columns and deploy code that writes to both old and new fields; backfill historical rows; switch reads; and drop the old column in a later release. Traffic shifts via canary rollouts (5% -> 25% -> 100%) or blue-green switches so rollbacks take seconds instead of hours.</p>
        <p>Common pitfall: running destructive schema drops inside the same deploy as application code, making rollback impossible.</p>

        <h2>7. Maintenance and operations</h2>
        <p>Most production software spends 70% to 80% of its total cost of ownership in maintenance. ISO/IEC 14764 groups maintenance into four types: corrective (fixing production bugs), adaptive (keeping up with OS, browser, or third-party API changes), perfective (improving latency, cost efficiency, or UX), and preventive (refactoring, dependency upgrades, and retiring dead code). When incidents occur, teams run blameless post-mortems that turn outage timelines into concrete engineering safeguards.</p>

        <h2>Measuring SDLC health with DORA metrics</h2>
        <p>Rather than measuring lines of code or raw story points, high-performing engineering teams track the four DORA (DevOps Research and Assessment) metrics to balance delivery speed against production stability:</p>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>DORA metric</th><th>What it measures</th><th>High-performing benchmark</th></tr>
            </thead>
            <tbody>
              <tr><td>Deployment frequency</td><td>How often code ships to production.</td><td>On demand (daily or multiple times per day)</td></tr>
              <tr><td>Lead time for changes</td><td>Time from commit to running in production.</td><td>Less than one day</td></tr>
              <tr><td>Change failure rate</td><td>Percentage of deployments causing incidents or rollbacks.</td><td>Under 5% to 15%</td></tr>
              <tr><td>Failed deployment recovery time (MTTR)</td><td>Time to restore service after a bad deploy.</td><td>Less than one hour</td></tr>
            </tbody>
          </table>
        </div>

        <div class="btn-row" style="margin-top: var(--space-lg);">
          <a class="btn btn--primary" href="../checklist/">Track all 7 phases in the checklist tool</a>
          <a class="btn" href="../diagram/">Generate a 7-phase diagram</a>
        </div>
      </div>
    </section>`
  },
  {
    slug: "models",
    title: "SDLC Models Compared: Waterfall, Agile, V-Model, Spiral, Iterative & DevOps",
    description: "Compare all major SDLC models (Waterfall, Agile, V-Model, Spiral, Iterative, RAD, DevOps) and use the interactive SDLC Model Selector to pick the right methodology.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC models</span></nav>
        <h1>SDLC models and methodology selector</h1>
        <p class="lead">Every SDLC model arranges the same seven phases differently to trade off predictability, speed of feedback, and audit rigor. Score your project constraints below.</p>
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
              <tr><th>Model</th><th>Best for</th><th>Change tolerance</th><th>Testing timing</th><th>Documentation</th><th>Main risk</th></tr>
            </thead>
            <tbody>
              <tr><td><a href="../agile/">Agile (Scrum / Kanban)</a></td><td>SaaS, consumer apps, startups</td><td>High</td><td>Continuous inside every sprint</td><td>Lightweight (backlog, ADRs)</td><td>Scope drift without backlog discipline</td></tr>
              <tr><td><a href="../waterfall/">Waterfall</a></td><td>Fixed-bid contracts, stable specs</td><td>Low</td><td>After implementation finishes</td><td>Heavy upfront sign-offs</td><td>Late discovery of requirement gaps</td></tr>
              <tr><td>V-Model</td><td>Medical, automotive, regulated finance</td><td>Low</td><td>Test specs written alongside design</td><td>Full RTM and audit trails</td><td>High cost if requirements shift</td></tr>
              <tr><td>Spiral</td><td>Large, high-risk, novel R&amp;D systems</td><td>Medium to high</td><td>End of every risk cycle</td><td>Risk logs and prototypes</td><td>Requires senior risk-analysis skill</td></tr>
              <tr><td>Iterative</td><td>Platform migrations, phased rollouts</td><td>Medium</td><td>After each incremental build</td><td>Milestone specs</td><td>Early architecture may need rework</td></tr>
              <tr><td>RAD (Rapid App Dev)</td><td>Internal tools, UI prototypes, tight deadlines</td><td>High</td><td>Prototype demos with users</td><td>Minimal</td><td>Weak scalability if prototype becomes prod</td></tr>
              <tr><td>DevOps / Continuous Delivery</td><td>Cloud services shipping daily</td><td>High</td><td>Automated CI/CD gates on every PR</td><td>Docs-as-code in Git</td><td>Requires strong test automation investment</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>Deep dive into each model</h2>

        <h3>1. Agile (Scrum and Kanban)</h3>
        <p>Agile delivers small vertical slices of working software every one to three weeks. Product owners reprioritize the backlog continuously based on real usage rather than guessing six months ahead. Strengths: fast feedback, early revenue, and lower risk of building the wrong product. Limits: needs active stakeholder availability and disciplined automated testing to keep regression costs flat. Read the full <a href="../agile/">Agile SDLC guide</a>.</p>

        <h3>2. Waterfall</h3>
        <p>Waterfall moves linearly from requirements through design, coding, testing, and release with signed gates between phases. Strengths: clear budgets, milestone dates, and contractual accountability when specifications are known and fixed. Limits: rigid against changing market needs and prone to late integration surprises. Read the full <a href="../waterfall/">Waterfall SDLC guide</a>.</p>

        <h3>3. V-Model (Verification and Validation)</h3>
        <p>The V-Model bends Waterfall into a V shape: every left-hand specification phase pairs directly with a right-hand testing phase (Requirements <-> Acceptance Testing, System Design <-> System Testing, Architecture <-> Integration Testing, Module Design <-> Unit Testing). QA writes test cases while architects write specs, catching ambiguity early. It is standard in IEC 62304 medical software and ISO 26262 automotive firmware.</p>

        <h3>4. Spiral model</h3>
        <p>Each loop of the Spiral passes through four quadrants: setting objectives, analyzing and prototyping the highest technical risk, engineering and verifying the increment, and planning the next loop. Aerospace, defense, and novel distributed databases use Spiral principles when proving a technical unknown (such as sub-millisecond replication) must happen before committing full budget.</p>

        <h3>5. Iterative and incremental</h3>
        <p>An iterative project ships a working core quickly (v0.1), then expands capability across scheduled milestones (v0.2, v0.3, v1.0). Unlike ad-hoc prototyping, each increment is production-grade and moves the system closer to the target architecture. Database migrations, legacy ERP replacements, and public API rollouts rely heavily on this model.</p>

        <h3>6. DevOps and Continuous Delivery</h3>
        <p>Modern cloud teams treat DevOps as an operating layer over Agile SDLC. Automated CI/CD pipelines, infrastructure as code (Terraform/OpenTofu), feature flags, and centralized observability collapse the handoff wall between developers and operations so verified commits reach production in minutes rather than quarters.</p>
      </div>
    </section>`
  },
  {
    slug: "examples",
    title: "SDLC Examples: 4 Real-World Software Projects Walked Through",
    description: "Four concrete Software Development Life Cycle examples: B2B SaaS Stripe billing, public REST API, FDA medical firmware, and an offline-first mobile app, plus CI gate YAML.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC examples</span></nav>
        <h1>Real-world SDLC examples</h1>
        <p class="lead">How the seven SDLC phases look in day-to-day engineering across four distinct product types, from startups to regulated hardware.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>Example 1: Adding subscription billing to a B2B SaaS app (Agile)</h2>
        <p>Team: 2 backend engineers, 1 frontend engineer, 1 product manager. Timeline: 4 weeks (two 2-week sprints).</p>
        <ol>
          <li>Planning: Target self-serve monthly and annual card plans; defer enterprise wire transfers and multi-currency invoicing to Q3.</li>
          <li>Requirements: Workspaces can upgrade or downgrade mid-cycle with proration; failed charges retry three times over seven days; Stripe webhooks must be idempotent.</li>
          <li>Design: Store subscription status in a local PostgreSQL table synced via webhooks; never store raw PAN card data so PCI compliance stays at SAQ-A; document schema in an ADR.</li>
          <li>Implementation: Build checkout session endpoints, HMAC webhook signature verification, and billing settings UI in small PRs with unit tests.</li>
          <li>Testing: Replay Stripe CLI test events for payment succeeded, failed, disputed, and out-of-order webhook delivery in staging.</li>
          <li>Deployment: Enable the billing tab for 10% of workspaces behind a feature flag, inspect webhook logs for 48 hours, then roll out to 100%.</li>
          <li>Maintenance: Alert on webhook 5xx rates above 0.5% and run a nightly reconciliation job against Stripe's API.</li>
        </ol>

        <h2>Example 2: Shipping a public rate-limited REST API (Iterative)</h2>
        <p>Team: 4 backend engineers, 1 SRE, 1 QA engineer. Timeline: 8 weeks across two milestones.</p>
        <ol>
          <li>Planning: Commit to a 99.95% monthly uptime SLO and assign on-call rotation before onboarding external partners.</li>
          <li>Requirements: OAuth 2.0 client credentials, 120 requests per minute per API key, OpenAPI 3.1 reference docs, and structured RFC 9457 error responses.</li>
          <li>Design: Place an API gateway in front of read-replica PostgreSQL nodes with Redis token-bucket rate limiting and cursor-based pagination.</li>
          <li>Implementation: Generate TypeScript/Go contract tests directly from the OpenAPI file so handler changes cannot break response schemas silently.</li>
          <li>Testing: Execute k6 load tests at 3x expected peak traffic (1,500 RPS), verify HTTP 429 Retry-After headers, and test Redis failover.</li>
          <li>Deployment: Release under /v1/shipments using canary traffic splits (5%, 25%, 100%) with automated rollback if p95 latency exceeds 300ms.</li>
          <li>Maintenance: Publish Sunset and Deprecation HTTP headers at least six months before retiring any field.</li>
        </ol>

        <h2>Example 3: Firmware update for a medical infusion pump (V-Model)</h2>
        <p>Team: 8 embedded C engineers, 4 verification engineers, 1 regulatory quality lead. Timeline: 6 months.</p>
        <ol>
          <li>Planning: Freeze scope, assign safety officer under IEC 62304, and lock external audit dates.</li>
          <li>Requirements: Baseline every dosage limit, occlusion sensor threshold, and audible alarm latency in a Requirements Traceability Matrix (RTM).</li>
          <li>Design: Map hardware interrupts, deterministic memory bounds (zero dynamic heap allocation), and fail-safe shutdown states.</li>
          <li>Implementation: Write MISRA-C compliant firmware with mandatory dual-engineer code reviews and static analysis.</li>
          <li>Testing: Execute unit tests, hardware-in-the-loop (HIL) integration tests, system soak tests (72 hours continuous), and clinical acceptance tests mapped 1-to-1 to the RTM.</li>
          <li>Deployment: Cryptographically sign firmware images using hardware security modules and distribute via controlled hospital service updates.</li>
          <li>Maintenance: Retain full build artifacts, compiler versions, and field telemetry for regulatory audit windows.</li>
        </ol>

        <h2>Example 4: Offline-first mobile field inspection app (Agile + Phased Rollout)</h2>
        <p>Team: 2 mobile engineers, 1 backend engineer, 1 QA engineer. Timeline: 6 weeks.</p>
        <ol>
          <li>Planning: Support iOS 16+ and Android 12+, account for 3-day App Store review buffers, and scope offline photo queues.</li>
          <li>Requirements: Technicians complete inspection forms with zero cellular signal; queued uploads resume automatically on reconnect without duplicate records.</li>
          <li>Design: Use local SQLite with client-generated UUIDv7 record IDs and an idempotent sync endpoint; store auth tokens in Keychain / Android Keystore.</li>
          <li>Implementation: Build screens with dynamic font sizing, background upload workers, and automated signed builds in CI.</li>
          <li>Testing: Test on physical low-end Android and iOS devices under airplane mode, 3G throttling, and mid-upload app kills; run TestFlight beta with 15 field technicians.</li>
          <li>Deployment: Ship via staged store rollout (10% -> 50% -> 100%) while watching Crashlytics crash-free session rates (target above 99.6%).</li>
          <li>Maintenance: Update SDK targets annually for Apple and Google store policy deadlines and retire legacy sync APIs safely.</li>
        </ol>

        <h2>Example CI quality gate (GitHub Actions)</h2>
        <p>Automating Phase 4 and Phase 5 checks in CI keeps code quality consistent across every pull request:</p>
        <pre class="code-block">name: SDLC Pull Request Gate
on: [pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test -- --coverage
      - run: npm audit --audit-level=high</pre>

        <div class="btn-row" style="margin-top: var(--space-lg);">
          <a class="btn btn--primary" href="../checklist/">Build a checklist for your project</a>
          <a class="btn" href="../templates/">Generate project templates</a>
        </div>
      </div>
    </section>`
  },
  {
    slug: "templates",
    title: "SDLC Templates: Free Markdown Builder for PRD, SRS, ADR & Runbooks",
    description: "Free interactive SDLC Template Builder. Fill project details and export Markdown templates for PRD, SRS, Architecture Design Doc, ADR, Test Plan, Runbook, Security Review, and Post-Mortem.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC templates</span></nav>
        <h1>SDLC templates and Markdown builder</h1>
        <p class="lead">Customize eight standard engineering documents in your browser and export ready-to-commit Markdown files.</p>
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
                <option value="adr">Architecture Decision Record (ADR)</option>
                <option value="security">SSDLC Security Review Checklist</option>
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
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/adr-template.md">adr-template.md</a><span class="ruled-desc">Short decision record capturing context, alternatives, and consequences.</span><span class="ruled-meta">Phase 3</span></li>
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/security-review-checklist.md">security-review-checklist.md</a><span class="ruled-desc">Auth, IDOR, validation, secrets, and abuse checks for SSDLC.</span><span class="ruled-meta">Phase 3-5</span></li>
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/test-plan.md">test-plan.md</a><span class="ruled-desc">Test matrix, staging setup, automated suites, and exit gates.</span><span class="ruled-meta">Phase 5</span></li>
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/release-runbook.md">release-runbook.md</a><span class="ruled-desc">Pre-flight checks, deployment steps, and rollback commands.</span><span class="ruled-meta">Phase 6</span></li>
          <li class="ruled-row"><a href="${REPO_URL}/blob/main/templates/post-mortem.md">post-mortem.md</a><span class="ruled-desc">Blameless incident timeline, root cause, and follow-up tasks.</span><span class="ruled-meta">Phase 7</span></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>Keeping SDLC documentation useful with Docs-as-Code</h2>
        <p>Long Word documents buried in shared drives go stale within weeks. Engineering teams keep documentation accurate by storing Markdown templates inside the repository (for example under <code>docs/adr/</code> and <code>docs/runbooks/</code>), reviewing changes in the same pull requests as code, and keeping each document short enough to read in under five minutes.</p>
      </div>
    </section>`
  },
  {
    slug: "diagram",
    title: "SDLC Diagram Generator: Download Free SVG, PNG & Mermaid Charts",
    description: "Interactive SDLC Diagram Generator. Customize phase labels for 7-Phase Cycle, Waterfall, Agile Sprint, V-Model, Spiral, or DevOps Loop and download SVG, PNG, or Mermaid code.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC diagram</span></nav>
        <h1>SDLC diagram generator</h1>
        <p class="lead">Pick an SDLC model, customize phase names, and export crisp SVG, high-resolution PNG, or Mermaid diagrams for technical docs and slide decks.</p>
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
                <option value="devops">DevOps Continuous Loop (CI/CD)</option>
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
    </section>

    <section class="section section--alt">
      <div class="container prose">
        <h2>Which SDLC diagram to include in your docs</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Diagram type</th><th>Best audience</th><th>Where to use it</th></tr>
            </thead>
            <tbody>
              <tr><td>7-Phase Cycle</td><td>New hires and stakeholders</td><td>Engineering handbook and onboarding READMEs</td></tr>
              <tr><td>Waterfall Cascade</td><td>Clients and procurement teams</td><td>Fixed-scope statements of work (SOW)</td></tr>
              <tr><td>Agile Sprint Loop</td><td>Product and engineering squads</td><td>Team working agreements and sprint kickoffs</td></tr>
              <tr><td>V-Model</td><td>Compliance auditors and QA leads</td><td>SOC 2, ISO 13485, or FDA verification dossiers</td></tr>
              <tr><td>Spiral Quadrants</td><td>Executive sponsors</td><td>High-risk R&amp;D proposals and architecture RFCs</td></tr>
              <tr><td>DevOps Continuous Loop</td><td>Platform and SRE teams</td><td>CI/CD pipeline docs and release standards</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>`
  },
  {
    slug: "checklist",
    title: "SDLC Checklist Generator: Interactive 7-Phase Project Checklist",
    description: "Free interactive SDLC Checklist Generator for SaaS web apps, REST APIs, mobile apps, enterprise systems, and Data/ML pipelines. Track progress and export Markdown.",
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
                  <option value="data">Data / ML Pipeline</option>
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
    </section>

    <section class="section section--alt">
      <div class="container prose">
        <h2>Using SDLC checklists in GitHub pull requests</h2>
        <p>Checklists work best when they sit where engineers already work. Save a short release checklist at <code>.github/pull_request_template.md</code> so every pull request reminds authors about tests, migrations, and rollback safety without blocking small fixes:</p>
        <pre class="code-block">## Summary
- What changed and why:

## Verification
- [ ] Unit and integration tests added or updated
- [ ] Database migrations are backward-compatible
- [ ] Auth, permissions, and input validation checked
- [ ] Feature flag or rollback steps noted for production</pre>
      </div>
    </section>`
  },
  {
    slug: "agile",
    title: "Agile SDLC Explained: SDLC vs Agile, Scrum, Kanban & DoD",
    description: "Complete guide to Agile SDLC: how Agile implements all seven SDLC phases inside sprints, Scrum vs Kanban, Definition of Ready vs Done, metrics, and common anti-patterns.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>Agile SDLC</span></nav>
        <h1>Agile SDLC and SDLC vs Agile</h1>
        <p class="lead">Agile does not replace the Software Development Life Cycle. It compresses planning, design, coding, testing, and release into repeating one- to three-week loops.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>How SDLC and Agile relate</h2>
        <p>A frequent interview misconception treats SDLC and Agile as opposites. SDLC is the universal set of activities required to build and operate software. Agile is an iterative methodology for scheduling those activities so teams validate assumptions with real users early instead of waiting until the end of a six-month build.</p>

        <h2>SDLC vs Agile comparison table</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Dimension</th><th>Traditional sequential SDLC</th><th>Agile SDLC</th></tr>
            </thead>
            <tbody>
              <tr><td>Requirements</td><td>Frozen up front in a detailed SRS.</td><td>Maintained in a prioritized backlog that evolves.</td></tr>
              <tr><td>Design</td><td>Completed once before coding starts.</td><td>Emergent architecture refined each sprint with ADRs.</td></tr>
              <tr><td>Testing</td><td>Dedicated QA phase after code freeze.</td><td>Automated tests written alongside every story.</td></tr>
              <tr><td>Releases</td><td>Infrequent large launches.</td><td>Small, frequent increments behind feature flags.</td></tr>
              <tr><td>Customer feedback</td><td>Collected at UAT or after launch.</td><td>Reviewed at every sprint demo and telemetry check.</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Scrum vs Kanban vs Extreme Programming (XP)</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Framework</th><th>Cadence</th><th>Core mechanism</th><th>Best fit</th></tr>
            </thead>
            <tbody>
              <tr><td>Scrum</td><td>Fixed 1 to 3 week sprints</td><td>Sprint backlog, demos, retrospectives</td><td>Product teams building planned roadmaps</td></tr>
              <tr><td>Kanban</td><td>Continuous flow</td><td>Strict Work-in-Progress (WIP) limits</td><td>Platform, SRE, and support engineering</td></tr>
              <tr><td>XP</td><td>Weekly cycles</td><td>TDD, pair programming, continuous integration</td><td>High-reliability codebases with fast change</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Definition of Ready (DoR) vs Definition of Done (DoD)</h2>
        <p>Two lightweight checklists keep Agile sprints from stalling. Definition of Ready verifies that a story is clear enough to start: user problem stated, acceptance criteria testable, dependencies identified, and mocks attached if UI changes. Definition of Done verifies that a story is ready to ship: code reviewed, unit and integration tests passing in CI, security checks clean, documentation updated, and verified in staging.</p>

        <h2>Useful Agile engineering metrics</h2>
        <ul>
          <li>Cycle time: elapsed time from starting a ticket to deploying it to production. Lower cycle time exposes bottlenecks faster than story-point velocity.</li>
          <li>Escaped defects: bugs found in production instead of during sprint testing.</li>
          <li>Work-in-progress (WIP): number of open tasks per engineer. High WIP signals context switching and stalled code reviews.</li>
          <li>Sprint predictability: ratio of completed commitments to planned sprint scope over a rolling 3-sprint window.</li>
        </ul>

        <h2>Common Agile anti-patterns</h2>
        <p>Teams lose the benefits of Agile when they run "mini-Waterfalls" inside sprints (coding for 8 days and dumping everything on QA on day 9), use story points to compare individual developers, or skip architecture design under the excuse of moving fast. Keeping stories small and automating tests inside CI solves most of these traps.</p>

        <div class="btn-row">
          <a class="btn btn--primary" href="../waterfall/">Compare with Waterfall SDLC</a>
          <a class="btn" href="../models/">Open SDLC model selector</a>
        </div>
      </div>
    </section>`
  },
  {
    slug: "waterfall",
    title: "Waterfall SDLC: Stage Gates, CCB, Pros, Cons & Hybrid Models",
    description: "Engineering guide to Waterfall SDLC: sequential stage-gate deliverables, Change Control Board (CCB), Earned Value tracking, failure modes, and Water-Scrum-Fall hybrids.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>Waterfall SDLC</span></nav>
        <h1>Waterfall SDLC</h1>
        <p class="lead">The sequential SDLC model where each stage completes, passes a formal gate review, and freezes its specification before the next stage starts.</p>
      </div>
    </section>

    <section class="section">
      <div class="container prose">
        <h2>Stage gates and deliverables</h2>
        <p>In Waterfall, progress moves downward across distinct phases. Each gate requires documented sign-off so scope, cost, and schedule stay locked:</p>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Stage</th><th>Primary deliverable</th><th>Sign-off authority</th></tr>
            </thead>
            <tbody>
              <tr><td>1. Feasibility &amp; Planning</td><td>Project charter, budget, master Gantt schedule</td><td>Executive sponsor</td></tr>
              <tr><td>2. Requirements</td><td>Baselined Software Requirements Specification (SRS)</td><td>Business owner &amp; compliance</td></tr>
              <tr><td>3. System Design</td><td>High-level (HLD) and low-level (LLD) design specs</td><td>Architecture Review Board</td></tr>
              <tr><td>4. Implementation</td><td>Compiled build, unit tests, code inspection logs</td><td>Engineering lead</td></tr>
              <tr><td>5. Verification &amp; UAT</td><td>Test execution report, defect closure log, UAT sign-off</td><td>QA lead &amp; client</td></tr>
              <tr><td>6. Release &amp; Maintenance</td><td>Production cutover, operations manual, support SLA</td><td>Operations / Change board</td></tr>
            </tbody>
          </table>
        </div>

        <h2>How scope changes work: the Change Control Board (CCB)</h2>
        <p>Once the SRS is baselined, developers do not accept informal scope additions. Any requested change goes through a Change Control Board (CCB) that evaluates schedule impact, budget delta, and test-plan updates before approving or deferring the request. This prevents silent scope creep on fixed-price contracts.</p>

        <h2>Where Waterfall works well</h2>
        <ul>
          <li>Fixed-price vendor contracts where scope, acceptance tests, and payment milestones must be legally defined before work starts.</li>
          <li>Hardware-coupled or embedded systems where physical manufacturing deadlines lock electrical and protocol interfaces months ahead.</li>
          <li>Well-understood regulatory reporting or data migrations where rules are published by an external authority and rarely change mid-year.</li>
          <li>Multi-vendor enterprise integrations requiring formal interface control documents (ICDs) between separate companies.</li>
        </ul>

        <h2>Where Waterfall breaks down</h2>
        <p>Integration and system testing happen near the end of the timeline, so hidden assumptions in the SRS or performance bottlenecks often surface months after coding began. When implementation slips, teams frequently compress testing to hold the launch date, shipping high defect counts into production.</p>

        <h2>Modern hybrid: Water-Scrum-Fall</h2>
        <p>Many large enterprises run Waterfall budgeting and compliance sign-offs at the portfolio level while engineering teams execute two-week Agile sprints with automated CI/CD inside the build phase. This preserves executive predictability while catching integration defects early.</p>

        <div class="btn-row">
          <a class="btn btn--primary" href="../agile/">Compare with Agile SDLC</a>
          <a class="btn" href="../diagram/">Generate a Waterfall diagram</a>
        </div>
      </div>
    </section>`
  },
  {
    slug: "interview-questions",
    title: "SDLC Interview Questions, Answers & 15-Question Interactive Quiz",
    description: "16 Software Development Life Cycle (SDLC) interview questions with direct engineering answers, plus a 15-question interactive scenario quiz.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>Interview questions</span></nav>
        <h1>SDLC interview questions and quiz</h1>
        <p class="lead">Test your knowledge with 15 engineering scenario questions, then review concise answers to 16 common developer, QA, and tech-lead interview questions.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="tool-panel" data-quiz-app>
          <div style="display: flex; justify-content: space-between; align-items: baseline; gap: var(--space-md); flex-wrap: wrap; margin-bottom: var(--space-md);">
            <h2>Interactive SDLC quiz</h2>
            <span class="ruled-meta" data-quiz-progress>Question 1 of 15</span>
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
        <h2>Core SDLC fundamentals</h2>

        <details class="qa-item" open>
          <summary>1. What are the seven phases of SDLC in order?</summary>
          <p>Planning, requirements analysis, system design, implementation, testing, deployment, and maintenance. Some organizations merge planning and requirements into a six-phase model.</p>
        </details>

        <details class="qa-item">
          <summary>2. What is the difference between verification and validation?</summary>
          <p>Verification checks whether the software matches its specification ("did we build the product right?") via reviews, static analysis, and unit/integration tests. Validation checks whether the software solves the user problem ("did we build the right product?") through UAT and customer feedback.</p>
        </details>

        <details class="qa-item">
          <summary>3. Why is fixing a bug in production so much more expensive than in design?</summary>
          <p>In design, a fix is a quick edit to a spec or diagram. In production, it triggers incident response, debugging live traffic, writing a backward-compatible patch, migrating corrupted data, running regression tests, and communicating with affected users.</p>
        </details>

        <details class="qa-item">
          <summary>4. What is the difference between functional and non-functional requirements?</summary>
          <p>Functional requirements define what the system does (features, workflows, calculations). Non-functional requirements define how well it operates (latency, throughput, uptime SLO, encryption, accessibility, and regulatory compliance).</p>
        </details>

        <h2>Models: Agile, Waterfall, V-Model, Spiral</h2>

        <details class="qa-item">
          <summary>5. When would you choose Waterfall over Agile?</summary>
          <p>Choose Waterfall when requirements are fixed and verified up front, external compliance requires signed stage gates, or the project is a fixed-scope vendor contract where mid-project scope changes are disallowed.</p>
        </details>

        <details class="qa-item">
          <summary>6. How do Scrum and Kanban differ inside Agile SDLC?</summary>
          <p>Scrum uses fixed-length sprints with planned commitments, demos, and retrospectives. Kanban uses continuous flow with explicit work-in-progress (WIP) limits and no mandatory sprint boundaries.</p>
        </details>

        <details class="qa-item">
          <summary>7. What is the main weakness of the V-Model?</summary>
          <p>Like Waterfall, the V-Model assumes requirements stay stable. If product needs change halfway through implementation, both specification documents and paired test plans have to be rewritten.</p>
        </details>

        <details class="qa-item">
          <summary>8. When does the Spiral model make sense?</summary>
          <p>Use Spiral for large, high-risk, or novel engineering efforts where retiring a technical unknown via early prototypes matters more than minimizing upfront risk-analysis overhead.</p>
        </details>

        <h2>Testing, CI/CD, and Security (DevSecOps)</h2>

        <details class="qa-item">
          <summary>9. What is shift-left testing?</summary>
          <p>Shift-left testing moves quality checks earlier in the lifecycle: reviewing requirements for testability, writing automated unit and contract tests during development, and running security scanners on every pull request rather than waiting for a final QA stage.</p>
        </details>

        <details class="qa-item">
          <summary>10. What is a Requirements Traceability Matrix (RTM)?</summary>
          <p>An RTM links every requirement ID to its design component, test cases, and release verification result. It proves that every requirement was tested and helps auditors verify compliance.</p>
        </details>

        <details class="qa-item">
          <summary>11. How do CI/CD pipelines fit into SDLC?</summary>
          <p>Continuous Integration automates building, linting, and testing every commit. Continuous Delivery and Deployment automate artifact packaging, staging verification, and canary or blue-green production rollouts.</p>
        </details>

        <details class="qa-item">
          <summary>12. What is the difference between SAST and DAST in Secure SDLC?</summary>
          <p>SAST (Static Application Security Testing) scans source code and dependencies during implementation without running the app. DAST (Dynamic Application Security Testing) probes a running staging instance from the outside to catch runtime auth, header, or injection flaws.</p>
        </details>

        <h2>Architecture, Deployment, and Maintenance</h2>

        <details class="qa-item">
          <summary>13. How do you run zero-downtime database migrations?</summary>
          <p>Use expand-and-contract migrations: add new nullable columns first, deploy code that writes to both old and new fields, backfill existing rows, switch reads to the new column, and drop the old column in a later deployment.</p>
        </details>

        <details class="qa-item">
          <summary>14. What is the difference between blue-green and canary deployments?</summary>
          <p>Blue-green runs two identical production environments and flips 100% of traffic from old (blue) to new (green) at once. Canary routes a small slice of live traffic (such as 5%) to the new version first and expands gradually only if error rates and latency stay healthy.</p>
        </details>

        <details class="qa-item">
          <summary>15. What are the four types of software maintenance?</summary>
          <p>Corrective (bug fixes), adaptive (environment, OS, or dependency updates), perfective (performance and UX improvements), and preventive (refactoring and technical debt reduction).</p>
        </details>

        <details class="qa-item">
          <summary>16. What makes a post-mortem effective after a production outage?</summary>
          <p>A useful post-mortem is blameless, documents an exact UTC timeline, identifies systemic root causes (missing alert, unsafe migration, untested failover), and assigns dated engineering action items tracked to completion.</p>
        </details>
      </div>
    </section>`
  },
  {
    slug: "cheat-sheet",
    title: "SDLC Cheat Sheet: One-Page Quick Reference, DORA & RACI Matrix",
    description: "Printable one-page Software Development Life Cycle (SDLC) cheat sheet covering all 7 phases, models, testing pyramid, deployment strategies, DORA benchmarks, SSDLC gates, and RACI.",
    body: `    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Home</a> / <span>SDLC cheat sheet</span></nav>
        <h1>SDLC developer cheat sheet</h1>
        <p class="lead">Concise printable reference of phases, models, testing layers, deployment strategies, DORA metrics, SSDLC gates, and RACI ownership. Press Ctrl+P or Cmd+P to print.</p>
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
              <li>Design: architecture, schema, API contracts, ADRs.</li>
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
              <li>Daily cloud shipping: DevOps / CI-CD.</li>
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

        <h2 style="margin-top: var(--space-2xl); margin-bottom: var(--space-md);">DORA delivery benchmarks</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Metric</th><th>Elite / High</th><th>Medium</th><th>Low</th></tr>
            </thead>
            <tbody>
              <tr><td>Deployment frequency</td><td>Daily or on demand</td><td>Weekly to monthly</td><td>Less than once per quarter</td></tr>
              <tr><td>Lead time for changes</td><td>Under 1 day</td><td>1 week to 1 month</td><td>1 to 6 months</td></tr>
              <tr><td>Change failure rate</td><td>0% to 15%</td><td>16% to 30%</td><td>Over 30%</td></tr>
              <tr><td>Recovery time (MTTR)</td><td>Under 1 hour</td><td>Under 1 day</td><td>1 week or more</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style="margin-top: var(--space-2xl); margin-bottom: var(--space-md);">RACI ownership matrix by phase</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr><th>Phase</th><th>PM</th><th>Tech Lead</th><th>Engineer</th><th>QA</th><th>SRE / DevOps</th></tr>
            </thead>
            <tbody>
              <tr><td>1. Planning</td><td>A / R</td><td>C</td><td>I</td><td>C</td><td>C</td></tr>
              <tr><td>2. Requirements</td><td>A / R</td><td>C</td><td>C</td><td>C</td><td>I</td></tr>
              <tr><td>3. System design</td><td>C</td><td>A / R</td><td>R</td><td>C</td><td>C</td></tr>
              <tr><td>4. Implementation</td><td>I</td><td>A</td><td>R</td><td>C</td><td>I</td></tr>
              <tr><td>5. Testing</td><td>C</td><td>C</td><td>R</td><td>A / R</td><td>C</td></tr>
              <tr><td>6. Deployment</td><td>I</td><td>A</td><td>R</td><td>C</td><td>R</td></tr>
              <tr><td>7. Maintenance</td><td>C</td><td>C</td><td>R</td><td>I</td><td>A / R</td></tr>
            </tbody>
          </table>
        </div>
        <p style="margin-top: var(--space-xs); font-size: var(--text-xs); color: var(--color-muted);">R = Responsible, A = Accountable, C = Consulted, I = Informed.</p>

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
- [SDLC Meaning](${SITE_URL}/meaning/): Definition, history, defect cost curve, roles, SSDLC, and SDLC vs STLC vs PDLC.
- [SDLC Phases](${SITE_URL}/phases/): All seven phases with deliverables, SSDLC gates, pitfalls, and DORA metrics.
- [SDLC Models](${SITE_URL}/models/): Waterfall, Agile, V-Model, Spiral, Iterative, RAD, DevOps, plus interactive Model Selector.
- [SDLC Examples](${SITE_URL}/examples/): Real-world SaaS, REST API, medical firmware, and offline mobile app walkthroughs.
- [Agile SDLC](${SITE_URL}/agile/): SDLC vs Agile, Scrum vs Kanban vs XP, DoR/DoD, metrics, and anti-patterns.
- [Waterfall SDLC](${SITE_URL}/waterfall/): Stage gates, CCB, strengths, failure modes, and Water-Scrum-Fall hybrid.
- [SDLC Cheat Sheet](${SITE_URL}/cheat-sheet/): Printable reference with DORA benchmarks and RACI matrix.

## Interactive Tools
- [SDLC Checklist Generator](${SITE_URL}/checklist/): Track 7-phase progress across 5 presets and export Markdown.
- [SDLC Diagram Generator](${SITE_URL}/diagram/): Generate and download SVG, PNG, and Mermaid diagrams across 6 models.
- [SDLC Template Builder](${SITE_URL}/templates/): Customize and download 8 engineering Markdown templates (PRD, SRS, ADD, ADR, Security, Test Plan, Runbook, Post-Mortem).
- [SDLC Interview Questions & Quiz](${SITE_URL}/interview-questions/): 15-question interactive quiz and 16-item Q&A bank.
`;
  fs.writeFileSync(path.join(DOCS_DIR, "llms.txt"), llms, "utf8");

  console.log(`Built ${PAGES.length} static pages, sitemap.xml, robots.txt, and llms.txt into docs/.`);
}

buildAll();
