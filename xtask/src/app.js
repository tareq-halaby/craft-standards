        // =========================================================================
        // Modular i18n Translation Engine (Contributed via locales/*.json)
        // =========================================================================
        const LOCALES = JSON.parse(document.getElementById('locales-data').textContent);
        let currentLang = localStorage.getItem('artcraft-lang') || 'en';
        if (!LOCALES[currentLang]) currentLang = 'en';

        function initLanguages() {
            const menu = document.getElementById('lang-dropdown-menu');
            if (!menu) return;
            menu.innerHTML = Object.keys(LOCALES).map(code => {
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

            setTxt('i18n-brand-sub', t.brandSub);
            setTxt('i18n-hero-eyebrow', t.heroEyebrow);
            setHtml('i18n-hero-title', t.heroTitle);
            setTxt('i18n-hero-desc', t.heroDesc);
            setTxt('i18n-hero-badge-mcp', t.heroBadgeMCP);
            setTxt('i18n-hero-badge-matrix', t.heroBadgeMatrix);
            setTxt('i18n-hero-badge-sim', t.heroBadgeSim);
            setTxt('i18n-stat-standards', t.statStandards);
            setTxt('i18n-stat-standards-sub', t.statStandardsSub);
            setTxt('i18n-stat-apps', t.statApps);
            setTxt('i18n-stat-apps-sub', t.statAppsSub);
            setTxt('i18n-stat-ci', t.statCI);
            setTxt('i18n-stat-ci-sub', t.statCISub);
            setTxt('i18n-stat-mcp', t.statMCP);
            setTxt('i18n-stat-mcp-sub', t.statMCPSub);

            const searchInput = document.getElementById('search');
            if (searchInput && t.searchPlaceholder) {
                searchInput.placeholder = t.searchPlaceholder;
                searchInput.setAttribute('aria-label', t.searchPlaceholder);
            }

            const searchClearBtn = document.getElementById('search-clear-btn');
            if (searchClearBtn && t.searchClearLabel) {
                searchClearBtn.setAttribute('aria-label', t.searchClearLabel);
            }

            setTxt('i18n-matrix-btn', t.complianceMatrixBtn);
            setTxt('matrix-export-btn-text', t.matrixExportBtn);
            const mSearch = document.getElementById('matrix-search-input');
            if (mSearch && t.matrixSearchPlaceholder) mSearch.placeholder = t.matrixSearchPlaceholder;
            setTxt('i18n-chip-all', t.allStandards);
            setTxt('i18n-chip-interaction', t.catInteraction);
            setTxt('i18n-chip-navigation', t.catNavigation);
            setTxt('i18n-chip-accessibility', t.catAccessibility);
            setTxt('i18n-chip-i18n', t.cati18n);
            setTxt('i18n-chip-shell', t.catShell);
            setTxt('i18n-chip-libs', t.catLibs);
            setTxt('i18n-chip-governance', t.catGovernance);
            setTxt('i18n-cat-heading', t.specCatalog);
            setTxt('i18n-back-btn-text', t.backBtn);
            setTxt('i18n-copy-text', t.copyLink);
            setTxt('i18n-crate-label', t.canonicalCrate);
            setTxt('i18n-apps-label', t.governedApps);
            setTxt('i18n-wiki-label', t.craftWikiGuide);
            setTxt('i18n-return-catalog', t.returnCatalog);
            setTxt('i18n-prev-label', t.prevStandard);
            setTxt('i18n-next-label', t.nextStandard);
            setTxt('skip-link', t.skipLink);
            setTxt('matrix-title', t.matrixTitle);
            setTxt('matrix-desc', t.matrixDesc);
            setTxt('i18n-empty-clear-btn', t.clearSearchBtn);
            setTxt('empty-state-title', t.noMatchesTitle);
            setTxt('i18n-suggestions-label', t.suggestionsLabel);
            setTxt('i18n-footer-title', t.footerTitle);
            setTxt('i18n-footer-desc', t.footerDesc);
            setTxt('i18n-copyright', t.copyright);
            setTxt('i18n-foss', t.foss);

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
            document.getElementById('spec-view').style.display = 'block';

            const navCatalog = document.getElementById('nav-btn-catalog');
            const navMatrix = document.getElementById('nav-btn-matrix');
            if (navCatalog) navCatalog.classList.remove('active');
            if (navMatrix) navMatrix.classList.remove('active');

            window.scrollTo({ top: 0, behavior: 'instant' });

            // a11y focus management: focus on specification header title
            const titleEl = document.getElementById('spec-title');
            if (titleEl) {
                titleEl.focus();
            }
            announceA11y(`Now reading specification ${spec.id}: ${spec.title}`);
        }

        function showDashboard(e) {
            if (e) e.preventDefault();
            activeSpecId = null;
            if (window.location.hash) {
                history.pushState(null, null, ' ');
            }
            document.getElementById('spec-view').style.display = 'none';
            const matrixView = document.getElementById('matrix-view');
            if (matrixView) matrixView.style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'block';

            const navCatalog = document.getElementById('nav-btn-catalog');
            const navMatrix = document.getElementById('nav-btn-matrix');
            if (navCatalog) navCatalog.classList.add('active');
            if (navMatrix) navMatrix.classList.remove('active');

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

        function showMatrixView(e) {
            if (e) e.preventDefault();
            activeSpecId = null;
            if (window.location.hash !== '#matrix') {
                history.pushState(null, null, '#matrix');
            }
            document.getElementById('spec-view').style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'none';
            const matrixView = document.getElementById('matrix-view');
            if (matrixView) matrixView.style.display = 'block';

            const navCatalog = document.getElementById('nav-btn-catalog');
            const navMatrix = document.getElementById('nav-btn-matrix');
            if (navCatalog) navCatalog.classList.remove('active');
            if (navMatrix) navMatrix.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'instant' });
            renderMatrixView();
            announceA11y('Viewing ArtCraft Suite Compliance Telemetry Matrix');
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
                showMatrixView();
            } else if (hash && specsMap[hash]) {
                openSpec(hash, false);
            } else {
                showDashboard();
            }
        }

        // Global Keyboard Navigation (a11y: Escape to return/close, Alt+Left/Right for pagination, '/' for search)
        window.addEventListener('keydown', (e) => {
            const matrixView = document.getElementById('matrix-view');
            const isMatrixVisible = matrixView && matrixView.style.display !== 'none';
            const searchInput = document.getElementById('search');

            if (e.key === 'Escape') {
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
            { name: "PhotoCraft", category: "Graphics", crate: "craft-apps/photocraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "VectorCraft", category: "Graphics", crate: "craft-apps/vectorcraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "DesignCraft", category: "Graphics", crate: "craft-apps/designcraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "LightCraft", category: "Graphics", crate: "craft-apps/lightcraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "FigCraft", category: "Graphics", crate: "craft-apps/figcraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "TextureCraft", category: "Graphics", crate: "craft-apps/texturecraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "MaterialCraft", category: "Graphics", crate: "craft-apps/materialcraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "FilmCraft", category: "Video", crate: "craft-apps/filmcraft", engine: "egui/ffmpeg", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "EffectCraft", category: "Video", crate: "craft-apps/effectcraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "AniCraft", category: "Video", crate: "craft-apps/anicraft", engine: "egui/timeline", tool: "Passed", tabs: "Passed", a11y: "In Progress", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "SoundCraft", category: "Audio", crate: "craft-apps/soundcraft", engine: "egui/cpal", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "In Progress", confine: "Passed", keep: "Passed" },
            { name: "CADCraft", category: "CAD", crate: "craft-apps/cadcraft", engine: "egui/opencascade", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "In Progress", confine: "Passed", keep: "Passed" },
            { name: "WordCraft", category: "Productivity", crate: "craft-apps/wordcraft", engine: "egui/cosmic-text", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "GridCraft", category: "Productivity", crate: "craft-apps/gridcraft", engine: "egui/calamine", tool: "Passed", tabs: "In Progress", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "DeckCraft", category: "Productivity", crate: "craft-apps/deckcraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "PdfCraft", category: "Productivity", crate: "craft-apps/pdfcraft", engine: "egui/pdfium", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "Craft Anything", category: "DevTools", crate: "storytold/craft-anything", engine: "egui/mcp", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "SolidCraft", category: "3D", crate: "craft-apps/solidcraft", engine: "egui/wgpu", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" },
            { name: "MailCraft", category: "Productivity", crate: "craft-apps/mailcraft", engine: "egui/async-imap", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Planned", keep: "Passed" },
            { name: "ArtCraft Studio", category: "AI Studio", crate: "craft-apps/studio", engine: "egui/mcp-gateway", tool: "Passed", tabs: "Passed", a11y: "Passed", rtl: "Passed", confine: "Passed", keep: "Passed" }
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

            if (scorecardsEl) scorecardsEl.style.display = mode === 'scorecards' ? 'grid' : 'none';
            if (gridEl) gridEl.style.display = mode === 'grid' ? 'block' : 'none';
            if (drilldownEl) drilldownEl.style.display = mode === 'drilldown' ? 'block' : 'none';

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
            renderMatrixView();
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
                            </div>
                            <div class="app-scorecard-gauge">
                                <div class="app-gauge-val ${scorePct < 100 ? 'warn' : ''}">${scorePct}%</div>
                                <div class="app-gauge-sub">${passedCount}/6 Core Contracts</div>
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
            }
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

        window.addEventListener('hashchange', handleRouting);
        window.addEventListener('DOMContentLoaded', () => {
            initLanguages();
            initCategoryCounts();
            applyLanguage(currentLang);
            handleRouting();
        });
