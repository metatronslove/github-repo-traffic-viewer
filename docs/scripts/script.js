/**
 * Converts GitHub-flavored Markdown to HTML
 * @param {string} markdown - The markdown text to convert
 * @returns {string} - HTML string
 */
function githubMarkdownToHtml(markdown) {
	// Create a container div to hold our rendered HTML
	const container = document.createElement('div');
	// Use marked.js library with GitHub Flavored Markdown (GFM) options
	// You'll need to include marked.js in your project:
	// https://cdn.jsdelivr.net/npm/marked/marked.min.js
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
		const id = header.textContent.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-') // Chinese character support
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
async function fetchAndDisplayReadme(repoName, fullName) {
	const readmeContainer = document.getElementById(`readme-${repoName}`);
	try {
		const response = await fetch(`https://raw.githubusercontent.com/${fullName}/main/README.md`);
		if (!response.ok) throw new Error(`Failed to fetch README: ${response.status}`);
		let markdown = await response.text();
		// Resim ve bağlantıları mutlak URL'ye dönüştür
		markdown = convertRelativeUrls(markdown, fullName);
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
		// Dinamik içerik yüklendikten sonra resimleri ve bağlantıları işle
		processImagesAndLinks(readmeContainer, fullName);
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
// Göreceli URL'leri mutlak URL'lere dönüştür
function convertRelativeUrls(markdown, fullName) {
	// Resimler için ![alt text](relative/path)
	markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, altText, path) => {
		if (!path.startsWith('http') && !path.startsWith('data:')) {
			if (path.startsWith('/')) {
				path = `https://raw.githubusercontent.com/${fullName}/main${path}`;
			} else {
				path = `https://raw.githubusercontent.com/${fullName}/main/${path}`;
			}
		}
		return `![${altText}](${path})`;
	});
	// Bağlantılar için [text](relative/path)
	markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, path) => {
		if (!path.startsWith('http') && !path.startsWith('#') && !path.startsWith('mailto:')) {
			if (path.startsWith('/')) {
				path = `https://github.com/${fullName}/blob/main${path}`;
			} else {
				path = `https://github.com/${fullName}/blob/main/${path}`;
			}
		}
		return `[${text}](${path})`;
	});
	return markdown;
}
// HTML'deki resim ve bağlantıları işle
function processImagesAndLinks(container, fullName) {
	// Resimler için
	container.querySelectorAll('img').forEach(img => {
		const src = img.getAttribute('src');
		if (src && !src.startsWith('http') && !src.startsWith('data:')) {
			const absoluteSrc = src.startsWith('/') ? `https://raw.githubusercontent.com/${fullName}/main${src}` : `https://raw.githubusercontent.com/${fullName}/main/${src}`;
			img.setAttribute('src', absoluteSrc);
		}
	});
	// Bağlantılar için
	container.querySelectorAll('a').forEach(a => {
		const href = a.getAttribute('href');
		if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
			const absoluteHref = href.startsWith('/') ? `https://github.com/${fullName}/blob/main${href}` : `https://github.com/${fullName}/blob/main/${href}`;
			a.setAttribute('href', absoluteHref);
			a.setAttribute('target', '_blank'); // Yeni sekmede aç
		}
	});
}
// 1. Tema Yönetimi
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
// 2. Dil Yönetimi
const translations = {
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
                    </select>
                        `,
		pageStats: (current, total, count) => `Sayfa ${current}/${total} | Toplam ${count} depo`,
		repoHeader: (name) => `<span class="repo-name">${name}</span> deposu`,
		views: "Görüntülenmeler",
		clones: "Klonlamalar",
		errorAuth: "Lütfen GitHub'da oturum açın",
		errorApiLimit: "API limiti aşıldı, birkaç dakika sonra tekrar deneyin",
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
                    </select>
                    `
	},
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
                    </select>
            `,
		pageStats: (current, total, count) => `Page ${current}/${total} | Total ${count} repos`,
		repoHeader: (name) => `<span class="repo-name">${name}</span> repository`,
		views: "Views",
		clones: "Clones",
		errorAuth: "Please log in to GitHub",
		errorApiLimit: "API rate limit exceeded, try again later",
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
                    </select>
                    `
	}
};
translations.tr.errorLoadingRepos = "Depo listesi yüklenemedi";
translations.en.errorLoadingRepos = "Failed to load repository list";
translations.tr.noData = "Veri bulunamadı";
translations.en.noData = "No data available";
translations.tr.errorLoadingData = "Veri yüklenirken hata oluştu";
translations.en.errorLoadingData = "Error loading data";
let currentLang = localStorage.getItem('lang') || 'tr';

