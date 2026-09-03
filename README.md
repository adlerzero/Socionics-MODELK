# Model K — VOID / Adler Zero

An interactive research interface for Model K: a systematic approach to
Socionics, information metabolism, interpretation, and cross-theoretical
correlation.

## Research interface

- Four complete arguments in local, dedicated reading pages
- Filterable argument index with automatic reading times
- Interactive conceptual map and Model K structure explorer
- Searchable glossary of the project's core vocabulary
- Global command palette (`Cmd/Ctrl + K` or `/`)
- Generated article tables of contents, reading progress, copyable section links,
  pagination, and MathJax support
- Responsive navigation and article layouts for desktop and mobile
- Progressive enhancement: the articles and navigation remain usable without
  JavaScript

The site is intentionally dependency-light: semantic HTML, a shared stylesheet,
and a single JavaScript file. Its visual system is limited to `#353535` and
`#e0e0e0`, plus opacity variants of those same values.

## Reproducible animations

The three explanatory diagrams are generated with Matplotlib and Pillow:

```sh
python3 scripts/animations/generate.py
```

The script writes optimized animated GIFs and static reduced-motion fallbacks to
`assets/animations/`.

## GitHub Pages

The static site is published directly from the root of the `main` branch. The
`.nojekyll` file keeps GitHub Pages from applying an additional Jekyll build.
