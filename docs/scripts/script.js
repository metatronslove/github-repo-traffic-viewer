/**
 * Converts GitHub-flavored Markdown to HTML
 * @param {string} markdown - The markdown text to convert
 * @returns {string} - HTML string
 */
function githubMarkdownToHtml(markdown) {
    // Create a container div to hold our rendered HTML
    const container = document.createElement('div');
    // Use marked.js library with GitHub Flavored Markdown (GFM) options
    if (typeof marked === 'undefined') {
        throw new Error('marked.js library is required. Please include it before using this function.');
    }
    // Set marked.js options to match GitHub's rendering as closely as possible
    marked.setOptions({
        gfm: true, // GitHub Flavored Markdown
        breaks: true, // GitHub-style line breaks
        tables: true, // GitHub-style tables
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        // Highlight.js for syntax highlighting (like GitHub)
        highlight: function(code, lang) {
            if (typeof hljs !== 'undefined' && lang) {
                try {
                    return hljs.highlight(lang, code).value;
                } catch (e) {
                    console.warn(`Error highlighting ${lang} code:`, e);
                }
            }
            return code;
        }
    });
    // Convert markdown to HTML
    container.innerHTML = marked.parse(markdown);
    // Post-processing to better match GitHub's style
    postProcessHtml(container);
    return container.innerHTML;
}

/**
 * Additional post-processing to better match GitHub's rendering
 * @param {HTMLElement} container - The container with rendered markdown
 */
function postProcessHtml(container) {
    // Add GitHub-like classes to elements
    container.querySelectorAll('pre').forEach(pre => {
        pre.classList.add('github-markdown-pre');
        const code = pre.querySelector('code');
        if (code) {
            code.classList.add('github-markdown-code');
        }
    });
    container.querySelectorAll('table').forEach(table => {
        table.classList.add('github-markdown-table');
    });
    // Add anchor links to headers like GitHub
    container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(header => {
        const id = header.textContent.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
            .replace(/^-+|-+$/g, '');
        header.id = id;
        const anchor = document.createElement('a');
        anchor.className = 'github-markdown-header-anchor';
        anchor.href = `#${id}`;
        anchor.innerHTML = '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>';
        header.prepend(anchor);
    });
}

function ToggleReadMe(repoName, fullName) {
    const readmeContainer = document.getElementById(`readme-${repoName}`);
    const toggleLinkText = document.getElementById(`toggle-${repoName}`);
    if (readmeContainer.style.display === 'none') {
        readmeContainer.style.display = 'block';
        toggleLinkText.innerHTML = 'README.md-';
    } else {
        readmeContainer.style.display = 'none';
        toggleLinkText.innerHTML = 'README.md+';
    }
}

async function fetchAndDisplayReadme(repo) {
    const repoName = repo.name;
    const fullName = repo.full_name;
    const defaultBranch = repo.default_branch || 'main';
    const readmeContainer = document.getElementById(`readme-${repoName}`);
    try {
        const response = await fetch(`https://raw.githubusercontent.com/${fullName}/${defaultBranch}/README.md`);
        if (!response.ok) throw new Error(`Failed to fetch README: ${response.status}`);
        let markdown = await response.text();
        // Convert images and links to absolute URLs with correct branch
        markdown = convertRelativeUrls(markdown, fullName, defaultBranch);
        const html = githubMarkdownToHtml(markdown);
        const modalHTML = `
              <div class="readme-modal-overlay" onclick="ToggleReadMe('${repoName}')">
              <div class="readme-modal-content" onclick="event.stopPropagation()">
                  <div class="readme-modal-body">${html}</div>
              </div>
              </div>
            `;
        readmeContainer.innerHTML = modalHTML;
        readmeContainer.style.display = 'none';
        // Process images and links after dynamic content is loaded
        processImagesAndLinks(readmeContainer, fullName, defaultBranch);
        if (typeof hljs !== 'undefined') {
            document.querySelectorAll('.readme-modal-body pre code').forEach(block => {
                hljs.highlightElement(block);
            });
        }
    } catch (error) {
        readmeContainer.innerHTML = `
              <div class="readme-modal-overlay" onclick="ToggleReadMe('${repoName}')">
              <div class="readme-modal-content" onclick="event.stopPropagation()">
                  <div class="readme-modal-body">
                      <p>Could not load README.md for ${repoName}</p>
                      <p>${error.message}</p>
                  </div>
                  </div>
              </div>
            `;
        readmeContainer.style.display = 'none';
    }
}

