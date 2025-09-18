# Delivery Playbook — Project Management Toolkit

The delivery playbook packages lightweight artifacts for leading cross-functional initiatives.

## Assets

- RACI matrix template: `demos/pm/delivery-playbook/raci.csv`
- Risk log template: `demos/pm/delivery-playbook/risk-log.csv`
- Cadence guide: `demos/pm/delivery-playbook/cadences.md`
- Overview notes: `demos/pm/delivery-playbook/README.md`

## Recommended Usage

1. Duplicate the CSV templates and fill them in for your project.
2. Track weekly/bi-weekly cadences, including agenda, inputs, and outputs, using the cadence blueprint.
3. Export sanitized snapshots into the docs site (e.g., Markdown tables) for stakeholder visibility.

## Automation Hooks

- Convert CSVs into Markdown tables via a simple Node or Python script for inclusion in MkDocs builds.
- Use GitHub Actions to validate that risk log severity values stay within the defined enumeration.

These assets keep scope, owners, and risk mitigation plans transparent while remaining low-friction to update.
