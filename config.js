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
  displayGeoTiffByDefault: false,
  displayPreview: true,
  displayOverview: true,
  displayOverviewsForChildren: false,
  buildTileUrlTemplate: null,
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
