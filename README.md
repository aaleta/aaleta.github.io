# aaleta.github.io

Source of [aaleta.github.io](https://aaleta.github.io), a personal academic site
built with **Jekyll** and **jekyll-scholar**. GitHub Actions builds it and
deploys it to GitHub Pages.

## Local development

You need Ruby 3.2.3 (see `.ruby-version`; the `ruby-dev` headers are required
for a couple of native gems) and Bundler.

```bash
bundle install
bundle exec jekyll serve   # → http://localhost:4000
bundle exec jekyll build   # → _site/
```

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it with `actions/deploy-pages`. Under the repo settings,
**Pages → Source** must be set to **GitHub Actions**.

## Content sources

| What | Where |
|---|---|
| Publications | `_bibliography/papers.bib` (BibTeX, the single source of truth) |
| Technical reports | `_bibliography/reports.bib` |
| Research projects/grants | `_projects/*.md` (front matter only, rendered as cards on `/projects/`) |
| Project thumbnails | `assets/img/*.png` |
| Teaching (Computational Physics) | `_data/teaching.yml` (media in `assets/video/`, `assets/img/<year>/`) |
| Academic advising | `_pages/academic-advising.md` |
| Resources page | `_data/resources.yml` |
| About / home | `_pages/about.md` + `_layouts/home.liquid` |
| Navigation, social links | `_data/nav.yml`, `_data/socials.yml` |
| PhD thesis (static bookdown export) | `thesis/` (served as-is at `/thesis/`) |

Design tokens live in `_sass/_tokens.scss`. The accent colour is oxblood and is
hardcoded there, with a light value and a dark-mode value.

`bin/gen-network-bg.rb` regenerates the decorative network SVGs that sit behind
the page headers (`_includes/net/*.svg`). You only need to run it if you want
new backgrounds.