// Convert relative URLs to absolute URLs with correct branch
function convertRelativeUrls(markdown, fullName, defaultBranch = 'main') {
    // Images: ![alt text](relative/path)
    markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, altText, path) => {
        if (!path.startsWith('http') && !path.startsWith('data:')) {
            if (path.startsWith('/')) {
                path = `https://raw.githubusercontent.com/${fullName}/${defaultBranch}${path}`;
            } else {
                path = `https://raw.githubusercontent.com/${fullName}/${defaultBranch}/${path}`;
            }
        }
        return `![${altText}](${path})`;
    });
    // Links: [text](relative/path)
    markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, path) => {
        if (!path.startsWith('http') && !path.startsWith('#') && !path.startsWith('mailto:')) {
            if (path.startsWith('/')) {
                path = `https://github.com/${fullName}/blob/${defaultBranch}${path}`;
            } else {
                path = `https://github.com/${fullName}/blob/${defaultBranch}/${path}`;
            }
        }
        return `[${text}](${path})`;
    });
    return markdown;
}

// Process images and links in HTML
function processImagesAndLinks(container, fullName, defaultBranch = 'main') {
    // Images
    container.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
            const absoluteSrc = src.startsWith('/') 
                ? `https://raw.githubusercontent.com/${fullName}/${defaultBranch}${src}`
                : `https://raw.githubusercontent.com/${fullName}/${defaultBranch}/${src}`;
            img.setAttribute('src', absoluteSrc);
        }
    });
    // Links
    container.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
            const absoluteHref = href.startsWith('/')
                ? `https://github.com/${fullName}/blob/${defaultBranch}${href}`
                : `https://github.com/${fullName}/blob/${defaultBranch}/${href}`;
            a.setAttribute('href', absoluteHref);
            a.setAttribute('target', '_blank');
        }
    });
}

// 1. Theme Management
function detectSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateChartColors();
}

