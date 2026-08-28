(function () {
  const app = document.getElementById("app");
  const page = document.body.dataset.page;
  const data = window.siteData;

  function createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.className) element.className = options.className;
    if (options.text) element.textContent = options.text;
    if (options.html) element.innerHTML = options.html;
    if (options.href) element.href = options.href;
    if (options.src) element.src = options.src;
    if (options.alt) element.alt = options.alt;
    if (options.type) element.type = options.type;
    if (options.placeholder) element.placeholder = options.placeholder;
    if (options.ariaLabel) element.setAttribute("aria-label", options.ariaLabel);
    if (options.target) element.target = options.target;
    if (options.rel) element.rel = options.rel;

    return element;
  }

  function externalLink(url) {
    if (!url) return {};
    return url.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
  }

  function renderInlineLink(item) {
    const text = item.name || item.label;
    const node = item.url
      ? createElement("a", { text, href: item.url, ...externalLink(item.url) })
      : createElement("span", { text });

    if (!item.self) return node;

    const strong = createElement("strong");
    strong.appendChild(node);
    return strong;
  }

  function renderLinkList(links, className) {
    const list = createElement("div", { className });

    links.forEach((link) => {
      const anchor = createElement("a", {
        text: link.label,
        href: link.url,
        ...externalLink(link.url),
      });
      list.appendChild(anchor);
    });

    return list;
  }

  const socialIconClasses = {
    email: "fa-solid fa-envelope",
    scholar: "ai ai-google-scholar",
    github: "fa-brands fa-github",
    linkedin: "fa-brands fa-linkedin",
    x: "fa-brands fa-x-twitter",
  };

  function renderSocialLinks(links) {
    const list = createElement("div", { className: "social-links" });

    links.forEach((link) => {
      const anchor = createElement("a", {
        className: `social-link social-link-${link.icon}`,
        href: link.url,
        ariaLabel: link.label,
        ...externalLink(link.url),
      });
      anchor.title = link.label;
      const icon = createElement("i", {
        className: socialIconClasses[link.icon],
      });
      icon.setAttribute("aria-hidden", "true");
      anchor.appendChild(icon);
      list.appendChild(anchor);
    });

    return list;
  }

  function renderSectionHeading(text) {
    return createElement("h2", { className: "section-title", text });
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function renderNameHeading(name) {
    const [firstName, ...rest] = name.split(" ");
    const heading = createElement("h1", {
      className: "split-name",
      html: `<strong>${firstName}</strong>${rest.length ? ` ${rest.join(" ")}` : ""}`,
    });

    return heading;
  }

  function renderSiteTitle() {
    const siteTitle = document.querySelector(".site-title");
    const [firstName, ...rest] = data.profile.name.split(" ");

    siteTitle.innerHTML = `<strong>${firstName}</strong>${
      rest.length ? ` ${rest.join(" ")}` : ""
    }`;
  }

  function renderHome() {
    const fragment = document.createDocumentFragment();
    const hero = createElement("section", { className: "intro-section" });
    const copy = createElement("div", { className: "intro-copy" });
    const title = renderNameHeading(data.profile.name);
    const pronunciation = createElement("p", {
      className: "pronunciation",
      text: data.profile.pronunciation,
    });

    copy.appendChild(title);
    copy.appendChild(pronunciation);

    data.profile.bio.forEach((paragraph) => {
      copy.appendChild(createElement("p", { html: paragraph }));
    });

    copy.appendChild(
      createElement("p", {
        html: `<strong>Contact</strong>: ${data.profile.contact}`,
      }),
    );

    const photoWrap = createElement("div", { className: "profile-photo-wrap" });
    photoWrap.appendChild(
      createElement("img", {
        className: "profile-photo",
        src: data.profile.photo.src,
        alt: data.profile.photo.alt,
      }),
    );
    photoWrap.appendChild(renderSocialLinks(data.profile.links));

    hero.appendChild(copy);
    hero.appendChild(photoWrap);
    fragment.appendChild(hero);
    fragment.appendChild(renderNews());

    app.appendChild(fragment);
  }

  function renderNews() {
    const section = createElement("section", { className: "content-section" });
    const list = createElement("ol", { className: "news-list" });

    section.appendChild(renderSectionHeading("News"));

    data.news.slice(0, data.newsLimit ?? data.news.length).forEach((item) => {
      const row = createElement("li", { className: "news-item" });
      row.appendChild(createElement("time", { text: item.date }));
      row.appendChild(createElement("span", { html: item.text }));
      list.appendChild(row);
    });

    section.appendChild(list);
    return section;
  }

  function renderAuthorList(publication) {
    const authors = createElement("p", { className: "publication-authors" });

    publication.authors.forEach((author, index) => {
      if (index > 0) authors.appendChild(document.createTextNode(", "));
      authors.appendChild(renderInlineLink(author));
    });

    return authors;
  }

  function renderPublication(publication) {
    const item = createElement("article", { className: "publication-item" });
    const title = createElement("h3", {
      className: "publication-title",
      text: publication.title,
    });

    item.dataset.search = [
      publication.title,
      publication.year,
      publication.authors.map((author) => author.name).join(" "),
      publication.venues.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    item.appendChild(title);
    item.appendChild(renderAuthorList(publication));

    publication.venues.forEach((venue) => {
      item.appendChild(createElement("p", { className: "publication-venue", text: venue }));
    });

    if (publication.links && publication.links.length > 0) {
      item.appendChild(renderLinkList(publication.links, "publication-links"));
    }

    if (publication.description) {
      item.appendChild(
        createElement("p", {
          className: "publication-description",
          text: publication.description,
        }),
      );
    }

    return item;
  }

  function renderPublicationList(publications) {
    const list = createElement("div", { className: "publication-list" });
    const publicationsByYear = publications.reduce((groups, publication) => {
      if (!groups[publication.year]) groups[publication.year] = [];
      groups[publication.year].push(publication);
      return groups;
    }, {});

    Object.keys(publicationsByYear)
      .sort((a, b) => Number(b) - Number(a))
      .forEach((year) => {
        const group = createElement("section", { className: "publication-year" });
        group.appendChild(createElement("h2", { className: "year-heading", text: year }));
        publicationsByYear[year].forEach((publication) => {
          group.appendChild(renderPublication(publication));
        });
        list.appendChild(group);
      });

    return list;
  }

  function renderPublicationsPage() {
    const section = createElement("section", { className: "content-section page-heading" });
    const input = createElement("input", {
      className: "filter-input",
      type: "search",
      placeholder: "Type to filter",
      ariaLabel: "Filter publications",
    });
    const list = renderPublicationList(data.publications);

    section.appendChild(createElement("h1", { text: "Publications" }));
    section.appendChild(input);
    section.appendChild(list);
    app.appendChild(section);

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      document.querySelectorAll(".publication-item").forEach((item) => {
        item.hidden = query.length > 0 && !item.dataset.search.includes(query);
      });
      document.querySelectorAll(".publication-year").forEach((group) => {
        group.hidden = Array.from(group.querySelectorAll(".publication-item")).every(
          (item) => item.hidden,
        );
      });
    });
  }

  function renderCvSection(section) {
    const wrapper = createElement("section", {
      className: section.title === "Basics" ? "cv-card cv-basics-card" : "cv-card",
    });
    const list = createElement("div", { className: "cv-list" });
    wrapper.id = `cv-${slugify(section.title)}`;

    wrapper.appendChild(renderSectionHeading(section.title));

    section.entries.forEach((entry) => {
      const item = createElement("article", { className: "cv-item" });
      const heading = createElement("div", { className: "cv-item-heading" });
      heading.appendChild(createElement("h3", { text: entry.title }));
      if (entry.meta) heading.appendChild(createElement("span", { html: entry.meta }));
      item.appendChild(heading);

      if (entry.details) {
        entry.details.forEach((detail) => {
          item.appendChild(createElement("p", { html: detail }));
        });
      }

      list.appendChild(item);
    });

    wrapper.appendChild(list);
    return wrapper;
  }

  function renderCvPublication(publication) {
    const item = createElement("article", { className: "cv-item" });
    const heading = createElement("div", { className: "cv-item-heading" });
    const title = createElement("h3", { text: publication.title });
    heading.appendChild(title);
    heading.appendChild(createElement("span", { text: publication.year }));
    item.appendChild(heading);

    publication.venues.forEach((venue) => {
      item.appendChild(createElement("p", { text: venue }));
    });

    return item;
  }

  function renderCvPublicationsSection() {
    const wrapper = createElement("section", { className: "cv-card" });
    const list = createElement("div", { className: "cv-list" });
    wrapper.id = "cv-publications";

    wrapper.appendChild(renderSectionHeading("Publications"));

    data.publications.forEach((publication) => {
      list.appendChild(renderCvPublication(publication));
    });

    wrapper.appendChild(list);
    return wrapper;
  }

  function getCvSections() {
    const sections = [];

    data.cv.sections.forEach((section) => {
      sections.push(section);
      if (section.title === "Education") {
        sections.push({ title: "Publications", generated: true });
      }
    });

    return sections;
  }

  function renderCvSidebar(sections) {
    const sidebar = createElement("aside", { className: "cv-sidebar" });
    const nav = createElement("nav", { ariaLabel: "CV sections" });

    sections.forEach((section) => {
      const id = `cv-${slugify(section.title)}`;
      const link = createElement("a", {
        className: "cv-sidebar-link",
        text: section.title,
        href: `#${id}`,
      });

      link.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveCvSection(id);
      });

      nav.appendChild(link);
    });

    sidebar.appendChild(nav);
    return sidebar;
  }

  function setActiveCvSection(id) {
    document.querySelectorAll(".cv-sidebar-link").forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function observeCvSections() {
    const sections = document.querySelectorAll(".cv-card");

    if (!("IntersectionObserver" in window)) {
      if (sections[0]) setActiveCvSection(sections[0].id);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) setActiveCvSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    if (sections[0]) setActiveCvSection(sections[0].id);
  }

  function renderCvPage() {
    const sections = getCvSections();
    const layout = createElement("section", { className: "cv-layout page-heading" });
    const content = createElement("div", { className: "cv-content" });
    content.appendChild(createElement("h1", { text: "CV" }));
    content.appendChild(
      renderLinkList([{ label: "Download PDF", url: data.cv.pdf }], "profile-links"),
    );

    sections.forEach((cvSection) => {
      content.appendChild(
        cvSection.generated ? renderCvPublicationsSection() : renderCvSection(cvSection),
      );
    });

    layout.appendChild(renderCvSidebar(sections));
    layout.appendChild(content);
    app.appendChild(layout);
    observeCvSections();
  }

  function renderPersonalPage() {
    const pageSection = createElement("section", {
      className: "content-section page-heading personal-page",
    });
    const sections = createElement("div", { className: "personal-sections" });

    pageSection.appendChild(createElement("h1", { text: data.personal.title }));

    data.personal.sections.forEach((personalSection) => {
      const section = createElement("section", { className: "personal-section" });
      const content = createElement("div", { className: "personal-copy" });

      section.appendChild(createElement("h2", { text: personalSection.title }));
      personalSection.body.forEach((paragraph) => {
        content.appendChild(createElement("p", { html: paragraph }));
      });

      if (personalSection.images) {
        const gallery = createElement("div", { className: "personal-gallery" });

        if (personalSection.images.length === 1) {
          gallery.classList.add("personal-gallery-single");
        }

        if (personalSection.images[0].crop) {
          gallery.classList.add(`personal-gallery-${personalSection.images[0].crop}`);
        }

        personalSection.images.forEach((imageData) => {
          const image = createElement("img", imageData);
          image.loading = "lazy";
          image.decoding = "async";
          gallery.appendChild(image);
        });

        content.appendChild(gallery);
      }

      if (personalSection.links) {
        const links = createElement("div", { className: "personal-actions" });

        personalSection.links.forEach((link) => {
          const anchor = createElement("a", {
            href: link.url,
            target: link.newTab ? "_blank" : undefined,
            rel: link.newTab ? "noreferrer" : undefined,
          });
          const icon = createElement("i", { className: link.icon });
          icon.setAttribute("aria-hidden", "true");
          anchor.appendChild(icon);
          anchor.appendChild(document.createTextNode(link.label));
          links.appendChild(anchor);
        });

        content.appendChild(links);
      }

      section.appendChild(content);
      sections.appendChild(section);
    });

    pageSection.appendChild(sections);
    app.appendChild(pageSection);
  }

  function initScrollProgress() {
    const progress = createElement("div", { className: "scroll-progress" });
    let animationFrame = null;

    progress.setAttribute("aria-hidden", "true");
    document.body.prepend(progress);

    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      progress.style.setProperty("--scroll-progress", Math.min(Math.max(ratio, 0), 1));
      animationFrame = null;
    };

    const requestUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }

  function activateNavigation() {
    const nav = document.querySelector(".site-nav");

    data.navigation.forEach((item) => {
      const link = createElement("a", {
        text: item.label,
        href: item.url,
      });
      link.dataset.nav = item.id;

      if (item.id === page) {
        link.setAttribute("aria-current", "page");
      }

      nav.appendChild(link);
    });
  }

  function initThemeToggle() {
    const nav = document.querySelector(".site-nav");
    const button = createElement("button", {
      className: "theme-toggle",
      type: "button",
    });

    button.innerHTML = `
      <svg class="theme-icon theme-icon-moon" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>
      </svg>
      <svg class="theme-icon theme-icon-sun" aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
      </svg>
    `;
    nav.appendChild(button);

    const updateButton = () => {
      const isDark = window.siteTheme.get() === "dark";
      const label = isDark ? "Switch to light mode" : "Switch to dark mode";
      button.setAttribute("aria-label", label);
      button.title = label;
    };

    button.addEventListener("click", () => {
      window.siteTheme.toggle();
    });
    window.addEventListener("themechange", updateButton);
    updateButton();
  }

  const renderers = {
    home: renderHome,
    publications: renderPublicationsPage,
    cv: renderCvPage,
    personal: renderPersonalPage,
  };

  renderSiteTitle();
  activateNavigation();
  initThemeToggle();
  renderers[page]();
  initScrollProgress();
})();
