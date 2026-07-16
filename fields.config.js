import { Registry } from '@radiantearth/stac-fields';

// For details, please consult
// https://github.com/radiantearth/stac-browser/blob/main/docs/metadata.md

// ADD ADDITIONAL FIELDS AND EXTENSIONS HERE

// Registry.addExtension('radiant', 'Radiant Earth');
// Registry.addMetadataField('radiant:public_access', {
//     label: "Data Access",
//     formatter: value => value ? "Public" : "Private"
// });

// --- PhilSA catalog review (Jul 2026) -------------------------------------
// Groups the philsa:* collection fields below under a "PhilSA" metadata card.
Registry.addExtension('philsa', 'PhilSA');

// Render an ISO date (e.g. "2026-07-15") as "15 Jul 2026", locale-independent.
// Uses the UTC parts so the calendar day never shifts across time zones.
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function formatDayMonthYear(value) {
    const d = new Date(value);
    if (isNaN(d.getTime())) {
        return value;
    }
    return `${d.getUTCDate()} ${SHORT_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// "Metadata Last Updated" - present on every collection.
Registry.addMetadataField('philsa:metadata_updated', {
    label: 'Metadata Last Updated',
    formatter: formatDayMonthYear
});

// "Update frequency" - present on the ESRI raster collection.
Registry.addMetadataField('philsa:update_frequency', {
    label: 'Update frequency'
});

// Expand the "GSD" acronym to its full name (default label is just "GSD").
Registry.addMetadataField('gsd', {
    label: 'Ground Sample Distance',
    unit: 'm'
});

// Item-level acquisition window - friendlier than the defaults
// ("Time of Data begins" / "Time of Data ends"); keep them out of collection
// summaries (summary: false) so they show under the item's General section.
Registry.addMetadataField('start_datetime', {
    label: 'Time of Data Start',
    format: 'Timestamp',
    summary: false
});
Registry.addMetadataField('end_datetime', {
    label: 'Time of Data End',
    format: 'Timestamp',
    summary: false
});

// Render the STAC Contact extension under a "Contact Details" header
// (default extension label is "Contacts").
Registry.addExtension('contacts', 'Contact Details');

// DEFINE FIELDS TO IGNORE IN METADATA RENDERING

/**
 * Function that can be used to change the ignored fields in the metadata rendering.
 * 
 * @type {function|null}
 * @param {STACObject|Object} object The entity for which the metadata is rendered.
 * @param {string[]} fields The fields ignored by default.
 * @param {string} type The type of the entity (e.g. `CatalogLike`, `Item`, `Asset`, `Link`, `Provider`).
 * @returns {string[]} The fields to ignore in the metadata rendering.
 */
const ignoreMetadata = null;

export { ignoreMetadata };