function toggleTheme() {
    const current = localStorage.getItem('theme') || detectSystemTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function updateChartColors() {
    const textColor = getComputedStyle(document.body).getPropertyValue('--text-color');
    const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color');
    // Get all active charts from the Chart instances
    Object.keys(Chart.instances).forEach(key => {
        const chart = Chart.instances[key];
        if (chart && !chart._destroyed) {
            chart.options.scales.x.ticks.color = textColor;
            chart.options.scales.y.ticks.color = textColor;
            chart.options.scales.x.grid.color = `${textColor}10`;
            chart.options.scales.y.grid.color = `${textColor}20`;
            chart.data.datasets[0].borderColor = primaryColor;
            chart.data.datasets[0].backgroundColor = `${primaryColor}20`;
            chart.update();
        }
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = detectSystemTheme();
    setTheme(savedTheme || systemTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// 2. Language Management - Default is English
const translations = {
    en: {
        title: "GitHub Repository Traffic Stats",
        loadingAuth: "Checking GitHub session...",
        loadingRepos: (loaded) => `Loading repository list (${loaded} loaded)...`,
        totalRepos: (count) => `Total repositories: ${count}`,
        perPage: `Repositories per page:
                    <select id="per-page">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>`,
        pageStats: (current, total, count) => `Page ${current}/${total} | Total ${count} repos`,
        repoHeader: (name) => `<span class="repo-name">${name}</span> repository`,
        views: "Views",
        clones: "Clones",
        errorAuth: "Please log in to GitHub",
        errorApiLimit: "API rate limit exceeded, try again later",
        errorLoadingRepos: "Failed to load repository list",
        noData: "No data available",
        errorLoadingData: "Error loading data",
        infoBox: `
                    <h3>🚀 View Your GitHub Traffic Stats</h3>
                    <p>This page shows traffic stats only for the <strong>forking user's</strong> repositories.</p>
                    <ol>
                        <li>Click "Fork" button to copy this repo to your account</li>
                        <li>Enable GitHub Pages for the <code>docs</code> folder</li>
                        <li>You'll see your own repository traffic stats</li>
                    </ol>
                `,
        previousPage: '&laquo; Previous',
        nextPage: 'Next &raquo;',
        timeRange: `Time Range:
                    <select id="time-range">
                        <option value="1d">Last Day</option>
                        <option value="7d">Last Week</option>
                        <option value="30d">Last Month</option>
                        <option value="90d">Last 3 Months</option>
                        <option value="180d">Last 6 Months</option>
                        <option value="365d">Last Year</option>
                        <option value="all">All Time</option>
                    </select>`
    },
    tr: {
        title: "GitHub Depo Trafik Verileri",
        loadingAuth: "GitHub oturumunuz kontrol ediliyor...",
        loadingRepos: (loaded) => `Depo listesi alınıyor (${loaded} yüklendi)...`,
        totalRepos: (count) => `Toplam depo: ${count}`,
        perPage: `Sayfa başına depo sayısı:
                    <select id="per-page">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>`,
        pageStats: (current, total, count) => `Sayfa ${current}/${total} | Toplam ${count} depo`,
        repoHeader: (name) => `<span class="repo-name">${name}</span> deposu`,
        views: "Görüntülenmeler",
        clones: "Klonlamalar",
        errorAuth: "Lütfen GitHub'da oturum açın",
        errorApiLimit: "API limiti aşıldı, birkaç dakika sonra tekrar deneyin",
        errorLoadingRepos: "Depo listesi yüklenemedi",
        noData: "Veri bulunamadı",
        errorLoadingData: "Veri yüklenirken hata oluştu",
        infoBox: `
                    <h3>🚀 Kendi GitHub Trafik Verilerinizi Görün</h3>
                    <p>Bu sayfa sadece <strong>fork yapan kullanıcının</strong> kendi depo trafik verilerini gösterir.</p>
                    <ol>
                        <li>Sağ üstteki "Fork" butonuna basarak bu depoyu kendi hesabınıza kopyalayın</li>
                        <li>GitHub Pages ayarlarından <code>docs</code> klasörünü yayına alın</li>
                        <li>Oluşan sayfada <strong>kendi depo trafik verileriniz</strong> görünecektir</li>
                    </ol>
                `,
        previousPage: '&laquo; Önceki',
        nextPage: 'Sonraki &raquo;',
        timeRange: `Zaman Aralığı:
                    <select id="time-range">
                        <option value="1d">Son 1 Gün</option>
                        <option value="7d">Son 1 Hafta</option>
                        <option value="30d">Son 1 Ay</option>
                        <option value="90d">Son 3 Ay</option>
                        <option value="180d">Son 6 Ay</option>
                        <option value="365d">Son 1 Yıl</option>
                        <option value="all">Tüm Zamanlar</option>
                    </select>`
    }
};

let lang = localStorage.getItem('lang') || 'en'; // Default is English

function updateAllTranslations() {
    document.querySelector('[data-translate="title"]').textContent = translations[lang].title;
    
    // Save current values before updating HTML
    const currentTimeRange = document.getElementById('time-range')?.value || '30d';
    const currentPerPage = document.getElementById('per-page')?.value || '25';
    
    // Update time range selector HTML
    document.querySelector('[data-translate="timeRange"]').innerHTML = translations[lang].timeRange;
    
    // Restore selected value for time range
    const timeRangeSelector = document.getElementById('time-range');
    if (timeRangeSelector) {
        timeRangeSelector.value = currentTimeRange;
        // Re-attach event listener
        timeRangeSelector.removeEventListener('change', handleTimeRangeChange);
        timeRangeSelector.addEventListener('change', handleTimeRangeChange);
    }
    
    // Update per page selector HTML
    document.querySelector('[data-translate="perPage"]').innerHTML = translations[lang].perPage;
    
    // Restore selected value for per page
    const perPageSelector = document.getElementById('per-page');
    if (perPageSelector) {
        perPageSelector.value = currentPerPage;
        // Re-attach event listener
        perPageSelector.removeEventListener('change', handlePerPageChange);
        perPageSelector.addEventListener('change', handlePerPageChange);
    }
    
    if (document.getElementById('loading')) {
        document.getElementById('loading').textContent = translations[lang].loadingAuth;
    }
    
    const pagination = document.getElementById('pagination');
    if (pagination) {
        const prevBtn = pagination.querySelector('button:first-child');
        const nextBtn = pagination.querySelector('button:last-child');
        if (prevBtn) prevBtn.innerHTML = translations[lang].previousPage;
        if (nextBtn) nextBtn.innerHTML = translations[lang].nextPage;
    }
}

// Event handler functions
function handleTimeRangeChange(e) {
    console.log('Time range changed to:', e.target.value);
    currentPage = 1; // Reset to first page
    displayRepos();
}

function handlePerPageChange(e) {
    console.log('Per page changed to:', e.target.value);
    reposPerPage = parseInt(e.target.value) || 25;
    currentPage = 1; // Reset to first page
    displayRepos();
}

function mergeDuplicateDates(data) {
    const merged = {};

    data.forEach(item => {
        const fixedTimestamp = fixTimestamp(item.timestamp);
        const dateKey = fixedTimestamp.split('T')[0];

        if (!merged[dateKey]) {
            merged[dateKey] = { ...item, timestamp: fixedTimestamp };
        } else {
            merged[dateKey].count += item.count;
            merged[dateKey].uniques += item.uniques;
        }
    });

    return Object.values(merged);
}

function changeLanguage(newLang) {
    lang = newLang;
    localStorage.setItem('lang', lang);
    updateAllTranslations();
    document.getElementById('charts-container').innerHTML = '';
    currentPage = 1; // Reset to first page
    displayRepos();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });
}

// 3. Data Management
let allRepos = [];
let currentPage = 1;
let reposPerPage = 25;
let totalPages = 1;

function getBasePath() {
    if (window.location.host.includes('github.io')) {
        const pathParts = window.location.pathname.split('/');
        return pathParts.slice(0, 3).join('/');
    }
    return '';
}

async function fetchTrafficData(repoName) {
    try {
        const basePath = getBasePath();
        const [viewsRes, clonesRes] = await Promise.all([
            fetch(`${basePath}/data/repos/${encodeURIComponent(repoName)}/views.json`),
            fetch(`${basePath}/data/repos/${encodeURIComponent(repoName)}/clones.json`)
        ]);
        
        let views = { views: [] };
        let clones = { clones: [] };
        
        if (viewsRes.ok) {
            views = await viewsRes.json();
            if (!views.views) views.views = [];
        }
        
        if (clonesRes.ok) {
            clones = await clonesRes.json();
            if (!clones.clones) clones.clones = [];
        }

        // Merge duplicate dates
        views.views = mergeDuplicateDates(views.views);
        clones.clones = mergeDuplicateDates(clones.clones);
        
        const trafficData = {
            views: views,
            clones: clones
        };
        
        if (!validateTrafficData(trafficData)) {
            console.warn(`Invalid data structure for ${repoName}`);
            return {
                views: { views: [], count: 0, uniques: 0 },
                clones: { clones: [], count: 0, uniques: 0 }
            };
        }
        return trafficData;
    } catch (error) {
        console.error(`Error loading traffic data for ${repoName}:`, error);
        return {
            views: { views: [], count: 0, uniques: 0 },
            clones: { clones: [], count: 0, uniques: 0 }
        };
    }
}

async function fetchUserData() {
    return {
        login: "auto-generated"
    };
}

async function fetchAllRepos() {
    try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}/data/repo-info.json`);
        if (!response.ok) {
            const absoluteUrl = `https://${window.location.host}${basePath}/data/repo-info.json`;
            const fallbackResponse = await fetch(absoluteUrl);
            if (!fallbackResponse.ok) throw new Error('Repository list not found');
            return await fallbackResponse.json();
        }
        const data = await response.json();
        
        // Backward compatibility: if data is array, convert to object with repositories property
        if (Array.isArray(data)) {
            return { repositories: data };
        }
        
        // Ensure each repo has default_branch and homepage for backward compatibility
        if (data.repositories) {
            data.repositories = data.repositories.map(repo => ({
                ...repo,
                default_branch: repo.default_branch || 'main',
                homepage: repo.homepage || ''
            }));
        }
        
        return data;
    } catch (error) {
        console.error('Error loading repositories:', error);
        showInfoBox();
        return {
            repositories: []
        };
    }
}

