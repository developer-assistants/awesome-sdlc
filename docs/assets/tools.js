/* Awesome SDLC interactive browser tools. Zero backend, zero external APIs. */
(function () {
  "use strict";

  function copyText(text, statusEl, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (statusEl) statusEl.textContent = message || "Copied to clipboard.";
      }).catch(function () {
        fallbackCopy(text, statusEl, message);
      });
    } else {
      fallbackCopy(text, statusEl, message);
    }
  }

  function fallbackCopy(text, statusEl, message) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      if (statusEl) statusEl.textContent = message || "Copied to clipboard.";
    } catch (e) {
      if (statusEl) statusEl.textContent = "Copy failed. Select the text manually.";
    }
    document.body.removeChild(ta);
  }

  function downloadFile(filename, content, mime) {
    var blob = new Blob([content], { type: mime || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* 1. SDLC Checklist Generator (hero compact + full /checklist/ page) */
  var CHECKLIST_PRESETS = {
    saas: {
      name: "SaaS Web Application",
      phases: [
        { title: "1. Planning", items: ["Define project scope and non-goals", "Identify stakeholders and release owner", "Estimate timeline, budget, and hosting cost"] },
        { title: "2. Requirements analysis", items: ["Write user stories with acceptance criteria", "Document non-functional targets (uptime, latency, auth)", "Review privacy and data retention rules"] },
        { title: "3. System design", items: ["Draft architecture diagram and service boundaries", "Design relational schema and migration strategy", "Define REST or GraphQL API contracts"] },
        { title: "4. Implementation", items: ["Configure repository, linter, and CI pipeline", "Implement feature modules with unit tests", "Require peer code review on every pull request"] },
        { title: "5. Testing", items: ["Run automated integration and end-to-end tests", "Verify auth, role permissions, and input validation", "Run load and latency checks in staging"] },
        { title: "6. Deployment", items: ["Run database migrations with rollback plan", "Deploy to production with canary or blue-green switch", "Verify health checks, logs, and error alerts"] },
        { title: "7. Maintenance", items: ["Monitor error budgets and p95 latency", "Apply dependency and OS security patches", "Log post-release feedback into the backlog"] }
      ]
    },
    api: {
      name: "Backend API / Microservice",
      phases: [
        { title: "1. Planning", items: ["Define service ownership and SLA targets", "Identify upstream and downstream consumers", "Estimate traffic volume and storage growth"] },
        { title: "2. Requirements analysis", items: ["Specify OpenAPI or Protobuf contract", "Define rate limits, pagination, and idempotency", "Specify authentication and token scopes"] },
        { title: "3. System design", items: ["Choose data store, indexes, and caching layer", "Design retry, timeout, and dead-letter queues", "Document backward compatibility rules"] },
        { title: "4. Implementation", items: ["Scaffold service with structured logging and tracing", "Write unit tests and contract tests", "Validate schema migrations in ephemeral containers"] },
        { title: "5. Testing", items: ["Run contract tests against consumer mocks", "Execute stress tests at 2x expected peak RPS", "Test graceful shutdown and failover recovery"] },
        { title: "6. Deployment", items: ["Publish container image with immutable digest", "Roll out behind feature flag or traffic split", "Verify dashboards, alerts, and audit logs"] },
        { title: "7. Maintenance", items: ["Track error rates, saturation, and queue depth", "Rotate secrets and TLS certificates", "Deprecate old endpoints with sunset headers"] }
      ]
    },
    mobile: {
      name: "Mobile App (iOS / Android)",
      phases: [
        { title: "1. Planning", items: ["Define supported OS versions and device matrix", "Plan App Store and Play Store review timelines", "Confirm offline mode and push notification scope"] },
        { title: "2. Requirements analysis", items: ["Map onboarding, permissions, and deep links", "Define crash-free session target (for example 99.5%)", "Document analytics events and consent prompts"] },
        { title: "3. System design", items: ["Design local storage sync and conflict handling", "Define API versioning for older app binaries", "Plan secure keychain and keystore token storage"] },
        { title: "4. Implementation", items: ["Implement screens across compact and large viewports", "Add accessibility labels and dynamic font support", "Automate signed builds in CI"] },
        { title: "5. Testing", items: ["Test on physical iOS and Android devices", "Verify slow network, offline, and background resume", "Run TestFlight and internal Play track beta"] },
        { title: "6. Deployment", items: ["Prepare store screenshots and release notes", "Enable phased rollout (10%, 50%, 100%)", "Monitor crash reports and store reviews"] },
        { title: "7. Maintenance", items: ["Patch OS SDK deprecations each year", "Monitor cold start time and binary size", "Retire unsupported API versions safely"] }
      ]
    },
    enterprise: {
      name: "Regulated Enterprise System",
      phases: [
        { title: "1. Planning", items: ["Complete project charter and risk register", "Assign compliance officer and security lead", "Establish change control board (CCB) cadence"] },
        { title: "2. Requirements analysis", items: ["Baseline Software Requirements Specification (SRS)", "Build requirements traceability matrix (RTM)", "Complete threat model and data classification"] },
        { title: "3. System design", items: ["Hold Architecture Review Board (ARB) sign-off", "Document disaster recovery (RTO and RPO)", "Specify encryption at rest, in transit, and key rotation"] },
        { title: "4. Implementation", items: ["Enforce signed commits and two-reviewer approvals", "Run static analysis (SAST) and dependency scanning", "Maintain SBOM for every release candidate"] },
        { title: "5. Testing", items: ["Execute formal QA test plan linked to RTM", "Complete third-party penetration test", "Obtain User Acceptance Testing (UAT) sign-off"] },
        { title: "6. Deployment", items: ["Submit approved change ticket with maintenance window", "Execute rehearsed deployment and rollback runbook", "Archive deployment evidence for audit logs"] },
        { title: "7. Maintenance", items: ["Conduct quarterly disaster recovery drills", "Review access control lists and audit trails", "Run formal post-incident reviews for Sev-1/Sev-2 events"] }
      ]
    }
  };

  function initChecklist(root) {
    var mode = root.getAttribute("data-checklist-app");
    var storageKey = "awesome-sdlc-checklist-" + mode;
    var presetSelect = root.querySelector("[data-preset-select]");
    var container = root.querySelector("[data-checklist-body]");
    var pctEl = root.querySelector("[data-progress-pct]");
    var barEl = root.querySelector("[data-progress-bar]");
    var copyBtn = root.querySelector("[data-copy-md]");
    var dlBtn = root.querySelector("[data-download-md]");
    var resetBtn = root.querySelector("[data-reset-checklist]");
    var addForm = root.querySelector("[data-add-item-form]");
    var statusEl = root.querySelector("[data-checklist-status]");

    var state = { preset: "saas", checked: {}, custom: [] };
    try {
      var saved = localStorage.getItem(storageKey);
      if (saved) {
        var parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") state = parsed;
      }
    } catch (e) {}

    if (mode === "hero") {
      state.preset = "saas";
    }
    if (presetSelect && CHECKLIST_PRESETS[state.preset]) {
      presetSelect.value = state.preset;
    }

    function getPhases() {
      var base = CHECKLIST_PRESETS[state.preset] || CHECKLIST_PRESETS.saas;
      var phases = base.phases.map(function (p) {
        return { title: p.title, items: p.items.slice() };
      });
      if (mode === "hero") {
        return phases.slice(0, 3);
      }
      if (state.custom && state.custom.length) {
        state.custom.forEach(function (c) {
          var idx = Math.max(0, Math.min(phases.length - 1, c.phase || 0));
          phases[idx].items.push(c.text);
        });
      }
      return phases;
    }

    function saveState() {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (e) {}
    }

    function updateProgress() {
      var boxes = container.querySelectorAll('input[type="checkbox"]');
      var total = boxes.length;
      var done = 0;
      boxes.forEach(function (b) {
        if (b.checked) done++;
      });
      var pct = total ? Math.round((done / total) * 100) : 0;
      if (pctEl) pctEl.textContent = pct + "%";
      if (barEl) barEl.style.transform = "scaleX(" + (pct / 100) + ")";
    }

    function buildMarkdown() {
      var phases = getPhases();
      var title = (CHECKLIST_PRESETS[state.preset] || CHECKLIST_PRESETS.saas).name;
      var lines = ["# SDLC Checklist: " + title, ""];
      phases.forEach(function (phase, pIdx) {
        lines.push("## " + phase.title);
        phase.items.forEach(function (item, iIdx) {
          var key = state.preset + ":" + pIdx + ":" + iIdx;
          var mark = state.checked[key] ? "x" : " ";
          lines.push("- [" + mark + "] " + item);
        });
        lines.push("");
      });
      return lines.join("\n");
    }

    function render() {
      var phases = getPhases();
      container.innerHTML = "";
      phases.forEach(function (phase, pIdx) {
        var group = document.createElement("div");
        group.className = "phase-group";

        var head = document.createElement("div");
        head.className = "phase-heading";
        var hText = document.createElement("span");
        hText.textContent = phase.title;
        var countSpan = document.createElement("span");
        countSpan.className = "phase-count";
        head.appendChild(hText);
        head.appendChild(countSpan);
        group.appendChild(head);

        var ul = document.createElement("ul");
        ul.className = "check-list";
        var phaseDone = 0;

        phase.items.forEach(function (item, iIdx) {
          var key = state.preset + ":" + pIdx + ":" + iIdx;
          var checked = Boolean(state.checked[key]);
          if (checked) phaseDone++;

          var li = document.createElement("li");
          li.className = "check-item" + (checked ? " is-done" : "");

          var label = document.createElement("label");
          var input = document.createElement("input");
          input.type = "checkbox";
          input.checked = checked;
          input.addEventListener("change", function () {
            state.checked[key] = input.checked;
            li.classList.toggle("is-done", input.checked);
            saveState();
            renderCounts();
            updateProgress();
          });

          var span = document.createElement("span");
          span.textContent = item;
          label.appendChild(input);
          label.appendChild(span);
          li.appendChild(label);
          ul.appendChild(li);
        });

        countSpan.textContent = phaseDone + "/" + phase.items.length;
        group.appendChild(ul);
        container.appendChild(group);
      });
      updateProgress();
    }

    function renderCounts() {
      var groups = container.querySelectorAll(".phase-group");
      groups.forEach(function (g) {
        var boxes = g.querySelectorAll('input[type="checkbox"]');
        var done = 0;
        boxes.forEach(function (b) { if (b.checked) done++; });
        var c = g.querySelector(".phase-count");
        if (c) c.textContent = done + "/" + boxes.length;
      });
    }

    if (presetSelect) {
      presetSelect.addEventListener("change", function () {
        state.preset = presetSelect.value;
        saveState();
        render();
        if (statusEl) statusEl.textContent = "Loaded preset: " + CHECKLIST_PRESETS[state.preset].name;
      });
    }

    if (addForm) {
      addForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var textInput = addForm.querySelector("[data-custom-text]");
        var phaseInput = addForm.querySelector("[data-custom-phase]");
        var text = (textInput.value || "").trim();
        if (!text) return;
        state.custom = state.custom || [];
        state.custom.push({ phase: parseInt(phaseInput.value, 10) || 0, text: text });
        textInput.value = "";
        saveState();
        render();
        if (statusEl) statusEl.textContent = "Added task to checklist.";
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        copyText(buildMarkdown(), statusEl, "Markdown checklist copied.");
      });
    }

    if (dlBtn) {
      dlBtn.addEventListener("click", function () {
        downloadFile("sdlc-checklist-" + state.preset + ".md", buildMarkdown(), "text/markdown;charset=utf-8");
        if (statusEl) statusEl.textContent = "Downloaded sdlc-checklist-" + state.preset + ".md";
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        state.checked = {};
        state.custom = [];
        saveState();
        render();
        if (statusEl) statusEl.textContent = "Checklist reset.";
      });
    }

    render();
  }

  /* 2. SDLC Model Selector (/models/) */
  function initModelSelector(root) {
    var form = root.querySelector("form");
    var resultEl = root.querySelector("[data-selector-result]");
    if (!form || !resultEl) return;

    var models = {
      agile: {
        name: "Agile (Scrum or Kanban)",
        summary: "Best when requirements change frequently and users need working increments every one to three weeks.",
        tradeoff: "Requires active product owner availability and steady automated test coverage."
      },
      waterfall: {
        name: "Waterfall",
        summary: "Best when scope is fixed up front, deliverables are contractual, and changes after sign-off are rare.",
        tradeoff: "Late integration and testing can hide architectural bugs until near release."
      },
      vmodel: {
        name: "V-Model",
        summary: "Best for regulated, safety-critical, or compliance-audited software where every specification needs a paired verification test.",
        tradeoff: "Rigid documentation and high upfront test planning overhead."
      },
      spiral: {
        name: "Spiral",
        summary: "Best for large, high-risk, or novel engineering projects where each cycle prototypes and retires a major technical risk.",
        tradeoff: "Needs experienced risk assessment; expensive for small or routine apps."
      },
      iterative: {
        name: "Iterative and Incremental",
        summary: "Best when core requirements are known early, while secondary features evolve across planned milestones.",
        tradeoff: "Requires stable core architecture so later increments do not force full rewrites."
      }
    };

    function evaluate() {
      var stability = form.elements.stability.value;
      var cadence = form.elements.cadence.value;
      var compliance = form.elements.compliance.value;
      var risk = form.elements.risk.value;
      var team = form.elements.team.value;

      var scores = { agile: 0, waterfall: 0, vmodel: 0, spiral: 0, iterative: 0 };

      if (stability === "changing") { scores.agile += 4; scores.iterative += 2; scores.spiral += 2; }
      if (stability === "mixed") { scores.iterative += 4; scores.agile += 3; scores.spiral += 2; }
      if (stability === "fixed") { scores.waterfall += 4; scores.vmodel += 4; }

      if (cadence === "continuous") { scores.agile += 4; scores.iterative += 2; }
      if (cadence === "milestone") { scores.iterative += 4; scores.spiral += 2; scores.agile += 2; }
      if (cadence === "single") { scores.waterfall += 4; scores.vmodel += 3; }

      if (compliance === "high") { scores.vmodel += 5; scores.spiral += 3; scores.waterfall += 2; }
      if (compliance === "medium") { scores.iterative += 3; scores.vmodel += 2; scores.agile += 2; }
      if (compliance === "low") { scores.agile += 3; scores.iterative += 2; }

      if (risk === "high") { scores.spiral += 5; scores.vmodel += 2; }
      if (risk === "medium") { scores.iterative += 3; scores.agile += 2; }
      if (risk === "low") { scores.agile += 2; scores.waterfall += 2; }

      if (team === "small") { scores.agile += 3; scores.iterative += 2; }
      if (team === "medium") { scores.agile += 2; scores.iterative += 3; scores.vmodel += 1; }
      if (team === "large") { scores.vmodel += 3; scores.spiral += 3; scores.waterfall += 2; }

      var ranked = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
      var topKey = ranked[0];
      var secondKey = ranked[1];
      var top = models[topKey];
      var second = models[secondKey];

      resultEl.innerHTML =
        '<div class="sheet-box">' +
        '<h3>Recommended model: ' + top.name + '</h3>' +
        '<p>' + top.summary + '</p>' +
        '<p>Trade-off: ' + top.tradeoff + '</p>' +
        '<p>Runner-up: ' + second.name + ' (' + scores[secondKey] + ' pts vs ' + scores[topKey] + ' pts).</p>' +
        '</div>';
    }

    form.addEventListener("change", evaluate);
    evaluate();
  }

  /* 3. SDLC Diagram Generator (/diagram/) */
  function initDiagramApp(root) {
    var modelSelect = root.querySelector("[data-diagram-model]");
    var titleInput = root.querySelector("[data-diagram-title]");
    var phasesInput = root.querySelector("[data-diagram-phases]");
    var stage = root.querySelector("[data-diagram-stage]");
    var mermaidOut = root.querySelector("[data-mermaid-out]");
    var dlSvgBtn = root.querySelector("[data-dl-svg]");
    var dlPngBtn = root.querySelector("[data-dl-png]");
    var copyMermaidBtn = root.querySelector("[data-copy-mermaid]");
    var statusEl = root.querySelector("[data-diagram-status]");

    var DEFAULT_PHASES = "Planning\nRequirements\nDesign\nImplementation\nTesting\nDeployment\nMaintenance";
    if (phasesInput && !phasesInput.value.trim()) {
      phasesInput.value = DEFAULT_PHASES;
    }

    function escXml(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    function getPhases() {
      var raw = (phasesInput ? phasesInput.value : DEFAULT_PHASES).split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
      return raw.length ? raw.slice(0, 8) : DEFAULT_PHASES.split("\n");
    }

    function buildSvg(model, title, phases) {
      var w = 860;
      var h = model === "waterfall" ? 420 : model === "vmodel" ? 430 : 440;
      var bg = "#FAF6EE";
      var ink = "#23201D";
      var muted = "#6B655E";
      var accent = "#EA7B34";
      var green = "#3A8254";
      var card = "#FFFDF9";
      var rule = "#D8D0C3";

      var out = [];
      out.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img" aria-label="' + escXml(title) + '">');
      out.push('<rect width="' + w + '" height="' + h + '" fill="' + bg + '" rx="10" stroke="' + ink + '" stroke-width="1.5"/>');
      out.push('<text x="32" y="42" font-family="Red Hat Display, system-ui, sans-serif" font-size="22" font-weight="600" fill="' + ink + '">' + escXml(title) + '</text>');
      out.push('<line x1="32" y1="56" x2="' + (w - 32) + '" y2="56" stroke="' + rule + '" stroke-width="1"/>');

      if (model === "cycle" || model === "agile") {
        var cx = w / 2;
        var cy = 248;
        var r = 135;
        out.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + accent + '" stroke-width="2.5" stroke-dasharray="6 6"/>');
        out.push('<circle cx="' + cx + '" cy="' + cy + '" r="58" fill="' + card + '" stroke="' + ink + '" stroke-width="1.5"/>');
        out.push('<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-family="Red Hat Display, system-ui, sans-serif" font-size="16" font-weight="600" fill="' + ink + '">' + (model === "agile" ? "Sprint" : "SDLC") + '</text>');
        out.push('<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-family="Red Hat Text, system-ui, sans-serif" font-size="12" fill="' + muted + '">' + (model === "agile" ? "1-3 week loop" : phases.length + " phases") + '</text>');

        phases.forEach(function (label, i) {
          var angle = (-Math.PI / 2) + (i * 2 * Math.PI / phases.length);
          var nx = cx + Math.cos(angle) * r;
          var ny = cy + Math.sin(angle) * r;
          var bw = 132;
          var bh = 38;
          out.push('<rect x="' + (nx - bw / 2).toFixed(1) + '" y="' + (ny - bh / 2).toFixed(1) + '" width="' + bw + '" height="' + bh + '" rx="6" fill="' + card + '" stroke="' + ink + '" stroke-width="1.5"/>');
          out.push('<text x="' + nx.toFixed(1) + '" y="' + (ny + 4).toFixed(1) + '" text-anchor="middle" font-family="Red Hat Text, system-ui, sans-serif" font-size="13" font-weight="500" fill="' + ink + '">' + (i + 1) + '. ' + escXml(label.slice(0, 15)) + '</text>');
        });
      } else if (model === "waterfall") {
        var stepX = (w - 220) / Math.max(1, phases.length - 1);
        var stepY = (h - 150) / Math.max(1, phases.length - 1);
        phases.forEach(function (label, i) {
          var x = 40 + i * stepX;
          var y = 84 + i * stepY;
          if (i < phases.length - 1) {
            var nx = 40 + (i + 1) * stepX;
            var ny = 84 + (i + 1) * stepY;
            out.push('<path d="M ' + (x + 140) + ' ' + (y + 18) + ' L ' + (nx + 16) + ' ' + (y + 18) + ' L ' + (nx + 16) + ' ' + ny + '" fill="none" stroke="' + accent + '" stroke-width="2"/>');
          }
          out.push('<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="146" height="36" rx="6" fill="' + card + '" stroke="' + ink + '" stroke-width="1.5"/>');
          out.push('<text x="' + (x + 12).toFixed(1) + '" y="' + (y + 22).toFixed(1) + '" font-family="Red Hat Text, system-ui, sans-serif" font-size="13" font-weight="500" fill="' + ink + '">' + (i + 1) + '. ' + escXml(label.slice(0, 16)) + '</text>');
        });
      } else if (model === "vmodel") {
        var left = ["Requirements", "System design", "Architecture", "Module design"];
        var right = ["Acceptance test", "System test", "Integration test", "Unit test"];
        for (var k = 0; k < 4; k++) {
          var lx = 48 + k * 66;
          var rx = w - 208 - k * 66;
          var vy = 90 + k * 66;
          out.push('<line x1="' + (lx + 150) + '" y1="' + (vy + 18) + '" x2="' + rx + '" y2="' + (vy + 18) + '" stroke="' + rule + '" stroke-width="1.5" stroke-dasharray="4 4"/>');
          out.push('<rect x="' + lx + '" y="' + vy + '" width="150" height="36" rx="6" fill="' + card + '" stroke="' + ink + '" stroke-width="1.5"/>');
          out.push('<text x="' + (lx + 75) + '" y="' + (vy + 22) + '" text-anchor="middle" font-family="Red Hat Text, system-ui, sans-serif" font-size="13" fill="' + ink + '">' + left[k] + '</text>');
          out.push('<rect x="' + rx + '" y="' + vy + '" width="150" height="36" rx="6" fill="' + card + '" stroke="' + green + '" stroke-width="1.5"/>');
          out.push('<text x="' + (rx + 75) + '" y="' + (vy + 22) + '" text-anchor="middle" font-family="Red Hat Text, system-ui, sans-serif" font-size="13" fill="' + ink + '">' + right[k] + '</text>');
        }
        out.push('<rect x="' + (w / 2 - 75) + '" y="358" width="150" height="38" rx="6" fill="' + accent + '" stroke="' + ink + '" stroke-width="1.5"/>');
        out.push('<text x="' + (w / 2) + '" y="382" text-anchor="middle" font-family="Red Hat Text, system-ui, sans-serif" font-size="13" font-weight="600" fill="' + ink + '">Implementation</text>');
      } else {
        /* spiral */
        var scx = w / 2;
        var scy = 250;
        out.push('<line x1="60" y1="' + scy + '" x2="' + (w - 60) + '" y2="' + scy + '" stroke="' + rule + '" stroke-width="1"/>');
        out.push('<line x1="' + scx + '" y1="78" x2="' + scx + '" y2="412" stroke="' + rule + '" stroke-width="1"/>');
        [44, 86, 128, 166].forEach(function (rad, idx) {
          out.push('<circle cx="' + scx + '" cy="' + scy + '" r="' + rad + '" fill="none" stroke="' + (idx === 3 ? accent : ink) + '" stroke-width="' + (idx === 3 ? "2.5" : "1.2") + '"/>');
        });
        out.push('<text x="80" y="106" font-family="Red Hat Text, system-ui, sans-serif" font-size="14" font-weight="600" fill="' + ink + '">1. Objectives and constraints</text>');
        out.push('<text x="' + (w - 280) + '" y="106" font-family="Red Hat Text, system-ui, sans-serif" font-size="14" font-weight="600" fill="' + ink + '">2. Risk analysis and prototypes</text>');
        out.push('<text x="' + (w - 280) + '" y="396" font-family="Red Hat Text, system-ui, sans-serif" font-size="14" font-weight="600" fill="' + ink + '">3. Engineering and testing</text>');
        out.push('<text x="80" y="396" font-family="Red Hat Text, system-ui, sans-serif" font-size="14" font-weight="600" fill="' + ink + '">4. Review and next cycle</text>');
      }

      out.push('</svg>');
      return out.join("");
    }

    function buildMermaid(model, phases) {
      if (model === "vmodel") {
        return [
          "flowchart LR",
          "  R[Requirements] --> S[System Design] --> A[Architecture] --> M[Module Design] --> C[Implementation]",
          "  C --> UT[Unit Test] --> IT[Integration Test] --> ST[System Test] --> AT[Acceptance Test]"
        ].join("\n");
      }
      var lines = ["flowchart LR"];
      phases.forEach(function (p, i) {
        var id = "P" + (i + 1);
        var next = "P" + ((i + 1) % phases.length + 1);
        if (model === "waterfall" && i === phases.length - 1) {
          lines.push("  " + id + '["' + (i + 1) + ". " + p + '"]');
        } else {
          lines.push("  " + id + '["' + (i + 1) + ". " + p + '"] --> ' + next);
        }
      });
      return lines.join("\n");
    }

    function render() {
      var model = modelSelect ? modelSelect.value : "cycle";
      var title = (titleInput && titleInput.value.trim()) || "Software Development Life Cycle";
      var phases = getPhases();
      var svg = buildSvg(model, title, phases);
      stage.innerHTML = svg;
      if (mermaidOut) mermaidOut.textContent = buildMermaid(model, phases);
    }

    if (modelSelect) modelSelect.addEventListener("change", render);
    if (titleInput) titleInput.addEventListener("input", render);
    if (phasesInput) phasesInput.addEventListener("input", render);

    if (dlSvgBtn) {
      dlSvgBtn.addEventListener("click", function () {
        var svg = stage.innerHTML;
        downloadFile("sdlc-diagram-" + (modelSelect ? modelSelect.value : "cycle") + ".svg", svg, "image/svg+xml;charset=utf-8");
        if (statusEl) statusEl.textContent = "Downloaded SVG diagram.";
      });
    }

    if (dlPngBtn) {
      dlPngBtn.addEventListener("click", function () {
        var svgEl = stage.querySelector("svg");
        if (!svgEl) return;
        var svgData = new XMLSerializer().serializeToString(svgEl);
        var img = new Image();
        var blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        img.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = 1720;
          canvas.height = Math.round((svgEl.viewBox.baseVal.height / svgEl.viewBox.baseVal.width) * 1720);
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(url);
          canvas.toBlob(function (pngBlob) {
            var pUrl = URL.createObjectURL(pngBlob);
            var a = document.createElement("a");
            a.href = pUrl;
            a.download = "sdlc-diagram-" + (modelSelect ? modelSelect.value : "cycle") + ".png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function () { URL.revokeObjectURL(pUrl); }, 1000);
            if (statusEl) statusEl.textContent = "Downloaded PNG diagram (1720px wide).";
          });
        };
        img.src = url;
      });
    }

    if (copyMermaidBtn && mermaidOut) {
      copyMermaidBtn.addEventListener("click", function () {
        copyText(mermaidOut.textContent, statusEl, "Mermaid syntax copied.");
      });
    }

    render();
  }

  /* 4. Template Builder (/templates/) */
  function initTemplateBuilder(root) {
    var typeEl = root.querySelector("[data-tpl-type]");
    var nameEl = root.querySelector("[data-tpl-name]");
    var ownerEl = root.querySelector("[data-tpl-owner]");
    var dateEl = root.querySelector("[data-tpl-date]");
    var stackEl = root.querySelector("[data-tpl-stack]");
    var scopeEl = root.querySelector("[data-tpl-scope]");
    var outEl = root.querySelector("[data-tpl-output]");
    var copyBtn = root.querySelector("[data-tpl-copy]");
    var dlBtn = root.querySelector("[data-tpl-download]");
    var statusEl = root.querySelector("[data-tpl-status]");

    if (dateEl && !dateEl.value) {
      dateEl.value = new Date().toISOString().slice(0, 10);
    }

    function generate() {
      var type = typeEl.value;
      var name = nameEl.value.trim() || "Payments API v2";
      var owner = ownerEl.value.trim() || "Engineering Team";
      var date = dateEl.value || "2026-11-25";
      var stack = stackEl.value.trim() || "TypeScript, PostgreSQL, Docker";
      var scope = scopeEl.value.trim() || "Process recurring invoices with idempotent webhook handling.";

      var docs = {
        prd: [
          "# Product Requirements Document: " + name,
          "",
          "- Owner: " + owner,
          "- Date: " + date,
          "- Target stack: " + stack,
          "",
          "## 1. Problem statement",
          scope,
          "",
          "## 2. Goals and non-goals",
          "- Goal: Ship a reliable, testable first release with measurable adoption.",
          "- Non-goal: Out-of-scope legacy migrations remain in a separate milestone.",
          "",
          "## 3. User stories",
          "- As an operator, I want clear status visibility so I can resolve failed jobs quickly.",
          "- As an end user, I want predictable response times under 300ms p95.",
          "",
          "## 4. Release criteria",
          "- All acceptance tests pass in staging.",
          "- Monitoring alerts and rollback steps are verified."
        ].join("\n"),
        srs: [
          "# Software Requirements Specification: " + name,
          "",
          "- Author: " + owner,
          "- Revision date: " + date,
          "- Stack: " + stack,
          "",
          "## 1. Scope",
          scope,
          "",
          "## 2. Functional requirements",
          "- FR-01: System accepts authenticated requests and validates payload schema.",
          "- FR-02: System persists state transitions atomically.",
          "- FR-03: System emits structured audit logs for write operations.",
          "",
          "## 3. Non-functional requirements",
          "- Availability: 99.9% monthly uptime.",
          "- Latency: p95 under 250ms for read endpoints.",
          "- Security: TLS 1.3 in transit, AES-256 at rest, least-privilege IAM."
        ].join("\n"),
        design: [
          "# Architecture Design Document: " + name,
          "",
          "- Author: " + owner,
          "- Date: " + date,
          "- Stack: " + stack,
          "",
          "## 1. Context",
          scope,
          "",
          "## 2. Proposed architecture",
          "- Stateless HTTP service behind load balancer.",
          "- Primary relational store for transactional state.",
          "- Background worker queue for asynchronous retries.",
          "",
          "## 3. Failure modes and mitigations",
          "- Database failover: read replica promotion and connection pool retry.",
          "- Downstream timeout: bounded exponential backoff with circuit breaker.",
          "",
          "## 4. Rollout plan",
          "- Deploy behind feature flag to 10% of traffic, monitor error rate, then expand to 100%."
        ].join("\n"),
        testplan: [
          "# QA Test Plan: " + name,
          "",
          "- QA Lead: " + owner,
          "- Date: " + date,
          "- Stack: " + stack,
          "",
          "## 1. Test scope",
          scope,
          "",
          "## 2. Test layers",
          "- Unit tests: business rules and edge-case validation.",
          "- Integration tests: database transactions and API error contracts.",
          "- End-to-end tests: primary user workflows in staging.",
          "- Load test: 2x expected peak traffic for 15 minutes.",
          "",
          "## 3. Exit criteria",
          "- Zero open Sev-1 or Sev-2 defects.",
          "- Automated CI suite green on the release commit."
        ].join("\n"),
        release: [
          "# Deployment Runbook: " + name,
          "",
          "- Release manager: " + owner,
          "- Date: " + date,
          "- Stack: " + stack,
          "",
          "## 1. Release summary",
          scope,
          "",
          "## 2. Pre-deployment checks",
          "- [ ] CI tests and security scan passed on release tag.",
          "- [ ] Database backup verified and migration tested on staging snapshot.",
          "- [ ] On-call engineer notified.",
          "",
          "## 3. Deployment steps",
          "1. Run backward-compatible schema migrations.",
          "2. Deploy release artifact to canary instances.",
          "3. Check HTTP 5xx rate, p95 latency, and log errors for 15 minutes.",
          "4. Shift 100% of traffic to new release.",
          "",
          "## 4. Rollback procedure",
          "- Route traffic back to previous immutable artifact tag.",
          "- Keep additive schema changes in place to avoid data loss."
        ].join("\n"),
        postmortem: [
          "# Incident Post-Mortem: " + name,
          "",
          "- Incident commander: " + owner,
          "- Date: " + date,
          "- Affected stack: " + stack,
          "",
          "## 1. Summary",
          scope,
          "",
          "## 2. Timeline (UTC)",
          "- 10:00: Alert fired for elevated 5xx error rate.",
          "- 10:08: Root cause isolated to deployment or dependency regression.",
          "- 10:19: Rollback completed and error rate returned to baseline.",
          "",
          "## 3. Action items",
          "- [ ] Add automated regression test for the failing path.",
          "- [ ] Tighten canary alert threshold before full traffic shift."
        ].join("\n")
      };

      outEl.textContent = docs[type] || docs.prd;
    }

    [typeEl, nameEl, ownerEl, dateEl, stackEl, scopeEl].forEach(function (el) {
      if (el) el.addEventListener("input", generate);
      if (el) el.addEventListener("change", generate);
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        copyText(outEl.textContent, statusEl, "Template copied as Markdown.");
      });
    }

    if (dlBtn) {
      dlBtn.addEventListener("click", function () {
        var slug = (nameEl.value.trim() || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-");
        downloadFile(slug + "-" + typeEl.value + ".md", outEl.textContent, "text/markdown;charset=utf-8");
        if (statusEl) statusEl.textContent = "Downloaded Markdown template.";
      });
    }

    generate();
  }

  /* 5. SDLC Quiz (/interview-questions/) */
  function initQuiz(root) {
    var questions = [
      {
        q: "Which SDLC phase turns business goals into testable functional and non-functional specifications?",
        options: ["Planning", "Requirements analysis", "Deployment", "Maintenance"],
        answer: 1,
        note: "Requirements analysis produces user stories, acceptance criteria, or an SRS before architecture design begins."
      },
      {
        q: "In the V-Model, which test level directly verifies the System Design phase?",
        options: ["Unit testing", "Integration testing", "System testing", "Acceptance testing"],
        answer: 2,
        note: "System design pairs with system testing; requirements pair with acceptance testing; module design pairs with unit testing."
      },
      {
        q: "When is Waterfall a better choice than Agile?",
        options: [
          "Early-stage startup exploring product-market fit",
          "Fixed-scope regulatory contract with stable requirements",
          "Consumer web app shipping daily UI experiments",
          "Internal tool with changing stakeholder requests"
        ],
        answer: 1,
        note: "Waterfall works when requirements are stable, well understood up front, and sign-offs are required between stages."
      },
      {
        q: "What is the main focus of the Spiral SDLC model?",
        options: [
          "Eliminating all documentation",
          "Continuous risk assessment and prototyping in each loop",
          "Deploying directly from developer laptops",
          "Writing unit tests after production launch"
        ],
        answer: 1,
        note: "Each Spiral iteration explicitly identifies and mitigates the highest technical or schedule risk through prototypes."
      },
      {
        q: "What does shift-left testing mean in modern SDLC?",
        options: [
          "Moving QA engineers to the frontend team",
          "Running automated tests and static checks earlier in the lifecycle",
          "Skipping staging environments to deploy faster",
          "Testing only after code freeze"
        ],
        answer: 1,
        note: "Catching defects during requirements, design, and pull requests costs far less than fixing them after release."
      },
      {
        q: "What is the difference between verification and validation?",
        options: [
          "Verification checks whether we built the product right; validation checks whether we built the right product",
          "Verification is manual; validation is always automated",
          "Verification happens in production; validation happens in planning",
          "They are synonyms for unit testing"
        ],
        answer: 0,
        note: "Verification checks conformance to specs (reviews, unit/integration tests). Validation confirms the software solves the user problem (UAT)."
      },
      {
        q: "Which maintenance type updates software to keep working after an OS or database upgrade?",
        options: ["Corrective maintenance", "Adaptive maintenance", "Perfective maintenance", "Preventive maintenance"],
        answer: 1,
        note: "Adaptive maintenance adjusts software to changes in its external environment such as new OS versions, APIs, or regulations."
      },
      {
        q: "Which deployment strategy routes a small percentage of live users to the new version before full rollout?",
        options: ["Big-bang cutover", "Canary deployment", "Waterfall handoff", "Cold backup"],
        answer: 1,
        note: "Canary releases limit blast radius by exposing a small slice of traffic to the new build while watching error rates and latency."
      }
    ];

    var idx = 0;
    var score = 0;
    var answered = false;

    var progressEl = root.querySelector("[data-quiz-progress]");
    var questionEl = root.querySelector("[data-quiz-question]");
    var optionsEl = root.querySelector("[data-quiz-options]");
    var feedbackEl = root.querySelector("[data-quiz-feedback]");
    var nextBtn = root.querySelector("[data-quiz-next]");
    var restartBtn = root.querySelector("[data-quiz-restart]");

    function render() {
      answered = false;
      if (feedbackEl) feedbackEl.textContent = "";
      if (nextBtn) nextBtn.hidden = true;

      if (idx >= questions.length) {
        progressEl.textContent = "Final score: " + score + " / " + questions.length;
        questionEl.textContent = "Quiz complete.";
        optionsEl.innerHTML = "<p>You answered " + score + " of " + questions.length + " questions correctly.</p>";
        if (restartBtn) restartBtn.hidden = false;
        return;
      }

      if (restartBtn) restartBtn.hidden = true;
      var item = questions[idx];
      progressEl.textContent = "Question " + (idx + 1) + " of " + questions.length + " | Score: " + score;
      questionEl.textContent = item.q;
      optionsEl.innerHTML = "";

      item.options.forEach(function (opt, oIdx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.textContent = opt;
        btn.addEventListener("click", function () {
          if (answered) return;
          answered = true;
          var allBtns = optionsEl.querySelectorAll("button");
          allBtns.forEach(function (b, bIdx) {
            b.disabled = true;
            if (bIdx === item.answer) b.classList.add("is-correct");
          });
          if (oIdx === item.answer) {
            score++;
            feedbackEl.textContent = "Correct. " + item.note;
          } else {
            btn.classList.add("is-wrong");
            feedbackEl.textContent = "Incorrect. " + item.note;
          }
          if (nextBtn) nextBtn.hidden = false;
        });
        optionsEl.appendChild(btn);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        idx++;
        render();
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", function () {
        idx = 0;
        score = 0;
        render();
      });
    }

    render();
  }

  /* 6. Accessible tab switcher (homepage model comparison) */
  function initTabs(root) {
    var tabs = root.querySelectorAll('[role="tab"]');
    var panels = root.querySelectorAll('[role="tabpanel"]');
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("aria-controls");
        tabs.forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
        panels.forEach(function (p) { p.hidden = p.id !== target; });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-checklist-app]").forEach(initChecklist);
    document.querySelectorAll("[data-model-selector]").forEach(initModelSelector);
    document.querySelectorAll("[data-diagram-app]").forEach(initDiagramApp);
    document.querySelectorAll("[data-template-builder]").forEach(initTemplateBuilder);
    document.querySelectorAll("[data-quiz-app]").forEach(initQuiz);
    document.querySelectorAll("[data-model-tabs]").forEach(initTabs);
  });
})();
