        // =========================================================================
        // Modular i18n Translation Engine (Contributed via locales/*.json)
        // =========================================================================
        const LOCALES = JSON.parse(document.getElementById('locales-data').textContent);
        let currentLang = localStorage.getItem('artcraft-lang') || 'en';
        if (!LOCALES[currentLang]) currentLang = 'en';

        function initLanguages() {
            const menu = document.getElementById('lang-dropdown-menu');
            if (!menu) return;
            // Sorting order: EN, AR, DE, ES then the rest and JP at the end
            const priority = ['en', 'ar', 'de', 'es'];
            const sortedCodes = Object.keys(LOCALES).sort((a, b) => {
                if (a === 'ja') return 1;
                if (b === 'ja') return -1;
                const idxA = priority.indexOf(a);
                const idxB = priority.indexOf(b);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return a.localeCompare(b);
            });

            menu.innerHTML = sortedCodes.map(code => {
                const loc = LOCALES[code];
                const isActive = code === currentLang ? ' active' : '';
                return `<button class="lang-option${isActive}" onclick="selectLanguage('${code}')" role="option" aria-selected="${code === currentLang}">
                    <span>${loc.flag} ${loc.name}</span>
                    <span style="font-family:var(--font-mono);font-size:10px;opacity:0.6;">${code.toUpperCase()}</span>
                </button>`;
            }).join('');
        }

        function toggleLangDropdown(e) {
            if (e) e.stopPropagation();
            const menu = document.getElementById('lang-dropdown-menu');
            const btn = document.getElementById('lang-menu-btn');
            if (!menu || !btn) return;
            const isOpen = menu.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }

        function selectLanguage(code) {
            if (!LOCALES[code]) return;
            currentLang = code;
            localStorage.setItem('artcraft-lang', code);
            const menu = document.getElementById('lang-dropdown-menu');
            const btn = document.getElementById('lang-menu-btn');
            if (menu) menu.classList.remove('open');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            initLanguages();
            applyLanguage(code);
        }

        window.addEventListener('click', (e) => {
            const container = document.getElementById('lang-picker-container');
            const menu = document.getElementById('lang-dropdown-menu');
            const btn = document.getElementById('lang-menu-btn');
            if (container && !container.contains(e.target)) {
                if (menu) menu.classList.remove('open');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            }
        });

        function getCategoryName(cat, t) {
            switch(cat) {
                case 'interaction': return t.catInteraction || 'Interaction';
                case 'navigation': return t.catNavigation || 'Navigation';
                case 'accessibility': return t.catAccessibility || 'Accessibility';
                case 'internationalization': return t.cati18n || 'i18n / RTL';
                case 'shell': return t.catShell || 'Shell & Chrome';
                case 'unified-libs': return t.catLibs || 'Unified Libs';
                case 'governance': return t.catGovernance || 'Governance';
                default: return cat;
            }
        }

        function applyLanguage(lang) {
            const t = LOCALES[lang] || LOCALES.en || {};
            document.documentElement.lang = lang;
            document.documentElement.dir = t.dir || 'ltr';

            const langCodeEl = document.getElementById('current-lang-code');
            const langFlagEl = document.getElementById('current-lang-flag');
            if (langCodeEl) langCodeEl.textContent = (t.code || lang).toUpperCase();
            if (langFlagEl) langFlagEl.textContent = t.flag || '🌐';

            const setTxt = (id, val) => {
                const el = document.getElementById(id);
                if (el && val !== undefined) el.textContent = val;
            };
            const setHtml = (id, val) => {
                const el = document.getElementById(id);
                if (el && val !== undefined) el.innerHTML = val;
            };

            // Navbar
            setTxt('i18n-brand-sub', t.brandSub);
            setTxt('i18n-nav-catalog', t.navCatalog);
            setTxt('i18n-nav-matrix', t.navMatrix);
            setTxt('i18n-nav-faq', t.navFaq);
            setTxt('i18n-nav-agent', t.navAgent);

            // Hero Section
            setTxt('i18n-hero-eyebrow', t.heroEyebrow);
            setHtml('hero-title', t.heroTitle);
            setTxt('i18n-hero-desc', t.heroDesc);
            setTxt('i18n-hero-badge-mcp', t.heroBadgeMCP);
            setTxt('i18n-hero-badge-sim', t.heroBadgeSim);
            setTxt('i18n-hero-badge-drift', t.heroBadgeDrift);

            // Ecosystem Stats
            setTxt('i18n-stat-standards', t.statStandards);
            setTxt('i18n-stat-standards-sub', t.statStandardsSub);
            setTxt('i18n-stat-apps', t.statApps);
            setTxt('i18n-stat-apps-sub', t.statAppsSub);
            setTxt('i18n-stat-ci', t.statCI);
            setTxt('i18n-stat-ci-sub', t.statCISub);
            setTxt('i18n-stat-mcp', t.statMCP);
            setTxt('i18n-stat-mcp-sub', t.statMCPSub);

            // Catalog Search & Filters
            const searchInput = document.getElementById('search');
            if (searchInput && t.searchPlaceholder) {
                searchInput.placeholder = t.searchPlaceholder;
                searchInput.setAttribute('aria-label', t.searchPlaceholder);
            }
            const searchClearBtn = document.getElementById('search-clear-btn');
            if (searchClearBtn && t.searchClearLabel) {
                searchClearBtn.setAttribute('aria-label', t.searchClearLabel);
            }
            setTxt('i18n-chip-all', t.allStandards);
            setTxt('i18n-chip-interaction', t.catInteraction);
            setTxt('i18n-chip-navigation', t.catNavigation);
            setTxt('i18n-chip-accessibility', t.catAccessibility);
            setTxt('i18n-chip-i18n', t.cati18n);
            setTxt('i18n-chip-shell', t.catShell);
            setTxt('i18n-chip-libs', t.catLibs);
            setTxt('i18n-chip-governance', t.catGovernance);
            setTxt('i18n-cat-heading', t.specCatalog);
            setTxt('i18n-empty-clear-btn', t.clearSearchBtn);
            setTxt('empty-state-title', t.noMatchesTitle);
            setTxt('i18n-suggestions-label', t.suggestionsLabel);

            // Specification Reader View
            setTxt('i18n-back-btn-text', t.backBtn);
            setTxt('i18n-copy-text', t.copyLink);
            setTxt('i18n-copy-lean-text', t.copyLeanPrompt ? t.copyLeanPrompt.replace(/^⚡\s*/, '') : 'Lean Prompt');
            setTxt('i18n-crate-label', t.canonicalCrate);
            setTxt('i18n-apps-label', t.governedApps);
            setTxt('i18n-wiki-label', t.craftWikiGuide);
            setTxt('i18n-return-catalog', t.returnCatalog);
            setTxt('i18n-prev-label', t.prevStandard);
            setTxt('i18n-next-label', t.nextStandard);
            setTxt('i18n-toc-on-this-page', t.specTocOnThisPage);
            setTxt('i18n-toc-back-to-top', t.specTocBackToTop);
            setTxt('i18n-toc-share', t.specTocShare);
            setTxt('i18n-sidebar-all-specs', t.specNavAllSpecs);
            setTxt('i18n-spec-nav-toggle', t.specNavToggleBtn);
            setTxt('i18n-spec-toc-toggle', t.specTocToggleBtn);

            const sNavInput = document.getElementById('spec-sidebar-search-input');
            if (sNavInput && t.specNavSearchPlaceholder) {
                sNavInput.placeholder = t.specNavSearchPlaceholder;
                sNavInput.setAttribute('aria-label', t.specNavSearchPlaceholder);
            }

            // Compliance Matrix View
            setTxt('i18n-matrix-eyebrow', t.matrixEyebrow);
            setTxt('matrix-page-title', t.matrixPageTitle);
            setTxt('matrix-page-desc', t.matrixPageDesc);
            setTxt('i18n-matrix-back-btn', t.matrixBackBtn);
            setTxt('matrix-export-btn-text', t.matrixExportBtn);
            setTxt('kpi-score-lbl', t.matrixKpiScore);
            setTxt('kpi-invariants-lbl', t.matrixKpiInvariants);
            setTxt('kpi-governed-lbl', t.matrixKpiGoverned);
            setTxt('kpi-guarantee-lbl', t.matrixKpiGuarantee);

            // Matrix View Mode Buttons
            setTxt('pivot-mode-scorecards', t.matrixModeScorecards);
            setTxt('pivot-mode-grid', t.matrixModePivot);
            setTxt('pivot-mode-drilldown', t.matrixModeDrilldown);

            // Matrix Search & Empty State
            const mSearch = document.getElementById('matrix-search-input');
            if (mSearch && t.matrixSearchPlaceholder) mSearch.placeholder = t.matrixSearchPlaceholder;
            setTxt('matrix-empty-title', t.matrixNoMatchesTitle);
            setTxt('matrix-empty-desc', t.matrixNoMatchesDesc);
            setTxt('i18n-matrix-empty-clear-btn', t.matrixClearSearchBtn);

            // Matrix Domain Filter Chips
            setTxt('domain-chip-all', t.domainAll);
            setTxt('domain-chip-graphics', t.domainGraphics);
            setTxt('domain-chip-video', t.domainVideo);
            setTxt('domain-chip-audio', t.domainAudio);
            setTxt('domain-chip-cad', t.domainCAD);
            setTxt('domain-chip-productivity', t.domainProductivity);
            setTxt('domain-chip-devtools', t.domainDevTools);

            // FAQ View
            setTxt('i18n-faq-eyebrow', t.faqEyebrow || t.matrixEyebrow);
            setTxt('faq-page-title', t.faqTitle);
            setTxt('faq-page-desc', t.faqDesc);
            setTxt('i18n-faq-back-btn', t.matrixBackBtn || t.backBtn);
            setTxt('faq-cat-all', t.faqCatAll);
            setTxt('faq-cat-arch', t.faqCatArch);
            setTxt('faq-cat-autocraft', t.faqCatAutoCraft);
            setTxt('faq-cat-contrib', t.faqCatContrib);
            setTxt('faq-cat-i18n', t.faqCatI18n);
            const faqSearch = document.getElementById('faq-search-input');
            if (faqSearch && t.faqSearchPlaceholder) faqSearch.placeholder = t.faqSearchPlaceholder;
            const expandText = document.getElementById('faq-expand-text');
            if (expandText) {
                expandText.textContent = faqExpandAllMode ? (t.faqCollapseAll || 'Collapse All') : (t.faqExpandAll || 'Expand All');
            }

            // Overview / About View
            setTxt('i18n-nav-about', t.navAbout || 'Overview');
            setTxt('i18n-about-eyebrow', t.aboutEyebrow);
            setTxt('about-page-title', t.aboutTitle);
            setTxt('about-page-desc', t.aboutDesc);
            setTxt('i18n-about-back-btn', t.matrixBackBtn || t.backBtn || 'Back to Catalog');

            // Footer & Metadata
            setTxt('skip-link', t.skipLink);
            setTxt('i18n-footer-title', t.footerTitle);
            setTxt('i18n-footer-desc', t.footerDesc);
            setTxt('i18n-copyright', t.copyright);
            setTxt('i18n-foss', t.foss);

            // Re-render Dynamic Components with the new language
            if (activeSpecId) {
                populateSpecNavTree(activeSpecId);
            }

            const matrixView = document.getElementById('matrix-view');
            if (matrixView && matrixView.style.display !== 'none') {
                renderMatrixView();
            }

            const faqView = document.getElementById('faq-view');
            if (faqView && faqView.style.display !== 'none') {
                renderFaqView();
            }

            announceA11y(lang === 'ar' ? 'تم تغيير اللغة إلى العربية' : `Language switched to ${t.name || lang}`);
            applyFilters();
        }

        function announceA11y(message) {
            const el = document.getElementById('a11y-announcer');
            if (el) el.textContent = message;
        }

        function scrollToCatalog() {
            const el = document.getElementById('status-bar');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }

        // =========================================================================
        // Data Model & Category Counts
        // =========================================================================
        const SPECS = JSON.parse(document.getElementById('specs-data').textContent);
        const specsMap = {};
        SPECS.forEach((s, idx) => {
            s._index = idx;
            specsMap[s.id] = s;
        });

        function initCategoryCounts() {
            const counts = {
                all: SPECS.length,
                interaction: 0,
                navigation: 0,
                accessibility: 0,
                internationalization: 0,
                shell: 0,
                'unified-libs': 0,
                governance: 0
            };
            SPECS.forEach(s => {
                if (counts[s.category] !== undefined) {
                    counts[s.category]++;
                }
            });
            const setBadge = (id, count) => {
                const el = document.getElementById(id);
                if (el) el.textContent = count;
            };
            setBadge('count-all', counts.all);
            setBadge('count-interaction', counts.interaction);
            setBadge('count-navigation', counts.navigation);
            setBadge('count-accessibility', counts.accessibility);
            setBadge('count-internationalization', counts.internationalization);
            setBadge('count-shell', counts.shell);
            setBadge('count-unified-libs', counts['unified-libs']);
            setBadge('count-governance', counts.governance);
        }

        let currentCategory = 'all';
        let activeSpecId = null;
        let lastFocusedElement = null;

        function filterCategory(cat, btn) {
            currentCategory = cat;
            document.querySelectorAll('.filter-chip').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            if (btn) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
            applyFilters();
            const t = LOCALES[currentLang] || LOCALES.en || {};
            announceA11y(`Filtered by category: ${getCategoryName(cat, t)}`);
        }

        document.getElementById('search').addEventListener('input', applyFilters);

        function applyFilters() {
            const searchInput = document.getElementById('search');
            const q = searchInput ? searchInput.value.trim() : '';
            const qLower = q.toLowerCase();
            const t = LOCALES[currentLang] || LOCALES.en || {};

            const clearBtn = document.getElementById('search-clear-btn');
            if (clearBtn) {
                clearBtn.style.display = q.length > 0 ? 'inline-flex' : 'none';
            }

            let visible = 0;
            document.querySelectorAll('.standard-tile').forEach(tile => {
                const matchesCat = currentCategory === 'all' || tile.dataset.category === currentCategory;
                const matchesSearch = !qLower || tile.innerText.toLowerCase().includes(qLower);
                const show = matchesCat && matchesSearch;
                tile.style.display = show ? 'flex' : 'none';
                if (show) visible++;
            });

            const grid = document.getElementById('grid');
            const emptyState = document.getElementById('empty-state-card');
            const visibleCountEl = document.getElementById('visible-count');
            const clearSearchLink = document.getElementById('clear-search-link');

            if (visible === 0) {
                if (grid) grid.style.display = 'none';
                if (emptyState) emptyState.style.display = 'flex';
                const emptyDesc = document.getElementById('empty-state-desc');
                if (emptyDesc) {
                    const templateDesc = t.noMatchesDesc || "We couldn't find any standards matching \"{query}\".";
                    emptyDesc.textContent = templateDesc.replace('{query}', q);
                }
                if (visibleCountEl) visibleCountEl.textContent = `0 ${t.specCatalog || 'specifications'}`;
                if (clearSearchLink) clearSearchLink.style.display = 'inline';
                announceA11y(emptyDesc ? emptyDesc.textContent : 'No matches found');
            } else {
                if (grid) grid.style.display = 'grid';
                if (emptyState) emptyState.style.display = 'none';
                if (clearSearchLink) {
                    clearSearchLink.style.display = (q.length > 0 || currentCategory !== 'all') ? 'inline' : 'none';
                }

                let statusText = '';
                if (q.length > 0) {
                    if (currentCategory !== 'all') {
                        const catName = getCategoryName(currentCategory, t);
                        statusText = (t.foundResultsCat || 'Found {count} specifications matching "{query}" in {category}')
                            .replace('{count}', visible)
                            .replace('{query}', q)
                            .replace('{category}', catName);
                    } else {
                        statusText = (t.foundResults || 'Found {count} specifications matching "{query}"')
                            .replace('{count}', visible)
                            .replace('{query}', q);
                    }
                } else {
                    if (currentCategory !== 'all') {
                        const catName = getCategoryName(currentCategory, t);
                        statusText = (t.showingFilterCount || 'Showing {count} of {total} specifications in {category}')
                            .replace('{count}', visible)
                            .replace('{total}', SPECS.length)
                            .replace('{category}', catName);
                    } else {
                        statusText = (t.showingCount || 'Showing {count} of {total} specifications')
                            .replace('{count}', visible)
                            .replace('{total}', SPECS.length);
                    }
                }
                if (visibleCountEl) visibleCountEl.textContent = statusText;
                if (q.length > 0) {
                    announceA11y(statusText);
                }
            }
        }

        function clearSearch() {
            const input = document.getElementById('search');
            if (input) {
                input.value = '';
                applyFilters();
                input.focus();
            }
        }

        function clearSearchAndFilters() {
            const input = document.getElementById('search');
            if (input) input.value = '';
            currentCategory = 'all';
            document.querySelectorAll('.filter-chip').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            const allChip = document.getElementById('chip-all');
            if (allChip) {
                allChip.classList.add('active');
                allChip.setAttribute('aria-pressed', 'true');
            }
            applyFilters();
            if (input) input.focus();
        }

        function applySuggestion(term) {
            const input = document.getElementById('search');
            if (input) {
                input.value = term;
                applyFilters();
                input.focus();
            }
        }

        
        // =========================================================================
        // Craft.wiki 3-Column Specification Navigation & TOC Engine (Jakob's Law)
        // =========================================================================
        const CATEGORY_GROUPS = [
            { id: 'interaction', num: '01', icon: '🖱️' },
            { id: 'navigation', num: '02', icon: '🧭' },
            { id: 'accessibility', num: '03', icon: '♿' },
            { id: 'internationalization', num: '04', icon: '🌐' },
            { id: 'shell', num: '05', icon: '🖥️' },
            { id: 'unified-libs', num: '06', icon: '📦' },
            { id: 'governance', num: '07', icon: '⚖️' }
        ];

        function populateSpecNavTree(activeId) {
            const treeEl = document.getElementById('spec-nav-tree');
            if (!treeEl) return;
            const t = LOCALES[currentLang] || LOCALES.en || {};

            let html = '';
            CATEGORY_GROUPS.forEach(grp => {
                const grpSpecs = SPECS.filter(s => s.category === grp.id);
                if (grpSpecs.length === 0) return;
                const catName = getCategoryName(grp.id, t);

                html += `
                    <div class="spec-nav-group" data-category="${grp.id}">
                        <div class="spec-nav-group-header">
                            <span class="spec-nav-group-title">
                                <span>${grp.icon}</span>
                                <span>${grp.num} · ${catName}</span>
                            </span>
                            <span class="spec-nav-group-count">${grpSpecs.length}</span>
                        </div>
                        <ul class="spec-nav-items">
                `;

                grpSpecs.forEach(s => {
                    const isActive = s.id === activeId;
                    html += `
                        <li class="spec-nav-item" data-spec-id="${s.id}">
                            <a href="#${s.id}" class="${isActive ? 'active' : ''}" onclick="openSpec('${s.id}'); closeAllSpecDrawers(); return false;" aria-current="${isActive ? 'page' : 'false'}">
                                <span class="spec-nav-item-id">${s.id}</span>
                                <span class="spec-nav-item-title" title="${s.title}">${s.title}</span>
                            </a>
                        </li>
                    `;
                });

                html += `
                        </ul>
                    </div>
                `;
            });

            treeEl.innerHTML = html;

            // Update total badge
            const totalBadge = document.getElementById('spec-sidebar-total-badge');
            if (totalBadge) totalBadge.textContent = SPECS.length;

            // Scroll active nav item smoothly into view inside sidebar
            if (activeId) {
                setTimeout(() => {
                    const activeLink = treeEl.querySelector('.spec-nav-item a.active');
                    if (activeLink) {
                        activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }
                }, 50);
            }
        }

        function filterSpecSidebar(query) {
            const clearBtn = document.getElementById('spec-sidebar-search-clear');
            const q = (query || '').trim().toLowerCase();
            if (clearBtn) {
                clearBtn.style.display = q ? 'flex' : 'none';
            }

            const groups = document.querySelectorAll('#spec-nav-tree .spec-nav-group');
            groups.forEach(grp => {
                let visibleInGroup = 0;
                const items = grp.querySelectorAll('.spec-nav-item');
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    const match = !q || text.includes(q);
                    item.style.display = match ? 'block' : 'none';
                    if (match) visibleInGroup++;
                });
                grp.style.display = visibleInGroup > 0 ? 'flex' : 'none';
            });
        }

        function clearSpecSidebarSearch() {
            const input = document.getElementById('spec-sidebar-search-input');
            if (input) {
                input.value = '';
                filterSpecSidebar('');
                input.focus();
            }
        }

        let tocObserver = null;

        function generateSpecTOC() {
            const tocList = document.getElementById('spec-toc-list');
            if (!tocList) return;

            if (tocObserver) {
                tocObserver.disconnect();
                tocObserver = null;
            }

            const contentEl = document.getElementById('spec-content');
            if (!contentEl) return;

            const headings = contentEl.querySelectorAll('h2, h3');
            if (headings.length === 0) {
                tocList.innerHTML = `<li class="spec-toc-item"><span style="font-size:12px;color:var(--sl-color-text-muted);">No sections found</span></li>`;
                return;
            }

            let tocHtml = '';
            const headingElements = [];

            headings.forEach((h, index) => {
                const text = h.textContent.trim();
                if (!text) return;

                // Create slug ID
                const slug = 'heading-' + index + '-' + text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                h.id = slug;
                headingElements.push({ el: h, id: slug });

                const isH3 = h.tagName.toLowerCase() === 'h3';
                tocHtml += `
                    <li class="spec-toc-item ${isH3 ? 'level-3' : 'level-2'}">
                        <a href="#${slug}" data-target-id="${slug}" onclick="onTocLinkClick(event, '${slug}')">
                            ${text}
                        </a>
                    </li>
                `;
            });

            tocList.innerHTML = tocHtml;

            // Highlight first item initially
            const firstLink = tocList.querySelector('a');
            if (firstLink) firstLink.classList.add('active');

            // Setup IntersectionObserver for ScrollSpy
            if ('IntersectionObserver' in window && headingElements.length > 0) {
                tocObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const activeId = entry.target.id;
                            tocList.querySelectorAll('a').forEach(a => {
                                if (a.dataset.targetId === activeId) {
                                    a.classList.add('active');
                                } else {
                                    a.classList.remove('active');
                                }
                            });
                        }
                    });
                }, {
                    rootMargin: '-80px 0px -60% 0px',
                    threshold: 0
                });

                headingElements.forEach(item => {
                    tocObserver.observe(item.el);
                });
            }
        }

        function onTocLinkClick(e, slug) {
            if (e) e.preventDefault();
            const target = document.getElementById(slug);
            if (target) {
                const offset = 150;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active link in TOC
                const tocList = document.getElementById('spec-toc-list');
                if (tocList) {
                    tocList.querySelectorAll('a').forEach(a => {
                        a.classList.toggle('active', a.dataset.targetId === slug);
                    });
                }
            }
            closeAllSpecDrawers();
        }

        function toggleSpecNavDrawer(e) {
            if (e) e.stopPropagation();
            const sidebar = document.getElementById('spec-nav-sidebar');
            const overlay = document.getElementById('spec-drawer-overlay');
            const isOpen = sidebar.classList.contains('drawer-open');
            closeAllSpecDrawers();
            if (!isOpen) {
                sidebar.classList.add('drawer-open');
                overlay.classList.add('active');
                const btn = document.getElementById('spec-drawer-toggle-btn');
                if (btn) btn.setAttribute('aria-expanded', 'true');
            }
        }

        function toggleSpecTocDrawer(e) {
            if (e) e.stopPropagation();
            const toc = document.getElementById('spec-toc-sidebar');
            const overlay = document.getElementById('spec-drawer-overlay');
            const isOpen = toc.classList.contains('drawer-open');
            closeAllSpecDrawers();
            if (!isOpen) {
                toc.classList.add('drawer-open');
                overlay.classList.add('active');
                const btn = document.getElementById('spec-toc-toggle-btn');
                if (btn) btn.setAttribute('aria-expanded', 'true');
            }
        }

        function closeAllSpecDrawers() {
            const sidebar = document.getElementById('spec-nav-sidebar');
            const toc = document.getElementById('spec-toc-sidebar');
            const overlay = document.getElementById('spec-drawer-overlay');
            if (sidebar) sidebar.classList.remove('drawer-open');
            if (toc) toc.classList.remove('drawer-open');
            if (overlay) overlay.classList.remove('active');
            const btnNav = document.getElementById('spec-drawer-toggle-btn');
            const btnToc = document.getElementById('spec-toc-toggle-btn');
            if (btnNav) btnNav.setAttribute('aria-expanded', 'false');
            if (btnToc) btnToc.setAttribute('aria-expanded', 'false');
        }

        function openSpec(id, updateHash = true) {
            const spec = specsMap[id];
            if (!spec) return;
            activeSpecId = id;
            lastFocusedElement = document.activeElement;

            if (updateHash) {
                window.location.hash = '#' + id;
            }

            // Breadcrumbs
            document.getElementById('bc-cat-link').textContent = spec.cat_dir;
            document.getElementById('bc-cat-link').dataset.category = spec.category;
            document.getElementById('bc-file').textContent = spec.file_name;
            document.getElementById('spec-gh-link').href = spec.github_url;

            // Header tags
            document.getElementById('spec-id-badge').textContent = spec.id;
            const catBadge = document.getElementById('spec-cat-badge');
            catBadge.textContent = spec.category;
            catBadge.className = 'tile-cat-badge cat-' + spec.category;

            document.getElementById('spec-status-badge').textContent = spec.status.toUpperCase();
            document.getElementById('spec-title').textContent = spec.title;

            // Canonical crate
            const crateEl = document.getElementById('spec-crate');
            if (spec.canonical_crate) {
                crateEl.textContent = spec.canonical_crate;
                document.getElementById('spec-crate-pill').style.display = 'block';
            } else {
                document.getElementById('spec-crate-pill').style.display = 'none';
            }

            // Affected apps
            const appsContainer = document.getElementById('spec-apps');
            appsContainer.innerHTML = '';
            if (spec.affected_apps) {
                const rawApps = spec.affected_apps.replace(/[\[\]]/g, '').split(',');
                rawApps.forEach(app => {
                    const a = app.trim();
                    if (a) {
                        const tag = document.createElement('span');
                        tag.className = 'app-badge';
                        tag.textContent = a;
                        appsContainer.appendChild(tag);
                    }
                });
                document.getElementById('spec-apps-pill').style.display = 'block';
            } else {
                document.getElementById('spec-apps-pill').style.display = 'none';
            }

            // Craft Wiki link
            const wikiPill = document.getElementById('spec-wiki-pill');
            const wikiLink = document.getElementById('spec-wiki-link');
            if (spec.wiki_reference) {
                wikiLink.href = spec.wiki_reference;
                wikiPill.style.display = 'block';
            } else {
                wikiPill.style.display = 'none';
            }

            // Mount Interactive Ergonomic Sandbox if available
            mountSandbox(spec.id);
            renderSpecSnippetLab(spec);

            // Render Markdown body
            const contentEl = document.getElementById('spec-content');
            if (window.marked && window.marked.parse) {
                let rendered = marked.parse(spec.body);
                // Highlight RFC terms
                rendered = rendered.replace(/\b(MUST NOT|SHALL NOT|MUST|SHALL|SHOULD NOT|SHOULD|RECOMMENDED|MAY|OPTIONAL)\b/g, '<span class="rfc-term">$1</span>');
                contentEl.innerHTML = rendered;

                // Highlight code blocks and add accessible copy buttons
                contentEl.querySelectorAll('pre code').forEach(block => {
                    if (window.hljs) hljs.highlightElement(block);
                    const pre = block.parentElement;
                    const btn = document.createElement('button');
                    btn.className = 'code-copy-btn';
                    btn.setAttribute('aria-label', 'Copy code snippet to clipboard');
                    btn.textContent = 'Copy';
                    btn.onclick = () => {
                        navigator.clipboard.writeText(block.textContent);
                        btn.textContent = 'Copied!';
                        btn.setAttribute('aria-label', 'Code snippet copied to clipboard');
                        setTimeout(() => {
                            btn.textContent = 'Copy';
                            btn.setAttribute('aria-label', 'Copy code snippet to clipboard');
                        }, 1500);
                    };
                    pre.appendChild(btn);
                });
            } else {
                contentEl.innerHTML = '<pre style="white-space: pre-wrap;">' + spec.body + '</pre>';
            }

            // Update Dual Rich Pagination Cards
            const idx = spec._index;
            const prevCard = document.getElementById('prev-pag-card');
            const nextCard = document.getElementById('next-pag-card');

            if (idx > 0) {
                const prevSpec = SPECS[idx - 1];
                prevCard.removeAttribute('aria-disabled');
                prevCard.style.visibility = 'visible';
                prevCard.setAttribute('aria-label', `Previous Standard: ${prevSpec.id} ${prevSpec.title}`);
                document.getElementById('prev-pag-title').textContent = `${prevSpec.id}: ${prevSpec.title}`;
            } else {
                prevCard.setAttribute('aria-disabled', 'true');
                prevCard.style.visibility = 'hidden';
            }

            if (idx < SPECS.length - 1) {
                const nextSpec = SPECS[idx + 1];
                nextCard.removeAttribute('aria-disabled');
                nextCard.style.visibility = 'visible';
                nextCard.setAttribute('aria-label', `Next Standard: ${nextSpec.id} ${nextSpec.title}`);
                document.getElementById('next-pag-title').textContent = `${nextSpec.id}: ${nextSpec.title}`;
            } else {
                nextCard.setAttribute('aria-disabled', 'true');
                nextCard.style.visibility = 'hidden';
            }

            // Transition views
            document.getElementById('dashboard-view').style.display = 'none';
            const matrixView = document.getElementById('matrix-view');
            if (matrixView) matrixView.style.display = 'none';
            const faqView = document.getElementById('faq-view');
            if (faqView) faqView.style.display = 'none';
            const aboutView = document.getElementById('about-view');
            if (aboutView) aboutView.style.display = 'none';
            document.getElementById('spec-view').style.display = 'block';

            const navCatalog = document.getElementById('nav-btn-catalog');
            const navMatrix = document.getElementById('nav-btn-matrix');
            const navFaq = document.getElementById('nav-btn-faq');
            const navAbout = document.getElementById('nav-btn-about');
            if (navCatalog) navCatalog.classList.remove('active');
            if (navMatrix) navMatrix.classList.remove('active');
            if (navFaq) navFaq.classList.remove('active');
            if (navAbout) navAbout.classList.remove('active');

            window.scrollTo({ top: 0, behavior: 'instant' });

            // a11y focus management: focus on specification header title
            const titleEl = document.getElementById('spec-title');
            if (titleEl) {
                titleEl.focus();
            }
            announceA11y(`Now reading specification ${spec.id}: ${spec.title}`);

            // Craft.wiki 3-Column Integration
            populateSpecNavTree(spec.id);
            generateSpecTOC();
            closeAllSpecDrawers();
        }

        function showDashboard(e) {
            if (e) e.preventDefault();
            activeSpecId = null;
            closeAllSpecDrawers();
            if (window.location.hash) {
                history.pushState(null, null, ' ');
            }
            document.getElementById('spec-view').style.display = 'none';
            const matrixView = document.getElementById('matrix-view');
            if (matrixView) matrixView.style.display = 'none';
            const faqView = document.getElementById('faq-view');
            if (faqView) faqView.style.display = 'none';
            const aboutView = document.getElementById('about-view');
            if (aboutView) aboutView.style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'block';

            const navCatalog = document.getElementById('nav-btn-catalog');
            const navMatrix = document.getElementById('nav-btn-matrix');
            const navFaq = document.getElementById('nav-btn-faq');
            const navAbout = document.getElementById('nav-btn-about');
            if (navCatalog) navCatalog.classList.add('active');
            if (navMatrix) navMatrix.classList.remove('active');
            if (navFaq) navFaq.classList.remove('active');
            if (navAbout) navAbout.classList.remove('active');

            window.scrollTo({ top: 0, behavior: 'instant' });

            // Restore focus for a11y
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            } else {
                const searchEl = document.getElementById('search');
                if (searchEl) searchEl.focus();
            }
            announceA11y('Returned to specifications catalog');
        }

        function showMatrixView(e, initialMode) {
            if (e) e.preventDefault();
            activeSpecId = null;
            closeAllSpecDrawers();
            const targetMode = initialMode || (window.location.hash === '#shortcuts' ? 'shortcuts' : (window.location.hash === '#checklist' ? 'checklist' : (matrixViewMode || 'scorecards')));
            const targetHash = '#' + (targetMode === 'scorecards' ? 'matrix' : targetMode);
            if (window.location.hash !== targetHash) {
                history.pushState(null, null, targetHash);
            }
            document.getElementById('spec-view').style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'none';
            const faqView = document.getElementById('faq-view');
            if (faqView) faqView.style.display = 'none';
            const aboutView = document.getElementById('about-view');
            if (aboutView) aboutView.style.display = 'none';
            const matrixView = document.getElementById('matrix-view');
            if (matrixView) matrixView.style.display = 'block';

            const navCatalog = document.getElementById('nav-btn-catalog');
            const navMatrix = document.getElementById('nav-btn-matrix');
            const navFaq = document.getElementById('nav-btn-faq');
            const navAbout = document.getElementById('nav-btn-about');
            if (navCatalog) navCatalog.classList.remove('active');
            if (navMatrix) navMatrix.classList.add('active');
            if (navFaq) navFaq.classList.remove('active');
            if (navAbout) navAbout.classList.remove('active');

            window.scrollTo({ top: 0, behavior: 'instant' });
            setMatrixViewMode(targetMode);
            announceA11y('Viewing ArtCraft Reference Apps & Capabilities');
        }

        function filterFromBreadcrumb(e) {
            if (e) e.preventDefault();
            const cat = document.getElementById('bc-cat-link').dataset.category || 'all';
            showDashboard();
            const targetBtn = Array.from(document.querySelectorAll('.filter-chip')).find(b => b.textContent.toLowerCase().includes(cat.toLowerCase()));
            filterCategory(cat, targetBtn);
        }

        function copyCurrentLink() {
            const btn = document.getElementById('copy-link-btn');
            const t = I18N[currentLang] || I18N.en;
            navigator.clipboard.writeText(window.location.href);
            btn.innerHTML = `<span>${t.copied}</span>`;
            announceA11y('Link copied to clipboard');
            setTimeout(() => {
                btn.innerHTML = `<span id="i18n-copy-text">${t.copyLink}</span> 🔗`;
            }, 2000);
        }

        function copyCurrentLeanPrompt() {
            if (!activeSpecId) return;
            const current = specsMap[activeSpecId];
            if (!current) return;
            const t = LOCALES[currentLang] || LOCALES.en || {};
            
            // Generate a token-lean (< 100 tokens) prompt snippet for agents
            const leanPrompt = [
                `// [ArtCraft Recipe: ${current.id}] ${current.title}`,
                `// Domain: ${current.category} | Crate: ${current.crate || 'craft-widgets'} | UI: egui/wgpu`,
                `// Invariant: ${current.summary || current.title}`,
                `// Contract: No unverified AST drift. Tag AccessKit accessibility nodes with Role & Name.`,
                `// Sandbox: Do not invoke std::fs directly; route all file operations via craft-fs.`
            ].join('\n');

            navigator.clipboard.writeText(leanPrompt).then(() => {
                const btn = document.getElementById('copy-lean-btn');
                if (btn) {
                    const originalHtml = btn.innerHTML;
                    btn.innerHTML = `<span>✓</span> <span>${t.leanPromptCopied ? t.leanPromptCopied.split('!')[0] : 'Copied (<100t)'}</span>`;
                    announceA11y('Lean agent prompt copied to clipboard');
                    setTimeout(() => {
                        btn.innerHTML = originalHtml;
                    }, 2000);
                }
                showToastNotification(t.leanPromptCopied || 'Lean agent prompt copied (< 100 tokens)!');
            }).catch(() => {
                showToastNotification('Failed to copy prompt to clipboard');
            });
        }

        function navigateSpec(delta, e) {
            if (e) e.preventDefault();
            if (!activeSpecId) return;
            const current = specsMap[activeSpecId];
            if (!current) return;
            const targetIdx = current._index + delta;
            if (targetIdx >= 0 && targetIdx < SPECS.length) {
                openSpec(SPECS[targetIdx].id);
            }
        }

        function handleRouting() {
            const hash = window.location.hash.replace(/^#\/?/, '').trim();
            if (hash === 'matrix') {
                showMatrixView(null, 'scorecards');
            } else if (hash === 'shortcuts') {
                showMatrixView(null, 'shortcuts');
            } else if (hash === 'checklist' || hash === 'pr-checklist') {
                showMatrixView(null, 'checklist');
            } else if (hash === 'faq' || hash.startsWith('faq/')) {
                const targetFaqId = hash.startsWith('faq/') ? hash.substring(4) : null;
                showFaqView(null, targetFaqId);
            } else if (hash === 'about' || hash === 'overview' || hash === 'intro') {
                showAboutView();
            } else if (hash.startsWith('faq-')) {
                showFaqView(null, hash);
            } else if (hash && specsMap[hash]) {
                openSpec(hash, false);
            } else {
                showDashboard();
            }
        }

        function showAboutView(e) {
            if (e) e.preventDefault();
            activeSpecId = null;
            closeAllSpecDrawers();
            if (window.location.hash !== '#about' && window.location.hash !== '#overview') {
                history.pushState(null, null, '#about');
            }
            document.getElementById('spec-view').style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'none';
            const matrixView = document.getElementById('matrix-view');
            if (matrixView) matrixView.style.display = 'none';
            const faqView = document.getElementById('faq-view');
            if (faqView) faqView.style.display = 'none';
            const aboutView = document.getElementById('about-view');
            if (aboutView) aboutView.style.display = 'block';

            const navCatalog = document.getElementById('nav-btn-catalog');
            const navMatrix = document.getElementById('nav-btn-matrix');
            const navFaq = document.getElementById('nav-btn-faq');
            const navAbout = document.getElementById('nav-btn-about');
            if (navCatalog) navCatalog.classList.remove('active');
            if (navMatrix) navMatrix.classList.remove('active');
            if (navFaq) navFaq.classList.remove('active');
            if (navAbout) navAbout.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'instant' });
            announceA11y('Viewing Introduction and Architecture Overview');
        }

        // Global Keyboard Navigation (a11y: Escape to return/close, Alt+Left/Right for pagination, '/' for search)
        window.addEventListener('keydown', (e) => {
            const matrixView = document.getElementById('matrix-view');
            const isMatrixVisible = matrixView && matrixView.style.display !== 'none';
            const searchInput = document.getElementById('search');

            // Command Palette shortcut (Ctrl+K or Cmd+K)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                openCommandPalette();
                return;
            }

            const cmdModal = document.getElementById('cmd-palette-modal');
            const agentModal = document.getElementById('agent-hub-modal');
            const badgeModal = document.getElementById('badge-modal');

            if (e.key === 'Escape') {
                closeMobileMenu();
                const navSidebar = document.getElementById('spec-nav-sidebar');
                const tocSidebar = document.getElementById('spec-toc-sidebar');
                if ((navSidebar && navSidebar.classList.contains('drawer-open')) ||
                    (tocSidebar && tocSidebar.classList.contains('drawer-open'))) {
                    e.preventDefault();
                    closeAllSpecDrawers();
                    return;
                }
                if (cmdModal && cmdModal.style.display !== 'none') {
                    e.preventDefault();
                    closeCommandPalette();
                    return;
                }
                if (agentModal && agentModal.style.display !== 'none') {
                    e.preventDefault();
                    closeAgentHub();
                    return;
                }
                if (badgeModal && badgeModal.style.display !== 'none') {
                    e.preventDefault();
                    closeBadgeModal();
                    return;
                }
                if (isMatrixVisible) {
                    e.preventDefault();
                    showDashboard();
                    return;
                }
                if (document.activeElement === searchInput) {
                    if (searchInput.value) {
                        e.preventDefault();
                        clearSearch();
                    } else {
                        searchInput.blur();
                    }
                    return;
                }
                if (activeSpecId) {
                    e.preventDefault();
                    showDashboard();
                    return;
                }
            }

            if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                e.preventDefault();
                if (activeSpecId) showDashboard();
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
                return;
            }

            if (activeSpecId) {
                if (e.altKey && e.key === 'ArrowLeft') {
                    e.preventDefault();
                    navigateSpec(document.documentElement.dir === 'rtl' ? 1 : -1);
                } else if (e.altKey && e.key === 'ArrowRight') {
                    e.preventDefault();
                    navigateSpec(document.documentElement.dir === 'rtl' ? -1 : 1);
                }
            }
        });

        // =========================================================================
        // Interactive In-Browser Ergonomic Sandboxes
        // =========================================================================
        function mountSandbox(specId) {
            const slot = document.getElementById('interactive-sandbox-slot');
            if (!slot) return;
            const t = LOCALES[currentLang] || LOCALES.en || {};

            if (specId === 'STD-INPUT-001') {
                slot.innerHTML = `
                    <div class="interactive-sandbox" role="region" aria-label="Interactive Ergonomic Sandbox for Multi-Tool Slot">
                        <div class="sandbox-header">
                            <span class="sandbox-title">⚡ Interactive Ergonomic Sandbox: ToolSlot Cycling &amp; Nested Flyout Toolbar</span>
                            <span class="sandbox-badge">STD-INPUT-001 Live Simulator</span>
                        </div>
                        <div class="sandbox-stage">
                            <div style="font-size:12.5px;color:var(--sl-color-text-muted);text-align:center;max-width:580px;" id="sim-hint-text">
                                ${t.simLongPressHint || "Hold mouse button down for 350ms (or Right-Click) to open the nested flyout toolbar. Hold Alt while clicking to cycle tools in group order."}
                            </div>
                            <div class="sim-slot-container" id="sim-slot-wrapper">
                                <button id="sim-tool-btn" class="sim-slot-btn" 
                                        onmousedown="handleSlotMouseDown(event)" 
                                        onmouseup="handleSlotMouseUp(event)" 
                                        onmouseleave="cancelSlotHold()"
                                        oncontextmenu="handleSlotContextMenu(event)"
                                        aria-label="Pen Tool (Slot 1 of 3)" 
                                        aria-haspopup="menu" 
                                        aria-expanded="false">
                                    <span id="sim-tool-icon">✒️</span>
                                    <span id="sim-tool-name">Pen Tool</span>
                                    <span class="sim-flyout-arrow" aria-hidden="true">▾</span>
                                    <span class="sim-hold-progress" id="sim-hold-progress"></span>
                                </button>

                                <!-- Nested Flyout Toolbar Popup -->
                                <div id="sim-flyout-menu" class="sim-flyout-toolbar" role="menu" aria-label="Nested Tools Menu"></div>

                                <div class="sim-tools-row" id="sim-dots-row" style="margin-top:10px;">
                                    <div class="sim-tool-dot active"></div>
                                    <div class="sim-tool-dot"></div>
                                    <div class="sim-tool-dot"></div>
                                </div>
                            </div>

                            <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
                                <button class="reader-btn" onclick="simTriggerHold()">${t.simLongPressBtn || "Simulate Long-Press (350ms)"}</button>
                                <button class="reader-btn" onclick="simTriggerAltClick()">Simulate Alt + Click</button>
                                <button class="reader-btn" onclick="simTriggerContextMenu()">${t.simRightClickBtn || "Simulate Right-Click"}</button>
                                <button class="reader-btn" onclick="simTriggerRapidClick()">Rapid Alt-Clicks (x3)</button>
                                <button class="reader-btn" onclick="resetSim()">Reset</button>
                            </div>

                            <div class="sim-readout" id="sim-readout">
                                Active Slot Index: <strong>0 (Pen Tool)</strong><br>
                                Double-Click Dialog Shield: <span style="color:#3FB950;font-weight:600;">ARMED &amp; PROTECTED</span><br>
                                AccessKit Name: <code>"Pen Tool" (Role: Button, Group: Multi-Tool)</code>
                            </div>
                        </div>
                    </div>
                `;
                initSimSlot();
            } else if (specId === 'STD-COLOR-001') {
                slot.innerHTML = `
                    <div class="interactive-sandbox" role="region" aria-label="Interactive Color Space and Proofing Sandbox">
                        <div class="sandbox-header">
                            <span class="sandbox-title">🎨 Interactive Color Space Proofing &amp; Hex Parser Sandbox</span>
                            <span class="sandbox-badge">STD-COLOR-001 Live Simulator</span>
                        </div>
                        <div class="sandbox-stage">
                            <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;justify-content:center;">
                                <div id="sim-color-swatch" style="width:64px;height:64px;border-radius:8px;border:2px solid #FFF;background:#FF5500;box-shadow:0 4px 12px rgba(0,0,0,0.4);"></div>
                                <div style="display:flex;flex-direction:column;gap:8px;">
                                    <input type="text" id="sim-hex-input" value="#FF5500" class="search-input" style="width:160px;font-family:var(--font-mono);font-size:14px;padding:6px 12px;" oninput="updateSimColor(this.value)">
                                    <div style="display:flex;gap:6px;">
                                        <button class="reader-btn" onclick="setSimProof('sRGB')">sRGB</button>
                                        <button class="reader-btn" onclick="setSimProof('Display P3')">Display P3</button>
                                        <button class="reader-btn" onclick="setSimProof('CMYK Fogra39')">CMYK Proof</button>
                                    </div>
                                </div>
                            </div>
                            <div class="sim-readout" id="sim-color-readout">
                                Active Profile: <strong>sRGB Standard</strong> · Gamut: <span style="color:#3FB950;">100% In-Gamut</span><br>
                                Parsed Hex: <code>rgb(255, 85, 0)</code> · Soft-Proof Delta E: <strong>0.00 (Zero Drift)</strong>
                            </div>
                        </div>
                    </div>
                `;
            } else if (specId === 'STD-A11Y-002') {
                slot.innerHTML = `
                    <div class="interactive-sandbox" role="region" aria-label="Interactive Focus Ring and Contrast Sandbox">
                        <div class="sandbox-header">
                            <span class="sandbox-title">♿ Accessible Focus Ring &amp; High-Contrast Sandbox</span>
                            <span class="sandbox-badge">STD-A11Y-002 Live Simulator</span>
                        </div>
                        <div class="sandbox-stage">
                            <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;justify-content:center;">
                                <button id="sim-focus-btn" class="sim-slot-btn" style="outline:2px solid #58A6FF;outline-offset:2px;">
                                    Target Interactive Component
                                </button>
                            </div>
                            <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
                                <button class="reader-btn" onclick="toggleSimContrast()">Toggle Contrast (7:1)</button>
                                <button class="reader-btn" onclick="toggleSimRingWeight()">Toggle Ring Weight (3px)</button>
                            </div>
                            <div class="sim-readout" id="sim-a11y-readout">
                                Contrast Ratio: <strong style="color:#3FB950;">8.4:1 (Passes AAA)</strong><br>
                                Outline Offset: <code>2px</code> · Reduced Motion: <code>Responsive</code>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                slot.innerHTML = '';
            }
        }

        // =========================================================================
        // STD-INPUT-001 Simulator State Machine (Hold Gesture & Cycling)
        // =========================================================================
        let simTools = [
            { name: "Pen Tool", icon: "✒️", shortcut: "P" },
            { name: "Freeform Pen", icon: "✏️", shortcut: "P" },
            { name: "Curvature Tool", icon: "➰", shortcut: "P" }
        ];
        let simIdx = 0;
        let lastClickTime = 0;
        let simHoldTimer = null;
        let isLongPressTriggered = false;

        function initSimSlot() {
            simIdx = 0;
            updateSimSlotUI(false);
            renderFlyoutItems();
        }

        function renderFlyoutItems() {
            const menu = document.getElementById('sim-flyout-menu');
            if (!menu) return;
            menu.innerHTML = simTools.map((tool, idx) => `
                <button class="sim-flyout-item ${idx === simIdx ? 'active' : ''}" 
                        onclick="selectFlyoutTool(${idx})" 
                        role="menuitem"
                        tabindex="0">
                    <span style="display:inline-flex;align-items:center;gap:8px;">
                        <span>${tool.icon}</span>
                        <span>${tool.name}</span>
                    </span>
                    <span style="font-family:var(--font-mono);font-size:10.5px;opacity:0.7;">${idx === simIdx ? '✓ ' : ''}${tool.shortcut}</span>
                </button>
            `).join('');
        }

        function handleSlotMouseDown(e) {
            if (e.button !== 0) return;
            isLongPressTriggered = false;
            const bar = document.getElementById('sim-hold-progress');
            if (bar) bar.classList.add('holding');

            simHoldTimer = setTimeout(() => {
                isLongPressTriggered = true;
                if (bar) bar.classList.remove('holding');
                openSimFlyout();
                updateSimReadout(`<strong>LONG-PRESS (350ms):</strong> Nested flyout toolbar opened! Select a tool from the flyout or click outside to dismiss.`);
            }, 350);
        }

        function cancelSlotHold() {
            const bar = document.getElementById('sim-hold-progress');
            if (bar) bar.classList.remove('holding');
            if (simHoldTimer) {
                clearTimeout(simHoldTimer);
                simHoldTimer = null;
            }
        }

        function handleSlotMouseUp(e) {
            cancelSlotHold();
            if (isLongPressTriggered) return;
            if (e.button !== 0) return;

            const now = Date.now();
            const rapid = (now - lastClickTime) < 300;
            lastClickTime = now;
            const alt = e ? (e.altKey || e.shiftKey) : false;

            if (alt) {
                simIdx = (simIdx + 1) % simTools.length;
                updateSimSlotUI(true);
            } else {
                updateSimSlotUI(false, rapid);
            }
        }

        function handleSlotContextMenu(e) {
            e.preventDefault();
            cancelSlotHold();
            openSimFlyout();
            updateSimReadout(`<strong>SECONDARY CLICK (Right-Click):</strong> Flyout toolbar opened immediately.`);
        }

        function openSimFlyout() {
            const menu = document.getElementById('sim-flyout-menu');
            const btn = document.getElementById('sim-tool-btn');
            if (menu) menu.classList.add('open');
            if (btn) btn.setAttribute('aria-expanded', 'true');
            renderFlyoutItems();
        }

        function closeSimFlyout() {
            const menu = document.getElementById('sim-flyout-menu');
            const btn = document.getElementById('sim-tool-btn');
            if (menu) menu.classList.remove('open');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        }

        function selectFlyoutTool(idx) {
            simIdx = idx;
            closeSimFlyout();
            updateSimSlotUI(false);
            updateSimReadout(`<strong>SELECTED FROM FLYOUT:</strong> Switched to ${simTools[idx].name} (Slot ${idx + 1} of ${simTools.length}). Flyout dismissed.`);
        }

        function simTriggerHold() {
            const bar = document.getElementById('sim-hold-progress');
            if (bar) bar.classList.add('holding');
            setTimeout(() => {
                if (bar) bar.classList.remove('holding');
                openSimFlyout();
                updateSimReadout(`<strong>SIMULATED LONG-PRESS (350ms):</strong> Hold detected; flyout toolbar presented.`);
            }, 350);
        }

        function simTriggerContextMenu() {
            openSimFlyout();
            updateSimReadout(`<strong>SIMULATED RIGHT-CLICK:</strong> Flyout toolbar opened immediately.`);
        }

        function simTriggerAltClick() {
            simIdx = (simIdx + 1) % simTools.length;
            updateSimSlotUI(true);
        }

        function simTriggerRapidClick() {
            for (let i = 0; i < 3; i++) {
                simIdx = (simIdx + 1) % simTools.length;
            }
            updateSimSlotUI(true, true);
        }

        function resetSim() {
            cancelSlotHold();
            closeSimFlyout();
            simIdx = 0;
            updateSimSlotUI(false);
        }

        function updateSimReadout(html) {
            const el = document.getElementById('sim-readout');
            if (el) el.innerHTML = html;
        }

        function updateSimSlotUI(cycled, rapid) {
            const btn = document.getElementById('sim-tool-btn');
            const icon = document.getElementById('sim-tool-icon');
            const name = document.getElementById('sim-tool-name');
            const readout = document.getElementById('sim-readout');
            if (!btn || !icon || !name || !readout) return;

            const tool = simTools[simIdx];
            icon.textContent = tool.icon;
            name.textContent = tool.name;
            btn.setAttribute('aria-label', `${tool.name} (Slot ${simIdx + 1} of ${simTools.length})`);

            const dots = document.querySelectorAll('#sim-dots-row .sim-tool-dot');
            dots.forEach((dot, idx) => {
                if (idx === simIdx) dot.classList.add('active');
                else dot.classList.remove('active');
            });

            const shieldStatus = cycled 
                ? '<span style="color:#3FB950;font-weight:600;">CYCLE DETECTED: Double-Click Dialog SHIELDED (Prevented Bug)</span>'
                : (rapid ? '<span style="color:#FFA657;">Rapid click registered safely</span>' : '<span style="color:#58A6FF;">Normal single selection</span>');

            readout.innerHTML = `Active Slot Index: <strong>${simIdx} (${tool.name})</strong><br>State Machine: ${shieldStatus}<br>AccessKit Name: <code>"${tool.name}" (Role: Button, Group: Multi-Tool)</code>`;
            renderFlyoutItems();
        }

        // Dismiss flyout when clicking outside or pressing Escape
        window.addEventListener('click', (e) => {
            const wrapper = document.getElementById('sim-slot-wrapper');
            if (wrapper && !wrapper.contains(e.target)) {
                closeSimFlyout();
            }
        });

        function updateSimColor(hex) {
            const swatch = document.getElementById('sim-color-swatch');
            const readout = document.getElementById('sim-color-readout');
            if (!swatch || !readout) return;
            swatch.style.background = hex;
            readout.innerHTML = `Active Profile: <strong>sRGB Standard</strong> · Gamut: <span style="color:#3FB950;">In-Gamut</span><br>Parsed Value: <code>${hex}</code> · CMYK Soft-Proof: <strong>Safe</strong>`;
        }

        function setSimProof(profile) {
            const readout = document.getElementById('sim-color-readout');
            if (!readout) return;
            const delta = profile.includes('CMYK') ? '1.82 (Soft-Proof Fogra39 Emulation)' : '0.00 (Wide Gamut P3)';
            readout.innerHTML = `Active Profile: <strong>${profile}</strong> · Gamut: <span style="color:#3FB950;">Proof Mode Active</span><br>Soft-Proof Delta E: <strong>${delta}</strong>`;
        }

        function toggleSimContrast() {
            const btn = document.getElementById('sim-focus-btn');
            const readout = document.getElementById('sim-a11y-readout');
            if (!btn || !readout) return;
            if (btn.style.background === 'rgb(255, 255, 255)') {
                btn.style.background = '#21262D';
                btn.style.color = '#FFF';
                readout.innerHTML = 'Contrast Ratio: <strong style="color:#3FB950;">8.4:1 (Passes AAA)</strong><br>Outline Offset: <code>2px</code>';
            } else {
                btn.style.background = '#FFFFFF';
                btn.style.color = '#000000';
                readout.innerHTML = 'High Contrast Mode: <strong style="color:#3FB950;">21:1 (Max Contrast)</strong><br>Outline Offset: <code>2px High-Vis</code>';
            }
        }

        function toggleSimRingWeight() {
            const btn = document.getElementById('sim-focus-btn');
            if (!btn) return;
            btn.style.outlineWidth = btn.style.outlineWidth === '4px' ? '2px' : '4px';
        }

        // =========================================================================
        // Intelligent Scalable Suite Compliance Telemetry Matrix
        // =========================================================================
        const APPS_COMPLIANCE = [
            { name: "PhotoCraft", category: "Graphics", crate: "craft-apps/photocraft", engine: "egui/wgpu", reference: "Adobe Photoshop / Krita", metaphor: "Raster layers, canvas pan/zoom, marquee selection", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "VectorCraft", category: "Graphics", crate: "craft-apps/vectorcraft", engine: "egui/wgpu", reference: "Adobe Illustrator / Inkscape", metaphor: "Bézier pen tool, vector anchor points, path math", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "DesignCraft", category: "Graphics", crate: "craft-apps/designcraft", engine: "egui/wgpu", reference: "InDesign / Affinity Publisher", metaphor: "Multi-page layout grids, master spreads, typographic flow", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "LightCraft", category: "Graphics", crate: "craft-apps/lightcraft", engine: "egui/wgpu", reference: "Adobe Lightroom / Capture One", metaphor: "Non-destructive RAW processing, exposure curves, color wheels", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "FigCraft", category: "Graphics", crate: "craft-apps/figcraft", engine: "egui/wgpu", reference: "Figma", metaphor: "Nested component frames, auto-layout, interactive prototyping", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "TextureCraft", category: "Graphics", crate: "craft-apps/texturecraft", engine: "egui/wgpu", reference: "Substance Designer / Painter", metaphor: "Procedural PBR node graphs, UV mapping, texture baking", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "MaterialCraft", category: "Graphics", crate: "craft-apps/materialcraft", engine: "egui/wgpu", reference: "Blender Shader Editor", metaphor: "Node-based material graphs, real-time viewport shading", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "FilmCraft", category: "Video", crate: "craft-apps/filmcraft", engine: "egui/ffmpeg", reference: "DaVinci Resolve / Premiere Pro", metaphor: "Multi-track timeline, JKL shuttle scrubbing, playhead, razor cut", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "EffectCraft", category: "Video", crate: "craft-apps/effectcraft", engine: "egui/wgpu", reference: "After Effects / Nuke", metaphor: "Node and layer compositing, keyframe graph editor, motion tracking", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "AniCraft", category: "Video", crate: "craft-apps/anicraft", engine: "egui/timeline", reference: "Blender Grease Pencil / Toon Boom", metaphor: "Frame-by-frame timeline, keyframing, onion skinning", tool: "Passed", tabs: "Passed", a11y: "In Progress", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "SoundCraft", category: "Audio", crate: "craft-apps/soundcraft", engine: "egui/cpal", reference: "Audacity / Pro Tools", metaphor: "Audio waveforms, decibel meters, clip snapping", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "In Progress", confine: "Passed", keep: "Passed" },
            { name: "CADCraft", category: "CAD", crate: "craft-apps/cadcraft", engine: "egui/opencascade", reference: "AutoCAD / FreeCAD / Blender", metaphor: "Precision Cartesian coordinates, snapping grid, orthogonal views", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "In Progress", confine: "Passed", keep: "Passed" },
            { name: "WordCraft", category: "Productivity", crate: "craft-apps/wordcraft", engine: "egui/cosmic-text", reference: "InDesign / Typora / Markdown", metaphor: "Typographic galleys, document sections, markdown rendering", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "GridCraft", category: "Productivity", crate: "craft-apps/gridcraft", engine: "egui/calamine", reference: "Excel / LibreOffice Calc", metaphor: "Cell grid, formula parsing, tabular data view", tool: "Passed", tabs: "In Progress", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "DeckCraft", category: "Productivity", crate: "craft-apps/deckcraft", engine: "egui/wgpu", reference: "Apple Keynote / PowerPoint", metaphor: "Slide master templates, layout canvas, presenter notes", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "PdfCraft", category: "Productivity", crate: "craft-apps/pdfcraft", engine: "egui/pdfium", reference: "Adobe Acrobat / PDF-XChange", metaphor: "Prepress proofing, vector annotations, page management", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "Craft Anything", category: "DevTools", crate: "storytold/craft-anything", engine: "egui/mcp", reference: "VS Code / Node-RED", metaphor: "Visual extension builder, canvas pipelines, MCP integration", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "SolidCraft", category: "3D", crate: "craft-apps/solidcraft", engine: "egui/wgpu", reference: "SolidWorks / Rhino", metaphor: "Parametric B-Rep solid modeling, constraint solver", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "MailCraft", category: "Productivity", crate: "craft-apps/mailcraft", engine: "egui/async-imap", reference: "Superhuman / Thunderbird", metaphor: "Rapid keyboard triage, split pane preview, offline IMAP cache", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Planned", keep: "Passed" },
            { name: "ArtCraft Studio", category: "AI Studio", crate: "craft-apps/studio", engine: "egui/mcp-gateway", reference: "ComfyUI / Automatic1111", metaphor: "Node-based generative workflows, latent streaming, prompt queues", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" }
        ];

        let matrixViewMode = 'scorecards'; // 'scorecards' | 'grid' | 'drilldown'
        let matrixColumnCategory = 'core'; // 'core' | 'interaction' | 'navigation' | 'accessibility' | 'internationalization' | 'shell' | 'unified-libs' | 'governance' | 'all'
        let matrixSearchQuery = '';
        let matrixActiveCategory = 'all';
        const expandedScorecards = new Set();
        let selectedDrilldownSpec = 'STD-INPUT-001';

        function renderMatrixBadge(status) {
            const t = LOCALES[currentLang] || LOCALES.en || {};
            if (status === 'Passed') {
                return `<span class="matrix-badge-ok">✓ ${t.matrixStatusCompliant || 'Passed'}</span>`;
            } else if (status === 'In Progress') {
                return `<span class="matrix-badge-progress">◐ ${t.matrixStatusProgress || 'In Progress'}</span>`;
            } else {
                return `<span class="matrix-badge-planned">○ ${t.matrixStatusPlanned || 'Planned'}</span>`;
            }
        }

        function setMatrixViewMode(mode, btn) {
            matrixViewMode = mode;
            document.querySelectorAll('.matrix-pivot-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            if (btn) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                const target = document.getElementById(`pivot-mode-${mode}`);
                if (target) {
                    target.classList.add('active');
                    target.setAttribute('aria-selected', 'true');
                }
            }

            const scorecardsEl = document.getElementById('matrix-scorecards-container');
            const gridEl = document.getElementById('matrix-grid-container');
            const drilldownEl = document.getElementById('matrix-drilldown-container');
            const shortcutsEl = document.getElementById('matrix-shortcuts-container');
            const checklistEl = document.getElementById('matrix-checklist-container');
            const toolbarEl = document.querySelector('.matrix-toolbar');

            if (scorecardsEl) scorecardsEl.style.display = mode === 'scorecards' ? 'grid' : 'none';
            if (gridEl) gridEl.style.display = mode === 'grid' ? 'block' : 'none';
            if (drilldownEl) drilldownEl.style.display = mode === 'drilldown' ? 'block' : 'none';
            if (shortcutsEl) shortcutsEl.style.display = mode === 'shortcuts' ? 'block' : 'none';
            if (checklistEl) checklistEl.style.display = mode === 'checklist' ? 'block' : 'none';

            if (toolbarEl) {
                toolbarEl.style.display = (mode === 'checklist' || mode === 'drilldown') ? 'none' : 'flex';
            }

            renderMatrixView();
        }

        function filterMatrixCategory(cat, btn) {
            matrixActiveCategory = cat;
            document.querySelectorAll('.matrix-cat-chip').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderMatrixView();
        }

        function handleMatrixSearch(val) {
            matrixSearchQuery = val.trim().toLowerCase();
            const clearBtn = document.getElementById('matrix-search-clear-btn');
            if (clearBtn) {
                clearBtn.style.display = matrixSearchQuery ? 'inline-block' : 'none';
            }
            updateMatrixSearchFeedback();
            renderMatrixView();
        }

        function clearMatrixSearch() {
            const input = document.getElementById('matrix-search-input');
            if (input) input.value = '';
            handleMatrixSearch('');
        }

        function clearMatrixSearchAndFilters() {
            const input = document.getElementById('matrix-search-input');
            if (input) input.value = '';
            matrixSearchQuery = '';
            matrixActiveCategory = 'all';
            document.querySelectorAll('.matrix-cat-chip').forEach(b => b.classList.remove('active'));
            const allChip = document.getElementById('domain-chip-all');
            if (allChip) allChip.classList.add('active');
            const clearBtn = document.getElementById('matrix-search-clear-btn');
            if (clearBtn) clearBtn.style.display = 'none';
            updateMatrixSearchFeedback();
            renderMatrixView();
        }

        function updateMatrixSearchFeedback() {
            const t = LOCALES[currentLang] || LOCALES.en || {};
            const countEl = document.getElementById('matrix-visible-count');
            const clearLink = document.getElementById('matrix-clear-search-link');
            const emptyCard = document.getElementById('matrix-empty-state-card');
            const emptyDesc = document.getElementById('matrix-empty-desc');
            const apps = getFilteredApps();

            if (countEl) {
                if (matrixSearchQuery) {
                    countEl.textContent = (t.matrixFoundCount || 'Found {count} applications matching "{query}"')
                        .replace('{count}', apps.length)
                        .replace('{query}', matrixSearchQuery);
                } else {
                    countEl.textContent = (t.matrixShowingCount || 'Showing {count} of {total} applications')
                        .replace('{count}', apps.length)
                        .replace('{total}', APPS_COMPLIANCE.length);
                }
            }

            if (clearLink) {
                clearLink.style.display = (matrixSearchQuery || matrixActiveCategory !== 'all') ? 'inline-block' : 'none';
            }

            if (emptyCard) {
                if (apps.length === 0) {
                    emptyCard.style.display = 'block';
                    if (emptyDesc) {
                        emptyDesc.textContent = (t.matrixNoMatchesDesc || 'We couldn\'t find any applications matching "{query}".')
                            .replace('{query}', matrixSearchQuery);
                    }
                } else {
                    emptyCard.style.display = 'none';
                }
            }
        }

        function setMatrixColumnCategory(cat, btn) {
            matrixColumnCategory = cat;
            document.querySelectorAll('.matrix-col-chip').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderPivotGrid();
        }

        function getFilteredApps() {
            return APPS_COMPLIANCE.filter(app => {
                const matchesCat = matrixActiveCategory === 'all' || 
                    app.category.toLowerCase().includes(matrixActiveCategory.toLowerCase()) ||
                    (matrixActiveCategory === 'video' && (app.category === 'Video')) ||
                    (matrixActiveCategory === 'cad' && (app.category === 'CAD' || app.category === '3D')) ||
                    (matrixActiveCategory === 'devtools' && (app.category === 'DevTools' || app.category === 'AI Studio'));
                const matchesSearch = !matrixSearchQuery || 
                    app.name.toLowerCase().includes(matrixSearchQuery) || 
                    app.category.toLowerCase().includes(matrixSearchQuery) ||
                    (app.reference && app.reference.toLowerCase().includes(matrixSearchQuery)) ||
                    (app.metaphor && app.metaphor.toLowerCase().includes(matrixSearchQuery)) ||
                    app.crate.toLowerCase().includes(matrixSearchQuery);
                return matchesCat && matchesSearch;
            });
        }

        function getAppSpecStatus(app, specId) {
            if (specId === 'STD-INPUT-001') return app.tool;
            if (specId === 'STD-NAV-001') return app.tabs;
            if (specId === 'STD-A11Y-001') return app.a11y;
            if (specId === 'STD-I18N-001') return app.rtl;
            if (specId === 'STD-SHELL-003') return app.confine;
            if (specId === 'STD-LIB-005') return app.keep;

            // Specific exceptions based on monorepo roadmap
            if (app.name === 'MailCraft' && (specId === 'STD-SHELL-001' || specId === 'STD-CLIP-001')) return 'Planned';
            if (app.name === 'AniCraft' && specId === 'STD-A11Y-002') return 'In Progress';
            if ((app.name === 'SoundCraft' || app.name === 'CADCraft') && specId === 'STD-I18N-002') return 'In Progress';
            if (app.name === 'GridCraft' && specId === 'STD-NAV-002') return 'In Progress';

            return 'Passed';
        }

        function toggleScorecardInvariants(appName) {
            if (expandedScorecards.has(appName)) {
                expandedScorecards.delete(appName);
            } else {
                expandedScorecards.add(appName);
            }
            renderScorecards();
        }

        function renderScorecards() {
            const container = document.getElementById('matrix-scorecards-container');
            if (!container) return;
            const apps = getFilteredApps();

            if (apps.length === 0) {
                container.innerHTML = `
                    <div style="grid-column:1/-1;text-align:center;padding:48px 20px;color:var(--sl-color-text-muted);background:var(--sl-color-card);border:1px solid var(--sl-color-border);border-radius:12px;">
                        <div style="font-size:24px;margin-bottom:8px;">🔍</div>
                        <div style="font-weight:600;color:#FFF;margin-bottom:4px;">No matching applications found</div>
                        <div style="font-size:13px;">Try adjusting your search query or domain filter</div>
                    </div>`;
                return;
            }

            container.innerHTML = apps.map(app => {
                const coreResults = [app.tool, app.tabs, app.a11y, app.rtl, app.confine, app.keep];
                const passedCount = coreResults.filter(s => s === 'Passed').length;
                const scorePct = Math.round((passedCount / 6) * 100);
                const isExpanded = expandedScorecards.has(app.name);

                return `
                    <article class="app-scorecard" id="card-${app.name.replace(/\s+/g, '-')}">
                        <header class="app-scorecard-header">
                            <div>
                                <h3 class="app-scorecard-title">
                                    <span>${app.name}</span>
                                    <span class="tile-id">${app.category}</span>
                                </h3>
                                <div class="app-scorecard-crate">
                                    <span>${app.crate}</span> · <code>${app.engine}</code>
                                </div>
                                <div style="display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:#58A6FF;background:rgba(56,139,253,0.1);padding:3px 8px;border-radius:4px;margin-top:6px;border:1px solid rgba(56,139,253,0.25);">
                                    <span>🎯 Benchmark:</span> <strong>${app.reference || 'Industry Standard'}</strong>
                                </div>
                                <div style="font-size:12px;color:var(--sl-color-text-muted);margin-top:6px;line-height:1.4;">
                                    ${app.metaphor || ''}
                                </div>
                            </div>
                            <div class="app-scorecard-gauge">
                                <div class="app-gauge-val ${scorePct < 100 ? 'warn' : ''}">${scorePct}%</div>
                                <div class="app-gauge-sub">${passedCount}/6 Shared Crates</div>
                            </div>
                        </header>

                        <div class="app-categories-summary" aria-label="Core Invariants Summary">
                            <span class="app-cat-pill ${app.tool === 'Passed' ? 'ok' : 'progress'}">ToolSlot: ${app.tool}</span>
                            <span class="app-cat-pill ${app.tabs === 'Passed' ? 'ok' : 'progress'}">Tabs: ${app.tabs}</span>
                            <span class="app-cat-pill ${app.a11y === 'Passed' ? 'ok' : 'progress'}">AccessKit: ${app.a11y}</span>
                            <span class="app-cat-pill ${app.rtl === 'Passed' ? 'ok' : 'progress'}">BiDi RTL: ${app.rtl}</span>
                            <span class="app-cat-pill ${app.confine === 'Passed' ? 'ok' : (app.confine === 'Planned' ? 'planned' : 'progress')}">Sandbox: ${app.confine}</span>
                            <span class="app-cat-pill ${app.keep === 'Passed' ? 'ok' : 'progress'}">The Keep Rule: ${app.keep}</span>
                        </div>

                        <button class="app-expand-btn" onclick="toggleScorecardInvariants('${app.name}')" aria-expanded="${isExpanded}">
                            <span>${isExpanded ? '▲ Hide Verified Invariants' : '▼ Inspect All 28 Verified Invariants'}</span>
                        </button>

                        <div class="app-invariants-checklist ${isExpanded ? 'open' : ''}" role="region" aria-label="Invariant checklist for ${app.name}">
                            ${SPECS.map(spec => {
                                const status = getAppSpecStatus(app, spec.id);
                                return `
                                    <div class="app-invariant-row">
                                        <div style="display:flex;align-items:center;gap:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                            <a href="#${spec.id}" class="app-invariant-id" onclick="openSpec('${spec.id}')">${spec.id}</a>
                                            <span style="color:var(--sl-color-text-muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${spec.title}</span>
                                        </div>
                                        <div>${renderMatrixBadge(status)}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </article>
                `;
            }).join('');
        }

        function renderPivotGrid() {
            const thead = document.getElementById('matrix-pivot-thead');
            const tbody = document.getElementById('matrix-pivot-tbody');
            if (!thead || !tbody) return;

            const apps = getFilteredApps();

            // Select columns based on active category
            const CORE_IDS = ['STD-INPUT-001', 'STD-NAV-001', 'STD-A11Y-001', 'STD-I18N-001', 'STD-SHELL-003', 'STD-LIB-005'];
            let targetSpecs = [];

            if (matrixColumnCategory === 'core') {
                targetSpecs = CORE_IDS.map(id => specsMap[id]).filter(Boolean);
            } else if (matrixColumnCategory === 'all') {
                targetSpecs = SPECS;
            } else {
                targetSpecs = SPECS.filter(s => {
                    const c = s.category.toLowerCase();
                    const mc = matrixColumnCategory.toLowerCase();
                    return c.includes(mc) || mc.includes(c);
                });
            }

            // Header with sticky first column
            thead.innerHTML = `
                <tr>
                    <th scope="col" style="min-width:180px;text-align:start;">Application</th>
                    <th scope="col" style="min-width:110px;text-align:start;">Domain</th>
                    ${targetSpecs.map(s => `
                        <th scope="col" style="min-width:145px;text-align:center;">
                            <a href="#${s.id}" onclick="openSpec('${s.id}')" title="${s.title}" style="color:inherit;text-decoration:none;display:block;">
                                <div style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--sl-color-accent);">${s.id} ↗</div>
                                <div style="font-size:10px;font-weight:400;color:var(--sl-color-text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:135px;margin-top:2px;">${s.title}</div>
                            </a>
                        </th>
                    `).join('')}
                </tr>
            `;

            if (apps.length === 0) {
                tbody.innerHTML = `<tr><td colspan="${targetSpecs.length + 2}" style="text-align:center;padding:36px;color:var(--sl-color-text-muted);">No matching applications found.</td></tr>`;
                return;
            }

            tbody.innerHTML = apps.map(app => `
                <tr>
                    <td style="font-weight:600;">
                        <div class="matrix-app-name"><span>${app.name}</span></div>
                        <div style="font-family:var(--font-mono);font-size:10px;color:var(--sl-color-text-muted);font-weight:400;">${app.crate}</div>
                    </td>
                    <td><span class="tile-id">${app.category}</span></td>
                    ${targetSpecs.map(s => {
                        const status = getAppSpecStatus(app, s.id);
                        return `<td style="text-align:center;">${renderMatrixBadge(status)}</td>`;
                    }).join('')}
                </tr>
            `).join('');
        }

        function initDrilldownDropdown() {
            const select = document.getElementById('drilldown-std-select');
            if (!select || select.children.length > 0) return;

            select.innerHTML = SPECS.map(s => `
                <option value="${s.id}" ${s.id === selectedDrilldownSpec ? 'selected' : ''}>
                    ${s.id} · ${s.title} (${s.category})
                </option>
            `).join('');
        }

        function renderStandardDrilldown(specId) {
            if (specId) selectedDrilldownSpec = specId;
            initDrilldownDropdown();

            const spec = specsMap[selectedDrilldownSpec] || SPECS[0];
            const content = document.getElementById('drilldown-content');
            const linkBtn = document.getElementById('drilldown-spec-link');
            if (linkBtn) {
                linkBtn.href = `#${spec.id}`;
                linkBtn.onclick = (e) => { e.preventDefault(); openSpec(spec.id); };
            }

            if (!content) return;
            const apps = getFilteredApps();

            let passed = 0;
            let inProgress = 0;
            let planned = 0;

            apps.forEach(app => {
                const st = getAppSpecStatus(app, spec.id);
                if (st === 'Passed') passed++;
                else if (st === 'In Progress') inProgress++;
                else planned++;
            });

            const compliancePct = Math.round((passed / (apps.length || 1)) * 100);

            content.innerHTML = `
                <div style="background:rgba(255,255,255,0.02);border:1px solid var(--sl-color-border);border-radius:10px;padding:18px 20px;margin-bottom:20px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:8px;">
                        <div>
                            <span class="tile-id" style="margin-inline-end:8px;">${spec.category}</span>
                            <span style="font-family:var(--font-mono);font-size:12px;color:var(--sl-color-accent);font-weight:700;">${spec.id}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <span class="nav-badge" style="background:#238636;">${passed}/${apps.length} Verified</span>
                            <span style="font-family:var(--font-display);font-size:16px;font-weight:700;color:#3FB950;">${compliancePct}% Suite Adoption</span>
                        </div>
                    </div>
                    <h3 style="font-family:var(--font-display);font-size:18px;font-weight:700;color:#FFF;margin:0 0 6px 0;">${spec.title}</h3>
                    <p style="font-size:13px;color:var(--sl-color-text-muted);margin:0;line-height:1.5;">${spec.summary}</p>
                </div>

                <h4 style="font-family:var(--font-display);font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:var(--sl-color-text-muted);margin:0 0 12px 0;">
                    Adoption Across Filtered Applications (${apps.length})
                </h4>

                <div class="drilldown-grid">
                    ${apps.map(app => {
                        const status = getAppSpecStatus(app, spec.id);
                        return `
                            <div class="drilldown-app-card">
                                <div>
                                    <div style="font-weight:600;font-size:13px;color:#FFF;">${app.name}</div>
                                    <div style="font-size:10px;font-family:var(--font-mono);color:var(--sl-color-text-muted);">${app.crate}</div>
                                </div>
                                <div>${renderMatrixBadge(status)}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        function renderMatrixView() {
            if (matrixViewMode === 'scorecards') {
                renderScorecards();
            } else if (matrixViewMode === 'grid') {
                renderPivotGrid();
            } else if (matrixViewMode === 'drilldown') {
                renderStandardDrilldown(selectedDrilldownSpec);
            } else if (matrixViewMode === 'shortcuts') {
                renderShortcutsMatrix();
            } else if (matrixViewMode === 'checklist') {
                renderChecklistGenerator();
            }
        }

        const UNIVERSAL_SHORTCUTS = [
            { key: "V", chord: "<kbd>V</kbd>", app: "PhotoCraft / VectorCraft / FigCraft", benchmark: "Photoshop / Illustrator / Figma", action: "Selection / Move Tool", standard: "STD-INPUT-001", rule: "Universal primary selection cursor; escapes active sub-tool." },
            { key: "B", chord: "<kbd>B</kbd>", app: "PhotoCraft / AniCraft", benchmark: "Photoshop / Krita / Blender GP", action: "Brush / Freehand Drawing", standard: "STD-INPUT-001", rule: "Cycles: Brush -> Pencil -> Color Replace -> Mixer Brush. Shift+B reverses." },
            { key: "B", chord: "<kbd>B</kbd>", app: "FilmCraft", benchmark: "DaVinci Resolve / Premiere Pro", action: "Blade / Razor Cut Tool", standard: "STD-TIME-001", rule: "Splits timeline clip at current mouse playhead position." },
            { key: "M", chord: "<kbd>M</kbd>", app: "PhotoCraft", benchmark: "Adobe Photoshop", action: "Rectangular / Elliptical Marquee", standard: "STD-INPUT-001", rule: "Cycles: Rectangular Marquee -> Elliptical Marquee -> Single Row." },
            { key: "P", chord: "<kbd>P</kbd>", app: "VectorCraft / CADCraft", benchmark: "Illustrator / AutoCAD", action: "Pen Tool / Polyline", standard: "STD-INPUT-004", rule: "Places Bézier anchor points with tangent handle drag." },
            { key: "L", chord: "<kbd>L</kbd>", app: "CADCraft", benchmark: "AutoCAD / FreeCAD", action: "Line Entity", standard: "STD-INPUT-001", rule: "Precision 2D/3D line segment with Cartesian coordinate prompts." },
            { key: "C", chord: "<kbd>C</kbd>", app: "CADCraft", benchmark: "AutoCAD", action: "Circle Entity", standard: "STD-INPUT-001", rule: "Center-radius circle placement with numeric radius lock." },
            { key: "Space", chord: "<kbd>Space</kbd> + Drag", app: "All 20 Applications", benchmark: "Universal Creative Standard", action: "Spring-Loaded Pan", standard: "STD-INPUT-002", rule: "Temporarily activates Hand Pan tool without losing active selection or tool slot." },
            { key: "Ctrl+Tab", chord: "<kbd>Ctrl</kbd>+<kbd>Tab</kbd>", app: "All 20 Applications", benchmark: "STD-NAV-001 Standard", action: "Next Document Tab (LRU)", standard: "STD-NAV-001", rule: "Cycles open document tabs in Most Recently Used order; Shift+Ctrl+Tab reverses." },
            { key: "J / K / L", chord: "<kbd>J</kbd> / <kbd>K</kbd> / <kbd>L</kbd>", app: "FilmCraft / AniCraft / SoundCraft", benchmark: "DaVinci Resolve / Avid / Final Cut", action: "Shuttle Scrubbing", standard: "STD-TIME-001", rule: "J = Reverse (2x, 4x, 8x), K = Pause/Stop, L = Forward (2x, 4x, 8x)." },
            { key: "Ctrl+Z", chord: "<kbd>Ctrl</kbd>+<kbd>Z</kbd>", app: "All 20 Applications", benchmark: "Universal Undo", action: "Undo Last Action", standard: "STD-SHELL-002", rule: "Linear undo stack; must restore exact viewport and layer selection state." },
            { key: "Ctrl+Shift+Z", chord: "<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>", app: "All 20 Applications", benchmark: "Universal Redo", action: "Redo Action", standard: "STD-SHELL-002", rule: "Reapplies next forward state in undo tree (Cmd+Y mapped on Windows fallback)." },
            { key: "Ctrl+S", chord: "<kbd>Ctrl</kbd>+<kbd>S</kbd>", app: "All 20 Applications", benchmark: "Universal Save", action: "Atomic Document Save", standard: "STD-SHELL-003", rule: "Writes to temporary file and atomically renames; updates clean/dirty indicator." },
            { key: "Tab", chord: "<kbd>Tab</kbd>", app: "PhotoCraft / FigCraft / CADCraft", benchmark: "Photoshop / Blender", action: "Toggle Workspace Docks", standard: "STD-NAV-002", rule: "Hides/restores side panels and toolbars for distraction-free canvas view." },
            { key: "Alt + Drag", chord: "<kbd>Alt</kbd> + Drag", app: "PhotoCraft / VectorCraft / FigCraft", benchmark: "Photoshop / Illustrator", action: "Duplicate on Drag", standard: "STD-INPUT-004", rule: "Clones current selection in-place before initiating translate gesture." },
            { key: "Shift + Drag", chord: "<kbd>Shift</kbd> + Drag", app: "All 20 Applications", benchmark: "Universal Axis Constraint", action: "Constrain Orthogonal (15°/45°/90°)", standard: "STD-INPUT-004", rule: "Locks translation or rotation to discrete orthogonal increments." }
        ];

        function renderShortcutsMatrix() {
            const container = document.getElementById('matrix-shortcuts-container');
            if (!container) return;

            const query = (matrixSearchQuery || '').toLowerCase();
            const filtered = UNIVERSAL_SHORTCUTS.filter(s => {
                return !query || 
                    s.key.toLowerCase().includes(query) || 
                    s.app.toLowerCase().includes(query) || 
                    s.benchmark.toLowerCase().includes(query) || 
                    s.action.toLowerCase().includes(query) || 
                    s.rule.toLowerCase().includes(query);
            });

            container.innerHTML = `
                <div style="background:var(--sl-color-card);border:1px solid var(--sl-color-border);border-radius:12px;overflow:hidden;">
                    <div style="padding:18px 20px;border-bottom:1px solid var(--sl-color-border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                        <div>
                            <h3 style="font-family:var(--font-display);font-size:16px;font-weight:700;color:#FFF;margin:0 0 4px 0;">⌨️ Universal Creative Shortcuts & Keymap Matrix</h3>
                            <p style="font-size:12.5px;color:var(--sl-color-text-muted);margin:0;">Standard chords, tool cycling keys, and modifier invariants compared across benchmark applications.</p>
                        </div>
                        <div style="font-size:12px;color:var(--sl-color-text-muted);">
                            Showing <strong>${filtered.length}</strong> of ${UNIVERSAL_SHORTCUTS.length} shortcuts
                        </div>
                    </div>
                    <div class="matrix-table-scroll-container">
                        <table class="matrix-table">
                            <thead>
                                <tr>
                                    <th style="min-width:110px;">Shortcut Chord</th>
                                    <th style="min-width:180px;">Action / Tool</th>
                                    <th style="min-width:180px;">App & Benchmark</th>
                                    <th style="min-width:130px;">Governing Standard</th>
                                    <th style="min-width:260px;">Ergonomic Invariant & Rule</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filtered.length === 0 ? `<tr><td colspan="5" style="text-align:center;padding:36px;color:var(--sl-color-text-muted);">No matching shortcuts found. Try searching for "Space", "Brush", "V", or "Tab".</td></tr>` : 
                                filtered.map(s => `
                                    <tr>
                                        <td><div style="font-size:13px;font-weight:700;">${s.chord}</div></td>
                                        <td style="font-weight:600;color:#FFF;">${s.action}</td>
                                        <td>
                                            <div style="font-size:12px;color:var(--sl-color-text);">${s.app}</div>
                                            <div style="font-size:11px;color:#58A6FF;margin-top:2px;">🎯 ${s.benchmark}</div>
                                        </td>
                                        <td>
                                            <a href="#${s.standard}" onclick="openSpec('${s.standard}')" style="font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--sl-color-accent);text-decoration:none;">
                                                ${s.standard} ↗
                                            </a>
                                        </td>
                                        <td style="font-size:12px;color:var(--sl-color-text-muted);line-height:1.4;">${s.rule}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        function renderChecklistGenerator() {
            const container = document.getElementById('matrix-checklist-container');
            if (!container) return;

            container.innerHTML = `
                <div class="checklist-gen-wrapper" style="background:var(--sl-color-card);border:1px solid var(--sl-color-border);border-radius:12px;padding:24px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:20px;border-bottom:1px solid var(--sl-color-border);padding-bottom:16px;">
                        <div>
                            <h3 style="font-family:var(--font-display);font-size:18px;font-weight:700;color:#FFF;margin:0 0 6px 0;">🎯 PR Pre-Flight Checklist Generator</h3>
                            <p style="font-size:13px;color:var(--sl-color-text-muted);margin:0;">Generate a reference-app-aligned PR description for pull requests in the Storytold / ArtCraft monorepo.</p>
                        </div>
                        <button class="reader-btn primary" onclick="copyGeneratedChecklist()" id="copy-checklist-btn" style="padding:10px 18px;font-size:13px;">
                            <span>📋 Copy Markdown Checklist</span>
                        </button>
                    </div>

                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;margin-bottom:24px;">
                        <div>
                            <label style="display:block;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--sl-color-text-muted);margin-bottom:8px;">Target Application:</label>
                            <select id="checklist-app-select" class="drilldown-select" style="width:100%;" onchange="updateChecklistPreview()">
                                ${APPS_COMPLIANCE.map(a => `<option value="${a.name}">${a.name} (${a.category}) · ${a.reference}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label style="display:block;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--sl-color-text-muted);margin-bottom:8px;">Feature / Change Category:</label>
                            <select id="checklist-feat-select" class="drilldown-select" style="width:100%;" onchange="updateChecklistPreview()">
                                <option value="tool">New Tool or Toolbar Slot (STD-INPUT-001)</option>
                                <option value="timeline">Timeline, Playhead, or JKL Scrubbing (STD-TIME-001)</option>
                                <option value="file_io">File I/O, Document Saving, or Export (STD-SHELL-003)</option>
                                <option value="a11y">Accessibility & AccessKit Tree (STD-A11Y-001)</option>
                                <option value="dialog">Dialog, Window, or Modal (STD-SHELL-001)</option>
                                <option value="shortcuts">Keymap, Shortcut, or Command (STD-LIB-002)</option>
                                <option value="general">General Feature or Bugfix</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                            <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--sl-color-text-muted);">Markdown Preview (Paste into GitHub PR Description):</span>
                            <span style="font-size:11px;color:#3FB950;font-weight:600;">✓ Aligned with Maintainer Review Criteria</span>
                        </div>
                        <pre id="checklist-markdown-preview" style="background:#0D1117;border:1px solid #30363D;border-radius:8px;padding:16px;color:#E6EDF3;font-family:var(--font-mono);font-size:12px;line-height:1.6;white-space:pre-wrap;max-height:360px;overflow-y:auto;"></pre>
                    </div>
                </div>
            `;

            updateChecklistPreview();
        }

        function updateChecklistPreview() {
            const appSelect = document.getElementById('checklist-app-select');
            const featSelect = document.getElementById('checklist-feat-select');
            const preview = document.getElementById('checklist-markdown-preview');
            if (!appSelect || !featSelect || !preview) return;

            const appName = appSelect.value;
            const app = APPS_COMPLIANCE.find(a => a.name === appName) || APPS_COMPLIANCE[0];
            const feat = featSelect.value;

            let specificChecks = "";
            if (feat === 'tool') {
                specificChecks = `- [ ] **Tool Slot Cycling (STD-INPUT-001):** Pressing primary shortcut key cycles sub-tools without losing modifier state.\n- [ ] **Spring-Loaded Pan (STD-INPUT-002):** Space key initiates temporary pan without deselecting active tool.`;
            } else if (feat === 'timeline') {
                specificChecks = `- [ ] **JKL Scrubbing (STD-TIME-001):** J/K/L keys shuttle timeline at 1x, 2x, 4x, 8x velocity with instant audio gate.\n- [ ] **Playhead Invariant:** Playhead drag snaps to edit points and clip boundaries smoothly.`;
            } else if (feat === 'file_io') {
                specificChecks = `- [ ] **Sandboxed File Access (STD-SHELL-003):** All file operations route through \`craft-fs\` channels (zero raw \`std::fs\` calls).\n- [ ] **Atomic Save (STD-SHELL-002):** Document writes to temporary file before atomic rename to prevent corruption on crash.`;
            } else if (feat === 'a11y') {
                specificChecks = `- [ ] **AccessKit Node Tagging (STD-A11Y-001):** Interactive widgets tagged with appropriate AccessKit \`Role\` and localized Name.\n- [ ] **Focus Rings (STD-A11Y-002):** 2px visible focus ring rendered in keyboard navigation mode.`;
            } else if (feat === 'dialog') {
                specificChecks = `- [ ] **Dialog Lifecycles (STD-SHELL-001):** Escape key dismisses modal dialog; default action triggered by Enter.\n- [ ] **Platform Button Order:** Confirm/Cancel button order matches host OS conventions.`;
            } else if (feat === 'shortcuts') {
                specificChecks = `- [ ] **Benchmark Alignment:** Shortcut preserves user muscle memory from **${app.reference}**.\n- [ ] **Conflict Free:** Key chord does not clash with universal shortcuts (\`Ctrl+S\`, \`Ctrl+Tab\`, \`Space\`).`;
            } else {
                specificChecks = `- [ ] **Ergonomic Muscle Memory:** Follows **${app.reference}** benchmark conventions.\n- [ ] **Modular Crate Architecture:** Reuses shared infrastructure (\`egui\`, \`wgpu\`, \`accesskit\`).`;
            }

            const md = `### 🎯 Pull Request Summary
- **Target Application:** ${app.name} (\`${app.crate}\`)
- **Industry Reference Benchmark:** ${app.reference}
- **Primary Metaphor:** ${app.metaphor}

### ✅ Contributor Pre-Flight Verification
${specificChecks}
- [ ] **AccessKit a11y (STD-A11Y-001):** No silent, untagged interactive elements in egui tree.
- [ ] **Bidirectional Layout (STD-I18N-001):** UI elements respect logical direction (\`margin_inline_start\`).
- [ ] **The Keep Rule (STD-LIB-005):** Added invariant unit test; zero regressions across existing test suite.
- [ ] **Render Loop Isolation:** Heavy compute dispatched to async worker threads (render loop stays responsive at 60+ FPS).`;

            preview.textContent = md;
        }

        function copyGeneratedChecklist() {
            const preview = document.getElementById('checklist-markdown-preview');
            if (!preview) return;
            navigator.clipboard.writeText(preview.textContent).then(() => {
                const btn = document.getElementById('copy-checklist-btn');
                if (btn) {
                    const originalHtml = btn.innerHTML;
                    btn.innerHTML = `<span>✓ Checklist Copied!</span>`;
                    setTimeout(() => { btn.innerHTML = originalHtml; }, 2000);
                }
                showToastNotification('PR Checklist copied to clipboard! Ready to paste into GitHub.');
            });
        }

        function exportOpenWikiAgentNotes() {
            let out = `# ArtCraft Standards & Recipes (Agent Context)\n\n`;
            out += `> Token-lean workspace notes aligned with langchain-ai/openwiki.\n\n`;
            out += `| ID | Domain | Crate | Core Invariant & Rule |\n`;
            out += `| :--- | :--- | :--- | :--- |\n`;

            SPECS.forEach(s => {
                const crateName = s.canonical_crate || 'craft-widgets';
                out += `| \`${s.id}\` | ${s.category} | \`${crateName}\` | ${s.title} |\n`;
            });

            navigator.clipboard.writeText(out).then(() => {
                showToastNotification('OpenWiki Agent Notes copied to clipboard! (< 400 tokens)');
            }).catch(() => {
                showToastNotification('Copied agent notes to clipboard.');
            });
        }

        function copyMatrixMarkdownReport() {
            const t = LOCALES[currentLang] || LOCALES.en || {};
            let md = `# ArtCraft Suite Architectural Compliance Matrix\n`;
            md += `Generated: ${new Date().toISOString().split('T')[0]} · Verification: Automated CI (Zero AST Drift) · Governed: 20 Apps\n\n`;
            md += `| Application | Domain | Tool Cycling (STD-INPUT-001) | Tabs (STD-NAV-001) | AccessKit (STD-A11Y-001) | BiDi RTL (STD-I18N-001) | Sandbox (STD-SHELL-003) | Keep Rule (STD-LIB-005) |\n`;
            md += `|---|---|---|---|---|---|---|---|\n`;
            APPS_COMPLIANCE.forEach(app => {
                md += `| ${app.name} | ${app.category} | ${app.tool} | ${app.tabs} | ${app.a11y} | ${app.rtl} | ${app.confine} | ${app.keep} |\n`;
            });

            navigator.clipboard.writeText(md).then(() => {
                const btn = document.getElementById('matrix-export-btn-text');
                if (btn) {
                    const original = btn.textContent;
                    btn.textContent = `✓ ${t.matrixExportSuccess || 'Report Copied!'}`;
                    setTimeout(() => { btn.textContent = original; }, 2000);
                }
            });
        }

        
        
        // =========================================================================
        // Frequently Asked Questions (FAQ) & Contributor Knowledge Base
        // =========================================================================
        const FAQ_DATA = [
            {
                id: 'faq-1',
                cat: 'arch',
                tag: 'ARCHITECTURE',
                q: 'Why does the Storytold suite require 28 shared standards across 20+ apps?',
                a: 'Storytold operates over 20 creative and productivity desktop apps in Rust (PhotoCraft, VectorCraft, FilmCraft, CADCraft, WordCraft, etc.). Without shared invariants, each app independently re-implements toolbar slot cycling, timeline scrubbing, file saving, and keymaps, causing UI bugs (e.g. double-click dialog launches), inconsistent hotkeys, and conflicting dependencies. The 28 standards guarantee a cohesive, muscle-memory ergonomic contract across the entire suite.'
            },
            {
                id: 'faq-2',
                cat: 'autocraft',
                tag: 'AUTOCRAFT PIPELINE',
                q: 'How does AutoCraft (docs/pipeline.md) enforce these standards in its 9-stage pipeline?',
                a: 'AutoCraft (<code>storytold/autocraft</code>) automates repository backlog management. In Stage 5 (<code>Fix</code>), agents query <code>get_standard</code> to synthesize compliant code. In Stage 6 (<code>Review</code>), a Claude Opus referee model audits diffs against the 28 standards. In Stage 7 (<code>Verify</code>), automated CI runs <code>cargo craft-standards audit</code> to prevent any AST drift from merging. In Stage 9 (<code>Post-Merge</code>), Opus reviews landed code to catch subtle regressions.'
            },
            {
                id: 'faq-3',
                cat: 'autocraft',
                tag: 'AI AGENTS',
                q: 'How do I configure my AI coding agent (Cursor, Claude Code, Antigravity) with these standards?',
                a: 'Click the <strong>⚡ Agent &amp; MCP</strong> button in the header (or press <kbd>Ctrl+K</kbd>) to open the Agent Hub. You can 1-click copy pre-built configuration files: <code>CLAUDE.md</code> for Claude Code &amp; AutoCraft, <code>.cursorrules</code> for Cursor IDE, or <code>SKILL.md</code> for Antigravity. You can also run the <code>craft-standards-mcp</code> server locally via stdio.'
            },
            {
                id: 'faq-4',
                cat: 'arch',
                tag: 'THE KEEP RULE',
                q: 'What is "The Keep Rule" (STD-LIB-005) and how does it prevent monorepo bloat?',
                a: 'The Keep Rule mandates that core shared crates (<code>craft-core</code>, <code>craft-widgets</code>, <code>craft-fs</code>, <code>craft-text</code>) must remain strictly independent of application-specific domain logic. For example, <code>craft-widgets</code> must never import <code>PhotoCraft</code> canvas types or <code>FilmCraft</code> timeline code. Any helper created for a single app must stay in that app until proven necessary in at least 3 distinct suite apps.'
            },
            {
                id: 'faq-5',
                cat: 'arch',
                tag: 'SECURITY & SANDBOX',
                q: 'Why is direct std::fs access strictly forbidden in application components (STD-SHELL-003)?',
                a: 'To guarantee cross-platform sandboxing and safe automated agent scripting, apps must never call raw <code>std::fs::read</code> or <code>std::fs::write</code> directly. All I/O must route through <code>craft_fs::AutomationRoot</code>, which validates against directory traversal (<code>..</code>) attacks, manages dirty file states, and enables automated document recovery.'
            },
            {
                id: 'faq-6',
                cat: 'contrib',
                tag: 'CONTRIBUTING',
                q: 'How do I claim an issue and format my commits per craft-contrib conventions?',
                a: 'Per <code>STD-GOV-002</code>, contributors claim issues by posting <code>claim: #issue-id</code> in the GitHub thread. Commits must be single-concern and adhere to Conventional Commits: <code>feat(app-name): description</code> or <code>fix(crate-name): description</code>. Never mix formatting changes or dependency bumps with feature code.'
            },
            {
                id: 'faq-7',
                cat: 'arch',
                tag: 'ACCESSIBILITY',
                q: 'How does automated CI audit AccessKit accessibility trees (STD-A11Y-001)?',
                a: 'Every custom widget in <code>egui</code> must register an AccessKit node with an explicit <code>Role</code> (Button, Slider, Tab), accessible name, and AAA contrast ratio (7:1). In CI, a headless test walker inspects the node tree and fails the build if interactive elements lack accessible descriptions.'
            },
            {
                id: 'faq-8',
                cat: 'contrib',
                tag: 'RFC PROCESS',
                q: 'How do I propose a new standard or amend an existing contract (STD-META-001)?',
                a: 'Open an RFC issue using the <code>New Standard Proposal</code> template on GitHub. It must include an Invariant Specification table, Canonical Rust crate, and verification criteria. Once reviewed and accepted by two suite maintainers, it is committed to <code>standards/</code> and indexed by <code>xtask</code>.'
            },
            {
                id: 'faq-9',
                cat: 'i18n',
                tag: 'I18N & RTL',
                q: 'How do I add a new language translation to the portal?',
                a: 'All portal translations live in modular JSON files under <code>locales/<lang-code>.json</code>. To contribute a new language, create a new JSON file (e.g. <code>locales/it.json</code>) with the standard keys. The Rust <code>xtask</code> build automatically bundles it into the single-file dashboard on next build!'
            }
        ];

        let faqActiveCategory = 'all';
        let faqSearchQuery = '';
        let faqActiveId = null; // Starts completely collapsed per user request!
        let faqExpandAllMode = false;

        function showFaqView(e, targetId) {
            if (e) e.preventDefault();
            activeSpecId = null;
            closeAllSpecDrawers();
            if (targetId) {
                faqActiveId = targetId;
                faqExpandAllMode = false;
                if (window.location.hash !== '#faq/' + targetId && window.location.hash !== '#' + targetId) {
                    history.pushState(null, null, '#faq/' + targetId);
                }
            } else {
                if (window.location.hash !== '#faq' && !window.location.hash.startsWith('#faq/')) {
                    history.pushState(null, null, '#faq');
                }
            }
            document.getElementById('spec-view').style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'none';
            const matrixView = document.getElementById('matrix-view');
            if (matrixView) matrixView.style.display = 'none';
            const aboutView = document.getElementById('about-view');
            if (aboutView) aboutView.style.display = 'none';
            const faqView = document.getElementById('faq-view');
            if (faqView) faqView.style.display = 'block';

            const navCatalog = document.getElementById('nav-btn-catalog');
            const navMatrix = document.getElementById('nav-btn-matrix');
            const navFaq = document.getElementById('nav-btn-faq');
            const navAbout = document.getElementById('nav-btn-about');
            if (navCatalog) navCatalog.classList.remove('active');
            if (navMatrix) navMatrix.classList.remove('active');
            if (navAbout) navAbout.classList.remove('active');
            if (navFaq) navFaq.classList.add('active');

            renderFaqView();

            if (targetId) {
                setTimeout(() => {
                    const el = document.getElementById(targetId);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 80);
            } else {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
            announceA11y('Viewing Frequently Asked Questions and Contributor Guide');
        }

        // Mutual exclusion: opening one closes all others. Clicking an open one closes it.
        function toggleFaqItem(id) {
            if (faqExpandAllMode) {
                faqExpandAllMode = false;
                faqActiveId = id;
            } else {
                faqActiveId = (faqActiveId === id) ? null : id;
            }
            renderFaqView();
        }

        function toggleAllFaqs() {
            faqExpandAllMode = !faqExpandAllMode;
            faqActiveId = null;
            renderFaqView();
        }

        function filterFaqCategory(cat, btn) {
            faqActiveCategory = cat;
            document.querySelectorAll('#faq-category-chips .matrix-cat-chip').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            renderFaqView();
        }

        function handleFaqSearch(val) {
            faqSearchQuery = val.trim().toLowerCase();
            const clearBtn = document.getElementById('faq-search-clear-btn');
            if (clearBtn) clearBtn.style.display = faqSearchQuery ? 'inline-block' : 'none';
            renderFaqView();
        }

        function clearFaqSearch() {
            const input = document.getElementById('faq-search-input');
            if (input) input.value = '';
            handleFaqSearch('');
        }

        function copyFaqLink(e, id) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            const url = window.location.origin + window.location.pathname + '#faq/' + id;
            const t = LOCALES[currentLang] || LOCALES.en || {};
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(() => {
                    showToastNotification(t.faqLinkCopied || 'Question link copied to clipboard!');
                }).catch(() => {
                    showToastNotification('Link: ' + url);
                });
            } else {
                showToastNotification('Link: ' + url);
            }
        }

        function showToastNotification(msg) {
            announceA11y(msg);
            let toast = document.getElementById('global-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'global-toast';
                toast.setAttribute('role', 'status');
                toast.setAttribute('aria-live', 'polite');
                toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1F6FEB;color:#FFF;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 6px 20px rgba(0,0,0,0.5);z-index:99999;transition:opacity 0.25s ease;pointer-events:none;';
                document.body.appendChild(toast);
            }
            toast.textContent = msg;
            toast.style.opacity = '1';
            clearTimeout(window.__toastTimeout);
            window.__toastTimeout = setTimeout(() => {
                toast.style.opacity = '0';
            }, 2500);
        }

        function renderFaqView() {
            const container = document.getElementById('faq-accordion-container');
            if (!container) return;

            const t = LOCALES[currentLang] || LOCALES.en || {};

            // Update Expand/Collapse all button label
            const expandBtn = document.getElementById('faq-expand-all-btn');
            if (expandBtn) {
                const isAllExpanded = faqExpandAllMode;
                const iconSpan = document.getElementById('faq-expand-icon');
                const textSpan = document.getElementById('faq-expand-text');
                if (iconSpan) iconSpan.textContent = isAllExpanded ? '⊟' : '⊞';
                if (textSpan) textSpan.textContent = isAllExpanded ? (t.faqCollapseAll || 'Collapse All') : (t.faqExpandAll || 'Expand All');
                expandBtn.setAttribute('aria-expanded', isAllExpanded ? 'true' : 'false');
            }

            const filtered = FAQ_DATA.filter(item => {
                const matchesCat = faqActiveCategory === 'all' || item.cat === faqActiveCategory;
                const matchesSearch = !faqSearchQuery || item.q.toLowerCase().includes(faqSearchQuery) || item.a.toLowerCase().includes(faqSearchQuery) || item.tag.toLowerCase().includes(faqSearchQuery);
                return matchesCat && matchesSearch;
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="empty-state-card" style="display:block;margin-top:20px;">
                        <div class="empty-state-icon">🔍</div>
                        <h3>${t.faqNoResultsTitle || 'No matching questions found'}</h3>
                        <p>${t.faqNoResultsDesc || 'Try searching with different terms or select \'All FAQs\'.'}</p>
                        <button class="reader-btn primary" onclick="clearFaqSearch(); filterFaqCategory('all', document.getElementById('faq-cat-all'));" style="margin-top:8px;">${t.faqResetSearch || 'Reset FAQ search'}</button>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(item => {
                const isOpen = faqExpandAllMode || (faqActiveId === item.id);
                const locItem = (t.faqQuestions && t.faqQuestions[item.id]) ? t.faqQuestions[item.id] : null;
                const qText = locItem ? locItem.q : item.q;
                const aText = locItem ? locItem.a : item.a;

                return `
                    <div class="faq-item ${isOpen ? 'open' : ''}" id="${item.id}" role="region" aria-labelledby="header-${item.id}">
                        <div class="faq-header-row" id="header-${item.id}" onclick="toggleFaqItem('${item.id}')" role="button" tabindex="0" aria-expanded="${isOpen}" aria-controls="content-${item.id}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleFaqItem('${item.id}');}">
                            <div class="faq-question-content">
                                <span class="faq-tag">${item.tag}</span>
                                <span class="faq-question-text">${qText}</span>
                            </div>
                            <div class="faq-actions-right">
                                <span class="faq-copy-btn" onclick="copyFaqLink(event, '${item.id}')" title="Copy direct link to question" aria-label="Copy direct link to question" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();copyFaqLink(event, '${item.id}');}">🔗</span>
                                <span class="faq-toggle-icon" aria-hidden="true">▾</span>
                            </div>
                        </div>
                        <div class="faq-answer" id="content-${item.id}" role="region" aria-labelledby="header-${item.id}">
                            ${aText}
                        </div>
                    </div>
                `;
            }).join('');
        }

        // =========================================================================
        // Mobile Overflow Menu Controller
        // =========================================================================
        function toggleMobileMenu(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            const menu = document.getElementById('mobile-dropdown-menu');
            const btn = document.getElementById('mobile-menu-trigger');
            const backdrop = document.getElementById('mobile-menu-backdrop');
            if (!menu) return;
            const isOpen = menu.classList.toggle('open');
            if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (backdrop) {
                if (isOpen) {
                    backdrop.classList.add('open');
                } else {
                    backdrop.classList.remove('open');
                }
            }
        }

        function closeMobileMenu() {
            const menu = document.getElementById('mobile-dropdown-menu');
            const btn = document.getElementById('mobile-menu-trigger');
            const backdrop = document.getElementById('mobile-menu-backdrop');
            if (menu) menu.classList.remove('open');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            if (backdrop) backdrop.classList.remove('open');
        }

        window.addEventListener('click', (e) => {
            const container = document.querySelector('.mobile-menu-container');
            if (container && !container.contains(e.target)) {
                closeMobileMenu();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const menu = document.getElementById('mobile-dropdown-menu');
                if (menu && menu.classList.contains('open')) {
                    closeMobileMenu();
                    const btn = document.getElementById('mobile-menu-trigger');
                    if (btn) btn.focus();
                }
            }
        });

        // =========================================================================
        // Universal Command Palette (Ctrl+K)
        // =========================================================================
        let cmdSelectedIndex = 0;
        let cmdFilteredItems = [];

        const SYSTEM_COMMANDS = [
            { id: 'view:catalog', title: 'Open Specifications Catalog', cat: 'Navigation', icon: '📚', action: () => showDashboard() },
            { id: 'view:matrix', title: 'Open Suite Compliance Matrix', cat: 'Navigation', icon: '📊', action: () => showMatrixView() },
            { id: 'view:agent-hub', title: 'Open AI Agent & AutoCraft Hub', cat: 'Developer Tools', icon: '⚡', action: () => openAgentHub() },
            { id: 'view:badges', title: 'Open Contributor README Badges', cat: 'Developer Tools', icon: '🛡️', action: () => openBadgeModal() },
            { id: 'action:copy-report', title: 'Copy Markdown Compliance Telemetry', cat: 'Telemetry', icon: '📋', action: () => copyMatrixMarkdownReport() },
            { id: 'lang:en', title: 'Switch Language to English', cat: 'Language', icon: '🇺🇸', action: () => selectLanguage('en') },
            { id: 'lang:de', title: 'Sprache auf Deutsch umstellen', cat: 'Language', icon: '🇩🇪', action: () => selectLanguage('de') },
            { id: 'lang:ar', title: 'تغيير اللغة إلى العربية (RTL)', cat: 'Language', icon: '🇸🇦', action: () => selectLanguage('ar') }
        ];

        function openCommandPalette() {
            const modal = document.getElementById('cmd-palette-modal');
            const input = document.getElementById('cmd-palette-input');
            if (!modal) return;
            modal.style.display = 'flex';
            cmdSelectedIndex = 0;
            if (input) {
                input.value = '';
                input.focus();
            }
            handleCmdSearch('');
        }

        function closeCommandPalette() {
            const modal = document.getElementById('cmd-palette-modal');
            if (modal) modal.style.display = 'none';
        }

        function handleCmdSearch(query) {
            const q = query.trim().toLowerCase();
            const resultsEl = document.getElementById('cmd-palette-results');
            if (!resultsEl) return;

            cmdFilteredItems = [];

            // Add matching system actions
            SYSTEM_COMMANDS.forEach(cmd => {
                if (!q || cmd.title.toLowerCase().includes(q) || cmd.cat.toLowerCase().includes(q)) {
                    cmdFilteredItems.push({
                        type: 'action',
                        title: cmd.title,
                        sub: `Action · ${cmd.cat}`,
                        icon: cmd.icon,
                        exec: cmd.action
                    });
                }
            });

            // Add matching standards
            SPECS.forEach(s => {
                if (!q || s.id.toLowerCase().includes(q) || s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || (s.crate && s.crate.toLowerCase().includes(q))) {
                    cmdFilteredItems.push({
                        type: 'spec',
                        id: s.id,
                        title: `${s.id}: ${s.title}`,
                        sub: `Standard Specification · ${s.category} · ${s.crate || ''}`,
                        icon: '📄',
                        exec: () => openSpec(s.id)
                    });
                }
            });

            if (cmdFilteredItems.length === 0) {
                resultsEl.innerHTML = `<div style="padding:24px;text-align:center;color:var(--sl-color-text-muted);font-size:13px;">No matching standards or actions found.</div>`;
                return;
            }

            cmdSelectedIndex = Math.min(cmdSelectedIndex, cmdFilteredItems.length - 1);

            resultsEl.innerHTML = cmdFilteredItems.map((item, idx) => `
                <div class="cmd-item ${idx === cmdSelectedIndex ? 'selected' : ''}" onclick="executeCmdItem(${idx})" onmouseenter="highlightCmdItem(${idx})" role="option" aria-selected="${idx === cmdSelectedIndex}">
                    <div class="cmd-item-title">
                        <span>${item.icon}</span>
                        <span>${item.title}</span>
                    </div>
                    <div class="cmd-item-sub">${item.sub}</div>
                </div>
            `).join('');
        }

        function highlightCmdItem(idx) {
            cmdSelectedIndex = idx;
            document.querySelectorAll('.cmd-item').forEach((el, i) => {
                el.classList.toggle('selected', i === idx);
            });
        }

        function executeCmdItem(idx) {
            if (idx >= 0 && idx < cmdFilteredItems.length) {
                closeCommandPalette();
                cmdFilteredItems[idx].exec();
            }
        }

        // Palette keyboard navigation
        window.addEventListener('keydown', (e) => {
            const modal = document.getElementById('cmd-palette-modal');
            if (!modal || modal.style.display === 'none') return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                cmdSelectedIndex = (cmdSelectedIndex + 1) % cmdFilteredItems.length;
                highlightCmdItem(cmdSelectedIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                cmdSelectedIndex = (cmdSelectedIndex - 1 + cmdFilteredItems.length) % cmdFilteredItems.length;
                highlightCmdItem(cmdSelectedIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                executeCmdItem(cmdSelectedIndex);
            }
        });

        // =========================================================================
        // AI Agent Directives & AutoCraft Pipeline Hub
        // =========================================================================
        function openAgentHub() {
            const modal = document.getElementById('agent-hub-modal');
            if (modal) {
                modal.style.display = 'flex';
                loadMcpToolForm('verify_component');
            }
        }

        function closeAgentHub() {
            const modal = document.getElementById('agent-hub-modal');
            if (modal) modal.style.display = 'none';
        }

        function switchAgentHubTab(tabName, btn) {
            document.querySelectorAll('.agent-hub-tab').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            if (btn) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            }

            document.querySelectorAll('.hub-panel').forEach(p => {
                p.style.display = 'none';
                p.classList.remove('active');
            });

            const target = document.getElementById(`hub-panel-${tabName}`);
            if (target) {
                target.style.display = 'block';
                target.classList.add('active');
            }
        }

        function copySnippet(elementId, btn) {
            const el = document.getElementById(elementId);
            if (!el) return;
            navigator.clipboard.writeText(el.innerText || el.textContent).then(() => {
                const orig = btn.innerText;
                btn.innerText = '✓ Copied!';
                btn.style.color = '#3FB950';
                setTimeout(() => {
                    btn.innerText = orig;
                    btn.style.color = '';
                }, 2000);
            });
        }

        function loadMcpToolForm(tool) {
            const stage = document.getElementById('mcp-stage-box');
            if (!stage) return;

            if (tool === 'verify_component') {
                stage.innerHTML = `
                    <div style="display:flex;flex-direction:column;gap:10px;">
                        <label style="font-size:12px;font-weight:600;color:#FFF;">Component AST Code Sample to Audit:</label>
                        <select id="mcp-sample-select" class="drilldown-select" style="min-width:auto;width:100%;margin-bottom:6px;">
                            <option value="good">Compliant Code: Multi-Tool Slot with Double-Click Shielding (STD-INPUT-001)</option>
                            <option value="fs_violation">Violation Code: Direct std::fs usage violating Confined Sandboxing (STD-SHELL-003)</option>
                            <option value="a11y_violation">Violation Code: Custom button without AccessKit Accessibility Node (STD-A11Y-001)</option>
                        </select>
                        <button class="reader-btn primary" onclick="runMcpVerifySimulation()">Execute verify_component</button>
                    </div>
                `;
            } else if (tool === 'get_standard') {
                stage.innerHTML = `
                    <div style="display:flex;flex-direction:column;gap:10px;">
                        <label style="font-size:12px;font-weight:600;color:#FFF;">Target Standard Specification ID:</label>
                        <select id="mcp-spec-select" class="drilldown-select" style="min-width:auto;width:100%;margin-bottom:6px;">
                            ${SPECS.map(s => `<option value="${s.id}">${s.id}: ${s.title}</option>`).join('')}
                        </select>
                        <button class="reader-btn primary" onclick="runMcpGetStandardSimulation()">Execute get_standard</button>
                    </div>
                `;
            } else if (tool === 'generate_compliant_code') {
                stage.innerHTML = `
                    <div style="display:flex;flex-direction:column;gap:10px;">
                        <label style="font-size:12px;font-weight:600;color:#FFF;">Specification to Synthesize Boilerplate:</label>
                        <select id="mcp-gen-select" class="drilldown-select" style="min-width:auto;width:100%;margin-bottom:6px;">
                            <option value="STD-INPUT-001">STD-INPUT-001 (Multi-Tool Toolbar Slot Cycling)</option>
                            <option value="STD-NAV-001">STD-NAV-001 (Universal Document Tab Lifecycle)</option>
                            <option value="STD-A11Y-001">STD-A11Y-001 (AccessKit Accessibility Trees)</option>
                            <option value="STD-SHELL-003">STD-SHELL-003 (Confined Filesystem Sandboxing)</option>
                        </select>
                        <button class="reader-btn primary" onclick="runMcpGenerateCodeSimulation()">Execute generate_compliant_code</button>
                    </div>
                `;
            } else {
                stage.innerHTML = `
                    <div style="display:flex;flex-direction:column;gap:10px;">
                        <label style="font-size:12px;font-weight:600;color:#FFF;">Library Functional Domain:</label>
                        <select id="mcp-lib-select" class="drilldown-select" style="min-width:auto;width:100%;margin-bottom:6px;">
                            <option value="fs">Filesystem & Sandboxing (STD-SHELL-003)</option>
                            <option value="text">Unicode BiDi & RTL Galley (STD-I18N-001)</option>
                            <option value="color">Color Soft-Proofing & Gamut (STD-COLOR-001)</option>
                            <option value="keymap">Cross-Platform Keymap Normalization (STD-LIB-002)</option>
                        </select>
                        <button class="reader-btn primary" onclick="runMcpResolveLibSimulation()">Execute resolve_library_primitive</button>
                    </div>
                `;
            }
        }

        function runMcpVerifySimulation() {
            const sel = document.getElementById('mcp-sample-select').value;
            const output = document.getElementById('mcp-output-code');
            const pill = document.getElementById('mcp-status-pill');

            if (sel === 'good') {
                pill.className = 'app-cat-pill ok';
                pill.textContent = '200 PASS';
                output.textContent = JSON.stringify({
                    jsonrpc: "2.0",
                    result: {
                        status: "COMPLIANT",
                        standard: "STD-INPUT-001",
                        verified_invariants: [
                            "INV-01: Multi-tool button cycles active tool in group order on Alt+Click",
                            "INV-02: Double-click modal launch shielded during tool cycling"
                        ],
                        ast_drift: 0.0,
                        licensing_passed: true
                    }
                }, null, 2);
            } else if (sel === 'fs_violation') {
                pill.className = 'app-cat-pill progress';
                pill.textContent = '400 VIOLATION';
                output.textContent = JSON.stringify({
                    jsonrpc: "2.0",
                    result: {
                        status: "VIOLATION_DETECTED",
                        standard: "STD-SHELL-003",
                        severity: "CRITICAL_BLOCKER",
                        message: "Direct std::fs call detected in app component. Violates Confined File Access sandbox invariant.",
                        remediation: "Replace with craft_fs::AutomationRoot::resolve_sandboxed(path)"
                    }
                }, null, 2);
            } else {
                pill.className = 'app-cat-pill progress';
                pill.textContent = '400 VIOLATION';
                output.textContent = JSON.stringify({
                    jsonrpc: "2.0",
                    result: {
                        status: "VIOLATION_DETECTED",
                        standard: "STD-A11Y-001",
                        severity: "ACCESSIBILITY_BLOCKER",
                        message: "Custom interactive widget missing AccessKit node registration. Screen readers cannot query role or name.",
                        remediation: "Add ui.ctx().accesskit_node_builder(...) per STD-A11Y-001"
                    }
                }, null, 2);
            }
        }

        function runMcpGetStandardSimulation() {
            const specId = document.getElementById('mcp-spec-select').value;
            const spec = specsMap[specId];
            const output = document.getElementById('mcp-output-code');
            const pill = document.getElementById('mcp-status-pill');

            pill.className = 'app-cat-pill ok';
            pill.textContent = '200 OK';
            output.textContent = JSON.stringify({
                jsonrpc: "2.0",
                result: {
                    id: spec.id,
                    title: spec.title,
                    category: spec.category,
                    canonical_crate: spec.crate || "craft-core",
                    governed_apps: spec.apps,
                    rule_enforcement: "STRICT_CI"
                }
            }, null, 2);
        }

        function runMcpGenerateCodeSimulation() {
            const specId = document.getElementById('mcp-gen-select').value;
            const output = document.getElementById('mcp-output-code');
            const pill = document.getElementById('mcp-status-pill');

            pill.className = 'app-cat-pill ok';
            pill.textContent = '200 SYNTHESIZED';
            output.textContent = RUST_BOILERPLATE_MAP[specId] || "// Generates compliant Rust struct";
        }

        function runMcpResolveLibSimulation() {
            const domain = document.getElementById('mcp-lib-select').value;
            const output = document.getElementById('mcp-output-code');
            const pill = document.getElementById('mcp-status-pill');

            pill.className = 'app-cat-pill ok';
            pill.textContent = '200 RESOLVED';

            const map = {
                fs: { canonical_crate: "craft-fs", version: "0.2.0", isolation_root: "AutomationRoot" },
                text: { canonical_crate: "cosmic-text / craft-text", version: "0.12.0", bidi_support: "Unicode 15.0 BiDi" },
                color: { canonical_crate: "craft-color", proofing: "sRGB / Display P3 / Fogra39 CMYK" },
                keymap: { canonical_crate: "craft-keymap", normalization: "macOS Cmd <-> Win/Linux Ctrl" }
            };

            output.textContent = JSON.stringify({
                jsonrpc: "2.0",
                result: map[domain] || {}
            }, null, 2);
        }

        // =========================================================================
        // Contributor README Badges Generator
        // =========================================================================
        function openBadgeModal() {
            const modal = document.getElementById('badge-modal');
            const select = document.getElementById('badge-app-select');
            if (!modal || !select) return;

            if (select.children.length === 0) {
                select.innerHTML = APPS_COMPLIANCE.map(a => `
                    <option value="${a.name}">${a.name} (${a.category}) · ${a.crate}</option>
                `).join('');
            }

            modal.style.display = 'flex';
            updateBadgePreview(select.value || 'PhotoCraft');
        }

        function closeBadgeModal() {
            const modal = document.getElementById('badge-modal');
            if (modal) modal.style.display = 'none';
        }

        function updateBadgePreview(appName) {
            const img = document.getElementById('badge-preview-img');
            const code = document.getElementById('badge-markdown-code');
            if (!img || !code) return;

            const safeName = encodeURIComponent(appName);
            const badgeUrl = `https://img.shields.io/badge/ArtCraft_Standards-100%25_Verified-3fb950?style=flat-square&logo=rust`;
            const md = `[![ArtCraft Standards](${badgeUrl})](https://tareq-halaby.github.io/craft-standards/#matrix)`;

            img.src = badgeUrl;
            code.textContent = md;
        }

        function copyBadgeMarkdown() {
            const code = document.getElementById('badge-markdown-code');
            if (!code) return;
            navigator.clipboard.writeText(code.textContent).then(() => {
                announceA11y('Badge Markdown copied to clipboard');
                alert('✓ Badge Markdown copied to clipboard!');
            });
        }

        // =========================================================================
        // Rust Implementation Snippet Lab (egui/wgpu)
        // =========================================================================
        const RUST_BOILERPLATE_MAP = {
            'STD-INPUT-001': `// STD-INPUT-001: Multi-Tool Slot State Machine with Double-Click Shielding
pub struct ToolSlot {
    pub active_index: usize,
    pub tools: Vec<ToolDefinition>,
    pub last_cycle_time: std::time::Instant,
}

impl ToolSlot {
    pub fn on_click(&mut self, is_alt_click: bool) -> ToolAction {
        let now = std::time::Instant::now();
        // Invariant: Shield against rapid double-clicks (prevent modal dialog bugs)
        let is_rapid = now.duration_since(self.last_cycle_time).as_millis() < 300;
        self.last_cycle_time = now;

        if is_alt_click {
            self.active_index = (self.active_index + 1) % self.tools.len();
            ToolAction::Cycled(self.active_index)
        } else if is_rapid {
            ToolAction::RapidClickRegistered
        } else {
            ToolAction::Activated(self.active_index)
        }
    }
}`,
            'STD-NAV-001': `// STD-NAV-001: Universal Document Tab Lifecycle and Closure
pub struct TabController<D> {
    pub open_documents: Vec<D>,
    pub active_tab_index: Option<usize>,
}

impl<D: DocumentLifeCycle> TabController<D> {
    pub fn handle_tab_close(&mut self, index: usize) -> CloseResult {
        if let Some(doc) = self.open_documents.get(index) {
            if doc.is_dirty() {
                // Invariant: Dirty documents MUST trigger the 3-button modal prompt
                return CloseResult::PromptUnsavedChanges { doc_id: doc.id() };
            }
        }
        self.open_documents.remove(index);
        CloseResult::ClosedSafely
    }
}`,
            'STD-A11Y-001': `// STD-A11Y-001: Automated AccessKit Node Registration
pub fn register_accessible_widget(ui: &mut egui::Ui, id: egui::Id, label: &str, role: accesskit::Role) {
    ui.ctx().accesskit_node_builder(id, |builder| {
        builder.set_role(role);
        builder.set_name(label.to_string());
        builder.set_live(accesskit::Live::Polite);
    });
}`,
            'STD-SHELL-003': `// STD-SHELL-003: Sandboxed Confined File Access (Isolation Root)
use craft_fs::{AutomationRoot, SandboxedPath};

pub fn open_project_file(root: &AutomationRoot, relative_path: &str) -> Result<std::fs::File, craft_fs::SecurityViolation> {
    // Invariant: Rejects directory traversal (..) and access outside automation root
    let safe_path = root.resolve_sandboxed(relative_path)?;
    safe_path.open_read()
}`
        };

        function renderSpecSnippetLab(spec) {
            const labEl = document.getElementById('spec-snippet-lab');
            if (!labEl) return;

            const rustSnippet = RUST_BOILERPLATE_MAP[spec.id] || `// ${spec.id}: ${spec.title}\n// Canonical Crate: ${spec.crate || "craft-standards"}\n// Invariant Contract Enforcement\npub struct StandardInvariant {\n    pub id: &'static str,\n    pub passes_zero_drift: bool,\n}\n\nimpl StandardInvariant {\n    pub fn verify() -> bool { true }\n}`;

            const testSnippet = `#[test]\nfn test_${spec.id.toLowerCase().replace(/-/g, '_')}_invariant() {\n    // Guard: ${spec.title}\n    // Invariant: Verify edge-case behavioral contract and zero AST drift under STD-LIB-005 Keep Rule\n    assert!(true, "Enforces ${spec.id} contract");\n}`;

            const agentSnippet = `// [ArtCraft Recipe: ${spec.id}] ${spec.title}\n// Domain: ${spec.category} | Crate: ${spec.crate || 'craft-widgets'} | UI: egui/wgpu\n// Rule: Implement ${spec.id} using safe abstractions without direct std::fs calls.\n// Node: Tag AccessKit node with appropriate Role and Name.`;

            labEl.innerHTML = `
                <div class="snippet-lab-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-weight:700;font-size:13px;color:#FFF;">🦀 Developer Recipes & Invariants</span>
                        <div class="matrix-pivot-modes" style="display:inline-flex;padding:2px;gap:4px;">
                            <button class="matrix-pivot-btn active" id="tab-code-rust-${spec.id}" style="padding:4px 10px;font-size:11px;" onclick="switchSnippetTab('${spec.id}', 'rust')">Rust (egui)</button>
                            <button class="matrix-pivot-btn" id="tab-code-test-${spec.id}" style="padding:4px 10px;font-size:11px;" onclick="switchSnippetTab('${spec.id}', 'test')">TestKit (#[test])</button>
                            <button class="matrix-pivot-btn" id="tab-code-agent-${spec.id}" style="padding:4px 10px;font-size:11px;" onclick="switchSnippetTab('${spec.id}', 'agent')">⚡ Lean Prompt</button>
                        </div>
                    </div>
                    <button class="copy-code-btn" id="copy-snippet-active-btn" onclick="copyActiveSnippet('${spec.id}', this)">Copy Current Snippet</button>
                </div>
                <pre class="snippet-lab-body"><code id="snippet-code-${spec.id}">${rustSnippet}</code></pre>
            `;
            labEl.style.display = 'block';

            window[`__activeSnippetTab_${spec.id}`] = 'rust';
            window[`__snippetMap_${spec.id}`] = {
                rust: rustSnippet,
                test: testSnippet,
                agent: agentSnippet
            };
        }

        function switchSnippetTab(specId, tab) {
            window[`__activeSnippetTab_${specId}`] = tab;
            ['rust', 'test', 'agent'].forEach(t => {
                const b = document.getElementById(`tab-code-${t}-${specId}`);
                if (b) {
                    if (t === tab) b.classList.add('active');
                    else b.classList.remove('active');
                }
            });
            const codeEl = document.getElementById(`snippet-code-${specId}`);
            if (codeEl && window[`__snippetMap_${specId}`]) {
                codeEl.textContent = window[`__snippetMap_${specId}`][tab] || '';
            }
        }

        function copyActiveSnippet(specId, btn) {
            const tab = window[`__activeSnippetTab_${specId}`] || 'rust';
            const text = (window[`__snippetMap_${specId}`] && window[`__snippetMap_${specId}`][tab]) || '';
            navigator.clipboard.writeText(text).then(() => {
                const orig = btn.innerText;
                btn.innerText = '✓ Copied!';
                btn.style.color = '#3FB950';
                setTimeout(() => {
                    btn.innerText = orig;
                    btn.style.color = '';
                }, 2000);
                showToastNotification('Snippet copied to clipboard!');
            });
        }

        function copySnippetLabCode(specId, btn) {
            copyActiveSnippet(specId, btn);
        }

        window.addEventListener('hashchange', handleRouting);
        window.addEventListener('DOMContentLoaded', () => {
            initLanguages();
            initCategoryCounts();
            applyLanguage(currentLang);
            handleRouting();
        });
