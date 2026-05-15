# Handoff — moving the redesigned site into `aaleta.github.io`

This document walks through what you (Alberto) need to do to swap the rebuilt
site in `aaleta-site/` for the existing al-folio site in the
[`aaleta.github.io`](https://github.com/aaleta/aaleta.github.io) repository,
flip GitHub Pages to deploy via Actions, and verify everything is live.

The redesign is implemented per `../IMPLEMENTATION_PLAN.md`. All 11 build
phases (§11) are done; phase 12 is this handoff.

---

## 0. Quick orientation

Two top-level directories, both already on your disk:

- `aaleta.github.io/` — the current production site (al-folio template).
- `aaleta-site/` — the rebuilt site (this one). Same content sources
  (`_bibliography/papers.bib`, the `_projects/` collection, etc.), but new
  layouts/styles and a much smaller toolchain.

The redesign keeps the **same content** (papers, project grants, teaching
materials) and the **same deploy target** (`aaleta.github.io`). What changes
is the entire scaffold: layouts, includes, SCSS, JS, fonts, and the deploy
workflow.

---

## 1. Before you start

1. **Make sure local builds pass.** From inside `aaleta-site/`:
   ```bash
   bundle install
   JEKYLL_ENV=production bundle exec jekyll build
   bundle exec jekyll serve   # then open http://localhost:4000
   ```
   You should see the home page hero, the publications page, the
   redesigned teaching page, etc. Click around all five primary pages
   (About, Publications, Projects, Teaching, Resources) and the
   `/teaching/academic-advising/` page.

2. **Decide your branch strategy on `aaleta.github.io`.** The cleanest is:
   - Create a branch named `redesign` (or anything you like).
   - Do the swap there, push it, watch the workflow build it (you can
     run the workflow off any branch using `workflow_dispatch`).
   - When you're happy with the preview, merge `redesign` → `main`.

   The alternative — replacing files directly on `main` — works too and
   keeps history a bit cleaner, but you'll lose the staging step.

3. **Save anything al-folio you might want later.** The `assets/img/` tree,
   the `_bibliography/`, and the `_projects/` collection are all preserved
   (they were the source of truth and have been copied across), but if you
   have custom tweaks anywhere else in al-folio (a snippet in
   `_sass/_custom.scss`, a co-authors entry, etc.) and you want to keep
   them, copy them out *before* deleting the old files.

---

## 2. Migration steps

> The commands below assume `aaleta-site/` and `aaleta.github.io/` are
> sibling directories (which they currently are on your machine).

### 2.1. Switch to your working branch in `aaleta.github.io`

```bash
cd aaleta.github.io
git checkout -b redesign       # or any branch name
```

### 2.2. Remove al-folio specific files

The redesigned site doesn't use any al-folio chrome — Bootstrap, MDB,
jQuery, FontAwesome, Tabler, Academicons, Distill, the `_includes/scripts`
mountain, the news/posts collections, etc. Wipe the old scaffold:

```bash
# top-level files that come from al-folio
rm -f CUSTOMIZE.md FAQ.md INSTALL.md UPGRADE.md Dockerfile docker-compose.yml \
      Procfile package.json package-lock.json yarn.lock _config_dev.yml \
      lighthouserc.json fly.toml

# al-folio layout/include/sass that the redesign replaces wholesale
rm -rf _layouts _includes _sass _plugins assets bin

# collections we drop entirely (no blog, no news)
rm -rf _posts _news

# data files we don't use any more
rm -f _data/cv.yml _data/coauthors.yml _data/venues.yml _data/repositories.yml \
      _data/socials.yml      # we'll bring the new socials.yml across

# old pages we're replacing
rm -f _pages/about.md _pages/publications.md _pages/projects.md \
      _pages/computational-physics.md _pages/resources.md \
      _pages/academic-advising.md _pages/teaching.md _pages/blog.md \
      _pages/dropdown.md _pages/repositories.md 2>/dev/null || true

# the old config — we ship our own
rm -f _config.yml _config_dev.yml
```

Do not remove:
- `_bibliography/` — we *do* keep the .bib files (papers + reports). The
  redesign reads from them. If you delete them you'll lose the content.
  Actually, the safer move is: we'll overwrite them with the redesign's
  copies in the next step, but the originals match, so this is a no-op.
- `_projects/` — same idea: the redesign augments these front-matter
  fields, so it's fine to let the copy overwrite them.
- `.git/` (obviously).

### 2.3. Copy the redesigned files in

From the parent of both directories:

```bash
cd ..
# everything except git metadata and the local _site/.jekyll-cache
rsync -av --delete \
  --exclude='.git' \
  --exclude='_site' \
  --exclude='.jekyll-cache' \
  --exclude='.bundle' \
  --exclude='vendor' \
  aaleta-site/  aaleta.github.io/
```

The `--delete` flag makes the target match the source exactly. Combined
with the explicit removals in §2.2, you end up with only the files the
redesign expects.

### 2.4. Sanity-check the swap

```bash
cd aaleta.github.io
git status              # look at the diff — should be a big swap of files
bundle install
bundle exec jekyll build   # should be clean, ~0.7s
```

Open `_site/index.html` in a browser, or run `bundle exec jekyll serve`
and click through the 5 primary pages + Academic Advising. If anything is
amiss, fix it before pushing.

### 2.5. Commit and push

```bash
git add -A
git commit -m "Redesign site: replace al-folio with the Manuscript build"
git push -u origin redesign
```

---

## 3. Switch Pages to GitHub Actions

This is the one-time GitHub UI change that makes the new workflow take
over from al-folio's branch-based publish.

1. Go to **github.com/aaleta/aaleta.github.io → Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Save.

The repo will continue to deploy from whichever branch the workflow
runs on. The workflow file lives at `.github/workflows/deploy.yml`. It
fires on push to `main` or `master`, and you can also trigger it
manually (Actions → Build & deploy to GitHub Pages → Run workflow).

---

## 4. First deploy

If you pushed to `redesign` and want to preview it before merging:

1. **Actions → Build & deploy to GitHub Pages → Run workflow** on
   the `redesign` branch.
2. Watch both jobs (`build` then `deploy`) succeed.
3. Open `https://aaleta.github.io/` — it should now be the redesign.
4. Click through every page. Confirm:
   - Dark/light toggle works (floating button bottom-right).
   - Mobile hamburger works (`<` 720px viewport).
   - Sticky publications year headers stick correctly.
   - All paper DOI links, project external links, teaching repo links,
     and the thesis link resolve.
   - The `/thesis/` bookdown still loads (it's verbatim).
5. Merge `redesign` → `main` when satisfied.

---

## 5. Content follow-ups (please review)

These items were either guessed during the build or marked open in the
plan §10 — they deserve a pass from you:

### Per-project grant metadata (`_projects/*.md`)

I best-guessed `years`, `role`, `funder` for each grant. Verify and edit:

| File | code | years | role | funder |
|---|---|---|---|---|
| accelnet.md | ACCELNET | 2021–2026 | Fellow | NSF |
| ferrero.md | ALGO-NUTS | 2019–2022 | Technical lead | Ferrero |
| hidden.md | HIDDEN-NETS | 2024–2027 | Co-IP | MICIU/AEI |
| immune.md | IMMUNE | 2021–2025 | Collaborator | EU H2020 |
| katy.md | KATY | 2020–2024 | Member | EU H2020 |
| shine.md | COVID-SHINE | 2020–2023 | External member | La Caixa Foundation |
| streaming.md | STREAMING-AI | 2024–present | Collaborator | Rollout Entertainment |

HIDDEN-NETS has `more_url: ""` (no public landing page yet) — the card
just omits the "more information" link until you fill that in.

### Academic Advising copy

`_pages/academic-advising.md` is a short markdown page with the
Reminders Bot link and the pending Dashboard mention. Edit to taste.

### Optional decorative chips on paper rows

`_layouts/bib.liquid` renders a `paper__chips` row when an entry has a
`keywords` field. Currently no `.bib` entry has `keywords`. If you want
the small grey topic chips back (purely decorative now that the filter
is gone), add `keywords = {Epidemics, Networks}`-style fields to
`papers.bib`. If you don't want them, no action needed.

### Publications header eyebrow range

`_layouts/publications.liquid` hardcodes `2016 — 2025` in the eyebrow
("PUBLICATIONS · 43 ENTRIES · 2016 — 2025"). The total comes
automatically from `{% bibliography_count %}`, but the year range is
manual. Update the second number every January.

---

## 6. Adding new content later

| Want to | Where |
|---|---|
| Add a paper | append a new `@article{paperNN, ...}` block at the top of `_bibliography/papers.bib`. Use a fresh `abbr` (one higher than the current max). Set `selected={true}` for the home page's "few works I'm fond of" list. |
| Add a research grant | new `.md` file in `_projects/`. Front matter must include `title`, `description`, `code`, `years`, `role`, `funder`, `more_url`, `img`, `importance`, `category` (`Current projects` or `Past projects`). Drop the thumbnail PNG into `assets/img/`. |
| Add a teaching year/project | edit `_data/teaching.yml`. Add a new entry to `years[]` (it renders descending). Each project takes `n`, `title`, `blurb`, `techniques`, `repo`, `media_rows[]`. Drop the GIFs/WEBMs into `assets/img/YYYY/` or `assets/video/`. |
| Add a resource | edit `_data/resources.yml`. Pick the section (`tools`, `data`, `code`, `other`) or add a new one. Each item is `tag`, `title`, `sub` (HTML allowed), `url`, `action` (e.g. `GITHUB ↗` / `DOI ↗`). |
| Swap the accent | edit `_sass/_tokens.scss` — change the two `--accent` values in `:root` (light) and `[data-theme="dark"]` (dark). The other curated pairs are kept as a comment in that file. |
| Regenerate a network background | run `ruby bin/gen-network-bg.rb` from the repo root. Output lands in `_includes/net/`. Seeds: publications 11, projects 17, teaching 5, resources 23. Commit the resulting SVGs. |

---

## 7. What was removed compared to al-folio

For your records — these are gone:

- News section + `_news/` collection
- Blog + `/blog/`, `_posts/`, related layouts/includes
- Publication filter chips and the "FILTER BY TOPIC" row (`pub-filter.js`)
- Publication stats strip (h-index, citation counts, year-range tile)
- GitHub stars on project/resource cards
- Featured/2-column variant of project cards (everything is uniform)
- Runtime accent picker (oxblood is baked in; alternates live as a SCSS comment)
- Bootstrap, MDB, jQuery, FontAwesome, Academicons, Tabler, Distill, all
  al-folio CV/repository/coauthors/venues data + layouts
- The al-folio email-protection JS (replaced by a plain `mailto:` in the
  footer + home social row)
- X (Twitter) handle from the home social row

If any of those are missed, they can be added back as targeted patches —
the new SCSS architecture is small enough (six page-specific files + four
shared ones) that re-introducing a feature is cheap.

---

## 8. Where to look when something looks off

| Symptom | Look at |
|---|---|
| A page's spacing feels wrong | `_sass/_layout.scss` (sections + page-header pattern), or the page-specific `_sass/_<page>.scss` |
| Dark mode looks washed-out | tokens in `_sass/_tokens.scss` under `[data-theme="dark"]` |
| Paper row's title wraps weirdly | `_layouts/bib.liquid` (markup), `_sass/_publications.scss` (grid) |
| Mobile nav doesn't open | `assets/js/nav.js` + the `.nav.is-open` rules in `_sass/_nav.scss` |
| Theme toggle doesn't persist | `assets/js/theme.js` and the inline no-flash script in `_includes/head.liquid` |
| A network-bg SVG isn't tinting with the theme | confirm the SVG uses `currentColor` and lives in `_includes/net/` (inlined, not `<img>`'d) |

Beyond that: `IMPLEMENTATION_PLAN.md` is still the most complete reference
to what each piece is supposed to do.
