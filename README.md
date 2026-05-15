# aaleta.github.io — source (Manuscript redesign)

Static personal site built with **Jekyll** + **jekyll-scholar**, deployed to GitHub
Pages via GitHub Actions. This is the rebuilt site that replaces the old al-folio
template (design: `design_handoff_aaleta_website/`, plan: `../IMPLEMENTATION_PLAN.md`).

## Local development

Requires Ruby (with the `ruby-dev` headers — `jekyll` pulls in a couple of native
gems) and Bundler.

```bash
bundle install
bundle exec jekyll serve   # → http://localhost:4000
bundle exec jekyll build   # → _site/
```

## Deployment

Push to `main`. `.github/workflows/deploy.yml` builds the site and publishes it via
`actions/deploy-pages`. In the repo settings, set **Pages → Build and deployment →
Source** to **GitHub Actions** (one-time).

## Content sources

| What | Where |
|---|---|
| Publications | `_bibliography/papers.bib` (BibTeX, single source of truth) |
| Technical reports | `_bibliography/reports.bib` |
| Research projects/grants | `_projects/*.md` |
| Teaching (Computational Physics) | `_data/teaching.yml` + `_pages/computational-physics.md` |
| Pages (About, Resources, …) | `_pages/*.md` |
| Social links | `_data/socials.yml` |

Design tokens live in `_sass/_tokens.scss`. Accent is **oxblood**, hardcoded; the
other curated accents are commented in that file.

## Status

Built incrementally per `../IMPLEMENTATION_PLAN.md` (§11 phases). Phase 1 = scaffold.