function updateAllTranslations() {
	document.querySelector('[data-translate="title"]').textContent = translations[currentLang].title;
	let TimeRangesPreviousValue = String(document.getElementById('time-range').value);
	document.querySelector('[data-translate="timeRange"]').innerHTML = translations[currentLang].timeRange;
	let timeRangechoices = ['1d', '7d', '30d', '90d', '180d', '365d', 'all'];
	for (let d = 0; d < timeRangechoices.length; d += 1) {
		const option = document.getElementById('time-range').querySelector(`option[value='${timeRangechoices[d]}']`);
		if (option) {
			if (option.hasAttribute('selected') || option.selected) {
				option.removeAttribute('selected');
				option.selected = false;
			}
		}
	}
	let timeRangeoptionToSelect = document.getElementById('time-range').querySelector(`option[value='${TimeRangesPreviousValue}']`);
	if (timeRangeoptionToSelect) {
		timeRangeoptionToSelect.setAttribute('selected', 'selected');
	}
	let PerPagePreviousValue = String(document.getElementById('per-page').value);
	document.querySelector('[data-translate="perPage"]').innerHTML = translations[currentLang].perPage;
	let perPagechoices = ['10', '25', '50', '100'];
	for (let d = 0; d < perPagechoices.length; d += 1) {
		const option = document.getElementById('per-page').querySelector(`option[value='${perPagechoices[d]}']`);
		if (option) {
			if (option.hasAttribute('selected') || option.selected) {
				option.removeAttribute('selected');
				option.selected = false;
			}
		}
	}
	let optionToSelect = document.getElementById('per-page').querySelector(`option[value='${PerPagePreviousValue}']`);
	if (optionToSelect) {
		optionToSelect.setAttribute('selected', 'selected');
	}
	if (document.getElementById('loading')) {
		document.getElementById('loading').textContent = translations[currentLang].loadingAuth;
	}
	const pagination = document.getElementById('pagination');
	if (pagination) {
		const prevBtn = pagination.querySelector('button:first-child');
		const nextBtn = pagination.querySelector('button:last-child');
		if (prevBtn) prevBtn.innerHTML = translations[currentLang].previousPage;
		if (nextBtn) nextBtn.innerHTML = translations[currentLang].nextPage;
	}
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

function changeLanguage(lang) {
	currentLang = lang;
	localStorage.setItem('lang', lang);
	updateAllTranslations();
	document.getElementById('charts-container').innerHTML = '';
	displayRepos();
	document.querySelectorAll('.lang-btn').forEach(btn => {
		btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
	});
}
// 3. Veri Yönetimi
let allRepos = [];
let currentPage = 1;
let reposPerPage = document.getElementById('per-page').value;
let totalPages = Math.ceil(allRepos.length / reposPerPage);

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
		if (!viewsRes.ok) {
			console.warn(`Views data not found for ${repoName}`);
			return {
				views: {
					views: []
				}
			};
		}
		if (!clonesRes.ok) {
			console.warn(`Clones data not found for ${repoName}`);
			return {
				clones: {
					clones: []
				}
			};
		}
		const views = await viewsRes.json();
		const clones = await clonesRes.json();

		// YENİ EKLENEN KOD: Verileri birleştir ve işle
		views.views = mergeDuplicateDates(views.views);
		clones.clones = mergeDuplicateDates(clones.clones);
		const trafficData = {
			views: views || {
				views: []
			},
			clones: clones || {
				clones: []
			}
		};
		if (!validateTrafficData(trafficData)) {
			throw new Error('Invalid data structure');
		}
		return trafficData;
	} catch (error) {
		console.error(`Error loading traffic data for ${repoName}:`, error);
		return {
			views: {
				views: []
			},
			clones: {
				clones: []
			}
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
		return Array.isArray(data) ? {
			repositories: data
		} : data;
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

function safeDateParse(timestamp) {
  try {
    const fixedTimestamp = fixTimestamp(timestamp);
    const date = new Date(fixedTimestamp);

    // Geçersiz tarih kontrolü
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', timestamp);
      return new Date(); // Varsayılan olarak bugünün tarihini döndür
    }

    return date;
  } catch (e) {
    console.error('Date parse error:', e);
    return new Date(); // Varsayılan olarak bugünün tarihini döndür
  }
}

function fixTimestamp(timestamp) {
  // "Above" içeren tarihleri düzelt (örn: "2025-04-24T Above:00:00Z" -> "2025-04-24T00:00:00Z")
  if (timestamp.includes("Above")) {
    return timestamp.replace(" Above", "");
  }

  // ISO formatına uymayan diğer tarihler için düzeltme
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(timestamp)) {
    const datePart = timestamp.split('T')[0];
    return `${datePart}T00:00:00Z`; // Varsayılan saat bilgisi ekle
  }

  return timestamp;
}

