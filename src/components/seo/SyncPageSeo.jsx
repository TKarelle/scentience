import { usePageSeo } from "../../hooks/usePageSeo";

/** Met à jour les balises SEO du document ; ne rend rien. */
export default function SyncPageSeo(props) {
  usePageSeo(props);
  return null;
}