function validateTrafficData(data) {
    if (!data) return false;
    if (data.views && !Array.isArray(data.views.views)) return false;
    if (data.clones && !Array.isArray(data.clones.clones)) return false;
    return true;
}

function fixTimestamp(timestamp) {
    if (typeof timestamp !== 'string') return '1970-01-01T00:00:00Z';
    return timestamp.replace(' Above', '');
}

function safeDateParse(timestamp) {
    const fixed = fixTimestamp(timestamp);
    const date = new Date(fixed);

    if (isNaN(date.getTime())) {
        console.warn('Invalid date detected, using fallback:', timestamp);
        const datePart = fixed.split('T')[0] || '1970-01-01';
        return new Date(`${datePart}T00:00:00Z`);
    }

    return date;
}

function formatDate(isoString) {
    try {
        const date = safeDateParse(isoString);
        return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        console.error('Date formatting error:', e);
        return 'Invalid Date';
    }
}

function fillMissingDates(data, range) {
    if (!data || data.length === 0) return [];

    const dateMap = new Map();

    data.forEach(item => {
        const fixedTimestamp = fixTimestamp(item.timestamp);
        const date = safeDateParse(fixedTimestamp);
        const dateKey = date.toISOString().split('T')[0];

        dateMap.set(dateKey, {
            ...item,
            timestamp: fixedTimestamp
        });
    });

    const sortedDates = Array.from(dateMap.keys()).sort();
    if (sortedDates.length === 0) return [];

    const startDate = safeDateParse(sortedDates[0]);
    const endDate = safeDateParse(sortedDates[sortedDates.length - 1]);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (!dateMap.has(dateStr)) {
            dateMap.set(dateStr, {
                timestamp: `${dateStr}T00:00:00Z`,
                count: 0,
                uniques: 0
            });
        }
    }

    return Array.from(dateMap.values()).sort((a, b) => {
        return safeDateParse(a.timestamp) - safeDateParse(b.timestamp);
    });
}

