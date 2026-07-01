export default {
  // PhilSA POC: lock the Browser to our own pgSTAC API only.
  // catalogUrl is the stac-fastapi-pgstac endpoint. Override for a deployed
  // API host via the SB_catalogUrl env var (or public/runtime-config.js).
  catalogUrl: "http://localhost:8082",
  catalogTitle: "PhilSA Geospatial Data Catalog",
  // Header logo, served from public/. Must be a full (scheme-qualified) URL —
  // stac-js resolves catalogImage as a Link and returns null for relative hrefs,
  // so a root-relative "/philsa-logo.png" would not render. This points at the
  // Browser's own dev origin (vite :8080); override with SB_catalogImage when
  // deployed behind another host.
  catalogImage: "http://localhost:8080/philsa-logo.png",
  // false => the Browser ONLY ever loads the catalogUrl above; it cannot be
  // pointed at any other (external) STAC catalog. This is the PhilSA requirement.
  allowExternalAccess: false,
  allowedDomains: [],
  enforcedColorMode: "auto",
  detectLocaleFromBrowser: true,
  storeLocale: true,
  locale: "en",
  fallbackLocale: "en",
  supportedLocales: [
    "ar",
    "de",
//  "de-CH",
    "es",
    "en",
//  "en-GB",
//  "en-US",
    "fr",
//  "fr-CA",
//  "fr-CH",
    "it",
//  "it-CH",
    "ro",
    "ru",
    "ja",
    "pt",
//  "pt-BR",
    "id",
    "pl",
    "sv"
  ],
  apiCatalogPriority: null,
  useTileLayerAsFallback: false,
  displayGeoTiffByDefault: true,
  displayPreview: true,
  displayOverview: true,
  displayOverviewsForChildren: false,
  // Render the silver COGs through TiTiler (repo-root compose.viz.yml, :8083)
  // instead of the client-side renderer. Single-band Float32 rasters (NDVI, SAR
  // backscatter) need a rescale + colormap or they show as a black tile; the
  // 3-band true-colour COG renders natively. R2-hosted COGs are read over the
  // AUTHENTICATED S3 endpoint, so we rewrite the public r2.dev asset URL to an
  // s3://<bucket>/<key> URL (its DNS is reliable; the public host is not).
  // ESRI 10 m LULC is a by-reference public Azure blob (not in R2) and a
  // single-band uint8 categorical raster, so it bypasses the s3 rewrite and gets
  // a discrete colormap built from the item's classification:classes hints.
  buildTileUrlTemplate: (asset) => {
    const href = asset.getAbsoluteUrl();
    const tilePath = "http://localhost:8083/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=";

    // ESRI LULC: read the public Azure COG directly, color by class value.
    if (href.includes("lulctimeseries.blob.core.windows.net")) {
      // Impact Observatory v003 9-class scheme (value -> RGBA). 0 = nodata.
      const esriColormap = {
        1:  [26, 91, 171, 255],   // Water
        2:  [53, 130, 33, 255],   // Trees
        4:  [135, 209, 158, 255], // Flooded vegetation
        5:  [255, 219, 92, 255],  // Crops
        7:  [237, 2, 42, 255],    // Built area
        8:  [237, 233, 228, 255], // Bare ground
        9:  [242, 250, 255, 255], // Snow/ice
        10: [200, 200, 200, 255], // Clouds
        11: [198, 173, 141, 255], // Rangeland
      };
      return tilePath + encodeURIComponent(href) +
        "&colormap=" + encodeURIComponent(JSON.stringify(esriColormap));
    }

    // R2-hosted silver COGs: rewrite to the authenticated s3:// endpoint.
    const key = href.replace(/^https?:\/\/[^/]+\//, "");
    const s3 = "s3://world-bank-philsa-geo/" + key;
    const base = tilePath + encodeURIComponent(s3);
    if (href.includes("/sentinel2-ndvi/")) return base + "&rescale=-0.2,0.8&colormap_name=rdylgn";
    if (href.includes("/sentinel1-sar/")) return base + "&rescale=15,55&colormap_name=gray";
    if (href.includes("/sentinel1-flood/")) {
      // categorical Byte mask: 1=water, 2=permanent water (0/land + 255/nodata transparent)
      const floodColormap = { 1: [33, 102, 204, 255], 2: [120, 170, 230, 255] };
      return base + "&colormap=" + encodeURIComponent(JSON.stringify(floodColormap));
    }
    return base; // true-colour = native 3-band RGB
  },
  getMapSourceOptions: null,
  pathPrefix: "/",
  historyMode: "history",
  cardViewMode: "cards",
  cardViewSort: "asc",
  showKeywordsInItemCards: false,
  showKeywordsInCatalogCards: false,
  showThumbnailsAsAssets: false,
  searchResultsPerPage: null,
  itemsPerPage: null,
  collectionsPerPage: null,
  maxEntriesPerPage: 1000,
  defaultThumbnailSize: null,
  crossOriginMedia: null,
  requestHeaders: {},
  requestQueryParameters: {},
  socialSharing: ['email', 'bsky', 'mastodon', 'x'],
  preprocessSTAC: null,
  authConfig: null,
  crs: {},
  footerLinks: null
};
