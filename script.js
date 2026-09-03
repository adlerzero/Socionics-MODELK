document.documentElement.classList.add("js");

(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const isReader = document.body.dataset.page === "reader";
  const home = isReader ? "index.html" : "";

  const conceptData = {
    object: ["01", "Object", "The material referent toward which inquiry is directed; its identity does not make every description of it identical."],
    apprehension: ["02", "Apprehension", "The intellect receives an aspect of the object from a determinate orientation. What is apprehended must not be confused with the total object."],
    structure: ["03", "Informational structure", "Elements and their relations organize what can be privileged, distinguished, and rendered intelligible within Socionics."],
    interpretation: ["04", "Interpretation", "The intellect structures observed information. A valid interpretation remains constrained by the object rather than reconstructing it ad hoc."],
    manifestation: ["05", "Manifestation", "Observable behavior is a contingent result. It is evidence, but must not automatically be identified with the underlying informational structure."],
  };

  const structureData = {
    "object-aspect": {
      index: "01", title: "Object and Aspect",
      definition: "The object is the material referent. The aspect is the respect under which that object is apprehended by a theoretical structure.",
      role: "Prevents identity of referent from being converted into identity among theories or descriptions.",
      related: [["Formal correlationism argument", "formal-logical.html"], ["Argumentative version", "identity-of-the-object.html#identity-of-the-referent-and-identity-of-the-aspect"]],
    },
    metabolism: {
      index: "02", title: "Information Metabolism",
      definition: "The structured apprehension and organization of aspects of reality through Socionic elements and their relations.",
      role: "Locates Socionics at the epistemological level: in how information is apprehended and metabolized, not in a catalogue of visible behaviors.",
      related: [["Axiomatic approach", "axiomatic-approach.html"], ["Analytic notes", "analytic-notes.html"]],
    },
    "mental-vital": {
      index: "03", title: "Mental / Vital",
      definition: "Mental names conscious, organizing recognition; Vital names the automatic and reactive background that sustains the dominant interpretation.",
      role: "Distinguishes active intellectual organization from implicit, contact-dependent, and non-linear processing.",
      related: [["De Staticum, Dynamicum, Mentale et Vitale", "analytic-notes.html#quaestio-secunda-de-eo-quod-per-staticum-dynamicum-mentale-et-vitale-intelligitur"]],
    },
    "static-dynamic": {
      index: "04", title: "Static / Dynamic",
      definition: "Static attends to stable and abstract regularities; Dynamic attends to processes and the effective manifestations of those structures.",
      role: "Organizes the distinction between conceptual causes and their unfolding as observable effects without reducing either to temperament.",
      related: [["Formal definitions of the axes", "analytic-notes.html#quaestio-quinta-de-definitionibus-formalibus-axium"]],
    },
    "introversion-extraversion": {
      index: "05", title: "Introversion / Extraversion",
      definition: "A distinction in epistemological orientation: toward the subject-mediated relation or toward constituted states and expressions of external reality.",
      role: "Prevents introversion and extraversion from being mistaken for labels of social conduct.",
      related: [["Interpretation and premises", "axiomatic-approach.html#articulus-i-interpretation-and-premises-within-socionics"]],
    },
    "rational-irrational": {
      index: "06", title: "Rational / Irrational",
      definition: "Rational elements distinguish, evaluate, and articulate relations; irrational elements apprehend states, events, and possibilities prior to rational judgment.",
      role: "Separates conceptual determination from the direct apprehension of changing or constituted states.",
      related: [["Primary causes of the elements", "axiomatic-approach.html#quaestio-quarta-on-the-primary-cause-of-each-element"]],
    },
    elements: {
      index: "07", title: "Information Elements",
      definition: "Eight principles—Se, Si, Ne, Ni, Te, Ti, Fe, and Fi—through which distinct aspects of reality are apprehended.",
      role: "Replaces mnemonic descriptions with underlying principles of influence, possibility, effect, cause, expression, value, sensation, and temporal tendency.",
      related: [["An Axiomatic Approach to the Elements", "axiomatic-approach.html"]],
    },
    blocks: {
      index: "08", title: "Blocks",
      definition: "Relational structures through which elements operate together rather than as independent, voluntarily activated tools.",
      role: "Explains why no element produces a neutral or universal reading apart from the organization of a type.",
      related: [["Correct intelligibility of the elements", "axiomatic-approach.html#conclusio-on-the-correct-intelligibility-of-the-elements"]],
    },
    type: {
      index: "09", title: "Type",
      definition: "A structured organization of blocks and elements that conditions a particular partition and interpretation of reality.",
      role: "Names an epistemological organization, not a prescription of occupation, habit, or stereotyped conduct.",
      related: [["Epistemological notes", "analytic-notes.html"], ["Axiomatic approach", "axiomatic-approach.html"]],
    },
    manifestation: {
      index: "10", title: "Manifestation",
      definition: "The contingent, observable effect through which an underlying relation or structure becomes perceptible.",
      role: "Serves as evidence while remaining distinct from essence. Similar manifestations may arise from different mechanisms.",
      related: [["Structural preservation", "identity-of-the-object.html#structural-preservation"], ["Dynamic", "analytic-notes.html#articulus-ii-de-dynamico"]],
    },
    interpretation: {
      index: "11", title: "Interpretation and Typing",
      definition: "The progressive organization of observations into a classification constrained by contrary data and the exclusion of incompatible hypotheses.",
      role: "Keeps typing answerable to the object and prevents the interpreter’s expectation from becoming self-confirming evidence.",
      related: [["The object must constrain the theory", "identity-of-the-object.html#the-object-must-constrain-the-theory"], ["Temporal factor", "identity-of-the-object.html#the-temporal-factor"]],
    },
    correlation: {
      index: "12", title: "Cross-theoretical Correlation",
      definition: "A relation proposed between independently constituted theoretical descriptions of the same object.",
      role: "Distinguishes association from restriction and transformation, and requires a justified rule of passage between theoretical languages.",
      related: [["Formal argument", "formal-logical.html"], ["Correlation, restriction, and transformation", "identity-of-the-object.html#correlation-restriction-and-transformation"]],
    },
  };

  const argumentsIndex = [
    ["Argument", "Identity of the Object, Not Identity of the Theory — Formal / Logical", "formal-logical.html", "correlation restriction transformation coreference formal logic"],
    ["Argument", "Identity of the Object, Not Identity of the Theory — Argumentative Essay", "identity-of-the-object.html", "correlation critique translation object"],
    ["Argument", "An Axiomatic Approach to the Elements of Socionics", "axiomatic-approach.html", "foundations socionics elements se si ne ni te ti fe fi"],
    ["Argument", "Axiomatic Socionics — Analytic Notes", "analytic-notes.html", "epistemology interpretation static dynamic mental vital"],
  ];

  const glossaryIndex = $$("[data-term]").map((item) => ["Glossary", $("h3", item)?.textContent || item.dataset.term, `${home}#glossary?term=${encodeURIComponent(item.dataset.term)}`, item.textContent]);
  const fallbackGlossary = ["Object", "Aspect", "Manifestation", "Primary cause", "Information metabolism", "Static", "Dynamic", "Mental", "Vital", "Se", "Si", "Ne", "Ni", "Te", "Ti", "Fe", "Fi", "Correlation", "Restriction", "Transformation", "Coreference", "Structural preservation", "Interpretation"]
    .map((term) => ["Glossary", term, `index.html#glossary?term=${encodeURIComponent(term.toLowerCase())}`, term]);

  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: .08 });
    items.forEach((item) => observer.observe(item));
  }

  function initMenu() {
    const toggle = $("[data-menu-toggle]");
    const menu = $("#mobile-menu");
    if (!toggle || !menu) return;
    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
      document.body.classList.remove("menu-open");
    };
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
      document.body.classList.toggle("menu-open", open);
    });
    $$("a", menu).forEach((link) => link.addEventListener("click", close));
    window.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  }

  function initConceptMap() {
    const nodes = $$("[data-concept]");
    const display = $(".concept-display");
    if (!nodes.length || !display) return;
    const update = (node) => {
      const data = conceptData[node.dataset.concept];
      if (!data) return;
      nodes.forEach((item) => {
        const active = item === node;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      display.classList.remove("is-changing");
      void display.offsetWidth;
      $("[data-concept-number]", display).textContent = data[0];
      $("[data-concept-title]", display).textContent = data[1];
      $("[data-concept-description]", display).textContent = data[2];
      display.classList.add("is-changing");
    };
    nodes.forEach((node) => {
      node.addEventListener("click", () => update(node));
      node.addEventListener("focus", () => update(node));
      node.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") update(node); });
    });
  }

  function initFilters() {
    const buttons = $$("[data-filter]");
    const cards = $$("[data-tags]");
    if (!buttons.length || !cards.length) return;
    buttons.forEach((button) => button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.tags.split(" ").includes(filter);
        card.classList.toggle("is-filtering-out", !show);
        window.setTimeout(() => { card.hidden = !show; }, show ? 0 : 220);
      });
    }));
  }

  async function initReadingTimes() {
    const cards = $$("[data-reading-source]");
    await Promise.all(cards.map(async (card) => {
      const output = $("[data-reading-time]", card);
      try {
        const response = await fetch(card.dataset.readingSource);
        if (!response.ok) throw new Error();
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const words = (doc.querySelector(".article-body")?.textContent || "").trim().split(/\s+/).filter(Boolean).length;
        output.textContent = `${Math.max(1, Math.ceil(words / 220))} min read`;
      } catch {
        output.textContent = "Long read";
      }
    }));
  }

  function initStructurePanel() {
    const panel = $("[data-structure-panel]");
    const backdrop = $("[data-panel-backdrop]");
    const closeButton = $("[data-panel-close]");
    if (!panel || !backdrop || !closeButton) return;
    let previousFocus = null;
    const close = () => {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      backdrop.hidden = true;
      document.body.classList.remove("panel-open");
      previousFocus?.focus();
    };
    const open = (button) => {
      const data = structureData[button.dataset.structure];
      if (!data) return;
      previousFocus = button;
      $("[data-panel-index]", panel).textContent = `Structure / ${data.index}`;
      $("[data-panel-title]", panel).textContent = data.title;
      $("[data-panel-definition]", panel).textContent = data.definition;
      $("[data-panel-role]", panel).textContent = data.role;
      $("[data-panel-related]", panel).innerHTML = data.related.map(([label, href]) => `<a href="${href}">${label} →</a>`).join("");
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      backdrop.hidden = false;
      document.body.classList.add("panel-open");
      closeButton.focus();
    };
    $$("[data-structure]").forEach((button) => button.addEventListener("click", () => open(button)));
    closeButton.addEventListener("click", close);
    backdrop.addEventListener("click", close);
    window.addEventListener("keydown", (event) => { if (event.key === "Escape" && panel.classList.contains("is-open")) close(); });
  }

  function initGlossary() {
    const input = $("[data-glossary-search]");
    const entries = $$("[data-term]");
    const count = $("[data-glossary-count]");
    const empty = $("[data-glossary-empty]");
    if (!input || !entries.length) return;
    const filter = (value) => {
      const query = value.trim().toLowerCase();
      let visible = 0;
      entries.forEach((entry) => {
        const show = !query || entry.textContent.toLowerCase().includes(query);
        entry.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      count.textContent = `${visible} concept${visible === 1 ? "" : "s"}`;
      empty.hidden = visible !== 0;
    };
    input.addEventListener("input", () => filter(input.value));
    const match = location.hash.match(/#glossary\?term=([^&]+)/);
    if (match) {
      input.value = decodeURIComponent(match[1]);
      filter(input.value);
    }
  }

  function slugify(text) {
    return text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90) || "section";
  }

  function escapeHTML(value) {
    return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }

  function initReader() {
    const article = $("[data-article-body]");
    if (!article) return [];
    const headings = $$("h1, h2, h3", article);
    const used = new Set();
    headings.forEach((heading, index) => {
      const headingLabel = heading.textContent.trim();
      heading.dataset.headingLabel = headingLabel;
      let id = heading.id || slugify(headingLabel);
      const base = id;
      let count = 2;
      while (used.has(id)) id = `${base}-${count++}`;
      used.add(id);
      heading.id = id;
      const copy = document.createElement("button");
      copy.type = "button";
      copy.className = "copy-link";
      copy.setAttribute("aria-label", `Copy link to ${headingLabel}`);
      copy.textContent = "#";
      copy.addEventListener("click", async () => {
        const url = `${location.href.split("#")[0]}#${id}`;
        history.replaceState(null, "", `#${id}`);
        try { await navigator.clipboard.writeText(url); copy.textContent = "✓"; }
        catch { copy.textContent = "#"; }
        window.setTimeout(() => { copy.textContent = "#"; }, 1200);
      });
      heading.append(copy);
    });

    const tocMarkup = headings.map((heading) => `<a class="depth-${heading.tagName.slice(1)}" href="#${heading.id}">${escapeHTML(heading.dataset.headingLabel)}</a>`).join("");
    $$('[data-toc]').forEach((toc) => { toc.innerHTML = tocMarkup; });
    const tocLinks = $$('[data-toc] a');
    const updateToc = () => {
      let current = headings[0];
      headings.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= 180) current = heading;
      });
      tocLinks.forEach((link) => link.classList.toggle("is-active", Boolean(current) && link.hash === `#${current.id}`));
    };
    addEventListener("scroll", updateToc, { passive: true });
    addEventListener("resize", updateToc);
    updateToc();

    const restoreAnchor = () => {
      if (!location.hash) return;
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      target?.scrollIntoView({ block: "start" });
    };
    requestAnimationFrame(restoreAnchor);
    if (window.MathJax?.startup?.promise) window.MathJax.startup.promise.then(restoreAnchor);

    const progress = $("[data-reading-progress]");
    const updateProgress = () => {
      if (!progress) return;
      const start = article.offsetTop;
      const length = article.offsetHeight - innerHeight;
      const percentage = Math.max(0, Math.min(1, (scrollY - start) / Math.max(length, 1)));
      progress.style.width = `${percentage * 100}%`;
    };
    addEventListener("scroll", updateProgress, { passive: true });
    addEventListener("resize", updateProgress);
    updateProgress();

    const words = article.textContent.trim().split(/\s+/).filter(Boolean).length;
    $$('[data-reader-time]').forEach((output) => { output.textContent = `${Math.max(1, Math.ceil(words / 220))} min`; });
    return headings.map((heading) => ["Section", heading.dataset.headingLabel, `#${heading.id}`, heading.dataset.headingLabel]);
  }

  function initCommandPalette(sectionItems) {
    const dialog = $("[data-command-dialog]");
    const input = $("[data-command-input]", dialog || document);
    const results = $("[data-command-results]", dialog || document);
    if (!dialog || !input || !results) return;
    const structureItems = Object.values(structureData).map((item) => ["Structure", item.title, `${home}#structure`, `${item.definition} ${item.role}`]);
    const entries = [...argumentsIndex, ...(glossaryIndex.length ? glossaryIndex : fallbackGlossary), ...structureItems, ...sectionItems];
    let filtered = [];
    let selected = 0;
    const render = () => {
      const query = input.value.trim().toLowerCase();
      filtered = entries.filter((item) => !query || `${item[0]} ${item[1]} ${item[3]}`.toLowerCase().includes(query)).slice(0, 10);
      selected = Math.min(selected, Math.max(filtered.length - 1, 0));
      results.innerHTML = filtered.length ? filtered.map((item, index) => `<a class="command-result${index === selected ? " is-selected" : ""}" href="${item[2]}"><span>${item[0]}</span><strong>${item[1]}</strong></a>`).join("") : `<p class="command-result"><span>Search</span><strong>No matching result</strong></p>`;
    };
    const open = () => {
      if (!dialog.open) dialog.showModal();
      input.value = "";
      selected = 0;
      render();
      window.setTimeout(() => input.focus(), 0);
    };
    $$('[data-command-open]').forEach((button) => button.addEventListener("click", open));
    input.addEventListener("input", () => { selected = 0; render(); });
    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        selected = (selected + (event.key === "ArrowDown" ? 1 : -1) + filtered.length) % Math.max(filtered.length, 1);
        render();
      }
      if (event.key === "Enter" && filtered[selected]) {
        event.preventDefault();
        location.href = filtered[selected][2];
      }
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    window.addEventListener("keydown", (event) => {
      const typing = /input|textarea|select/i.test(document.activeElement?.tagName || "");
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); open(); }
      else if (event.key === "/" && !typing && !dialog.open) { event.preventDefault(); open(); }
      else if (event.key === "Escape" && dialog.open) dialog.close();
    });
  }

  function initPageTransitions() {
    $$('a[href]').forEach((link) => link.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname && url.hash) return;
      if (!url.pathname.endsWith(".html") && !url.pathname.endsWith("/")) return;
      event.preventDefault();
      document.body.classList.add("leaving");
      window.setTimeout(() => { location.href = link.href; }, 150);
    }));
  }

  initReveal();
  initMenu();
  initConceptMap();
  initFilters();
  initReadingTimes();
  initStructurePanel();
  initGlossary();
  const readerSections = initReader();
  initCommandPalette(readerSections);
  initPageTransitions();
})();
