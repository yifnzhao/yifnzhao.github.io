# Yifan Zhao — personal website

A static website covering research, software, publications, presentations, a photo gallery, and music.

## Local preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. No build step is required. GitHub Pages serves the HTML, CSS, JavaScript, and images directly; `.nojekyll` disables the previous Jekyll build.

- `index.html`: biography, projects, selected publications, news, gallery, and music.
- `publications.html`: publication list.
- `events.html`: presentations archive.
- `music.html`: ensembles and past performances.
- `assets/site.css` and `assets/site.js`: responsive styling, image viewer, and software walkthroughs.

Software figures retain attribution and license links in their captions. HiScanner and scETM figures are reproduced under CC BY 4.0, with HiScanner’s BioRender credit retained. The CentTracker figure is reproduced under CC BY-NC-SA 3.0. Source figures are unchanged; CSS blends their backgrounds with the page. Concert posters and photos include source links where applicable.

The obsolete Jekyll theme, sample content, build tools, and unused assets have been removed. The MIT license is retained. Earlier versions remain available in Git history.

Selected publications include lightweight first-page previews rendered from the publisher PDFs, with links to the full papers. Peter Park’s lab link appears in About Me.

Projects features the Nature brain somatic mosaicism study first, using the publisher’s final main figure (Figure 5) with source and license credits. Diagrams display in their original colours. White and pale blue-gray section backgrounds alternate, with teal accents. Presentations remains accessible through the News archive link.

The Y-shaped DNA replication-fork logo is provided as SVG and PNG, with favicon and Apple touch icon variants. Contact links use accessible inline SVG icons. About Me has a pale teal background that alternates with the white Projects section.
