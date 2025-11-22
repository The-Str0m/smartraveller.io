import { bmtcTypes, popularRoutes } from './data_service.js';

export function Header(currentTheme, label) {
    return `
        <div class="glass-panel px-4 py-3 md:px-6 md:py-4 flex justify-between items-center shadow-lg">
            <div class="flex items-center space-x-3">
                <div class="p-2 rounded-lg bg-[var(--glass-border)] text-[var(--accent-primary)]">
                    <i data-lucide="navigation" class="w-5 h-5 md:w-6 md:h-6"></i>
                </div>
                <h1 class="text-lg md:text-2xl font-display font-bold glow-text tracking-tight">
                    Travler <span class="text-[var(--accent-primary)]">Navigator</span>
                </h1>
            </div>
            <button id="theme-toggle" aria-label="Switch Theme" class="flex items-center space-x-2 px-3 py-2 md:px-4 rounded-full border border-[var(--glass-border)] hover:bg-[var(--glass-border)] focus:ring-2 focus:ring-[var(--accent-primary)] transition-all duration-300 group">
                <i data-lucide="moon" class="w-4 h-4 group-hover:rotate-12 transition-transform text-[var(--accent-primary)]"></i>
                <span id="theme-label" class="text-xs md:text-sm font-medium font-display hidden sm:inline-block">${label}</span>
            </button>
        </div>
    `;
}
//A project by NTA and Pranav Soggy 
export function SearchPanel() {
    return `
        <div class="glass-panel p-6 md:p-8 transform hover:scale-[1.01] transition-transform duration-500">
            <h2 class="text-xl md:text-2xl font-display font-semibold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                <i data-lucide="search" class="w-6 h-6 text-[var(--accent-primary)]"></i>
                Plan Your Journey
            </h2>
            <form id="search-form" class="flex flex-col md:flex-row gap-4 md:gap-6 items-end">
                <div class="flex-grow w-full group">
                    <label for="from-input" class="block text-xs font-bold text-[var(--text-secondary)] mb-2 ml-1 uppercase tracking-wider">From</label>
                    <div class="relative">
                        <i data-lucide="map-pin" class="absolute left-4 top-3.5 w-5 h-5 text-[var(--accent-primary)] opacity-70"></i>
                        <input id="from-input" type="text" placeholder="e.g. Silk Board" aria-label="Starting Point" required class="neu-input w-full pl-12 pr-4 py-3 text-base md:text-lg bg-transparent focus:ring-0 placeholder-[var(--text-secondary)]/50">
                    </div>
                </div>
                
                <div class="flex justify-center items-center py-2 md:py-0 md:mb-4">
                    <i data-lucide="arrow-right-left" class="w-5 h-5 text-[var(--text-secondary)] md:rotate-0 rotate-90"></i>
                </div>
                
                <div class="flex-grow w-full group">
                    <label for="to-input" class="block text-xs font-bold text-[var(--text-secondary)] mb-2 ml-1 uppercase tracking-wider">To</label>
                    <div class="relative">
                        <i data-lucide="flag" class="absolute left-4 top-3.5 w-5 h-5 text-[var(--accent-primary)] opacity-70"></i>
                        <input id="to-input" type="text" placeholder="e.g. Majestic" aria-label="Destination" required class="neu-input w-full pl-12 pr-4 py-3 text-base md:text-lg bg-transparent focus:ring-0 placeholder-[var(--text-secondary)]/50">
                    </div>
                </div>
                
                <button type="submit" class="btn-primary w-full md:w-auto px-8 py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-transform duration-300 hover:-translate-y-1 focus:translate-y-0 active:scale-95">
                    <span>Search</span>
                    <i data-lucide="arrow-right" class="w-5 h-5"></i>
                </button>
            </form>
        </div>
    `;
}