function formatDate(isoString) {
  try {
    const date = safeDateParse(isoString);
    return date.toLocaleDateString(currentLang, {
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

  // Tüm verileri işle ve geçersiz tarihleri düzelt
  data.forEach(item => {
    const fixedTimestamp = fixTimestamp(item.timestamp);
    const date = safeDateParse(fixedTimestamp);
    const dateKey = date.toISOString().split('T')[0];

    dateMap.set(dateKey, {
      ...item,
      timestamp: fixedTimestamp
    });
  });

  // Tarih aralığını belirle
  const sortedDates = Array.from(dateMap.keys()).sort();
  if (sortedDates.length === 0) return [];

  const startDate = safeDateParse(sortedDates[0]);
  const endDate = safeDateParse(sortedDates[sortedDates.length - 1]);

  // Eksik tarihleri doldur
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

  // Sıralı ve doldurulmuş veriyi döndür
  return Array.from(dateMap.values()).sort((a, b) => {
    return safeDateParse(a.timestamp) - safeDateParse(b.timestamp);
  });
}
// 4. Grafik Yönetimi
function createChart(canvasId, label, data, labels, total) {
	const ctx = document.getElementById(canvasId);
	if (!ctx) return;
	if (data.length === 0) {
		ctx.parentElement.innerHTML = `<p>${translations[currentLang].noData}</p>`;
		return;
	}
	const textColor = getComputedStyle(document.body).getPropertyValue('--text-color');
	const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color');
	return new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				label: `${label} (Toplam: ${total || 0})`,
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
// 5. UI Yönetimi
function showError(messageKey) {
	const messages = {
		'Lütfen GitHub\'da oturum açın': translations[currentLang].errorAuth,
		'API limiti aşıldı, birkaç dakika sonra tekrar deneyin': translations[currentLang].errorApiLimit
	};
	const message = messages[messageKey] || messageKey;
	const container = document.getElementById('charts-container');
	container.innerHTML = `<div class="error">${message}</div>`;
}

function showInfoBox() {
	const info = `
                <div class="info-box">
                    ${translations[currentLang].infoBox}
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
	prevButton.innerHTML = translations[currentLang].previousPage;
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
	nextButton.innerHTML = translations[currentLang].nextPage;
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
  if (range === 'all') return data;

  const days = parseInt(range) || 30;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return data.filter(item => {
    const fixedTimestamp = fixTimestamp(item.timestamp);
    const itemDate = new Date(fixedTimestamp);
    return itemDate >= cutoffDate;
  });
}
// 6. Ana İşlevler
async function displayRepos() {
	if (!allRepos || !allRepos.repositories) {
		showError(translations[currentLang].errorLoadingRepos);
		return;
	}
	// Safe way to get time range value with fallback
	const getTimeRangeValue = () => {
		const selector = document.getElementById('time-range');
		return selector ? selector.value : '30d'; // Default to '30d' if not found
	};
	const selectedRange = getTimeRangeValue();
	const startIdx = (currentPage - 1) * reposPerPage;
	const endIdx = startIdx + reposPerPage;
	const reposToShow = allRepos.repositories.slice(startIdx, endIdx);
	const totalPages = Math.ceil(allRepos.repositories.length / document.getElementById('per-page').value);
	document.getElementById('charts-container').innerHTML = '';
	document.getElementById('loading').textContent = translations[currentLang].loadingRepos(0);
	// Safely show UI elements if they exist
	const showElementIfExists = (id) => {
		const el = document.getElementById(id);
		el.style.display = 'block';
	};
	showElementIfExists('per-page-container');
	// Initialize per-page selector
	if (document.getElementById('per-page')) {
		document.getElementById('per-page').addEventListener('change', (e) => {
			reposPerPage = parseInt(e.target.value) || 25;
			currentPage = 1;
			displayRepos();
		});
	} else {
		console.warn('Per page selector not found');
	}
	showElementIfExists('time-range-container');
	// Initialize time range selector
	if (document.getElementById('time-range')) {
		document.getElementById('time-range').addEventListener('change', displayRepos);
	} else {
		console.warn('Time range selector not found');
	}
	let loadedCount = 0;
	for (const repo of reposToShow) {
		document.getElementById('loading').textContent = translations[currentLang].loadingRepos(++loadedCount);
		const trafficData = await fetchTrafficData(repo.name);
		const filteredViews = filterDataByDateRange(trafficData.views.views, selectedRange);
		const filteredClones = filterDataByDateRange(trafficData.clones.clones, selectedRange);
		const completeViews = fillMissingDates(filteredViews, selectedRange);
		const completeClones = fillMissingDates(filteredClones, selectedRange);
		const container = document.createElement('div');
		container.className = 'chart-box';
		container.innerHTML = `
                    <h3><a href="https://github.com/${repo.full_name}" target="_blank">🔗 ${translations[currentLang].repoHeader(repo.name)}</a> | <a href="https://github.com/${repo.full_name}/zipball/main" target="_top">zip⬇</a> | <a href="https://github.com/${repo.full_name}/tarball/main" target="_top">tar⬇</a> | <a href="https://github.com/${repo.full_name}/fork" target="_blank">fork🖈</a> | <a onclick="ToggleReadMe('${repo.name}', '${repo.full_name}')" id="toggle-${repo.name}">README.md+</a></h3>
                    <div id="readme-${repo.name}" style="display:none;"></div>
                    <div class="stats-summary">
                        <div class="stat-item">
                            <span class="stat-label">${translations[currentLang].views}:</span>
                            <span class="stat-value">${trafficData.views.count || 0}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">${translations[currentLang].clones}:</span>
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
		fetchAndDisplayReadme(repo.name, repo.full_name);
		createChart(`views-${repo.name}`, translations[currentLang].views, completeViews.map(v => v.count), completeViews.map(v => formatDate(v.timestamp)), trafficData.views.count);
		createChart(`clones-${repo.name}`, translations[currentLang].clones, completeClones.map(c => c.count), completeClones.map(c => formatDate(c.timestamp)), trafficData.clones.count);
	}
	document.getElementById('pagination').style.display = 'flex';
	document.getElementById('loading').textContent = translations[currentLang].pageStats(currentPage, totalPages, allRepos.repositories.length);
	setupPagination(allRepos.repositories.length, document.getElementById('per-page').value);
}
async function main() {
	try {
		initTheme();
		updateAllTranslations();
		allRepos = await fetchAllRepos();
		if (!allRepos.repositories || allRepos.repositories.length === 0) {
			showInfoBox();
			return;
		}
		displayRepos();
	} catch (error) {
		console.error('Main function error:', error);
		showError(translations[currentLang].errorLoadingData);
	}
}
// Başlatma
window.addEventListener('DOMContentLoaded', () => {
	// Initialize language buttons
	document.querySelectorAll('.lang-btn').forEach(btn => {
		btn.classList.toggle('active', btn.textContent === currentLang.toUpperCase());
	});
	// Initialize time range selector
	if (document.getElementById('time-range')) {
		document.getElementById('time-range').addEventListener('change', displayRepos);
	} else {
		console.warn('Time range selector not found');
	}
	// Initialize per-page selector
	if (document.getElementById('per-page')) {
		document.getElementById('per-page').addEventListener('change', (e) => {
			reposPerPage = parseInt(e.target.value) || 25;
			currentPage = 1;
			displayRepos();
		});
	} else {
		console.warn('Per page selector not found');
	}
	// Start the main application
	main();
});
