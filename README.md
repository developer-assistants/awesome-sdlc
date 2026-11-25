# Software Development Life Cycle (SDLC): Complete Guide, Templates & Tools

Live site: https://developer-assistants.github.io/awesome-sdlc/

A free, open-source collection of SDLC guides, Markdown templates, vector diagrams, checklists, real-world examples, and interactive browser tools for software developers. Everything runs as static HTML, CSS, and JavaScript on GitHub Pages with no database, backend, or third-party APIs.

## Guides and reference pages

| Section | URL | Summary |
|---|---|---|
| SDLC Guide | [/](https://developer-assistants.github.io/awesome-sdlc/) | Overview, checklist preview, and model switcher |
| SDLC Meaning | [/meaning/](https://developer-assistants.github.io/awesome-sdlc/meaning/) | Definition, roles, and SDLC vs STLC vs PDLC |
| SDLC Phases | [/phases/](https://developer-assistants.github.io/awesome-sdlc/phases/) | All seven phases with deliverables and exit gates |
| SDLC Models | [/models/](https://developer-assistants.github.io/awesome-sdlc/models/) | Waterfall, Agile, V-Model, Spiral, and Iterative comparison |
| SDLC Examples | [/examples/](https://developer-assistants.github.io/awesome-sdlc/examples/) | Walkthroughs of a SaaS billing feature, REST API, and firmware release |
| SDLC Templates | [/templates/](https://developer-assistants.github.io/awesome-sdlc/templates/) | Interactive Markdown document generator and raw repo files |
| SDLC Diagrams | [/diagram/](https://developer-assistants.github.io/awesome-sdlc/diagram/) | Editable SVG, PNG, and Mermaid lifecycle diagrams |
| SDLC Checklists | [/checklist/](https://developer-assistants.github.io/awesome-sdlc/checklist/) | 7-phase project checklist with presets and Markdown export |
| Agile SDLC | [/agile/](https://developer-assistants.github.io/awesome-sdlc/agile/) | SDLC vs Agile comparison, Scrum vs Kanban |
| Waterfall SDLC | [/waterfall/](https://developer-assistants.github.io/awesome-sdlc/waterfall/) | Sequential stage gates, strengths, and limits |
| Interview Questions | [/interview-questions/](https://developer-assistants.github.io/awesome-sdlc/interview-questions/) | Q&A reference and 8-question interactive quiz |
| Cheat Sheet | [/cheat-sheet/](https://developer-assistants.github.io/awesome-sdlc/cheat-sheet/) | One-page printable developer summary |

## Interactive browser tools

All five tools execute locally in the browser with vanilla JavaScript:

1. [SDLC Checklist Generator](https://developer-assistants.github.io/awesome-sdlc/checklist/): Choose from SaaS, REST API, Mobile, or Enterprise presets, add custom items, track completion percentage, and copy or download Markdown.
2. [SDLC Model Selector](https://developer-assistants.github.io/awesome-sdlc/models/): Score five project parameters (requirements stability, release cadence, compliance, risk, and team size) to rank fitting delivery models.
3. [SDLC Diagram Generator](https://developer-assistants.github.io/awesome-sdlc/diagram/): Customize phase labels for Cycle, Waterfall, Agile, V-Model, or Spiral views and export SVG, PNG, or Mermaid syntax.
4. [Template Builder](https://developer-assistants.github.io/awesome-sdlc/templates/): Fill project metadata and download customized PRD, SRS, Architecture Design Doc, Test Plan, Deployment Runbook, or Incident Post-Mortem Markdown files.
5. [SDLC Quiz](https://developer-assistants.github.io/awesome-sdlc/interview-questions/): Eight scenario questions with immediate explanations and score tracking.

## Markdown templates in this repository

- [templates/prd-template.md](templates/prd-template.md)
- [templates/srs-template.md](templates/srs-template.md)
- [templates/architecture-design-doc.md](templates/architecture-design-doc.md)
- [templates/test-plan.md](templates/test-plan.md)
- [templates/release-runbook.md](templates/release-runbook.md)
- [templates/post-mortem.md](templates/post-mortem.md)
- [templates/sdlc-checklist.md](templates/sdlc-checklist.md)

## Rebuild locally

Node.js 18+ is only needed if you want to regenerate the static HTML files in `docs/` from `scripts/build.mjs`:

```bash
node scripts/build.mjs
```

Serve `docs/` with any static HTTP server:

```bash
python3 -m http.server 8080 --directory docs
```

## License

MIT
