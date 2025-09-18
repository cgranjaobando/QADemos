# Swag Labs Hero Experiment

Variant suite for practicing CRO workflows using static HTML. Control mirrors the current merchandising hero, while Variant A introduces a reservation waitlist concept and social proof uplift.

## Hypothesis

> If we let highly engaged shoppers reserve upcoming swag drops, then completed checkouts will increase by **+6.5%** because scarcity prompts pre-commitment and reminders reduce abandonment.

## Metrics

- **Primary (North Star):** Completed checkout rate (checkouts / sessions with hero exposure)
- **Guardrail:** Support contact rate and login errors must not increase by more than 5%
- **Secondary:** Email capture conversion, reservation-to-checkout completion

## Minimum Detectable Effect (MDE)

```
Baseline conversion = 0.085 (8.5%)
Target uplift       = 0.065 (6.5 percentage points)
Power               = 80%
Alpha               = 5%
MDE formula         = (Z_(1-α/2) * sqrt(2 * p * (1-p)) + Z_(power) * sqrt(p1 * (1-p1) + p2 * (1-p2)))^2 / (p1 - p2)^2
```

Plugging in the baseline (p1) and target (p2) yields an **estimated sample size of ~9,800 qualified sessions per variant**.

## Instrumentation Checklist

- Track `data-qa` attributes on hero CTAs, form submission, and waitlist success states
- Capture hero view event with impression timestamp, variant ID, user bucket
- Log reservation conversion funnel: `view → form_submit → confirmation → checkout`
- Verify analytics parity (dimensions, campaign metadata) across variants

## QA Readiness

- ✅ Accessibility sweep (axe + manual keyboard focus)
- ✅ Visual diff (Playwright `npm run visual:demo`)
- ✅ Responsive layout checks: 320px, 768px, 1280px
- ✅ Form validation flows (empty email, invalid email, success)

## Files

| Variant | Path | Notes |
|---------|------|-------|
| Control | `control.html` | Baseline hero with dual CTA |
| Variant A | `variant-a.html` | Adds reservation form, stats, updated colorway |
| Shared CSS | `assets/base.css` | Neutral styling + typography |
| Variant CSS | `assets/variant-a.css` | Waitlist module + stat formatting |

## Launch Checklist

1. Configure targeting (new vs returning, device, geo) inside your experimentation platform
2. Define ramp curve: 10% → 25% → 50% over 72 hours, contingent on guardrails
3. Automate daily health report: conversion deltas, guardrail metrics, anomaly alerts
4. Archive QA screenshots, console logs, network traces prior to launch

Reuse these assets as a safe playground for CRO runbooks without touching production domains.