export function MapContainer() {
    return `
        <div class="glass-panel w-full h-full relative overflow-hidden group border border-[var(--glass-border)]">
            <div class="absolute top-4 left-4 z-20">
                <div class="bg-[var(--card-bg)] backdrop-blur-md px-4 py-2 rounded-full border border-[var(--accent-primary)] shadow-lg flex items-center gap-2">
                    <span class="relative flex h-3 w-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-primary)]"></span>
                    </span>
                    <span class="text-[var(--text-primary)] font-mono text-xs font-bold tracking-wider">LIVE TRACKING</span>
                </div>
            </div>
            
            <div id="gmap-frame-wrapper" class="w-full h-full">
    <!-- iframe will be injected here -->


                </div>
            </div>
        </div>
        <div class="w-full h-full flex flex-col gap-4">

    <!-- Existing Google Map -->
    <div id="google-map-wrapper" class="h-1/2 rounded-xl overflow-hidden"></div>

    <!-- NEW Leaflet Map -->
    <div id="leaflet-map" class="h-1/2 rounded-xl overflow-hidden"></div>

</div>

    `;
}

export function InfoSection() {
    const typesHtml = bmtcTypes.map(bus => `
        <div class="group p-4 rounded-xl border border-[var(--glass-border)] hover:bg-[var(--glass-border)] transition-all duration-300">
            <div class="flex items-start gap-4">
                <div class="p-2.5 rounded-lg bg-[var(--accent-glow)] text-[var(--accent-primary)] shadow-sm">
                    <i data-lucide="${bus.icon}" class="w-5 h-5"></i>
                </div>
                <div>
                    <h4 class="font-bold text-[var(--text-primary)] text-base group-hover:text-[var(--accent-primary)] transition-colors">${bus.name}</h4>
                    <p class="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed opacity-90">${bus.desc}</p>
                </div>
            </div>
        </div>
    `).join('');

    const routesHtml = popularRoutes.map(route => `
        <div class="flex items-center justify-between p-3 border-b border-[var(--glass-border)] last:border-0 hover:bg-[var(--glass-border)] transition-colors rounded-lg cursor-pointer group">
            <div class="flex items-center gap-4">
                <span class="font-mono font-bold text-[var(--accent-primary)] bg-[var(--accent-glow)] px-2 py-1 rounded text-sm min-w-[4rem] text-center group-hover:scale-105 transition-transform">${route.code}</span>
                <div class="flex flex-col">
                    <span class="text-sm text-[var(--text-primary)] font-semibold flex items-center gap-2">
                        ${route.from} <i data-lucide="arrow-right" class="w-3 h-3 text-[var(--text-secondary)]"></i> ${route.to}
                    </span>
                    <span class="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest font-bold mt-0.5">${route.type}</span>
                </div>
            </div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 transition-all"></i>
        </div>
    `).join('');

    return `
        <!-- Card 1: Bus Types -->
        <article class="glass-panel overflow-hidden flex flex-col h-full collapsible-card">
            <div class="p-6 md:p-8 border-b border-[var(--glass-border)] flex justify-between items-center cursor-pointer md:cursor-default toggle-header">
                <h3 class="text-lg md:text-xl font-display font-bold text-[var(--text-primary)]">Bus Types</h3>
                <i data-lucide="chevron-down" class="w-5 h-5 text-[var(--text-secondary)] md:hidden chevron"></i>
            </div>
            <div class="details-content flex-grow">
                <div class="p-6 md:p-8 pt-4 space-y-3">
                    ${typesHtml}
                </div>
            </div>
        </article>

        <!-- Card 2: Popular Routes -->
        <article class="glass-panel overflow-hidden flex flex-col h-full floating-card collapsible-card" style="animation-delay: 0.5s;">
            <div class="p-6 md:p-8 border-b border-[var(--glass-border)] flex justify-between items-center cursor-pointer md:cursor-default toggle-header">
                <h3 class="text-lg md:text-xl font-display font-bold text-[var(--text-primary)]">Popular Routes</h3>
                <i data-lucide="chevron-down" class="w-5 h-5 text-[var(--text-secondary)] md:hidden chevron"></i>
            </div>
            <div class="details-content flex-grow flex flex-col">
                <div class="p-6 md:p-8 pt-4 flex-grow overflow-y-auto custom-scrollbar space-y-1 max-h-[400px]">
                    ${routesHtml}
                </div>
                <div class="p-4 border-t border-[var(--glass-border)] text-center bg-[var(--glass-bg)]">
                    <button class="text-sm text-[var(--accent-primary)] font-bold hover:text-[var(--text-primary)] transition-colors flex items-center justify-center gap-1 mx-auto">
                        View Full Schedule <i data-lucide="external-link" class="w-3 h-3"></i>
                    </button>
                </div>
            </div>
        </article>
    `;
}