// 4. Chart Management
function createChart(canvasId, label, data, labels, total) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    if (data.length === 0) {
        ctx.parentElement.innerHTML = `<p>${translations[lang].noData}</p>`;
        return;
    }
    const textColor = getComputedStyle(document.body).getPropertyValue('--text-color');
    const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${label} (Total: ${total || 0})`,
                data: data,
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}20`,
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor
                    },
                    grid: {
                        color: `${textColor}20`
                    }
                },
                x: {
                    ticks: {
                        color: textColor,
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        color: `${textColor}10`
                    }
                }
            }
        }
    });
}

// 5. UI Management
function showError(messageKey) {
    const messages = {
        'Please log in to GitHub': translations[lang].errorAuth,
        'API rate limit exceeded, try again later': translations[lang].errorApiLimit,
        'Failed to load repository list': translations[lang].errorLoadingRepos,
        'Error loading data': translations[lang].errorLoadingData
    };
    const message = messages[messageKey] || messageKey;
    const container = document.getElementById('charts-container');
    container.innerHTML = `<div class="error">${message}</div>`;
}

function showInfoBox() {
    const info = `
                <div class="info-box">
                    ${translations[lang].infoBox}
                </div>
            `;
    document.getElementById('info-container').innerHTML = info;
}

function setupPagination(totalRepos, reposPerPage) {
    totalPages = Math.ceil(totalRepos / reposPerPage);
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    if (totalPages <= 1) return;
    
    const prevButton = document.createElement('button');
    prevButton.innerHTML = translations[lang].previousPage;
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayRepos();
        }
    });
    paginationDiv.appendChild(prevButton);
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayRepos();
        });
        paginationDiv.appendChild(pageButton);
    }
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = translations[lang].nextPage;
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayRepos();
        }
    });
    paginationDiv.appendChild(nextButton);
    paginationDiv.style.display = 'flex';
}

function filterDataByDateRange(data, range) {
    if (!data || data.length === 0) return [];
    if (range === 'all') return data;

    const days = parseInt(range.replace('d', '')) || 30;
    const cutoffDate = new Date();

    cutoffDate.setUTCHours(0, 0, 0, 0);
    cutoffDate.setUTCDate(cutoffDate.getUTCDate() - days);

    return data.filter(item => {
        if (!item || !item.timestamp) return false;

        const fixedTimestamp = fixTimestamp(item.timestamp);
        const itemDate = safeDateParse(fixedTimestamp);
        itemDate.setUTCHours(0, 0, 0, 0);

        return itemDate >= cutoffDate;
    });
}

