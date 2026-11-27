<script lang="ts" module>
  export interface MapMarker {
    lat: number;
    lon: number;
    title: string;
    subtitle?: string;
    color: string;
    /** Label/value rows of the popup. */
    details?: [string, string][];
    radius?: number;
  }

  /** Germany, before anything is shown. */
  export const GERMANY: [[number, number], [number, number]] = [
    [47.2, 5.8],
    [55.1, 15.1],
  ];

  /** basemap.de (BKG): the official German base map, free under CC BY 4.0. */
  export const BASEMAP_DE = {
    url: 'https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_farbe/default/GLOBAL_WEBMERCATOR/{z}/{y}/{x}.png',
    attribution: '&copy; <a href="https://basemap.de">basemap.de</a> / BKG',
  };
</script>

<script lang="ts">
  /**
   * MapView organism — a location map: circle markers in their category colour with a hover
   * label and a popup of details (on frosted glass), fitted to whatever is shown. Leaflet is an
   * optional peer dependency, imported on mount (SSR-safe); import this from
   * `@bonbon-ui/core/map`. Leaflet paints with literal colours: give markers hex values.
   *
   *   <MapView markers={[{ lat: 50.11, lon: 8.68, title: 'Office', color: '#007aff' }]} />
   */
  import { onMount } from 'svelte';
  import type * as Leaflet from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { escapeHtml } from '../../utils/format';

  interface Props {
    markers: MapMarker[];
    home?: [[number, number], [number, number]];
    tiles?: { url: string; attribution: string };
    /** Zoom when exactly one marker is shown. */
    singleZoom?: number;
    label?: string;
  }

  let {
    markers,
    home = GERMANY,
    tiles = BASEMAP_DE,
    singleZoom = 13,
    label = 'Map',
  }: Props = $props();

  let element: HTMLDivElement;
  let L = $state<typeof Leaflet>();
  let map = $state<Leaflet.Map>();
  let layer: Leaflet.FeatureGroup | undefined;

  onMount(() => {
    let observer: ResizeObserver | undefined;
    let disposed = false;
    void import('leaflet').then((module) => {
      if (disposed) return;
      const leaflet = (module as { default?: typeof Leaflet }).default ?? module;
      L = leaflet;
      map = leaflet.map(element, { zoomControl: true, attributionControl: true }).fitBounds(home);
      leaflet.tileLayer(tiles.url, { maxZoom: 18, attribution: tiles.attribution }).addTo(map);
      layer = leaflet.featureGroup().addTo(map);
      // The card can change size after mount (fonts, layout).
      observer = new ResizeObserver(() => map?.invalidateSize());
      observer.observe(element);
    });
    return () => {
      disposed = true;
      observer?.disconnect();
      map?.remove();
    };
  });

  $effect(() => {
    if (!L || !map || !layer) return;
    layer.clearLayers();
    for (const marker of markers) {
      L.circleMarker([marker.lat, marker.lon], {
        radius: marker.radius ?? 9,
        color: '#fff',
        weight: 2,
        fillColor: marker.color,
        fillOpacity: 0.92,
      })
        .bindPopup(popup(marker), { maxWidth: 320, className: 'bb-map-popup' })
        .bindTooltip(escapeHtml(marker.title), { direction: 'top', offset: [0, -8] })
        .addTo(layer);
    }
    const [first] = markers;
    if (markers.length === 1 && first) map.setView([first.lat, first.lon], singleZoom);
    else if (markers.length > 1)
      map.fitBounds(layer.getBounds(), { padding: [48, 48], maxZoom: 14 });
  });

  function popup(marker: MapMarker): string {
    const rows = (marker.details ?? [])
      .map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`)
      .join('');
    return `<div class="popup">
      <div class="popup-head"><i style="background:${escapeHtml(marker.color)}"></i>${escapeHtml(marker.title)}</div>
      ${marker.subtitle ? `<div class="popup-sub">${escapeHtml(marker.subtitle)}</div>` : ''}
      ${rows ? `<dl>${rows}</dl>` : ''}
    </div>`;
  }
</script>

<div class="map" bind:this={element} role="region" aria-label={label}></div>

<style>
  .map {
    width: 100%;
    height: 100%;
    min-height: 320px;
    border-radius: var(--radius-card);
    overflow: hidden;
  }
  .map :global(.leaflet-container),
  .map:global(.leaflet-container) {
    font: inherit;
    background: var(--bg);
  }
  :global(.bb-map-popup .leaflet-popup-content-wrapper) {
    background: var(--tooltip-bg);
    color: var(--text);
    border-radius: var(--radius-xl);
    border: 0.75px solid var(--pill-border);
    box-shadow: var(--shadow-pop);
    backdrop-filter: var(--blur-pill);
    -webkit-backdrop-filter: var(--blur-pill);
  }
  :global(.bb-map-popup .leaflet-popup-close-button) {
    top: var(--space-1);
    right: var(--space-1);
    border-radius: var(--radius-pill);
    color: var(--text-3);
  }
  .map :global(.leaflet-tooltip) {
    padding: 2px var(--space-2);
    border: 0.75px solid var(--pill-border);
    border-radius: var(--radius-pill);
    background: var(--tooltip-bg);
    color: var(--text);
    font-weight: var(--fw-semibold);
    box-shadow: var(--glass-shadow);
  }
  .map :global(.leaflet-tooltip-top::before) {
    border-top-color: var(--tooltip-bg);
  }
  .map :global(.leaflet-bar) {
    border: 0.75px solid var(--pill-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-frosted);
  }
  .map :global(.leaflet-bar a) {
    background: var(--tooltip-bg);
    color: var(--text);
    border-bottom-color: var(--border-strong);
  }
  .map :global(.leaflet-bar a:hover) {
    background: var(--glass-strong);
    color: var(--accent-ink);
  }
  :global(.bb-map-popup .leaflet-popup-tip) {
    background: var(--tooltip-bg);
  }
  :global(.bb-map-popup .leaflet-popup-content) {
    margin: var(--space-3) 0.9rem;
    font-size: var(--fs-sm);
    line-height: 1.45;
  }
  :global(.bb-map-popup .popup-head) {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-weight: var(--fw-semibold);
    font-size: var(--fs-base);
    margin-bottom: 0.15rem;
  }
  :global(.bb-map-popup .popup-head i) {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }
  :global(.bb-map-popup .popup-sub) {
    color: var(--text-3);
    margin-bottom: 0.45rem;
  }
  :global(.bb-map-popup dl) {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.15rem var(--space-3);
    margin: 0;
  }
  :global(.bb-map-popup dt) {
    color: var(--text-3);
    font-weight: var(--fw-semibold);
    font-size: var(--fs-2xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
    padding-top: 0.15rem;
  }
  :global(.bb-map-popup dd) {
    margin: 0;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
</style>
