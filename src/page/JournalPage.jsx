import SiteChrome from "../components/layout/SiteChrome";
import JournalIndex from "../components/journal/JournalIndex";
import SyncPageSeo from "../components/seo/SyncPageSeo";
import { JOURNAL_INDEX_SEO, absoluteUrl, absoluteAssetUrl } from "../config/seoMeta";
import libraryImage from "../image/library.webp";

export default function JournalPage() {
  return (
    <SiteChrome>
      <SyncPageSeo
        title={JOURNAL_INDEX_SEO.title}
        description={JOURNAL_INDEX_SEO.description}
        keywords={JOURNAL_INDEX_SEO.keywords}
        canonicalUrl={absoluteUrl(JOURNAL_INDEX_SEO.canonicalPath)}
        ogImage={absoluteAssetUrl(libraryImage)}
        ogImageAlt="MADELEINE journal — olfactory memory and travel stories"
      />
      <JournalIndex />
    </SiteChrome>
  );
}