// 6. Main Functions
async function displayRepos() {
    if (!allRepos || !allRepos.repositories) {
        showError(translations[lang].errorLoadingRepos);
        return;
    }
    
    const timeRangeSelector = document.getElementById('time-range');
    const perPageSelector = document.getElementById('per-page');
    
    const selectedRange = timeRangeSelector ? timeRangeSelector.value : '30d';
    reposPerPage = perPageSelector ? parseInt(perPageSelector.value) || 25 : 25;
    
    const startIdx = (currentPage - 1) * reposPerPage;
    const endIdx = startIdx + reposPerPage;
    const reposToShow = allRepos.repositories.slice(startIdx, endIdx);
    const totalPages = Math.ceil(allRepos.repositories.length / reposPerPage);
    
    document.getElementById('charts-container').innerHTML = '';
    document.getElementById('loading').textContent = translations[lang].loadingRepos(0);
    
    const showElementIfExists = (id) => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block';
    };
    
    showElementIfExists('per-page-container');
    showElementIfExists('time-range-container');
    
    let loadedCount = 0;
    for (const repo of reposToShow) {
        document.getElementById('loading').textContent = translations[lang].loadingRepos(++loadedCount);
        
        const defaultBranch = repo.default_branch || 'main';
        const homepage = repo.homepage || '';
        
        const trafficData = await fetchTrafficData(repo.name);
        const filteredViews = filterDataByDateRange(trafficData.views.views, selectedRange);
        const filteredClones = filterDataByDateRange(trafficData.clones.clones, selectedRange);
        const completeViews = fillMissingDates(filteredViews, selectedRange);
        const completeClones = fillMissingDates(filteredClones, selectedRange);
        
        const container = document.createElement('div');
        container.className = 'chart-box';
        
        let headerLinks = `
            <a href="https://github.com/${repo.full_name}" target="_blank">🔗 ${translations[lang].repoHeader(repo.name)}</a> | 
            <a href="https://github.com/${repo.full_name}/zipball/${defaultBranch}" target="_top">zip⬇</a> | 
            <a href="https://github.com/${repo.full_name}/tarball/${defaultBranch}" target="_top">tar⬇</a> | 
            <a href="https://github.com/${repo.full_name}/fork" target="_blank">fork🖈</a> | 
            <a onclick="ToggleReadMe('${repo.name}', '${repo.full_name}')" id="toggle-${repo.name}">README.md+</a>
        `;
        
        if (homepage) {
            headerLinks += ` | <a href="${homepage}" target="_blank">🌐 website</a>`;
        }
        
        container.innerHTML = `
            <h3>${headerLinks}</h3>
            <div id="readme-${repo.name}" style="display:none;"></div>
            <div class="stats-summary">
                <div class="stat-item">
                    <span class="stat-label">${translations[lang].views}:</span>
                    <span class="stat-value">${trafficData.views.count || 0}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">${translations[lang].clones}:</span>
                    <span class="stat-value">${trafficData.clones.count || 0}</span>
                </div>
            </div>
            <div class="chart-row">
                <div class="chart-container">
                    <canvas id="views-${repo.name}"></canvas>
                </div>
                <div class="chart-container">
                    <canvas id="clones-${repo.name}"></canvas>
                </div>
            </div>
        `;
        document.getElementById('charts-container').appendChild(container);
        
        fetchAndDisplayReadme(repo);
        
        createChart(`views-${repo.name}`, translations[lang].views, 
                   completeViews.map(v => v.count), 
                   completeViews.map(v => formatDate(v.timestamp)), 
                   trafficData.views.count);
        createChart(`clones-${repo.name}`, translations[lang].clones, 
                   completeClones.map(c => c.count), 
                   completeClones.map(c => formatDate(c.timestamp)), 
                   trafficData.clones.count);
    }
    
    const paginationDiv = document.getElementById('pagination');
    if (paginationDiv) {
        paginationDiv.style.display = 'flex';
        document.getElementById('loading').textContent = translations[lang].pageStats(currentPage, totalPages, allRepos.repositories.length);
        setupPagination(allRepos.repositories.length, reposPerPage);
    }
}

async function main() {
    try {
        initTheme();
        
        const savedLang = localStorage.getItem('lang');
        lang = savedLang || 'en';
        
        updateAllTranslations();
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
        });
        
        allRepos = await fetchAllRepos();
        if (!allRepos.repositories || allRepos.repositories.length === 0) {
            showInfoBox();
            return;
        }
        displayRepos();
    } catch (error) {
        console.error('Main function error:', error);
        showError(translations[lang].errorLoadingData);
    }
}

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    // Initialize language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });
    
    // Setup time range selector with fresh event listener
    const timeRangeSelector = document.getElementById('time-range');
    if (timeRangeSelector) {
        const newTimeRangeSelector = timeRangeSelector.cloneNode(true);
        timeRangeSelector.parentNode.replaceChild(newTimeRangeSelector, timeRangeSelector);
        newTimeRangeSelector.addEventListener('change', handleTimeRangeChange);
    }
    
    // Setup per page selector with fresh event listener
    const perPageSelector = document.getElementById('per-page');
    if (perPageSelector) {
        const newPerPageSelector = perPageSelector.cloneNode(true);
        perPageSelector.parentNode.replaceChild(newPerPageSelector, perPageSelector);
        newPerPageSelector.addEventListener('change', handlePerPageChange);
    }
    
    // Start the main application
    main();
});
