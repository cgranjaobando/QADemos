# CRO Experimentation — Swag Labs Hero Variants

This demo imagines a conversion-focused iteration on the Swag Labs hero area so we can practice planning and communicating an A/B test without touching a live third-party property.

## Assets

- Control markup: `demos/cro/swaglabs-hero-variants/control.html`
- Variant A markup: `demos/cro/swaglabs-hero-variants/variant-a.html`
- Experiment README: `demos/cro/swaglabs-hero-variants/README.md`

The README documents hypothesis, North Star metric, guardrail, minimum detectable effect (MDE) math, and instrumentation needs.

## How to Use

1. Open both HTML files in a local browser to compare content hierarchy, messaging, and visual treatments.
2. Drop them into your CRO platform of choice (e.g., Optimizely, VWO, LaunchDarkly) as static templates.
3. Use the checklist inside the README to plan experiment QA: event parity, analytics validation, accessibility, and pixel diffing.

## Reporting Artifacts

- Screenshots: capture via Playwright visual tests or your preferred diff tool.
- Analytics validation sheet: template to be supplied in future commits.

Because everything runs locally, you can iterate quickly without impacting production systems.
