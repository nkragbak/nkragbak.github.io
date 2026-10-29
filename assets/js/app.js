document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inlineMarkdown(text) {
  let out = escapeHtml(text);
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>');
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Interne links (fx politik.html#oekonomi) åbnes i samme fane
  out = out.replace(/\[([^\]]+)\]\(([a-z0-9-]+\.html(?:#[a-z0-9-]+)?)\)/gi, '<a href="$2">$1</a>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  return out;
}

function renderClimateSupportChart() {
  const data = [
    { label: 'Landvindmøller', actual: 65, perceived: 32 },
    { label: 'Solcelleparker', actual: 66, perceived: 34 }
  ];

  return `<figure class="card card-sm card-inset climate-support-chart" aria-label="Danskernes egen opbakning til landvindmøller og solcelleparker sammenlignet med deres skøn over andres opbakning">
    <h4>Vi undervurderer hinandens opbakning</h4>
    <p class="climate-support-intro">Opbakning til anlæg i eget lokalområde – procent af de adspurgte</p>
    <div class="climate-support-legend" aria-hidden="true"><span><i class="climate-support-swatch actual"></i>Støtter selv</span><span><i class="climate-support-swatch perceived"></i>Tror andre støtter</span></div>
    ${data.map(item => `<div class="climate-support-group">
      <div class="climate-support-label">${item.label}</div>
      <div class="climate-support-bar-row"><span class="climate-support-bar-label">Støtter selv</span><span class="climate-support-track"><span class="climate-support-fill actual" style="width:${item.actual}%"></span></span><strong>${item.actual} %</strong></div>
      <div class="climate-support-bar-row"><span class="climate-support-bar-label">Tror andre støtter</span><span class="climate-support-track"><span class="climate-support-fill perceived" style="width:${item.perceived}%"></span></span><strong>${item.perceived} %</strong></div>
    </div>`).join('')}
    <figcaption>Kilder: <a href="https://klimaraadet.dk/da/analyse/klimaholdninger-i-danmark" target="_blank" rel="noopener noreferrer">Klimarådet, Klimaholdninger i Danmark (2026)</a>, baseret på ClimAct-data. De afrundede andele er gengivet af <a href="https://www.dn.dk/nyheder/2026/5-myter-punkteret-danskernes-klimaholdninger-er-ikke-helt-som-du-tror/" target="_blank" rel="noopener noreferrer">Danmarks Naturfredningsforening</a>. Generel støtte er ikke det samme som accept af et bestemt lokalt projekt.</figcaption>
  </figure>`;
}

function renderBody(lines) {
  const html = [];
  let paragraph = [];
  let list = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      html.push(`<ul>${list.map(item => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
      list = [];
    }
  };

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }
    if (trimmed === '[klimaopbakning-figur]') {
      flushParagraph();
      flushList();
      html.push(renderClimateSupportChart());
      return;
    }
    if (/^[-*+]\s+/.test(trimmed)) {
      flushParagraph();
      list.push(trimmed.replace(/^[-*+]\s+/, ''));
      return;
    }
    if (trimmed.startsWith('#### ')) {
      flushParagraph();
      flushList();
      html.push(`<h4>${inlineMarkdown(trimmed.slice(5).trim())}</h4>`);
      return;
    }
    if (trimmed.startsWith('### ')) {
      flushParagraph();
      flushList();
      html.push(`<h3>${inlineMarkdown(trimmed.slice(4).trim())}</h3>`);
      return;
    }
    flushList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  return html.join('');
}

function renderMarkdownAsDetails(markdown, staticFirst = false) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const groups = [];
  let current = null;

  lines.forEach(line => {
    if (line.startsWith('## ')) {
      if (current) groups.push(current);
      current = { title: line.slice(3).trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  });
  if (current) groups.push(current);

  return groups.map((group, index) => {
    if (staticFirst && index === 0) {
      return `
        <div class="markdown-static-intro">
          <h3>${inlineMarkdown(group.title)}</h3>
          ${renderBody(group.lines)}
        </div>`;
    }
    return `
      <details${index === 0 ? ' open' : ''}>
        <summary>${inlineMarkdown(group.title)}</summary>
        <div class="detail-content">${renderBody(group.lines)}</div>
      </details>`;
  }).join('');
}

async function loadMarkdownSections() {
  const sections = [...document.querySelectorAll('.markdown-section')];
  await Promise.all(sections.map(async section => {
    const source = section.dataset.md;
    try {
      const response = await fetch(source, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const markdown = await response.text();
      const title = section.dataset.title || '';
      const subtitleHtmlRaw = section.dataset.subtitleHtml || '';
      const subtitle = section.dataset.subtitle || '';
      const subtitleHtml = subtitleHtmlRaw
        ? `<p class="focus-subtitle">${subtitleHtmlRaw}</p>`
        : (subtitle ? `<p class="focus-subtitle">${escapeHtml(subtitle)}</p>` : '');
      section.innerHTML = `<h2>${escapeHtml(title)}</h2>${subtitleHtml}${renderMarkdownAsDetails(markdown, section.dataset.staticFirst === 'true')}`;
      section.dataset.search = `${title} ${markdown}`.toLocaleLowerCase('da');
    } catch (error) {
      section.innerHTML = `<h2>${escapeHtml(section.dataset.title || '')}</h2><p class="no-results">Kunne ikke indlæse indholdet fra ${escapeHtml(source)}.</p>`;
      console.error('Markdown load failed:', source, error);
    }
  }));

  setupSearch();

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ block: 'start' });
      });
    }
  }
}

function setupSearch() {
  const searches = [...document.querySelectorAll('#politics-search, #politics-search-mobile')];
  const sections = [...document.querySelectorAll('.topic-section')];
  const noResults = document.querySelector('#no-results');
  if (!searches.length || !sections.length) return;

  const runSearch = source => {
    const query = source.value.trim().toLocaleLowerCase('da');
    searches.forEach(search => {
      if (search !== source) search.value = source.value;
    });

    let matches = 0;
    sections.forEach(section => {
      const haystack = (section.dataset.search || section.textContent).toLocaleLowerCase('da');
      const visible = !query || haystack.includes(query);
      section.hidden = !visible;
      if (visible) matches += 1;
    });
    if (noResults) noResults.hidden = matches !== 0;
  };

  searches.forEach(search => {
    search.addEventListener('input', () => runSearch(search));
  });
}

loadMarkdownSections();

document.querySelectorAll('[data-details-action]').forEach(button => {
  button.addEventListener('click', () => {
    const container = button.closest('main') || document;
    const shouldOpen = button.dataset.detailsAction === 'open';
    container.querySelectorAll('details').forEach(detail => {
      detail.open = shouldOpen;
    });
  });
});

// Tabeller i fremskrivningerne: giv hver celle sin kolonneoverskrift,
// så rækkerne kan vises som kort på mobil.
document.querySelectorAll('.ep-table').forEach(table => {
  const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
  table.querySelectorAll('tbody tr').forEach(row => {
    [...row.children].forEach((cell, i) => {
      if (headers[i]) cell.setAttribute('data-label', headers[i]);
    });
  });
});
