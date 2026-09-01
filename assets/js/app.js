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
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  return out;
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
    if (trimmed.startsWith('- ')) {
      flushParagraph();
      list.push(trimmed.slice(2));
      return;
    }
    flushList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  return html.join('');
}

function renderMarkdownAsDetails(markdown) {
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

  return groups.map((group, index) => `
    <details${index === 0 ? ' open' : ''}>
      <summary>${inlineMarkdown(group.title)}</summary>
      <div class="detail-content">${renderBody(group.lines)}</div>
    </details>`).join('');
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
      section.innerHTML = `<h2>${escapeHtml(title)}</h2>${renderMarkdownAsDetails(markdown)}`;
      section.dataset.search = `${title} ${markdown}`.toLocaleLowerCase('da');
    } catch (error) {
      section.innerHTML = `<h2>${escapeHtml(section.dataset.title || '')}</h2><p class="no-results">Kunne ikke indlæse indholdet fra ${escapeHtml(source)}.</p>`;
      console.error('Markdown load failed:', source, error);
    }
  }));

  setupSearch();
}

function setupSearch() {
  const search = document.querySelector('#politics-search');
  const sections = [...document.querySelectorAll('.topic-section')];
  const noResults = document.querySelector('#no-results');
  if (!search || !sections.length) return;

  const runSearch = () => {
    const query = search.value.trim().toLocaleLowerCase('da');
    let matches = 0;
    sections.forEach(section => {
      const haystack = (section.dataset.search || section.textContent).toLocaleLowerCase('da');
      const visible = !query || haystack.includes(query);
      section.hidden = !visible;
      if (visible) matches += 1;
    });
    if (noResults) noResults.hidden = matches !== 0;
  };

  search.addEventListener('input', runSearch);
}

loadMarkdownSections();