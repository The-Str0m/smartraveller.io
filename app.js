import { ThemeManager } from './theme_manager.js';
//A project by NTA and Pranav Soggy 
import { Header, SearchPanel, MapContainer, InfoSection } from './ui_components.js';
//this is the main stufs
class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.appContainer = document.getElementById('app');
        this.init();
    }
    updateMap(from, to) {
    const mapWrapper = document.getElementById('gmap-frame-wrapper');

    const url = `https://www.google.com/maps/embed/v1/directions
        ?origin=${encodeURIComponent(from)}
        &destination=${encodeURIComponent(to)}
        &mode=transit`;

    const iframe = `
        <iframe 
            width="100%" 
            height="100%" 
            style="border:0;" 
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=${encodeURIComponent(from)} to ${encodeURIComponent(to)}&output=embed">
        </iframe>`;

    mapWrapper.innerHTML = iframe;
}


    init() {
        this.renderAll();
        this.setupDelegatedEvents();
        this.animateEntry();
        this.handleResize();
    }

    renderAll() {
        const currentTheme = this.themeManager.getTheme();
        const themeLabel = this.themeManager.getThemeLabel(currentTheme);

        document.getElementById('header-container').innerHTML = Header(currentTheme, themeLabel);
        document.getElementById('search-section').innerHTML = SearchPanel();
        document.getElementById('map-section').innerHTML = MapContainer();
        document.getElementById('info-section').innerHTML = InfoSection();
        
        lucide.createIcons();
    }

    setupDelegatedEvents() {

        this.appContainer.addEventListener('click', (e) => {

            const themeBtn = e.target.closest('#theme-toggle');
            if (themeBtn) {
                this.handleThemeToggle(themeBtn);
                return;
            }


            const toggleHeader = e.target.closest('.toggle-header');
            if (toggleHeader && window.innerWidth < 768) {
                const card = toggleHeader.closest('.collapsible-card');
                if (card) {
                    card.classList.toggle('collapsed');
                }
            }
        });


        const form = document.getElementById('search-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSearch(form);
            });
        }
    }

    handleThemeToggle(btn) {

        const newTheme = this.themeManager.cycleTheme();
        const labelSpan = btn.querySelector('#theme-label');
        

        if (labelSpan) {
            labelSpan.textContent = this.themeManager.getThemeLabel(newTheme);
        }
        

        const icon = btn.querySelector('svg');
        if (icon) {
            gsap.fromTo(icon, 
                { rotation: -45, scale: 0.8 }, 
                { rotation: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }

    handleSearch(form) {
        const btn = form.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;
        

        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin w-5 h-5 mr-2"></i> Routing...';
        lucide.createIcons();


        setTimeout(() => {
    const from = form.querySelector('#from-input').value;
    const to = form.querySelector('#to-input').value;

    this.updateMap(from, to);

    btn.innerHTML = '<i data-lucide="check" class="w-5 h-5 mr-2"></i> Found';
    lucide.createIcons();
    btn.classList.add('bg-green-600');

    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        btn.classList.remove('bg-green-600');
        lucide.createIcons();
    }, 2000);
}, 1200);

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                btn.classList.remove('bg-green-600');
                lucide.createIcons();
            }, 2000);
        }
    

    animateEntry() {
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        timeline
            .from('#header-container', {
                y: -50,
                opacity: 0,
                duration: 0.8
            })
            .from('#search-section', {
                y: 40,
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                clearProps: 'all'
            }, "-=0.4")
            .from('#map-section', {
                opacity: 0,
                y: 40,
                duration: 0.8
            }, "-=0.5")
            .from('.glass-panel', {
                y: 60,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                clearProps: 'all' // hover animation shit
            }, "-=0.5");
    }
    
    handleResize() {

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                document.querySelectorAll('.collapsible-card').forEach(card => {
                    card.classList.remove('collapsed');
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
let leafletMap;

function initLeaflet() {
    leafletMap = L.map('leaflet-map').setView([12.9716, 77.5946], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20
    }).addTo(leafletMap);
}
initLeaflet();
L.polyline(shapeCoords, {
    color: 'blue',
    weight: 4
}).addTo(leafletMap);
L.polyline(walkCoords, {
    color: 'green',
    dashArray: "5,7"
}).addTo(leafletMap);
L.marker([lat, lon]).addTo(leafletMap);
function searchRoute() {
    const origin = document.getElementById("from").value;
    const destination = document.getElementById("to").value;

    const request = {
        origin,
        destination,
        travelMode: "TRANSIT",
        transitOptions: { modes: ["BUS"] }
    };

    googleDirectionsService.route(request, (result, status) => {
        if (status === "OK") {
          
            googleDirectionsRenderer.setDirections(result);

            
            drawLeafletRoute(result);
        } else {
            console.error("Routing error:", status);
        }
    });
}
let leafletRouteLayer;

function drawLeafletRoute(result) {
 
    if (leafletRouteLayer) {
        leafletMap.removeLayer(leafletRouteLayer);
    }

    
    let allPoints = [];

    const legs = result.routes[0].legs;

    legs.forEach(leg => {
        leg.steps.forEach(step => {
            const path = google.maps.geometry.encoding.decodePath(step.polyline.points);

            const latlngs = path.map(p => [p.lat(), p.lng()]);
            allPoints.push(...latlngs);

            
            const color = step.travel_mode === "WALKING" ? "green" : "blue";

            L.polyline(latlngs, { color, weight: 4 }).addTo(leafletMap);
        });
    });

 
    leafletRouteLayer = L.polyline(allPoints);
    leafletMap.fitBounds(leafletRouteLayer.getBounds());
}
