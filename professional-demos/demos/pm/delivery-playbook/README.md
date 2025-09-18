# Delivery Playbook

Reusable governance kit for the Professional Demos portfolio. It keeps RACI ownership clear, surfaces risks early, and documents cadence expectations for stakeholders.

## Assets

| File | Purpose |
|------|---------|
| `raci.csv` | Stakeholder alignment for each workstream |
| `risk-log.csv` | Risk register with owners, mitigation plans, and status |
| `cadences.md` | Ritual blueprint for standups, steering, and demos |

## How to Use

1. Copy the CSV templates into your working folder at project kickoff.
2. Replace placeholder names with real stakeholders and update the accountability assignments.
3. Review risks weekly; escalate any "High" impact items in the steering cadence.
4. Publish cadence notes to the docs site or wiki so partners know when key decisions are made.

## Automation Hooks

- Validate CSV values (impact, likelihood) via a lightweight CI script.
- Convert the CSVs into Markdown tables for docs publishing as part of MkDocs build.
- Gate releases on an empty "High" severity backlog.

Focused rituals plus transparent ownership help the demos stay production-ready.
