import { type CollectionEntry } from "astro:content";

/**
 * Id gets constructed based on the folder structure.
 * src/content/articles/my-article-series/my-article.md creates an id of: my-article-siers/my-article
 *
 * src/content/articles/my-article.md creates an id of: my-article
 */
function isSeries(id: string) {
  return id.split("/").length > 1;
}

function getSeriesId(id: string) {
  return id.split("/")[0];
}

export function getSeries(
  collectionEntries: CollectionEntry<"articles">[],
  id: string
) {
  if (!isSeries(id)) return [];

  return collectionEntries.filter(({ id: collectionEntryId }) => {
    if (!isSeries(collectionEntryId)) return false;

    const seriesId = getSeriesId(id);
    const collectionEntrySeriesId = getSeriesId(collectionEntryId);
    if (seriesId !== collectionEntrySeriesId) return false;

    return true;
  });
}
